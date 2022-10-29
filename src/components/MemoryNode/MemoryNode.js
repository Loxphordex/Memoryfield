import React from 'react'
import { panelMode } from '../Audio/constants'

export default function MemoryNode({
  shape,
  playOrder,
  color,
  active,
  activeNode,
  nodeEditor,
  setNodeEditor,
  wave,
  setPanelDisplayMode
}) {
  function toggleNodeEditor() {
    if (nodeEditor === playOrder) {
      setNodeEditor(null)
      setPanelDisplayMode(null)
    } else {
      setNodeEditor(playOrder)
      setPanelDisplayMode(panelMode.node)
    }
  }
  return (
    <div
      key={playOrder}
      onClick={() => toggleNodeEditor()}
      className={`memory-node memory-node-${wave} node-is-active-${active} 
        ${nodeIsActive(
          activeNode,
          playOrder,
          color
        )}
      ${editing(playOrder, nodeEditor)}`}
      id={playOrder}
    />
  );
}

function nodeIsActive(activeNode, playOrder, color) {
  return activeNode === playOrder ? color : `not-playing-${color}`;
}

function editing(playOrder, nodeEditor) {
  return playOrder === nodeEditor ? "editing" : "";
}
