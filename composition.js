const notes=[];const add=(hand,pitch,start,duration,velocity=.7)=>notes.push({hand,pitch,start,duration,velocity});
const H=[{b:'D2',a:['A2','D3','F#3','A3']},{b:'A1',a:['E2','A2','C#3','E3']},{b:'B1',a:['F#2','B2','D3','F#3']},{b:'F#2',a:['C#3','F#3','A3','C#4']},{b:'G2',a:['D3','G3','B3','D4']},{b:'D2',a:['A2','D3','F#3','A3']},{b:'G2',a:['D3','G3','B3','D4']},{b:'A2',a:['E3','A3','C#4','E4']}];
const RH=[
[['F#5',0,.75],['E5',.8,.4],['D5',1.25,.7],['A4',2.05,.55],['B4',2.7,.45],['C#5',3.2,.65]],
[['E5',.1,.45],['F#5',.65,.45],['A5',1.2,.8],['G5',2.15,.45],['F#5',2.7,.5],['E5',3.25,.6]],
[['D5',0,.55],['F#5',.65,.5],['E5',1.3,.4],['D5',1.8,.55],['C#5',2.45,.45],['B4',3,.85]],
[['C#5',.1,.5],['E5',.7,.55],['F#5',1.4,.8],['A5',2.35,.55],['G5',3,.35],['E5',3.45,.5]],
[['B4',0,.55],['D5',.65,.5],['G5',1.25,.85],['F#5',2.2,.45],['E5',2.75,.4],['D5',3.25,.65]],
[['A4',.05,.55],['D5',.7,.55],['F#5',1.4,.75],['E5',2.25,.4],['D5',2.75,.45],['C#5',3.3,.6]],
[['B4',0,.45],['D5',.55,.45],['F#5',1.1,.55],['A5',1.75,.8],['G5',2.65,.4],['F#5',3.15,.65]],
[['E5',.05,.45],['C#5',.6,.5],['B4',1.2,.65],['C#5',1.95,.45],['D5',2.5,.45],['E5',3.05,.8]]
];
const CM=[['A4',.25,.7],['F#4',1.15,.65],['G4',2.05,.7],['E4',3,.75]];
const bars=28;for(let bar=0;bar<bars;bar++){const t=bar*4,h=H[bar%8],stage=bar<4?0:bar<10?1:bar<18?2:bar<24?3:4,bassV=[.32,.38,.44,.5,.34][stage];add('left',h.b,t,stage===0?2:1.15,bassV);if(stage===0){h.a.forEach((p,i)=>add('left',p,t+i,.82,.3+i*.015));}else{const seq=stage===1?[h.a[0],h.a[2],h.a[1],h.a[3]]:[h.a[0],h.a[1],h.a[2],h.a[3],h.a[2],h.a[1],h.a[2],h.a[3]];const step=4/seq.length;seq.forEach((p,i)=>add('left',p,t+i*step+.02,step*.86,bassV*(i%2?.84:.96)));}
 if(bar>=2&&bar<26){const phrase=RH[(bar-2)%RH.length],v=[.44,.52,.6,.69,.48][stage];phrase.forEach(([p,s,d],i)=>{let q=p;if(stage===3&&bar>=20&&i>=3)q=p.replace(/(\d)$/,(_,o)=>String(Math.min(6,+o+1)));add('right',q,t+s,d,v*(i===0?1.04:.96));});}
 if(bar>=10&&bar<23&&bar%2===1){CM.forEach(([p,s,d],i)=>{const q=stage===3&&i>1?p.replace(/(\d)$/,(_,o)=>String(Math.min(6,+o+1))):p;add('right',q,t+s+.12,d,.3+stage*.055);});}
 if(stage===3&&bar%3===0){add('right','D6',t+1.55,.55,.58);add('right','A5',t+2.15,.5,.54);} }
const end=bars*4;add('left','D2',end,4,.28);add('left','A2',end,4,.24);add('left','D3',end,4,.22);add('right','F#4',end+.1,.9,.3);add('right','A4',end+1.1,.9,.28);add('right','D5',end+2.1,2.8,.26);notes.sort((a,b)=>a.start-b.start);export const composition={title:'Canon in D · V9 Through-Composed Right Hand',tempo:86,timeSignature:'4/4',key:'D major',totalBeats:end+5,notes};
