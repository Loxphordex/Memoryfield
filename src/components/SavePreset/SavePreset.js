import React, { useState } from 'react'
import SaveControl from './SaveControl'
import { memoryFieldPresets } from '../../constants/storageConstants' 

export default function SavePreset({
  nodes,
  setPreset,
  toggleDefaultKeys
}) {
  const [presetName, setPresetName] = useState('')
  const [saveInputActive, setSaveInputActive] = useState(false)

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
      localStorage.setItem(memoryFieldPresets, existingPresets + JSON.stringify({[name]: nodes}))
    } else {
      localStorage.setItem(memoryFieldPresets, JSON.stringify({[name]: nodes}))
    }
    setPreset(name)
  }

  function toggleInputActive() {
    setPresetName(null)
    toggleDefaultKeys()
    setSaveInputActive(!saveInputActive)
  }

  return (
    <SaveControl
      toggleInputActive={toggleInputActive}
      saveInputActive={saveInputActive}
      setPresetName={setPresetName}
      saveNodes={saveNodes}
    />
  )
}