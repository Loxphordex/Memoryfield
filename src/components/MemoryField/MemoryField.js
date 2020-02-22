import React from "react";
import { getLevel } from "../../levels/levelDetails";
import GenerateNodes from "../MemoryNode/GenerateNodes";

// Presents memory nodes and level info
export default function MemoryField({nodes, activeNode, setActiveNode}) {
  // console.log('currentLevel:', currentLevel)
  // console.log('activeNode:', activeNode)
  return (
    <section className="memory-field">
      <GenerateNodes 
        nodes={nodes} 
        activeNode={activeNode}
        setActiveNode={setActiveNode}
      />
    </section>
  );
}
