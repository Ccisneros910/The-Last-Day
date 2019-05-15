var photo;
var allClues;
var photoText;
var Hallway = {
	create: function(){
	console.log('in the hallway');
	this.RoomName = 'Hallway';
		game.camera.fade(0x000000, 0);
		background = game.add.sprite(0, 0, 'hallway');
		background.scale.setTo(1.3, 1); // not wide enough to fit screen
		// photo = game.add.sprite(400, 200, 'photo');
		// game.physics.arcade.enable(photo);
		// photo.scale.setTo(0.3, 0.3);
		// photo.body.setSize(200, 200, 200, 200);
		toSara = game.add.sprite(370, 500, 'door');
		game.physics.arcade.enable(toSara);
		toSara.anchor.x = 0.5;
		toSara.anchor.y = 1;
		toSara.scale.setTo(0.5,0.5);
		toSara.body.setSize(160, 330, 40, 40);
		toSara.frame = 1;
		toSara.name = 'Sara';
		toKeith = game.add.sprite(800, 500, 'door');
		game.physics.arcade.enable(toKeith);
		toKeith.anchor.x = 0.5;
		toKeith.anchor.y = 1;
		toKeith.scale.setTo(0.5,0.5);
		toKeith.body.setSize(160, 330, 40, 40);
		toKeith.frame = 1;
		toKeith.name = 'Keith'; 
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
 		game.physics.arcade.overlap(player, toSara, goToSara, null, this);
 		game.physics.arcade.overlap(player, toKeith, goToKeith, null, this);
	},
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
// function openDoor(){
// 	console.log('this function will call later!');
// 	toHallway.frame = 1;
// }
//adding the word "start" into the function resulted in self-invocation
function goToSara(){
	// console.log('this function should not call!');
		game.camera.onFadeComplete.addOnce(RoomSara);
		game.camera.fade(0x000000, 1000);
}
function RoomSara(){
	game.state.start('DaughterRoom');
}
function goToKeith(){
	// console.log('this function should not call!');
		game.camera.onFadeComplete.addOnce(RoomKeith);
		game.camera.fade(0x000000, 1000);
}
function RoomKeith(){
	game.state.start('SonRoom');
}