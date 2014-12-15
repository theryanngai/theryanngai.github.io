(function() {
	var Ship = Asteroids.Ship = function(pos, game) {
		Ship.RADIUS = 20;
		Ship.COLOR = 'lightblue';
		var spd = 0;
		var game = game;
		var pos = pos;
		var dir = 0; //degree measure, between 0 and 360

		var attributes = {
			color: Ship.COLOR,
			radius: Ship.RADIUS,
			pos: pos,
			game: game,
			dir: dir,
			spd: spd
		};

		Asteroids.MovingObject.call(this, attributes, game);
	}

	Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

	Ship.prototype.move = function() {
		var dirCalc = ((this.dir % 90) * Math.PI/180);
		var deltaX = Math.sin(dirCalc) * this.spd; 
		var deltaY = Math.cos(dirCalc) * this.spd;

		if (this.dir >= 0 && this.dir < 90) {
			var deltaSigns = [-1, 1];
			var swap = false;
		} else if (this.dir >= 90 && this.dir < 180) {
			var deltaSigns = [-1, -1];
			var swap = true;
		} else if (this.dir >= 180 && this.dir < 270) {
			var deltaSigns = [1, -1];
			var swap = false;
		} else if (this.dir >= 270 && this.dir < 360) {
			var deltaSigns = [1, 1];
			var swap = true;
		}

		if (swap) {
			this.pos[0] += deltaY * deltaSigns[0];
			this.pos[1] += deltaX * deltaSigns[1];
		} else {
			this.pos[0] += deltaX * deltaSigns[0];
			this.pos[1] += deltaY * deltaSigns[1];
		}
		
  	if (this.game.isOutOfBounds(this.pos)) {
  		if (this.isWrappable) {
  			this.game.wrap(this.pos);
  		} else {
  			this.game.remove(this);
  		}
  	}
	}

	Ship.prototype.decaySpeed = function() {
		if (this.spd < 0) {
			this.spd += 0.05;
		}

		if (this.spd > 0) {
			this.spd = 0;
		}
	}

	Ship.prototype.relocate = function() {
		this.pos = this.game.randomPosition();
		this.dir = this.game.randomDir();
		this.spd = 0;
		this.vel = [0, 0];
	}

	Ship.prototype.power = function(impulse) {
		if ((this.spd + impulse) <= 0) {
			this.spd += impulse;
		}
	}

	Ship.prototype.turn = function(direction) {
		if (direction === "left") {
			this.dir -= 5;
		} else {
			this.dir += 5;
		}

		if (this.dir <= 0) {
			this.dir += 360;
		} 

		if (this.dir >= 360) {
			this.dir = this.dir % 360;
		}
	}

	Ship.prototype.fireBullet = function() {
		var newSpd = this.spd - 5;
		var newPos = [this.pos[0], this.pos[1]];
		var bullet = new Asteroids.Bullet(newPos, this.dir, newSpd, this.game);
		this.game.add(bullet);
	}

	Ship.prototype.draw = function(ctx, angle) {
		var radAngle = (angle * Math.PI/180);
		ctx.save();
		ctx.translate(this.pos[0], this.pos[1]);
		ctx.rotate(radAngle);
		ctx.drawImage(ship, -(ship.width/2), -(ship.height/2));
		ctx.restore();
	}
})();