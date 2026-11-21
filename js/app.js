const {useState,useEffect,useRef}=React;const html=htm.bind(React.createElement);
const RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
const FM=window.Motion||window.FramerMotion||{};const MD=FM.motion&&FM.motion.div;

/* shared SVG florals (hydrangea, rose, baby’s breath, leaf) */
const BL=["#6f95c9","#8fb3e0","#a9c6ea","#c4d9f2","#5f83b8"];
let hy="";for(let i=0;i<52;i++){const a=i*2.4,r=Math.sqrt(i/52)*62,x=75+r*Math.cos(a),y=75+r*Math.sin(a);hy+=`<g fill="${BL[i*7%5]}" opacity=".93">${[[-3,0],[3,0],[0,-3],[0,3]].map(([dx,dy])=>`<circle cx="${(x+dx).toFixed(1)}" cy="${(y+dy).toFixed(1)}" r="4.7"/>`).join("")}<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.4" fill="#f4f9ff"/></g>`}
let bb="";for(let i=0;i<26;i++){const x=12+i*4%96,y=8+i*37%100;bb+=`<circle cx="${x}" cy="${y}" r="2.6" fill="#fff" stroke="#c9d8ea" stroke-width=".5"/>`}
const DEFS=`<symbol id="hyd" viewBox="0 0 150 150">${hy}</symbol>
<symbol id="rose" viewBox="0 0 60 60"><circle cx="30" cy="30" r="27" fill="#fff" stroke="#d3deec"/><path d="M30 10c11 0 18 9 13 19-5 9-19 9-21 0-2-7 4-11 9-10 5 1 5 7 1 8" fill="none" stroke="#b9c8dc" stroke-width="1.6"/><path d="M14 24c5-8 17-10 24-5M46 38c-5 8-17 10-24 5" fill="none" stroke="#d3deec" stroke-width="1.3"/></symbol>
<symbol id="bb" viewBox="0 0 120 120"><path d="M6 112C30 80 60 50 112 8M30 90c4-18 2-30-4-46M62 60c12-8 22-22 24-40" fill="none" stroke="#9fb5cb" stroke-width="1.2"/>${bb}</symbol>
<symbol id="lf" viewBox="0 0 40 90"><path d="M20 0C42 30 40 66 20 90 0 66-2 30 20 0Z" fill="#8aa7bf"/><path d="M20 8v76" stroke="#b5c9d9" stroke-width="1"/></symbol>`;
const Defs=()=>html`<svg width="0" height="0" style=${{position:"absolute"}} aria-hidden="true" dangerouslySetInnerHTML=${{__html:"<defs>"+DEFS+"</defs>"}}/>`;
const Floral=({c})=>html`<div className=${"fl "+c+" fade"} aria-hidden="true"><svg viewBox="0 0 300 300">
<use href="#lf" x="95" y="70" width="40" height="110" transform="rotate(-62 115 125)" opacity=".9"/><use href="#lf" x="20" y="120" width="40" height="110" transform="rotate(-18 40 175)" opacity=".85"/><use href="#lf" x="130" y="10" width="36" height="100" transform="rotate(-100 150 60)" opacity=".8"/>
<use href="#bb" x="140" y="70" width="140" height="140"/><use href="#bb" x="10" y="150" width="120" height="120"/>
<use href="#hyd" x="-34" y="-34" width="200" height="200"/><use href="#hyd" x="110" y="-14" width="125" height="125" opacity=".88"/><use href="#hyd" x="-12" y="112" width="112" height="112" opacity=".92"/>
<use href="#rose" x="92" y="104" width="62" height="62"/><use href="#rose" x="22" y="196" width="46" height="46"/></svg></div>`;
const Petals=({n=14})=>html`<div className="petals" aria-hidden="true">${[...Array(n)].map((_,i)=>html`<i key=${i} style=${{left:(i*37%100)+"%",width:8+i%4*3,height:11+i%4*4,"--dx":((i%5)-2)*60+"px",animationDuration:(12+i%6*2.4)+"s",animationDelay:-(i*1.9)+"s",opacity:.5+i%3*.15}}/>`)}</div>`;
const Sparkles=()=>html`<div className="sparks" aria-hidden="true">${[...Array(24)].map((_,i)=>html`<b key=${i} style=${{left:(6+i*41%88)+"%",top:(8+i*29%78)+"%",animationDelay:(i%8)*.27+"s",width:8+i%3*5,height:8+i%3*5}}/>`)}</div>`;
const IC={cal:'<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',pin:'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',dn:'<path d="m6 9 6 6 6-6"/>',send:'<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>'};
const Icon=({n,s=26})=>html`<svg width=${s} height=${s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML=${{__html:IC[n]}}/>`;
const Sep=()=>html`<div className="sep" aria-hidden="true"><svg width="26" height="26"><use href="#rose"/></svg></div>`;

const Reveal=({children,d=0,y=40,className=""})=>{const r=useRef();
  useEffect(()=>{if(MD||!r.current)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){r.current.classList.add("in");o.disconnect()}},{rootMargin:"-60px"});o.observe(r.current);return()=>o.disconnect()},[]);
  return MD?html`<${MD} className=${className} initial=${{opacity:0,y}} whileInView=${{opacity:1,y:0}} viewport=${{once:true,margin:"-60px"}} transition=${{duration:1.1,delay:d,ease:[.22,1,.36,1]}}>${children}<//>`
   :html`<div ref=${r} className=${"rv "+className} style=${{transitionDelay:d+"s"}}>${children}</div>`};
const Photo=({src,slot,cls="",par=-.05,label})=>html`<figure className=${"frame "+cls}><div className="pi" data-par=${par}>${src?html`<img src=${src} alt=${label||CONFIG.name} loading="lazy"/>`:html`<div className="ph"><svg width="34" height="34" aria-hidden="true"><use href="#rose"/></svg><span>Photo placeholder</span><small>CONFIG.${slot}</small></div>`}</div>${label&&html`<figcaption>${label}</figcaption>`}</figure>`;

/* ---------------- ENVELOPE (most important) ---------------- */
const EnvelopeOpening=({onExit,onDone})=>{
  const[n,setN]=useState(0),[ready,setReady]=useState(false),[go,setGo]=useState(false),[out,setOut]=useState(false),[gone,setGone]=useState(false);
  useEffect(()=>{let d=0;const f=()=>{if(!d){d=1;setReady(true)}};const t=setTimeout(f,2800);(document.fonts&&document.fonts.ready||Promise.resolve()).then(()=>setTimeout(f,RM?0:1100));return()=>clearTimeout(t)},[]);
  const open=()=>{if(go||!ready)return;setGo(true);
    const T=RM?[0,80,160,260,420,700,900]:[0,700,1600,2900,4900,6700,8100]; /* seal · lift · flap · rise · present · crossfade · unlock */
    [1,2,3,4,5].forEach((k,i)=>setTimeout(()=>setN(k),T[i]));
    setTimeout(()=>{setOut(true);onExit()},T[5]);setTimeout(()=>{setGone(true);onDone()},T[6])};
  if(gone)return null;
  const cls=[...Array(n)].map((_,i)=>"s"+(i+1)).join(" ");
  return html`<div className=${"ov"+(ready?" rd":"")+(go?" go":"")+(out?" out":"")} role="dialog" aria-label="Your invitation">
    <div className="ld serif" aria-hidden="true">${CONFIG.initials}</div>
    <${Floral} c="tl"/><${Floral} c="tr"/><${Floral} c="bl"/><${Floral} c="br"/><${Petals}/>
    <p className="ov-t serif fade">You have a special invitation</p>
    <div className="stg fade"><div className="float">
      <div className=${"env "+cls} role="button" tabIndex="0" aria-label="Open the invitation" onClick=${open} onKeyDown=${e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open()}}}>
        <div className="sh"/><div className="back p"/>
        <div className="card"><div className="cf serif"><span className="eyebrow">You are cordially invited</span><span className="script cn">${CONFIG.first}</span><span className="eyebrow">to her 18th debut</span><span className="dt">${CONFIG.dateShort}</span></div></div>
        <div className="pk p"><i className="l"/><i className="r"/><i className="b"/><div className="mono script">${CONFIG.initials}</div></div>
        <div className="flap p"><div className="ff"/><div className="fb"/></div>
        <div className="seal" aria-hidden="true">18</div>
      </div></div></div>
    <p className="ov-b eyebrow fade"><span>Tap to open</span></p>
    ${n>=3&&html`<${Sparkles}/>`}
  </div>`};

/* ---------------- SECTIONS ---------------- */
const HeroSection=({go})=>html`<header id="top" className=${"hero"+(go?" go":"")}>
  <${Floral} c="tl"/><${Floral} c="tr"/><${Floral} c="bl"/><${Floral} c="br"/><${Petals} n=${10}/>
  <div className="hero-in">
    <p className="serif it tog st" style=${{"--i":0}}>${CONFIG.families}</p>
    <p className="eyebrow st" style=${{"--i":1}}>You are cordially invited to celebrate</p>
    <p className="eyebrow st" style=${{"--i":2}}>The 18th debut of</p>
    <div className="arch st" style=${{"--i":3}}><${Photo} src=${CONFIG.photos.hero} slot="photos.hero" par=${-.04}/></div>
    <h1 className="script name st" style=${{"--i":4}}>${CONFIG.name}</h1>
    <p className="serif it tag st" style=${{"--i":5}}>An evening of elegance, love, and unforgettable memories.</p>
    <a href="#gallery" className="scroll st" style=${{"--i":6}}>Scroll to Discover<${Icon} n="dn" s=${20}/></a>
  </div></header>`;

const DebutanteGallery=()=>html`<section id="gallery" className="alt"><div className="wrap">
  <${Reveal}><p className="eyebrow c">About the debutante</p><h2 className="h">A little glimpse of her journey</h2><p className="lead">${CONFIG.about}</p><//>
  <div className="gal">
    <${Reveal} className="big"><${Photo} src=${CONFIG.photos.featured} slot="photos.featured" label=${"Meet "+CONFIG.first} par=${-.06}/><//>
    ${CONFIG.photos.gallery.map((g,i)=>html`<${Reveal} key=${i} d=${i*.12} className=${"g"+i}><${Photo} src=${g.src} slot=${"photos.gallery["+i+"].src"} label=${g.cap} cls=${"r"+(i%3+2)} par=${i%2?.05:-.05}/><//>`)}
  </div></div></section>`;

const CountdownTimer=()=>{const T=new Date(CONFIG.date).getTime();
  const calc=()=>{const s=Math.floor(Math.max(0,T-Date.now())/1e3);return[Math.floor(s/86400),Math.floor(s%86400/3600),Math.floor(s%3600/60),s%60]};
  const[v,setV]=useState(calc);useEffect(()=>{const i=setInterval(()=>setV(calc()),1000);return()=>clearInterval(i)},[]);
  return html`<div className="cd" role="timer" aria-label="Time until the celebration">${["Days","Hours","Minutes","Seconds"].map((l,i)=>html`<div key=${l}><b>${String(v[i]).padStart(2,"0")}</b><span>${l}</span></div>`)}</div>`};

const EventDetails=()=>html`<section id="event"><div className="wrap">
  <${Reveal}><p className="eyebrow c">Save the date</p><h2 className="h">The celebration</h2><${Sep}/><//>
  <div className="ecs">${[["cal","Date",CONFIG.dateText],["clock","Time",CONFIG.timeText],["pin",CONFIG.venue,CONFIG.address]].map((c,i)=>html`<${Reveal} key=${i} d=${i*.12}><div className="ec"><${Icon} n=${c[0]}/><h3>${c[1]}</h3><p>${c[2]}</p></div><//>`)}</div>
  <${Reveal}><div className="c" style=${{marginTop:"2.2rem"}}><a className="btn" href=${CONFIG.mapUrl} target="_blank" rel="noopener noreferrer"><${Icon} n="pin" s=${18}/>View Location</a></div><${CountdownTimer}/><//>
  </div></section>`;

const ProgramTimeline=()=>html`<section className="alt"><div className="wrap">
  <${Reveal}><p className="eyebrow c">Debut program</p><h2 className="h">An evening, unfolded</h2><${Sep}/><//>
  <ol className="tl">${CONFIG.program.map((p,i)=>html`<li key=${i}><${Reveal} d=${.05} y=${24}><time>${p.t}</time><h3>${p.n}</h3><p>${p.d}</p><//></li>`)}</ol></div></section>`;

const DressCode=()=>html`<section><div className="wrap c">
  <${Reveal}><p className="eyebrow">Dress code</p><h2 className="h">${CONFIG.dress.theme}</h2><p className="lead">${CONFIG.dress.text}</p><//>
  <${Reveal}><div className="sw">${CONFIG.dress.colors.map(([n,c])=>html`<div key=${n}><i style=${{background:c}}/>${n}</div>`)}</div><//></div></section>`;

const RSVPForm=()=>{const[f,setF]=useState({name:"",phone:"",att:"yes",guests:"1",msg:""}),[st,setSt]=useState(""),[err,setErr]=useState(""),[busy,setBusy]=useState(false);
  const set=k=>e=>setF({...f,[k]:e.target.value});
  const submit=async e=>{e.preventDefault();setErr("");setBusy(true);
    if(CONFIG.rsvpEndpoint){try{const r=await fetch(CONFIG.rsvpEndpoint,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({name:f.name,phone:f.phone,attending:f.att==="yes",guests:f.att==="yes"?+f.guests:0,message:f.msg})});if(!r.ok)throw 0;setSt("sent")}catch(x){setErr("We couldn’t send your RSVP. Please check your connection and try again.")}}
    else setSt("preview");setBusy(false)};
  const copy=()=>navigator.clipboard&&navigator.clipboard.writeText(`RSVP — ${f.name} — ${f.att==="yes"?"attending, "+f.guests+" guest(s)":"unable to attend"}${f.msg?" — "+f.msg:""}`);
  const body=st==="sent"?html`<div className="note"><h3 className="serif" style=${{fontSize:"2rem"}}>Thank you, ${f.name.split(" ")[0]}</h3><p className="lead">${f.att==="yes"?"Your RSVP has been sent. We can’t wait to celebrate with you.":"Your reply has been sent. You will be missed, and we are grateful you let us know."}</p></div>`
   :st==="preview"?html`<div className="note"><h3 className="serif" style=${{fontSize:"2rem"}}>RSVP not sent</h3><p className="lead">This invitation isn’t connected to an RSVP service yet, so your reply was not saved. Please confirm with the family directly.</p><p style=${{marginTop:"1.2rem"}}><button className="btn o" onClick=${copy}>Copy my reply</button></p></div>`
   :html`<form className="form" onSubmit=${submit}>
    <div><label htmlFor="n">Full name</label><input id="n" className="in" required autoComplete="name" value=${f.name} onChange=${set("name")}/></div>
    <div><label htmlFor="p">Contact number (optional)</label><input id="p" className="in" type="tel" autoComplete="tel" value=${f.phone} onChange=${set("phone")}/></div>
    <fieldset><legend>Will you attend?</legend><div className="pills">${[["yes","Yes, I’ll be there!"],["no","Sorry, I can’t make it."]].map(([v,l])=>html`<label key=${v} className=${"pill"+(f.att===v?" on":"")}><input type="radio" name="att" value=${v} checked=${f.att===v} onChange=${set("att")}/>${l}</label>`)}</div></fieldset>
    ${f.att==="yes"&&html`<div><label htmlFor="g">Number of guests</label><select id="g" className="in" value=${f.guests} onChange=${set("guests")}>${[...Array(CONFIG.maxGuests)].map((_,i)=>html`<option key=${i} value=${i+1}>${i+1}</option>`)}</select></div>`}
    <div><label htmlFor="m">Message for the debutante (optional)</label><textarea id="m" className="in" rows="3" value=${f.msg} onChange=${set("msg")}/></div>
    ${err&&html`<p className="err" role="alert">${err}</p>`}
    <button className="btn" disabled=${busy}><${Icon} n="send" s=${16}/>${busy?"Sending…":"Confirm Attendance"}</button></form>`;
  return html`<section id="rsvp" className="alt"><div className="wrap"><${Reveal}><p className="eyebrow c">Kindly reply</p><h2 className="h">RSVP</h2><p className="lead">Please let us know by March 1, 2027.</p><//><${Reveal}>${body}<//></div></section>`};

const Footer=()=>html`<footer className="foot"><${Floral} c="bl"/><${Floral} c="br"/><div className="wrap">
  <${Reveal}><${Sep}/><p className="serif it" style=${{fontSize:"clamp(1.3rem,4.8vw,1.7rem)",maxWidth:"30rem",margin:"0 auto"}}>Your presence would make this celebration even more meaningful. We can’t wait to create beautiful memories with you.</p><//>
  <${Reveal}><${Photo} src=${CONFIG.photos.final} slot="photos.final" par=${-.04}/><h2 className="script name">${CONFIG.name}</h2><p className="eyebrow">${CONFIG.dateText}</p><p className="serif it tk" style=${{marginTop:"1.2rem"}}>Thank you for being part of my special day</p><//></div></footer>`;

const Music=({show})=>{const a=useRef(),[on,setOn]=useState(false),[bad,setBad]=useState(false);
  const tg=async()=>{const el=a.current;if(!el)return;if(on){el.pause();setOn(false)}else{try{await el.play();setOn(true);setBad(false)}catch(x){setBad(true)}}};
  return html`<${React.Fragment}><audio ref=${a} src=${CONFIG.music} loop preload="none"/>${show&&html`<button className=${"music"+(on?" on":"")} onClick=${tg} aria-pressed=${on} aria-label=${on?"Pause music":"Play music"} title=${bad?"Add your audio file at "+CONFIG.music:on?"Pause music":"Play music"} style=${{opacity:bad?.55:1}}><${Icon} n="music" s=${20}/>${!on&&html`<i className="slash"/>`}</button>`}<//>`};

const App=()=>{const[open,setOpen]=useState(false),[go,setGo]=useState(false);
  useEffect(()=>{const d=document.documentElement;if(open){d.classList.remove("lock");scrollTo(0,0);return}
    d.classList.add("lock");const p=e=>e.preventDefault(),k=e=>{if(["ArrowDown","ArrowUp","PageDown","PageUp","Home","End"].includes(e.key)||(e.key===" "&&!e.target.closest("[role=button],button")))e.preventDefault()};
    addEventListener("wheel",p,{passive:false});addEventListener("touchmove",p,{passive:false});addEventListener("keydown",k);
    return()=>{removeEventListener("wheel",p);removeEventListener("touchmove",p);removeEventListener("keydown",k)}},[open]);
  useEffect(()=>{if(!open||RM)return;let t=0;const els=[...document.querySelectorAll("[data-par]")];
    const f=()=>{t=0;const vh=innerHeight;els.forEach(e=>{const r=e.parentElement.getBoundingClientRect();if(r.bottom<-120||r.top>vh+120)return;e.style.transform=`translate3d(0,${((r.top+r.height/2-vh/2)*e.dataset.par).toFixed(1)}px,0)`})};
    const on=()=>{t||(t=requestAnimationFrame(f))};addEventListener("scroll",on,{passive:true});addEventListener("resize",on);f();return()=>{removeEventListener("scroll",on);removeEventListener("resize",on)}},[open]);
  const page=html`<${React.Fragment}><${Defs}/><main aria-hidden=${!open}><${HeroSection} go=${go}/><${DebutanteGallery}/><${EventDetails}/><${ProgramTimeline}/><${DressCode}/><${RSVPForm}/><${Footer}/></main>
    <${EnvelopeOpening} onExit=${()=>setGo(true)} onDone=${()=>setOpen(true)}/><${Music} show=${open}/><//>`;
  return FM.MotionConfig?html`<${FM.MotionConfig} reducedMotion="user">${page}<//>`:page};
ReactDOM.createRoot(document.getElementById("root")).render(html`<${App}/>`);