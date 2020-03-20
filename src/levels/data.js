import { notes } from './notes'
import { waveforms } from '../components/Audio/constants'
// all data for levels
// each node gets shape, playOrder, position, color, texture, and sound

// All possible shapes
const shapes = [
  'square',
  'circle'
]

// All possible colors
const colors = [
  'red',
  'purple',
  'green'
]

// Creates random nodes
export function generateRandomLevel(nodeCount) {
  let nodes = []
  // let order = getOrderNums(nodeCount)
  let order = 0;

  for (let i = 0; i < nodeCount; i++) {
    let shape = randomShape()
    let color = randomColor()
    let filterFrequency = randomFrequency()
    let endtime = 0.1
    let playOrder = order
    let note = notes[0]
    let wave = waveforms.sine
    order++

    // Each playOrder is a unique value
    // let playOrder = order.splice(Math.floor(Math.random() * order.length - 1), 1)

    // playOrder = playOrder[0]
    let node = { 
      shape, 
      color, 
      playOrder, 
      filterFrequency,
      endtime,
      note,
      wave }
    nodes.push(node)
  }
  return nodes
}

export function playSequenceNumbers(order, speed) {
  setInterval(() => {
    order.splice(Math.floor(Math.random() * order.length - 1), 1)
  }, speed)
}

function randomShape() {
  return shapes[Math.floor(Math.random() * shapes.length)]
}

function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}

function randomFrequency() {
  return Math.floor(Math.random() * 1000)
}

function getOrderNums(count) {
  let arr = []
  for (let i = 0; i < count; i++) {
    arr.push(i)
  }
  return arr
}