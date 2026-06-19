import { Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import logoEn from "@/assets/logo_en.webp";
import logoHu from "@/assets/logo_hu.webp";

const exploreLinks = [
  { to: "/experience", label: "The Experience" },
  { to: "/concessions", label: "Our Concessions" },
  { to: "/camp", label: "Camp Life" },
  { to: "/beyond-the-hunt", label: "Beyond the Hunt" },
];

export function SiteNav() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showExploreDropdown, setShowExploreDropdown] = useState(false);
  const exploreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close explore dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (exploreRef.current && !exploreRef.current.contains(e.target as Node)) {
        setShowExploreDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const leftLinks = [
    { to: "/our-story", label: t("nav.story", "Our Story") },
    // "Explore" dropdown is handled separately
    { to: "/membership", label: t("nav.membership", "Hunting Club") },
  ];

  const rightLinks = [
    { to: "/gallery", label: t("nav.gallery", "Gallery") },
    { to: "/journal", label: t("nav.journal", "Journal") },
    { to: "/conservation", label: t("nav.conservation", "Conservation") },
    { to: "/contact", label: t("nav.contact", "Contact") },
  ];

  const allMobileLinks = [
    { to: "/our-story", label: t("nav.story", "Our Story") },
    { to: "/experience", label: t("nav.experience", "The Experience") },
    { to: "/concessions", label: "Our Concessions" },
    { to: "/camp", label: "Camp Life" },
    { to: "/beyond-the-hunt", label: "Beyond the Hunt" },
    { to: "/membership", label: t("nav.membership", "Hunting Club") },
    { to: "/gallery", label: t("nav.gallery", "Gallery") },
    { to: "/journal", label: t("nav.journal", "Journal") },
    { to: "/conservation", label: t("nav.conservation", "Conservation") },
    { to: "/contact", label: t("nav.contact", "Contact") },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
    setShowLanguageDropdown(false);
  };

  const [currentLogo, setCurrentLogo] = useState(logoEn);

  useEffect(() => {
    setCurrentLogo(i18n.language === "hu" ? logoHu : logoEn);
  }, [i18n.language]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ink/85 backdrop-blur-md border-b border-accent/20" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-3 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        {/* Left links (desktop) */}
        <div className="hidden lg:flex items-center justify-end gap-1">
          <nav className="flex items-center gap-1">
            {/* Our Story */}
            <Link
              to="/our-story"
              className="relative px-3 py-2 text-[10px] tracking-[0.2em] uppercase text-bone/85 hover:text-accent transition-colors"
              activeProps={{ className: "text-accent" }}
            >
              {t("nav.story", "Our Story")}
            </Link>

            {/* Explore Dropdown */}
            <div
              ref={exploreRef}
              className="relative"
              onMouseEnter={() => setShowExploreDropdown(true)}
              onMouseLeave={() => setShowExploreDropdown(false)}
            >
              <button
                onClick={() => setShowExploreDropdown((v) => !v)}
                className="flex items-center gap-1 px-3 py-2 text-[10px] tracking-[0.2em] uppercase text-bone/85 hover:text-accent transition-colors cursor-pointer"
              >
                {t("nav.explore", "Explore")}
                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-200 ${showExploreDropdown ? "rotate-180" : ""}`}
                />
              </button>

              {showExploreDropdown && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-0 w-52 bg-ink/95 backdrop-blur-md border border-accent/25 shadow-2xl z-50 py-1">
                  {/* small triangle pointer */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-ink/95 border-l border-t border-accent/25 rotate-45" />
                  {exploreLinks.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setShowExploreDropdown(false)}
                      className="block px-5 py-3 text-[10px] tracking-[0.2em] uppercase text-bone/75 hover:text-accent hover:bg-accent/5 transition-colors"
                      activeProps={{ className: "text-accent bg-accent/5" }}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Hunting Club */}
            <Link
              to="/membership"
              className="relative px-3 py-2 text-[10px] tracking-[0.2em] uppercase text-bone/85 hover:text-accent transition-colors"
              activeProps={{ className: "text-accent" }}
            >
              {t("nav.membership", "Hunting Club")}
            </Link>
          </nav>
        </div>

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
            src={currentLogo}
            alt="Top Trackers Safari & Hunting Club"
            className="h-[80px] w-[240px] object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:rotate-[6deg]"
          />
        </Link>

        {/* Right links + Language Dropdown (desktop) */}
        <div className="hidden lg:flex items-center justify-start gap-3">
          <nav className="flex items-center gap-1">
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

          {/* Language Selector Dropdown */}
          <div className="relative ml-2">
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="flex items-center gap-1.5 px-2 py-1 text-[10px] tracking-[0.2em] uppercase text-accent border border-accent/30 hover:border-accent bg-ink/40 transition-all rounded-sm cursor-pointer"
            >
              <Globe className="h-3 w-3" />
              <span>{i18n.language === "hu" ? "HU" : "EN"}</span>
            </button>

            {showLanguageDropdown && (
              <div className="absolute right-0 mt-2 py-1 w-24 bg-ink border border-accent/20 rounded shadow-xl z-50">
                <button
                  onClick={() => changeLanguage("en")}
                  className={`w-full text-left px-3 py-2 text-[10px] tracking-[0.2em] uppercase transition-colors hover:bg-forest/20 cursor-pointer ${
                    i18n.language !== "hu" ? "text-accent font-semibold" : "text-bone/80"
                  }`}
                >
                  🇬🇧 EN
                </button>
                <button
                  onClick={() => changeLanguage("hu")}
                  className={`w-full text-left px-3 py-2 text-[10px] tracking-[0.2em] uppercase transition-colors hover:bg-forest/20 cursor-pointer ${
                    i18n.language === "hu" ? "text-accent font-semibold" : "text-bone/80"
                  }`}
                >
                  🇭🇺 HU
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Language Selector (right-side to balance grid) */}
        <div className="lg:hidden justify-self-end flex items-center gap-2">
          <button
            onClick={() => changeLanguage(i18n.language === "hu" ? "en" : "hu")}
            className="flex items-center gap-1 px-2.5 py-1.5 text-[10px] tracking-[0.2em] uppercase text-accent border border-accent/30 bg-ink/50 rounded-sm"
          >
            <Globe className="h-3 w-3" />
            <span>{i18n.language === "hu" ? "HU" : "EN"}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-ink/95 border-t border-accent/20 px-6 py-6 flex flex-col gap-1">
          {allMobileLinks.map((l, i) => {
            const isSubItem = ["/concessions", "/camp", "/beyond-the-hunt"].includes(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`py-2.5 tracking-[0.2em] uppercase text-sm transition-colors hover:text-accent ${
                  isSubItem
                    ? "pl-5 text-bone/60 text-[11px] border-l border-accent/20"
                    : "text-bone"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
