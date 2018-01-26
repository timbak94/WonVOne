/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__boss__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__panther__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__area__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__game__ = __webpack_require__(4);






document.addEventListener("DOMContentLoaded", ()=> {
  const canvasEl = document.getElementById("canvas");
  const ctx = canvasEl.getContext("2d");
  const player = new __WEBPACK_IMPORTED_MODULE_0__player__["a" /* default */]();
  const panther = new __WEBPACK_IMPORTED_MODULE_2__panther__["a" /* default */]();
  const area = new __WEBPACK_IMPORTED_MODULE_3__area__["a" /* default */](player, panther);
  panther.area = area;
  const game = new __WEBPACK_IMPORTED_MODULE_4__game__["a" /* default */](player, panther, area, ctx);
  game.start();
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__attack__ = __webpack_require__(5);


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
    this.dir = dir;
    this.vel[0] += 2;
    this.action = "moving";
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

  jump() {
    if (this.jumpCount < 3) {
      this.vel[1] = 0;
      this.jumpCount += 1;
      this.jumping = true;
      this.vel[1] += 7;
      this.jumpScale = .15;
    }
  }

  fall() {
    this.falling = true;
    this.vel[1] -= 2;
  }

  dash() {
    this.action = "dashing";
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
          this.jumpScale += .01;
        } else {
          this.jumpScale = .15;
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
    if (this.action === "hit") {
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



/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Boss {
  constructor() {

  }
}

/* unused harmony default export */ var _unused_webpack_default_export = (Boss);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__projectile__ = __webpack_require__(6);


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
        if (this.player.pos[1] + 50 > this.boss.hitbox[1] ) {
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
    this.boss.draw(ctx);
    this.player.draw(ctx);
    this.objects.forEach((el) => {
      el.draw(ctx);
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Area);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Attack {
  constructor(type) {

  }

  draw(player_pos, dir, ctx) {
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      this.frameIndex += 1;
    }
  }
}

/* unused harmony default export */ var _unused_webpack_default_export = (Attack);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class CircleProjectile {
  constructor(type, startPos, boss) {
    this.type = type;
    this.pos = startPos;
    this.tickCount = 0;
    this.ticksPerFrame = 3;
    this.frameIndex = 0;
    this.dir = "left";
    switch(boss) {
      case "panther":
        this.image = new Image();
        this.image.src = "images/cat-projectile.png";
    }
  }

  move() {
    if (this.type === "down") {
      this.pos[1] += 8;
    } else if (this.type === "up") {
      this.pos[1] -= 8;
    } else if (this.type === "right") {
      this.pos[0] += 8;
    } else if (this.type === "left") {
      this.pos[0] -= 8;
    } else if (this.type === "diag1") {
      this.pos[1] += 8;
      this.pos[0] += 8;
    } else if (this.type === "diag2") {
      this.pos[1] -= 8;
      this.pos[0] += 8;
    } else if (this.type === "diag3") {
      this.pos[1] += 8;
      this.pos[0] -= 8;
    } else if (this.type === "diag4") {
      this.pos[1] -= 8;
      this.pos[0] -= 8;
    }
  }

  draw(ctx) {
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      this.frameIndex += 1;
    }

    if (this.frameIndex > 3) {
      this.frameIndex = 0;
    }
    ctx.drawImage(this.image, this.frameIndex * 30, 0, 26, 26, this.pos[0], this.pos[1], 50, 50);
  }


}

/* harmony default export */ __webpack_exports__["a"] = (CircleProjectile);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__projectile__ = __webpack_require__(6);


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
        this.area.objects.push( new __WEBPACK_IMPORTED_MODULE_0__projectile__["a" /* default */]("right", [this.pos[0]+40, this.pos[1]+50], "panther"));
      } else {
        this.area.objects.push( new __WEBPACK_IMPORTED_MODULE_0__projectile__["a" /* default */]("left", [this.pos[0]+40, this.pos[1]+50], "panther"));
      }
      this.area.objects.push( new __WEBPACK_IMPORTED_MODULE_0__projectile__["a" /* default */]("up", [this.pos[0]+40, this.pos[1]+30], "panther"));
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

/* harmony default export */ __webpack_exports__["a"] = (Panther);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map