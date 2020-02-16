import React from "react";
import MemoryNode from "./MemoryNode";

export default function GenerateNodes(container) {
  return (
    <>
      {container.nodes.map(node => {
        return (
          <MemoryNode
            shape={node.shape}
            playOrder={node.playOrder}
            position={node.position}
            color={node.color}
            texture={node.texture}
            sound={node.sound}
          />
        );
      })}
    </>
  );
}
