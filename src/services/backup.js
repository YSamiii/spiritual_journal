function exportData(){let a=document.createElement('a'),b=new Blob([JSON.stringify(db,null,2)],{type:'application/json'});a.href=URL.createObjectURL(b);a.download='spiritual-journal-backup-'+today()+'.json';a.click()}
function importData(e){let r=new FileReader();r.onload=()=>{try{db=migrate(JSON.parse(r.result));save();alert('导入完成')}catch(_){alert('文件格式不正确')}};r.readAsText(e.target.files[0])}
