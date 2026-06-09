// Central manifest of curated photography
import acaciaSunset from "./photos/acaciaSunset.jpg";
import breakfast from "./photos/breakfast.jpg";
import buffalo from "./photos/buffalo.jpg";
import buffaloHerd from "./photos/buffaloHerd.jpg";
import bushPlane from "./photos/bushPlane.jpg";
import campAerial from "./photos/campAerial.jpg";
import campDeck from "./photos/campDeck.jpg";
import campNight from "./photos/campNight.jpg";
import children from "./photos/children.jpg";
import conservation from "./photos/conservation.jpg";
import dinner from "./photos/dinner.jpg";
import elephant from "./photos/elephant.jpg";
import elephantPortrait from "./photos/elephantPortrait.jpg";
import gameDrive from "./photos/gameDrive.jpg";
import gearAmmo from "./photos/gearAmmo.jpg";
import gearKit from "./photos/gearKit.jpg";
import giraffe from "./photos/giraffe.jpg";
import guideJeep from "./photos/guideJeep.jpg";
import helicopter from "./photos/helicopter.jpg";
import hero from "./photos/hero.jpg";
import hunterSunset from "./photos/hunterSunset.jpg";
import hunterValley from "./photos/hunterValley.jpg";
import hyena from "./photos/hyena.jpg";
import kudu from "./photos/kudu.jpg";
import leopard from "./photos/leopard.jpg";
import lion from "./photos/lion.jpg";
import lioness from "./photos/lioness.jpg";
import maasaiJump from "./photos/maasaiJump.jpg";
import maasaiVillage from "./photos/maasaiVillage.jpg";
import maasaiWoman from "./photos/maasaiWoman.jpg";
import milkyway from "./photos/milkyway.jpg";
import owl from "./photos/owl.jpg";
import phWalking from "./photos/phWalking.jpg";
import rhino from "./photos/rhino.jpg";
import touristsElephants from "./photos/touristsElephants.jpg";
import vintageLeopard from "./photos/vintageLeopard.jpg";
import vintageZebra from "./photos/vintageZebra.jpg";
import walkingTrail from "./photos/walkingTrail.jpg";
import zebra from "./photos/zebra.jpg";

export const photos = {
  acaciaSunset,
  breakfast,
  buffalo,
  buffaloHerd,
  bushPlane,
  campAerial,
  campDeck,
  campNight,
  children,
  conservation,
  dinner,
  elephant,
  elephantPortrait,
  gameDrive,
  gearAmmo,
  gearKit,
  giraffe,
  guideJeep,
  helicopter,
  hero,
  hunterSunset,
  hunterValley,
  hyena,
  kudu,
  leopard,
  lion,
  lioness,
  maasaiJump,
  maasaiVillage,
  maasaiWoman,
  milkyway,
  owl,
  phWalking,
  rhino,
  touristsElephants,
  vintageLeopard,
  vintageZebra,
  walkingTrail,
  zebra,
} as const;

export type PhotoKey = keyof typeof photos;
