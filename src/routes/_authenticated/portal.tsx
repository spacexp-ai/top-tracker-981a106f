import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useEffect } from "react";
import { PortalShell } from "@/components/portal/PortalShell";
import { getDashboard } from "@/lib/portal.functions";
import {
  Calendar,
  Compass,
  Trophy,
  BookOpen,
  ArrowRight,
  Wind,
  Thermometer,
  Moon,
  Activity,
  Map,
  Briefcase,
  Flame,
} from "lucide-react";
import { format } from "date-fns";

export const Route = createFileRoute("/_authenticated/portal")({
  head: () => ({ meta: [{ title: "The Campfire — Top Trackers" }] }),
  component: PortalLayout,
});

function PortalLayout() {
  const routerState = useRouterState();
  const isExact =
    routerState.location.pathname === "/portal" || routerState.location.pathname === "/portal/";

  if (!isExact) {
    return <Outlet />;
  }

  return <Dashboard />;
}

function Dashboard() {
  const fn = useServerFn(getDashboard);
  const { data, isLoading } = useQuery({ queryKey: ["dashboard"], queryFn: () => fn() });

  const tier = data?.roles?.[0]?.role ?? "observer";
  const next =
    data?.bookings?.find((b) => b.status !== "cancelled" && b.start_date) ?? data?.bookings?.[0];
  const firstName = (data?.profile?.display_name ?? "Tracker").split(" ")[0];

  return (
    <PortalShell title={`Welcome back, ${firstName}.`}>
      {isLoading ? (
        <div className="text-[#a8a8a0] animate-pulse">Loading the camp…</div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
          <div className="grid gap-5 md:grid-cols-3">
            <Card title="My Next Hunt" icon={Calendar} bgImage="/images/hunts-bg.jpg">
              {next ? (
                <>
                  <div className="font-display text-2xl text-[#c9a84c]">
                    {next.species?.emoji} {next.species?.name ?? "Untitled hunt"}
                  </div>
                  <div className="mt-2 text-sm text-[#a8a8a0]">
                    {next.start_date ? format(new Date(next.start_date), "PP") : "Dates TBD"}
                    {next.end_date && ` → ${format(new Date(next.end_date), "PP")}`}
                  </div>
                  <div className="mt-1 text-xs text-[#a8a8a0]">
                    PH: {next.professional_hunters?.name ?? "Unassigned"}
                  </div>
                  <div className="mt-3 inline-flex items-center gap-1 text-[10px] tracking-[0.3em] uppercase text-[#c9a84c]">
                    {next.status}
                  </div>

                  {/* New Quick Actions inside Next Hunt */}
                  <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-[#3d3d3d]/50">
                    <button className="flex-1 inline-flex justify-center items-center gap-2 px-3 py-2 bg-[#1a1a1a] border border-[#3d3d3d] hover:border-[#c9a84c] hover:text-[#c9a84c] text-[10px] tracking-[0.2em] uppercase text-[#a8a8a0] transition">
                      <Map className="h-3 w-3" /> Itinerary
                    </button>
                    <button className="flex-1 inline-flex justify-center items-center gap-2 px-3 py-2 bg-[#1a1a1a] border border-[#3d3d3d] hover:border-[#c9a84c] hover:text-[#c9a84c] text-[10px] tracking-[0.2em] uppercase text-[#a8a8a0] transition">
                      <Briefcase className="h-3 w-3" /> Packing List
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm text-[#a8a8a0]">No hunt on the calendar yet.</p>
                  <Link
                    to="/portal/book"
                    className="mt-4 inline-flex items-center gap-2 text-[#c9a84c] text-xs tracking-[0.3em] uppercase"
                  >
                    Plan a hunt <ArrowRight className="h-3 w-3" />
                  </Link>
                </>
              )}
            </Card>

            <LockedCard
              title="Trophy Room"
              icon={Trophy}
              tier={tier}
              bgImage="/images/buffalo-vintage.jpg"
            >
              <div className="text-3xl font-display text-[#c9a84c]">—</div>
              <div className="text-xs text-[#a8a8a0]">Species recorded</div>
            </LockedCard>

            <LockedCard
              title="Field Journal"
              icon={BookOpen}
              tier={tier}
              bgImage="/images/gear.jpg"
            >
              <div className="text-sm text-[#f5f5f0]">Q2 2026 — "The Buffalo of Maasai"</div>
              <div className="mt-2 text-xs text-[#a8a8a0]">Latest issue</div>
            </LockedCard>
          </div>

          <div className="grid gap-5 md:grid-cols-3 mt-8">
            <div className="md:col-span-2 space-y-8">
              {/* Weather window */}
              <LiveWeatherWidget />

              {/* Quick actions */}
              <div>
                <div className="text-[10px] tracking-[0.4em] uppercase text-[#a8a8a0] mb-3">
                  Portal actions
                </div>
                <div className="flex flex-wrap gap-3">
                  <ActionLink to="/portal/book" icon={Compass}>
                    Plan new hunt
                  </ActionLink>
                  <ActionLink to="/portal/hunts" icon={Calendar}>
                    My hunts
                  </ActionLink>
                  <ActionLink to="/contact" icon={ArrowRight}>
                    Contact camp
                  </ActionLink>
                </div>
              </div>

              {/* Activity */}
              <div>
                <div className="text-[10px] tracking-[0.4em] uppercase text-[#a8a8a0] mb-3">
                  Recent activity
                </div>
                <ul className="bg-[#2d2d2d] border border-[#3d3d3d] divide-y divide-[#3d3d3d]">
                  {(data?.bookings ?? []).slice(0, 5).map((b) => (
                    <li
                      key={b.id}
                      className="px-5 py-3 flex items-center justify-between text-sm hover:bg-[#1a1a1a]/50 transition"
                    >
                      <span className="text-[#f5f5f0] flex items-center gap-2">
                        {b.species?.emoji} {b.species?.name ?? "Draft"}{" "}
                        <span className="text-[#a8a8a0]">— {b.status}</span>
                      </span>
                      <span className="text-xs text-[#a8a8a0] font-mono">
                        {format(new Date(b.updated_at), "PP")}
                      </span>
                    </li>
                  ))}
                  {(data?.bookings ?? []).length === 0 && (
                    <li className="px-5 py-6 text-sm text-[#a8a8a0]">
                      No activity yet — your first booking will appear here.
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Campfire Updates (New Widget) */}
            <div className="md:col-span-1 space-y-8">
              <div>
                <div className="text-[10px] tracking-[0.4em] uppercase text-[#c9a84c] mb-3 flex items-center gap-2">
                  <Flame className="h-4 w-4" /> Campfire Updates
                </div>
                <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-5 space-y-6">
                  <div className="border-l-2 border-[#c9a84c] pl-3">
                    <div className="text-xs text-[#c9a84c] font-mono mb-1">July 15, 2026</div>
                    <div className="text-sm text-[#f5f5f0] mb-1">Annual Conservation Gala</div>
                    <div className="text-xs text-[#a8a8a0]">
                      Join us in Dallas for our annual fundraiser supporting African wildlife
                      corridors.
                    </div>
                  </div>
                  <div className="border-l-2 border-[#3d3d3d] pl-3">
                    <div className="text-xs text-[#a8a8a0] font-mono mb-1">June 28, 2026</div>
                    <div className="text-sm text-[#f5f5f0] mb-1">New Iringa Concession</div>
                    <div className="text-xs text-[#a8a8a0]">
                      We've expanded our tracking area. Update your preferences if you're hunting in
                      Q3.
                    </div>
                  </div>
                  <div className="border-l-2 border-[#3d3d3d] pl-3">
                    <div className="text-xs text-[#a8a8a0] font-mono mb-1">June 10, 2026</div>
                    <div className="text-sm text-[#f5f5f0] mb-1">Rifle Rental Fleet Updated</div>
                    <div className="text-xs text-[#a8a8a0]">
                      New Blaser R8 setups are now available for rent in our standard camps.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PortalShell>
  );
}

function Card({
  title,
  icon: Icon,
  bgImage,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  bgImage?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-[#2d2d2d] border border-[#3d3d3d] p-6 hover:border-[#c9a84c]/60 transition duration-300 shadow-sm overflow-hidden group">
      {bgImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity group-hover:opacity-30 transition-opacity duration-700"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2d2d2d] via-[#2d2d2d]/80 to-transparent" />
        </>
      )}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]">{title}</span>
          <Icon className="h-4 w-4 text-[#c9a84c]" />
        </div>
        {children}
      </div>
    </div>
  );
}

function LockedCard({
  title,
  icon,
  tier,
  bgImage,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  tier: string;
  bgImage?: string;
  children: React.ReactNode;
}) {
  const locked = tier === "observer";
  return (
    <div className="relative bg-[#2d2d2d] border border-[#3d3d3d] group">
      <Card title={title} icon={icon} bgImage={bgImage}>
        {children}
      </Card>
      {locked && (
        <div className="absolute inset-0 z-20 bg-[#1a1a1a]/85 flex flex-col items-center justify-center text-center px-4 backdrop-blur-[2px] opacity-100 group-hover:bg-[#1a1a1a]/90 transition duration-300">
          <div className="text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]">Tracker tier+</div>
          <Link
            to="/membership-apply"
            className="mt-3 px-4 py-2 border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#1a1a1a] text-[10px] tracking-[0.3em] uppercase transition"
          >
            Upgrade
          </Link>
        </div>
      )}
    </div>
  );
}

function ActionLink({
  to,
  icon: Icon,
  children,
}: {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1a1a1a] border border-[#3d3d3d] hover:border-[#c9a84c] hover:text-[#c9a84c] text-xs tracking-[0.2em] uppercase text-[#a8a8a0] transition shadow-sm"
    >
      <Icon className="h-3.5 w-3.5" /> {children}
    </Link>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0]">
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <div className="mt-1 font-mono text-[#f5f5f0]">{value}</div>
    </div>
  );
}

function LiveWeatherWidget() {
  const { data, isLoading } = useQuery({
    queryKey: ["weather", "iringa"],
    queryFn: async () => {
      // Iringa coordinates: -7.77, 35.69
      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=-7.77&longitude=35.69&current=temperature_2m,wind_speed_10m,weather_code,is_day&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=Africa%2FDar_es_Salaam",
      );
      return res.json();
    },
    refetchInterval: 300000,
  });

  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const tzTime = new Date(time.getTime() + time.getTimezoneOffset() * 60000 + 3 * 3600000);
  const timeStr = format(tzTime, "h:mm a");

  const isDay = data?.current?.is_day === 1;
  const temp = data?.current?.temperature_2m ? Math.round(data.current.temperature_2m) : "--";
  const wind = data?.current?.wind_speed_10m ? Math.round(data.current.wind_speed_10m) : "--";
  const code = data?.current?.weather_code ?? 0;

  const condition = code === 0 ? "Clear" : code < 4 ? "Cloudy" : code < 70 ? "Rain" : "Storm";

  const bgClass = isDay
    ? "bg-gradient-to-br from-[#c9a84c]/20 to-[#1a1a1a]"
    : "bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d]";

  return (
    <div
      className={`relative border border-[#3d3d3d] p-6 overflow-hidden ${bgClass} transition-colors duration-1000 group`}
    >
      {isDay ? (
        <div className="absolute inset-0 bg-[url('/images/sunset.jpg')] bg-cover bg-center opacity-10 mix-blend-luminosity group-hover:opacity-20 transition-opacity duration-700" />
      ) : null}

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]">
            Live Weather — Iringa, TZ
          </div>
          <div className="text-sm font-mono text-[#f5f5f0]">{timeStr} EAT</div>
        </div>

        {isLoading ? (
          <div className="animate-pulse text-[#a8a8a0] text-sm">Fetching telemetry...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <Stat icon={Thermometer} label="Temp" value={`${temp}°F`} />
            <Stat icon={Wind} label="Wind" value={`${wind} mph`} />
            <Stat icon={isDay ? Activity : Moon} label="Conditions" value={condition} />
            <Stat icon={Activity} label="Hunt score" value={isDay ? "9.4 / 10" : "Night"} />
          </div>
        )}
      </div>
    </div>
  );
}
