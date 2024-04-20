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