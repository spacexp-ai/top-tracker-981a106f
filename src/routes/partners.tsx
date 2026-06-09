import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { Briefcase, Compass, TreePine, ArrowRight, Check } from "lucide-react";
import { photos } from "@/assets/photos";
const camp = photos.conservation;

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partners — Top Trackers" },
      { name: "description", content: "B2B partnerships with Professional Hunters, travel agents, and conservation organisations." },
      { property: "og:title", content: "Partners — Top Trackers" },
      { property: "og:description", content: "PHs, agents, and conservation partners — work alongside Top Trackers." },
    ],
  }),
  component: Partners,
});

const lanes = [
  {
    Icon: Compass,
    title: "Professional Hunters",
    body: "Field positions for licensed PHs with verifiable concession experience. Long-season contracts, fair share of trophy fees, full camp support.",
    perks: ["Long-season contracts", "Full camp & vehicle support", "Trophy fee share", "Insurance & liability cover"],
  },
  {
    Icon: Briefcase,
    title: "Travel Agents",
    body: "A discreet, generous commission structure for established hunting and luxury safari agents. Live availability and dedicated booking desk.",
    perks: ["Tiered commission up to 15%", "Live availability calendar", "Co-branded itineraries", "Dedicated booking desk"],
  },
  {
    Icon: TreePine,
    title: "Conservation Partners",
    body: "Research bodies, anti-poaching units, and habitat NGOs. Co-funded patrols, shared census data, and field access for accredited scientists.",
    perks: ["Co-funded scout units", "Shared census data", "Field access for research", "Annual partnership review"],
  },
];

function Partners() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <section className="relative h-[50svh] bg-ink overflow-hidden">
        <img src={camp} alt="" className="absolute inset-0 w-full h-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 to-ink" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-bone">
          <Eyebrow light>For the trade</Eyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-7xl max-w-4xl leading-[0.95]">
            <span className="italic font-serif text-accent">Partners</span> in the field.
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
                <p className="mt-3 font-serif text-base text-foreground/75 leading-relaxed">{body}</p>
                <ul className="mt-5 space-y-2 text-sm text-foreground/85">
                  {perks.map((p) => (
                    <li key={p} className="flex gap-2"><Check className="h-4 w-4 text-ember shrink-0 mt-0.5" /> {p}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink text-bone py-24">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal><Eyebrow light>Open the conversation</Eyebrow></Reveal>
          <h2 className="mt-6 font-display text-3xl md:text-4xl">Tell us where you fit.</h2>

          {sent ? (
            <div className="mt-10 p-10 border border-accent/40 text-center">
              <div className="font-display text-3xl text-accent">Asante.</div>
              <p className="mt-3 font-serif text-bone/75">We'll be in touch within five business days.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="mt-10 grid sm:grid-cols-2 gap-4"
            >
              <input required maxLength={120} placeholder="Name" className="bg-transparent border border-bone/20 px-4 py-3 focus:outline-none focus:border-accent" />
              <input required maxLength={160} type="email" placeholder="Email" className="bg-transparent border border-bone/20 px-4 py-3 focus:outline-none focus:border-accent" />
              <input maxLength={160} placeholder="Organisation" className="sm:col-span-2 bg-transparent border border-bone/20 px-4 py-3 focus:outline-none focus:border-accent" />
              <select className="sm:col-span-2 bg-ink border border-bone/20 px-4 py-3 text-bone focus:outline-none focus:border-accent">
                <option>I am a Professional Hunter</option>
                <option>I am a Travel Agent</option>
                <option>I am a Conservation Partner</option>
                <option>Other</option>
              </select>
              <textarea rows={4} maxLength={1500} placeholder="Tell us about your work" className="sm:col-span-2 bg-transparent border border-bone/20 px-4 py-3 focus:outline-none focus:border-accent" />
              <button className="sm:col-span-2 mt-2 inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-accent-foreground tracking-[0.3em] text-[11px] uppercase hover:bg-ember hover:text-bone transition">
                Submit partnership enquiry <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}

          <p className="mt-10 text-sm text-bone/50 font-serif italic">
            Or write directly: <Link to="/contact" className="text-accent underline underline-offset-4">info@top-trackers.com</Link>
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
