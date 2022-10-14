import React, { useState, useEffect } from "react";
import { notes } from '../../data/notes'
import { waveforms } from '../Audio/constants'
import Presets from '../Presets/Presets'
import MainPanel from './MainPanel'
import NoteControls from './NoteControls'
import WaveControls from './WaveControls'
import FilterControls from './FilterControls'
import SampleSelect from './SampleSelect'
import '../../styles/controlPanelStyles/DisplayPanel.css'
import '../../styles/controlPanelStyles/GeneralStyles.css'

export default function ControlPanel({ 
  displayedBpm,
  isPlaying,
  play, 
  randomize, 
  calculateBpm,
  nodes,
  nodeSequenceLength,
  setNodeSequenceLength,
  setNodes, 
  nodeEditor,
  toggleDefaultKeys,
  presets,
  setPresets,
  ctx,
  filter,
  setFilter,
  setFilterValues
}) {
  const [selectedNode, setSelectedNode] = useState(null)

  useEffect(() => {
    if (nodeEditor != null && nodes) {
      setSelectedNode(nodes[nodeEditor])
    } else if (nodeEditor === null) {
      setSelectedNode(null)
    }
  }, [nodeEditor, nodes, selectedNode])

  function updateNodes() {
    nodes.splice(selectedNode.playOrder, 1, selectedNode)
    const newNodes = [...nodes]
    setNodes(newNodes)
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

  function selectSample(sample) {
    selectedNode.sample = sample
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

  // function setFilterFrequency(freq) {
  //   if (freq) {
  //     selectedNode.filterFrequency = freq
  //     updateNodes()
  //   }
  // }
  
  // function setFilterQ(q) {
  //   if (q) {
  //     selectedNode.filterQ = q
  //     updateNodes()
  //   }
  // }

  function updateFilterFrequency(e) {
    if (e) {
      filter.frequency.value = e
    }
  }

  function updateFilterQ(e) {
    if (e) {
      filter.Q.value = e
    }
  }

  if (ctx) {
    return (
      <section className='control-panel'>
        <MainPanel 
          playSequence={playSequence}
          play={play}
          isPlaying={isPlaying}
          randomize={randomize}
          calculateBpm={calculateBpm}
          displayedBpm={displayedBpm}
          nodeSequenceLength={nodeSequenceLength}
          setSequenceAndNodeStatus={setSequenceAndNodeStatus}
          updateFilterFrequency={updateFilterFrequency}
          updateFilterQ={updateFilterQ}
          nodes={nodes}
          toggleDefaultKeys={toggleDefaultKeys}
          presets={presets}
          setPresets={setPresets}
          setNodes={setNodes}
        />
        <div className='selected-node-control-display'>
          {/* <NoteControls 
            nodes={nodes}
            setNodes={setNodes}
            nodeEditor={nodeEditor}
            notes={notes}
            selectedNode={selectedNode}
          /> */}
          {/* <WaveControls 
            cycleWaveforms={cycleWaveforms}
            displayWaveforms={displayWaveforms}
          /> */}
          <SampleSelect
            selectSample={selectSample}
            nodeEditor={nodeEditor}
            selectedNode={selectedNode}
            nodes={nodes}
          />
          {/* <FilterControls
            updateFilterFrequency={updateFilterFrequency}
          /> */}
        </div>
      </section>
    )
  }

  return <></>
}
