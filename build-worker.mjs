import fs from 'node:fs';
import path from 'node:path';

const appDir = path.resolve('app');
const distDir = path.resolve('dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
};

function getAllFiles(dir, prefix = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      files = files.concat(getAllFiles(fullPath, relPath));
    } else if (entry.isFile()) {
      if (entry.name === '_headers') continue; // Cloudflare pages internal
      files.push({ fullPath, relPath });
    }
  }
  return files;
}

const files = getAllFiles(appDir);
console.log(`Found ${files.length} files in ${appDir}`);

const assets = {};

for (const f of files) {
  const ext = path.extname(f.relPath).toLowerCase();
  const mime = mimeTypes[ext] || 'application/octet-stream';
  const isBinary = ['.woff2', '.png', '.jpg'].includes(ext);

  if (isBinary) {
    const buffer = fs.readFileSync(f.fullPath);
    assets[f.relPath] = {
      mime,
      b64: buffer.toString('base64'),
    };
  } else {
    const text = fs.readFileSync(f.fullPath, 'utf8');
    assets[f.relPath] = {
      mime,
      text,
    };
  }
}

// Generate the worker script code
const workerCode = `// Generated Cloudflare Worker for Dopa Drill
const ASSETS = ${JSON.stringify(assets)};

function base64ToBytes(b64) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    bytes[i] = bin.charCodeAt(i);
  }
  return bytes;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    let path = url.pathname.replace(/^\\/+/, '');
    if (!path || path === '') {
      path = 'index.html';
    }

    let asset = ASSETS[path];
    if (!asset && path.endsWith('/')) {
      asset = ASSETS[path + 'index.html'];
    }
    // Fallback to index.html if navigating to clean URLs
    if (!asset && !path.includes('.')) {
      asset = ASSETS['index.html'];
    }

    if (!asset) {
      return new Response('404 Not Found', {
        status: 404,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }

    const headers = new Headers();
    headers.set('Content-Type', asset.mime);
    headers.set('Access-Control-Allow-Origin', '*');

    if (path.startsWith('fonts/')) {
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    } else {
      headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
    }

    if (request.method === 'HEAD') {
      return new Response(null, { status: 200, headers });
    }

    if (asset.b64) {
      return new Response(base64ToBytes(asset.b64), { status: 200, headers });
    } else {
      return new Response(asset.text, { status: 200, headers });
    }
  }
};
`;

const outPath = path.join(distDir, 'worker.js');
fs.writeFileSync(outPath, workerCode, 'utf8');
const stats = fs.statSync(outPath);
console.log(`Worker bundled successfully to ${outPath} (${(stats.size / 1024).toFixed(1)} KB)`);
