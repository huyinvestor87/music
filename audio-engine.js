const SEMITONES={C:0,'C#':1,D:2,'D#':3,E:4,F:5,'F#':6,G:7,'G#':8,A:9,'A#':10,B:11};
function frequency(pitch){const m=pitch.match(/^([A-G]#?)(-?\d)$/);if(!m)return 440;const midi=(Number(m[2])+1)*12+SEMITONES[m[1]];return 440*Math.pow(2,(midi-69)/12)}
export class AudioEngine{
  constructor(){this.ctx=null;this.master=null;this.voices=new Set()}
  async init(){if(!this.ctx){this.ctx=new (window.AudioContext||window.webkitAudioContext)();this.master=this.ctx.createGain();this.master.gain.value=.75;this.master.connect(this.ctx.destination)}if(this.ctx.state==='suspended')await this.ctx.resume()}
  setVolume(v){if(this.master)this.master.gain.setTargetAtTime(Number(v),this.ctx.currentTime,.02)}
  playNote(pitch,duration,velocity=.7){if(!this.ctx)return;const now=this.ctx.currentTime;const osc=this.ctx.createOscillator();const overtone=this.ctx.createOscillator();const gain=this.ctx.createGain();const overtoneGain=this.ctx.createGain();osc.type='triangle';overtone.type='sine';osc.frequency.value=frequency(pitch);overtone.frequency.value=frequency(pitch)*2;gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(Math.max(.001,velocity*.22),now+.012);gain.gain.exponentialRampToValueAtTime(.0001,now+Math.max(.08,duration));overtoneGain.gain.value=.07*velocity;osc.connect(gain);overtone.connect(overtoneGain);overtoneGain.connect(gain);gain.connect(this.master);osc.start(now);overtone.start(now);const stop=now+duration+.08;osc.stop(stop);overtone.stop(stop);const voice={osc,overtone};this.voices.add(voice);osc.onended=()=>this.voices.delete(voice)}
  stopAll(){for(const v of this.voices){try{v.osc.stop();v.overtone.stop()}catch{}}this.voices.clear()}
}
