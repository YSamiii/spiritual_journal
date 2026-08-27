function openQuestion(id,vid){
  let x=id?db.questions.find(q=>q.id===id):{id:uid(),date:today(),question:'',verseIds:vid?[vid]:[],status:'open',answer:''};
  let opts=db.verses.map(v=>`<option value="${v.id}" ${(x.verseIds||[]).includes(v.id)?'selected':''}>${esc(v.reference||v.text.slice(0,28))}</option>`).join('');
  modal(`<div class="sheethead"><h2>${id?'编辑问题':'记一个问题'}</h2><button class="iconbtn" onclick="closeModal()">✕</button></div>
  <div class="field"><label>日期</label><input id="qd" type="date" value="${x.date}"></div>
  <div class="field"><label>我的疑问</label><textarea id="qt">${esc(x.question)}</textarea></div>
  <div class="field"><label>关联经文（可多选）</label><select id="qv" multiple size="5">${opts}</select></div>
  <div class="field"><label>状态</label><select id="qs"><option value="open">待查</option><option value="resolved">已查</option><option value="hold">暂时保留</option></select></div>
  <div class="field"><label>后来查到的答案 / 我的理解</label><textarea id="qa">${esc(x.answer||'')}</textarea></div>
  <button class="primary" onclick="saveQuestion('${x.id}')">保存</button>`);
  document.getElementById('qs').value=x.status
}
function saveQuestion(id){
  let old=db.questions.find(q=>q.id===id),x={id,date:val('qd')||today(),question:val('qt').trim(),verseIds:[...document.getElementById('qv').selectedOptions].map(o=>o.value),status:val('qs'),answer:val('qa').trim(),createdAt:old?.createdAt||new Date().toISOString()},i=db.questions.findIndex(q=>q.id===id);
  i>=0?db.questions[i]=x:db.questions.push(x);save();closeModal()
}
