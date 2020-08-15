import React from 'react'

export default function WaveControls({
  cycleWaveforms,
  displayWaveforms
}) {
  return (
    <div className='wave-control'>
      <div className='wave-cycle' 
        onClick={() => cycleWaveforms()}>
        {displayWaveforms()}
      </div>
    </div>
  )
}