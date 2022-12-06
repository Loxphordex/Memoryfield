import React, { useEffect, useState } from 'react'
import LoadPresetMenu from './LoadPresetMenu'
import { memoryFieldPresets } from '../../../constants/storageConstants'
import '../../../styles/components/LoadPreset.css'

export default function LoadPreset({
  setNodes,
  presets,
  setPresets,
  filter,
  calculateBpm,
  setPanelDisplayMode,
  setNodeSequenceLength,
  defaultFilterValues,
  setDefaultFilterValues,
  samples
}) {
  const [isConfirmationShowing, setIsConfirmationShowing] = useState(false)
  const [presetToLoad, setPresetToLoad] = useState(null)
  const [nameOfPreset, setNameOfPreset] = useState(null)

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

  function loadNodes(nodes) {
    if (nodes) {
      for (let i = 0; i < nodes.length; i++) {
        const current = nodes[i]
        if (current.sample && current.sample.name) {
          current.sample = samples.find(x => x.name === current.sample.name)
        }
      }

      setNodes(nodes)
    }
  }

  function loadFilter(filterPreset) {
    // if the user loads a preset with the same filter values as the previous preset
    // then we need to set the state twice in order to move the knobs
    if (defaultFilterValues.frequency === filterPreset.frequency || defaultFilterValues.q === filterPreset.q) {
      resetFilter(filterPreset.frequency + 0.1, filterPreset.q + 0.1)
      setTimeout(() => {
        resetFilter(filterPreset.frequency, filterPreset.q)
      }, 1);
    }
    else {
      resetFilter(filterPreset.frequency, filterPreset.q)
    }
  }

  function resetFilter(freq, q) {
    q = Math.floor(q)
    filter.frequency.value = freq
    filter.Q.value = q
    setDefaultFilterValues({
      frequency: freq,
      q: q
    })
  }

  function loadPreset(preset) {
    // set nodes, tempo, steps, and filter
    loadNodes(preset.nodes)
    calculateBpm(preset.displayedBpm)
    setNodeSequenceLength(preset.nodeSequenceLength)
    loadFilter(preset.filter)

    // close preset confirmation and return to default control panel view
    setIsConfirmationShowing(false)
    setPanelDisplayMode(null)
  }

  function deletePreset() {
    delete presets[nameOfPreset]
    localStorage.setItem(memoryFieldPresets, JSON.stringify(presets))
    setPresets(presets)
    setIsConfirmationShowing(false)
  }

  function confirmLoad() {
    if (presetToLoad && nameOfPreset) {
      return (
        <div className='confirm-load'>
          <h3>{nameOfPreset}</h3>
          <button className='display-panel-button' onClick={() => loadPreset(presetToLoad)}>Load</button>
          <button className='display-panel-button' onClick={deletePreset}>Delete</button>
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
      <LoadPresetMenu
        presetItems={presetItems}
        isConfirmationShowing={isConfirmationShowing}
        setupConfirmation={setupConfirmation}
        confirmLoad={confirmLoad}
      />
    </div>
  )
}