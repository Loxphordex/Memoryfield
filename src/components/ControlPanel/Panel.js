import React from 'react'
import NoteControls from './NoteControls'

export default function Panel ({
  nodes,
  setNodes,
  nodeEditor,
  notes,
  playSequence,
  play,
  addNode,
  randomize,
  calculateBpm,
  deleteNode,
  speed,
  setSequenceAndNodeStatus
}) {
  return (
    <section className="control-panel">
      <div className='global-controls'>
        <button onClick={() => playSequence()}>Play</button>
        <button onClick={() => play(false)}>Stop</button>
        <button onClick={() => addNode()}>+</button>
        <button onClick={() => randomize()}>Randomize</button>
  
        <label htmlFor="speed">{(60_000 / speed).toFixed()}</label>
        <input type="range" id="speed" name="speed" min={1} max={1000} 
          onChange={(e) => calculateBpm(e.target.value)} />
        <button id="sequenceLength8" name="sequenceLength8"
          onClick={() => setSequenceAndNodeStatus(8)}>8</button>
        <button id="sequenceLength16" name="sequenceLength16"
          onClick={() => setSequenceAndNodeStatus(16)}>16</button>
      </div>
  
      <div className='node-controls'>
        <NoteControls
          nodes={nodes}
          setNodes={setNodes}
          nodeEditor={nodeEditor}
          notes={notes}
        />
        <button className="delete-node" onClick={() => deleteNode()}>Delete</button>
      </div>
    </section>
  )
}