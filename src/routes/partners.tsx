import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { Briefcase, Compass, TreePine, ArrowRight, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { photos } from "@/assets/photos";
import { useSiteContent, resolveImage } from "@/hooks/useSiteContent";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partners — Top Trackers" },
      {
        name: "description",
        content:
          "B2B partnerships with Professional Hunters, travel agents, and conservation organisations.",
      },
      { property: "og:title", content: "Partners — Top Trackers" },
      {
        property: "og:description",
        content: "PHs, agents, and conservation partners — work alongside Top Trackers.",
      },
    ],
  }),
  component: Partners,
});

function Partners() {
  const [sent, setSent] = useState(false);
  const { t } = useTranslation();
  const { data: content } = useSiteContent();

  const getContent = (key: string, fallback: string) => {
    return content?.[key] ?? fallback;
  };

  const campImage = resolveImage(getContent("partners.hero.image", "conservation"));

  const lanes = [
    {
      Icon: Compass,
      title: getContent(
        "partners.lane.1.title",
        t("partners.lanes.1.title", "Professional Hunters"),
      ),
      body: getContent(
        "partners.lane.1.body",
        t(
          "partners.lanes.1.body",
          "Field positions for licensed PHs with verifiable concession experience. Long-season contracts, fair share of trophy fees, full camp support.",
        ),
      ),
      perks: [
        getContent("partners.lane.1.perk_1", t("partners.lanes.1.perk_1", "Long-season contracts")),
        getContent(
          "partners.lane.1.perk_2",
          t("partners.lanes.1.perk_2", "Full camp & vehicle support"),
        ),
        getContent("partners.lane.1.perk_3", t("partners.lanes.1.perk_3", "Trophy fee share")),
        getContent(
          "partners.lane.1.perk_4",
          t("partners.lanes.1.perk_4", "Insurance & liability cover"),
        ),
      ],
    },
    {
      Icon: Briefcase,
      title: getContent("partners.lane.2.title", t("partners.lanes.2.title", "Travel Agents")),
      body: getContent(
        "partners.lane.2.body",
        t(
          "partners.lanes.2.body",
          "A discreet, generous commission structure for established hunting and luxury safari agents. Live availability and dedicated booking desk.",
        ),
      ),
      perks: [
        getContent(
          "partners.lane.2.perk_1",
          t("partners.lanes.2.perk_1", "Tiered commission up to 15%"),
        ),
        getContent(
          "partners.lane.2.perk_2",
          t("partners.lanes.2.perk_2", "Live availability calendar"),
        ),
        getContent(
          "partners.lane.2.perk_3",
          t("partners.lanes.2.perk_3", "Co-branded itineraries"),
        ),
        getContent(
          "partners.lane.2.perk_4",
          t("partners.lanes.2.perk_4", "Dedicated booking desk"),
        ),
      ],
    },
    {
      Icon: TreePine,
      title: getContent(
        "partners.lane.3.title",
        t("partners.lanes.3.title", "Conservation Partners"),
      ),
      body: getContent(
        "partners.lane.3.body",
        t(
          "partners.lanes.3.body",
          "Research bodies, anti-poaching units, and habitat NGOs. Co-funded patrols, shared census data, and field access for accredited scientists.",
        ),
      ),
      perks: [
        getContent("partners.lane.3.perk_1", t("partners.lanes.3.perk_1", "Co-funded scout units")),
        getContent("partners.lane.3.perk_2", t("partners.lanes.3.perk_2", "Shared census data")),
        getContent(
          "partners.lane.3.perk_3",
          t("partners.lanes.3.perk_3", "Field access for research"),
        ),
        getContent(
          "partners.lane.3.perk_4",
          t("partners.lanes.3.perk_4", "Annual partnership review"),
        ),
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <section className="relative h-[50svh] bg-ink overflow-hidden">
        <img
          src={campImage}
          alt="Partners banner"
          className="absolute inset-0 w-full h-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 to-ink" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-bone">
          <Eyebrow light>{getContent("partners.hero.eyebrow", "For the trade")}</Eyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-7xl max-w-4xl leading-[0.95]">
            <span className="italic font-serif text-accent">
              {getContent("partners.hero.title_italic", "Partners")}
            </span>{" "}
            {getContent("partners.hero.title_plain", "in the field.")}
          </h1>
        </div>
      </section>

      <section className="paper-bg py-24">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-6">
          {lanes.map(({ Icon, title, body, perks }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <div className="p-8 bg-card border border-border h-full hover:border-accent transition-colors">
                <Icon className="h-8 w-8 text-ember" strokeWidth={1.2} />
                <h3 className="mt-5 font-display text-2xl text-forest">{title}</h3>
                <p className="mt-3 font-serif text-base text-foreground/75 leading-relaxed">
                  {body}
                </p>
                <ul className="mt-5 space-y-2 text-sm text-foreground/85">
                  {perks.map((p) => (
                    <li key={p} className="flex gap-2">
                      <Check className="h-4 w-4 text-ember shrink-0 mt-0.5" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink text-bone py-24">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <Eyebrow light>{getContent("partners.form.eyebrow", "Open the conversation")}</Eyebrow>
          </Reveal>
          <h2 className="mt-6 font-display text-3xl md:text-4xl">
            {getContent("partners.form.title", "Tell us where you fit.")}
          </h2>

          {sent ? (
            <div className="mt-10 p-10 border border-accent/40 text-center">
              <div className="font-display text-3xl text-accent">
                {getContent("partners.form.success_title", "Asante.")}
              </div>
              <p className="mt-3 font-serif text-bone/75">
                {getContent(
                  "partners.form.success_body",
                  "We'll be in touch within five business days.",
                )}
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="mt-10 grid sm:grid-cols-2 gap-4"
            >
              <input
                required
                maxLength={120}
                placeholder={getContent("partners.form.name", t("partners.form.name", "Name"))}
                className="bg-transparent border border-bone/20 px-4 py-3 focus:outline-none focus:border-accent"
              />
              <input
                required
                maxLength={160}
                type="email"
                placeholder={getContent("partners.form.email", t("partners.form.email", "Email"))}
                className="bg-transparent border border-bone/20 px-4 py-3 focus:outline-none focus:border-accent"
              />
              <input
                maxLength={160}
                placeholder={getContent(
                  "partners.form.org",
                  t("partners.form.org", "Organisation"),
                )}
                className="sm:col-span-2 bg-transparent border border-bone/20 px-4 py-3 focus:outline-none focus:border-accent"
              />
              <select className="sm:col-span-2 bg-ink border border-bone/20 px-4 py-3 text-bone focus:outline-none focus:border-accent">
                <option value="ph">
                  {getContent(
                    "partners.form.role_ph",
                    t("partners.form.role_ph", "I am a Professional Hunter"),
                  )}
                </option>
                <option value="agent">
                  {getContent(
                    "partners.form.role_agent",
                    t("partners.form.role_agent", "I am a Travel Agent"),
                  )}
                </option>
                <option value="partner">
                  {getContent(
                    "partners.form.role_partner",
                    t("partners.form.role_partner", "I am a Conservation Partner"),
                  )}
                </option>
                <option value="other">
                  {getContent("partners.form.role_other", t("partners.form.role_other", "Other"))}
                </option>
              </select>
              <textarea
                rows={4}
                maxLength={1500}
                placeholder={getContent(
                  "partners.form.message",
                  t("partners.form.message", "Tell us about your work"),
                )}
                className="sm:col-span-2 bg-transparent border border-bone/20 px-4 py-3 focus:outline-none focus:border-accent"
              />
              <button className="sm:col-span-2 mt-2 inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-accent-foreground tracking-[0.3em] text-[11px] uppercase hover:bg-ember hover:text-bone transition">
                {getContent(
                  "partners.form.submit",
                  t("partners.form.submit", "Submit partnership enquiry"),
                )}{" "}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}

          <p className="mt-10 text-sm text-bone/50 font-serif italic">
            Or write directly:{" "}
            <Link to="/contact" className="text-accent underline underline-offset-4">
              info@top-trackers.com
            </Link>
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
