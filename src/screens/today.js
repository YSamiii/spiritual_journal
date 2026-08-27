function renderToday(){
  let d=today(),vs=db.verses.filter(v=>v.date===d),qs=db.questions.filter(q=>q.date===d),ps=db.prayerLogs.filter(p=>p.date===d);
  document.getElementById('todayDate').textContent=fmt(d);document.getElementById('vc').textContent=vs.length;document.getElementById('qc').textContent=qs.length;document.getElementById('pc').textContent=ps.length;
  let a=[];
  vs.forEach(v=>a.push(`<div class="card"><div class="quote">${lines(v.text)}</div><div class="meta">${esc(v.reference)}</div>${v.note?`<div class="body">${lines(v.note)}</div>`:''}<div class="actions"><button class="secondary" onclick="openQuestion(null,'${v.id}')">＋ 针对这段提问</button></div></div>`));
  qs.forEach(q=>a.push(`<div class="card"><div class="title">？ ${esc(q.question)}</div>${linked(q.verseIds)}</div>`));
  document.getElementById('todayStudy').innerHTML=a.length?a.join(''):'<div class="empty">今天还没有研经记录。</div>';
  document.getElementById('todayPrayers').innerHTML=ps.length?ps.map(l=>{let p=db.prayers.find(x=>x.id===l.prayerId);return `<div class="card"><div class="title">🙏 ${p?esc(p.title):'临时祷告'}</div>${!p?`<div class="body">${lines(l.text)}</div>`:''}</div>`}).join(''):'<div class="empty">今天还没有记录祷告。</div>';
  let s=db.dailySummaries.find(x=>x.date===d),g=db.gratitudes.find(x=>x.date===d);
  document.getElementById('summaryCard').innerHTML=(g?.text||s?.reflection||s?.oneLine)?`${g?.text?`<div class="body">🌿 ${lines(g.text)}</div>`:''}${s?.reflection?`<div class="body">${lines(s.reflection)}</div>`:''}${s?.oneLine?`<div class="meta">一句话：${esc(s.oneLine)}</div>`:''}`:'<div class="note">白天只管记录，晚上再汇总，不需要重复抄经文或祷告。</div>'
}

function linked(ids=[]){return ids.map(id=>db.verses.find(v=>v.id===id)).filter(Boolean).map(v=>`<div class="meta">📖 ${esc(v.reference||v.text.slice(0,30))}</div>`).join('')}
