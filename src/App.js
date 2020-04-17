import React, { useState, useEffect } from "react";
import MemoryField from "./components/MemoryField/MemoryField";
import { getSequence } from "./data/sequenceDetails";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import { waveforms } from "./components/Audio/constants";

// styles
import "./styles/container.css";
import "./styles/control.css";
import "./styles/node.css";
import "./styles/colors.css"
import "./styles/field.css";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNode, setActiveNode] = useState(-1);
  const [nodeEditor, setNodeEditor] = useState(null);
  const [nodes, setNodes] = useState(null);
  const [speed, setSpeed] = useState(1000);
  const [outputLevel, setOutputLevel] = useState(0.2);

  // user' guesses
  const [userSelection, setUserSelection] = useState(-1);
  const [correctSelection, setCorrectSelection] = useState(0);

  let AudioContext = window.AudioContext || window.webkitAudioContext || null;
  let ctx = new AudioContext();
  let osc = ctx.createOscillator();
  let filter = ctx.createBiquadFilter();
  let volume = ctx.createGain();
  // sine.type = waveforms.sine;
  filter.type = "lowpass";

  useEffect(() => {
    if (activeNode >= 0 && nodes != null && isPlaying) {
      if (AudioContext) {
        // let ctx = new AudioContext()
        let now = ctx.currentTime;
        let currentNode = nodes[activeNode];
        let freq = currentNode.note.frequency;
        let wave = currentNode.wave;
        let end = currentNode.endtime;

        // filter setup
        filter.frequency.setValueAtTime(currentNode.filterFrequency, now);

        osc.type = wave
        osc.start();
        osc.frequency.value = freq;
        osc.connect(volume)
        osc.stop(end)

        // // sine osc
        // sine.start(); // Turn on oscillator
        // sine.frequency.value = 400;
        // sine.connect(volume); // Hook up to gain node
        // sine.stop(currentNode.endTime);

        // // sawtooth osc
        // saw.start();
        // saw.frequency.value = 523.25;
        // saw.connect(volume);
        // saw.stop(currentNode.endtime);

        // // square osc
        // square.start();
        // square.frequency.value = 698.46;
        // square.connect(volume);
        // square.stop(currentNode.endtime);

        // Connect nodes
        volume.gain.value = outputLevel;
        volume.connect(filter);
        filter.connect(ctx.destination);
      } else {
        alert("Sorry, your browser doesn't support JavaScript Web Audio API");
      }
    }

    let timeout;
    if (isPlaying) {
      // Light next node in order in intervals set by 'speed'
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

  function calculateBpm(speedSetting) {
    let fixedBpm = 7500 - speedSetting;
    setSpeed(fixedBpm);
    // setSpeed(speedSetting)
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
          userSelection={userSelection}
          setNodeEditor={setNodeEditor}
          setUserSelection={setUserSelection}
          correctSelection={correctSelection}
          setCorrectSelection={setCorrectSelection}
        />
      </section>
    </div>
  );
}

export default App;
