// Rocket setup
let rocketY = 0;
let rocketX = 200;
let rocketSpeed = 0.001;
let rocketVelocity = null;
 
// Rocket motion
let rocketRotation = 180;
let rotationSpeed = 2;
let fallAcceleration = 0.1;
let adjustedFallSpeed = 0.1;
 
// Ground coordinates for collision
let groundY = 480;
 
// Buttons
let startButton;
let resetButton;
 
// Game parts
let gameStarted = false;
let gameOver = false;
let gameWon = false; 
 
// Fuel
let Fuel = 1000;
let fuelConsumptionOnThrust = 3;
 
// crash threshold
let breakThreshold = 2;
 
function setup() {
    createCanvas(500, 500);
 
    rocketVelocity = createVector(0,0);
 
    // Creating start button
    startButton = createButton('Start Game');
    startButton.position(width / 2 - 80, height / 2);
    startButton.mousePressed(startGame);
 
    // Creating reset button
    resetButton = createButton('Reset');
    resetButton.position(width / 2 - 80, height / 2 + 50);
    resetButton.mousePressed(resetGame);
    resetButton.hide();
}
 
// Show speed of rocket
function drawSpeed() {
    fill(255, 255, 255);
    textSize(20);
    text("Speed: " + rocketSpeed.toFixed(0) + " units per frame", width - 180, 30);
}
 
// Show Fuel that is left, stops at 0
function drawFuel() {
    fill(255, 255, 255);
    textSize(20);
    text("Fuel: " + Fuel.toFixed(0), width - 130, 60);
}
 
function draw() {
    background(0, 0, 41);
    if (gameStarted && !gameOver && !gameWon) {
        RocketMovement();
        checkCollision();
        drawRocket();
        drawTerrain();
        drawSpeed();
        drawFuel();
        rocketSideMovement();
    } else {
        // Resetting message when game is lost
        if (gameOver) {
            text("Game Over!\nYour speed was too high or fuel was too low.", width / 2, height / 2 - 50);
            resetButton.show();
            adjustedFallSpeed = 0.1;
        } else if (gameWon) {
            text("Congratulations!\nYou won!", width / 2, height / 2 - 50);
            resetButton.show();
            adjustedFallSpeed = 0.1;
        } else {
            textAlign(CENTER);
            fill(255, 255, 255);
            textSize(15);
            text("Hej! Welcome to the Lunar Lander!\nTake a shot and try to land with your rocket as slow as you can!", width / 2, height / 2 - 50);
            startButton.show();
            adjustedFallSpeed = 0.1;
        }
    }
}
 
// Function to start the game
function startGame() {
    gameStarted = true;
    startButton.hide();
}
 
// Creating terrain
function drawTerrain() {
    noStroke();
    fill(255, 255, 255);
    rect(0, 440, 500, 100);
    fill(220, 220, 220);
    ellipse(370, 460, 40, 20);
    ellipse(230, 470, 50, 20);
    ellipse(100, 465, 50, 20);
    // Landing space
    fill(220, 220, 220);
    line(290, 440, 290, 400);
    line(320, 440, 320, 400);
    // Stars
    fill(255, 255, 255);
    ellipse(30, 100, 3);
    ellipse(100, 150, 3);
    ellipse(50, 50, 2);
    ellipse(350, 90, 3);
    ellipse(240, 80, 2);
    ellipse(200, 50, 4);
    ellipse(370, 350, 4);
    ellipse(300, 400, 5);
    ellipse(220, 230, 3);
    ellipse(84, 330, 3);
    ellipse(400, 200, 4);
    ellipse(121, 250, 2);
    ellipse(23, 270, 4);
    ellipse(455, 66, 3);
}
 
function fallingSpeed() {
    fallAcceleration = fallAcceleration + 0.1;
}
 
// Create a rocket
function drawRocket() {
    push();
    // Get rocket position 
    translate(rocketX, rocketY);
    rotate(radians(rocketRotation));
    // Body
    fill(255, 255, 255);
    rect(0, 0, 20, 40);
    // Top
    fill(128, 0, 0);
    triangle(0, 0, 20, 0, 10, -30);
    // Window
    fill(176, 196, 222);
    ellipse(10, 10, 10);
    ellipse(10, 25, 10);
 
    // Flame when the UP or sides keys are pressed
    if (gameStarted && (keyIsDown(UP_ARROW) || keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW))) {
        drawFlame(10, 40, 15);
    }
    pop();
 
    if (gameStarted && !gameOver && !gameWon) {
        // Left or right movement when keys are pressed
    }
}
 
// Checking rocket position
 
function RocketMovement() {
    if (gameStarted && (keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW)) && rocketY > 1) {
        // Rocket movement up and fuel consumption 
        if (keyIsDown(UP_ARROW) && Fuel >= fuelConsumptionOnThrust) {
            rocketVelocity.y -= 0.05; // Adjust this value for the desired thrust strength
            Fuel -= fuelConsumptionOnThrust;
        }
    } else if (gameStarted) {
        // Gravity
        //the following 10 lines was adapted with https://chat.openai.com/
        rocketVelocity.y += 0.03; 
 
        // Update rocket position based on velocity
        rocketY += rocketVelocity.y;
 
        // Update speed measurement
        rocketSpeed = rocketVelocity.mag();
 
        if (rocketY < groundY - 80) {
            rocketY += 3 * adjustedFallSpeed;
        }
 
        if (rocketY >= groundY - 80) {
            if (rocketY > groundY - 80) {
                rocketY = groundY - 80;
            }
 
            // Check if the rocket landed successfully
            if (Fuel > 0 && rocketSpeed <= 3 && rocketY === groundY - 80) {
                gameWon = true;
            }
 
            if (rocketSpeed >= 3) {
                gameOver = true;
            }
        }
 
        if (Fuel <= 0) {
            gameOver = true;
        }
    }
}
 
function rocketSideMovement() {
    if (gameStarted) {
        // IF for right arrow
        if (keyIsDown(RIGHT_ARROW) && rocketX < width - 20) {
            rocketX += rocketSpeed;
            rocketRotation += rotationSpeed;
            Fuel -= fuelConsumptionOnThrust;
        } else if (keyIsDown(LEFT_ARROW) && rocketX > 0) {
            // IF for left arrow
            rocketX -= rocketSpeed;
            rocketRotation -= rotationSpeed;
            Fuel -= fuelConsumptionOnThrust;
        }
    }
}
 
// Checking collisions
function checkCollision() {
    if (rocketY + 80 >= groundY) {
        // Check if the rocket landed successfully
        if (rocketSpeed <= 3 && rocketRotation <= 30 && rocketRotation >= 0) {
            gameWon = true;
        } else {
            gameOver = true;
            rocketSpeed = 1;
            Fuel = 0;
        }
    }
}
// Creating rocket's flame
function drawFlame(x, y, size) {
    for (let i = 0; i < 5; i++) {
        let offsetX = random(-5, 5);
        let offsetY = random(-4, 5);
        fill(255, 69, 0);
        ellipse(x + offsetX, y + offsetY, size, size);
    }
}
 
// Resetting a game function
function resetGame() {
    gameOver = false;
    gameWon = false;
    rocketY = 0;
    rocketX = 200;
    fallAcceleration = 0.1;
    adjustedFallSpeed = 0;
    rocketSpeed = 0.1;
    rocketVelocity = createVector(0,0);
    rocketRotation = 180;
    gameStarted = false;
    Fuel = 1000;
    resetButton.hide();
}