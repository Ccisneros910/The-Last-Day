function Clue(game, name, image, xPos, yPos, message1){
	Phaser.Sprite.call(this, game, xPos, yPos, 0, 1);
	this.name = name;
	this.anchor.x = 0.5;
	this.anchor.y = 1;
	this.message1 = message1;
	game.physics.enable(this);
}

Clue.prototype = Object.create(Phaser.Sprite.prototype);
Clue.prototype.construct = Clue;

Clue.prototype.create = function(){
	
}
Clue.prototype.update = function(){

}
