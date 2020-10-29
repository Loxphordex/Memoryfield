import playSound from './playSound'

export default function playSequence(
  isPlaying,
  activeNode,
  nodes,
  ctx,
  filter,
  osc,
  volume,
  nodeSequenceLength,
  setActiveNode,
  speed,
  renderLock,
  setRenderLock
) {
    let interval
    if (isPlaying && !renderLock) {
      setRenderLock(true)
      interval = setInterval(() => {
        console.log('interval')
        if (activeNode >= 0 && nodes != null && isPlaying) playSound(ctx, filter, osc, volume, nodes, activeNode)
        if (activeNode >= nodeSequenceLength - 1) {
          // reset sequence
          setActiveNode(0)
        } else {
          // play next node
          let nextNode = activeNode + 1
          setActiveNode(nextNode)
        }
      }, speed)
    } else if (!isPlaying) {
      clearInterval(interval)
      setActiveNode(-1)
    }
}