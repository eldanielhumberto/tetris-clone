import {BLOCK_SIZE, BOARD_HEIGHT, BOARD_WIDTH} from "./constants.ts";
import {Figure} from "./Figure.ts";
import {Board} from "./Board.ts";

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT

ctx.scale(BLOCK_SIZE, BLOCK_SIZE)

const board = new Board(ctx);
const figure = new Figure({
    position: {x: 6, y: 0},
    shape: [
        [1, 1],
        [1, 1],
    ]
}, ctx);

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

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    figure.draw()
    board.draw()
}

let dropCounter = 0
let lastTime = 0

function update(time = 0) {
    const deltaTime = time - lastTime
    lastTime = time

    dropCounter += deltaTime
    if (dropCounter > 200) {
        figure.position.y++
        dropCounter = 0

        if (figure.checkCollision()) {
            figure.position.y--

            figure.solidify()
            board.removeRow()
        }
    }

    draw()
    window.requestAnimationFrame(update)
}

update()
