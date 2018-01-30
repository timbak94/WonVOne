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
    this.hp = 500;
    this.bar = document.getElementById("boss-hp");
    this.damageStatus = false;
    this.desparation = false;
    this.homingCounter = 1;
  }

  spriteSheetConstructor() {
    this.idle = new Image();
    this.idle.src = 'images/panther-idle.png';
    this.idleAlt = new Image();
    this.idleAlt.src = 'images/panther-idle-alt.png';
    this.airSlashImage = new Image();
    this.airSlashImage.src = 'images/panther-air-slash.png';
    this.airSlashImageAlt = new Image();
    this.airSlashImageAlt.src = 'images/panther-air-slash-alt.png';
    this.runImage = new Image();
    this.runImage.src = 'images/panther-run.png';
    this.runImageAlt = new Image();
    this.runImageAlt.src = 'images/panther-run-alt.png';
    this.miscImage = new Image();
    this.miscImage.src = "images/panther-misc.png";
  }


  sequencePicker() {
    const current = this.current;
    let picker = Math.floor(Math.random() * 5);
    while (picker === current) {
      picker = Math.floor(Math.random() * 5);
    }
    if (this.hp < 150 && this.desparation === false) {
      picker = 5;
      this.desparation = true;
    }
    switch(picker) {
      case 1:
        this.slashSequence();
        break;
      case 0:
        this.airSlashSequence();
        break;
      case 2:
        this.runSequence();
        break;
      case 3:
        this.airSlashSequence();
        break;
      case 4:
        this.runSequence();
        break;
      case 5:
        this.desparationSequence();
        break;
    }
  }

  entrySequence() {
    setTimeout(()=> {
      this.sequencePicker();
    }, 1000);
  }
  
  desparationSequence() {
    this.jump();
    let pop = document.getElementById('popin');
    setTimeout(()=>{
      pop.className = "animated fadeInDown";
    }, 1000);
    setTimeout(()=>{pop.className = "animated fadeOutDown";}, 2000);
    setTimeout(()=>{
      this.destination = this.area.player.pos;
      this.homingSlash();
    }, 2500);
    setTimeout(()=>{
      this.destination = this.area.player.pos;
      this.homingCounter += 1;
      this.homingSlash();
    }, 3500);
    setTimeout(()=>{
      this.destination = this.area.player.pos;
      this.homingCounter += 1;
      this.homingSlash();
    }, 4500);
    setTimeout(()=>{
      this.destination = this.area.player.pos;
      this.homingCounter += 1;
      this.homingSlash();
    }, 5500);
    setTimeout(()=>{
      this.pos = [900, 30];
      this.crazyDash();
    }, 6500);
  }
  

  slashSequence() {
    this.current = 1;
    this.sequencePicker();
  }
  
  damaged() {
    this.damageStatus = true;
    setTimeout(()=>{this.damageStatus = false;}, 20);
    this.hp = this.hp - 10;
    this.bar.value = this.hp;
  }


  runSequence() {
    this.current = 2;
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
    }, 1100);
    setTimeout(()=>{
      this.sequencePicker();
    }, 2500);
  }

  airSlashSequence() {
    this.current = 3;
    this.jump();
    setTimeout(() => {
      this.airSlash();
    }, 250);

    setTimeout(() => {
      let downclock = setInterval(() => {
        for (let i = 10; i < 900; i += 150) {
          this.area.objects.push( new CircleProjectile("down", [i, this.pos[1]], "panther"));
        }
      }, 300);
      setTimeout(() => {
        clearInterval(downclock);
      }, 1000);
    }, 200);

    setTimeout(() => {
      let downclock = setInterval(() => {
        for (let i = 10; i < 900; i += 150) {
          this.area.objects.push( new CircleProjectile("down", [i + 75, this.pos[1]], "panther"));
        }
      }, 300);
      setTimeout(() => {
        clearInterval(downclock);
      }, 1000);
    }, 1200);
    setTimeout(() => {
      this.fall();
    }, 2700);
    setTimeout(()=>{
      this.sequencePicker();
    }, 3400);
  }
  
  homingSlash() {
    if (this.homingCounter === 1) {
      this.pos = [this.destination[0] - 400, this.destination[1] - 100];
    } else if (this.homingCounter === 2) {
      this.pos = [this.destination[0] + 400, this.destination[1] - 100];
    } else if (this.homingCounter === 3) {
      this.pos = [this.destination[0], this.destination[1] - 500];
    } else if (this.homingCounter === 4) {
      this.pos = [this.destination[0], this.destination[1] + 500];
    } 
    this.action = "homingSlash";
    setTimeout(()=>{
      this.area.objects.push(new CircleProjectile("down", [this.pos[0], this.pos[1]], "panther"));
      this.area.objects.push(new CircleProjectile("up", [this.pos[0], this.pos[1]], "panther"));
      this.area.objects.push(new CircleProjectile("left", [this.pos[0], this.pos[1]], "panther"));
      this.area.objects.push(new CircleProjectile("right", [this.pos[0], this.pos[1]], "panther"));
    }, 200);
  }

  run() {
    this.action = "running";
  }

  crazyDash() {
    this.action = "crazyDash";
    this.dir = "left";
    // setTimeout(()=>{
    //   this.destination = this.area.player.pos;
    //   this.dir = "right";
    //   this.pos = [900, 0];
    // }, 100);
  }
  
  airSlash() {
    this.action = "airSlash";
  }

  jump() {
    this.action = "jumping";
  }

  fall() {
    this.action = "fall";
  }

  drawRun(ctx) {
    this.ticksPerFrame = 5;
    if (this.frameIndex > 5) {
      this.frameIndex = 0;
    }
    if (this.dir === "left") {
      ctx.drawImage(this.runImage, this.frameIndex * 80, 0, 80, 50, this.pos[0], this.pos[1], 240, 150);
    } else {
      ctx.drawImage(this.runImageAlt, 400 - (this.frameIndex * 80), 0, 80, 50, this.pos[0], this.pos[1], 240, 150);
    }
  }

  drawAirAtk(ctx) {
    this.ticksPerFrame = 4;
    if (this.frameIndex > 9) {
      this.frameIndex = 0;
    }

    if (this.dir === "left") {
      ctx.drawImage(this.airSlashImage, 140 + this.frameIndex * 70, 0, 70, 70, this.pos[0], this.pos[1], 210, 210 );
    } else {
      ctx.drawImage(this.airSlashImageAlt, 700 - (this.frameIndex * 70), 0, 70, 70, this.pos[0], this.pos[1], 210, 210 );
    }
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
    xoffset = 12 * velocityScale,
    yoffset = 20 * velocityScale;
    this.hitbox = [this.pos[0] + 50, this.pos[1] + 20, this.pos[0] + 150, this.pos[1] + 150];
    
    if (this.action === "running") {
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
    } else if (this.action === "jumping") {
      this.pos[1] -= yoffset;
    } else if (this.action === "fall") {
      this.pos[1] += yoffset;
      if (this.pos[1] > 350) {
        this.pos[1] = 350;
        this.action = "idle";
      }
    } else if (this.action === "homingSlash") {
      if (this.homingCounter === 1) {
        if (this.pos[0] < this.destination[0] + 20) {
          this.pos[0] += 30 * velocityScale;
        } else {
          this.action = "idle";
        }
      } else if (this.homingCounter === 2) {
        if (this.pos[0] > this.destination[0] - 20) {
          this.pos[0] -= 30 * velocityScale;
        } else {
          this.action = "idle";
        }
      } else if (this.homingCounter === 3) {
        if (this.pos[1] < this.destination[1] + 20) {
          this.pos[1] += 30 * velocityScale;
        } else {
          this.action = "idle";
        }
      } else if (this.homingCounter === 4) {
        if (this.pos[1] > -200) {
          this.pos[1] -= 30 * velocityScale;
        } else {
          this.action = "idle";
        } 
      }
    } else if (this.action === "crazyDash") {
      if (this.dir === "left") {
        this.pos[0] -= 80 * velocityScale;
        if (this.pos[0] < -200) {
          this.dir = "right";
          this.pos[1] = this.destination[1];
        }
      } else {
        this.pos[0] += 80 * velocityScale;
        if (this.pos[0] > 900) {
          this.dir = "left";
          this.pos[1] = this.destination[1];
        }
      }
      
    }
  }
  
  slopeFinder(dir) {
    let x = this.destination[0] - this.pos[0];
    let y = this.destinaation[1] - this.pos[1];
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
    } else if (this.action === "jumping") {
      if (this.dir === "left") {
        ctx.drawImage(this.miscImage, 0,0, 40, 80, this.pos[0], this.pos[1], 120, 240);
      } else {
        ctx.drawImage(this.miscImage, 40,0, 40, 80, this.pos[0], this.pos[1], 120, 240);
      }
    } else {
      this.drawIdle(ctx);
    }
  }
}

export default Panther;
