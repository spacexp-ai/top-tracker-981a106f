import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useMemo, useEffect } from "react";
import { z } from "zod";
import { format, differenceInCalendarDays, addDays } from "date-fns";
import { PortalShell } from "@/components/portal/PortalShell";
import { getCatalog, saveBooking, getDashboard } from "@/lib/portal.functions";
import { Calendar } from "@/components/ui/calendar";
import { ArrowLeft, ArrowRight, Check, Loader2, MapPin, Heart } from "lucide-react";

const search = z.object({ id: z.string().uuid().optional() });

export const Route = createFileRoute("/_authenticated/portal/book")({
  validateSearch: (s) => search.parse(s),
  head: () => ({ meta: [{ title: "The Expedition Planner — Top Trackers" }] }),
  component: Book,
});

const STEPS = ["Quarry", "Window", "PH", "Camp", "Kit", "Commit"] as const;
const CAMP_TIERS = [
  { id: "classic", name: "Classic Canvas", price: 0, desc: "Walled tents, hot bucket showers, kerosene lanterns." },
  { id: "luxury", name: "Luxury Bush Suite", price: 2400, desc: "Private deck, plumbed bathroom, generator power." },
  { id: "fly", name: "Fly-Camp", price: -800, desc: "Minimal mobile camp, deeper in the concession." },
];
const KIT_OPTIONS = [
  { id: "rifle_rental", name: ".375 H&H rifle rental", price: 450 },
  { id: "ammo", name: "Premium ammunition pack", price: 280 },
  { id: "tracker", name: "Additional senior tracker", price: 650 },
  { id: "videographer", name: "Hunt videographer", price: 1800 },
];

function Book() {
  const { id } = Route.useSearch();
  const navigate = useNavigate();
  const catalogFn = useServerFn(getCatalog);
  const dashFn = useServerFn(getDashboard);
  const saveFn = useServerFn(saveBooking);

  const { data: catalog } = useQuery({ queryKey: ["catalog"], queryFn: () => catalogFn() });
  const { data: dash } = useQuery({ queryKey: ["dashboard"], queryFn: () => dashFn() });
  const existing = id ? dash?.bookings?.find((b) => b.id === id) : undefined;

  const [step, setStep] = useState(1);
  const [bookingId, setBookingId] = useState<string | undefined>(id);
  const [speciesId, setSpeciesId] = useState<string | null>(null);
  const [phId, setPhId] = useState<string | null>(null);
  const [range, setRange] = useState<{ from?: Date; to?: Date }>({});
  const [partySize, setPartySize] = useState(1);
  const [campTier, setCampTier] = useState<string | null>(null);
  const [kit, setKit] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (existing && !bookingId) {
      setBookingId(existing.id);
      setStep(existing.current_step ?? 1);
      setSpeciesId(existing.species_id);
      setPhId(existing.ph_id);
      if (existing.start_date) setRange({ from: new Date(existing.start_date), to: existing.end_date ? new Date(existing.end_date) : undefined });
      setPartySize(existing.party_size ?? 1);
      setCampTier(existing.camp_tier);
      setKit((existing.kit as Record<string, boolean>) ?? {});
      setNotes(existing.notes ?? "");
    }
  }, [existing, bookingId]);

  const species = catalog?.species ?? [];
  const phs = catalog?.phs ?? [];
  const selectedSpecies = species.find((s) => s.id === speciesId);
  const days = range.from && range.to ? differenceInCalendarDays(range.to, range.from) + 1 : 0;

  const total = useMemo(() => {
    let t = (selectedSpecies?.base_price_usd ?? 0) * Math.max(1, partySize);
    const camp = CAMP_TIERS.find((c) => c.id === campTier);
    if (camp) t += camp.price * Math.max(1, days);
    KIT_OPTIONS.forEach((k) => { if (kit[k.id]) t += k.price; });
    return t;
  }, [selectedSpecies, partySize, campTier, days, kit]);

  const saveMut = useMutation({
    mutationFn: (status: "draft" | "submitted") => saveFn({
      data: {
        id: bookingId,
        species_id: speciesId,
        ph_id: phId,
        start_date: range.from ? format(range.from, "yyyy-MM-dd") : null,
        end_date: range.to ? format(range.to, "yyyy-MM-dd") : null,
        party_size: partySize,
        camp_tier: campTier,
        kit,
        notes,
        total_estimate_usd: total,
        current_step: step,
        status,
      },
    }),
    onSuccess: (row) => {
      if (row && "id" in row) setBookingId(row.id as string);
    },
  });

  function next() { setStep((s) => Math.min(6, s + 1)); saveMut.mutate("draft"); }
  function prev() { setStep((s) => Math.max(1, s - 1)); }

  async function submit() {
    await saveMut.mutateAsync("submitted");
    navigate({ to: "/portal" });
  }

  const canNext = ({ 1: !!speciesId, 2: !!range.from && !!range.to, 3: !!phId, 4: !!campTier, 5: true, 6: true } as Record<number, boolean>)[step];

  return (
    <PortalShell title="The Expedition Planner">
      {/* Steps */}
      <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-4 mb-6 flex items-center gap-2 overflow-x-auto">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const state = n < step ? "done" : n === step ? "active" : "pending";
          return (
            <div key={label} className="flex items-center gap-2 shrink-0">
              <div className={`h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-mono ${
                state === "active" ? "bg-[#c9a84c] text-[#1a1a1a]" :
                state === "done" ? "border border-[#c9a84c] text-[#c9a84c]" :
                "border border-[#3d3d3d] text-[#5a5a55]"
              }`}>{state === "done" ? <Check className="h-3 w-3" /> : n}</div>
              <span className={`text-[10px] tracking-[0.25em] uppercase ${state === "active" ? "text-[#c9a84c]" : "text-[#a8a8a0]"}`}>{label}</span>
              {i < STEPS.length - 1 && <span className="w-6 h-px bg-[#3d3d3d]" />}
            </div>
          );
        })}
      </div>

      <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-6 md:p-8">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <H>Select your quarry</H>
            <P>"Every track tells a story. Choose wisely."</P>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {species.map((s) => (
                <div key={s.id} className="relative group">
                  <button onClick={() => setSpeciesId(s.id)}
                    className={`w-full h-full p-5 text-left border transition duration-300 ${speciesId === s.id ? "border-[#c9a84c] bg-[#1a1a1a] shadow-[0_0_15px_rgba(201,168,76,0.1)]" : "border-[#3d3d3d] bg-[#2d2d2d] hover:border-[#c9a84c]/60 hover:-translate-y-1"}`}>
                    <div className="text-4xl mb-3 transition-transform group-hover:scale-110 origin-left">{s.emoji}</div>
                    <div className="font-display text-lg text-[#f5f5f0]">{s.name}</div>
                    <div className="font-mono text-xs text-[#c9a84c] mt-1">${(s.base_price_usd ?? 0).toLocaleString()}</div>
                    <div className="mt-3 pt-3 border-t border-[#3d3d3d] text-[10px] tracking-[0.2em] uppercase text-[#a8a8a0] flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {s.concession}
                    </div>
                  </button>
                  <button 
                    className="absolute top-4 right-4 text-[#5a5a55] hover:text-[#c9a84c] transition z-10"
                    title="Save to Wishlist"
                    onClick={(e) => { e.stopPropagation(); alert('Saved to wishlist!'); }}
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-8 relative h-48 bg-[#1a1a1a] border border-[#3d3d3d] overflow-hidden group">
              {/* Interactive Map Placeholder */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-1000" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #c9a84c 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="text-center">
                   <MapPin className="h-8 w-8 text-[#c9a84c] mx-auto mb-2 animate-bounce" />
                   <div className="text-[10px] tracking-[0.3em] uppercase text-[#c9a84c] bg-[#1a1a1a]/80 px-3 py-1 backdrop-blur-sm">Iringa Concession, 6°54'21.0"S 34°59'14.8"E</div>
                 </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <>
            <H>The window</H>
            <P>Select your hunt dates. Dry-season optimal: July–September.</P>
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="bg-[#1a1a1a] border border-[#3d3d3d] p-3 pointer-events-auto">
                <Calendar
                  mode="range"
                  selected={range.from ? { from: range.from, to: range.to } : undefined}
                  onSelect={(r) => setRange(r ? { from: r.from, to: r.to } : {})}
                  disabled={(d) => d < new Date(new Date().toDateString())}
                  numberOfMonths={1}
                  className="pointer-events-auto"
                />
              </div>
              <div className="space-y-3 text-sm">
                <div className="bg-[#1a1a1a] border border-[#3d3d3d] p-5">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[#c9a84c]">Selected</div>
                  <div className="mt-2 font-mono text-[#f5f5f0]">
                    {range.from ? format(range.from, "PP") : "—"} → {range.to ? format(range.to, "PP") : "—"}
                  </div>
                  <div className="mt-1 text-xs text-[#a8a8a0]">{days || 0} days</div>
                </div>
                <div className="bg-[#1a1a1a] border border-[#3d3d3d] p-5">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[#c9a84c]">Forecast (typical)</div>
                  <ul className="mt-2 text-xs text-[#a8a8a0] space-y-1 font-mono">
                    <li>Temp 68–74°F · Wind SE 8–15mph</li>
                    <li>Moon: waxing gibbous · Rain 5%</li>
                    <li className="text-[#c9a84c]">Hunt score: 9.2 / 10 — Excellent</li>
                  </ul>
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Party size</label>
                  <input type="number" min={1} max={8} value={partySize} onChange={(e) => setPartySize(parseInt(e.target.value || "1"))}
                    className="w-32 bg-[#1a1a1a] border border-[#3d3d3d] px-4 py-2 font-mono" />
                </div>
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <H>Your Professional Hunter</H>
            <P>Pair with the right tracker for your quarry.</P>
            <div className="mt-6 grid md:grid-cols-3 gap-5">
              {phs.map((p) => (
                <button key={p.id} onClick={() => setPhId(p.id)}
                  className={`text-left p-6 border transition duration-300 ${phId === p.id ? "border-[#c9a84c] bg-[#1a1a1a] shadow-[0_0_15px_rgba(201,168,76,0.1)]" : "border-[#3d3d3d] bg-[#2d2d2d] hover:border-[#c9a84c]/60 hover:-translate-y-1"}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-[#1a1a1a] border border-[#3d3d3d] flex items-center justify-center text-[#c9a84c] font-display text-xl">{p.name ? p.name.charAt(0) : "?"}</div>
                    <div>
                      <div className="font-display text-lg text-[#f5f5f0]">{p.name}</div>
                      <div className="text-[10px] tracking-[0.3em] uppercase text-[#c9a84c]">{p.years_experience} seasons</div>
                    </div>
                  </div>
                  <p className="text-xs text-[#a8a8a0] font-serif italic leading-relaxed">{p.bio}</p>
                  <div className="mt-4 pt-4 border-t border-[#3d3d3d] flex flex-wrap gap-1.5">
                    {p.specialties?.map((s) => <span key={s} className="text-[9px] tracking-[0.2em] uppercase px-2 py-1 bg-[#1a1a1a] border border-[#3d3d3d] text-[#a8a8a0]">{s}</span>)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <H>Camp</H>
            <P>Choose your accommodation.</P>
            <div className="mt-6 grid md:grid-cols-3 gap-5">
              {CAMP_TIERS.map((c) => (
                <button key={c.id} onClick={() => setCampTier(c.id)}
                  className={`relative overflow-hidden text-left p-6 border transition duration-300 ${campTier === c.id ? "border-[#c9a84c] bg-[#1a1a1a] shadow-[0_0_15px_rgba(201,168,76,0.1)]" : "border-[#3d3d3d] bg-[#2d2d2d] hover:border-[#c9a84c]/60 hover:-translate-y-1"}`}>
                  {campTier === c.id && <div className="absolute top-0 right-0 w-16 h-16 bg-[#c9a84c]/10 rounded-bl-full" />}
                  <div className="font-display text-xl text-[#f5f5f0]">{c.name}</div>
                  <div className="font-mono text-xs text-[#c9a84c] mt-2 inline-block px-2 py-0.5 border border-[#c9a84c]/30">{c.price >= 0 ? "+" : ""}${c.price}/day</div>
                  <p className="mt-4 pt-4 border-t border-[#3d3d3d] text-xs text-[#a8a8a0] font-serif leading-relaxed">{c.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <>
            <H>The kit</H>
            <P>Add rentals and support staff.</P>
            <div className="mt-6 space-y-3">
              {KIT_OPTIONS.map((k) => (
                <label key={k.id} className="flex items-center justify-between p-4 bg-[#1a1a1a] border border-[#3d3d3d] cursor-pointer hover:border-[#c9a84c]/50">
                  <span className="flex items-center gap-3">
                    <input type="checkbox" checked={!!kit[k.id]} onChange={(e) => setKit({ ...kit, [k.id]: e.target.checked })}
                      className="accent-[#c9a84c] h-4 w-4" />
                    <span className="text-sm text-[#f5f5f0]">{k.name}</span>
                  </span>
                  <span className="font-mono text-xs text-[#c9a84c]">+${k.price}</span>
                </label>
              ))}
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2 mt-4">Notes for camp</label>
                <textarea rows={4} maxLength={2000} value={notes} onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3" />
              </div>
            </div>
          </>
        )}

        {step === 6 && (
          <>
            <H>Commit</H>
            <P>Review and submit your expedition request.</P>
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <ul className="space-y-2 text-sm font-mono text-[#f5f5f0]">
                <Row label="Species" value={`${selectedSpecies?.emoji ?? ""} ${selectedSpecies?.name ?? "—"}`} />
                <Row label="Dates" value={range.from ? `${format(range.from, "PP")} → ${range.to ? format(range.to, "PP") : "—"}` : "—"} />
                <Row label="Party" value={String(partySize)} />
                <Row label="PH" value={phs.find((p) => p.id === phId)?.name ?? "—"} />
                <Row label="Camp" value={CAMP_TIERS.find((c) => c.id === campTier)?.name ?? "—"} />
                <Row label="Kit" value={Object.keys(kit).filter((k) => kit[k]).length ? Object.keys(kit).filter((k) => kit[k]).join(", ") : "Standard"} />
              </ul>
              <div className="bg-[#1a1a1a] border border-[#c9a84c]/40 p-6">
                <div className="text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]">Estimated total</div>
                <div className="mt-2 font-display text-4xl text-[#f5f5f0]">${total.toLocaleString()}</div>
                <div className="mt-1 text-xs text-[#a8a8a0]">USD, before government fees & CITES.</div>
                <p className="mt-4 text-xs text-[#a8a8a0] font-serif italic">Submission begins a 7-day reservation window. A $1,500 deposit secures your dates.</p>
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="mt-8 flex items-center justify-between border-t border-[#3d3d3d] pt-6">
          <button onClick={prev} disabled={step === 1}
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] hover:text-[#c9a84c] disabled:opacity-40">
            <ArrowLeft className="h-3 w-3" /> Back
          </button>
          <div className="flex items-center gap-3">
            <button onClick={() => saveMut.mutate("draft")} className="text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] hover:text-[#c9a84c]">
              {saveMut.isPending ? "Saving…" : "Save progress"}
            </button>
            {step < 6 ? (
              <button onClick={next} disabled={!canNext}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a84c] text-[#1a1a1a] text-[10px] tracking-[0.3em] uppercase disabled:opacity-40">
                Continue <ArrowRight className="h-3 w-3" />
              </button>
            ) : (
              <button onClick={submit} disabled={saveMut.isPending}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a84c] text-[#1a1a1a] text-[10px] tracking-[0.3em] uppercase">
                {saveMut.isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3" />} Submit expedition
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 text-right">
        <Link to="/portal" className="text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] hover:text-[#c9a84c]">Exit & return later</Link>
      </div>
    </PortalShell>
  );
}

function H({ children }: { children: React.ReactNode }) { return <h2 className="font-display text-2xl text-[#c9a84c]">{children}</h2>; }
function P({ children }: { children: React.ReactNode }) { return <p className="mt-2 font-serif italic text-[#a8a8a0]">{children}</p>; }
function Row({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex justify-between py-2 border-b border-[#3d3d3d]">
      <span className="text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0]">{label}</span>
      <span className="text-[#f5f5f0]">{value}</span>
    </li>
  );
}
