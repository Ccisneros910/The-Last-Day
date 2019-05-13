var Load = {
	preload: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
		console.log('MainMenu: preload');
		game.load.path = ('assets/img/');
		game.load.image('homeScreen', 'house.jpg');
		game.load.image('dialogue', 'dialogueBox.jpg');
		//Characters
		game.load.image('ghost', 'ghostSmall.png');
		//game.load.atlas('ghost', 'ghost.png', 'ghost.json');
		//Clues
		game.load.image('photo', 'familyPhoto.png');
		game.load.image('glow', 'glowBall.png');
		//Rooms
		game.load.image('daughterR', 'RoomDaughter.png');
		game.load.image('hallway', 'RoomHallway.png');
		game.load.image('masterR', 'RoomMaster.jpg');
		game.load.image('livingR', 'RoomLiving.jpg');
		game.load.image('testR', 'testRoom.png');
		//Misc
		game.load.image('dBox', 'dialogueBox.png');
		game.load.atlas('door', 'doors.png', 'doors.json');
		// details on how to use texture atlases
		//https://github.com/photonstorm/phaser-examples/blob/master/examples/loader/load%20texture%20atlas.js
	}, 
	create: function(){
		game.state.start('Menu');
	}
}