const path = require('path');
const fs = require('fs');
const sharp = require(path.join(__dirname, '../node_modules/sharp'));

const imagesDir = path.join(__dirname, '../public/images');

async function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await scanDir(fullPath);
    } else if (/\.(webp|jpg|jpeg|png)$/i.test(entry.name)) {
      const stats = fs.statSync(fullPath);
      try {
        const metadata = await sharp(fullPath).metadata();
        const relPath = path.relative(imagesDir, fullPath).replace(/\\/g, '/');
        console.log(`${relPath} | ${metadata.width}x${metadata.height} | ${metadata.format} | ${(stats.size / 1024).toFixed(1)} KB`);
      } catch (err) {
        console.error(`Error reading ${fullPath}:`, err);
      }
    }
  }
}

scanDir(imagesDir);
