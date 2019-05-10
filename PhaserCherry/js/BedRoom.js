var player;
var controls;
var toHallway;
var photo;
var dialogueBox;
var BedRoom = {
	create: function(){
	console.log('in the bed room');
		game.camera.fade(0x000000, 0);
		background = game.add.sprite(0, 0, 'masterR');
		photo = game.add.sprite(800, 500, 'photo');
		game.physics.arcade.enable(photo);
		photo.body.setSize(200, 200, 200, 200);
		photo.body. scale = 0.5;
		toHallway = game.add.sprite(900, 600, 'door');
		game.physics.arcade.enable(toHallway);
		toHallway.anchor.x = 0.5;
		toHallway.anchor.y = 1;
		// not using animations; just opening the door after a timer ends
		toHallway.frame = 0;
		// player must be drawn last to be above everything
		player = game.add.sprite(200, 400, 'ghost');
		game.physics.arcade.enable(player);
		player.body.collideWorldBounds = true;
		player.anchor.x = 0.5;
		player.anchor.y = 0.5;
		dialogueBox = game.add.sprite(100, 500, 'dBox');
		// player.body.setSize(200, 200, 200, 200);
		// player.animations.add('spin', [0, 1, 2, 3], 16, true);
		// player.animations.play('spin');
		game.camera.flash(0x000000, 2000);
		game.time.events.add(Phaser.Timer.SECOND*5, openDoor, this);
	},
	update: function(){
 		controls = game.input.keyboard.createCursorKeys();
 		if(controls.up.isDown){
 			player.body.velocity.y = -200;
 		}else if(controls.down.isDown){
 			player.body.velocity.y = 200;
 		}else{
 			player.body.velocity.y = 0;
 		}
 		if(controls.left.isDown){
 			player.body.velocity.x = -200;
 		}else if(controls.right.isDown){
 			player.body.velocity.x = 200;
 		}else{
 			player.body.velocity.x = 0;
 		}
 		game.physics.arcade.overlap(player, photo, revealInfo, null, this);
 		if(checkOverlap(player, photo)){
 			dialogueBox.alpha = 1;
 		}else{
 			dialogueBox.alpha = 0;
 		}
 		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
 			toHallway.frame = 1;
 		}
 		game.physics.arcade.overlap(player, toHallway, transition, null, this);
	}
};
//FUNCTIONS
function revealInfo(){
	dialogueBox = game.add.sprite(200, 800, 'dBox');
}
// https://phaser.io/examples/v2/sprites/overlap-without-physics
function checkOverlap(sprite1, sprite2){
    var boundsA = sprite1.getBounds();
    var boundsB = sprite2.getBounds();
    return Phaser.Rectangle.intersects(boundsA, boundsB);
}
function openDoor(){
	console.log('this function will call later!');
	toHallway.frame = 1;
}
function transition(){
	console.log('this function should not call!');
	game.camera.onFadeComplete.add(leaveRoom);
	game.camera.fade(0x000000, 1000);
}
function leaveRoom(){
	game.state.start('LivingRoom');
}