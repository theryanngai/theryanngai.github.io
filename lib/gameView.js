(function() {

	var GameView = Asteroids.GameView = function(game, ctx) {
		this.game = game;
		this.ship = this.game.ship;
		this.ctx = ctx;
	}

	GameView.prototype.start = function() {
		this.bindKeyDrown();
		var that = this;
		setInterval(function() {
			if (!that.game.checkGameOver()) {
				that.game.step();
				that.game.draw(this.ctx);
			} else {
				that.endingScreen(ctx);
			}
		}, 20);
	}

	GameView.prototype.bindKeyDrown = function() {
		var that = this;

		kd.run(function () {
			kd.tick();
		});

		kd.UP.down(function() {
			that.ship.power(-0.15);
		});

		kd.LEFT.down(function() {
			that.ship.turn("left");
		});

		kd.RIGHT.down(function() {
			that.ship.turn("right");
		});

		kd.DOWN.down(function() {
			that.ship.power(0.15);
		});

		kd.SPACE.press(function() {
			that.ship.fireBullet();
		});
	}

	GameView.prototype.endingScreen = function(ctx) {
    ctx.clearRect(0, 0, DIM_X, DIM_Y);
    ctx.drawImage(img, 0, 0);
    ctx.font = "60px Helvetica";
		ctx.textAlign = "center";
		ctx.fillStyle = 'white';
		ctx.fillText("GAME OVER", canvas.width/2, 250);
		ctx.font = "20px Helvetica"
    ctx.fillText("You want asteroids?! YOU CAN'T HANDLE THE ASTEROIDS!", canvas.width/2, 280);
    ctx.fillStyle = 'red';
    ctx.fillText("Your Score: " + this.game.score, canvas.width/2, 330);
	}

})(); 