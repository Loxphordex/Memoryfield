import React from 'react'

export default function ControlPanel({ play }) {
  return (
    <section className='control-panel'>
      <button onClick={() => play(true)}>Play</button>
    </section>
  )
}