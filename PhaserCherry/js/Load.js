var Load = {
	preload: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
		console.log('MainMenu: preload');
		game.load.path = ('assets/img/');
		game.load.image('homeScreen', 'house.jpg');
		game.load.image('dialogue', 'dialogueBox.jpg');
		game.load.image('masterR', 'master.jpg');
		game.load.image('livingR', 'living room.jpg');
		game.load.image('glow', 'glowBall.png');
		game.load.image('photo', 'familyPhoto.png');
		game.load.image('ghost', 'ghostSmall.png');
		game.load.image('dBox', 'dialogueBox.png');
		//game.load.atlas('ghost', 'ghost.png', 'ghost.json');
		game.load.atlas('door', 'doors.png', 'doors.json');
		// details on how to use texture atlases
		//https://github.com/photonstorm/phaser-examples/blob/master/examples/loader/load%20texture%20atlas.js
	}, 
	create: function(){
		game.state.start('Menu');
	}
}