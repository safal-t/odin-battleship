import Player from './Player.js'

describe('Player', () => {

    it('sets the player type correctly', () => {
        const player = Player("human")
        expect(player.type).toBe("human")
    })


    it('has a Gameboard', () => {
        const player = Player("human")
        const board = player.getGameBoard
        expect(board).toBeDefined()
        expect(typeof board.placeShip).toBe("function")
        expect(typeof board.receiveAttack).toBe("function")
    })

})