// Dopa Drill Service Worker - Full Offline Support & Auto-Update
const CACHE_NAME = 'dopa-drill-v1.0.4';

const STATIC_ASSETS = [
  './',
  'index.html',
  'style.css',
  'icon.svg',
  'manifest.json',
  'fonts/dela-gothic-one.woff2',
  'fonts/zen-maru-gothic-black.woff2',
  'fonts/zen-maru-gothic-bold.woff2',
  'js/main.js',
  'js/audio.js',
  'js/bg.js',
  'js/core.js',
  'js/dopakichi.js',
  'js/fx.js',
  'js/growth.js',
  'js/guide.js',
  'js/i18n.js',
  'js/problems.js',
  'js/quests.js',
  'js/scoring.js',
  'js/session.js',
  'js/skills.js',
  'js/store.js',
  'js/trophies.js',
  'js/unlocks.js'
];

// Install: pre-cache all assets and activate immediately
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

// Activate: delete outdated caches and take control of all clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch: Stale-While-Revalidate strategy for instantaneous load & background update
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Background network fetch to keep cache up to date
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Network failed (offline)
        return cachedResponse;
      });

      // If available in cache, return immediately (0ms latency); otherwise await network
      return cachedResponse || fetchPromise;
    })
  );
});
