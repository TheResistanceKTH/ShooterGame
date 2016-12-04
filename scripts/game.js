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
  constructor(xV, yV, life, ricohet, size, color, type) {
    this.x = player.x + player.gunEnd["x"];
    this.y = player.y + player.gunEnd["y"];
    this.xV = xV;
    this.yV = yV;
    this.life = life;
    this.ricohet = ricohet;
    this.size = size;
    this.color = color;
    this.type = type; 
  }

  draw() {
    drawCircle(this.x, this.y, this.size, this.color)
  }

  move() {
    //out of bounds
    if (this.x + this.xV + this.size > canvas.width ||
        this.x + this.xV < this.size ||
        this.y + this.yV + this.size > canvas.height ||
        this.y + this.yV < this.size) {
      return;
    }
    this.x += this.xV;
    this.y += this.yV;
  }

  disappear() {
    bullets[this.type].shift();
  }
}

var bullets = {"type1": [], "type2": []}
var player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  xV: 0,
  yV: 0,
  health: 100,
  damage: 5,
  speed: 5,
  level: 1,
  exp: 0,
  color: '#1E3840',
  direction: 0, // Remove?
  gunLength: 50,
  diameter: 30,
  gunEnd: {"x": 0,"y": 0},
  draw: function() {
    // Draw gun
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
    // Draw Player
    drawCircle(this.x, this.y, this.diameter, this.color)
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
  },
  shoot: function (mButton) {
    if (mButton == "leftMB") {
      bullet1 = new Bullet(this.xV + this.gunEnd["x"] / 10, this.yV + this.gunEnd["y"] / 8, 4, false, 10, '#992300', "type1");
      bullets["type1"].push(bullet1);
      setTimeout(function() { bullet1.disappear(); }, bullet1.life*1000);
    }
    else if (mButton == "rightMB") {
      bullet2 = new Bullet(this.xV + this.gunEnd["x"] / 8, this.yV + this.gunEnd["y"] / 7, 2, false, 5, '#171717', "type2");
      bullets["type2"].push(bullet2);
      setTimeout(function() { bullet2.disappear(); }, bullet2.life*1000);
    }
    else if (mButton == "middleMB") {
      // TODO Laser beam? Needs some sort of cooldown
    }
  }

};

function drawCircle(x, y, diameter, color) {
  ctx.beginPath();
  ctx.arc(x, y, diameter, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();
  for (var type in bullets) {
    for (var i = 0; i < bullets[type].length; i++) {
      bullets[type][i].draw();
      bullets[type][i].move();
    }
  }
  raf = window.requestAnimationFrame(drawCanvas);
  for(key in map) {
    if (map[key] == true) {
      doInput(key);
    }
  }
}

function getMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  mousePos.x = evt.clientX - rect.left;
  mousePos.y = evt.clientY - rect.top;
};

function mouseClick(evt) {
  mouseButton = evt.button;
  if (mouseButton == 0) {
    player.shoot("leftMB");
  }
  else if (mouseButton == 1) {
    player.shoot("middleMB");
  }
}

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

var map = {};
onkeydown = onkeyup = function(e) {
  map[e.keyCode] = e.type == 'keydown';
}

canvas.oncontextmenu = function (e) {
    e.preventDefault();
    player.shoot("rightMB");
};

canvas.addEventListener('mousemove', getMousePos);
canvas.addEventListener('click', mouseClick);

drawCanvas();
