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

    this.draw = function() {
      drawCircle(this.x, this.y, this.size, this.color)
    }

    this.move = function() {
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

    this.disappear = function() {
      bullets[this.type].shift();
    }
  }
}
