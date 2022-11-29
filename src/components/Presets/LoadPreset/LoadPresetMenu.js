import React from 'react'

export default function LoadPresetMenu({
  presetItems,
  isConfirmationShowing,
  setupConfirmation,
  confirmLoad
}) {

  return (
    <div className='load-preset-menu'>
      <div className='load-preset-list-container'>
        <label className='display-panel-label' htmlFor='load-preset-list'>Load Preset</label>
        <ul id='load-preset-list' className='preset-list sequence-list'>
          {presetItems && setupConfirmation && presetItems().map(name => {
            return (
              <div key={name} className='load-preset-list-item-container'>
                <li
                  id={name}
                  className='preset-list-item display-panel-list-item-highlight'
                  onClick={() => setupConfirmation(name)}
                >{name}
                </li>
              </div>
            )
          })}
        </ul>
      </div>
      <div className='confirm-load-container'>
        {isConfirmationShowing && confirmLoad()}
      </div>
    </div>
  )
}