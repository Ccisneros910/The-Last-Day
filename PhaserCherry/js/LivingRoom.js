var player;
var controls;
var photo;
var dialogueBox;
var LivingRoom = {
	create: function(){
	console.log('in the living room');
		game.camera.fade(0x000000, 0);
		background = game.add.sprite(0, 0, 'livingR');
		// photo = game.add.sprite(800, 500, 'photo');
		// game.physics.arcade.enable(photo);
		// photo.body.setSize(200, 200, 200, 200);
		// photo.scale = 0.5;
		player = game.add.sprite(100, 500, 'ghost');
		game.physics.arcade.enable(player);
		player.anchor.x = 0.5;
		player.anchor.y = 0.5;
		player.body.setSize(200, 200, 200, 200);
		// player.animations.add('spin', [0, 1, 2, 3], 16, true);
		// player.animations.play('spin');
		dialogueBox = game.add.sprite(200, 800, 'dialogue');
		game.camera.flash(0x000000, 2000);
	},
	update: function(){
 		controls = game.input.keyboard.createCursorKeys();
 		if(controls.up.isDown){
 			player.body.velocity.y = -300;
 		}else if(controls.down.isDown){
 			player.body.velocity.y = 300;
 		}else{
 			player.body.velocity.y = 0;
 		}
 		if(controls.left.isDown){
 			player.body.velocity.x = -300;
 		}else if(controls.right.isDown){
 			player.body.velocity.x = 300;
 		}else{
 			player.body.velocity.x = 0;
 		}
 		//game.physics.arcade.overlap(player, photo, revealInfo, null, this);
 		// if(checkOverlap(player, photo)){
 		// 	dialogueBox.alpha = 1;
 		// }else{
 		// 	dialogueBox.alpha = 0;
 		// }
	}
};

function revealInfo(){
	dialogueBox = game.add.sprite(200, 800, 'dialogue');
};
// https://phaser.io/examples/v2/sprites/overlap-without-physics
function checkOverlap(sprite1, sprite2){
    var boundsA = sprite1.getBounds();
    var boundsB = sprite2.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
};