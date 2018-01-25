import CircleProjectile from './projectile';

class Area {
  constructor(player, boss) {
    this.player = player;
    this.boss = boss;
    this.objects = [];
    setInterval(() => {
      this.objects.push(new CircleProjectile("left", [400, 400], "panther"));
      this.objects.push(new CircleProjectile("right", [400, 400], "panther"));
      this.objects.push(new CircleProjectile("up", [400, 400], "panther"));
      this.objects.push(new CircleProjectile("down", [400, 400], "panther"));
    }, 1000);
    setInterval(()=>{
      this.objects.push(new CircleProjectile("diag1", [400, 400], "panther"));
    }, 1250);
    setInterval(()=>{
      this.objects.push(new CircleProjectile("diag2", [400, 400], "panther"));
    }, 1500);
    setInterval(()=>{
      this.objects.push(new CircleProjectile("diag3", [400, 400], "panther"));
    }, 1750);
    setInterval(()=>{
      this.objects.push(new CircleProjectile("diag4", [400, 400], "panther"));
    }, 2000);
  }

  step(time) {
    this.checkCollision();
    this.objects.forEach((el) => {
      el.move();
    });
    this.objects.forEach((el) => {
      this.outOfBounds(el);
    });
    this.player.move(time);
  }

  checkCollision() {
    this.objects.forEach((el)=>{
      if (this.player.pos[0] + 50 > el.pos[0] && this.player.pos[0] < el.pos[0] + 40) {
        if (this.player.pos[1] + 50 > el.pos[1] && this.player.pos[1] < el.pos[1] + 40) {
          this.player.damage(10);
        }
      }
    });
  }

  outOfBounds(el) {
    if (el.pos[0] < 0 || el.pos[0] > 900) {
      this.objects.splice(this.objects.indexOf(el), 1);
    } else if (el.pos[1] < 0 || el.pos[1] > 500) {
      this.objects.splice(this.objects.indexOf(el), 1);
    }
  }

  draw(ctx) {
    ctx.clearRect(0,0,900,500);
    this.boss.draw(ctx);
    this.player.draw(ctx);
    this.objects.forEach((el) => {
      el.draw(ctx);
    });
  }
}

export default Area;
