import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const targetAssets = path.resolve('android/app/src/main/assets');
if (!fs.existsSync(targetAssets)) {
  fs.mkdirSync(targetAssets, { recursive: true });
}

console.log('1. Bundling JavaScript with esbuild (target=es2015)...');
execSync('npx esbuild app/js/main.js --bundle --target=es2015 --minify --outfile=' + path.join(targetAssets, 'bundle.js'), { stdio: 'inherit' });

console.log('2. Copying stylesheets and fonts...');
fs.copyFileSync('app/style.css', path.join(targetAssets, 'style.css'));
if (fs.existsSync('app/icon.svg')) {
  fs.copyFileSync('app/icon.svg', path.join(targetAssets, 'icon.svg'));
}

const fontsDir = path.join(targetAssets, 'fonts');
if (!fs.existsSync(fontsDir)) fs.mkdirSync(fontsDir, { recursive: true });
for (const font of fs.readdirSync('app/fonts')) {
  if (font.endsWith('.woff2')) {
    fs.copyFileSync(path.join('app/fonts', font), path.join(fontsDir, font));
  }
}

console.log('3. Preparing index.html with bundle.js...');
let html = fs.readFileSync('app/index.html', 'utf8');
html = html.replace('<script type="module" src="js/main.js"></script>', '<script src="bundle.js" defer></script>');
fs.writeFileSync(path.join(targetAssets, 'index.html'), html, 'utf8');

const totalSize = execSync(`du -sh "${targetAssets}"`).toString().trim();
console.log(`Assets prepared successfully in ${targetAssets} (${totalSize})`);
