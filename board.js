class Board {

    constructor(left, top, height, width, matrixSize) {
        this.left = left
        this.top = top
        this.height = height
        this.width = width
        this.matrixSize = []
    }

    createMatrix(horizontal, vertical) {

        const matrix = []

        for (let i = 0; i < horizontal; i++) {
            const array = []
            for (let j = 0; j < vertical; j++) {
                array.push(0)
            }
            matrix.push(array)
        }

        return matrix

    }

}