
function updateCell(cell, typeOfUpdate) {
    const square = document.querySelector(`[data-coordinates="${cell.x}, ${cell.y}"]`)
    square.classList.add(`${typeOfUpdate}`)
}

export default updateCell