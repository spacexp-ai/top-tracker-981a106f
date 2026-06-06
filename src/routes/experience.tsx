import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { ArrowRight, Calendar, MapPin, Users, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { photos } from "@/assets/photos";
const experience = photos.hunterValley;
const camp = photos.campAerial;
const wildlife = photos.elephant;
import { EstimatorEmbed } from "@/components/EstimatorEmbed";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "The Experience — Top Trackers" },
      { name: "description", content: "Curated safari hunting expeditions across Tanzania's most storied concessions — PH-led, ethical, and unforgettable." },
      { property: "og:title", content: "The Experience — Top Trackers" },
      { property: "og:description", content: "Curated safari hunting expeditions across Tanzania." },
      { property: "og:image", content: experience },
    ],
  }),
  component: Experience,
});

const expeditions = [
  {
    name: "The Selous Classic",
    days: "14 days",
    season: "Jun – Oct",
    party: "1–2 hunters",
    species: "Buffalo · Leopard · Sable · Kudu",
    body: "Riverine forest, hippo pools, and the slow, patient art of dangerous-game tracking in Africa's largest game reserve.",
    image: wildlife,
    concession: "selous",
  },
  {
    name: "Maasai Steppe Plains",
    days: "10 days",
    season: "May – Sep",
    party: "1–3 hunters",
    species: "Plains game · Gerenuk · Lesser Kudu",
    body: "Open thornveld, Maasai trackers, and dawn drives through some of the richest plains-game country in East Africa.",
    image: experience,
    concession: "maasai",
  },
  {
    name: "Iringa Highlands",
    days: "7 days",
    season: "Jul – Nov",
    party: "1–2 hunters",
    species: "Eland · Sable · Roan · Mountain Reedbuck",
    body: "Cool miombo woodland and high ridgelines. A connoisseur's hunt — quieter, slower, and rare in feel.",
    image: camp,
    concession: "iringa",
  },
];

function Experience() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <section className="relative h-[70svh] bg-ink overflow-hidden">
        <img src={experience} alt="" className="absolute inset-0 w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-bone">
          <Eyebrow light>The Experience</Eyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-8xl max-w-5xl leading-[0.95]">
            Shaped by <span className="italic font-serif text-accent">patience.</span>
          </h1>
        </div>
      </section>

      <section className="paper-bg py-28">
        <div className="mx-auto max-w-7xl px-6 space-y-32">
          {expeditions.map((e, i) => (
            <Reveal key={e.name}>
              <article className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className="relative">
                  <img src={e.image} alt={e.name} loading="lazy" className="w-full aspect-[5/4] object-cover" style={{ boxShadow: "var(--shadow-vintage)" }} />
                  <div className="absolute top-4 left-4 bg-ink/80 text-bone px-4 py-2 font-display text-xs tracking-[0.3em]">
                    EXPEDITION 0{i + 1}
                  </div>
                </div>
                <div>
                  <h2 className="font-display text-4xl md:text-5xl text-forest leading-tight">{e.name}</h2>
                  <p className="mt-6 font-serif text-xl text-foreground/75">{e.body}</p>
                  <div className="mt-8 grid grid-cols-3 gap-4 text-xs tracking-[0.2em] uppercase">
                    <div><Calendar className="h-4 w-4 text-ember mb-2" /><div className="text-muted-foreground">Duration</div><div className="mt-1">{e.days}</div></div>
                    <div><MapPin className="h-4 w-4 text-ember mb-2" /><div className="text-muted-foreground">Season</div><div className="mt-1">{e.season}</div></div>
                    <div><Users className="h-4 w-4 text-ember mb-2" /><div className="text-muted-foreground">Party</div><div className="mt-1">{e.party}</div></div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Quarry</div>
                    <div className="font-serif text-lg text-foreground">{e.species}</div>
                  </div>
                  <button
                    onClick={() => setOpen(e.concession)}
                    className="inline-flex items-center gap-2 mt-8 text-forest border-b border-forest/40 hover:text-ember hover:border-ember transition pb-1 font-serif text-lg"
                  >
                    Inquire about this expedition <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
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
                <p className="mt-3 font-serif text-base text-foreground/70 max-w-2xl">
                  Adjust concession, duration, quarry, and your membership tier. Then send your inquiry with the estimate attached.
                </p>
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
