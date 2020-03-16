import React, { useState, useEffect } from 'react';
import MemoryField from './components/MemoryField/MemoryField'
import { getLevel } from './levels/levelDetails'
import ControlPanel from './components/ControlPanel/ControlPanel'
import './styles/container.css'
import './styles/control.css'
import './styles/node.css'
import './styles/field.css'

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeNode, setActiveNode] = useState(-1)
  const [currentLevel, setCurrentLevel] = useState(10)
  const [nodes, setNodes] = useState(null)
  const [speed, setSpeed] = useState(100)

  // user' guesses
  const [userSelection, setUserSelection] = useState(-1)
  const [correctSelection, setCorrectSelection] = useState(0)

  useEffect(() => {
    let timeout
    if (isPlaying) {
      // Light next node in order in intervals set by 'speed'
      timeout = setTimeout(() => {
        if (activeNode >= currentLevel) {
          // clearTimeout(timeout)
          // setIsPlaying(false)
          setActiveNode(0)
        } else {
          let nextNode = activeNode + 1
          setActiveNode(nextNode)
        }
      }, speed)
  
    } else {
      clearTimeout(timeout)
      setActiveNode(-1)
    }
  }, [activeNode, currentLevel, speed, isPlaying])

  function randomize() {
    setNodes(getLevel(currentLevel))
  }

  return (
    <div className="App">
      <section className='app-container'>
        <ControlPanel 
          play={setIsPlaying}
          randomize={randomize}
        />
        { nodes && <MemoryField 
          nodes={nodes}
          activeNode={activeNode}
          setActiveNode={setActiveNode}
          userSelection={userSelection}
          setUserSelection={setUserSelection}
          correctSelection={correctSelection}
          setCorrectSelection={setCorrectSelection}
        /> }
      </section>
    </div>
  )
}

export default App;
