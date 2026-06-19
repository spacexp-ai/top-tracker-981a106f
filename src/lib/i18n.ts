import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: {
        story: "Our Story",
        experience: "The Experience",
        membership: "Hunting Club",
        gallery: "Gallery",
        journal: "Journal",
        conservation: "Conservation",
        contact: "Contact"
      },
      home: {
        hero: {
          subtitle: "In the heart of Tanzania",
          titleItalic: "Welcome",
          titlePlain: ".",
          description: "To Africa's premier hunting club — where the chase is shaped by patience, craft, and respect.",
          bookSafari: "Book your safari",
          joinClub: "Join the Club",
          scroll: "Scroll"
        },
        intro: {
          eyebrow: "Welcome, Tracker",
          titleLine1: "More than a hunt.",
          titleLine2: "A legacy.",
          body: "Top Trackers is more than a hunting club. We are the meeting ground for a community of passionate hunters, conservationists, and wilderness enthusiasts — whether you are a seasoned safari veteran or preparing for your first African expedition.",
          discoverStory: "Discover our story"
        },
        pillars: {
          eyebrow: "Three pillars",
          title: "The Top Tracker's way.",
          patience: {
            title: "Patience",
            body: "We hunt slow. Every track is read, every wind weighed. The chase is measured in days, not minutes."
          },
          craft: {
            title: "Craft",
            body: "Professional hunters with decades across Tanzania's most storied concessions. Field-tested, quietly precise."
          },
          respect: {
            title: "Respect",
            body: "For the animal, the land, and the communities who steward it. Conservation is the price of the privilege."
          }
        },
        bestiary: {
          eyebrow: "The Field Bestiary",
          titleLine1: "Hover the quarry.",
          titleLine2: "Read the trail.",
          description: "Eight icons drawn from camp ledgers — wildlife, weather, tools of the chase. Touch one to read its line.",
          lion: "Lion",
          lionNote: "Tracked at dawn — never alone.",
          elephant: "Elephant",
          elephantNote: "Respect the matriarch's wind.",
          buffalo: "Buffalo",
          buffaloNote: "Black death of the Selous.",
          leopard: "Leopard",
          leopardNote: "Patience baited under acacia.",
          kudu: "Kudu",
          kuduNote: "Spiral horns through the thornveld.",
          rifle: "The Rifle",
          rifleNote: ".375 H&H — the old reliable.",
          bearing: "Bearing",
          bearingNote: "True north, by sun and stars.",
          acacia: "Acacia",
          acaciaNote: "Camp shade. Lantern post."
        },
        experience: {
          eyebrow: "The Experience",
          title: "A safari shaped by patience, craft, and respect.",
          body: "Each expedition is curated by professional hunters with decades of experience across Tanzania's most storied concessions. From your first inquiry to the final trophy shipment, every detail is attended to with the discretion and precision a serious hunter expects.",
          bullet1: "Private concessions across the Selous, Maasai Steppe & Iringa",
          bullet2: "PH-led tracking with native Wagogo and Maasai scouts",
          bullet3: "Full-service tented camps with brass, canvas, and lantern light",
          bullet4: "Trophy preparation, documentation, and worldwide shipment",
          explore: "Explore expeditions"
        },
        membership: {
          eyebrow: "The Hunting Club",
          title: "Membership, by invitation.",
          description: "Three tiers of belonging. Each opens doors deeper into the bush, the camp, and the community.",
          request: "Request Membership",
          featured: "Most chosen",
          tiers: {
            tracker: "Tracker",
            ph: "Professional Hunter",
            legacy: "Legacy"
          },
          perks: {
            tracker: ["Private member's circle", "Quarterly field journal", "Early access to dated hunts", "Camp invitations"],
            ph: ["All Tracker benefits", "Two reserved hunt windows", "Personal PH pairing", "Trophy concierge & shipping", "Off-season private camp stays"],
            legacy: ["All PH benefits", "Concession-naming rights", "Lifetime camp residency", "Conservation board seat", "Private game flights"]
          }
        },
        camp: {
          eyebrow: "The Camp",
          titleLine1: "Canvas, brass &",
          titleLine2: "lantern light.",
          body: "Our base camp sits beneath an acacia grove near Esilalei. Hand-stitched canvas tents, copper basins, an open-fire kitchen, and a long table where stories outlive the embers."
        },
        quote: {
          text: "In Africa, the hunt is not what you take from the land — it is what the land slowly teaches you to become.",
          author: "Hemingway, paraphrased — and lived"
        },
        cta: {
          eyebrow: "Begin",
          titleNormal: "Plan your ",
          titleItalic: "first chase",
          body: "Tell us what you seek. We'll match you to a concession, a professional hunter, and a window of weather worth the journey.",
          bookSafari: "Book your safari"
        }
      },
      ourstory: {
        hero: {
          eyebrow: "Our story",
          title_line1: "More than a hunt.",
          title_line2: "A legacy.",
          subtitle: "The ethics of modern safari hunting, written in patience."
        },
        intro: {
          highlight: "We aim to provide world-class hunting experiences that directly contribute to wildlife conservation and local community development.",
          body1: "Every expedition with Top Trackers is crafted to deliver not just a hunt, but a transformative journey into the heart of wild Africa. Our work begins long before the first dawn drive — with the elders of the villages around our concessions, with the rangers and trackers who know each ridge by name, and with the biologists who shape our quotas year by year.",
          body2: "Modern hunting, done well, is not the opposite of conservation — it is one of its most powerful instruments. A percentage of every safari we run is returned to the land: anti-poaching units, water boreholes, school roofs, and game counts.",
          callout: "This is the Top Tracker's way. Slow, considered, and quietly proud."
        },
        timeline: {
          eyebrow: "The trail so far",
          title: "A short, deliberate history.",
          1: {
            year: "2023",
            title: "First fire",
            body: "Top Trackers is founded by a small circle of Tanzanian PHs and European hunters seeking a quieter, more ethical way to hunt."
          },
          2: {
            year: "2024",
            title: "The concessions",
            body: "Long-term stewardship agreements signed across three legendary concessions in the Selous, Maasai Steppe and Iringa highlands."
          },
          3: {
            year: "2025",
            title: "The camp",
            body: "Our Base camp opens — canvas, brass, and lantern light, built with local Maasai craftsmen."
          },
          4: {
            year: "2026",
            title: "The club",
            body: "Membership opens to a limited circle of trackers, professional hunters, and legacy patrons."
          }
        },
        footer: {
          title: "Walk the trail with us.",
          explore: "Explore Membership"
        }
      },
      conservation: {
        hero: {
          eyebrow: "The price of the privilege",
          title_normal: "Hunters as ",
          title_italic: "conservators.",
          body: "Regulated, ethical hunting funds the wilderness it depends on. This is how."
        },
        pillars: {
          1: {
            title: "Quota-Funded Stewardship",
            body: "A measurable share of every concession fee returns to anti-poaching patrols, water-point maintenance, and game monitoring."
          },
          2: {
            title: "Community Partnership",
            body: "Maasai and Wagogo communities co-manage land, run scout programs, and share in revenue from every hunt we lead."
          },
          3: {
            title: "Habitat First",
            body: "We hunt low quotas across vast, intact wilderness — keeping concessions whole and corridors open."
          },
          4: {
            title: "Ethical Selection",
            body: "Only mature, post-reproductive males. Each animal is logged, aged, and reported to TAWA."
          }
        },
        stats: {
          1: { value: "92%", label: "of fee revenue stays in Tanzania" },
          2: { value: "3", label: "anti-poaching units we fund" },
          3: { value: "180k+", label: "hectares under our care" },
          4: { value: "12", label: "scout salaries on the books" }
        },
        ledger: {
          eyebrow: "In the ledger",
          title: "By the numbers, kept honest."
        },
        footer: {
          eyebrow: "Read the work",
          title: "Quarterly conservation report.",
          body: "We publish every census, scout log, and quota outcome in the field journal. No abstractions.",
          readJournal: "Read the Journal",
          partner: "Become a partner"
        }
      },
      contact: {
        hero: {
          eyebrow: "Plan your expedition",
          title_normal: "Book your ",
          title_italic: "safari.",
        },
        form: {
          eyebrow: "Inquiry",
          title: "Tell us what you seek.",
          success_title: "Karibu.",
          success_body: "Your message is on its way to camp. We'll be in touch shortly.",
          name: "Name",
          email: "Email",
          country: "Country",
          date: "Preferred start date",
          pickDate: "Pick a date",
          interest: "Interest",
          interest_option1: "The Selous Classic",
          interest_option2: "Maasai Steppe Plains",
          interest_option3: "Iringa Highlands",
          interest_option4: "Club Membership",
          interest_option5: "Other",
          more: "Tell us more",
          placeholder: "Quarry, party size, anything we should know…",
          send: "Send inquiry",
          reserve: "Reserve with $1500 deposit",
          footnote: "Deposit is fully credited against your safari balance. Refundable until 120 days before departure.",
          preparing: "Preparing…"
        },
        office: {
          title: "Office",
          address: "Losirva, Esilalei, Monduli — Tanzania",
          phone: "+255 763 075 130",
          email: "info@top-trackers.com"
        },
        camp: {
          title: "Base Camp",
          body: "on the bank of Njombe River",
          coordinates: "6°54′21.0″S · 34°59′14.8″E"
        }
      },
      experience: {
        labels: {
          duration: "Duration",
          season: "Season",
          party: "Party",
          quarry: "Quarry"
        },
        estimator: {
          eyebrow: "Inquiry — live estimate",
          title_plain: "Cost the chase, ",
          title_italic: "before you write.",
          cta: "Continue to inquiry"
        },
        hero: {
          eyebrow: "The Experience",
          title_line1: "Shaped by ",
          title_italic: "patience."
        },
        carousel: {
          eyebrow: "Expeditions"
        },
        expeditions: {
          1: {
            title: "The Selous Classic",
            desc: "Riverine forest, hippo pools, and the slow patient art of dangerous-game tracking in Africa's largest game reserve.",
            duration: "14 days",
            season: "Jun – Oct",
            party: "1–2 hunters",
            quarry: "Buffalo · Leopard · Sable · Kudu",
            cta: "Inquire"
          },
          2: {
            title: "Maasai Steppe Plains",
            desc: "Open thornveld, Maasai trackers, and dawn drives through the richest plains-game country in East Africa.",
            duration: "10 days",
            season: "May – Sep",
            party: "1–3 hunters",
            quarry: "Plains game · Gerenuk · Lesser Kudu",
            cta: "Inquire"
          },
          3: {
            title: "Iringa Highlands",
            desc: "Cool miombo woodland and high ridgelines. A connoisseur's hunt — quieter, slower, and rare in feel.",
            duration: "7 days",
            season: "Jul – Nov",
            party: "1–2 hunters",
            quarry: "Eland · Sable · Roan · Mountain Reedbuck",
            cta: "Inquire"
          },
          4: {
            title: "Design your expedition.",
            desc: "Tell us your quarry, your timeline, your party. Our professional hunters build the chase entirely around you — concession, season, and method.",
            duration: "Your call",
            season: "Year-round",
            party: "Any size",
            quarry: "Discuss with your PH",
            cta: "Speak to a PH"
          }
        },
        timeline: {
          eyebrow: "How the hunt works",
          1: { title: "Plan", desc: "Speak with a PH. We match you to a concession, season, and party size. Permits and logistics follow." },
          2: { title: "Arrive", desc: "Charter flight to the bush strip. Camp is ready. Tracking begins at first light the next morning." },
          3: { title: "Track", desc: "Days in the field with your PH and Maasai scouts. Patience, craft, and the land doing the teaching." },
          4: { title: "Return", desc: "Trophies documented and shipped. CITES handled. You leave with the story; we handle everything else." }
        },
        services: {
          section_title: "What we arrange for you",
          section_subtitle: "From first enquiry to final shipment",
          1: {
            title: "Before you arrive",
            item_1: "CITES & firearms import permits",
            item_2: "Tanzania hunting licence procurement",
            item_3: "Specialist travel insurance brokerage",
            item_4: "Visa & entry documentation",
            item_5: "Pre-hunt briefing with your PH"
          },
          2: {
            title: "In the field",
            item_1: "PH-led dangerous & plains game hunts",
            item_2: "Native Maasai & Wagogo scout teams",
            item_3: "Bird hunting — sandgrouse & francolin",
            item_4: "Bow hunting expeditions",
            item_5: "Photography safaris, no rifle required",
            item_6: "Charter flights between concessions"
          },
          3: {
            title: "After the hunt",
            item_1: "Trophy field preparation & skinning",
            item_2: "Taxidermy referral network",
            item_3: "CITES export documentation",
            item_4: "Worldwide trophy shipping concierge",
            item_5: "Trophy room design consulting",
            item_6: "Conservation levy reporting"
          }
        },
        rifle: {
          eyebrow: "Equipment & Gear",
          title: "Rifle Rental.",
          body: "Travelling with firearms is increasingly complex. We maintain an immaculate armory in camp for our clients to use. Our collection includes scoped large-calibre rifles specifically suited to African dangerous and plains game.",
          detail_1: ".375 H&H Magnum for general dangerous game",
          detail_2: ".416 Rigby for heavy cover buffalo and elephant",
          detail_3: ".300 Win Mag for longer plains game shots",
          footnote: "All rental rifles are sighted-in upon your arrival at camp. Premium ammunition is supplied per round."
        },
        camp: {
          eyebrow: "The Camp",
          title_line1: "Bring a partner.",
          title_line2: "The camp is half the experience.",
          body: "Partners, photographers, and non-hunting guests are welcome. Canvas tents, copper basins, open-fire kitchen, and a long table where stories outlive the embers.",
          bullet_1: "Full-board tented accommodation",
          bullet_2: "Private camp buyout available",
          bullet_3: "Non-hunting guest packages",
          cta: "Enquire about camp"
        },
        concession: {
          eyebrow: "The Concession",
          title: "Near Ruaha National Park.",
          body: "A hunting block near Ruaha, renowned for big and dangerous game — Elephant, Cape Buffalo, Lion, Leopard. Ethical hunts, sustainable practices, tailored to your goals.",
          bullet_1: "Elephant, Cape Buffalo, Lion, Leopard",
          bullet_2: "Kudu, plains game, iconic predators",
          bullet_3: "Expertly guided, conservation-focused",
          cta: "Explore concession"
        },
        logistics: {
          text: '"We handle the permits, CITES paperwork, charter flights, and trophy shipment. You carry the rifle. We carry everything else."',
          services: "Full hunting services"
        }
      },
      membership_page: {
        hero: {
          eyebrow: "The Hunting Club",
          title: "The Hunting Club.",
          body: "Four tiers of belonging. For non-hunting guests, companions, and photographers, we offer the Observer Pass — allowing full access to camp life and guided non-hunting activities. For hunters, our tiers range from Tracker to Legacy, each opening doors deeper into the bush, the camp, and the community."
        },
        quote: {
          text: "All memberships are reviewed by the club's founding circle. We keep numbers small on purpose — the camp table is only so long."
        },
        portal: {
          eyebrow: "Digital Access",
          title: "The Membership Portal.",
          body: "Your private gateway to the Top Trackers experience. Through the portal, members can review and reserve dates for upcoming expeditions, view their digital field journals, track trophy shipments, and communicate directly with their paired Professional Hunter.",
          feature_1: { title: "Expedition Management", body: "Reserve windows, view itineraries, and manage logistics." },
          feature_2: { title: "Digital Field Journals", body: "Private logs of your hunts, photographs, and PH notes." },
          feature_3: { title: "Trophy Tracking", body: "Real-time status of field preparation, CITES, and shipping." },
          login: "Portal Login",
          request: "Request Access"
        },
        tiers: {
          1: {
            name: "Observer Pass",
            price: "Free",
            per: "guest",
            tag: "Walk in, no rifle",
            perk_1: "For guests, photographers, companions",
            perk_2: "Experience camp, bush, and story — no rifle",
            perk_3: "Full-board tented accommodation",
            perk_4: "Shared camp activities at the long table",
            perk_5: "Non-hunting concession access with a guide",
            cta: "Request Observer Pass"
          },
          2: {
            name: "Tracker",
            price: "$2,400",
            per: "annual",
            tag: "Begin the trail",
            perk_1: "Private members' digital circle",
            perk_2: "Quarterly field journal in print",
            perk_3: "Early access to dated hunts & camps",
            perk_4: "Two annual camp-table invitations",
            perk_5: "10% guest rate on standard expeditions",
            cta: "Apply"
          },
          3: {
            name: "Professional Hunter",
            price: "$7,800",
            per: "annual",
            tag: "The trackers' tracker",
            perk_1: "Everything in Tracker",
            perk_2: "Two reserved hunt windows / year",
            perk_3: "Personal PH pairing for life",
            perk_4: "Trophy concierge & worldwide shipment",
            perk_5: "Off-season private camp residency",
            perk_6: "Annual members' driven hunt weekend",
            cta: "Apply",
            featured: "Most chosen"
          },
          4: {
            name: "Legacy",
            price: "By invitation",
            per: "lifetime",
            tag: "The longest measure",
            perk_1: "Everything in Professional Hunter",
            perk_2: "Concession-naming rights",
            perk_3: "Lifetime tented residence at Esilalei",
            perk_4: "Seat on the conservation board",
            perk_5: "Private charter game flights",
            perk_6: "Family heir transferability",
            cta: "Apply"
          }
        }
      }
    }
  },
  hu: {
    translation: {
      nav: {
        story: "Történetünk",
        experience: "Az Élmény",
        membership: "Vadászkör",
        gallery: "Galéria",
        journal: "Napló",
        conservation: "Természetvédelem",
        contact: "Kapcsolat"
      },
      home: {
        hero: {
          subtitle: "Tanzánia szívében",
          titleItalic: "Üdvözöljük",
          titlePlain: " a Top Trackersnél",
          description: "Afrika legelőkelőbb vadászkörében — ahol a hajszát a türelem, a szakértelem és a tisztelet formálja.",
          bookSafari: "Szafari foglalása",
          joinClub: "Csatlakozás a Klubhoz",
          scroll: "Görgessen le"
        },
        intro: {
          eyebrow: "Üdvözöljük, Nyomkövető",
          titleLine1: "Több mint vadászat.",
          titleLine2: "Örökség.",
          body: "A Top Trackers több mint egy vadásztársaság. Szenvedélyes vadászok, természetvédők és a vadon szerelmeseinek találkozóhelye vagyunk — függetlenül attól, hogy Ön tapasztalt szafari veterán vagy éppen az első afrikai expedíciójára készül.",
          discoverStory: "Fedezze fel történetünket"
        },
        pillars: {
          eyebrow: "Három alappillér",
          title: "A Top Trackers útja.",
          patience: {
            title: "Türelem",
            body: "Lassan vadászunk. Minden nyomot elolvasunk, minden szelet megmérünk. A hajszát napokban mérjük, nem percekben."
          },
          craft: {
            title: "Szakértelem",
            body: "Professzionális vadászok évtizedes tapasztalattal Tanzánia legnevezetesebb területein. Terepen bizonyított, csendes precizitás."
          },
          respect: {
            title: "Tisztelet",
            body: "A vad, a föld és az azt gondozó közösségek iránt. A természetvédelem a privilégiumunk ára."
          }
        },
        bestiary: {
          eyebrow: "A Terepi Bestiárium",
          titleLine1: "Vigye a kurzort a vadra.",
          titleLine2: "Olvassa a nyomot.",
          description: "Nyolc ikon a tábori naplókból — vadvilág, időjárás, a vadászat eszközei. Érintse meg az egyiket a sor elolvasásához.",
          lion: "Oroszlán",
          lionNote: "Hajnalban nyomon követve — soha sincs egyedül.",
          elephant: "Elefánt",
          elephantNote: "Tiszteld a matriarcha szélirányát.",
          buffalo: "Bivaly",
          buffaloNote: "A Selous fekete halála.",
          leopard: "Leopárd",
          leopardNote: "Türelemmel csalogatva az akácia alatt.",
          kudu: "Kudu",
          kuduNote: "Spirális szarvak a tövises bozóton át.",
          rifle: "A Puska",
          rifleNote: ".375 H&H — a régi megbízható.",
          bearing: "Iránymutatás",
          bearingNote: "Valódi észak, a nap és a csillagok alapján.",
          acacia: "Akácia",
          acaciaNote: "Tábori árnyék. Lámpás tartóoszlop."
        },
        experience: {
          eyebrow: "Az Élmény",
          title: "A szafari, amit a türelem, a szakértelem és a tisztelet formál.",
          body: "Minden expedíciót professzionális vadászok vezetnek, akik évtizedes tapasztalattal rendelkeznek Tanzánia legnevesebb területein. Az első érdeklődéstől a végső trófeaszállításig minden részletre kiterjed az a diszkréció és precizitás, amit egy komoly vadász elvár.",
          bullet1: "Magánterületek a Selous, Maasai Steppe és Iringa régiókban",
          bullet2: "PH-vezette nyomkövetés Wagogo és Maasai nyomkeresőkkel",
          bullet3: "Teljes körű szolgáltatást nyújtó sátortáborok sárgaréz, vászon és lámpafény mellett",
          bullet4: "Trófea-előkészítés, dokumentáció és világméretű szállítás",
          explore: "Expedíciók felfedezése"
        },
        membership: {
          eyebrow: "A Vadászkör",
          title: "Tagság, kizárólag meghívásos alapon.",
          description: "Három tagsági szint. Mindegyik kapukat nyit mélyebbre a bozótban, a táborban és a közösségben.",
          request: "Tagság igénylése",
          featured: "Legnépszerűbb",
          tiers: {
            tracker: "Nyomkereső",
            ph: "Hivatásos Vadász",
            legacy: "Örökség"
          },
          perks: {
            tracker: ["Privát tagi kör", "Negyedéves terepi folyóirat", "Korai hozzáférés a kijelölt vadászatokhoz", "Tábori meghívók"],
            ph: ["Minden Nyomkereső előny", "Két fenntartott vadászati időszak", "Személyes PH párosítás", "Trófea és szállítási asszisztencia", "Szezonon kívüli magántábori tartózkodás"],
            legacy: ["Minden Hivatásos Vadász előny", "Névadási jog a vadászterületekhez", "Élethosszig tartó tábori lakhatás", "Természetvédelmi igazgatósági szék", "Privát repülőutak a vadászterületekre"]
          }
        },
        camp: {
          eyebrow: "A Tábor",
          titleLine1: "Vászon, sárgaréz &",
          titleLine2: "lámpafény.",
          body: "Bázistáborunk az Esilalei melletti akácaliget alatt található. Kézzel varrt vászonsátrak, rézmedencék, nyílt tűzű konyha és egy hosszú asztal, ahol a történetek túlmutatnak a parázson."
        },
        quote: {
          text: "Afrikában a vadászat nem az, amit elveszel a földtől — hanem az, amivé a föld lassan tanít téged válni.",
          author: "Hemingway, átfogalmazva — és megélve"
        },
        cta: {
          eyebrow: "Kezdés",
          titleNormal: "Tervezze meg az ",
          titleItalic: "első hajszáját",
          body: "Mondja el, mit keres. Mi megtaláljuk Önnek a megfelelő vadászterületet, a hivatásos vadászt és az utazásra érdemes időjárási ablakot.",
          bookSafari: "Szafari foglalása"
        }
      },
      ourstory: {
        hero: {
          eyebrow: "Történetünk",
          title_line1: "Több mint vadászat.",
          title_line2: "Örökség.",
          subtitle: "A modern szafari vadászat etikája, türelembe írva."
        },
        intro: {
          highlight: "Célunk, hogy olyan világszínvonalú vadászati élményeket nyújtsunk, amelyek közvetlenül hozzájárulnak a vadvilág megőrzéséhez és a helyi közösség fejlesztéséhez.",
          body1: "Minden expedíció a Top Trackersnél úgy van kialakítva, hogy ne csak egy vadászatot, hanem egy átalakító utazást biztosítson a vad Afrika szívébe. Munkánk jóval az első hajnali indulás előtt kezdődik — a vadászterületeink körüli falvak véneivel, a vadőrökkel és nyomkeresőkkel, akik név szerint ismernek minden gerincet, és a biológusokkal, akik évről évre meghatározzák a kvótáinkat.",
          body2: "A modern vadászat, ha jól csinálják, nem a természetvédelem ellentéte — hanem annak egyik leghatékonyabb eszköze. Minden szafari bevételének egy része visszakerül a földbe: orvvadászat elleni egységekre, vízforrásokra, iskolatetőkre és vadállomány-számlálásra.",
          callout: "Ez a Top Trackers útja. Lassú, megfontolt és csendesen büszke."
        },
        timeline: {
          eyebrow: "Az eddigi nyomvonal",
          title: "Egy rövid, megfontolt történet.",
          1: {
            year: "2023",
            title: "Az első tűz",
            body: "A Top Trackerst tanzániai hivatásos vadászok (PH) és európai vadászok egy kis köre alapította, akik egy csendesebb, etikusabb vadászati módot kerestek."
          },
          2: {
            year: "2024",
            title: "A vadászterületek",
            body: "Hosszú távú kezelési megállapodásokat írtunk alá három legendás vadászterületen a Selous, a Maasai Steppe és az Iringa-felföld területén."
          },
          3: {
            year: "2025",
            title: "A tábor",
            body: "Megnyílik a bázistáborunk — vászon, sárgaréz és lámpafény, amelyet a helyi maasai kézművesek segítségével építettünk fel."
          },
          4: {
            year: "2026",
            title: "A klub",
            body: "A tagság megnyílik a nyomkeresők, hivatásos vadászok és örökség-patrónusok korlátozott köre előtt."
          }
        },
        footer: {
          title: "Járja velünk a nyomot.",
          explore: "Tagság felfedezése"
        }
      },
      conservation: {
        hero: {
          eyebrow: "A privilégium ára",
          title_normal: "Vadászok mint ",
          title_italic: "természetvédők.",
          body: "A szabályozott, etikus vadászat finanszírozza azt a vadont, amelytől függ. Így csináljuk."
        },
        pillars: {
          1: {
            title: "Kvótából Finanszírozott Védelem",
            body: "Minden vadászterületi díj mérhető része visszakerül az orvvadászat elleni járőrökhöz, a víznyerőhelyek fenntartásához és a vadállomány megfigyeléséhez."
          },
          2: {
            title: "Közösségi Partnerség",
            body: "A Maasai és Wagogo közösségek társ-kezelik a földet, vadőri programokat vezetnek, és részesülnek minden általunk vezetett vadászat bevételéből."
          },
          3: {
            title: "Első a Élőhely",
            body: "Alacsony kvótákkal vadászunk hatalmas, érintetlen vadonban — egyben tartva a vadászterületeket és nyitva hagyva a folyosókat."
          },
          4: {
            title: "Etikus Szelekció",
            body: "Csak érett, reprodukción túli hímek. Minden elejtett vadat rögzítünk, korát meghatározzuk, és jelentjük a TAWA felé."
          }
        },
        stats: {
          1: { value: "92%", label: "a díjbevételből Tanzániában marad" },
          2: { value: "3", label: "orvvadászat elleni egységet támogatunk" },
          3: { value: "180e+", label: "hektár a gondozásunk alatt" },
          4: { value: "12", label: "vadőr fizetését mi álljuk" }
        },
        ledger: {
          eyebrow: "A főkönyvben",
          title: "Számok szerint, tisztességesen."
        },
        footer: {
          eyebrow: "Olvassa el a munkánkat",
          title: "Negyedéves természetvédelmi jelentés.",
          body: "Minden számlálást, vadőri naplót és kvótaeredményt közzéteszünk a terepi folyóiratban. Semmi elvont dolog.",
          readJournal: "Olvassa a Naplót",
          partner: "Váljon partnerré"
        }
      },
      contact: {
        hero: {
          eyebrow: "Tervezze meg expedícióját",
          title_normal: "Foglalja le a ",
          title_italic: "szafarit.",
        },
        form: {
          eyebrow: "Érdeklődés",
          title: "Mondja el, mit keres.",
          success_title: "Karibu.",
          success_body: "Üzenete úton van a táborba. Hamarosan felvesszük Önnel a kapcsolatot.",
          name: "Név",
          email: "E-mail",
          country: "Ország",
          date: "Előnyben részesített kezdési dátum",
          pickDate: "Válasszon dátumot",
          interest: "Érdeklődés",
          interest_option1: "The Selous Classic",
          interest_option2: "Maasai Steppe Plains",
          interest_option3: "Iringa Highlands",
          interest_option4: "Klubtagság",
          interest_option5: "Egyéb",
          more: "Mondjon el többet",
          placeholder: "Vad, csoport mérete, bármi, amit tudnunk kell…",
          send: "Érdeklődés küldése",
          reserve: "Foglalás $1500 letéttel",
          footnote: "A letét teljes mértékben beszámításra kerül a szafari egyenlegébe. Visszatérítendő az indulás előtt 120 napig.",
          preparing: "Előkészítés…"
        },
        office: {
          title: "Iroda",
          address: "Losirva, Esilalei, Monduli — Tanzánia",
          phone: "+255 763 075 130",
          email: "info@top-trackers.com"
        },
        camp: {
          title: "Bázistábor",
          body: "a Njombe folyó partján",
          coordinates: "6°54′21.0″S · 34°59′14.8″E"
        }
      },
      experience: {
        labels: {
          duration: "Időtartam",
          season: "Szezon",
          party: "Csapat",
          quarry: "Vad"
        },
        estimator: {
          eyebrow: "Érdeklődés — élő becslés",
          title_plain: "Számolja ki a költségeket, ",
          title_italic: "mielőtt írna.",
          cta: "Folytatás az érdeklődéshez"
        },
        hero: {
          eyebrow: "Az Élmény",
          title_line1: "Formálta a ",
          title_italic: "türelem."
        },
        carousel: {
          eyebrow: "Expedíciók"
        },
        expeditions: {
          1: {
            title: "The Selous Classic",
            desc: "Galériaerdő, víziló-medencék és a veszélyes vadak nyomon követésének lassú, türelmes művészete Afrika legnagyobb vadrezervátumában.",
            duration: "14 nap",
            season: "Jún – Okt",
            party: "1–2 vadász",
            quarry: "Bivaly · Leopárd · Szábel antilop · Kudu",
            cta: "Érdeklődés"
          },
          2: {
            title: "Maasai Steppe Plains",
            desc: "Nyílt tövises bozót, maasai nyomkövetők és hajnali hajtások Kelet-Afrika leggazdagabb vadállományú síkságain.",
            duration: "10 nap",
            season: "Máj – Szep",
            party: "1–3 vadász",
            quarry: "Síksági vad · Zsiráfnyakú gazella · Kis Kudu",
            cta: "Érdeklődés"
          },
          3: {
            title: "Iringa Highlands",
            desc: "Hűvös miombo erdők és magas hegygerincek. Egy igazi ínyenc vadászat — csendesebb, lassabb és ritkább hangulatú.",
            duration: "7 nap",
            season: "Júl – Nov",
            party: "1–2 vadász",
            quarry: "Lóantilop · Szábel antilop · Kudu · Hegyi nádibak",
            cta: "Érdeklődés"
          },
          4: {
            title: "Tervezze meg expedícióját.",
            desc: "Mondja el a vadat, az időbeosztását és a kísérői számát. Hivatásos vadászaink teljesen Ön köré építik a hajszát — a vadászterületet, szezont és módszert.",
            duration: "Az Ön döntése",
            season: "Egész évben",
            party: "Bármilyen méret",
            quarry: "Beszélje meg a PH-val",
            cta: "Beszéljen egy PH-val"
          }
        },
        timeline: {
          eyebrow: "Hogyan működik a vadászat",
          1: { title: "Tervezés", desc: "Beszéljen egy hivatásos vadásszal (PH). Kiválasztjuk a területet, szezont és a csoport méretét. A többi a mi dolgunk." },
          2: { title: "Érkezés", desc: "Különjárat a bozót repülőterére. A tábor készen áll. A nyomkövetés másnap hajnalban indul." },
          3: { title: "Nyomon követés", desc: "Napok a terepen a PH-val és maasai nyomkeresőkkel. Türelem, szakértelem és a természet tanítása." },
          4: { title: "Visszatérés", desc: "A trófeák dokumentálása és szállítása. A CITES engedélyeket mi intézzük. Ön a történettel távozik, mi intézünk mindent." }
        },
        services: {
          section_title: "Mit szervezünk Önnek",
          section_subtitle: "Az első érdeklődéstől a végső trófeaszállításig",
          1: {
            title: "Érkezés előtt",
            item_1: "CITES & fegyverbehozatali engedélyek",
            item_2: "Tanzániai vadászati engedély megszerzése",
            item_3: "Speciális utazási biztosítás közvetítése",
            item_4: "Vízum & belépési dokumentumok",
            item_5: "Vadászat előtti megbeszélés a PH-val"
          },
          2: {
            title: "A terepen",
            item_1: "PH-vezette veszélyes & síksági vad vadászatok",
            item_2: "Helyi Maasai & Wagogo nyomkereső csapatok",
            item_3: "Madárvadászat — talpastyúk & frankolin",
            item_4: "Íjász vadászexpedíciók",
            item_5: "Fotós szafarik, fegyver nélkül",
            item_6: "Különjáratok a vadászterületek között"
          },
          3: {
            title: "Vadászat után",
            item_1: "Trófea terepi előkészítése & nyúzás",
            item_2: "Kiterjedt preparátori hálózat",
            item_3: "CITES export dokumentáció",
            item_4: "Világméretű trófeaszállítási asszisztencia",
            item_5: "Trófeaterem tervezési tanácsadás",
            item_6: "Természetvédelmi illeték bevallás"
          }
        },
        rifle: {
          eyebrow: "Felszerelés & Eszközök",
          title: "Puskabérlés.",
          body: "A lőfegyverekkel való utazás egyre bonyolultabb. A táborban makulátlan fegyvertárat tartunk fenn ügyfeleink számára. Gyűjteményünk céltávcsővel felszerelt nagy kaliberű puskákat tartalmaz, amelyek kifejezetten alkalmasak az afrikai síksági és veszélyes vadak vadászatára.",
          detail_1: ".375 H&H Magnum általános veszélyes vad vadászatára",
          detail_2: ".416 Rigby nehéz terepen történő bivaly- és elefántvadászathoz",
          detail_3: ".300 Win Mag hosszabb síksági vadlövésekhez",
          footnote: "Minden bérelt puskát belőjük az Ön táborba érkezésekor. Prémium lőszert biztosítunk darabáron."
        },
        camp: {
          eyebrow: "A Tábor",
          title_line1: "Hozza el partnerét.",
          title_line2: "A tábor az élmény fele.",
          body: "Partnereket, fotósokat és nem vadászó vendégeket is szívesen látunk. Vászon sátrak, réz medencék, nyílt tűzhelyű konyha és egy hosszú asztal, ahol a történetek túlmutatnak a parázson.",
          bullet_1: "Teljes ellátás sátorban",
          bullet_2: "Privát tábor bérlési lehetőség",
          bullet_3: "Nem vadászó vendégcsomagok",
          cta: "Érdeklődjön a táborról"
        },
        concession: {
          eyebrow: "A Vadászterület",
          title: "A Ruaha Nemzeti Park közelében.",
          body: "Vadászház a Ruaha közelében, híres a nagy és veszélyes vadakról — Elefánt, Kafferbivaly, Oroszlán, Leopárd. Etikus vadászat, fenntartható gyakorlatok, az Ön céljaira szabva.",
          bullet_1: "Elefánt, Kafferbivaly, Oroszlán, Leopárd",
          bullet_2: "Kudu, síksági vad, ikonikus ragadozók",
          bullet_3: "Szakértő vezetés, természetvédelmi fókusz",
          cta: "Terület felfedezése"
        },
        logistics: {
          text: '"Mi intézzük az engedélyeket, a CITES papírokat, a charter járatokat és a trófea szállítást. Ön viszi a puskát. Mi viszünk minden mást."',
          services: "Teljes vadászati szolgáltatások"
        }
      },
      membership_page: {
        hero: {
          eyebrow: "A Vadászkör",
          title: "A Vadászkör.",
          body: "Négy tagsági szint. A nem vadászó vendégek, kísérők és fotósok számára kínáljuk a Megfigyelő bérletet (Observer Pass) — amely teljes hozzáférést biztosít a tábori élethez és a kísért nem vadászati tevékenységekhez. A vadászok számára a tagsági szintek a Nyomkeresőtől az Örökségig terjednek, amelyek mindegyike mélyebb betekintést enged a bozótba, a táborba és a közösségbe."
        },
        quote: {
          text: "Minden tagságot a klub alapító köre bírál el. Szándékosan tartjuk alacsonyan a létszámot — a tábori asztal hossza véges."
        },
        portal: {
          eyebrow: "Digitális Hozzáférés",
          title: "A Tagi Portál.",
          body: "Az Ön privát átjárója a Top Trackers élményhez. A portálon keresztül a tagok áttekinthetik és lefoglalhatják a közelgő expedíciók időpontjait, megtekinthetik digitális terepi naplóikat, követhetik a trófeaszállítások állapotát, és közvetlenül kapcsolatba léphetnek a hozzájuk rendelt hivatásos vadásszal.",
          feature_1: { title: "Expedíciók Kezelése", body: "Időpontok lefoglalása, útvonalak megtekintése és logisztika kezelése." },
          feature_2: { title: "Digitális Terepi Naplók", body: "Privát naplók a vadászatokról, fényképekről és PH jegyzetekről." },
          feature_3: { title: "Trófeakövetés", body: "A terepi előkészítés, a CITES és a szállítás valós idejű állapota." },
          login: "Portál Bejelentkezés",
          request: "Hozzáférés Igénylése"
        },
        tiers: {
          1: {
            name: "Observer Pass",
            price: "Ingyenes",
            per: "vendég",
            tag: "Belépés fegyver nélkül",
            perk_1: "Vendégeknek, fotósoknak, kísérőknek",
            perk_2: "Tapasztalja meg a tábort, bozótot és történetet fegyver nélkül",
            perk_3: "Teljes ellátás sátorban",
            perk_4: "Közös tábori tevékenységek a hosszú asztalnál",
            perk_5: "Nem vadászati terület-hozzáférés vezetővel",
            cta: "Observer Pass Igénylése"
          },
          2: {
            name: "Nyomkereső",
            price: "$2,400",
            per: "éves",
            tag: "Kezdje meg a nyomot",
            perk_1: "Privát tagi digitális kör",
            perk_2: "Negyedéves terepi folyóirat nyomtatásban",
            perk_3: "Korai hozzáférés a vadászatokhoz és táborokhoz",
            perk_4: "Két éves meghívás a tábori asztalhoz",
            perk_5: "10% vendégkedvezmény a standard expedíciókra",
            cta: "Jelentkezés"
          },
          3: {
            name: "Hivatásos Vadász",
            price: "$7,800",
            per: "éves",
            tag: "A nyomkeresők nyomkeresője",
            perk_1: "Minden Nyomkereső előny",
            perk_2: "Két fenntartott vadászati időszak / év",
            perk_3: "Személyes PH párosítás élethosszig",
            perk_4: "Trófea és világméretű szállítási concierge",
            perk_5: "Szezonon kívüli magántábori tartózkodás",
            perk_6: "Éves tagi hajtóvadászat hétvége",
            cta: "Jelentkezés",
            featured: "Legnépszerűbb"
          },
          4: {
            name: "Örökség",
            price: "Meghívásos",
            per: "élethosszig",
            tag: "A leghosszabb táv",
            perk_1: "Minden Hivatásos Vadász előny",
            perk_2: "Névadási jog a vadászterületekhez",
            perk_3: "Élethosszig tartó tábori lakhatás Esilaleinél",
            perk_4: "Szék a természetvédelmi igazgatóságban",
            perk_5: "Privát charter repülések a területek felett",
            perk_6: "Családi örökösöknek átruházható tagság",
            cta: "Jelentkezés"
          }
        }
      }
    }
  }
};

const savedLanguage = typeof window !== "undefined" ? localStorage.getItem("language") || "en" : "en";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: typeof window !== "undefined" ? savedLanguage : "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
