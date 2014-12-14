(function() {
	var Bullet = Asteroids.Bullet = function(pos, dir, spd, game) {
		Bullet.RADIUS = 4;
		Bullet.COLOR = 'red';
		var spd = spd;
		var dir = dir;
		var game = game;
		var pos = pos;


		var attributes = {
			color: Bullet.COLOR,
			radius: Bullet.RADIUS,
			dir: dir,
			spd: spd,
			pos: pos,
			game: game
		};

		Asteroids.MovingObject.call(this, attributes, game);
	}

	Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

	Bullet.prototype.collideWith = function(otherObject) {
		if (otherObject instanceof Asteroids.Asteroid) {
			this.game.score += 50;
			this.game.remove(otherObject);
			this.game.remove(this);
		}
	}

	Bullet.prototype.draw = function(ctx, angle) {
		var radAngle = (angle * Math.PI/180);
		ctx.save();
		ctx.translate(this.pos[0], this.pos[1]);
		ctx.rotate(radAngle);
		ctx.drawImage(bullet, -(bullet.width/2), -(bullet.height/2));
		ctx.restore();
	}

	Bullet.prototype.isWrappable = false;
})();