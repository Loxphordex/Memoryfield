import React, { useState, useEffect, useRef } from 'react'
import MemoryField from './components/MemoryField/MemoryField'
import ControlPanel from './components/ControlPanel/ControlPanel'
import Footer from './components/Footer/Footer'
import StartMenu from './components/StartMenu/StartMenu'
import { getAudioSamples } from './components/Audio/audioSamples'
import { filterTypes } from './components/Audio/constants'
import playSound from './components/Audio/playSound'
import { keyShortcuts } from './constants/keyShortcuts'
import { getInitialSequence } from './data/sequenceDetails'
import { useInterval } from './helpers/hooks'

// styles
import './styles/container.css'
import './styles/control.css'
import './styles/node.css'
import './styles/colors.css'
import './styles/field.css'

function App() {
  // Set up Audio Context
  let AudioContext

  // State
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeNode, setActiveNode] = useState(-1)
  const [nodeEditor, setNodeEditor] = useState(null)
  const [nodes, setNodes] = useState(null)
  const [nodeSequenceLength, setNodeSequenceLength] = useState(8)
  const [tempo, setTempo] = useState(null)
  const [displayedBpm, setDisplayedBpm] = useState(100)
  const [outputLevel] = useState(0.2)
  const [samples, setSamples] = useState([])
  const [ctx, setCtx] = useState(null)

  const [volume, setVolume] = useState(null)
  const [osc, setOsc] = useState(null)
  const [filter, setFilter] = useState(null)
  const [pitch, setPitch] = useState(1)
  const [defaultFilterValues, setDefaultFilterValues] = useState({ frequency: 4000, q: 1 })
  const [isPathCreated, setIsPathCreated] = useState(false)
  const [isPathSetup, setIsPathSetup] = useState(false)
  const [panelDisplayMode, setPanelDisplayMode] = useState(null)

  const isPlayingRef = useRef(isPlaying)
  const setPlaying = (status) => {
    isPlayingRef.current = status
    setIsPlaying(status)
    if (status === false) setActiveNode(-1)
  }
  const [defaultKeys, setDefaultKeys] = useState(false)
  const [isKeyHandlerSet, setIsKeyHandlerSet] = useState(false)

  useEffect(() => {
    setUpSignalPath()
    const handleKeydownEvents = function(event) {
      if (event) {
        event.stopPropagation()
        event.preventDefault()
      
        if (event.keyCode === keyShortcuts.spacebar) {
          setPlaying(!isPlayingRef.current)
        }
      }
    }

    if (!defaultKeys && !isKeyHandlerSet) {
      window.addEventListener('keydown', handleKeydownEvents)
      setIsKeyHandlerSet(true)
    }

    if (defaultKeys && isKeyHandlerSet) {
      window.removeEventListener('keydown', handleKeydownEvents)
      setIsKeyHandlerSet(false)
    }

    if (nodes === null) setNodes(getInitialSequence(16, nodeSequenceLength))

    if (!tempo && displayedBpm) calculateBpm(displayedBpm)

    return () => {
      window.removeEventListener('keydown', handleKeydownEvents)
    }
  }, [activeNode,
      tempo,
      isPlaying,
      nodes,
      AudioContext,
      ctx,
      outputLevel,
      filter,
      volume,
      // osc,
      nodeSequenceLength,
      defaultKeys,
      isKeyHandlerSet])

  useInterval(() => {
    if (activeNode >= 0 && nodes != null && isPlaying) {
      playSound(ctx, filter, pitch, osc, volume, nodes, activeNode)
    }

    if (activeNode >= nodeSequenceLength - 1) {
      // reset sequence
      setActiveNode(0)
    }
    
    else {
      // play next node
      let nextNode = activeNode + 1
      setActiveNode(nextNode)
    }
  }, isPlaying ? tempo : null)

  function startAudioContext() {
    if (!ctx) {
      AudioContext = window.AudioContext || window.webkitAudioContext || null
      setCtx(new AudioContext)
    }
  }

  function calculateBpm(bpm) {
    bpm = parseInt(bpm, 10)
    const millisecondsPerBeat = Math.floor((60000 / bpm))
    const beatsIn44Time = Math.floor((millisecondsPerBeat / 4))

    setTempo(beatsIn44Time)
    setDisplayedBpm(bpm)
  }

  function toggleDefaultKeys() {
    setDefaultKeys(!defaultKeys)
  }

  // Set up signal path
  async function setUpSignalPath() {
    if (ctx) {
      if (isPathCreated === false) {
        // setOsc(ctx.createOscillator())
        setFilter(ctx.createBiquadFilter())
        setVolume(ctx.createGain())
        setIsPathCreated(true)
      }
      
      if (isPathSetup === false && isPathCreated === true) {
        // osc.start()
  
        filter.type = filterTypes.lowpass
        filter.frequency.value = defaultFilterValues.frequency
        filter.Q.value = defaultFilterValues.q
        const sampleSetup = await getAudioSamples(ctx)
        setSamples(sampleSetup)
        setIsPathSetup(true)
      }
    }
  }

  if (!ctx) {
    return (
      <StartMenu
        startAudioContext={startAudioContext}
      />
    )
  }

  return (
    <div className='App'>
      <section className='app-container'>
        <ControlPanel
          isPlaying={isPlaying}
          play={setPlaying}
          calculateBpm={calculateBpm}
          displayedBpm={displayedBpm}
          nodes={nodes}
          setNodes={setNodes}
          nodeSequenceLength={nodeSequenceLength}
          setNodeSequenceLength={setNodeSequenceLength}
          nodeEditor={nodeEditor}
          setNodeEditor={setNodeEditor}
          toggleDefaultKeys={toggleDefaultKeys}
          ctx={ctx}
          filter={filter}
          panelDisplayMode={panelDisplayMode}
          setPanelDisplayMode={setPanelDisplayMode}
          defaultFilterValues={defaultFilterValues}
          setDefaultFilterValues={setDefaultFilterValues}
          samples={samples}
          pitch={pitch}
          setPitch={setPitch}
        />
        <MemoryField
          nodes={nodes}
          activeNode={activeNode}
          nodeEditor={nodeEditor}
          setActiveNode={setActiveNode}
          setNodeEditor={setNodeEditor}
          setPanelDisplayMode={setPanelDisplayMode}
          ctx={ctx}
        />
      </section>
      <Footer />
    </div>
  )
}

export default App
