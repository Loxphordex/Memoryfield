import React, { useEffect } from "react";

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
  speed
}) {
  return (
    <div
      key={playOrder}
      className={`memory-node memory-node-${shape} ${active(
        activeNode,
        playOrder,
        color
      )}`}
    />
  );
}

function active(activeNode, playOrder, color) {
  return activeNode === playOrder ? color : "";
}
