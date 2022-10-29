import React, { useState, useEffect, useRef } from 'react'
import MemoryField from './components/MemoryField/MemoryField'
import ControlPanel from './components/ControlPanel/ControlPanel'
import Footer from './components/Footer/Footer'
import StartButton from './components/StartButton/StartButton'
import { samples } from './components/Audio/constants'
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
  const [speed, setSpeed] = useState(150)
  const [displayedBpm, setDisplayedBpm] = useState(150)
  const [outputLevel] = useState(0.2)
  const [ctx, setCtx] = useState(null)

  const [volume, setVolume] = useState(null)
  const [osc, setOsc] = useState(null)
  const [filter, setFilter] = useState(null)
  const [filterValues, setFilterValues] = useState({ frequency: 4000, q: 10 })
  const [isSignalSetUp, setIsSignalSetUp] = useState(false)
  const [isOscStarted, setIsOscStarted] = useState(false)
  const [panelDisplayMode, setPanelDisplayMode] = useState(null)

  const isPlayingRef = useRef(isPlaying)
  const setPlaying = (status) => {
    isPlayingRef.current = status
    setIsPlaying(status)
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

    return () => {
      window.removeEventListener('keydown', handleKeydownEvents)
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
      defaultKeys,
      isKeyHandlerSet])

  useInterval(() => {
    if (!isPlaying) setActiveNode(-1)

    if (activeNode >= 0 && nodes != null && isPlaying) {
      playSound(ctx, filter, osc, volume, nodes, activeNode)
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
  }, isPlaying ? speed : null)

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

    setSpeed(beatsIn44Time)
    setDisplayedBpm(bpm)
  }

  function toggleDefaultKeys() {
    setDefaultKeys(!defaultKeys)
  }

  // Set up signal path
  function setUpSignalPath() {
    if (ctx) {
      if (isSignalSetUp === false) {
        setOsc(ctx.createOscillator())
        setFilter(ctx.createBiquadFilter())
        setVolume(ctx.createGain())
        setIsSignalSetUp(true)
      }
      
      if (isOscStarted === false && osc && isSignalSetUp === true) {
        osc.start()
  
        filter.type = 'lowpass'
        filter.frequency.value = filterValues.frequency
        filter.Q.value = filterValues.q
        filter.connect(volume)
        volume.connect(ctx.destination)

        for (let i = 0; i < samples.length; i++) {
          if (samples[i].audio) {
            for (let j = 0; j < samples[i].audio.length; j++) {
              const src = ctx.createMediaElementSource(samples[i].audio[j])
              src.connect(filter)
            }
          }
        }

        setIsOscStarted(true)
      }
    }
  }

  return (
    <div className='App'>
      <section className='app-container'>
        <StartButton
          ctx={ctx}
          startAudioContext={startAudioContext}
        />
        <ControlPanel
          isPlaying={isPlaying}
          play={setPlaying}
          calculateBpm={calculateBpm}
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
