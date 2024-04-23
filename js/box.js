class Box {

    constructor(top, left, board) {
        this.top = top
        this.left = left
        this.board = board
        this.type = 'box'
        this.image = 'orange'
    }

    move(direction) {

        const start = this

        if (!this.isOutside(direction) && !this.isNextCellBlocked(direction)) {
            switch (direction) {
                case 'up': {
                    const targetObject = this.board.grid[start.top - 1][start.left]
                    this.board.grid[start.top][start.left] = targetObject
                    this.board.grid[start.top - 1][start.left] = start
                    targetObject.top++
                    start.top--
                    break
                }
                case 'down': {
                    const targetObject = this.board.grid[start.top + 1][start.left]
                    this.board.grid[start.top][start.left] = targetObject
                    this.board.grid[start.top + 1][start.left] = start
                    targetObject.top--
                    start.top++
                    break
                }
                case 'right': {
                    const targetObject = this.board.grid[start.top][start.left + 1]
                    this.board.grid[start.top][start.left] = targetObject
                    this.board.grid[start.top][start.left + 1] = start
                    targetObject.left--
                    start.left++
                    break
                }
                case 'left': {
                    const targetObject = this.board.grid[start.top][start.left - 1]
                    this.board.grid[start.top][start.left] = targetObject
                    this.board.grid[start.top][start.left - 1] = start
                    targetObject.left++
                    start.left--
                    break
                }
            }
        }

        this.board.updateBoard()

    }

    isOutside(direction) {
        switch (direction) {
            case 'up': {
                if (this.top === 0)
                    return true
                break
            }
            case 'down': {
                if (this.top === this.board.sizeX - 1)
                    return true
                break
            }
            case 'left': {
                if (this.left === 0)
                    return true
                break
            }
            case 'right': {
                if (this.left === this.board.sizeY - 1)
                    return true
                break
            }

        }
        return false
    }

    isNextCellBlocked(direction) {
        switch (direction) {
            case 'up': {
                if (this.top - 1 >= this.board.sizeX || !this.board.grid[this.top - 1][this.left])
                    return true
                const nextObject = this.board.grid[this.top - 1][this.left]
                if (nextObject.type === 'wall' || nextObject.type === 'box')
                    return true
                break
            }
            case 'down': {
                if (this.top + 1 >= this.board.sizeX || !this.board.grid[this.top + 1][this.left])
                    return true
                const nextObject = this.board.grid[this.top + 1][this.left]
                if (nextObject.type === 'wall' || nextObject.type === 'box')
                    return true
                break
            }
            case 'left': {
                if (this.left - 1 >= this.board.sizeX || !this.board.grid[this.top][this.left - 1])
                    return true
                const nextObject = this.board.grid[this.top][this.left - 1]
                if (nextObject.type === 'wall' || nextObject.type === 'box')
                    return true
                break
            }
            case 'right': {
                if (this.left + 1 >= this.board.sizeX || !this.board.grid[this.top][this.left + 1])
                    return true
                const nextObject = this.board.grid[this.top][this.left + 1]
                if (nextObject.type === 'wall' || nextObject.type === 'box')
                    return true
                break
            }

        }
        return false
    }

}