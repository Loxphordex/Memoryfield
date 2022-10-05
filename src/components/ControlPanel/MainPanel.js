import React, { useState } from 'react'
import Knob from '../Knob/knob'
import Dropdown from '../Dropdown/Dropdown'
import Presets from '../Presets/Presets'
import '../../styles/components/MainPanel.css'
import { Play, Stop } from 'phosphor-react'

export default function MainPanel({
  playSequence,
  play,
  isPlaying,
  randomize,
  calculateBpm,
  displayedBpm,
  nodeSequenceLength,
  setSequenceAndNodeStatus,
  updateFilterFrequency,
  updateFilterQ,
  nodes,
  toggleDefaultKeys,
  presets,
  setPresets,
  setNodes
}) {

  const [stepToggle, setStepToggle] = useState(false)

  function steps() {
    if (stepToggle) {
      const stepOptions = [8, 9, 10, 11, 12, 13, 14, 15, 16]
      return stepOptions.map((i) => {
        return <li 
          key={`step-option-${i}`}
          className='custom-dropdown-option'
          onClick={() => setSequenceAndCloseToggle(i)}
          >{i}
        </li>
      })
    }

    return <></>
  }

  function setSequenceAndCloseToggle(seq) {
    setSequenceAndNodeStatus(seq)
    setStepToggle(false)
  }

  return (
    <div className='global-controls'>
      {!isPlaying && <button className='control-button' onClick={() => playSequence()}><Play size={36} /></button>}
      {isPlaying && <button className='control-button' onClick={() => play(false)}><Stop size={36} /></button>}
      <button className='control-button' onClick={() => randomize()}>Randomize</button>

      <div className='bmp-knob-container'>
        <Knob
          units='tempo'
          defaultValue={150}
          maxValue={300}
          valueCallback={calculateBpm}
        />
      </div>

      <div className='global-filter-container'>
        <Knob
          units='frequency'
          defaultValue={4000}
          maxValue={6000}
          valueCallback={updateFilterFrequency}
        />
      </div>

      <div className='global-q-container'>
        <Knob
          units='q'
          defaultValue={1}
          maxValue={35}
          valueCallback={updateFilterQ}
        />
      </div>

      {/* <div className='sequence-length-container'>
        <label htmlFor='steps-dropdown' className='global-label sequence-length-container-label'>Steps</label>
        <button className='steps-dropdown' id='steps-dropdown' onClick={() => setStepToggle(!stepToggle)}>{nodeSequenceLength}</button>
        <div className='custom-drop-down-container'>
          <ul className='steps-dropdown-content custom-drop-down'>
            {steps()}
          </ul>
        </div>
      </div> */}

      <Dropdown
        menuLabel='Steps'
        dropdownId='steps-dropdown'
        toggle={stepToggle}
        setToggle={setStepToggle}
        buttonContent={nodeSequenceLength}
        createMenuContent={steps}
      />

      <Presets
        nodes={nodes}
        toggleDefaultKeys={toggleDefaultKeys}
        presets={presets}
        setPresets={setPresets}
        setNodes={setNodes}
      />
    </div>
  )
}