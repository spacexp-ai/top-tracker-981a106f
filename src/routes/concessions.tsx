import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { ArrowRight, MapPin, Calendar, Crosshair } from "lucide-react";
import { photos } from "@/assets/photos";
import map from "@/assets/map-texture.jpg";

export const Route = createFileRoute("/concessions")({
  head: () => ({
    meta: [
      { title: "Our Concessions — Top Trackers" },
      {
        name: "description",
        content:
          "Three TAWA-licenced hunting concessions across Tanzania — the Selous, Maasai Steppe, and Iringa Highlands. Ethical, fair-chase expeditions on private land.",
      },
      { property: "og:title", content: "Our Concessions — Top Trackers" },
      {
        property: "og:description",
        content:
          "Explore our three private hunting concessions across Tanzania's most storied wilderness.",
      },
      { property: "og:image", content: photos.elephant },
    ],
  }),
  component: Concessions,
});

const concessions = [
  {
    id: "selous",
    label: "Block I",
    title: "The Selous Classic",
    subtitle: "Selous Game Reserve, Southern Tanzania",
    description:
      "Africa's largest game reserve. Riverine forest, hippo pools, and the slow patient art of dangerous-game tracking. This is the original frontier — vast, wild, and unchanged since the days of Frederick Selous himself.",
    image: photos.buffalo,
    season: "Jun – Oct",
    size: "~120,000 acres",
    quarry: ["Buffalo", "Leopard", "Sable", "Kudu", "Wildebeest"],
    highlight: "Dangerous game specialist block",
    coords: "9°30′S 37°30′E",
  },
  {
    id: "maasai",
    label: "Block II",
    title: "Maasai Steppe Plains",
    subtitle: "Maasai Steppe, Northern Tanzania",
    description:
      "Open thornveld stretching to the horizon, cut by seasonal riverbeds and acacia groves. Hunt with Maasai trackers on some of the richest plains-game country in East Africa, where gerenuk and lesser kudu emerge at first light.",
    image: photos.acaciaSunset,
    season: "May – Sep",
    size: "~80,000 acres",
    quarry: ["Plains Game", "Gerenuk", "Lesser Kudu", "Oryx", "Fringe-eared Oryx"],
    highlight: "Plains game & specialist species",
    coords: "4°00′S 37°00′E",
  },
  {
    id: "iringa",
    label: "Block III",
    title: "Iringa Highlands",
    subtitle: "Iringa Region, Southern Highlands",
    description:
      "Cool miombo woodland and high ridgelines seldom visited by anyone but the most discerning hunters. A connoisseur's concession — quieter, slower, and rare in character. Roan and sable in their stronghold.",
    image: photos.hunterValley,
    season: "Jul – Nov",
    size: "~55,000 acres",
    quarry: ["Eland", "Sable", "Roan", "Mountain Reedbuck", "Klipspringer"],
    highlight: "Premier sable & roan block",
    coords: "8°30′S 35°00′E",
  },
];

function Concessions() {
  const { t } = useTranslation();

  const concessions = [
    {
      id: "selous",
      label: t("concessions_page.concessions.1.label", "Block I"),
      title: t("concessions_page.concessions.1.title", "The Selous Classic"),
      subtitle: t(
        "concessions_page.concessions.1.subtitle",
        "Selous Game Reserve, Southern Tanzania",
      ),
      description: t(
        "concessions_page.concessions.1.desc",
        "Africa's largest game reserve. Riverine forest, hippo pools, and the slow patient art of dangerous-game tracking.",
      ),
      image: photos.buffalo,
      season: t("concessions_page.concessions.1.season", "Jun – Oct"),
      size: t("concessions_page.concessions.1.size", "~120,000 acres"),
      quarry: ["Buffalo", "Leopard", "Sable", "Kudu", "Wildebeest"],
      highlight: t("concessions_page.concessions.1.highlight", "Dangerous game specialist block"),
      coords: "9°30′S 37°30′E",
    },
    {
      id: "maasai",
      label: t("concessions_page.concessions.2.label", "Block II"),
      title: t("concessions_page.concessions.2.title", "Maasai Steppe Plains"),
      subtitle: t("concessions_page.concessions.2.subtitle", "Maasai Steppe, Northern Tanzania"),
      description: t(
        "concessions_page.concessions.2.desc",
        "Open thornveld stretching to the horizon, cut by seasonal riverbeds and acacia groves.",
      ),
      image: photos.acaciaSunset,
      season: t("concessions_page.concessions.2.season", "May – Sep"),
      size: t("concessions_page.concessions.2.size", "~80,000 acres"),
      quarry: ["Plains Game", "Gerenuk", "Lesser Kudu", "Oryx", "Fringe-eared Oryx"],
      highlight: t("concessions_page.concessions.2.highlight", "Plains game & specialist species"),
      coords: "4°00′S 37°00′E",
    },
    {
      id: "iringa",
      label: t("concessions_page.concessions.3.label", "Block III"),
      title: t("concessions_page.concessions.3.title", "Iringa Highlands"),
      subtitle: t("concessions_page.concessions.3.subtitle", "Iringa Region, Southern Highlands"),
      description: t(
        "concessions_page.concessions.3.desc",
        "Cool miombo woodland and high ridgelines seldom visited by anyone but the most discerning hunters.",
      ),
      image: photos.hunterValley,
      season: t("concessions_page.concessions.3.season", "Jul – Nov"),
      size: t("concessions_page.concessions.3.size", "~55,000 acres"),
      quarry: ["Eland", "Sable", "Roan", "Mountain Reedbuck", "Klipspringer"],
      highlight: t("concessions_page.concessions.3.highlight", "Premier sable & roan block"),
      coords: "8°30′S 35°00′E",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* ── HERO ── */}
      <section className="relative h-[65svh] bg-ink overflow-hidden">
        <motion.div
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={photos.elephant}
            alt="Elephant in the concession"
            className="w-full h-full object-cover opacity-60"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/20 to-ink" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-bone">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Eyebrow light>
              {t("concessions_page.hero.eyebrow", "Tanzania · Three Licensed Blocks")}
            </Eyebrow>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-6 font-display text-[14vw] md:text-[8vw] leading-[0.92] max-w-5xl"
          >
            {t("concessions_page.hero.title_plain", "OUR ")}
            <span className="font-serif italic text-accent">
              {t("concessions_page.hero.title_italic", "Concessions.")}
            </span>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-8 h-px w-16 bg-accent/60"
          />
        </div>
      </section>

      {/* ── EDITORIAL INTRO ── */}
      <section className="relative paper-bg py-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url(${map})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <Eyebrow>{t("concessions_page.intro.eyebrow", "What is a Concession?")}</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-8 font-display text-4xl md:text-5xl text-forest leading-tight">
              {t("concessions_page.intro.title_plain", "Private land. ")}
              <span className="font-serif italic text-ember">
                {t("concessions_page.intro.title_italic", "Exclusive access.")}
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 font-serif text-xl leading-relaxed text-foreground/80">
              {t(
                "concessions_page.intro.body1",
                "A hunting concession is a legally designated wilderness block, licenced under Tanzania Wildlife Authority (TAWA) and managed exclusively by Top Trackers.",
              )}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-6 font-serif text-lg leading-relaxed text-foreground/65">
              {t(
                "concessions_page.intro.body2",
                "All three blocks are managed with annual game census, active anti-poaching patrols, and strict quota adherence.",
              )}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── CONCESSION CARDS ── */}
      <section className="bg-ink py-6 px-4 md:px-6">
        <div className="mx-auto max-w-7xl space-y-px">
          {concessions.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.08}>
              <article className="group grid md:grid-cols-2 overflow-hidden border border-accent/15 hover:border-accent/40 transition-colors duration-500">
                {/* Image */}
                <div
                  className={`relative aspect-[4/3] md:aspect-auto md:min-h-[460px] overflow-hidden ${
                    i % 2 === 1 ? "md:order-2" : ""
                  }`}
                >
                  <img
                    src={c.image}
                    alt={c.title}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                    style={{ transition: "transform 0.7s cubic-bezier(.4,0,.2,1)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  {/* Block label overlay */}
                  <div className="absolute bottom-6 left-6">
                    <span className="inline-block px-3 py-1 border border-accent/50 text-accent text-[10px] tracking-[0.4em] uppercase font-display">
                      {c.label}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div
                  className={`bg-card p-8 md:p-12 lg:p-16 flex flex-col justify-center ${
                    i % 2 === 1 ? "md:order-1" : ""
                  }`}
                >
                  <p className="text-[10px] tracking-[0.35em] uppercase text-accent mb-3">
                    {c.highlight}
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl text-forest leading-tight">
                    {c.title}
                  </h2>
                  <div className="flex items-center gap-2 mt-2 mb-5" data-subtitle>
                    <MapPin className="h-3.5 w-3.5 text-ember shrink-0" strokeWidth={1.5} />
                    <span className="font-serif italic text-sm text-foreground/60">
                      {c.subtitle}
                    </span>
                  </div>
                  <p className="font-serif text-base text-foreground/75 leading-relaxed">
                    {c.description}
                  </p>

                  {/* Meta row */}
                  <div className="mt-7 grid grid-cols-2 gap-5 border-t border-accent/10 pt-6">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <Calendar className="h-3.5 w-3.5 text-ember" strokeWidth={1.5} />
                        <span className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                          {t("concessions_page.labels.season", "Season")}
                        </span>
                      </div>
                      <p className="font-serif text-sm text-foreground">{c.season}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <MapPin className="h-3.5 w-3.5 text-ember" strokeWidth={1.5} />
                        <span className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                          {t("concessions_page.labels.size", "Block Size")}
                        </span>
                      </div>
                      <p className="font-serif text-sm text-foreground">{c.size}</p>
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Crosshair className="h-3.5 w-3.5 text-ember" strokeWidth={1.5} />
                        <span className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                          {t("concessions_page.labels.quarry", "Quarry")}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {c.quarry.map((q) => (
                          <span
                            key={q}
                            className="px-2.5 py-1 bg-ink/60 border border-accent/20 text-bone/70 text-[11px] tracking-[0.1em] font-display"
                          >
                            {q}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    search={{ concession: c.id }}
                    className="mt-8 self-start inline-flex items-center gap-2 px-6 py-3.5 bg-forest text-bone tracking-[0.25em] text-[11px] uppercase hover:bg-ember transition-colors duration-300"
                  >
                    {t("concessions_page.cta_enquire", "Enquire about this block")}{" "}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── MAP COORDINATES BAND ── */}
      <section className="paper-bg py-16">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="grid md:grid-cols-3 gap-px bg-accent/10">
              {concessions.map((c) => (
                <div key={c.id} className="bg-background p-6 text-center">
                  <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-2">
                    {c.label}
                  </p>
                  <p className="font-display text-xl text-forest">{c.title}</p>
                  <p className="mt-2 font-serif italic text-sm text-foreground/50">{c.coords}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CONSERVATION CTA ── */}
      <section className="relative bg-forest text-bone py-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url(${map})`, backgroundSize: "cover" }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <Eyebrow light>
              {t("concessions_page.conservation.eyebrow", "Conservation First")}
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl md:text-5xl leading-tight">
              {t("concessions_page.conservation.title_plain", "Every quota hunted. ")}
              <span className="font-serif italic text-accent">
                {t("concessions_page.conservation.title_italic", "Every animal counted.")}
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 font-serif text-lg text-bone/75 max-w-2xl mx-auto leading-relaxed">
              {t(
                "concessions_page.conservation.body",
                "Our concession management programme funds anti-poaching patrols, annual wildlife census, and direct revenue to the communities who live alongside these blocks.",
              )}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link
                to="/conservation"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground tracking-[0.3em] text-[11px] uppercase hover:bg-ember hover:text-bone transition"
              >
                {t("concessions_page.conservation.cta_conservation", "Our conservation work")}{" "}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 border border-bone/40 text-bone tracking-[0.3em] text-[11px] uppercase hover:border-accent hover:text-accent transition"
              >
                {t("concessions_page.conservation.cta_book", "Book an expedition")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
