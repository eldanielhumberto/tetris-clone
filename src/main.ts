import {BLOCK_SIZE, BOARD_HEIGHT, BOARD_WIDTH} from "./constants.ts";
import {Figure} from "./Figure.ts";
import {Board} from "./Board.ts";

// Config
const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

const $playButton = document.getElementById("play-button") as HTMLButtonElement
const $scoreText = document.getElementById("score") as HTMLParagraphElement
const $menu = document.getElementById("menu") as HTMLDivElement

canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT
ctx.scale(BLOCK_SIZE, BLOCK_SIZE)

// Init objects
const board = new Board(ctx, $scoreText);
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
        case "ArrowUp":
            figure.rotate()
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

$playButton.addEventListener("click", () => {
    $menu.className = "hidden"
    update();
})

