export default function playSound(ctx, filter, osc, volume, nodes, activeNode, kickAudio) {
  if (ctx) {
    let now = ctx.currentTime
    let currentNode = nodes[activeNode]
    let freq = currentNode.note.frequency
    let wave = currentNode.wave
    let end = now + currentNode.endtime

    // filter setup
    filter.frequency.setValueAtTime(currentNode.filterFrequency, now)
    filter.Q.value = currentNode.filterQ

    if (currentNode?.sample?.audio) {
      const aud = new Audio(currentNode.sample.audio)
      const src = ctx.createMediaElementSource(aud)
      src.connect(ctx.destination)
      aud.play()
    }
    else console.log(currentNode)


    // const k = new Audio(kick)
    // const kickSource = ctx.createMediaElementSource(k)
    // kickSource.connect(ctx.destination)
    // k.play()

    // osc.type = wave
    // osc.start()
    // osc.frequency.value = freq
    // osc.connect(volume)
    // osc.stop(end)

    // play sample
    // const kickAudio = new Audio(kick)
    // const source = ctx.createMediaElementSource(kickAudio)
    // source.connect(volume)
    // kickAudio.play()


    // envelope
    volume.gain.cancelScheduledValues(now)
    volume.gain.setValueAtTime(0.001, now)
    volume.gain.linearRampToValueAtTime(0.1, now + 0.0008)
    volume.gain.linearRampToValueAtTime(0, now + 0.1)

    // Connect nodes
    // volume.gain.value = outputLevel
  } else {
    alert("Your browser doesn't support JavaScript Web Audio API")
  }
}
