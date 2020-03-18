import React, { useState, useEffect } from "react";
import MemoryField from "./components/MemoryField/MemoryField";
import { getLevel } from "./levels/levelDetails";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import { waveforms } from "./components/Audio/constants";

// styles
import "./styles/container.css";
import "./styles/control.css";
import "./styles/node.css";
import "./styles/field.css";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNode, setActiveNode] = useState(-1);
  const [currentLevel, setCurrentLevel] = useState(10);
  const [nodes, setNodes] = useState(null);
  const [speed, setSpeed] = useState(1000);
  const [outputLevel, setOutputLevel] = useState(0.2);

  // user' guesses
  const [userSelection, setUserSelection] = useState(-1);
  const [correctSelection, setCorrectSelection] = useState(0);

  let AudioContext = window.AudioContext || window.webkitAudioContext || null;
  let ctx = new AudioContext();
  let sine = ctx.createOscillator();
  let saw = ctx.createOscillator();
  let square = ctx.createOscillator();
  let filter = ctx.createBiquadFilter();
  let volume = ctx.createGain();
  sine.type = waveforms.sine;
  saw.type = waveforms.sawtooth;
  square.type = waveforms.square;
  filter.type = "lowpass";

  useEffect(() => {
    if (activeNode >= 0 && nodes != null) {
      if (AudioContext) {
        // let ctx = new AudioContext()
        let now = ctx.currentTime
        console.log(ctx)
        let currentNode = nodes[activeNode];
        console.log(currentNode)

        // filter setup
        filter.frequency.setValueAtTime(currentNode.filterFrequency, now);

        // sine osc
        sine.start(); // Turn on oscillator
        console.log('sine started', now)
        sine.frequency.value = 400;
        sine.connect(volume); // Hook up to gain node
        sine.stop(currentNode.endTime);
        console.log('sine ended', currentNode.endtime)

        // sawtooth osc
        saw.start();
        saw.frequency.value = 523.25;
        saw.connect(volume);
        saw.stop(currentNode.endtime);

        // square osc
        square.start();
        square.frequency.value = 698.46;
        square.connect(volume);
        square.stop(currentNode.endtime);

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
        if (activeNode >= currentLevel - 1) {
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
  }, [
    activeNode,
    currentLevel,
    speed,
    isPlaying,
    nodes,
    AudioContext,
    ctx,
    outputLevel,
    filter,
    sine,
    volume,
    saw,
    square
  ]);

  function randomize() {
    setNodes(getLevel(currentLevel));
  }

  return (
    <div className="App">
      <section className="app-container">
        <ControlPanel play={setIsPlaying} randomize={randomize} />
        {nodes && (
          <MemoryField
            nodes={nodes}
            activeNode={activeNode}
            setActiveNode={setActiveNode}
            userSelection={userSelection}
            setUserSelection={setUserSelection}
            correctSelection={correctSelection}
            setCorrectSelection={setCorrectSelection}
          />
        )}
      </section>
    </div>
  );
}

export default App;
