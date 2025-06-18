const canvas = document.getElementById("rain-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: null, y: null };

window.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

class Drop {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.length = 15 + Math.random() * 15;
    this.speed = 4 + Math.random() * 4;
    this.opacity = 0.3 + Math.random() * 0.3;
  }

  update() {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 80) {
      this.x += dx / dist * 4;
      this.y += dy / dist * 4;
    } else {
      this.y += this.speed;
    }

    if (this.y > canvas.height) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(135, 206, 250, ${this.opacity})`;
    ctx.lineWidth = 1.2;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.length);
    ctx.stroke();
  }
}

let drops = [];
for (let i = 0; i < 300; i++) {
  drops.push(new Drop());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let drop of drops) {
    drop.update();
    drop.draw();
  }
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
