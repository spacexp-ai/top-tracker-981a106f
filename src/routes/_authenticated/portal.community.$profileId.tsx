import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { PortalShell } from "@/components/portal/PortalShell";
import { getCommunityProfile } from "@/lib/portal.functions";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  ExternalLink,
  Shield,
  MessageSquare,
  Trophy,
} from "lucide-react";
import { format } from "date-fns";

export const Route = createFileRoute("/_authenticated/portal/community/$profileId")({
  component: TrackerProfile,
});

function TrackerProfile() {
  const { profileId } = Route.useParams();
  const profileFn = useServerFn(getCommunityProfile);
  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["communityProfile", profileId],
    queryFn: () => profileFn({ data: profileId }),
  });

  if (isLoading) {
    return (
      <PortalShell title="Tracker Profile">
        <div className="text-[#a8a8a0] animate-pulse p-8">Loading profile...</div>
      </PortalShell>
    );
  }

  if (isError || !profile) {
    return (
      <PortalShell title="Tracker Profile">
        <div className="p-8 text-[#a8a8a0]">
          Profile not found or is private.
          <div className="mt-4">
            <Link
              to="/portal/community"
              className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase hover:underline"
            >
              ← Back to Lodge
            </Link>
          </div>
        </div>
      </PortalShell>
    );
  }

  return (
    <PortalShell title={`${profile.name} — Field Record`}>
      <div className="mb-6">
        <Link
          to="/portal/community"
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] hover:text-[#c9a84c] transition"
        >
          <ArrowLeft className="h-3 w-3" /> Back to Lodge
        </Link>
      </div>

      <div className="bg-[#2d2d2d] border border-[#3d3d3d] overflow-hidden">
        {/* Banner */}
        <div className="h-32 md:h-48 bg-[#1a1a1a] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/hunts-bg.jpg')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2d2d2d] to-transparent" />
        </div>

        {/* Header Info */}
        <div className="px-6 md:px-10 pb-8 relative">
          <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16 md:-mt-20 relative z-10">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#2d2d2d] object-cover bg-[#1a1a1a]"
            />
            <div className="flex-grow pb-2">
              <h1 className="font-display text-4xl text-[#f5f5f0]">{profile.name}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs tracking-[0.1em] uppercase text-[#a8a8a0]">
                <span className="flex items-center gap-1.5 text-[#c9a84c]">
                  <Shield className="h-3.5 w-3.5" /> {profile.tier}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> Joined{" "}
                  {format(new Date(profile.joined), "MMM yyyy")}
                </span>
              </div>
            </div>
            <div className="pb-2">
              <button className="flex items-center gap-2 px-6 py-3 bg-[#c9a84c] text-[#1a1a1a] hover:bg-[#b08f36] transition text-[10px] tracking-[0.3em] uppercase font-bold">
                <MessageSquare className="h-3 w-3" /> Connect
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10 mt-12">
            {/* Left Column: Bio & Info */}
            <div className="md:col-span-1 space-y-8">
              <div>
                <h3 className="text-[10px] tracking-[0.4em] uppercase text-[#a8a8a0] mb-3">
                  About the Tracker
                </h3>
                <p className="text-sm text-[#f5f5f0] font-serif italic leading-relaxed">
                  "{profile.bio}"
                </p>
              </div>

              <div>
                <h3 className="text-[10px] tracking-[0.4em] uppercase text-[#a8a8a0] mb-3">
                  Expedition Details
                </h3>
                <ul className="space-y-4 text-sm font-mono text-[#f5f5f0]">
                  <li className="flex flex-col gap-1 pb-3 border-b border-[#3d3d3d]">
                    <span className="text-[9px] uppercase tracking-widest text-[#5a5a55]">
                      Primary Quarry
                    </span>
                    <span>{profile.favorite_quarry}</span>
                  </li>
                  <li className="flex flex-col gap-1 pb-3 border-b border-[#3d3d3d]">
                    <span className="text-[9px] uppercase tracking-widest text-[#5a5a55]">
                      Total Successful Hunts
                    </span>
                    <span>{profile.trophies.length} recorded</span>
                  </li>
                </ul>
              </div>

              {(profile.social?.instagram || profile.social?.website) && (
                <div>
                  <h3 className="text-[10px] tracking-[0.4em] uppercase text-[#a8a8a0] mb-3">
                    External Links
                  </h3>
                  <div className="space-y-2">
                    {profile.social.instagram && (
                      <a
                        href={`https://instagram.com/${profile.social.instagram.replace("@", "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm text-[#c9a84c] hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" /> Instagram ({profile.social.instagram})
                      </a>
                    )}
                    {profile.social.website && (
                      <a
                        href={`https://${profile.social.website}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm text-[#c9a84c] hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" /> Personal Website
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Trophy Wall */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[10px] tracking-[0.4em] uppercase text-[#c9a84c] flex items-center gap-2">
                  <Trophy className="h-4 w-4" /> Field Record
                </h3>
              </div>

              {profile.trophies.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {profile.trophies.map((trophy: any) => (
                    <div
                      key={trophy.id}
                      className="bg-[#1a1a1a] border border-[#3d3d3d] p-5 hover:border-[#c9a84c]/30 transition group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="text-3xl group-hover:scale-110 transition-transform origin-left">
                          {trophy.emoji}
                        </div>
                        <div className="text-xs font-mono text-[#5a5a55]">
                          {format(new Date(trophy.date), "MMM yyyy")}
                        </div>
                      </div>
                      <div className="font-display text-lg text-[#f5f5f0]">{trophy.species}</div>
                      <div className="mt-2 flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-[#a8a8a0]">
                        <MapPin className="h-3 w-3" /> {trophy.location}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#1a1a1a] border border-[#3d3d3d] border-dashed p-10 text-center">
                  <p className="text-sm text-[#a8a8a0] font-serif italic">
                    This tracker hasn't published any completed expeditions to their public field
                    record yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
