const path = require('path');
const fs = require('fs');
const sharp = require(path.join(__dirname, '../node_modules/sharp'));

async function makeFavicon() {
  const svgPath = path.join(__dirname, '../public/logo-dark.svg');
  const icoPath = path.join(__dirname, '../public/favicon.ico');
  const appIcoPath = path.join(__dirname, '../src/app/favicon.ico');
  
  const pngBuffer = await sharp(svgPath)
    .resize(32, 32, { fit: 'contain', background: { r: 11, g: 18, b: 32, alpha: 1 } })
    .png()
    .toBuffer();
    
  fs.writeFileSync(icoPath, pngBuffer);
  fs.writeFileSync(appIcoPath, pngBuffer);
  console.log('Favicon generated at public/favicon.ico and src/app/favicon.ico');
}

makeFavicon().catch(err => console.error(err));
