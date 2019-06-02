function Door( game, x, y, image, frame, name, scaleX, scaleY){
	Phaser.Sprite.call(this, game, x, y, image);
	game.add.existing(this);
	game.physics.arcade.enable(this);
	this.anchor.x = 0.5;
	this.anchor.y = 1;
	this.scale.setTo(scaleX, scaleY);
	this.body.setSize(160, 330, 40, 40);
	// not using animations; just opening the door after a timer ends
	this.frame = frame;
	this.name = name;
	this.type = 'door';
}

Door.prototype = Object.create(Phaser.Sprite.prototype);
Door.prototype.construct = Door;

Door.prototype.create = function(){}

Door.prototype.update = function(){}