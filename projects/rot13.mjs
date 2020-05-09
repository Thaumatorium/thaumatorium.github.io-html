console.log("running rot13.mjs")
let input = document.getElementById("in");
let output = document.getElementById("out");

const chr = (letter) => letter.charCodeAt(0);
const ord = (letterValue) => String.fromCharCode(letterValue);

input.addEventListener('input', () => {
  output.value = input.value.replace(/[a-z]/gi, c => {
    let result = chr(c) + 13;

    if ((c <= "Z" ? 90 : 122) < result) {
      result -= 26;
    }
  
    return ord(result)
  });
});

output.addEventListener('click', () => {
  output.select();
  document.execCommand('copy');
});
