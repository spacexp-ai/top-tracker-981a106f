import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { PortalShell } from "@/components/portal/PortalShell";
import { getCommunityDirectory } from "@/lib/portal.functions";
import { Users, Search, ArrowRight, Shield } from "lucide-react";

export const Route = createFileRoute("/_authenticated/portal/community")({
  head: () => ({ meta: [{ title: "The Lodge — Top Trackers" }] }),
  component: CommunityDirectory,
});

function CommunityDirectory() {
  const dirFn = useServerFn(getCommunityDirectory);
  const { data: profiles, isLoading } = useQuery({
    queryKey: ["community"],
    queryFn: () => dirFn(),
  });

  return (
    <PortalShell title="The Lodge">
      <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl text-[#c9a84c]">Tracker Directory</h2>
            <p className="mt-2 font-serif italic text-[#a8a8a0]">
              Connect with fellow members, view their field records, and share expedition knowledge.
            </p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a8a8a0]" />
            <input
              type="text"
              placeholder="Search members..."
              className="bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none pl-10 pr-4 py-2 w-full md:w-64 text-sm text-[#f5f5f0]"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-[#a8a8a0] animate-pulse py-12 text-center">Loading the lodge...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(profiles ?? []).map((profile) => (
              <div
                key={profile.id}
                className="bg-[#1a1a1a] border border-[#3d3d3d] hover:border-[#c9a84c]/50 transition duration-300 group flex flex-col"
              >
                <div className="p-6 flex-grow">
                  <div className="flex items-start gap-4">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-14 h-14 rounded-full border-2 border-[#3d3d3d] group-hover:border-[#c9a84c] transition object-cover"
                    />
                    <div>
                      <div className="font-display text-lg text-[#f5f5f0]">{profile.name}</div>
                      <div className="flex items-center gap-1.5 mt-1 text-[10px] tracking-[0.2em] uppercase text-[#c9a84c]">
                        <Shield className="h-3 w-3" /> {profile.tier}
                      </div>
                    </div>
                  </div>

                  <p className="mt-5 text-xs text-[#a8a8a0] font-serif italic line-clamp-3">
                    "{profile.bio}"
                  </p>

                  <div className="mt-5 flex gap-4 text-xs font-mono text-[#5a5a55]">
                    <div>
                      <span className="block text-[9px] uppercase tracking-wider mb-1 text-[#a8a8a0]">
                        Trophies
                      </span>
                      {profile.trophies.length} recorded
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase tracking-wider mb-1 text-[#a8a8a0]">
                        Quarry
                      </span>
                      {profile.favorite_quarry}
                    </div>
                  </div>
                </div>

                <Link
                  to="/portal/community/$profileId"
                  params={{ profileId: profile.id }}
                  className="px-6 py-4 border-t border-[#3d3d3d] flex items-center justify-between text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] group-hover:text-[#c9a84c] group-hover:bg-[#2d2d2d] transition"
                >
                  View Profile <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </PortalShell>
  );
}
