(function() {

	var Game = Asteroids.Game = function() {
		DIM_X = 700;
		DIM_Y = 700;
		NUM_ASTEROIDS = 8;
		this.asteroids = [];
    this.bullets = [];
    this.ship = new Asteroids.Ship(this.randomPosition(), this);
    this.score = 0;
    this.lives = 4;

		this.addAsteroids();
	}

  Game.prototype.allObjects = function() {
    var everything = this.asteroids.slice();
    everything.push(this.ship);
    return everything.concat(this.bullets);
  }

	Game.prototype.addAsteroids = function() {
		while (this.asteroids.length < NUM_ASTEROIDS) {
			this.add(new Asteroids.Asteroid(this.randomPosition(), this));
		}
	}

  Game.prototype.add = function(obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj);
    } else if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj);
    }
  }

  Game.prototype.remove = function(obj) {
    if (obj instanceof Asteroids.Asteroid) {
      var index = this.asteroids.indexOf(obj);
      this.asteroids.splice(index, 1);
    } else if (obj instanceof Asteroids.Bullet) {
      var index = this.bullets.indexOf(obj);
      this.bullets.splice(index, 1);
    }
  }

  Game.prototype.randomPosition = function() {
    xPos = Math.floor((Math.random() * DIM_X) + 1);
    yPos = Math.floor((Math.random() * DIM_Y) + 1);
    return [xPos, yPos];
  }  

  Game.prototype.randomDir = function() {
    return Math.floor(Math.random() * 360);
  }

  Game.prototype.draw = function(ctx) {
  	ctx.clearRect(0, 0, DIM_X, DIM_Y);
    ctx.drawImage(img, 0, 0);
  	this.allObjects().forEach(function(object) {
      if (object instanceof Asteroids.Ship || object instanceof Asteroids.Bullet) {
        object.draw(ctx, object.dir);
      } else {
        object.draw(ctx, object.dir);
      }
  	});
    this.drawHUD(ctx);
  }

  Game.prototype.drawHUD = function(ctx) {
    ctx.font = "20px Helvetica";
    ctx.textAlign = "left";
    ctx.fillStyle = 'orange';
    ctx.fillText("Score: " + this.score, 50, 50);
    ctx.textAlign = 'right';
    ctx.fillStyle = 'red';
    ctx.fillText("Lives: " + this.lives, canvas.width - 50, 50);
  }

  Game.prototype.moveObjects = function() {
  	this.allObjects().forEach(function(object) {
  		object.move();
  	})
  }

  Game.prototype.wrap = function(pos) {
  	if (pos[0] > DIM_X) {
  		pos[0] = pos[0] % DIM_X;
  	}

    if(pos[0] < 0) {
      pos[0] += DIM_X;
    }

  	if (pos[1] > DIM_Y) {
  		pos[1] = pos[1] % DIM_Y;
  	}

    if (pos[1] < 0) {
      pos[1] += DIM_Y;
    }
  }

  Game.prototype.checkCollisions = function() {
    var everything = this.allObjects();
    for(var i = 0; i < everything.length - 1; i++) {
      for(var j = i + 1; j < everything.length; j++) {
        if (everything[i].isCollidedWith(everything[j])) {
          everything[i].collideWith(everything[j]);
        }
      }
    }
  }

  Game.prototype.step = function(first) {
    this.ship.decaySpeed();
    this.moveObjects();
    if (first) {
      setTimeout(function() {
        this.checkCollisions();
      }, 3000);
    } else {
      this.checkCollisions();
    }
    this.checkAsteroidCount();
    this.checkGameOver();
  }

  Game.prototype.isOutOfBounds = function(pos) {
    if (pos[0] > DIM_X || pos[0] < 0) {
      return true;
    }
    if (pos[1] > DIM_Y || pos[1] < 0) {
      return true;
    }
  }

  Game.prototype.checkAsteroidCount = function() {
    if (this.asteroids.length < 8) {
      this.refillAsteroids();
    }
  }

  Game.prototype.refillAsteroids = function() {
    var coord1 = [0, DIM_X];
    var randCoord1 = coord1[Math.floor(Math.random() * coord1.length)];
    var randCoord2 = Math.random() * DIM_X;
    var posOptions = [[randCoord1, randCoord2] , [randCoord2, randCoord1]];
    var newPos = posOptions[Math.floor(Math.random() * posOptions.length)];
    this.add(new Asteroids.Asteroid(newPos, this));
  }

  Game.prototype.checkGameOver = function() {
    if (this.lives <= 0) {
      return true;
    }

    return false;
  }
})();