import Gameboard from '../Gameboard/Gameboard.js'

function Player(type) {
    const gameBoard = Gameboard(type)

    const movesMade = new Set()

    function makeRandomMove() {
        while (true) {
            const x = Math.floor(Math.random() * 10)
            const y = Math.floor(Math.random() * 10)
            const coord = `${x},${y}`

            if (!movesMade.has(coord)) {
                movesMade.add(coord)
                return { x, y }
            }
        }
    }

    return {
        type,
        get getGameBoard() {
            return gameBoard
        }
    }
}

export default Player