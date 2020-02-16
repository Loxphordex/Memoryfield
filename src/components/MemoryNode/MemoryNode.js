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
  sound
}) {
  return (
    <div className={`memory-node memory-node-${shape} ${color}`} />
  )
}
