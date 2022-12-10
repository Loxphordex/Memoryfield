import BounceKick from '../../samples/KickHollowThud.wav'
import DeepKick from '../../samples/DeepKick.wav'
import Snare from '../../samples/SnareQuick.wav'
import DigitalClap from '../../samples/DigitalClap.wav'
import ClosedHat from '../../samples/HiHatClosed2.wav'
import OpenHat from '../../samples/OpenHat.wav'

export async function getAudioSamples(ctx) {
  return [
    {
      name: 'Bounce Kick',
      audio: await createAudioBuffer(BounceKick, ctx)
    },
    {
      name: 'Deep Kick',
      audio: await createAudioBuffer(DeepKick, ctx)
    },
    {
      name: 'Snare',

      audio: await createAudioBuffer(Snare, ctx)
    },
    {
      name: 'Digital Clap',
      audio: await createAudioBuffer(DigitalClap, ctx)
    },
    {
      name: 'Closed Hat',
      audio: await createAudioBuffer(ClosedHat, ctx)
    },
    {
      name: 'Open Hat',
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
