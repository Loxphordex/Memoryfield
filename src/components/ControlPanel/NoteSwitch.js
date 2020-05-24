import React from 'react';

export default function NoteSwitch({ changeNote, displayNote }) {
  return (
    <div className='note-switch'>
      <button 
        onClick={() => changeNote(-1)}
        className='prev-note note-switch-button'>{'<'}</button>
      <div className='note-display'>{displayNote()}</div>
      <button 
        onClick={() => changeNote(1)}
        className='next-note note-switch-button'>{'>'}</button>
    </div>
  )
}