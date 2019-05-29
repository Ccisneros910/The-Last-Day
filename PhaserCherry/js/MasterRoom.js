var photo;
var photoText;
var player;
var MasterRoom = {
	create: function(){
		console.log('in the master room');
		game.physics.startSystem(Phaser.Physics.ARCADE);
		this.RoomName = 'Master Room';
		game.camera.fade(0x000000, 0);
		background = game.add.sprite(0, 0, 'masterR');
		toHallway = new Door(game, 1100, 650, 'door', 0, 'Hallway', 0.7);
		//create clue group
		clues = game.add.group();
		clues.enableBody = true;
		// individual clue assets
		clue = clues.create(400, 200, 'Wedding');
		clue.scale.set(0.3, 0.3);
		clue = clues.create(100, 50, 'ring');
		// clue.scale.set(0.1, 0.1);
		game.physics.arcade.enable(clue);
		//make the husbando
		Greg = game.add.sprite(1050, 500, 'Greg');
		GregMake();
		//GREG TWEENS
		//Greg enters the room
		t01 = game.add.tween(Greg);
		t01.to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true, 5500);
		t02 = game.add.tween(Greg);
		t02.to( { x: 400 }, 4000, Phaser.Easing.Linear.None, false, 500);
		//Greg leaves the room
		t03 = game.add.tween(Greg);
		t03.to( { x: 1065 }, 3500, Phaser.Easing.Linear.None, false);
		t04 = game.add.tween(Greg);
		t04.to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, false);
		t04.onComplete.add(GregClear, this);
		// link the tweens for proper sequences
		t01.chain(t02);
		t03.chain(t04);
		// player must be drawn last to be above everything
		player = new Player(game, 200, 400, 'ghost');
		player.alpha = 0.9;
		// the spacebar will follow the player around
		spacebarP = player.addChild(game.add.sprite(4, -80, 'space bar'));
		spacebarP.scale.set(0.08, 0.08);
		spacebarP.animations.add('dance');
		spacebarP.alpha = 0;
		spacebarP.anchor.x = 0.5;
		spacebarP.anchor.y = 0.5;
		// the dialogue box for that will display behind each text message
		dialoguePlaying = false;
		dialogueBox = game.add.sprite(100, 500, 'dBox');
		//place emotions in box but turn off
		// Ghost emotions
		GhostEmotes = dialogueBox.addChild(game.add.sprite(100, 100, 'GhostEmotions'));
		GhostEmotes.scale.set(1, 1);
		GhostEmotes.anchor.x = 0.5;
		GhostEmotes.anchor.y = 0.5;
		GhostEmotes.animations.add('think', [0], 1, false);
		GhostEmotes.animations.add('cry', [1, 2], 3, true);
		GhostEmotes.animations.add('surprise', [3, 4], 3, true);
		GhostEmotes.alpha = 0;
		//Greg emotions
		GregEmotes = dialogueBox.addChild(game.add.sprite(100, 100, 'GregEmotions'));
		GregEmotes.scale.set(1, 1);
		GregEmotes.anchor.x = 0.5;
		GregEmotes.anchor.y = 0.5;
		GregEmotes.animations.add('quiet', [0], 0, false);
		GregEmotes.animations.add('talk', [1], 3, true);
		GregEmotes.animations.add('cry', [2, 3], 3, true);
		GregEmotes.alpha = 0;
		// tell the user how to move
		// prompt = game.add.text(320, 520, promptMessages[0], style);
		// prompt.alpha = 0;
		dialogueBox.alpha = 0;
		// // fade in the screen
		game.camera.flash(0x000000, 2000);
		// set timer before door opens
		game.time.events.add(Phaser.Timer.SECOND*5, openDoor, this);
		game.time.events.add(Phaser.Timer.SECOND*13, GregExit, this);
	},
	update: function(){
	 	// checks if player is overlapping with any clues
	 	player.time++;
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
	    if(dialogueText==null && dialoguePlaying == false){
	    	console.log('playing dialogue...');
	    	dialoguePlaying = true;
	    	dialogueBox.alpha = 1;
	    	// pausePlayer(p);
	    	player.speed = 0;
	    	console.log(player.speed);
	    	stopSpacebar();
		    if(g.key == 'Wedding'){
		    	dialogueText = game.add.text(320, 520, "Till death do us part...Little did I know death would come so soon.", dialogueStyle);
			}else if(g.key =='ring'){
		    	dialogueText = game.add.text(320, 520, "Till death do us part...", dialogueStyle);
			}else if(g.key =='frame2'){
		    	dialogueText = game.add.text(320, 520, "Keith. You started out so small. You are so much bigger, but you've got so far to go. And I...", dialogueStyle);
			}
			player.time = 0;
		}else if(dialogueText != null && dialoguePlaying == true){
			dialoguePlaying = false;
			playSpacebar(p);
			resetDialogueBox();
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
	playSpacebar(p);
	if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
		transition();
	}
}
//adding the word "start" into the function resulted in self-invocation
function transition(){
	// console.log('this function should not call!');
	if(toHallway.frame == 1){
		game.camera.onFadeComplete.addOnce(leaveRoom);
		game.camera.fade(0x000000, 1000);
	}
}
// when the player passes through a door, will take them to the corresponding room
function leaveRoom(p){
	game.state.start(p.currentDoor);
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
// Dialogue Management
function playText(){

}
function resetDialogueBox(){
	dialogueBox.alpha = 0;
	if(dialogueText!= null){
		dialogueText.destroy();
		dialogueText = null;
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