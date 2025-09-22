export const BLOCK_SIZE = 24
export const BOARD_WIDTH = 14
export const BOARD_HEIGHT = 25

export const BOARD = Array.from({length: BOARD_HEIGHT}, () => Array(BOARD_WIDTH).fill(0));

export const PIECES = [
    [
        [1, 1],
        [1, 1]
    ],
    [
        [0, 1, 0],
        [1, 1, 1]
    ],
    [
        [1],
        [1],
        [1]
    ],
    [
        [1, 0],
        [1, 0],
        [1, 1],
    ]
]

