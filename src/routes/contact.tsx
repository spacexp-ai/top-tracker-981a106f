import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { format } from "date-fns";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { ArrowRight, Mail, Phone, MapPin, CalendarIcon, CreditCard, Loader2 } from "lucide-react";
import { photos } from "@/assets/photos";
const camp = photos.campNight;
import { WeatherWidget } from "@/components/WeatherWidget";
import { BookingMap } from "@/components/BookingMap";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book a Safari — Top Trackers" },
      { name: "description", content: "Begin your African hunting expedition. Live weather, interactive map, and secure deposit checkout." },
      { property: "og:title", content: "Book your Safari — Top Trackers" },
      { property: "og:description", content: "Plan your African hunting expedition with Top Trackers." },
    ],
  }),
  component: Contact,
});

const DEPOSIT_USD = 1500;

function Contact() {
  const [sent, setSent] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [payState, setPayState] = useState<"idle" | "loading" | "error">("idle");
  const [payMsg, setPayMsg] = useState<string>("");
  const [email, setEmail] = useState("");

  async function startCheckout() {
    setPayState("loading");
    setPayMsg("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: DEPOSIT_USD * 100,
          description: `Top Trackers safari deposit${date ? ` — start ${format(date, "PP")}` : ""}`,
          email: email || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setPayState("error");
        setPayMsg(data?.hint || data?.error || "Checkout temporarily unavailable.");
        return;
      }
      window.location.href = data.url;
    } catch (e) {
      setPayState("error");
      setPayMsg("Network error — please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <section className="relative h-[50svh] bg-ink overflow-hidden">
        <img src={camp} alt="" className="absolute inset-0 w-full h-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-bone">
          <Eyebrow light>Plan your expedition</Eyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-7xl max-w-4xl leading-[0.95]">
            Book your <span className="italic font-serif text-accent">safari.</span>
          </h1>
        </div>
      </section>

      <section className="paper-bg py-20">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-3 gap-8">
          {/* Booking column */}
          <Reveal className="lg:col-span-2">
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="bg-card border border-border p-8 md:p-10 shadow-[var(--shadow-vintage)]"
            >
              <div className="text-[10px] tracking-[0.4em] uppercase text-accent mb-2">Inquiry</div>
              <h3 className="font-display text-2xl text-forest mb-8">Tell us what you seek.</h3>

              {sent ? (
                <div className="py-16 text-center">
                  <div className="font-display text-3xl text-ember">Karibu.</div>
                  <p className="mt-3 font-serif text-lg text-foreground/75">Your message is on its way to camp. We'll be in touch shortly.</p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <Field label="Name" name="name" required />
                    <Field label="Email" name="email" type="email" required value={email} onChange={setEmail} />
                  </div>
                  <Field label="Country" name="country" />

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Preferred start date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className={cn(
                              "w-full inline-flex items-center justify-between bg-transparent border border-input px-4 py-3 font-serif text-lg",
                              !date && "text-muted-foreground",
                            )}
                          >
                            {date ? format(date, "PPP") : "Pick a date"}
                            <CalendarIcon className="h-4 w-4 text-ember" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(d) => d < new Date(new Date().toDateString())}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Interest</label>
                      <select className="w-full bg-transparent border border-input px-4 py-3 font-serif text-lg focus:outline-none focus:border-ember">
                        <option>The Selous Classic</option>
                        <option>Maasai Steppe Plains</option>
                        <option>Iringa Highlands</option>
                        <option>Club Membership</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Tell us more</label>
                    <textarea rows={5} maxLength={2000} className="w-full bg-transparent border border-input px-4 py-3 font-serif text-lg focus:outline-none focus:border-ember" placeholder="Quarry, party size, anything we should know…" />
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button type="submit" className="inline-flex items-center gap-2 px-8 py-4 bg-forest text-bone tracking-[0.3em] text-[11px] uppercase hover:bg-ember transition">
                      Send inquiry <ArrowRight className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={startCheckout}
                      disabled={payState === "loading"}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground tracking-[0.3em] text-[11px] uppercase hover:bg-ember hover:text-bone transition disabled:opacity-60"
                    >
                      {payState === "loading"
                        ? <><Loader2 className="h-4 w-4 animate-spin" /> Preparing…</>
                        : <><CreditCard className="h-4 w-4" /> Reserve with ${DEPOSIT_USD} deposit</>}
                    </button>
                  </div>
                  {payState === "error" && (
                    <p className="text-sm text-ember font-serif italic">{payMsg}</p>
                  )}
                  <p className="text-[11px] text-muted-foreground font-serif italic">
                    Deposit is fully credited against your safari balance. Refundable until 120 days before departure.
                  </p>
                </div>
              )}
            </form>
          </Reveal>

          {/* Sidebar: weather, map, contact */}
          <div className="space-y-6">
            <Reveal delay={0.1}>
              <WeatherWidget selectedDate={date} />
            </Reveal>
            <Reveal delay={0.2}>
              <BookingMap />
            </Reveal>
            <Reveal delay={0.3}>
              <div className="bg-card border border-border p-6">
                <div className="text-[10px] tracking-[0.4em] uppercase text-accent mb-3">Camp</div>
                <ul className="space-y-3 font-serif text-base">
                  <li className="flex gap-3"><MapPin className="h-4 w-4 text-ember mt-1 shrink-0" /> Losirva, Esilalei, Monduli — Tanzania</li>
                  <li className="flex gap-3"><Phone className="h-4 w-4 text-ember mt-1 shrink-0" /> +255 763 075 130</li>
                  <li className="flex gap-3"><Mail className="h-4 w-4 text-ember mt-1 shrink-0" /> info@top-trackers.com</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Field({ label, name, type = "text", required, value, onChange }: { label: string; name: string; type?: string; required?: boolean; value?: string; onChange?: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        maxLength={200}
        className="w-full bg-transparent border border-input px-4 py-3 font-serif text-lg focus:outline-none focus:border-ember"
      />
    </div>
  );
}
