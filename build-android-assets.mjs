import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const targetAssets = path.resolve('android/app/src/main/assets');
if (!fs.existsSync(targetAssets)) {
  fs.mkdirSync(targetAssets, { recursive: true });
}

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

console.log('1. Bundling JavaScript with esbuild (target=chrome55)...');
execSync(`npx esbuild app/js/main.js --bundle --target=chrome55 --minify --outfile="${path.join(targetAssets, 'bundle.js')}"`, { stdio: 'inherit' });

let bundleCode = fs.readFileSync(path.join(targetAssets, 'bundle.js'), 'utf8');

// 1. Disable hero/actors heavy physics calculations on Android
bundleCode = bundleCode.replace(/for\s*\(const [a-zA-Z0-9_$]+ of [a-zA-Z0-9_$]+\)\{[^}]+\.update\([^}]+\)\}/g, '/* actors disabled on android */');

// 2. Disable heavy background continuous render loop
bundleCode = bundleCode.replace(/render\([a-zA-Z0-9_$]+\)\{const [a-zA-Z0-9_$]+=this\.state;[\s\S]*?return;\}/g, 'render(){return;}');

// 3. Throttle body.style.setProperty('--kick') so it does not trigger reflow every frame
bundleCode = bundleCode.replace(/body\.style\.setProperty\("--kick",[a-zA-Z0-9_$]+\.kick\.toFixed\(3\)\);/g, '/* kick throttled */');

// 4. Default motion to 0 for smooth performance on old Android
bundleCode = bundleCode.replace(/motion:\s*1,/g, 'motion: 0,');

fs.writeFileSync(path.join(targetAssets, 'bundle.js'), polyfillCode + '\n' + bundleCode, 'utf8');

console.log('2. Copying stylesheets with mobile adaptations and legacy fallbacks...');
let css = fs.readFileSync('app/style.css', 'utf8');
css = css.replace(/position:\s*fixed;\s*inset:\s*0;/g, 'position: fixed; top: 0; right: 0; bottom: 0; left: 0; inset: 0;');
css = css.replace(/position:\s*absolute;\s*inset:\s*0;/g, 'position: absolute; top: 0; right: 0; bottom: 0; left: 0; inset: 0;');
css = css.replace(/height:\s*100dvh;/g, 'height: 100vh; height: 100dvh;');
css = css.replace(/width:\s*min\(100vw,\s*460px\);/g, 'width: 100%; max-width: 460px; width: min(100vw, 460px);');
css = css.replace(/width:\s*min\(100%,\s*420px\);/g, 'width: 100%; max-width: 420px; width: min(100%, 420px);');
css = css.replace(/width:\s*min\(100%,\s*340px\);/g, 'width: 100%; max-width: 340px; width: min(100%, 340px);');

const androidCssAppend = `
/* ============================================================
   Android High-Performance Mobile Layout & Performance Profile
   ============================================================ */
html, body {
  width: 100% !important;
  max-width: 100% !important;
  overflow-x: hidden !important;
  -webkit-tap-highlight-color: transparent !important;
  touch-action: manipulation !important;
  background: #fffdf2 !important;
}

#app {
  width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
  padding: 0 10px !important;
  margin: 0 auto !important;
}

/* Fix top bar and logo clipping */
#screen-title {
  padding-top: 26px !important;
  padding-bottom: 34px !important;
  gap: 10px !important;
  box-sizing: border-box !important;
  width: 100% !important;
}

.logo {
  --fs: 44px !important;
  margin-top: 10px !important;
  margin-bottom: 4px !important;
  transform: scale(0.92) !important;
}

/* Hide heavy background animation & SVG mascot physics stage */
#title-stage,
#actors,
#actors-back,
#actors-front,
#rays-fallback,
#bg,
#fx-back {
  display: none !important;
}

/* Fit all cards cleanly inside the screen without spilling over */
#screen-title > *,
.modes,
.grades,
.mode-row,
.quest-list,
.cal-card,
.card,
.level-btn {
  width: 100% !important;
  max-width: 335px !important;
  margin-left: auto !important;
  margin-right: auto !important;
  box-sizing: border-box !important;
}

.modes {
  gap: 8px !important;
}

.grades {
  width: 100% !important;
  max-width: 335px !important;
  gap: 6px !important;
}

.btn-zero {
  width: 100% !important;
  height: 46px !important;
  font-size: 18px !important;
}

.btn-zero small {
  font-size: 12px !important;
}

.grades button {
  height: 48px !important;
  font-size: 20px !important;
}

.mode-row {
  width: 100% !important;
  max-width: 335px !important;
  display: flex !important;
  gap: 8px !important;
}

.mode-row .sub-btn {
  flex: 1 1 0 !important;
  min-width: 0 !important;
  font-size: 13px !important;
  padding: 0 4px !important;
  height: 44px !important;
}

#open-collect {
  height: 44px !important;
  font-size: 14px !important;
}

/* Smooth scrolling */
#screen-title,
#screen-result,
#screen-final,
#tree-scroll,
#tr-scroll {
  -webkit-overflow-scrolling: touch !important;
  overscroll-behavior: contain !important;
}
`;

css += '\n' + androidCssAppend + '\n';
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
