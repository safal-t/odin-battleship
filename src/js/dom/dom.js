function initializeBoard(board, player) {

    const currentBoard = document.querySelector(`.${player.type}-game-board`)
    board.getBoard.forEach(row => {
        row.forEach(column => {
            const cell = document.createElement("div")
            cell.classList.add('cell')
            cell.setAttribute("data-coordinates", `${board.getPlayerType}: ${column.x}, ${column.y}`)
            currentBoard.appendChild(cell)
        })
    });
}

function updateCell(cell, typeOfUpdate, playerType) {
    const square = document.querySelector(`[data-coordinates="${playerType}: ${cell.x}, ${cell.y}"]`)
    square.classList.add(`${typeOfUpdate}`)
    console.log(square)
}

const domManager = {
    initializeBoard,
    updateCell
}

export default domManager