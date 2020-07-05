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
    if (nodes) {
      setNodesClone([...nodes])
    }
    if (selectedNode && selectedNode.note) {
      setDisplayedNote(selectedNode.note.note)
    } else {
      setDisplayedNote(defaultNote.note)
    }
  }, [selectedNode, defaultNote.note, nodes])

  if (nodes && nodeEditor != null) {

    // amount: the number of notes to increment
    function changeNote(amount) {
      if (selectedNode && selectedNode.note) {
        const targetIndex = selectedNode.note.index + amount
        const targetNote = notes[targetIndex]
        if (targetNote) {
          selectedNode.note = targetNote
          setNodes(nodesClone)
          setDisplayedNote(selectedNode.note.note)
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
