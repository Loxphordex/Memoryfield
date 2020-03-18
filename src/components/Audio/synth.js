import { waveforms } from "./constants";

export default function synth(outputLevel, filterFrequency, endTime, ctx) {
  let AudioContext = window.AudioContext || window.webkitAudioContext || null;

  if (AudioContext) {
    // let ctx = new AudioContext();
    let sine = ctx.createOscillator();
    let saw = ctx.createOscillator();
    let square = ctx.createOscillator();
    let filter = ctx.createBiquadFilter();
    let volume = ctx.createGain();
    let now = ctx.currentTime;

    // filter setup
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(filterFrequency, now);

    // sine osc
    sine.type = waveforms.sine;
    sine.start(); // Turn on oscillator
    sine.frequency.value = 400;
    sine.connect(volume); // Hook up to gain node
    sine.stop(endTime)

    // sawtooth osc
    saw.type = waveforms.sawtooth;
    saw.start();
    saw.frequency.value = 523.25;
    saw.connect(volume);
    saw.stop(endTime)

    // square osc
    square.type = waveforms.square;
    square.start();
    square.frequency.value = 698.46;
    square.connect(volume);
    square.stop(endTime)

    // Connect nodes
    volume.gain.value = outputLevel;
    volume.connect(filter);
    filter.connect(ctx.destination);
  } else {
    alert("Sorry, your browser doesn't support JavaScript Web Audio API");
  }
}
