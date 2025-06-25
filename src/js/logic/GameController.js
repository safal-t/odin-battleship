import Player from './Player/Player.js'
import domManager from '../dom/dom.js'

function GameController() {

    const humanPlayer = Player("player")
    const computerPlayer = Player("computer")
    let currentPlayer = humanPlayer

    function startGame() {
        domManager.initializeBoard(humanPlayer.getGameBoard, humanPlayer, handleCellClick);
        domManager.initializeBoard(computerPlayer.getGameBoard, computerPlayer, handleCellClick);
        populateBoard(humanPlayer.getGameBoard);
        populateBoard(computerPlayer.getGameBoard);
    }


    function endGame() {

    }

    function initializeGame() {
        // do i need?? 
    }

    function changeTurn(currentPlayer) {
        return currentPlayer === humanPlayer ? computerPlayer : humanPlayer
    }

    function receiveAttack(cellElement, playerType) {
        const [x, y] = cellElement.dataset.coordinates.split(',').map(Number)
        const cell = playerType.getGameBoard.getCell({ x, y })

        let playerTypeStr = "player";
        if (playerType === computerPlayer) {
            playerTypeStr = "computer"
        }

        if (cell.ship === null) {
            domManager.updateCell(cell, "missed-attack", playerTypeStr)
        } else {
            domManager.updateCell(cell, "attacked", playerTypeStr)
            cell.isHit = true
        }
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
            receiveAttack(cell, computerPlayer)
            currentPlayer = changeTurn(currentPlayer)
            computerAttack()
        }
    }

    function computerAttack() {
        const coordinates = computerPlayer.makeRandomMove();

        const { x, y } = coordinates;

        const playerBoard = document.querySelector(".player-game-board");
        const cellElement = playerBoard.querySelector(`[data-coordinates="${x},${y}"]`);

        if (cellElement) {
            receiveAttack(cellElement, humanPlayer);
        } else {
            console.error(`Player cell not found for coordinates: ${x}, ${y}`);
        }
        currentPlayer = changeTurn(currentPlayer)

    }


    return {
        startGame,
        handleCellClick
    }
}

export default GameController