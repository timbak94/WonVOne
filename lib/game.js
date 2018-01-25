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
    })
  }

  drawGround() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0,470,900,30);
    this.ctx.fillRect(0,0,10,500);
    this.ctx.fillRect(890,0,10,500);
  }

  keyCheck() {

    if (this.player.action !== "hit") {
      if (this.keys["a"]) {
        this.player.run("left");
      } else if (this.keys["d"]) {
        this.player.run("right");
      } else {
        this.player.action = "stand";
      }
      if (this.keys["s"]) {
        this.player.dash();
      }
      if (this.keys["j"]) {
        this.player.jump();
        this.keys["j"] = false;
      }
      if (this.keys["k"]) {
        this.player.attack(this.ctx);
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
    this.drawGround();
    this.lastTime = 0;
    this.animation = requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
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
