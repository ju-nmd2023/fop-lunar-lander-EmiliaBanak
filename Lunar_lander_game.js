
let animateFlame = false;
let rocketY = 0;
let rocketX = 200; // Initial horizontal position of the rocket
let rocketSpeed = 0.5;
let fallAcceleration=0.5;
let groundY = 480;
let gameStarted = false;
let startButton;
let rocketRotation = 0; 
let rotationSpeed = 4;
function setup() {
    createCanvas(500, 500);

    startButton = createButton('START GAME');
    startButton.position(width / 2 - 80, height / 2);
    startButton.mousePressed(startGame);
}
function draw() {
    background(	0, 0, 41);
    if (gameStarted) {
        checkRocketPosition();
        drawRocket();
        drawTerrain();
    } else {
        textAlign(CENTER);
        fill(255,255,255);
        textSize(20);
        text("Try to fall down as slow as possible.", width / 2.5, height / 2 - 50);
    }
}
function startGame() {
    gameStarted = true;
    startButton.hide();
}
function drawTerrain() {
    noStroke();
    fill(255,255,255);
    rect(0, 440, 500, 100);
    fill(220,220,220);
    ellipse(370,460,40,20);
    ellipse(230,470,50,20);
    ellipse(100,465,50,20);
    //landing space
    fill(220,220,220);
    line(290,440,290,400);
    line(320,440,320,400);
    //stars
    fill(255,255,255);
    ellipse(30,100,3);
    ellipse(100,150,3);
    ellipse(50,50,2);
    ellipse(350,90,3);
    ellipse(240,80,2);
    ellipse(200,50,4);
    ellipse(370,350,4);
    ellipse(300,400,5);
    ellipse(220,230,3);
    ellipse(84,330,3);
    ellipse(400,200,4);
    ellipse(121,250,2);
    ellipse(23,270,4);
    ellipse(455,66,3);
}

function drawRocket() {
    push();
    translate(rocketX, rocketY); 
    rotate(radians(rocketRotation)); 

    // Body
    fill(255,255,255);
    rect(0, 0, 20, 40);

    // Top

    fill(128,0,0);
    triangle(0, 0, 20, 0, 10, -30);

    // Window
    fill(176, 196, 222);
    ellipse(10, 10, 10);
    ellipse(10, 25, 10);
    

    // flame when the UP key is pressed on and also start game function which will activate the next step.
    if (gameStarted && keyIsDown(UP_ARROW)) {
        drawFlame(10, 40, 15);
    }
    pop(); 

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
        let offsetY = random(-4, 5);
        fill(255,69,0);
        ellipse(x + offsetX, y + offsetY, size, size);
    }
}
