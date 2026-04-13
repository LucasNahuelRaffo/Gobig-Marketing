import sharp from 'sharp';
import fs from 'fs';

async function optimizeImage() {
  const input = 'src/img/sky.png';
  const output = 'src/img/sky.webp';

  try {
    await sharp(input)
      .webp({ quality: 80 })
      .toFile(output);
    
    const statsInput = fs.statSync(input);
    const statsOutput = fs.statSync(output);
    
    console.log(`Original: ${(statsInput.size / 1024).toFixed(2)} KB`);
    console.log(`Optimized: ${(statsOutput.size / 1024).toFixed(2)} KB`);
    console.log(`Saved: ${((statsInput.size - statsOutput.size) / 1024).toFixed(2)} KB`);
  } catch (err) {
    console.error(err);
  }
}

optimizeImage();
