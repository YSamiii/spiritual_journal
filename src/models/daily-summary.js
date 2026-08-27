function openSummary(){
  let x=db.dailySummaries.find(s=>s.date===today())||{id:uid(),reflection:'',oneLine:''};
  modal(`<div class="sheethead"><h2>日终汇总</h2><button class="iconbtn" onclick="closeModal()">✕</button></div><div class="card">${snapshot(today())}</div><div class="field"><label>今天读完以后，我最想留下什么？</label><textarea id="sr">${esc(x.reflection||'')}</textarea></div><div class="field"><label>今日一句总结</label><input id="so" value="${esc(x.oneLine||'')}"></div><button class="primary" onclick="saveSummary('${x.id}')">保存今天</button>`)
}
function saveSummary(id){let x={id,date:today(),reflection:val('sr').trim(),oneLine:val('so').trim()},i=db.dailySummaries.findIndex(s=>s.date===today());i>=0?db.dailySummaries[i]=x:db.dailySummaries.push(x);save();closeModal()}
function snapshot(d){return `<div class="body">${db.verses.filter(v=>v.date===d).length} 条经文 · ${db.questions.filter(q=>q.date===d).length} 个问题 · ${db.prayerLogs.filter(p=>p.date===d).length} 条祷告</div>`}
