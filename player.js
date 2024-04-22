class Player {

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    playerMove(map, initialTop, initialLeft, direction) {

        if (identifyTarget(map, initialTop, initialLeft, direction) !== 7) {
            return changePosition(map, 9, initialTop, initialLeft, direction)
        } else {
            switch (direction) {
                case 'up': {
                    if (isBoxBlocked(map, initialTop - 1, initialLeft, direction)) return map
                    else {
                        map = changePosition(map, 7, initialTop - 1, initialLeft, direction)
                        map = changePosition(map, 9, initialTop, initialLeft, direction)
                        return map
                    }
                    break
                }
                case 'down': {
                    if (isBoxBlocked(map, initialTop + 1, initialLeft, direction)) return map
                    else {
                        map = changePosition(map, 7, initialTop + 1, initialLeft, direction)
                        map = changePosition(map, 9, initialTop, initialLeft, direction)
                        return map
                    }
                    break
                }
                case 'right': {
                    if (isBoxBlocked(map, initialTop, initialLeft + 1, direction)) return map
                    else {
                        map = changePosition(map, 7, initialTop, initialLeft + 1, direction)
                        map = changePosition(map, 9, initialTop, initialLeft, direction)
                        return map
                    }
                    break
                }
                case 'left': {
                    if (isBoxBlocked(map, initialTop, initialLeft - 1, direction)) return map
                    else {
                        map = changePosition(map, 7, initialTop, initialLeft - 1, direction)
                        map = changePosition(map, 9, initialTop, initialLeft, direction)
                        return map
                    }
                    break
                }
            }
        }
    }

    // cambia la posición de una caja o del jugador si la casilla objetivo no está obstruida
    changePosition(map, actor, initialTop, initialLeft, direction) {

        if (actor === 9) {
            if (isPlayerBlocked(map, initialTop, initialLeft, direction)) return map
        } else if (actor === 7) {
            if (isBoxBlocked(map, initialTop, initialLeft, direction)) return map
        }

        switch (direction) {
            case 'up': {
                map[initialTop][initialLeft] = 0
                map[initialTop - 1][initialLeft] = actor
                break
            }
            case 'down': {
                map[initialTop][initialLeft] = 0
                map[initialTop + 1][initialLeft] = actor
                break
            }
            case 'right': {
                map[initialTop][initialLeft] = 0
                map[initialTop][initialLeft + 1] = actor
                break
            }
            case 'left': {
                map[initialTop][initialLeft] = 0
                map[initialTop][initialLeft - 1] = actor
                break
            }
        }
        return map
    }

    // desde una posición inicial, indica el tipo de figura que hay en 
    // la casilla adyacente de la dirección indicada en los parámetros
    identifyTarget(map, initialTop, initialLeft, direction) {
        let target
        switch (direction) {
            case 'up': {
                if (map[initialTop - 1] === undefined) return target = undefined
                else target = map[initialTop - 1][initialLeft]
                break
            }
            case 'down': {
                if (map[initialTop + 1] === undefined) return target = undefined
                else target = map[initialTop + 1][initialLeft]
                break
            }
            case 'right': {
                if (map[initialTop] === undefined) return target = undefined
                else target = map[initialTop][initialLeft + 1]
                break
            }
            case 'left': {
                if (map[initialTop] === undefined) return target = undefined
                else target = map[initialTop][initialLeft - 1]
                break
            }
        }
        return target
    }

    isPlayerBlocked(map, initialTop, initialLeft, direction) {
        if (identifyTarget(map, initialTop, initialLeft, direction) === undefined) {
            return true
        }
        else if (identifyTarget(map, initialTop, initialLeft, direction) === 8) {
            return true
        }
        else return false
    }

    isBoxBlocked(map, initialTop, initialLeft, direction) {
        if (identifyTarget(map, initialTop, initialLeft, direction) === undefined) return true
        else if (identifyTarget(map, initialTop, initialLeft, direction) === 8) return true
        else if (identifyTarget(map, initialTop, initialLeft, direction) === 7) return true
        else return false
    }
}