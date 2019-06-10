var DaughterRoom = {
	create: function(){
		game.camera.fade(0x000000, 0);
		background = game.add.sprite(0, 0, 'daughterR');
		toHallway = new Door(game, 70, 700, 'door', 1, 'Hallway', 1.1, 1.2);
		toHallway.frame = 1;
		// Spawn or don't spawn Sara depending on which how much of her story is done
		clues = game.add.group();
		clues.enableBody = true;
		// made before Sara to be behind her
		cPhotoWall = clues.create(880, 320, 'PhotoWall');
		cPhotoWall.animations.add('still', ['wallPhotos0'], 0, false);
		cPhotoWall.animations.add('fall', ['wallPhotos0', 'wallPhotos1', 'wallPhotos2', 'wallPhotos3'], 4, false);
		cPhotoWall.animations.add('lift', ['wallPhotos3', 'wallPhotos2', 'wallPhotos1', 'wallPhotos0'], 4, false);
		cPhotoWall.scale.set(1.3, 1.3)
		if(SaraScene == 0){
			Sara = game.add.sprite(90, 680, 'fullBody&Walk');
			Sara.alpha = 0;
		}else if(SaraScene == 1){
			Sara = game.add.sprite(800, 680, 'fullBody&Walk');
		}else if(SaraScene == 2){
			Sara = game.add.sprite(600, 680, 'fullBody&Walk');
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
		if(SaraScene <=2){
			cCamera = clues.create(420, 467, 'Camera');
			cCamera.anchor.x = 0.5;
			cCamera.anchor.y = 0.5;
		}
		// make Sara
		
		// make player
		// player must be drawn last to be above everything
		playerX = 250;
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
		arrowKeys = player.addChild(game.add.sprite(0, -160, 'arrowKeys'));
		arrowKeys.scale.set(1, 1);
		arrowKeys.animations.add('dance');
		arrowKeys.alpha = 0;
		arrowKeys.anchor.x = 0.5;
		arrowKeys.anchor.y = 0.5;

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
		SaraEmotes = dBox.addChild(game.add.sprite(100, 100, 'emotes'));
		SaraEmotes.scale.set(1, 1);
		SaraEmotes.anchor.x = 0.5;
		SaraEmotes.anchor.y = 0.5;
		SaraEmotes.animations.add('neutral', ['sara0'], 0, false);
		SaraEmotes.animations.add('talk', ['sara0', 'sara1'], 3, true);
		SaraEmotes.animations.add('cry', ['sara2', 'sara3'], 3, true);
		SaraEmotes.animations.add('angry', ['sara4', 'sara5'], 3, true);
		SaraEmotes.animations.add('distraught', ['sara6', 'sara7'], 3, true);
		SaraEmotes.animations.add('confused', ['sara8', 'sara9'], 3, true);
		SaraEmotes.alpha = 0;

		//prep the message assets
		// message background
		messageBG = game.add.sprite(0, 0, 'message');
		messageBG.alpha = 0;
		// message text
		message = game.add.text(game.world.centerX, game.world.centerY, '', messageStyle);
		message.anchor.x = 0.5
		message.alpha = 0;
		console.log("prepping message sequence");
		t01 = game.add.tween(messageBG).to({alpha : 1}, 1000, Phaser.Easing.Linear.None, false);
		t02 = game.add.tween(message).to({alpha : 1}, 1500, Phaser.Easing.Linear.None);
		t03 = game.add.tween(message).to({alpha : 1}, 3000, Phaser.Easing.Linear.None);
		t04 = game.add.tween(message).to({alpha : 0}, 1500, Phaser.Easing.Linear.None);
		t05 = game.add.tween(messageBG).to({alpha : 0}, 3000, Phaser.Easing.Linear.None);
		t01.chain(t02);
		t02.chain(t03);
		t03.chain(t04);
		t04.chain(t05);

		//
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
	 					if(SaraScene == 3){
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
				 	if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && player.time >35 && nextEvent != null){
	 					// console.log("dialog ended \n PLAYING NEXT EVENT");
	 					resetDBox();
						CutscenePlay();
					}else if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && player.time >35 && nextEvent == null){
	 					console.log("dialog ended \n END OF SCENE");
						resetDBox();
	 					cutsceneOff();
	 					advanceCutscene();
	 					playArrowKeys();
	 					player.speed = 400;
					}
	 			}
	 		}
	 	}else if(!cutscenePlaying){
	 		console.log("Scene Playing: " + cutscenePlaying + "; Sara Scene: " + SaraScene);
			if(game.physics.arcade.overlap(player, clues, clueFound, null, this)){

			}else if(game.physics.arcade.overlap(player, toHallway, overDoor, null, this)){ 		
	 			// to leave the room
	 		}else if(SaraScene == 0 && player.x >= 300){
	 			// will  not 
	 			cutscenePlaying = true;
	 		}else{
	 			clearPlayer();
				stopSpacebar();
	 		}
	 		if(player.body.velocity.x != 0 || player.body.velocity.y != 0){
	 			stopArrowKeys();
	 		}
	 		if(SaraScene >= 3 && cCamera != null){
	 			cCamera.destroy();
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