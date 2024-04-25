class Board {

    constructor(gameScreen, gameSize, sizeX, sizeY) {

        this.gameScreen = gameScreen
        this.gameSize = gameSize
        this.boardSize = {
            w: 400,
            h: 400
        }
        this.boardPos = {
            top: (this.gameSize.h / 2) - (this.boardSize.h / 2),
            left: (this.gameSize.w / 2) - (this.boardSize.w / 2)
        }

        this.sizeX = sizeX
        this.sizeY = sizeY
        this.grid = Array.from({ length: this.sizeY }, () => new Array(this.sizeX))
        this.player = null
        this.steps = 0
        this.boxes = []
        this.goals = []

        this.init()
    }

    init() {
        this.boardElement = document.createElement('div')
    }

    updateBoard() {

        const oldContainer = document.querySelector('.cell-container')
        const oldSteps = document.querySelector('.steps-container')
        if (oldContainer !== null) oldContainer.remove()
        if (oldSteps !== null) oldSteps.remove()

        const stepsContainer = document.createElement('div')
        stepsContainer.setAttribute('class', 'steps-container')
        stepsContainer.style.position = "absolute"
        stepsContainer.style.width = `80px`
        stepsContainer.style.height = `40px`
        stepsContainer.style.left = `${(this.gameSize.w / 2) - 42}px`
        stepsContainer.style.top = `${(this.gameSize.h / 2) - 40 + 260}px`
        stepsContainer.style.backgroundColor = 'white'
        stepsContainer.style.borderRadius = '7px'
        stepsContainer.style.border = `4px solid black`
        stepsContainer.style.textAlign = 'center'
        stepsContainer.style.lineHeight = '42px'
        stepsContainer.style.fontSize = '14px'
        stepsContainer.style.fontFamily = "LLPIXEL3, sans-serif"
        stepsContainer.style.boxShadow = '2px 2px 5px 1px rgba(0, 0, 0, .6)'
        stepsContainer.innerText = `Steps: ${this.steps}`

        const cellContainer = document.createElement('div')
        cellContainer.setAttribute('class', 'cell-container')

        for (let i = 0; i < this.sizeX; i++) {

            for (let j = 0; j < this.sizeY; j++) {

                cellContainer.appendChild(this.printCell(i, j, this.grid[i][j]))

            }
        }

        this.gameScreen.appendChild(cellContainer)
        this.gameScreen.appendChild(stepsContainer)

    }

    printCell(j, i, cellObject) {

        const cell = document.createElement('div')
        cell.setAttribute('class', `top${j}-left${i}`)
        cell.style.position = "absolute"
        cell.style.width = `80px`
        cell.style.height = `80px`
        cell.style.left = `${((this.gameSize.w / 2) - 200) + (80 * i)}px`
        cell.style.top = `${((this.gameSize.h / 2) - 200) + (80 * j)}px`
        cell.style.border = '3px solid #000000'
        cell.style.backgroundSize = 'cover'

        const isGoal = this.goals.some(goal => goal[0] === cellObject.top && goal[1] === cellObject.left)

        if (cellObject.type === 'empty' && isGoal) {
            cell.style.backgroundImage = 'url(./Images/GOAL.png)'
        } else {
            cell.style.backgroundImage = cellObject.image
        }

        return cell
    }

    createBoard(string) {
        const rows = string.split(',')
        const grid = []
        for (let i = 0; i < this.sizeX; i++) {
            const row = rows[i].split(' ')
            const array = []
            for (let j = 0; j < this.sizeY; j++) {
                switch (row[j]) {
                    case '0':
                        array.push(new Empty(i, j))
                        break
                    case '1':
                        array.push(new Empty(i, j))
                        this.goals.push([i, j])
                        break
                    case '7':
                        const newBox = new Box(i, j, this)
                        array.push(newBox)
                        this.boxes.push(newBox)
                        break
                    case '8':
                        array.push(new Wall(i, j))
                        break
                    case '9':
                        this.player = new Player(i, j, this)
                        array.push(this.player)
                        break
                }
            }
            grid.push(array)
        }
        return grid
    }

    areArraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false
        else {
            for (let i = 0; i < arr1.length; i++) {
                if (arr1[i] !== arr2[i]) return false
            }
            return true
        }
    }

    isOver(boxes, goalArray) {
        let allIn = true
        boxes.forEach(box => {
            const found = goalArray.some(goal => this.areArraysEqual([box.top, box.left], goal))
            allIn = allIn && found
        })
        return allIn
    }

}