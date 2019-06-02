function Player(game, x, y, image){
	Phaser.Sprite.call(this, game, x, y, image, 0);
	game.add.existing(this);
	game.physics.arcade.enable(this);
	//add the animations
	// ?need to be done in main?
	this.animations.add('idle', [2, 3], 4, true);
	this.animations.add('moveLeft', [0, 1], 5, true);
	this.animations.add('moveRight', [4, 5], 5, true);
	this.scale.set(0.75, 0.75);
	// sprite adjustments and values
	this.body.collideWorldBounds = true;
	this.body.setSize(80, 120, 35, 15);
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.body.drag.x = 650;
	this.body.drag.y = 650;
	this.speed = 400;
	this.time = 0;
	// conditionals
	this.overType = '';
	this.currentFrame = false;
	this.lastFrame = false;
	this.moveable = true;
		//to start side animations
	this.startMoving = false;
	this.isMoving = false;
	this.controls = game.input.keyboard.createCursorKeys();
	this.overDoor = false;
	this.currentDoor = '';
	this.lastRoom = '';
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.construct = Player;

Player.prototype.create = function(){
}

Player.prototype.update = function(){
	this.time++;
 	if(this.controls.up.isDown){
		this.body.velocity.y = -this.speed;
	}else if(this.controls.down.isDown){
		this.body.velocity.y = this.speed;
	}
	if(this.controls.left.isDown){
		this.startMovement();
		this.body.velocity.x = -this.speed;
	}else if(this.controls.right.isDown){
		this.startMovement();
		this.body.velocity.x = this.speed;
	}
	if(this.body.velocity.x == 0){
		this.stopMovement();
	}
	// console.log(this.body.velocity.x);
	// if(this.overDoor == false){
	// 	this.currentDoor = '';
	// }
}

Player.prototype.startMovement = function(){
	this.startMoving = true;
	if(this.startMoving == true && this.isMoving == false){
		this.isMoving = false;
		if(player.body.velocity.x < 0){
			this.animations.play('moveLeft');
		}else if(player.body.velocity.x > 0){
			this.animations.play('moveRight');
		}
	}
}
Player.prototype.stopMovement = function(){
	this.startMoving = false;
	this.isMoving = false;
	this.animations.play('idle');
}