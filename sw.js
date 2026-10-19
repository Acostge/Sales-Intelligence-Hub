// Service worker de PIEMCA — permite instalar la app y evita que se quede con versiones viejas.
// No guarda datos: Sheets y Apps Script siempre se leen en vivo.
// Las páginas y archivos de la propia app se piden SIEMPRE a la red sin usar caché del navegador,
// así al abrir la app se carga la última versión subida a GitHub.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))   // borra cualquier caché antigua
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== location.origin) return;   // Sheets, Apps Script y CDNs: directo a la red
  event.respondWith(fetch(req, { cache: 'no-store' }));
});
