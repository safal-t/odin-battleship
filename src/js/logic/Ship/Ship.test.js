import Ship from './Ship.js'

describe('Ship', () => {
    let ship

    beforeEach(() => {
        ship = Ship(3)
    })

    it('has the correct length', () => {
        expect(ship.getLength).toBe(3)
    })

    it('has the correct number of hits', () => {
        ship.hit()
        expect(ship.numberOfHits).toBe(1)
    })

    it('returns that it is not sunk', () => {
        expect(ship.isSunk()).toBe(false)
    })

    it('knows when it is sunk', () => {
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    })
})