let btn;
let glitches = [];
let sequence = 0;
let click = 0;
let clickSound;

function preload() {
    //clickSound = loadSound('clickSound.mp3'); 
}

function setup() {
    createCanvas(1080, 650);
    background(255);
    button();
}

function draw() {
    if (click >= 5 && click <= 10) {
        scene2();
    } else if (click > 20 && click <= 30) {
        scene1();
        //console.log(glitches.length)
    } else if (click > 30 && click <= 40) {
        scene3();
    } else if (click > 40 && click <= 50) {
        scene1();
    } else if (click > 50 && click <= 60) {
        button();
    }

}

function button() {
    btn = createButton("CLICK");
    btn.position(random(900), random(500));
    btn.mousePressed(scene1);
}
function mousePressed() {
    click++;
    console.log(click);
}
function scene1() {
    background(0);
    btn.hide();

}

function scene2() {
    //glitches.length = 0;
    for (let i = 0; i < 50; i += 1) {
        glitches.push(new Glitch(width / 2, height / 2));
    }
    for (let j = 1; j < glitches.length; j++) {
        let g = glitches[j];
        g.display();
        g.rotate();
        g.update();
    }
    //how to slow down
    if (glitches.length > random(200)) {
        glitches.splice(0, 5);
    }
}
function scene3() {
    //clear the original array
    glitches.length = 0;
    for (let i = 0; i < 50; i++) {
        glitches.push(new Glitch(random(1000), random(500)));
    }
    for (let i = 0; i < glitches.length; i++) {
        let g = glitches[i];
        g.small();
        g.display();

    }
}
class Glitch {
    constructor(startX, startY) {
        this.x = startX;
        this.y = startY;
        this.width = width / 2;
        this.angle = 1;
    }
    update() {
        this.angle += 2;
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
        fill(random(255), random(255), random(255));
        rect(0, 0, this.width, this.width);
        pop();
    }
    rotate() {
        translate(this.x, this.y);
        angleMode(DEGREES);
        rotate(this.angle);
    }
}

//note: add more interaction with html by manipulating the size of the canvas
//And try to find more suitable colors to present the idea of dream and glitch
//And for the class object, add interaction with the mouse and then swtich to the next stage