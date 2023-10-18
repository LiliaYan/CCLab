let colors = [];
let colors2 = [];

let angle = 0;
let t = 0;
let x, y, dia;
let bgR, bgG, bgB;

function setup() {
    createCanvas(600, 600);
    background(255);

    bgR = 16;
    bgG = 26;
    bgB = 63;//63
    generateStars();

    colors = [
        color(255, 146, 35),
        color(255, 180, 0),
        color(255, 206, 0),
        color(255, 247, 63),
        color(248, 230, 140),
    ];

    colors2 = [
        color(152, 159, 255),
        color(179, 141, 255),
        color(210, 132, 255),
        color(240, 118, 255),
        color(255, 112, 235),
    ];

}

function bgColor() {
    // new bg color will be generated
    if (random(1.00) < 0.03) {
        bgR = random(30);
        bgG = random(10);
        //bgB = random(150);
    }

    // update bg color
    let amount = 4;
    bgR += random(-1, 1) * amount;
    bgG += random(-1, 1) * amount;
    //bgB += random(-1, 1) * amount;
    bgR = constrain(bgR, 0, 30);
    bgG = constrain(bgG, 0, 50);
    //bgB = constrain(bgB, 0, 255);
    //console.log(bgG);

    //add transparency
    background(bgR, bgG, bgB, 20); // + alpha

    //try
    if (mouseIsPressed) {
        background(255);
    }
}

function mainCircle() {
    angle += 0.01;
    let radDist = 20;
    let sinValue = sin(angle) * radDist;
    let cosValue = cos(angle) * radDist;

    let a = width / 2;
    let b = height / 2;
    noFill();

    push();
    translate(a, b);
    let scl = map(sin(frameCount * 0.03), -1, 1, 0.85, 1.15);
    scale(scl);
    //stroke(208, 189, 150);
    stroke(colors[4]);
    strokeWeight(9);
    //strokeWeight(random(8, 10));
    circle(0, 0, width / 2 + 100);
    //sina sinb
    //stroke(250, 200, 80);
    stroke(colors[3]);
    arc(0, 0, 250, 250, 0 + sinValue / 2, 0 + cosValue / 2);
    //stroke(255, 245, 80);
    stroke(colors[2]);
    arc(0, 0, 200, 200, 0 + sinValue / 5, 0 + cosValue / 5);
    //stroke(233, 229, 126);
    stroke(colors[1]);
    arc(0, 0, 100, 100, 0 + sinValue / 3, 0 + cosValue / 3);
    circle(0 + sinValue * 10, 0 + cosValue * 10, 5);
    //stroke(255, 245, 180);
    stroke(colors[0]);
    arc(0, 0, 50, 50, 0 + sinValue / 5, 0 + cosValue / 5);
    //stroke(255, 250, 220);
    stroke(255, 250, 250);
    circle(0 + sinValue / 3, 0 + cosValue / 3, 2);
    pop();
}

function galaxyStay() {
    //keep it for a while
    if (t <= 0) {
        x = random(width);
        y = random(width);
        dia = random(75, 200);
        t = 250;
    } else {
        t -= 1;
    }
}


function draw() {
    bgColor();
    mainCircle();
    galaxy(x, y);
    galaxyStay();
    whitePoint();
}

function galaxy(x, y) {
    noFill();
    let radDist = 20;
    let sinValue = sin(angle) * radDist;
    let cosValue = cos(angle) * radDist;

    let xAdj = cos(frameCount * 0.01) * 50;
    let yAdj = sin(frameCount * 0.01) * 50;

    //the pattern
    push();
    translate(x + xAdj, y + yAdj);
    let scl = map(sin(frameCount * 0.08), -1, 1, 0.85, 1.15);
    scale(scl);
    strokeWeight(4);
    //stroke(255, 200, 180, transLevel);
    stroke(colors2[0]);
    arc(0, 0, dia, dia, x + sinValue / 2, y + cosValue / 2);
    stroke(colors2[1]);
    arc(0, 0, dia / 1.5, dia / 1.5, x + sinValue / 5, y + cosValue / 5);
    //stroke(233, 209, 216, transLevel);
    stroke(colors2[2]);
    arc(0, 0, dia / 2, dia / 2, x + sinValue / 3, y + cosValue / 3);
    circle(0 + sinValue * 10, 0 + cosValue * 10, 5);
    //stroke(255, 210, 220, transLevel);
    stroke(colors2[3]);
    arc(0, 0, dia / 3, dia / 3, x + sinValue / 5, y + cosValue / 5);
    //stroke(255, 185, 255, transLevel);
    stroke(colors2[4]);
    circle(0 + sinValue / 3, 0 + cosValue / 3, 2);
    pop();
}

function whitePoint() {
    let n = floor(random(100));
    if (n == 1) {
        //regenerate stars
        generateStars();
    }
    //draw stars every frame
    starShine();
}

let starX = [];
let starY = [];
let starDia = [];

function generateStars() {
    for (let i = 0; i < 50; i++) {
        starX[i] = random(width);
        starY[i] = random(height);
        starDia[i] = random(1, 3);
    }
}

let starMove = 1;

function starShine() {
    if (starMove < 2) {
        starMove += 0.005;
    } else {
        starMove = 1;
    }
    push();
    scale(starMove);
    for (let i = 0; i < 50; i++) {
        noStroke();
        fill(255);
        circle(starX[i], starY[i], starDia[i]);
    }
    pop();
}

