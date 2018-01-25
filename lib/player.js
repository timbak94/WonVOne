import Attack from './attack';

class Player {

  constructor() {
    this.hp = 500;
    this.boost = 100;
    this.dir = "right";
    this.action = "stand";
    this.pos = [30, 410];
    this.vel = [0,0];
    this.touch = false;
    this.jumping = false;
    this.falling = false;
    this.jumpCount = 0;
    this.sliding = false;
    this.zero = new Image();
    this.zero.src = "images/zero-run.png";
    this.zeroAlt = new Image();
    this.zeroAlt.src = "images/zero-run-alt.png";
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 3;
  }

  run(dir) {
    this.dir = dir;
    this.vel[0] += 1.5;
    this.action = "moving";
  }

  jump() {
    if (this.jumpCount < 2) {
      this.jumpCount += 1;
      this.jumping = true;
      this.vel[1] += 5;
    }
  }

  dbljump() {

  }

  fall() {
    this.falling = true;
    this.vel[1] -= 1;
  }

  dash() {
    this.action = "dashing";
    // if (this.boost > 1) {
    //   this.boost --;
    // }
  }

  attack() {
    this.attacking = true;
    this.touch = true;
    setTimeout(()=>{this.attacking = false; this.touch = false;}, 100);
  }

  move(time) {
    const velocityScale = time / (1000/60),
    xoffset = 8 * velocityScale,
    yoffset = this.vel[1] * velocityScale;


    if (this.jumping === true) {
      if (this.vel[1] > 0) {
        this.pos[1] = this.pos[1] - (yoffset);
        this.vel[1] -= .15;
      } else {
        this.jumping = false;
        this.fall();
      }
    }

    if (this.falling === true) {
      if (this.pos[1] < 410) {
        if (this.sliding) {
          this.jumpCount = 0;
          this.pos[1] = this.pos[1] - yoffset;
        } else {
          this.pos[1] = this.pos[1] - yoffset;
          this.vel[1] -= .15;
        }
      } else {
        this.jumpCount = 0;
        this.falling = false;
        this.vel[1] = 0;
      }
    }

    if (this.action === "moving") {
      if (this.dir === "left") {
        this.pos[0] = this.pos[0] - xoffset;
      } else {
        this.pos[0] = this.pos[0] + xoffset;
      }
    }


    if (this.action === "dashing") {
      if (this.dir === "left") {
        this.pos[0] = this.pos[0] - (xoffset*2);
      } else {
        this.pos[0] = this.pos[0] + (xoffset*2);
      }

    }

  }

  checkBounds() {
    if (this.pos[0] < 10 ){
      this.pos[0] = 10;
      this.sliding = true;
    } else if (this.pos[0] > 835) {
      this.pos[0] = 835;
      this.sliding = true;
    } else {
      this.sliding = false;
    }
    if (this.pos[1] < 0) {
      this.pos[1] = 0;
    }
    if (this.pos[1] > 415) {
      this.pos[1] = 415;
    }
  }

  runSprite(ctx) {
    if (this.frameIndex > 8) {
      this.frameIndex = 0;
    }
    if (this.dir === "left") {
      ctx.drawImage(this.zero, this.frameIndex * 40, 0, 40, 40, this.pos[0], this.pos[1], 60, 60);
    } else {
      ctx.drawImage(this.zeroAlt, this.frameIndex * 40, 0, 40, 40, this.pos[0], this.pos[1], 60, 60);
    }
  }

  standSprite(ctx) {

  }

  draw(ctx, time) {
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      this.frameIndex += 1;
    }
    if (this.attacking) {
      if (this.dir === "left") {
        ctx.fillRect(this.pos[0] - 30, this.pos[1], 30, 40);
      } else {
        ctx.fillRect(this.pos[0] + 40, this.pos[1], 30, 40);
      }
    }
    this.checkBounds();
    if (this.action === "stand") {
      this.standSprite(ctx);
    } else if (this.action === "moving") {
      this.runSprite(ctx);
    }

  }
}



export default Player;
