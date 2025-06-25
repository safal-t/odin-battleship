import Gameboard from '../Gameboard/Gameboard.js'

function Player(type) {
    const gameBoard = Gameboard(type)
    return {
        type,
        get getGameBoard() {
            return gameBoard
        }
    }
}

export default Player