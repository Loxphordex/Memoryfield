import { generateRandomSequence, createDefaultNode } from './data'

export function getSequence(currentLevel) {
  return currentLevel ? generateRandomSequence(currentLevel, 1) : null
} 

export function defaultNode(order) {
  return createDefaultNode(order)
}