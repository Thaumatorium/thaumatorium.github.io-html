const in_encode = document.getElementById("t2e-in-encode");
const out_encode = document.getElementById("t2e-out-encode");
const in_decode = document.getElementById("t2e-in-decode");
const out_decode = document.getElementById("t2e-out-decode");
// const unicode = fetch("https://thaumatorium.com/projects/unicode-descriptions.json")
let unicode = [];
fetch("http://127.0.0.1:5500/projects/unicode-descriptions.json")
	.then(res => res.json())
	.then(data => unicode = data)
	.catch(err => console.error(err));

in_encode.addEventListener('input', () => {
	let result = "";
	Array.from(in_encode.value).map(letter => {
		// turn each letter into the emoji, where the description starts with each letter
		let emoji = unicode.filter(obj => obj.description[0].toLowerCase() == letter.toLowerCase());
		if (emoji?.length > 0) {
			result += emoji[0].unicode;
		} else {
			result += letter;
		}
	});
	out_encode.value = result;
});

out_encode.addEventListener('click', () => {
	out_encode.select();
	document.execCommand('copy');
});

in_decode.addEventListener('input', () => {
	let result = "";
	let val = in_decode.value;
	Array.from(val).map(emoji => {
		// turn each letter into the emoji, where the description starts with each letter
		let obj = unicode.filter(obj => obj.unicode == emoji);
		if (obj?.length > 0) {
			result += obj[0].description[0].toLowerCase();
		} else {
			result += emoji;
		}
	});
	out_decode.value = result;
});

out_decode.addEventListener('click', () => {
	out_decode.select();
	document.execCommand('copy');
});
