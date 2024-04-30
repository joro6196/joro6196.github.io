const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// Volume variables
let volume = 50;

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class VolumeButton {
    constructor(text, x, y, velX, velY) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.size = 30; // Size of the circle representing the button
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = '#FFF';
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.text, this.x, this.y + 5);
    }

    update() {
        if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }

        if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }
}

const buttons = [
    new VolumeButton('-', random(30, width - 30), random(30, height - 30), random(-5, 5), random(-5, 5)),
    new VolumeButton('+', random(30, width - 30), random(30, height - 30), random(-5, 5), random(-5, 5))
];

function handleMouseClick(e) {
    buttons.forEach(button => {
        if (Math.sqrt((e.clientX - button.x) ** 2 + (e.clientY - button.y) ** 2) <= button.size) {
            if (button.text === '-') {
                volume = Math.max(0, volume - 10);
            } else if (button.text === '+') {
                volume = Math.min(100, volume + 10);
            }
        }
    });
}

canvas.addEventListener('click', handleMouseClick);

function displayVolume() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; // Slightly transparent white background
    ctx.fillRect(50, 50, 150, 50);
    ctx.fillStyle = '#000';
    ctx.font = '24px Arial';
    ctx.fillText(`Volume: ${volume}`, 125, 85);
}

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(0, 0, width, height);

    buttons.forEach(button => {
        button.draw();
        button.update();
    });

    displayVolume();
    requestAnimationFrame(loop);
}

loop();
