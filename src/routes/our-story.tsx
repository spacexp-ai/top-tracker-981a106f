import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { photos } from "@/assets/photos";
import map from "@/assets/map-texture.jpg";
import { useSiteContent, resolveImage } from "@/hooks/useSiteContent";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our Story — Top Trackers" },
      { name: "description", content: "More than a hunt — a legacy. The story, ethics, and conservation heritage behind Top Trackers, in the heart of Tanzania." },
      { property: "og:title", content: "Our Story — Top Trackers" },
      { property: "og:description", content: "The legacy and ethics behind Africa's premier hunting club." },
      { property: "og:image", content: photos.acaciaSunset },
    ],
  }),
  component: OurStory,
});

function OurStory() {
  const { t } = useTranslation();
  const { data: content } = useSiteContent();

  const getContent = (key: string, fallback: string) => {
    return content?.[key] ?? fallback;
  };

  const heroImage = resolveImage(getContent("ourstory.hero.image", "acaciaSunset"));

  const timeline = [
    {
      year: getContent("ourstory.timeline.1.year", t("ourstory.timeline.1.year", "2023")),
      title: getContent("ourstory.timeline.1.title", t("ourstory.timeline.1.title", "First fire")),
      image: resolveImage(getContent("ourstory.timeline.1.image", "timeline2023")),
      body: getContent("ourstory.timeline.1.body", t("ourstory.timeline.1.body", "Top Trackers is founded by a small circle of Tanzanian PHs and European hunters seeking a quieter, more ethical way to hunt.")),
    },
    {
      year: getContent("ourstory.timeline.2.year", t("ourstory.timeline.2.year", "2024")),
      title: getContent("ourstory.timeline.2.title", t("ourstory.timeline.2.title", "The concessions")),
      image: resolveImage(getContent("ourstory.timeline.2.image", "vintageLeopard")),
      body: getContent("ourstory.timeline.2.body", t("ourstory.timeline.2.body", "Long-term stewardship agreements signed across three legendary concessions in the Selous, Maasai Steppe and Iringa highlands.")),
    },
    {
      year: getContent("ourstory.timeline.3.year", t("ourstory.timeline.3.year", "2025")),
      title: getContent("ourstory.timeline.3.title", t("ourstory.timeline.3.title", "The camp")),
      image: resolveImage(getContent("ourstory.timeline.3.image", "campNight")),
      body: getContent("ourstory.timeline.3.body", t("ourstory.timeline.3.body", "Our Base camp opens — canvas, brass, and lantern light, built with local Maasai craftsmen.")),
    },
    {
      year: getContent("ourstory.timeline.4.year", t("ourstory.timeline.4.year", "2026")),
      title: getContent("ourstory.timeline.4.title", t("ourstory.timeline.4.title", "The club")),
      image: resolveImage(getContent("ourstory.timeline.4.image", "phWalking")),
      body: getContent("ourstory.timeline.4.body", t("ourstory.timeline.4.body", "Membership opens to a limited circle of trackers, professional hunters, and legacy patrons.")),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <section className="relative h-[75svh] bg-ink overflow-hidden">
        <img src={heroImage} alt="Hero image" width={1400} height={1600} className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-bone">
          <Eyebrow light>{getContent("ourstory.hero.eyebrow", t("ourstory.hero.eyebrow", "Our story"))}</Eyebrow>
          <h1 className="mt-8 font-display text-5xl md:text-8xl max-w-5xl leading-[0.95]">
            {getContent("ourstory.hero.title_line1", t("ourstory.hero.title_line1", "More than a hunt."))}<br />
            <span className="italic font-serif text-accent">{getContent("ourstory.hero.title_line2", t("ourstory.hero.title_line2", "A legacy."))}</span>
          </h1>
          <p className="mt-8 font-serif text-2xl text-bone/80 max-w-2xl">
            {getContent("ourstory.hero.subtitle", t("ourstory.hero.subtitle", "The ethics of modern safari hunting, written in patience."))}
          </p>
        </div>
      </section>

      <section className="relative paper-bg py-32">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `url(${map})`, backgroundSize: "cover" }} />
        <div className="relative mx-auto max-w-3xl px-6 font-serif text-xl leading-relaxed text-foreground/85 space-y-8">
          <Reveal>
            <p className="text-3xl text-forest font-display tracking-wide">
              {getContent("ourstory.intro.highlight", t("ourstory.intro.highlight", "We aim to provide world-class hunting experiences that directly contribute to wildlife conservation and local community development."))}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              {getContent("ourstory.intro.body1", t("ourstory.intro.body1", "Every expedition with Top Trackers is crafted to deliver not just a hunt, but a transformative journey into the heart of wild Africa. Our work begins long before the first dawn drive — with the elders of the villages around our concessions, with the rangers and trackers who know each ridge by name, and with the biologists who shape our quotas year by year."))}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p>
              {getContent("ourstory.intro.body2", t("ourstory.intro.body2", "Modern hunting, done well, is not the opposite of conservation — it is one of its most powerful instruments. A percentage of every safari we run is returned to the land: anti-poaching units, water boreholes, school roofs, and game counts."))}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="italic text-ember">
              {getContent("ourstory.intro.callout", t("ourstory.intro.callout", "This is the Top Tracker's way. Slow, considered, and quietly proud."))}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-ink text-bone py-32 relative grain">
        <div className="relative mx-auto max-w-5xl px-6">
          <Reveal><Eyebrow light>{getContent("ourstory.timeline.eyebrow", t("ourstory.timeline.eyebrow", "The trail so far"))}</Eyebrow></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl md:text-5xl mb-16">
              {getContent("ourstory.timeline.title", t("ourstory.timeline.title", "A short, deliberate history."))}
            </h2>
          </Reveal>
          <div className="relative pl-8 md:pl-0">
            <div className="absolute left-2 md:left-1/2 top-0 bottom-0 w-px bg-accent/30" />
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.08}>
                <div className={`group relative mb-24 md:grid md:grid-cols-2 gap-12 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                  <div className={`md:text-right ${i % 2 ? "md:text-left" : ""}`}>
                    <div className="font-display text-5xl text-accent transition-colors duration-500 group-hover:text-ember">{t.year}</div>
                  </div>
                  <div className="relative">
                    <h3 className="font-display text-2xl tracking-[0.15em] uppercase">{t.title}</h3>
                    <p className="mt-3 font-serif text-lg text-bone/75 transition-colors duration-500 group-hover:text-bone">{t.body}</p>
                    
                    {/* Hover Image */}
                    <div className={`absolute top-full mt-8 w-full max-w-md aspect-[4/3] overflow-hidden opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 z-10 hidden md:block ${i % 2 ? "right-0 origin-top-right" : "left-0 origin-top-left"}`}>
                      <img src={t.image} alt={t.year} className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 border border-accent/30" />
                    </div>
                  </div>
                  <div className="absolute left-0 md:left-1/2 top-3 -translate-x-1/2 h-3 w-3 rotate-45 bg-ember transition-transform duration-500 group-hover:scale-[1.7] group-hover:bg-accent" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="paper-bg py-28 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl text-forest">
              {getContent("ourstory.footer.title", t("ourstory.footer.title", "Walk the trail with us."))}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/membership" className="inline-flex items-center gap-2 mt-10 px-8 py-4 bg-forest text-bone tracking-[0.3em] text-[11px] uppercase hover:bg-ember transition">
              {t("ourstory.footer.explore", "Explore Membership")} <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
