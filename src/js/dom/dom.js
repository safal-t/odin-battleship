import GameController from "../logic/GameController.js"

function initializeBoard(board, player, handleClick) {
    const currentBoard = document.querySelector(`.${player.type}-game-board`);
    board.getBoard.forEach(row => {
        row.forEach(column => {
            const cell = document.createElement("div");
            cell.classList.add('cell');
            cell.setAttribute("data-coordinates", `${column.x},${column.y}`);
            cell.setAttribute("data-player-type", board.getPlayerType);
            cell.addEventListener("click", () => handleClick(cell)); // 👈 this is the key
            currentBoard.appendChild(cell);
        })
    })
}


function updateCell(cell, typeOfUpdate, playerType) {
    const square = document.querySelector(
        `[data-coordinates="${cell.x},${cell.y}"][data-player-type="${playerType}"]`
    )
    square.classList.add(`${typeOfUpdate}`)
}

const domManager = {
    initializeBoard,
    updateCell
}

export default domManager