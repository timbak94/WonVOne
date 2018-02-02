class WaveProjectile {
  constructor(slope, startPos, speed, dir) {
    
    this.slope = slope;
    this.pos = startPos;
    this.speed = speed;
    this.dir = dir;
    this.image = new Image();
    this.image.src = 'images/panther-misc.png';
  }

  move() {
    this.pos[1] += this.slope[1] * this.speed;
    if (this.dir === "right") {
      this.pos[0] += this.slope[0] * this.speed;
    } else {
      this.pos[0] -= this.slope[0] * this.speed;
    }
  }

  draw(ctx) {
    if (this.dir === "left") {
      ctx.drawImage(this.image, 0, 430, 70, 70, this.pos[0], this.pos[1], 200, 200);
    } else {
      ctx.drawImage(this.image, 70, 430, 70, 70, this.pos[0], this.pos[1], 200, 200);
    }
  }
}

export default WaveProjectile;
