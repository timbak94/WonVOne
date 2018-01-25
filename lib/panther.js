class Panther {
  constructor(area) {
    this.area = area;
    this.pos = [600, 400];
    this.sheet = new Image();
    this.sheet.src = 'images/panther-test.png';
  }

  draw(ctx) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.sheet, 0, 0, 80, 40, this.pos[0], this.pos[1], 200, 100);
  }
}

export default Panther;
