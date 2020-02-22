import { generateRandomLevel } from './data'

export function getLevel(currentLevel) {
    return currentLevel ? generateRandomLevel(currentLevel, 1) : null
} 