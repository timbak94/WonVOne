import Attack from './attack';

class Player {

  constructor() {
    this.hp = 500;
    this.boost = 100;
    this.dir = "right";
    this.action = "stand";
    this.pos = [30, 440];
    this.vel = [0,0];
    this.touch = false;
    this.jumping = false;
    this.falling = false;
    this.jumpCount = 0;
    this.sliding = false;
    this.invincible = false;
    this.zero = new Image();
    this.zero.src = "images/zero-sheet.png";
    this.zeroAlt = new Image();
    this.zeroAlt.src = "images/zero-sheet-alt.png";
    this.slashImage = new Image();
    this.slashImage.src = "images/slash.png";
    this.slashImageAlt = new Image();
    this.slashImageAlt.src = "images/slash-alt.png";
    this.damagedImage = new Image();
    this.damagedImage.src = "images/hit.png";
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 3;
  }

  run(dir) {
    if (this.action !== "crazyHit") {
      this.dir = dir;
      this.vel[0] += 2;
      this.action = "moving";
    }
  }

  damage(amount) {
    if (this.invincible === false) {
      this.invincible = true;
      this.jumpCount = 0;
      this.vel = [0,0];
      this.hp = this.hp - amount;
      this.action = "hit";
      setTimeout(()=>{this.action = "stand";}, 300);
      setTimeout(()=>{this.invincible = false;}, 1000);
    }
  }
  
  crazyHit() {
    this.hp = this.hp - 10;
    this.action = "crazyHit";
    if (this.crazyHitClock) {
      clearInterval(this.crazyHitClock);
    }
    this.crazyHitClock = setTimeout(()=>{
      this.action = "";
    }, 200);
  }

  jump() {
    if (this.jumpCount < 3 && this.action !== "crazyHit") {
      this.vel[1] = 0;
      this.jumpCount += 1;
      this.jumping = true;
      this.vel[1] += 7;
      this.jumpScale = 0.15;
    }
  }

  fall() {
    if (this.action !== "crazyHit") {
      this.falling = true;
      this.vel[1] -= 2;
    }
  }

  dash() {
    if (this.action !== "crazyHit") {
      this.action = "dashing";
    }
  }

  attack() {
    if (this.action !== "crazyHit") {
      this.attacking = true;
      if (this.dir === "left") {
        this.hitbox = [this.pos[0]-60, this.pos[1]-20, this.pos[0], this.pos[1]+60];
      } else {
        this.hitbox = [this.pos[0]+120, this.pos[1]-20, this.pos[0]+60, this.pos[1]+60];
      }
      setTimeout(()=>{this.attacking = false; this.touch = false;}, 100);
    }
  }

  move(time) {
    const velocityScale = time / (1000/60),
    xoffset = 8 * velocityScale,
    yoffset = this.vel[1] * velocityScale;
    if (this.action === "crazyHit") {
      this.pos[0] += 0;
      this.pos[1] += 0;
    } else {
      if (this.action === "hit") {
        if (this.dir === "right") {
          this.pos[0] -= 2;
        } else {
          this.pos[0] += 2;
        }
      } else {
        if (this.jumping === true) {
          if (this.vel[1] > 0) {
            this.pos[1] = this.pos[1] - (yoffset);
            this.vel[1] -= this.jumpScale;
            this.jumpScale += 0.01;
          } else {
            this.jumpScale = 0.15;
            this.jumping = false;
            this.fall();
          }
        }
        
        if (this.falling === true) {
          if (this.pos[1] < 440) {
            if (this.sliding) {
              this.jumpCount = 0;
              this.pos[1] = this.pos[1] - yoffset;
            } else {
              this.pos[1] = this.pos[1] - yoffset;
              this.vel[1] -= 0.3;
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
    }

  }

  checkBounds() {
    if (this.pos[0] < 0 ){
      this.pos[0] = 0;
      this.sliding = true;
    } else if (this.pos[0] > 840) {
      this.pos[0] = 840;
      this.sliding = true;
    } else {
      this.sliding = false;
    }
    if (this.pos[1] < 0) {
      this.vel[1] = 0;
      this.pos[1] = 0;
    }
    if (this.pos[1] > 440) {
      this.pos[1] = 440;
    }
  }

  runSprite(ctx) {
    if (this.attacking) {
      this.ticksPerFrame = 2;
      if (this.frameIndex > 8) {
        this.frameIndex = 0;
      }
      if (this.dir === "left") {
        ctx.drawImage(this.zero, this.frameIndex * 40, 310, 40, 40, this.pos[0], this.pos[1], 60, 60);
      } else {
        ctx.drawImage(this.zeroAlt, 320 - this.frameIndex * 40, 310, 40, 40, this.pos[0], this.pos[1], 60, 60);
      }
    } else {
      this.ticksPerFrame = 3;
      if (this.frameIndex > 8) {
        this.frameIndex = 0;
      }
      if (this.dir === "left") {
        ctx.drawImage(this.zero, this.frameIndex * 40, 0, 40, 40, this.pos[0], this.pos[1], 60, 60);
      } else {
        ctx.drawImage(this.zeroAlt, this.frameIndex * 40, 0, 40, 40, this.pos[0], this.pos[1], 60, 60);
      }
    }
  }

  standSprite(ctx) {

    if (this.attacking) {
      this.ticksPerFrame = 3;
      if (this.frameIndex > 4) {
        this.frameIndex = 0;
      }
      if (this.dir === "left") {
        ctx.drawImage(this.zero, this.frameIndex * 50, 270, 50, 40, this.pos[0]-10, this.pos[1], 70, 60);
      } else {
        ctx.drawImage(this.zeroAlt, 200 - this.frameIndex * 50, 270, 50, 40, this.pos[0], this.pos[1], 70, 60);
      }
    } else {
      this.ticksPerFrame = 10;
      if (this.frameIndex > 3) {
        this.frameIndex = 0;
      }
      if (this.dir === "left") {
        ctx.drawImage(this.zero, this.frameIndex * 40, 40, 40, 40, this.pos[0], this.pos[1], 60, 60);
      } else {
        ctx.drawImage(this.zeroAlt, this.frameIndex * 40, 40, 40, 40, this.pos[0], this.pos[1], 60, 60);
      }
    }

  }

  dashSprite(ctx) {

    if (this.attacking) {
      this.ticksPerFrame = 5;
      if (this.frameIndex > 2) {
        this.frameIndex = 0;
      }
      if (this.dir === "left") {
        ctx.drawImage(this.zero, this.frameIndex * 50, 410, 50, 30, this.pos[0], this.pos[1]+10, 75, 45);
      } else {
        ctx.drawImage(this.zeroAlt, 110 - this.frameIndex * 50, 410, 50, 30, this.pos[0], this.pos[1]+10, 75, 45);
      }
    } else {
      this.ticksPerFrame = 10;
      if (this.frameIndex > 1) {
        this.frameIndex = 0;
      }

      if (this.dir === "left") {
        ctx.drawImage(this.zero, this.frameIndex * 40, 90, 40, 30, this.pos[0], this.pos[1]+10, 60, 45);
      } else {
        ctx.drawImage(this.zeroAlt, this.frameIndex * 40, 90, 40, 30, this.pos[0], this.pos[1]+10, 60, 45);
      }
    }

  }

  fallSprite(ctx) {
    if (this.attacking) {
      this.ticksPerFrame = 5;
      if (this.frameIndex > 3) {
        this.frameIndex = 0;
      }

      if (this.dir === "left") {
        ctx.drawImage(this.zero, this.frameIndex * 40, 350, 40, 50, this.pos[0], this.pos[1], 60, 75);
      } else {
        ctx.drawImage(this.zeroAlt, 120 - this.frameIndex * 40, 350, 40, 50, this.pos[0], this.pos[1], 60, 75);
      }
    } else {
      this.ticksPerFrame = 5;
      if (this.frameIndex > 1) {
        this.frameIndex = 0;
      }

      if (this.dir === "left") {
        ctx.drawImage(this.zero, this.frameIndex * 40, 170, 40, 50, this.pos[0], this.pos[1], 60, 75);
      } else {
        ctx.drawImage(this.zeroAlt, this.frameIndex * 40, 170, 40, 50, this.pos[0], this.pos[1], 60, 75);
      }
    }

  }

  jumpSprite(ctx) {
    if (this.attacking) {
      this.ticksPerFrame = 5;
      if (this.frameIndex > 3) {
        this.frameIndex = 0;
      }
      if (this.dir === "left") {
        ctx.drawImage(this.zero, this.frameIndex * 40, 350, 40, 50, this.pos[0], this.pos[1], 60, 75);
      } else {
        ctx.drawImage(this.zeroAlt, 120 - this.frameIndex * 40, 350, 40, 50, this.pos[0], this.pos[1], 60, 75);
      }
    } else {
      this.ticksPerFrame = 5;
      if (this.frameIndex > 1) {
        this.frameIndex = 0;
      }


      if (this.dir === "left") {
        ctx.drawImage(this.zero, this.frameIndex * 40, 120, 40, 50, this.pos[0], this.pos[1], 60, 75);
      } else {
        ctx.drawImage(this.zeroAlt, this.frameIndex * 40, 120, 40, 50, this.pos[0], this.pos[1], 60, 75);
      }
    }
  }

  hitSprite(ctx) {
    this.ticksPerFrame = 5;
    if (this.frameIndex > 2) {
      this.frameIndex = 0;
    }
    ctx.drawImage(this.damagedImage, this.frameIndex * 40, 0, 40, 40, this.pos[0], this.pos[1], 60, 60);
  }


  slideSprite(ctx) {
    if (this.dir === "left") {
      ctx.drawImage(this.zero, 0, 220, 40, 40, this.pos[0], this.pos[1], 60, 60);
    } else {
      ctx.drawImage(this.zeroAlt, 0, 220, 40, 40, this.pos[0], this.pos[1], 60, 60);
    }
  }

  draw(ctx, time) {
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      this.frameIndex += 1;
    }
    if (this.attacking) {
      this.ticksPerFrame = 5;
      if (this.frameIndex > 3) {
        this.frameIndex = 0;
      }
      if (this.dir === "left") {
        ctx.drawImage(this.slashImage, this.frameIndex * 70, 0, 70, 60, this.pos[0]-40, this.pos[1]-20, 105, 90);
      } else {
        ctx.drawImage(this.slashImageAlt, 210 - this.frameIndex * 70, 0, 70, 60, this.pos[0], this.pos[1]-20, 105, 90);
      }
    }
    this.checkBounds();
    if (this.action === "hit" || this.action === "crazyHit") {
      this.hitSprite(ctx);
    } else if (this.action === "dashing") {
      this.dashSprite(ctx);
    } else if (this.jumping) {
      this.jumpSprite(ctx);
    } else if (this.sliding) {
      this.slideSprite(ctx);
    } else if (this.falling) {
      this.fallSprite(ctx);
    } else if (this.action === "stand") {
      this.standSprite(ctx);
    } else if (this.action === "moving") {
      this.runSprite(ctx);
    }

  }
}



export default Player;
