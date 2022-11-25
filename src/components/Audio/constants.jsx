import BounceKick from '../../samples/KickHollowThud.wav'
import DeepKick from '../../samples/DeepKick.wav'
import Snare from '../../samples/SnareQuick.wav'
import DigitalClap from '../../samples/DigitalClap.wav'
import ClosedHat from '../../samples/HiHatClosed2.wav'
import OpenHat from '../../samples/OpenHat.wav'

export const waveforms = [
  'sine',
  'triangle',
  'square'
]

export const filterTypes = {
  lowpass: 'lowpass',
  highpass: 'highpass'
}

export const samples = [
  {
    name: 'none',
    audio: null
  },
  {
    name: 'Bounce Kick',
    index: 0,
    audio: createAudioObjects(BounceKick)
  },
  {
    name: 'Deep Kick',
    index: 0,
    audio: createAudioObjects(DeepKick)
  },
  {
    name: 'Snare',
    index: 0,
    audio: createAudioObjects(Snare)
  },
  {
    name: 'Digital Clap',
    index: 0,
    audio: createAudioObjects(DigitalClap)
  },
  {
    name: 'Closed Hat',
    index: 0,
    audio: createAudioObjects(ClosedHat)
  },
  {
    name: 'OpenHat',
    index: 0,
    audio: createAudioObjects(OpenHat)
  }
]

export const panelMode = {
  node: 'node',
  steps: 'steps',
  savePreset: 'savePreset',
  loadPreset: 'loadPreset'
}

function createAudioObjects(aud) {
  let audioArray = []
  for (let i = 0; i < 8; i++) {
    audioArray.push(new Audio(aud))
  }

  return audioArray
}