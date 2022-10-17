import { generateInitialSequence, createDefaultNode } from './data'

export function getInitialSequence(nodeCount, nodeSequenceLength) {
  return nodeCount ? generateInitialSequence(nodeCount, nodeSequenceLength) : null
}

export function defaultNode(order) {
  return createDefaultNode(order)
}