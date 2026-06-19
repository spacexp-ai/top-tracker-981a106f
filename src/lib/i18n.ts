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
      }
    }
  }
};

const savedLanguage = typeof window !== "undefined" ? localStorage.getItem("language") || "en" : "en";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
