import React from 'react'

export default function SampleSelect({
  nodeEditor,
  selectedNode,
  nodes,
  samples,
  selectedSample,
  setSelectedSample
}) {

  function displaySampleSelection() {
    return samples.map(s => <li className={`display-panel-list-item-highlight sample-selection ${highlight(s.name)}`}
      key={s.name}
      onClick={() => setSelectedSample(s)}>
        {s.name}
      </li>
    )
  }

  function highlight(audioSample) {
    if (selectedSample && selectedSample.name === audioSample) {
      return 'display-panel-highlight'
    }

    return ''
  }

  return (
    <div className='sample-selector-container'>
      <ul className='sample-list'>{ displaySampleSelection() }</ul>
    </div>
  )
}