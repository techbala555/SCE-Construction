const path = require('path');
const fs = require('fs');
const sharp = require(path.join(__dirname, '../node_modules/sharp'));

const imagesDir = path.join(__dirname, '../public/images');

async function processImage(fullPath) {
  const ext = path.extname(fullPath).toLowerCase();
  const dir = path.dirname(fullPath);
  const basename = path.basename(fullPath);
  const statsBefore = fs.statSync(fullPath);

  if (ext === '.webp') {
    const inputBuffer = fs.readFileSync(fullPath);
    const quality = basename.includes('hero-bg') ? 82 : 80;

    const outputBuffer = await sharp(inputBuffer)
      .webp({ quality, effort: 6 })
      .toBuffer();

    if (outputBuffer.length < statsBefore.size) {
      fs.writeFileSync(fullPath, outputBuffer);
      const rel = path.relative(imagesDir, fullPath).replace(/\\/g, '/');
      console.log(`[OPTIMIZED] ${rel}: ${(statsBefore.size / 1024).toFixed(1)} KB -> ${(outputBuffer.length / 1024).toFixed(1)} KB (-${(((statsBefore.size - outputBuffer.length) / statsBefore.size) * 100).toFixed(1)}%)`);
    } else {
      const rel = path.relative(imagesDir, fullPath).replace(/\\/g, '/');
      console.log(`[SKIPPED] ${rel}: Original is already optimal (${(statsBefore.size / 1024).toFixed(1)} KB)`);
    }
  }
}

async function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await scanDir(fullPath);
    } else if (path.extname(entry.name).toLowerCase() === '.webp') {
      await processImage(fullPath);
    }
  }
}

scanDir(imagesDir);
