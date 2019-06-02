var Hallway = {
	create: function(){
	console.log('in the hallway');
		game.camera.fade(0x000000, 0);
		background = game.add.sprite(0, 0, 'hallway');
		// background.scale.setTo(1, 1); // not wide enough to fit screen
		doors = game.add.group();
		doors.enableBody = true;
		toMaster = new Door(game, 150, 600, 'door', 1, 'MasterRoom', 1, 0.3);
		toMaster.frame = 1;
		toSara = new Door(game, 370, 500, 'door', 1, 'DaughterRoom', 0.5, 0.5);
		toSara.frame = 1;
		toKeith = new Door(game, 800, 500, 'door', 1, 'SonRoom', 0.5, 0.5);
		toKeith.frame = 1;
		toLivingRoom = new Door(game, 1000, 700, 'door', 1, 'LivingRoom', 1.8, 0.4);
		toLivingRoom.frame = 1;
		toLivingRoom.alpha = 1;
		// toLivingRoom.alpha = 0;
		// player must be drawn last to be above everything
		if(currentRoom == "MasterRoom"){
			playerX = 150;
			playerY = 400;
		}else if(currentRoom == "DaughterRoom"){
			playerX = 450;
			playerY = 400;
		}else if(currentRoom == "SonRoom"){
			playerX = 850;
			playerY = 400;
		}else if(currentRoom == "LivingRoom"){
			playerX = 1000;
			playerY = 450;
		}
		console.log("playerX: " + playerX);
		console.log("playerY: " + playerY);
		player = new Player(game, playerX, playerY, 'ghost');
		player.alpha = 0.9;
		// the spacebar will follow the player around
		spacebarP = player.addChild(game.add.sprite(10, -130, 'space bar'));
		spacebarP.scale.set(0.15, 0.15);
		spacebarP.animations.add('dance');
		spacebarP.alpha = 0.8;
		spacebarP.anchor.x = 0.5;
		spacebarP.anchor.y = 0.5;
		dialogueBox = game.add.sprite(100, 500, 'dBox');
		dialogueBox.alpha = 0;
		game.camera.flash(0x000000, 2000);
		cutscenePlaying = false;
		currentRoom = 'Hallway';
		// game.time.events.add(Phaser.Timer.SECOND*10, openDoor, this);
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
			if(game.physics.arcade.overlap(player, toMaster, overDoor, null, this)){ 		

			}else if(game.physics.arcade.overlap(player, toSara, overDoor, null, this)){ 		
	 			// to leave the room
	 		}else if(game.physics.arcade.overlap(player, toKeith, overDoor, null, this)){ 		
	 			// to leave the room
	 		}else if(game.physics.arcade.overlap(player, toLivingRoom, overDoor, null, this)){ 		
	 			// to leave the room
	 		}
	 		else{
	 			clearPlayer();
				stopSpacebar();
	 		}
	 	}
	}
};
