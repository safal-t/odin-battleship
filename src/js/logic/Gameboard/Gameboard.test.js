import Gameboard from "./Gameboard.js"

describe('Gameboard', () => {

    let gameBoard

    beforeEach(() => {
        gameBoard = Gameboard()
    })

    it('initializes a 10 x 10 board', () => {
        const board = gameBoard.getBoard
        expect(board.length).toBe(10)
        board.forEach(row => {
            expect(row.length).toBe(10)
        })
    })

    it('initializes each cell with correct defaults', () => {
        [[0, 0], [3, 5], [9, 9]].forEach(([y, x]) => {
            const cell = gameBoard.getBoard[y][x];
            expect(cell.x).toBe(x);
            expect(cell.y).toBe(y);
            expect(cell.ship).toBe(null);
            expect(cell.isHit).toBe(false);
        });
    })

    it('returns a cell correctly', () => {
        expect(gameBoard.getCell({ x: 0, y: 0 })).toEqual({
            x: 0,
            y: 0,
            ship: null,
            isHit: false
        })
    })

    it('places a ship correctly', () => {
        gameBoard.placeShip(3, { x: 0, y: 0 }, "horizontal")
        expect(gameBoard.getCell({ x: 0, y: 0 }).ship).not.toBeNull()
    })

    it('receives an attack', () => {
        gameBoard.placeShip(3, { x: 0, y: 0 }, "horizontal")
        gameBoard.receiveAttack({ x: 0, y: 0 })
        expect(gameBoard.getCell({ x: 0, y: 0 }).isHit).toBe(true)
        expect(gameBoard.getCell({ x: 9, y: 9 }).isHit).toBe(false)

    })

    it('reports true when all ships have been sunk', () => {
        gameBoard.placeShip(1, { x: 0, y: 0 }, "horizontal")
        expect(gameBoard.allShipsSunk()).toBe(false);
        gameBoard.receiveAttack({ x: 0, y: 0 })
        expect(gameBoard.allShipsSunk()).toBe(true)
    })
})