export default async function playSound(ctx, filter, pitch, osc, volume, nodes, activeNode) {
  if (ctx) {
    let now = ctx.currentTime
    let currentNode = nodes[activeNode]
    // let freq = currentNode.note.frequency
    // let wave = currentNode.wave
    // let end = now + currentNode.endtime

    if (currentNode && currentNode.samples && currentNode.samples.length > 0) {
      for (let i = 0; i < currentNode.samples.length; i++) {
        const source = ctx.createBufferSource()
        source.buffer = currentNode.samples[i].audio
        source.playbackRate.value = pitch
        source.connect(filter)
        filter.connect(volume)
        volume.connect(ctx.destination)
        source.start(now)
      }
    }

    // osc.type = wave
    // osc.start()
    // osc.frequency.value = freq
    // osc.connect(volume)
    // osc.stop(end)

    // envelope
    // volume.gain.cancelScheduledValues(now)
    // volume.gain.setValueAtTime(0.001, now)
    // volume.gain.linearRampToValueAtTime(0.8, now + 0.0008)
    // volume.gain.linearRampToValueAtTime(0, now + 0.1)
    volume.gain.setValueAtTime(1, now)
  } else {
    alert("Your browser doesn't support JavaScript Web Audio API")
  }
}
