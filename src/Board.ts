import {BOARD, BOARD_WIDTH} from "./constants.ts";

export class Board {
    ctx: CanvasRenderingContext2D

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    draw() {
        BOARD.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === 1) {
                    this.ctx.fillStyle = "#ffffff"
                    this.ctx.fillRect(x, y, 1, 1)
                }
            })
        })
    }

    removeRow() {
        const rowsToRemove: number[] = []

        BOARD.forEach((row, y) => {
            if (row.every(v => v === 1)) rowsToRemove.push(y)
        })

        rowsToRemove.forEach(y => {
            BOARD.splice(y, 1)

            const newRow = Array(BOARD_WIDTH).fill(0)
            BOARD.unshift(newRow)
        })
    }
}