import Player from './Player/Player.js'
import { initializeBoard, updateCell } from '../dom/dom.js'

function GameController() {

    const humanPlayer = Player("player")
    const computerPlayer = Player("computer")
    const currentPlayer = humanPlayer

    function startGame() {
        initializeBoard(humanPlayer.getGameBoard.getBoard, humanPlayer)
        initializeBoard(computerPlayer.getGameBoard.getBoard, computerPlayer)
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