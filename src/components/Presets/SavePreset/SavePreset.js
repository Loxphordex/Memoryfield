import React, { useState } from 'react'
import SaveControl from './SaveControl'
import { memoryFieldPresets } from '../../../constants/storageConstants' 

export default function SavePreset({
  nodes,
  toggleDefaultKeys,
  setPresets,
  filter,
  displayedBpm,
  nodeSequenceLength,
  setPanelDisplayMode
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
        'q': filter.Q.value,
      },
      displayedBpm, 
      nodes,
      nodeSequenceLength
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
  }

  return (
    <SaveControl
      toggleInputActive={toggleInputActive}
      setPresetName={setPresetName}
      saveNodes={saveNodes}
    />
  )
}