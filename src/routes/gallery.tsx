import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { useTranslation } from "react-i18next";
import { photos } from "@/assets/photos";
import { useSiteContent, resolveImage } from "@/hooks/useSiteContent";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Field Gallery — Top Trackers" },
      { name: "description", content: "Photographs from the bush — quarry, camp, kit, and country. A visual ledger of Top Trackers expeditions across Tanzania." },
    ],
  }),
  component: Gallery,
});

type Tile = { src: string; alt: string; w: 1 | 2; h: 1 | 2 };

const QUARRY: Tile[] = [
  { src: photos.lion, alt: "Lion in natural habitat", w: 2, h: 2 },
  { src: photos.lioness, alt: "Lioness and cub at sunset", w: 1, h: 1 },
  { src: photos.leopard, alt: "Leopard with prey in a tree", w: 1, h: 2 },
  { src: photos.buffalo, alt: "Cape buffalo close up", w: 1, h: 1 },
  { src: photos.buffaloHerd, alt: "Buffalo herd in Ngorongoro", w: 2, h: 1 },
  { src: photos.elephant, alt: "Elephants at sunset", w: 2, h: 1 },
  { src: photos.elephantPortrait, alt: "African bush elephant portrait", w: 1, h: 1 },
  { src: photos.kudu, alt: "Greater kudu bull", w: 1, h: 1 },
  { src: photos.rhino, alt: "Rhino mother and calf", w: 1, h: 1 },
  { src: photos.zebra, alt: "Zebra and ostrich herd", w: 1, h: 1 },
  { src: photos.giraffe, alt: "Giraffe portrait", w: 1, h: 2 },
  { src: photos.owl, alt: "Owl landing on a branch", w: 1, h: 1 },
  { src: photos.hyena, alt: "Hyena silhouette in the rain", w: 1, h: 1 },
];

const CAMP: Tile[] = [
  { src: photos.campAerial, alt: "Aerial of the campground", w: 2, h: 1 },
  { src: photos.campNight, alt: "Glamping at night with lanterns", w: 1, h: 2 },
  { src: photos.campDeck, alt: "Camping chairs on a rustic deck", w: 1, h: 1 },
  { src: photos.dinner, alt: "Lamb ribs at the long table", w: 1, h: 1 },
  { src: photos.breakfast, alt: "Breakfast table for two", w: 1, h: 1 },
  { src: photos.milkyway, alt: "Milky Way over the camp", w: 2, h: 1 },
];

const FIELD: Tile[] = [
  { src: photos.hunterValley, alt: "Hunter scanning the valley", w: 2, h: 2 },
  { src: photos.hunterSunset, alt: "Hunter silhouetted at sunset", w: 1, h: 1 },
  { src: photos.guideJeep, alt: "Guide in bush hat at the wheel", w: 1, h: 1 },
  { src: photos.phWalking, alt: "PH walking the Okavango", w: 1, h: 2 },
  { src: photos.walkingTrail, alt: "Walking trail with safari members", w: 1, h: 1 },
  { src: photos.gameDrive, alt: "Game drive group", w: 1, h: 1 },
  { src: photos.touristsElephants, alt: "Watching elephants at Lake Manyara", w: 2, h: 1 },
  { src: photos.gearAmmo, alt: "Brass, blue, and walnut", w: 1, h: 1 },
  { src: photos.gearKit, alt: "Hat, boots, binoculars", w: 1, h: 1 },
  { src: photos.bushPlane, alt: "Bush plane on the dirt strip", w: 1, h: 1 },
  { src: photos.helicopter, alt: "Helicopter on the desert floor", w: 1, h: 1 },
];

const COUNTRY: Tile[] = [
  { src: photos.acaciaSunset, alt: "Acacia silhouette at sunset", w: 2, h: 1 },
  { src: photos.maasaiJump, alt: "Maasai dancer mid-jump", w: 1, h: 2 },
  { src: photos.maasaiVillage, alt: "Distant Maasai village", w: 1, h: 1 },
  { src: photos.maasaiWoman, alt: "Maasai woman with child", w: 1, h: 1 },
  { src: photos.conservation, alt: "Planting trees together", w: 1, h: 1 },
  { src: photos.children, alt: "Local schoolchildren outreach", w: 1, h: 1 },
  { src: photos.vintageLeopard, alt: "Vintage-style leopard study", w: 1, h: 1 },
  { src: photos.vintageZebra, alt: "Vintage-style zebra study", w: 1, h: 1 },
];

function Gallery() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const { t } = useTranslation();
  const { data: content } = useSiteContent();

  const getContent = (key: string, fallback: string) => {
    return content?.[key] ?? fallback;
  };

  const heroBg = resolveImage(getContent("gallery.hero.bg", "acaciaSunset"));

  const SECTIONS = [
    { 
      id: "quarry", 
      eyebrow: getContent("gallery.sections.quarry.eyebrow", t("gallery.sections.quarry.eyebrow", "The Quarry")), 
      title: getContent("gallery.sections.quarry.title", t("gallery.sections.quarry.title", "Animals of the chase")), 
      body: getContent("gallery.sections.quarry.body", t("gallery.sections.quarry.body", "Lion, leopard, elephant, buffalo, kudu — the Tanganyikan five and the supporting cast.")), 
      tiles: QUARRY 
    },
    { 
      id: "camp", 
      eyebrow: getContent("gallery.sections.camp.eyebrow", t("gallery.sections.camp.eyebrow", "The Camp")), 
      title: getContent("gallery.sections.camp.title", t("gallery.sections.camp.title", "Canvas & lantern")), 
      body: getContent("gallery.sections.camp.body", t("gallery.sections.camp.body", "Where the day begins and ends — tents, table, embers.")), 
      tiles: CAMP 
    },
    { 
      id: "field", 
      eyebrow: getContent("gallery.sections.field.eyebrow", t("gallery.sections.field.eyebrow", "In the Field")), 
      title: getContent("gallery.sections.field.title", t("gallery.sections.field.title", "Hunters & kit")), 
      body: getContent("gallery.sections.field.body", t("gallery.sections.field.body", "Trackers, professional hunters, and the tools they trust.")), 
      tiles: FIELD 
    },
    { 
      id: "country", 
      eyebrow: getContent("gallery.sections.country.eyebrow", t("gallery.sections.country.eyebrow", "The Country")), 
      title: getContent("gallery.sections.country.title", t("gallery.sections.country.title", "Land & people")), 
      body: getContent("gallery.sections.country.body", t("gallery.sections.country.body", "Acacia country and the Maasai who steward it.")), 
      tiles: COUNTRY 
    },
  ] as const;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <section className="relative h-[60svh] bg-ink overflow-hidden flex flex-col justify-center">
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink" />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <Reveal>
            <Eyebrow light>{getContent("gallery.hero.eyebrow", t("gallery.hero.eyebrow", "The Field Gallery"))}</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-display text-5xl md:text-7xl text-bone">
              {getContent("gallery.hero.title_normal", t("gallery.hero.title_normal", "Photographs from "))}
              <span className="italic font-serif text-accent">{getContent("gallery.hero.title_italic", t("gallery.hero.title_italic", "the bush"))}</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 font-serif text-xl text-bone/75 max-w-2xl mx-auto">
              {getContent(
                "gallery.hero.body",
                t("gallery.hero.body", "A visual ledger — quarry, camp, kit, and country. Taken across our concessions in the Selous, Maasai Steppe, and Iringa highlands.")
              )}
            </p>
          </Reveal>
        </div>
      </section>

      {SECTIONS.map((section, idx) => (
        <section key={section.id} className={`py-24 ${idx % 2 === 0 ? "paper-bg" : "bg-ink text-bone"}`}>
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl mb-12">
              <Reveal>
                <Eyebrow light={idx % 2 !== 0}>{section.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className={`mt-4 font-display text-4xl md:text-5xl ${idx % 2 === 0 ? "text-forest" : "text-bone"}`}>
                  {section.title}
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className={`mt-4 font-serif text-lg ${idx % 2 === 0 ? "text-foreground/70" : "text-bone/70"}`}>
                  {section.body}
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3">
              {section.tiles.map((t, i) => (
                <Reveal key={t.src + i} delay={Math.min(i * 0.04, 0.4)}>
                  <button
                    type="button"
                    onClick={() => setLightbox({ src: t.src, alt: t.alt })}
                    className={`relative w-full h-full overflow-hidden bg-ink/10 group ${
                      t.w === 2 ? "col-span-2" : ""
                    } ${t.h === 2 ? "row-span-2" : ""}`}
                    style={{ boxShadow: "var(--shadow-vintage)" }}
                  >
                    <img
                      src={t.src}
                      alt={t.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-colors flex items-end p-4">
                      <span className="text-bone text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-opacity font-serif italic text-left">
                        {t.alt}
                      </span>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink/95 flex items-center justify-center p-4 md:p-12"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              className="absolute top-6 right-6 text-bone p-3 hover:text-accent transition"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-bone/80 font-serif italic text-sm text-center px-4">
              {lightbox.alt}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SiteFooter />
    </div>
  );
}
