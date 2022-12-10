import React from 'react'
import { panelMode } from '../Audio/constants'
import { CaretDoubleLeft } from 'phosphor-react'

export default function HomeButton({
  setPanelDisplayMode
}) {

  function goHome(e) {
    e.preventDefault()
    e.stopPropagation()
    setPanelDisplayMode(panelMode.node)
  }

  return (
    <div className='home-button' onClick={e => goHome(e)}>
      <CaretDoubleLeft size={22} />
    </div>
  )
}
