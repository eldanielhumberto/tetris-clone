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
    mapper: number[][]
    width: number
    height: number

    constructor({position, mapper}: FigureOptions) {
        this.position = position;
        this.mapper = mapper;
        this.width = mapper[0].length;
        this.height = mapper.length;
    }

    draw() {
        ctx.fillStyle = "#ffffff"
        this.mapper.forEach((row, x) => {
            row.forEach((cell, y) => {
                if (cell === 1) {
                    ctx.fillRect(this.position.x + y, this.position.y + x, 1, 1)
                }
            })
        })
    }
}

const figure = new Figure({
    position: {x: 1, y: 1},
    mapper: [
        [1, 1],
        [1, 1]
    ]
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
