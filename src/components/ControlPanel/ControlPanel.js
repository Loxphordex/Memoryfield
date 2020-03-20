import React from "react";
import { notes } from '../../levels/notes'

export default function ControlPanel({ 
  play, 
  randomize, 
  speed, 
  calculateBpm,
  nodes,
  setNodes, 
  nodeEditor }) {
  return (
    <section className="control-panel">
      <div className='global-controls'>
        <button onClick={() => play(true)}>Play</button>
        <button onClick={() => play(false)}>Stop</button>
        <button onClick={() => randomize()}>Randomize</button>
  
        <label htmlFor="speed">{speed}</label>
        <input type="range" id="speed" name="speed" min={1} max={7500} onChange={(e) => calculateBpm(e.target.value)}></input>
      </div>
      <div className='node-editor'>
      </div>
      <div className='node-controls'>
        {nodeControls(nodeEditor, nodes, setNodes, notes) || ''}
      </div>
    </section>
  );
}

// Check if a node is selected (node editor should be able to toggle on/off)
// @param editor is the index of the current node
// @param nodes, list of nodes
// set node details based on user input
// set sine, pitch, duration, filter, etc.
// more user control === more interesting instrument
//
// first copy the nodes array.
// mutate that copy, then set the nodes in state to that copy
// this is to avoid mutating state
function nodeControls(editor, nodes, setNodes, notes) {
  if (!nodes) {
    return <></>
  }

  let nodesClone = [...nodes]
  let selectedNode = nodesClone[editor]
  let defaultNote = notes[0]
  if (editor !== null && nodes) {
    return (
      <>
        {noteSwitch()}
      </>
    )
  } else {
    return <></>
  }

  function noteSwitch() {
    return (
      <div className='note-switch'>
        <button className='prev-note note-switch-button'>{'<'}</button>
        <div className='note-display'>{selectedNode.note.note || defaultNote}</div>
        <button className='next-note note-switch-button'>{'>'}</button>
      </div>
    )
  }
}
