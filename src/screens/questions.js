function renderQuestions(){
  let f=document.getElementById('qFilter').value||'all',xs=db.questions.filter(q=>f==='all'||q.status===f);
  document.getElementById('questionList').innerHTML=xs.length?xs.map(q=>`<div class="card" onclick="openQuestion('${q.id}')"><div class="row"><div class="title">${esc(q.question)}</div><span class="tag">${q.status==='resolved'?'已查':q.status==='hold'?'暂时保留':'待查'}</span></div>${linked(q.verseIds)}${q.answer?`<div class="body">${lines(q.answer)}</div>`:''}</div>`).join(''):'<div class="empty">还没有问题。</div>'
}
