// GameController.js
import Player from './Player/Player.js'
import domManager from '../dom/dom.js'

function GameController() {
    const humanPlayer = Player("player")
    const computerPlayer = Player("computer")
    let currentPlayer = humanPlayer
    let gameOver = false

    function startGame() {
        setupPlayerBoard(humanPlayer)
        setupPlayerBoard(computerPlayer)
        autoPopulateBoards()
        setupRandomPlacementButton()
    }

    function setupPlayerBoard(player) {
        domManager.initializeBoard(player.getGameBoard, player, handleCellClick);
    }

    function autoPopulateBoards() {
        populateBoard(humanPlayer.getGameBoard)
        populateBoard(computerPlayer.getGameBoard)
    }

    function changeTurn() {
        currentPlayer = currentPlayer === humanPlayer ? computerPlayer : humanPlayer
    }

    function receiveAttack(cellElement, player) {
        const [x, y] = cellElement.dataset.coordinates.split(',').map(Number)

        player.getGameBoard.receiveAttack({ x, y })

        const cell = player.getGameBoard.getCell({ x, y })
        const playerTypeStr = player === computerPlayer ? "computer" : "player"
        const status = cell.ship ? "attacked" : "missed-attack"
        domManager.updateCell(cell, status, playerTypeStr)

        if (checkGameOver(player)) {
            endGame(currentPlayer === humanPlayer ? "Player" : "Computer")
        }
    }

    function checkGameOver(player) {
        return player.getGameBoard.allShipsSunk()
    }

    function endGame(winner) {
        gameOver = true
        alert(`${winner} wins!`)
    }

    function clearBoardState(board) {
        board.getBoard.forEach(row => {
            row.forEach(cell => {
                cell.ship = null
                cell.isHit = false
            })
        })
        if (board.getShips) board.getShips().length = 0 // if such accessor exists
    }

    function clearBoard(boardElement) {
        boardElement.innerHTML = ''
    }

    function populateBoard(board) {
        const shipsToPlace = [5, 4, 3, 3, 2]
        let attempts = 0;
        let success = false;

        while (!success && attempts < 100) {
            clearBoardState(board)
            clearBoard(document.querySelector(`.${board.getPlayerType}-game-board`))
            domManager.initializeBoard(board, { type: board.getPlayerType }, handleCellClick)
            const placedShips = []

            for (let i = 0; i < shipsToPlace.length; i++) {
                const length = shipsToPlace[i]
                const direction = Math.random() < 0.5 ? "horizontal" : "vertical"
                const x = Math.floor(Math.random() * (direction === "horizontal" ? 10 - length : 10))
                const y = Math.floor(Math.random() * (direction === "vertical" ? 10 - length : 10))

                const ship = board.placeShip(length, { x, y }, direction)
                if (!ship) break
                placedShips.push({ ship, x, y, direction })
            }

            success = placedShips.length === shipsToPlace.length
        }

        // Display ships on board
        board.getBoard.forEach(row => {
            row.forEach(cell => {
                if (cell.ship) {
                    domManager.updateCell(cell, "ship", board.getPlayerType)
                }
            })
        })
    }

    function handleCellClick(cellElement) {
        if (gameOver) return
        if (cellElement.dataset.playerType !== "computer" || currentPlayer !== humanPlayer) return

        const [x, y] = cellElement.dataset.coordinates.split(',').map(Number)
        const cell = computerPlayer.getGameBoard.getCell({ x, y })
        if (cell.isHit) return

        playTurn(cellElement, computerPlayer)

        setTimeout(() => {
            if (gameOver) return
            const { x, y } = computerPlayer.makeRandomMove()
            const playerBoard = document.querySelector(".player-game-board")
            const targetCell = playerBoard.querySelector(`[data-coordinates="${x},${y}"]`)
            if (targetCell) playTurn(targetCell, humanPlayer)
        }, 500)
    }

    function playTurn(cellElement, targetPlayer) {
        receiveAttack(cellElement, targetPlayer)
        if (!gameOver) changeTurn()
    }

    function setupRandomPlacementButton() {
        const button = document.createElement("button")
        button.textContent = "Randomize Player Ships"
        button.addEventListener("click", () => {
            populateBoard(humanPlayer.getGameBoard)
        })
        document.body.appendChild(button)
    }

    return { startGame, handleCellClick }
}

export default GameController
