import kick from '../../samples/KickHollowThud.wav'
import snare from '../../samples/SnareQuick.wav'
import hat from '../../samples/HiHatClosed.wav'

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
    name: 'kick',
    index: 0,
    audio: createAudioObjects(kick)
  },
  {
    name: 'snare',
    index: 0,
    audio: createAudioObjects(snare)
  },
  {
    name: 'hat',
    index: 0,
    audio: createAudioObjects(hat)
  }
]

function createAudioObjects(aud) {
  let audioArray = []
  for (let i = 0; i < 8; i++) {
    audioArray.push(new Audio(aud))
  }

  return audioArray
}