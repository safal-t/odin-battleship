import Ship from '../Ship/Ship.js';

function Gameboard() {

    const board = Array(10).fill(null).map((_, y) =>
        Array(10).fill(null).map((_, x) => {
            return {
                x,
                y,
                ship: null,
                isHit: false
            };
        })
    )

    const missedAttacks = []
    const allShips = []

    function placeShip(length, coordinates, direction) {
        const ship = Ship(length)
        allShips.push(ship)
        const neededCoordinates = calculateNeededCoordinates(length, coordinates, direction)
        if (coordinatesAreValid(neededCoordinates)) {
            neededCoordinates.forEach(({ x, y }) => {
                getCell({ x, y }).ship = ship
            })
            return ship // ship placed
        }
        return null // ship not placed
    }

    function calculateNeededCoordinates(length, { x, y }, direction) {
        const neededCoordinates = []

        for (let i = 0; i < length; i++) {
            if (direction === "vertical") {
                neededCoordinates.push({ x, y: y + i });
            } else if (direction === "horizontal") {
                neededCoordinates.push({ x: x + i, y });
            }
        }

        return neededCoordinates
    }

    function coordinatesAreValid(array) {
        return array.every(({ x, y }) =>
            y >= 0 && y < 10 && x >= 0 && x < 10 && board[y][x].ship === null
        )
    }

    function getCell({ x, y }) {
        return board[y][x]
    }

    function receiveAttack({ x, y }) {
        const board = getCell({ x, y })
        if (board.ship !== null) {
            board.isHit = true
            board.ship.hit()
        }
        else missedAttacks.push({ x, y })
    }

    function allShipsSunk() {
        return allShips.every(ship => ship.isSunk())
    }

    return {
        get getBoard() {
            return board
        },
        placeShip,
        getCell,
        receiveAttack,
        allShipsSunk
    }
}


export default Gameboard


