const KEY='spiritualJournal.v0.1';
const DEF={version:6,verses:[],questions:[],prayers:[],prayerLogs:[],gratitudes:[],dailySummaries:[],journals:[],settings:{verseSort:'reference',ocrBackendUrl:''}};
let db=migrate(load());
let screen='today';


function load(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){return{}}}
function today(){let d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function uid(){return crypto.randomUUID?crypto.randomUUID():Date.now()+'-'+Math.random()}
function migrate(r){
  let d={...DEF,...r,settings:{...DEF.settings,...(r.settings||{})}};
  d.questions=Array.isArray(r.questions)?r.questions:[];
  d.prayerLogs=Array.isArray(r.prayerLogs)?r.prayerLogs:[];
  d.gratitudes=Array.isArray(r.gratitudes)?r.gratitudes:[];
  d.dailySummaries=Array.isArray(r.dailySummaries)?r.dailySummaries:[];
  d.verses=(Array.isArray(r.verses)?r.verses:[]).map(v=>({...v,date:v.date||(v.createdAt||'').slice(0,10)||today(),note:v.note||v.reflection||''}));
  d.prayers=(Array.isArray(r.prayers)?r.prayers:[]).map(p=>({...p,details:p.details||p.notes||'',category:p.category||'其他',status:p.status||'ongoing'}));
  if(Array.isArray(r.journals)) r.journals.forEach(j=>{if(j.date&&!d.dailySummaries.some(x=>x.date===j.date)) d.dailySummaries.push({id:j.id||uid(),date:j.date,reflection:j.reminder||j.guidance||'',oneLine:j.oneLine||'',legacy:true})});
  return d;
}
function save(){localStorage.setItem(KEY,JSON.stringify(db));renderAll()}
function esc(s=''){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function lines(s=''){return esc(s).replace(/\n/g,'<br>')}
function val(id){return document.getElementById(id)?.value||''}
function fmt(d){return new Intl.DateTimeFormat('zh-CN',{year:'numeric',month:'long',day:'numeric',weekday:'short'}).format(new Date(d+'T12:00:00'))}
function modal(h){document.getElementById('sheet').innerHTML=h;document.getElementById('modal').classList.add('open');document.body.style.overflow='hidden'}
function closeModal(){document.getElementById('modal').classList.remove('open');document.body.style.overflow=''}
document.getElementById('modal').onclick=e=>{if(e.target.id==='modal')closeModal()}
function go(s){screen=s;document.querySelectorAll('.screen').forEach(x=>x.classList.toggle('active',x.id===s));document.querySelectorAll('.nav button').forEach(x=>x.classList.toggle('active',x.dataset.s===s));renderAll();scrollTo(0,0)}
function contextAdd(){screen==='questions'?openQuestion():screen==='prayer'?openPrayer():openVerse()}
