import { notes } from './notes'
import { waveforms } from '../components/Audio/constants'

// All possible shapes
const shapes = [
  'square',
  'circle'
]

// All possible colors
const colors = [
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
    shape: randomShape(),
    color: randomColor(),
    filterFrequency: 800,
    endtime: 0.1,
    playOrder: order,
    active: checkIfActive(order, nodeSequenceLength),
    note: notes[22],
    wave: waveforms.sine
  }
}

function checkIfActive(order, nodeSequenceLength) {
  return order > nodeSequenceLength ? false : true
}

// Creates random nodes
export function generateRandomSequence(nodeCount) {
  const nodes = []

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      shape: randomShape(),
      color: randomColor(),
      filterFrequency: randomFilterFrequency(),
      endtime: 0.1,
      playOrder: i,
      note: randomNote(),
      wave: waveforms.sine
    })
  }
  return nodes
}

function randomShape() {
  return shapes[Math.floor(Math.random() * shapes.length)]
}

function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}

function randomFilterFrequency() {
  return Math.floor(Math.random() * 1000)
}

function randomNote() {
  return notes[Math.floor(Math.random() * notes.length)]
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
    shape: shapes[0],
    color: randomColor(),
    filterFrequency: 1200,
    endtime: 0.1,
    playOrder: order,
    active: checkIfActive(order, nodeSequenceLength),
    note: notes[36],
    wave: waveforms.sine
  }
}