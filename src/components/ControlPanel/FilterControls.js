import React from 'react'
import Knob from '../Knob/knob'
import '../../styles/controlPanelStyles/FilterControls.css'

export default function FilterControls({
  updateFilterFrequency
}) {

  return (
    <div className='filter-control'>
      <Knob
        units='frequency'
        defaultValue={4000}
        maxValue={6000}
        valueCallback={updateFilterFrequency}
      />
    </div>
  )
}