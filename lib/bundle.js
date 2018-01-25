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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__area__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game__ = __webpack_require__(4);





document.addEventListener("DOMContentLoaded", ()=> {
  const canvasEl = document.getElementById("canvas");
  const ctx = canvasEl.getContext("2d");
  const player = new __WEBPACK_IMPORTED_MODULE_0__player__["a" /* default */]();
  const boss = new __WEBPACK_IMPORTED_MODULE_1__boss__["a" /* default */]();
  const area = new __WEBPACK_IMPORTED_MODULE_2__area__["a" /* default */](player, boss);
  const game = new __WEBPACK_IMPORTED_MODULE_3__game__["a" /* default */](player, boss, area, ctx);
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



/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Boss {
  constructor() {

  }
}

/* harmony default export */ __webpack_exports__["a"] = (Boss);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Area {
  constructor(player, boss) {
    this.player = player;
    this.boss = boss;
    this.objects = [this.player];

  }

  step(time) {
    this.player.move(time);
  }

  draw(ctx) {
    ctx.clearRect(10,0,880,470);
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
  }

  keyBinder() {
    document.addEventListener("keydown", (e)=>{
      this.keys[e.key] = true;
    });
    document.addEventListener("keyup", (e)=>{
      this.keys[e.key] = false;
    });
  }

  drawGround() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0,470,900,30);
    this.ctx.fillRect(0,0,10,500);
    this.ctx.fillRect(890,0,10,500);
  }

  keyCheck() {
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

  start() {
    this.drawGround();
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    this.timeDiff = time - this.lastTime;
    this.keyCheck();
    this.area.step(this.timeDiff);
    this.area.draw(this.ctx, this.timeDiff);
    this.lastTime = time;
    requestAnimationFrame(this.animate.bind(this));
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

  render(player_pos, dir, ctx) {

  }
}

/* unused harmony default export */ var _unused_webpack_default_export = (Attack);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map