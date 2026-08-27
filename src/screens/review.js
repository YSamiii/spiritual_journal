function openReview(){
  let ds=[...new Set([...db.verses.map(x=>x.date),...db.questions.map(x=>x.date),...db.prayerLogs.map(x=>x.date),...db.dailySummaries.map(x=>x.date)].filter(Boolean))].sort().reverse();
  modal(`<div class="sheethead"><h2>历史回顾</h2><button class="iconbtn" onclick="closeModal()">✕</button></div><div class="list">${ds.map(d=>`<div class="card"><div class="title">${fmt(d)}</div>${snapshot(d)}${db.dailySummaries.find(x=>x.date===d)?.oneLine?`<div class="meta">一句话：${esc(db.dailySummaries.find(x=>x.date===d).oneLine)}</div>`:''}</div>`).join('')}</div>`)
}
