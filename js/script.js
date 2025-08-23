// ---------- CONFIGURAÇÃO SIMPLES (coloque só os nomes dos arquivos) ----------
const fotos = [
  "igreja-sjg.jpg",
  "folia1.jpg",
  "comunidade.jpg"
];

const videos = [
  "folia.mp4",
  "folioes.mp4"
];

// ---------- FUNÇÃO PARA CARREGAR GALERIA ----------
function carregarGaleria() {
  const fotosContainer = document.getElementById("fotos-container");
  const videosContainer = document.getElementById("videos-container");
  if (fotosContainer) {
    fotosContainer.innerHTML = '';
    fotos.forEach(foto => {
      const img = document.createElement("img");
      img.src = `assets/img/${foto}`;
      img.alt = foto;
      img.className = "thumb";
      img.onerror = () => img.src = placeholderSVG();
      img.onclick = () => openLightbox(img.src, img.alt);
      fotosContainer.appendChild(img);
    });
  }
  if (videosContainer) {
    videosContainer.innerHTML = '';
    videos.forEach(video => {
      const vid = document.createElement("video");
      vid.src = `assets/videos/${video}`;
      vid.controls = true;
      vid.className = "thumb";
      vid.onerror = () => vid.style.display = "none";
      videosContainer.appendChild(vid);
    });
  }
}

// ---------- LIGHTBOX ----------
function openLightbox(src, alt) {
  const lb = document.getElementById("lb");
  const img = document.getElementById("lbimg");
  if (!lb || !img) return;
  img.src = src; img.alt = alt;
  lb.classList.add('active');
}
function closeLightbox() {
  const lb = document.getElementById("lb");
  if (lb) lb.classList.remove('active');
}

// ---------- PLACEHOLDER PARA FOTOS FALTANDO ----------
function placeholderSVG() {
  return `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'>
       <rect width='100%' height='100%' fill='#8B0000'/>
       <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='48' fill='white'>FOTO NÃO ENCONTRADA</text>
     </svg>`
  )}`;
}

// ---------- EXECUTAR AO CARREGAR O SITE ----------
window.addEventListener('load', carregarGaleria);
