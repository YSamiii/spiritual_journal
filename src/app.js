function renderAll(){renderToday();renderBible();renderQuestions();renderPrayers();if(document.getElementById('backend'))document.getElementById('backend').value=db.settings.ocrBackendUrl||''}
if('serviceWorker'in navigator)navigator.serviceWorker.register('./service-worker.js').catch(()=>{});
renderAll();
