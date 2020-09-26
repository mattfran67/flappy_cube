var canvas = document.getElementById('canvas');

// Imagem do personagem
var img = new Image();
img.src = "images/cube.png";
var imgGameOver = new Image();
imgGameOver.src = "images/cube_crying.png";
var imgBgrd = new Image();
imgBgrd.src = "images/background.png";
var imgWin = new Image();
imgWin.src = "images/cool_cube.png";


// Objeto com as propriedades do elemento canvas
var contx = {
  ctx: canvas.getContext("2d"),
  canvH: canvas.height,
  canvW: canvas.width
}

// Jogador
function Player(img, x, y, w = 10, speed = 5) {
  this.img = img;
  this.x = x;
  this.y = y;
  this.w = w;
  this.speed = speed;
  this.points = 0;
  this.ctx = contx.ctx;
}

Player.prototype.draw = function () {
  this.ctx.drawImage(img, this.x, this.y, this.w, this.w);
}

Player.prototype.jump = function () {
  this.y = this.y <= 0 ? 0 : this.y - this.speed;
}

Player.prototype.collision = function (obj) {
  if (((this.x + this.w) >= obj.x && this.x <= (obj.x + obj.w)) &&
    ((this.y + this.w) >= obj.y && this.y <= (obj.y + obj.h))) {
      return true;
  }

  if (this.y >= (contx.canvH - this.w)) {
    return true;
  }
}

function Pipe(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.ctx = contx.ctx;
}

Pipe.prototype.draw = function () {
  this.ctx.fillStyle = "red";
  this.ctx.fillRect(this.x, this.y, this.w, this.h);
  this.ctx.fillStyle = "tomato";
  this.ctx.fillRect(this.x, this.y, (this.w / 3), this.h);
  this.ctx.strokeStyle = "#a00";
  this.ctx.strokeRect(this.x, this.y, this.w, this.h);
  this.ctx.strokeRect(this.x, this.y, this.w, 10);
  this.ctx.strokeRect(this.x, this.y + (this.h - 10), this.w, 10);
}

function Aceleration() {
  this.time = 0;
  this.a = 0.1;
}

Aceleration.prototype.acel = function (pos, obj) {
  obj.y = pos + ((this.a * (this.time ** 2)) / 2);
  this.time++;
}
