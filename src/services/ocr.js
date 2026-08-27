function openScan(){modal(`<div class="sheethead"><h2>拍照摘录经文</h2><button class="iconbtn" onclick="closeModal()">✕</button></div><input type="file" accept="image/*" capture="environment" onchange="scanFile=this.files[0]"><div class="actions"><button class="primary" onclick="runScan()">开始识别</button></div><div id="scanStatus" class="note"></div><div id="scanOut" style="display:none"><textarea id="scanText"></textarea><input id="scanRef" placeholder="出处"><div class="actions"><button class="primary" onclick="saveScan()">保存为今天的经文</button></div></div>`)}
async function runScan(){
  if(!scanFile)return alert('请先选择照片');
  document.getElementById('scanStatus').textContent='正在识别…';
  try{
    let text='',reference='',url=db.settings.ocrBackendUrl;
    if(url){try{let fd=new FormData();fd.append('image',scanFile);let r=await fetch(url,{method:'POST',body:fd});let d=await r.json();text=d.text||d.ocrText||'';reference=d.reference||''}catch(e){}}
    if(!text){let w=await Tesseract.createWorker(['chi_sim','eng']);let r=await w.recognize(scanFile);text=r.data.text||'';await w.terminate()}
    document.getElementById('scanText').value=text.trim();document.getElementById('scanRef').value=reference;document.getElementById('scanOut').style.display='block';document.getElementById('scanStatus').textContent='识别完成，请核对后再保存。'
  }catch(e){document.getElementById('scanStatus').textContent='识别失败。'}
}
function saveScan(){db.verses.push({id:uid(),date:today(),text:val('scanText'),reference:val('scanRef'),tags:'',note:'',source:'ocr',createdAt:new Date().toISOString()});save();closeModal()}
