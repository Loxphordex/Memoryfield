import React, { useState, useEffect, useRef } from "react"
import MemoryField from "./components/MemoryField/MemoryField"
import { getRandomSequence, getInitialSequence } from "./data/sequenceDetails"
import ControlPanel from "./components/ControlPanel/ControlPanel"
import { filterTypes } from './components/Audio/constants'
import playSound from './components/Audio/playSound'
import { keyShortcuts } from './constants/keyShortcuts'

// styles
import "./styles/container.css"
import "./styles/control.css"
import "./styles/node.css"
import "./styles/colors.css"
import "./styles/field.css"

function App() {
  // Set up Audio Context
  const AudioContext = window.AudioContext || window.webkitAudioContext || null

  // State
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeNode, setActiveNode] = useState(-1)
  const [nodeEditor, setNodeEditor] = useState(null)
  const [nodes, setNodes] = useState(null)
  const [nodeSequenceLength, setNodeSequenceLength] = useState(16)
  const [speed, setSpeed] = useState(150)
  const [outputLevel] = useState(0.2)
  const [ctx] = useState(new AudioContext())
  const isPlayingRef = useRef(isPlaying)
  const setPlaying = (status) => {
    isPlayingRef.current = status
    setIsPlaying(status)
  }
  const [setEventHandlers] = useState(() => window.addEventListener('keydown', event => handleKeydownEvents(event)))

  let osc = ctx.createOscillator()
  let filter = ctx.createBiquadFilter()
  let volume = ctx.createGain()
  filter.type = filterTypes.lowpass

  useEffect(() => {
    if (setEventHandlers) {
      setEventHandlers()
    }
    if (nodes === null) {
      setNodes(getInitialSequence(16, nodeSequenceLength))
    }
    if (activeNode >= 0 && nodes != null && isPlaying) {
      playSound(ctx, filter, osc, volume, nodes, activeNode)
    }

    // Sequence and looping
    let timeout
    if (isPlaying) {
      timeout = setTimeout(() => {
        if (activeNode >= nodeSequenceLength - 1) {
          // reset sequence
          setActiveNode(0)
        } else {
          // play next node
          let nextNode = activeNode + 1
          setActiveNode(nextNode)
        }
      }, speed)
    } else {
      clearTimeout(timeout)
      setActiveNode(-1)
    }
  }, [activeNode,
      speed,
      isPlaying,
      nodes,
      AudioContext,
      ctx,
      outputLevel,
      filter,
      volume,
      osc,
      nodeSequenceLength,
      setEventHandlers])

  function randomize() {
    setNodes(getRandomSequence(16, nodeSequenceLength))
  }

  function calculateBpm(bpm) {
    setSpeed((60_000 / bpm).toFixed())
  }

  function handleKeydownEvents(event) {
    event.stopPropagation()
    event.preventDefault()
  
    if (event.keyCode === keyShortcuts.spacebar) {
      setPlaying(!isPlayingRef.current)
    }
  
    else if (event.keyCode === keyShortcuts.r) {
      randomize()
    }
  }

  return (
    <div className="App">
      <section className="app-container">
        <ControlPanel
          speed={speed}
          isPlaying={isPlaying}
          play={setPlaying}
          randomize={randomize}
          calculateBpm={calculateBpm}
          nodes={nodes}
          setNodes={setNodes}
          nodeSequenceLength={nodeSequenceLength}
          setNodeSequenceLength={setNodeSequenceLength}
          nodeEditor={nodeEditor}
          setNodeEditor={setNodeEditor}
        />
        <MemoryField
          nodes={nodes}
          activeNode={activeNode}
          nodeEditor={nodeEditor}
          setActiveNode={setActiveNode}
          setNodeEditor={setNodeEditor}
        />
      </section>
    </div>
  )
}

export default App
