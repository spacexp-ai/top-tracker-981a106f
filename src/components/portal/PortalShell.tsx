import { Link, useRouter } from "@tanstack/react-router";
import { Trophy, Users, LeafyGreen, UserCog, LogOut, Menu, X, ChevronDown, User, Settings, Image as ImageIcon, Users2 } from "lucide-react";
import { useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BinocularIcon } from "@/components/icons/BinocularIcon";
import { WaterproofMapIcon } from "@/components/icons/WaterproofMapIcon";
import { HuntingBackpackIcon } from "@/components/icons/HuntingBackpackIcon";
import { HunterBookIcon } from "@/components/icons/HunterBookIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const nav = [
  { to: "/portal", label: "The Campfire", icon: BinocularIcon, exact: true },
  { to: "/portal/book", label: "Plan New Hunt", icon: WaterproofMapIcon },
  { to: "/portal/hunts", label: "My Hunts", icon: HuntingBackpackIcon },
  { to: "/portal/trophy-room", label: "Trophy Room", icon: Trophy },
  { to: "/portal/community", label: "The Lodge", icon: Users },
  { to: "/portal/account", label: "Account", icon: UserCog },
];
const soon = [
  { label: "Field Journal", icon: HunterBookIcon },
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
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 hover:bg-[#2d2d2d] py-1 px-2 rounded-md transition-colors outline-none focus:ring-1 focus:ring-[#c9a84c]">
              <span className="text-sm text-[#f5f5f0] hidden md:block">Tracker</span>
              <Avatar className="h-8 w-8 border border-[#3d3d3d]">
                <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="@tracker" />
                <AvatarFallback>TR</AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 text-[#a8a8a0]" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-[#2d2d2d] border-[#3d3d3d] text-[#f5f5f0]" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-[#f5f5f0]">Tracker</p>
                <p className="text-xs leading-none text-[#a8a8a0]">
                  tracker@toptrackers.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#3d3d3d]" />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild className="focus:bg-[#1a1a1a] focus:text-[#c9a84c] cursor-pointer">
                <Link to="/portal/account">
                  <User className="mr-2 h-4 w-4" />
                  <span>My Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="focus:bg-[#1a1a1a] focus:text-[#c9a84c] cursor-pointer">
                <Link to="/portal/trophy-room">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  <span>Photos</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="focus:bg-[#1a1a1a] focus:text-[#c9a84c] cursor-pointer">
                <Link to="/portal/community">
                  <Users2 className="mr-2 h-4 w-4" />
                  <span>Followers</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="focus:bg-[#1a1a1a] focus:text-[#c9a84c] cursor-pointer">
                <Link to="/portal/community">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Groups</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-[#3d3d3d]" />
            <DropdownMenuItem asChild className="focus:bg-[#1a1a1a] focus:text-[#c9a84c] cursor-pointer">
              <Link to="/portal/account">
                <Settings className="mr-2 h-4 w-4" />
                <span>Preferences</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#3d3d3d]" />
            <DropdownMenuItem onClick={signOut} className="focus:bg-[#1a1a1a] focus:text-[#c9a84c] cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
