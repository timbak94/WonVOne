import Player from './player';
import Boss from './boss';
import Area from './area';
import Game from './game';

document.addEventListener("DOMContentLoaded", ()=> {
  const canvasEl = document.getElementById("canvas");
  const ctx = canvasEl.getContext("2d");
  const player = new Player();
  const boss = new Boss();
  const area = new Area(player, boss);
  const game = new Game(player, boss, area, ctx);
  game.start();
});
