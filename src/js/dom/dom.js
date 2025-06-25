import GameController from "../logic/GameController"

function initializeBoard(board, player) {

    const currentBoard = document.querySelector(`.${player.type}-game-board`)
    board.getBoard.forEach(row => {
        row.forEach(column => {
            const cell = document.createElement("div")
            cell.classList.add('cell')
            cell.setAttribute("data-coordinates", `${column.x},${column.y}`)
            cell.setAttribute("data-player-type", board.getPlayerType)
            cell.addEventListener("click", event => {
                GameController.handleCellClick(cell)
            })
            currentBoard.appendChild(cell)
        })
    });
}

function updateCell(cell, typeOfUpdate, playerType) {
    const square = document.querySelector(
        `[data-coordinates="${cell.x},${cell.y}"][data-player-type="${playerType}"]`
    )
    square.classList.add(`${typeOfUpdate}`)
    console.log(square)
}

const domManager = {
    initializeBoard,
    updateCell
}

export default domManager