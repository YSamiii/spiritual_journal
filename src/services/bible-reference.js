const BOOKS=[
'创世记','出埃及记','利未记','民数记','申命记','约书亚记','士师记','路得记','撒母耳记上','撒母耳记下',
'列王纪上','列王纪下','历代志上','历代志下','以斯拉记','尼希米记','以斯帖记','约伯记','诗篇','箴言',
'传道书','雅歌','以赛亚书','耶利米书','耶利米哀歌','以西结书','但以理书','何西阿书','约珥书','阿摩司书',
'俄巴底亚书','约拿书','弥迦书','那鸿书','哈巴谷书','西番雅书','哈该书','撒迦利亚书','玛拉基书',
'马太福音','马可福音','路加福音','约翰福音','使徒行传','罗马书','哥林多前书','哥林多后书','加拉太书',
'以弗所书','腓立比书','歌罗西书','帖撒罗尼迦前书','帖撒罗尼迦后书','提摩太前书','提摩太后书','提多书',
'腓利门书','希伯来书','雅各书','彼得前书','彼得后书','约翰一书','约翰二书','约翰三书','犹大书','启示录'
];

const BOOK_INDEX=new Map(BOOKS.map((book,index)=>[book,index]));

function normalizeReference(value){
  return String(value||'')
    .normalize('NFKC')
    .replace(/[\u200B-\u200D\uFEFF]/g,'')
    .replace(/\s+/g,' ')
    .trim();
}

function chineseNumberToInt(value){
  const s=String(value||'').trim();
  if(!s)return null;
  if(/^\d+$/.test(s))return Number(s);
  const digit={'零':0,'〇':0,'一':1,'二':2,'两':2,'三':3,'四':4,'五':5,'六':6,'七':7,'八':8,'九':9};
  let total=0,current=0,seen=false;
  for(const ch of s){
    if(ch in digit){current=digit[ch];seen=true;continue;}
    if(ch==='十'){total+=(current||1)*10;current=0;seen=true;continue;}
    if(ch==='百'){total+=(current||1)*100;current=0;seen=true;continue;}
    return null;
  }
  return seen?total+current:null;
}

function detectBook(raw){
  // Exact canonical names only. Longest-first prevents future prefix collisions.
  const ordered=[...BOOKS].sort((a,b)=>b.length-a.length);
  for(const book of ordered){
    if(raw.includes(book))return book;
  }
  return null;
}

function parseBibleReference(value){
  const raw=normalizeReference(value);
  const book=detectBook(raw);
  if(!book)return null;

  let tail=raw.replace(book,' ').trim();
  let m=tail.match(/([零〇一二两三四五六七八九十百\d]+)\s*章\s*([零〇一二两三四五六七八九十百\d]+)\s*节?/);
  if(!m)m=tail.match(/([零〇一二两三四五六七八九十百\d]+)\s*[:：]\s*([零〇一二两三四五六七八九十百\d]+)/);

  const chapter=m?chineseNumberToInt(m[1]):null;
  const verse=m?chineseNumberToInt(m[2]):null;

  return {
    raw,
    book,
    bookIndex:BOOK_INDEX.get(book),
    chapter:Number.isFinite(chapter)?chapter:Number.MAX_SAFE_INTEGER,
    verse:Number.isFinite(verse)?verse:Number.MAX_SAFE_INTEGER
  };
}

function compare(a,b){
  const x=parseBibleReference(a),y=parseBibleReference(b);
  if(x&&!y)return -1;
  if(!x&&y)return 1;
  if(!x&&!y)return normalizeReference(a).localeCompare(normalizeReference(b),'zh-CN');
  if(x.bookIndex!==y.bookIndex)return x.bookIndex-y.bookIndex;
  if(x.chapter!==y.chapter)return x.chapter-y.chapter;
  if(x.verse!==y.verse)return x.verse-y.verse;
  return x.raw.localeCompare(y.raw,'zh-CN');
}
