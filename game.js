const Game = {

    gameScreen: document.querySelector('#game-screen'),

    gameSize: {
        w: window.innerWidth,
        h: window.innerHeight
    },

    gameLevels: {
        one: '0 0 0 0 0,0 8 0 0 0,9 7 7 0 0,0 0 0 0 0,0 0 0 0 0',
        two: '0 0 0 0 0,0 7 8 0 8,0 9 0 0 0,0 7 8 0 8,0 0 0 0 0',
        three: '0 0 0 0 0,0 8 9 8 0,0 7 7 7 0,0 8 0 8 0,0 0 0 0 0'
    },

    board: undefined,

    keys: {

        UP: 'ArrowUp',
        DOWN: 'ArrowDown',
        LEFT: 'ArrowLeft',
        RIGHT: 'ArrowRight'

    },

    init() {
        this.setGameSize()
        this.start()
    },

    setGameSize() {
        this.gameScreen.style.width = `${this.gameSize.w}px`
        this.gameScreen.style.height = `${this.gameSize.h}px`
        this.gameScreen.style.backgroundImage = 'url(./images/grass-background.jpg)'
        this.gameScreen.style.backgroundSize = 'cover'
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

    },

    start() {
        this.createElements()
        this.setEventListeners()
        //this.startGameLoop()
    },

    createElements() {
        this.board = new Board(this.gameScreen, this.gameSize, 5, 5)
        this.board.grid = this.board.createBoard(this.gameLevels.one)
        console.log(this.board.grid)
        this.board.updateBoard()
    }

}

// const gameScreen = document.querySelector('#game-screen')

// const screenWidth = 400
// const screenHeight = 400

// gameScreen.style.width = `${screenWidth}px`
// gameScreen.style.height = `${screenHeight}px`
// gameScreen.style.top = `${(window.innerHeight / 2) - (screenHeight / 2)}px`
// gameScreen.style.left = `${(window.innerWidth / 2) - (screenWidth / 2)}px`

// gameScreen.style.background = 'green'
// gameScreen.style.border = `1px solid black`