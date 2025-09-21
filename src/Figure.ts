import {BOARD} from "./constants.ts";

export class Figure {
    position: { x: number; y: number }
    shape: number[][]
    width: number
    height: number
    ctx: CanvasRenderingContext2D

    constructor({position, shape}: {
        position: { x: number, y: number },
        shape: number[][]
    }, ctx: CanvasRenderingContext2D) {
        this.position = position;
        this.shape = shape;
        this.width = shape[0].length;
        this.height = shape.length;
        this.ctx = ctx;
    }

    draw() {
        this.shape.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === 1) {
                    this.ctx.fillStyle = "#ffffff"
                    this.ctx.fillRect(this.position.x + x, this.position.y + y, 1, 1)
                }
            })
        })
    }

    checkCollision() {
        return this.shape.find((row, y) => {
            return row.find((cell, x) => {
                return cell === 1 && BOARD[y + this.position.y]?.[x + this.position.x] !== 0
            })
        })
    }

    solidify() {
        this.shape.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === 1) {
                    BOARD[y + this.position.y][x + this.position.x] = 1;
                }
            })
        })

        this.reset()
    }

    reset() {
        this.position = {x: 6, y: 0}
    }
}