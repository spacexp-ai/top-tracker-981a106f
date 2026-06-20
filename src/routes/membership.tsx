import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { ArrowRight, Check, Crown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { photos } from "@/assets/photos";
import { useSiteContent, resolveImage } from "@/hooks/useSiteContent";

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "Hunting Club — Top Trackers" },
      {
        name: "description",
        content:
          "Three tiers of belonging in Top Trackers' invitation-only African hunting club. Tracker, Professional Hunter, and Legacy.",
      },
    ],
  }),
  component: Membership,
});

function Membership() {
  const { t } = useTranslation();
  const { data: content } = useSiteContent();

  const getContent = (key: string, fallback: string) => {
    return content?.[key] ?? fallback;
  };

  const wildlifeImage = resolveImage(getContent("membership.hero.image", "dinner"));
  const gearKitImage = resolveImage(getContent("membership.portal.image", "gearKit"));

  const tiers = [
    {
      name: getContent(
        "membership.tier.1.name",
        t("membership_page.tiers.1.name", "Observer Pass"),
      ),
      price: getContent("membership.tier.1.price", t("membership_page.tiers.1.price", "Free")),
      per: getContent("membership.tier.1.per", t("membership_page.tiers.1.per", "guest")),
      tag: getContent(
        "membership.tier.1.tag",
        t("membership_page.tiers.1.tag", "Walk in, no rifle"),
      ),
      observer: true,
      perks: [
        getContent(
          "membership.tier.1.perk_1",
          t("membership_page.tiers.1.perk_1", "For guests, photographers, companions"),
        ),
        getContent(
          "membership.tier.1.perk_2",
          t("membership_page.tiers.1.perk_2", "Experience camp, bush, and story — no rifle"),
        ),
        getContent(
          "membership.tier.1.perk_3",
          t("membership_page.tiers.1.perk_3", "Full-board tented accommodation"),
        ),
        getContent(
          "membership.tier.1.perk_4",
          t("membership_page.tiers.1.perk_4", "Shared camp activities at the long table"),
        ),
        getContent(
          "membership.tier.1.perk_5",
          t("membership_page.tiers.1.perk_5", "Non-hunting concession access with a guide"),
        ),
      ],
      cta: getContent(
        "membership.tier.1.cta",
        t("membership_page.tiers.1.cta", "Request Observer Pass"),
      ),
    },
    {
      name: getContent("membership.tier.2.name", t("membership_page.tiers.2.name", "Tracker")),
      price: getContent("membership.tier.2.price", t("membership_page.tiers.2.price", "$2,400")),
      per: getContent("membership.tier.2.per", t("membership_page.tiers.2.per", "annual")),
      tag: getContent("membership.tier.2.tag", t("membership_page.tiers.2.tag", "Begin the trail")),
      perks: [
        getContent(
          "membership.tier.2.perk_1",
          t("membership_page.tiers.2.perk_1", "Private members' digital circle"),
        ),
        getContent(
          "membership.tier.2.perk_2",
          t("membership_page.tiers.2.perk_2", "Quarterly field journal in print"),
        ),
        getContent(
          "membership.tier.2.perk_3",
          t("membership_page.tiers.2.perk_3", "Early access to dated hunts & camps"),
        ),
        getContent(
          "membership.tier.2.perk_4",
          t("membership_page.tiers.2.perk_4", "Two annual camp-table invitations"),
        ),
        getContent(
          "membership.tier.2.perk_5",
          t("membership_page.tiers.2.perk_5", "10% guest rate on standard expeditions"),
        ),
      ],
    },
    {
      name: getContent(
        "membership.tier.3.name",
        t("membership_page.tiers.3.name", "Professional Hunter"),
      ),
      price: getContent("membership.tier.3.price", t("membership_page.tiers.3.price", "$7,800")),
      per: getContent("membership.tier.3.per", t("membership_page.tiers.3.per", "annual")),
      tag: getContent(
        "membership.tier.3.tag",
        t("membership_page.tiers.3.tag", "The trackers' tracker"),
      ),
      featured: true,
      perks: [
        getContent(
          "membership.tier.3.perk_1",
          t("membership_page.tiers.3.perk_1", "Everything in Tracker"),
        ),
        getContent(
          "membership.tier.3.perk_2",
          t("membership_page.tiers.3.perk_2", "Two reserved hunt windows / year"),
        ),
        getContent(
          "membership.tier.3.perk_3",
          t("membership_page.tiers.3.perk_3", "Personal PH pairing for life"),
        ),
        getContent(
          "membership.tier.3.perk_4",
          t("membership_page.tiers.3.perk_4", "Trophy concierge & worldwide shipment"),
        ),
        getContent(
          "membership.tier.3.perk_5",
          t("membership_page.tiers.3.perk_5", "Off-season private camp residency"),
        ),
        getContent(
          "membership.tier.3.perk_6",
          t("membership_page.tiers.3.perk_6", "Annual members' driven hunt weekend"),
        ),
      ],
    },
    {
      name: getContent("membership.tier.4.name", t("membership_page.tiers.4.name", "Legacy")),
      price: getContent(
        "membership.tier.4.price",
        t("membership_page.tiers.4.price", "By invitation"),
      ),
      per: getContent("membership.tier.4.per", t("membership_page.tiers.4.per", "lifetime")),
      tag: getContent(
        "membership.tier.4.tag",
        t("membership_page.tiers.4.tag", "The longest measure"),
      ),
      perks: [
        getContent(
          "membership.tier.4.perk_1",
          t("membership_page.tiers.4.perk_1", "Everything in Professional Hunter"),
        ),
        getContent(
          "membership.tier.4.perk_2",
          t("membership_page.tiers.4.perk_2", "Concession-naming rights"),
        ),
        getContent(
          "membership.tier.4.perk_3",
          t("membership_page.tiers.4.perk_3", "Lifetime tented residence at Esilalei"),
        ),
        getContent(
          "membership.tier.4.perk_4",
          t("membership_page.tiers.4.perk_4", "Seat on the conservation board"),
        ),
        getContent(
          "membership.tier.4.perk_5",
          t("membership_page.tiers.4.perk_5", "Private charter game flights"),
        ),
        getContent(
          "membership.tier.4.perk_6",
          t("membership_page.tiers.4.perk_6", "Family heir transferability"),
        ),
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <section className="relative h-[60svh] bg-ink overflow-hidden">
        <img
          src={wildlifeImage}
          alt="Membership banner"
          width={1400}
          height={1600}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/40 to-ink" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-bone">
          <Eyebrow light>
            {getContent(
              "membership.hero.eyebrow",
              t("membership_page.hero.eyebrow", "The Hunting Club"),
            )}
          </Eyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-8xl max-w-5xl leading-[0.95] text-bone">
            {getContent(
              "membership.hero.title",
              t("membership_page.hero.title", "The Hunting Club."),
            )}
          </h1>
          <p className="mt-8 font-serif text-xl text-bone/80 max-w-2xl leading-relaxed">
            {getContent(
              "membership.hero.body",
              t(
                "membership_page.hero.body",
                "Four tiers of belonging. For non-hunting guests, companions, and photographers, we offer the Observer Pass — allowing full access to camp life and guided non-hunting activities. For hunters, our tiers range from Tracker to Legacy, each opening doors deeper into the bush, the camp, and the community.",
              ),
            )}
          </p>
        </div>
      </section>

      <section className="paper-bg py-28">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div
                className={`relative h-full p-8 border bg-card ${t.featured ? "border-ember lg:-translate-y-6 shadow-[var(--shadow-vintage)]" : t.observer ? "border-accent/40 border-dashed" : "border-border"} transition hover:-translate-y-1`}
              >
                {t.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ember text-bone px-4 py-1 text-[10px] tracking-[0.3em] uppercase">
                    {useTranslation().t("membership_page.tiers.3.featured", "Most chosen")}
                  </div>
                )}
                {t.observer && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background border border-accent/50 text-accent px-4 py-1 text-[10px] tracking-[0.3em] uppercase">
                    {useTranslation().t("membership_page.tiers.1.price", "Free")}
                  </div>
                )}
                {t.featured && <Crown className="absolute top-6 right-6 h-5 w-5 text-ember" />}
                <div className="text-[10px] tracking-[0.4em] uppercase text-accent">{t.tag}</div>
                <h3 className="mt-3 font-display text-2xl tracking-[0.08em] uppercase text-forest">
                  {t.name}
                </h3>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-3xl text-foreground">{t.price}</span>
                  <span className="text-muted-foreground text-xs tracking-widest uppercase">
                    / {t.per}
                  </span>
                </div>
                <div className="mt-6 h-px bg-border" />
                <ul className="mt-6 space-y-2.5 text-sm text-foreground/85">
                  {t.perks.map((p) => (
                    <li key={p} className="flex gap-3">
                      <Check className="h-4 w-4 text-ember shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={t.observer ? "/contact" : "/membership-apply"}
                  className={`mt-8 inline-flex w-full justify-center items-center gap-2 px-5 py-3 tracking-[0.3em] text-[10px] uppercase transition ${
                    t.featured
                      ? "bg-ember text-bone hover:bg-forest"
                      : t.observer
                        ? "border border-accent/60 text-accent hover:bg-accent hover:text-accent-foreground"
                        : "border border-forest text-forest hover:bg-forest hover:text-bone"
                  }`}
                >
                  {t.cta ?? useTranslation().t("membership_page.tiers.2.cta", "Apply")}{" "}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mx-auto max-w-3xl px-6 text-center mt-24">
          <Reveal>
            <p className="font-serif italic text-2xl text-foreground/70">
              {getContent(
                "membership.quote.text",
                t(
                  "membership_page.quote.text",
                  "All memberships are reviewed by the club's founding circle. We keep numbers small on purpose — the camp table is only so long.",
                ),
              )}
            </p>
          </Reveal>
        </div>
      </section>

      {/* MEMBERSHIP PORTAL WALKTHROUGH */}
      <section className="paper-bg pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="border border-accent/20 bg-ink text-bone overflow-hidden flex flex-col md:flex-row">
            <div className="p-8 md:p-16 flex-1 flex flex-col justify-center">
              <Reveal>
                <p className="text-[10px] tracking-[0.3em] uppercase text-accent mb-4">
                  {getContent(
                    "membership.portal.eyebrow",
                    t("membership_page.portal.eyebrow", "Digital Access"),
                  )}
                </p>
                <h2 className="font-display text-4xl text-bone mb-6">
                  {getContent(
                    "membership.portal.title",
                    t("membership_page.portal.title", "The Membership Portal."),
                  )}
                </h2>
                <p className="font-serif text-lg text-bone/70 leading-relaxed mb-8">
                  {getContent(
                    "membership.portal.body",
                    t(
                      "membership_page.portal.body",
                      "Your private gateway to the Top Trackers experience. Through the portal, members can review and reserve dates for upcoming expeditions, view their digital field journals, track trophy shipments, and communicate directly with their paired Professional Hunter.",
                    ),
                  )}
                </p>

                <div className="space-y-6 mb-12">
                  <div className="flex gap-4">
                    <div className="h-6 w-6 rounded-full bg-ember/20 flex items-center justify-center shrink-0 mt-1">
                      <div className="h-2 w-2 rounded-full bg-ember" />
                    </div>
                    <div>
                      <h4 className="font-display text-xl text-bone">
                        {getContent(
                          "membership.portal.feature_1.title",
                          t("membership_page.portal.feature_1.title", "Expedition Management"),
                        )}
                      </h4>
                      <p className="font-serif text-sm text-bone/60 mt-1">
                        {getContent(
                          "membership.portal.feature_1.body",
                          t(
                            "membership_page.portal.feature_1.body",
                            "Reserve windows, view itineraries, and manage logistics.",
                          ),
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-6 w-6 rounded-full bg-ember/20 flex items-center justify-center shrink-0 mt-1">
                      <div className="h-2 w-2 rounded-full bg-ember" />
                    </div>
                    <div>
                      <h4 className="font-display text-xl text-bone">
                        {getContent(
                          "membership.portal.feature_2.title",
                          t("membership_page.portal.feature_2.title", "Digital Field Journals"),
                        )}
                      </h4>
                      <p className="font-serif text-sm text-bone/60 mt-1">
                        {getContent(
                          "membership.portal.feature_2.body",
                          t(
                            "membership_page.portal.feature_2.body",
                            "Private logs of your hunts, photographs, and PH notes.",
                          ),
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-6 w-6 rounded-full bg-ember/20 flex items-center justify-center shrink-0 mt-1">
                      <div className="h-2 w-2 rounded-full bg-ember" />
                    </div>
                    <div>
                      <h4 className="font-display text-xl text-bone">
                        {getContent(
                          "membership.portal.feature_3.title",
                          t("membership_page.portal.feature_3.title", "Trophy Tracking"),
                        )}
                      </h4>
                      <p className="font-serif text-sm text-bone/60 mt-1">
                        {getContent(
                          "membership.portal.feature_3.body",
                          t(
                            "membership_page.portal.feature_3.body",
                            "Real-time status of field preparation, CITES, and shipping.",
                          ),
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="/auth?mode=login"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-ember text-bone tracking-[0.3em] text-[11px] uppercase hover:bg-forest transition"
                  >
                    {t("membership_page.portal.login", "Portal Login")}{" "}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="/auth?mode=signup"
                    className="inline-flex items-center gap-2 px-8 py-4 border border-accent text-accent tracking-[0.3em] text-[11px] uppercase hover:bg-accent hover:text-ink transition"
                  >
                    {t("membership_page.portal.request", "Request Access")}
                  </a>
                </div>
              </Reveal>
            </div>
            <div className="w-full md:w-5/12 bg-card relative min-h-[400px]">
              <img
                src={gearKitImage}
                alt="Membership Portal"
                className="absolute inset-0 w-full h-full object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
