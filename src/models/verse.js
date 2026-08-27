function openVerse(id){
  let x=id?db.verses.find(v=>v.id===id):{id:uid(),date:today(),text:'',reference:'',tags:'',note:''};
  modal(`<div class="sheethead"><h2>${id?'编辑经文':'摘录经文'}</h2><button class="iconbtn" onclick="closeModal()">✕</button></div>
  <div class="field"><label>日期</label><input id="vd" type="date" value="${x.date}"></div>
  <div class="field"><label>经文</label><textarea id="vt">${esc(x.text)}</textarea></div>
  <div class="field"><label>出处</label><input id="vr" value="${esc(x.reference)}"></div>
  <div class="field"><label>标签</label><input id="vg" value="${esc(x.tags||'')}"></div>
  <div class="field"><label>为什么摘这句 / 简短笔记</label><textarea id="vn">${esc(x.note||'')}</textarea></div>
  <button class="primary" onclick="saveVerse('${x.id}')">保存</button>`)
}
function saveVerse(id){
  let old=db.verses.find(v=>v.id===id),x={id,date:val('vd')||today(),text:val('vt').trim(),reference:val('vr').trim(),tags:val('vg').trim(),note:val('vn').trim(),source:old?.source||'manual',createdAt:old?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()},i=db.verses.findIndex(v=>v.id===id);
  i>=0?db.verses[i]=x:db.verses.push(x);save();closeModal()
}
