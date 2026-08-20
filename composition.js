// Musical time is stored in beats, making this model straightforward to convert to notation later.
const notes=[];
const add=(hand,pitch,start,duration,velocity=.7)=>notes.push({hand,pitch,start,duration,velocity});
const progression=[
  {bass:'F#2',chord:['F#3','C#4','F#4']},
  {bass:'C#2',chord:['G#3','C#4','E#4']},
  {bass:'D2',chord:['A3','D4','F#4']},
  {bass:'A2',chord:['A3','C#4','E4']},
  {bass:'B2',chord:['B3','D4','F#4']},
  {bass:'F#2',chord:['A3','C#4','F#4']},
  {bass:'B2',chord:['B3','D4','F#4']},
  {bass:'C#2',chord:['G#3','C#4','E#4']}
];
const melodyPatterns=[
 ['F#4','A4','C#5','E5','C#5','A4','G#4','A4'],
 ['E4','G#4','C#5','E5','D5','C#5','G#4','E4'],
 ['F#4','A4','D5','C#5','A4','F#4','E4','F#4'],
 ['E4','A4','C#5','B4','A4','E4','F#4','E4']
];
const bars=56;
for(let bar=0;bar<bars;bar++){
  const beat=bar*4;
  const harmony=progression[bar%progression.length];
  const section=bar<8?0:bar<24?1:bar<40?2:bar<48?3:4;
  const leftVel=[.42,.5,.58,.72,.4][section];
  add('left',harmony.bass,beat,1.7,leftVel);
  if(section===0||section===4){
    harmony.chord.forEach((p,i)=>add('left',p,beat+1+i*.75,.62,leftVel*.9));
  }else{
    const arp=[harmony.chord[0],harmony.chord[1],harmony.chord[2],harmony.chord[1],harmony.chord[0],harmony.chord[1],harmony.chord[2],harmony.chord[1]];
    arp.forEach((p,i)=>add('left',p,beat+i*.5,.42,leftVel*(i%2?.88:1)));
  }
  const pattern=melodyPatterns[(Math.floor(bar/4)+bar)%melodyPatterns.length];
  const rightVel=[.48,.61,.69,.88,.45][section];
  pattern.forEach((p,i)=>{
    if(section===0 && bar<2 && i%2) return;
    const octaveLift=section===3 && i>=4;
    const pitch=octaveLift?p.replace(/(\d)$/,(_,o)=>String(Number(o)+1)):p;
    add('right',pitch,beat+i*.5,section===3?.46:.42,rightVel+(i===0?.05:0));
  });
  if(section===3 && bar%2===1){
    add('right','F#5',beat,1.4,.86);add('right','A5',beat,1.4,.8);
  }
}
// Gentle final cadence.
add('left','F#2',bars*4,4,.38);add('left','C#3',bars*4,4,.34);add('right','A4',bars*4,1.5,.44);add('right','F#4',bars*4+1.5,2.5,.38);

export const composition={
  title:'After the Quiet Rain',
  tempo:76,
  timeSignature:'4/4',
  key:'F# minor',
  totalBeats:bars*4+4,
  notes
};
