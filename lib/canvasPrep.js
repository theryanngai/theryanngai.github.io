var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext('2d');
var img = new Image();
var ship = new Image();
var bullet = new Image();
var asteroidImg = new Image();
var explosion = new Image();
img.onload = function() {
	ctx.drawImage(img, 0, 0);
	ctx.font = "40px Helvetica";
	ctx.textAlign = "center";
	ctx.fillStyle = 'white';
	ctx.fillText("BLASTEROIDS", canvas.width/2, 250);
	ctx.font = "25px Helvetica";
	ctx.fillStyle = 'white';
	ctx.fillText("Press SPACE to Play", canvas.width/2, 400);
	ctx.font = "15px Helvetica";
	ctx.fillText("Instructions: Arrows to Move/Space to Fire", canvas.width/2, 450)
	ctx.fillStyle = 'red';
	ctx.fillText("Press SHIFT for Hyperspeed (CAREFUL!)", canvas.width/2, 475)
	ctx.fillStyle = 'white';
	ctx.fillText("Created by Ryan Ngai", canvas.width/2, 600);
};
img.src = 'space.jpg';
ship.src = 'ship.gif';
bullet.src = 'laser.png';
asteroidImg.src = 'asteroid.png';
explosion.src = 'explosion.gif';