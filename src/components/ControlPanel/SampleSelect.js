import React from 'react'
import { samples } from '../Audio/constants'

export default function SampleSelect({
  selectSample,
  nodeEditor,
  selectedNode
}) {

  function displaySampleSelection() {
    return samples.map(s => <li className='sample-selection'
      key={s.name}
      onClick={() => selectSample(s)}>
        {s.name}
      </li>
    )
  }

  if (nodeEditor !== null && selectedNode) {
    return (
      <div className='sample-selector-container'>
        <ul className='sample-list'>{ displaySampleSelection() }</ul>
      </div>
    )
  }

  return <></>
}