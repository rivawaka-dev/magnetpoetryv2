let magnets = [];
let selected = null;
let offset, scaler;
let bg, hazeLayer, softLayer, button, shuffleBtn;
let currentPoemMagnets = [];
let dragMoved = false;
let hazeBursts = [];

const SPRING_K = 0.12;
const DAMPING = 0.75;
const ANG_K = 0.12;
const ANG_DAMP = 0.75;

const palette = [
  [255, 115, 175],
  [255, 170, 105],
  [255, 230, 145],
  [130, 255, 205],
  [120, 235, 255],
  [155, 175, 255],
  [215, 145, 255]
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
  // food
  "watermelon","strawberry","banana","apple","orange","lemon","tomato","cucumber","rice","ramen","kimchi","tofu","egg","cheese","yogurt","milk","coffee","tea","bread","butter","honey","cookie","noodle","dumpling","garlic","onion","potato","cake","sandwich","soup",
  "西瓜","草莓","香蕉","苹果","橘子","柠檬","番茄","黄瓜","米饭","拉面","泡菜","豆腐","鸡蛋","奶酪","酸奶","牛奶","咖啡","茶","面包","黄油","蜂蜜","饼干","饺子","大蒜","洋葱","土豆","蛋糕","汤",
  "수박","딸기","바나나","사과","오렌지","레몬","토마토","오이","밥","라면","김치","두부","계란","치즈","요거트","우유","커피","차","빵","버터","꿀","쿠키","만두","마늘","양파","감자","케이크","국",
  "すいか","いちご","バナナ","りんご","みかん","レモン","トマト","きゅうり","ご飯","ラーメン","キムチ","豆腐","卵","チーズ","ヨーグルト","牛乳","コーヒー","お茶","パン","バター","はちみつ","クッキー","餃子","にんにく","玉ねぎ","じゃがいも","ケーキ","味噌汁",
  "pastèque","fraise","banane","pomme","orange","citron","tomate","concombre","riz","ramen","kimchi","tofu","œuf","fromage","yaourt","lait","café","thé","pain","beurre","miel","biscuit","ravioli","ail","oignon","pomme de terre","gâteau","soupe",

  // household / objects
  "chair","table","window","door","key","wallet","phone","laptop","camera","pencil","notebook","umbrella","shoe","sock","towel","blanket","lamp","mirror","radio","television","ticket","receipt","bag","bottle","cup","plate","spoon","fork","knife",
  "椅子","桌子","窗户","门","钥匙","钱包","手机","电脑","相机","铅笔","笔记本","雨伞","鞋子","袜子","毛巾","毯子","灯","镜子","收音机","电视","车票","小票","包","瓶子","杯子","盘子","勺子","叉子","刀",
  "의자","테이블","창문","문","열쇠","지갑","휴대폰","노트북","카메라","연필","노트","우산","신발","양말","수건","담요","램프","거울","라디오","텔레비전","표","영수증","가방","병","컵","접시","숟가락","포크","칼",
  "椅子","テーブル","窓","ドア","鍵","財布","スマホ","パソコン","カメラ","鉛筆","ノート","傘","靴","靴下","タオル","毛布","ランプ","鏡","ラジオ","テレビ","切符","レシート","バッグ","瓶","コップ","皿","スプーン","フォーク","ナイフ",
  "chaise","table","fenêtre","porte","clé","portefeuille","téléphone","ordinateur","caméra","crayon","carnet","parapluie","chaussure","chaussette","serviette","couverture","lampe","miroir","radio","télévision","ticket","reçu","sac","bouteille","tasse","assiette","cuillère","fourchette","couteau",

  // places / nature / animals
  "station","library","museum","bakery","market","school","garden","bridge","beach","river","tree","cloud","rain","cat","dog","fish","whale","rabbit","bird","fox",
  "车站","图书馆","美术馆","面包店","市场","学校","花园","桥","海边","河","树","云","雨","猫","狗","鱼","鲸鱼","兔子","鸟","狐狸",
  "역","도서관","미술관","빵집","시장","학교","정원","다리","바다","강","나무","구름","비","고양이","개","물고기","고래","토끼","새","여우",
  "駅","図書館","美術館","パン屋","市場","学校","庭","橋","海","川","木","雲","雨","猫","犬","魚","鯨","うさぎ","鳥","狐",
  "gare","bibliothèque","musée","boulangerie","marché","école","jardin","pont","plage","rivière","arbre","nuage","pluie","chat","chien","poisson","baleine","lapin","oiseau","renard"
];

const verbs = [
  "waits","opens","falls","rolls","melts","returns","shines","floats","drifts","spills","rings","sleeps","remembers","vanishes",
  "等待","打开","落下","滚动","融化","回来","发光","漂浮","漂流","洒出","响起","睡觉","记得","消失",
  "기다린다","열린다","떨어진다","굴러간다","녹는다","돌아온다","빛난다","뜬다","흐른다","쏟아진다","울린다","잠든다","기억한다","사라진다",
  "待つ","開く","落ちる","転がる","溶ける","戻る","光る","浮かぶ","漂う","こぼれる","鳴る","眠る","覚えている","消える",
  "attend","s’ouvre","tombe","roule","fond","revient","brille","flotte","dérive","déborde","sonne","dort","se souvient","disparaît"
];

const adverbs = [
  "slowly","softly","again","tonight","nearby","quietly","almost","suddenly",
  "慢慢地","轻轻地","再次","今晚","附近","安静地","差一点","突然",
  "천천히","부드럽게","다시","오늘밤","근처에","조용히","거의","갑자기",
  "ゆっくり","そっと","また","今夜","近くで","静かに","ほとんど","突然",
  "lentement","doucement","encore","ce soir","près","silencieusement","presque","soudain"
];

const prepositions = [
  "beside","inside","under","above","near","through","behind","around",
  "旁边","里面","下面","上方","附近","穿过","后面","周围",
  "옆에","안에","아래에","위에","가까이","지나","뒤에","주위에",
  "そばに","中で","下に","上に","近く","通って","後ろに","周りに",
  "près de","dans","sous","au-dessus","près","à travers","derrière","autour de"
];

const words = Array.from(new Set([
  ...determiners, ...adjectives, ...nouns, ...verbs, ...adverbs, ...prepositions
]));

function randomFrom(arr) {
  return arr[floor(random(arr.length))];
}

function hashWord(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function colorForWord(word) {
  return palette[hashWord(word) % palette.length];
}

class Magnet {
  constructor(pos, val, ang = 0) {
    this.pos = pos.copy();
    this.target = pos.copy();
    this.vel = createVector(0, 0);
    this.ang = ang;
    this.angTarget = ang;
    this.angVel = 0;
    this.val = val;
    this.home = pos.copy();
    this.isInPoem = false;
    this.displayCap = false;
    this.displaySuffix = "";
    this.displayOverride = "";
    this.col = 255;
    this.updateDimensions();
  }

  text() {
    let t = this.displayOverride || this.val;
    if (this.displayCap && /^[a-zA-ZÀ-ÿ]/.test(t)) {
      t = t.charAt(0).toUpperCase() + t.slice(1);
    }
    return t + this.displaySuffix;
  }

  surface() {
    return (this.displayOverride || this.val).toLowerCase();
  }

  updateDimensions() {
    textSize(13 * scaler);
    this.w = textWidth(this.text()) + 18 * scaler;
    this.h = 30 * scaler;
  }

  update() {
    this.vel.x += (this.target.x - this.pos.x) * SPRING_K - this.vel.x * DAMPING;
    this.vel.y += (this.target.y - this.pos.y) * SPRING_K - this.vel.y * DAMPING;
    this.pos.add(this.vel);

    this.angVel += (this.angTarget - this.ang) * ANG_K - this.angVel * ANG_DAMP;
    this.ang += this.angVel;
  }

  contains(px, py) {
    return abs(px - this.pos.x) < this.w / 2 && abs(py - this.pos.y) < this.h / 2;
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.ang);
    rectMode(CENTER);

    noStroke();
    fill(0, 95);
    rect(2, 2, this.w, this.h, 5);

    stroke(0, 90);
    fill(this.col);
    rect(0, 0, this.w, this.h, 5);

    noStroke();
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(13 * scaler);
    text(this.text(), 0, 1);

    pop();
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  scaler = height / 628;
  textFont("system-ui");

  bg = createGraphics(width, height);
  hazeLayer = createGraphics(max(1, floor(width / 3)), max(1, floor(height / 3)));
  softLayer = createGraphics(max(1, floor(width / 6)), max(1, floor(height / 6)));

  makeBackground();

  button = createButton("Scatter Magnets and Start Over");
  button.position(8, 8);
  button.mousePressed(resetEverything);

  shuffleBtn = createButton("Shuffle Poem");
  shuffleBtn.position(8, 48);
  shuffleBtn.mousePressed(shufflePoem);

  makeMagnets();
  makePoem();
}

function makeBackground() {
  bg.background(8, 9, 14);
  bg.textAlign(CENTER, CENTER);
  bg.textSize(12);

  const chars = ["🍉","夢","빛","月","r","ê","0","1","夜","駅","猫","꽃","m","n","茶","김"];

  for (let y = 0; y < height; y += 18) {
    for (let x = 0; x < width; x += 18) {
      bg.noStroke();
      bg.fill(180, 220, 255, random(8, 26));
      bg.text(random(chars), x, y);
    }
  }

  bg.stroke(255, 12);
  for (let y = 0; y < height; y += 3) bg.line(0, y, width, y);
}

function makeMagnets() {
  magnets = [];

  for (let w of words) {
    let x = random(-width * 0.47, width * 0.47);
    let y = random(-height * 0.43, height * 0.43);

    if (abs(x) < width * 0.2) x += width * 0.28 * random([-1, 1]);
    if (abs(y) < height * 0.13) y += height * 0.28 * random([-1, 1]);

    magnets.push(new Magnet(createVector(x, y), w, random(-0.12, 0.12)));
  }
}

function makePoem() {
  for (let m of magnets) {
    if (m.isInPoem) {
      m.isInPoem = false;
      m.displayCap = false;
      m.displaySuffix = "";
      m.displayOverride = "";
      m.target = m.home.copy();
      m.angTarget = random(-0.12, 0.12);
    }
  }

  const templates = [
    ["DET","ADJ","NOUN","VERB","ADV","PREP","DET","NOUN"],
    ["DET","NOUN","VERB","PREP","DET","ADJ","NOUN","ADV"],
    ["DET","NOUN","VERB","ADV","PREP","DET","NOUN","NOUN"],
    ["ADJ","NOUN","VERB","PREP","DET","NOUN","ADV","NOUN"]
  ];

  const template = randomFrom(templates);

  const chosenWords = template.map(tag => {
    if (tag === "DET") return randomFrom(determiners);
    if (tag === "ADJ") return randomFrom(adjectives);
    if (tag === "NOUN") return randomFrom(nouns);
    if (tag === "VERB") return randomFrom(verbs);
    if (tag === "ADV") return randomFrom(adverbs);
    if (tag === "PREP") return randomFrom(prepositions);
  });

  let chosen = chosenWords.map(w => magnets.find(m => m.val === w)).filter(Boolean);
  if (chosen.length < 8) return;

  chosen.forEach(m => {
    m.displayCap = false;
    m.displaySuffix = "";
    m.displayOverride = "";
  });

  chosen[0].displayCap = true;
  chosen[7].displaySuffix = ".";
  chosen.forEach(m => m.updateDimensions());

  let gap = 10 * scaler;
  let totalW = chosen.reduce((s, m) => s + m.w, 0) + gap * 7;
  let x = -totalW / 2;

  currentPoemMagnets = [];

  for (let m of chosen) {
    m.isInPoem = true;
    m.target.set(x + m.w / 2, 0);
    m.angTarget = 0;
    currentPoemMagnets.push(m);
    x += m.w + gap;
  }

  triggerHaze();
}

function triggerHaze() {
  hazeBursts = [];

  for (let i = 0; i < currentPoemMagnets.length; i++) {
    let m = currentPoemMagnets[i];

    hazeBursts.push({
      x: width / 2 + m.target.x,
      y: height / 2 + m.target.y,
      c: colorForWord(m.surface()),
      age: -i * 4,
      life: 115,
      seed: random(10000),
      driftX: random(-18, 18),
      driftY: random(-12, 12)
    });
  }
}

function drawHaze() {
  hazeLayer.clear();
  softLayer.clear();

  hazeLayer.noStroke();
  softLayer.noStroke();

  for (let b of hazeBursts) {
    b.age++;
    if (b.age < 0 || b.age > b.life) continue;

    let t = b.age / b.life;
    let bloom = sin(PI * t);
    let fade = pow(bloom, 1.35);

    let hx = map(b.x + b.driftX * t, 0, width, 0, hazeLayer.width);
    let hy = map(b.y + b.driftY * t, 0, height, 0, hazeLayer.height);

    let sx = map(b.x + b.driftX * t, 0, width, 0, softLayer.width);
    let sy = map(b.y + b.driftY * t, 0, height, 0, softLayer.height);

    let baseW = (145 + 180 * t) * scaler / 3;
    let baseH = (50 + 95 * t) * scaler / 3;

    let softW = (340 + 340 * t) * scaler / 6;
    let softH = (105 + 145 * t) * scaler / 6;

    let angle = noise(b.seed) * TWO_PI;

    softLayer.push();
    softLayer.translate(sx, sy);
    softLayer.rotate(angle + t * 0.45);
    softLayer.fill(b.c[0], b.c[1], b.c[2], 18 * fade);
    softLayer.ellipse(0, 0, softW, softH);
    softLayer.fill(b.c[0], b.c[1], b.c[2], 9 * fade);
    softLayer.ellipse(softW * 0.12, -softH * 0.12, softW * 0.72, softH * 1.35);
    softLayer.pop();

    for (let k = 0; k < 4; k++) {
      let n = noise(b.seed + k * 20, t * 1.7);
      let ox = map(n, 0, 1, -26, 26) * scaler / 3;
      let oy = map(noise(b.seed + k * 31, t * 1.7), 0, 1, -12, 12) * scaler / 3;

      hazeLayer.push();
      hazeLayer.translate(hx + ox, hy + oy);
      hazeLayer.rotate(angle + k * 0.65 + t * 0.65);
      hazeLayer.fill(b.c[0], b.c[1], b.c[2], 20 * fade);
      hazeLayer.ellipse(0, 0, baseW * random(0.8, 1.25), baseH * random(0.75, 1.35));
      hazeLayer.pop();
    }
  }

  push();
  blendMode(ADD);
  image(softLayer, 0, 0, width, height);
  image(hazeLayer, 0, 0, width, height);
  blendMode(BLEND);
  pop();

  hazeBursts = hazeBursts.filter(b => b.age <= b.life);
}

function draw() {
  image(bg, 0, 0);
  drawHaze();

  translate(width / 2, height / 2);

  for (let m of magnets) {
    if (m !== selected) m.update();
    m.show();
  }
}

function shufflePoem() {
  makePoem();
}

function resetEverything() {
  makeMagnets();
  makePoem();
}

function mousePressed() {
  dragMoved = false;

  for (let i = magnets.length - 1; i >= 0; i--) {
    let m = magnets[i];
    if (m.contains(mouseX - width / 2, mouseY - height / 2)) {
      selected = m;
      offset = createVector(m.pos.x - mouseX, m.pos.y - mouseY);
      m.col = 210;
      break;
    }
  }
}

function mouseDragged() {
  if (selected) {
    selected.pos.x = mouseX + offset.x;
    selected.pos.y = mouseY + offset.y;
    selected.target.set(selected.pos.x, selected.pos.y);
    dragMoved = true;
  }
}

function mouseReleased() {
  if (selected) {
    selected.col = 255;

    if (!selected.isInPoem) {
      selected.home = selected.pos.copy();
    } else if (!dragMoved) {
      swapWord(selected);
      triggerHaze();
    }

    selected = null;
  }
}

function swapWord(m) {
  let pool = nouns;

  if (determiners.includes(m.val)) pool = determiners;
  else if (adjectives.includes(m.val)) pool = adjectives;
  else if (nouns.includes(m.val)) pool = nouns;
  else if (verbs.includes(m.val)) pool = verbs;
  else if (adverbs.includes(m.val)) pool = adverbs;
  else if (prepositions.includes(m.val)) pool = prepositions;

  let next = randomFrom(pool);
  while (next === m.surface()) next = randomFrom(pool);

  m.displayOverride = next;
  m.updateDimensions();
}

function keyPressed() {
  if (key === " " || key === "s" || key === "S") shufflePoem();
}

function doubleClicked() {
  shufflePoem();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  scaler = height / 628;

  bg = createGraphics(width, height);
  hazeLayer = createGraphics(max(1, floor(width / 3)), max(1, floor(height / 3)));
  softLayer = createGraphics(max(1, floor(width / 6)), max(1, floor(height / 6)));

  makeBackground();
}
