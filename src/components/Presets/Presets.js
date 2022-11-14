import React from 'react'

export default function Presets({
  activateSavePreset,
  activateLoadPreset
}) {
  return (
    <div className='presets-container'>
      <span className='main-panel-label no-select'>Presets</span>
      <div className='presets-buttons-container'>
        <button onClick={activateSavePreset} className='control-button'>Save</button>
        <button onClick={activateLoadPreset} className='control-button'>Load</button>
      </div>
    </div>
  )
}