var MainMenu = {
	// init: function(){
	// 	this.score = 0;
	// },
	create: function() {
		console.log('MainMenu: create');
		game.stage.backgroundColor = "#ffffff";
		bgm = game.add.audio('mainMenu');
		bgm.play();
		sfx = game.add.audio('buttonSelect');
		this.background = game.add.sprite(0, 0, 'homeScreen');
		this.title = game.add.text(100, 50, 'The Last Day', {fontSize: '64px', fill: '#66f5ff'});
		// this.title.anchor.set(0.5);
		this.line1 = game.add.text(100, 200, 'Start', {fontSize: '30px', fill: '#ffffff'});
		// this.line1.anchor.set(0.5);
		this.line2 = game.add.text(100, 250, 'Credits', {fontSize: '30px', fill: '#ffffff'});
		// this.line2.anchor.set(0.5);
		this.line3 = game.add.text(100, 300, 'Quit', {fontSize: '30px', fill: '#ffffff'});
		// this.line3.anchor.set(0.5);
		this.line1.inputEnabled = true;
		this.line2.inputEnabled = true;
		this.line3.inputEnabled = true;
		this.line1.events.onInputOver.add(over, this);
		this.line1.events.onInputOut.add(off, this);
		this.line1.events.onInputDown.add(startTransition, this);
		this.line2.events.onInputOver.add(over, this);
		this.line2.events.onInputOut.add(off, this);
		// this.line2.events.onInputDown.add(goToState, this);
		this.line3.events.onInputOver.add(over, this);
		this.line3.events.onInputOut.add(off, this);
		// this.line3.events.onInputDown.add(goToState, this);
	}
};
function over(item){
	item.strokeThickness = 3;
	item.stroke = '#000000';
};
function off(item){
	item.strokeThickness = 0;
};
function startTransition(){
	sfx.play();
	game.camera.onFadeComplete.add(goToState);
	game.camera.fade(0x000000, 1000);
}
function goToState(){
	bgm.stop();
	game.state.start('MasterRoom', true, false);
};
