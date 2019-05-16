var promptMessages = ["Press SPACEBAR to enter"];
// characters
var Sara, Keith, Greg;
// event management
var SaraDone, KeithDone, GregDone;
// player variables
var player, controls;
// reusables
var prompt, dialogueBox, dialogueText, spacebarP, spacebarB; //images and text
var toHallway, toSara, toKeith; // doors
var overClue, playerPaused; // booleans
var bgm, sfx; 
var style = { font: 'bold 25pt Arial', fill: 'black', align: 'left', wordWrap: true, wordWrapWidth: 800 };
var clues, clue, viewing = false;
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
		game.load.image('frame1', 'frame1.jpg');
		game.load.image('frame2', 'frame2.jpg');
		game.load.image('polaroid', 'polaroid.jpg');
		game.load.image('flower', 'flower.png');
		game.load.image('ring', 'ring.png');
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
		game.load.atlas('space bar', 'atlasSpacebar.png', 'hashSpacebar.json');
		//AUDIO LOADING
		game.load.path = ('assets/audio/');
		// BGM
		game.load.audio('mainMenu', '240914_bdvictor_wheat-in-the-wind.mp3');
		// SFX
		game.load.audio('buttonSelect', '339343_newagesoup_soft-blip-e-major.mp3');
		// details on how to use texture atlases
		//https://github.com/photonstorm/phaser-examples/blob/master/examples/loader/load%20texture%20atlas.js
	}, 
	create: function(){
		game.state.start('Menu');
	}
}