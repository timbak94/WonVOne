import { Howl } from 'howler';

class Game {
  constructor(player, boss, area, ctx) {
    this.ctx = ctx;
    this.area = area;
    this.player = player;
    this.boss = boss;
    this.keys = {
      a: false,
      d: false,
      j: false,
    };
    this.keyBinder();
    this.paused = false;
    this.swingSound = new Howl({
      src: ["sounds/swing.wav"],
      autoplay: false,
      loop: false,
    });
    this.jumpSound = new Howl({
      src: ["sounds/jump_sound.wav"],
      autoplay: false,
      loop: false,
      volume: 0.3,
    });
    this.bgm = new Howl({
      src: ["sounds/bgm.wav"],
      loop: true,
      volume: 0.3
    });
  }

  keyBinder() {
    document.addEventListener("keydown", (e)=>{
      this.keys[e.key] = true;
    });
    document.addEventListener("keyup", (e)=>{
      this.keys[e.key] = false;
    });
    document.addEventListener("keydown", (e)=>{
      if (e.key === "p") {
        if (this.paused) {
          this.resume();
        } else {
          this.pauseAnim();
        }
      }
    });
  }

  keyCheck() {

    if (this.player.action !== "hit" && this.player.action !== "crazyHit" && this.boss.action !== "ending" && this.boss.action !== "split") {
      if (this.keys.a) {
        this.player.run("left");
      } else if (this.keys.d) {
        this.player.run("right");
      } else {
        this.player.action = "stand";
      }
      if (this.keys.s) {
        this.player.dash();
      }
      if (this.keys.j) {
        this.jumpSound.play();
        this.player.jump();
        this.keys.j = false;
      }
      if (this.keys.k) {
        this.swingSound.play();
        this.player.attack(this.ctx);
        this.keys.k = false;
      }
    }
  }

  pauseAnim() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
    requestAnimationFrame(this.animate.bind(this));
  }

  start() {
    this.lastTime = 0;
    this.animation = requestAnimationFrame(this.animate.bind(this));
    this.boss.start();
    setTimeout(()=>{
      this.bgm.play();
    }, 7200);
  }

  animate(time) {
    if (this.boss.action === "ending") {
      this.bgm.stop();
    }
    this.timeDiff = time - this.lastTime;
    this.keyCheck();
    this.area.step(this.timeDiff);
    this.area.draw(this.ctx, this.timeDiff);
    this.lastTime = time;
    if (this.paused === false) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }
}

export default Game;
