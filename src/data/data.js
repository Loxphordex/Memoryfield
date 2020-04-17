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

export function createDefaultNode(order) {
  return {
    shape: randomShape(),
    color: randomColor(),
    filterFrequency: 800,
    endtime: 0.1,
    playOrder: order,
    note: notes[0],
    wave: waveforms.sine
  }
}

// Creates random nodes
export function generateRandomSequence(nodeCount) {
  const nodes = []
  let order = 0;

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      shape: randomShape(),
      color: randomColor(),
      filterFrequency: randomFilterFrequency(),
      endtime: 0.1,
      playOrder: order,
      note: randomNote(),
      wave: waveforms.sine
    })
    order++
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