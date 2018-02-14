import CircleProjectile from './projectile';
import { Howl } from 'howler';
import WaveProjectile from './wave_projectile';
import ElectricBar from './electric';
class Panther {
  constructor(area) {
    this.area = area;
    this.pos = [690, 350];
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 5;
    this.dir = "left";
    this.current = 0;
    this.hitbox = [this.pos[0], this.pos[1], this.pos[0] + 200, this.pos[1] + 150];
    this.hp = 500;
    this.bar = document.getElementById("boss-hp");
    this.damageStatus = false;
    this.desparation = false;
    this.homingCounter = 1;
    this.dashCount = 0;
    this.hitAnim = false;
    this.sound = new Howl ({
      src: ["sounds/boss_voice.mp3"],
      sprite: {
        intro: [0, 3000],
        takeThis: [7000, 2000]
      },
      volume: 0.8,
    });
    this.warningSound = new Howl ({
      src: ["sounds/warning.mp3"]
    });
    this.bossSlash = new Howl ({
      src: ["sounds/boss_slash.wav"],
      volume: 0.4,
    });
  }

  start() {
    this.spriteSheetConstructor();
    this.entrySequence();
  }

  spriteSheetConstructor() {
    this.idle = new Image();
    this.idle.src = 'images/panther-idle.png';
    this.idleAlt = new Image();
    this.idleAlt.src = 'images/panther-idle-alt.png';
    this.standImage = new Image();
    this.standImage.src = 'images/panther-standing.png';
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
    this.groundSlashImage = new Image();
    this.groundSlashImage.src = "images/panther-ground-slash.png";
    this.groundSlashImageAlt = new Image();
    this.groundSlashImageAlt.src = "images/panther-ground-slash-alt.png";
    this.airSpinImage = new Image();
    this.airSpinImage.src = 'images/panther-flip.png';
    this.airSpinImageAlt = new Image();
    this.airSpinImageAlt.src = 'images/panther-flip-alt.png';
  }


  sequencePicker() {
    if (this.action !== "ending" && this.action !== "split") {
      const current = this.current;
      let picker = Math.floor(Math.random() * 5);
      while (picker === current) {
        picker = Math.floor(Math.random() * 5);
      }
      if (this.hp < 250 && this.desparation === false) {
        picker = 5;
        this.desparation = true;
      }
      switch(picker) {
        case 1:
        this.slashSequence();
        break;
        case 0:
        this.slashSequence();
        break;
        case 2:
        this.runSequence();
        break;
        case 3:
        this.airSlashSequence();
        break;
        case 4:
        this.pounceSequence();
        break;
        case 5:
        this.desparationSequence();
        break;
      }
    }
  }

  entrySequence() {
    this.sound.play("intro");
    this.action = "standing";
    setTimeout(()=>{
      this.action = "entry";
    }, 3000);
    setTimeout(()=>{
      this.action = "idle";
    }, 3450);
    setTimeout(()=>{
      this.warningSound.play();
    }, 4000);
    setTimeout(()=> {
      this.slashSequence();
    }, 7300);
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
    }, 3000);
    setTimeout(()=>{
      this.destination = this.area.player.pos;
      this.homingCounter += 1;
      this.homingSlash();
    }, 3500);
    setTimeout(()=>{
      this.destination = this.area.player.pos;
      this.homingCounter += 1;
      this.homingSlash();
    }, 4000);
    setTimeout(()=>{
      this.crazyDash();
    }, 4500);
  }


  slashSequence() {
    this.current = 1;
    this.action = "ground-slash";
    setTimeout(()=>{
      if (this.action !== "ending" && this.action !== "split") {
        this.action = "idle";
      }
    }, 900);
    setTimeout(()=>{
        this.area.objects.push( new WaveProjectile([1, 0], [this.pos[0]+40, this.pos[1]-60], 20, this.dir));
    });
    setTimeout(()=>{
        this.area.objects.push( new WaveProjectile([1, 0], [this.pos[0]+40, this.pos[1]-60], 30, this.dir));
    }, 500);
    setTimeout(()=>{
      this.bossSlash.play();
    });
    setTimeout(()=>{
      this.bossSlash.play();
    }, 500);
    setTimeout(()=>{
      this.sequencePicker();
    }, 3000);
  }

  pounceSequence() {
    this.current = 4;
    this.jump();
    setTimeout(() => {
      this.airSpin();
    }, 300);
    setTimeout(() => {
      this.pounce();
    }, 600);
    setTimeout(()=>{
      this.shock();
      this.shockclock = setInterval(()=>{
        this.area.objects.push( new CircleProjectile("right", [this.pos[0]+100, this.pos[1]+100], "panther"));
        this.area.objects.push( new CircleProjectile("left", [this.pos[0]+100, this.pos[1]+100], "panther"));
        this.area.objects.push( new CircleProjectile("up", [this.pos[0]+100, this.pos[1]+100], "panther"));
        this.area.objects.push( new CircleProjectile("diag2", [this.pos[0]+100, this.pos[1]+100], "panther"));
        this.area.objects.push( new CircleProjectile("diag4", [this.pos[0]+100, this.pos[1]+100], "panther"));
        this.area.objects.push( new CircleProjectile("float", [this.pos[0]+100, this.pos[1]+100], "panther"));
      }, 500);
    }, 2500);
    setTimeout(()=>{
      clearInterval(this.shockclock);
      this.pos[1] = 350;
      this.run();
    }, 5000);
    setTimeout(()=>{
      this.sequencePicker();
    }, 6000);

  }

  shock() {
    if (this.action !== "ending" && this.action !== "split") {
      this.action = "shock";
    }
  }

  airSpin() {
    if (this.action !== "ending" && this.action !== "split") {
      this.action = "airSpin";
    }
  }

  pounce() {
    if (this.action !== "ending" && this.action !== "split") {
      this.action = "pounce";
    }
  }

  damaged() {
    this.damageStatus = true;
    setTimeout(()=>{
      this.damageStatus = false;
    }, 300);
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
    }, 150);
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
    setTimeout(()=>{
      this.bossSlash.play();
    },250);
    setTimeout(()=>{
      this.bossSlash.play();
    },1250);
    setTimeout(()=>{
      this.bossSlash.play();
    },2250);
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
      let downclock2 = setInterval(() => {
        for (let i = 10; i < 900; i += 150) {
          this.area.objects.push( new CircleProjectile("down", [i + 75, this.pos[1]], "panther"));
        }
      }, 300);
      setTimeout(() => {
        clearInterval(downclock2);
      }, 1000);
    }, 1200);

    setTimeout(() => {
      let downclock3 = setInterval(() => {
        for (let i = 10; i < 900; i += 150) {
          this.area.objects.push( new CircleProjectile("down", [i, this.pos[1]], "panther"));
        }
      }, 300);
      setTimeout(() => {
        clearInterval(downclock3);
      }, 1000);
    }, 2200);


    setTimeout(() => {
      this.fall();
    }, 2700);
    setTimeout(()=>{
      this.sequencePicker();
    }, 3400);
  }

  homingSlash() {
    this.action = "homingSlash";
    if (this.homingCounter === 1) {
      this.pos = [this.destination[0] - 400, this.destination[1] - 100];
    } else if (this.homingCounter === 2) {
      this.pos = [this.destination[0] + 400, this.destination[1] - 100];
    } else if (this.homingCounter === 3) {
      this.pos = [this.destination[0]-20, this.destination[1] - 500];
    } else if (this.homingCounter === 4) {
      this.pos = [this.destination[0]-20, this.destination[1] + 500];
    }
    setTimeout(()=>{
      this.area.objects.push(new CircleProjectile("down", [this.pos[0], this.pos[1]], "panther"));
      this.area.objects.push(new CircleProjectile("up", [this.pos[0], this.pos[1]], "panther"));
      this.area.objects.push(new CircleProjectile("left", [this.pos[0], this.pos[1]], "panther"));
      this.area.objects.push(new CircleProjectile("right", [this.pos[0], this.pos[1]], "panther"));
    }, 200);
  }

  run() {
    if (this.action !== "ending" && this.action !== "split") {
      this.action = "running";
    }
  }

  crazyDash() {
    if (this.action !== "ending" && this.action !== "split") {
      this.action = "crazyDash";
    }
    this.dir = "left";
  }

  airSlash() {
    if (this.action !== "ending" && this.action !== "split") {
      this.action = "airSlash";
    }
  }

  jump() {
    if (this.action !== "ending" && this.action !== "split") {
      this.action = "jumping";
    }
  }

  fall() {
    if (this.action !== "ending" && this.action !== "split") {
      this.action = "fall";
    }
  }

  drawRun(ctx) {
    this.ticksPerFrame = 5;
    if (this.action === "crazyDash") {
      this.ticksPerFrame = 3;
    }
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
    if (this.action === "homingSlash") {
      this.ticksPerFrame = 2;
    }
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
    xoffset = 15 * velocityScale,
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
        this.dir = "right";
        if (this.pos[0] < this.destination[0] + 20) {
          this.pos[0] += 50 * velocityScale;
        } else {

        }
      } else if (this.homingCounter === 2) {
        this.dir = "left";
        if (this.pos[0] > this.destination[0] - 20) {
          this.pos[0] -= 50 * velocityScale;
        } else {

        }
      } else if (this.homingCounter === 3) {
        if (this.pos[1] < this.destination[1] + 20) {
          this.pos[1] += 50 * velocityScale;
        } else {

        }
      } else if (this.homingCounter === 4) {
        if (this.pos[1] > -200) {
          this.pos[1] -= 50 * velocityScale;
        } else {

        }
      }
    } else if (this.action === "crazyDash") {
      if (this.dashCount < 16) {
        if (this.dir === "left") {
          this.pos[0] -= 150 * velocityScale;
          if (this.pos[0] < -200) {
            this.dir = "right";
            this.pos[1] = this.destination[1] - 100;
            this.dashCount ++;
          }
        } else {
          this.pos[0] += 150 * velocityScale;
          if (this.pos[0] > 900) {
            this.dir = "left";
            this.pos[1] = this.destination[1] - 100;
            this.dashCount ++;
          }
        }
      } else {
        this.pos = [350, -200];
        this.action = "slam";
        this.area.objects.push(new ElectricBar("down", [0,-400]));
        this.area.objects.push(new ElectricBar("down", [180,-400]));
        this.area.objects.push(new ElectricBar("down", [540,-400]));
        this.area.objects.push(new ElectricBar("down", [720,-400]));
      }

    } else if (this.action === "slam") {
      this.pos[1] += 120 * velocityScale;
      if (this.pos[1] > 350) {
        this.pos[1] = 350;
        this.action = "idle";
        document.getElementById("game-holder").className = "animated shake";
        setTimeout(()=>{document.getElementById("canvas").className = "";}, 500);
        setTimeout(() => {this.run();}, 1500);
        setTimeout(() => {this.sequencePicker();}, 3000);
      }
    } else if (this.action === "pounce") {
      this.pos[1] += 20 * velocityScale;
      if (this.pos[1] > 350) {
        this.pos[0] = this.pos[0] + 20;
        if (this.dir === "left") {
          this.pos[1] = 320;
        } else {
          this.pos[1] = 350;
        }
        this.action = "hunch";
      }
      if (this.dir === "left") {
        this.pos[0] -= 20 * velocityScale;
      } else {
        this.pos[0] += 20 * velocityScale;
      }
    } else if (this.action === "ending") {
      if (this.area.player.dir === "left") {
        this.pos[0] -= .2 * velocityScale;
      } else {
        this.pos[0] += .2 * velocityScale;
      }
    }
  }

  slopeFinder(dir) {
    let x = this.destination[0] - this.pos[0];
    let y = this.destinaation[1] - this.pos[1];
  }

  drawEntry(ctx) {
    this.ticksPerFrame = 5;
    if (this.frameIndex > 4) {
      this.frameIndex = 0;
    }
    ctx.drawImage(this.standImage, this.frameIndex * 60, 0, 60, 70, this.pos[0], this.pos[1]-60, 180, 210 );
  }

  drawGroundSlash(ctx) {
    this.hitbox = [this.pos[0] - 50, this.pos[1] + 20, this.pos[0] + 200, this.pos[1] + 150];
    this.ticksPerFrame = 4;
    if (this.frameIndex > 7) {
      this.frameIndex = 0;
    }
    if (this.dir === "left") {
      ctx.drawImage(this.groundSlashImage, this.frameIndex * 100, 0, 100, 60, this.pos[0]-80, this.pos[1]-30, 300, 180 );
    } else {
      ctx.drawImage(this.groundSlashImageAlt, 800 - (this.frameIndex * 100), 0, 100, 60, this.pos[0]-30, this.pos[1]-30, 300, 180 );
    }
  }

  drawAirSpin(ctx) {
    this.ticksPerFrame = 3;
    if (this.frameIndex > 5) {
      this.frameIndex = 0;
    }
    if (this.dir === "left") {
      ctx.drawImage(this.airSpinImage, this.frameIndex * 70, 0, 70, 80, this.pos[0], this.pos[1], 210, 240 );
    } else {
      ctx.drawImage(this.airSpinImageAlt, 350 - (this.frameIndex * 70), 0, 70, 80, this.pos[0], this.pos[1], 210, 240 );
    }
  }

  drawPounce(ctx) {
    if (this.dir === "left") {
      ctx.drawImage(this.miscImage, 0, 90, 70, 90, this.pos[0], this.pos[1], 210, 270);
    } else {
      ctx.drawImage(this.miscImage, 70, 90, 70, 90, this.pos[0], this.pos[1], 210, 270);
    }
  }

  drawShock(ctx) {
    this.ticksPerFrame = 3;
    if (this.frameIndex > 3) {
      this.frameIndex = 0;
    }
    if (this.dir === "left") {
      ctx.drawImage(this.miscImage, this.frameIndex * 60, 180, 60, 60, this.pos[0], this.pos[1], 180, 180);
    } else {
      ctx.drawImage(this.miscImage, 120 - (this.frameIndex * 60), 250, 60, 60, this.pos[0], this.pos[1], 180, 180);
    }
  }

  drawEnd(ctx) {
    if (this.area.player.dir === "left") {
      ctx.drawImage(this.miscImage, 0, 320, 60, 60, this.pos[0], this.pos[1], 180, 180);
    } else {
      ctx.drawImage(this.miscImage, 80, 380, 60, 60, this.pos[0], this.pos[1], 180, 180);
    }
  }

  drawSplit(ctx) {
    if (this.area.player.dir === "left") {
      ctx.drawImage(this.miscImage, 70, 320, 70, 60, this.pos[0], this.pos[1], 210, 180);
    } else {
      ctx.drawImage(this.miscImage, 0, 380, 70, 60, this.pos[0], this.pos[1], 210, 180);
    }
  }



  draw(ctx) {
    ctx.imageSmoothingEnabled = false;
    this.tickCount += 1;

    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      this.frameIndex += 1;
    }


    if (this.action === "standing") {
      ctx.drawImage(this.standImage, 0,0, 60, 70, this.pos[0], this.pos[1]-60, 180, 210);
    } else if (this.action === "entry") {

      this.drawEntry(ctx);
    } else if (this.action === "running") {
      this.drawRun(ctx);
    } else if (this.action === "airSlash") {
      this.drawAirAtk(ctx);
    } else if (this.action === "jumping") {
      if (this.dir === "left") {
        ctx.drawImage(this.miscImage, 0,0, 40, 80, this.pos[0], this.pos[1], 120, 240);
      } else {
        ctx.drawImage(this.miscImage, 40,0, 40, 80, this.pos[0], this.pos[1], 120, 240);
      }
    } else if (this.action === "homingSlash") {
      if (this.homingCounter > 3) {
        ctx.drawImage(this.miscImage, 40,0, 40, 80, this.pos[0], this.pos[1], 120, 240);
      } else {
        this.drawAirAtk(ctx);
      }
    } else if (this.action === "crazyDash") {
      this.drawRun(ctx);
    } else if (this.action === "ground-slash") {
      this.drawGroundSlash(ctx);
    } else if (this.action === "airSpin") {
      this.drawAirSpin(ctx);
    } else if (this.action === "pounce") {
      this.drawPounce(ctx);
    } else if (this.action === "hunch") {
      if (this.dir === "left") {
        ctx.drawImage(this.miscImage, 0, 180, 60, 60, this.pos[0], this.pos[1], 180, 180);
      } else {
        ctx.drawImage(this.miscImage, 120, 250, 60, 60, this.pos[0], this.pos[1], 180, 180);
      }
    } else if (this.action === "shock") {
      this.drawShock(ctx);
    } else if (this.action === "ending") {
      this.drawEnd(ctx);
    } else if (this.action === "split") {
      this.drawSplit(ctx);
    }
    else
    {
      this.drawIdle(ctx);
    }
  }


  endSequence() {
    this.action = "ending";
    setTimeout(()=>{
      this.action = "split";
      document.getElementById("result").className = "";
    }, 3000);
    setTimeout(()=>{
      document.getElementById("result").className = "hidden";
    }, 3500);
    setTimeout(()=>{
      document.getElementById("canvas").className = "animated shake";
    }, 6000);
  }
}

export default Panther;
