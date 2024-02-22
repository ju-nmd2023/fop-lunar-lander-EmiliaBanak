//Rocket setup
let rocketY = 0;
let rocketX = 200;
let rocketSpeed = 20/100; // Speed of 10 units per second
let rocketFallingSpeed = 0;

//Rocket motion
let rocketSpeedCaption = 1000;
let rocketRotation = 180;
let rotationSpeed = 2;
let fallAcceleration = 1;

//Ground coordinants for colision
let groundY = 480;

//Buttons
let startButton;
let resetButton;

//Game parts
let gameStarted = false;
let gameOver = false;
let gameWon = false; 

//Fuel
let Fuel = 500;
let fuelConsumptionOnThrust = 3;

//????
let breakThreshold = 2;

//Creating canvas
function Canvas(){
    createCanvas(500, 500);
}

//Creating start button
startButton = createButton('Start Game');
startButton.position(width / 2 - 80, height / 2);
startButton.mousePressed(startGame);

//Creating reset button
resetButton = createButton('Reset');
resetButton.position(width / 2 - 80, height / 2 + 50);
resetButton.mousePressed(resetGame);
resetButton.hide();



//Show speed of rocket, speed not changing
function drawSpeed() {
    fill(255, 255, 255);
    textSize(20);
    text("Speed: " + rocketSpeed+'km/h', width - 120, 30);
}

//Show Fuel that is left, stops at 0
function drawFuel() {
    fill(255, 255, 255);
    textSize(20);
    text("Fuel: " + Fuel.toFixed(0), width - 130, 60);
}


function draw() {
    background(0,0,41);
    if (gameStarted && !gameOver && !gameWon) {
        RocketMovement();
        checkCollision();
        drawRocket();
        drawTerrain();
        drawSpeed();
        drawFuel();
    } else {
        //reseting message when game is lost
        if (gameOver) {
            text("Game Over!\nYour speed was too high or fuel was too low.", width / 2, height / 2 - 50);
            resetButton.show();
            fallAcceleration = 1;
        //reseting message when game is won
        } else if (gameWon) {
            text("Congratulations!\nYou won!", width / 2, height / 2 - 50);
            resetButton.show();
            fallAcceleration = 1;
        } else {
            textAlign(CENTER);
            fill(255, 255, 255);
            textSize(15);
            text("Hej! Welcome to the Lunar Lander!\nTake a shot and try to land with your rocket as slow as you can!", width / 2, height / 2 - 50);
            startButton.show();
            fallAcceleration = 1;
        }
    }
}

//Funtion to start the game
function startGame() {
    gameStarted = true;
    startButton.hide();
}

//Creating terrain
function drawTerrain() {
    noStroke();
    fill(255,255,255);
    rect(0,440,500,100);
    fill(220,220,220);
    ellipse(370,460,40,20);
    ellipse(230,470,50,20);
    ellipse(100,465,50,20);
    //landing space
    fill(220,220,220);
    line(290,440,290,400);
    line(320,440,320,400);
    //stars
    fill(255,255, 255);
    ellipse(30,100, 3);
    ellipse(100,150, 3);
    ellipse(50,50, 2);
    ellipse(350, 90, 3);
    ellipse(240, 80, 2);
    ellipse(200, 50, 4);
    ellipse(370, 350, 4);
    ellipse(300, 400, 5);
    ellipse(220,230, 3);
    ellipse(84,330, 3);
    ellipse(400, 200,4);
    ellipse(121,250, 2);
    ellipse(23,270,4);
    ellipse(455,66, 3);
}

function fallingSpeed(){
    fallAcceleration = fallAcceleration + 0.1;
}


//Create a rocket
function drawRocket() {
    push();
    //Get rocket posistion 
    translate(rocketX, rocketY);
    rotate(radians(rocketRotation));
    // Body
    fill(255,255,255);
    rect(0, 0, 20,40);
    // Top
    fill(128, 0,0);
    triangle(0,0,20,0,10, -30);
    // Window
    fill(176,196,222);
    ellipse(10,10,10);
    ellipse(10,25,10);

    // flame when the UP or sides keys is pressed on
    if (gameStarted && (keyIsDown(UP_ARROW) || keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW))) {
        drawFlame(10, 40, 15);
    }
    pop();

    if (gameStarted && !gameOver && !gameWon) {
        //left or right movement when keys are pressed
        if (keyIsDown(RIGHT_ARROW) && rocketX < width - 20) {
            rocketX += rocketSpeed;
            rocketRotation += rotationSpeed;
            Fuel -= fuelConsumptionOnThrust;
        }
        if (keyIsDown(LEFT_ARROW) && rocketX > 0) {
            rocketX -= rocketSpeed;
            rocketRotation -= rotationSpeed;
            Fuel -= fuelConsumptionOnThrust;
        }
    }
}

//Checking rocket posistion
function RocketMovement() {
    if (gameStarted && (keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW)) && rocketY > 1) {
        // Rocket movement up and fuel consumption 
        if (keyIsDown(UP_ARROW) && Fuel >= fuelConsumptionOnThrust) {
            rocketY -= 4 * rocketSpeed;
            Fuel -= fuelConsumptionOnThrust;
        }
    }       //Falling speed
            else if (gameStarted) {
                let adjustedFallSpeed = 0.4 * fallAcceleration;

        if (rocketY < groundY - 80) {
            rocketY += 3 * adjustedFallSpeed;
            setInterval(fallingSpeed, 2000);
        } 

        if (rocketY >= groundY - 80) {
            if (rocketY > groundY - 80) {
                rocketY = groundY - 80;
            }

            if (rocketSpeed >= breakThreshold) {
                gameOver = true;
            }

            // Check if the rocket landed successfully
            if (Fuel > 0 && rocketY === groundY - 80 && rocketRotation <20)  {
                gameWon = true;
            }
        }
        if (Fuel <= 0) {
            gameOver = true;
        }
    }
}

//Cheking collisions
function checkCollision() {
    if (rocketY + 80 >= groundY) {
        gameOver = true;
        rocketSpeed = 1; 
        Fuel = 0;
        
    }
}

//Creating rocket's flame
function drawFlame(x, y, size) {
    for (let i = 0; i < 5; i++) {
        let offsetX = random(-5, 5);
        let offsetY = random(-4, 5);
        fill(255, 69, 0);
        ellipse(x + offsetX, y + offsetY, size, size);
    }
}

//Reseting a game function, CHECK IT to make it more simple
function resetGame() {
    gameOver = false;
    gameWon = false;
    rocketY = 0;
    rocketX = 200;
    rocketSpeed = 0.01; 
    rocketRotation = 180;
    gameStarted = false;
    Fuel = 500;
    resetButton.hide();
    
}

