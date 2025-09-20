const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

const BLOCK_SIZE = 32
const BOARD_WIDTH = 14
const BOARD_HEIGHT = 25

canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT

ctx.scale(BLOCK_SIZE, BLOCK_SIZE)

class Figure implements FigureOptions {
  position: { x: number; y: number }
  height: number;
  width: number;

  constructor({ position, height, width }: FigureOptions) {
    this.position = position;
    this.height = height;
    this.width = width
  }

  draw() {
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

const figure = new Figure({
  position: { x: 1, y: 1 },
  width: 1,
  height: 1
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    figure.position.x--
  }

  if (event.key === "ArrowRight") {
    figure.position.x++
  }

  // Make sure the figure doesn't escape from the canvas.
  if (figure.position.x < 0) figure.position.x = 0
  if (figure.position.x + figure.width > BOARD_WIDTH) {
    figure.position.x = BOARD_WIDTH - figure.width
  }
})

function main() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  figure.draw()

  // Make the figure go down and stop at the limit.
  if (figure.position.y + figure.height <= BOARD_HEIGHT) {
    figure.position.y += 0.07
  }

  window.requestAnimationFrame(main)
}

main()
