import React, { useEffect } from "react";
import synth from '../Audio/synth'

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

  useEffect(() => {
    if (activeNode == playOrder) {
      let frequency = Math.floor(Math.random() * 1000)
      synth(1, frequency, 0.1)
    }
  }, [activeNode, playOrder])

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
