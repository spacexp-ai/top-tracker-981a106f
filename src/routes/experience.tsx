import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { ArrowRight, ArrowLeft, Calendar, MapPin, Users, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { photos } from "@/assets/photos";
import { EstimatorEmbed } from "@/components/EstimatorEmbed";

const heroImg = photos.hunterValley;

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "The Experience — Top Trackers" },
      { name: "description", content: "Curated safari hunting expeditions across Tanzania's most storied concessions — PH-led, ethical, and unforgettable." },
      { property: "og:title", content: "The Experience — Top Trackers" },
      { property: "og:description", content: "Curated safari hunting expeditions across Tanzania." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Experience,
});

type Expedition = {
  num: string;
  title: string;
  desc: string;
  duration: string;
  season: string;
  party: string;
  quarry: string;
  cta: string;
  image: string;
  concession: string;
};

const expeditions: Expedition[] = [
  {
    num: "Expedition 01",
    title: "The Selous Classic",
    desc: "Riverine forest, hippo pools, and the slow patient art of dangerous-game tracking in Africa's largest game reserve.",
    duration: "14 days",
    season: "Jun – Oct",
    party: "1–2 hunters",
    quarry: "Buffalo · Leopard · Sable · Kudu",
    cta: "Inquire",
    image: photos.buffalo,
    concession: "selous",
  },
  {
    num: "Expedition 02",
    title: "Maasai Steppe Plains",
    desc: "Open thornveld, Maasai trackers, and dawn drives through the richest plains-game country in East Africa.",
    duration: "10 days",
    season: "May – Sep",
    party: "1–3 hunters",
    quarry: "Plains game · Gerenuk · Lesser Kudu",
    cta: "Inquire",
    image: photos.acaciaSunset,
    concession: "maasai",
  },
  {
    num: "Expedition 03",
    title: "Iringa Highlands",
    desc: "Cool miombo woodland and high ridgelines. A connoisseur's hunt — quieter, slower, and rare in feel.",
    duration: "7 days",
    season: "Jul – Nov",
    party: "1–2 hunters",
    quarry: "Eland · Sable · Roan · Mountain Reedbuck",
    cta: "Inquire",
    image: photos.hunterValley,
    concession: "iringa",
  },
  {
    num: "Expedition 04",
    title: "Design your expedition.",
    desc: "Tell us your quarry, your timeline, your party. Our professional hunters build the chase entirely around you — concession, season, and method.",
    duration: "Your call",
    season: "Year-round",
    party: "Any size",
    quarry: "Discuss with your PH",
    cta: "Speak to a PH",
    image: photos.phWalking,
    concession: "bespoke",
  },
];

const timeline = [
  { num: "01 — Plan", title: "Plan", image: photos.guideJeep, desc: "Speak with a PH. We match you to a concession, season, and party size. Permits and logistics follow." },
  { num: "02 — Arrive", title: "Arrive", image: photos.bushPlane, desc: "Charter flight to the bush strip. Camp is ready. Tracking begins at first light the next morning." },
  { num: "03 — Track", title: "Track", image: photos.phWalking, desc: "Days in the field with your PH and Maasai scouts. Patience, craft, and the land doing the teaching." },
  { num: "04 — Return", title: "Return", image: photos.vintageZebra, desc: "Trophies documented and shipped. CITES handled. You leave with the story; we handle everything else." },
];

const services = [
  {
    title: "Before you arrive",
    items: [
      "CITES & firearms import permits",
      "Tanzania hunting licence procurement",
      "Specialist travel insurance brokerage",
      "Visa & entry documentation",
      "Pre-hunt briefing with your PH",
    ],
  },
  {
    title: "In the field",
    items: [
      "PH-led dangerous & plains game hunts",
      "Native Maasai & Wagogo scout teams",
      "Bird hunting — sandgrouse & francolin",
      "Bow hunting expeditions",
      "Photography safaris, no rifle required",
      "Charter flights between concessions",
    ],
  },
  {
    title: "After the hunt",
    items: [
      "Trophy field preparation & skinning",
      "Taxidermy referral network",
      "CITES export documentation",
      "Worldwide trophy shipping concierge",
      "Trophy room design consulting",
      "Conservation levy reporting",
    ],
  },
];

function Experience() {
  const [cur, setCur] = useState(0);
  const [open, setOpen] = useState<string | null>(null);

  const go = (n: number) => setCur((n + expeditions.length) % expeditions.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setCur((c) => (c + 1) % expeditions.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      {/* HERO */}
      <section className="relative h-[60svh] bg-ink overflow-hidden">
        <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-65" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/25 to-ink" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-bone">
          <Eyebrow light>The Experience</Eyebrow>
          <h1 className="mt-6 font-display italic text-5xl md:text-7xl max-w-5xl leading-[0.95]">
            Shaped by <span className="text-accent">patience.</span>
          </h1>
          <div className="mt-8 h-px w-12 bg-accent/50" />
        </div>
      </section>

      {/* EXPEDITIONS CAROUSEL */}
      <section className="paper-bg py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-[10px] tracking-[0.3em] uppercase text-accent mb-8">Expeditions</p>
          </Reveal>

          <div className="relative overflow-hidden border border-accent/25">
            <div
              className="flex"
              style={{
                transform: `translateX(-${cur * 100}%)`,
                transition: "transform 0.45s cubic-bezier(.4,0,.2,1)",
              }}
            >
              {expeditions.map((e, i) => (
                <article key={e.num} className="min-w-full grid md:grid-cols-[40%_60%]">
                  <div className="bg-ink relative aspect-[4/3] md:aspect-auto md:min-h-[420px] overflow-hidden">
                    <img src={e.image} alt={e.title} loading={i === 0 ? "eager" : "lazy"} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-between bg-card">
                    <div>
                      <p className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-2">{e.num}</p>
                      <h3 className="font-display text-3xl md:text-4xl text-forest leading-tight">{e.title}</h3>
                      <p className="mt-4 font-serif text-lg text-foreground/75 leading-relaxed">{e.desc}</p>
                      <div className="mt-7 grid grid-cols-2 gap-y-4 gap-x-8">
                        <Meta icon={Calendar} label="Duration" value={e.duration} />
                        <Meta icon={MapPin} label="Season" value={e.season} />
                        <Meta icon={Users} label="Party" value={e.party} />
                        <div className="col-span-2">
                          <div className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-1">Quarry</div>
                          <div className="font-serif text-base text-foreground">{e.quarry}</div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setOpen(e.concession)}
                      className="mt-8 self-start inline-flex items-center gap-2 px-5 py-3 border border-accent/40 text-accent tracking-[0.18em] text-[11px] uppercase hover:bg-[rgba(210,185,140,0.06)] transition"
                    >
                      {e.cta} <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div className="flex gap-2 items-center">
              {expeditions.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setCur(i)}
                  className={`h-px transition-all ${i === cur ? "w-8 bg-accent" : "w-5 bg-accent/30 hover:bg-accent/60"}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <Arrow onClick={() => go(cur - 1)} label="Previous expedition"><ArrowLeft className="h-4 w-4" /></Arrow>
              <Arrow onClick={() => go(cur + 1)} label="Next expedition"><ArrowRight className="h-4 w-4" /></Arrow>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="paper-bg pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-[10px] tracking-[0.3em] uppercase text-accent mb-8">How the hunt works</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 border border-accent/20">
            {timeline.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.08}>
                <div className={`h-full ${i < 3 ? "lg:border-r" : ""} border-accent/15`}>
                  <div className="aspect-square bg-ink relative overflow-hidden group">
                    <div className="absolute inset-0 bg-ink/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <img src={t.image} alt={t.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <p className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-1.5">{t.num}</p>
                    <h3 className="font-display text-xl text-forest">{t.title}</h3>
                    <p className="mt-2 font-serif text-sm text-foreground/65 leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="paper-bg pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-baseline justify-between mb-8 flex-wrap gap-3">
            <h2 className="font-display text-3xl md:text-4xl text-forest">What we arrange for you</h2>
            <span className="font-serif italic text-sm text-muted-foreground">From first enquiry to final shipment</span>
          </div>
          <div className="grid md:grid-cols-3 border border-accent/25">
            {services.map((s, i) => (
              <div key={s.title} className={`p-7 ${i < 2 ? "md:border-r" : ""} border-accent/15`}>
                <p className="text-[10px] tracking-[0.28em] uppercase text-accent pb-3 mb-4 border-b border-accent/15">{s.title}</p>
                <ul className="space-y-2.5">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-3 text-sm text-foreground/75 font-serif">
                      <span className="mt-2 h-1 w-1 rounded-full bg-accent/60 shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RIFLE & EQUIPMENT RENTAL */}
      <section className="paper-bg pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="border border-accent/20 bg-card overflow-hidden">
              <div className="grid md:grid-cols-[1fr_1fr]">
                <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-accent mb-4">Equipment & Gear</p>
                  <h2 className="font-display italic text-3xl md:text-4xl text-forest leading-tight mb-6">
                    Rifle Rental.
                  </h2>
                  <p className="font-serif text-base text-foreground/75 leading-relaxed mb-6">
                    Travelling with firearms is increasingly complex. We maintain an immaculate armory in camp for our clients to use. Our collection includes scoped large-calibre rifles specifically suited to African dangerous and plains game.
                  </p>
                  <ul className="space-y-3 font-serif text-sm text-foreground/70 mb-8">
                    <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-ember shrink-0" />.375 H&H Magnum for general dangerous game</li>
                    <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-ember shrink-0" />.416 Rigby for heavy cover buffalo and elephant</li>
                    <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-ember shrink-0" />.300 Win Mag for longer plains game shots</li>
                  </ul>
                  <p className="font-serif italic text-sm text-muted-foreground border-l border-accent/50 pl-4">
                    All rental rifles are sighted-in upon your arrival at camp. Premium ammunition is supplied per round.
                  </p>
                </div>
                <div className="bg-ink relative min-h-[300px]">
                  <img src={photos.gearAmmo} alt="Rifles and Ammunition" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-r from-card to-transparent w-1/4 hidden md:block" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CAMP + CONCESSION */}
      <section className="paper-bg pb-20">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className="bg-card border border-accent/20 overflow-hidden h-full flex flex-col">
              <div className="aspect-[16/9] bg-ink relative">
                <img src={photos.campAerial} alt="Camp at Esilalei" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <p className="text-[10px] tracking-[0.22em] uppercase text-accent mb-2">The Camp</p>
                <h3 className="font-display italic text-2xl md:text-3xl text-forest leading-tight">
                  Bring a partner.<br />The camp is half the experience.
                </h3>
                <p className="mt-4 font-serif text-base text-foreground/70 leading-relaxed">
                  Partners, photographers, and non-hunting guests are welcome. Canvas tents, copper basins, open-fire kitchen, and a long table where stories outlive the embers.
                </p>
                <ul className="mt-5 space-y-2 text-sm text-foreground/75 font-serif">
                  <li className="flex gap-3"><span className="mt-2 h-1 w-1 rounded-full bg-accent/60 shrink-0" />Full-board tented accommodation</li>
                  <li className="flex gap-3"><span className="mt-2 h-1 w-1 rounded-full bg-accent/60 shrink-0" />Private camp buyout available</li>
                  <li className="flex gap-3"><span className="mt-2 h-1 w-1 rounded-full bg-accent/60 shrink-0" />Non-hunting guest packages</li>
                </ul>
                <Link to="/contact" className="mt-6 self-start inline-flex items-center gap-2 px-5 py-3 border border-accent/40 text-accent tracking-[0.18em] text-[11px] uppercase hover:bg-[rgba(210,185,140,0.06)] transition">
                  Enquire about camp <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-card border border-accent/20 overflow-hidden h-full flex flex-col">
              <div className="aspect-[16/9] bg-ink relative">
                <img src={photos.elephant} alt="Private concession near Ruaha" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <p className="text-[10px] tracking-[0.22em] uppercase text-accent mb-2">The Concession</p>
                <h3 className="font-display italic text-2xl md:text-3xl text-forest leading-tight">
                  Near Ruaha National Park.
                </h3>
                <p className="mt-4 font-serif text-base text-foreground/70 leading-relaxed">
                  A hunting block near Ruaha, renowned for big and dangerous game — Elephant, Cape Buffalo, Lion, Leopard. Ethical hunts, sustainable practices, tailored to your goals.
                </p>
                <ul className="mt-5 space-y-2 text-sm text-foreground/75 font-serif">
                  <li className="flex gap-3"><span className="mt-2 h-1 w-1 rounded-full bg-accent/60 shrink-0" />Elephant, Cape Buffalo, Lion, Leopard</li>
                  <li className="flex gap-3"><span className="mt-2 h-1 w-1 rounded-full bg-accent/60 shrink-0" />Kudu, plains game, iconic predators</li>
                  <li className="flex gap-3"><span className="mt-2 h-1 w-1 rounded-full bg-accent/60 shrink-0" />Expertly guided, conservation-focused</li>
                </ul>
                <Link to="/conservation" className="mt-6 self-start inline-flex items-center gap-2 px-5 py-3 border border-accent/40 text-accent tracking-[0.18em] text-[11px] uppercase hover:bg-[rgba(210,185,140,0.06)] transition">
                  Explore concession <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LOGISTICS BAND */}
      <section className="paper-bg pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between gap-6 flex-wrap py-6 border-t border-b border-accent/15">
            <p className="font-serif italic text-base md:text-lg text-foreground/65 max-w-2xl leading-relaxed">
              "We handle the permits, CITES paperwork, charter flights, and trophy shipment. You carry the rifle. We carry everything else."
            </p>
            <Link
              to="/hunting-services"
              className="text-[11px] tracking-[0.22em] uppercase text-accent border-b border-accent/30 hover:border-accent pb-1 whitespace-nowrap"
            >
              Full hunting services ↗
            </Link>
          </div>
        </div>
      </section>

      {/* Estimator modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-ink/80 backdrop-blur-sm p-4 md:p-8 overflow-y-auto"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="mx-auto max-w-6xl bg-background paper-bg border border-accent/40 p-6 md:p-10 my-8 relative"
            >
              <button
                aria-label="Close"
                onClick={() => setOpen(null)}
                className="absolute top-4 right-4 p-2 text-foreground/60 hover:text-ember transition"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="mb-6">
                <Eyebrow>Inquiry — live estimate</Eyebrow>
                <h3 className="mt-3 font-display text-3xl md:text-4xl text-forest">
                  Cost the chase, <span className="italic font-serif text-ember">before you write.</span>
                </h3>
              </div>
              <EstimatorEmbed defaultConcession={open} />
              <div className="mt-6 text-center">
                <Link
                  to="/contact"
                  onClick={() => setOpen(null)}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-forest text-bone tracking-[0.3em] text-[11px] uppercase hover:bg-ember transition"
                >
                  Continue to inquiry <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SiteFooter />
    </div>
  );
}

function Meta({ icon: Icon, label, value }: { icon: typeof Calendar; label: string; value: string }) {
  return (
    <div>
      <Icon className="h-4 w-4 text-ember mb-1.5" />
      <div className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground">{label}</div>
      <div className="mt-0.5 font-serif text-base text-foreground">{value}</div>
    </div>
  );
}

function Arrow({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="w-9 h-9 border border-accent/30 text-accent/70 flex items-center justify-center hover:border-accent hover:text-accent transition"
    >
      {children}
    </button>
  );
}
