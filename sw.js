// Service Worker Ringan - Network Only (Online Terus)
self.addEventListener('fetch', function(event) {
    event.respondWith(fetch(event.request));
});
