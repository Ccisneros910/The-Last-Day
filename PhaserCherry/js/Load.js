var Load = {
	preload: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
		console.log('MainMenu: preload');
		game.load.path = ('assets/img/');
		game.load.image('homeScreen', 'house.jpg');
		game.load.image('dialogue', 'dialogueBox.jpg');
		game.load.image('room', 'room-resized.png');
		game.load.image('glow', 'glowBall.png');
		game.load.image('photo', 'familyPhoto.png');
		game.load.atlas('ghost', 'ghost.png', 'ghost.json');
		//https://github.com/photonstorm/phaser-examples/blob/master/examples/loader/load%20texture%20atlas.js
		// details on how to use texture atlases
		//game.load.atlas('atlas', 'spritesheet.png', 'sprites.json');
		//game.load.atlas('animations', 'animations.png', 'animations.json');
		//game.load.audio('collect', 'assets/audio/beep 8 (403005__inspectorj__ui-confirmation-alert-a4).wav');

	}, 
	create: function(){
		game.state.start('Menu');
	}
}