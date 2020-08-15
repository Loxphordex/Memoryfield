import React from 'react'

export default function MainPanel({
  playSequence,
  play,
  randomize,
  calculateBpm,
  speed,
  setSequenceAndNodeStatus
}) {
  return (
    <div className='global-controls'>
      <button onClick={() => playSequence()}>Play</button>
      <button onClick={() => play(false)}>Stop</button>
      <button onClick={() => randomize()}>Randomize</button>
  
      <label htmlFor="speed">{(60_000 / speed).toFixed()}</label>
      <input type="range" id="speed" name="speed" min={1} max={1000} 
        onChange={(e) => calculateBpm(e.target.value)} />
      <button id="sequenceLength8" name="sequenceLength8"
        onClick={() => setSequenceAndNodeStatus(8)}>8</button>
      <button id="sequenceLength16" name="sequenceLength16"
        onClick={() => setSequenceAndNodeStatus(16)}>16</button>
    </div>
  )
}