console.log("running slugify.mjs")
let input = document.getElementById("in");
let output = document.getElementById("out");

input.addEventListener('input', () => {
	output.value = input.value.replace(/[^a-z]/gi, c => {
		return "-";
	});
	output.value = output.value.toLowerCase();
});

output.addEventListener('click', () => {
	output.select();
	document.execCommand('copy');
});
