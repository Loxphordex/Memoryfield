import { generateRandomSequence, createDefaultNode } from './data'

export function getSequence(currentLevel) {
  return currentLevel ? generateRandomSequence(currentLevel, 1) : null
} 

export function defaultNode(order) {
  console.log('defaultNode triggered ', order)
  // return order ? createDefaultNode(order) : null
  return createDefaultNode(order)
}