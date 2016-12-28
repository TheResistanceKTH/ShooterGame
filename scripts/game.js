var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d');
var raf;
var bullets = {"type1": [], "type2": []};
var player = new Player();
var mousePos = { x: 0, y: 0 };

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
