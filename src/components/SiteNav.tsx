import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const leftLinks = [
  { to: "/our-story", label: "Our Story" },
  { to: "/experience", label: "The Experience" },
  { to: "/membership", label: "Membership" },
];

const rightLinks = [
  { to: "/gallery", label: "Gallery" },
  { to: "/journal", label: "Journal" },
  { to: "/conservation", label: "Conservation" },
  { to: "/contact", label: "Contact" },
];

const allLinks = [...leftLinks, ...rightLinks];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ink/85 backdrop-blur-md border-b border-accent/20" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-3 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        {/* Left links (desktop) */}
        <nav className="hidden lg:flex items-center justify-end gap-1">
          {leftLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative px-3 py-2 text-[10px] tracking-[0.2em] uppercase text-bone/85 hover:text-accent transition-colors"
              activeProps={{ className: "text-accent" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button (left) */}
        <button
          className="lg:hidden text-bone p-2 justify-self-start"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>

        {/* Centered logo */}
        <Link to="/" className="flex items-center group" aria-label="Top Trackers — Home">
          <img
            src={logo}
            alt="Top Trackers Safari & Hunting Club"
            className="h-[60px] w-[180px] object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:rotate-[6deg]"
          />
        </Link>

        {/* Right links (desktop) */}
        <nav className="hidden lg:flex items-center justify-start gap-1">
          {rightLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative px-3 py-2 text-[10px] tracking-[0.2em] uppercase text-bone/85 hover:text-accent transition-colors"
              activeProps={{ className: "text-accent" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Mobile right-side spacer to balance grid */}
        <span className="lg:hidden" />
      </div>

      {open && (
        <div className="lg:hidden bg-ink/95 border-t border-accent/20 px-6 py-6 flex flex-col gap-4">
          {allLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-bone tracking-[0.2em] uppercase text-sm"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
