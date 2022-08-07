import React from 'react'

function SaveControl({
  toggleInputActive,
  saveInputActive,
  setPresetName,
  saveNodes
}) {
  return (
    <div className='save-control'>
      {!saveInputActive && 
        <button onClick={toggleInputActive}>Save Preset</button>}
      {saveInputActive &&
        <div className='preset-name-input'>
        <input type='text' onChange={e => setPresetName(e.target.value)} />
        <button onClick={saveNodes}>Save</button>
        <button onClick={toggleInputActive}>Cancel</button>
      </div>}
    </div>
  )
}

export default SaveControl