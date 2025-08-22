/* ---------------------------
  CONFIGURE AQUI: troque nomes se subir arquivos reais
----------------------------*/
const FOTOS = [
  { src: 'assets/imagens/igreja-sjg.jpg', alt:'Igreja São José do Gorutuba', cap:'Igreja São José do Gorutuba' },
  { src: 'assets/imagens/folia1.jpg', alt:'Folia de Reis', cap:'Folia de Reis' },
  { src: 'assets/imagens/comunidade.jpg', alt:'Comunidade reunida', cap:'Comunidade' }
];

const VIDEOS = [
  // YouTube (embed): id do vídeo
  { type:'youtube', id:'dQw4w9WgXcQ', title:'Exemplo YouTube' },
  // Arquivo local (mp4) - coloque em assets/videos/
  { type:'file', src:'assets/videos/folia.mp4', title:'Folia (mp4 local)' }
];

const SPONSORS = [
  { name:'Comércio Local' },
  { name:'Comunidade' }
];

const ROLES = [
  'ADM Presidente','ADM Chefe','ADM Gerente','ADM Fotos','ADM Vídeos','ADM Literatura',
  'ADM Músicas','ADM Mensagens','ADM Blogs/Conteúdo','ADM Tesoureiro','ADM Secretaria',
  'ADM Grupos de Oração','ADM Ouvidoria','ADM Web Designer'
];

/* ---------------------------
  CÓDIGO DO SITE (não precisa mexer)
----------------------------*/

document.addEventListener('DOMContentLoaded', ()=>{
  setupMenu();
  renderCarousel();
  renderFotos();
  renderVideos();
  renderSponsors();
  renderRoles();
  populateAreas();
  setupAssistant();
});

/* MENU / DARK MODE */
function setupMenu(){
  const btn = document.getElementById('btnMenu');
  const nav = document.getElementById('mainNav');
  btn.addEventListener('click', ()=>nav.classList.toggle('open'));

  const btnDark = document.getElementById('btnDark');
  btnDark.addEventListener('click', ()=>{
    document.body.classList.toggle('dark');
    btnDark.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  });
}

/* CARROSSEL - simples */
function renderCarousel(){
  const track = document.getElementById('carouselTrack');
  if(!track) return;
  // criar itens (use as primeiras 3 fotos)
  const items = FOTOS.length ? FOTOS.slice(0,3) : [];
  if(items.length === 0){
    track.innerHTML = `<div class="carousel-item"><img src="" alt="Sem imagens"></div>`;
    return;
  }
  track.innerHTML = '';
  items.forEach(it=>{
    const div = document.createElement('div');
    div.className = 'carousel-item';
    const img = document.createElement('img');
    img.src = it.src;
    img.alt = it.alt || '';
    img.onerror = ()=>img.src = placeholderSVG();
    img.onclick = ()=>openLightbox(img.src, img.alt);
    div.appendChild(img);
    track.appendChild(div);
  });

  // buttons
  document.querySelector('.carousel-btn.prev').addEventListener('click', ()=>slide(-1));
  document.querySelector('.carousel-btn.next').addEventListener('click', ()=>slide(1));
  let cur = 0;
  function slide(dir){
    const children = track.children;
    cur = (cur + dir + children.length) % children.length;
    track.style.transform = `translateX(-${cur * (children[0].getBoundingClientRect().width + 10)}px)`;
  }
}

/* GALERIA */
function renderFotos(){
  const grid = document.getElementById('gridFotos');
  if(!grid) return;
  grid.innerHTML = '';
  (FOTOS.length?FOTOS:[{}]).forEach(f=>{
    const div = document.createElement('div');
    const img = document.createElement('img');
    img.className = 'thumb';
    img.src = f.src || placeholderSVG();
    img.alt = f.alt || 'Foto SJG';
    img.onerror = ()=>img.src = placeholderSVG();
    img.onclick = ()=>openLightbox(img.src, img.alt);
    div.appendChild(img);
    if(f.cap) {
      const c = document.createElement('div'); c.className='caption'; c.textContent=f.cap; div.appendChild(c);
    }
    grid.appendChild(div);
  });
}

/* VIDEOS */
function renderVideos(){
  const grid = document.getElementById('gridVideos');
  if(!grid) return;
  grid.innerHTML = '';
  VIDEOS.forEach(v=>{
    const wrap = document.createElement('div');
    if(v.type === 'youtube' && v.id){
      wrap.innerHTML = `<iframe class="thumb" src="https://www.youtube.com/embed/${v.id}" title="${v.title || 'Vídeo'}" frameborder="0" allowfullscreen></iframe>`;
    } else if(v.type === 'file' && v.src){
      const vid = document.createElement('video');
      vid.className='thumb';
      vid.controls = true;
      vid.preload = 'metadata';
      vid.src = v.src;
      vid.onerror = ()=>wrap.style.display='none';
      wrap.appendChild(vid);
    } else {
      wrap.innerHTML = `<div class="thumb" style="display:grid;place-items:center">Sem vídeo</div>`;
    }
    grid.appendChild(wrap);
  });
}

/* SPONSORS */
function renderSponsors(){
  const el = document.getElementById('sponsors');
  if(!el) return;
  el.innerHTML = SPONSORS.map(s=>`<div class="sponsor">${s.name}</div>`).join('');
}

/* ROLES */
function renderRoles(){
  const el = document.getElementById('roles');
  if(!el) return;
  el.innerHTML = ROLES.map(r=>`<div class="role"><b>${r}</b></div>`).join('');
}

/* preencher select de áreas */
function populateAreas(){
  const sel = document.getElementById('selectArea');
  if(!sel) return;
  sel.innerHTML = `<option value="">Selecione a área</option>${ROLES.map(r=>`<option>${r}</option>`).join('')}`;
}

/* LIGHTBOX */
function openLightbox(src,alt){
  const lb = document.getElementById('lb');
  const img = document.getElementById('lbimg');
  img.src = src; img.alt = alt || '';
  lb.classList.add('active');
}
function closeLightbox(){
  document.getElementById('lb').classList.remove('active');
}

/* PLACEHOLDER SVG */
function placeholderSVG(){
  return `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'><defs><linearGradient id='g' x1='0' x2='1'><stop offset='0' stop-color='#8B0000'/><stop offset='1' stop-color='#A11414'/></linearGradient></defs><rect width='100%' height='100%' fill='url(#g)' /><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='48' fill='white' font-family='Arial'>FOTO SJG</text></svg>`)}`;
}

/* PIX copy */
function copyPIX(id){
  const t = document.getElementById(id).textContent.trim();
  if(navigator.clipboard) navigator.clipboard.writeText(t).then(()=>alert('PIX copiado: '+t));
  else { const ta=document.createElement('textarea'); ta.value=t; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); alert('PIX copiado: '+t); }
}

/* FORMULÁRIO: enviar candidatura (mailto) */
function joinTeam(e){
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const nome = data.get('nome') || '';
  const contato = data.get('contato') || '';
  const area = data.get('area') || '';
  const mensagem = data.get('mensagem') || '';
  const body = `Nome: ${nome}%0AContato: ${contato}%0AArea: ${area}%0AMensagem: ${mensagem}`;
  // abre cliente de email
  window.location.href = `mailto:tecnicojigabit@gmail.com?subject=Candidatura%20Equipe&body=${body}`;
}

/* ASSISTENTE LOCAL (FAQ inteligente) */
function setupAssistant(){
  // default examples
  document.getElementById('assuntoInput').addEventListener('keydown', function(e){
    if(e.key === 'Enter') perguntarAssistente();
  });
}

function perguntarAssistente(){
  const q = (document.getElementById('assuntoInput').value || '').toLowerCase();
  const out = document.getElementById('respostaAssistente');
  if(!q){ out.innerHTML = '<p class="muted">Escreva sua pergunta.</p>'; return; }

  // regras simples: adicione mais casos conforme precisar
  let r = '';
  if(q.includes('abel') || q.includes('pesquisador') || q.includes('historiador')) {
    r = 'Abel Pereira é pesquisador e historiador de São José do Gorutuba, autor e organizador de pesquisas e dossiês sobre a região.';
  } else if(q.includes('igreja') || q.includes('padroeira')) {
    r = 'A igreja local é a Igreja de São José do Gorutuba; a padroeira é Nossa Senhora da Soledade. O patrimônio é tombado pelo município de Porteirinha (MG).';
  } else if(q.includes('festas') || q.includes('festa')) {
    r = 'Principais festas: São Sebastião (20 Jan), São José (19 Mar), Santo Antônio (13 Jun), São João (24 Jun), N. Sra. da Soledade (15 Set), entre outras.';
  } else if(q.includes('doar') || q.includes('pix')) {
    r = 'PIX: Felipe Pereira 16859749610 • Derenice 38988655081 • Abel Pereira 38998891175. Para doações oficiais, peça comprovante e envie ao tesoureiro.';
  } else if(q.includes('fotos') || q.includes('vídeo') || q.includes('midia')) {
    r = 'Para adicionar fotos e vídeos, suba os arquivos para as pastas assets/imagens e assets/videos e depois atualize o array FOTOS e VIDEOS no arquivo script.js.';
  } else {
    r = 'Desculpe, não tenho uma resposta pronta. Pergunte sobre: Abel, igreja, festas, pix, fotos, folias, igrejas locais.';
  }

  out.innerHTML = `<p>${r}</p>`;
}
