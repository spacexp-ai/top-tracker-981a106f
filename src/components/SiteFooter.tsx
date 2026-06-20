import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";
import logoEn from "@/assets/logo_en.webp";
import logoHu from "@/assets/logo_hu.webp";
import { NewsletterForm } from "@/components/NewsletterForm";

export function SiteFooter() {
  const { t, i18n } = useTranslation();
  const currentLogo = i18n.language === "hu" ? logoHu : logoEn;

  return (
    <footer className="relative bg-ink text-bone overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_30%_20%,var(--color-accent),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" className="inline-block mb-6">
              <img
                src={currentLogo}
                alt="Top Trackers Safari & Hunting Club"
                className="h-[80px] w-[240px] object-contain"
              />
            </Link>
            <p className="font-serif text-lg text-bone/70 max-w-md leading-relaxed">
              {t(
                "footer.tag",
                "The ancient art of the African chase, met with the quiet confidence of a private membership.",
              )}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.instagram.com/top_trackers/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="p-2.5 border border-accent/40 hover:bg-accent hover:text-accent-foreground transition"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61589404406645"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="p-2.5 border border-accent/40 hover:bg-accent hover:text-accent-foreground transition"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.youtube.com/@TopTrackers"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="p-2.5 border border-accent/40 hover:bg-accent hover:text-accent-foreground transition"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-accent mb-5">
              {t("footer.office", "Office")}
            </h4>
            <ul className="space-y-3 text-sm text-bone/75">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-accent shrink-0" />{" "}
                <span>Losirva, Esilalei, Monduli — Tanzania</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent shrink-0" /> <span>+255 763 075 130</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-accent shrink-0" />{" "}
                <span className="break-all">info@top-trackers.com</span>
              </li>
            </ul>
            <div className="mt-5 pt-4 border-t border-bone/10">
              <div className="text-[10px] tracking-[0.3em] uppercase text-accent/80 mb-1.5">
                {t("footer.base_camp", "Base Camp")}
              </div>
              <div className="text-sm text-bone/70 font-serif italic">
                {t("footer.river", "on the bank of Njombe River")}
              </div>
              <div className="text-[11px] tracking-[0.18em] text-bone/45 mt-1">
                6°54′21.0″S · 34°59′14.8″E
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-accent mb-5">
              {t("footer.compass", "Compass")}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/our-story" className="hover:text-accent">
                  {t("nav.story", "Our Story")}
                </Link>
              </li>
              <li>
                <Link to="/experience" className="hover:text-accent">
                  {t("nav.experience", "The Experience")}
                </Link>
              </li>
              <li>
                <Link to="/hunting-services" className="hover:text-accent">
                  {t("nav.hunting_services", "Hunting Services")}
                </Link>
              </li>
              <li>
                <Link to="/conservation" className="hover:text-accent">
                  {t("nav.conservation", "Conservation")}
                </Link>
              </li>
              <li>
                <Link to="/journal" className="hover:text-accent">
                  {t("nav.journal", "Journal")}
                </Link>
              </li>
              <li>
                <Link to="/membership" className="hover:text-accent">
                  {t("nav.membership", "Membership")}
                </Link>
              </li>
              <li>
                <Link to="/partners" className="hover:text-accent">
                  {t("nav.partners", "Partners")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent">
                  {t("nav.contact", "Contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-accent mb-5">
              {t("footer.dispatch", "Field Dispatch")}
            </h4>
            <NewsletterForm compact />
            <ul className="mt-6 space-y-2 text-xs text-bone/60">
              <li>
                <Link to="/faqs" className="hover:text-accent">
                  {t("nav.faqs", "FAQs")}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-accent">
                  {t("nav.terms", "Terms")}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-accent">
                  {t("nav.privacy", "Privacy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-bone/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-bone/50">
          <p>
            © {new Date().getFullYear()} Top Trackers. {t("footer.rights", "All rights reserved.")}
          </p>
          <p className="tracking-[0.2em] uppercase">
            {t("footer.slogan", "Ethical Hunting · Conservation Heritage")}
          </p>
        </div>
      </div>
    </footer>
  );
}
