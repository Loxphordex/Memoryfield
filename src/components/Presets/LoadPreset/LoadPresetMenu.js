import React from 'react'
import HomeButton from '../../HomeButton/HomeButton'

export default function LoadPresetMenu({
  presetItems,
  isConfirmationShowing,
  setupConfirmation,
  confirmLoad,
  setPanelDisplayMode
}) {

  return (
    <div className='load-preset-menu'>
      <div className='load-preset-list-container'>
        <h2 className='panel-display-header'>
          <HomeButton setPanelDisplayMode={setPanelDisplayMode} />
          <label className='display-panel-label' htmlFor='load-preset-list'>Load Preset</label>
        </h2>
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