import { levelData } from './data'

// current level info
// level number
export default function nextClosure() {
    let currentLevel = 0
    function next() {
        currentLevel++
    }
    return next
}

// export const levelUp = nextClosure()

// return all data for current level
// get info for each memory node
// shape, playOrder, position, color, texture, sound
export function getLevelDetails(currentLevel) {
    return currentLevel ? levelData[currentLevel].nodes : null
}

getLevelDetails(1)