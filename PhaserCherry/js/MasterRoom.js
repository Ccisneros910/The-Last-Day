var MasterRoom = {
	create: function(){
		console.log('in the master room');
		game.physics.startSystem(Phaser.Physics.ARCADE);
		this.RoomName = 'Master Room';
		game.camera.fade(0x000000, 0);
		background = game.add.sprite(0, 0, 'masterR');
		toHallway = new Door(game, 1100, 650, 'door', 0, 'Hallway', 0.7, 0.7);
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
		//GREG TWEENS
		//Greg enters the room
		// t01 = game.add.tween(Greg);
		// t01.to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, false);
		// t02 = game.add.tween(Greg);
		// t02.to( { x: 400 }, 4000, Phaser.Easing.Linear.None, false);
		// //Greg leaves the room
		// t03 = game.add.tween(Greg);
		// t03.to( { x: 1065 }, 3500, Phaser.Easing.Linear.None, false);
		// t04 = game.add.tween(Greg);
		// t04.to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, false);
		// t04.onComplete.add(GregClear, this);
		// // link the tweens for proper sequences
		// t01.chain(t02);
		// t03.chain(t04);
		// player must be drawn last to be above everything
		player = new Player(game, 200, 400, 'ghost');
		player.alpha = 0;
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
		game.camera.flash(0x000000, 2000);
		// set timer before door opens
		game.time.events.add(Phaser.Timer.SECOND*5, openDoor, this);
		// game.time.events.add(Phaser.Timer.SECOND*13, GregExit, this);
		if(GregScene == 0){
			console.log("going to cutscene fnc in 5");
			game.time.events.add(Phaser.Timer.SECOND*5, GregCutscene, this);
		}
		cutscenePlaying = true;
		player.time = 0;
	},
	update: function(){
	 	// checks if player is overlapping with any clues
	 	player.time++;
	 	if(cutscenePlaying){
	 		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && player.time >50){
	 			if(nextEvent!=null){
	 				GregCutscene();
	 			}else if(nextEvent == null){
	 				resetDBox();
	 				cutscenePlaying = false;
	 			}
	 		}
	 	}else if(!cutscenePlaying){
	 		if(game.physics.arcade.overlap(player, clues, clueFound, null, this)){
	 			//empty SPACE
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
		    	dText.text = "Till death do us part...";
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
	game.camera.fade(0x000000, 1000);
}
// when the player passes through a door, will take them to the corresponding room
function leaveRoom(){
	console.log("going to " + player.currentDoor);
	game.state.start(player.currentDoor);
}
// Spacebar management
function playSpacebar(p){
	p.currentFrame = true;
	if(p.currentFrame == true &&p.lastFrame == false){
		p.lastFrame = true;
		spacebarP.frame = 0;
	    spacebarP.alpha = 1;
	    spacebarP.animations.play('dance', 2, true);
	}
}
function stopSpacebar(){
	spacebarP.alpha = 0;
	spacebarP.animations.stop();
}
//Player conditional management
function clearPlayer(){
	player.overType = '';
	player.currentFrame = false;
	player.lastFrame = false;
}
function pausePlayer(p){
	player.speed = 0;
}
function unpausePlayer(p){
	p.speed = 400;
}
function resetDBox(){
	dBox.alpha = 0;
	dText.text = '';
	GregEmotes.alpha = 0;
	GhostEmotes.alpha = 0;
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
function GregFlip(){
	if(Greg!=null){
		// Greg.kill();
		// Greg = game.add.sprite(400, 500, 'Greg');
		// GregMake();
		Greg.scale.set(-1, 1);
	}
}
function GregMake(){
	if(Greg!=null){
		Greg.anchor.x = 0.5;
		Greg.anchor.y = 0.5;
		Greg.alpha = 0;
	}
}

function GregCutscene(){
	console.log("playing cutscene");
	console.log(dialogue[GregScene][event]['action']);
	if(dialogue[GregScene][event]['action'] == "tween"){
		// remove spacebar as player cannot advance scene
		stopSpacebar();
		console.log("it is a tween");
		if(dialogue[GregScene][event]['number'] == 1){
			// console.log("first tween");
			// console.log(dialogue[GregScene][event]['speaker']);
			// var target = dialogue[GregScene][event]['speaker'];
			// console.log(target);
			// console.log(game[target]);
			dBox.alpha = 0;
			GregEmotes.alpha = 0;
			GhostEmotes.alpha = 0;
			// game.add.tween(dialogue[GregScene][event]['speaker']).to({dialogue[GregScene][event]['action'] : dialogue[GregScene][event]['result']}, dialogue[GregScene][event]['duration'], Phaser.Easing.Linear.None, true);
			game.add.tween(player).to({alpha : 0.9}, 3000, Phaser.Easing.Linear.None, true);
		}

	}else if(dialogue[GregScene][event]['action'] == "speak"){
		// play spacebar to indicate the player can advance scene
		playSpacebar(player);
		dBox.alpha = 1;
		GhostEmotes.alpha = 0;
		GregEmotes.alpha = 0;
		if(dialogue[GregScene][event]['speaker'] == "player"){
			GhostEmotes.alpha = 1;
			GhostEmotes.animations.play(dialogue[GregScene][event]['emotion']);
		}else if(dialogue[GregScene][event]['speaker'] == "Greg"){
			GregEmotes.alpha = 1;
			GregEmotes.animations.play(dialogue[GregScene][event]['emotion']);
		}
		dText.text = dialogue[GregScene][event]['dialogue'];
		player.time = 0;
	}
	nextEvent = dialogue[GregScene][event+1];
	console.log(nextEvent);
	//move to the next event IF exists
	event++;
}