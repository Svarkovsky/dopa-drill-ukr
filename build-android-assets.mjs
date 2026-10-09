import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const targetAssets = path.resolve('android/app/src/main/assets');
if (!fs.existsSync(targetAssets)) {
  fs.mkdirSync(targetAssets, { recursive: true });
}

const polyfillFile = path.resolve('android/polyfills.js');
const polyfillCode = `// Legacy Android 5.0 - 7.1.2 Webview Polyfills
(function() {
  if (typeof globalThis === 'undefined') { window.globalThis = window; }
  if (!Object.fromEntries) {
    Object.fromEntries = function(entries) {
      if (!entries) return {};
      var obj = {};
      for (var i = 0; i < entries.length; i++) {
        var pair = entries[i];
        if (pair) obj[pair[0]] = pair[1];
      }
      return obj;
    };
  }
  if (!String.prototype.padStart) {
    String.prototype.padStart = function(l, p) {
      l = l >> 0;
      p = String(typeof p !== 'undefined' ? p : ' ');
      if (this.length > l) return String(this);
      var s = String(this);
      while (s.length < l) s = p + s;
      return s;
    };
  }
  if (!String.prototype.padEnd) {
    String.prototype.padEnd = function(l, p) {
      l = l >> 0;
      p = String(typeof p !== 'undefined' ? p : ' ');
      if (this.length > l) return String(this);
      var s = String(this);
      while (s.length < l) s = s + p;
      return s;
    };
  }
  if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function(search, repl) {
      return this.split(search).join(repl);
    };
  }
  if (!Array.prototype.flat) {
    Array.prototype.flat = function(depth) {
      depth = depth === undefined ? 1 : Number(depth);
      var res = [];
      (function flatten(arr, d) {
        for (var i = 0; i < arr.length; i++) {
          if (Array.isArray(arr[i]) && d > 0) flatten(arr[i], d - 1);
          else res.push(arr[i]);
        }
      })(this, depth);
      return res;
    };
  }
})();
`;
fs.writeFileSync(polyfillFile, polyfillCode, 'utf8');

console.log('1. Bundling JavaScript with esbuild (target=chrome55)...');
execSync(`npx esbuild app/js/main.js --bundle --target=chrome55 --minify --outfile="${path.join(targetAssets, 'bundle.js')}"`, { stdio: 'inherit' });

// Prepend polyfills to bundle.js
const bundleCode = fs.readFileSync(path.join(targetAssets, 'bundle.js'), 'utf8');
fs.writeFileSync(path.join(targetAssets, 'bundle.js'), polyfillCode + '\n' + bundleCode, 'utf8');

console.log('2. Copying stylesheets with legacy fallbacks and fonts...');
let css = fs.readFileSync('app/style.css', 'utf8');
// Provide fallbacks for inset: 0
css = css.replace(/position:\s*fixed;\s*inset:\s*0;/g, 'position: fixed; top: 0; right: 0; bottom: 0; left: 0; inset: 0;');
css = css.replace(/position:\s*absolute;\s*inset:\s*0;/g, 'position: absolute; top: 0; right: 0; bottom: 0; left: 0; inset: 0;');
// Provide fallbacks for 100dvh
css = css.replace(/height:\s*100dvh;/g, 'height: 100vh; height: 100dvh;');
// Provide fallbacks for min() in dimensions
css = css.replace(/width:\s*min\(100vw,\s*460px\);/g, 'width: 100%; max-width: 460px; width: min(100vw, 460px);');
css = css.replace(/width:\s*min\(100%,\s*420px\);/g, 'width: 100%; max-width: 420px; width: min(100%, 420px);');
css = css.replace(/width:\s*min\(100%,\s*340px\);/g, 'width: 100%; max-width: 340px; width: min(100%, 340px);');
css = css.replace(/width:\s*min\(360px,\s*calc\(100% - 32px\)\);/g, 'width: calc(100% - 32px); max-width: 360px;');

fs.writeFileSync(path.join(targetAssets, 'style.css'), css, 'utf8');

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
