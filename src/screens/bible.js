function renderBible(){
  let q=(document.getElementById('verseSearch').value||'').toLowerCase(),f=document.getElementById('verseQFilter').value||'all';
  let xs=db.verses.filter(v=>[v.text,v.reference,v.tags,v.note].join(' ').toLowerCase().includes(q)).filter(v=>{let h=db.questions.some(x=>(x.verseIds||[]).includes(v.id));return f==='all'||(f==='with'&&h)||(f==='without'&&!h)});
  xs.sort(db.settings.verseSort==='reference'?(a,b)=>compare(a.reference,b.reference):db.settings.verseSort==='oldest'?(a,b)=>(a.createdAt||'').localeCompare(b.createdAt||''):(a,b)=>(b.createdAt||'').localeCompare(a.createdAt||''));
  document.getElementById('verseSort').value=db.settings.verseSort;
  document.getElementById('verseList').innerHTML=xs.length?xs.map(v=>`<div class="card" onclick="openVerse('${v.id}')"><div class="quote">${lines(v.text)}</div><div class="meta">${esc(v.reference)} · ${v.date}</div>${v.note?`<div class="body">${lines(v.note)}</div>`:''}</div>`).join(''):'<div class="empty">还没有经文记录。</div>'
}
