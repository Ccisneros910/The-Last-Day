var photo;
var SonRoom = {
	create: function(){
		this.RoomName = 'Keith\'s Room';
		console.log('in Keith\'s room');
		game.camera.fade(0x000000, 0);
		background = game.add.sprite(0, 0, 'testR');
		toHallway = new Door(game, 300, 500, 'door', 1, 'Hallway', 0.5);
		// not using animations; just opening the door after a timer ends
		// player must be drawn last to be above everything
		player = new Player(game, 200, 400, 'ghost');
		dBox = game.add.sprite(100, 500, 'dBox');
		dBox.alpha = 0;
		game.camera.flash(0x000000, 2000);
	},
	update: function(){
 		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
 			toHallway.frame = 1;
 		}
 		game.physics.arcade.overlap(player, toHallway, fromKeith, null, this);
 		// game.physics.arcade.overlap(player, toKeith, goToKeith, null, this);
	}
};
//FUNCTIONS
//adding the word "start" into the function resulted in self-invocation
function fromKeith(){
	// console.log('this function should not call!');
	if(toHallway.frame == 1){
		game.camera.onFadeComplete.add(leaveKeith);
		game.camera.fade(0x000000, 1000);
	}
}
function leaveKeith(){
	game.state.start('Hallway');
}