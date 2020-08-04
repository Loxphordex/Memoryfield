export function handleKeydownEvents(event, play, isPlaying, randomize) {
  event.stopPropagation()
  event.preventDefault()
  console.log(isPlaying)

  // spacebar
  if (event.keyCode === 32) {
    play(!isPlaying)
  }

  // r key
  else if (event.keyCode === 82) {
    randomize()
  }
}