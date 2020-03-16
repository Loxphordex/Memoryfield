import React from "react";
import MemoryNode from "./MemoryNode";
import select from '../../user/userSelect/userSelect'

export default function GenerateNodes(props) {
  return (
    <>
      {props.nodes.map(node => {
        return (
          <MemoryNode
            shape={node.shape}
            playOrder={node.playOrder}
            position={node.position}
            color={node.color}
            texture={node.texture}
            sound={node.sound}
            activeNode={props.activeNode}
            setActiveNode={props.setActiveNode}
            userSelection={props.userSelection}
            setUserSelection={props.setUserSelection}
            correctSelection={props.correctSelection}
            setCorrectSelection={props.setCorrectSelection}
            select={select}
          />
        );
      })}
    </>
  );
}
