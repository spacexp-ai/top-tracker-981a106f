import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, Crown, Plane, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

const concessions = [
  { id: "selous", label: "Selous Reserve", day: 2200 },
  { id: "maasai", label: "Maasai Steppe", day: 1900 },
  { id: "iringa", label: "Iringa Highlands", day: 2400 },
];

const species = [
  { id: "buffalo", label: "Cape Buffalo", fee: 4500 },
  { id: "leopard", label: "Leopard", fee: 7500 },
  { id: "kudu", label: "Greater Kudu", fee: 3200 },
  { id: "sable", label: "Sable Antelope", fee: 5800 },
  { id: "eland", label: "Eland", fee: 2800 },
  { id: "warthog", label: "Warthog", fee: 650 },
];

const tiers = [
  { id: "none", label: "Non-member", discount: 0 },
  { id: "tracker", label: "Tracker", discount: 0.05 },
  { id: "ph", label: "Professional Hunter", discount: 0.12 },
  { id: "legacy", label: "Legacy", discount: 0.18 },
];

export function EstimatorEmbed({ defaultConcession }: { defaultConcession?: string }) {
  const { t, i18n } = useTranslation();
  const [concession, setConcession] = useState(defaultConcession ?? concessions[0].id);
  const [days, setDays] = useState(10);
  const [hunters, setHunters] = useState(1);
  const [picked, setPicked] = useState<string[]>(["buffalo"]);
  const [tier, setTier] = useState("none");
  const [charter, setCharter] = useState(false);

  useEffect(() => {
    if (defaultConcession) setConcession(defaultConcession);
  }, [defaultConcession]);

  const c = concessions.find((x) => x.id === concession)!;
  const tTier = tiers.find((x) => x.id === tier)!;

  const breakdown = useMemo(() => {
    const dailyRate = c.day * days * hunters;
    const trophyFees = picked.reduce((sum, id) => sum + (species.find((s) => s.id === id)?.fee ?? 0), 0);
    const conservation = days * 150 * hunters;
    const charterFee = charter ? 4200 : 0;
    const subtotal = dailyRate + trophyFees + conservation + charterFee;
    const discount = (dailyRate + trophyFees) * tTier.discount;
    const total = subtotal - discount;
    return { dailyRate, trophyFees, conservation, charterFee, subtotal, discount, total };
  }, [c, days, hunters, picked, tTier, charter]);

  function toggle(id: string) {
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  }
  const fmt = (n: number) => `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-card p-6 border border-border">
          <h3 className="font-display text-lg tracking-[0.1em] uppercase text-forest">{t("estimator_embed.concession", "Concession")}</h3>
          <div className="mt-4 grid sm:grid-cols-3 gap-2">
            {concessions.map((opt) => (
              <motion.button
                key={opt.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => setConcession(opt.id)}
                className={`p-3 text-left border transition ${
                  concession === opt.id ? "border-ember bg-ember/10" : "border-border hover:border-accent"
                }`}
              >
                <div className="font-display text-sm text-forest">{t("estimator_embed.concessions." + opt.id, opt.label)}</div>
                <div className="text-[10px] tracking-widest uppercase text-muted-foreground mt-1">
                  {fmt(opt.day)}{t("estimator_embed.off_day", " / day")}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="bg-card p-6 border border-border space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base tracking-[0.1em] uppercase text-forest inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-accent" /> {t("estimator_embed.duration", "Duration")}
              </h3>
              <span className="font-display text-2xl text-ember">{days}<span className="text-sm text-muted-foreground ml-1">{t("estimator_embed.days", "days")}</span></span>
            </div>
            <input type="range" min={5} max={21} value={days} onChange={(e) => setDays(parseInt(e.target.value))} className="mt-4 w-full accent-ember" />
          </div>
          <div className="h-px bg-border" />
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base tracking-[0.1em] uppercase text-forest inline-flex items-center gap-2">
                <Users className="h-4 w-4 text-accent" /> {t("estimator_embed.hunters", "Hunters")}
              </h3>
              <span className="font-display text-2xl text-ember">{hunters}</span>
            </div>
            <div className="mt-3 flex gap-2">
              {[1, 2, 3, 4].map((n) => (
                <button key={n} onClick={() => setHunters(n)} className={`flex-1 py-2 border tracking-widest text-sm transition ${hunters === n ? "border-ember bg-ember text-bone" : "border-border hover:border-accent"}`}>
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card p-6 border border-border">
          <h3 className="font-display text-base tracking-[0.1em] uppercase text-forest">{t("estimator_embed.trophy_species", "Trophy species")}</h3>
          <div className="mt-4 grid sm:grid-cols-2 gap-2">
            {species.map((s) => {
              const on = picked.includes(s.id);
              return (
                <motion.button key={s.id} whileTap={{ scale: 0.97 }} onClick={() => toggle(s.id)} className={`flex justify-between items-center p-3 border transition ${on ? "border-ember bg-ember/10" : "border-border hover:border-accent"}`}>
                  <span className="font-serif text-base text-forest">{t("estimator_embed.species." + s.id, s.label)}</span>
                  <span className={`font-display text-xs ${on ? "text-ember" : "text-muted-foreground"}`}>{fmt(s.fee)}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="bg-card p-6 border border-border">
          <h3 className="font-display text-base tracking-[0.1em] uppercase text-forest inline-flex items-center gap-2">
            <Crown className="h-4 w-4 text-accent" /> {t("estimator_embed.membership_tier", "Membership tier")}
          </h3>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {tiers.map((opt) => (
              <motion.button key={opt.id} whileTap={{ scale: 0.97 }} onClick={() => setTier(opt.id)} className={`p-3 text-left border transition ${tier === opt.id ? "border-ember bg-ember/10" : "border-border hover:border-accent"}`}>
                <div className="font-display text-sm text-forest">{t("estimator_embed.tiers." + opt.id, opt.label)}</div>
                <div className="text-[10px] text-muted-foreground mt-1">
                  {opt.discount === 0 
                    ? t("estimator_embed.standard_rate", "Standard rate") 
                    : i18n.language === "hu"
                      ? `${Math.round(opt.discount * 100)}% kedvezmény`
                      : `${Math.round(opt.discount * 100)}% off`
                  }
                </div>
              </motion.button>
            ))}
          </div>
          <label className="mt-4 flex items-center gap-3 p-3 border border-border hover:border-accent cursor-pointer text-sm">
            <input type="checkbox" checked={charter} onChange={(e) => setCharter(e.target.checked)} className="accent-ember h-4 w-4" />
            <Plane className="h-4 w-4 text-accent" />
            <span className="font-serif text-forest">{t("estimator_embed.charter_label", "Private bush charter")}</span>
            <span className="ml-auto font-display text-xs text-muted-foreground">+ $4,200</span>
          </label>
        </div>
      </div>

      <div className="lg:sticky lg:top-4 lg:self-start">
        <div className="bg-ink text-bone p-6 border border-accent/40">
          <div className="text-[10px] tracking-[0.4em] uppercase text-accent">{t("estimator_embed.live_estimate", "Live estimate")}</div>
          <div className="mt-4 space-y-2 text-sm">
            <Row label={`${t("estimator_embed.concessions." + c.id, c.label)} · ${days}${i18n.language === "hu" ? "nap" : "d"} × ${hunters}`} value={fmt(breakdown.dailyRate)} />
            <Row label={t("estimator_embed.trophy_species", "Trophy species")} value={fmt(breakdown.trophyFees)} />
            <Row label={t("estimator_embed.conservation", "Conservation levy")} value={fmt(breakdown.conservation)} />
            {charter && <Row label={t("estimator_embed.charter_label", "Private bush charter")} value={fmt(breakdown.charterFee)} />}
            <div className="h-px bg-bone/15 my-2" />
            <Row label={t("estimator_embed.subtotal", "Subtotal")} value={fmt(breakdown.subtotal)} muted />
            <AnimatePresence>
              {breakdown.discount > 0 && (
                <motion.div key="d" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                  <Row label={`${t("estimator_embed.tiers." + tTier.id, tTier.label)} ${i18n.language === "hu" ? "kedvezmény" : "discount"}`} value={`− ${fmt(breakdown.discount)}`} accent />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="mt-6 pt-4 border-t border-bone/15">
            <div className="text-[10px] tracking-[0.4em] uppercase text-accent">{t("estimator_embed.estimated_total", "Estimated total")}</div>
            <motion.div key={breakdown.total} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl mt-1">
              {fmt(breakdown.total)}
            </motion.div>
          </div>
          <a
            href={`/contact?concession=${concession}&days=${days}&hunters=${hunters}&picked=${picked.join(",")}&tier=${tier}&charter=${charter}&total=${breakdown.total}`}
            className="mt-6 inline-flex w-full justify-center items-center gap-2 px-5 py-3 bg-accent text-accent-foreground tracking-[0.3em] text-[10px] uppercase hover:bg-ember hover:text-bone transition"
          >
            {t("estimator_embed.reserve_btn", "Reserve this estimate")} <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, muted, accent }: { label: string; value: string; muted?: boolean; accent?: boolean }) {
  return (
    <div className="flex justify-between items-baseline">
      <span className={`${muted ? "text-bone/55" : "text-bone/80"} ${accent ? "text-accent" : ""}`}>{label}</span>
      <span className={`font-display ${accent ? "text-accent" : "text-bone"}`}>{value}</span>
    </div>
  );
}
