(function() {
	var Asteroid = Asteroids.Asteroid = function(pos, game, rad) {
		Asteroid.COLOR = 'gray';
		Asteroid.RADIUS = Asteroids.Util.randomRad(50);
		var dir = Asteroids.Util.randomDir();
		var spd = (Asteroids.Util.randomSpd(3) + 1);
		var pos = pos;
		var game = game;

		if (rad) {
			var radius = rad;
		} else {
			var radius = Asteroid.RADIUS;
		}

		var attributes = {
			color: Asteroid.COLOR,
			radius: radius,
			dir: dir,
			spd: spd,
			pos: pos,
			game: game
		};

		Asteroids.MovingObject.call(this, attributes, game);
	}

	Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

	Asteroid.prototype.collideWith = function(otherObject) {
		if (otherObject instanceof Asteroids.Ship) {
			this.game.lives -= 1;
			otherObject.relocate();
		} 
		if (otherObject instanceof Asteroids.Bullet) {
			otherObject.collideWith(this);
			if (this.radius > 15) {
				var newPos = [this.pos[0], this.pos[1]];
				this.game.add(new Asteroid([this.pos[0], this.pos[1]], this.game, this.radius/2));
				this.game.add(new Asteroid([this.pos[0], this.pos[1]], this.game, this.radius/2));
			}
		}
	}

	Asteroid.prototype.draw = function(ctx, angle) {
		var radAngle = (angle * Math.PI/180);
		ctx.save();
		ctx.translate(this.pos[0], this.pos[1]);
		ctx.rotate(radAngle);
		ctx.drawImage(asteroidImg, 
									-(this.radius * 3.5/2), -(this.radius * 3.5/2),
									this.radius * 3.5, this.radius * 3.5
									);
		ctx.restore();
	}
})();