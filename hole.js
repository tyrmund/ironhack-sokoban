class Hole {
    constructor(position) {
        super(position)
        this.isFull = false
        this.isPassable = false
    }

    isBoxAbove(board) {

        const boxInSamePosition = board.boxes.reduce((acc, eachBox) => {
            return acc || (eachBox.position === this.position)
        }, false)

        if (boxInSamePosition) {
            this.isFull = true
            this.isPassable = true
        }

        return true

    }
}