var game = new Phaser.Game(600, 800, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var platforms;
var player;
var cursors;
var enemy;
var scoreText;
var diamond;
var enemies;
var gameOverWin;
var gameOverMessage;
var starsRemaining;
var starGet;
var background;
var shipName;
var enemy;
var enemyCount = 2;
var spawnEnemies = true;
var spawnTime = 5000;
var canFire = true;
//MAIN MENU STATE
var MainMenu = function(game){};
MainMenu.prototype = {
	init: function(){
		this.score = 0;
	},
	preload: function(){
		console.log('MainMenu: preload');
		//Images
		/*
		game.load.image('happy face', 'assets/img/happy face s.png');
		game.load.image('sad face', 'assets/img/sad face s.png');
		game.load.image('bullet', 'assets/img/bullet.png');
		game.load.image('duck', 'assets/img/duck.png');
		game.load.image('enemy', 'assets/img/enemy.png');
		game.load.image('hamster', 'assets/img/hamster.png');
		game.load.image('ship', 'assets/img/ship.png');
		*/
		game.load.image('bg', 'assets/img/space.jpg');
		game.load.path = 'assets/img/';
		//https://github.com/photonstorm/phaser-examples/blob/master/examples/loader/load%20texture%20atlas.js
		// details on how to use texture atlases
		game.load.atlas('atlas', 'spritesheet.png', 'sprites.json');
		game.load.atlas('animations', 'animations.png', 'animations.json');
		//enemy = game.add.sprite('flying', Phaser.Animation.generateFrameNames('flying', 0, 4), 5, true)
		//Phaser.Animation.generateFrameN
		//game.load.audio('collect', 'assets/audio/beep 8 (403005__inspectorj__ui-confirmation-alert-a4).wav');
	},
	create: function() {
		console.log('MainMenu: create');
		game.stage.backgroundColor = "#4968ff";
		var gameText = game.add.text(20, 10, 'The Sky is Falling!!!', {fontSize: '32px', fill: '#ffffff'});
		gameText = game.add.text(20, 50, 'Press SPACEBAR to start', {fontSize: '16px', fill: '#ffffff'});
	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('Play', true, false, this.score);
		}
	}
}
//PLAY STATE
var Play = function(game){
	this.snow;
};
Play.prototype = {
	init: function(newScore){
		this.score = newScore;
	},
	preload: function() {
		console.log('Play: preload');
	},
	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.stage.backgroundColor = '#000000';
		// HOW TO tilesprites
		// https://phaser.io/examples/v2/tile-sprites/tiling-sprite
		// http://www.html5gamedevs.com/topic/3218-continuously-scrolling-background/
		background = game.add.tileSprite(0, 0, 600, 800, 'bg');
		background.alpha = 0.4;
		scoreText = game.add.text(10, 10, 'Score: 0', {fontSize: '32px', fill: '#ffffff'});
		player = game.add.sprite(275, 700, 'atlas', 'ship');
		game.physics.arcade.enable(player);
		// don't let player go off-screen
		player.body.collideWorldBounds = true;
		enemies = game.add.group();
		enemies.enableBody = true;
		bullets = game.add.group();
		bullets.enableBody = true;
		/*
		starGet = game.add.audio('collect');
		// enable physics
		game.physics.startSystem(Phaser.Physics.ARCADE);
		//END platform creation
		// Make character
		player = game.add.sprite(32, game.world.height - 275, 'dude');
		game.physics.arcade.enable(player);
		// Add effects of gravity onto the player
		player.body.bounce.y = 0.3;
		player.body.gravity.y = 150;
		player.body.collideWorldBounds = true;
		// Reserve the animation sprites for later
		player.animations.add('left', [0, 1, 2, 3], 10, true);
		player.animations.add('right', [5, 6, 7, 8], 10, true);
		//create group for stars
		stars = game.add.group();
		stars.enableBody = true;
		// create stars in the game
		starsRemaining = 9;
		for(var i = 0; i < 9; i++){
			var star = stars.create(i* 70, 0, 'star');
			star.body.gravity.y = 200 + Math.random() * 20;
			star.body.bounce.y = 0.7 + Math.random() * 0.2;
		}
		//Create and randomize location of diamond
		diamond = game.add.sprite(300 + Math.random() * 100, 200 + Math.random() * 200, 'diamond');
		game.physics.arcade.enable(diamond); //allows for collision detection with other objects
		diamond.body.immovable = true;
		//create baddies
		enemies = game.add.group();
		enemies.enableBody = true;
		game.physics.arcade.enable(enemies);
		//https://stackoverflow.com/questions/30090258/how-to-add-animation-to-a-group-sprite-in-phaser-js/30204433
		//for the purpose of adding the right and left facing animations
		//enemies.callAll('animations.add', 'animations','faceLeft', [0, 1], 30, true);
		//enemies.callAll('animations.add', 'animations','faceRight', [2, 3], 30, true);
		//FIRST doggo
		var doge = enemies.create(100, 317, 'doggo');
		//add animations to each individual sprite
		doge.animations.add('faceLeft', [0, 1], 30, true);
		doge.animations.play('faceLeft');
		//SECOND doggo
		var doge = enemies.create(460, 118, 'doggo');
		doge.animations.add('faceRight',[3, 2], 15, true);
		doge.animations.play('faceRight');
		//display score for player
		scoreText = game.add.text(10, 10, 'Score: 0', {fontSize: '32px', file:'#0000'});
		// DON'T need to put each leaf into a group because
		// as a prefab they share certain properites
		/*
		var leafStorm = game.add.group();
		leafStorm.enableBody = true;
		game.physics.arcade.enable(leafStorm);
		*/
		//MAKE snow!
		/*
		for(var i = 0; i < 100; i++){
			this.snow = new Snow(game, 'leaf',0, .05, 90);
			this.snow.alpha = 0.3;
			game.physics.arcade.enable(this.snow);
			game.add.existing(this.snow);
		}
		*/
		setTimeout(spawnTarget, spawnTime, enemies);
		setInterval(updateSpawnRate, 10000);
	},
	update: function() {
		// run game loop
		/*
		var hitPlatform = game.physics.arcade.collide(player, platforms);
		*/
		//character controls
		cursors = game.input.keyboard.createCursorKeys();
		if(cursors.left.isDown){
			player.body.velocity.x = -400;
		}else if(cursors.right.isDown){
			player.body.velocity.x = 400;
		}else{
			player.body.velocity.x = 0;
		}
		if(cursors.up.isDown){ // while the player is not moving
			player.body.velocity.y = -200;
		}else if(cursors.down.isDown){
			player.body.velocity.y = 200;
		}else{
			player.body.velocity.y = 0;
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) & canFire){
			var shot = bullets.create(player.position.x + 15, player.position.y - 15, 'animations');
			shot.animations.add('shoot', [5, 6], 4, true);
			shot.animations.play('shoot');
			game.physics.arcade.enable(shot);
			shot.body.velocity.y = -500;
			canFire = false;
			setTimeout(holdFire, 500);
		}
		background.tilePosition.y += 1;
		// END character controls
		// check for collision between enemy ships and player
		game.physics.arcade.overlap(player, enemies, hitPlayer, null, this);
		game.physics.arcade.overlap(bullets, enemies, hitEnemies, null, this);
		/*
		game.physics.arcade.collide(stars,platforms);
		*/
		//game.physics.arcade.overlap(player, enemies, collideWithEnemy, null, this);
	}
}

var GameOver = function(game){};
GameOver.prototype = {
	init: function(score){
		console.log('scorepassed:' + score);
		this.score = score;
	},
	preload: function(){
		console.log('GameOver: preload');
	},
	create: function() {
		console.log('GameOver: create');
		//game.stage.backgroundColor = "#4968ff";
		if(gameOverWin == false){
			gameOverMessage = game.add.text(10, 50, 'Oh no! The doggo bit you!', {fontSize: '32px', fill: '#ffffff'});
			gameOverMessage = game.add.text(10, 85, 'Final score: ' + this.score, {fontSize: '32px', fill: '#ffffff'});
		}else{
			gameOverMessage = game.add.text(10, 50, 'Congrats! You got all the stars!', {fontSize: '32px', fill: '#ffffff'});
			gameOverMessage = game.add.text(10, 85, 'Final score: ' + this.score, {fontSize: '32px', fill: '#ffffff'});
		}
		gameText = game.add.text(10, 130, 'Press SPACEBAR to return to the main menu.', {fontSize: '16px', fill: '#ffffff'});
	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('Play', true, false, 0);
		}
	}
}

// moving this above the functions allowed the states to cycle properly
//Game State creation and management
game.state.add('MainMenu', MainMenu);
game.state.add('Play', Play);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');

function preload(){}

function create(){}

function update(){}

// FUNCTIONS
function collectStar(player, star){
	star.kill();
	starGet.play();
	starsRemaining = starsRemaining - 1;
	this.score+=10;
	scoreText.text = 'Score: ' + this.score;
}
function hitEnemies(bullet, enemy){
	bullet.kill();
	enemy.kill();
	this.score+=25;
	scoreText.text = 'Score: ' + this.score;
}
function hitPlayer(player, enemies){
	//scoreText.alpha = 0;
	//game.paused = true;
	game.state.start('GameOver', true, false, this.score);
}
function holdFire(){
	canFire = true;
}
function spawnTarget(enemies){
	if(spawnEnemies){
		for(var i = 0; i < enemyCount; i++){
			var e = enemies.create(game.rnd.integerInRange(0, 560), -30, 'animations');
			// https://phaser.io/examples/v2/animation/starling-atlas
			e.animations.add('fly', [0, 1, 2, 3, 4], 4, true);
			e.animations.play('fly');
			game.physics.arcade.enable(e);
			e.enableBody = true;
			e.body.velocity.y = 400;
		}
	}
	setTimeout(spawnTarget, spawnTime, enemies);
}

function updateSpawnRate(){
	if(spawnTime > 2000){
		spawnTime -= 500;
	}
	if(enemyCount < 8){
		enemyCount += 1;
	}
}

function collideWithEnemy(p, e){
	e.kill();
}