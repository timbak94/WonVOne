class ElectricBar {
  constructor(type, startPos) {
    this.type = type;
    this.pos = startPos;
    this.tickCount = 0;
    this.ticksPerFrame = 5;
    this.frameIndex = 0;
    this.image = new Image();
    this.image.src = 'images/panther-misc.png';
  }

  move() {
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

    if (this.type === "down") {
      ctx.drawImage(this.image, 180, 260 + (60 * this.frameIndex), 20, 60, this.pos[0], this.pos[1], 140, 420);
    } else {
    }
  }


}

export default ElectricBar;
