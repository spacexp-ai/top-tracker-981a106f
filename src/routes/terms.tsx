import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Eyebrow } from "@/components/Eyebrow";
import { useSiteContent } from "@/hooks/useSiteContent";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Top Trackers" },
      { name: "description", content: "Top Trackers terms of service for safari bookings, membership, and use of this website." },
    ],
  }),
  component: Terms,
});

function Terms() {
  const { data: content } = useSiteContent();

  const getContent = (key: string, fallback: string) => {
    return content?.[key] ?? fallback;
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <section className="paper-bg pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6 prose-content">
          <Eyebrow>{getContent("terms.hero.eyebrow", "The fine print")}</Eyebrow>
          <h1 className="mt-6 font-display text-5xl text-forest">{getContent("terms.hero.title", "Terms of Service")}</h1>
          <p className="mt-4 font-serif text-sm text-muted-foreground">{getContent("terms.hero.date", "Last updated: 1 May 2026")}</p>

          <article className="mt-10 font-serif text-lg text-foreground/80 space-y-6 leading-relaxed">
            <p>{getContent("terms.intro", "These terms govern your booking with, and use of services from, Top Trackers Ltd. (Tanzania). By placing a deposit or signing a hunt agreement, you accept these terms in full.")}</p>

            <h2 className="font-display text-2xl text-forest pt-4">{getContent("terms.section.1.title", "1. Bookings & Deposits")}</h2>
            <p>{getContent("terms.section.1.body", "A non-refundable deposit of 30% confirms a booking. The balance is due 60 days before the safari start date. Late balance payment may release dates to other clients.")}</p>

            <h2 className="font-display text-2xl text-forest pt-4">{getContent("terms.section.2.title", "2. Cancellation & Postponement")}</h2>
            <p>{getContent("terms.section.2.body", "Cancellation more than 120 days from start date forfeits the deposit only. Cancellation within 120 days forfeits 60% of the total. Cancellation within 30 days forfeits 100%. Postponement within the same season is offered free of charge subject to availability.")}</p>

            <h2 className="font-display text-2xl text-forest pt-4">{getContent("terms.section.3.title", "3. Quotas & Trophies")}</h2>
            <p>{getContent("terms.section.3.body", "All hunts are conducted under TAWA licences and within published quotas. Trophy fees are only invoiced after the animal is confirmed taken. CITES documentation is included; international shipping is invoiced separately.")}</p>

            <h2 className="font-display text-2xl text-forest pt-4">{getContent("terms.section.4.title", "4. Liability")}</h2>
            <p>{getContent("terms.section.4.body", "The client acknowledges that hunting is inherently risky. Top Trackers carries full third-party liability cover. Personal travel, medical, and evacuation insurance is required of every guest.")}</p>

            <h2 className="font-display text-2xl text-forest pt-4">{getContent("terms.section.5.title", "5. Conduct")}</h2>
            <p>{getContent("terms.section.5.body", "We reserve the right to terminate a safari without refund for any breach of fair-chase ethics, intoxicated handling of firearms, or disrespect to staff or wildlife.")}</p>

            <h2 className="font-display text-2xl text-forest pt-4">{getContent("terms.section.6.title", "6. Governing Law")}</h2>
            <p>{getContent("terms.section.6.body", "These terms are governed by the laws of the United Republic of Tanzania. Any dispute will be settled by arbitration in Arusha.")}</p>
          </article>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
