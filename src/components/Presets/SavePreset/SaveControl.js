import React from 'react'

export default function SaveControl({
  toggleInputActive,
  setPresetName,
  saveNodes
}) {

  function enterKeyToSave(e) {
    if (e.key === 'Enter') {
      saveNodes()
    }
  }

  return (
    <div className='save-control'>
      <div className='preset-name-input'>
        <label className='display-panel-label' htmlFor='save-preset-name'>Save Preset</label>
        <input
          className='display-panel-input'
          id='save-preset-name'
          type='text'
          autoFocus
          onChange={e => setPresetName(e.target.value)}
          onKeyDown={(e) => enterKeyToSave(e)}
        />
        <button className='display-panel-button' onClick={saveNodes}>Save</button>
        <button className='display-panel-button' onClick={toggleInputActive}>Cancel</button>
      </div>
    </div>
  )
}
