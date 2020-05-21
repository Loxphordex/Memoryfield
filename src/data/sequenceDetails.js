import { generateRandomSequence, generateInitialSequence, createDefaultNode } from './data'

export function getRandomSequence(nodeCount, nodeSequenceLength) {
  return nodeCount ? generateRandomSequence(nodeCount, nodeSequenceLength) : null
}

export function getInitialSequence(nodeCount, nodeSequenceLength) {
  return nodeCount ? generateInitialSequence(nodeCount, nodeSequenceLength) : null
}

export function defaultNode(order) {
  return createDefaultNode(order)
}