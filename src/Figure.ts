import {BOARD, PIECES} from "./constants.ts";

export class Figure {
    position: { x: number; y: number }
    shape: number[][]
    ctx: CanvasRenderingContext2D

    constructor({x, y}: { x: number, y: number }, ctx: CanvasRenderingContext2D) {
        this.position = {x, y};
        this.shape = this.getRandomPiece()
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

    getRandomPiece() {
        return PIECES[Math.floor(Math.random() * PIECES.length)];
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

    rotate() {
        const rows = this.shape.length;
        const cols = Math.max(...this.shape.map((r) => r.length));
        const previousShape = this.shape;

        const rotated = Array.from({length: cols}, () => Array(rows).fill(0))
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                rotated[j][rows - i - 1] = this.shape[i][j];
            }
        }

        this.shape = rotated
        if (this.checkCollision()) this.shape = previousShape
    }

    reset() {
        this.position = {x: 6, y: 0}
        this.shape = this.getRandomPiece()
    }
}