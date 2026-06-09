import { motion } from "framer-motion";
import { Instagram, ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";
import { photos } from "@/assets/photos";

// Curated still-frames standing in for the live Instagram feed.
// The carousel links out to the real account: @top_trackers
const tiles = [
  { src: photos.hunterValley, alt: "Scanning the valley at first light" },
  { src: photos.lioness, alt: "Lioness and cub on a fallen tree" },
  { src: photos.campNight, alt: "Lantern light at base camp" },
  { src: photos.acaciaSunset, alt: "Acacia silhouette at sunset" },
  { src: photos.elephant, alt: "Elephants gather at the waterhole" },
  { src: photos.vintageLeopard, alt: "Leopard rosettes in the thornveld" },
  { src: photos.gearAmmo, alt: "Brass, blue, and walnut on the kit table" },
  { src: photos.milkyway, alt: "Milky way over the camp" },
  { src: photos.maasaiJump, alt: "Maasai dancer mid-jump" },
  { src: photos.kudu, alt: "Greater kudu bull standing tall" },
  { src: photos.guideJeep, alt: "Guide at the wheel of the cruiser" },
  { src: photos.bushPlane, alt: "Bush plane on the dirt strip" },
];

export function InstagramFeed() {
  // duplicate for seamless marquee
  const loop = [...tiles, ...tiles];
  return (
    <section className="relative bg-ink text-bone py-20 overflow-hidden border-t border-bone/10">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <Eyebrow light>From the field</Eyebrow>
          <h2 className="mt-4 font-display text-3xl md:text-4xl">
            Follow the trail on <span className="italic font-serif text-accent">Instagram</span>
          </h2>
        </div>
        <a
          href="https://www.instagram.com/top_trackers/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 border border-accent/50 text-accent text-[11px] tracking-[0.3em] uppercase hover:bg-accent hover:text-accent-foreground transition self-start"
        >
          <Instagram className="h-4 w-4" /> @top_trackers <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <div
        className="relative group"
        style={{
          maskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <motion.div
          className="flex gap-4 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {loop.map((t, i) => (
            <a
              key={i}
              href="https://www.instagram.com/top_trackers/"
              target="_blank"
              rel="noreferrer"
              className="relative w-[260px] h-[260px] md:w-[300px] md:h-[300px] shrink-0 overflow-hidden bg-bone/5 group/tile"
            >
              <img src={t.src} alt={t.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover/tile:scale-110" />
              <div className="absolute inset-0 bg-ink/0 group-hover/tile:bg-ink/60 transition-colors flex items-center justify-center">
                <Instagram className="h-7 w-7 text-bone opacity-0 group-hover/tile:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
