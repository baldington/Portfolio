const canvas = document.getElementById("wave-background");
const ctx = canvas.getContext("2d");

let width;
let height;

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const waves = [];

for (let i = 0; i < 8; i++) {
    waves.push({
        y: Math.random() * height,
        x: Math.random() * width,
        speed: 0.3 + Math.random() * 0.7,
        amplitude: 20 + Math.random() * 40,
        spacing: 40 + Math.random() * 80
    });
}

function drawWave(wave) {
    ctx.beginPath();

    let x = wave.x;

    ctx.moveTo(x, wave.y);

    while (x < width + 100) {
        // High
        ctx.lineTo(x + wave.spacing / 2, wave.y);

        // Rising edge
        ctx.lineTo(x + wave.spacing / 2, wave.y - wave.amplitude);

        // High
        ctx.lineTo(x + wave.spacing, wave.y - wave.amplitude);

        // Falling edge
        ctx.lineTo(x + wave.spacing, wave.y);

        x += wave.spacing;
    }

    ctx.stroke();
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    ctx.lineWidth = 1.5;

    waves.forEach(wave => {
        wave.x -= wave.speed;

        if (wave.x < -wave.spacing * 2) {
            wave.x = width;
        }

        drawWave(wave);
    });

    requestAnimationFrame(animate);
}

animate();