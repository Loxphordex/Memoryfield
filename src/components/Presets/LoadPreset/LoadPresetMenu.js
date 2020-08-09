import React from 'react'

export default function LoadPresetMenu({
  presetItems,
  toggleShowMenu,
  isConfirmationShowing,
  setupConfirmation,
  confirmLoad
}) {
  return (
    <div className='load-preset-menu'>
      <ul>
        {presetItems && setupConfirmation && presetItems().map(name => {
          return (
            <li
              key={name}
              id={name}
              onClick={() => setupConfirmation(name)}
            >{name}
            </li>
          )
        })}
      </ul>
      {isConfirmationShowing && confirmLoad()}
      <button onClick={toggleShowMenu}>Cancel</button>
    </div>
  )
}