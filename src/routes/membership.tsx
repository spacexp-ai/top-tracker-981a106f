import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { ArrowRight, Check, Crown } from "lucide-react";
import { photos } from "@/assets/photos";
const wildlife = photos.dinner;

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "Membership — Top Trackers Hunting Club" },
      { name: "description", content: "Three tiers of belonging in Top Trackers' invitation-only African hunting club. Tracker, Professional Hunter, and Legacy." },
      { property: "og:title", content: "Membership — Top Trackers" },
      { property: "og:description", content: "An invitation-only African hunting club with three tiers of belonging." },
    ],
  }),
  component: Membership,
});

const tiers = [
  {
    name: "Observer Pass",
    price: "Free",
    per: "guest",
    tag: "Walk in, no rifle",
    observer: true,
    perks: [
      "For guests, photographers, companions",
      "Experience camp, bush, and story — no rifle",
      "Full-board tented accommodation",
      "Shared camp activities at the long table",
      "Non-hunting concession access with a guide",
    ],
    cta: "Request Observer Pass",
  },
  {
    name: "Tracker",
    price: "$2,400",
    per: "annual",
    tag: "Begin the trail",
    perks: [
      "Private members' digital circle",
      "Quarterly field journal in print",
      "Early access to dated hunts & camps",
      "Two annual camp-table invitations",
      "10% guest rate on standard expeditions",
    ],
  },
  {
    name: "Professional Hunter",
    price: "$7,800",
    per: "annual",
    tag: "The trackers' tracker",
    featured: true,
    perks: [
      "Everything in Tracker",
      "Two reserved hunt windows / year",
      "Personal PH pairing for life",
      "Trophy concierge & worldwide shipment",
      "Off-season private camp residency",
      "Annual members' driven hunt weekend",
    ],
  },
  {
    name: "Legacy",
    price: "By invitation",
    per: "lifetime",
    tag: "The longest measure",
    perks: [
      "Everything in Professional Hunter",
      "Concession-naming rights",
      "Lifetime tented residence at Esilalei",
      "Seat on the conservation board",
      "Private charter game flights",
      "Family heir transferability",
    ],
  },
];

function Membership() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <section className="relative h-[60svh] bg-ink overflow-hidden">
        <img src={wildlife} alt="" width={1400} height={1600} className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/40 to-ink" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-bone">
          <Eyebrow light>The Hunting Club</Eyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-8xl max-w-5xl leading-[0.95]">
            Membership, <span className="italic font-serif text-accent">by invitation.</span>
          </h1>
          <p className="mt-8 font-serif text-2xl text-bone/80 max-w-2xl">
            Three tiers of belonging. Each opens doors deeper into the bush, the camp, and the community.
          </p>
        </div>
      </section>

      <section className="paper-bg py-28">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-6">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div className={`relative h-full p-10 border bg-card ${t.featured ? "border-ember md:-translate-y-6 shadow-[var(--shadow-vintage)]" : "border-border"} transition hover:-translate-y-1`}>
                {t.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ember text-bone px-4 py-1 text-[10px] tracking-[0.3em] uppercase">
                    Most chosen
                  </div>
                )}
                {t.featured && <Crown className="absolute top-6 right-6 h-5 w-5 text-ember" />}
                <div className="text-[10px] tracking-[0.4em] uppercase text-accent">{t.tag}</div>
                <h3 className="mt-3 font-display text-3xl tracking-[0.1em] uppercase text-forest">{t.name}</h3>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-4xl text-foreground">{t.price}</span>
                  <span className="text-muted-foreground text-sm tracking-widest uppercase">/ {t.per}</span>
                </div>
                <div className="mt-8 h-px bg-border" />
                <ul className="mt-8 space-y-3 text-sm text-foreground/85">
                  {t.perks.map((p) => (
                    <li key={p} className="flex gap-3"><Check className="h-4 w-4 text-ember shrink-0 mt-0.5" /><span>{p}</span></li>
                  ))}
                </ul>
                <Link to="/membership-apply" className={`mt-10 inline-flex w-full justify-center items-center gap-2 px-6 py-3.5 tracking-[0.3em] text-[11px] uppercase transition ${t.featured ? "bg-ember text-bone hover:bg-forest" : "border border-forest text-forest hover:bg-forest hover:text-bone"}`}>
                  Apply <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mx-auto max-w-3xl px-6 text-center mt-24">
          <Reveal>
            <p className="font-serif italic text-2xl text-foreground/70">
              All memberships are reviewed by the club's founding circle. We keep numbers small on purpose —
              the camp table is only so long.
            </p>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
