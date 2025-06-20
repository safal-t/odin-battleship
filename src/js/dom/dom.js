function initializeBoard(board, player) {
    const currentBoard = document.querySelector(`.${player.type}-game-board`)
    console.log(board)
    board.forEach(row => {
        row.forEach(_ => {
            const cell = document.createElement("div")
            cell.classList.add('cell')
            currentBoard.appendChild(cell)
        })
    });
}

function updateCell(cell, typeOfUpdate) {
    const square = document.querySelector(`[data-coordinates="${cell.x}, ${cell.y}"]`)
    square.classList.add(`${typeOfUpdate}`)
}

const domManager = {
    initializeBoard,
    updateCell
}

export default domManager