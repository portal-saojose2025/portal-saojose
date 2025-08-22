/* ==== MENU MOBILE ==== */
function toggleMenu(){ document.getElementById('nav').classList.toggle('show'); }

/* ==== HERO FALLBACK ==== */
function heroFallback(){ document.querySelector('.hero').classList.add('fallback'); }

/* ==== LIGHTBOX ==== */
function openLightbox(src, alt){ const lb=document.getElementById('lb'); const im=document.getElementById('lbimg'); im.src=src; im.alt=alt||''; lb.classList.add('active'); }
function closeLightbox(){ document.getElementById('lb').classList.remove('active'); }

/* ==== COPIAR PIX ==== */
function copyPIX(id){ const t=document.getElementById(id).textContent.trim(); navigator.clipboard?.writeText(t); alert('PIX copiado: '+t); }

/* ========== DADOS DO SITE (EDITE AQUI) ========== */

/* FOTOS — Suba arquivos em assets/imagens/ e troque os nomes aqui */
const FOTOS = [
  { src: 'assets/imagens/igreja-antiga.jpg', alt: 'Igreja antiga', cap: 'Igreja Antiga' },
  { src: 'assets/imagens/festa-tradicional.jpg', alt: 'Festa tradicional', cap: 'Festa Tradicional' },
  { src: 'assets/imagens/comunidade.jpg', alt: 'Comunidade reunida', cap: 'Comunidade' },
  // Adicione mais linhas aqui...
];

/* Placeholders visuais para hoje (caso você ainda não subiu as fotos) */
const PLACEHOLDER = (texto)=>`data:image/svg+xml;utf8,` + encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'>
     <defs><linearGradient id='g' x1='0' x2='1'><stop stop-color='#8B0000'/><stop offset='1' stop-color='#A11414'/></linearGradient></defs>
     <rect width='100%' height='100%' fill='url(#g)'/>
     <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='42' fill='white' opacity='.92'>FOTO SJG</text>
     <text x='50%' y='58%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18' fill='white' opacity='.85'>Suba em assets/imagens</text>
   </svg>`);

/* VÍDEOS — YouTube (use o ID). Ex.: https://youtu.be/ABCDE -> ID = ABCDE
   Também aceita { type:'facebook', url:'https://www.facebook.com/.../videos/...' } */
const VIDEOS = [
  { type:'youtube', id:'dQw4w9WgXcQ', title:'Exemplo (troque para vídeo de SJG)' },
  // { type:'facebook', url:'https://www.facebook.com/AMOAJUDAR2015/videos/SEU_VIDEO', title:'Vídeo no Facebook' },
];

/* FESTAS (carregado da sua lista) */
const FESTAS = [
  { data:'20 Jan', nome:'São Sebastião' },
  { data:'19 Mar', nome:'São José' },
  { data:'13 Mai', nome:'Nossa Senhora de Fátima' },
  { data:'13 Jun', nome:'Santo Antônio' },
  { data:'24 Jun', nome:'São João' },
  { data:'Ag e Set', nome:'Espírito Santo' },
  { data:'08 Set', nome:'Nossa Senhora da Saúde' },
  { data:'15 Set', nome:'Nossa Senhora da Soledade (Padroeira da igreja)' },
  { data:'12 Out', nome:'Nossa Senhora Aparecida' },
  { data:'13 Dez', nome:'Santa Luzia' },
];

/* LIVROS / PESQUISAS / TCC */
const LIVROS = [
  'A bala de ouro de Simão Ribeiro',
  'Padre Odilon conta história do São José do Gorutuba',
  'Carmela conta História de São José do Gorutuba',
  'Carlucio — História SJI (25 anos de pesquisa)',
  'TCC Norivaldo — 25 anos História e região',
  'TCC Juana — História e Dossiê SJG (com capa; falta publicar)'
];

/* ZELADORES */
const ZELADORES = ['Lizena','Dezim','Derenice','Abel'];

/* EQUIPE (cargos) */
const CARGOS = [
  'ADM Presidente','ADM Chefe','ADM Gerente','ADM Fotos','ADM Vídeos','ADM Literatura',
  'ADM Músicas','ADM Mensagens','ADM Blogs/Conteúdo','ADM Tesoureiro','ADM Secretaria',
  'ADM Grupos de Oração','ADM Ouvidoria','ADM Web Designer'
];

/* ========== RENDERIZAÇÃO ========== */
document.addEventListener('DOMContentLoaded', ()=>{
  renderFotos();
  renderVideos();
  renderFestas();
  renderLivros();
  renderZeladores();
  renderCargos();
});

/* Fotos com fallback se o arquivo não existir (usa placeholder bonito) */
function renderFotos(){
  const el = document.getElementById('gridFotos');
  el.innerHTML = '';
  (FOTOS.length?FOTOS:[{},{},{}]).forEach((f,idx)=>{
    const img = document.createElement('img');
    img.className='thumb';
    img.loading='lazy';
    img.alt = f.alt || 'Foto SJG';
    img.src = f.src || PLACEHOLDER('FOTO SJG');
    img.onerror = ()=>{ img.src = PLACEHOLDER('FOTO SJG'); };
    img.onclick = ()=>openLightbox(img.src, img.alt);
    el.appendChild(img);
  });
}

function renderVideos(){
  const el = document.getElementById('gridVideos');
  el.innerHTML='';
  VIDEOS.forEach(v=>{
    const wrap = document.createElement('div'); wrap.className='yt';
    if(v.type==='youtube' && v.id){
      wrap.innerHTML=`<iframe loading="lazy" src="https://www.youtube.com/embed/${v.id}" title="${v.title||'Vídeo'}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }else if(v.type==='facebook' && v.url){
      wrap.innerHTML=`<iframe loading="lazy" src="https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(v.url)}&show_text=false&width=500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen></iframe>`;
    }else{
      wrap.innerHTML=`<div style="display:grid;place-items:center;height:100%;background:#fafafa">Sem vídeo</div>`;
    }
    el.appendChild(wrap);
  });
}

function renderFestas(){
  const ul = document.getElementById('listaFestas');
  ul.innerHTML = FESTAS.map(f=>`<li><b>${f.data}</b> — ${f.nome}</li>`).join('');
}

function renderLivros(){
  const ul = document.getElementById('listaLivros');
  ul.innerHTML = LIVROS.map(t=>`<li>${t}</li>`).join('');
}

function renderZeladores(){
  const ul = document.getElementById('listaZeladores');
  ul.innerHTML = ZELADORES.map(z=>`<li>${z}</li>`).join('');
}

function renderCargos(){
  const wrap = document.getElementById('roles');
  wrap.innerHTML = CARGOS.map(c=>`<div class="role"><b>${c}</b><br/>Coordenação conforme diretrizes da comunidade.</div>`).join('');
  const sel = document.getElementById('selectArea');
  sel.innerHTML = `<option value="">Selecione a área</option>` + CARGOS.map(c=>`<option>${c}</option>`).join('');
}
