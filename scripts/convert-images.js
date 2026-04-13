import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imgDir = 'c:/Users/Lucas/Desktop/Proyectos/GOBIG/src/img';
const imagesToConvert = [
  'canopy.png',
  'fossils.png',
  'lower-jungle.png',
  'panther.png',
  'roots.png'
];

async function convert() {
  for (const img of imagesToConvert) {
    const inputPath = path.join(imgDir, img);
    const outputPath = path.join(imgDir, img.replace('.png', '.webp'));
    
    console.log(`Converting ${img}...`);
    await sharp(inputPath)
      .webp({ quality: 75 }) // Good balance of size/quality
      .toFile(outputPath);
    
    const oldSize = fs.statSync(inputPath).size / 1024;
    const newSize = fs.statSync(outputPath).size / 1024;
    console.log(`  Done: ${oldSize.toFixed(1)}KB -> ${newSize.toFixed(1)}KB`);
  }
}

convert().catch(console.error);