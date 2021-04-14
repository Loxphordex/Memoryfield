import React from 'react'
import '../../styles/components/MainPanel.css'

export default function MainPanel({
  playSequence,
  play,
  randomize,
  calculateBpm,
  speed,
  displayedBpm,
  setSequenceAndNodeStatus
}) {
  return (
    <div className='global-controls'>
      <button onClick={() => playSequence()}>Play</button>
      <button onClick={() => play(false)}>Stop</button>
      <button onClick={() => randomize()}>Randomize</button>
  
      <div className='bpm-controls-container'>
        <label htmlFor="speed">{`${displayedBpm} BPM`}</label>
        <input type="range" id="speed" name="speed" min={1} max={1000}
          onChange={(e) => calculateBpm(e.target.value)} />
      </div>
      <button id="sequenceLength8" name="sequenceLength8"
        onClick={() => setSequenceAndNodeStatus(8)}>8</button>
      <button id="sequenceLength16" name="sequenceLength16"
        onClick={() => setSequenceAndNodeStatus(16)}>16</button>
    </div>
  )
}