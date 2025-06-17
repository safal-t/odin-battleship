import './css/index.css'
import Gameboard from './js/logic/Gameboard/Gameboard.js'
import Player from './js/logic/Player/Player.js'
import Ship from './js/logic/Ship/Ship.js'
import initializeBoard from './js/dom/initialize-board.js'

const playerBoard = Gameboard()
const computerBoard = Gameboard()
initializeBoard(playerBoard.getBoard, "player")
initializeBoard(computerBoard.getBoard, "computer")