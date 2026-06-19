import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { TreePine, HandCoins, Users, Leaf, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { photos } from "@/assets/photos";
import { useSiteContent, resolveImage } from "@/hooks/useSiteContent";

export const Route = createFileRoute("/conservation")({
  head: () => ({
    meta: [
      { title: "Conservation — Top Trackers" },
      { name: "description", content: "Conservation through regulated, ethical hunting in Tanzania — anti-poaching, community partnership, and habitat stewardship." },
      { property: "og:title", content: "Conservation — Top Trackers" },
      { property: "og:description", content: "Every hunt funds anti-poaching, community partnership, and habitat stewardship." },
      { property: "og:image", content: photos.children },
    ],
  }),
  component: Conservation,
});

function Conservation() {
  const { t } = useTranslation();
  const { data: content } = useSiteContent();

  const getContent = (key: string, fallback: string) => {
    return content?.[key] ?? fallback;
  };

  const wildlifeImage = resolveImage(getContent("conservation.hero.image", "children"));
  const experienceImage = resolveImage(getContent("conservation.ledger.bg", "conservation"));

  const pillars = [
    { 
      Icon: HandCoins, 
      title: getContent("conservation.pillars.1.title", t("conservation.pillars.1.title", "Quota-Funded Stewardship")), 
      body: getContent("conservation.pillars.1.body", t("conservation.pillars.1.body", "A measurable share of every concession fee returns to anti-poaching patrols, water-point maintenance, and game monitoring.")) 
    },
    { 
      Icon: Users, 
      title: getContent("conservation.pillars.2.title", t("conservation.pillars.2.title", "Community Partnership")), 
      body: getContent("conservation.pillars.2.body", t("conservation.pillars.2.body", "Maasai and Wagogo communities co-manage land, run scout programs, and share in revenue from every hunt we lead.")) 
    },
    { 
      Icon: TreePine, 
      title: getContent("conservation.pillars.3.title", t("conservation.pillars.3.title", "Habitat First")), 
      body: getContent("conservation.pillars.3.body", t("conservation.pillars.3.body", "We hunt low quotas across vast, intact wilderness — keeping concessions whole and corridors open.")) 
    },
    { 
      Icon: Leaf, 
      title: getContent("conservation.pillars.4.title", t("conservation.pillars.4.title", "Ethical Selection")), 
      body: getContent("conservation.pillars.4.body", t("conservation.pillars.4.body", "Only mature, post-reproductive males. Each animal is logged, aged, and reported to TAWA.")) 
    },
  ];

  const figures = [
    { value: getContent("conservation.stats.1.value", t("conservation.stats.1.value", "92%")), label: getContent("conservation.stats.1.label", t("conservation.stats.1.label", "of fee revenue stays in Tanzania")) },
    { value: getContent("conservation.stats.2.value", t("conservation.stats.2.value", "3")), label: getContent("conservation.stats.2.label", t("conservation.stats.2.label", "anti-poaching units we fund")) },
    { value: getContent("conservation.stats.3.value", t("conservation.stats.3.value", "180k+")), label: getContent("conservation.stats.3.label", t("conservation.stats.3.label", "hectares under our care")) },
    { value: getContent("conservation.stats.4.value", t("conservation.stats.4.value", "12")), label: getContent("conservation.stats.4.label", t("conservation.stats.4.label", "scout salaries on the books")) },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <section className="relative h-[60svh] bg-ink overflow-hidden">
        <motion.img src={wildlifeImage} alt="Conservation hero" initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 8 }} className="absolute inset-0 w-full h-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-bone">
          <Eyebrow light>{getContent("conservation.hero.eyebrow", t("conservation.hero.eyebrow", "The price of the privilege"))}</Eyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-8xl max-w-5xl leading-[0.95]">
            {getContent("conservation.hero.title_normal", t("conservation.hero.title_normal", "Hunters as "))}
            <span className="italic font-serif text-accent">{getContent("conservation.hero.title_italic", t("conservation.hero.title_italic", "conservators."))}</span>
          </h1>
          <p className="mt-6 font-serif text-xl text-bone/75 max-w-2xl">
            {getContent("conservation.hero.body", t("conservation.hero.body", "Regulated, ethical hunting funds the wilderness it depends on. This is how."))}
          </p>
        </div>
      </section>

      <section className="paper-bg py-28">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-4">
          {pillars.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <div className="p-8 bg-card border border-border h-full hover:border-accent transition-colors">
                <Icon className="h-9 w-9 text-ember" strokeWidth={1.2} />
                <h3 className="mt-6 font-display text-2xl text-forest">{title}</h3>
                <p className="mt-4 font-serif text-lg text-foreground/75 leading-relaxed">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative py-28 bg-ink text-bone overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${experienceImage})`, backgroundSize: "cover" }} />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal><Eyebrow light>{getContent("conservation.ledger.eyebrow", t("conservation.ledger.eyebrow", "In the ledger"))}</Eyebrow></Reveal>
          <h2 className="mt-6 font-display text-4xl md:text-5xl max-w-2xl">{getContent("conservation.ledger.title", t("conservation.ledger.title", "By the numbers, kept honest."))}</h2>
          <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-4 gap-px bg-bone/10">
            {figures.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.08}>
                <div className="bg-ink p-8 h-full">
                  <div className="font-display text-5xl text-accent">{f.value}</div>
                  <div className="mt-3 text-xs tracking-[0.25em] uppercase text-bone/70">{f.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="paper-bg py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal><Eyebrow>{getContent("conservation.footer.eyebrow", t("conservation.footer.eyebrow", "Read the work"))}</Eyebrow></Reveal>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-forest">{getContent("conservation.footer.title", t("conservation.footer.title", "Quarterly conservation report."))}</h2>
          <p className="mt-6 font-serif text-xl text-foreground/75">
            {getContent("conservation.footer.body", t("conservation.footer.body", "We publish every census, scout log, and quota outcome in the field journal. No abstractions."))}
          </p>
          <div className="mt-10 flex gap-3 justify-center flex-wrap">
            <Link to="/journal" className="inline-flex items-center gap-2 px-7 py-3.5 bg-forest text-bone tracking-[0.3em] text-[11px] uppercase hover:bg-ember transition">
              {t("conservation.footer.readJournal", "Read the Journal")} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/partners" className="inline-flex items-center gap-2 px-7 py-3.5 border border-forest text-forest tracking-[0.3em] text-[11px] uppercase hover:bg-forest hover:text-bone transition">
              {t("conservation.footer.partner", "Become a partner")}
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
