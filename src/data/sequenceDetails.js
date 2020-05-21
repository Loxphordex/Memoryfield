import { generateRandomSequence, generateInitialSequence, createDefaultNode } from './data'

export function getRandomSequence(nodeCount) {
  return nodeCount ? generateRandomSequence(nodeCount) : null
}

export function getInitialSequence(nodeCount) {
  return nodeCount ? generateInitialSequence(nodeCount) : null
}

export function defaultNode(order) {
  return createDefaultNode(order)
}