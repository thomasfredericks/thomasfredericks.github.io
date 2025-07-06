const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");



class Shell {
    constructor() {
        this.reset();
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = 0;

        const closeness = Math.random();

        this.angle = Math.PI / 2 + (Math.random() - 0.5) * (Math.PI / 3);
        // Range: 60° to 120° (π/3 ≈ 60° spread around straight down)


        this.speed = 0.5 * closeness;


        this.trailLength = closeness * 12;
        this.shellLength = closeness * 1;
        this.width = closeness * 0.5 + 1;
        this.opacity = closeness * 0.9 + 0.1;

        this.shellColor = '#A9A9A9';
        //const gradientColors = ['#FF4500', '#FFA500', '#FFD700'];
        this.gradientColors = [
            'rgba(255, 69, 0, 255)',    // #FF4500 (orange-red)
            'rgba(255, 165, 0, 127)',   // #FFA500 (orange)
            'rgba(255, 215, 0, 0)'    // #FFD700 (gold)
        ];



        //this.trail = [];
        //this.maxTrail = 10;
    }

    update() {
        /*
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > this.maxTrail) {
            this.trail.shift();
        }
*/
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        //this.angle = Math.atan2(this.vy, this.vx);
        this.x += this.vx;
        this.y += this.vy;

        if (this.y > canvas.height + this.shellLength + this.trailLength) {
            this.reset();
        }
    }

    draw() {



        //this.color = colors[Math.floor(Math.random() * colors.length)];
        /*
                if (this.trail.length > 1) {
                    for (let i = 0; i < this.trail.length - 2; i++) {
                        const p1 = this.trail[i];
                        const p2 = this.trail[i + 1];
                        const fade = ((i+1) / (this.trail.length - 1));
                        ctx.beginPath();
                        let colorIndex = Math.floor(i / (this.trail.length - 3) * (colors.length - 1));
                        ctx.strokeStyle = colors[colorIndex];
                        ctx.globalAlpha = this.opacity * fade;
                        ctx.lineWidth =  fade * 0.25;
                        ctx.moveTo(p1.x , p1.y );
                        ctx.lineTo(p2.x , p2.y );
                        ctx.stroke();
                    }
                }
        */

        let x1 = this.x;
        let y1 = this.y;
        let x2 = x1 - Math.cos(this.angle) * this.shellLength;
        let y2 = y1 - Math.sin(this.angle) * this.shellLength;
        let x3 = x2 - Math.cos(this.angle) * this.trailLength;
        let y3 = y2 - Math.sin(this.angle) * this.trailLength;
        //console.log(x1-x2);



        ctx.beginPath();
        // let colorIndex = Math.floor(i / (this.trail.length - 3) * (colors.length - 1));
        ctx.strokeStyle = this.shellColor;
        ctx.globalAlpha = this.opacity;
        ctx.lineWidth = this.width;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();



        const gradient = ctx.createLinearGradient(x2, y2, x3, y3);

        // Add color stops evenly
        for (let i = 0; i < this.gradientColors.length; i++) {
            const stop = i / (this.gradientColors.length - 1); // 0.0 to 1.0
            gradient.addColorStop(stop, this.gradientColors[i]);
        }

        ctx.beginPath();
        ctx.strokeStyle = gradient; //'#FFA500';//'#FF4500';
        ctx.globalAlpha = this.opacity;
        ctx.lineWidth = this.width;
        ctx.moveTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.stroke();

        ctx.globalAlpha = 1.0;
    }
}

let shells = [];

function initShells() {
    shells = [];
    const shellCount = Math.floor(canvas.width * 0.1);
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
