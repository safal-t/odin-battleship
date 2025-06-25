// dom.js
import GameController from "../logic/GameController.js"

function initializeBoard(board, player, handleClick) {
    const boardContainer = document.querySelector(`.${player.type}-game-board`);
    board.getBoard.forEach(row => {
        row.forEach(cellData => {
            const cell = document.createElement("div");
            cell.classList.add('cell');
            cell.setAttribute("data-coordinates", `${cellData.x},${cellData.y}`);
            cell.setAttribute("data-player-type", board.getPlayerType);
            cell.addEventListener("click", () => handleClick(cell));
            boardContainer.appendChild(cell);
        })
    })
}

function updateCell(cell, typeOfUpdate, playerType) {
    const cellElement = getCellElement(cell.x, cell.y, playerType);
    if (cellElement) {
        cellElement.classList.add(typeOfUpdate);
    }
}

function getCellElement(x, y, playerType) {
    return document.querySelector(
        `[data-coordinates="${x},${y}"][data-player-type="${playerType}"]`
    );
}

const domManager = {
    initializeBoard,
    updateCell,
    getCellElement
}

export default domManager