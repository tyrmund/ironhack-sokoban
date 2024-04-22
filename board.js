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

        for (let i = 0; i < this.sizeX; i++) {
            for (let j = 0; j < this.sizeY; j++) {

                this.printCell(i, j, this.grid[i][j].image)

            }
        }
    }

    printCell(j, i, image) {

        const test = document.createElement('div')
        test.style.position = "absolute"
        test.style.width = `80px`
        test.style.height = `80px`
        test.style.left = `${((this.gameSize.w / 2) - 200) + (80 * i)}px`
        test.style.top = `${((this.gameSize.h / 2) - 200) + (80 * j)}px`
        if (image === 'url(./Images/player.png)') {
            test.style.backgroundImage = image
            test.style.backgroundSize = 'cover'
            test.style.border = `5px solid black`
        }
        test.style.backgroundColor = image
        test.style.border = `5px solid black`

        this.gameScreen.appendChild(test)

    }

    createBoard(string) {
        const rows = string.split(',')
        const board = []
        for (let i = 0; i < this.sizeX; i++) {
            const row = rows[i].split(' ')
            const array = []
            for (let j = 0; j < this.sizeY; j++) {
                switch (row[j]) {
                    case '0':
                        array.push(new Empty(i, j))
                        break
                    case '7':
                        array.push(new Box(i, j))
                        break
                    case '8':
                        array.push(new Wall(i, j))
                        break
                    case '9':
                        this.player = new Player(i, j)
                        array.push(this.player)
                        break
                }
            }
            board.push(array)
        }
        return board
    }

    fillMatrix(string) {

        map = []
        const rows = string.split(',')
        for (let i = 0; i < rows.length; i++) {

            const mapRow = []
            const row = rows[i].split(' ')
            for (let j = 0; j < row.length; j++) {

                switch (row[j]) {
                    case '0': {
                        const space = new Space()
                        mapRow.push(space)
                        break
                    }
                    case '8': {
                        const wall = new Wall()
                        mapRow.push(wall)
                        break
                    }
                    case '9': {
                        const player = new Player()
                        this.player = player
                        mapRow.push(player)
                        break
                    }
                }

            }
            map.push(mapRow)
        }

        return map
    }

    isEnded() {
        if (this.boxes.length === 0) return true
        else {
            return this.boxes.reduce((acc, box) => {
                acc && box.isOnGoal
            }, true)
        }
    }

    isOnGoal() {

    }

}