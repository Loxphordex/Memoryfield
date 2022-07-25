import React from 'react'
import '../../styles/components/MainPanel.css'
import { Play, Stop } from 'phosphor-react'

export default function MainPanel({
  playSequence,
  play,
  isPlaying,
  randomize,
  calculateBpm,
  displayedBpm,
  setSequenceAndNodeStatus
}) {
  return (
    <div className='global-controls'>
      {!isPlaying && <button onClick={() => playSequence()}><Play size={36} /></button>}
      {isPlaying && <button onClick={() => play(false)}><Stop size={36} /></button>}
      <button onClick={() => randomize()}>Randomize</button>
  
      <label htmlFor="bpm-controls-container" className="bpm-controls-container-label">Tempo</label>
      <div className='bpm-controls-container'>
        <label htmlFor="speed">{`${displayedBpm} BPM`}</label>
        <input type="range" id="speed" name="speed" min={1} max={400} defaultValue={150}
          onChange={(e) => calculateBpm(e.target.value)} />
      </div>
      <label htmlFor="sequence-length-container" className="sequence-length-container-label">Steps</label>
      <div className="sequence-length-container">
        <button id="sequenceLength8" name="sequenceLength8"
          onClick={() => setSequenceAndNodeStatus(8)}>8</button>
        <button id="sequenceLength16" name="sequenceLength16"
          onClick={() => setSequenceAndNodeStatus(16)}>16</button>
      </div>
    </div>
  )
}