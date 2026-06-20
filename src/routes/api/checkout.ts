import { createFileRoute } from "@tanstack/react-router";

// POST /api/checkout — creates a Stripe Checkout session.
// Requires STRIPE_SECRET_KEY to be set. Until then, returns a 503 with
// a friendly message so the UI can fall back to the inquiry flow.

type Body = {
  amount: number; // USD
  description: string;
  email?: string;
  successUrl?: string;
  cancelUrl?: string;
};

export const Route = createFileRoute("/api/checkout")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: Body;
        try {
          body = (await request.json()) as Body;
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const amount = Math.round(Number(body.amount) || 0);
        const description = String(body.description || "").slice(0, 200);
        if (!amount || amount < 100) {
          return Response.json({ error: "Amount must be at least $1" }, { status: 400 });
        }

        const key = process.env.STRIPE_SECRET_KEY;
        if (!key) {
          return Response.json(
            {
              error: "Stripe not configured",
              hint: "Add STRIPE_SECRET_KEY in Lovable Cloud secrets to enable checkout.",
            },
            { status: 503 },
          );
        }

        const origin = request.headers.get("origin") ?? new URL(request.url).origin;

        const params = new URLSearchParams();
        params.append("mode", "payment");
        params.append("payment_method_types[]", "card");
        params.append("line_items[0][quantity]", "1");
        params.append("line_items[0][price_data][currency]", "usd");
        params.append("line_items[0][price_data][unit_amount]", String(amount));
        params.append(
          "line_items[0][price_data][product_data][name]",
          description || "Top Trackers deposit",
        );
        params.append("success_url", body.successUrl || `${origin}/contact?paid=1`);
        params.append("cancel_url", body.cancelUrl || `${origin}/contact?canceled=1`);
        if (body.email) params.append("customer_email", body.email);

        const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
        });

        const data = (await res.json()) as { url?: string; error?: { message?: string } };
        if (!res.ok || !data.url) {
          return Response.json({ error: data.error?.message || "Stripe error" }, { status: 502 });
        }
        return Response.json({ url: data.url });
      },
    },
  },
});
