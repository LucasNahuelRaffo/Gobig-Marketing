import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Configuration
const inputDir = 'public/img';
const outputDir = 'public/img/webp';
const qualities = [80, 85, 90]; // Different quality options

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to convert image to WebP
const convertToWebP = async (filePath, outputPath, quality) => {
  try {
    await sharp(filePath)
      .webp({ quality })
      .toFile(outputPath);
    console.log(`Converted: ${filePath} -> ${outputPath} (quality: ${quality}%)`);
  } catch (error) {
    console.error(`Error converting ${filePath}:`, error);
  }
};

// Function to process all images in a directory
const processImages = async (dir) => {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recursively process subdirectories
      await processImages(filePath);
    } else if (stat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const fileName = path.basename(file, ext);
        const relativePath = path.relative(inputDir, filePath);
        const outputSubDir = path.join(outputDir, path.dirname(relativePath));
        
        // Ensure output subdirectory exists
        if (!fs.existsSync(outputSubDir)) {
          fs.mkdirSync(outputSubDir, { recursive: true });
        }
        
        // Convert to WebP with different qualities
        for (const quality of qualities) {
          const outputPath = path.join(outputSubDir, `${fileName}.webp`);
          await convertToWebP(filePath, outputPath, quality);
        }
      }
    }
  }
};

// Start processing
console.log('Starting image conversion to WebP...');
processImages(inputDir)
  .then(() => {
    console.log('Image conversion completed!');
  })
  .catch((error) => {
    console.error('Error during image conversion:', error);
  });