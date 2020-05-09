"use strict"
console.log("running starfield.mjs")
const context = window.starfield.getContext("2d");
let height = document.documentElement.clientHeight;
let width = document.documentElement.clientWidth;
const depth = 1000 * (height / width);
const stars = [];
const max_depth = width;

// Create stars
for (let i = 0; i < 200; i++) {
  let size = Math.random() * 4;
  stars[i] = {
    x: Math.random() * width,
    y: Math.random() * height,
    z: Math.random() * depth,
    size: size,
    color: Math.floor(size * 256)
  };
}

// Animation loop
const step = (timestamp) => {
  // Not sure what to do with `timestamp`
  height = document.documentElement.clientHeight;
  width = document.documentElement.clientWidth;

  // Resize canvas when the window is resized
  context.canvas.height = height;
  context.canvas.width = width;

  // create the black background
  context.fillRect(0, 0, width, height);

  for (let i = stars.length - 1; i > -1; i--) {
    let star = stars[i];

    // move the star closer
    star.x -= 1;

    // move the star back once it reaches the screen
    if (star.x < 0) {
      stars.push(stars.splice(i, 1)[0]);
      star.x = max_depth;
      continue;
    }

    const scale = 2;
    // context.fillStyle = "rgb(" + color + "," + color + "," + color + ")";
    // context.fillRect(star.x, star.y, star.size * scale, star.size * scale);
    context.beginPath();
    context.fillStyle = "rgb(" + star.color + "," + star.color + "," + star.color + ")";
    context.arc(star.x, star.y, star.size * scale, 0, 2 * Math.PI);
    context.fill();
  }

  window.requestAnimationFrame(step);
};

window.requestAnimationFrame(step);
