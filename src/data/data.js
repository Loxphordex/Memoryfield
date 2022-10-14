import { notes } from './notes'
import { waveforms } from '../components/Audio/constants'
import { samples } from '../components/Audio/constants'

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

export function createDefaultNode(order, nodeSequenceLength) {
  return {
    color: getRandom(colors),
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

function getRandom(array) {
  if (array) {
    return array[Math.floor(Math.random() * array.length)]
  }
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
    color: getRandom(colors),
    filterFrequency: 1200,
    filterQ: 0,
    endtime: 0.1,
    playOrder: order,
    active: checkIfActive(order, nodeSequenceLength),
    note: notes[36],
    wave: waveforms[0],
    sample: samples[0]
  }
}