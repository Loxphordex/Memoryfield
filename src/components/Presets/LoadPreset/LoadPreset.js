import React, { useEffect, useState } from 'react'
import LoadPresetMenu from './LoadPresetMenu'
import { memoryFieldPresets } from '../../../constants/storageConstants'

export default function LoadPreset({
  setNodes,
  presets,
  setPresets
}) {
  const [isMenuShowing, setIsMenuShowing] = useState(false)
  const toggleShowMenu = () => setIsMenuShowing(!isMenuShowing)

  useEffect(() => {
    const storedPresets = localStorage.getItem(memoryFieldPresets)
    if (storedPresets) {
      setPresets(JSON.parse(storedPresets))
    }
  }, [setPresets])

  return (
    <div className='load-preset'>
      <button onClick={toggleShowMenu}>Load</button>
      {isMenuShowing && <LoadPresetMenu presets={presets} />}
    </div>
  )
}