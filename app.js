{
const CFG = window.PT_CONFIG || {};
const LIVE = !!(CFG.SUPABASE_URL && CFG.SUPABASE_ANON_KEY);
const BUCKET = 'slike';
const WA = '38766229923';
const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ---------- prijevodi ---------- */
const P = ['img/pom-osmijeh.jpg','img/pom-portret.jpg','img/pom-parket.jpg','img/pom-cvijece.jpg'];
const IC = {
  grooming:'<path d="M6 6l12 12M6 18L18 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="6" cy="6" r="2.6" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="6" cy="18" r="2.6" fill="none" stroke="currentColor" stroke-width="1.6"/>',
  seminari:'<path d="M4 6l8-3 8 3-8 3zM8 7.5v4.5c0 1.5 2 3 4 3s4-1.5 4-3V7.5M20 6v6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/>',
  hotel:'<path d="M3 20V10l9-6 9 6v10M9 20v-6h6v6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
  cuvanje:'<circle cx="8" cy="7" r="2" fill="currentColor"/><circle cx="16" cy="7" r="2" fill="currentColor"/><circle cx="5" cy="12" r="2" fill="currentColor"/><circle cx="19" cy="12" r="2" fill="currentColor"/><path d="M12 11c3 0 5 4 5 6s-2 3-5 2c-3 1-5 0-5-2s2-6 5-6z" fill="currentColor"/>',
  prevoz:'<rect x="2" y="7" width="13" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M15 10h4l3 3v4h-7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="7" cy="18" r="2" fill="currentColor"/><circle cx="18" cy="18" r="2" fill="currentColor"/>',
  ozon:'<path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="10" cy="14" r="1.4" fill="currentColor"/>'
};
const BOJE = ['narandzasta','krem','bijela','crna','sable','cokoladna','ostalo'];
const KAT = ['stenci','odrasli','grooming','ostalo'];

const T = {
bs:{n1:"Darija",n2:"Usluge",n3:"Štenci",n4:"Galerija",n5:"Pitanja",n6:"Kontakt",
h1:"Pomeranci odgajani <em>s ljubavlju</em>, u porodici",hp:"Više od 15 godina Darija Paspalj uzgaja, njeguje i školuje pomerance. Naši psi danas žive u više od 100 zemalja svijeta.",
b1:"Najnovija legla",b2:"Grooming i usluge",hs:"uzgajivač, groomer i edukator",s1:"godina iskustva",s2:"zemalja svijeta",s3:"dokumenti za štence",s4:"pratilaca na Instagramu",
ak:"Upoznajte uzgajivača",ah:"Pomeranci su dio <em>naše porodice</em>",ap:"Iza imena Pomeranian Toys stoji Darija Paspalj. Svako štene odrasta u našem domu, okruženo pažnjom, pa u novu porodicu stiže mirno, socijalizovano i naviknuto na ljude.",
ticks:["Štenci sa FCI dokumentima","Socijalizacija od prvih dana u porodičnom okruženju","Edukator na seminarima groominga pomeranaca"],ab:"Pratite nas na Instagramu",
fk:"Naša filozofija",fh:"Zdravlje, karakter i <em>ljepota</em>",
pil:[["Porodični uzgoj","Štenci rastu u kući, ne u boksu."],["Zdravlje na prvom mjestu","Pažljiv odabir roditelja i redovna briga."],["Savršena dlaka","Grooming tehnika specifična za pomerance."],["Podrška zauvijek","Tu smo za savjet i kad štene ode kući."]],
uh:"Sve za vašeg <em>ljubimca</em>",up:"Osim uzgoja, kroz ATK Company brinemo i o drugim psima, od šišanja do čuvanja dok ste na putu.",
phs:"Ovdje ide slika usluge",book:"Zakažite",isnew:"Edukacija",
svc:[
 {k:"grooming",o:"Grooming",t:"Grooming pomeranaca i drugih rasa",p:"Pomeranska dlaka je dvoslojna i zahtijeva posebnu tehniku: pogrešno šišanje može trajno oštetiti podlaku. Darija se više od 15 godina bavi upravo ovom rasom, a isto znanje primjenjujemo i na druge pse.",l:["Kupanje i sušenje fenom","Raščešljavanje i izlinjavanje podlake","Oblikovanje dlake i šišanje po želji","Njega šapa, kandži i ušiju"]},
 {k:"seminari",o:"Seminar groominga",t:"Seminari groominga",f:1,p:"Darija kao edukator vodi praktične seminare groominga za rasu njemački patuljasti špic – pomeranac. Namijenjeni su groomerima koji žele savladati tehniku oblikovanja pomeranske dlake.",l:["Teorija i rad na psu","Alat i tehnike za pomeransku dlaku","Certifikat o uspješno završenom seminaru"]},
 {k:"hotel",o:"Hotel za pse",t:"Hotel za pse",p:"Dok ste na putu, vaš ljubimac boravi kod ljudi koji pse zaista razumiju. Pazimo na njegove navike u ishrani, ritam šetnje i odmora, da se osjeća kao kod kuće.",l:["Smještaj na kraći ili duži period","Ishrana prema vašim uputama","Svakodnevne šetnje i pažnja"]},
 {k:"cuvanje",o:"Čuvanje / šetanje",t:"Čuvanje i šetanje",p:"Kada ste na poslu ili spriječeni, preuzimamo šetnje i brigu o vašem psu. Termine prilagođavamo vašem rasporedu.",l:["Redovne ili povremene šetnje","Čuvanje po dogovoru","Prilagođeno vašem rasporedu"]},
 {k:"prevoz",o:"Prevoz ljubimca",t:"Prevoz ljubimaca",p:"Siguran i miran prevoz vašeg ljubimca do veterinara, groomera, na aerodrom ili do novog doma, uz pažnju tokom cijele vožnje.",l:["Do veterinara i groomera","Do aerodroma ili novog doma","Mirna i sigurna vožnja"]},
 {k:"ozon",o:"Ozon terapija",t:"Ozon terapija",p:"Ozon tretman kao dodatak redovnom groomingu, za njegu kože i dlake. Pitajte nas da li je tretman pogodan za vašeg psa.",l:["Dodatak kupanju i groomingu","Njega kože i dlake","Savjet prije tretmana"]}],
pk:"Štenci",ph:"Kako do vašeg <em>šteneta</em>",pp:"Štence šaljemo širom svijeta. Pogledajte dostupna štenad ispod ili nam pošaljite upit.",
steps:[["Upit","Javite nam koje štene tražite: pol, boja i kada vam odgovara."],["Upoznavanje","Šaljemo dodatne slike i video i odgovaramo na sva pitanja."],["Dokumenti","Štene dobija FCI dokumente i sve što je potrebno za vašu zemlju."],["Dolazak kući","Lično preuzimanje u Banjoj Luci ili dostava do vas."]],
pb:"Pogledajte štence",pb2:"Pošaljite upit",
lk:"Najnovija legla",lh:"Štenci koji traže <em>dom</em>",fstatus:"Status",fpol:"Pol",fboja:"Boja",all:"Sve",allc:"Sve boje",
status:{dostupno:"Dostupno",rezervisano:"Rezervisano",prodato:"Prodato"},pol:{m:"Muško",z:"Žensko"},
boje:{narandzasta:"Narandžasta",krem:"Krem",bijela:"Bijela",crna:"Crna",sable:"Sable",cokoladna:"Čokoladna",ostalo:"Ostalo"},
born:"rođen/a",ask:"Pitajte za ovo štene",shown:n=>`Prikazano: ${n}`,none:"Trenutno nema štenaca za ovaj izbor. Pišite nam, nova legla stižu redovno.",
demo:"Primjeri štenaca za pregled. Prava štenad dodaje se kroz admin panel.",
gk:"Galerija",gh:"Naši <em>mali medvjedići</em>",kat:{stenci:"Štenci",odrasli:"Odrasli psi",grooming:"Grooming",ostalo:"Ostalo"},gnone:"Još nema slika u ovoj kategoriji.",
qk:"Pitanja",qh:"Često <em>pitate</em>",
faq:[["Da li šaljete štence u inostranstvo?","Da. Naši psi žive u više od 100 zemalja, a dostavu i papire organizujemo za vas."],["Kakve dokumente štene dobija?","Svako štene dolazi sa FCI dokumentima. Za detalje o vašoj zemlji pišite nam."],["Kako rezervisati štene?","Kod šteneta koje vam se sviđa kliknite „Pitajte za ovo štene“ ili nam pošaljite upit, pa dogovaramo detalje."],["Da li radite grooming i za druge rase?","Da. Kroz ATK Company radimo grooming, čuvanje, hotel i prevoz i za druge pse."],["Organizujete li seminare groominga?","Da, Darija vodi seminare groominga pomeranaca. Javite nam se za naredni termin."]],
ck:"Kontakt",ch:"Javite nam <em>se</em>",cp:"Za štence, grooming, seminare ili čuvanje pišite nam ili pozovite. Odgovaramo na našem i na engleskom jeziku.",
c1:"Telefon",wab:"WhatsApp poruka ili poziv",callb:"Pozovite",waf:"Pišite nam",c2:"Štenci",c3:"Usluge",c4:"Lokacija",f1:"Ime i prezime",f2:"Država",f3:"Zanima me",f4:"Poruka",f5:"Pošalji na WhatsApp",
ft:'Podržavamo <a href="https://humanostspaja.ba" target="_blank" rel="noopener">Udruženje Humanost spaja</a>',
opt0:"Štene pomeranca",opt9:"Nešto drugo",
err:"Upišite ime da bismo znali kome odgovaramo.",ok:"Otvaramo WhatsApp sa vašom porukom…",hi:"Zdravo, ja sam",from:"iz",int:"Zanima me",pupmsg:n=>`Zdravo, zanima me štene ${n}. Da li je još dostupno?`},
en:{n1:"Darija",n2:"Services",n3:"Puppies",n4:"Gallery",n5:"FAQ",n6:"Contact",
h1:"Pomeranians raised <em>with love</em>, in a family",hp:"For more than 15 years Darija Paspalj has bred, groomed and taught about Pomeranians. Our dogs now live in more than 100 countries.",
b1:"Latest litters",b2:"Grooming & services",hs:"breeder, groomer and educator",s1:"years of experience",s2:"countries worldwide",s3:"papers for puppies",s4:"followers on Instagram",
ak:"Meet the breeder",ah:"Pomeranians are part of <em>our family</em>",ap:"Behind Pomeranian Toys is Darija Paspalj. Every puppy grows up in our home, surrounded by attention, so it arrives at its new family calm, socialised and used to people.",
ticks:["Puppies with FCI papers","Socialised from day one in a family home","Educator at Pomeranian grooming seminars"],ab:"Follow us on Instagram",
fk:"Our philosophy",fh:"Health, temperament and <em>beauty</em>",
pil:[["Family breeding","Puppies grow up in the house, not in a kennel."],["Health first","Careful choice of parents and constant care."],["The perfect coat","A grooming technique made for Pomeranians."],["Support for life","We're here for advice long after your puppy goes home."]],
uh:"Everything for your <em>pet</em>",up:"Beyond breeding, through ATK Company we care for other dogs too, from grooming to sitting while you travel.",
phs:"Service photo goes here",book:"Book now",isnew:"Education",
svc:[
 {k:"grooming",o:"Grooming",t:"Grooming for Pomeranians and other breeds",p:"A Pomeranian has a double coat that needs a special technique: the wrong cut can permanently damage the undercoat. Darija has worked with this breed for more than 15 years, and we bring the same skill to other dogs.",l:["Bath and blow-dry","Brushing and deshedding the undercoat","Coat shaping and trimming to your wishes","Paw, nail and ear care"]},
 {k:"seminari",o:"Grooming seminar",t:"Grooming seminars",f:1,p:"As an educator, Darija runs hands-on grooming seminars for the German Toy Spitz – Pomeranian. They are made for groomers who want to master shaping the Pomeranian coat.",l:["Theory and work on a dog","Tools and techniques for the Pomeranian coat","Certificate of completion"]},
 {k:"hotel",o:"Dog hotel",t:"Dog hotel",p:"While you travel, your pet stays with people who truly understand dogs. We keep to its feeding habits and its rhythm of walks and rest, so it feels at home.",l:["Short or longer stays","Feeding as you instruct","Daily walks and attention"]},
 {k:"cuvanje",o:"Sitting / walking",t:"Sitting and walking",p:"When you're at work or away, we take over the walks and care for your dog, at times that fit your schedule.",l:["Regular or occasional walks","Sitting by arrangement","Fitted to your schedule"]},
 {k:"prevoz",o:"Pet transport",t:"Pet transport",p:"Safe, calm transport for your pet to the vet, the groomer, the airport or a new home, with attention the whole way.",l:["To the vet and groomer","To the airport or a new home","A calm, safe ride"]},
 {k:"ozon",o:"Ozone therapy",t:"Ozone therapy",p:"Ozone treatment alongside regular grooming, for skin and coat care. Ask us whether it suits your dog.",l:["Add-on to bathing and grooming","Skin and coat care","Advice before treatment"]}],
pk:"Puppies",ph:"How to get your <em>puppy</em>",pp:"We ship puppies worldwide. See the available puppies below or send us an inquiry.",
steps:[["Inquiry","Tell us which puppy you're looking for: sex, colour and timing."],["Getting to know","We send more photos and videos and answer every question."],["Papers","Your puppy gets FCI papers and everything your country requires."],["Coming home","Pick-up in Banja Luka or delivery to you."]],
pb:"See the puppies",pb2:"Send an inquiry",
lk:"Latest litters",lh:"Puppies looking for a <em>home</em>",fstatus:"Status",fpol:"Sex",fboja:"Colour",all:"All",allc:"All colours",
status:{dostupno:"Available",rezervisano:"Reserved",prodato:"Sold"},pol:{m:"Male",z:"Female"},
boje:{narandzasta:"Orange",krem:"Cream",bijela:"White",crna:"Black",sable:"Sable",cokoladna:"Chocolate",ostalo:"Other"},
born:"born",ask:"Ask about this puppy",shown:n=>`Showing: ${n}`,none:"No puppies match right now. Write to us, new litters arrive regularly.",
demo:"Sample puppies for preview. Real puppies are added through the admin panel.",
gk:"Gallery",gh:"Our <em>little teddy bears</em>",kat:{stenci:"Puppies",odrasli:"Adult dogs",grooming:"Grooming",ostalo:"Other"},gnone:"No photos in this category yet.",
qk:"FAQ",qh:"You often <em>ask</em>",
faq:[["Do you ship puppies abroad?","Yes. Our dogs live in more than 100 countries, and we arrange delivery and paperwork for you."],["What papers does a puppy come with?","Every puppy comes with FCI papers. Write to us for details about your country."],["How do I reserve a puppy?","Click “Ask about this puppy” on the one you like, or send us an inquiry, and we'll arrange the details."],["Do you groom other breeds?","Yes. Through ATK Company we offer grooming, sitting, a dog hotel and transport for other dogs too."],["Do you run grooming seminars?","Yes, Darija leads Pomeranian grooming seminars. Contact us for the next date."]],
ck:"Contact",ch:"Get in <em>touch</em>",cp:"For puppies, grooming, seminars or sitting, write or call us. We reply in Bosnian, Serbian, Croatian and English.",
c1:"Phone",wab:"WhatsApp message or call",callb:"Call us",waf:"Message us",c2:"Puppies",c3:"Services",c4:"Location",f1:"Full name",f2:"Country",f3:"I'm interested in",f4:"Message",f5:"Send via WhatsApp",
ft:'We support <a href="https://humanostspaja.ba" target="_blank" rel="noopener">Humanost spaja association</a>',
opt0:"Pomeranian puppy",opt9:"Something else",
err:"Please enter your name so we know who to reply to.",ok:"Opening WhatsApp with your message…",hi:"Hi, I'm",from:"from",int:"I'm interested in",pupmsg:n=>`Hi, I'm interested in the puppy ${n}. Is it still available?`}
};

/* ---------- podaci ---------- */
let pups = [], gallery = [], sb = null, session = null;
const DEMO_PUPS = [
  {id:'d1',ime:'Leo',pol:'m',boja:'narandzasta',status:'dostupno',rodjen:'2026-09-14',opis:'Razigran i radoznao.',slika_url:'img/pom-osmijeh.jpg'},
  {id:'d2',ime:'Bella',pol:'z',boja:'krem',status:'rezervisano',rodjen:'2026-09-14',opis:'Mirna, voli maženje.',slika_url:'img/pom-parket.jpg'},
  {id:'d3',ime:'Max',pol:'m',boja:'narandzasta',status:'dostupno',rodjen:'2026-08-30',opis:'Gusta dlaka, malena njuškica.',slika_url:'img/pom-portret.jpg'},
  {id:'d4',ime:'Luna',pol:'z',boja:'narandzasta',status:'prodato',rodjen:'2026-07-02',opis:'',slika_url:'img/pom-cvijece.jpg'}];
const DEMO_GAL = [
  {id:'g5',kategorija:'ostalo',opis:'Darija Paspalj',slika_url:'img/darija.jpg'},
  {id:'g1',kategorija:'odrasli',opis:'',slika_url:'img/pom-cvijece.jpg'},
  {id:'g2',kategorija:'stenci',opis:'',slika_url:'img/pom-parket.jpg'},
  {id:'g3',kategorija:'odrasli',opis:'',slika_url:'img/pom-portret.jpg'},
  {id:'g4',kategorija:'grooming',opis:'Nakon groominga',slika_url:'img/pom-osmijeh.jpg'},
];

const loadScript = src => new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); });

async function initData(){
  if (LIVE) {
    try {
      await loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js');
      sb = window.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_ANON_KEY);
      const [a, b, s] = await Promise.all([
        sb.from('stenci').select('*').order('created_at', {ascending:false}),
        sb.from('galerija').select('*').order('created_at', {ascending:false}),
        sb.auth.getSession()]);
      if (a.error) throw a.error; if (b.error) throw b.error;
      pups = a.data; gallery = b.data.length ? b.data : DEMO_GAL.map(g => ({...g, staticna: true})); session = s.data.session;
    } catch (e) { console.error('Supabase greška', e); pups = []; gallery = []; }
  } else {
    pups = DEMO_PUPS.slice(); gallery = DEMO_GAL.slice();
    $('pdemo').hidden = false;
  }
  renderPups(); renderGal();
  if (location.hash === '#admin') openAdmin();
}

/* ---------- jezik ---------- */
let L = 'bs';
const t = () => T[L];
function renderStatic(){
  const d = t(); document.documentElement.lang = L;
  document.querySelectorAll('[data-i]').forEach(e => { const v = d[e.dataset.i]; if (typeof v === 'string') e.innerHTML = v; });
  $('ticks').innerHTML = d.ticks.map(x => `<li>${x}</li>`).join('');
  $('pillars').innerHTML = d.pil.map((p, i) => `<div class="pill"><img src="${P[i]}" alt=""><div><h3>${p[0]}</h3><p>${p[1]}</p></div></div>`).join('');
  $('svc').innerHTML = d.svc.map((s, i) => `
    <article class="srow rv in" id="usluga-${s.k}">
      <div class="sph"><img src="img/usluge/${s.k}.jpg" alt="${esc(s.t)}" loading="lazy" onload="this.parentNode.classList.add('has')" onerror="this.remove()">
        <div class="ph"><svg viewBox="0 0 24 24" aria-hidden="true">${IC[s.k]}</svg><span>${d.phs}<br><small>img/usluge/${s.k}.jpg</small></span></div></div>
      <div><span class="snum">0${i + 1}</span><h3>${s.t}${s.f ? `<span class="tagf">${d.isnew}</span>` : ''}</h3><p>${s.p}</p>
        <ul>${s.l.map(x => `<li>${x}</li>`).join('')}</ul>
        <a class="btn ghost" href="#kontakt" data-book="${i + 1}">${d.book}</a></div>
    </article>`).join('');
  $('steps').innerHTML = d.steps.map(s => `<li><div><h3>${s[0]}</h3><p>${s[1]}</p></div></li>`).join('');
  $('faq').innerHTML = d.faq.map((q, i) => `<details${i ? '' : ' open'}><summary>${q[0]}</summary><p>${q[1]}</p></details>`).join('');
  const opts = [d.opt0, ...d.svc.map(s => s.o), d.opt9];
  const k = $('ft').selectedIndex; $('ft').innerHTML = opts.map(o => `<option>${esc(o)}</option>`).join(''); $('ft').selectedIndex = Math.max(0, k);
  $('l-bs').setAttribute('aria-pressed', L === 'bs'); $('l-en').setAttribute('aria-pressed', L === 'en');
  try { localStorage.setItem('pt-lang', L); } catch (e) {}
}
function setLang(l){ L = l; renderStatic(); renderPups(); renderGal(); }

/* ---------- štenci + filteri ---------- */
const PF = {status:'all', pol:'all', boja:'all'};
function chips(group, values, labels){
  return `<span>${group === 'status' ? t().fstatus : t().fpol}</span>` +
    ['all', ...values].map(v => `<button class="chip" data-g="${group}" data-v="${v}" aria-pressed="${PF[group] === v}">${v === 'all' ? t().all : labels[v]}</button>`).join('');
}
const fmtDate = s => { if (!s) return ''; const [y, m, d] = s.split('-'); return `${+d}.${+m}.${y}.`; };
function renderPups(){
  const d = t();
  document.querySelector('[data-f=status]').innerHTML = chips('status', ['dostupno','rezervisano','prodato'], d.status);
  document.querySelector('[data-f=pol]').innerHTML = chips('pol', ['m','z'], d.pol);
  const present = BOJE.filter(b => pups.some(p => p.boja === b));
  if (PF.boja !== 'all' && !present.includes(PF.boja)) PF.boja = 'all';
  $('fboja').innerHTML = `<option value="all">${d.allc}</option>` + present.map(b => `<option value="${b}"${PF.boja === b ? ' selected' : ''}>${d.boje[b]}</option>`).join('');
  const order = {dostupno:0, rezervisano:1, prodato:2};
  const list = pups.filter(p => (PF.status === 'all' || p.status === PF.status) && (PF.pol === 'all' || p.pol === PF.pol) && (PF.boja === 'all' || p.boja === PF.boja))
    .sort((a, b) => order[a.status] - order[b.status]);
  $('pcount').textContent = d.shown(list.length);
  $('pups').innerHTML = list.length ? list.map(p => `
    <article class="pcard${p.status === 'prodato' ? ' sold' : ''}">
      <div class="pi" data-lbp="${esc(p.id)}"><img src="${esc(p.slika_url)}" alt="${esc(p.ime)}" loading="lazy"><span class="st ${esc(p.status)}">${d.status[p.status] || ''}</span></div>
      <div class="pb"><h3>${esc(p.ime)}</h3>
        <div class="meta">${d.pol[p.pol] || ''} · ${d.boje[p.boja] || ''}${p.rodjen ? ` · ${d.born} ${fmtDate(p.rodjen)}` : ''}</div>
        ${p.opis ? `<p>${esc(p.opis)}</p>` : ''}
        ${p.status !== 'prodato' ? `<a class="btn ${p.status === 'dostupno' ? 'solid' : 'ghost'}" target="_blank" rel="noopener" href="https://wa.me/${WA}?text=${encodeURIComponent(d.pupmsg(p.ime))}">${d.ask}</a>` : ''}
      </div></article>`).join('') : `<div class="empty">${d.none}</div>`;
}
$('pf').addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; PF[b.dataset.g] = b.dataset.v; renderPups(); });
$('fboja').addEventListener('change', e => { PF.boja = e.target.value; renderPups(); });

/* ---------- galerija ---------- */
let GF = 'all';
function renderGal(){
  const d = t();
  const cats = KAT.filter(k => gallery.some(g => g.kategorija === k));
  if (GF !== 'all' && !cats.includes(GF)) GF = 'all';
  $('gf').innerHTML = ['all', ...cats].map(k => `<button class="chip" data-k="${k}" aria-pressed="${GF === k}">${k === 'all' ? d.all : d.kat[k]}</button>`).join('');
  const list = gallery.filter(g => GF === 'all' || g.kategorija === GF);
  $('gl').innerHTML = list.length ? list.map(g => `<figure data-lbg="${esc(g.id)}"><img src="${esc(g.slika_url)}" alt="${esc(g.opis || d.kat[g.kategorija] || '')}" loading="lazy">${g.opis ? `<figcaption>${esc(g.opis)}</figcaption>` : ''}</figure>`).join('') : `<div class="empty">${d.gnone}</div>`;
}
$('gf').addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; GF = b.dataset.k; renderGal(); });

/* ---------- lightbox ---------- */
let LB = [], LI = 0, lastFocus = null;
function openLB(items, i){ LB = items; LI = i; lastFocus = document.activeElement; showLB(); $('lb').classList.add('open'); $('lbx').focus(); }
function showLB(){ const it = LB[LI]; $('lbi').src = it.src; $('lbi').alt = it.cap || ''; $('lbc').textContent = it.cap || ''; $('lbp').hidden = $('lbn').hidden = LB.length < 2; }
function closeLB(){ $('lb').classList.remove('open'); lastFocus?.focus(); }
$('lbx').onclick = closeLB; $('lbp').onclick = () => { LI = (LI - 1 + LB.length) % LB.length; showLB(); }; $('lbn').onclick = () => { LI = (LI + 1) % LB.length; showLB(); };
$('lb').addEventListener('click', e => { if (e.target === $('lb')) closeLB(); });
document.addEventListener('keydown', e => {
  if ($('lb').classList.contains('open')) { if (e.key === 'Escape') closeLB(); if (e.key === 'ArrowLeft') $('lbp').click(); if (e.key === 'ArrowRight') $('lbn').click(); }
  else if (e.key === 'Escape') document.querySelectorAll('.modal.open').forEach(closeModal);
});
$('pups').addEventListener('click', e => { const el = e.target.closest('[data-lbp]'); if (!el) return;
  const items = [...document.querySelectorAll('#pups [data-lbp]')]; const i = items.indexOf(el);
  openLB(items.map(x => ({src: x.querySelector('img').src, cap: x.querySelector('img').alt})), i); });
$('gl').addEventListener('click', e => { const el = e.target.closest('[data-lbg]'); if (!el) return;
  const items = [...document.querySelectorAll('#gl [data-lbg]')]; const i = items.indexOf(el);
  openLB(items.map(x => ({src: x.querySelector('img').src, cap: x.querySelector('figcaption')?.textContent || ''})), i); });

/* ---------- kontakt ---------- */
$('svc').addEventListener('click', e => { const b = e.target.closest('[data-book]'); if (b) $('ft').selectedIndex = +b.dataset.book; });
$('f').addEventListener('submit', ev => { ev.preventDefault(); const d = t(), m = $('fmsg'), n = $('fn').value.trim(), c = $('fc').value.trim(), msg = $('fm').value.trim();
  if (!n) { m.textContent = d.err; $('fn').focus(); return; }
  const text = `${d.hi} ${n}${c ? ' ' + d.from + ' ' + c : ''}. ${d.int}: ${$('ft').value}.${msg ? '\n\n' + msg : ''}`;
  m.textContent = d.ok; const a = document.createElement('a'); a.href = `https://wa.me/${WA}?text=${encodeURIComponent(text)}`; a.target = '_blank'; a.rel = 'noopener'; document.body.appendChild(a); a.click(); a.remove(); });

/* ---------- admin ---------- */
const BS = T.bs;
let demoAuthed = false;
const authed = () => LIVE ? !!session : demoAuthed;
function openModal(id){ const m = $(id); m.classList.add('open'); setTimeout(() => m.querySelector('input,button')?.focus(), 30); }
function closeModal(m){ m.classList.remove('open'); if (location.hash === '#admin') history.replaceState(null, '', location.pathname + location.search); }
document.querySelectorAll('[data-close]').forEach(b => b.onclick = () => closeModal(b.closest('.modal')));
document.querySelectorAll('.modal').forEach(m => m.addEventListener('click', e => { if (e.target === m) closeModal(m); }));
function openAdmin(){ if (authed()) { renderAdmin(); openModal('madmin'); } else { $('lpw').value = ''; $('lmsg').textContent = ''; openModal('mlogin'); } }
window.addEventListener('hashchange', () => { if (location.hash === '#admin') openAdmin(); });
document.querySelector('.adm-link').addEventListener('click', e => { e.preventDefault(); openAdmin(); });

$('loginf').addEventListener('submit', async e => { e.preventDefault(); const pw = $('lpw').value, msg = $('lmsg');
  if (!pw) { msg.textContent = 'Upišite šifru.'; msg.className = 'amsg err'; return; }
  msg.className = 'amsg'; msg.textContent = 'Prijava…';
  if (!LIVE) { demoAuthed = true; }
  else {
    if (!sb) { msg.textContent = 'Veza sa bazom nije uspjela. Provjerite config.js.'; msg.className = 'amsg err'; return; }
    const { data, error } = await sb.auth.signInWithPassword({ email: CFG.ADMIN_EMAIL, password: pw });
    if (error) { msg.textContent = 'Pogrešna šifra.'; msg.className = 'amsg err'; return; }
    session = data.session;
  }
  $('mlogin').classList.remove('open'); renderAdmin(); openModal('madmin'); });

$('logout').onclick = async () => { if (LIVE && sb) await sb.auth.signOut(); session = null; demoAuthed = false; closeModal($('madmin')); };

document.querySelectorAll('.tabs button').forEach(b => b.onclick = () => {
  document.querySelectorAll('.tabs button').forEach(x => x.setAttribute('aria-selected', x === b));
  $('tp').hidden = b.dataset.tab !== 'tp'; $('tg').hidden = b.dataset.tab !== 'tg'; });

$('p-boja').innerHTML = BOJE.map(b => `<option value="${b}">${BS.boje[b]}</option>`).join('');
$('g-kat').innerHTML = KAT.map(k => `<option value="${k}">${BS.kat[k]}</option>`).join('');

function renderAdmin(){
  $('ademo').hidden = LIVE;
  $('plist').innerHTML = pups.map(p => `<div class="aitem"><img src="${esc(p.slika_url)}" alt=""><div>
    <strong>${esc(p.ime)}</strong><span style="color:var(--mute)">${BS.pol[p.pol]} · ${BS.boje[p.boja] || ''}</span>
    <select data-pst="${esc(p.id)}" aria-label="Status">${Object.keys(BS.status).map(s => `<option value="${s}"${p.status === s ? ' selected' : ''}>${BS.status[s]}</option>`).join('')}</select>
    <button class="del" data-pdel="${esc(p.id)}">Obriši</button></div></div>`).join('') || '<p class="lead" style="font-size:15px">Još nema štenaca.</p>';
  $('glist').innerHTML = gallery.filter(g => !g.staticna).map(g => `<div class="aitem"><img src="${esc(g.slika_url)}" alt=""><div>
    <span style="color:var(--mute)">${BS.kat[g.kategorija] || ''}${g.opis ? ' · ' + esc(g.opis) : ''}</span>
    <button class="del" data-gdel="${esc(g.id)}">Obriši</button></div></div>`).join('') || '<p class="lead" style="font-size:15px">Još nema slika.</p>';
}

async function compress(file, max = 1600){
  const bmp = await createImageBitmap(file);
  const r = Math.min(1, max / Math.max(bmp.width, bmp.height));
  const c = document.createElement('canvas'); c.width = Math.round(bmp.width * r); c.height = Math.round(bmp.height * r);
  c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
  return new Promise(res => c.toBlob(res, 'image/jpeg', 0.82));
}
async function upload(file, folder){
  const blob = await compress(file);
  if (!LIVE) return { url: URL.createObjectURL(blob), path: null };
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
  const { error } = await sb.storage.from(BUCKET).upload(path, blob, { contentType: 'image/jpeg' });
  if (error) throw error;
  return { url: sb.storage.from(BUCKET).getPublicUrl(path).data.publicUrl, path };
}
async function insert(table, row){
  if (!LIVE) return { ...row, id: 'n' + Date.now() + Math.random(), created_at: new Date().toISOString() };
  const { data, error } = await sb.from(table).insert(row).select().single();
  if (error) throw error; return data;
}
async function removeRow(table, item){
  if (LIVE) {
    const { error } = await sb.from(table).delete().eq('id', item.id); if (error) throw error;
    if (item.slika_path) await sb.storage.from(BUCKET).remove([item.slika_path]);
  }
}
const setMsg = (id, text, err) => { $(id).textContent = text; $(id).className = 'amsg' + (err ? ' err' : ''); };

$('pform').addEventListener('submit', async e => { e.preventDefault();
  const file = $('p-img').files[0], ime = $('p-ime').value.trim();
  if (!ime || !file) { setMsg('pmsg', 'Upišite ime i izaberite fotografiju.', 1); return; }
  const btn = e.submitter; btn.disabled = true; setMsg('pmsg', 'Spremam…');
  try {
    const up = await upload(file, 'stenci');
    const row = await insert('stenci', { ime, pol: $('p-pol').value, boja: $('p-boja').value, status: $('p-status').value, rodjen: $('p-rodjen').value || null, opis: $('p-opis').value.trim(), slika_url: up.url, slika_path: up.path });
    pups.unshift(row); e.target.reset(); setMsg('pmsg', `Štene „${ime}“ je dodano.`); renderAdmin(); renderPups();
  } catch (err) { console.error(err); setMsg('pmsg', 'Greška pri spremanju: ' + (err.message || err), 1); }
  btn.disabled = false; });

$('g-img').addEventListener('change', e => { $('gprev').innerHTML = [...e.target.files].slice(0, 12).map(f => `<img src="${URL.createObjectURL(f)}" alt="">`).join(''); });
$('gform').addEventListener('submit', async e => { e.preventDefault();
  const files = [...$('g-img').files]; if (!files.length) { setMsg('gmsg', 'Izaberite barem jednu sliku.', 1); return; }
  const btn = e.submitter; btn.disabled = true; let ok = 0;
  try {
    for (const f of files) {
      setMsg('gmsg', `Spremam ${ok + 1} od ${files.length}…`);
      const up = await upload(f, 'galerija');
      const row = await insert('galerija', { kategorija: $('g-kat').value, opis: $('g-opis').value.trim(), slika_url: up.url, slika_path: up.path });
      gallery = gallery.filter(g => !g.staticna); gallery.unshift(row); ok++;
    }
    e.target.reset(); $('gprev').innerHTML = ''; setMsg('gmsg', `Dodano slika: ${ok}.`);
  } catch (err) { console.error(err); setMsg('gmsg', `Dodano ${ok}, zatim greška: ` + (err.message || err), 1); }
  renderAdmin(); renderGal(); btn.disabled = false; });

$('plist').addEventListener('change', async e => { const s = e.target.closest('[data-pst]'); if (!s) return;
  const p = pups.find(x => String(x.id) === s.dataset.pst); const old = p.status; p.status = s.value;
  if (LIVE) { const { error } = await sb.from('stenci').update({ status: s.value }).eq('id', p.id); if (error) { p.status = old; s.value = old; alertBox('Status nije promijenjen: ' + error.message); return; } }
  renderPups(); });

let pendingDel = null;
function alertBox(text){ setMsg($('tp').hidden ? 'gmsg' : 'pmsg', text, 1); }
document.querySelector('#madmin .mbox').addEventListener('click', async e => {
  const b = e.target.closest('[data-pdel],[data-gdel]'); if (!b) return;
  const isP = !!b.dataset.pdel, id = b.dataset.pdel || b.dataset.gdel;
  if (pendingDel !== b) { document.querySelectorAll('.del').forEach(x => x.textContent = 'Obriši'); pendingDel = b; b.textContent = 'Sigurno? Klikni opet'; return; }
  pendingDel = null; b.textContent = 'Brišem…';
  const arr = isP ? pups : gallery, item = arr.find(x => String(x.id) === id);
  try { await removeRow(isP ? 'stenci' : 'galerija', item); arr.splice(arr.indexOf(item), 1); }
  catch (err) { alertBox('Brisanje nije uspjelo: ' + (err.message || err)); }
  renderAdmin(); isP ? renderPups() : renderGal(); });

/* ---------- start ---------- */
try { const s = localStorage.getItem('pt-lang'); if (s === 'bs' || s === 'en') L = s; else if (!(navigator.languages || [navigator.language || '']).some(l => /^(bs|sr|hr|sh|en-ba|en-rs|en-hr)/i.test(l))) L = 'en'; } catch (e) {}
$('l-bs').onclick = () => setLang('bs'); $('l-en').onclick = () => setLang('en');
renderStatic(); renderPups(); renderGal(); initData();
$('yr').textContent = new Date().getFullYear();
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll('.rv').forEach(el => io.observe(el));
}
