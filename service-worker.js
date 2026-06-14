// ✅ Philadelphia AI Service Worker
const CACHE_NAME = "philadelphia-ai-cache-v2";
const CACHE_ASSETS = [
  "/",
  "/philadelphia.html",
  "/index.html",
  "/about.html",
  "/enroll.html",
  "/privacy.html",
  "/profile.html",
  "/signup-login.html",
  "/studyingatelvion.html",
  "/terms.html",
  "/university.html",
  "/manifest.json",
  "/images/IMG_20250715_102103_129.jpg",
  "/images/IMG_20250824_133336_309.jpg",
  "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;500;600;700;800&family=Fira+Code:wght@400;500;600&family=Orbitron:wght@400;500;700;900&display=swap",
  "https://fonts.gstatic.com"
];

// ✅ INSTALL EVENT – cache all essential assets immediately
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CACHE_ASSETS))
  );
  self.skipWaiting(); // ⚡ instantly activate this SW
  console.log("✅ Philadelphia AI Service Worker installed and cached assets");
});

// ✅ ACTIVATE EVENT – clean up old caches and take control right away
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("🧹 Removing old cache:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  clients.claim(); // ⚡ take control of all open pages immediately
  console.log("🔥 Philadelphia AI Service Worker activated");
});

// ✅ FETCH EVENT – serve from cache first, fallback to network, offline fallback
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() => caches.match("/philadelphia.html"))
      );
    })
  );
});
