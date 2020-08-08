import React from 'react'
import SavePreset from './SavePreset/SavePreset'
import LoadPreset from './LoadPreset/LoadPreset'

export default function Presets({
  nodes,
  setPresetName,
  toggleDefaultKeys,
  presets,
  setPresets,
  setNodes
}) {
  return (
    <div className='presets-container'>
      <SavePreset
        nodes={nodes}
        setPreset={setPresetName}
        toggleDefaultKeys={toggleDefaultKeys}
        setPresets={setPresets}
      />
      <LoadPreset
        setNodes={setNodes}
        presets={presets}
        setPresets={setPresets}
      />
    </div>
  )
}