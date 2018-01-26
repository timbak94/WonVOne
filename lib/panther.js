import CircleProjectile from './projectile';

class Panther {
  constructor(area) {
    this.area = area;
    this.pos = [690, 350];
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 5;
    this.dir = "left";
    this.spriteSheetConstructor();
    this.entrySequence();
    this.current = 0;
    this.hitbox = [this.pos[0], this.pos[1], this.pos[0] + 200, this.pos[1] + 150];
  }

  spriteSheetConstructor() {
    this.idle = new Image();
    this.idle.src = 'images/panther-idle.png';
    this.idleAlt = new Image();
    this.idleAlt.src = 'images/panther-idle-alt.png';
    this.airSlash = new Image();
    this.airSlash.src = 'images/panther-air-slash.png';
    this.runImage = new Image();
    this.runImage.src = 'images/panther-run.png';
  }


  sequencePicker() {
    const current = this.current;
    let picker = Math.floor(Math.random() * 5);
    while (picker === current) {
      picker = Math.floor(Math.random() * 5);
    }

    switch(picker) {
      case 0:
        this.slashSequence();
        break;
      case 1:
        this.slashSequence();
        break;
      case 2:
        this.runSequence();
        break;
    }
  }

  entrySequence() {
    this.action = "idle";
    setTimeout(() => {this.runSequence();}, 1000);
  }


  runSequence() {
    this.run();
    let runclock = setInterval(()=>{
      if (this.dir === "left") {
        this.area.objects.push( new CircleProjectile("right", [this.pos[0]+40, this.pos[1]+50], "panther"));
      } else {
        this.area.objects.push( new CircleProjectile("left", [this.pos[0]+40, this.pos[1]+50], "panther"));
      }
      this.area.objects.push( new CircleProjectile("up", [this.pos[0]+40, this.pos[1]+30], "panther"));
    }, 200);
    setTimeout(()=>{
      clearInterval(runclock);
    }, 1300);
    setTimeout(()=>{
      this.runSequence();
    }, 2000);
  }

  run() {
    this.action = "running";
  }

  airSlash() {
    this.action = "airSlash";
  }

  drawRun(ctx) {
    this.ticksPerFrame = 5;
    if (this.frameIndex > 5) {
      this.frameIndex = 0;
    }
    ctx.drawImage(this.runImage, this.frameIndex * 80, 0, 80, 50, this.pos[0], this.pos[1], 240, 150);
  }

  drawAirAtk(ctx) {
    ctx.drawImage(this.airSlash, this.frameIndex * 70, 0, 70, 70, this.pos[0], this.pos[1]-100, 210, 210 );
  }

  drawIdle(ctx) {
    this.ticksPerFrame = 10;
    if (this.frameIndex > 2) {
      this.frameIndex = 0;
    }
    if (this.dir === "left") {
      ctx.drawImage(this.idle, this.frameIndex * 60, 0, 60, 50, this.pos[0], this.pos[1], 180, 150);
    } else {
      ctx.drawImage(this.idleAlt, this.frameIndex * 60, 0, 60, 50, this.pos[0], this.pos[1], 180, 150);
    }
  }

  move(time) {
    const velocityScale = time / (1000/60),
    xoffset = 9 * velocityScale;
    // yoffset = this.vel[1] * velocityScale;
    if (this.action === "running") {
      this.hitbox = [this.pos[0] + 50, this.pos[1] + 20, this.pos[0] + 150, this.pos[1] + 150];
      if (this.dir === "left") {
        this.pos[0] -= xoffset;
        if (this.pos[0] < 0) {
          this.dir = "right";
          this.action = "idle";
        }
      } else {
        this.pos[0] += xoffset;
        if (this.pos[0] > 700) {
          this.dir = "left";
          this.action = "idle";
        }
      }
    }
  }

  draw(ctx) {
    ctx.imageSmoothingEnabled = false;
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      this.frameIndex += 1;
    }

    if (this.action === "running") {
      this.drawRun(ctx);
    } else if (this.action === "airSlash") {
      this.drawAirAtk(ctx);
    } else {
      this.drawIdle(ctx);
    }
  }
}

export default Panther;
