// ================= CONFIGURAÇÕES =================
// URLs das fotos (substitua com os caminhos das suas imagens)
const FOTOS = [
    'fotos/igreja-sjg.jpg',
    'fotos/folia1.jpg',
    'fotos/comunidade.jpg'
];

// URLs dos vídeos (substitua com os caminhos dos seus vídeos)
const VIDEOS = [
    { type: 'youtube', id: 'dQw4w9WgXcQ', title: 'Exemplo YouTube' },
    { type: 'file', src: 'videos/folia.mp4', title: 'Folia (mp4 local)' }
];

// Patrocinadores
const SPONSORS = [
    { name: 'Comércio Local' },
    { name: 'Comunidade' }
];

// Cargos/Equipes
const ROLES = [
    'ADM Presidente', 'ADM Chefe', 'ADM Gerente', 'ADM Fotos', 'ADM Vídeos', 'ADM Literatura',
    'ADM Músicas', 'ADM Mensagens', 'ADM Blogs/Conteúdo', 'ADM Tesoureiro', 'ADM Secretaria',
    'ADM Grupos de Oração', 'ADM Ouvidoria', 'ADM Web Designer'
];

// ================= FUNÇÕES PRINCIPAIS =================
document.addEventListener('DOMContentLoaded', () => {
    setupMenu();
    renderCarousel();
    renderFotos();
    renderVideos();
    renderSponsors();
    renderRoles();
    populateAreas();
    setupAssistant();
});

// Menu e Dark Mode
function setupMenu() {
    const btn = document.getElementById('btnMenu');
    const nav = document.getElementById('mainNav');
    btn.addEventListener('click', () => nav.classList.toggle('open'));

    const btnDark = document.getElementById('btnDark');
    btnDark.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        btnDark.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    });
}

// Carrossel
function renderCarousel() {
    const track = document.getElementById('carouselTrack');
    if (!track) return;
    
    const items = FOTOS.length ? FOTOS.slice(0, 3) : [];
    if (items.length === 0) {
        track.innerHTML = '<div class="carousel-item"><div style="height:300px;display:flex;align-items:center;justify-content:center;background:#eee;">Sem imagens</div></div>';
        return;
    }
    
    track.innerHTML = '';
    items.forEach(it => {
        const div = document.createElement('div');
        div.className = 'carousel-item';
        const img = document.createElement('img');
        img.src = it;
        img.alt = 'Imagem do carrossel';
        img.onerror = () => img.src = placeholderSVG();
        img.onclick = () => openLightbox(img.src, img.alt);
        div.appendChild(img);
        track.appendChild(div);
    });

    // Botões de navegação
    document.querySelector('.carousel-btn.prev').addEventListener('click', () => slide(-1));
    document.querySelector('.carousel-btn.next').addEventListener('click', () => slide(1));
    
    let cur = 0;
    function slide(dir) {
        const children = track.children;
        cur = (cur + dir + children.length) % children.length;
        track.scrollTo({
            left: cur * (children[0].offsetWidth + 10),
            behavior: 'smooth'
        });
    }
}

// Galeria de Fotos
function renderFotos() {
    const grid = document.getElementById('fotos-container');
    if (!grid) return;
    
    grid.innerHTML = '';
    (FOTOS.length ? FOTOS : [{}]).forEach(f => {
        const div = document.createElement('div');
        const img = document.createElement('img');
        img.className = 'thumb';
        img.src = f || placeholderSVG();
        img.alt = 'Foto SJG';
        img.onerror = () => img.src = placeholderSVG();
        img.onclick = () => openLightbox(img.src, img.alt);
        div.appendChild(img);
        grid.appendChild(div);
    });
}

// Galeria de Vídeos
function renderVideos() {
    const grid = document.getElementById('videos-container');
    if (!grid) return;
    
    grid.innerHTML = '';
    VIDEOS.forEach(v => {
        const wrap = document.createElement('div');
        if (v.type === 'youtube' && v.id) {
            wrap.innerHTML = `<iframe class="thumb" src="https://www.youtube.com/embed/${v.id}" title="${v.title || 'Vídeo'}" frameborder="0" allowfullscreen></iframe>`;
        } else if (v.type === 'file' && v.src) {
            const vid = document.createElement('video');
            vid.className = 'thumb';
            vid.controls = true;
            vid.preload = 'metadata';
            vid.src = v.src;
            vid.onerror = () => wrap.style.display = 'none';
            wrap.appendChild(vid);
        } else {
            wrap.innerHTML = '<div class="thumb" style="display:grid;place-items:center">Sem vídeo</div>';
        }
        grid.appendChild(wrap);
    });
}

// Vídeos de Folias
function renderFolias() {
    const container = document.getElementById('foliaVideos');
    if (!container) return;
    
    container.innerHTML = '';
    VIDEOS.filter(v => v.type === 'file').forEach(v => {
        const vid = document.createElement('video');
        vid.className = 'thumb';
        vid.controls = true;
        vid.src = v.src;
        container.appendChild(vid);
    });
}

// Patrocinadores
function renderSponsors() {
    const el = document.getElementById('sponsors');
    if (!el) return;
    
    el.innerHTML = SPONSORS.map(s => `<div class="sponsor">${s.name}</div>`).join('');
}

// Equipes/Administração
function renderRoles() {
    const el = document.getElementById('roles');
    if (!el) return;
    
    el.innerHTML = ROLES.map(r => `<div class="role"><b>${r}</b></div>`).join('');
}

// Preencher select de áreas
function populateAreas() {
    const sel = document.getElementById('selectArea');
    if (!sel) return;
    
    sel.innerHTML = `<option value="">Selecione a área</option>${ROLES.map(r => `<option>${r}</option>`).join('')}`;
}

// Lightbox
function openLightbox(src, alt) {
    const lb = document.getElementById('lb');
    const img = document.getElementById('lbimg');
    img.src = src;
    img.alt = alt || '';
    lb.classList.add('active');
}

function closeLightbox() {
    document.getElementById('lb').classList.remove('active');
}

// Placeholder SVG
function placeholderSVG() {
    return `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#8B0000"/><stop offset="1" stop-color="#A11414"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)" /><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="48" fill="white" font-family="Arial">FOTO SJG</text></svg>')}`;
}

// Copiar PIX
function copyPIX(id) {
    const t = document.getElementById(id).textContent.trim();
    if (navigator.clipboard) {
        navigator.clipboard.writeText(t).then(() => alert('PIX copiado: ' + t));
    } else {
        const ta = document.createElement('textarea');
        ta.value = t;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        alert('PIX copiado: ' + t);
    }
}

// Formulário de candidatura
function joinTeam(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const nome = data.get('nome') || '';
    const contato = data.get('contato') || '';
    const area = data.get('area') || '';
    const mensagem = data.get('mensagem') || '';
    const body = `Nome: ${nome}%0AContato: ${contato}%0AArea: ${area}%0AMensagem: ${mensagem}`;
    window.location.href = `mailto:tecnicojigabit@gmail.com?subject=Candidatura%20Equipe&body=${body}`;
}

// Assistente virtual
function setupAssistant() {
    document.getElementById('assuntoInput').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') perguntarAssistente();
    });
}

function perguntarAssistente() {
    const q = (document.getElementById('assuntoInput').value || '').toLowerCase();
    const out = document.getElementById('respostaAssistente');
    
    if (!q) {
        out.innerHTML = '<p class="muted">Escreva sua pergunta.</p>';
        return;
    }

    let r = '';
    if (q.includes('abel') || q.includes('pesquisador') || q.includes('historiador')) {
        r = 'Abel Pereira é pesquisador e historiador de São José do Gorutuba, autor e organizador de pesquisas e dossiês sobre a região.';
    } else if (q.includes('igreja') || q.includes('padroeira')) {
        r = 'A igreja local é a Igreja de São José do Gorutuba; a padroeira é Nossa Senhora da Soledade. O patrimônio é tombado pelo município de Porteirinha (MG).';
    } else if (q.includes('festas') || q.includes('festa')) {
        r = 'Principais festas: São Sebastião (20 Jan), São José (19 Mar), Santo Antônio (13 Jun), São João (24 Jun), N. Sra. da Soledade (15 Set), entre outras.';
    } else if (q.includes('doar') || q.includes('pix')) {
        r = 'PIX: Felipe Pereira 16859749610 • Derenice 38988655081 • Abel Pereira 38998891175. Para doações oficiais, peça comprovante e envie ao tesoureiro.';
    } else if (q.includes('fotos') || q.includes('vídeo') || q.includes('midia')) {
        r = 'Para adicionar fotos e vídeos, suba os arquivos para as pastas /fotos e /videos e depois atualize o array FOTOS e VIDEOS no arquivo script.js.';
    } else {
        r = 'Desculpe, não tenho uma resposta pronta. Pergunte sobre: Abel, igreja, festas, pix, fotos, folias, igrejas locais.';
    }

    out.innerHTML = `<p>${r}</p>`;
}
