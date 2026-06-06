import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { ArrowRight, Crosshair, Plane, Trophy, Tent, Compass, ShieldCheck } from "lucide-react";
import { photos } from "@/assets/photos";
const experience = photos.gearAmmo;

export const Route = createFileRoute("/hunting-services")({
  head: () => ({
    meta: [
      { title: "Hunting Services — Top Trackers" },
      { name: "description", content: "Full-service African hunting: PH-led tracking, trophy preparation, charter logistics, and concession management." },
      { property: "og:title", content: "Hunting Services — Top Trackers" },
      { property: "og:description", content: "Full-service hunting in Tanzania: PH-led tracking, trophy work, logistics." },
    ],
  }),
  component: HuntingServices,
});

const services = [
  { Icon: Crosshair, title: "PH-Led Dangerous Game", body: "Buffalo, leopard, and lion under our most experienced professional hunters. Long-form tracking, fair chase, low quotas." },
  { Icon: Compass, title: "Plains Game Safaris", body: "Kudu, sable, eland, gerenuk, lesser kudu. Foot, vehicle, and stalk combinations across our three concession blocks." },
  { Icon: Trophy, title: "Trophy Preparation", body: "Field dressing, salting, skinning, and dip-pack. Full CITES documentation and worldwide shipment via accredited handlers." },
  { Icon: Tent, title: "Camp & Logistics", body: "Full-service tented camps — canvas, brass, lantern light. Chef, valet, vehicles, comms, and emergency medical on standby." },
  { Icon: Plane, title: "Charter & Transfers", body: "Private bush flights from Arusha, Dar es Salaam, and Nairobi. Same-day camp delivery, on schedule." },
  { Icon: ShieldCheck, title: "Concession Management", body: "We manage three Tanzanian concessions under TAWA licence, with annual census, anti-poaching, and quota oversight." },
];

function HuntingServices() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <section className="relative h-[55svh] bg-ink overflow-hidden">
        <img src={experience} alt="" className="absolute inset-0 w-full h-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 to-ink" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-bone">
          <Eyebrow light>Full-service in the bush</Eyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-7xl max-w-5xl leading-[0.95]">
            Hunting <span className="italic font-serif text-accent">services.</span>
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
              Plan your expedition <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
