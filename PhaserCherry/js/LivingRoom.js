var LivingRoom = {
	create: function(){
		this.RoomName = 'Living Room'
		console.log('in the living room');
		game.camera.fade(0x000000, 0);
		background = game.add.sprite(0, 0, 'livingR');

		toHallway = new Door(game, 440, 600, 'door', 1, 'Hallway', 2, 1);
		toKitchen = new Door(game, 1200, 650, 'door', 1, 'Kitchen', 0.5, 1.5);
		player = new Player(game, 200, 400, 'ghost');
		player.alpha = 0.8;
		// the spacebar will follow the player around
		spacebarP = player.addChild(game.add.sprite(10, -130, 'space bar'));
		spacebarP.scale.set(0.15, 0.15);
		spacebarP.animations.add('dance');
		spacebarP.alpha = 0.8;
		spacebarP.anchor.x = 0.5;
		spacebarP.anchor.y = 0.5;
		// player.animations.add('spin', [0, 1, 2, 3], 16, true);
		// player.animations.play('spin');
		// Box = game.add.sprite(200, 800, 'dialogue');
		game.camera.flash(0x000000, 2000);
	},
	update: function(){
	 	player.time++;
	 	if(cutscenePlaying){
	 		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && player.time >50){
	 			if(nextEvent!=null){
	 				// GregCutscene();
	 			}else if(nextEvent == null){
	 				resetDBox();
	 				cutscenePlaying = false;
	 			}
	 		}
	 	}else if(!cutscenePlaying){
	 		// console.log("no cutscene");
			if(game.physics.arcade.overlap(player, toHallway, overDoor, null, this)){ 		
	 			// to leave the room
	 		}else if(game.physics.arcade.overlap(player, toKitchen, overDoor, null, this)){ 		
	 			// to leave the room
	 		}else{
	 			clearPlayer();
				stopSpacebar();
	 		}
	 	}
	}
};