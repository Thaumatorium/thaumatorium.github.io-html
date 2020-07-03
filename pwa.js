// This script installs the service worker that turns the website into a basic PWA
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(function (reg) {
		if (reg.installing) {
			console.log('Service worker installing');
		} else if (reg.waiting) {
			console.log('Service worker installed');
		} else if (reg.active) {
			console.log('Service worker active');
		}
	}).catch((error) => {
		console.log('Registration failed with ' + error);
	});
}

let ty = document.getElementById("target-year");
ty.innerHTML = new Date().getFullYear() + 10000;

const specialGoto = (event) => {
	if (event.ctrlKey && event.shiftKey) {
		window.location.href = "/pages/praetorianpi.html";
	}
}

if (getCookie('cookie-notification') === "read") {
	let notification = document.getElementsByClassName("cookie-notification")[0]
	notification.parentNode.removeChild(notification);
	console.log("cookie notification removed");
} else {
	let notification = document.getElementsByClassName("cookie-notification")[0]
	notification.addEventListener("click", () => {
		setCookie('cookie-notification', 'read', 365);
		let notification = document.getElementsByClassName("cookie-notification")[0]
		notification.parentNode.removeChild(notification);
	});
}

function getCookie(name) {
	return document.cookie
		.split("; ")
		.map((cookie) => cookie.split("="))
		.filter((cookie) => cookie[0] == name);
}

function setCookie(name, value, exdays = 365) {
	let d = new Date(Date.now() + exdays * 24 * 60 * 60 * 1000);
	let expires = "expires=" + d.toISOString();
	document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookieValue(name) {
	return getCookie(name)[1];
}