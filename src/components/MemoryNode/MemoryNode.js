import React, { useState, useEffect } from 'react'

export default function MemoryNode({
  nodes,
  setNodes,
  playOrder,
  isInSequence,
  currentNodePlayingIndex,
  selectedSample,
  sampleColors,
  index
}) {
  // "Activated" means "is the current sample selected for this node"
  const [isNodeActivated, setIsNodeActivated] = useState(false)
  const [color, setColor] = useState('not-playing-default')

  useEffect(() => {
    if (selectedSample
        && !!nodes[playOrder].samples
        && nodes[playOrder].samples.find(i => i.name === selectedSample.name)) {
      setIsNodeActivated(true)
      setColor(`not-playing-${sampleColors[selectedSample.name.replace(/\s/g, '')]}`)
    }

    else {
      setIsNodeActivated(false)
      setColor('not-playing-default')
    }
  }, [selectedSample])

  useEffect(() => {
    if (!isNodeActivated) {
      if (currentNodePlayingIndex === playOrder) {
        setColor(sampleColors.playDefault)
      }
  
      else {
        setColor('not-playing-default')
      }
    }

    else if (isNodeActivated) {
      if (currentNodePlayingIndex === playOrder) {
        setColor(sampleColors[selectedSample.name.replace(/\s/g, '')])
      }

      else {
        setColor(`not-playing-${sampleColors[selectedSample.name.replace(/\s/g, '')]}`)
      }
    }
  }, [currentNodePlayingIndex, isNodeActivated])

  function handleSampleSelection() {
    if (selectedSample && isInSequence) {

      // if node is not already selected for current step, add it to the array containing the nodes for the current step
      if (!isNodeActivated) {
        nodes[playOrder].samples.push(selectedSample)
        setIsNodeActivated(true)
        setColor(`not-playing-${sampleColors[selectedSample.name.replace(/\s/g, '')]}`)
        setNodes([...nodes])
      }
  
      // if node is already selected for current step, unselect it
      else {
        nodes[playOrder].samples.splice(nodes[playOrder].samples.indexOf(selectedSample), 1)
        setIsNodeActivated(false)
        setNodes([...nodes])
        setColor('not-playing-default')
      }
    }
  }

  function getRow() {
    let rowNum
    rowNum = Math.floor((index + 4) / 4)

    return `node-row-${rowNum}`
  }

  return (
    <div
      key={`node-${playOrder}`}
      onClick={handleSampleSelection}
      className={`memory-node node-is-active-${isInSequence} ${color} ${getRow()}`}
      id={`memory-node-${playOrder}`}
    />
  );
}
