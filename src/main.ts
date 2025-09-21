import {BLOCK_SIZE, BOARD_HEIGHT, BOARD_WIDTH} from "./constants.ts";
import {Figure} from "./Figure.ts";
import {Board} from "./Board.ts";

// Canvas config
const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT
ctx.scale(BLOCK_SIZE, BLOCK_SIZE)

// Init objects
const board = new Board(ctx);
const figure = new Figure({x: 6, y: 0}, ctx);

// Controls
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowLeft":
            figure.position.x--
            if (figure.checkCollision()) figure.position.x++
            break;
        case "ArrowRight":
            figure.position.x++
            if (figure.checkCollision()) figure.position.x--
            break;
        case "ArrowDown":
            figure.position.y++
            if (figure.checkCollision()) {
                figure.position.y--

                figure.solidify()
                board.removeRow()
            }
    }
})

// Draw objects
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    figure.draw()
    board.draw()
}

// Time control
const DROP_INTERVAL = 200
let dropCounter = 0
let lastTime = 0

// Loop
function update(time = 0) {
    const deltaTime = time - lastTime
    lastTime = time

    dropCounter += deltaTime
    if (dropCounter > DROP_INTERVAL) {
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
