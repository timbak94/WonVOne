import CircleProjectile from './projectile';
import { Howl } from 'howler';

class Area {
  constructor(player, boss) {
    this.player = player;
    this.boss = boss;
    this.objects = [];
    this.hitSound = new Howl({
      src: ["sounds/slash.wav"],
      autoplay: false,
      loop: false,
    });
  }

  step(time) {
    this.checkCollision();
    this.objects.forEach((el) => {
      el.move(time);
    });
    this.objects.forEach((el) => {
      if (el.constructor.name === "CircleProjectile") {
        this.outOfBounds(el);
      } else {
        if (el.timer === true) {
          this.objects.splice(this.objects.indexOf(el), 1);
        }
      }
    });
    this.boss.move(time);
    this.player.move(time);
  }

  checkCollision() {
    this.objects.forEach((el)=>{
      if (el.constructor.name === 'WaveProjectile') {
        if (this.player.pos[0] + 50 > el.pos[0] && this.player.pos[0] < el.pos[0] + 200) {
          if (this.player.pos[1] + 50 > el.pos[1] ) {
            if (this.player.invincible === false && this.boss.action !== "ending") {
              this.hitSound.play();
              this.player.damage(10);
              this.objects.splice(this.objects.indexOf(el), 1);
            }
          }
        }
      } else {
        if (this.player.pos[0] + 50 > el.pos[0] && this.player.pos[0] < el.pos[0] + 40) {
          if (this.player.pos[1] + 50 > el.pos[1] && this.player.pos[1] < el.pos[1] + 40) {
            if (this.player.invincible === false && this.boss.action !== "ending") {
              this.hitSound.play();
              this.player.damage(10);
              this.objects.splice(this.objects.indexOf(el), 1);
            }
          }
        }
      }
      }

  );

    if (this.player.pos[0] + 50 > this.boss.hitbox[0] && this.player.pos[0] < this.boss.hitbox[2]) {
        if (this.player.pos[1] + 50 > this.boss.hitbox[1] && this.player.pos[1] < this.boss.hitbox[3]) {
          if (this.boss.action === "crazyDash") {
            this.player.crazyHit();
          } else {
            if (this.player.invincible === false) {
              this.hitSound.play();
              this.player.damage(10);
            }
          }
        }
    }

    if (this.player.attacking) {
      if (this.player.hitbox[0] > this.boss.hitbox[0] && this.player.hitbox[0] < this.boss.hitbox[2]) {
        if (this.player.hitbox[1] > this.boss.hitbox[1] && this.player.hitbox[1] < this.boss.hitbox[3])
        if (this.boss.damageStatus === false) {
          this.hitSound.play();
          this.player.contact();
          this.boss.damaged();
          this.player.hp += 1;
          if (this.boss.hp <= 0) {
            this.endSequence();
          }
        }
      }
    }
  }

  endSequence() {
    this.boss.endSequence();
    this.player.action = "stand";
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
