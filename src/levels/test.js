let arr = [1, 2, 3, 4];
// arr.splice(Math.floor(Math.random() * arr.length - 1), 1);
function playSequenceNumbers(order, speed) {
  let interval = setInterval(() => {
    order.splice(Math.floor(Math.random() * order.length - 1), 1);
    console.log(order);
  }, speed);
}

function playSequence(order, speed, setActiveNode) {
  for (let i = 0; i < order.length; i++) {
    Promise.resolve(setTimeout(() => {setActiveNode(order[i])}, speed))
  }
}

// playSequenceNumbers(arr, 2000);
function setActiveNode(num) {
  console.log(num)
}
// play(0, 2000)
playSequence(arr, 2000, setActiveNode)