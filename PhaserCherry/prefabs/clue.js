function Clue(game, key, frame, xPos, yPos){
	Phaser.Sprite.call(this, game, xPos, yPos, 0, 1);
	this.anchor.set(0.5);
	game.physics.enable(this);
}

Clue.prototype = Objec.create(Phaser.Sprite.prototype);
Snow.prototype.construct = Clue;

Snow.prototype.create = function(){

}
Snow.prototype.update = function(){

}
