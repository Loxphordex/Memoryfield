export default function playSound(ctx, filter, osc, volume, nodes, activeNode) {
  if (ctx) {
    let now = ctx.currentTime
    let currentNode = nodes[activeNode]
    let freq = currentNode.note.frequency
    let wave = currentNode.wave
    let end = now + currentNode.endtime

    // filter setup
    // filter.frequency.setValueAtTime(currentNode.filterFrequency, now)
    // filter.Q.value = currentNode.filterQ

    // if (currentNode?.sample?.audio) {
    //   let aud = new Audio(currentNode.sample.audio)
    //   const src = ctx.createMediaElementSource(aud)
    //   src.connect(filter)
    //   aud.play()

    //   setTimeout(() => {
    //     src.disconnect()
    //     aud = null
    //   }, 500)
    // }

    if (currentNode?.sample?.audio) {
      let aud = currentNode.sample.audio[currentNode.sample.index]
      // const src = ctx.createMediaElementSource(aud)
      // src.connect(filter)
      aud.play()
      currentNode.sample.index === 7
        ? currentNode.sample.index = 0
        : currentNode.sample.index++

      setTimeout(() => {
        // src.disconnect()
        aud = null
      }, 100)
    }

    // osc.type = wave
    // osc.start()
    // osc.frequency.value = freq
    // osc.connect(volume)
    // osc.stop(end)

    // envelope
    volume.gain.cancelScheduledValues(now)
    volume.gain.setValueAtTime(0.001, now)
    volume.gain.linearRampToValueAtTime(0.8, now + 0.0008)
    volume.gain.linearRampToValueAtTime(0, now + 0.1)

    // Connect nodes
    // volume.gain.value = outputLevel
  } else {
    alert("Your browser doesn't support JavaScript Web Audio API")
  }
}
