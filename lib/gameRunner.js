document.body.onkeyup = function(e) {
	if(e.keyCode == 32){
		var game = new Asteroids.Game;
		var gameview = new Asteroids.GameView(game, ctx);
		gameview.start();
		document.body.onkeyup = function(e) {};
	}
}