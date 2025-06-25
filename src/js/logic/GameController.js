// GameController.js
import Player from './Player/Player.js'
import domManager from '../dom/dom.js'

function GameController() {
    const humanPlayer = Player("player")
    const computerPlayer = Player("computer")
    let currentPlayer = humanPlayer

    function startGame() {
        setupPlayerBoard(humanPlayer)
        setupPlayerBoard(computerPlayer)
        autoPopulateBoards()
    }

    function setupPlayerBoard(player) {
        domManager.initializeBoard(player.getGameBoard, player, handleCellClick);
    }

    function autoPopulateBoards() {
        [humanPlayer, computerPlayer].forEach(player => populateBoard(player.getGameBoard));
    }

    function changeTurn() {
        currentPlayer = currentPlayer === humanPlayer ? computerPlayer : humanPlayer
    }

    function receiveAttack(cellElement, player) {
        const [x, y] = cellElement.dataset.coordinates.split(',').map(Number)
        const cell = player.getGameBoard.getCell({ x, y })

        const playerTypeStr = player === computerPlayer ? "computer" : "player"

        const status = cell.ship ? "attacked" : "missed-attack"
        domManager.updateCell(cell, status, playerTypeStr)
        cell.isHit = true
    }

    function populateBoard(board) {
        const shipsToPlace = [5, 4, 3, 3, 2]
        shipsToPlace.forEach((length, index) => {
            const y = index * 2;
            const ship = board.placeShip(length, { x: 0, y }, "horizontal")
            for (let i = 0; i < ship.getLength; i++) {
                domManager.updateCell({ x: i, y }, "ship", board.getPlayerType)
            }
        })
    }

    function handleCellClick(cellElement) {
        if (cellElement.dataset.playerType !== "computer" || currentPlayer !== humanPlayer) return

        const [x, y] = cellElement.dataset.coordinates.split(',').map(Number)
        const cell = computerPlayer.getGameBoard.getCell({ x, y })
        if (cell.isHit) return

        playTurn(cellElement, computerPlayer)
        setTimeout(() => {
            const { x, y } = computerPlayer.makeRandomMove()
            const playerBoard = document.querySelector(".player-game-board")
            const targetCell = playerBoard.querySelector(`[data-coordinates="${x},${y}"]`)
            if (targetCell) playTurn(targetCell, humanPlayer)
        }, 500)
    }

    function playTurn(cellElement, targetPlayer) {
        receiveAttack(cellElement, targetPlayer)
        changeTurn()
    }

    return { startGame, handleCellClick }
}

export default GameController
