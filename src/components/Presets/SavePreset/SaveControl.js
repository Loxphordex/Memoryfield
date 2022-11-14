import React from 'react'

export default function SaveControl({
  toggleInputActive,
  setPresetName,
  saveNodes
}) {
  return (
    <div className='save-control'>
      <div className='preset-name-input'>
        <input type='text' onChange={e => setPresetName(e.target.value)} />
        <button onClick={saveNodes}>Save</button>
        <button onClick={toggleInputActive}>Cancel</button>
      </div>
    </div>
  )
}
