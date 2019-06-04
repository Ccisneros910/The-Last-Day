var MasterRoom = {
	create: function(){
		console.log('in the master room');
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.camera.fade(0x000000, 0);
		background = game.add.sprite(0, 0, 'masterR');
		toHallway = new Door(game, 1100, 650, 'door', 0, 'Hallway', 0.7, 0.7);
		toHallway.frame = 1;
		//create clue group
		// if(clues!= null){
			clues = game.add.group();
			clues.enableBody = true;
			// individual clue assets
			clue = clues.create(740, 210, 'Wedding');
			clue.scale.set(0.3, 0.3);
			game.physics.arcade.enable(clue);
			clue = clues.create(560, 430, 'ring');
			game.physics.arcade.enable(clue);
		// }
		//make the husbando
		Greg = game.add.sprite(1050, 500, 'Greg');
		GregMake();
		if(currentRoom == null){
			playerX = 200;
			playerY = 400;
		}else if(currentRoom == Hallway){
			playerX = 800;
			playerY = 400;
		}
		player = new Player(game, playerX, playerY, 'ghost');
		player.alpha = 0;
		console.log(player);
		console.log("Ghost x: " + player.x);
		// the spacebar will follow the player around
		spacebarP = player.addChild(game.add.sprite(15, -130, 'space bar'));
		spacebarP.scale.set(0.15, 0.15);
		spacebarP.animations.add('dance');
		spacebarP.alpha = 0;
		spacebarP.anchor.x = 0.5;
		spacebarP.anchor.y = 0.5;
		// DIALOGUE SETUP
		dialogue = JSON.parse(game.cache.getText('GregScenes'));
		// the dialogue box for that will display behind each text message
		dialoguePlaying = false;
		dBox = game.add.sprite(100, 500, 'dBox');
		dBox.alpha = 0;
		dText = game.add.text(320, 520, '', dialogueStyle);
		//place emotions in box but turn off
		// Ghost emotions
		GhostEmotes = dBox.addChild(game.add.sprite(100, 100, 'GhostEmotions'));
		GhostEmotes.scale.set(1, 1);
		GhostEmotes.anchor.x = 0.5;
		GhostEmotes.anchor.y = 0.5;
		GhostEmotes.animations.add('neutral', [0], 0, false);
		GhostEmotes.animations.add('cry', [1, 2], 3, true);
		GhostEmotes.animations.add('surprise', [3, 4], 3, true);
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
		currentRoom = 'MasterRoom';
		console.log("entering the first room...");
		if(GregScene == 0){
			game.camera.onFlashComplete.addOnce(cutsceneOn);
		}
		game.camera.flash(0x000000, 3000);
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
	 	} 
	 	// If no cutscene, allow the player to move freely
	 	else if(!cutscenePlaying){
	 		if(game.physics.arcade.overlap(player, clues, clueFound, null, this)){
	 			// checks if player is overlapping with any clues
	 		}else if(game.physics.arcade.overlap(player, toHallway, overDoor, null, this)){ 		
	 			// to leave the room
	 		}
	 		else{
	 			clearPlayer();
				stopSpacebar();
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
	    	dBox.alpha = 1;
	    	// pausePlayer(p);
	    	player.speed = 0;
	    	console.log(player.speed);
	    	stopSpacebar();
		    if(g.key == 'Wedding'){
		    	dText.text = "Till death do us part...Little did I know death would come so soon.";
			}else if(g.key =='ring'){
		    	dText.text = "You wore this to show your faith to me, but now you are...";
			}else if(g.key =='Camera'){
		    	dText.text = "I want you to see much more of the world with this.";
			}else if(g.key =='PhotoWall'){
		    	dText.text = "You may not see the beauty in yourself, but you see it in everything else.";
			}else if(g.key =='ChefsHat'){
		    	dText.text = "Every stain is a reminder of every meal you have made.";
			}else if(g.key =='CookBook'){
		    	dText.text = "It's taken some work, but you have come up with some good things.";
			}
			// else if(g.key =='frame2'){
		 //    	dText = game.add.text(320, 520, "Keith. You started out so small. You are so much bigger, but you've got so far to go. And I...", dialogueStyle);
			// }
			player.time = 0;
		}else if(dText != '' && dialoguePlaying == true){
			dialoguePlaying = false;
			playSpacebar(p);
			resetDBox();
			unpausePlayer(p);
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
	p.speed = 400;
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
function GregExit(){
	GregFlip();
	t03.start();
}
function GregClear(){
	if(Greg != null){
		Greg.destroy();
		Greg = null;
	}
}
function ObjFlip(obj){
	if(obj!=null){
		// Greg.kill();
		// Greg = game.add.sprite(400, 500, 'Greg');
		// GregMake();
		if(obj)
		obj.scale.set(-1, 1);
	}
}
function GregMake(){
	if(Greg!=null){
		Greg.anchor.x = 0.5;
		Greg.anchor.y = 0.5;
		Greg.alpha = 0;
	}
}
// CUTSCENE CONTROL
function advanceCutscene(){
	if(currentRoom == "MasterRoom"){
		GregScene++;
	}else if(currentRoom == "DaughterRoom"){
		SaraScene++;
	}else if(currentRoom == "Kitchen"){
		KeithScene++;
	}
}
function cutsceneOn(){
	cutscenePlaying = true;
}
function cutsceneOff(){
	cutscenePlaying = false;
}
function CutscenePlay(){
	console.log("playing cutscene");
	// console.log(dialogue[GregScene][event]['action']);
	currentEvent = dialogue[currentScene][event];
	if(dialogue[currentScene][event]['action'] == "tween"){
		// remove spacebar as player cannot advance scene
		stopSpacebar();
		console.log("it is a tween");
		dBox.alpha = 0;
		GregEmotes.alpha = 0;
		GhostEmotes.alpha = 0;
		if(dialogue[currentScene][event]['effect'] == "alpha"){
			// CAN typecast the results and duration, BUT NOT the property
			tweenCheck = game.add.tween(this[dialogue[currentScene][event]['speaker']]).to({alpha : Number(dialogue[currentScene][event]['result'])}, Number(dialogue[currentScene][event]['duration']), Phaser.Easing.Linear.None, true);
		}else if(dialogue[currentScene][event]['effect'] == "x"){
			tweenCheck = game.add.tween(this[dialogue[currentScene][event]['speaker']]).to({x : Number(dialogue[currentScene][event]['result'])}, Number(dialogue[currentScene][event]['duration']), Phaser.Easing.Linear.None, true);
		}else if(dialogue[currentScene][event]['effect'] == "y"){
			tweenCheck = game.add.tween(this[dialogue[currentScene][event]['speaker']]).to({y : Number(dialogue[currentScene][event]['result'])}, Number(dialogue[currentScene][event]['duration']), Phaser.Easing.Linear.None, true);
		}else if(dialogue[currentScene][event]['effect'] == "flip"){
			ObjFlip(this[dialogue[currentScene][event]['speaker']]);
		}
	}else if(dialogue[currentScene][event]['action'] == "speak"){
		// play spacebar to indicate the player can advance scene
			// console.log(this[dialogue[currentScene][event]['speaker']].this[dialogue[currentScene][event]['effect']]);
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