const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const pngToIco = require('png-to-ico');

const svgBuffer = fs.readFileSync(path.join(__dirname, 'public', 'favicon.svg'));

async function generate() {
  const sizes = [16, 32, 180, 192, 512];
  
  for (const size of sizes) {
    const filename = size === 180 ? 'apple-touch-icon.png' :
                     size === 192 ? 'android-chrome-192x192.png' :
                     size === 512 ? 'android-chrome-512x512.png' :
                     `favicon-${size}x${size}.png`;
                     
    console.log(`Generating ${filename}...`);
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(__dirname, 'public', filename));
  }
  
  console.log('Generating favicon.ico...');
  const icoBuffer = await pngToIco([
    path.join(__dirname, 'public', 'favicon-16x16.png'),
    path.join(__dirname, 'public', 'favicon-32x32.png')
  ]);
  fs.writeFileSync(path.join(__dirname, 'public', 'favicon.ico'), icoBuffer);
  
  console.log('Done generating all custom favicons!');
}

generate().catch(console.error);
