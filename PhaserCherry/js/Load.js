var promptMessages = ["Press SPACEBAR to enter"];
// characters
var Sara, Keith, Greg;
var GregTween, SaraTween, KeithTween;
var GhostEmotes, GregEmotes, SaraEmotes, KeithEmotes;
// event management (booleans)
var SaraDone, KeithDone, GregDone;
var t01, t02, t03, t04, t05, t06, t07, t08, t09, t10;
// player variables
var player, controls;
// reusables
var prompt, dialogueBox, dialogueText, spacebarP, spacebarB; //images and text
var toHallway, toSara, toKeith; // doors
var overClue, dialoguePlaying, cutscenePlaying = false; // booleans
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
var creditsStyle = {
	font: 'Pacifico',
	fontSize: 25,
	fill: '#ffffff'
	
};
// Dialogue text style
var dialogueStyle = {
	font: 'Libre Baskerville',
	fontSize: 40,
	fill: '#000000'
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

// TWEEN mangament functions
// function MoveTween()