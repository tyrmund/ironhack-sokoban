class Player {

    constructor(top, left, board) {
        this.top = top
        this.left = left
        this.board = board
        this.type = 'player'
        this.image = 'url(./Images/player.png)'
    }

    switchCells() {

    }

    move(direction) {

        if (this.isNextCellABox(direction) === false) {
            this.changePosition(direction)
        } else {
            switch (direction) {
                case 'up': {
                    const nextBox = this.board.grid[this.top - 1][this.left]
                    if (!nextBox.isNextCellBlocked(direction)) {
                        nextBox.move(direction)
                        this.changePosition(direction)
                    }
                    break
                }
                case 'down': {
                    const nextBox = this.board.grid[this.top + 1][this.left]
                    if (!nextBox.isNextCellBlocked(direction)) {
                        nextBox.move(direction)
                        this.changePosition(direction)
                    }
                    break
                }
                case 'left': {
                    const nextBox = this.board.grid[this.top][this.left - 1]
                    if (!nextBox.isNextCellBlocked(direction)) {
                        nextBox.move(direction)
                        this.changePosition(direction)
                    }
                    break
                }
                case 'right': {
                    const nextBox = this.board.grid[this.top][this.left + 1]
                    if (!nextBox.isNextCellBlocked(direction)) {
                        nextBox.move(direction)
                        this.changePosition(direction)
                        this.checkGoal(nextBox)
                    }
                    break
                }

            }
        }

    }

    checkGoal(currentBox) {

        const currentBoxTop = currentBox.top
        const currentBoxLeft = currentBox.left

        this.board.goals.forEach(([top, left]) => {

            if (currentBoxTop == top && currentBoxLeft == left) {
                const cellGoal = document.querySelector(`.top${top}-left${left}`)
                cellGoal.style.backgroundColor = 'orange'
                cellGoal.style.border = `5px solid black`
            }
        })
    }

    changePosition(direction) {

        const start = this

        if (!this.isOutside(direction) && !this.isNextCellBlocked(direction)) {
            switch (direction) {
                case 'up': {
                    const targetObject = this.board.grid[start.top - 1][start.left]
                    this.board.grid[start.top][start.left] = targetObject
                    this.board.grid[start.top - 1][start.left] = start
                    this.board.steps++
                    targetObject.top++
                    start.top--
                    break
                }
                case 'down': {
                    const targetObject = this.board.grid[start.top + 1][start.left]
                    this.board.grid[start.top][start.left] = targetObject
                    this.board.grid[start.top + 1][start.left] = start
                    this.board.steps++
                    targetObject.top--
                    start.top++
                    break
                }
                case 'right': {
                    const targetObject = this.board.grid[start.top][start.left + 1]
                    this.board.grid[start.top][start.left] = targetObject
                    this.board.grid[start.top][start.left + 1] = start
                    this.board.steps++
                    targetObject.left--
                    start.left++
                    break
                }
                case 'left': {
                    const targetObject = this.board.grid[start.top][start.left - 1]
                    this.board.grid[start.top][start.left] = targetObject
                    this.board.grid[start.top][start.left - 1] = start
                    this.board.steps++
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
                const nextObject = this.board.grid[this.top - 1][this.left]
                if (nextObject.type === 'wall')
                    return true
                break
            }
            case 'down': {
                const nextObject = this.board.grid[this.top + 1][this.left]
                if (nextObject.type === 'wall')
                    return true
                break
            }
            case 'left': {
                const nextObject = this.board.grid[this.top][this.left - 1]
                if (nextObject.type === 'wall')
                    return true
                break
            }
            case 'right': {
                const nextObject = this.board.grid[this.top][this.left + 1]
                if (nextObject.type === 'wall')
                    return true
                break
            }

        }
        return false
    }

    isNextCellABox(direction) {
        switch (direction) {
            case 'up': {
                if (this.top - 1 < 0 || !this.board.grid[this.top - 1][this.left])
                    return false
                const nextObject = this.board.grid[this.top - 1][this.left]
                if (nextObject.type === 'box')
                    return true
                break
            }
            case 'down': {
                if (this.top + 1 >= this.board.sizeX || !this.board.grid[this.top + 1][this.left])
                    return false
                const nextObject = this.board.grid[this.top + 1][this.left]
                if (nextObject.type === 'box')
                    return true
                break
            }
            case 'left': {
                if (this.left - 1 < 0 || !this.board.grid[this.top][this.left - 1])
                    return false
                const nextObject = this.board.grid[this.top][this.left - 1]
                if (nextObject.type === 'box')
                    return true
                break
            }
            case 'right': {
                if (this.left + 1 >= this.board.sizeX || !this.board.grid[this.top][this.left + 1])
                    return false
                const nextObject = this.board.grid[this.top][this.left + 1]
                if (nextObject.type === 'box')
                    return true
                break
            }

        }
        return false
    }


}