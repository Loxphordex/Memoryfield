import React from 'react'
import { Sun, Moon } from 'phosphor-react'
import '../../styles/components/Footer.css'

export default function Footer({
  dayMode,
  setDayMode
}) {
  return (
    <div className='footer'>
      <div className='footer-icon-hub'>
        <button className='day-mode-toggle' onClick={() => setDayMode(!dayMode)}>
          { dayMode ? <Sun size={32} /> : <Moon size={32} /> }
        </button>
        <div className='footer-github-link'>
          <a href='https://github.com/Loxphordex/Memoryfield' target='_blank' rel='noopener noreferrer'>
            <i className='devicon-github-original-wordmark'></i>
          </a>
        </div>
      </div>
    </div>
  )
}