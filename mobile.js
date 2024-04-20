class Mobile {

    constructor(size, position) {
        this.size = size
        this.position = position
    }

    updatePosition() {

    }
}

// class Box extends Mobile {

//     constructor(size, position) {
//         super(size, position)
//         this.type = 'mobile'
//     }

//     move(direction) {
//         if (checkPushable(direction)) {
//             this.changePosition()
//             this.updatePosition()
//         }
//     }

//     checkPushable(direction) {

//     }
// }

class Player extends Mobile {

    constructor(size, position) {
        super(size, position)
    }

    // los valores iniciales son player.top y player.left (this.position)
    // 0 pasable, 8 pares, 9 player
    changePosition(map, initialTop, initialLeft, direction) {
        switch (direction) {
            case 'up': {
                if (map[initialTop - 1][initialLeft] !== undefined &&
                    map[initialTop - 1][initialLeft] !== 8) {
                    map[initialTop][initialLeft] = 0
                    map[initialTop - 1][initialLeft] = 9
                }
                break
            }
            case 'down': {
                if (map[initialTop + 1][initialLeft] !== undefined &&
                    map[initialTop + 1][initialLeft] !== 8) {
                    map[initialTop][initialLeft] = 0
                    map[initialTop + 1][initialLeft] = 9
                }
                break
            }
            case 'right': {
                if (map[initialTop][initialLeft + 1] !== undefined &&
                    map[initialTop][initialLeft + 1] !== 8) {
                    map[initialTop][initialLeft] = 0
                    map[initialTop][initialLeft + 1] = 9
                }
                break
            }
            case 'left': {
                if (map[initialTop][initialLeft - 1] !== undefined &&
                    map[initialTop][initialLeft - 1] !== 8) {
                    map[initialTop][initialLeft] = 0
                    map[initialTop][initialLeft - 1] = 9
                }
                break
            }
        }
        return map
    }

    move() {

    }

    // to do: checkWall y checkBorder
    checkMove() {

    }

}