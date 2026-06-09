const fs = require('fs');
const path = require('path');

const photosDir = path.join(__dirname, 'src/assets/photos');
const files = fs.readdirSync(photosDir).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'));

const keys = [
  'acaciaSunset', 'breakfast', 'buffalo', 'buffaloHerd', 'bushPlane', 'campAerial',
  'campDeck', 'campNight', 'children', 'conservation', 'dinner', 'elephant', 'elephantPortrait',
  'gameDrive', 'gearAmmo', 'gearKit', 'giraffe', 'guideJeep', 'helicopter', 'hero',
  'hunterSunset', 'hunterValley', 'hyena', 'kudu', 'leopard', 'lion', 'lioness', 'maasaiJump',
  'maasaiVillage', 'maasaiWoman', 'milkyway', 'owl', 'phWalking', 'rhino', 'touristsElephants',
  'vintageLeopard', 'vintageZebra', 'walkingTrail', 'zebra'
];

// Simple keyword matcher
function findMatch(key) {
  const k = key.toLowerCase();
  for (const f of files) {
    if (f.toLowerCase().includes('acacia') && k.includes('acacia')) return f;
    if (f.toLowerCase().includes('buffalo') && k.includes('buffalo')) return f;
    if (f.toLowerCase().includes('plane') && k.includes('plane')) return f;
    if (f.toLowerCase().includes('camp') && k.includes('camp')) return f;
    if (f.toLowerCase().includes('elephant') && k.includes('elephant')) return f;
    if (f.toLowerCase().includes('gear') && k.includes('gear')) return f;
    if (f.toLowerCase().includes('giraffe') && k.includes('giraffe')) return f;
    if (f.toLowerCase().includes('helicopter') && k.includes('helicopter')) return f;
    if (f.toLowerCase().includes('hyena') && k.includes('hyena')) return f;
    if (f.toLowerCase().includes('kudu') && k.includes('kudu')) return f;
    if (f.toLowerCase().includes('leopard') && k.includes('leopard')) return f;
    if (f.toLowerCase().includes('lion') && k.includes('lion')) return f;
    if (f.toLowerCase().includes('masai') && k.includes('maasai')) return f;
    if (f.toLowerCase().includes('milky') && k.includes('milky')) return f;
    if (f.toLowerCase().includes('owl') && k.includes('owl')) return f;
    if (f.toLowerCase().includes('rhino') && k.includes('rhino')) return f;
    if (f.toLowerCase().includes('zebra') && k.includes('zebra')) return f;
  }
  return files[Math.floor(Math.random() * files.length)]; // fallback
}

let imports = '';
let exportsObj = 'export const photos = {\n';

const assigned = new Set();
let count = 0;

for (const key of keys) {
  let file = findMatch(key);
  // Optional: try to avoid duplicates if we have enough files
  if (assigned.has(file)) {
      let otherFile = files.find(f => !assigned.has(f));
      if (otherFile) file = otherFile;
  }
  assigned.add(file);
  
  // Create a clean variable name for import
  const varName = `img_${count++}`;
  imports += `import ${varName} from "./photos/${file}";\n`;
  exportsObj += `  ${key}: ${varName},\n`;
}
exportsObj += '} as const;\n\nexport type PhotoKey = keyof typeof photos;\n';

const output = `// Central manifest of curated photography\n${imports}\n${exportsObj}`;
fs.writeFileSync(path.join(__dirname, 'src/assets/photos.ts'), output);
console.log("photos.ts has been updated!");
