class Projectile {
  constructor(type, startPos, boss) {
    this.type = type;
    this.pos = startPos;
    this.tickCount = 0;
    this.ticksPerFrame = 3;
    this.frameIndex = 0;
    this.dir = "left";
    switch(boss) {
      case "panther":
        this.image = new Image();
        this.image.src = "images/cat-projectile.png";
    }
  }

  move() {
    if (this.type === "down") {
      this.pos[1] += 5;
    } else if (this.type === "up") {
      this.pos[1] -= 5;
    } else if (this.type === "left") {
      this.pos[0] += 5;
    } else if (this.type === "right") {
      this.pos[0] -= 5;
    } else if (this.type === "diag1") {
      this.pos[1] += 5;
      this.pos[0] += 5;
    } else if (this.type === "diag2") {
      this.pos[1] -= 5;
      this.pos[0] += 5;
    } else if (this.type === "diag3") {
      this.pos[1] += 5;
      this.pos[0] -= 5;
    } else if (this.type === "diag4") {
      this.pos[1] -= 5;
      this.pos[0] -= 5;
    }
  }

  draw(ctx) {
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      this.frameIndex += 1;
    }

    if (this.frameIndex > 3) {
      this.frameIndex = 0;
    }
    ctx.drawImage(this.image, this.frameIndex * 30, 0, 26, 26, this.pos[0], this.pos[1], 40, 40);
  }


}

export default Projectile;
