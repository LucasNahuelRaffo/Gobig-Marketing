import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const framesDir = 'c:/Users/Lucas/Desktop/Proyectos/GOBIG/src/img/panther_frames';

async function convertFrames() {
  const files = fs.readdirSync(framesDir)
    .filter(f => f.endsWith('.png'))
    .sort();

  console.log(`Found ${files.length} frames to convert.`);

  for (const file of files) {
    const inputPath = path.join(framesDir, file);
    const outputPath = path.join(framesDir, file.replace('.png', '.webp'));

    console.log(`Processing ${file}...`);
    try {
      await sharp(inputPath)
        .resize(1280) // Resize to 1280px width
        .webp({ quality: 60 }) // High compression
        .toFile(outputPath);
      
      const oldSize = fs.statSync(inputPath).size / (1024 * 1024);
      const newSize = fs.statSync(outputPath).size / 1024;
      console.log(`  Done: ${oldSize.toFixed(2)}MB -> ${newSize.toFixed(1)}KB`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
}

convertFrames().then(() => {
  console.log('Conversion complete!');
}).catch(console.error);
