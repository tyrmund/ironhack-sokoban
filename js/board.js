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
        this.walls = []
        this.boxes = []
        this.holes = []
        this.goals = []

        this.init()
    }

    init() {
        this.boardElement = document.createElement('div')

    }

    updateBoard() {

        const oldContainer = document.querySelector('.cell-container')
        if (oldContainer !== null) oldContainer.remove()

        const cellContainer = document.createElement('div')
        cellContainer.setAttribute('class', 'cell-container')

        for (let i = 0; i < this.sizeX; i++) {

            for (let j = 0; j < this.sizeY; j++) {

                cellContainer.appendChild(this.printCell(i, j, this.grid[i][j].image))

            }
        }

        this.gameScreen.appendChild(cellContainer)
    }

    printCell(j, i, image) {

        const cell = document.createElement('div')
        cell.setAttribute('class', `top${j}-left${i}`)
        cell.style.position = "absolute"
        cell.style.width = `80px`
        cell.style.height = `80px`
        cell.style.left = `${((this.gameSize.w / 2) - 200) + (80 * i)}px`
        cell.style.top = `${((this.gameSize.h / 2) - 200) + (80 * j)}px`
        if (image === 'url(./Images/player.png)') {
            cell.style.backgroundImage = image
            cell.style.backgroundSize = 'cover'
            cell.style.border = `5px solid black`
        } else if (this.goals.some(goal => goal[0] === j && goal[1] === i)) {
            cell.style.backgroundColor = 'gray'
            cell.style.border = `5px solid black`
        } else {
            cell.style.backgroundColor = image
            cell.style.border = `5px solid black`
        }

        //this.gameScreen.appendChild(cell)
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
                        array.push(new Box(i, j, this))
                        this.boxes.push([i, j])
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

    compareArrays(arr1, arr2) {
        if (arr1.length !== arr2.length) return false
        else {
            for (let i = 0; i < arr1.length; i++) {
                if (arr1[i] !== arr2[i]) return false
            }
            return true
        }
    }

    isEnded(boxes, goalArray) {
        let allIn = true
        boxes.forEach(box => {
            const found = goalArray.some(goal => compareArrays([box.top, box.left], goal))
            allIn = allIn && found
        })
        return allIn
    }

}