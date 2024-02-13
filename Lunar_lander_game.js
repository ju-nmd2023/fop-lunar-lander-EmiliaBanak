let flameHeight;
let animateFlame = false;
let rocketY = 200;
let rocketSpeed = 0.4;
let fallAcceleration = 0.001;
let lastKeyPressTime;
let timeThresholdForSpeedChange = 1000;
let groundY = 500;
let gameStarted = false;
let startButton;
let rocketRotation = 0; // Initial rotation angle of the rocket
let rotationSpeed = 0.8; // Speed of rotation

function setup() {
    createCanvas(500, 500).style('border', '2px solid white');
    lastKeyPressTime = millis();

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
        /* code adjusted from https://www.w3schools.com/graphics/canvas_text.asp*/
    } else {
        textAlign(CENTER);
        fill('white');
        textSize(10);
        text("Press 'Start Game' to launch the rocket!", width / 2.5, height / 2 - 30);
    }
}
//button for starting a game./* some of the names of functions were inspired by https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_breakout_game_Phaser/Buttons*/
function startGame() {
    gameStarted = true;
    startButton.hide();
}
// collisive terrain(not yet a full object)
function drawTerrain() {
    fill('grey');
    rect(0, 460, 500, 40);
}

function drawRocket() {
    push(); // save the current transformation state
    translate(210, rocketY); // move the origin to the rocket's position
    rotate(radians(rocketRotation)); // rotate the rocket

    // Body
    fill('white');
    rect(0, 0, 20, 40);

    // Top
    fill('red');
    triangle(0, 0, 20, 0, 10, -30);

    // Window
    fill(176, 196, 222);
    ellipse(10, 10, 10);

    // Flame effect when the UP key is pressed on and also start game function which will activate next step.
    if (gameStarted && keyIsDown(UP_ARROW)) {
        drawFlame(10, 40, 10);
    }

    pop(); // Restore the previous transformation state

    // Update the rocket's rotation based on arrow keys
    if (gameStarted) {
        if (keyIsDown(RIGHT_ARROW)) {
            rocketRotation += rotationSpeed;
        }
        if (keyIsDown(LEFT_ARROW)) {
            rocketRotation -= rotationSpeed;
        }
    }
}
// Rocket movement, after clicking start game button, added acceleration, so the rocket will fall faster when the arrows are not used.
function checkRocketPosition() {
    if (gameStarted && keyIsDown(UP_ARROW) && rocketY > 0) {
        rocketY -= 5 * rocketSpeed;
        lastKeyPressTime = millis();
    } else if (gameStarted) {
        let timeSinceKeyPress = millis() - lastKeyPressTime;
        let adjustedFallSpeed = rocketSpeed + timeSinceKeyPress * fallAcceleration;

        if (rocketY < groundY - 80) {
            rocketY += 2 * adjustedFallSpeed;
        } else {
            rocketY = groundY - 80;
        }
    }
}
// function for flame, which will show up after pressing arrow keys.
function drawFlame(x, y, size) {
    for (let i = 0; i < 5; i++) {
        let offsetX = random(-5, 5);
        let offsetY = random(-5, 5);
        fill('orange');
        ellipse(x + offsetX, y + offsetY, size, size);
    }
}
