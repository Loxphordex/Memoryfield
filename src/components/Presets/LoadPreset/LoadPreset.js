import React, { useEffect, useState } from 'react'
import LoadPresetMenu from './LoadPresetMenu'
import { memoryFieldPresets } from '../../../constants/storageConstants'
import '../../../styles/components/LoadPreset.css'

export default function LoadPreset({
  setNodes,
  presets,
  setPresets
}) {
  const [isMenuShowing, setIsMenuShowing] = useState(false)
  const [isConfirmationShowing, setIsConfirmationShowing] = useState(false)
  const [presetToLoad, setPresetToLoad] = useState(null)
  const [nameOfPreset, setNameOfPreset] = useState(null)
  const toggleShowMenu = () => setIsMenuShowing(!isMenuShowing)

  useEffect(() => {
    const storedPresets = localStorage.getItem(memoryFieldPresets)
    if (storedPresets) {
      setPresets(JSON.parse(storedPresets))
    }
  }, [setPresets])

  function presetItems() {
    let items = []
    if (presets) {
      for (const [key] of Object.entries(presets)) {
        items.push(key)
      }
    }
    return items
  }

  function loadPreset(nodes) {
    if (nodes) {
      setNodes(nodes)
      toggleShowMenu()
      setIsConfirmationShowing(false)
    }
  }

  function confirmLoad() {
    if (presetToLoad && nameOfPreset) {
      return (
        <div className='confirm-load'>
          <h3>{`Load ${nameOfPreset}?`}</h3>
          <button onClick={() => loadPreset(presetToLoad)}>Yes</button>
          <button onClick={() => setIsConfirmationShowing(false)}>No</button>
        </div>
      )
    }
  }

  function setupConfirmation(name) {
    if (name) {
      setNameOfPreset(name)
      setPresetToLoad(presets[name])
      setIsConfirmationShowing(true)
    }
  }

  return (
    <div className='load-preset'>
      <button onClick={toggleShowMenu}>Load</button>
      {isMenuShowing && <LoadPresetMenu
        presetItems={presetItems}
        toggleShowMenu={toggleShowMenu}
        isConfirmationShowing={isConfirmationShowing}
        setupConfirmation={setupConfirmation}
        confirmLoad={confirmLoad}
      />}
    </div>
  )
}