// CCLab Mini Project - 9.R Particles Template

let particles = [];
let time = 0;

function setup() {
    createCanvas(500, 500);
    background(255);
    fill(0);
    text("Press Mouse to Draw Calligraphic Patterns", 10, 20);

    // generate particles
    //for (let i = 0; i < 2; i++) {
    //let x = 4/5 * width;
    //let y = 1/5 * height;
    //particles[i] = new Particle(x, y);
    //x += 2;
    //y += 5;
    //}
}

function draw() {
    //background(255, 10);
    // generate rectangular brush stroke
    if (mouseIsPressed && mouseX < 4 / 5 * width && mouseX > 1 / 5 * width && mouseY > 1 / 5 * height && mouseY < 4 / 5 * height) {
        particles.push(new Particle(mouseX, mouseY));
    }
    //display functions
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        if (keyIsPressed) {
            p.display();
        } else {
            p.display();
            p.move();
            p.colorVariation();
            p.brushStroke();
        }

    }
    while (particles.length > 10) {
        particles.splice(0, 1); // (firstIndex, oneItem);
    }
}


class Particle {
    // constructor function
    constructor(startX, startY) {
        // properties: particle's characteristics
        this.x = startX;
        this.y = startY;
        this.bri = random(0, 10);
        this.speedBri = 3;
        this.speedX = 5;
        this.speedY = 6;
        //this.volume = 10;
        this.volume = map(100, 50, width, 10, 50);
    }
    // methods (functions): particle's behaviors
    display() {
        // particle's appearance
        push();
        translate(this.x, this.y);
        fill(this.bri, 100);
        noStroke();
        rect(random(-3, 3), random(-3, 3), this.volume, this.volume);
        pop();
    }

    move() {
        if (this.x < 1 / 5 * width || this.x > 4 / 5 * width) {
            this.speedX *= -1;
        } else if (this.y > 4 / 5 * height || this.y < 1 / 5 * height) {
            this.speedY *= -1;
        }

        this.x += this.speedX * -1;
        this.y += this.speedY * 0.1;
    }
    colorVariation() {
        if (this.bri >= 255 || this.bri <= 0) {
            this.speedBri *= -1;
        }
        this.bri += this.speedBri;
    }
    brushStroke() {
        this.volume += random(-1, 1);
        if (this.volume <= 0) {
            this.volume = 10;
        }
        console.log(this.volume);
    }

}