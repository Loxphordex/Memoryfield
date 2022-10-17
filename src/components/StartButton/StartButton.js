import React from 'react'

export default function StartButton({
  ctx,
  startAudioContext
}) {

  if (!ctx) {
    return (
      <div className='start-button-background'>
        <button className='start-button' onClick={startAudioContext}>Start</button>
      </div>
    )
  }

  return <></>
}