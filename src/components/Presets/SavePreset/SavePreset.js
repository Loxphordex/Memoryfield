import React, { useState } from 'react'
import SaveControl from './SaveControl'
import { memoryFieldPresets } from '../../../constants/storageConstants'
import { panelMode } from '../../Audio/constants'

export default function SavePreset({
  nodes,
  toggleDefaultKeys,
  setPresets,
  filter,
  displayedBpm,
  nodeSequenceLength,
  setPanelDisplayMode,
  pitch
}) {
  const [presetName, setPresetName] = useState('')

  function saveNodes() {
    if (presetName) {
      save(presetName)
    } else {
      save(new Date())
    }
    toggleInputActive()
  }

  function save(name) {
    const newPreset = {
      filter: {
        'frequency': filter.frequency.value,
        'q': roundValue(filter.Q.value),
      },
      displayedBpm, 
      nodes,
      nodeSequenceLength,
      pitch
    }
    const existingPresets = localStorage.getItem(memoryFieldPresets)
    let unwrappedPresets
    
    existingPresets
      ? unwrappedPresets = JSON.parse(existingPresets)
      : unwrappedPresets = {}

    unwrappedPresets[name] = newPreset
    localStorage.setItem(memoryFieldPresets, JSON.stringify(unwrappedPresets))
    
    setPresets(JSON.parse(localStorage.getItem(memoryFieldPresets)))
    setPanelDisplayMode(null)
  }

  function toggleInputActive() {
    setPresetName(null)
    toggleDefaultKeys()
    setPanelDisplayMode(panelMode.node)
  }

  function roundValue(val) {
    if (String(val).length > 5) {
      return Math.round(val * 100) / 100
    }
  }

  return (
    <SaveControl
      toggleInputActive={toggleInputActive}
      setPresetName={setPresetName}
      saveNodes={saveNodes}
      setPanelDisplayMode={setPanelDisplayMode}
    />
  )
}