import React, { useState, useEffect, useRef } from 'react'
import MemoryField from './components/MemoryField/MemoryField'
import ControlPanel from './components/ControlPanel/ControlPanel'
import Footer from './components/Footer/Footer'
import StartButton from './components/StartButton/StartButton'
import { filterTypes, samples } from './components/Audio/constants'
import playSound from './components/Audio/playSound'
import { keyShortcuts } from './constants/keyShortcuts'
import { getRandomSequence, getInitialSequence } from './data/sequenceDetails'

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
  const [nodeSequenceLength, setNodeSequenceLength] = useState(16)
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

  const isPlayingRef = useRef(isPlaying)
  const setPlaying = (status) => {
    isPlayingRef.current = status
    setIsPlaying(status)
  }
  const [presets, setPresets] = useState(null)
  const [defaultKeys, setDefaultKeys] = useState(false)
  const [isKeyHandlerSet, setIsKeyHandlerSet] = useState(false)

  // filter.type(filterTypes.lowpass)

  useEffect(() => {
    setUpSignalPath()
    function randomize() {
      setNodes(getRandomSequence(16, nodeSequenceLength))
    }
    const handleKeydownEvents = function(event) {
      if (event) {
        event.stopPropagation()
        event.preventDefault()
      
        if (event.keyCode === keyShortcuts.spacebar) {
          setPlaying(!isPlayingRef.current)
        }
      
        else if (event.keyCode === keyShortcuts.r && randomize) {
          randomize()
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

    // Sequence and looping
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
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
      }, speed)
    } else if (!isPlaying) {
      clearInterval(interval)
      setActiveNode(-1)
    }

    return () => {
      window.removeEventListener('keydown', handleKeydownEvents)
      clearInterval(interval)
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

  function startAudioContext() {
    if (!ctx) {
      AudioContext = window.AudioContext || window.webkitAudioContext || null
      setCtx(new AudioContext)
    }
  }

  function calculateBpm(bpm) {
    bpm = parseInt(bpm, 10)
    const millisecondsPerBeat = (60000 / bpm)
    const beatsIn44Time = millisecondsPerBeat / 4

    setSpeed(beatsIn44Time)
    setDisplayedBpm(bpm)
  }

  function toggleDefaultKeys() {
    setDefaultKeys(!defaultKeys)
  }

  function random() {
    setNodes(getRandomSequence(16, nodeSequenceLength))
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
        console.log('signal path')
  
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
              console.log(src)
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
          displayedBpm={displayedBpm}
          isPlaying={isPlaying}
          play={setPlaying}
          randomize={random}
          calculateBpm={calculateBpm}
          nodes={nodes}
          setNodes={setNodes}
          nodeSequenceLength={nodeSequenceLength}
          setNodeSequenceLength={setNodeSequenceLength}
          nodeEditor={nodeEditor}
          setNodeEditor={setNodeEditor}
          toggleDefaultKeys={toggleDefaultKeys}
          presets={presets}
          setPresets={setPresets}
          ctx={ctx}
          filter={filter}
          setFilter={setFilter}
          setFilterValues={setFilterValues}
        />
        <MemoryField
          nodes={nodes}
          activeNode={activeNode}
          nodeEditor={nodeEditor}
          setActiveNode={setActiveNode}
          setNodeEditor={setNodeEditor}
          ctx={ctx}
        />
      </section>
      <Footer />
    </div>
  )
}

export default App
