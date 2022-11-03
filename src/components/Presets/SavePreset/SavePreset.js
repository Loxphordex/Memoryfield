import React, { useState } from 'react'
import SaveControl from './SaveControl'
import { memoryFieldPresets } from '../../../constants/storageConstants' 

export default function SavePreset({
  nodes,
  toggleDefaultKeys,
  setPresets,
  filter,
  tempo
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
    const existingPresets = localStorage.getItem(memoryFieldPresets)
    if (existingPresets) {
      const unwrappedPresets = JSON.parse(existingPresets)
      unwrappedPresets[name] = { 
        'frequency': filter.frequency.value,
        'q': filter.Q.value,
        tempo, 
        nodes }
      localStorage.setItem(memoryFieldPresets, JSON.stringify(unwrappedPresets))
    } else {
      localStorage.setItem(memoryFieldPresets, JSON.stringify({[name]: {'frequency': filter.frequency.value, 'q': filter.Q.value, tempo, nodes}}))
    }
    setPresets(JSON.parse(localStorage.getItem(memoryFieldPresets)))
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