class ElectricBar {
  constructor(type, startPos) {
    this.type = type;
    this.pos = startPos;
    this.tickCount = 0;
    this.ticksPerFrame = 3;
    this.frameIndex = 0;
    this.image = new Image();
    this.image.src = 'images/panther-misc.png';
    this.timer = false;
    setTimeout(()=>{this.timer = true;}, 1000);
  }

  move(time) {
    const velocityScale = time / (1000/60),
    xoffset = 15 * velocityScale,
    yoffset = 20 * velocityScale;
    if (this.pos[1] < 0) {
      this.pos[1] += 80 * velocityScale;
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

    if (this.type === "down") {
      ctx.drawImage(this.image, 180, 260 + (60 * this.frameIndex), 20, 60, this.pos[0], this.pos[1], 180, 540);
    } else {
      ctx.drawImage(this.image, 180, 260 + (60 * this.frameIndex), 20, 60, this.pos[0], this.pos[1], 180, 540);      
    }
  }


}

export default ElectricBar;
