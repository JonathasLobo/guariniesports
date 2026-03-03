// ============================================================
// BOSS SYSTEM - boss-system.js
// Compatível com Firebase v12 (sintaxe modular ESM)
// Inclua como: <script type="module" src="./boss/boss-system.js"></script>
// ============================================================

import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

// ============================================================
// ⚙️ CONFIGURAÇÕES
// ============================================================
const BOSS_CONFIG = {
  anuncioMinutos: 1,        // Tempo de aviso antes de nascer — em produção: 60
  duracaoMinutos: 1,        // Tempo que o boss fica ativo  — em produção: 15
  paginasPossiveis: [
    'sobre/sobre.html',
    'index.html',
    'contato/contato.html',
    'loja/loja.html'
  ],
  bosses: [
    { nome: 'Staryu', gif: '/boss/img-bosses/Staryu.gif', hp: 1500 },
    { nome: 'Mawile', gif: '/boss/img-bosses/Mawile.gif', hp: 1900 },
  ]
};

window.BOSS_CONFIG = BOSS_CONFIG;

// ============================================================
// FIREBASE
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyC9LLCXrQTHBagQxaChBazSfS5E4gUPIoI",
  authDomain: "site-grn.firebaseapp.com",
  projectId: "site-grn",
  storageBucket: "site-grn.firebasestorage.app",
  messagingSenderId: "27613322806",
  appId: "1:27613322806:web:ad4dc08ce043f19d530297",
  measurementId: "G-84NHN394WF",
  databaseURL: "https://site-grn-default-rtdb.firebaseio.com"
};

const app  = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getDatabase(app);

window.__bossDb = db;

// ============================================================
// CSS INJETADO GLOBALMENTE
// ============================================================
(function injetarCSS() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes boss-flutuar {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-18px); }
    }
    @keyframes boss-piscar {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.75; }
    }
    .boss-tarja {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 20px;
      font-size: 0.95rem;
      font-weight: 600;
      border-radius: 6px;
      margin: 8px 16px;
      text-align: center;
      gap: 8px;
      animation: boss-piscar 1.5s ease-in-out infinite;
    }
    .boss-tarja-anunciando {
      background: linear-gradient(90deg, #b8860b, #ffad00, #b8860b);
      color: #1a1a1a;
      border: 2px solid #ffad00;
    }
    .boss-tarja-ativo {
      background: linear-gradient(90deg, #8b0000, #ff3333, #8b0000);
      color: #ffffff;
      border: 2px solid #ff3333;
    }

    #boss-action-panel {
      pointer-events: all;
      animation: boss-panel-appear 0.2s cubic-bezier(0.34,1.56,0.64,1);
    }
    @keyframes boss-panel-appear {
      from { transform: translateY(10px) scale(0.9); opacity: 0; }
      to   { transform: translateY(0) scale(1); opacity: 1; }
    }
    .boss-action-btn {
      padding: 10px 18px;
      border: none;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      box-shadow: 0 4px 16px rgba(0,0,0,0.6);
      transition: transform 0.12s, filter 0.12s;
      letter-spacing: 0.3px;
    }
    .boss-action-btn:hover { transform: scale(1.07); filter: brightness(1.15); }
    .boss-btn-create {
      background: linear-gradient(135deg, #ff4500, #ff7b00);
      color: #fff;
    }
    .boss-btn-join {
      background: linear-gradient(135deg, #1a6aff, #00cfff);
      color: #fff;
    }
    #boss-sprite-flutuante {
      position: absolute;
      z-index: 9999;
      cursor: pointer;
      animation: boss-flutuar 3s ease-in-out infinite;
      filter: drop-shadow(0 0 18px #ff4444) drop-shadow(0 0 40px #ff0000);
      transition: transform 0.2s;
    }
    #boss-sprite-flutuante:hover {
      transform: scale(1.15);
    }
  `;
  document.head.appendChild(style);
})();

// ============================================================
// UTILITÁRIOS
// ============================================================
function getPaginaAtual() {
  const path = window.location.pathname;
  for (const pagina of BOSS_CONFIG.paginasPossiveis) {
    if (path.endsWith(pagina) || path.endsWith(pagina.replace('/', '\\'))) {
      return pagina;
    }
  }
  if (path === '/' || path.endsWith('/') || path.endsWith('index.html')) {
    return 'index.html';
  }
  return null;
}

// ============================================================
// FUNÇÃO CENTRAL DE LIMPEZA — chamada de qualquer lugar
// Remove sprite e tarja imediatamente, sem condições
// ============================================================
function limparTudoBoss() {
  const sprite = document.getElementById('boss-sprite-flutuante');
  const tarja  = document.getElementById('boss-aviso-tarja');
  if (sprite) sprite.remove();
  if (tarja) {
    if (tarja._intervalo) clearInterval(tarja._intervalo);
    tarja.style.display = 'none';
    tarja.innerHTML = '';
  }
}

// ============================================================
// LÓGICA DE EXIBIÇÃO
// ============================================================
function iniciarSistemaBoss() {
  const bossRef = ref(db, 'boss_ativo');
  onValue(bossRef, (snapshot) => {
    atualizarEstadoBoss(snapshot.val());
  });
}

function atualizarEstadoBoss(data) {
  window.__bossEstado    = data?.estado    || 'inativo';
  window.__bossEstadoData = data || {};
  window.__bossExpiracao = data?.expiracao || 0;

  const paginaAtual = getPaginaAtual();
  const tarja       = document.getElementById('boss-aviso-tarja');

  // ---- VERIFICAÇÃO IMEDIATA DE EXPIRAÇÃO ----
  // Se o Firebase ainda diz 'ativo' mas o tempo já passou no cliente,
  // trata como inativo imediatamente — sem esperar o scheduler atualizar
  const jaExpirou = data?.expiracao && Date.now() > data.expiracao;
  if (jaExpirou || !data || data.estado === 'inativo') {
    limparTudoBoss();
    return;
  }

  // ---- TARJA (apenas na index.html) ----
  if (paginaAtual === 'index.html' && tarja) {
    if (tarja._intervalo) clearInterval(tarja._intervalo);

    if (data.estado === 'anunciando') {
      tarja.style.display = 'flex';
      tarja.className = 'boss-tarja boss-tarja-anunciando';
      iniciarContagemRegressiva(data.nascimento, tarja, 'anunciando');
    } else if (data.estado === 'ativo') {
      tarja.style.display = 'flex';
      tarja.className = 'boss-tarja boss-tarja-ativo';
      iniciarContagemRegressiva(data.expiracao, tarja, 'ativo');
    }
  }

  // ---- SPRITE DO BOSS ----
  const spriteExistente = document.getElementById('boss-sprite-flutuante');

  if (data.estado === 'ativo' && data.pagina === paginaAtual) {
    if (!spriteExistente) {
      criarSpriteBoss(data.boss, data.posX, data.posY);
    }
  } else {
    if (spriteExistente) spriteExistente.remove();
  }
}

// ============================================================
// CONTAGEM REGRESSIVA
// Quando chega a zero: limpa tudo imediatamente no cliente
// ============================================================
function iniciarContagemRegressiva(timestampAlvo, container, tipo) {
  if (container._intervalo) clearInterval(container._intervalo);

  function atualizar() {
    const diff = timestampAlvo - Date.now();

    // ✅ Chegou a zero — limpa tudo imediatamente, sem esperar Firebase
    if (diff <= 0) {
      clearInterval(container._intervalo);
      limparTudoBoss();
      return;
    }

    const minutos  = Math.floor(diff / 60000);
    const segundos = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
    const tempo    = `${minutos}m ${segundos}s`;

    container.innerHTML = tipo === 'anunciando'
      ? `⚠️ <strong>Um Boss está para nascer em ${tempo}!</strong> Fique atento às páginas do site!`
      : `🔴 <strong>BOSS ATIVO!</strong> Um boss está rugindo pelo site por mais <strong>${tempo}</strong>! Encontre-o e lute!`;
  }

  atualizar();
  container._intervalo = setInterval(atualizar, 1000);
}

// ============================================================
// CRIAÇÃO DO SPRITE
// ============================================================

// ============================================================
// BOTÕES FLUTUANTES — Create a Room / Join a Room
// ============================================================
function mostrarBotoesBoss(sprite, boss) {
  // Se já existe o painel, remover (toggle)
  const existente = document.getElementById('boss-action-panel');
  if (existente) { existente.remove(); return; }

  const panel = document.createElement('div');
  panel.id = 'boss-action-panel';
  panel.innerHTML = `
    <button id="btnCreateRoom" class="boss-action-btn boss-btn-create">
      ⚔️ Create a Room
    </button>
    <button id="btnJoinRoom" class="boss-action-btn boss-btn-join">
      🚪 Join a Room
    </button>
  `;

  // Posicionar acima do sprite
  const rect = sprite.getBoundingClientRect();
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  const scrollX = window.scrollX || document.documentElement.scrollLeft;
  panel.style.position  = 'absolute';
  panel.style.zIndex    = '10000';
  panel.style.display   = 'flex';
  panel.style.flexDirection = 'row';
  panel.style.gap       = '10px';
  // Centralizar acima do sprite
  const panelW = 280;
  const spriteX = rect.left + scrollX + (rect.width / 2);
  panel.style.left = Math.max(8, spriteX - panelW/2) + 'px';
  panel.style.top  = (rect.top + scrollY - 64) + 'px';

  document.body.appendChild(panel);

  // Fechar ao clicar fora
  setTimeout(() => {
    document.addEventListener('click', function closePanel(e) {
      if (!panel.contains(e.target) && e.target !== sprite) {
        panel.remove();
        document.removeEventListener('click', closePanel);
      }
    });
  }, 50);

  // Criar sala
  document.getElementById('btnCreateRoom').addEventListener('click', (e) => {
    e.stopPropagation();
    panel.remove();
    // Salvar dados do boss no sessionStorage para a pre-battle.html usar
    const bossData = window.__bossEstadoData || {};
    sessionStorage.setItem('boss_sala_action', 'create');
    sessionStorage.setItem('boss_ativo_snap', JSON.stringify(bossData));
    window.location.href = '/boss/pre-battle.html';
  });

  // Entrar numa sala
  document.getElementById('btnJoinRoom').addEventListener('click', (e) => {
    e.stopPropagation();
    panel.remove();
    const salaId = prompt('Enter the Room ID shared by the room creator:');
    if (!salaId || !salaId.trim()) return;
    const bossData = window.__bossEstadoData || {};
    sessionStorage.setItem('boss_sala_action', 'join');
    sessionStorage.setItem('boss_sala_join_id', salaId.trim().toUpperCase());
    sessionStorage.setItem('boss_ativo_snap', JSON.stringify(bossData));
    window.location.href = '/boss/pre-battle.html';
  });
}

function criarSpriteBoss(boss, posX, posY) {
  const sprite = document.createElement('div');
  sprite.id    = 'boss-sprite-flutuante';
  sprite.title = `Boss: ${boss.nome} — Clique para enfrentar!`;

// ✅ Limita a posição à área visível da página atual
// Garante que o boss sempre aparece dentro dos limites do conteúdo visível
const alturaMaxima = Math.max(
  document.documentElement.clientHeight,  // altura visível do viewport
  document.body.scrollHeight              // altura real do conteúdo
) - 160;

const larguraMaxima = Math.max(
  document.documentElement.clientWidth,
  document.body.scrollWidth
) - 160;

// Usa a posição do Firebase mas clampeia para não sair da área útil
const x = posX != null ? Math.min(posX, larguraMaxima) : Math.floor(Math.random() * larguraMaxima) + 20;
const y = posY != null ? Math.min(posY, alturaMaxima)  : Math.floor(Math.random() * alturaMaxima)  + 80;

sprite.style.left = x + 'px';
sprite.style.top  = y + 'px';

  sprite.innerHTML = `<img src="${boss.gif}" alt="${boss.nome}" style="width:120px;height:auto;display:block;">`;

  sprite.addEventListener('click', (e) => {
    e.stopPropagation();
    mostrarBotoesBoss(sprite, boss);
  });

  document.body.appendChild(sprite);

  // ✅ Agenda remoção local baseada no tempo restante
  // Garante que o sprite some mesmo em páginas sem tarja (sobre, contato)
  const expiracao = window.__bossExpiracao || 0;
  const tempoRestante = expiracao - Date.now();
  if (tempoRestante > 0) {
    setTimeout(() => {
      limparTudoBoss();
    }, tempoRestante);
  } else {
    // Já expirou — remove imediatamente
    limparTudoBoss();
  }
}

// ============================================================
// INICIALIZAÇÃO — SOMENTE PARA USUÁRIOS LOGADOS
// ============================================================
onAuthStateChanged(auth, (user) => {
  if (user) {
    iniciarSistemaBoss();
  } else {
    limparTudoBoss();
  }
});
