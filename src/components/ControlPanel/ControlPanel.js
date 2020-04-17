import React from "react";
import { notes } from '../../data/notes'
import { defaultNode } from '../../data/sequenceDetails'

export default function ControlPanel({ 
  play, 
  randomize, 
  speed, 
  calculateBpm,
  nodes,
  setNodes, 
  nodeEditor,
  setNodeEditor }) {
  
  function addNode() {
    if (nodes) {
      setNodes([...nodes, defaultNode(nodes.length)])
    } else {
      setNodes([defaultNode(0)])
    }
  }

  function deleteNode() {
    if (nodes != null &&  nodeEditor != null) {
      const nodesCopy = [...nodes]
      delete nodesCopy[nodeEditor]
      setNodeEditor(null)
      setNodes(enumeratePlayOrder(nodesCopy))
    }
  }

  function enumeratePlayOrder(nodes) {
    if (nodes) {
      return nodes.filter(Boolean).map((node, i) => {
        node.playOrder = i
        return node
      })
    }
  }

  function playSequence() {
    if (nodes) {
      play(true)
    }
  }

  function nodeControls() {
    if (nodes && nodeEditor !== null) {
      const nodesClone = [...nodes]
      const selectedNode = nodesClone[nodeEditor]
      const defaultNote = notes[0]
      return (
        <div className='note-switch'>
          <button className='prev-note note-switch-button'>{'<'}</button>
          <div className='note-display'>{selectedNode.note.note || defaultNote}</div>
          <button className='next-note note-switch-button'>{'>'}</button>
          <button className="delete-node" onClick={() => deleteNode()}>Delete</button>
        </div>
      )
    }
    return <></>
  }

  return (
    <section className="control-panel">
      <div className='global-controls'>
        <button onClick={() => playSequence()}>Play</button>
        <button onClick={() => play(false)}>Stop</button>
        <button onClick={() => addNode()}>+</button>
        <button onClick={() => randomize()}>Randomize</button>
  
        <label htmlFor="speed">{speed}</label>
        <input type="range" id="speed" name="speed" min={1} max={7500} onChange={(e) => calculateBpm(e.target.value)}></input>
      </div>
      <div className='node-editor'>
      </div>
      <div className='node-controls'>
        {nodeControls()}
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
