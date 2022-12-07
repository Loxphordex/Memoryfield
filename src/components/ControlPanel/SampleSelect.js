import React from 'react'

export default function SampleSelect({
  selectSample,
  nodeEditor,
  selectedNode,
  nodes,
  samples
}) {

  function displaySampleSelection() {
    return samples.map(s => <li className={`display-panel-list-item-highlight sample-selection ${highlight(s.name)}`}
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