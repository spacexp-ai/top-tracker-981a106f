import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Compass, Crown, Footprints, Mountain } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { FloatingTracks } from "@/components/FloatingTracks";
import { InstagramFeed } from "@/components/InstagramFeed";
import {
  AnimatedIcon,
  LionIcon,
  ElephantIcon,
  BuffaloIcon,
  LeopardIcon,
  AntelopeIcon,
  RifleIcon,
  CompassRoseIcon,
  AcaciaIcon,
} from "@/components/WildlifeIcons";
import { photos } from "@/assets/photos";
import map from "@/assets/map-texture.jpg";
import { useSiteContent, resolveImage } from "@/hooks/useSiteContent";

const heroFallback = photos.acaciaSunset;
const campFallback = photos.campNight;
const experienceFallback = photos.hunterValley;
const wildlife = photos.lioness;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Top Trackers — Africa's Premier Hunting Experience" },
      { name: "description", content: "An invitation-only safari & hunting club in the heart of Tanzania. Ethical expeditions, conservation heritage, and a vintage-modern way of the hunt." },
      { property: "og:title", content: "Top Trackers — Africa's Premier Hunting Experience" },
      { property: "og:description", content: "Ethical hunting, conservation heritage, unforgettable expeditions in Tanzania." },
    ],
  }),
  component: Home,
});

function Home() {
  const { data: content } = useSiteContent();
  
  const getContent = (key: string, fallback: string) => {
    return content?.[key] ?? fallback;
  };

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* HERO */}
      <section ref={heroRef} className="relative h-[100svh] overflow-hidden bg-ink">
        <motion.div style={{ y }} className="absolute inset-0 bg-ink">
          <video
            src={getContent("home.hero.video_url", "/media/hero-intro.mp4")}
            poster={resolveImage(getContent("home.hero.poster_url", "acaciaSunset"))}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-[110%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/10 to-ink/95" />
        </motion.div>

        <motion.div style={{ y: titleY, opacity }} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="vintage-divider text-[10px] tracking-[0.5em] uppercase text-accent">
              <span>{getContent("home.hero.subtitle", "In the heart of Tanzania")}</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-bone text-[18vw] md:text-[10vw] leading-[0.95] max-w-6xl"
          >
            <span className="italic font-serif text-accent">
              {getContent("home.hero.title_italic", "Welcome")}
            </span>
            {getContent("home.hero.title_plain", ".")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 max-w-2xl text-bone/80 font-serif text-xl md:text-2xl tracking-wide"
          >
            {getContent(
              "home.hero.description",
              "To Africa's premier hunting club — where the chase is shaped by patience, craft, and respect."
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-4 justify-center"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground tracking-[0.3em] text-[11px] uppercase font-medium hover:bg-ember hover:text-bone transition-all"
            >
              Book your safari <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/membership"
              className="inline-flex items-center gap-3 px-8 py-4 border border-bone/40 text-bone tracking-[0.3em] text-[11px] uppercase hover:border-accent hover:text-accent transition-all"
            >
              Join the Club
            </Link>
          </motion.div>
        </motion.div>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-bone/70 text-[10px] tracking-[0.5em] uppercase z-10"
        >
          <span className="inline-block animate-pulse">↓ Scroll</span>
        </motion.div>
      </section>

      {/* INTRO */}
      <section className="relative paper-bg py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: `url(${map})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <Eyebrow>{getContent("home.intro.eyebrow", "Welcome, Tracker")}</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-8 font-display text-4xl md:text-6xl text-forest leading-tight">
              {getContent("home.intro.title_line1", "More than a hunt.")}<br />
              <span className="font-serif italic text-ember">{getContent("home.intro.title_line2", "A legacy.")}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 font-serif text-2xl leading-relaxed text-foreground/80">
              {getContent(
                "home.intro.body",
                "Top Trackers is more than a hunting club. We are the meeting ground for a community of passionate hunters, conservationists, and wilderness enthusiasts — whether you are a seasoned safari veteran or preparing for your first African expedition."
              )}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Link to="/our-story" className="inline-flex items-center gap-2 mt-10 text-forest font-serif italic text-lg border-b border-forest/40 hover:border-ember hover:text-ember transition">
              Discover our story <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* PILLARS */}
      <section className="relative bg-ink text-bone py-32 overflow-hidden grain">
        <FloatingTracks count={8} />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <Eyebrow light>{getContent("home.pillars.eyebrow", "Three pillars")}</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl md:text-5xl max-w-2xl">
              {getContent("home.pillars.title", "The Top Tracker's way.")}
            </h2>
          </Reveal>

          <div className="mt-20 grid md:grid-cols-3 gap-px bg-bone/10">
            {[
              {
                Icon: Footprints,
                title: getContent("home.pillars.1.title", "Patience"),
                body: getContent("home.pillars.1.body", "We hunt slow. Every track is read, every wind weighed. The chase is measured in days, not minutes."),
              },
              {
                Icon: Compass,
                title: getContent("home.pillars.2.title", "Craft"),
                body: getContent("home.pillars.2.body", "Professional hunters with decades across Tanzania's most storied concessions. Field-tested, quietly precise."),
              },
              {
                Icon: Mountain,
                title: getContent("home.pillars.3.title", "Respect"),
                body: getContent("home.pillars.3.body", "For the animal, the land, and the communities who steward it. Conservation is the price of the privilege."),
              },
            ].map(({ Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <div className="bg-ink p-10 h-full hover:bg-forest/30 transition-colors duration-300 group">
                  <Icon className="h-10 w-10 text-accent group-hover:scale-110 transition-transform duration-300" strokeWidth={1.2} />
                  <h3 className="mt-8 font-display text-2xl tracking-[0.15em]">{title.toUpperCase()}</h3>
                  <p className="mt-4 font-serif text-lg text-bone/70 leading-relaxed">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BESTIARY — interactive hover icons */}
      <section className="relative paper-bg py-28 overflow-hidden">
        <FloatingTracks count={5} />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <Reveal><Eyebrow>The Field Bestiary</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-4xl md:text-5xl text-forest leading-tight">
                Hover the quarry.<br />
                <span className="font-serif italic text-ember">Read the trail.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 font-serif text-lg text-foreground/70">
                Eight icons drawn from camp ledgers — wildlife, weather, tools of the chase.
                Touch one to read its line.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px bg-forest/15">
            {[
              { Icon: LionIcon, label: "Lion", note: "Tracked at dawn — never alone." },
              { Icon: ElephantIcon, label: "Elephant", note: "Respect the matriarch's wind." },
              { Icon: BuffaloIcon, label: "Buffalo", note: "Black death of the Selous." },
              { Icon: LeopardIcon, label: "Leopard", note: "Patience baited under acacia." },
              { Icon: AntelopeIcon, label: "Kudu", note: "Spiral horns through the thornveld." },
              { Icon: RifleIcon, label: "The Rifle", note: ".375 H&H — the old reliable." },
              { Icon: CompassRoseIcon, label: "Bearing", note: "True north, by sun and stars." },
              { Icon: AcaciaIcon, label: "Acacia", note: "Camp shade. Lantern post." },
            ].map(({ Icon, label, note }, i) => (
              <AnimatedIcon key={label} delay={i * 0.06}>
                <div className="group bg-bone hover:bg-forest transition-colors duration-300 p-8 h-44 flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <div className="text-forest group-hover:text-accent transition-colors duration-300">
                    <Icon size={56} />
                  </div>
                  <div className="mt-3 font-display text-sm tracking-[0.3em] uppercase text-forest group-hover:text-bone transition-colors">
                    {label}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-forest text-bone/85 font-serif italic text-sm py-3 px-2">
                    {note}
                  </div>
                </div>
              </AnimatedIcon>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE SPLIT */}
      <section className="relative paper-bg py-32">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative">
              <img
                src={resolveImage(getContent("home.experience.image_url", "hunterValley"))}
                alt="Hunter scanning savanna at sunrise"
                loading="lazy"
                width={1600}
                height={1100}
                className="w-full aspect-[4/5] object-cover"
                style={{ boxShadow: "var(--shadow-vintage)" }}
              />
              <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground px-6 py-4 font-display tracking-[0.2em] text-sm hidden md:block">
                EST. 2023
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <Eyebrow>{getContent("home.experience.eyebrow", "The Experience")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-4xl md:text-5xl text-forest leading-[1.1]">
                {getContent("home.experience.title", "A safari shaped by patience, craft, and respect.")}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 font-serif text-xl text-foreground/75 leading-relaxed">
                {getContent(
                  "home.experience.body",
                  "Each expedition is curated by professional hunters with decades of experience across Tanzania's most storied concessions. From your first inquiry to the final trophy shipment, every detail is attended to with the discretion and precision a serious hunter expects."
                )}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <ul className="mt-8 space-y-3 font-serif text-lg text-foreground/80">
                {[
                  "Private concessions across the Selous, Maasai Steppe & Iringa",
                  "PH-led tracking with native Wagogo and Maasai scouts",
                  "Full-service tented camps with brass, canvas, and lantern light",
                  "Trophy preparation, documentation, and worldwide shipment",
                ].map((line, i) => (
                  <li key={line} className="flex gap-3">
                    <span className="text-ember mt-1">◆</span>
                    {getContent(`home.experience.bullet_${i + 1}`, line)}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.4}>
              <Link to="/experience" className="inline-flex items-center gap-2 mt-10 px-7 py-3.5 bg-forest text-bone tracking-[0.3em] text-[11px] uppercase hover:bg-ember transition">
                Explore expeditions <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP PREVIEW */}
      <section
        className="relative py-32 text-bone overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(180deg, oklch(0.15 0.02 60 / 0.85), oklch(0.18 0.03 60 / 0.95)), url(${wildlife})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto">
            <Reveal><Eyebrow light>The Hunting Club</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-4xl md:text-6xl">
                Membership, by <span className="font-serif italic text-accent">invitation</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 font-serif text-xl text-bone/75">
                Three tiers of belonging. Each opens doors deeper into the bush, the camp, and the community.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              { tier: "Tracker", price: "$2,400", per: "/ year", color: "border-bone/30",
                perks: ["Private member's circle", "Quarterly field journal", "Early access to dated hunts", "Camp invitations"] },
              { tier: "Professional Hunter", price: "$7,800", per: "/ year", color: "border-accent", featured: true,
                perks: ["All Tracker benefits", "Two reserved hunt windows", "Personal PH pairing", "Trophy concierge & shipping", "Off-season private camp stays"] },
              { tier: "Legacy", price: "By invitation", per: "", color: "border-ember",
                perks: ["All PH benefits", "Concession-naming rights", "Lifetime camp residency", "Conservation board seat", "Private game flights"] },
            ].map(({ tier, price, per, color, perks, featured }, i) => (
              <Reveal key={tier} delay={i * 0.1}>
                <div className={`relative h-full p-8 border ${color} bg-ink/40 backdrop-blur-sm hover:bg-ink/70 transition-all duration-500 ${featured ? "md:-translate-y-4" : ""}`}>
                  {featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 text-[10px] tracking-[0.3em] uppercase">
                      Most chosen
                    </div>
                  )}
                  {featured && <Crown className="absolute top-6 right-6 h-5 w-5 text-accent" />}
                  <h3 className="font-display text-2xl tracking-[0.15em] uppercase text-accent">{tier}</h3>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="font-display text-4xl">{price}</span>
                    <span className="text-bone/60 text-sm">{per}</span>
                  </div>
                  <ul className="mt-8 space-y-3 text-sm text-bone/80">
                    {perks.map((p) => <li key={p} className="flex gap-2"><span className="text-ember">◆</span>{p}</li>)}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <div className="mt-14 text-center">
              <Link to="/membership" className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground tracking-[0.3em] text-[11px] uppercase hover:bg-ember hover:text-bone transition">
                Request Membership <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CAMP STRIP */}
      <section className="relative paper-bg py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2">
            <Reveal><Eyebrow>{getContent("home.camp.eyebrow", "The Camp")}</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-4xl md:text-5xl text-forest leading-[1.1]">
                {getContent("home.camp.title_line1", "Canvas, brass &")}<br />
                <span className="font-serif italic text-ember">{getContent("home.camp.title_line2", "lantern light.")}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 font-serif text-xl text-foreground/75">
                {getContent(
                  "home.camp.body",
                  "Our base camp sits beneath an acacia grove near Esilalei. Hand-stitched canvas tents, copper basins, an open-fire kitchen, and a long table where stories outlive the embers."
                )}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="md:col-span-3">
            <div className="relative">
              <img
                src={resolveImage(getContent("home.camp.image_url", "campNight"))}
                alt="Safari tented camp at dusk"
                loading="lazy"
                width={1600}
                height={1100}
                className="w-full aspect-[16/10] object-cover"
                style={{ boxShadow: "var(--shadow-vintage)" }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* QUOTE */}
      <section className="relative bg-forest text-bone py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${map})`, backgroundSize: "cover" }} />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <div className="font-display text-6xl text-accent leading-none">"</div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 font-serif italic text-2xl md:text-4xl leading-snug">
              {getContent(
                "home.quote.text",
                "In Africa, the hunt is not what you take from the land — it is what the land slowly teaches you to become."
              )}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 vintage-divider text-[10px] tracking-[0.5em] uppercase text-accent">
              <span>{getContent("home.quote.author", "Hemingway, paraphrased — and lived")}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative paper-bg py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <Eyebrow>{getContent("home.cta.eyebrow", "Begin")}</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl md:text-6xl text-forest">
              {getContent("home.cta.title_normal", "Plan your ")}
              <span className="italic font-serif text-ember">{getContent("home.cta.title_italic", "first chase")}</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 font-serif text-xl text-foreground/75 max-w-2xl mx-auto">
              {getContent(
                "home.cta.body",
                "Tell us what you seek. We'll match you to a concession, a professional hunter, and a window of weather worth the journey."
              )}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Link to="/contact" className="inline-flex items-center gap-2 mt-10 px-8 py-4 bg-forest text-bone tracking-[0.3em] text-[11px] uppercase hover:bg-ember transition">
              Book your safari <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <InstagramFeed />
      <SiteFooter />
    </div>
  );
}
