import React from 'react'
import NoteSwitch from './NoteSwitch'

export default function NoteControls({
  nodes,
  setNodes,
  nodeEditor,
  notes
}) {
  if (nodes && nodeEditor != null) {
    const nodesClone = [...nodes]
    const selectedNode = nodesClone[nodeEditor]
    const defaultNote = notes[40]

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

