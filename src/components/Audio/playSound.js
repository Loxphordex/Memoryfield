let AudioContext = 
    window.AudioContext // JavaScript Web Audio API
    || window.webkitAudioContext // Safari and older versions of Chrome
    || null;

let playSound

if (AudioContext) {
    let context = new AudioContext()
    playSound = (frequency, type, duration) => {
        const osc = context.createOscillator()
        const gain = context.createGain()
        const now = context.currentTime()
        
        osc.type = type
        osc.connect(gain)
        osc.frequency.value = frequency

        
    }
}
else {
    alert('Sorry, your browser doesn\'t support JavaScript Web Audio API.')
}

export default playSound