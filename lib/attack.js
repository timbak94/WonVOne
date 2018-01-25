class Attack {
  constructor(type) {

  }

  draw(player_pos, dir, ctx) {
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      this.frameIndex += 1;
    }
  }
}

export default Attack;
