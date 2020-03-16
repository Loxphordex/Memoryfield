import React from "react";

export default function ControlPanel({ play, randomize }) {
  return (
    <section className="control-panel">
      <button onClick={() => play(true)}>Play</button>
      <button onClick={() => play(false)}>Stop</button>
      <button onClick={() => randomize()}>Randomize</button>
    </section>
  );
}
