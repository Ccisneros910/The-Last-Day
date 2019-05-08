var game = new Phaser.Game(1280, 720, Phaser.AUTO, ''); //{ preload: preload, create: create, update: update });
//MAIN MENU STATE
game.state.add('Load', Load);
game.state.add('Menu', MainMenu);
game.state.add('BedRoom', BedRoom);
game.state.start('Load');

// var TheLastDay = {};
// MainMenu = function(game){
// 	var text;
// 	var background;
// 	var title, line1 = null, line2, line3;
// };
// MainMenu.prototype = {
// 	// init: function(){
// 	// 	this.score = 0;
// 	// },
// 	preload: function(){
// 		console.log('MainMenu: preload');
// 		game.load.path = ('assets/img/');
// 		game.load.image('homeScreen', 'house.jpg');
// 		game.load.image('room', 'roomSample.png');
// 		//https://github.com/photonstorm/phaser-examples/blob/master/examples/loader/load%20texture%20atlas.js
// 		// details on how to use texture atlases
// 		//game.load.atlas('atlas', 'spritesheet.png', 'sprites.json');
// 		//game.load.atlas('animations', 'animations.png', 'animations.json');
// 		//game.load.audio('collect', 'assets/audio/beep 8 (403005__inspectorj__ui-confirmation-alert-a4).wav');
// 	},
// 	create: function() {
// 		console.log('MainMenu: create');
// 		game.stage.backgroundColor = "#ffffff";
// 		this.background = game.add.sprite(0, 0, 'homeScreen');
// 		this.title = game.add.text(100, 50, 'The Last Day', {fontSize: '64px', fill: '#66f5ff'});
// 		// this.title.anchor.set(0.5);
// 		this.line1 = game.add.text(100, 200, 'Start', {fontSize: '30px', fill: '#ffffff'});
// 		// this.line1.anchor.set(0.5);
// 		this.line2 = game.add.text(100, 250, 'Credits', {fontSize: '30px', fill: '#ffffff'});
// 		// this.line2.anchor.set(0.5);
// 		this.line3 = game.add.text(100, 300, 'Quit', {fontSize: '30px', fill: '#ffffff'});
// 		// this.line3.anchor.set(0.5);
// 		this.line1.inputEnabled = true;
// 		this.line2.inputEnabled = true;
// 		this.line3.inputEnabled = true;
// 		this.line1.events.onInputOver.add(over, this);
// 		this.line1.events.onInputOut.add(off, this);
// 		this.line1.events.onInputDown.add(goToState, this);
// 		this.line2.events.onInputOver.add(over, this);
// 		this.line2.events.onInputOut.add(off, this);
// 		this.line2.events.onInputDown.add(goToState, this);
// 		this.line3.events.onInputOver.add(over, this);
// 		this.line3.events.onInputOut.add(off, this);
// 		this.line3.events.onInputDown.add(goToState, this);
// 	},
// 	update: function() {
// 		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
// 			game.state.start('Play', true, false, this.score);
// 		}
// 	}
// };

// moving this above the functions allowed the states to cycle properly