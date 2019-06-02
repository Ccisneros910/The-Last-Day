var Kitchen = {
	create: function(){
		this.RoomName = 'Sara\'s Room';
		console.log('in Sara\'s room');
		game.camera.fade(0x000000, 0);
		background = game.add.sprite(0, 0, 'kitchen');
		toLivingRoom = new Door(game, 300, 690, 'door', 1, 'LivingRoom', 1.5, 0.3);
		// player must be drawn last to be above everything
		//make player
		player = new Player(game, 200, 400, 'ghost');
		player.alpha = 0.8;
		// the spacebar will follow the player around
		spacebarP = player.addChild(game.add.sprite(10, -130, 'space bar'));
		spacebarP.scale.set(0.15, 0.15);
		spacebarP.animations.add('dance');
		spacebarP.alpha = 0.8;
		spacebarP.anchor.x = 0.5;
		spacebarP.anchor.y = 0.5;
		dBox = game.add.sprite(100, 500, 'dBox');
		dBox.alpha = 0;
		cutscenePlaying = false;
		game.camera.flash(0x000000, 2000);
	},
	update: function(){
	 	player.time++;
	 	if(cutscenePlaying){
	 		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && player.time >50){
	 			if(nextEvent!=null){
	 				// GregCutscene();
	 			}else if(nextEvent == null){
	 				resetDBox();
	 				cutscenePlaying = false;
	 			}
	 		}
	 	}else if(!cutscenePlaying){
	 		// console.log("no cutscene");
			if(game.physics.arcade.overlap(player, toLivingRoom, overDoor, null, this)){ 		
	 			// to leave the room
	 		}else{
	 			clearPlayer();
				stopSpacebar();
	 		}
	 	}
	}
// 	render: function(){
// 		game.debug.body(toHallway);
// 		game.debug.body(player);
// 		game.debug.body(photo);
// 	}
};