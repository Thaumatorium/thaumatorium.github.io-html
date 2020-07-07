// https://developers.google.com/web/fundamentals/primers/service-workers
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
// https://github.com/mdn/sw-test
// https://github.com/jakearchibald/svgomg/blob/master/src/js/sw/index.js <-- current base

const VERSION = `v2`;
const THAUM_CACHE = `thaumcache-${VERSION}`;

// This is run when a user visits the website for the first time
addEventListener("install", event => {
	console.log(`sw.js: installing ${VERSION}`);

	event.waitUntil((async () => {
		const cache = await caches.open(THAUM_CACHE);

		await cache.addAll([
			// last updated: 2020-07-07
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
			"/articles/reddit-s-t-values.html",

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
			"/images/ko-fi-logo.svg",
			"/images/ko-fi-support.svg",

			// website pages
			"/pages/about.html",
			"/pages/articles.html",
			"/pages/experimentations.html",
			"/pages/praetorianpi.html",
			"/pages/projects.html",
			"/pages/code-of-conduct.html",
			"/pages/random-video.html",

			// Projects
			"/projects/scripts/base64.mjs",
			"/projects/scripts/mstg.mjs",
			"/projects/scripts/rot13.mjs",
			"/projects/scripts/slugify.mjs",
			"/projects/scripts/starfield.mjs",

			// CSS
			"/styles/footer.css?v=1",
			"/styles/header.css?v=1",
			"/styles/layout.css?v=1",
			"/styles/main.css?v=1",
			"/styles/nav.css?v=1",
			"/styles/projects.css?v=1",
		]);
	})());
}).catch(error => {
	console.log(`sw.js: can't cache list with ${error}`);
});

addEventListener('activate', event => {
	console.log(`sw.js: ${VERSION} ready to handle fetches!`);
});

addEventListener('fetch', event => {
	const url = new URL(event.request.url);
	console.log(`sw.js: fetching ${url}`)

	if (url.host == 'thaumatorium.com') {
		fetch(event.request).then(async () => {
			const cache = await caches.open(THAUM_CACHE);
			await cache.add(url);
		}).catch(error => {
			console.log(`sw.js: can't fetch ${url} with ${error}`);
		});
	}

	event.respondWith(
		caches.match(event.request)
			.then(r => r || fetch(event.request))
	);
});
