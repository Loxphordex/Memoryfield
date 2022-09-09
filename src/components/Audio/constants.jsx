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
    audio: kick
  },
  {
    name: 'snare',
    audio: snare
  },
  {
    name: 'hat',
    audio: hat
  }
]