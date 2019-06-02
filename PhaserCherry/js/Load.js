var promptMessages = ["Press SPACEBAR to enter"];
// characters
var Sara, Keith, Greg;
var GregTween, SaraTween, KeithTween;
var GhostEmotes, GregEmotes, SaraEmotes, KeithEmotes;
// cutscenes variables
var SaraScene = 0, KeithScene = 0, GregScene = 0;
var event = 0, nextEvent;
var dialogue; // file to read from
var prompt, dBox, dText, spacebarP, spacebarB; //images and text
// player variables
var player, controls;
// reusables
var toHallway, toSara, toKeith; // doors
var overClue, dialoguePlaying = false, cutscenePlaying = false; // booleans
//finished cutscenes
var enterGreg = false, goodbyeGreg = false, enterSara = false, goodbyeSara = false, enterKeith = false, goodbyeKeith = false;
var bgm, sfx; 
// Main Menu text style
var titleStyle = {
	font: 'Pacifico',
	fontSize: 64,
	fill: '#66f5ff'
};
var optionStyle = {
	font: 'Pacifico',
	fontSize: 30,
	fill: '#ffffff'
};
var creditStyle = {
	font: 'Pacifico',
	fontSize: 25,
	fill: '#ffffff',
	backgroundColor: '#a3a3a3'
};
// Dialogue text style
var dialogueStyle = {
	font: 'Libre Baskerville',
	fontSize: 30,
	fill: '#000000'
	textWrap: 500;
};

var style = { font: 'bold 25pt Arial', fill: 'black', align: 'left', wordWrap: true, wordWrapWidth: 700 };
var clues, clue, viewing = false;
var Load = {
	preload: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
		console.log('MainMenu: preload');
		game.load.path = ('assets/img/');
		game.load.image('homeScreen', 'house.jpg');
		// game.load.image('dialogue', 'dialogueBox.jpg');
		//Characters
		// game.load.image('ghost', 'ghostSmall.png');
		game.load.atlas('ghost', 'ghostAnimation.png', 'ghostAnimation.json');
		game.load.atlas('GhostEmotions', 'ghostEmotions.png', 'ghostEmotions.json');
		game.load.image('Greg', 'GregOverworldSprite.png');
		game.load.atlas('GregEmotions', 'gregEmotions.png', 'gregEmotions.json');
		game.load.image('Sara', 'SaraOverworldSprite.png');
		game.load.atlas('SaraEmotions', 'saraEmotions.png', 'saraEmotions.json');
		game.load.image('Keith', 'keithOverworldSprite.png');
		//Clues
		game.load.image('Wedding', 'clueWeddingPortrait.png');	// Greg clues
		game.load.image('ring', 'clueRing.png');
		game.load.image('Camera', 'clueCamera.png');			// Sara Clues
		game.load.image('PhotoWall', 'clueWallPhotos.png');
		game.load.image('ChefsHat', 'clueChefsHat.png');			// Keith Clues
		game.load.image('CookBook', 'clueCookBook.png');
		// game.load.image('glow', 'glowBall.png');
		//Misc
		game.load.image('dBox', 'dialogueBox.png');
		game.load.atlas('door', 'doors.png', 'doors.json');
		game.load.atlas('space bar', 'atlasSpacebar.png', 'hashSpacebar.json');
		//Rooms
		game.load.path = ('assets/img/Rooms/');
		game.load.image('masterR', 'masterBedroom.png');
		game.load.image('hallway', 'hallway.png');
		game.load.image('daughterR', 'saraBedroom.png');
		game.load.image('livingR', 'livingRoom.png');
		game.load.image('testR', 'testRoom.png');
		// DIALOGUE LOADING
		game.load.path = ('dialog/');
		game.load.text('GregScenes', 'GregRoomScenes.json');
		game.load.text('SaraScenes', 'SaraRoomScenes.json');
		game.load.text('KeithScenes', 'KeithRoomScenes.json');
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

// TWEEN mangament functions
// function MoveTween()