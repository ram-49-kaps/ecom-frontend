const CACHE_NAME = 'ecom-static-v1';
const OFFLINE_URL = '/offline.html';
self.addEventListener('install', (e)=>{
  e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(['/', '/index.html', OFFLINE_URL])));
  self.skipWaiting();
});
self.addEventListener('fetch', (e)=>{
  if (e.request.mode === 'navigate'){
    e.respondWith(fetch(e.request).catch(()=>caches.match(OFFLINE_URL)));
    return;
  }
  e.respondWith(caches.match(e.request).then(resp=>resp||fetch(e.request)));
});
