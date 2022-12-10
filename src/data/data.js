import { notes } from './notes'
import { waveforms } from '../components/Audio/constants'

// All possible colors
export const colors = [
  'red',
  'purple',
  'green',
  'orange',
  'pink',
  'teal',
  'blue'
]

export const sampleColors = {
  playDefault: 'default',
  BounceKick: 'red',
  DeepKick: 'blue',
  Snare: 'green',
  DigitalClap: 'pink',
  ClosedHat: 'teal',
  OpenHat: 'purple'
}

export function createDefaultNode(order, nodeSequenceLength) {
  return {
    color: 'default',
    filterFrequency: 800,
    endtime: 0.1,
    playOrder: order,
    active: checkIfActive(order, nodeSequenceLength),
    note: notes[22],
    wave: waveforms[0]
  }
}

function checkIfActive(order, nodeSequenceLength) {
  return order > nodeSequenceLength - 1 ? false : true
}

// Generate initial sequence of nodes
export function generateInitialSequence(nodeCount, nodeSequenceLength) {
  let nodes = []
  for (let i = 0; i < nodeCount; i++) {
    nodes.push(initialNode(i, nodeSequenceLength))
  }
  return nodes
}

function initialNode(order, nodeSequenceLength) {
  return {
    playOrder: order,
    active: checkIfActive(order, nodeSequenceLength),
    samples: []
  }
}