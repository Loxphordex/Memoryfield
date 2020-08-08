import React, { useState } from 'react'
import SaveControl from './SaveControl'

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
    localStorage.setItem(name, JSON.stringify(nodes))
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