import { precacheAndRoute } from 'workbox-precaching';

// This line will be replaced by Workbox during build to include the precache manifest
// self.__WB_MANIFEST is automatically injected by Workbox
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-cache-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        // Add other assets you want to cache
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});