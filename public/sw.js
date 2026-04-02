const CACHE_NAME = 'music-web-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/manifest.json',
    '/icon.svg',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.filter(key => key !== CACHE_NAME && key !== 'music-cache').map(key => caches.delete(key))
        ))
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // 1. Audio and Covers (handled directly from our music-cache if downloaded)
    if (url.pathname.startsWith('/storage/songs/') || url.pathname.startsWith('/storage/covers/')) {
        event.respondWith(
            caches.open('music-cache').then(cache => {
                return cache.match(event.request).then(response => {
                    // Return from cache if we downloaded it, otherwise fetch from network
                    return response || fetch(event.request);
                });
            })
        );
        return;
    }

    // 2. JS / CSS assets from Vite build (Stale-While-Revalidate pattern)
    if (url.pathname.startsWith('/build/')) {
        event.respondWith(
            caches.match(event.request).then(response => {
                return response || fetch(event.request).then(fetchRes => {
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, fetchRes.clone());
                        return fetchRes;
                    });
                });
            })
        );
        return;
    }

    // 3. API & Navigation Requests (Network First, fallback to cache)
    event.respondWith(
        fetch(event.request)
            .then(response => {
                if (event.request.method !== 'GET' || !url.protocol.startsWith('http')) {
                    return response;
                }
                const resClone = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, resClone);
                });
                return response;
            })
            .catch(() => {
                return caches.match(event.request).then(response => {
                    if (response) return response;
                    // Fallback to offline index page if it's navigation or inertia request
                    if (event.request.headers.get('accept')?.includes('text/html') || event.request.url.includes('_inertia')) {
                        return caches.match('/');
                    }
                });
            })
    );
});
