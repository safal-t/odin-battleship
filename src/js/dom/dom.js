function initializeBoard(board, player) {
    const currentBoard = document.querySelector(`.${player.type}-game-board`)
    console.log(board)
    board.forEach(row => {
        row.forEach(cell => {
            const square = document.createElement("div")
            square.classList.add('cell')
            currentBoard.appendChild(square)
        })
    });
}

function updateCell(cell, typeOfUpdate) {
    const square = document.querySelector(`[data-coordinates="${cell.x}, ${cell.y}"]`)
    square.classList.add(`${typeOfUpdate}`)
}

export { initializeBoard, updateCell }