import { MapPin, Plane } from "lucide-react";
import { useTranslation } from "react-i18next";

// Base camp on the bank of the Njombe River, near Ruaha National Park.
// 6°54'21.0"S 34°59'14.8"E  →  -6.9058, 34.9874
const lat = -6.9058;
const lon = 34.9874;
const bbox = `${(lon - 0.22).toFixed(4)},${(lat - 0.18).toFixed(4)},${(lon + 0.22).toFixed(4)},${(lat + 0.18).toFixed(4)}`;
const marker = `${lat},${lon}`;
const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`;

export function BookingMap() {
  const { t } = useTranslation();

  return (
    <div className="bg-card border border-border overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <div className="text-[10px] tracking-[0.4em] uppercase text-accent">
            {t("footer.base_camp", "Base Camp")}
          </div>
          <div className="font-display text-lg text-forest">
            {t("footer.river", "on the bank of Njombe River")}
          </div>
        </div>
        <a
          href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=11/${lat}/${lon}`}
          target="_blank"
          rel="noreferrer"
          className="text-[10px] tracking-[0.3em] uppercase text-ember hover:text-forest transition flex items-center gap-1"
        >
          <MapPin className="h-3.5 w-3.5" /> {t("map.open_in_maps", "Open in maps")}
        </a>
      </div>
      <iframe
        title={t("map.title", "Top Trackers base camp — Njombe River")}
        src={src}
        className="w-full h-64 md:h-80 grayscale-[0.4] contrast-[1.05]"
        loading="lazy"
      />
      <div className="flex items-center justify-between gap-3 p-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Plane className="h-3.5 w-3.5 text-ember" />{" "}
          {t("map.near_park", "Near Ruaha National Park")}
        </span>
        <span className="font-serif italic">6°54′21.0″S, 34°59′14.8″E</span>
      </div>
    </div>
  );
}
