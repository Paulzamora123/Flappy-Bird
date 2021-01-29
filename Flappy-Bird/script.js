let backgroundImage;
let birdImage;
let birdImageY;
let count;
let gameIsOver;
let speed;
let gravity;
let player;
let pipes = [];
let positionBird;
let gameStart;
let score;
let highScore;
let wingsNoise = {flap: "sfx_wing.mp3"};
let pointNoise = {point:"sfx_point.mp3"};
let deathNoise = {death: "sfx_die.mp3"};
let loaded = {};
let flapWing;
let die = 0;
let coinImage;
let goldCoinImage;
let totalCoins = 0;
let totalCoinsInLife = 0;
let image1;
let image2;
let char1Buy;
let char1Bought;
let char2Buy;
let char2Bought;
let backgroundNight;
let isChar1Selected = false;
let isChar2Selected = false;
let defaultMenu = false;
let displayShop = false;
let s1 = false;
let s2 = false;
let s3 = false;
let t1 = false;
let t2 = false;
let t3 = false;
let r1 = false;
let r2 = false;
let r3 = false;
function preload() {
	//loads the songs
	loaded.die = loadSound(deathNoise.death);
	loaded.flap = loadSound(wingsNoise.flap);
	loaded.point = loadSound(pointNoise.point);
}

function setup() {
	localStorage.setItem('now', totalCoins);
	localStorage.getItem('now', totalCoins);
	//sets the framerate to 60
	frameRate(60);
	score = 0;
	highScore = 0;
	window.canvas = createCanvas(600, 800);
	//sets up all of the images used in the game
	image1 = loadImage("https://art.pixilart.com/d4a1196e5c7c026.png");
	image2 = loadImage("https://art.pixilart.com/4d6c84af8361ae1.png");
	backgroundImage = loadImage("https://i.imgur.com/xCmQMXk.png");
	backgroundNight = loadImage("https://art.pixilart.com/76e6dae0d441d1f.png");
	birdImage = loadImage("https://art.pixilart.com/42a23b5dc16ad9b.png");
	coinImage = loadImage("https://art.pixilart.com/d61e0a832e214fa.png");
	goldCoinImage = loadImage("https://art.pixilart.com/fab9cc0bd73f3d3.png");
	
	count = 0;
	gameIsOver = false;
	speed = 5;
	gravity = 0.5;

	//creates a bird for the game
	player = new Bird(100, canvas.height / 2);
	//creates the first pipe in the game
	pipe = new TopPipeImplement();

	gamestart = false;
	flapWing = false;
	char1Bought = false;
	char2Bought = false;
}

function draw() {
	//will check if the player has over 25 score and will
	//show the night mode if true else will show
	//default background
	backgroundCheck();
	

	//will run these class functions if the game is started

	if (gameStart ) {
		player.update();
		pipe.update();
		player.air();
		player.ground();
		//player.rotate();
		
		pipe.offScreen();
		pipe.checkCollision();
		pipe.showCoins();
	}
	

	//will show the bird and the pipe
	pipe.show();
	player.show();
	
	//will check if there is a high score
	checkForHighScore();
	//this will run once the game is over
	if (gameIsOver === true) {

		//Code to indicate the user that the key r will reset
		//the game
		
		textOnScreen()
		displayShopNow();
		
	}

	//will check if the game is over
	checkDeath();
	if (!displayShop) {
		//displays coin count on the bottom left of the screen
		displayCoins();
		//displays the high score 
		displayHighScore();
		//displays the current score
		displayScore();
	}
	
}

function shopItems() {
	//This is the item shop 
		if(char1Bought === false) {
			text("Cost: 25 Coins", canvas.width / 2 - 85, canvas.height - 250);
			image(image1, canvas.width/3, canvas.height - 200, 200 , 150);
		} 
		else if (isChar1Selected === true) {
			text("Selected", canvas.width / 2 - 75, canvas.height - 250);
			image(image1, canvas.width/3, canvas.height - 200, 200 , 150);
		}
		else {
			text("Select", canvas.width / 2 - 75, canvas.height - 250);
			image(image1, canvas.width/3, canvas.height - 200, 200 , 150);
		}

		if(char2Bought === false) {
			text("Cost: 100 Coins", canvas.width  - 200, canvas.height - 250);
			image(image2, canvas.width - 200, canvas.height - 200, 200 , 150);
		}
		else if (isChar2Selected === true) {
			text("Selected", canvas.width  - 160, canvas.height - 250);
			image(image2, canvas.width - 200, canvas.height - 200, 200 , 150);
		}
		else {
			text("Select", canvas.width  - 150, canvas.height - 250);
			image(image2, canvas.width - 200, canvas.height - 200, 200 , 150);
		}
		
		noFill();
		noStroke();
		char1Buy = rect(canvas.width/3, canvas.height - 125, 200 , 150)
}
function textOnScreen() {
	stroke(25);
	fill(220,200,0)
	rect(canvas.width/8 , canvas.height/4, 450, 300)
		

	push();
	fill(0);
	textSize(30);
	text(`Total Score: ${score}`, canvas.width/ 4 + 50, canvas.height / 2 - 100);
	pop();


	push();
	fill(0);
	textSize(30);
	text(`High Score: ${highScore}`, canvas.width/ 4 + 50, canvas.height / 2 - 25);
	pop();


	noStroke();
	fill (255,240,0)
	rect(canvas.width / 4 - 30, canvas.height / 2 + 20, 120, 40)

	stroke(25);
	push();
	fill(0);
	textSize(30);
	text(`Restart`, canvas.width/ 4 - 20, canvas.height / 2 + 50);
	pop();

	noStroke();
	fill (255,240,0)
	rect(canvas.width / 2 + 60, canvas.height / 2 + 20, 100, 40)

	stroke(25);
	push();
	fill(0);
	textSize(30);
	text(`Shop`, canvas.width/ 2 + 70, canvas.height / 2 + 50);
	pop();

	fill(0);
	textSize(20);
	// text("Press R or the square on the screen to restart", canvas.width / 2 - 240, canvas.height / 2);
	defaultMenu = true;
	
}

function checkButtons() {
	if (mouseX > canvas.width / 4 - 30 && mouseX < canvas.width / 4 + 90 && mouseY > canvas.height / 2 + 20 && mouseY < canvas.height / 2 + 60) {
		gameStart = false;
		gameIsOver = false;
		player = new Bird(100, canvas.height / 2);
		pipe = new TopPipeImplement();
		background(backgroundImage);
		score = 0;
		count = 0;
		totalCoinsInLife = 0;
		defaultMenu = false;
	}
	if (mouseX > canvas.width / 2 + 60 && mouseX < canvas.width / 2 + 160 && mouseY > canvas.height / 2 + 20 && mouseY < canvas.height / 2 + 60) {
		displayShop = true;
		
	}
}

function displayShopNow() {
	if (displayShop) {
		background(69);
		textSize(25);
		text("Welcome to the Shop!", canvas.width / 2 - 110, canvas.height/4)
		shopItems();
	}
}
//this function will set the background to night or day
function backgroundCheck() {
	if (score < 25) {
		background(backgroundImage);
	}
	else if (score >= 25) {
		background(backgroundNight);
	}
}


//checks if the game is over and if true will play the
//death sound
function checkDeath() {
	if (gameIsOver === true && die === 1)
	{
		loaded.die.setVolume(0.01);
		loaded.die.play();
		die = 0;
	}
}

//checks if there is a high score
function checkForHighScore() {
	if (score > highScore) {
		highScore = score;
	}
}

//displays the current score
function displayScore() {
	push();
	fill(0);
	textSize(25);
	text(`Score: ${score}`, 10, 28);
	pop();
}

//displays the coin count the user is on
function displayCoins() {
	push();
	fill(0);
	textSize(25);
	text(`Coins: ${totalCoins}`, canvas.width - 150, 28);
	pop();
}

//displays the high score
function displayHighScore() {
	push();
	fill(0);
	textSize(25);
	text(`High Score: ${highScore}`, 200, 28);
	pop();
}

//if the mouse is pressed
function mousePressed() {
	//this will start the game if the game has not been 
	//started. It will play the flap sound. It also will
	//prompt the bird to move upwards
	if (gameIsOver === false) {
		loaded.flap.setVolume(0.01);
		loaded.flap.play();
		gameIsOver = false;
		gameStart = true;
		player.flap();
		flapWing = true;
	}


	if (gameIsOver && defaultMenu) {
		checkButtons();
	}
	//Shop items
	if (gameIsOver === true) {
		//For the hat bird
		if (mouseX > canvas.width/3 && mouseX < canvas.width/3 + 200 && mouseY > canvas.height - 125 && mouseY < canvas.height + 25 ) {
			if (totalCoins >= 25 && char1Bought === false) {
				birdImage = loadImage("https://art.pixilart.com/d4a1196e5c7c026.png");
				totalCoins -= 25;
				char1Bought = true;
				isChar1Selected = true;
				isChar2Selected = false;
			}
			else if (char1Bought === true)
			{
				isChar1Selected = true;
				isChar2Selected = false;
				birdImage = loadImage("https://art.pixilart.com/d4a1196e5c7c026.png");
			}
			
		}
		//For the crown bird
		if (mouseX > canvas.width - 200 && mouseX < canvas.width && mouseY > canvas.height - 100 && mouseY < canvas.height + 25 ) {
			if (totalCoins >= 100 && char2Bought === false) {
				birdImage = loadImage("https://art.pixilart.com/4d6c84af8361ae1.png");
				totalCoins-= 100;
				char2Bought = true;
				isChar2Selected = true;
				isChar1Selected = false;
			}
			else if (char2Bought === true)
			{
				isChar2Selected = true;
				isChar1Selected = false;
				birdImage = loadImage("https://art.pixilart.com/4d6c84af8361ae1.png");
			}
		}
	}
	
}


function keyTyped() {
	//If the space bar is clicked it will play the flap
	//sound. It will start the game if not done so
	//already. It also will move the bird
	if (gameIsOver === false) {
		switch (key) {
			case ' ':
				gameStart = true;
				player.flap();
				flapWing = true;
				loaded.flap.setVolume(0.01);
				loaded.flap.play();
				break;
		}
	}
	//If the game is over, if the r key is pressed, it will
	//reset the game
	switch (key) {
		case 'r':
			if (gameIsOver === true) {
				gameStart = false;
				gameIsOver = false;
				player = new Bird(100, canvas.height / 2);
				pipe = new TopPipeImplement();
				background(backgroundImage);
				score = 0;
				count = 0;
				totalCoinsInLife = 0;
				break;
			}	
	}
	

}

//This function just helps us present our game easier	



class Pipe {
	//Will take onTop and height, if you are initializing 
	//the top pipe make ontop true. height is a random
	//number from thetoppipeimplement class
	constructor(onTop, height) {
		//sets the height to TopPipeImplement's height value
		this.height = height;
		//sets the width of the pipes to 80
		this.width = 80;
		//makes it so the pipe spawns on the right side of the screen
		this.x = canvas.width;
		//sets the Pipe class onTop to the input boolean 
		this.onTop = onTop;
		//checks if the pipe initialized in ontop or not
		if (onTop) {
			//for the top pipe
			this.tY = 0;
			this.bY = this.height;
		}
		else {
			//for the bottom pipe
			this.tY = canvas.height - this.height;
			this.bY = canvas.height;
		}
	}

	show() {	
		//this displays the pipes
		fill(0, 200, 0);
		stroke(25);
		rect(this.x, this.tY, this.width, this.height);
		//displays an invisible square inbetween the pipes which will be utilized to increase the score if the bird collides with it
		noFill();
		noStroke();
		this.increaseScore = rect(this.x, this.height, this.width, pipe.gapBetweenPipes);
	}
	//once the bird dies the pipes will stop moving
	update() {
		if (!gameIsOver)
			this.x -= speed;
	}
	//once a pipe goes off screen, it will make a new pipe on the right side
	offScreen() {
		if (this.x <= 0 - this.x) {
			return true;
		}
	}
	checkCollision() {
		//will check if the bird has collided with a pipe 
		if (collideRectRect(this.x, this.tY, this.width, this.height, player.x - 55, player.y + 50, player.x - 20, 50)) {
			if(!gameIsOver) {
			die = 1;
			gameIsOver = true;
			player.x -= 1;
			}
		}
		//will check if the bird has gone inbetween the pipes
		if (collideRectRect(this.x, this.height, this.width, pipe.gapBetweenPipes, player.x - 55, player.y + 50, player.x - 20, 50)) {
			//will check if the game is over and if so won't run the code
			if (!gameIsOver) {
				count++;
				//will run until the count is equal to 2
				if (count < 2 && !gameIsOver) {
					//will play the point audio
					loaded.point.setVolume(0.01);
					loaded.point.play();


					//code for increasing score and declaring when to switch to gold coins
					if (totalCoinsInLife === 9) {
						totalCoins++;
						score++;
					}
					else if (totalCoinsInLife >= 10)
					{
						totalCoinsInLife++;
						totalCoins += 2;
						score++;
					}
					else {
						totalCoinsInLife++;
						totalCoins++;
						score++;
					}
					
				}
			}
		}
	}
	//this will check if the score is greater than 9 and will swap the image to the gold coin
	showCoins() {
		if (totalCoinsInLife < 10 && this.x >= 100) {
			this.image = image(coinImage, this.x, this.height + 60, this.width, 65);
		}
		else if (totalCoinsInLife >= 10 && this.x > 100) {
			this.goldImage = image(goldCoinImage, this.x, this.height + 60, this.width, 80);
		}
	}
}


class TopPipeImplement {
	constructor() {
		//the space inbetween the pipes
		this.gapBetweenPipes = 200;
		//sets the top pipe's height to a random variable 
		this.topHeight = floor(random(20, canvas.height - 100 - this.gapBetweenPipes));
		//sets the bottom pipe's height to the height of the canvas - the top pipe - the gap
		this.bottomHeight = canvas.height - this.topHeight - this.gapBetweenPipes;
		//creates an object called bottomPipe in the Pipe class  
		this.bottomPipe = new Pipe(false, this.bottomHeight);
		//creates an object called topPipe in the Pipe class
		this.topPipe = new Pipe(true, this.topHeight);
	}
	show() {
		//makes it so the bottom pipe shows up on the screen
		this.bottomPipe.show();
		//makes it so the top pipe shows up on the screen
		this.topPipe.show();
		
	}
	update() {
		//makes the bottom pipe move in the Pipe class
		this.bottomPipe.update();
		//makes the top pipe move in the Pipe class
		this.topPipe.update();
	}
	offScreen() {
		//checks if a pipe is off the left side of the screen and will make a new one 
		if (this.bottomPipe.x < 0 - 80) {
			pipe = new TopPipeImplement();
			count = 0;
			if (totalCoinsInLife === 9)
			{
				totalCoinsInLife++;
			}
		}
	}
	checkCollision() {
		//checks if the bird hit the bottom pipe
		this.bottomPipe.checkCollision();
		//checks if the bird hit the top pipe
		this.topPipe.checkCollision();
	}
	showCoins() {
		//checks if the score is atleast 9 to run the gold coin
		this.topPipe.showCoins();
	}
}



class Bird {
	constructor(x, y) {
		//sets x to the input variable
		this.x = x;
		//sets y to the input variable
		this.y = y;
		//sets the velocity of y to 0
		this.velY = 0;
		 
		
	}
	show() {
		noFill();
		noStroke();
		//makes an invisible rect behind the bird
		positionBird = rect(this.x - 55, this.y + 50, this.x - 20, 50);
		//draws the bird on the screen
		this.image = image(birdImage, this.x - 100, this.y, this.x + 50, 145);
	}
	update() {
		//moves the bird downwards 
		this.velY += gravity;
		this.y += this.velY;

	}
	flap() {
		//moves the bird upwards
		if (this.veoY < 0)
		{
			this.velY = 10;
		}
		this.velY -= 10;

	}
	ground() {
		//checks if the bird hit the ground 
		if (this.y > canvas.height - 110 && !gameIsOver ) {
			this.y = canvas.height - 110
			this.velY = canvas.height;
			gameIsOver = true;
			gameStart = false;
			die = 1;
		}
	}
	air() {
		//checks if the bird went too high
		if (this.y < 0 - 200)
		{
			gameIsOver = true;
			this.velY = 0;
			this.y = -100;
			die = 1;
		}
	}
}