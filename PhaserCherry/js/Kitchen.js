var Kitchen = {
	create: function(){
		game.camera.fade(0x000000, 0);
		background = game.add.sprite(0, 0, 'kitchen');
		toLivingRoom = new Door(game, 130, 720, 'door', 1, 'LivingRoom', 1.3, 2.2);
		toLivingRoom.alpha = 1;
		// KEITH INCOMING
		if(KeithScene == 0){
			Keith = game.add.sprite(500, 600, 'fullBody&Walk');
		}else if(KeithScene == 1||KeithScene == 2){
			Keith = game.add.sprite(900, 600, 'fullBody&Walk');
		}else if(KeithScene >= 3){
			Keith = game.add.sprite(350, 600, 'fullBody&Walk');
		}
		// Make sure he's in the room
		if(Keith != null){
			Keith.scale.set(0.8, 0.8)
			Keith.anchor.x = 0.5;
			Keith.anchor.y = 1;
			Keith.animations.add('stand', ['keithWalk0'], 0, false);
			Keith.animations.add('walk', ['keithWalk1', 'keithWalk2', 'keithWalk3', 'keithWalk4'], 3, true);
			Keith.animations.play('stand');
		}
		console.log("making clues");
		// CLUES
		clues = game.add.group();
		clues.enableBody = true;
		// individual clue assets
		if(KeithScene >= 2){
			if(KeithScene == 2){
				cChefsHat = clues.create(450, 450, 'ChefsHat');
				cChefsHat.alpha = 0;
			}else if(KeithScene >= 3){
				cChefsHat = clues.create(600, 450, 'ChefsHat');
			}
			cChefsHat.scale.set(1.5, 1.5);
			cChefsHat.anchor.x = 0.5;
			cChefsHat.anchor.y = 1;
		}
		cCookBook = clues.create(1050, 450, 'CookBook');
		cCookBook.scale.set(1.5, 1.5);
		cCookBook.anchor.x = 0.5;
		cCookBook.anchor.y = 1;
		// player must be drawn last to be above everything
		//make player
		console.log("making player");
		player = new Player(game, 300, 350, 'ghost');
		player.alpha = 0.8;
		// the spacebar will follow the player around
		spacebarP = player.addChild(game.add.sprite(10, -130, 'space bar'));
		spacebarP.scale.set(0.15, 0.15);
		spacebarP.animations.add('dance');
		spacebarP.alpha = 0.8;
		spacebarP.anchor.x = 0.5;
		spacebarP.anchor.y = 0.5;
		// DIALOG BOX
		console.log("making dialog box");
		dBox = game.add.sprite(100, 500, 'dBox');
		dBox.alpha = 0;
		dText = game.add.text(320, 520, '', dialogueStyle);
		dialogue = null;
		console.log("retrieving dialog");
		dialogue = JSON.parse(game.cache.getText('KeithScenes'));
		console.log("retrieved dialog");
		// emotions
		console.log("adding emotes");
		GhostEmotes = dBox.addChild(game.add.sprite(100, 100, 'GhostEmotions'));
		GhostEmotes.scale.set(1, 1);
		GhostEmotes.anchor.x = 0.5;
		GhostEmotes.anchor.y = 0.5;
		GhostEmotes.animations.add('neutral', [0], 0, false);
		GhostEmotes.animations.add('cry', [1, 2], 3, true);
		GhostEmotes.animations.add('surprise', [3, 4], 3, true);
		GhostEmotes.alpha = 0;
		//Greg emotions
		KeithEmotes = dBox.addChild(game.add.sprite(100, 100, 'emotes'));
		KeithEmotes.scale.set(1, 1);
		KeithEmotes.anchor.x = 0.5;
		KeithEmotes.anchor.y = 0.5;
		KeithEmotes.animations.add('neutral', ['keith0'], 0, false);
		KeithEmotes.animations.add('talk', ['keith0', 'keith1'], 3, true);
		KeithEmotes.animations.add('cry', ['keith2', 'keith3'], 3, true);
		KeithEmotes.animations.add('angry', ['keith4', 'keith5'], 3, true);
		KeithEmotes.alpha = 0;

		currentScene = KeithScene;
		cutscenePlaying = false;
		if(dialogue[KeithScene] != null){
			nextEvent = dialogue[KeithScene][event];
		}
		console.log("KeithScene: " + KeithScene);
		if(KeithScene == 0){
			game.camera.onFlashComplete.addOnce(cutsceneOn);
		}else if(KeithScene == 3 && hatHeld == true){
			hatHeld = false;
			game.camera.onFlashComplete.addOnce(cutsceneOn);
		}
		game.camera.flash(0x000000, 2000);
		currentRoom = 'Kitchen';
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
				// else{
				// 	cutscenePlaying = false;
				// 	console.log("no cutscenes left");
				// }
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

			}else if(game.physics.arcade.overlap(player, toLivingRoom, overDoor, null, this)){ 		
	 			// to leave the room
	 		}else{
	 			clearPlayer();
				stopSpacebar();
	 		}
	 	}
	}
// 	render: function(){
// 		game.debug.body(toHallway);
// 		game.debug.body(player);
// 		game.debug.body(photo);
// 	}
};