import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { PortalShell } from "@/components/portal/PortalShell";
import { getDashboard } from "@/lib/portal.functions";
import { format, isPast } from "date-fns";
import { Download, Calendar as CalendarIcon, Briefcase, ChevronRight, X } from "lucide-react";

export const Route = createFileRoute("/_authenticated/portal/hunts")({
  head: () => ({ meta: [{ title: "My Hunts — Top Trackers" }] }),
  component: Hunts,
});

function generateICS(b: any) {
  if (!b.start_date) return;
  const start = b.start_date.replace(/-/g, "");
  const end = b.end_date ? b.end_date.replace(/-/g, "") : start;
  const name = b.species?.name || "Expedition";
  
  const icsData = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART;VALUE=DATE:${start}\nDTEND;VALUE=DATE:${end}\nSUMMARY:Top Trackers - ${name} Hunt\nDESCRIPTION:Expedition with Professional Hunter: ${b.professional_hunters?.name || "TBD"}\nEND:VEVENT\nEND:VCALENDAR`;

  const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", `hunt-${name.replace(/\s+/g, '-').toLowerCase()}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function downloadItinerary() {
  alert("Downloading your detailed itinerary PDF...");
}

function Hunts() {
  const fn = useServerFn(getDashboard);
  const { data } = useQuery({ queryKey: ["dashboard"], queryFn: () => fn() });
  const bookings = data?.bookings ?? [];
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [showKitFor, setShowKitFor] = useState<any>(null); // store booking object

  const upcoming = bookings.filter((b) => {
    if (!b.end_date) return true;
    const d = new Date(b.end_date);
    if (isNaN(d.getTime())) return true;
    return !isPast(d);
  });
  
  const past = bookings.filter((b) => {
    if (!b.end_date) return false;
    const d = new Date(b.end_date);
    if (isNaN(d.getTime())) return false;
    return isPast(d);
  });

  const activeBookings = tab === "upcoming" ? upcoming : past;

  return (
    <PortalShell title="My Hunts">
      <div className="flex items-center gap-6 border-b border-[#3d3d3d] mb-6">
        <button 
          onClick={() => setTab("upcoming")}
          className={`pb-3 text-xs tracking-[0.2em] uppercase transition ${tab === "upcoming" ? "text-[#c9a84c] border-b-2 border-[#c9a84c]" : "text-[#a8a8a0] hover:text-[#f5f5f0]"}`}
        >
          Upcoming ({upcoming.length})
        </button>
        <button 
          onClick={() => setTab("past")}
          className={`pb-3 text-xs tracking-[0.2em] uppercase transition ${tab === "past" ? "text-[#c9a84c] border-b-2 border-[#c9a84c]" : "text-[#a8a8a0] hover:text-[#f5f5f0]"}`}
        >
          Past ({past.length})
        </button>
      </div>

      {activeBookings.length === 0 ? (
        <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-10 text-center animate-in fade-in relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/hunts-bg.jpg')] bg-cover bg-center opacity-10 mix-blend-luminosity pointer-events-none" />
          <div className="relative z-10">
            <p className="text-[#a8a8a0]">No {tab} expeditions found.</p>
            {tab === "upcoming" && (
              <Link to="/portal/book" className="mt-4 inline-block px-5 py-2.5 bg-[#c9a84c] hover:bg-[#b0903c] text-[#1a1a1a] text-[10px] tracking-[0.3em] uppercase transition">Plan your first hunt</Link>
            )}
          </div>
        </div>
      ) : (
        <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeBookings.map((b) => {
            const isDraft = b.status === "draft";
            const progress = isDraft ? 25 : b.status === "submitted" ? 50 : 100;
            
            return (
              <div key={b.id} className="relative bg-[#2d2d2d] border border-[#3d3d3d] hover:border-[#c9a84c]/40 transition group overflow-hidden flex flex-col md:flex-row shadow-sm">
                
                {/* Background Image per card */}
                <div className="absolute inset-0 bg-[url('/images/hunts-bg.jpg')] bg-cover bg-center opacity-10 mix-blend-luminosity group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#2d2d2d] via-[#2d2d2d]/90 to-[#2d2d2d]/40 pointer-events-none" />

                <div className="flex-1 p-6 relative z-10">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="font-display text-2xl text-[#f5f5f0] group-hover:text-[#c9a84c] transition">{b.species?.emoji} {b.species?.name ?? "Draft expedition"}</div>
                      <div className="text-xs text-[#a8a8a0] mt-2 font-mono">
                        {b.start_date ? format(new Date(b.start_date), "PP") : "Dates TBD"}
                        {b.end_date && ` → ${format(new Date(b.end_date), "PP")}`}
                        {" · "}PH: {b.professional_hunters?.name ?? "—"}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 bg-[#1a1a1a] border border-[#3d3d3d] text-[10px] tracking-[0.3em] uppercase text-[#c9a84c]">
                        {b.status}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-[9px] tracking-[0.2em] uppercase text-[#5a5a55] mb-1.5">
                      <span className={progress >= 25 ? "text-[#a8a8a0]" : ""}>Draft</span>
                      <span className={progress >= 50 ? "text-[#a8a8a0]" : ""}>Review</span>
                      <span className={progress >= 100 ? "text-[#a8a8a0]" : ""}>Confirmed</span>
                    </div>
                    <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                      <div className="h-full bg-[#c9a84c] transition-all duration-1000 ease-out" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                </div>

                {/* Actions Sidebar */}
                <div className="relative z-10 bg-[#1a1a1a]/80 p-4 md:w-48 flex flex-row md:flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-[#3d3d3d] backdrop-blur-sm">
                  {isDraft ? (
                    <Link to="/portal/book" search={{ id: b.id }} className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#c9a84c] text-[#1a1a1a] text-[10px] tracking-[0.2em] uppercase hover:bg-[#b0903c] transition">
                      Resume <ChevronRight className="h-3 w-3" />
                    </Link>
                  ) : (
                    <>
                      <button onClick={downloadItinerary} className="flex-1 md:w-full inline-flex items-center gap-2 px-3 py-2 border border-[#3d3d3d] hover:border-[#c9a84c] text-[10px] tracking-[0.2em] uppercase text-[#a8a8a0] hover:text-[#c9a84c] transition bg-[#2d2d2d]">
                        <Download className="h-3 w-3" /> Itinerary
                      </button>
                      <button onClick={() => generateICS(b)} className="flex-1 md:w-full inline-flex items-center gap-2 px-3 py-2 border border-[#3d3d3d] hover:border-[#c9a84c] text-[10px] tracking-[0.2em] uppercase text-[#a8a8a0] hover:text-[#c9a84c] transition bg-[#2d2d2d]">
                        <CalendarIcon className="h-3 w-3" /> Calendar
                      </button>
                      <button onClick={() => setShowKitFor(b)} className="flex-1 md:w-full inline-flex items-center gap-2 px-3 py-2 border border-[#3d3d3d] hover:border-[#c9a84c] text-[10px] tracking-[0.2em] uppercase text-[#a8a8a0] hover:text-[#c9a84c] transition bg-[#2d2d2d]">
                        <Briefcase className="h-3 w-3" /> Kit List
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Kit List Modal */}
      {showKitFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#1a1a1a] border border-[#3d3d3d] max-w-lg w-full p-6 relative">
            <button onClick={() => setShowKitFor(null)} className="absolute top-4 right-4 text-[#a8a8a0] hover:text-[#c9a84c]">
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3 border-b border-[#3d3d3d] pb-4 mb-6 text-[#c9a84c]">
              <Briefcase className="h-5 w-5" />
              <h2 className="text-[10px] tracking-[0.4em] uppercase">Expedition Kit List</h2>
            </div>
            
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              <p className="text-sm text-[#a8a8a0]">
                Required gear for your upcoming {showKitFor.species?.name || "expedition"}:
              </p>
              
              <ul className="space-y-2">
                {[
                  "Neutral/Khaki clothing (3-4 sets)", 
                  "Well-broken-in boots (Veldskoen style recommended)",
                  "Wide-brimmed hat",
                  "High-quality binoculars (8x42 or 10x42)",
                  "Windproof fleece/jacket for early mornings",
                  "Personal medications & anti-malaria prophylaxis",
                  "Sunscreen & insect repellent"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 bg-[#2d2d2d] border border-[#3d3d3d]">
                    <div className="w-4 h-4 mt-0.5 border border-[#c9a84c] flex-shrink-0" />
                    <span className="text-sm text-[#f5f5f0]">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-4 border-t border-[#3d3d3d]">
                <button onClick={() => {
                   alert("Downloading PDF Kit List...");
                   setShowKitFor(null);
                }} className="w-full px-4 py-3 bg-[#c9a84c] text-[#1a1a1a] text-[10px] tracking-[0.3em] uppercase hover:bg-[#b0903c] transition font-semibold">
                  Download PDF Checklist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </PortalShell>
  );
}
