import React from "react";

// Single "button" for memory game
// presentational component containing all styles for current button
// based on level info from levelConstants
export default function MemoryNode({
  shape,
  playOrder,
  position,
  color,
  texture,
  sound,
  activeNode,
  setActiveNode,
  speed,
  userSelection,
  setUserSelection,
  correctSelection,
  setCorrectSelection,
  select
}) {
  return (
    <div
      key={playOrder}
      onClick={e =>
        select(e, setUserSelection, correctSelection, setCorrectSelection)
      }
      className={`memory-node memory-node-${shape} ${active(
        activeNode,
        playOrder,
        color
      )}`}
      id={playOrder}
    />
  );
}

function active(activeNode, playOrder, color) {
  return activeNode === playOrder ? color : "";
}
