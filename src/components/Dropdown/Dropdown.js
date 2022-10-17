import React from 'react'
import '../../styles/Dropdown.css'

export default function CustomDropDown({
  menuLabel,
  dropdownId,
  toggle,
  setToggle,
  buttonContent,
  createMenuContent
}) {

  function handleClick() {
    if (!toggle) {
      setToggle(true)
      window.onclick = function(e) {
        if (!e.target.matches('.dropdown-button')) {
          setToggle(false)
        }
      }
    }

    else {
      window.onclick = null
      setToggle(false)
    }
  }

  return (
    <div className='custom-dropdown-container'>
      <label htmlFor={dropdownId} className='global-label dropdown-label'>{menuLabel}</label>
      <button className='dropdown-button' id={dropdownId} onClick={handleClick}>{buttonContent}</button>
      <div className='custom-dropdown-container'>
        {toggle &&
          <ul className='custom-dropdown'>
            {createMenuContent()}
          </ul>
        }
      </div>
    </div>
  )
}