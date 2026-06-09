import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@/lib/portal.functions";
import { PortalShell } from "@/components/portal/PortalShell";
import { format } from "date-fns";
import { MapPin, Calendar, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/portal/trophy-room")({
  component: TrophyRoom,
});

function TrophyRoom() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getDashboard(),
  });

  if (isLoading) {
    return (
      <PortalShell title="Trophy Room">
        <div className="flex items-center justify-center h-64 text-[#c9a84c] tracking-[0.3em] text-[10px] uppercase animate-pulse">
          Loading Records...
        </div>
      </PortalShell>
    );
  }

  // Filter for confirmed or completed bookings (we treat confirmed as trophies for demo if they are past date, or just all non-drafts)
  const trophies = data?.bookings?.filter((b) => b.status === "confirmed" || b.status === "completed" || b.status === "submitted") ?? [];

  return (
    <PortalShell title="Trophy Room">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="font-display text-4xl text-[#c9a84c] mb-4">Field Records</h2>
          <p className="font-serif text-[#a8a8a0] italic text-lg">
            A chronicle of your successful expeditions and honored quarry.
          </p>
        </div>

        {trophies.length === 0 ? (
          <div className="bg-[#1a1a1a] border border-[#3d3d3d] p-12 text-center animate-in fade-in duration-1000">
            <h3 className="font-display text-2xl text-[#5a5a55] mb-4">No Records Yet</h3>
            <p className="text-[#a8a8a0] mb-8 font-serif italic">Your legacy begins with your first expedition.</p>
            <Link to="/portal/book" className="inline-flex items-center gap-2 px-6 py-3 border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#1a1a1a] text-[10px] tracking-[0.3em] uppercase transition">
              Plan Expedition
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trophies.map((trophy, i) => (
              <div 
                key={trophy.id} 
                className="group relative bg-[#1a1a1a] border border-[#3d3d3d] hover:border-[#c9a84c]/50 transition-all duration-500 overflow-hidden animate-in fade-in zoom-in-95 fill-mode-both"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                  <span className="text-8xl">{trophy.species?.emoji}</span>
                </div>
                
                <div className="p-8 relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]">Record #{trophy.id?.split('-')[0]}</span>
                    <CheckCircle2 className="h-4 w-4 text-[#c9a84c]" />
                  </div>
                  
                  <h3 className="font-display text-3xl text-[#f5f5f0] mb-2 group-hover:text-[#c9a84c] transition-colors duration-300">
                    {trophy.species?.name}
                  </h3>
                  
                  <div className="space-y-4 mt-8 pt-6 border-t border-[#3d3d3d]/50">
                    <div className="flex items-center gap-3 text-sm text-[#a8a8a0] font-mono">
                      <Calendar className="h-4 w-4 text-[#5a5a55]" />
                      {trophy.start_date ? format(new Date(trophy.start_date), "MMMM yyyy") : "Unknown Date"}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#a8a8a0] font-mono">
                      <MapPin className="h-4 w-4 text-[#5a5a55]" />
                      Iringa Concession, TZ
                    </div>
                  </div>
                </div>
                
                {/* Image Placeholder or Gradient */}
                <div className="h-2 w-full bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-700" />
              </div>
            ))}
          </div>
        )}
      </div>
    </PortalShell>
  );
}
