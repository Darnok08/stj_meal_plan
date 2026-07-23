// ═══════════════════════════════════════════════════════════
//  Service Worker — tryb offline dla „Nasza Kuchnia / STJ meal plan"
//  Strategia: network-first dla powłoki aplikacji (online = zawsze
//  świeże pliki, bez problemu ze starym cache po aktualizacji),
//  a offline serwuje ostatnią zapisaną wersję z cache.
//  Zapisów do Supabase (POST/PATCH) i API NIE dotykamy.
// ═══════════════════════════════════════════════════════════
const CACHE = "kuchnia-v2";
const SHELL = [
  "./",
  "./index.html",
  "./config.js",
  "./data.js",
  "./app-core.js",
  "./sync.js",
  "./style.css",
  "./icon.png",
  "./pwa/icon-192.png",
  "./pwa/icon-512.png",
  "./pwa/apple-touch-icon.png",
  "./manifest.json",
  "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
];

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL).catch(() => {})));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return; // zapisy/logowanie -> zawsze sieć
  let url;
  try { url = new URL(req.url); } catch (_) { return; }

  // Supabase (API, auth, realtime) -> zawsze sieć, nigdy cache
  if (url.hostname.endsWith("supabase.co") || url.hostname.endsWith("supabase.in")) return;

  const sameOrigin = url.origin === self.location.origin;
  const isCdn = url.hostname === "cdn.jsdelivr.net";
  if (!sameOrigin && !isCdn) return; // np. fonty Google -> domyślnie sieć

  // network-first: świeże online, cache offline
  e.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then((r) => r || caches.match("./index.html")))
  );
});
