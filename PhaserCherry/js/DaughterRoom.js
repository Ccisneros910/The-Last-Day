var photo;
var dialogueBox;
var allClues;
var photoText;

var DaughterRoom = {
	create: function(){
		this.RoomName = 'Sara\'s Room';
		console.log('in Sara\'s room');
		game.camera.fade(0x000000, 0);
		background = game.add.sprite(0, 0, 'daughterR');
		toHallway = new Door(game, 200, 660, 'door', 1, 'Hallway', 0.7);
		// player must be drawn last to be above everything
		player = new Player(game, 200, 400, 'ghost');
		dialogueBox = game.add.sprite(100, 500, 'dBox');
		dialogueBox.alpha = 0;
		game.camera.flash(0x000000, 2000);
	},
	update: function(){
		if(checkOverlap(player, toHallway)){
 			prompt.alpha = prompt[0];
 			prompt.alpha = 1;
 			if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
 				transition();
 			}
 		}else{
 			prompt.alpha = 0;
 		}
 		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
 			toHallway.frame = 1;
 		}
 		game.physics.arcade.overlap(player, toHallway, fromSara, null, this);
	},
// 	render: function(){
// 		game.debug.body(toHallway);
// 		game.debug.body(player);
// 		game.debug.body(photo);
// 	}
};
//FUNCTIONS
// https://phaser.io/examples/v2/sprites/overlap-without-physics
//adding the word "start" into the function resulted in self-invocation
function fromSara(){
	// console.log('this function should not call!');
	if(toHallway.frame == 1){
		game.camera.onFadeComplete.add(leaveSara);
		game.camera.fade(0x000000, 1000);
	}
}
function leaveSara(){
	game.state.start('Hallway');
}