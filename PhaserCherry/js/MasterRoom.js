var photo;
var allClues;
var photoText;
var MasterRoom = {
	create: function(){
		console.log('in the master room');
		this.RoomName = 'Master Room'
		game.camera.fade(0x000000, 0);
		background = game.add.sprite(0, 0, 'masterR');
		// photo = game.add.sprite(400, 200, 'photo');
		// game.physics.arcade.enable(photo);
		// photo.scale.setTo(0.3, 0.3);
		// photo.body.setSize(200, 200, 200, 200);
		toHallway = game.add.sprite(1100, 650, 'door');
		game.physics.arcade.enable(toHallway);
		toHallway.anchor.x = 0.5;
		toHallway.anchor.y = 1;
		toHallway.scale.setTo(0.7,0.7);
		toHallway.body.setSize(160, 330, 40, 40);
		// not using animations; just opening the door after a timer ends
		toHallway.frame = 0;
		//create clue group
		clues = game.add.group();
		clues.enableBody = true;
		// individual clue assets
		clue = clues.create(400, 200, 'photo');
		clue.scale.set(0.3, 0.3);
		clue = clues.create(100, 50, 'frame1');
		clue.scale.set(0.1, 0.1);
		// player must be drawn last to be above everything
		player = game.add.sprite(200, 400, 'ghost');
		game.physics.arcade.enable(player);
		player.body.collideWorldBounds = true;
		player.body.setSize(80, 120, 35, 15);
		player.anchor.x = 0.5;
		player.anchor.y = 0.5;
		player.body.drag.x = 550;
		player.body.drag.y = 550;
		// DOES NOT CREATE A PHOTO
		// this.photo = new Clue(game, 'FamilyPhoto', 'photo', 400, 100, "We're all so happy. I want to go back to this.");
		// game.add.existing(this.photo);
		// clues.add(this.photo);
		// the dialogue box for that will display behind each text message
		dialogueBox = game.add.sprite(100, 500, 'dBox');
		dialogueBox.alpha = 0;
		dialogueText = game.add.text(320, 520, "Use the arrows to move");
		// photoText = game.add.text(320, 520, "This family looks really happy. Why do they seem so familiar?", style);
		// photoText.lineSpacing = -10;
		// photoText.alpha = 0;
		prompt = game.add.text(320, 520, promptMessages[0], style);
		prompt.alpha = 0;
		// player.body.setSize(200, 200, 200, 200);
		// player.animations.add('spin', [0, 1, 2, 3], 16, true);
		// player.animations.play('spin');
		game.camera.flash(0x000000, 2000);
		game.time.events.add(Phaser.Timer.SECOND*7, openDoor, this);
	},
	update: function(){
		//player movement
 		controls = game.input.keyboard.createCursorKeys();
 		if(viewing == false){
	 		if(controls.up.isDown){
	 			player.body.velocity.y = -300;
	 		}else if(controls.down.isDown){
	 			player.body.velocity.y = 300;
	 		}
	 		if(controls.left.isDown){
	 			player.body.velocity.x = -300;
	 		}else if(controls.right.isDown){
	 			player.body.velocity.x = 300;
	 		}
	 	}
	 	// checks if player is overlapping with any individual clues
 		if(player.overlap(clues)){
 			dialogueText.destroy();
 			game.physics.arcade.overlap(player, clues, overlappingClue, null, this);
 		}else{
 			dialogueBox.alpha = 0;
 			dialogueText.alpha = 0;
 		}
 		if(checkOverlap(player, toHallway)){
 			promp.alpha = prompt[0];
 			prompt.alpha = 1;
 			if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
 				transition();
 			}
 		}else{
 			prompt.alpha = 0;
 		}
	},
	// render: function(){
	// 	game.debug.body(toHallway);
	// 	game.debug.body(player);
	// 	// not a function
	// 	// game.debug.group(clues);
	// }
};

// https://phaser.io/examples/v2/sprites/overlap-without-physics
function checkOverlap(sprite1, sprite2){
    var boundsA = sprite1.getBounds();
    var boundsB = sprite2.getBounds();
    return Phaser.Rectangle.intersects(boundsA, boundsB);
}
// used to display the text corresponding to the image
function overlappingClue(p, g){
    dialogueBox.alpha = 1;
    if(g.key == 'photo'){
    	dialogueText = game.add.text(320, 520, "Greg. Sara. Keith... How long as it been?", style);
	}else if(g.key =='frame1'){
    	dialogueText = game.add.text(320, 520, "Till death do us part...", style);
	}else if(g.key =='frame2'){
    	dialogueText = game.add.text(320, 520, "Keith. You started out so small. You are so much bigger, but you've got so far to go. And I...", style);
	}
}
// used in the first room, to open the door after a set period of time
function openDoor(){
	console.log('this function will call later!');
	toHallway.frame = 1;
}
//adding the word "start" into the function resulted in self-invocation
function transition(){
	// console.log('this function should not call!');
	if(toHallway.frame == 1){
		game.camera.onFadeComplete.add(leaveRoom);
		game.camera.fade(0x000000, 1000);
	}
}
// when the player passes through a door, will take them to the corresponding room
function leaveRoom(){
	if(this.RoomName=='Master Room' ||this.RoomName=='Sara\'s Room' || this.RoomName=='Keith\'s Room'){
		game.state.start('Hallway');
	}else{
		game.state.start('')
	}
}