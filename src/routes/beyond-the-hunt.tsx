import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { ArrowRight } from "lucide-react";
import { photos } from "@/assets/photos";
import map from "@/assets/map-texture.jpg";

export const Route = createFileRoute("/beyond-the-hunt")({
  head: () => ({
    meta: [
      { title: "Beyond the Hunt — Top Trackers" },
      {
        name: "description",
        content:
          "Non-hunting safari experiences in Tanzania. Game drives, walking trails, Maasai village visits, stargazing, bird photography, and helicopter charters.",
      },
      { property: "og:title", content: "Beyond the Hunt — Top Trackers" },
      {
        property: "og:description",
        content:
          "There are so many incredible experiences waiting in the Tanzanian wilderness — beyond the rifle.",
      },
      { property: "og:image", content: photos.gameDrive },
    ],
  }),
  component: BeyondTheHunt,
});

const activities = [
  {
    id: "game-drives",
    title: "Game Drives",
    subtitle: "Sunrise & Sunset",
    description:
      "Open-vehicle game drives with a dedicated scout through the concession. The Selous and Maasai Steppe blocks carry exceptional general game — elephant, giraffe, zebra, and predators in the early hours.",
    image: photos.gameDrive,
    tag: "Daily",
  },
  {
    id: "walking-trails",
    title: "Walking Trails",
    subtitle: "With a Scout",
    description:
      "Walk the bush on foot with one of our Maasai or Wagogo scouts. Read tracks, identify trees, watch the land breathe. The most intimate way to experience the African wilderness without a rifle.",
    image: photos.walkingTrail,
    tag: "On request",
  },
  {
    id: "bird-photography",
    title: "Bird Photography",
    subtitle: "500+ Species",
    description:
      "Tanzania holds some of the most extraordinary birdlife on earth. Our concession blocks host hornbills, rollers, fish eagles, secretary birds, and the elusive pel's fishing owl. Guides provided.",
    image: photos.owl,
    tag: "Year-round",
  },
  {
    id: "maasai-village",
    title: "Maasai Village Visits",
    subtitle: "Cultural Immersion",
    description:
      "Visit the Maasai communities who live alongside our concession and help steward the land. Guided by a community liaison, these visits offer genuine cultural exchange and direct community benefit.",
    image: photos.maasaiVillage,
    tag: "Arranged",
  },
  {
    id: "stargazing",
    title: "Milky Way Stargazing",
    subtitle: "Zero Light Pollution",
    description:
      "No town within 200 kilometres. The Southern Cross, the Milky Way core, and the full sweep of the southern sky. We keep a telescope on the camp deck — and the bush is absolutely quiet at midnight.",
    image: photos.milkyway,
    tag: "Every night",
  },
  {
    id: "helicopter-charter",
    title: "Helicopter Charter",
    subtitle: "Wild Coast Scenic Flights",
    description:
      "See Tanzania from above — sweeping over the Rift Valley, the great concession blocks, and the remote floodplains. Charter available for scenic flights, photography, and inter-camp transfers.",
    image: photos.helicopter,
    tag: "On request",
  },
];

function BeyondTheHunt() {
  const { t } = useTranslation();

  const activities = [
    {
      id: "game-drives",
      title: t("beyond_hunt.activities.1.title", "Game Drives"),
      subtitle: t("beyond_hunt.activities.1.subtitle", "Sunrise & Sunset"),
      desc: t(
        "beyond_hunt.activities.1.desc",
        "Open-vehicle game drives with a dedicated scout through the concession.",
      ),
      image: photos.gameDrive,
      tag: t("beyond_hunt.activities.1.tag", "Daily"),
    },
    {
      id: "walking-trails",
      title: t("beyond_hunt.activities.2.title", "Walking Trails"),
      subtitle: t("beyond_hunt.activities.2.subtitle", "With a Scout"),
      desc: t(
        "beyond_hunt.activities.2.desc",
        "Walk the bush on foot with one of our Maasai or Wagogo scouts.",
      ),
      image: photos.walkingTrail,
      tag: t("beyond_hunt.activities.2.tag", "On request"),
    },
    {
      id: "bird-photography",
      title: t("beyond_hunt.activities.3.title", "Bird Photography"),
      subtitle: t("beyond_hunt.activities.3.subtitle", "500+ Species"),
      desc: t(
        "beyond_hunt.activities.3.desc",
        "Tanzania holds some of the most extraordinary birdlife on earth.",
      ),
      image: photos.owl,
      tag: t("beyond_hunt.activities.3.tag", "Year-round"),
    },
    {
      id: "maasai-village",
      title: t("beyond_hunt.activities.4.title", "Maasai Village Visits"),
      subtitle: t("beyond_hunt.activities.4.subtitle", "Cultural Immersion"),
      desc: t(
        "beyond_hunt.activities.4.desc",
        "Visit the Maasai communities who live alongside our concession.",
      ),
      image: photos.maasaiVillage,
      tag: t("beyond_hunt.activities.4.tag", "Arranged"),
    },
    {
      id: "stargazing",
      title: t("beyond_hunt.activities.5.title", "Milky Way Stargazing"),
      subtitle: t("beyond_hunt.activities.5.subtitle", "Zero Light Pollution"),
      desc: t(
        "beyond_hunt.activities.5.desc",
        "No town within 200 kilometres. The Southern Cross, the Milky Way core, and the full sweep of the southern sky.",
      ),
      image: photos.milkyway,
      tag: t("beyond_hunt.activities.5.tag", "Every night"),
    },
    {
      id: "helicopter-charter",
      title: t("beyond_hunt.activities.6.title", "Helicopter Charter"),
      subtitle: t("beyond_hunt.activities.6.subtitle", "Wild Coast Scenic Flights"),
      desc: t(
        "beyond_hunt.activities.6.desc",
        "See Tanzania from above — sweeping over the Rift Valley, the great concession blocks, and the remote floodplains.",
      ),
      image: photos.helicopter,
      tag: t("beyond_hunt.activities.6.tag", "On request"),
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
            src={photos.gameDrive}
            alt="Game drive at sunrise"
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
            <Eyebrow light>For Hunters, Partners & Solo Travellers</Eyebrow>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-6 font-display text-[11vw] md:text-[7.5vw] leading-[0.92] max-w-5xl"
          >
            BEYOND <span className="font-serif italic text-accent">the Hunt.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-6 font-serif text-lg text-bone/70 max-w-xl"
          >
            There are so many incredible experiences waiting in Africa. We urge you to make the most
            of your time.
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
      <section className="relative paper-bg py-24 overflow-hidden">
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
            <Eyebrow>The Adventure Doesn't Stop There</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-8 font-display text-4xl md:text-5xl text-forest leading-tight">
              While you're here —{" "}
              <span className="font-serif italic text-ember">explore more.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 font-serif text-xl leading-relaxed text-foreground/80">
              There are so many incredible experiences just waiting for you in Tanzania. Whether
              you've hung up the rifle for the afternoon, brought a partner who doesn't hunt, or
              planned a standalone non-hunting safari — we arrange custom experiences to complement
              your time in the bush.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-5 font-serif text-lg text-foreground/60 leading-relaxed">
              Contact us for any activity you'd like us to arrange. Nothing is too much trouble.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── ACTIVITY GRID ── */}
      <section className="bg-ink py-6 px-4 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-px bg-bone/5">
            {activities.map((act, i) => (
              <Reveal key={act.id} delay={i * 0.07}>
                <article className="group relative overflow-hidden aspect-[16/10]">
                  {/* Full-bleed image */}
                  <img
                    src={act.image}
                    alt={act.title}
                    loading={i < 2 ? "eager" : "lazy"}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent group-hover:from-ink/90 transition-all duration-500" />

                  {/* Tag */}
                  <div className="absolute top-5 right-5">
                    <span className="inline-block px-2.5 py-1 bg-ink/60 backdrop-blur-sm border border-accent/40 text-accent text-[9px] tracking-[0.35em] uppercase">
                      {act.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-7 md:p-8">
                    <p className="text-[9px] tracking-[0.4em] uppercase text-accent/80 mb-1">
                      {act.subtitle}
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl text-bone leading-tight">
                      {act.title.toUpperCase()}
                    </h3>
                    {/* Description — slides up on hover */}
                    <div className="overflow-hidden max-h-0 group-hover:max-h-32 transition-all duration-500 ease-out">
                      <p className="mt-3 font-serif text-sm text-bone/70 leading-relaxed max-w-sm">
                        {act.desc}
                      </p>
                    </div>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 mt-5 text-[10px] tracking-[0.3em] uppercase text-accent hover:text-ember transition-colors"
                    >
                      Enquire <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERS CALLOUT BANNER ── */}
      <section className="relative py-24 bg-forest text-bone overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url(${map})`, backgroundSize: "cover" }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <div className="inline-block border border-accent/50 px-5 py-2 mb-6">
              <span className="text-[10px] tracking-[0.5em] uppercase text-accent">
                For Partners & Guests
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-6xl leading-tight">
              Your partner comes{" "}
              <span className="font-serif italic text-accent">at no extra cost.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-7 font-serif text-xl text-bone/75 max-w-2xl mx-auto leading-relaxed">
              Non-hunting partners and companions stay in camp with full access to meals, the bar,
              and the camp deck — included in the hunt package rate. A non-hunting itinerary is
              prepared on request.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground tracking-[0.3em] text-[11px] uppercase hover:bg-ember hover:text-bone transition"
              >
                Plan your trip <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/camp"
                className="inline-flex items-center gap-2 px-8 py-4 border border-bone/40 text-bone tracking-[0.3em] text-[11px] uppercase hover:border-accent hover:text-accent transition"
              >
                See the camp
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WILDLIFE TEASER ── */}
      <section className="paper-bg py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="flex items-baseline justify-between flex-wrap gap-4 mb-10">
              <div>
                <Eyebrow>Wildlife Highlights</Eyebrow>
                <h2 className="mt-3 font-display text-3xl md:text-4xl text-forest">
                  What you might see.
                </h2>
              </div>
              <Link
                to="/gallery"
                className="text-[11px] tracking-[0.25em] uppercase text-accent border-b border-accent/30 hover:border-accent pb-1"
              >
                Full gallery ↗
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { img: photos.elephant, label: "Elephant" },
              { img: photos.giraffe, label: "Giraffe" },
              { img: photos.zebra, label: "Zebra" },
              { img: photos.lion, label: "Lion" },
            ].map(({ img, label }, i) => (
              <Reveal key={label} delay={i * 0.07}>
                <div className="group relative overflow-hidden aspect-square">
                  <img
                    src={img}
                    alt={label}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 font-display text-bone text-lg tracking-[0.2em] uppercase">
                    {label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
