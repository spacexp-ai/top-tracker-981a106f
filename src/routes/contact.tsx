import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { useTranslation } from "react-i18next";
import { ArrowRight, Mail, Phone, MapPin, CalendarIcon, CreditCard, Loader2 } from "lucide-react";
import { photos } from "@/assets/photos";
import { WeatherWidget } from "@/components/WeatherWidget";
import { BookingMap } from "@/components/BookingMap";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useSiteContent, resolveImage } from "@/hooks/useSiteContent";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book a Safari — Top Trackers" },
      { name: "description", content: "Begin your African hunting expedition. Live weather, interactive map, and secure deposit checkout." },
    ],
  }),
  component: Contact,
});

const DEPOSIT_USD = 1500;

function Contact() {
  const { t, i18n } = useTranslation();
  const [sent, setSent] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [payState, setPayState] = useState<"idle" | "loading" | "error">("idle");
  const [payMsg, setPayMsg] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [interest, setInterest] = useState("The Selous Classic");
  const [more, setMore] = useState("");
  const { data: content } = useSiteContent();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const concession = params.get("concession");
    const days = params.get("days");
    const hunters = params.get("hunters");
    const picked = params.get("picked");
    const tier = params.get("tier");
    const charter = params.get("charter");
    const total = params.get("total");

    if (concession) {
      if (concession === "selous") setInterest("The Selous Classic");
      else if (concession === "maasai") setInterest("Maasai Steppe Plains");
      else if (concession === "iringa") setInterest("Iringa Highlands");
    }

    if (days || hunters || picked || tier || charter || total) {
      const speciesLabels = picked
        ? picked
            .split(",")
            .map((s) => {
              const labelMap: Record<string, string> = {
                buffalo: "Cape Buffalo",
                leopard: "Leopard",
                kudu: "Greater Kudu",
                sable: "Sable Antelope",
                eland: "Eland",
                warthog: "Warthog",
              };
              return labelMap[s] || s;
            })
            .join(", ")
        : "";

      const tierLabels: Record<string, string> = {
        none: "Non-member",
        tracker: "Tracker",
        ph: "Professional Hunter",
        legacy: "Legacy",
      };
      const tierLabel = tier ? tierLabels[tier] || tier : "";

      const summaryParts = [
        "Estimate Details:",
        concession ? `- Concession: ${concession.charAt(0).toUpperCase() + concession.slice(1)}` : "",
        days ? `- Duration: ${days} days` : "",
        hunters ? `- Party size: ${hunters} hunter(s)` : "",
        speciesLabels ? `- Selected species: ${speciesLabels}` : "",
        tierLabel ? `- Membership tier: ${tierLabel}` : "",
        charter ? `- Private bush charter: ${charter === "true" ? "Yes" : "No"}` : "",
        total ? `- Estimated Total: $${parseInt(total).toLocaleString("en-US")}` : "",
      ].filter(Boolean);

      setMore(summaryParts.join("\n"));
    }
  }, []);

  const getContent = (key: string, fallback: string) => {
    return content?.[key] ?? fallback;
  };

  const campImage = resolveImage(getContent("contact.hero.image", "campNight"));

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
        <img src={campImage} alt="Contact banner" className="absolute inset-0 w-full h-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-bone">
          <Eyebrow light>{getContent("contact.hero.eyebrow", t("contact.hero.eyebrow", "Plan your expedition"))}</Eyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-7xl max-w-4xl leading-[0.95] text-bone">
            {getContent("contact.hero.title_normal", t("contact.hero.title_normal", "Book your "))}
            <span className="italic font-serif text-accent">{getContent("contact.hero.title_italic", t("contact.hero.title_italic", "safari."))}</span>
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
              <div className="text-[10px] tracking-[0.4em] uppercase text-accent mb-2">{getContent("contact.form.eyebrow", t("contact.form.eyebrow", "Inquiry"))}</div>
              <h3 className="font-display text-2xl text-forest mb-8">{getContent("contact.form.title", t("contact.form.title", "Tell us what you seek."))}</h3>

              {sent ? (
                <div className="py-16 text-center">
                  <div className="font-display text-3xl text-ember">{getContent("contact.form.success_title", t("contact.form.success_title", "Karibu."))}</div>
                  <p className="mt-3 font-serif text-lg text-foreground/75">{getContent("contact.form.success_body", t("contact.form.success_body", "Your message is on its way to camp. We'll be in touch shortly."))}</p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <Field label={t("contact.form.name", "Name")} name="name" required value={name} onChange={setName} />
                    <Field label={t("contact.form.email", "Email")} name="email" type="email" required value={email} onChange={setEmail} />
                  </div>
                  <Field label={t("contact.form.country", "Country")} name="country" value={country} onChange={setCountry} />

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">{t("contact.form.date", "Preferred start date")}</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className={cn(
                              "w-full inline-flex items-center justify-between bg-transparent border border-input px-4 py-3 font-serif text-lg",
                              !date && "text-muted-foreground",
                            )}
                          >
                            {date ? format(date, "PPP") : t("contact.form.pickDate", "Pick a date")}
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
                      <label className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">{t("contact.form.interest", "Interest")}</label>
                      <select
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        className="w-full bg-transparent border border-input px-4 py-3 font-serif text-lg focus:outline-none focus:border-ember"
                      >
                        <option value="The Selous Classic">{t("contact.form.interest_option1", "The Selous Classic")}</option>
                        <option value="Maasai Steppe Plains">{t("contact.form.interest_option2", "Maasai Steppe Plains")}</option>
                        <option value="Iringa Highlands">{t("contact.form.interest_option3", "Iringa Highlands")}</option>
                        <option value="Club Membership">{t("contact.form.interest_option4", "Club Membership")}</option>
                        <option value="Other">{t("contact.form.interest_option5", "Other")}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">{t("contact.form.more", "Tell us more")}</label>
                    <textarea
                      rows={5}
                      maxLength={2000}
                      value={more}
                      onChange={(e) => setMore(e.target.value)}
                      className="w-full bg-transparent border border-input px-4 py-3 font-serif text-lg focus:outline-none focus:border-ember"
                      placeholder={t("contact.form.placeholder", "Quarry, party size, anything we should know…")}
                    />
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button type="submit" className="inline-flex items-center gap-2 px-8 py-4 bg-forest text-bone tracking-[0.3em] text-[11px] uppercase hover:bg-ember transition">
                      {t("contact.form.send", "Send inquiry")} <ArrowRight className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={startCheckout}
                      disabled={payState === "loading"}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground tracking-[0.3em] text-[11px] uppercase hover:bg-ember hover:text-bone transition disabled:opacity-60"
                    >
                      {payState === "loading"
                        ? <><Loader2 className="h-4 w-4 animate-spin" /> {t("contact.form.preparing", "Preparing…")}</>
                        : <><CreditCard className="h-4 w-4" /> {t("contact.form.reserve", "Reserve with $1500 deposit")}</>}
                    </button>
                  </div>
                  {payState === "error" && (
                    <p className="text-sm text-ember font-serif italic">{payMsg}</p>
                  )}
                  <p className="text-[11px] text-muted-foreground font-serif italic">
                    {t("contact.form.footnote", "Deposit is fully credited against your safari balance. Refundable until 120 days before departure.")}
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
                <div className="text-[10px] tracking-[0.4em] uppercase text-accent mb-3">{getContent("contact.office.title", t("contact.office.title", "Office"))}</div>
                <ul className="space-y-3 font-serif text-base">
                  <li className="flex gap-3"><MapPin className="h-4 w-4 text-ember mt-1 shrink-0" /> {getContent("contact.office.address", t("contact.office.address", "Losirva, Esilalei, Monduli — Tanzania"))}</li>
                  <li className="flex gap-3"><Phone className="h-4 w-4 text-ember mt-1 shrink-0" /> {getContent("contact.office.phone", t("contact.office.phone", "+255 763 075 130"))}</li>
                  <li className="flex gap-3"><Mail className="h-4 w-4 text-ember mt-1 shrink-0" /> {getContent("contact.office.email", t("contact.office.email", "info@top-trackers.com"))}</li>
                </ul>
                <div className="mt-5 pt-4 border-t border-border">
                  <div className="text-[10px] tracking-[0.4em] uppercase text-accent mb-2">{getContent("contact.camp.title", t("contact.camp.title", "Base Camp"))}</div>
                  <div className="font-serif text-sm text-foreground/75">{getContent("contact.camp.body", t("contact.camp.body", "on the bank of Njombe River"))}</div>
                  <div className="mt-1 text-[11px] tracking-[0.18em] text-muted-foreground">{getContent("contact.camp.coordinates", t("contact.camp.coordinates", "6°54′21.0″S · 34°59′14.8″E"))}</div>
                </div>
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
