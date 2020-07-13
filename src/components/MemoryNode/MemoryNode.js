import React from "react";

export default function MemoryNode({
  shape,
  playOrder,
  color,
  active,
  activeNode,
  nodeEditor,
  setNodeEditor,
  wave
}) {
  function toggleNodeEditor() {
    if (nodeEditor === playOrder) {
      setNodeEditor(null)
    } else {
      setNodeEditor(playOrder)
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
  return activeNode === playOrder ? color : "";
}

function editing(playOrder, nodeEditor) {
  return playOrder === nodeEditor ? "editing" : "";
}
