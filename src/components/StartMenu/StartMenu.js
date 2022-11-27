import React from 'react'
import '../../styles/components/StartMenu.css'

export default function StartMenu({
  startAudioContext
}) {

  return (
    <div className='start-menu-background'>
      <h1>MemoryField</h1>
      <h2>React Drum Machine</h2>
      <div className='start-menu-version'>v0.2.0</div>
      <div className='start-menu-link-container'>
        <a className='start-menu-github-link' href='https://github.com/Loxphordex/Memoryfield' target='_blank' rel='noopener noreferrer'>
          <i className='devicon-github-original-wordmark'></i>
        </a>
      </div>
      <div className='start-button-container'>
        <button className='start-button' onClick={startAudioContext}>Start</button>
      </div>
    </div>
  )
}