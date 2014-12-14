(function(){
	var Asteroids = window.Asteroids = window.Asteroids || {};

	var MovingObject = Asteroids.MovingObject = function(attributes, game) {
		this.pos = attributes.pos;
		this.vel = attributes.vel;
		this.spd = attributes.spd;
		this.radius = attributes.radius;
		this.color = attributes.color;
		this.dir = attributes.dir;
		this.game = game;
	}

  MovingObject.prototype.draw = function(ctx) {
	  fillColor = this.color;
	  ctx.fillStyle = fillColor;
	  ctx.beginPath();
	  ctx.moveTo(this.pos[0], this.pos[1]);
	  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2, false);
	  ctx.fill();
  }

  MovingObject.prototype.move = function(){
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

  MovingObject.prototype.isCollidedWith = function(otherObject) {
  	if ((Math.sqrt(Math.pow((otherObject.pos[1] - this.pos[1]), 2) + 
          Math.pow((otherObject.pos[0] - this.pos[0]), 2)) 
            < (this.radius + otherObject.radius))) {
      return true;
    } else {
      return false;
    }
  }

  MovingObject.prototype.collideWith = function(otherObject) {
  }

  MovingObject.prototype.isWrappable = true;
})();