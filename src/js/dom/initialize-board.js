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

export default initializeBoard