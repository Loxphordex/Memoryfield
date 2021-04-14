export default function playSound(ctx, filter, osc, volume, nodes, activeNode) {
  if (ctx) {
    let now = ctx.currentTime;
    let currentNode = nodes[activeNode];
    let freq = currentNode.note.frequency;
    let wave = currentNode.wave;
    let end = now + currentNode.endtime;

    // filter setup
    filter.frequency.setValueAtTime(currentNode.filterFrequency, now);
    filter.Q.value = currentNode.filterQ;

    osc.type = wave;
    osc.start();
    osc.frequency.value = freq;
    osc.connect(volume);
    osc.stop(end);

    // envelope
    volume.gain.cancelScheduledValues(now);
    volume.gain.setValueAtTime(0.001, now);
    volume.gain.linearRampToValueAtTime(0.1, now + 0.0008);
    volume.gain.linearRampToValueAtTime(0, now + 0.1);

    // Connect nodes
    // volume.gain.value = outputLevel;
    volume.connect(filter);
    filter.connect(ctx.destination);
  } else {
    alert("Sorry, your browser doesn't support JavaScript Web Audio API");
  }
}
