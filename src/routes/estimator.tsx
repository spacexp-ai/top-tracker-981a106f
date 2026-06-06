import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, Crown, Plane, Users } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { photos } from "@/assets/photos";
const wildlife = photos.gearKit;

export const Route = createFileRoute("/estimator")({
  head: () => ({
    meta: [
      { title: "Safari Cost Estimator — Top Trackers" },
      { name: "description", content: "Estimate the cost of your African hunting safari, with live membership discounts and trophy fees." },
    ],
  }),
  component: Estimator,
});

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

function Estimator() {
  const [concession, setConcession] = useState(concessions[0].id);
  const [days, setDays] = useState(10);
  const [hunters, setHunters] = useState(1);
  const [picked, setPicked] = useState<string[]>(["buffalo"]);
  const [tier, setTier] = useState("none");
  const [charter, setCharter] = useState(false);

  const c = concessions.find((x) => x.id === concession)!;
  const t = tiers.find((x) => x.id === tier)!;

  const breakdown = useMemo(() => {
    const dailyRate = c.day * days * hunters;
    const trophyFees = picked.reduce((sum, id) => sum + (species.find((s) => s.id === id)?.fee ?? 0), 0);
    const conservation = days * 150 * hunters;
    const charterFee = charter ? 4200 : 0;
    const subtotal = dailyRate + trophyFees + conservation + charterFee;
    const discount = (dailyRate + trophyFees) * t.discount;
    const total = subtotal - discount;
    return { dailyRate, trophyFees, conservation, charterFee, subtotal, discount, total };
  }, [c, days, hunters, picked, t, charter]);

  function toggle(id: string) {
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  }

  const fmt = (n: number) => `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <section className="relative h-[44svh] bg-ink overflow-hidden">
        <img src={wildlife} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 to-ink" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-bone">
          <Eyebrow light>Plan the chase</Eyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-7xl">
            Safari <span className="italic font-serif text-accent">Estimator</span>
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-xl text-bone/75">
            A live estimate — concession, days, species, and your membership tier, all in one place.
          </p>
        </div>
      </section>

      <section className="paper-bg py-24">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-3 gap-10">
          {/* Controls */}
          <div className="lg:col-span-2 space-y-10">
            <Reveal>
              <div className="bg-card p-8 border border-border">
                <h2 className="font-display text-2xl tracking-[0.1em] uppercase text-forest">Concession</h2>
                <div className="mt-6 grid sm:grid-cols-3 gap-3">
                  {concessions.map((opt) => (
                    <motion.button
                      key={opt.id}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConcession(opt.id)}
                      className={`p-5 text-left border transition ${
                        concession === opt.id ? "border-ember bg-ember/10" : "border-border hover:border-accent"
                      }`}
                    >
                      <div className="font-display text-lg text-forest">{opt.label}</div>
                      <div className="text-xs tracking-widest uppercase text-muted-foreground mt-2">
                        {fmt(opt.day)} / hunter / day
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="bg-card p-8 border border-border space-y-8">
                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-2xl tracking-[0.1em] uppercase text-forest inline-flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-accent" /> Duration
                    </h2>
                    <span className="font-display text-3xl text-ember">{days} <span className="text-base text-muted-foreground">days</span></span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={21}
                    value={days}
                    onChange={(e) => setDays(parseInt(e.target.value))}
                    className="mt-6 w-full accent-ember"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2 tracking-widest uppercase">
                    <span>5 days</span><span>21 days</span>
                  </div>
                </div>

                <div className="h-px bg-border" />

                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-2xl tracking-[0.1em] uppercase text-forest inline-flex items-center gap-3">
                      <Users className="h-5 w-5 text-accent" /> Hunters
                    </h2>
                    <span className="font-display text-3xl text-ember">{hunters}</span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    {[1, 2, 3, 4].map((n) => (
                      <button
                        key={n}
                        onClick={() => setHunters(n)}
                        className={`flex-1 py-3 border tracking-widest text-sm transition ${
                          hunters === n ? "border-ember bg-ember text-bone" : "border-border hover:border-accent"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="bg-card p-8 border border-border">
                <h2 className="font-display text-2xl tracking-[0.1em] uppercase text-forest">Trophy species</h2>
                <p className="text-sm text-muted-foreground mt-2">Tap to add or remove from your quota.</p>
                <div className="mt-6 grid sm:grid-cols-2 gap-3">
                  {species.map((s) => {
                    const on = picked.includes(s.id);
                    return (
                      <motion.button
                        key={s.id}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => toggle(s.id)}
                        className={`flex justify-between items-center p-4 border transition ${
                          on ? "border-ember bg-ember/10" : "border-border hover:border-accent"
                        }`}
                      >
                        <span className="font-serif text-lg text-forest">{s.label}</span>
                        <span className={`font-display text-sm ${on ? "text-ember" : "text-muted-foreground"}`}>
                          {fmt(s.fee)}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="bg-card p-8 border border-border">
                <h2 className="font-display text-2xl tracking-[0.1em] uppercase text-forest inline-flex items-center gap-3">
                  <Crown className="h-5 w-5 text-accent" /> Membership tier
                </h2>
                <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {tiers.map((opt) => (
                    <motion.button
                      key={opt.id}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setTier(opt.id)}
                      className={`p-4 text-left border transition ${
                        tier === opt.id ? "border-ember bg-ember/10" : "border-border hover:border-accent"
                      }`}
                    >
                      <div className="font-display text-base text-forest">{opt.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {opt.discount === 0 ? "Standard rate" : `${Math.round(opt.discount * 100)}% off rates & fees`}
                      </div>
                    </motion.button>
                  ))}
                </div>
                <label className="mt-6 flex items-center gap-3 p-4 border border-border hover:border-accent cursor-pointer">
                  <input type="checkbox" checked={charter} onChange={(e) => setCharter(e.target.checked)} className="accent-ember h-4 w-4" />
                  <Plane className="h-4 w-4 text-accent" />
                  <span className="text-sm font-serif text-forest">Add private bush charter (round-trip)</span>
                  <span className="ml-auto font-display text-sm text-muted-foreground">+ $4,200</span>
                </label>
              </div>
            </Reveal>
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="bg-ink text-bone p-8 border border-accent/40 shadow-[var(--shadow-vintage)]">
                <Eyebrow light>Live estimate</Eyebrow>
                <div className="mt-6 space-y-3 text-sm">
                  <Row label={`${c.label} · ${days} d × ${hunters}`} value={fmt(breakdown.dailyRate)} />
                  <Row label="Trophy fees" value={fmt(breakdown.trophyFees)} />
                  <Row label="Conservation levy" value={fmt(breakdown.conservation)} />
                  {charter && <Row label="Bush charter" value={fmt(breakdown.charterFee)} />}
                  <div className="h-px bg-bone/15 my-2" />
                  <Row label="Subtotal" value={fmt(breakdown.subtotal)} muted />
                  <AnimatePresence>
                    {breakdown.discount > 0 && (
                      <motion.div
                        key="discount"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <Row label={`${t.label} member discount`} value={`− ${fmt(breakdown.discount)}`} accent />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-8 pt-6 border-t border-bone/15">
                  <div className="text-[10px] tracking-[0.4em] uppercase text-accent">Estimated total</div>
                  <motion.div
                    key={breakdown.total}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="font-display text-5xl text-bone mt-2"
                  >
                    {fmt(breakdown.total)}
                  </motion.div>
                  <div className="text-xs text-bone/50 mt-2">
                    All-inclusive of camp, PH, tracking, and trophy preparation. Excludes shipping & taxes.
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="mt-8 inline-flex w-full justify-center items-center gap-2 px-6 py-4 bg-accent text-accent-foreground tracking-[0.3em] text-[11px] uppercase hover:bg-ember hover:text-bone transition"
                >
                  Reserve this estimate <ArrowRight className="h-4 w-4" />
                </Link>

                {tier === "none" && (
                  <Link to="/membership" className="mt-3 inline-flex w-full justify-center items-center gap-2 px-6 py-3 border border-bone/30 text-bone tracking-[0.3em] text-[10px] uppercase hover:border-accent hover:text-accent transition">
                    Save up to 18% — apply for membership
                  </Link>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <SiteFooter />
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
