import React, { useState, useEffect } from 'react';
import MemoryField from './components/MemoryField/MemoryField'
import levelUp from './levels/levelDetails'
import './styles/node.css'
import './styles/field.css'
// import synth from './synth'

function App() {

  const [currentLevel, setCurrentLevel] = useState(1)

  return (
    <div className="App">
      <MemoryField currentLevel={currentLevel} />
    </div>
  )
}

export default App;
