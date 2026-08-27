const C='spiritual-journal-v0.6-clean-baseline';
const A=[
  './','./index.html','./manifest.json','./styles/app.css',
  './src/core.js',
  './src/services/bible-reference.js',
  './src/models/verse.js','./src/models/question.js','./src/models/prayer.js','./src/models/gratitude.js','./src/models/daily-summary.js',
  './src/screens/today.js','./src/screens/bible.js','./src/screens/questions.js','./src/screens/prayers.js','./src/screens/review.js',
  './src/services/settings.js','./src/services/ocr.js','./src/services/backup.js','./src/app.js',
  './icons/icon-192.png','./icons/icon-512.png'
];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(resp=>{
    const copy=resp.clone();caches.open(C).then(c=>c.put(e.request,copy));return resp;
  }).catch(()=>caches.match('./index.html'))));
});
