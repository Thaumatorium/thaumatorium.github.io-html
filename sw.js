// https://developers.google.com/web/fundamentals/primers/service-workers
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
// https://github.com/mdn/sw-test
const THAUM_CACHE = "thaumcache-v1";
// This is run when a user visits the website for the first time
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(THAUM_CACHE).then((cache) => {
			return cache.addAll([
				// last updated: 2020-07-01
				"/",

				// Caching 404.html may break it - will need to test
				"/404.html",
				"/index.html",
				"/manifest.json",

				// Articles
				"/articles/find-every-line-that-doesn-t-start-with-a-dot-via-regex.html",
				"/articles/find-non-ascii-letters-in-vscode.html",
				"/articles/find-the-nth-comma-via-regex.html",
				"/articles/haskells-fold-functions-explained.html",
				"/articles/quick-n-dirty-big-o.html",
				"/articles/spark-files-and-taking-notes.html",
				"/articles/splitting-js-css-into-2-or-3-files.html",
				"/articles/stache-open.svg",
				"/articles/types-of-haskell-functions.html",
				"/articles/gs-programming-projects-for-n00bz.html",

				// general images
				"/images/big-o.png",
				"/images/binary-trees.png",
				"/images/clever.webp",
				"/images/favicon.svg",
				"/images/icons-192.png",
				"/images/icons-512.png",
				"/images/mockbob.png",
				"/images/starfield-thumb.webp",
				"/images/starfield.webp",
				"/images/logo.svg",
				"/images/border.png",
				"/images/wc1.png",
				"/images/wc2.png",
				"/images/wc3.png",
				"/images/wc4.png",
				"/images/wc5.png",
				"/images/conduct.webp",

				// website pages
				"/pages/about.html",
				"/pages/articles.html",
				"/pages/experimentations.html",
				"/pages/praetorianpi.html",
				"/pages/projects.html",
				"/pages/code-of-conduct.html",

				// Projects
				"/projects/scripts/base64.mjs",
				"/projects/scripts/mstg.mjs",
				"/projects/scripts/rot13.mjs",
				"/projects/scripts/slugify.mjs",
				"/projects/scripts/starfield.mjs",

				// CSS
				"/styles/footer.css",
				"/styles/header.css",
				"/styles/layout.css",
				"/styles/main.css",
				"/styles/nav.css",
				"/styles/projects.css"
			]).catch((error) => {
				console.error(`Failing to cache files with error '${error}'. Make sure all files in sw.js actually exists.`);
			});
		})
	);
});

// This is run after each page visit
self.addEventListener("fetch", (event) => {
	event.respondWith(caches.match(event.request).then(async (response) => {
		if (response !== undefined) {
			// create a new cache when you can
			// downside: change only shows up on a second refresh
			caches.open(THAUM_CACHE).then((cache) => {
				return cache.add(response.url);
			});
			const response_1 = await caches.match(response.url);
			return response_1;
		} else {
			try {
				const response_2 = await fetch(event.request);
				// response may be used only once
				// we need to save clone to put one copy in cache
				// and serve second one
				let responseClone = response_2.clone();

				caches.open(THAUM_CACHE).then((cache_1) => {
					cache_1.put(event.request, responseClone);
				});
				return response_2;
			}
			catch (e) {
				return "Could not fetch page";
			}
		}
	}));
});
