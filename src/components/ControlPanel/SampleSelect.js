import React from 'react'
import { samples } from '../Audio/constants'

export default function SampleSelect({
  selectSample,
  nodeEditor,
  selectedNode,
  nodes
}) {

  function displaySampleSelection() {
    return samples.map(s => <li className={`sample-selection display-panel-list-item-highlight ${highlight(s.name)}`}
      key={s.name}
      onClick={() => selectSample(s)}>
        {s.name}
      </li>
    )
  }

  function highlight(audioSample) {
    if (nodes[nodeEditor].sample) {
      if (nodes[nodeEditor].sample.name === audioSample) {
        return 'display-panel-highlight'
      }
    }

    return ''
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