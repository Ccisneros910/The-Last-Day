var LivingRoom = {
	create: function(){
		game.camera.fade(0x000000, 0);
		background = game.add.sprite(0, 0, 'livingR');

		toHallway = new Door(game, 440, 600, 'door', 1, 'Hallway', 2, 1);
		toHallway.alpha = 0;
		toKitchen = new Door(game, 1200, 650, 'door', 1, 'Kitchen', 1, 1.5);
		toKitchen.alpha = 1;
		if(currentRoom == "Hallway"){
			playerX = 250;
			playerY = 400;
		}else if(currentRoom == "Kitchen"){
			playerX = 1000;
			playerY = 350;
		}
		player = new Player(game, playerX, playerY, 'ghost');
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
		if(KeithScene < 2){
			clues = game.add.group();
			cChefsHat = clues.create(200, 600, 'ChefsHat');
			cChefsHat.anchor.x = 0.5;
			cChefsHat.anchor.y = 0.5;
		}
		game.camera.flash(0x000000, 2000);
		currentRoom = 'LivingRoom'
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