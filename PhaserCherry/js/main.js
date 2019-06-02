/*
TEAM: WE DEM BOIZ
Team members: Carlos Cisneros, , Sally Nguy, Katheriya Prowsri
*/
var game = new Phaser.Game(1280, 720, Phaser.AUTO, ''); //{ preload: preload, create: create, update: update });
//MAIN MENU STATE
game.state.add('Load', Load);
game.state.add('Menu', MainMenu);
game.state.add('Hallway', Hallway);
game.state.add('DaughterRoom', DaughterRoom);
game.state.add('SonRoom', SonRoom);
game.state.add('LivingRoom', LivingRoom);
game.state.add('Kitchen', Kitchen);
game.state.add('MasterRoom', MasterRoom);
game.state.start('Load');
