import re

file_path = r"c:\Users\T3D\Desktop\top trackers\src\lib\i18n.ts"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# English translations
en_translations = """
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
"""

# Hungarian translations
hu_translations = """
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
"""

# Let's locate the strings in i18n.ts and replace them by searching for matching endings
# We want to replace "cta: "Apply"\n          }\n        }\n      }" with that string + "," + en_translations
# Let's clean the carriage return difference by normalizing newlines first.

content_norm = content.replace("\r\n", "\n")

en_target = 'cta: "Apply"\n          }\n        }\n      }'
if en_target in content_norm:
    content_norm = content_norm.replace(en_target, en_target + ",\n" + en_translations)
    print("Replaced English translations.")
else:
    print("Could not find English target via simple match!")

hu_target = 'cta: "Jelentkezés"\n          }\n        }\n      }'
if hu_target in content_norm:
    content_norm = content_norm.replace(hu_target, hu_target + ",\n" + hu_translations)
    print("Replaced Hungarian translations.")
else:
    print("Could not find Hungarian target via simple match!")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content_norm)
