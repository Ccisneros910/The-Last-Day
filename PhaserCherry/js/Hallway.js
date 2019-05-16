var Hallway = {
	create: function(){
	console.log('in the hallway');
		this.RoomName = 'Hallway';
		game.camera.fade(0x000000, 0);
		background = game.add.sprite(0, 0, 'hallway');
		background.scale.setTo(1.3, 1); // not wide enough to fit screen
		doors = game.add.group();
		doors.enableBody = true;
		toSara = new Door(game, 370, 500, 'door', 1, 'DaughterRoom', 0.5);
		toKeith = new Door(game, 800, 500, 'door', 1, 'SonRoom', 0.5);
		// player must be drawn last to be above everything
		player = new Player(game, 200, 400, 'ghost');
		dialogueBox = game.add.sprite(100, 500, 'dBox');
		dialogueBox.alpha = 0;
		game.camera.flash(0x000000, 2000);
		// game.time.events.add(Phaser.Timer.SECOND*10, openDoor, this);
	},
	update: function(){
 		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
 			toHallway.frame = 1;
 		}
 		game.physics.arcade.overlap(player, toSara, goToSara, null, this);
 		game.physics.arcade.overlap(player, toKeith, goToKeith, null, this);
	}
};
function goToSara(){
	// console.log('this function should not call!');
		game.camera.onFadeComplete.addOnce(RoomSara);
		game.camera.fade(0x000000, 1000);
}
function RoomSara(){
	game.state.start('DaughterRoom');
}
function goToKeith(){
	// console.log('this function should not call!');
		game.camera.onFadeComplete.addOnce(RoomKeith);
		game.camera.fade(0x000000, 1000);
}
function RoomKeith(){
	game.state.start('SonRoom');
}