import Player from './player';
import Boss from './boss';
import Panther from './panther';
import Area from './area';
import Game from './game';

document.addEventListener("DOMContentLoaded", ()=> {
  const canvasEl = document.getElementById("canvas");
  const ctx = canvasEl.getContext("2d");
  const start = document.getElementById("start");
  const menu = document.getElementById("start-menu");
  const player = new Player();
  const panther = new Panther();
  const area = new Area(player, panther);
  panther.area = area;
  const game = new Game(player, panther, area, ctx);
  start.addEventListener("click", ()=>{
    menu.className= "hidden";
    setTimeout(()=>{
      game.start();
    }, 2000);
  });
});
