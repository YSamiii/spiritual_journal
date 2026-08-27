function renderPrayers(){
  let f=document.getElementById('pFilter').value||'all',xs=db.prayers.filter(p=>f==='all'||p.status===f);
  document.getElementById('prayerList').innerHTML=xs.length?xs.map(p=>`<div class="card" onclick="openPrayer('${p.id}')"><div class="row"><div class="title">${esc(p.title)}</div><span class="tag">${{ongoing:'持续祷告',waiting:'等候中',answered:'已蒙应允',closed:'已结束'}[p.status]}</span></div><div class="meta">${esc(p.category)} · 已祷告 ${db.prayerLogs.filter(l=>l.prayerId===p.id).length} 次</div>${p.details?`<div class="body">${lines(p.details)}</div>`:''}</div>`).join(''):'<div class="empty">还没有长期祷告事项。</div>'
}
