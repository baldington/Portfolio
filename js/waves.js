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

function makeSegment() {
    const lowWidth = 20 + Math.random() * 40;
    const highWidth = 20 + Math.random() * 40;

    return {
        lowWidth,
        highWidth,
        width: lowWidth + highWidth
    };
}

const waves = [];

for (let i = 0; i < 8; i++) {
    waves.push({
        y: height * (i / 8),
        x: Math.random() * width,
        speed: 0.3 + Math.random() * 0.7,
        amplitude: 40,
        segments: []
    });
}

// Fill each wave with enough segments to cover the screen
waves.forEach(wave => {
    let coveredWidth = 0;

    while (coveredWidth < width * 2) {
        const segment = makeSegment();
        wave.segments.push(segment);
        coveredWidth += segment.width;
    }
});

function drawWave(wave) {
    ctx.strokeStyle = "#999DA0";
    ctx.lineWidth = 1.5;

    ctx.beginPath();

    let x = wave.x;

    ctx.moveTo(x, wave.y);

    for (const segment of wave.segments) {

        // Low section
        ctx.lineTo(
            x + segment.lowWidth,
            wave.y
        );

        // Rising edge
        ctx.lineTo(
            x + segment.lowWidth,
            wave.y - wave.amplitude
        );

        // High section
        ctx.lineTo(
            x + segment.width,
            wave.y - wave.amplitude
        );

        // Falling edge
        ctx.lineTo(
            x + segment.width,
            wave.y
        );

        x += segment.width;

        if (x > width + 100) {
            break;
        }
    }

    ctx.stroke();
}

function animate() {

    ctx.clearRect(0, 0, width, height);

    waves.forEach(wave => {

        // Move wave to the left
        wave.x -= wave.speed;

        // If a segment completely leaves the screen,
        // remove it and add a new one at the end.
        while (
            wave.segments.length > 0 &&
            wave.x + wave.segments[0].width < 0
        ) {
            const oldSegment = wave.segments.shift();
            wave.x += oldSegment.width;
            wave.segments.push(makeSegment());
        }

        drawWave(wave);
    });

    requestAnimationFrame(animate);
}

animate();