let flameHeight;
let animateFlame = false;
let rocketY = 200;
let rocketX = 210; // Initial horizontal position of the rocket
let rocketSpeed = 1; // Adjusted the rocket speed for better responsiveness
let fallAcceleration = 0.01;
let groundY = 400;
let gameStarted = false;
let startButton;
let rocketRotation = 0; // Initial rotation angle of the rocket
let rotationSpeed = 1.5; // Speed of rotation
let easing = 0.3;

function setup() {
    createCanvas(500, 500).style('border','1px white');

    startButton = createButton('Start Game');
    startButton.position(width / 2 - 80, height / 2);
    startButton.mousePressed(startGame);
}

function draw() {
    background('black');

    if (gameStarted) {
        checkRocketPosition();
        drawRocket();
        drawTerrain();
    } else {
        textAlign(CENTER);
        fill('white');
        textSize(10);
        text("Press 'Start Game' to begin!", width / 2.5, height / 2 - 50);
    }
}

function startGame() {
    gameStarted = true;
    startButton.hide();
}

function drawTerrain() {
    fill('grey');
    rect(0, 460, 500, 40);
    rect(0,420,100,80);
    rect(100,300,100,600);
    rect(200,370,100,200);
    rect(300,250,100,250);
}

function drawRocket() {
    push(); // Save the current transformation state
    translate(rocketX, rocketY); // Move the origin to the rocket's position
    rotate(radians(rocketRotation)); // Rotate the rocket

    // Body
    fill('white');
    rect(0, 0, 20, 40);

    // Top
    fill('red');
    triangle(0, 0, 20, 0, 10, -30);

    // Window
    fill(176, 196, 222);
    ellipse(10, 10, 10);

    // Flame effect when the UP key is pressed on and also start game function which will activate the next step.
    if (gameStarted && keyIsDown(UP_ARROW)) {
        drawFlame(10, 40, 10);
    }

    pop(); // Restore

    
    if (gameStarted) {
        // Immediate left or right movement when keys are pressed
        if (keyIsDown(RIGHT_ARROW) && rocketX < width - 20) {
            rocketX += rocketSpeed;
            rocketRotation += rotationSpeed;
        }
        if (keyIsDown(LEFT_ARROW) && rocketX > 0) {
            rocketX -= rocketSpeed;
            rocketRotation -= rotationSpeed;
        }
    }
}

function checkRocketPosition() {
    if (gameStarted && keyIsDown(UP_ARROW) && rocketY > 1) {
        rocketY -= 3 * rocketSpeed;
    } else if (gameStarted) {
        let adjustedFallSpeed = rocketSpeed + fallAcceleration;

        if (rocketY < groundY - 80) {
            rocketY += 3* adjustedFallSpeed;
        } else {
            rocketY = groundY - 80;
        }
    }
}
//flame coming out from the rocket when the UP arrow is pressed on.
function drawFlame(x, y, size) {
    for (let i = 0; i < 5; i++) {
        let offsetX = random(-5, 5);
        let offsetY = random(-5, 5);
        fill('orange');
        ellipse(x + offsetX, y + offsetY, size, size);
    }
}

function keyPressed() {
    // left or right movement when keys are pressed
    if (gameStarted) {
        if (keyCode === RIGHT_ARROW && rocketX < width - 20) {
            rocketX += rocketSpeed;
            rocketRotation += rotationSpeed;
        }
        if (keyCode === LEFT_ARROW && rocketX > 0) {
            rocketX -= rocketSpeed;
            rocketRotation -= rotationSpeed;
        }
    }
}
