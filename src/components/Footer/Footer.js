import React from 'react'
import { Sun, Moon } from 'phosphor-react'
import '../../styles/components/Footer.css'

export default function Footer({
  dayMode,
  setDayMode
}) {
  return (
    <div className='footer'>
      <a href='https://github.com/Loxphordex/Memoryfield' target='_blank' rel='noopener noreferrer'>GitHub</a>
      <button className='day-mode-toggle' onClick={() => setDayMode(!dayMode)}>
        { dayMode ? <Sun size={32} /> : <Moon size={32} /> }
      </button>
    </div>
  )
}