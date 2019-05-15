var photo;
var dialogueBox;
var allClues;
var photoText;

var DaughterRoom = {
	create: function(){
		this.RoomName = 'Sara\'s Room';
		console.log('in Sara\'s room');
		game.camera.fade(0x000000, 0);
		background = game.add.sprite(0, 0, 'daughterR');
		// photo = game.add.sprite(400, 200, 'photo');
		// game.physics.arcade.enable(photo);
		// photo.scale.setTo(0.3, 0.3);
		// photo.body.setSize(200, 200, 200, 200);
		toHallway = game.add.sprite(200, 660, 'door');
		game.physics.arcade.enable(toHallway);
		toHallway.anchor.x = 0.5;
		toHallway.anchor.y = 1;
		toHallway.scale.setTo(0.7,0.7);
		toHallway.body.setSize(160, 330, 40, 40);
		// not using animations; just opening the door after a timer ends
		toHallway.frame = 1;
		// player must be drawn last to be above everything
		player = game.add.sprite(350, 500, 'ghost');
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
		if(checkOverlap(player, toHallway)){
 			prompt.alpha = prompt[0];
 			prompt.alpha = 1;
 			if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
 				transition();
 			}
 		}else{
 			prompt.alpha = 0;
 		}
 		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
 			toHallway.frame = 1;
 		}
 		game.physics.arcade.overlap(player, toHallway, fromSara, null, this);
	},
// 	render: function(){
// 		game.debug.body(toHallway);
// 		game.debug.body(player);
// 		game.debug.body(photo);
// 	}
};
//FUNCTIONS
// https://phaser.io/examples/v2/sprites/overlap-without-physics
//adding the word "start" into the function resulted in self-invocation
function fromSara(){
	// console.log('this function should not call!');
	if(toHallway.frame == 1){
		game.camera.onFadeComplete.addOnce(leaveSara);
		game.camera.fade(0x000000, 1000);
	}
}
function leaveSara(){
	game.state.start('Hallway');
}