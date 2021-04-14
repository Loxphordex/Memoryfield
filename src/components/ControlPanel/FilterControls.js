import React from 'react'
import '../../styles/controlPanelStyles/FilterControls.css'

export default function FilterControls({
  setFilterFrequency,
  setFilterQ,
  nodeEditor, 
  selectedNode
}) {
  if (nodeEditor !== null && selectedNode) {
    return (
      <div className='filter-control'>
        <label htmlFor='frequency'>Frequency</label>
        <input 
          name='frequency'
          id='frequency'
          type='range'
          min={0}
          max={4000}
          value={selectedNode.filterFrequency}
          onChange={e => setFilterFrequency(e.target.value)} />
        <label htmlFor='filterQ'>Q</label>
        <input
          name='filterQ'
          id='filterQ'
          type='range'
          min={0}
          max={20}
          value={selectedNode.filterQ}
          onChange={e => setFilterQ(e.target.value)} />
      </div>
    )
  } return <></>
}