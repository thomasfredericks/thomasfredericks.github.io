const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

const scaleFactor = 0.25; // Lower resolution (25% of screen size)

function resizeCanvas() {
    canvas.width = Math.floor(window.innerWidth * scaleFactor);
    canvas.height = Math.floor(window.innerHeight * scaleFactor);
}
resizeCanvas();
window.addEventListener("resize", () => {
    resizeCanvas();
    initShells();
});

class Shell {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.vx = (Math.random() * 1 - 0.5) * scaleFactor ;
        this.vy = (Math.random() + 1) * scaleFactor ;
        //this.length = 8;
        //this.width = Math.random() * 1 + 2;
        this.opacity = Math.random() * 0.5 + 0.5;


        this.trail = [];
        this.maxTrail = 10;
    }

    update() {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > this.maxTrail) {
            this.trail.shift();
        }

        this.x += this.vx;
        this.y += this.vy;

        if (this.y > canvas.height) {
            this.reset();
        }
    }

    draw() {
        const scale = 1 / scaleFactor * 2;


        const colors = ['#FF4500', '#FFA500', '#FFD700', '#A9A9A9'];
        //this.color = colors[Math.floor(Math.random() * colors.length)];

        if (this.trail.length > 1) {
            for (let i = 0; i < this.trail.length - 2; i++) {
                const p1 = this.trail[i];
                const p2 = this.trail[i + 1];
                const fade = ((i+1) / (this.trail.length - 1));
                ctx.beginPath();
                let colorIndex = Math.floor(i / (this.trail.length - 3) * (colors.length - 1));
                ctx.strokeStyle = colors[colorIndex];
                ctx.globalAlpha = this.opacity * fade;
                ctx.lineWidth =  scale * fade * 0.25;
                ctx.moveTo(p1.x * scale, p1.y * scale);
                ctx.lineTo(p2.x * scale, p2.y * scale);
                ctx.stroke();
            }
        }


        ctx.globalAlpha = 1.0;
    }
}

let shells = [];

function initShells() {
    shells = [];
    const shellCount = Math.floor(canvas.width * 0.2);
    for (let i = 0; i < shellCount; i++) {
        shells.push(new Shell());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let shell of shells) {
        shell.update();
        shell.draw();
    }
    requestAnimationFrame(animate);
}

initShells();
animate();
