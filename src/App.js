import React, { useState, useEffect } from 'react';
import MemoryField from './components/MemoryField/MemoryField'
import levelUp from './levels/levelDetails'
import './styles/node.css'
import './styles/field.css'
// import synth from './synth'

function App() {

  const [currentLevel, setCurrentLevel] = useState(4)
  const [speed, setSpeed] = useState(3000)
  const [activeNode, setActiveNode] = useState(-1)

  useEffect(() => {
    setTimeout(() => {
      setActiveNode(0)
    }, 3000)
  }, [currentLevel])

  return (
    <div className="App">
      <MemoryField 
        currentLevel={currentLevel} 
        activeNode={activeNode}
        setActiveNode={setActiveNode}
      />
    </div>
  )
}

export default App;
