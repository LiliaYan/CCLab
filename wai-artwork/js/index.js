let video;
let img;
let playButton;
let pauseButton;

let chars = [];

function setup() {
    createCanvas(640, 480);
    // Load the video file
    video = createVideo(['crowd.MOV'], videoLoaded);
    video.hide(); // Hide the default video player

    img = createImage(width, height);

    playButton = createButton('Play');
    playButton.position(width * 1.2, height * 1.1);
    playButton.mousePressed(playVideo);

    stopButton = createButton('Pause');
    stopButton.position(width * 1.3, height * 1.1);
    stopButton.mousePressed(pauseVideo);
}

function playVideo() {
    video.loop();
}

function pauseVideo() {
    video.pause();
}

function videoLoaded() {
    video.size(width, height);
    video.play();
}

function draw() {
    background(0);

    video.loadPixels();
    img.loadPixels();

    // Apply the threshold effect
    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            let index = (x + y * img.width) * 4;

            let r = video.pixels[index + 0];
            let g = video.pixels[index + 1];
            let b = video.pixels[index + 2];

            let avg = (r + g + b) / 3;
            let threshold = 0.7; // Adjust as needed

            if (avg > 255 * threshold) {
                // white
                img.pixels[index + 0] = 255;
                img.pixels[index + 1] = 255;
                img.pixels[index + 2] = 255;
                img.pixels[index + 3] = 255;
            } else {
                // black
                img.pixels[index + 0] = 0;
                img.pixels[index + 1] = 0;
                img.pixels[index + 2] = 0;
                img.pixels[index + 3] = 255;
            }
            //circle(x, y, 10);
            //let cIndex = floor(constrain(map(avg, 0, 255, 0, chars.length), 0, chars.length - 1));
        }
    }

    img.updatePixels();
    image(img, 0, 0);
}