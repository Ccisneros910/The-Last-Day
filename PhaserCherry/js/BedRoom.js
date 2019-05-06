var player;
var controls;
var photo;
var BedRoom = {
	create: function(){
	console.log('in the bed room');
		game.camera.fade(0x000000, 0);
		background = game.add.sprite(0, 0, 'room');
		photo = game.add.sprite(200, 300, 'photo');
		//photo.scale = 0.5;
		player = game.add.sprite(game.world.centerX, game.world.centerY, 'ghost');
		game.physics.arcade.enable(player);
		player.animations.add('spin', [0, 1, 2, 3], 16, true);
		player.animations.play('spin');
		game.camera.flash(0x000000, 2000);
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
	}
};