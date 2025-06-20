import Player from './Player/Player.js'
import domManager from '../dom/dom.js'

function GameController() {

    const humanPlayer = Player("player")
    const computerPlayer = Player("computer")
    const currentPlayer = humanPlayer

    function startGame() {
        domManager.initializeBoard(humanPlayer.getGameBoard.getBoard, humanPlayer)
        domManager.initializeBoard(computerPlayer.getGameBoard.getBoard, computerPlayer)
    }

    function endGame() {

    }

    function initializeGame() {
        // do i need?? 
    }

    function manageTurn(currentPlayer) {

    }

    function receiveAttack() {

    }

    return {
        startGame
    }
}

export default GameController