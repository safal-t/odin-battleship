function initializeBoard(board, player) {
    const playerBoard = document.querySelector(`.${player}-gameboard`)
    board.forEach(row => {
        row.forEach(cell => {
            const square = document.createElement("div")
            square.classList.add('cell')
            playerBoard.appendChild(square)

        })
    });
}

function updateCell(cell, typeOfUpdate) {
    const square = document.querySelector(`[data-coordinates="${cell.x}, ${cell.y}"]`)
    square.classList.add(`${typeOfUpdate}`)
}

export { initializeBoard, updateCell }