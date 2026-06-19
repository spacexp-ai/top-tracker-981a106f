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
      },

      gallery: {
        hero: {
          eyebrow: "The Field Gallery",
          title_normal: "Photographs from ",
          title_italic: "the bush",
          body: "A visual ledger — quarry, camp, kit, and country. Taken across our concessions in the Selous, Maasai Steppe, and Iringa highlands."
        },
        sections: {
          quarry: {
            eyebrow: "The Quarry",
            title: "Animals of the chase",
            body: "Lion, leopard, elephant, buffalo, kudu — the Tanganyikan five and the supporting cast."
          },
          camp: {
            eyebrow: "The Camp",
            title: "Canvas & lantern",
            body: "Where the day begins and ends — tents, table, embers."
          },
          field: {
            eyebrow: "In the Field",
            title: "Hunters & kit",
            body: "Trackers, professional hunters, and the tools they trust."
          },
          country: {
            eyebrow: "The Country",
            title: "Land & people",
            body: "Acacia country and the Maasai who steward it."
          }
        }
      },
      journal: {
        hero: {
          eyebrow: "Dispatches from the bush",
          title_normal: "The ",
          title_italic: "Field Journal",
          body: "Tracking notes, conservation reports, and unhurried stories — written in the bush, edited by lantern light."
        },
        subscribe: {
          eyebrow: "Subscribe",
          title: "The quarterly field journal — by post.",
          body: "Members receive the printed edition four times a year. Add your address to the waiting list.",
          cta: "Request the Journal"
        },
        photo_journal: {
          eyebrow: "Photo journal",
          title_normal: "Frames from the ",
          title_italic: "bush.",
          body: "A rotating gallery of stills from camp, concession, and chase — shot on film, scanned at the kitchen table."
        },
        entries: {
          1: {
            title: "The long wait for the Iringa buffalo",
            excerpt: "Eleven days under acacia and a wind that never settled. Patience is the only currency the old bulls accept.",
            tag: "Field Notes"
          },
          2: {
            title: "Why we counted the lions before we sold a hunt",
            excerpt: "Our annual census in the Selous block, and what the numbers told us about quota, prey, and the price of restraint.",
            tag: "Conservation"
          },
          3: {
            title: "Brass, canvas, and the lost art of camp",
            excerpt: "A walk through Esilalei base camp with the canvas-master who has stitched our tents for thirty seasons.",
            tag: "Camp Life"
          },
          4: {
            title: "Maasai Steppe — a season in dispatches",
            excerpt: "Six members, two professional hunters, one impossible kudu. Recollections from the 2025 driven weekend.",
            tag: "Expedition"
          }
        }
      },
      partners: {
        hero: {
          eyebrow: "For the trade",
          title_italic: "Partners",
          title_plain: "in the field."
        },
        form: {
          eyebrow: "Open the conversation",
          title: "Tell us where you fit.",
          success_title: "Asante.",
          success_body: "We'll be in touch within five business days.",
          name: "Name",
          email: "Email",
          org: "Organisation",
          role: "Role",
          role_ph: "I am a Professional Hunter",
          role_agent: "I am a Travel Agent",
          role_partner: "I am a Conservation Partner",
          role_other: "Other",
          message: "Tell us about your work",
          submit: "Submit partnership enquiry"
        },
        lanes: {
          1: {
            title: "Professional Hunters",
            body: "Field positions for licensed PHs with verifiable concession experience. Long-season contracts, fair share of trophy fees, full camp support.",
            perk_1: "Long-season contracts",
            perk_2: "Full camp & vehicle support",
            perk_3: "Trophy fee share",
            perk_4: "Insurance & liability cover"
          },
          2: {
            title: "Travel Agents",
            body: "A discreet, generous commission structure for established hunting and luxury safari agents. Live availability and dedicated booking desk.",
            perk_1: "Tiered commission up to 15%",
            perk_2: "Live availability calendar",
            perk_3: "Co-branded itineraries",
            perk_4: "Dedicated booking desk"
          },
          3: {
            title: "Conservation Partners",
            body: "Research bodies, anti-poaching units, and habitat NGOs. Co-funded patrols, shared census data, and field access for accredited scientists.",
            perk_1: "Co-funded scout units",
            perk_2: "Shared census data",
            perk_3: "Field access for research",
            perk_4: "Annual partnership review"
          }
        }
      },
      faqs_page: {
        hero: {
          eyebrow: "Answers from camp",
          title_normal: "Frequently ",
          title_italic: "asked."
        },
        list: {
          1: {
            q: "When is the best time to hunt in Tanzania?",
            a: "Our season runs July through November, with cooler, drier weather and concentrated game around the remaining water."
          },
          2: {
            q: "Do I need to bring my own rifle?",
            a: "You may bring your own under a Tanzanian import permit, or use one of our camp rifles. We chamber .375 H&H, .416 Rigby, and .300 Win Mag among others."
          },
          3: {
            q: "What does the daily rate include?",
            a: "Camp accommodation, all meals and drinks, PH and trackers, vehicles, fuel, field preparation of trophies, and government conservation levies. It excludes trophy fees, dip-pack, shipping, gratuities, and charter flights."
          },
          4: {
            q: "How long is a typical safari?",
            a: "Plains game runs 7–10 days; dangerous game safaris run 14–21 days for proper tracking and fair chase."
          },
          5: {
            q: "Is hunting really conservation?",
            a: "Properly regulated hunting funds the bulk of African anti-poaching and habitat work. We publish our quota outcomes and conservation spend annually in the field journal."
          },
          6: {
            q: "How do I apply for membership?",
            a: "Submit an application through the membership page. Each application is reviewed by the founding circle; we deliberately keep numbers small."
          },
          7: {
            q: "Can I cancel or postpone?",
            a: "Cancellation terms scale with proximity to your booking. Postponement within the same season is generally free; full terms are shared at deposit."
          }
        }
      },
      privacy_page: {
        hero: {
          eyebrow: "Discretion as a discipline",
          title: "Privacy Policy",
          date: "Last updated: 1 May 2026"
        },
        intro: "Top Trackers Ltd. respects your privacy. This policy explains what we collect, why, and what we will never do with your information.",
        section: {
          1: {
            title: "What we collect",
            body: "Booking and membership applications: name, contact details, travel documents, dietary and medical notes relevant to the safari. Website analytics: pages visited and aggregate device data, only with your cookie consent."
          },
          2: {
            title: "How we use it",
            body: "To operate your safari and membership, to communicate with you, and to maintain conservation records as required by Tanzanian authorities. Member and guest identities are never sold, shared, or published."
          },
          3: {
            title: "Cookies",
            body: "We use cookies to remember your preferences and to measure site performance. You can decline non-essential cookies at any time via the banner at the foot of the page."
          },
          4: {
            title: "Your rights",
            body: "You may request a copy of, correction to, or deletion of your personal data at any time by writing to info@top-trackers.com. We will respond within 30 days."
          },
          5: {
            title: "Retention",
            body: "Booking records are retained for seven years for tax and conservation-record purposes; marketing data is retained only while your subscription is active."
          }
        }
      },
      terms_page: {
        hero: {
          eyebrow: "The fine print",
          title: "Terms of Service",
          date: "Last updated: 1 May 2026"
        },
        intro: "These terms govern your booking with, and use of services from, Top Trackers Ltd. (Tanzania). By placing a deposit or signing a hunt agreement, you accept these terms in full.",
        section: {
          1: {
            title: "1. Bookings & Deposits",
            body: "A non-refundable deposit of 30% confirms a booking. The balance is due 60 days before the safari start date. Late balance payment may release dates to other clients."
          },
          2: {
            title: "2. Cancellation & Postponement",
            body: "Cancellation more than 120 days from start date forfeits the deposit only. Cancellation within 120 days forfeits 60% of the total. Cancellation within 30 days forfeits 100%. Postponement within the same season is offered free of charge subject to availability."
          },
          3: {
            title: "3. Quotas & Trophies",
            body: "All hunts are conducted under TAWA licences and within published quotas. Trophy fees are only invoiced after the animal is confirmed taken. CITES documentation is included; international shipping is invoiced separately."
          },
          4: {
            title: "4. Liability",
            body: "The client acknowledges that hunting is inherently risky. Top Trackers carries full third-party liability cover. Personal travel, medical, and evacuation insurance is required of every guest."
          },
          5: {
            title: "5. Conduct",
            body: "We reserve the right to terminate a safari without refund for any breach of fair-chase ethics, intoxicated handling of firearms, or disrespect to staff or wildlife."
          },
          6: {
            title: "6. Governing Law",
            body: "These terms are governed by the laws of the United Republic of Tanzania. Any dispute will be settled by arbitration in Arusha."
          }
        }
      },
      hunting_services: {
        hero: {
          eyebrow: "Full-service in the bush",
          title_normal: "Hunting ",
          title_italic: "services."
        },
        list: {
          1: {
            title: "PH-Led Dangerous Game",
            body: "Buffalo, leopard, and lion under our most experienced professional hunters. Long-form tracking, fair chase, low quotas."
          },
          2: {
            title: "Plains Game Safaris",
            body: "Kudu, sable, eland, gerenuk, lesser kudu. Foot, vehicle, and stalk combinations across our three concession blocks."
          },
          3: {
            title: "Trophy Preparation",
            body: "Field dressing, salting, skinning, and dip-pack. Full CITES documentation and worldwide shipment via accredited handlers."
          },
          4: {
            title: "Camp & Logistics",
            body: "Full-service tented camps — canvas, brass, lantern light. Chef, valet, vehicles, comms, and emergency medical on standby."
          },
          5: {
            title: "Charter & Transfers",
            body: "Private bush flights from Arusha, Dar es Salaam, and Nairobi. Same-day camp delivery, on schedule."
          },
          6: {
            title: "Concession Management",
            body: "We manage three Tanzanian concessions under TAWA licence, with annual census, anti-poaching, and quota oversight."
          }
        },
        footer: {
          cta: "Plan your expedition"
        }
      },
      auth_page: {
        meta: {
          title: "The Camp Gate — Top Trackers",
          desc: "Sign in to your Top Trackers member portal."
        },
        reset: "Reset Password",
        welcome: "Welcome, Tracker",
        signin_text: "Enter the camp.",
        signup_text: "Request your seat by the fire.",
        reset_text: "We'll send you a link to get back in.",
        labels: {
          name: "Display name",
          email: "Email",
          password: "Password",
          forgot: "Forgot?"
        },
        buttons: {
          signin: "Enter the camp",
          signup: "Request access",
          reset: "Send reset link",
          google: "Continue with Google"
        },
        links: {
          signin: "Back to Sign In",
          observer: "Request Observer Pass",
          apply: "Apply for membership"
        }
      },
      estimator_embed: {
        concession: "Concession",
        duration: "Duration",
        days: "days",
        hunters: "Hunters",
        trophy_species: "Trophy species",
        tap_info: "Tap to add or remove from your quota.",
        membership_tier: "Membership tier",
        standard_rate: "Standard rate",
        off: "off rates & fees",
        off_day: " / day",
        off_day_hunter: " / hunter / day",
        charter_checkbox: "Add private bush charter (round-trip)",
        charter_label: "Private bush charter",
        live_estimate: "Live estimate",
        estimated_total: "Estimated total",
        total_footnote: "All-inclusive of camp, PH, tracking, and trophy preparation. Excludes shipping & taxes.",
        reserve_btn: "Reserve this estimate",
        apply_btn: "Save up to 18% — apply for membership",
        concessions: {
          selous: "Selous Reserve",
          maasai: "Maasai Steppe",
          iringa: "Iringa Highlands"
        },
        species: {
          buffalo: "Cape Buffalo",
          leopard: "Leopard",
          kudu: "Greater Kudu",
          sable: "Sable Antelope",
          eland: "Eland",
          warthog: "Warthog"
        },
        tiers: {
          none: "Non-member",
          tracker: "Tracker",
          ph: "Professional Hunter",
          legacy: "Legacy"
        }
      },
      membership_apply: {
        meta: {
          title: "Apply for Membership — Top Trackers",
          desc: "Apply for membership in Top Trackers — Tanzania's invitation-only safari and hunting club."
        },
        hero: {
          eyebrow: "Apply for membership",
          title: "A short, considered application.",
          body: "Three steps. Reviewed personally by our founding circle. We keep numbers small on purpose."
        },
        steps: {
          step: "Step",
          of: "of",
          1: {
            title: "About you",
            name: "Full name",
            email: "Email",
            country: "Country of residence",
            referred: "Referred by (optional)"
          },
          2: {
            title: "Tier & experience",
            preferred: "Preferred tier",
            exp: "Hunting experience",
            exp_placeholder: "Years hunting, geographies, dangerous game experience…",
            quarry: "Quarry of interest",
            quarry_placeholder: "Buffalo, leopard, kudu…"
          },
          3: {
            title: "Why Top Trackers",
            motivation: "A short note to the founding circle",
            motivation_placeholder: "In a few lines, tell us why this club, and what you'd bring to it.",
            agreement: "I have read and accept the Terms of Service and Privacy Policy."
          }
        },
        buttons: {
          back: "Back",
          continue: "Continue",
          submit: "Submit application"
        },
        success: {
          eyebrow: "Application received",
          title: "Karibu",
          body: "Your application is in the founding circle's hands. We review every submission personally and respond within ten business days.",
          return: "Return home"
        }
      },
      footer: {
        tag: "The ancient art of the African chase, met with the quiet confidence of a private membership.",
        office: "Office",
        base_camp: "Base Camp",
        river: "on the bank of Njombe River",
        compass: "Compass",
        dispatch: "Field Dispatch",
        rights: "All rights reserved.",
        slogan: "Ethical Hunting · Conservation Heritage"
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
      },

      gallery: {
        hero: {
          eyebrow: "A Terepi Galéria",
          title_normal: "Fényképek a ",
          title_italic: "bozótból",
          body: "Vizuális napló — vad, tábor, felszerelés és vidék. A Selous, a Maasai Steppe és az Iringa-felföld vadászterületein készült felvételek."
        },
        sections: {
          quarry: {
            eyebrow: "A Vad",
            title: "A hajsza vadjai",
            body: "Oroszlán, leopárd, elefánt, bivaly, kudu — a tanganyikai ötös és a kísérő vadak."
          },
          camp: {
            eyebrow: "A Tábor",
            title: "Vászon és lámpás",
            body: "Ahol a nap kezdődik és véget ér — sátrak, asztal, parázs."
          },
          field: {
            eyebrow: "A Terepen",
            title: "Vadászok és felszerelés",
            body: "Nyomkeresők, hivatásos vadászok és az eszközök, amelyekben bíznak."
          },
          country: {
            eyebrow: "A Vidék",
            title: "Föld és emberek",
            body: "Akácia vidék és a maasaiak, akik gondozzák."
          }
        }
      },
      journal: {
        hero: {
          eyebrow: "Tudósítások a bozótból",
          title_normal: "A ",
          title_italic: "Terepi Napló",
          body: "Nyomkövetési jegyzetek, természetvédelmi jelentések és ráérős történetek — a bozótban írva, lámpafénynél szerkesztve."
        },
        subscribe: {
          eyebrow: "Feliratkozás",
          title: "A negyedéves terepi folyóirat — postán.",
          body: "A tagok évente négyszer kapják meg a nyomtatott kiadást. Adja hozzá a címét a várólistához.",
          cta: "Napló Igénylése"
        },
        photo_journal: {
          eyebrow: "Fotónapló",
          title_normal: "Képkockák a ",
          title_italic: "bozótból.",
          body: "Egy forgó galéria a táborból, a területről és a hajszáról készült állóképekből — filmre fotózva, a konyhaasztalnál beszkennelve."
        },
        entries: {
          1: {
            title: "A hosszú várakozás az iringai bivalyra",
            excerpt: "Tizenegy nap az akácia alatt és a szél, amely soha nem csillapodott. A türelem az egyetlen valuta, amit az öreg bikák elfogadnak.",
            tag: "Terepi Jegyzetek"
          },
          2: {
            title: "Miért számoltuk meg az oroszlánokat, mielőtt eladtuk a vadászatot",
            excerpt: "Éves számlálásunk a Selous területén, és mit mondtak a számok a kvótáról, a prédáról és a visszafogottság áráról.",
            tag: "Természetvédelem"
          },
          3: {
            title: "Sárgaréz, vászon és a táborozás elveszett művészete",
            excerpt: "Séta az Esilalei bázistáborban a vászonmesterrel, aki harminc szezonon át varrta sátrainkat.",
            tag: "Tábori Élet"
          },
          4: {
            title: "Maasai Steppe — egy szezon tudósításokban",
            excerpt: "Hat tag, két hivatásos vadász, egy lehetetlen kudu. Visszaemlékezések a 2025-ös hajtóvadászat hétvégéjéről.",
            tag: "Expedíció"
          }
        }
      },
      partners: {
        hero: {
          eyebrow: "A szakma számára",
          title_italic: "Partnerek",
          title_plain: "a terepen."
        },
        form: {
          eyebrow: "Kezdjük el a beszélgetést",
          title: "Mondja el, hol látja a helyét.",
          success_title: "Asante.",
          success_body: "Öt munkanapon belül felvesszük Önnel a kapcsolatot.",
          name: "Név",
          email: "E-mail",
          org: "Szervezet",
          role: "Szerepkör",
          role_ph: "Hivatásos Vadász vagyok",
          role_agent: "Utazási Ügynök vagyok",
          role_partner: "Természetvédelmi Partner vagyok",
          role_other: "Egyéb",
          message: "Meséljen a munkájáról",
          submit: "Partnerségi érdeklődés elküldése"
        },
        lanes: {
          1: {
            title: "Hivatásos Vadászok",
            body: "Terepi pozíciók engedéllyel rendelkező PH-k számára, igazolható vadászterületi tapasztalattal. Hosszú távú szerződések, trófeadíjak méltányos megosztása, teljes tábori támogatás.",
            perk_1: "Hosszú távú szerződések",
            perk_2: "Teljes tábori és jármű támogatás",
            perk_3: "Trófeadíj részesedés",
            perk_4: "Biztosítás és felelősségbiztosítás"
          },
          2: {
            title: "Utazási Ügynökök",
            body: "Diszkrét, nagyvonalú jutalékrendszer bejegyzett vadászati és luxus szafari ügynökök számára. Élő elérhetőség és külön foglalási pult.",
            perk_1: "Sávos jutalék 15%-ig",
            perk_2: "Élő elérhetőségi naptár",
            perk_3: "Közös márkájú útitervek",
            perk_4: "Dedikált foglalási pult"
          },
          3: {
            title: "Természetvédelmi Partnerek",
            body: "Kutatóintézetek, orvvadászat elleni egységek és élőhelyvédő civil szervezetek. Közösen finanszírozott járőrök, megosztott census adatok és terepi hozzáférés akkreditált tudósok számára.",
            perk_1: "Közösen finanszírozott vadőri egységek",
            perk_2: "Megosztott állományszámlálási adatok",
            perk_3: "Terepi hozzáférés kutatáshoz",
            perk_4: "Éves partnerségi felülvizsgálat"
          }
        }
      },
      faqs_page: {
        hero: {
          eyebrow: "Válaszok a táborból",
          title_normal: "Gyakran ",
          title_italic: "ismételt."
        },
        list: {
          1: {
            q: "Mikor a legjobb vadászni Tanzániában?",
            a: "Szezonunk júliustól novemberig tart, hűvösebb, szárazabb időjárással, a vadak pedig a megmaradt vízforrások köré koncentrálódnak."
          },
          2: {
            q: "Be kell hoznom a saját puskámat?",
            a: "Behozhatja sajátját tanzániai behozatali engedéllyel, vagy használhatja a tábori puskáinkat. Többek között .375 H&H, .416 Rigby és .300 Win Mag kaliberek állnak rendelkezésre."
          },
          3: {
            q: "Mit tartalmaz a napi díj?",
            a: "Tábori szállást, minden étkezést és italt, a PH és nyomkeresők díját, járműveket, üzemanyagot, a trófeák terepi előkészítését és a kormányzati természetvédelmi illetékeket. Nem tartalmazza a trófeadíjakat, a szállítást, a borravalót és a charter járatokat."
          },
          4: {
            q: "Milyen hosszú egy tipikus szafari?",
            a: "A síksági vad szafari 7-10 napig tart; a veszélyes vad szafari 14-21 napig tart a megfelelő nyomon követés és a méltányos hajsza érdekében."
          },
          5: {
            q: "Valóban természetvédelem a vadászat?",
            a: "A megfelelően szabályozott vadászat finanszírozza az afrikai orvvadászat elleni és élőhelyvédelmi munka oroszlánrészét. Évente közzétesszük a kvótaeredményeket és a természetvédelmi kiadásokat a terepi folyóiratban."
          },
          6: {
            q: "Hogyan jelentkezhetek tagságra?",
            a: "Nyújtsa be jelentkezését a tagsági oldalon keresztül. Minden jelentkezést az alapító kör bírál el; a létszámot szándékosan alacsonyan tartjuk."
          },
          7: {
            q: "Lemondhatom vagy elhalaszthatom?",
            a: "A lemondási feltételek a foglalás időpontjához való közelségtől függenek. A halasztás ugyanazon a szezonon binnen általában ingyenes; a teljes feltételeket a letét befizetésekor osztjuk meg."
          }
        }
      },
      privacy_page: {
        hero: {
          eyebrow: "Diszkréció mint fegyelem",
          title: "Adatvédelmi irányelvek",
          date: "Utoljára frissítve: 2026. május 1."
        },
        intro: "A Top Trackers Kft. tiszteletben tartja az Ön adatvédelmét. Ez az irányelv elmagyarázza, mit gyűjtünk, miért, és mit nem fogunk soha tenni az Ön adataival.",
        section: {
          1: {
            title: "Amit gyűjtünk",
            body: "Foglalási és tagsági jelentkezések: név, elérhetőségek, utazási dokumentumok, a szafari szempontjából releváns étkezési és egészségügyi megjegyzések. Weboldal-analitika: látogatott oldalak és összesített eszközadatok, csak az Ön süti-hozzájárulásával."
          },
          2: {
            title: "Hogyan használjuk",
            body: "A szafari és a tagság működtetéséhez, a kapcsolatfelvételhez és a tanzániai hatóságok által előírt természetvédelmi nyilvántartások vezetéséhez. A tagok és vendégek személyazonosságát soha nem értékesítjük, osztjuk meg vagy hozzuk nyilvánosságra."
          },
          3: {
            title: "Sütik",
            body: "Sütiket használunk a preferenciái megjegyzésére és a webhely teljesítményének mérésére. A nem alapvető sütiket bármikor elutasíthatja az oldal alján található sávon keresztül."
          },
          4: {
            title: "Az Ön jogai",
            body: "Bármikor kérheti személyes adatainak másolatát, helyesbítését vagy törlését az info@top-trackers.com címen. 30 napon belül válaszolunk."
          },
          5: {
            title: "Megőrzés",
            body: "A foglalási nyilvántartásokat adózási és természetvédelmi nyilvántartási okokból hét évig megőrizzük; a marketing adatokat csak addig tároljuk, amíg előfizetése aktív."
          }
        }
      },
      terms_page: {
        hero: {
          eyebrow: "A kisbetűs rész",
          title: "Általános Szerződési Feltételek",
          date: "Utoljára frissítve: 2026. május 1."
        },
        intro: "Ezek a feltételek szabályozzák a Top Trackers Kft.-vel (Tanzánia) való foglalását és szolgáltatásainak igénybevételét. A letét befizetésével vagy a vadászati szerződés aláírásával Ön teljes mértékben elfogadja ezeket a feltételeket.",
        section: {
          1: {
            title: "1. Foglalások és letétek",
            body: "30% nem visszatérítendő letét megerősíti a foglalást. A hátralék a szafari kezdőnapja előtt 60 nappal esedékes. A hátralék késedelmes fizetése esetén az időpontokat más ügyfeleknek adhatjuk ki."
          },
          2: {
            title: "2. Lemondás és halasztás",
            body: "Az indulás előtt több mint 120 nappal történő lemondás esetén csak a letét vész el. 120 napon belüli lemondás esetén a teljes összeg 60%-a vész el. 30 napon belüli lemondás esetén a teljes összeg 100%-a vész el. A halasztást ugyanazon a szezonon belül ingyenesen felajánljuk a szabad helyek függvényében."
          },
          3: {
            title: "3. Kvóták és trófeák",
            body: "Minden vadászatot a TAWA engedélyei alapján és a közzétett kvóták szerint bonyolítunk le. A trófeadíjak csak a vad elejtésének igazolása után kerülnek kiszámlázásra. A CITES dokumentációt tartalmazza az ár; a nemzetközi szállítást külön számlázzuk ki."
          },
          4: {
            title: "4. Felelősség",
            body: "Az ügyfél tudomásul veszi, hogy a vadászat eredendően veszélyes tevékenység. A Top Trackers teljes körű harmadik fél felelősségbiztosítással rendelkezik. Minden vendég számára kötelező a személyes utazási, egészségügyi és mentési biztosítás."
          },
          5: {
            title: "5. Magatartás",
            body: "Fenntartjuk a jogot a szafari visszatérítés nélküli megszakítására a méltányos vadászat etikai szabályainak megsértése, ittas fegyverkezelés vagy a személyzet vagy a vadak iránti tiszteletlenség esetén."
          },
          6: {
            title: "6. Irányadó jog",
            body: "Ezekre a feltételekre a Tanzániai Egyesült Köztársaság törvényei az irányadók. Bármely vitás kérdést Arushában, választottbírósági eljárás keretében rendezünk."
          }
        }
      },
      hunting_services: {
        hero: {
          eyebrow: "Teljes körű szolgáltatás a bozótban",
          title_normal: "Vadászat ",
          title_italic: "szolgáltatások."
        },
        list: {
          1: {
            title: "PH-vezette veszélyes vad",
            body: "Bivaly, leopárd és oroszlán a legtapasztaltabb hivatásos vadászaink vezetésével. Hosszú távú nyomon követés, méltányos hajsza, alacsony kvóták."
          },
          2: {
            title: "Síksági vad szafarik",
            body: "Kudu, szábel antilop, eland, zsiráfnyakú gazella, kis kudu. Gyalogos, járműves és cserkelő kombinációk a három vadászterületünkön."
          },
          3: {
            title: "Trófea-előkészítés",
            body: "Terepi nyúzás, sózás, előkészítés és fertőtlenítő csomagolás. Teljes CITES dokumentáció és világméretű szállítás akkreditált szállítmányozókon keresztül."
          },
          4: {
            title: "Tábor és logisztika",
            body: "Teljes körű sátortáborok — vászon, sárgaréz, lámpafény. Szakács, inas, járművek, kommunikáció és sürgősségi orvosi ellátás készenlétben."
          },
          5: {
            title: "Charter és transzferek",
            body: "Privát bozót járatok Arushából, Dar es Salaamból és Nairobiból. Aznapi megérkezés a táborba, menetrend szerint."
          },
          6: {
            title: "Területkezelés",
            body: "Három tanzániai vadászterületet kezelünk a TAWA engedélyével, éves számlálással, orvvadászat elleni védelemmel és kvótafelügyelettel."
          }
        },
        footer: {
          cta: "Tervezze meg expedícióját"
        }
      },
      auth_page: {
        meta: {
          title: "A táborkapu — Top Trackers",
          desc: "Jelentkezzen be a Top Trackers tagi portáljára."
        },
        reset: "Jelszó visszaállítása",
        welcome: "Üdvözöljük, Nyomkövető",
        signin_text: "Lépjen be a táborba.",
        signup_text: "Kérjen helyet a tűz mellett.",
        reset_text: "Küldünk egy linket a visszatéréshez.",
        labels: {
          name: "Megjelenített név",
          email: "E-mail",
          password: "Jelszó",
          forgot: "Elfelejtette?"
        },
        buttons: {
          signin: "Lépjen be a táborba",
          signup: "Hozzáférés igénylése",
          reset: "Visszaállító link küldése",
          google: "Folytatás Google-fiókkal"
        },
        links: {
          signin: "Vissza a bejelentkezéshez",
          observer: "Observer Pass igénylése",
          apply: "Tagság igénylése"
        }
      },
      estimator_embed: {
        concession: "Vadászterület",
        duration: "Időtartam",
        days: "nap",
        hunters: "Vadászok",
        trophy_species: "Trófeás vadfajok",
        tap_info: "Koppintson a kvótához való hozzáhzáshoz vagy eltávolításhoz.",
        membership_tier: "Tagsági szint",
        standard_rate: "Standard ár",
        off: "kedvezmény az árakból",
        off_day: " / nap",
        off_day_hunter: " / vadász / nap",
        charter_checkbox: "Privát repülőút hozzáadása (oda-vissza)",
        charter_label: "Privát repülőút",
        live_estimate: "Élő becslés",
        estimated_total: "Becsült összeg",
        total_footnote: "Tartalmazza a tábort, a PH-t, a nyomkövetést és a trófeák előkészítését. Nem tartalmazza a szállítást és az adókat.",
        reserve_btn: "Becslés lefoglalása",
        apply_btn: "Takarítson meg akár 18%-ot — igényeljen tagságot",
        concessions: {
          selous: "Selous Vadrezervátum",
          maasai: "Maasai Steppe",
          iringa: "Iringa-felföld"
        },
        species: {
          buffalo: "Kafferbivaly",
          leopard: "Leopárd",
          kudu: "Nagy Kudu",
          sable: "Fekete Lóantilop",
          eland: "Eland-antilop",
          warthog: "Varacskos Disznó"
        },
        tiers: {
          none: "Nem tag",
          tracker: "Nyomkereső",
          ph: "Hivatásos Vadász",
          legacy: "Örökség"
        }
      },
      membership_apply: {
        meta: {
          title: "Jelentkezés a tagságra — Top Trackers",
          desc: "Jelentkezzen a Top Trackers tanzániai meghívásos szafari és vadászklubjába."
        },
        hero: {
          eyebrow: "Tagság igénylése",
          title: "Egy rövid, megfontolt jelentkezés.",
          body: "Három lépés. Alapító körünk személyesen bírálja el. Szándékosan tartjuk alacsonyan a létszámot."
        },
        steps: {
          step: "Lépés",
          of: "a",
          1: {
            title: "Önről",
            name: "Teljes név",
            email: "E-mail",
            country: "Lakóhely szerinti ország",
            referred: "Ajánló neve (opcionális)"
          },
          2: {
            title: "Tagsági szint & tapasztalat",
            preferred: "Preferált tagsági szint",
            exp: "Vadászati tapasztalat",
            exp_placeholder: "Vadászattal töltött évek, földrajzi helyek, veszélyes vad vadászati tapasztalat…",
            quarry: "Érdeklődésre számot tartó vadfaj",
            quarry_placeholder: "Bivaly, leopárd, kudu…"
          },
          3: {
            title: "Miért a Top Trackers",
            motivation: "Rövid üzenet az alapító körnek",
            motivation_placeholder: "Pár sorban mondja el, miért ezt a klubot választja, és mit hozna magával a közösségünkbe.",
            agreement: "Elolvastam és elfogadom a Szolgáltatási feltételeket és az Adatvédelmi irányelveket."
          }
        },
        buttons: {
          back: "Vissza",
          continue: "Folytatás",
          submit: "Jelentkezés benyújtása"
        },
        success: {
          eyebrow: "Jelentkezés elküldve",
          title: "Karibu",
          body: "Jelentkezése az alapító kör kezében van. Minden beadványt személyesen vizsgálunk felül, és tíz munkanapon belül válaszolunk.",
          return: "Vissza a főoldalra"
        }
      },
      footer: {
        tag: "Az afrikai hajsza ősi művészete, találkozva a privát tagság csendes magabiztosságával.",
        office: "Iroda",
        base_camp: "Bázistábor",
        river: "a Njombe folyó partján",
        compass: "Iránytű",
        dispatch: "Terepi Hírlevél",
        rights: "Minden jog fenntartva.",
        slogan: "Etikus Vadászat · Természetvédelmi Örökség"
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
