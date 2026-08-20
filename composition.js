// V2: an original through-composed piano sketch. Musical time is stored in beats.
const notes=[];const add=(hand,pitch,start,duration,velocity=.7)=>notes.push({hand,pitch,start,duration,velocity});
const H=[
 {bass:'F#2',tones:['C#3','F#3','A3']},{bass:'C#2',tones:['C#3','E3','G#3']},{bass:'D2',tones:['A2','D3','F#3']},{bass:'A2',tones:['A2','C#3','E3']},
 {bass:'B2',tones:['B2','D3','F#3']},{bass:'F#2',tones:['C#3','F#3','A3']},{bass:'D2',tones:['A2','D3','F#3']},{bass:'C#2',tones:['G#2','C#3','E3']}
];
const themes=[
 ['C#5','A4','F#4','A4','C#5','E5','C#5','A4'],['G#4','C#5','E5','D5','C#5','G#4','E4','G#4'],
 ['A4','F#4','A4','D5','C#5','A4','F#4','E4'],['E4','A4','C#5','E5','C#5','B4','A4','G#4'],
 ['F#4','B4','D5','F#5','D5','B4','A4','F#4'],['A4','C#5','F#5','E5','C#5','A4','G#4','A4']
];
const bars=60;
for(let bar=0;bar<bars;bar++){
 const t=bar*4,h=H[bar%8];let sec=bar<6?'intro':bar<22?'theme':bar<38?'develop':bar<50?'climax':'outro';
 const lv={intro:.34,theme:.44,develop:.53,climax:.68,outro:.32}[sec];add('left',h.bass,t,sec==='outro'?2.2:1.15,lv);
 const arp=sec==='intro'||sec==='outro'?[h.tones[0],h.tones[1],h.tones[2],h.tones[1]]:[h.tones[0],h.tones[1],h.tones[2],h.tones[1],h.tones[0],h.tones[1],h.tones[2],h.tones[1]];
 const step=4/arp.length;arp.forEach((p,i)=>add('left',p,t+i*step,step*.88,lv*(i%2?.86:1)));
 if(sec==='intro'&&bar<2){add('right',bar===0?'F#4':'A4',t+.15,2.7,.38);add('right',bar===0?'C#5':'C#5',t+2.9,.8,.34);continue}
 let pat=themes[(bar+Math.floor(bar/4))%themes.length];const rv={intro:.42,theme:.57,develop:.67,climax:.82,outro:.4}[sec];pat.forEach((p,i)=>{if(sec==='outro'&&i%2===1)return;let pitch=p;if(sec==='climax'&&i>=3)pitch=p.replace(/(\d)$/,(_,o)=>String(Math.min(6,+o+1)));const breath=(i===3||i===7)?.035:0;add('right',pitch,t+i*.5+breath,sec==='outro'?.8:.43,rv+(i===0?.045:0))});
 if(sec==='develop'&&bar%4===3){add('right','E5',t+2,1.7,.66);add('right','C#5',t+2,1.5,.59)}
 if(sec==='climax'){if(bar%2===0){add('right','F#5',t,1.8,.78);add('right','C#6',t,1.65,.7)}if(bar>=46){add('left','F#3',t+2,1.5,.64)}}
}
const end=bars*4;add('left','F#2',end,4,.3);add('left','C#3',end,4,.27);add('left','F#3',end,4,.25);add('right','C#5',end+.1,1.4,.38);add('right','A4',end+1.45,1.1,.34);add('right','F#4',end+2.5,3.5,.3);
notes.sort((a,b)=>a.start-b.start);
export const composition={title:'After the Quiet Rain · V2',tempo:76,timeSignature:'4/4',key:'F# minor',totalBeats:end+6,notes};
