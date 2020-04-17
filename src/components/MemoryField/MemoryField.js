import React from "react";
import GenerateNodes from "../MemoryNode/GenerateNodes";

// Presents memory nodes and level info
export default function MemoryField({
  nodes,
  activeNode,
  setActiveNode,
  nodeEditor,
  setNodeEditor
}) {
  return (
    <section className='field-container'>
      <section className="memory-field">
        {nodes && <GenerateNodes
          nodes={nodes}
          activeNode={activeNode}
          setActiveNode={setActiveNode}
          nodeEditor={nodeEditor}
          setNodeEditor={setNodeEditor}
        />}
      </section>
    </section>
  );
}
