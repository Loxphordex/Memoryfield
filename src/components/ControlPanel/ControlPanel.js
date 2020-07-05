import React, { useState, useEffect } from "react";
import { notes } from '../../data/notes'
import { defaultNode } from '../../data/sequenceDetails'
import { waveforms } from '../Audio/constants'
import MainPanel from './MainPanel'
import NoteControls from './NoteControls'
import WaveControls from './WaveControls'

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

  const [selectedNode, setSelectedNode] = useState(null)

  useEffect(() => {
    if (nodeEditor != null && nodes) {
      setSelectedNode(nodes[nodeEditor])
    } else if (nodeEditor === null) {
      setSelectedNode(null)
    }
  }, [nodeEditor, nodes, selectedNode])
  
  // ! feature removed
  function addNode() {
    if (nodes) {
      if (nodes.length < 16) {
        setNodes([...nodes, defaultNode(nodes.length)])
      }
    } else {
      setNodes([defaultNode(0)])
    }
  }

  // ! feature removed
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

  function nodeActivationStatus(num) {
    if (nodes) {
      return nodes.filter(Boolean).map((node, i) => {
        if (node.playOrder > num - 1) {
          node.active = false
        } else {
          node.active = true
        }
        return node
      })
    }
  }

  function setSequenceAndNodeStatus(num) {
    if (num) {
      setNodeSequenceLength(num)
      setNodes(nodeActivationStatus(num))
    }
  }

  function playSequence() {
    if (nodes) {
      play(true)
    }
  }

  function cycleWaveforms() {
    let currentWaveIndex
    for (let i in waveforms) {
      if (waveforms[i] === selectedNode.wave) {
        currentWaveIndex = i
        break
      }
    }

    if (currentWaveIndex) {
      const i = parseInt(currentWaveIndex, 10)
      const nextWave = waveforms[i + 1]
      nextWave
      ? selectWaveform(nextWave)
      : selectWaveform(waveforms[0])
    }
  }

  function selectWaveform(wave) {
    selectedNode.wave = wave
    nodes.splice(selectedNode.playOrder, 1, selectedNode)
    const newNodes = [...nodes]
    setNodes(newNodes)
  }

  function displayWaveforms() {
    if (nodes && selectedNode) {
      return selectedNode.wave
    }
    return String()
  }

  return (
    <section className='control-panel'>
      <MainPanel 
        playSequence={playSequence}
        play={play}
        addNode={addNode}
        randomize={randomize}
        calculateBpm={calculateBpm}
        deleteNode={deleteNode}
        speed={speed}
        setSequenceAndNodeStatus={setSequenceAndNodeStatus}
      />
      <NoteControls 
        nodes={nodes}
        setNodes={setNodes}
        nodeEditor={nodeEditor}
        notes={notes}
        selectedNode={selectedNode}
      />
      <WaveControls 
        cycleWaveforms={cycleWaveforms}
        displayWaveforms={displayWaveforms}
      />
    </section>
  )
}
