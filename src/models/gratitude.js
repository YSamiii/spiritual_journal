function openGratitude(){
  let x=db.gratitudes.find(g=>g.date===today())||{id:uid(),text:''};
  modal(`<div class="sheethead"><h2>今日感恩</h2><button class="iconbtn" onclick="closeModal()">✕</button></div><textarea id="gt">${esc(x.text)}</textarea><div class="actions"><button class="primary" onclick="saveGratitude('${x.id}')">保存</button></div>`)
}
function saveGratitude(id){let x={id,date:today(),text:val('gt').trim()},i=db.gratitudes.findIndex(g=>g.date===today());i>=0?db.gratitudes[i]=x:db.gratitudes.push(x);save();closeModal()}
