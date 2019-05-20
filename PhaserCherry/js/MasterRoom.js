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
		clue = clues.create(400, 200, 'photo');
		clue.scale.set(0.3, 0.3);
		clue = clues.create(100, 50, 'frame1');
		clue.scale.set(0.1, 0.1);
		game.physics.arcade.enable(clue);
		// player must be drawn last to be above everything
		player = new Player(game, 200, 400, 'ghost');
		// the spacebar will follow the player around
		spacebarP = player.addChild(game.add.sprite(4, -80, 'space bar'));
		spacebarP.scale.set(0.08, 0.08);
		spacebarP.animations.add('dance');
		spacebarP.alpha = 0;
		spacebarP.anchor.x = 0.5;
		spacebarP.anchor.y = 0.5;
		// the dialogue box for that will display behind each text message
		dialogueBox = game.add.sprite(100, 500, 'dBox');
		dialogueBox.alpha = 0;
		// dialogueText = game.add.text(320, 520, "Use the arrows to move");
		prompt = game.add.text(320, 520, promptMessages[0], style);
		prompt.alpha = 0;
		game.camera.flash(0x000000, 2000);
		game.time.events.add(Phaser.Timer.SECOND*5, openDoor, this);
		playerPaused = false;
		overClue = false;
	},
	update: function(){
	 	// checks if player is overlapping with any individual clues
 		if(game.physics.arcade.overlap(player, clues, clueFound, null, this)){
 			//empty SPACE
 		}else{
 			player.currentFrame = false;
			player.lastFrame = false;
			spacebarP.alpha = 0;
			spacebarP.animations.stop();
			dialogueBox.alpha = 0;
			if(dialogueText!= null){
				dialogueText.destroy();
				dialogueText = null;
			}
 		}
 		// to leave the room
 		if(checkOverlap(player, toHallway)){
 			prompt.alpha = prompt[0];
 			prompt.alpha = 1;
 			if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
 				transition();
 			}
 		}else{
 			prompt.alpha = 0;
 		}
	}
	// render: function(){
	// 	game.debug.body(clue);
	// 	game.debug.body(player);
	// }
};
//END OF GAME STATE - aaaaaAAAaaAaaaaAAAAaAaahhhhhhhhhhhhHHHHHHHHH
// used to display the text corresponding to the image
function checkOverlap(c, p){
    var boundsA = c.getBounds();
    var boundsB = p.getBounds();
    return Phaser.Rectangle.intersects(boundsA, boundsB);
}
function clueFound(p, g){
	p.currentFrame = true;
	if(p.currentFrame == true &&p.lastFrame == false){
		p.lastFrame = true;
		playerSpacebar();
	}
	if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
	    p.moveable = false;
	    dialogueBox.alpha = 1;
	    if(dialogueText==null){
		    if(g.key == 'photo'){
		    	dialogueText = game.add.text(320, 520, "Greg. Sara. Keith... How long has it been?", style);
			}else if(g.key =='frame1'){
		    	dialogueText = game.add.text(320, 520, "Till death do us part...", style);
			}else if(g.key =='frame2'){
		    	dialogueText = game.add.text(320, 520, "Keith. You started out so small. You are so much bigger, but you've got so far to go. And I...", style);
			}
		}
		p.moveable = true;
	}
}
// used in the first room, to open the door after a set period of time
function openDoor(){
	console.log('OPEN SESAME!');
	toHallway.frame = 1;
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
function leaveRoom(){
	if(this.RoomName=='Master Room' ||this.RoomName=='Sara\'s Room' || this.RoomName=='Keith\'s Room'){
		game.state.start('Hallway');
	}else{
		game.state.start('Hallway');
	}
}
function playText(){

}
function playerSpacebar(){
	spacebarP.frame = 0;
    spacebarP.alpha = 1;
    spacebarP.animations.play('dance', 2, true);
}