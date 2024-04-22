class Board {

    constructor(sizeX, sizeY) {
        this.sizeX = sizeX
        this.sizeY = sizeY
        this.player = null
        this.walls = []
        this.boxes = []
        this.holes = []
        this.goals = []
    }

    createBoard(string) {

        const board = []

        for (let i = 0; i < horizontal; i++) {
            const array = []
            for (let j = 0; j < vertical; j++) {
                array.push(0)
            }
            matrix.push(array)
        }

    }

    displayMatrix(map) {

        for (let i = 0; i < map.length; i++) {
            let row = ''
            for (let j = 0; j < map[0].length; j++) {
                if (j === map[0].length - 1) {
                    row = row + map[i][j].matrixNumber
                }
                else {
                    row = row + map[i][j].matrixNumber + ' '
                }
            }
        }
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