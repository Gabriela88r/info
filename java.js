const canvas = document.getElementById("galaxy-canvas");
const ctx = canvas.getContext("2d");
let width, height;
let stars = [];
const numStars = 150;

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function initStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: randomRange(0.3, 1.2),
      alpha: randomRange(0.2, 1),
      alphaChange: randomRange(0.002, 0.008),
      twinkleDirection: Math.random() > 0.5 ? 1 : -1,
      speedX: randomRange(-0.02, 0.02),
      speedY: randomRange(-0.01, 0.01),
    });
  }
}

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  initStars();
}

function drawStars() {
  ctx.clearRect(0, 0, width, height);
  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    // Color blanco con tintes suaves púrpuras
    let purpleAlpha = star.alpha;
    ctx.fillStyle = `rgba(180, 170, 210, ${purpleAlpha})`;
    ctx.shadowColor = "rgba(160, 150, 195, 0.7)";
    ctx.shadowBlur = 5;
    ctx.fill();

    // Movimiento sutil
    star.x += star.speedX;
    star.y += star.speedY;

    // Rebotar en los bordes
    if (star.x < 0) star.x = width;
    else if (star.x > width) star.x = 0;
    if (star.y < 0) star.y = height;
    else if (star.y > height) star.y = 0;

    // Twinkle alpha
    star.alpha += star.alphaChange * star.twinkleDirection;
    if (star.alpha <= 0.2) star.twinkleDirection = 1;
    else if (star.alpha >= 1) star.twinkleDirection = -1;
  });
}

function animate() {
  drawStars();
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  resizeCanvas();
});

resizeCanvas();
animate();
