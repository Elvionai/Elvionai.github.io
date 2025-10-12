const CACHE_NAME = "philadelphia-ai-v1";
const CACHE_ASSETS = [
  "/philadelphia.html",
  "/manifest.json",
  "/css/style.css",
  "/images/IMG_20250715_102103_129.jpg",
  "/images/IMG_20250824_133336_309.jpg",
  "/js/app.js"
];

// ✅ Install event — cache all core assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("📦 Caching files...");
      return cache.addAll(CACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// ✅ Activate event — clean up old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("🧹 Removing old cache:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// ✅ Fetch event — serve cached files first, then network fallback
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
