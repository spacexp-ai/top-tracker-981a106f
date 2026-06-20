import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { ArrowRight, Tent, Flame, UtensilsCrossed, Star, Wind, Users } from "lucide-react";
import { photos } from "@/assets/photos";
import map from "@/assets/map-texture.jpg";

export const Route = createFileRoute("/camp")({
  head: () => ({
    meta: [
      { title: "Camp Life — Top Trackers" },
      { name: "description", content: "Full-service tented safari camp under the acacias. Canvas, brass, lantern light and an open-fire kitchen — the heart of the Top Trackers experience." },
      { property: "og:title", content: "Camp Life — Top Trackers" },
      { property: "og:description", content: "Canvas, brass, and lantern light. The Top Trackers camp beneath the acacias of Esilalei." },
      { property: "og:image", content: photos.campNight },
    ],
  }),
  component: Camp,
});

const amenities = [
  {
    Icon: Tent,
    title: "Canvas Tented Suites",
    body: "Hand-stitched canvas with brass fittings, proper beds with linen, and en-suite bucket shower. Hot water at dawn and dusk. Quiet enough to hear the nightjars.",
    image: photos.campDeck,
  },
  {
    Icon: Flame,
    title: "Open-Fire Kitchen",
    body: "Our camp chef cooks over hardwood coals. Three-course dinners in the bush, bush breakfasts before the track, and a tea tray delivered to your tent at first light.",
    image: photos.breakfast,
  },
  {
    Icon: UtensilsCrossed,
    title: "The Long Table",
    body: "Every evening the camp gathers at a single long table beneath the stars. Stories, single malt, and the low call of hyenas across the floodplain.",
    image: photos.dinner,
  },
  {
    Icon: Star,
    title: "Milky Way Nights",
    body: "No light pollution within 200 kilometres. The Southern Cross rises above camp every night. We keep a telescope on the deck — use it.",
    image: photos.milkyway,
  },
  {
    Icon: Wind,
    title: "Camp Deck & Bush Bar",
    body: "A raised teak deck faces the water pan. Sundowner hour is non-negotiable. Cold Kilimanjaro lagers and the day's stories while the game comes to drink.",
    image: photos.campAerial,
  },
  {
    Icon: Users,
    title: "Staff & Valet",
    body: "A dedicated camp manager, tracker team, and valet service. Your gear is cleaned, dried, and ready each morning. Nothing is too much to arrange.",
    image: photos.guideJeep,
  },
];

const galleryImages = [
  { src: photos.campAerial, alt: "Camp from above" },
  { src: photos.campDeck, alt: "Camp deck at sunset" },
  { src: photos.campNight, alt: "Camp at night under stars" },
  { src: photos.breakfast, alt: "Bush breakfast" },
  { src: photos.dinner, alt: "Long table dinner" },
  { src: photos.milkyway, alt: "Milky Way above camp" },
];

function Camp() {
  const { t } = useTranslation();

  const amenities = [
    { Icon: Tent,             title: t("camp_page.amenities.1.title", "Canvas Tented Suites"),  body: t("camp_page.amenities.1.body", "Hand-stitched canvas with brass fittings, proper beds with linen, and en-suite bucket shower."), image: photos.campDeck },
    { Icon: Flame,            title: t("camp_page.amenities.2.title", "Open-Fire Kitchen"),      body: t("camp_page.amenities.2.body", "Our camp chef cooks over hardwood coals."),                                                           image: photos.breakfast },
    { Icon: UtensilsCrossed,  title: t("camp_page.amenities.3.title", "The Long Table"),         body: t("camp_page.amenities.3.body", "Every evening the camp gathers at a single long table beneath the stars."),                           image: photos.dinner },
    { Icon: Star,             title: t("camp_page.amenities.4.title", "Milky Way Nights"),       body: t("camp_page.amenities.4.body", "No light pollution within 200 kilometres. The Southern Cross rises above camp every night."),          image: photos.milkyway },
    { Icon: Wind,             title: t("camp_page.amenities.5.title", "Camp Deck & Bush Bar"),   body: t("camp_page.amenities.5.body", "A raised teak deck faces the water pan. Sundowner hour is non-negotiable."),                         image: photos.campAerial },
    { Icon: Users,            title: t("camp_page.amenities.6.title", "Staff & Valet"),          body: t("camp_page.amenities.6.body", "A dedicated camp manager, tracker team, and valet service."),                                         image: photos.guideJeep },
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
          <video
            src="/media/camp-hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-65"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/15 to-ink" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-bone">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Eyebrow light>Esilalei, Northern Tanzania</Eyebrow>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-6 font-display text-[14vw] md:text-[8vw] leading-[0.92]"
          >
            CAMP{" "}
            <span className="font-serif italic text-accent">Life.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-6 font-serif text-lg text-bone/70 max-w-lg"
          >
            Canvas, brass, and lantern light. The chase is the reason — but the camp is the memory.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 h-px w-16 bg-accent/60"
          />
        </div>
      </section>

      {/* ── EDITORIAL INTRO ── */}
      <section className="relative paper-bg py-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: `url(${map})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="relative mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <Eyebrow>The Base Camp</Eyebrow>
              <h2 className="mt-6 font-display text-4xl md:text-5xl text-forest leading-tight">
                Home for the hunt.{" "}
                <span className="font-serif italic text-ember">Worth returning to.</span>
              </h2>
              <p className="mt-8 font-serif text-xl text-foreground/75 leading-relaxed">
                Our base camp sits beneath an acacia grove near Esilalei, in the heart of the northern Tanzanian
                wilderness. Hand-stitched canvas tents, copper basins, and a long dining table — the full-service
                tented camp that serious hunters remember for decades.
              </p>
              <p className="mt-5 font-serif text-lg text-foreground/65 leading-relaxed">
                This is not a lodge. It is a camp — built for the hunt, run with precision, and alive with the sounds
                of the bush from the moment you arrive to the moment you leave.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-forest text-bone tracking-[0.3em] text-[11px] uppercase hover:bg-ember transition"
                >
                  Book your stay <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/beyond-the-hunt"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-forest/40 text-forest tracking-[0.3em] text-[11px] uppercase hover:border-ember hover:text-ember transition"
                >
                  Non-hunting activities
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative">
              <img
                src={photos.campAerial}
                alt="Camp from the air"
                loading="lazy"
                className="w-full aspect-[4/3] object-cover"
                style={{ boxShadow: "var(--shadow-vintage)" }}
              />
              <div className="absolute -bottom-5 -left-5 bg-accent text-accent-foreground px-5 py-3 font-display tracking-[0.2em] text-xs hidden md:block">
                EST. 2023
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── AMENITIES GRID ── */}
      <section className="bg-ink py-28 grain">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <Eyebrow light>Camp Amenities</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-display text-4xl md:text-5xl text-bone leading-tight max-w-2xl">
              Everything you need.{" "}
              <span className="font-serif italic text-accent">Nothing you don't.</span>
            </h2>
          </Reveal>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-bone/10">
            {amenities.map(({ Icon, title, body, image }, i) => (
              <Reveal key={title} delay={i * 0.07}>
                <div className="group relative overflow-hidden h-[340px] md:h-[380px]">
                  {/* Background image */}
                  <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-8">
                    <Icon
                      className="h-8 w-8 text-accent mb-4 group-hover:scale-110 transition-transform duration-300"
                      strokeWidth={1.2}
                    />
                    <h3 className="font-display text-xl tracking-[0.1em] text-bone">{title.toUpperCase()}</h3>
                    <p className="mt-3 font-serif text-sm text-bone/65 leading-relaxed max-w-xs">{body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY STRIP ── */}
      <section className="paper-bg py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 mb-10">
          <Reveal>
            <Eyebrow>From the Camp</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-3xl md:text-4xl text-forest">Seen through the lens.</h2>
          </Reveal>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-4 px-6 md:px-12 snap-x snap-mandatory scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent/30">
          {galleryImages.map(({ src, alt }) => (
            <div
              key={alt}
              className="shrink-0 snap-start w-[280px] md:w-[360px] aspect-[4/3] overflow-hidden bg-ink"
            >
              <img
                src={src}
                alt={alt}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── NON-HUNTERS WELCOME SPLIT ── */}
      <section className="relative paper-bg py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative">
              <img
                src={photos.touristsElephants}
                alt="Partner guests watching elephants"
                loading="lazy"
                className="w-full aspect-[4/3] object-cover"
                style={{ boxShadow: "var(--shadow-vintage)" }}
              />
              <div className="absolute top-5 right-5 bg-accent text-accent-foreground px-4 py-2 font-display tracking-[0.25em] text-[11px] uppercase">
                Partners Welcome
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <Eyebrow>Bring Someone</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-4xl md:text-5xl text-forest leading-tight">
                Camp is half{" "}
                <span className="font-serif italic text-ember">the experience.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-7 font-serif text-xl text-foreground/75 leading-relaxed">
                Partners, photographers, and non-hunting guests are genuinely welcome. The camp is built for company.
                While hunters are in the field, guests take game drives, walk the trails, visit Maasai villages, or
                simply read by the water pan.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <ul className="mt-8 space-y-3 font-serif text-lg text-foreground/80">
                {[
                  "Dedicated non-hunting itinerary prepared on request",
                  "Game drives and walking trails with a scout",
                  "Photography and birding guides available",
                  "Full camp privileges — meals, bar, deck",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-ember mt-1">◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.4}>
              <Link
                to="/beyond-the-hunt"
                className="inline-flex items-center gap-2 mt-10 px-7 py-3.5 bg-forest text-bone tracking-[0.3em] text-[11px] uppercase hover:bg-ember transition"
              >
                Beyond-the-Hunt activities <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── RATES CTA BAND ── */}
      <section className="bg-ink text-bone py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <p className="font-display text-4xl md:text-5xl">
              Ready to see it{" "}
              <span className="font-serif italic text-accent">for yourself?</span>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 font-serif text-lg text-bone/65">
              Use our cost estimator to build your expedition, then reach out. We'll put a cup of coffee in your hand
              and walk you through the details.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link
                to="/estimator"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground tracking-[0.3em] text-[11px] uppercase hover:bg-ember hover:text-bone transition"
              >
                Estimate your trip cost <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 border border-bone/30 text-bone tracking-[0.3em] text-[11px] uppercase hover:border-accent hover:text-accent transition"
              >
                Contact a PH
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
