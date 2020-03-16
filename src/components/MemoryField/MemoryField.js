import React from "react";
import GenerateNodes from "../MemoryNode/GenerateNodes";

// Presents memory nodes and level info
export default function MemoryField({
  nodes,
  activeNode,
  setActiveNode,
  userSelection,
  setUserSelection,
  correctSelection,
  setCorrectSelection
}) {
  return (
    <section className='field-container'>
      <section className="memory-field">
        {nodes && <GenerateNodes
          nodes={nodes}
          activeNode={activeNode}
          setActiveNode={setActiveNode}
          userSelection={userSelection}
          setUserSelection={setUserSelection}
          correctSelection={correctSelection}
          setCorrectSelection={setCorrectSelection}
        />}
      </section>
    </section>
  );
}
