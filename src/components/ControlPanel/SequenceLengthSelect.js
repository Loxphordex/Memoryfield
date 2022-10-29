import React from 'react'

export default function SequenceLengthSelect({
  nodeSequenceLength,
  setSequenceAndNodeStatus
}) {

  function steps() {
    const stepOptions = [8, 9, 10, 11, 12, 13, 14, 15, 16]
    return stepOptions.map((i) => {
      return <li 
        key={`step-option-${i}`}
        className={`sequence-dropdown-option display-panel-list-item-highlight ${highlight(i)}`}
        onClick={() => setSequenceAndCloseToggle(i)}
        >{i}
      </li>
    })
  }

  function setSequenceAndCloseToggle(seq) {
    setSequenceAndNodeStatus(seq)
  }

  function highlight(num) {
    if (nodeSequenceLength === num) {
      return 'display-panel-highlight'
    }

    return ''
  }

  return (
    <div className='sequence-length-display-container'>
      <label htmlFor='sequence-list'>Steps</label>
      <ul id='sequence-list' className='sequence-length-display display-panel-list'>
        {steps()}
      </ul>
    </div>
  )
}
