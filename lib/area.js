class Area {
  constructor(player, boss) {
    this.player = player;
    this.boss = boss;
    this.objects = [this.player];

  }

  step(time) {
    this.player.move(time);
  }

  draw(ctx) {
    ctx.clearRect(0,0,900,500);
    this.objects.forEach((el) => {
      el.draw(ctx);
    });
  }
}

export default Area;
