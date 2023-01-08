import React from 'react'
import HomeButton from '../../HomeButton/HomeButton'

export default function SaveControl({
  toggleInputActive,
  setPresetName,
  saveNodes,
  setPanelDisplayMode
}) {

  function enterKeyToSave(e) {
    if (e.key === 'Enter') {
      saveNodes()
    }
  }

  return (
    <div className='save-control'>
      <div className='preset-name-input'>
        <h2 className='panel-display-header'>
          <HomeButton setPanelDisplayMode={setPanelDisplayMode} />
          <label className='display-panel-label' htmlFor='save-preset-name'>Save Preset</label>  
        </h2>
        <input
          className='display-panel-input'
          id='save-preset-name'
          type='text'
          autoFocus
          onChange={e => setPresetName(e.target.value)}
          onKeyDown={(e) => enterKeyToSave(e)}
        />
        <div className='display-panel-buttons-container'>
          <button className='display-panel-button' onClick={saveNodes}>Save</button>
          <button className='display-panel-button' onClick={toggleInputActive}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
