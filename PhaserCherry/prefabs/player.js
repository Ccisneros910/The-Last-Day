function Player(game, x, y, image){
	Phaser.Sprite.call(this, game, x, y, image, 0);
	game.add.existing(this);
	game.physics.arcade.enable(this);
	this.body.collideWorldBounds = true;
	this.body.setSize(80, 120, 35, 15);
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.body.drag.x = 550;
	this.body.drag.y = 550;
	this.currentFrame = false;
	this.lastFrame = false;
	this.moveable = true;
	this.controls = game.input.keyboard.createCursorKeys();
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.construct = Player;

Player.prototype.create = function(){}

Player.prototype.update = function(){
 	if(this.controls.up.isDown){
		player.body.velocity.y = -300;
	}else if(this.controls.down.isDown){
		player.body.velocity.y = 300;
	}
	if(this.controls.left.isDown){
		player.body.velocity.x = -300;
	}else if(this.controls.right.isDown){
		player.body.velocity.x = 300;
	}
}
