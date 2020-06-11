// https://developers.google.com/web/fundamentals/primers/service-workers
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
// https://github.com/mdn/sw-test

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('thaumcache-v1').then(function(cache) {
      return cache.addAll([
				// last updated: 2020-06-11
				'/',
			
				'/404.html',
				'/index.html',
				'manifest.json',

				// Articles
				'/articles/find-every-line-that-doesn-t-start-with-a-dot-via-regex.html',
				'/articles/find-non-ascii-letters-in-vscode.html',
				'/articles/find-the-nth-comma-via-regex.html',
				'/articles/haskells-fold-functions-explained.html',
				'/articles/quick-n-dirty-big-o.html',
				'/articles/spark-files-and-taking-notes.html',
				'/articles/splitting-js-css-into-2-or-3-files.html',
				'/articles/stache-open.svg',
				'/articles/types-of-haskell-functions.html',
			
				// general images
				'/images/big-o.png',
				'/images/binary-trees.png',
				'/images/clever.webp',
				'/images/favicon.svg',
				'/images/icons-192.png',
				'/images/icons-512.png',
				'/images/mockbob.png',
				'/images/starfield-thumb.webp',
				'/images/starfield.webp',
				'/images/Thaumatorium.svg',
			
				// website pages
				'/pages/about.html',
				'/pages/articles.html',
				'/pages/border.png',
				'/pages/experimentations.html',
				'/pages/praetorianpi.html',
				'/pages/projects.html',
				'/pages/todo.html',
				'/pages/wc1.png',
				'/pages/wc2.png',
				'/pages/wc3.png',
				'/pages/wc4.png',
				'/pages/wc5.png',
			
				// CSS
				'/styles/footer.css',
				'/styles/header.css',
				'/styles/layout.css',
				'/styles/main.css',
				'/styles/nav.css',
				'/styles/projects.css'
			]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();
        
        caches.open('thaumcache-v1').then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('/gallery/myLittleVader.jpg');
      });
    }
  }));
});
