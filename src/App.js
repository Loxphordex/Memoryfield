import React, { useState, useEffect, useRef } from "react"
import MemoryField from "./components/MemoryField/MemoryField"
import { getRandomSequence, getInitialSequence } from "./data/sequenceDetails"
import ControlPanel from "./components/ControlPanel/ControlPanel"
import { filterTypes } from './components/Audio/constants'
import playSound from './components/Audio/playSound'
import { keyShortcuts } from './constants/keyShortcuts'
import Footer from './components/Footer/Footer'

// samples
import kick from './samples/KickHollowThud.wav'

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
  const [displayedBpm, setDisplayedBpm] = useState(150)
  const [outputLevel] = useState(0.2)
  const [ctx] = useState(new AudioContext())

  const [volume, setVolume] = useState(null)
  const [osc, setOsc] = useState(null)
  const [filter, setFilter] = useState(null)
  const [isSignalSetUp, setIsSignalSetUp] = useState(false)
  const [isOscStarted, setIsOscStarted] = useState(false)

  const [samplesSetup, setSamplesSetup] = useState(false)
  const [kickSrc, setKickSrc] = useState(false)
  const [kickAudio, setKickAudio] = useState(null)

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
    setUpSamples()
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
        if (activeNode >= 0 && nodes != null && isPlaying) playSound(ctx, filter, osc, volume, nodes, activeNode, kickAudio)
        if (activeNode >= nodeSequenceLength - 1) {
          // reset sequence
          setActiveNode(0)
        } else {
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
    if (isSignalSetUp === false) {
      setOsc(ctx.createOscillator())
      setFilter(ctx.createBiquadFilter())
      setVolume(ctx.createGain())
      setIsSignalSetUp(true)
    }
    
    if (isOscStarted === false && osc && isSignalSetUp === true) {
      osc.start()
      setIsOscStarted(true)

      volume.connect(filter)
      filter.connect(ctx.destination)
    }
  }

  // Set up samples
  function setUpSamples() {
    if (samplesSetup === false) {
      const aud = new Audio(kick)
      setKickAudio(aud)
      setSamplesSetup(true)
    }

    if (samplesSetup === true && kickSrc === false) {
      const kickSource = ctx.createMediaElementSource(kickAudio)
      kickSource.connect(ctx.destination)
      console.log(kickSource)
      console.log(volume)
      setKickSrc(true)
    }
  }

  // function testKick() {
  //   const k = new Audio(kick)
  //   const kSource = ctx.createMediaElementSource(k)
  //   kSource.connect(volume)
  //   k.play()
  // }

  return (
    <div className="App">
      <section className="app-container">
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
        />
        <MemoryField
          nodes={nodes}
          activeNode={activeNode}
          nodeEditor={nodeEditor}
          setActiveNode={setActiveNode}
          setNodeEditor={setNodeEditor}
        />
      </section>
      {/* <button onClick={testKick}>Kick</button> */}
      <Footer />
    </div>
  )
}

export default App
