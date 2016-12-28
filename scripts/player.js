class Player {
    constructor(){
      this.x = canvas.width / 2;
      this.y = canvas.height / 2;
      this.xV = 0;
      this.yV = 0;
      this.health = 100;
      this.damage = 5;
      this.speed = 5;
      this.level = 1;
      this.exp = 0;
      this.color = '#1E3840';
      this.direction = 0; // Remove?
      this.gunLength = 50;
      this.diameter = 30;
      this.gunEnd = {"x": 0,"y": 0};

      this.draw = function() {
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
      }

      this.move = function(x,y) {
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

      this.shoot = function (mButton) {
        if (mButton == "leftMB") {
          var bullet1 = new Bullet(this.xV + this.gunEnd["x"] / 10, this.yV + this.gunEnd["y"] / 8, 4, false, 10, '#992300', "type1");
          bullets["type1"].push(bullet1);
          setTimeout(function() { bullet1.disappear(); }, bullet1.life*1000);
        }
        else if (mButton == "rightMB") {
          var bullet2 = new Bullet(this.xV + this.gunEnd["x"] / 8, this.yV + this.gunEnd["y"] / 7, 2, false, 5, '#171717', "type2");
          bullets["type2"].push(bullet2);
          setTimeout(function() { bullet2.disappear(); }, bullet2.life*1000);
        }
        else if (mButton == "middleMB") {
          // TODO Laser beam? Needs some sort of cooldown
        }
      }
    }
}
