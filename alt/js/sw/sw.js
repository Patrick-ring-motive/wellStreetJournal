// Core assets
let coreAssets = [];
const endings=['.js','.jsx','.ts','.tsx','.css','.scss','.json','.jpg','.png','.svg','.ico','.woff','.woff2'];
function checkEndings(fileURL){
for(let i=0;i<endings.length;i++){
	
if(fileURL.toLowerCase().split('?')[0].endsWith(endings[i])){

	return true;

}
	
 }
	return false;
}

// On install, cache core assets
self.addEventListener('install', function (event) {

	// Cache core assets
	event.waitUntil(caches.open('app').then(function (cache) {
		for (let asset of coreAssets) {
			cache.add(new Request(asset));
		}
		return cache;
	}));

});

// Listen for request events
self.addEventListener('fetch', function (event) {

	// Get the request
	let request = event.request;

	// Bug fix
	// https://stackoverflow.com/a/49719964
	if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return;

	
	
	// Images
	// CSS & JavaScript
	// Offline-first
	// Articles
	if ((request.headers.get('Accept').toLowerCase().indexOf('text/css')>-1) || (request.headers.get('Accept').toLowerCase().indexOf('javascript')>-1) || (request.url.toLowerCase().indexOf('/articles/')>-1) || checkEndings(request.url) ) {
		event.respondWith(
			caches.match(request).then(function (response) {
				return response || fetch(request).then(function (response) {
					
					// Save a copy of it in cache
					let copy = response.clone();
					event.waitUntil(caches.open('app').then(function (cache) {
						return cache.put(request, copy);
					}));
					// Return the response
					return response;

				});
			})
		);
		return;
	}

	
		
	// HTML files
	// Network-first
	if (request.headers.get('Accept').indexOf('html')>-1) {
		event.respondWith(
			fetch(request).then(function (response) {

				// Create a copy of the response and save it to the cache
				let copy = response.clone();
				event.waitUntil(caches.open('app').then(function (cache) {
					return cache.put(request, copy);
				}));

				// Return the response
				return response;

			}).catch(function (error) {

				// If there's no item in cache, respond with a fallback
				return caches.match(request).then(function (response) {
					return response || caches.match('/offline.html');
				});

			})
		);
	}


});
