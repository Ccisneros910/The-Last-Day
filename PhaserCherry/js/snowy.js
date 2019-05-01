function Snow(game, key, frame, scale, rotation){
	Phaser.Sprite.call(this, game, game.rnd.integerInRange(5, game.width-5),
		game.rnd.integerInRange(5, game.height-5), key, frame);
	// add properties
	this.anchor.set(0.5);
	this.scale.x = scale;
	this.scale.y = scale;
	this.rotation = rotation;
	//this.body.alpha = 0.4;
	// horizontal movement speed
	this.horizontalSpeed = game.rnd.integerInRange(0.5, 2);
	this.verticalSpeed = game.rnd.integerInRange(1, 3);

	game.physics.enable(this);
	//this.body.collideWorldBounds = true;
	this.body.angularVelocity = game.rnd.integerInRange(-180, 360);
}

Snow.prototype = Object.create(Phaser.Sprite.prototype);
Snow.prototype.construct = Snow;

Snow.prototype.create = function(){
	//this.body.gravity.y = game.rnd.integerInRange(50, 100);
}
Snow.prototype.update = function(horizontalSpeed){
	if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
		this.body.angularVelocity += 5;
	}
	if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
		this.body.angularVelocity -= 5;
	}
	if(game.input.keyboard.justPressed(Phaser.Keyboard.R)){
		this.horizontalSpeed *= -1;
	}
	if(this.body.position.x > 625){
		this.body.position.x = -25;
	}	
	if(this.body.position.x < -25){
		this.body.position.x = 625;
	}
	if(this.body.position.y > 825){
		this.body.position.y = -25;
	}
	this.body.position.x += this.horizontalSpeed;
	this.body.position.y += this.verticalSpeed;
}