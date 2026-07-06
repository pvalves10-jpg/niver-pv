/* Service Worker — Churrasco do Orelha (niver do PV)
   Estratégia: network-first para arquivos do próprio site (sempre pega a
   versão mais nova quando online) e cache como reserva (funciona offline).
   Chamadas externas (planilha/gviz, Apps Script, Open-Meteo, uploads) passam direto. */
const CACHE = 'churrasco-pv-v1';
const ESSENCIAIS = [
  './', 'index.html', 'manifest.json',
  'assets/hero.jpg?v=2', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ESSENCIAIS.map(u => new Request(u, { cache: 'reload' }))))
      .catch(() => {})
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  // só cuida de GET do mesmo domínio; o resto passa direto (APIs externas, uploads)
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then(r => r || caches.match('index.html')))
  );
});
