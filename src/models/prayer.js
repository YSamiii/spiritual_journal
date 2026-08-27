function openPrayer(id){
  let x=id?db.prayers.find(p=>p.id===id):{id:uid(),title:'',category:'自己',status:'ongoing',details:'',progress:''};
  modal(`<div class="sheethead"><h2>${id?'编辑祷告事项':'新增长期祷告事项'}</h2><button class="iconbtn" onclick="closeModal()">✕</button></div>
  <div class="field"><label>事项</label><input id="pt" value="${esc(x.title)}"></div>
  <div class="field"><label>分类</label><select id="pcat"><option>自己</option><option>家人</option><option>孩子</option><option>婚姻</option><option>工作</option><option>属灵成长</option><option>教会</option><option>朋友</option><option>健康</option><option>其他</option></select></div>
  <div class="field"><label>状态</label><select id="ps"><option value="ongoing">持续祷告</option><option value="waiting">等候中</option><option value="answered">已蒙应允</option><option value="closed">已结束</option></select></div>
  <div class="field"><label>具体内容</label><textarea id="pd">${esc(x.details||'')}</textarea></div>
  <div class="field"><label>进展 / 蒙应允记录</label><textarea id="pp">${esc(x.progress||'')}</textarea></div>
  <button class="primary" onclick="savePrayer('${x.id}')">保存</button>`);
  document.getElementById('pcat').value=x.category;document.getElementById('ps').value=x.status
}
function savePrayer(id){
  let old=db.prayers.find(p=>p.id===id),x={id,title:val('pt').trim(),category:val('pcat'),status:val('ps'),details:val('pd').trim(),progress:val('pp').trim(),createdAt:old?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()},i=db.prayers.findIndex(p=>p.id===id);
  i>=0?db.prayers[i]=x:db.prayers.push(x);save();closeModal()
}

function openPrayerToday(){
  let active=db.prayers.filter(p=>!['answered','closed'].includes(p.status)),old=db.prayerLogs.filter(l=>l.date===today()&&l.prayerId);
  let rows=active.map(p=>`<label class="check"><input class="pcheck" type="checkbox" value="${p.id}" ${old.some(l=>l.prayerId===p.id)?'checked':''}><span><strong>${esc(p.title)}</strong><div class="meta">${esc(p.category)}</div></span></label>`).join('');
  let temp=db.prayerLogs.filter(l=>l.date===today()&&!l.prayerId).map(l=>l.text).join('\n');
  modal(`<div class="sheethead"><h2>今日祷告</h2><button class="iconbtn" onclick="closeModal()">✕</button></div><div class="note">长期事项只勾选今天是否祷告过，不需要每天重写。</div>${rows||'<div class="empty">还没有长期祷告事项。</div>'}<div class="field"><label>今天临时想祷告的内容</label><textarea id="temp">${esc(temp)}</textarea></div><button class="primary" onclick="savePrayerToday()">保存</button>`)
}
function savePrayerToday(){
  db.prayerLogs=db.prayerLogs.filter(l=>l.date!==today());
  document.querySelectorAll('.pcheck:checked').forEach(x=>db.prayerLogs.push({id:uid(),date:today(),prayerId:x.value,text:''}));
  let t=val('temp').trim();if(t)db.prayerLogs.push({id:uid(),date:today(),prayerId:null,text:t});
  save();closeModal()
}
