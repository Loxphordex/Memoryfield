import React, { useState, useEffect } from 'react';
import MemoryField from './components/MemoryField/MemoryField'
import { getLevel } from './levels/levelDetails'
import ControlPanel from './components/ControlPanel/ControlPanel'
import './styles/node.css'
import './styles/field.css'

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeNode, setActiveNode] = useState(-1)
  const [currentLevel, setCurrentLevel] = useState(10)
  const [nodes, setNodes] = useState(getLevel(currentLevel))
  const [speed, setSpeed] = useState(100)

  // user' guesses
  const [userSelection, setUserSelection] = useState(-1)
  const [correctSelection, setCorrectSelection] = useState(0)

  useEffect(() => {
    if (isPlaying) {
      // Light next node in order in intervals set by 'speed'
      let timeout = setTimeout(() => {
        let nextNode = activeNode + 1
        setActiveNode(nextNode)
      }, speed)
  
      // End play sequence
      if (activeNode >= currentLevel) {
        clearTimeout(timeout)
        setIsPlaying(false)
        setActiveNode(-1)
      }
    }
  }, [activeNode, currentLevel, speed, isPlaying])

  return (
    <div className="App">
      <ControlPanel 
        play={setIsPlaying}
      />
      <MemoryField 
        nodes={nodes}
        activeNode={activeNode}
        setActiveNode={setActiveNode}
        userSelection={userSelection}
        setUserSelection={setUserSelection}
        correctSelection={correctSelection}
        setCorrectSelection={setCorrectSelection}
      />
    </div>
  )
}

export default App;
