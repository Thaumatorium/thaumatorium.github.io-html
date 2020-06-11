console.log("running slugify.mjs")
let input = document.getElementById("slugify_in");
let output = document.getElementById("slugify_out");

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
