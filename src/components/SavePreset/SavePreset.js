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
    presetName
      ? save(presetName)
      : save(new Date())
    setPresetName(null)
    toggleDefaultKeys()
  }

  function save(name) {
    localStorage.setItem(name, JSON.stringify(nodes))
    setPreset(name)
  }

  function toggleInputActive() {
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