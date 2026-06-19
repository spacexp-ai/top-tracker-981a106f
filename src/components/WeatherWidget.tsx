import { useEffect, useState } from "react";
import { Cloud, CloudRain, CloudSnow, Sun, CloudSun, Loader2, Wind } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

// Ruaha, Tanzania (Njombe River concession)
const LAT = -6.9058;
const LON = 34.9874;

type Forecast = {
  date: string;
  tmax: number;
  tmin: number;
  code: number;
  precip: number;
  wind: number;
};

function icon(code: number) {
  if (code === 0) return Sun;
  if ([1, 2].includes(code)) return CloudSun;
  if (code === 3) return Cloud;
  if (code >= 51 && code <= 67) return CloudRain;
  if (code >= 71 && code <= 77) return CloudSnow;
  if (code >= 80 && code <= 99) return CloudRain;
  return Cloud;
}

function describe(code: number, t: any) {
  if (code === 0) return t("weather.clear", "Clear");
  if ([1, 2].includes(code)) return t("weather.mostly_sunny", "Mostly sunny");
  if (code === 3) return t("weather.overcast", "Overcast");
  if (code >= 51 && code <= 67) return t("weather.rain", "Rain");
  if (code >= 71 && code <= 77) return t("weather.snow", "Snow");
  if (code >= 80 && code <= 82) return t("weather.showers", "Showers");
  if (code >= 95) return t("weather.thunderstorms", "Thunderstorms");
  return t("weather.mild", "Mild");
}

export function useForecast() {
  const [data, setData] = useState<Forecast[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum,wind_speed_10m_max&forecast_days=16&timezone=Africa%2FNairobi`;
    fetch(url)
      .then((r) => r.json())
      .then((j) => {
        const d = j.daily;
        const arr: Forecast[] = d.time.map((date: string, i: number) => ({
          date,
          tmax: Math.round(d.temperature_2m_max[i]),
          tmin: Math.round(d.temperature_2m_min[i]),
          code: d.weathercode[i],
          precip: d.precipitation_sum[i],
          wind: Math.round(d.wind_speed_10m_max[i]),
        }));
        setData(arr);
      })
      .catch(() => setError("offline"));
  }, []);

  return { data, error };
}

export function WeatherWidget({ selectedDate }: { selectedDate?: Date }) {
  const { data, error } = useForecast();
  const { t, i18n } = useTranslation();

  if (error) {
    return (
      <div className="bg-card border border-border p-5 text-sm text-muted-foreground">
        {error === "offline" ? t("weather.offline", "Weather offline") : error}
      </div>
    );
  }
  if (!data) {
    return (
      <div className="bg-card border border-border p-5 flex items-center gap-3 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> {t("weather.reading", "Reading the sky over Ruaha…")}
      </div>
    );
  }

  // pick today by default, or the matching date
  const iso = selectedDate ? selectedDate.toISOString().slice(0, 10) : data[0].date;
  const day = data.find((d) => d.date === iso);
  const inRange = !!day;

  const target = day ?? data[0];
  const Icon = icon(target.code);

  return (
    <div className="bg-ink text-bone border border-accent/40 p-5 shadow-[var(--shadow-vintage)]">
      <div className="flex items-center justify-between">
        <div className="text-[10px] tracking-[0.4em] uppercase text-accent">Ruaha · Tanzania</div>
        <div className="text-[10px] tracking-[0.3em] uppercase text-bone/50">
          {selectedDate ? selectedDate.toLocaleDateString(i18n.language === "hu" ? "hu-HU" : "en-GB", { day: "numeric", month: "short", year: "numeric" }) : t("weather.today", "Today")}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={target.date}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="mt-4 flex items-center gap-5"
        >
          <Icon className="h-14 w-14 text-accent" strokeWidth={1.2} />
          <div>
            <div className="font-display text-4xl">
              {target.tmax}° <span className="text-bone/50 text-2xl">/ {target.tmin}°</span>
            </div>
            <div className="text-sm font-serif italic text-bone/70">{describe(target.code, t)}</div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
        <div className="flex items-center gap-2 text-bone/70">
          <CloudRain className="h-3.5 w-3.5 text-accent" /> {target.precip} mm {t("weather.precip", "precip")}
        </div>
        <div className="flex items-center gap-2 text-bone/70">
          <Wind className="h-3.5 w-3.5 text-accent" /> {target.wind} km/h {t("weather.wind", "wind")}
        </div>
      </div>

      {selectedDate && !inRange && (
        <div className="mt-4 text-[11px] text-bone/50 italic">
          {t("weather.horizon", "Forecast horizon is ~16 days — showing today's reading. Your hunt dates will be confirmed at booking.")}
        </div>
      )}
    </div>
  );
}
