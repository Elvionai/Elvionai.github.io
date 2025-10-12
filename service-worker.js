const CACHE_NAME = "philadelphia-ai-cache-v1";
const CACHE_ASSETS = [
  "/",
  "/philadelphia.html",
  "/index.html",
  "/about.html",
  "/course-viewer.html",
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
  "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800&display=swap",
  "https://fonts.gstatic.com"
];

// ✅ Install event — cache all essential assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CACHE_ASSETS))
  );
  console.log("✅ Philadelphia AI Service Worker installed and cached assets");
});

// ✅ Activate event — remove old caches
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
});

// ✅ Fetch event — use cache first, then network fallback
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
