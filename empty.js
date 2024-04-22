class Empty {

    constructor(top, left) {
        this.top = top
        this.left = left
        this.type = 'empty'
        this.image = 'white'

        this.emptySize = {
            w: 80,
            h: 80
        }

        //this.init()
    }

    init() {

        this.emptyElement.createElement('div')

        this.emptyElement.style.position = "absolute"
        this.emptyElement.style.width = `80px`
        this.emptyElement.style.left = `${((this.gameSize.w / 2) - 200) + (80 * i)}px`
        this.emptyElement.style.height = `80px`
        this.emptyElement.style.top = `${((this.gameSize.h / 2) - 200) + (80 * j)}px`
        this.emptyElement.style.backgroundColor = 'white'
        this.emptyElement.style.border = `5px solid black`
    }
}