import React from "react";
import MemoryNode from '../MemoryNode/MemoryNode'
import { sampleColors } from "../../data/data";

export default function MemoryField({
  nodes,
  setNodes,
  activeNode,
  ctx,
  selectedSample
}) {
  if (ctx) {
    return (
      <section className='field-container'>
        <section className="memory-field">
          {nodes && nodes.map(node => {
            return (
              <MemoryNode
                nodes={nodes}
                setNodes={setNodes}
                playOrder={node.playOrder}
                position={node.position}
                color={node.color}
                isInSequence={node.active}
                currentNodePlayingIndex={activeNode}
                key={node.playOrder}
                selectedSample={selectedSample}
                sampleColors={sampleColors}
              />
            );
          })}
        </section>
      </section>
    )
  }

  return <></>
}
