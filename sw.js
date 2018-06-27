let mainCache = 'restaurant-file-cache-v1';
let cachedFiles = [
    '/',
    'index.html',
    'restaurant.html',
    'css/style.css',
    'js/dbhelper.js',
    'js/main.js',
    'js/restaurant_info.js',
    'images/1-thumbnail.jpg',
    'images/2-thumbnail.jpg',
    'images/3-thumbnail.jpg',
    'images/4-thumbnail.jpg',
    'images/5-thumbnail.jpg',
    'images/6-thumbnail.jpg',
    'images/7-thumbnail.jpg',
    'images/8-thumbnail.jpg',
    'images/9-thumbnail.jpg',
    'images/10-thumbnail.jpg'
];


//Build cache
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(mainCache).then(function(cache) {
            return cache.addAll(cachedFiles);
        })
    );
});

// Check for requests and return apporprate response
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open('mainCache').then(function(cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request)
                    .then(function(response) {
                        cache.put(event.request, response.clone());
                        return response;
                    });
            });
        })
    );
});



self.addEventListener('activate', event => { event.waitUntil(self.clients.claim()); });
