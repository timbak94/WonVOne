class CircleProjectile {
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

  move(time) {
    const velocityScale = time / (1000/60);
    if (this.type === "down") {
      this.pos[1] += 10;
    } else if (this.type === "up") {
      this.pos[1] -= 10;
    } else if (this.type === "right") {
      this.pos[0] += 10;
    } else if (this.type === "left") {
      this.pos[0] -= 10;
    } else if (this.type === "diag1") {
      this.pos[1] += 10;
      this.pos[0] += 10;
    } else if (this.type === "diag2") {
      this.pos[1] -= 10;
      this.pos[0] += 10;
    } else if (this.type === "diag3") {
      this.pos[1] += 10;
      this.pos[0] -= 10;
    } else if (this.type === "diag4") {
      this.pos[1] -= 10;
      this.pos[0] -= 10;
    } else if (this.type === "float") {
      this.pos[0] += (Math.floor(Math.random() * 5) - 2) * velocityScale;
      this.pos[1] += (Math.floor(Math.random() * 5) - 2) * velocityScale;
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
    ctx.drawImage(this.image, this.frameIndex * 30, 0, 26, 26, this.pos[0], this.pos[1], 50, 50);
  }


}

export default CircleProjectile;
