var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d');
var raf;
var mousePos = {
  x: 0,
  y: 0
}
/*
var enemy = {
  x,
  y,
  health,
  damage,
  fireRate
};
*/

class Bullet {
  constructor(xV, yV, life, ricohet, size, color) {
    this.x = player.gunEnd["x"];
    this.y = player.gunEnd["y"];
    this.xV = xV;
    this.yV = yV;
    this.life = life;
    this.ricohet = ricohet;
    this.size = size;
    this.color = color;
  }
}

var player = {
  x: 100,
  y: 100,
  health: 100,
  damage: 5,
  speed: 5,
  level: 1,
  exp: 0,
  color: 'blue',
  direction: 0,
  gunLength: 50,
  diameter: 30,
  gunEnd: {"x": 0,"y": 0},
  draw: function() {
    ctx.beginPath();
    ctx.moveTo(this.x,this.y);
    var vectorL = Math.sqrt(Math.pow(mousePos.x - this.x, 2) +
                            Math.pow(mousePos.y - this.y, 2));
    this.gunEnd["x"] = (mousePos.x - this.x)*this.gunLength/vectorL;
    this.gunEnd["y"] = (mousePos.y - this.y)*this.gunLength/vectorL;
    ctx.lineTo(this.x + this.gunEnd["x"],
               this.y + this.gunEnd["y"]);
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.diameter, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
  move: function(x,y) {
    //out of bounds
    if (this.x + x + player.diameter > canvas.width ||
        this.x + x < player.diameter ||
        this.y + y + player.diameter > canvas.height ||
        this.y + y < player.diameter) {
      return;
    }
    this.x += x;
    this.y += y;
  }
};

function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();
  raf = window.requestAnimationFrame(drawCanvas);
  for(key in map) {
    if (map[key] == true) {
      doInput(key);
    }
  }
}
var map = {};
onkeydown = onkeyup = function(e) {
  map[e.keyCode] = e.type == 'keydown';
}

canvas.addEventListener('mousemove', getMousePos);
function getMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  mousePos.x = evt.clientX - rect.left;
  mousePos.y = evt.clientY - rect.top;
};

function doInput(e) {
  if(e == 87) {
    player.move(0, -player.speed);
  }
  else if (e == 65) {
    player.move(-player.speed,0);
  }
  else if (e == 83) {
    player.move(0, player.speed);
  }
  else if (e == 68) {
    player.move(player.speed, 0);
  }
}

drawCanvas();
