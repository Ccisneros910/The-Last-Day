var MasterRoom = {
	create: function(){
		console.log('in the master room');
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.camera.fade(0x000000, 0);
		background = game.add.sprite(0, 0, 'masterR');
		toHallway = new Door(game, 1020, 630, 'door', 0, 'Hallway', 1, 1);
		toHallway.frame = 1;
		//create clue group
		// if(clues!= null){
			clues = game.add.group();
			clues.enableBody = true;
			// individual clue assets
			cWeddingPhoto = clues.create(740, 210, 'Wedding');
			cWeddingPhoto.scale.set(0.3, 0.3);
			// game.physics.arcade.enable(clue);
			cRing = clues.create(560, 430, 'ring');
			cRing.animations.add('still', ['ringbox0'], 0, false);
			cRing.animations.add('close', ['ringbox0', 'ringbox1', 'ringbox2', 'ringbox3'], 4, false);
			cRing.animations.add('open', ['ringbox3', 'ringbox2', 'ringbox1', 'ringbox0'], 4, false);
			if(GregScene == 0){
				cRing.alpha = 0;
			}
			// game.physics.arcade.enable(clue);
		// }
		//make the husbando
		Greg = null;
		if(GregScene == 0 || SaraScene == 3 && KeithScene == 4){
			if(GregScene == 0){
				Greg = game.add.sprite(1050, 500, 'fullBody&Walk');
				Greg.alpha = 0;
			}else if(SaraScene == 3 && KeithScene == 4){
				game.camera.onFlashComplete.addOnce(cutsceneOn);
				Greg = game.add.sprite(350, 500, 'fullBody&Walk');
			}
			if(Greg != null){
				Greg.anchor.x = 0.5;
				Greg.anchor.y = 0.5;
				Greg.animations.add('stand', ['gregWalk0'], 0, false);
				Greg.animations.add('walk', ['gregWalk1', 'gregWalk2', 'gregWalk3', 'gregWalk4'], 3, true);
				Greg.animations.play('stand');
			}
		}
		if(currentRoom == null){
			playerX = 200;
			playerY = 400;
		}else if(currentRoom == "Hallway"){
			playerX = 800;
			playerY = 400;
		}
		player = new Player(game, playerX, playerY, 'ghost');
		if(GregScene == 0){
			player.alpha = 0;

		}
		// player.alpha = 0;
		console.log(player);
		console.log("Ghost x: " + player.x);
		// the spacebar will follow the player around
		spacebarP = player.addChild(game.add.sprite(15, -130, 'space bar'));
		spacebarP.scale.set(0.15, 0.15);
		spacebarP.animations.add('dance');
		spacebarP.alpha = 0;
		spacebarP.anchor.x = 0.5;
		spacebarP.anchor.y = 0.5;
		arrowKeys = player.addChild(game.add.sprite(0, -160, 'arrowKeys'));
		arrowKeys.scale.set(1, 1);
		arrowKeys.animations.add('dance');
		arrowKeys.alpha = 0;
		arrowKeys.anchor.x = 0.5;
		arrowKeys.anchor.y = 0.5;

		// DIALOGUE SETUP
		dialogue = JSON.parse(game.cache.getText('GregScenes'));
		// the dialogue box for that will display behind each text message
		dialoguePlaying = false;
		dBox = game.add.sprite(100, 500, 'dBox');
		dBox.alpha = 0;
		dText = game.add.text(320, 520, '', dialogueStyle);
		//place emotions in box but turn off
		// Ghost emotions
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
		GregEmotes = dBox.addChild(game.add.sprite(100, 100, 'GregEmotions'));
		GregEmotes.scale.set(1, 1);
		GregEmotes.anchor.x = 0.5;
		GregEmotes.anchor.y = 0.5;
		GregEmotes.animations.add('neutral', [0], 0, false);
		GregEmotes.animations.add('talk', [0, 1], 3, true);
		GregEmotes.animations.add('cry', [2, 3], 3, true);
		GregEmotes.alpha = 0;
		// tell the user how to move
		// fade in the screen
		currentScene = GregScene;
		nextEvent = dialogue[currentScene][event];
		player.time = 0;
		// MESSAGES LEFT SETUP
		messageBG = game.add.sprite(0, 0, 'message');
		if(GregScene == 0){
		messageBG.alpha = 1;
		}else{
		messageBG.alpha = 0;
		}
		message = game.add.text(game.world.centerX, game.world.centerY, '', messageStyle);
		message.anchor.x = 0.5
		console.log("messageBG alpha: " + messageBG.alpha);
		if(ScenesLeft == 3 && GregScene == 0){
			console.log("first message");
			message.text = "Three goodbyes remain";
			messageBG.alpha = 1;
			message.alpha = 0;
		}else if(ScenesLeft == 0){
			console.log("last message");
			message.text = "You have said all of your goodbyes.\nIt is time for you to go, and don't worry.\nIt will take time, but you have helped your family to heal.";
			messageBG.alpha = 1;
			message.alpha = 0;
		}
		if(message != null && messageBG != null){
			console.log("prepping message")
			t01 = game.add.tween(messageBG).to({alpha : 1}, 1000, Phaser.Easing.Linear.None, false);
			t02 = game.add.tween(message).to({alpha : 1}, 1500, Phaser.Easing.Linear.None);
			t03 = game.add.tween(message).to({alpha : 1}, 3000, Phaser.Easing.Linear.None);
			t04 = game.add.tween(message).to({alpha : 0}, 1500, Phaser.Easing.Linear.None);
			t05 = game.add.tween(messageBG).to({alpha : 0}, 3000, Phaser.Easing.Linear.None);
		}
		currentRoom = 'MasterRoom';
		console.log("entering the first room...");
		if(GregScene == 0 && SaraScene == 0 && KeithScene == 0){
			console.log("starting message");
			playMessage();
			game.camera.flash(0x000000, 1);
		}else{
			game.camera.flash(0x000000, 1000);
		}
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
	 					if(GregScene == 4){
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
	 					if(GregScene == 4){
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
	 		if(game.physics.arcade.overlap(player, clues, clueFound, null, this)){
	 			// checks if player is overlapping with any clues
	 		}else if(game.physics.arcade.overlap(player, toHallway, overDoor, null, this)){ 		
	 			// to leave the room
	 		}else if(GregScene == 4 && SaraScene == 3 && KeithScene == 4){
	 			playMessage();
	 		}
	 		else{
	 			clearPlayer();
				stopSpacebar();
	 		}
	 		if(player.body.velocity.x > 0 || player.body.velocity.y > 0){
	 			stopArrowKeys();
	 		}
	 	}
 	}

	// render: function(){
	// 	game.debug.body(clue);
	// 	game.debug.body(player);
	// }
};// END OF GAME STATE - aaaaaAAAaaAaaaaAAAAaAaahhhhhhhhhhhhHHHHHHHHH

// used to display the text corresponding to the image
function checkOverlap(c, p){
    var boundsA = c.getBounds();
    var boundsB = p.getBounds();
    return Phaser.Rectangle.intersects(boundsA, boundsB);
}
function clueFound(p, g){
	playSpacebar(p);	//first indicate to the player they can do something
	if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && p.time > 50){
		console.log('spacebar pressed');
		// make sure there is currently no dialogue
	    if(dText.text == '' && dialoguePlaying == false){
	    	console.log('playing dialogue...');
	    	dialoguePlaying = true;
	    	// pausePlayer(p);
	    	player.speed = 0;
	    	stopSpacebar();
		    if(g.key == 'Wedding'){
		    	GhostEmotes.animations.play("neutral");
		    	dText.text = "Till death do us part...Little did I know death would come so soon.";
			}else if(g.key =='ring'){
				if(SaraScene == 3 & KeithScene == 4){
					cutsceneOn();
				}else{
		    		GhostEmotes.animations.play("cry");
		    		dText.text = "I know he doesn't have to wear it anymore, but seeing him take it off...just hurts.";
		    	}
			}else if(g.key =='Camera'){
				if(SaraScene ==2 && currentRoom == "DaughterRoom"){
					console.log("Starting scene 3");
					cutscenePlaying  = true;
				}else{
		    		GhostEmotes.animations.play("neutral")
		    		dText.text = "I want you to see much more of the world with this.";
		    	}
			}else if(g.key =='PhotoWall'){
				if(SaraScene ==1 && currentRoom == "DaughterRoom"){
					console.log("Starting scene 2");
					cutscenePlaying  = true;
				}else{
		    		GhostEmotes.animations.play("cry");
		    		dText.text = "You may not see the beauty in yourself, but you see it in everything else.";
				}
			}else if(g.key =='ChefsHat'){
				if(KeithScene == 2 && currentRoom == "LivingRoom"){
					cutsceneOn();
					hatHeld = true;
				}else if(KeithScene == 0 && currentRoom == "LivingRoom"){
		    		GhostEmotes.animations.play("surprise");
		    		dText.text = "If our little Chef's hat is here, he must not be too far.";
				}else if(KeithScene == 1 && currentRoom == "LivingRoom"){
		    		GhostEmotes.animations.play("bittersweet");
		    		dText.text = "Something tells me he might need this soon.";
				}else if(KeithScene == 3 && currentRoom == "Kitchen"){
		    		GhostEmotes.animations.play("bittersweet");
		    		dText.text = "Don't you ever stop cooking Keith.";
				}
				// else if(KeithScene == 3){
		  //   		dText.text = "Every stain is a reminder of every meal you have made.";
				// }
			}else if(g.key =='CookBook'){
				if(KeithScene == 1){
					cutsceneOn();
				}else{
					GhostEmotes.animations.play("neutral");
		    		dText.text = "It's taken some work, but you have come up with some good things.";
				}
			}else if(g.key == 'door'){
				GhostEmotes.animations.play("bittersweet");
	    		dText.text = "If Keith is going to be anywhere, it's in the kitchen.";
			}
			if(cutscenePlaying == false){
				GhostEmotes.alpha = 1;
	    		dBox.alpha = 1;
	    	}

			// else if(g.key =='frame2'){
		 //    	dText = game.add.text(320, 520, "Keith. You started out so small. You are so much bigger, but you've got so far to go. And I...", dialogueStyle);
			// }
			player.time = 0;
		}else if(dText != '' && dialoguePlaying == true){
			dialoguePlaying = false;
			playSpacebar(p);
			resetDBox();
			unpausePlayer();
			GhostEmotes.alpha = 0;
			// p.speed = 400;
			player.time = 0;
		}
	}
}
// used in the first room, to open the door after a set period of time
function openDoor(){
	console.log('OPEN SESAME!');
	toHallway.frame = 1;
}
function overDoor(p, d){
	p.currentDoor = d.name;
	// console.log("over door: " + p.currentDoor);
	playSpacebar(p);
	if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
		transition();
	}
}
//adding the word "start" into the function resulted in self-invocation
function transition(){
	// console.log('this function should not call!');
	game.camera.onFadeComplete.addOnce(leaveRoom);
	game.camera.fade(0x000000, 500);
}
// when the player passes through a door, will take them to the corresponding room
function leaveRoom(){
	console.log("going to " + player.currentDoor);
	game.state.start(player.currentDoor);
}
function endGame(){
	SaraScene = 0;
	GregScene = 0;
	KeithScene = 0;
	game.state.start("Menu");
}
// Spacebar management
function playSpacebar(p){
	if(p != null){
		p.currentFrame = true;
		if(p.currentFrame == true &&p.lastFrame == false){
			p.lastFrame = true;
			spacebarP.frame = 0;
		    spacebarP.alpha = 1;
		    spacebarP.animations.play('dance', 2, true);
		}
	}
}
function stopSpacebar(){
	spacebarP.alpha = 0;
	spacebarP.animations.stop();
}
function playArrowKeys(){
	if(arrowKeys != null){
		arrowKeys.alpha = 1;
	}
}
function stopArrowKeys(){
	if(arrowKeys != null){
		arrowKeys.alpha = 0;
	}
}
//Player conditional management
function clearPlayer(){
	if(player != null){
		player.overType = '';
		player.currentFrame = false;
		player.lastFrame = false;
	}
}
function pausePlayer(p){
	player.speed = 0;
}
function unpausePlayer(p){
	player.speed = 400;
}
function resetDBox(){
	console.log("clearing dialog");
	dBox.alpha = 0;
	dText.text = '';
	if(GhostEmotes != null){
		GhostEmotes.alpha = 0;
	}
	if(GregEmotes != null){
		GregEmotes.alpha = 0;
	}
	if(SaraEmotes != null){
		SaraEmotes.alpha = 0;
	}
	if(KeithEmotes != null){
		KeithEmotes.alpha = 0;
	}
}
function ObjFlip(obj){
	if(obj!=null){
		// Greg.kill();
		// Greg = game.add.sprite(400, 500, 'Greg');
		// GregMake();
		console.log("Object's scale: " + obj.scale.x);
		if(currentRoom == "Kitchen"){
			if(obj.scale.x > 0){
				obj.scale.set(-0.8, 0.8);
			}else if(obj.scale.x < 0){
				obj.scale.set(0.8, 0.8);
			}
		}else{
			if(obj.scale.x > 0){
				obj.scale.set(-1, 1);
			}else if(obj.scale.x < 0){
				obj.scale.set(1, 1);
			}			
		}
	}
}
function GregMake(){
	if(Greg!=null){
		Greg.anchor.x = 0.5;
		Greg.anchor.y = 0.5;
		Greg.alpha = 0;
	}
}
function playMessage(){
	console.log("playing first tween");
	// assign the corresponding message
	if(ScenesLeft == 3){
		message.text = "Three more goodbyes to say."
	}else if(ScenesLeft == 2){
		message.text = "Two more to go."
	}else if(ScenesLeft == 1){
		message.text = "Only one left."
	}else if(ScenesLeft == 0){
		message.text = "No more goodbyes to say. The time has come to move on. But don't worry. It is hard for them now, but you have helped them move on."
	}
	// chain the first four tweens together
	t01.chain(t02);
	t02.chain(t03);
	t03.chain(t04);
	// IF all scenes, go to menu state on completion of tween #4
	// ELSE return to current room
	if(GregScene == 4 && SaraScene == 3 && KeithScene == 4){
		t04.onComplete.add(endGame);
	}else{
		t04.chain(t05);
	}
	// IF the game just started, play Greg's first scene immediately afterwards
	console.log("adding end condition now");
	if(GregScene == 0){
		t05.onComplete.add(cutsceneOn, this);
	}else{
		t05.onComplete.add(playArrowKeys, this);
	}
	t05.onComplete.add(unpausePlayer, this);
	t01.onStart.add(pausePlayer, this);
	console.log("starting message NOW");
	t01.start();
}
// CUTSCENE CONTROL
function advanceCutscene(){
	if(currentRoom == "MasterRoom"){
		GregScene++;
	}else if(currentRoom == "DaughterRoom"){
		SaraScene++;
	}else if(currentRoom == "Kitchen" || currentRoom == "LivingRoom"){
		KeithScene++;
	}
	currentScene++;
	event = 0;
	currentEvent = null;
	if(dialogue[currentScene]!=null){
		nextEvent = dialogue[currentScene][event];
	}
	console.log("Next Event: ");
	console.log(nextEvent);
}
function cutsceneOn(){
	cutscenePlaying = true;
}
function cutsceneOff(){
	cutscenePlaying = false;
}
function CutscenePlay(){
	console.log("NEXT CUTSCENE");
	currentEvent = dialogue[currentScene][event];
	if(dialogue[currentScene][event]['action'] == "tween"){
		// remove spacebar as player cannot advance scene
		stopSpacebar();
		console.log("PLAYING tween");
		dBox.alpha = 0;
		GregEmotes.alpha = 0;
		GhostEmotes.alpha = 0;
			// CAN typecast the results and duration, BUT NOT the property or easing
		if(dialogue[currentScene][event]['effect'] == "alpha"){
			tweenCheck = game.add.tween(this[dialogue[currentScene][event]['speaker']]).to({alpha : Number(dialogue[currentScene][event]['result'])}, Number(dialogue[currentScene][event]['duration']), Phaser.Easing.Linear.None, true);
		}else if(dialogue[currentScene][event]['effect'] == "x"){
			tweenCheck = game.add.tween(this[dialogue[currentScene][event]['speaker']]).to({x : Number(dialogue[currentScene][event]['result'])}, Number(dialogue[currentScene][event]['duration']), this[dialogue[currentScene][event]['easing']], true);
			if(dialogue[currentScene][event]['animation'] != null){
				this[dialogue[currentScene][event]['speaker']].animations.play(dialogue[currentScene][event]['animation']);
			}
		}else if(dialogue[currentScene][event]['effect'] == "y"){
			console.log("EASING EFFECT: " + dialogue[currentScene][event]['easing']);
			tweenCheck = game.add.tween(this[dialogue[currentScene][event]['speaker']]).to({y : Number(dialogue[currentScene][event]['result'])}, Number(dialogue[currentScene][event]['duration']), this[dialogue[currentScene][event]['easing']], true);
			if(dialogue[currentScene][event]['animation'] != null){
				this[dialogue[currentScene][event]['speaker']].animations.play(dialogue[currentScene][event]['animation']);
			}
		}else if(dialogue[currentScene][event]['effect'] == "flip"){
			ObjFlip(this[dialogue[currentScene][event]['speaker']]);
		}
	}else if(dialogue[currentScene][event]['action'] == "speak"){
		// play spacebar to indicate the player can advance scene
		playSpacebar(player);
		dBox.alpha = 1;
		GhostEmotes.alpha = 0;
		GregEmotes.alpha = 0;
		if(dialogue[currentScene][event]['speaker'] == "player"){
			GhostEmotes.alpha = 1;
			GhostEmotes.animations.play(dialogue[currentScene][event]['emotion']);
		}else if(dialogue[currentScene][event]['speaker'] == "Greg"){
			GregEmotes.alpha = 1;
			GregEmotes.animations.play(dialogue[currentScene][event]['emotion']);
		}else if(dialogue[currentScene][event]['speaker'] == "Sara"){
			SaraEmotes.alpha = 1;
			SaraEmotes.animations.play(dialogue[currentScene][event]['emotion']);
		}else if(dialogue[currentScene][event]['speaker'] == "Keith"){
			KeithEmotes.alpha = 1;
			KeithEmotes.animations.play(dialogue[currentScene][event]['emotion']);
		}
		dText.text = dialogue[currentScene][event]['dialogue'];
		player.time = 0;
	}
	nextEvent = dialogue[currentScene][event+1];
	console.log("NEXT EVENT: ");
	// console.log(nextEvent);
	//move to the next event IF exists
	event++;
}