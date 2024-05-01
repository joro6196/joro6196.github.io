const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Star {
    constructor(x, y, velX, velY, size, imageSrc) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.size = random(size, 100);
        this.image = new Image();
        this.image.src = imageSrc;
    }

    draw() {
        ctx.drawImage(this.image, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }

    update() {
        if ((this.x + this.size / 2) >= width || (this.x - this.size / 2) <= 0) {
            this.velX = -(this.velX);
        }

        if ((this.y + this.size / 2) >= height || (this.y - this.size / 2) <= 0) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }
}

const stars = [];

while (stars.length < 25) {
    const size = random(10, 30);
    const star = new Star(random(0 + size, width - size), random(0 + size, height - size), random(-5, 5), random(-5, 5), size, 'star.png');
    stars.push(star);
}

let volume = 50;

class VolumeButton {
    constructor(text, x, y, velX, velY, imageSrc) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.velX = random(5,8);
        this.velY = random(5,8);
        this.size = 80;
        this.image = new Image();
        this.image.src = imageSrc;
    }

    draw() {
        ctx.drawImage(this.image, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
 
        ctx.fillText(this.text, this.x, this.y + 5);
    }

    update() {
        if ((this.x + this.size / 2) >= width || (this.x - this.size / 2) <= 0) {
            this.velX = -(this.velX);
        }

        if ((this.y + this.size / 2) >= height || (this.y - this.size / 2) <= 0) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;

        this.collisionDetect();
    }
   
    collisionDetect() {
        for (const button of buttons) {
            if (this !== button) {
                const dx = this.x - button.x;
                const dy = this.y - button.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + button.size) {
                    // Reverse velocities to deflect buttons
                    const tempVelX = this.velX;
                    const tempVelY = this.velY;
                    this.velX = button.velX;
                    this.velY = button.velY;
                    button.velX = tempVelX;
                    button.velY = tempVelY;
                }
            }
        }
    }

}

const buttons = [
    new VolumeButton('Volume Up', random(30, width - 30), random(30, height - 30), random(-5, 5), random(-5, 5), 'green-planet-up.png'),
    new VolumeButton('Volume Down', random(30, width - 30), random(30, height - 30), random(-5, 5), random(-5, 5), 'red-planet-down.png')
];

function handleMouseClick(e) {
    buttons.forEach(button => {
        if (Math.sqrt((e.clientX - button.x) ** 2 + (e.clientY - button.y) ** 2) <= button.size) {
            if (button.text === 'Volume Up') {
                volume = Math.min(100, volume + random(1, 50));
            } else if (button.text === 'Volume Down') {
                volume = Math.max(0, volume - random(1, 50));
            }
        }
    });
}

canvas.addEventListener('click', handleMouseClick);

function displayVolume() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillRect(50, 50, 319, 50);
    ctx.fillStyle = '#000';
    ctx.font = '24px Times New Roman';
    ctx.fillText(`     Volume: ${volume}`, 125, 85);
}

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.fillRect(0, 0, width, height);

    stars.forEach(star => {
        star.draw();
        star.update();
    });

    buttons.forEach(button => {
        button.draw();
        button.update();
    });

    const backgroundImage = new Image();
    backgroundImage.src = 'space-background.png';
    backgroundImage.onload = function () {
        ctx.drawImage(backgroundImage, 0, 0, width, height);
    };

    displayVolume();
    requestAnimationFrame(loop);
}

loop();


