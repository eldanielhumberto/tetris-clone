const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d")
const grid = 32

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
    if (!ctx) return

    ctx.fillStyle = "#ffffff"
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

const figure = new Figure({
  position: { x: grid, y: grid },
  width: grid * 2,
  height: grid * 2
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    figure.position.x -= grid
  }

  if (event.key === "ArrowRight") {
    figure.position.x += grid
  }

  // Make sure the figure doesn't escape from the canvas.
  if (figure.position.x < 0) figure.position.x = 0
  if (figure.position.x + figure.width > canvas.width) {
    figure.position.x = canvas.width - figure.width
  }
})

function main() {
  window.requestAnimationFrame(main)
  ctx?.clearRect(0, 0, canvas.width, canvas.height)

  figure.draw()

  // Make the figure go down and stop at the limit.
  if (figure.position.y + figure.height <= canvas.height) {
    figure.position.y += 2
  }
}

main()
