import React, { useState } from 'react'
import NoteSwitch from './NoteSwitch'

export default function NoteControls({
  nodes,
  setNodes,
  nodeEditor,
  notes
}) {
  const [nodesClone, setNodesClone] = useState(null)
  const [selectedNode, setSelectedNode] = useState(null)
  const [defaultNote] = useState(notes[40])

  if (nodes && nodeEditor != null) {
    if (selectedNode === null && nodesClone != null) {
      setNodesClone([...nodes])
      setSelectedNode(nodesClone[nodeEditor])
    }

    // amount: the number of notes to increment
    function changeNote(amount) {
      if (selectedNode && selectedNode.note) {
        const targetIndex = selectedNode.note.index + amount
        const targetNote = notes[targetIndex]
        if (targetNote) {
            selectedNode.note = targetNote
            setNodes(nodesClone)
        }
      }
    }

    function displayNote() {
      return selectedNode && selectedNode.note ? selectedNode.note.note : defaultNote.note
    }

    return (
      <NoteSwitch
        changeNote={changeNote}
        displayNote={displayNote} 
      />
    )
  }
  return <></>
}

