let cam;
let btn;
let glitches = [];
let sequence = 0;
let click = 0;
let clickSound;
let backMusic;
let errorSound;

function preload() {
    clickSound = loadSound('music/mouse-click.mp3');
    backMusic = loadSound('music/sci-fi-sound.mp3');
    errorSound = loadSound('music/error.mp3');
}


function setup() {
    createCanvas(1080, 650);
    background(255);
    button();
    angleMode(DEGREES);
    cam = createCapture(VIDEO);
    cam.hide();
    cam.size(width, width * 3 / 4); //4:3
}

function draw() {
    if (click >= 5 && click <= 10) {
        scene2();
    } else if (click > 11 && click <= 20) {
        scene1();
        //console.log(glitches.length)
    } else if (click > 20 && click <= 30) {
        scene3();
    } else if (click > 30 && click <= 40) {
        scene1();
    } else if (click > 40 && click <= 50) {
        sceneFace();
    } else if (click > 50 && click <= 60) {
        button();
        //click = 0;
    }
}

function onButtonClick() {
    if (clickSound) {
        clickSound.play();  // Play the sound
    }
    scene1();
}

function button() {
    btn = createButton("CLICK");
    btn.position(random(900), random(500));
    btn.mousePressed(onButtonClick);
}

function mousePressed() {
    click++;
    console.log(click);
    if (click > 1 && click <= 5) {
        if (mousePressed && errorSound) {
            let rateValue = map(click, 2, 5, 0.5, 2.0); // half to double
            rateValue = constrain(rateValue, 0.5, 2.0);
            errorSound.rate(rateValue);
            errorSound.play();
        }
    }
    if (click > 11 && click <= 20) {
        if (mousePressed && errorSound) {
            errorSound.play();
        }
    }
    if (click > 30 && click <= 40) {
        if (mousePressed && errorSound) {
            errorSound.play();
        }
    }
}
function scene1() {
    background(0);
    btn.hide();
    backMusic.stop();
}

function scene2() {
    //glitches.length = 0;
    for (let i = 0; i < 20; i += 1) {
        let alpha = map(click, 5, 10, 0, 255);
        //console.log(alpha);
        glitches.push(new Glitch(width / 2, height / 2, alpha));
    }
    for (let j = 1; j < glitches.length; j++) {
        let g = glitches[j];
        g.rotate();
        g.update();
        g.display();
    }
    glitches.splice(0, 18);
    backMusic.play();
    //how to slow down
    //if (glitches.length > random(200)) {
    //    glitches.splice(0, 5);
    //}
}
function scene3() {
    //clear the original array
    glitches.length = 0;
    for (let i = 0; i < 50; i++) {
        let w = map(click, 20, 30, 0, width);
        glitches.push(new Glitch(random(w), random(height)));
    }
    for (let i = 0; i < glitches.length; i++) {
        let g = glitches[i];
        g.small();
        g.display();

    }
}

function sceneFace() {
    push();
    //image(cam, 0, 0);
    for (let i = 0; i < 200; i++) {
        let x = floor(random(width));
        let y = floor(random(height));
        let c = cam.get(x, y);
        //let avg = (red(c) + green(c) + blue(c)) / 3;
        if (red(c) > green(c) && red(c) > blue(c)) {
            if (red(c) >= 255 / 2) {
                fill(red(c), green(c), blue(c));
            } else {
                fill(random(255), random(255), random(255));

            }

        } else if (green(c) > red(c) && green(c) > blue(c)) {
            fill(0, 255, 0);
        } else if (blue(c) > red(c) && blue(c) > green(c)) {
            fill(0, 0, 255);
        }
        //fill(avg, avg + random(-20, 20), avg, 255);
        noStroke();
        rectMode(CENTER);
        rect(x, y, random(30), random(50));
    }
    pop();
}

class Glitch {
    constructor(startX, startY, startA) {
        this.x = startX;
        this.y = startY;
        this.width = width / 2;
        this.angle = 0;
        //this.a = 1
        this.alpha = startA;
    }
    update() {
        if (this.angle >= 360) {
            this.angle = 0;
        } else {
            this.angle += 2;
        }

        //this.width /= 2;
        this.width += random(-10, 10);
    }
    small() {
        this.width = random(width / 16, width / 8);
    }
    display() {
        push();
        translate(this.x, this.y);
        //stroke(0);
        //strokeWeight(3);
        noStroke();
        console.log(this.alpha);
        fill(random(255), random(255), random(255), this.alpha);
        rect(0, 0, this.width, this.width);
        pop();
    }
    rotate() {
        //push();
        translate(this.x, this.y);
        rotate(this.angle);
        //pop();
    }
}

//note: add more interaction with html by manipulating the size of the canvas
//And try to find more suitable colors to present the idea of dream and glitch
//And for the class object, add interaction with the mouse and then swtich to the next stage