let arr = [1, 2, 3, 4];
// arr.splice(Math.floor(Math.random() * arr.length - 1), 1);

function playSequenceNumbers(order, speed) {
    setInterval(() => {
      order.splice(Math.floor(Math.random() * order.length - 1), 1);
      console.log(order);
    }, speed);
}

playSequenceNumbers(arr, 2000);