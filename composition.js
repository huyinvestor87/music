const notes=[];const add=(hand,pitch,start,duration,velocity=.7)=>notes.push({hand,pitch,start,duration,velocity});
const H=[{b:'D2',a:['A2','D3','F#3','A3']},{b:'A1',a:['E2','A2','C#3','E3']},{b:'B1',a:['F#2','B2','D3','F#3']},{b:'F#2',a:['C#3','F#3','A3','C#4']},{b:'G2',a:['D3','G3','B3','D4']},{b:'D2',a:['A2','D3','F#3','A3']},{b:'G2',a:['D3','G3','B3','D4']},{b:'A2',a:['E3','A3','C#4','E4']}];
const lead=[['F#5',0,.5],['E5',.5,.5],['D5',1,.5],['C#5',1.5,.5],['B4',2,.5],['A4',2.5,.5],['B4',3,.5],['C#5',3.5,.5]];
const countermelody=[['A4',0,1],['F#4',1,1],['G4',2,1],['E4',3,1]];
const lift=p=>p.replace(/(\d)$/,(_,o)=>String(Math.min(6,+o+1)));const phrase=(pat,t,v,up=false)=>pat.forEach(([p,s,d],i)=>add('right',up&&i>3?lift(p):p,t+s,d,v*(i===0?1.04:.96)));
const bars=28;for(let bar=0;bar<bars;bar++){const t=bar*4,h=H[bar%8];const stage=bar<4?0:bar<10?1:bar<18?2:bar<24?3:4;const bassV=[.32,.38,.44,.5,.34][stage];add('left',h.b,t,stage===0?2:1.15,bassV);
 if(stage===0){[0,1,2,3].forEach((i)=>add('left',h.a[i],t+i,.82,.3+i*.015));}
 else{const density=stage===1?4:8;const seq=density===4?[h.a[0],h.a[2],h.a[1],h.a[3]]:[h.a[0],h.a[1],h.a[2],h.a[3],h.a[2],h.a[1],h.a[2],h.a[3]];const step=4/seq.length;seq.forEach((p,i)=>add('left',p,t+i*step+.02,step*.86,bassV*(i%2?.84:.96)));}
 if(bar>=2&&bar<26)phrase(lead,t,[.44,.52,.6,.69,.48][stage],stage>=3);
 if(bar>=8&&bar<24){countermelody.forEach(([p,s,d],i)=>add('right',stage>=3?lift(p):p,t+s+.08,d*.9,.33+stage*.06));}
 if(bar>=14&&bar<24){add('right',stage>=3?'D6':'D5',t,.9,.46+stage*.06);add('right',stage>=3?'A5':'A4',t+2,.9,.42+stage*.06);}
 if(stage===3&&bar%2===0){add('right','F#5',t+1,.7,.63);add('right','A5',t+1,.65,.58);}
}
const end=bars*4;add('left','D2',end,4,.28);add('left','A2',end,4,.24);add('left','D3',end,4,.22);add('right','F#4',end+.1,.9,.3);add('right','A4',end+1.1,.9,.28);add('right','D5',end+2.1,2.8,.26);notes.sort((a,b)=>a.start-b.start);export const composition={title:'Canon in D · V8 Layered Build',tempo:86,timeSignature:'4/4',key:'D major',totalBeats:end+5,notes};
