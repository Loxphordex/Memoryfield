import React, { useEffect } from "react";
import synth from "../Audio/synth";

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
  nodeEditor,
  setNodeEditor,
  select
}) {
  // useEffect(() => {
  //   if (activeNode === playOrder) {
  //     let frequency = Math.floor(Math.random() * 1000)
  //     synth(0.2, frequency, 0.1, ctx)
  //   }
  // }, [activeNode, playOrder, ctx])

  return (
    <div
      key={playOrder}
      onClick={() => setNodeEditor(playOrder)}
      className={`memory-node memory-node-${shape} ${active(
        activeNode,
        playOrder,
        color
      )}
      ${editing(playOrder, nodeEditor)}`}
      id={playOrder}
    />
  );
}

function active(activeNode, playOrder, color) {
  return activeNode === playOrder ? color : "";
}

function editing(playOrder, nodeEditor) {
  return playOrder === nodeEditor ? "editing" : "";
}
