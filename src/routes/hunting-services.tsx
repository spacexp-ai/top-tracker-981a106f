import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { ArrowRight, Crosshair, Plane, Trophy, Tent, Compass, ShieldCheck } from "lucide-react";
import { useSiteContent, resolveImage } from "@/hooks/useSiteContent";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/hunting-services")({
  head: () => ({
    meta: [
      { title: "Hunting Services — Top Trackers" },
      { name: "description", content: "Full-service African hunting: PH-led tracking, trophy preparation, charter logistics, and concession management." },
    ],
  }),
  component: HuntingServices,
});

function HuntingServices() {
  const { t } = useTranslation();
  const { data: content } = useSiteContent();

  const getContent = (key: string, fallback: string) => {
    return content?.[key] ?? fallback;
  };

  const experienceImage = resolveImage(getContent("services.hero.image", "gearAmmo"));

  const services = [
    { 
      Icon: Crosshair, 
      title: getContent("services.list.1.title", t("hunting_services.list.1.title", "PH-Led Dangerous Game")), 
      body: getContent("services.list.1.body", t("hunting_services.list.1.body", "Buffalo, leopard, and lion under our most experienced professional hunters. Long-form tracking, fair chase, low quotas.")) 
    },
    { 
      Icon: Compass, 
      title: getContent("services.list.2.title", t("hunting_services.list.2.title", "Plains Game Safaris")), 
      body: getContent("services.list.2.body", t("hunting_services.list.2.body", "Kudu, sable, eland, gerenuk, lesser kudu. Foot, vehicle, and stalk combinations across our three concession blocks.")) 
    },
    { 
      Icon: Trophy, 
      title: getContent("services.list.3.title", t("hunting_services.list.3.title", "Trophy Preparation")), 
      body: getContent("services.list.3.body", t("hunting_services.list.3.body", "Field dressing, salting, skinning, and dip-pack. Full CITES documentation and worldwide shipment via accredited handlers.")) 
    },
    { 
      Icon: Tent, 
      title: getContent("services.list.4.title", t("hunting_services.list.4.title", "Camp & Logistics")), 
      body: getContent("services.list.4.body", t("hunting_services.list.4.body", "Full-service tented camps — canvas, brass, lantern light. Chef, valet, vehicles, comms, and emergency medical on standby.")) 
    },
    { 
      Icon: Plane, 
      title: getContent("services.list.5.title", t("hunting_services.list.5.title", "Charter & Transfers")), 
      body: getContent("services.list.5.body", t("hunting_services.list.5.body", "Private bush flights from Arusha, Dar es Salaam, and Nairobi. Same-day camp delivery, on schedule.")) 
    },
    { 
      Icon: ShieldCheck, 
      title: getContent("services.list.6.title", t("hunting_services.list.6.title", "Concession Management")), 
      body: getContent("services.list.6.body", t("hunting_services.list.6.body", "We manage three Tanzanian concessions under TAWA licence, with annual census, anti-poaching, and quota oversight.")) 
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <section className="relative h-[55svh] bg-ink overflow-hidden">
        <img src={experienceImage} alt="Hunting services banner" className="absolute inset-0 w-full h-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 to-ink" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-bone">
           <Eyebrow light>{getContent("services.hero.eyebrow", t("hunting_services.hero.eyebrow", "Full-service in the bush"))}</Eyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-7xl max-w-5xl leading-[0.95] text-bone">
            {getContent("services.hero.title_normal", t("hunting_services.hero.title_normal", "Hunting "))}
            <span className="italic font-serif text-accent">{getContent("services.hero.title_italic", t("hunting_services.hero.title_italic", "services."))}</span>
          </h1>
        </div>
      </section>
 
      <section className="paper-bg py-24">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="p-8 bg-card border border-border h-full hover:border-accent hover:-translate-y-1 transition-all">
                <Icon className="h-8 w-8 text-ember" strokeWidth={1.2} />
                <h3 className="mt-5 font-display text-xl text-forest">{title}</h3>
                <p className="mt-3 font-serif text-base text-foreground/75 leading-relaxed">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
 
        <div className="mx-auto max-w-3xl px-6 mt-20 text-center">
          <Reveal>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-forest text-bone tracking-[0.3em] text-[11px] uppercase hover:bg-ember transition">
              {getContent("services.footer.cta", t("hunting_services.footer.cta", "Plan your expedition"))} <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
