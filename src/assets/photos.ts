// Central manifest of curated photography hosted on Lovable CDN.
import acaciaSunset from "./photos/acacia-sunset.jpg.asset.json";
import breakfast from "./photos/breakfast.jpg.asset.json";
import buffalo from "./photos/buffalo.jpg.asset.json";
import buffaloHerd from "./photos/buffalo-herd.jpg.asset.json";
import bushPlane from "./photos/bush-plane.jpg.asset.json";
import campAerial from "./photos/camp-aerial.jpg.asset.json";
import campDeck from "./photos/camp-deck.jpg.asset.json";
import campNight from "./photos/camp-night.jpg.asset.json";
import children from "./photos/children.jpg.asset.json";
import conservation from "./photos/conservation.jpg.asset.json";
import dinner from "./photos/dinner.jpg.asset.json";
import elephant from "./photos/elephant.jpg.asset.json";
import elephantPortrait from "./photos/elephant-portrait.jpg.asset.json";
import gameDrive from "./photos/game-drive.jpg.asset.json";
import gearAmmo from "./photos/gear-ammo.jpg.asset.json";
import gearKit from "./photos/gear-kit.jpg.asset.json";
import giraffe from "./photos/giraffe.jpg.asset.json";
import guideJeep from "./photos/guide-jeep.jpg.asset.json";
import helicopter from "./photos/helicopter.jpg.asset.json";
import hero from "./photos/hero.jpg.asset.json";
import hunterSunset from "./photos/hunter-sunset.jpg.asset.json";
import hunterValley from "./photos/hunter-valley.jpg.asset.json";
import hyena from "./photos/hyena.jpg.asset.json";
import kudu from "./photos/kudu.jpg.asset.json";
import leopard from "./photos/leopard.jpg.asset.json";
import lion from "./photos/lion.jpg.asset.json";
import lioness from "./photos/lioness.jpg.asset.json";
import maasaiJump from "./photos/maasai-jump.jpg.asset.json";
import maasaiVillage from "./photos/maasai-village.jpg.asset.json";
import maasaiWoman from "./photos/maasai-woman.jpg.asset.json";
import milkyway from "./photos/milkyway.jpg.asset.json";
import owl from "./photos/owl.jpg.asset.json";
import phWalking from "./photos/ph-walking.jpg.asset.json";
import rhino from "./photos/rhino.jpg.asset.json";
import touristsElephants from "./photos/tourists-elephants.jpg.asset.json";
import vintageLeopard from "./photos/vintage-leopard.jpg.asset.json";
import vintageZebra from "./photos/vintage-zebra.jpg.asset.json";
import walkingTrail from "./photos/walking-trail.jpg.asset.json";
import zebra from "./photos/zebra.jpg.asset.json";

export const photos = {
  acaciaSunset: acaciaSunset.url,
  breakfast: breakfast.url,
  buffalo: buffalo.url,
  buffaloHerd: buffaloHerd.url,
  bushPlane: bushPlane.url,
  campAerial: campAerial.url,
  campDeck: campDeck.url,
  campNight: campNight.url,
  children: children.url,
  conservation: conservation.url,
  dinner: dinner.url,
  elephant: elephant.url,
  elephantPortrait: elephantPortrait.url,
  gameDrive: gameDrive.url,
  gearAmmo: gearAmmo.url,
  gearKit: gearKit.url,
  giraffe: giraffe.url,
  guideJeep: guideJeep.url,
  helicopter: helicopter.url,
  hero: hero.url,
  hunterSunset: hunterSunset.url,
  hunterValley: hunterValley.url,
  hyena: hyena.url,
  kudu: kudu.url,
  leopard: leopard.url,
  lion: lion.url,
  lioness: lioness.url,
  maasaiJump: maasaiJump.url,
  maasaiVillage: maasaiVillage.url,
  maasaiWoman: maasaiWoman.url,
  milkyway: milkyway.url,
  owl: owl.url,
  phWalking: phWalking.url,
  rhino: rhino.url,
  touristsElephants: touristsElephants.url,
  vintageLeopard: vintageLeopard.url,
  vintageZebra: vintageZebra.url,
  walkingTrail: walkingTrail.url,
  zebra: zebra.url,
} as const;

export type PhotoKey = keyof typeof photos;
