const CACHE_NAME = "guarini-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/service-worker.js",
  "/img-site/Guarini.png",
  "/img-site/Guarini.png"
];

// Instala o service worker e faz cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativa o service worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Busca arquivos no cache primeiro
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
