(function() {

	var GameView = Asteroids.GameView = function(game, ctx) {
		this.game = game;
		this.ship = this.game.ship;
		this.ctx = ctx;
	}

	GameView.prototype.start = function() {
		this.bindKeyBoard();
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

	GameView.prototype.bindKeyBoard = function() {
		var that = this;

		KeyboardJS.on('up', function() {
			that.ship.power(-1);
		});

		KeyboardJS.on('up + space', function() {
			that.ship.power(-1);
			that.ship.fireBullet();
		});

		KeyboardJS.on('up + left', function() {
			that.ship.power(-1);
			that.ship.turn("left");
		});

		KeyboardJS.on('up + left + space', function() {
			that.ship.power(-1);
			that.ship.turn("left");
			that.ship.fireBullet();
		});

		KeyboardJS.on('up + right', function() {
			that.ship.power(-1);
			that.ship.turn("right");
		});

		KeyboardJS.on('up + right + space', function() {
			that.ship.power(-1);
			that.ship.turn("right");
			that.ship.fireBullet();
		});

		KeyboardJS.on('down', function() {
			that.ship.power(1);
		});

		KeyboardJS.on('down + left', function() {
			that.ship.power(1);
			that.ship.turn("left");
		});

		KeyboardJS.on('down + left + space', function() {
			that.ship.power(1);
			that.ship.turn("left");
			that.ship.fireBullet();
		});

		KeyboardJS.on('down + right', function() {
			that.ship.power(1);
			that.ship.turn("right");
		});

		KeyboardJS.on('down + right + space', function() {
			that.ship.power(1);
			that.ship.turn("right");
			that.ship.fireBullet();
		});


		KeyboardJS.on('left', function() {
			that.ship.turn("left");
		});

		KeyboardJS.on('right', function() {
			that.ship.turn("right");
		});

		KeyboardJS.on('space', function() {
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
    ctx.fillText("The asteroids overwhelmed you.", canvas.width/2, 280);
    ctx.fillStyle = 'red';
    ctx.fillText("Your Score: " + this.game.score, canvas.width/2, 330);
	}

})(); 