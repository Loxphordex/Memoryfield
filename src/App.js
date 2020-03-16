import React, { useState, useEffect } from 'react';
import MemoryField from './components/MemoryField/MemoryField'
import { getLevel } from './levels/levelDetails'
import './styles/node.css'
import './styles/field.css'

function App() {

  const [currentLevel, setCurrentLevel] = useState(4)
  const [nodes, setNodes] = useState(getLevel(currentLevel))
  const [speed, setSpeed] = useState(2000)
  const [activeNode, setActiveNode] = useState(-1)

  // user' guesses
  const [userSelection, setUserSelection] = useState(-1)
  const [correctSelection, setCorrectSelection] = useState(0)

  useEffect(() => {
    // Light next node in order in intervals set by 'speed'
    let timeout = setTimeout(() => {
      let nextNode = activeNode + 1
      setActiveNode(nextNode)
    }, speed)

    // End play sequence
    if (activeNode >= currentLevel) {
      clearTimeout(timeout)
    }
  }, [activeNode, currentLevel, speed])

  return (
    <div className="App">
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
