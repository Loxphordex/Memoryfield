import React from "react";
import { notes } from '../../data/notes'
import { defaultNode } from '../../data/sequenceDetails'
import Panel from './Panel'

export default function ControlPanel({ 
  play, 
  randomize, 
  speed, 
  calculateBpm,
  nodes,
  nodeSequenceLength,
  setNodeSequenceLength,
  setNodes, 
  nodeEditor,
  setNodeEditor }) {
  
  function addNode() {
    if (nodes) {
      if (nodes.length < 16) {
        setNodes([...nodes, defaultNode(nodes.length)])
      }
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

  function nodeActivationStatus() {
    if (nodes) {
      return nodes.filter(Boolean).map((node, i) => {
        if (node.playOrder > nodeSequenceLength) {
          node.active = false
        } else {
          node.active = true
        }
        console.log(node)
        return node
      })
    }
  }

  function setSequenceAndNodeStatus(num) {
    if (num) {
      setNodeSequenceLength(num)
      setNodes(nodeActivationStatus())
    }
  }

  function playSequence() {
    if (nodes) {
      play(true)
    }
  }

  return (
    <Panel 
      nodes={nodes}
      setNodes={setNodes}
      nodeEditor={nodeEditor}
      notes={notes}
      playSequence={playSequence}
      play={play}
      addNode={addNode}
      randomize={randomize}
      calculateBpm={calculateBpm}
      deleteNode={deleteNode}
      speed={speed}
      nodeSequenceLength={nodeSequenceLength}
      setSequenceAndNodeStatus={setSequenceAndNodeStatus}
    />
  )

  // return (
  //   <section className="control-panel">
  //     <div className='global-controls'>
  //       <button onClick={() => playSequence()}>Play</button>
  //       <button onClick={() => play(false)}>Stop</button>
  //       <button onClick={() => addNode()}>+</button>
  //       <button onClick={() => randomize()}>Randomize</button>
  
  //       <label htmlFor="speed">{(60_000 / speed).toFixed()}</label>
  //       <input type="range" id="speed" name="speed" min={1} max={1000} 
  //         onChange={(e) => calculateBpm(e.target.value)}></input>
  //     </div>

  //     <div className='node-controls'>
  //       <NoteControls
  //         nodes={nodes}
  //         setNodes={setNodes}
  //         nodeEditor={nodeEditor}
  //         notes={notes}
  //       />
  //       <button className="delete-node" onClick={() => deleteNode()}>Delete</button>
  //     </div>
  //   </section>
  // );
}
