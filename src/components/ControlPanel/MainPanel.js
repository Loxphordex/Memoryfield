import React, { useState, useEffect } from 'react'
import Knob from '../Knob/knob'
import Presets from '../Presets/Presets'
import { panelMode } from '../Audio/constants'
import '../../styles/components/MainPanel.css'
import { Play, Stop } from 'phosphor-react'

export default function MainPanel({
  playSequence,
  play,
  isPlaying,
  calculateBpm,
  updateFilterFrequency,
  updateFilterQ,
  setPanelDisplayMode,
  setNodeEditor,
  displayedBpm,
  defaultFilterValues,
}) {

  const [defaultFrequency, setDefaultFrequency] = useState(null)
  const [defaultQ, setDefaultQ] = useState(null)

  useEffect(() => {
    setupDefaultFilterValues()
  }, [defaultFilterValues])

  function activateSteps() {
    setPanelDisplayMode(panelMode.steps)
    setNodeEditor(null)
  }

  function activateSavePreset() {
    setPanelDisplayMode(panelMode.savePreset)
    setNodeEditor(null)
  }

  function activateLoadPreset() {
    setPanelDisplayMode(panelMode.loadPreset)
    setNodeEditor(null)
  }

  function setupDefaultFilterValues() {
    if (defaultFilterValues && defaultFilterValues.frequency && defaultFilterValues.q) {
      setDefaultFrequency(defaultFilterValues.frequency)
      setDefaultQ(defaultFilterValues.q)
    }
  }

  return (
    <div className='global-controls'>
      {!isPlaying && <button className='play-or-stop-button play-button control-button' onClick={() => playSequence()}><Play size={36} /></button>}
      {isPlaying && <button className='play-or-stop-button stop-button control-button' onClick={() => play(false)}><Stop size={36} /></button>}

      <div className='bmp-knob-container'>
        <Knob
          units='tempo'
          defaultValue={displayedBpm}
          maxValue={300}
          valueCallback={calculateBpm}
        />
      </div>

      <div className='global-filter-container'>
        <Knob
          units='frequency'
          defaultValue={defaultFrequency}
          maxValue={8000}
          valueCallback={updateFilterFrequency}
        />
      </div>

      <div className='global-q-container'>
        <Knob
          units='q'
          defaultValue={defaultQ}
          maxValue={35}
          valueCallback={updateFilterQ}
        />
      </div>

      <div className='steps-container'>
        <label className='main-panel-label' htmlFor='steps-button'>Steps</label>
        <div className='presets-buttons-container steps-container'>
          <button
            id='steps-button'
            className='control-button steps-button'
            onClick={activateSteps}>Steps
          </button>
        </div>
      </div>

      <Presets
        activateSavePreset={activateSavePreset}
        activateLoadPreset={activateLoadPreset}
      />
    </div>
  )
}