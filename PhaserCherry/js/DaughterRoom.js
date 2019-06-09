var DaughterRoom = {
	create: function(){
		game.camera.fade(0x000000, 0);
		background = game.add.sprite(0, 0, 'daughterR');
		toHallway = new Door(game, 59, 670, 'door', 1, 'Hallway', 1, 1.2);
		// Spawn or don't spawn Sara depending on which how much of her story is done
		clues = game.add.group();
		clues.enableBody = true;
		// made before Sara to be behind her
		cPhotoWall = clues.create(850, 320, 'PhotoWall');
		cPhotoWall.scale.set(1.3, 1.3)
		if(SaraScene == 0){
			Sara = game.add.sprite(61, 650, 'fullBody&Walk');
			Sara.alpha = 0;
		}else if(SaraScene == 1){
			Sara = game.add.sprite(800, 650, 'fullBody&Walk');
		}else{
			Sara = null;
		}
		if(Sara != null){
			Sara.anchor.x = 0.5;
			Sara.anchor.y = 1;
			Sara.animations.add('stand', ['saraWalk0'], 0, false);
			Sara.animations.add('walk', ['saraWalk1', 'saraWalk2', 'saraWalk3', 'saraWalk4'], 4, true);
			Sara.animations.play('stand');
		}
		// Sara's sequence is done, don't make the camera
		if(SaraScene <=1){
			cCamera = clues.create(400, 450, 'Camera');
			cCamera.anchor.x = 0.5;
			cCamera.anchor.y = 0.5;
		}
		// make Sara

		// make player
		// player must be drawn last to be above everything
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
		if(SaraScene<=2){
			nextEvent = dialogue[currentScene][event];
		}

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
		SaraEmotes.animations.add('angry', [4, 5], 3, true);
		SaraEmotes.alpha = 0;

		console.log("Entering Sara's room!!!");
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
	 					player.speed = 400;
	 				}
	 			}else if(currentEvent.action == "speak"){
	 				// console.log("dialog running");
	 				playSpacebar(player);
				 	if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && player.time >35 && nextEvent != null){
	 					// console.log("dialog ended \n PLAYING NEXT EVENT");
	 					resetDBox();
						CutscenePlay();
					}else if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && player.time >35 && nextEvent == null){
	 					console.log("dialog ended \n END OF SCENE");
						resetDBox();
	 					console.log("cutscenePlaying" + cutscenePlaying);
	 					cutsceneOff();
	 					console.log("cutscenePlaying" + cutscenePlaying);
	 					advanceCutscene();
	 					player.speed = 400;
					}
	 			}
	 		}
	 	}else if(!cutscenePlaying){
	 		console.log("Scene Playing: " + cutscenePlaying + "; Sara Scene: " + SaraScene);
			if(game.physics.arcade.overlap(player, clues, clueFound, null, this)){

			}else if(game.physics.arcade.overlap(player, toHallway, overDoor, null, this)){ 		
	 			// to leave the room
	 		}else if(SaraScene == 0 && player.x >= 450){
	 			// will  not 
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