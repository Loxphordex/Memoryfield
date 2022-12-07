import BounceKick from '../../samples/KickHollowThud.wav'
import DeepKick from '../../samples/DeepKick.wav'
import Snare from '../../samples/SnareQuick.wav'
import DigitalClap from '../../samples/DigitalClap.wav'
import ClosedHat from '../../samples/HiHatClosed2.wav'
import OpenHat from '../../samples/OpenHat.wav'

export async function getAudioSamples(ctx) {
  return [
    {
      name: 'none',
      audio: null
    },
    {
      name: 'Bounce Kick',
      index: 0,
      audio: await createAudioBuffer(BounceKick, ctx)
    },
    {
      name: 'Deep Kick',
      index: 0,
      audio: await createAudioBuffer(DeepKick, ctx)
    },
    {
      name: 'Snare',
      index: 0,
      audio: await createAudioBuffer(Snare, ctx)
    },
    {
      name: 'Digital Clap',
      index: 0,
      audio: await createAudioBuffer(DigitalClap, ctx)
    },
    {
      name: 'Closed Hat',
      index: 0,
      audio: await createAudioBuffer(ClosedHat, ctx)
    },
    {
      name: 'OpenHat',
      index: 0,
      audio: await createAudioBuffer(OpenHat, ctx)
    }
  ]
}

async function createAudioBuffer(url, ctx) {
  const res = await fetch(url)
  const buffer = await res.arrayBuffer()
  const decodedBuffer = await ctx.decodeAudioData(buffer)
  return decodedBuffer
}
