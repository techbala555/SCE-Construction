const fs = require('fs');
const path = require('path');
const sharp = require(path.join(__dirname, '../node_modules/sharp'));

// Function to pack multiple PNG buffers into a valid multi-resolution .ico file
function createIco(pngBuffers, sizes) {
  const numImages = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + dirEntrySize * numImages;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type 1 = ICO
  header.writeUInt16LE(numImages, 4);

  const dirEntries = [];
  for (let i = 0; i < numImages; i++) {
    const size = sizes[i];
    const buf = pngBuffers[i];
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // Width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // Height
    entry.writeUInt8(0, 2); // Colors
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(buf.length, 8); // Size of image data
    entry.writeUInt32LE(offset, 12); // Offset
    dirEntries.push(entry);
    offset += buf.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers]);
}

/**
 * Creates the official SCE Developers brand favicon SVG:
 * - Dimensions: 512x512 square
 * - Background: #0B1220 (SCE signature dark navy)
 * - Brand Mark: The architectural building skyline (white #FFFFFF) + 
 *               the dynamic roofline chevron arch (vibrant gold gradient #E59B18 -> #FDBA3B -> #D27F1C)
 * - Centered & proportioned for maximum clarity at 16x16, 32x32, 48x48, 96x96, 192x192, 512x512
 */
function createFaviconSvg() {
  return `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="96" fill="#0B1220"/>
  <g transform="translate(26, 108) scale(0.572)">
    <!-- Architectural Building Skyline in crisp white/silver with subtle structural definition -->
    <path d="M396.858 70.5906V178.103L418.93 197.533L420.228 87.4299L430.615 93.9066V204.01L446.195 215.668V87.4299L455.283 79.6579V222.145L509.813 261.005V27.8446L582.519 104.269V290.797H574.729L569.536 183.285L538.376 210.487V283.025L553.956 290.797L559.149 207.896L561.746 299.865L572.132 307.637L631.855 351.678V198.829L692.876 253.233L694.175 283.025L653.927 253.233V263.595L696.771 303.751V342.611L653.927 312.818V325.771L696.771 360.745V381.471L653.927 349.087V377.585L774.671 459.191L777.268 451.419L711.053 399.605V258.414L599.397 161.264V97.7926L504.619 0.642578L396.858 70.5906Z" fill="#F8FAFC" stroke="#FFFFFF" stroke-width="2"/>
    <!-- Signature Gold Roofline Arch -->
    <path d="M389.661 189.818L125.99 406.001V369.536H66.2423V448.977L0 502.371H79.231L231.509 378.485L389.661 244.397L572.52 378.485L737.758 502.371H804L389.661 189.818Z" fill="url(#gold_grad)"/>
  </g>
  <defs>
    <linearGradient id="gold_grad" x1="74" y1="485" x2="761" y2="502" gradientUnits="userSpaceOnUse">
      <stop stop-color="#E59B18"/>
      <stop offset="0.45" stop-color="#F5A412"/>
      <stop offset="0.7" stop-color="#FDBA3B"/>
      <stop offset="1" stop-color="#D27F1C"/>
    </linearGradient>
  </defs>
</svg>`;
}

async function generateAllFavicons() {
  const svgContent = createFaviconSvg();
  const svgBuffer = Buffer.from(svgContent);

  const publicDir = path.join(__dirname, '../public');
  const appDir = path.join(__dirname, '../src/app');

  // 1. Generate high-res 512x512 PNG
  const png512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), png512);

  // 2. Generate 192x192 PNG (Standard Google Search & PWA high-res favicon: 48x48 multiple)
  const png192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'icon.png'), png192);

  // 3. Generate 180x180 Apple Touch Icon
  const png180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'apple-icon.png'), png180);

  // 4. Generate multi-resolution .ico (16x16, 32x32, 48x48)
  const png48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();

  const icoBuffer = createIco([png16, png32, png48], [16, 32, 48]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);

  // 5. Also write the clean SVG favicon to public/favicon.svg
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent);

  console.log('Successfully generated:');
  console.log(' - public/favicon.ico (Multi-res: 16x16, 32x32, 48x48) (' + icoBuffer.length + ' bytes)');
  console.log(' - public/icon.png (192x192, 48px multiple for Google Search) (' + png192.length + ' bytes)');
  console.log(' - public/apple-icon.png (180x180 Apple touch icon) (' + png180.length + ' bytes)');
  console.log(' - public/icon-512.png (512x512 master brand asset) (' + png512.length + ' bytes)');
  console.log(' - public/favicon.svg (Scalable vector favicon)');
}

generateAllFavicons().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
