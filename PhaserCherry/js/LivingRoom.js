var LivingRoom = {
	create: function(){
		game.camera.fade(0x000000, 0);
		background = game.add.sprite(0, 0, 'livingR');
		if(KeithScene ==1){
			dialogue = JSON.parse(game.cache.getText('KeithScenes'));
		}
		// doorways
		toHallway = new Door(game, 500, 700, 'door', 1, 'Hallway', 2.5, 2);
		toHallway.alpha = 0;
		toKitchen = new Door(game, 1150, 705, 'door', 1, 'Kitchen', 1.5, 2.5);
		toKitchen.alpha = 0;
		if(currentRoom == "Hallway"){
			playerX = 250;
			playerY = 400;
		}else if(currentRoom == "Kitchen"){
			playerX = 1000;
			playerY = 350;
		}
		if(KeithScene < 3){
			clues = game.add.group();
			clues.enableBody = true;
			cChefsHat = clues.create(180, 570, 'ChefsHat');
			cChefsHat.anchor.x = 0.5;
			cChefsHat.anchor.y = 0.5;
			cChefsHat.scale.set(1.5, 1.5);
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
		dBox = game.add.sprite(100, 500, 'dBox');
		dBox.alpha = 0;
		dText = game.add.text(320, 520, '', dialogueStyle);
		// player.animations.add('spin', [0, 1, 2, 3], 16, true);
		// player.animations.play('spin');
		// Box = game.add.sprite(200, 800, 'dialogue');
		event = 0;
		cutscenePlaying = false;
		if(dialogue[KeithScene] != null){
			nextEvent = dialogue[KeithScene][event];
		}
		curentScene = KeithScene;
		game.camera.flash(0x000000, 2000);
		currentRoom = 'LivingRoom'
	},
	update: function(){
	 	player.time++;
	 	if(cutscenePlaying){
	 		// if there is another event
	 		if(currentEvent == null){
	 			// console.log("start of scene");
				if(nextEvent != null){
	 				CutscenePlay();
				}
	 		}else if(currentEvent != null){
	 			if(currentEvent.action == "tween" ){
	 				// console.log("tween running");
	 				if(tweenCheck.isRunning == false && nextEvent != null){
	 					// console.log("tween ended \n PLAYING NEXT EVENT");
	 					CutscenePlay();
	 				}else if(tweenCheck.isRunning == false && nextEvent == null){
	 					console.log("tween ended \n END OF SCENE");
	 					cutsceneOff();
	 					advanceCutscene();
	 					player.speed = 400;
	 				}
	 			}else if(currentEvent.action == "speak"){
	 				// console.log("dialog running");
	 				playSpacebar(player);
				 	if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && player.time >20 && nextEvent != null){
	 					// console.log("dialog ended \n PLAYING NEXT EVENT");
	 					resetDBox();
						CutscenePlay();
					}else if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && player.time >20 && nextEvent == null){
	 					console.log("dialog ended \n END OF SCENE");
						resetDBox();
	 					cutsceneOff();
	 					advanceCutscene();
	 					player.speed = 400;
					}
	 			}
	 		}
	 	} 
	 	// If no cutscene, allow the player to move freely
	 	else if(!cutscenePlaying){
	 		// console.log("no cutscene");
	 		if(game.physics.arcade.overlap(player, clues, clueFound, null, this)){
	 			// checks if player is overlapping with any clues
	 		}else if(game.physics.arcade.overlap(player, toHallway, overDoor, null, this)){ 		
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