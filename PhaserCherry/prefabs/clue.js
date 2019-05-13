function Clue(game, image, xPos, yPos){
	Phaser.Sprite.call(this, game, xPos, yPos, 0, 1);
	this.anchor.set(0.5);
	game.physics.enable(this);
}

Clue.prototype = Object.create(Phaser.Sprite.prototype);
Clue.prototype.construct = Clue;

Clue.prototype.create = function(){
	
}
Clue.prototype.update = function(){

}
