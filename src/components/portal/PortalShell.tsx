import { Link, useRouter } from "@tanstack/react-router";
import { Trophy, Users, LeafyGreen, UserCog, LogOut, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BinocularIcon } from "@/components/icons/BinocularIcon";
import { WaterproofMapIcon } from "@/components/icons/WaterproofMapIcon";
import { HuntingBackpackIcon } from "@/components/icons/HuntingBackpackIcon";
import { HunterBookIcon } from "@/components/icons/HunterBookIcon";

const nav = [
  { to: "/portal", label: "The Campfire", icon: BinocularIcon, exact: true },
  { to: "/portal/book", label: "Plan New Hunt", icon: WaterproofMapIcon },
  { to: "/portal/hunts", label: "My Hunts", icon: HuntingBackpackIcon },
  { to: "/portal/account", label: "Account", icon: UserCog },
];
const soon = [
  { label: "Trophy Room", icon: Trophy },
  { label: "Field Journal", icon: HunterBookIcon },
  { label: "Community", icon: Users },
  { label: "Conservation Score", icon: LeafyGreen },
];

export function PortalShell({ children, title }: { children: ReactNode; title: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function signOut() {
    await supabase.auth.signOut();
    router.navigate({ to: "/auth" });
  }

  return (
    <div className="relative min-h-screen bg-[#1a1a1a] text-[#f5f5f0]">
      {/* Topographic Background Texture */}
      <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/topo-bg.png')] bg-cover bg-center bg-no-repeat mix-blend-lighten" />
      
      {/* Topbar */}
      <header className="relative z-40 sticky top-0 bg-[#1a1a1a]/90 backdrop-blur border-b border-[#3d3d3d] px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="lg:hidden p-1" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
          <Link to="/portal" className="font-display text-[#c9a84c] text-lg tracking-wider">◆ TOP TRACKERS</Link>
        </div>
        <button onClick={signOut} className="text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] hover:text-[#c9a84c] flex items-center gap-2">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${open ? "block" : "hidden"} lg:block fixed lg:sticky top-[65px] lg:top-[65px] z-30 left-0 h-[calc(100vh-65px)] w-64 bg-[#2d2d2d] border-r border-[#3d3d3d] overflow-y-auto`}>
          <nav className="p-4 space-y-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: !!n.exact }}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#a8a8a0] hover:text-[#f5f5f0] hover:bg-[#1a1a1a] border-l-2 border-transparent transition"
                activeProps={{ className: "flex items-center gap-3 px-3 py-2.5 text-sm text-[#c9a84c] bg-[#1a1a1a] border-l-2 border-[#c9a84c]" }}
              >
                <n.icon className="h-4 w-4" /> {n.label}
              </Link>
            ))}
            <div className="pt-6 pb-2 px-3 text-[10px] tracking-[0.3em] uppercase text-[#5a5a55]">Coming soon</div>
            {soon.map((s) => (
              <div key={s.label} className="flex items-center justify-between gap-3 px-3 py-2.5 text-sm text-[#5a5a55]">
                <span className="flex items-center gap-3"><s.icon className="h-4 w-4" /> {s.label}</span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-[#c9a84c]/60">Soon</span>
              </div>
            ))}
          </nav>
          <div className="p-4 border-t border-[#3d3d3d] mt-auto">
            <Link to="/" className="text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] hover:text-[#c9a84c]">← Back to site</Link>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0 px-4 md:px-8 py-8 lg:pl-8">
          <div className="mb-8">
            <div className="text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]">Member Portal</div>
            <h1 className="mt-2 font-display text-3xl md:text-4xl text-[#f5f5f0]">{title}</h1>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
