const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const grid = 32;

let figureX = grid;
let figureY = 0;

function drawSquare() {
  if (!ctx) return;

  ctx.fillStyle = "#ffffff"
  ctx.fillRect(figureX, figureY, grid * 2, grid * 2)
}

function draw() {
  ctx?.clearRect(0, 0, canvas.width, canvas.height)
  drawSquare()

  figureY++;
}

(() => {
  function main() {
    window.requestAnimationFrame(main)
    draw()
  }

  main()
})();
