var Kitchen = {
	create: function(){
		game.camera.fade(0x000000, 0);
		background = game.add.sprite(0, 0, 'kitchen');
		toLivingRoom = new Door(game, 130, 720, 'door', 1, 'LivingRoom', 1.3, 2.2);
		toLivingRoom.alpha = 0;
		// KEITH INCOMING
		if(KeithScene == 0){
			Keith = game.add.sprite(500, 630, 'fullBody&Walk');
		}else if(KeithScene == 1||KeithScene == 2){
			Keith = game.add.sprite(900, 630, 'fullBody&Walk');
		}else if(KeithScene == 2){
			Keith = game.add.sprite(600, 630, 'fullBody&Walk');
		}else if(KeithScene >= 3){
			Keith = game.add.sprite(350, 630, 'fullBody&Walk');
		}
		// Make sure he's in the room
		if(Keith != null){
			Keith.scale.set(0.8, 0.8)
			Keith.anchor.x = 0.5;
			Keith.anchor.y = 1;
			Keith.animations.add('stand', ['keithWalk0'], 0, false);
			Keith.animations.add('walk', ['keithWalk1', 'keithWalk2', 'keithWalk3', 'keithWalk4'], 6, true);
			Keith.animations.play('stand');
		}
		console.log("making clues");
		// CLUES
		clues = game.add.group();
		clues.enableBody = true;
		// individual clue assets
		if(KeithScene >= 2){
			if(KeithScene == 3){
				cChefsHat = clues.create(450, 450, 'ChefsHat');
				cChefsHat.alpha = 0;
			}else if(KeithScene >= 4){
				cChefsHat = clues.create(600, 450, 'ChefsHat');
			}
			cChefsHat.scale.set(1.5, 1.5);
			cChefsHat.anchor.x = 0.5;
			cChefsHat.anchor.y = 1;
		}
		if(KeithScene < 2){
			cCookBook = clues.create(1200, 650, 'CookBook');
		}else{
			cCookBook = clues.create(1200, 475, 'CookBook');
		}
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
		arrowKeys = player.addChild(game.add.sprite(0, -160, 'arrowKeys'));
		arrowKeys.scale.set(1, 1);
		arrowKeys.animations.add('dance');
		arrowKeys.alpha = 0;
		arrowKeys.anchor.x = 0.5;
		arrowKeys.anchor.y = 0.5;

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
		GhostEmotes = dBox.addChild(game.add.sprite(100, 100, 'emotes'));
		GhostEmotes.scale.set(1, 1);
		GhostEmotes.anchor.x = 0.5;
		GhostEmotes.anchor.y = 0.5;
		GhostEmotes.animations.add('neutral', ['player0'], 0, false);
		GhostEmotes.animations.add('cry', ['player1', 'player2'], 3, true);
		GhostEmotes.animations.add('surprise', ['player3', 'player4'], 3, true);
		GhostEmotes.animations.add('bittersweet', ['player5', 'player6'], 3, true);
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
		KeithEmotes.animations.add('confused', ['keith6', 'keith7'], 3, true);
		KeithEmotes.alpha = 0;

		messageBG = game.add.sprite(0, 0, 'message');
		messageBG.alpha = 0;
		// message text
		message = game.add.text(game.world.centerX, game.world.centerY, '', messageStyle);
		message.anchor.x = 0.5
		message.alpha = 0;
		console.log("prepping message sequence")
		t01 = game.add.tween(messageBG).to({alpha : 1}, 1000, Phaser.Easing.Linear.None, false);
		t02 = game.add.tween(message).to({alpha : 1}, 1500, Phaser.Easing.Linear.None);
		t03 = game.add.tween(message).to({alpha : 1}, 3000, Phaser.Easing.Linear.None);
		t04 = game.add.tween(message).to({alpha : 0}, 1500, Phaser.Easing.Linear.None);
		t05 = game.add.tween(messageBG).to({alpha : 0}, 3000, Phaser.Easing.Linear.None);
		t01.chain(t02);
		t02.chain(t03);
		t03.chain(t04);
		t04.chain(t05);

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
	 				player.speed = 0;
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
	 					console.log("KeithScene: " + KeithScene);
	 					if(KeithScene == 4){
	 						ScenesLeft--;
	 						playMessage();
	 					}else{
	 						playArrowKeys();
	 						player.speed = 400;
	 					}
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
	 					if(KeithScene == 4){
	 						ScenesLeft--;
	 						playMessage();
	 					}else{
	 						playArrowKeys();
	 						player.speed = 400;
	 					}
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
	 		if(player.body.velocity.x != 0 || player.body.velocity.y != 0){
	 			stopArrowKeys();
	 		}

	 	}
	}
// 	render: function(){
// 		game.debug.body(toHallway);
// 		game.debug.body(player);
// 		game.debug.body(photo);
// 	}
};