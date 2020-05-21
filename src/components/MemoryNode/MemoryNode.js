import React from "react";

export default function MemoryNode({
  shape,
  playOrder,
  color,
  active,
  activeNode,
  nodeEditor,
  setNodeEditor
}) {
  return (
    <div
      key={playOrder}
      onClick={() => setNodeEditor(playOrder)}
      className={`memory-node memory-node-${shape} node-is-active-${active} 
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
