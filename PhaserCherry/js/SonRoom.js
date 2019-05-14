var photo;
var dialogueBox;
var allClues;
var photoText;
var SonRoom = {
	create: function(){
		this.RoomName = 'Keith\'s Room';
		console.log('in Keith\'s room');
		game.camera.fade(0x000000, 0);
		background = game.add.sprite(0, 0, 'testR');
		// photo = game.add.sprite(400, 200, 'photo');
		// game.physics.arcade.enable(photo);
		// photo.scale.setTo(0.3, 0.3);
		// photo.body.setSize(200, 200, 200, 200);
		toHallway = game.add.sprite(300, 500, 'door');
		game.physics.arcade.enable(toHallway);
		toHallway.anchor.x = 0.5;
		toHallway.anchor.y = 1;
		toHallway.scale.setTo(0.5,0.5);
		toHallway.body.setSize(160, 330, 40, 40);
		toHallway.frame = 1;
		// not using animations; just opening the door after a timer ends
		// player must be drawn last to be above everything
		player = game.add.sprite(200, 400, 'ghost');
		game.physics.arcade.enable(player);
		player.body.collideWorldBounds = true;
		player.body.setSize(80, 120, 35, 15);
		player.anchor.x = 0.5;
		player.anchor.y = 0.5;
		player.body.drag.x = 550;
		player.body.drag.y = 550;
		dialogueBox = game.add.sprite(100, 500, 'dBox');
		dialogueBox.alpha = 0;
		// photoText = game.add.text(320, 520, "This family looks really happy. Why do they seem so familiar?", style);
		// photoText.lineSpacing = -10;
		// photoText.alpha = 0;
		// player.body.setSize(200, 200, 200, 200);
		// player.animations.add('spin', [0, 1, 2, 3], 16, true);
		// player.animations.play('spin');
		game.camera.flash(0x000000, 2000);
		// game.time.events.add(Phaser.Timer.SECOND*10, openDoor, this);
	},
	update: function(){
 		controls = game.input.keyboard.createCursorKeys();
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
 		// game.physics.arcade.overlap(player, photo, revealInfo, null, this);
 		// if(checkOverlap(player, photo)){
 		// 	dialogueBox.alpha = 1;
 		// 	photoText.alpha = 1;
 		// }else{
 		// 	dialogueBox.alpha = 0;
 		// 	photoText.alpha = 0;
 		// }
 		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
 			toHallway.frame = 1;
 		}
 		game.physics.arcade.overlap(player, toHallway, fromKeith, null, this);
 		// game.physics.arcade.overlap(player, toKeith, goToKeith, null, this);
	}
	// render: function(){
	// 	game.debug.body(toHallway);
	// 	game.debug.body(player);
	// 	game.debug.body(photo);
	// }
};
//FUNCTIONS
// function revealInfo(){
// 	//dialogueBox = game.add.sprite(200, 800, 'dBox');
// }
// https://phaser.io/examples/v2/sprites/overlap-without-physics
//adding the word "start" into the function resulted in self-invocation
function fromKeith(){
	// console.log('this function should not call!');
	if(toHallway.frame == 1){
		game.camera.onFadeComplete.add(leaveKeith);
		game.camera.fade(0x000000, 1000);
	}
}
function leaveKeith(){
	game.state.start('Hallway');
}