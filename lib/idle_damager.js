class idleDamager {
  constructor(type, startPos) {
    this.type = type;
    this.pos = startPos;
    this.tickCount = 0;
    this.ticksPerFrame = 3;
    this.frameIndex = 0;
  }

  drawBall() {
    if (this.frameIndex > 3) {
      this.frameIndex = 0;
    }
  }

  drawLine() {
    if (this.frameIndex > 3) {
      this.frameIndex = 0;
    }
  }

  draw(ctx) {
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      this.frameIndex += 1;
    }

    if (this.type === "ball") {
      this.drawBall();
    } else if (this.type === "line") {
      this.drawLine();
    }


  }


}
