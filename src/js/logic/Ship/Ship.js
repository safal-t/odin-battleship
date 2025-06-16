function Ship(length) {
    let timesHit = 0;
    let sunk = false;

    function hit() {
        timesHit++
    }
    function isSunk() {
        return timesHit >= length
    }

    return {
        get getLength() {
            return length
        },
        get numberOfHits() {
            return timesHit
        },
        hit,
        isSunk
    }
}

export default Ship