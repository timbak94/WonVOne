import CircleProjectile from './projectile';

class Area {
  constructor(player, boss) {
    this.player = player;
    this.boss = boss;
    this.objects = [];
  }

  step(time) {
    this.checkCollision();
    this.objects.forEach((el) => {
      el.move();
    });
    this.objects.forEach((el) => {
      this.outOfBounds(el);
    });
    this.boss.move(time);
    this.player.move(time);
  }

  checkCollision() {
    this.objects.forEach((el)=>{
      if (this.player.pos[0] + 50 > el.pos[0] && this.player.pos[0] < el.pos[0] + 40) {
        if (this.player.pos[1] + 50 > el.pos[1] && this.player.pos[1] < el.pos[1] + 40) {
          if (this.player.invincible === false) {
            this.player.damage(10);
            this.objects.splice(this.objects.indexOf(el), 1);
          }
        }
      }
    });

    if (this.player.pos[0] + 50 > this.boss.hitbox[0] && this.player.pos[0] < this.boss.hitbox[2]) {
        if (this.player.pos[1] + 50 > this.boss.hitbox[1] && this.player.pos[1] < this.boss.hitbox[3]) {
          this.player.damage(10);
        }
    }
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
    ctx.fillStyle = "green";
    ctx.fillRect(10, 10, this.player.hp, 20);
    this.boss.draw(ctx);
    this.player.draw(ctx);
    this.objects.forEach((el) => {
      el.draw(ctx);
    });
  }
}

export default Area;
