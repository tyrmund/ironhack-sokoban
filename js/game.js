const Game = {

    titleScreen: document.querySelector('#title-screen'),
    preGameScreen: document.querySelector('#pre-game-screen'),
    gameScreen: document.querySelector('#game-screen'),
    nextLevelScreen: document.querySelector('#next-level-screen'),
    endScreen: document.querySelector('#end-screen'),
    currentLevel: 0,

    gameSize: {
        w: window.innerWidth,
        h: window.innerHeight
    },

    gameLevels: [
        '0 0 0 0 0,0 0 0 0 0,9 0 7 1 0,0 0 0 0 0,0 0 0 0 0',
        '0 0 0 0 0,0 8 0 0 0,9 7 7 1 0,0 1 0 0 0,0 0 0 0 0',
        '0 0 0 0 0,0 7 8 0 8,0 9 0 1 1,0 7 8 0 8,0 0 0 0 0',
        '0 0 8 0 0,1 0 7 7 0,1 8 7 0 0,1 8 0 7 0,1 8 0 0 9',
        '0 8 8 8 0,0 1 7 0 0,9 7 1 0 0,0 0 1 7 0,0 8 8 8 0',
        '1 0 9 0 1,0 7 0 7 0,0 8 8 8 0,0 7 0 7 0,1 0 0 0 1',
        '8 1 0 1 0,0 7 1 7 0,1 7 1 0 0,0 7 7 7 8,1 1 0 7 9'
    ],

    board: undefined,

    keys: {

        UP: 'ArrowUp',
        DOWN: 'ArrowDown',
        LEFT: 'ArrowLeft',
        RIGHT: 'ArrowRight'

    },

    init() {
        this.setGameSize()
        this.setEventListeners()
        this.endScreen.style.display = 'none'
        this.gameScreen.style.display = 'none'
        this.preGameScreen.style.display = 'none'
        this.titleScreen.style.display = 'block'
        this.nextLevelScreen.style.display = 'none'
    },

    setGameSize() {
        this.gameScreen.style.width = `${this.gameSize.w}px`
        this.gameScreen.style.height = `${this.gameSize.h}px`
        this.gameScreen.style.backgroundSize = 'cover'

        this.titleScreen.style.width = `${this.gameSize.w}px`
        this.titleScreen.style.height = `${this.gameSize.h}px`
        const titleImage = this.createImage('.title-image', 400, 300,
            (this.gameSize.h / 2) - 200, (this.gameSize.w / 2) - 150)

        this.preGameScreen.style.width = `${this.gameSize.w}px`
        this.preGameScreen.style.height = `${this.gameSize.h}px`
        const preGameImage = this.createImage('.level-image', 75, 600,
            (this.gameSize.h / 2) - 175, (this.gameSize.w / 2) - 300)
        const nextLevelText = document.querySelector('.level-info')
        //nextLevelText.innerText = `Level ${this.currentLevel + 1}`
        nextLevelText.style.textAlign = 'center'
        nextLevelText.style.fontFamily = "LLPIXEL3, sans-serif"
        nextLevelText.style.fontSize = '45px'
        nextLevelText.style.padding = '300px'
        nextLevelText.height = '100px'
        nextLevelText.width = '500px'
        nextLevelText.top = `${(this.gameSize.h / 2) - 175}`
        nextLevelText.left = `${(this.gameSize.w / 2) - 300}`

        this.endScreen.style.width = `${this.gameSize.w}px`
        this.endScreen.style.height = `${this.gameSize.h}px`
        const endGameImage = this.createImage('.end-image', 500, 400,
            (this.gameSize.h / 2) - 300, (this.gameSize.w / 2) - 200)

        const startButton = this.createButton('.start-button', 80,
            (this.gameSize.h / 2) - 40 + 260, (this.gameSize.w / 2) - 42, 'Start!',
            `5px 5px 10px 2px rgba(0, 0, 0, .8)`)

        const resetButton = this.createButton('.reset-button', 80,
            (this.gameSize.h / 2) - 40 - 217, (this.gameSize.w / 2) - 40, 'Reset',
            '2px 2px 5px 1px rgba(0, 0, 0, .6)')

        const reloadButton = this.createButton('.reload-button', 120,
            (this.gameSize.h / 2) - 40 + 280, (this.gameSize.w / 2) - 62, 'Restart',
            `5px 5px 10px 2px rgba(0, 0, 0, .8)`)

    },

    createImage(element, height, width, top, left) {

        const image = document.querySelector(element)
        image.style.position = 'absolute'
        image.style.height = `${height}px`
        image.style.width = `${width}px`
        image.style.top = `${top}px`
        image.style.left = `${left}px`

    },

    createButton(element, width, top, left, text, shadow) {

        const button = document.querySelector(`${element}`)
        button.style.position = "absolute"
        button.style.width = `${width}px`
        button.style.height = `40px`
        button.style.top = `${top}px`
        button.style.left = `${left}px`
        button.style.backgroundColor = 'white'
        button.style.borderRadius = '7px'
        button.style.border = `4px solid black`
        button.style.textAlign = 'center'
        button.style.lineHeight = '35px'
        button.style.fontSize = '14px'
        button.style.fontFamily = "LLPIXEL3, sans-serif"
        button.style.boxShadow = `${shadow}`
        button.innerText = `${text}`

        return button

    },

    setEventListeners() {

        document.addEventListener('keydown', e => {

            switch (e.key) {
                case this.keys.UP:
                    this.board.player.move('up')
                    break;
                case this.keys.DOWN:
                    this.board.player.move('down')
                    break;
                case this.keys.LEFT:
                    this.board.player.move('left')
                    break;
                case this.keys.RIGHT:
                    this.board.player.move('right')
                    break;
            }
        })

        document.querySelector('.start-button').addEventListener('click', e => {
            this.titleScreen.style.display = 'none'
            this.gameScreen.style.display = 'block'
            this.start()
        })

        document.querySelector('.start-button').addEventListener('mouseover', e => {
            document.querySelector('.start-button').style.backgroundColor = 'lightgray'
        })

        document.querySelector('.start-button').addEventListener('mouseout', e => {
            document.querySelector('.start-button').style.backgroundColor = 'white'
        })

        document.querySelector('.reset-button').addEventListener('click', e => {
            delete this.board
            this.board = new Board(this.gameScreen, this.gameSize, 5, 5)
            this.board.grid = this.board.createBoard(this.gameLevels[this.currentLevel])
            this.board.updateBoard()
        })

        document.querySelector('.reset-button').addEventListener('mouseover', e => {
            document.querySelector('.reset-button').style.backgroundColor = 'lightgray'
        })

        document.querySelector('.reset-button').addEventListener('mouseout', e => {
            document.querySelector('.reset-button').style.backgroundColor = 'white'
        })

        document.querySelector('.reload-button').addEventListener('click', e => {
            location.reload()
        })

        document.querySelector('.reload-button').addEventListener('mouseover', e => {
            document.querySelector('.reload-button').style.backgroundColor = 'lightgray'
        })

        document.querySelector('.reload-button').addEventListener('mouseout', e => {
            document.querySelector('.reload-button').style.backgroundColor = 'white'
        })

    },

    start() {
        this.createElements()
    },

    createElements() {
        this.startGameLoop()
    },

    startGameLoop() {

        this.playNextLevel(this.currentLevel)

    },

    playNextLevel(currentLevel) {

        document.querySelector('.level-info').innerText = `Level ${this.currentLevel + 1}`
        if (this.currentLevel < this.gameLevels.length) {
            this.preGameScreen.style.display = 'block'
            setTimeout(() => this.preGameScreen.style.display = 'none', 2000)
        }

        if (currentLevel < this.gameLevels.length) {

            switch (this.currentLevel) {
                case 0:
                    this.gameScreen.style.backgroundImage = 'url(./images/BG1.jpg)'
                    break
                case 1:
                    this.gameScreen.style.backgroundImage = 'url(./images/BG2.jpg)'
                    break
                case 2:
                    this.gameScreen.style.backgroundImage = 'url(./images/BG3.jpg)'
                    break
                case 3:
                    this.gameScreen.style.backgroundImage = 'url(./images/BG4.jpg)'
                    break
                case 4:
                    this.gameScreen.style.backgroundImage = 'url(./images/BG5.jpg)'
                    break
                case 5:
                    this.gameScreen.style.backgroundImage = 'url(./images/BG6.jpg)'
                    break
                case 6:
                    this.gameScreen.style.backgroundImage = 'url(./images/BG7.jpg)'
                    break
            }

            this.board = new Board(this.gameScreen, this.gameSize, 5, 5)
            this.board.grid = this.board.createBoard(this.gameLevels[currentLevel])
            this.board.updateBoard()

            const intervalId = setInterval(() => {

                if (!this.board.isOver(this.board.boxes, this.board.goals)) {
                    this.board.updateBoard()
                } else {
                    delete this.board
                    this.currentLevel++
                    clearInterval(intervalId)
                    setTimeout(() => this.playNextLevel(currentLevel + 1), 1000)
                }

            }, 100)

        } else {
            this.gameScreen.style.display = 'none'
            this.endScreen.style.display = 'block'
        }

    }

}
