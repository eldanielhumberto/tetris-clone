import {BOARD, BLOCK_SIZE, BOARD_HEIGHT, BOARD_WIDTH} from "./constants.ts";

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT

ctx.scale(BLOCK_SIZE, BLOCK_SIZE)

class Figure {
    position: { x: number; y: number }
    shape: number[][]
    width: number
    height: number

    constructor({position, shape}: { position: { x: number, y: number }, shape: number[][] }) {
        this.position = position;
        this.shape = shape;
        this.width = shape[0].length;
        this.height = shape.length;
    }

    draw() {
        this.shape.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === 1) {
                    ctx.fillStyle = "#ffffff"
                    ctx.fillRect(this.position.x + x, this.position.y + y, 1, 1)
                }
            })
        })
    }

    checkCollision() {
        return figure.shape.find((row, y) => {
            return row.find((cell, x) => {
                return cell === 1 && BOARD[y + figure.position.y]?.[x + figure.position.x] !== 0
            })
        })
    }

    solidify() {
        figure.shape.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === 1) {
                    BOARD[y + figure.position.y][x + figure.position.x] = 1;
                }
            })
        })

        this.reset()
    }

    reset() {
        figure.position = {x: 6, y: 0}
    }
}


class Board {
    draw() {
        BOARD.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === 1) {
                    ctx.fillStyle = "#ffffff"
                    ctx.fillRect(x, y, 1, 1)
                }
            })
        })
    }
}

const board = new Board();
const figure = new Figure({
    position: {x: 6, y: 0},
    shape: [
        [1, 1],
        [1, 1],
    ]
});

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        figure.position.x--
        if (figure.checkCollision()) {
            figure.position.x++
        }
    }

    if (event.key === "ArrowRight") {
        figure.position.x++
        if (figure.checkCollision()) {
            figure.position.x--
        }
    }
})

let dropCounter = 0
let lastTime = 0

function update(time = 0) {
    const deltaTime = time - lastTime
    lastTime = time

    dropCounter += deltaTime
    if (dropCounter > 350) {
        figure.position.y++
        dropCounter = 0

        if (figure.checkCollision()) {
            figure.position.y--
            figure.solidify()
        }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    figure.draw()
    board.draw()
    window.requestAnimationFrame(update)
}

update()
