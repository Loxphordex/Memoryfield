import React from 'react'
import Knob from '../Knob/knob'
import '../../styles/components/MainPanel.css'
import { Play, Stop } from 'phosphor-react'

export default function MainPanel({
  playSequence,
  play,
  isPlaying,
  randomize,
  calculateBpm,
  displayedBpm,
  setSequenceAndNodeStatus,
  updateFilterFrequency
}) {
  return (
    <div className='global-controls'>
      {!isPlaying && <button onClick={() => playSequence()}><Play size={36} /></button>}
      {isPlaying && <button onClick={() => play(false)}><Stop size={36} /></button>}
      <button onClick={() => randomize()}>Randomize</button>
  
      {/* <div className='bpm-controls-container'>
        <label htmlFor="speed">{`${displayedBpm} BPM`}</label>
        <input type="range" id="speed" name="speed" min={1} max={400} defaultValue={150}
          onChange={(e) => calculateBpm(e.target.value)} />
      </div> */}

      <div className='bmp-knob-container'>
        <Knob
          units='tempo'
          defaultValue={150}
          maxValue={300}
          valueCallback={calculateBpm}
        />
      </div>

      <div className='global-filter-container'>
        <Knob
          units='frequency'
          defaultValue={4000}
          maxValue={6000}
          valueCallback={updateFilterFrequency}
        />
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