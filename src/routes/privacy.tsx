import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Eyebrow } from "@/components/Eyebrow";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Top Trackers" },
      {
        name: "description",
        content: "How Top Trackers collects, uses, and protects your personal data.",
      },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  const { t } = useTranslation();
  const { data: content } = useSiteContent();

  const getContent = (key: string, fallback: string) => {
    return content?.[key] ?? fallback;
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <section className="paper-bg pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <Eyebrow>
            {getContent(
              "privacy.hero.eyebrow",
              t("privacy_page.hero.eyebrow", "Discretion as a discipline"),
            )}
          </Eyebrow>
          <h1 className="mt-6 font-display text-5xl text-forest">
            {getContent("privacy.hero.title", t("privacy_page.hero.title", "Privacy Policy"))}
          </h1>
          <p className="mt-4 font-serif text-sm text-muted-foreground">
            {getContent(
              "privacy.hero.date",
              t("privacy_page.hero.date", "Last updated: 1 May 2026"),
            )}
          </p>

          <article className="mt-10 font-serif text-lg text-foreground/80 space-y-6 leading-relaxed">
            <p>
              {getContent(
                "privacy.intro",
                t(
                  "privacy_page.intro",
                  "Top Trackers Ltd. respects your privacy. This policy explains what we collect, why, and what we will never do with your information.",
                ),
              )}
            </p>

            <h2 className="font-display text-2xl text-forest pt-4">
              {getContent(
                "privacy.section.1.title",
                t("privacy_page.section.1.title", "What we collect"),
              )}
            </h2>
            <p>
              {getContent(
                "privacy.section.1.body",
                t(
                  "privacy_page.section.1.body",
                  "Booking and membership applications: name, contact details, travel documents, dietary and medical notes relevant to the safari. Website analytics: pages visited and aggregate device data, only with your cookie consent.",
                ),
              )}
            </p>

            <h2 className="font-display text-2xl text-forest pt-4">
              {getContent(
                "privacy.section.2.title",
                t("privacy_page.section.2.title", "How we use it"),
              )}
            </h2>
            <p>
              {getContent(
                "privacy.section.2.body",
                t(
                  "privacy_page.section.2.body",
                  "To operate your safari and membership, to communicate with you, and to maintain conservation records as required by Tanzanian authorities. Member and guest identities are never sold, shared, or published.",
                ),
              )}
            </p>

            <h2 className="font-display text-2xl text-forest pt-4">
              {getContent("privacy.section.3.title", t("privacy_page.section.3.title", "Cookies"))}
            </h2>
            <p>
              {getContent(
                "privacy.section.3.body",
                t(
                  "privacy_page.section.3.body",
                  "We use cookies to remember your preferences and to measure site performance. You can decline non-essential cookies at any time via the banner at the foot of the page.",
                ),
              )}
            </p>

            <h2 className="font-display text-2xl text-forest pt-4">
              {getContent(
                "privacy.section.4.title",
                t("privacy_page.section.4.title", "Your rights"),
              )}
            </h2>
            <p>
              {getContent(
                "privacy.section.4.body",
                t(
                  "privacy_page.section.4.body",
                  "You may request a copy of, correction to, or deletion of your personal data at any time by writing to info@top-trackers.com. We will respond within 30 days.",
                ),
              )}
            </p>

            <h2 className="font-display text-2xl text-forest pt-4">
              {getContent(
                "privacy.section.5.title",
                t("privacy_page.section.5.title", "Retention"),
              )}
            </h2>
            <p>
              {getContent(
                "privacy.section.5.body",
                t(
                  "privacy_page.section.5.body",
                  "Booking records are retained for seven years for tax and conservation-record purposes; marketing data is retained only while your subscription is active.",
                ),
              )}
            </p>
          </article>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
