import React from 'react'

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

    return (
      <div className='note-switch'>
        <button 
          onClick={() => changeNote(-1)}
          className='prev-note note-switch-button'>{'<'}</button>
        <div className='note-display'>{selectedNode.note.note || defaultNote}</div>
        <button 
          onClick={() => changeNote(1)}
          className='next-note note-switch-button'>{'>'}</button>
      </div>
    )
  }
  return <></>
}

