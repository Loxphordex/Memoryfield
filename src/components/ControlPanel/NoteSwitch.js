import React from 'react';
import '../../styles/controlPanelStyles/NoteSwitch.css'

export default function NoteSwitch({ changeNote, displayedNote }) {
  return (
    <div className='note-switch'>
      <button 
        onClick={() => changeNote(-1)}
        className='prev-note note-switch-button'>{'<'}</button>
      <div className='note-display'>{displayedNote}</div>
      <button 
        onClick={() => changeNote(1)}
        className='next-note note-switch-button'>{'>'}</button>
    </div>
  )
}