import React, { useState } from 'react'
import Knob from '../Knob/knob'
import Dropdown from '../Dropdown/Dropdown'
import Presets from '../Presets/Presets'
import { panelMode } from '../Audio/constants'
import '../../styles/components/MainPanel.css'
import { Play, Stop } from 'phosphor-react'

export default function MainPanel({
  playSequence,
  play,
  isPlaying,
  calculateBpm,
  displayedBpm,
  nodeSequenceLength,
  setSequenceAndNodeStatus,
  updateFilterFrequency,
  updateFilterQ,
  nodes,
  toggleDefaultKeys,
  presets,
  setPresets,
  setNodes,
  setPanelDisplayMode,
  nodeEditor,
  setNodeEditor
}) {

  function activateSteps() {
    setPanelDisplayMode(panelMode.steps)
    setNodeEditor(null)
  }

  return (
    <div className='global-controls'>
      {!isPlaying && <button className='control-button' onClick={() => playSequence()}><Play size={36} /></button>}
      {isPlaying && <button className='control-button' onClick={() => play(false)}><Stop size={36} /></button>}

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

      <div className='global-q-container'>
        <Knob
          units='q'
          defaultValue={1}
          maxValue={35}
          valueCallback={updateFilterQ}
        />
      </div>

      <button 
        className='control-button'
        onClick={activateSteps}>Steps</button>

      <Presets
        nodes={nodes}
        toggleDefaultKeys={toggleDefaultKeys}
        presets={presets}
        setPresets={setPresets}
        setNodes={setNodes}
      />
    </div>
  )
}