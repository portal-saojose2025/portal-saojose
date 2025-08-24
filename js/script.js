/* ======= CONFIGURAÇÃO PADRÃO (pode editar os arrays) ======= */
const SITE_CONFIG = {
  fotos: [
    "igreja-sjg.jpg",
    "folia1.jpg",
    "comunidade.jpg"
  ],
  videos: [
    "folia.mp4",
    "folioes.mp4"
  ],
  roles: [
    'ADM Presidente','ADM Chefe','ADM Gerente','ADM Fotos','ADM Vídeos','ADM Literatura',
    'ADM Músicas','ADM Mensagens','ADM Blogs/Conteúdo','ADM Tesoureiro','ADM Secretaria',
    'ADM Grupos de Oração','ADM Ouvidoria','ADM Web Designer'
  ],
  sponsors: ['Comércio Local','Comunidade']
};

/* ======= BOOT ======= */
document.addEventListener('DOMContentLoaded', ()=>{
  setupMenu();
  markActiveMenu();
  renderRoles();
  renderSponsors();
  populateAreas();
  carregarGaleria();
});

/* ======= MENU / DARK ======= */
function setupMenu(){
  const btnMenu = document.getElementById('btnMenu');
  const nav = document.getElementById('mainNav');
  if(btnMenu && nav){
    btnMenu.addEventListener('click', ()=>nav.classList.toggle('open'));
  }
  const btnDark = document.getElementById('btnDark');
  if(btnDark){
    btnDark.addEventListener('click', ()=>{
      document.body.classList.toggle('dark');
      btnDark.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    });
  }
}
function markActiveMenu(){
  const links = document.querySelectorAll('.nav a');
  const here = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a=>{
    const target = a.getAttribute('href');
    if((here === '' && target.endsWith('index.html')) || target === here) a.classList.add('active');
  });
}

/* ======= GALERIA ======= */
function carregarGaleria(){
  const fotos = (window.PAGE && PAGE.fotos) || SITE_CONFIG.fotos || [];
  const videos = (window.PAGE && PAGE.videos) || SITE_CONFIG.videos || [];
  const fotosContainer = document.getElementById("fotos-container");
  const videosContainer = document.getElementById("videos-container");

  if(fotosContainer){
    fotosContainer.innerHTML = '';
    fotos.forEach(nome=>{
      const img = document.createElement('img');
      img.src = `assets/img/${nome}`;
      img.alt = nome;
      img.onerror = ()=>img.src = placeholderSVG();
      img.addEventListener('click',()=>openLightbox(img.src, img.alt));
      fotosContainer.appendChild(img);
    });
  }
  if(videosContainer){
    videosContainer.innerHTML = '';
    videos.forEach(nome=>{
      const vid = document.createElement('video');
      vid.src = `assets/videos/${nome}`;
      vid.controls = true;
      vid.onerror = ()=>vid.style.display='none';
      videosContainer.appendChild(vid);
    });
  }
}

/* ======= ROLES / SPONSORS ======= */
function renderRoles(){
  const el = document.getElementById('roles');
  if(!el) return;
  const roles = (window.PAGE && PAGE.roles) || SITE_CONFIG.roles;
  el.innerHTML = roles.map(r=>`<div class="role"><b>${r}</b></div>`).join('');
}
function renderSponsors(){
  const el = document.getElementById('sponsors');
  if(!el) return;
  const arr = (window.PAGE && PAGE.sponsors) || SITE_CONFIG.sponsors;
  el.innerHTML = arr.map(n=>`<div class="sponsor">${n}</div>`).join('');
}
function populateAreas(){
  const sel = document.getElementById('selectArea');
  if(!sel) return;
  const roles = (window.PAGE && PAGE.roles) || SITE_CONFIG.roles;
  sel.innerHTML = `<option value="">Selecione a área</option>${roles.map(r=>`<option>${r}</option>`).join('')}`;
}

/* ======= PIX COPY ======= */
function copyPIX(id){
  const t = document.getElementById(id)?.textContent?.trim();
  if(!t) return;
  if(navigator.clipboard) navigator.clipboard.writeText(t).then(()=>alert('PIX copiado: '+t));
  else {
    const ta=document.createElement('textarea');
    ta.value=t; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
    alert('PIX copiado: '+t);
  }
}

/* ======= FORM CANDIDATURA ======= */
function joinTeam(e){
  e.preventDefault();
  const data = new FormData(e.target);
  const nome = data.get('nome') || '';
  const contato = data.get('contato') || '';
  const area = data.get('area') || '';
  const mensagem = data.get('mensagem') || '';
  const body = `Nome: ${nome}%0AContato: ${contato}%0AArea: ${area}%0AMensagem: ${mensagem}`;
  window.location.href = `mailto:tecnicojigabit@gmail.com?subject=Candidatura%20Equipe&body=${body}`;
}

/* ======= LIGHTBOX ======= */
function openLightbox(src,alt){
  const lb = document.getElementById('lb');
  const img = document.getElementById('lbimg');
  if(!lb || !img) return;
  img.src = src; img.alt = alt || '';
  lb.classList.add('active');
}
function closeLightbox(){
  document.getElementById('lb')?.classList.remove('active');
}

/* ======= PLACEHOLDER ======= */
function placeholderSVG(){
  return `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'>
       <defs><linearGradient id='g' x1='0' x2='1'><stop offset='0' stop-color='#8B0000'/><stop offset='1' stop-color='#A11414'/></linearGradient></defs>
       <rect width='100%' height='100%' fill='url(#g)' />
       <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='48' fill='white' font-family='Arial'>IMAGEM NÃO ENCONTRADA</text>
     </svg>`
  )}`;
}

/* ======= Expor funções globais usadas no HTML ======= */
window.copyPIX = copyPIX;
window.joinTeam = joinTeam;
window.closeLightbox = closeLightbox;
