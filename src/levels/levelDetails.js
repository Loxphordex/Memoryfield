import { levelData, generateRandomLevel } from './data'

// return all data for current level
// get info for each memory node
// shape, playOrder, position, color, texture, sound
// export function getLevelDetails(currentLevel) {
//     return currentLevel ? levelData[currentLevel].nodes : null
// }

export function getLevel(currentLevel) {
    return currentLevel ? generateRandomLevel(currentLevel, 1) : null
} 