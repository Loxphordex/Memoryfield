import React from "react";
import MemoryNode from '../MemoryNode/MemoryNode'

export default function MemoryField({
  nodes,
  activeNode,
  setActiveNode,
  nodeEditor,
  setNodeEditor,
  ctx,
  setPanelDisplayMode
}) {
  if (ctx) {
    return (
      <section className='field-container'>
        <section className="memory-field">
          {nodes && nodes.map(node => {
            return (
              <MemoryNode
                shape={node.shape}
                playOrder={node.playOrder}
                position={node.position}
                color={node.color}
                texture={node.texture}
                sound={node.sound}
                active={node.active}
                activeNode={activeNode}
                setActiveNode={setActiveNode}
                nodeEditor={nodeEditor}
                setNodeEditor={setNodeEditor}
                key={node.playOrder}
                wave={node.wave}
                setPanelDisplayMode={setPanelDisplayMode}
              />
            );
          })}
        </section>
      </section>
    )
  }

  return <></>
}
