import React, { useEffect, useState } from 'react'
import NoteSwitch from './NoteSwitch'

export default function NoteControls({
  nodes,
  setNodes,
  nodeEditor,
  notes,
  selectedNode
}) {
  const [nodesClone, setNodesClone] = useState(null)
  const [defaultNote] = useState(notes[40])
  const [displayedNote, setDisplayedNote] = useState(null)

  useEffect(() => {
    if (selectedNode && selectedNode.note) {
      setDisplayedNote(selectedNode.note.note)
    } else {
      setDisplayedNote(defaultNote.note)
    }
  }, [selectedNode, defaultNote.note])

  if (nodes && nodeEditor != null) {
    if (nodesClone === null) {
      setNodesClone([...nodes])
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

    return (
      <NoteSwitch
        changeNote={changeNote}
        displayedNote={displayedNote}
      />
    )
  }
  return <></>
}
