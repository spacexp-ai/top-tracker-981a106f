import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { ArrowRight } from "lucide-react";
import { photos } from "@/assets/photos";
const hero = photos.acaciaSunset;
import map from "@/assets/map-texture.jpg";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our Story — Top Trackers" },
      { name: "description", content: "More than a hunt — a legacy. The story, ethics, and conservation heritage behind Top Trackers, in the heart of Tanzania." },
      { property: "og:title", content: "Our Story — Top Trackers" },
      { property: "og:description", content: "The legacy and ethics behind Africa's premier hunting club." },
      { property: "og:image", content: hero },
    ],
  }),
  component: OurStory,
});

const timeline = [
  { year: "2023", title: "First fire", body: "Top Trackers is founded by a small circle of Tanzanian PHs and European hunters seeking a quieter, more ethical way to hunt." },
  { year: "2024", title: "The concessions", body: "Long-term stewardship agreements signed across three legendary concessions in the Selous, Maasai Steppe and Iringa highlands." },
  { year: "2025", title: "The camp", body: "Esilalei base camp opens — canvas, brass, and lantern light, built with local Maasai craftsmen." },
  { year: "2026", title: "The club", body: "Membership opens to a limited circle of trackers, professional hunters, and legacy patrons." },
];

function OurStory() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <section className="relative h-[75svh] bg-ink overflow-hidden">
        <img src={hero} alt="Lion at sunrise" width={1400} height={1600} className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-bone">
          <Eyebrow light>Our story</Eyebrow>
          <h1 className="mt-8 font-display text-5xl md:text-8xl max-w-5xl leading-[0.95]">
            More than a hunt.<br /><span className="italic font-serif text-accent">A legacy.</span>
          </h1>
          <p className="mt-8 font-serif text-2xl text-bone/80 max-w-2xl">
            The ethics of modern safari hunting, written in patience.
          </p>
        </div>
      </section>

      <section className="relative paper-bg py-32">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `url(${map})`, backgroundSize: "cover" }} />
        <div className="relative mx-auto max-w-3xl px-6 font-serif text-xl leading-relaxed text-foreground/85 space-y-8">
          <Reveal>
            <p className="text-3xl text-forest font-display tracking-wide">
              We aim to provide world-class hunting experiences that directly contribute to wildlife
              conservation and local community development.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              Every expedition with Top Trackers is crafted to deliver not just a hunt, but a transformative
              journey into the heart of wild Africa. Our work begins long before the first dawn drive —
              with the elders of the villages around our concessions, with the rangers and trackers who
              know each ridge by name, and with the biologists who shape our quotas year by year.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p>
              Modern hunting, done well, is not the opposite of conservation — it is one of its most
              powerful instruments. A percentage of every safari we run is returned to the land:
              anti-poaching units, water boreholes, school roofs, and game counts.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="italic text-ember">
              This is the Top Tracker's way. Slow, considered, and quietly proud.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-ink text-bone py-32 relative grain">
        <div className="relative mx-auto max-w-5xl px-6">
          <Reveal><Eyebrow light>The trail so far</Eyebrow></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl md:text-5xl mb-16">A short, deliberate history.</h2>
          </Reveal>
          <div className="relative pl-8 md:pl-0">
            <div className="absolute left-2 md:left-1/2 top-0 bottom-0 w-px bg-accent/30" />
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.08}>
                <div className={`relative mb-16 md:grid md:grid-cols-2 gap-12 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                  <div className={`md:text-right ${i % 2 ? "md:text-left" : ""}`}>
                    <div className="font-display text-5xl text-accent">{t.year}</div>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl tracking-[0.15em] uppercase">{t.title}</h3>
                    <p className="mt-3 font-serif text-lg text-bone/75">{t.body}</p>
                  </div>
                  <div className="absolute left-0 md:left-1/2 top-3 -translate-x-1/2 h-3 w-3 rotate-45 bg-ember" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="paper-bg py-28 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl text-forest">Walk the trail with us.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/membership" className="inline-flex items-center gap-2 mt-10 px-8 py-4 bg-forest text-bone tracking-[0.3em] text-[11px] uppercase hover:bg-ember transition">
              Explore Membership <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
