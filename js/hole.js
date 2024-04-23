class Hole {
    constructor(top, left) {
        this.top = top
        this.left = left
        this.type = 'hole'
        this.image = '#2F2E2C'
        this.isFull = false
        this.isPassable = false

        this.holeSize = {
            w: 80,
            h: 80
        }



        //this.init()
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