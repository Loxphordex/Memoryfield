// all data for levels
// each node gets shape, playOrder, position, color, texture, and sound

// dummy data
export const levelData = {
  // level 1
  1: {
    nodes: [
      {
        shape: "square",
        playOrder: 2,
        position: null,
        color: "green",
        texture: null,
        sound: null
      },
      {
        shape: "circle",
        playOrder: 1,
        position: null,
        color: "purple",
        texture: null,
        sound: null
      },
      {
        shape: "square",
        playOrder: 3,
        position: null,
        color: "red",
        texture: null,
        sound: null
      }
    ]
  },
  2: {
    nodes: [
      {
        shape: "square",
        playOrder: 2,
        position: null,
        color: "green",
        texture: null,
        sound: null
      },
      {
        shape: "circle",
        playOrder: 1,
        position: null,
        color: "purple",
        texture: null,
        sound: null
      },
      {
        shape: "square",
        playOrder: 3,
        position: null,
        color: "red",
        texture: null,
        sound: null
      },
      {
        shape: "circle",
        playOrder: 4,
        position: null,
        color: "red",
        texture: null,
        sound: null
      }
    ]
  }
};

const shapes = [
  'square',
  'circle'
]

const colors = [
  'red',
  'purple',
  'green'
]

export function generateRandomLevel(nodeCount) {
  let nodes = []
  let order = getOrderNums(nodeCount)

  for (let i = 0; i < nodeCount; i++) {
    let shape = randomShape()
    let color = randomColor()
    let playOrder = order.splice(Math.floor(Math.random() * order.length - 1), 1)

    playOrder = playOrder[0]
    let node = { shape, color, playOrder }
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

function getOrderNums(count) {
  let arr = []
  for (let i = 0; i < count; i++) {
    arr.push(i)
  }
  return arr
}