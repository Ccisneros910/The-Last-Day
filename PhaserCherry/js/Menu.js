var MainMenu = {
	// init: function(){
	// 	this.score = 0;
	// },
	create: function() {
		console.log('MainMenu: create');
		// game.camera.fade(0x000000, 1);
		game.stage.backgroundColor = "#ffffff";
		bgm = game.add.audio('mainMenu');
		bgm.play("", 1, 0.3 , true);
		sfx = game.add.audio('buttonSelect');
		this.background = game.add.sprite(0, 0, 'homeScreen');
		this.title = game.add.sprite(100, 50, 'title');
		this.title.scale.set(0.4, 0.4);
		// this.title.anchor.set(0.5);
		this.line1 = game.add.text(100, 200, 'Start', optionStyle);
		// this.line1.anchor.set(0.5);
		this.line2 = game.add.text(100, 250, 'Credits', optionStyle);
		// this.line2.anchor.set(0.5);
		this.line3 = game.add.text(100, 300, 'Quit', optionStyle);
		this.line3.alpha = 0;
		//credits text
		this.creditsTitle  = game.add.text(game.world.centerX, 100, 'A We Dem Boyz Production', titleStyle);
		this.credits = game.add.text(game.world.centerX, 200, 'Team Members:\nCarlos Cisneros\nSally Nguy\nKatheriya Prowsri\n\nContributing Artist:\n', creditStyle);
		this.creditsExit = game.add.text(game.world.centerX, 600, 'Back', optionStyle);
		// hide the credits
		this.creditsTitle.alpha = 0;
		this.credits.alpha = 0;
		this.creditsExit.alpha = 0;
		this.creditsTitle.anchor.x = 0.5;
		this.credits.anchor.x = 0.5;
		this.creditsExit.anchor.x = 0.5;
		//enable input for buttons
		this.line1.inputEnabled = true;
		this.line2.inputEnabled = true;
		this.line3.inputEnabled = false;
		this.creditsExit.inputEnabled = true;
		// add functionality to the buttons
		this.line1.events.onInputOver.add(over, this);
		this.line1.events.onInputOut.add(off, this);
		this.line1.events.onInputDown.add(startTransition, this);
		this.line2.events.onInputOver.add(over, this);
		// hide the buttons and reveal the credits
		this.line2.events.onInputDown.add(showCredits, this, this.a, this.title, this.line1, this.line3, this.creditsTitle, this.credits, this.creditsExit);
		this.line2.events.onInputOut.add(off, this);
		this.line3.events.onInputOver.add(over, this);
		this.line3.events.onInputOut.add(off, this);
		this.creditsExit.events.onInputOver.add(over, this);
		// hide the credits and reveal the buttons
		this.creditsExit.events.onInputDown.add(hideCredits, this, this.a, this.title, this.line1, this.line2, this.line3, this.creditsTitle, this.credits);
		this.creditsExit.events.onInputOut.add(off, this);
		game.camera.flash(0x000000, 3000);
	}
};
function over(item){
	item.strokeThickness = 3;
	item.stroke = '#ffffff';
};
function off(item){
	item.strokeThickness = 0;
};
function showCredits(item, a, t1, l2, l3, c1, c2, l4){
	// hide the main menu
	game.add.tween(item).to({alpha:0},1000, "Linear", true);
	console.log(t1);
	game.add.tween(t1).to({alpha:0},1000, "Linear", true);
	game.add.tween(l2).to({alpha:0},1000, "Linear", true);
	game.add.tween(l3).to({alpha:0},1000, "Linear", true);
	item.inputEnabled = false;
	t1.inputEnabled = false;
	l2.inputEnabled = false;
	l3.inputEnabled = false;
	// reveal the credits menu
	game.add.tween(c1).to({alpha:1},1000, "Linear", true, 1100);
	game.add.tween(c2).to({alpha:1},1000, "Linear", true, 1100);
	game.add.tween(l4).to({alpha:1},1000, "Linear", true, 1100);
	l4.inputEnabled = true;
};
function hideCredits(item, a, t1, l1, l2, l3, c1, c2){
	// hide the credits menu
	game.add.tween(item).to({alpha:0},1000, "Linear", true);
	game.add.tween(c1).to({alpha:0},1000, "Linear", true);
	game.add.tween(c2).to({alpha:0},1000, "Linear", true);
	item.inputEnabled = false;
	c1.inputEnabled = false;
	c2.inputEnabled = false;
	// make the options reappear
	game.add.tween(t1).to({alpha:1},1000, "Linear", true, 1100);
	game.add.tween(l1).to({alpha:1},1000, "Linear", true, 1100);
	game.add.tween(l2).to({alpha:1},1000, "Linear", true, 1100);
	game.add.tween(l3).to({alpha:0},1000, "Linear", true, 1100);
	l1.inputEnabled = true;
	l2.inputEnabled = true;
	// l3.inputEnabled = true;
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
