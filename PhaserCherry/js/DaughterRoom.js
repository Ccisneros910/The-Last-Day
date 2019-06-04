var DaughterRoom = {
	create: function(){
		game.camera.fade(0x000000, 0);
		background = game.add.sprite(0, 0, 'daughterR');
		toHallway = new Door(game, 200, 660, 'door', 1, 'Hallway', 0.7, 0.7);
		// player must be drawn last to be above everything
		clues = game.add.group();
		clues.enableBody = true;
		clue = clues.create(850, 320, 'PhotoWall');
		clue.scale.set(1.3, 1.3)
		clue = clues.create(400, 350, 'Camera');
		// make Sara
		Sara = game.add.sprite(1050, 500, 'Sara');
		// make player
		playerX = 380;
		playerY = 450;
		player = new Player(game, playerX, playerY, 'ghost');
		player.alpha = 0.8;
		console.log(player.x);
		// the spacebar will follow the player around
		spacebarP = player.addChild(game.add.sprite(10, -130, 'space bar'));
		spacebarP.scale.set(0.15, 0.15);
		spacebarP.animations.add('dance');
		spacebarP.alpha = 0.8;
		spacebarP.anchor.x = 0.5;
		spacebarP.anchor.y = 0.5;
		// DIALOG BOX
		dBox = game.add.sprite(100, 500, 'dBox');
		dBox.alpha = 0;
		dText = game.add.text(320, 520, '', dialogueStyle);
		dialogue = JSON.parse(game.cache.getText('SaraScenes'));
		event = 0;
		currentScene = SaraScene;
		currentEvent = null;
		nextEvent = dialogue[currentScene][event];

		//emotions
		GhostEmotes = dBox.addChild(game.add.sprite(100, 100, 'GhostEmotions'));
		GhostEmotes.scale.set(1, 1);
		GhostEmotes.anchor.x = 0.5;
		GhostEmotes.anchor.y = 0.5;
		GhostEmotes.animations.add('neutral', [0], 0, false);
		GhostEmotes.animations.add('cry', [1, 2], 3, true);
		GhostEmotes.animations.add('surprise', [3, 4], 3, true);
		GhostEmotes.alpha = 0;
		//Greg emotions
		SaraEmotes = dBox.addChild(game.add.sprite(100, 100, 'SaraEmotions'));
		SaraEmotes.scale.set(1, 1);
		SaraEmotes.anchor.x = 0.5;
		SaraEmotes.anchor.y = 0.5;
		SaraEmotes.animations.add('neutral', [0], 0, false);
		SaraEmotes.animations.add('talk', [0, 1], 3, true);
		SaraEmotes.animations.add('cry', [2, 3], 3, true);
		SaraEmotes.alpha = 0;

		console.log("Sara Scene: " + SaraScene);
		console.log("current Scene: " + currentScene);
		cutscenePlaying = false;
		currentRoom = 'DaughterRoom';
		game.camera.flash(0x000000, 2000);
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
	 					// console.log("tween ended \n END OF SCENE");
	 					cutsceneOff();
	 					advanceCutscene();
	 				}
	 			}else if(currentEvent.action == "speak"){
	 				// console.log("dialog running");
	 				playSpacebar(player);
				 	if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && player.time >20 && nextEvent != null){
	 					// console.log("dialog ended \n PLAYING NEXT EVENT");
	 					resetDBox();
						CutscenePlay();
					}else if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && player.time >20 && nextEvent == null){
	 					// console.log("dialog ended \n END OF SCENE");
						resetDBox();
	 					cutsceneOff();
	 					advanceCutscene();
					}
	 			}
	 		}
	 	}else if(!cutscenePlaying){
	 		// console.log("no cutscene");
	 		// console.log("Player's x: " + player.x);
	 		console.log("Scene Playing: " + cutscenePlaying + "; Sara Scene: " + SaraScene);
			if(game.physics.arcade.overlap(player, clues, clueFound, null, this)){

			}else if(game.physics.arcade.overlap(player, toHallway, overDoor, null, this)){ 		
	 			// to leave the room
	 		}else if(SaraScene == 0 && player.x >= 700){
	 			cutscenePlaying = true;
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
//FUNCTIONS
// https://phaser.io/examples/v2/sprites/overlap-without-physics
//adding the word "start" into the function resulted in self-invocation