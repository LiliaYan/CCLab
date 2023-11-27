let btn;
let glitches = [];
let sequence = 0;
let click = 0;
function setup() {
    createCanvas(1080, 650);
    background(255);
    button();
}

function draw() {
    //add soundeffect while clicking
    if (click >= 5 && click <= 10) {
        scene2();
    } else if (click > 10 && click < 20) {
        scene1();
    }

    if (glitches.length > 5000) {
        scene3();
    }
}

function button() {
    btn = createButton("CLICK");
    btn.position(random(900), random(500));
    //btn.position(width / 2 - btn.width / 2, height / 2 - btn.height / 2);
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
        glitches.splice(0, 2);
    }
}
function scene3() {
    //clear the original array
    glitches.clear();
    for (let i = 0; i < 10; i++) {
        glictches.push(new Glitch(random(1000), random(500)));
    }
    for (let i = 0; i < glitches.length; i++) {
        let g = glitches[i];
        g.display;
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