const Game = {

    gamseScreen: document.querySelector('#game-screen'),

    gameSize: {
        w: window.innerWidth,
        h: window.innerHeight
    },

    init() {
        this.setGameSize()
    },

    setGameSize() {
        this.gamseScreen.style.width = `${this.gameSize.w}px`
        this.gamseScreen.style.height = `${this.gameSize.h}px`
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