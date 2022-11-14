import React from 'react'

export default function LoadPresetMenu({
  presetItems,
  isConfirmationShowing,
  setupConfirmation,
  confirmLoad
}) {
  return (
    <div className='load-preset-menu'>
      <label className='preset-label' htmlFor='load-preset-list'>Load Preset</label>
      <ul id='load-preset-list' className='preset-list sequence-list'>
        {presetItems && setupConfirmation && presetItems().map(name => {
          return (
            <li
              key={name}
              id={name}
              className='preset-list-item display-panel-list-item-highlight'
              onClick={() => setupConfirmation(name)}
            >{name}
            </li>
          )
        })}
      </ul>
      {isConfirmationShowing && confirmLoad()}
    </div>
  )
}