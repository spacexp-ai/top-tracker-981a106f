import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { useTranslation } from "react-i18next";
import { photos } from "@/assets/photos";
const wildlife = photos.vintageLeopard;
const camp = photos.campDeck;
const experience = photos.maasaiVillage;
const hero = photos.milkyway;

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Field Journal — Top Trackers" },
      {
        name: "description",
        content:
          "Dispatches from the bush: tracking notes, conservation reports, and stories from Top Trackers camps.",
      },
      { property: "og:title", content: "Field Journal — Top Trackers" },
      {
        property: "og:description",
        content: "Tracking notes, conservation reports, and stories from the bush.",
      },
    ],
  }),
  component: Journal,
});

const entries = [
  {
    title: "The long wait for the Iringa buffalo",
    excerpt:
      "Eleven days under acacia and a wind that never settled. Patience is the only currency the old bulls accept.",
    date: "March 14, 2026",
    tag: "Field Notes",
    image: experience,
    read: "8 min",
  },
  {
    title: "Why we counted the lions before we sold a hunt",
    excerpt:
      "Our annual census in the Selous block, and what the numbers told us about quota, prey, and the price of restraint.",
    date: "February 02, 2026",
    tag: "Conservation",
    image: wildlife,
    read: "12 min",
  },
  {
    title: "Brass, canvas, and the lost art of camp",
    excerpt:
      "A walk through Esilalei base camp with the canvas-master who has stitched our tents for thirty seasons.",
    date: "January 18, 2026",
    tag: "Camp Life",
    image: camp,
    read: "6 min",
  },
  {
    title: "Maasai Steppe — a season in dispatches",
    excerpt:
      "Six members, two professional hunters, one impossible kudu. Recollections from the 2025 driven weekend.",
    date: "December 06, 2025",
    tag: "Expedition",
    image: hero,
    read: "10 min",
  },
];

function Journal() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <section className="relative h-[52svh] bg-ink overflow-hidden">
        <motion.img
          src={experience}
          alt=""
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 to-ink" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-bone">
          <Eyebrow light>{t("journal.hero.eyebrow", "Dispatches from the bush")}</Eyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-7xl">
            {t("journal.hero.title_normal", "The ")}
            <span className="italic font-serif text-accent">
              {t("journal.hero.title_italic", "Field Journal")}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-xl text-bone/75">
            {t(
              "journal.hero.body",
              "Tracking notes, conservation reports, and unhurried stories — written in the bush, edited by lantern light.",
            )}
          </p>
        </div>
      </section>

      <section className="paper-bg py-28">
        <div className="mx-auto max-w-6xl px-6 space-y-10">
          {entries.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.05}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="group grid md:grid-cols-5 gap-8 items-center bg-card p-6 md:p-8 border border-border hover:border-accent transition-colors"
              >
                <div className="md:col-span-2 overflow-hidden">
                  <motion.img
                    src={e.image}
                    alt={e.title}
                    loading="lazy"
                    className="w-full aspect-[4/3] object-cover"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <div className="md:col-span-3">
                  <div className="flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-accent">
                    <span>{t(`journal.entries.${i + 1}.tag`, e.tag)}</span>
                    <span className="h-px flex-1 bg-border" />
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {e.date}
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-2xl md:text-3xl text-forest group-hover:text-ember transition-colors leading-tight">
                    {t(`journal.entries.${i + 1}.title`, e.title)}
                  </h2>
                  <p className="mt-4 font-serif text-lg text-foreground/75 leading-relaxed">
                    {t(`journal.entries.${i + 1}.excerpt`, e.excerpt)}
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground tracking-widest uppercase">
                      {e.read} {t("journal.read", "read")}
                    </span>
                    <span className="inline-flex items-center gap-2 text-forest group-hover:text-ember text-[11px] tracking-[0.3em] uppercase">
                      {t("journal.read_entry", "Read entry")}{" "}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}

          <Reveal>
            <div className="mt-16 p-10 border border-accent/40 bg-ink text-bone text-center">
              <Eyebrow light>{t("journal.subscribe.eyebrow", "Subscribe")}</Eyebrow>
              <h3 className="mt-4 font-display text-3xl">
                {t("journal.subscribe.title", "The quarterly field journal — by post.")}
              </h3>
              <p className="mt-4 font-serif text-bone/70 max-w-xl mx-auto">
                {t(
                  "journal.subscribe.body",
                  "Members receive the printed edition four times a year. Add your address to the waiting list.",
                )}
              </p>
              <Link
                to="/contact"
                className="inline-flex mt-8 items-center gap-2 px-7 py-3.5 bg-accent text-accent-foreground tracking-[0.3em] text-[11px] uppercase hover:bg-ember hover:text-bone transition"
              >
                {t("journal.subscribe.cta", "Request the Journal")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PHOTO JOURNAL / GALLERY */}
      <section className="relative bg-ink text-bone py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <Eyebrow light>{t("journal.photo_journal.eyebrow", "Photo journal")}</Eyebrow>
              <h2 className="mt-4 font-display text-3xl md:text-5xl">
                {t("journal.photo_journal.title_normal", "Frames from the ")}
                <span className="italic font-serif text-accent">
                  {t("journal.photo_journal.title_italic", "bush.")}
                </span>
              </h2>
            </div>
            <p className="font-serif italic text-bone/60 max-w-md">
              {t(
                "journal.photo_journal.body",
                "A rotating gallery of stills from camp, concession, and chase — shot on film, scanned at the kitchen table.",
              )}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3">
            {[
              { src: experience, span: "row-span-2" },
              { src: wildlife, span: "" },
              { src: camp, span: "" },
              { src: hero, span: "row-span-2 col-span-2" },
              { src: wildlife, span: "" },
              { src: camp, span: "" },
              { src: experience, span: "col-span-2" },
              { src: hero, span: "" },
            ].map((t, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                className={`overflow-hidden bg-bone/5 ${t.span}`}
              >
                <img
                  src={t.src}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
