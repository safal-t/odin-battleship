import Gameboard from '../Gameboard/Gameboard.js'

function Player(type) {
    const gameBoard = Gameboard()

    return {
        type,
        get getGameBoard() {
            return gameBoard
        }
    }
}

export default Player