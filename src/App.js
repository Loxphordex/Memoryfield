import React, { useState, useEffect } from 'react';
import MemoryField from './components/MemoryField/MemoryField'
import { getLevel } from './levels/levelDetails'
import './styles/node.css'
import './styles/field.css'
// import synth from './synth'

function App() {

  const [currentLevel, setCurrentLevel] = useState(4)
  const [nodes, setNodes] = useState(getLevel(currentLevel))
  const [speed, setSpeed] = useState(2000)
  const [activeNode, setActiveNode] = useState(-1)

  useEffect(() => {
    console.log('activeNode ', activeNode)
    let timeout = setTimeout(() => {
      let nextNode = activeNode + 1
      setActiveNode(nextNode)
    }, speed)

    if (activeNode >= currentLevel) {
      console.log('interval cleared')
      clearTimeout(timeout)
    }
  }, [activeNode])

  return (
    <div className="App">
      <MemoryField 
        nodes={nodes}
        activeNode={activeNode}
        setActiveNode={setActiveNode}
      />
    </div>
  )
}

export default App;
