var Kitchen = {
	create: function(){
		game.camera.fade(0x000000, 0);
		background = game.add.sprite(0, 0, 'kitchen');
		toLivingRoom = new Door(game, 200, 680, 'door', 1, 'LivingRoom', 1.9, 0.3);
		toLivingRoom.alpha = 1;
		// CLUES
		clues = game.add.group();
		clues.enableBody = true;
		// individual clue assets
		clue = clues.create(450, 450, 'ChefsHat');
		clue.scale.set(1.5, 1.5);
		clue.anchor.x = 0.5;
		clue.anchor.y = 1;
		cCookBook = clues.create(1050, 450, 'CookBook');
		clue.scale.set(1.5, 1.5);
		clue.anchor.x = 0.5;
		clue.anchor.y = 1;
		// game.physics.arcade.enable(clue);
		// player must be drawn last to be above everything
		//make player
		player = new Player(game, 300, 500, 'ghost');
		player.alpha = 0.8;
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
		// emotions
		GhostEmotes = dBox.addChild(game.add.sprite(100, 100, 'GhostEmotions'));
		GhostEmotes.scale.set(1, 1);
		GhostEmotes.anchor.x = 0.5;
		GhostEmotes.anchor.y = 0.5;
		GhostEmotes.animations.add('neutral', [0], 0, false);
		GhostEmotes.animations.add('cry', [1, 2], 3, true);
		GhostEmotes.animations.add('surprise', [3, 4], 3, true);
		GhostEmotes.alpha = 0;
		//Greg emotions
		KeithEmotes = dBox.addChild(game.add.sprite(100, 100, 'GregEmotions'));
		KeithEmotes.scale.set(1, 1);
		KeithEmotes.anchor.x = 0.5;
		KeithEmotes.anchor.y = 0.5;
		KeithEmotes.animations.add('neutral', [0], 0, false);
		KeithEmotes.animations.add('talk', [0, 1], 3, true);
		KeithEmotes.animations.add('cry', [2, 3], 3, true);
		KeithEmotes.alpha = 0;

		cutscenePlaying = false;
		game.camera.flash(0x000000, 2000);
		currentRoom = 'Kitchen';
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