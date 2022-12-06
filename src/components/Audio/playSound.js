export default async function playSound(ctx, filter, osc, volume, nodes, activeNode) {
  if (ctx) {
    let now = ctx.currentTime
    let currentNode = nodes[activeNode]
    let freq = currentNode.note.frequency
    let wave = currentNode.wave
    let end = now + currentNode.endtime

    if (currentNode?.sample?.audio) {
      // let aud = currentNode.sample.audio[currentNode.sample.index]
      // let duration = aud.duration * 1000 
      // convert seconds to milliseconds

      // pitch shifting

      // const res = await fetch(kick)
      // const buf = await res.arrayBuffer()
      // const kickData = await ctx.decodeAudioData(buf)

      const source = ctx.createBufferSource()
      source.buffer = currentNode.sample.audio
      source.connect(filter)
      filter.connect(volume)
      volume.connect(ctx.destination)

      source.start(now)

      //aud.play()

      // cycle through an array of 8 audio files to avoid cutting off audio after each step
      // currentNode.sample.index === 7
      //   ? currentNode.sample.index = 0
      //   : currentNode.sample.index++

      // delete aud variable to clear memory
      // setTimeout(() => {
      //   aud = null
      // }, duration);
      

      // setTimeout(() => {
      //   aud = null
      // }, 100)
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
