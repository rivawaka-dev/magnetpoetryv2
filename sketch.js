const stage = document.getElementById("stage");
const glow = document.getElementById("glow");
const shuffleBtn = document.getElementById("shuffle");
const scatterBtn = document.getElementById("scatter");

const palette = [
  [255, 80, 155],
  [255, 135, 70],
  [255, 220, 95],
  [100, 255, 185],
  [80, 225, 255],
  [120, 145, 255],
  [205, 110, 255]
];

const determiners = [
  "the","a","this","that","my","your","our",
  "这","那","我的","你的","一个",
  "이","그","내","너의","우리",
  "この","その","私の","君の","あの",
  "le","la","un","une","ce","cette","mon","ton","notre"
];

const adjectives = [
  "fresh","cold","warm","sweet","tiny","plastic","silver","blue","red","green","cheap","broken","soft","empty","late","lost",
  "新鲜","冰冷","温暖","甜的","小小的","塑料","银色","蓝色","红色","绿色","便宜","坏掉的","柔软","空的",
  "신선한","차가운","따뜻한","달콤한","작은","플라스틱","은빛","파란","빨간","초록","싼","고장난","부드러운","빈",
  "新鮮な","冷たい","暖かい","甘い","小さい","プラスチックの","銀色の","青い","赤い","緑の","安い","壊れた","柔らかい","空っぽの",
  "frais","froid","chaud","sucré","petit","plastique","argenté","bleu","rouge","vert","cassé","doux","vide"
];

const nouns = [
  "watermelon","strawberry","banana","apple","orange","lemon","tomato","cucumber","rice","ramen","kimchi","tofu","egg","cheese","yogurt","milk","coffee","tea","bread","butter","honey","cookie","noodle","dumpling","garlic","onion","potato","cake","sandwich","soup",
  "西瓜","草莓","香蕉","苹果","橘子","柠檬","番茄","黄瓜","米饭","拉面","泡菜","豆腐","鸡蛋","奶酪","酸奶","牛奶","咖啡","茶","面包","黄油","蜂蜜","饼干","饺子","大蒜","洋葱","土豆","蛋糕","汤",
  "수박","딸기","바나나","사과","오렌지","레몬","토마토","오이","밥","라면","김치","두부","계란","치즈","요거트","우유","커피","차","빵","버터","꿀","쿠키","만두","마늘","양파","감자","케이크","국",
  "すいか","いちご","バナナ","りんご","みかん","レモン","トマト","きゅうり","ご飯","ラーメン","キムチ","豆腐","卵","チーズ","ヨーグルト","牛乳","コーヒー","お茶","パン","バター","はちみつ","クッキー","餃子","にんにく","玉ねぎ","じゃがいも","ケーキ","味噌汁",
  "pastèque","fraise","banane","pomme","orange","citron","tomate","concombre","riz","ramen","kimchi","tofu","œuf","fromage","yaourt","lait","café","thé","pain","beurre","miel","biscuit","ravioli","ail","oignon","pomme de terre","gâteau","soupe",
  "chair","table","window","door","key","wallet","phone","laptop","camera","pencil","notebook","umbrella","shoe","sock","towel","blanket","lamp","mirror","radio","television","ticket","receipt","bag","bottle","cup","plate","spoon","fork","knife",
  "station","library","museum","bakery","market","school","garden","bridge","beach","river","tree","cloud","rain","cat","dog","fish","whale","rabbit","bird","fox",
  "椅子","桌子","窗户","门","钥匙","钱包","手机","电脑","相机","铅笔","笔记本","雨伞","鞋子","袜子","毛巾","毯子","灯","镜子","电视","车票","包","瓶子","杯子",
  "의자","테이블","창문","문","열쇠","지갑","휴대폰","노트북","카메라","연필","우산","신발","양말","수건","담요","거울","가방","컵","고양이","개",
  "椅子","テーブル","窓","ドア","鍵","財布","スマホ","パソコン","カメラ","鉛筆","傘","靴","靴下","タオル","毛布","鏡","バッグ","コップ","猫","犬",
  "chaise","table","fenêtre","porte","clé","téléphone","ordinateur","caméra","crayon","parapluie","chaussure","miroir","sac","tasse","chat","chien"
];

const verbs = [
  "waits","opens","falls","rolls","melts","returns","shines","floats","drifts","spills","rings","sleeps","remembers","vanishes",
  "等待","打开","落下","滚动","融化","回来","发光","漂浮","洒出","响起","睡觉","记得","消失",
  "기다린다","열린다","떨어진다","녹는다","돌아온다","빛난다","뜬다","흐른다","잠든다","기억한다","사라진다",
  "待つ","開く","落ちる","溶ける","戻る","光る","浮かぶ","漂う","眠る","覚えている","消える",
  "attend","tombe","roule","fond","revient","brille","flotte","dérive","sonne","dort","disparaît"
];

const adverbs = [
  "slowly","softly","again","tonight","nearby","quietly","almost","suddenly",
  "慢慢地","轻轻地","再次","今晚","附近","安静地","突然",
  "천천히","부드럽게","다시","오늘밤","조용히","갑자기",
  "ゆっくり","そっと","また","今夜","静かに","突然",
  "lentement","doucement","encore","ce soir","silencieusement","soudain"
];

const prepositions = [
  "beside","inside","under","above","near","through","behind","around",
  "旁边","里面","下面","上方","附近","穿过","后面",
  "옆에","안에","아래에","위에","가까이","뒤에",
  "そばに","中で","下に","上に","近く","後ろに",
  "près de","dans","sous","au-dessus","derrière"
];

const pools = {
  DET: determiners,
  ADJ: adjectives,
  NOUN: nouns,
  VERB: verbs,
  ADV: adverbs,
  PREP: prepositions
};

const allWords = [...new Set([
  ...determiners,
  ...adjectives,
  ...nouns,
  ...verbs,
  ...adverbs,
  ...prepositions
])];

const templates = [
  ["DET","ADJ","NOUN","VERB","ADV","PREP","DET","NOUN"],
  ["DET","NOUN","VERB","PREP","DET","ADJ","NOUN","ADV"],
  ["DET","NOUN","VERB","ADV","PREP","DET","NOUN","NOUN"],
  ["ADJ","NOUN","VERB","PREP","DET","NOUN","ADV","NOUN"]
];

let magnets = [];
let poemMagnets = [];
let drag = null;
let topZ = 100;

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function random(min, max) {
  return min + Math.random() * (max - min);
}

function hashWord(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function colorForWord(word) {
  return palette[hashWord(word.toLowerCase()) % palette.length];
}

function createMagnet(word) {
  const el = document.createElement("div");
  el.className = "magnet";
  el.dataset.base = word;
  el.dataset.pos = getPos(word);
  el.textContent = word;

  const x = random(20, window.innerWidth - 120);
  const y = random(90, window.innerHeight - 60);
  const r = random(-7, 7);

  const magnet = {
    el,
    base: word,
    text: word,
    homeX: x,
    homeY: y,
    x,
    y,
    r,
    inPoem: false
  };

  setMagnetPosition(magnet, x, y, r);

  el.addEventListener("pointerdown", (e) => startDrag(e, magnet));
  el.addEventListener("click", () => {
    if (magnet.inPoem) {
      swapMagnet(magnet);
      triggerGlow();
    }
  });

  stage.appendChild(el);
  return magnet;
}

function getPos(word) {
  if (determiners.includes(word)) return "DET";
  if (adjectives.includes(word)) return "ADJ";
  if (nouns.includes(word)) return "NOUN";
  if (verbs.includes(word)) return "VERB";
  if (adverbs.includes(word)) return "ADV";
  if (prepositions.includes(word)) return "PREP";
  return "NOUN";
}

function setMagnetPosition(m, x, y, r = m.r) {
  m.x = x;
  m.y = y;
  m.r = r;
  m.el.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg)`;
}

function scatter() {
  stage.innerHTML = "";
  magnets = [];

  for (const word of allWords) {
    magnets.push(createMagnet(word));
  }

  makePoem();
}

function makePoem() {
  for (const m of poemMagnets) {
    m.inPoem = false;
    m.el.classList.remove("poem");
    m.el.textContent = m.text;
    setMagnetPosition(m, m.homeX, m.homeY, random(-7, 7));
  }

  poemMagnets = [];

  const template = rand(templates);
  const words = template.map(tag => rand(pools[tag]));
  const chosen = words.map(w => magnets.find(m => m.base === w)).filter(Boolean);

  if (chosen.length < 8) return;

  chosen.forEach((m, i) => {
    m.inPoem = true;
    m.el.classList.add("poem");
    m.el.style.zIndex = ++topZ;

    let text = m.text;
    if (i === 0 && /^[a-zA-ZÀ-ÿ]/.test(text)) {
      text = text.charAt(0).toUpperCase() + text.slice(1);
    }
    if (i === chosen.length - 1) text += ".";
    m.el.textContent = text;
  });

  const gap = 10;
  const widths = chosen.map(m => m.el.offsetWidth);
  const total = widths.reduce((a, b) => a + b, 0) + gap * (chosen.length - 1);

  let x = window.innerWidth / 2 - total / 2;
  const y = window.innerHeight / 2 - 18;

  chosen.forEach((m, i) => {
    const targetX = x;
    const targetY = y;
    setMagnetPosition(m, targetX, targetY, 0);
    poemMagnets.push(m);
    x += widths[i] + gap;
  });

  triggerGlow();
}

function triggerGlow() {
  if (poemMagnets.length === 0) return;

  const gradients = [];
  const first = poemMagnets[0];
  const last = poemMagnets[poemMagnets.length - 1];

  const left = first.x;
  const right = last.x + last.el.offsetWidth;
  const centerY = window.innerHeight / 2;

  poemMagnets.forEach((m, i) => {
    const [r, g, b] = colorForWord(m.text);
    const cx = m.x + m.el.offsetWidth / 2;
    const cy = m.y + m.el.offsetHeight / 2;

    gradients.push(
      `radial-gradient(ellipse at ${cx}px ${cy}px,
        rgba(${r},${g},${b},0.75) 0%,
        rgba(${r},${g},${b},0.32) 18%,
        rgba(${r},${g},${b},0.10) 36%,
        transparent 62%)`
    );
  });

  for (let i = 0; i < 12; i++) {
    const t = i / 11;
    const [r, g, b] = palette[i % palette.length];
    const cx = left + (right - left) * t + random(-90, 90);
    const cy = centerY + random(-55, 55);

    gradients.push(
      `radial-gradient(ellipse at ${cx}px ${cy}px,
        rgba(${r},${g},${b},0.30) 0%,
        rgba(${r},${g},${b},0.15) 28%,
        transparent 68%)`
    );
  }

  glow.style.background = gradients.join(",");
  glow.classList.remove("active");
  void glow.offsetWidth;
  glow.classList.add("active");
}

function swapMagnet(m) {
  const pool = pools[m.el.dataset.pos] || nouns;
  let next = rand(pool);
  while (next === m.text) next = rand(pool);

  m.text = next;
  m.el.textContent = next;
}

function startDrag(e, magnet) {
  drag = {
    magnet,
    startX: e.clientX,
    startY: e.clientY,
    offsetX: e.clientX - magnet.x,
    offsetY: e.clientY - magnet.y
  };

  magnet.el.classList.add("dragging");
  magnet.el.style.zIndex = ++topZ;
  magnet.el.setPointerCapture(e.pointerId);
}

window.addEventListener("pointermove", (e) => {
  if (!drag) return;

  const m = drag.magnet;
  const x = e.clientX - drag.offsetX;
  const y = e.clientY - drag.offsetY;

  setMagnetPosition(m, x, y, m.r);
});

window.addEventListener("pointerup", () => {
  if (!drag) return;

  const m = drag.magnet;
  m.el.classList.remove("dragging");

  if (!m.inPoem) {
    m.homeX = m.x;
    m.homeY = m.y;
  }

  drag = null;
});

shuffleBtn.addEventListener("click", makePoem);
scatterBtn.addEventListener("click", scatter);

window.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key.toLowerCase() === "s") {
    e.preventDefault();
    makePoem();
  }
});

window.addEventListener("resize", () => {
  makePoem();
});

scatter();
