import Player from './Player/Player.js'
import domManager from '../dom/dom.js'

function GameController() {

    const humanPlayer = Player("player")
    const computerPlayer = Player("computer")
    const currentPlayer = humanPlayer

    function startGame() {
        domManager.initializeBoard(humanPlayer.getGameBoard, humanPlayer)
        domManager.initializeBoard(computerPlayer.getGameBoard, computerPlayer)

        populateBoard(humanPlayer.getGameBoard)
        populateBoard(computerPlayer.getGameBoard)
    }

    function endGame() {

    }

    function initializeGame() {
        // do i need?? 
    }

    function changeTurn(currentPlayer) {
        return currentPlayer === humanPlayer ? computerPlayer : humanPlayer
    }

    function receiveAttack() {

    }

    function populateBoard(board) {
        const ship1 = board.placeShip(5, { x: 0, y: 0 }, "horizontal")
        const ship2 = board.placeShip(4, { x: 0, y: 2 }, "horizontal")
        const ship3 = board.placeShip(3, { x: 0, y: 4 }, "horizontal")
        const ship4 = board.placeShip(3, { x: 0, y: 6 }, "horizontal")
        const ship5 = board.placeShip(2, { x: 0, y: 8 }, "horizontal")
        const ships = [ship1, ship2, ship3, ship4, ship5]

        ships.forEach(ship => {
            let i = 0;
            while (i < ship.getLength) {
                domManager.updateCell({ x: i, y: ship.getCoordinates.y }, "ship", board.getPlayerType)
                i++
            }
        })


    }

    function handleCellClick(cell) {
        if (cell.dataset.playerType === "computer" && currentPlayer === humanPlayer) {
            receiveAttack(cell)
        }
    }

    return {
        startGame,
        handleCellClick
    }
}

export default GameController