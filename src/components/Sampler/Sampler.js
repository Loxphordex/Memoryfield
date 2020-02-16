import { Player } from 'tone'

let sampler = Player("noisecollector_hit4.wav", function() {
    console.log("samples loaded");
})

export default sampler