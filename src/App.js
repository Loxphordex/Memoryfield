import React, { useState, useEffect } from "react";
import MemoryField from "./components/MemoryField/MemoryField";
import { getSequence } from "./data/sequenceDetails";
import ControlPanel from "./components/ControlPanel/ControlPanel";

// styles
import "./styles/container.css";
import "./styles/control.css";
import "./styles/node.css";
import "./styles/colors.css"
import "./styles/field.css";

function App() {
  // Set up Audio Context
  const AudioContext = window.AudioContext || window.webkitAudioContext || null;

  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNode, setActiveNode] = useState(-1);
  const [nodeEditor, setNodeEditor] = useState(null);
  const [nodes, setNodes] = useState(null);
  const [speed, setSpeed] = useState(150);
  const [outputLevel] = useState(0.2);
  const [ctx] = useState(new AudioContext())

  let osc = ctx.createOscillator();
  let filter = ctx.createBiquadFilter();
  let volume = ctx.createGain();
  filter.type = "lowpass";

  useEffect(() => {
    if (activeNode >= 0 && nodes != null && isPlaying) {
      if (AudioContext) {
        let now = ctx.currentTime;
        let currentNode = nodes[activeNode];
        let freq = currentNode.note.frequency;
        let wave = currentNode.wave;
        let end = now + currentNode.endtime;

        // filter setup
        filter.frequency.setValueAtTime(currentNode.filterFrequency, now);

        osc.type = wave
        osc.start();
        osc.frequency.value = freq;
        osc.connect(volume)
        osc.stop(end)

        // envelope
        volume.gain.cancelScheduledValues(now)
        volume.gain.setValueAtTime(volume.gain.value, now);
        volume.gain.linearRampToValueAtTime(0.1, now + 0.05);
        volume.gain.linearRampToValueAtTime(0, now + 0.1);

        // Connect nodes
        // volume.gain.value = outputLevel;
        volume.connect(filter);
        filter.connect(ctx.destination);
      } else {
        alert("Sorry, your browser doesn't support JavaScript Web Audio API");
      }
    }

    // Sequence and looping
    let timeout;
    if (isPlaying) {
      timeout = setTimeout(() => {
        if (activeNode >= nodes.length - 1) {
          setActiveNode(0);
        } else {
          let nextNode = activeNode + 1;
          setActiveNode(nextNode);
        }
      }, speed);
    } else {
      clearTimeout(timeout);
      setActiveNode(-1);
    }
  }, [activeNode, speed, isPlaying, nodes, AudioContext, ctx, outputLevel, filter, volume, osc]);

  function randomize() {
    setNodes(getSequence(16));
  }

  function calculateBpm(bpm) {
    setSpeed((60_000 / bpm).toFixed())
  }

  return (
    <div className="App">
      <section className="app-container">
        <ControlPanel
          speed={speed}
          play={setIsPlaying}
          randomize={randomize}
          calculateBpm={calculateBpm}
          nodes={nodes}
          setNodes={setNodes}
          nodeEditor={nodeEditor}
          setNodeEditor={setNodeEditor}
        />
        <MemoryField
          nodes={nodes}
          activeNode={activeNode}
          nodeEditor={nodeEditor}
          setActiveNode={setActiveNode}
          setNodeEditor={setNodeEditor}
        />
      </section>
    </div>
  );
}

export default App;
