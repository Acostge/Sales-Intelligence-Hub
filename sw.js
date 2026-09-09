// Service worker mínimo — solo existe para que el navegador permita instalar la app.
// No cachea nada a propósito: los datos siempre deben leerse en vivo desde el Google Sheet.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Deja pasar todas las peticiones directo a la red, sin interceptar ni guardar nada.
self.addEventListener('fetch', () => {});
