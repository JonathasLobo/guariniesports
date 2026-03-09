// ============================================================
// BOSS SYSTEM - boss-system.js
// Compatível com Firebase v12 (sintaxe modular ESM)
// Inclua como: <script type="module" src="./boss/boss-system.js"></script>
// ============================================================

import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getDatabase, ref, onValue, runTransaction } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

// ============================================================
// ⚙️ CONFIGURAÇÕES
// ============================================================
//
// ✅ ÚNICO LUGAR PARA ADICIONAR BOSSES
// Adicione uma entrada em bosses[] abaixo.
// O scheduler grava tudo no Firebase automaticamente —
// nenhum outro arquivo precisa ser alterado.
//
// Campos de cada boss:
//   nome       — string única (identificador)
//   sprite     — URL da imagem do boss: .png, .jpg, .jpeg ou .gif (exibido no site + batalha)
//                Também aceita o campo 'gif' por compatibilidade com versões anteriores
//   tipos      — ex: ['water'] ou ['steel','fairy']
//   baseStats  — { hp, atk, def, spa, spd, spe }
//   nivel      — afeta HP e dano calculados na batalha (Gen 3+)
//   golpes     — array de até 4 golpes (ver formato abaixo)
//   catchRate  — 0–100 (% com Poké Ball; Great Ball ×1.5, Ultra Ball ×2)
//
// Formato de golpe:
//   { name, type, cat:'physical'|'special'|'status',
//     power, acc, target:'single'|'all'|'self',
//     // para status: effect, stat, stages }
// ============================================================
const BOSS_CONFIG = {
  anuncioMinutos: 1,        // antes de nascer  — produção: 60
  duracaoMinutos: 1,        // quanto fica ativo — produção: 15
  paginasPossiveis: [
    'sobre/sobre.html',
    'index.html',
    'contato/contato.html',
    'loja/loja.html'
  ],

  bosses: [
    // ── Fácil / teste ────────────────────────────────────────
    {
      nome:      'Caterpie',
      sprite:    '/boss/img-bosses/caterpie.png',
      tipos:     ['bug'],
      baseStats: { hp:5, atk:1, def:1, spa:1, spd:1, spe:1 },
      nivel:     10,
      golpes: [
        { name:'Tackle',      type:'normal', cat:'physical', power:40,  acc:100, target:'single' },
        { name:'String Shot', type:'bug',    cat:'status',   power:null,acc:95,  target:'all',
          effect:'debuff', stat:'spe', stages:-1 },
        { name:'Harden',      type:'normal', cat:'status',   power:null,acc:null,target:'self',
          effect:'buff', stat:'def', stages:1 },
      ],
      catchRate: 255,
    },

    {
      nome:      'Weedle',
      sprite:    '/boss/img-bosses/weedle.png',
      tipos:     ['bug','poison'],
      baseStats: { hp:5, atk:1, def:1, spa:1, spd:1, spe:1 },
      nivel:     10,
      golpes: [
        { name:'Poison Sting',      type:'poison', cat:'physical', power:15,  acc:100, target:'single' },
        { name:'String Shot', type:'bug',    cat:'status',   power:null,acc:95,  target:'all',
          effect:'debuff', stat:'spe', stages:-1 },
        { name:'Harden',      type:'normal', cat:'status',   power:null,acc:null,target:'self',
          effect:'buff', stat:'def', stages:1 },
      ],
      catchRate: 255,
    },

    // ── Médio ─────────────────────────────────────────────────
    /*{
      nome:      'Staryu',
      sprite:    '/boss/img-bosses/Staryu.gif',
      tipos:     ['water'],
      baseStats: { hp:60, atk:45, def:55, spa:70, spd:55, spe:85 },
      nivel:     30,
      golpes: [
        { name:'Water Gun',  type:'water',  cat:'special',  power:40,  acc:100, target:'single' },
        { name:'Swift',      type:'normal', cat:'special',  power:60,  acc:null,target:'all'    },
        { name:'Recover',    type:'normal', cat:'status',   power:null,acc:null,target:'self',
          effect:'heal' },
        { name:'Rapid Spin', type:'normal', cat:'physical', power:50,  acc:100, target:'single' },
      ],
      catchRate: 75,
    },*/

    // ── Difícil ───────────────────────────────────────────────
    /*{
      nome:      'Mawile',
      sprite:    '/boss/img-bosses/Mawile.gif',
      tipos:     ['steel','fairy'],
      baseStats: { hp:50, atk:85, def:85, spa:55, spd:55, spe:50 },
      nivel:     35,
      golpes: [
        { name:'Iron Head',    type:'steel',  cat:'physical', power:80,  acc:100, target:'single' },
        { name:'Play Rough',   type:'fairy',  cat:'physical', power:90,  acc:90,  target:'single' },
        { name:'Crunch',       type:'dark',   cat:'physical', power:80,  acc:100, target:'single' },
        { name:'Swords Dance', type:'normal', cat:'status',   power:null,acc:null,target:'self',
          effect:'buff', stat:'atk', stages:2 },
      ],
      catchRate: 45,
    },*/

    // ── Adicione novos bosses aqui ────────────────────────────
    // { nome:'...', gif:'...', tipos:[...], baseStats:{...}, nivel:X, golpes:[...], catchRate:X },
  ],
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
  if (_timerIntervalo)  { clearInterval(_timerIntervalo);  _timerIntervalo  = null; }
  if (_watcherIntervalo){ clearInterval(_watcherIntervalo); _watcherIntervalo = null; }
  const sprite = document.getElementById('boss-sprite-flutuante');
  const tarja  = document.getElementById('boss-aviso-tarja');
  if (sprite) sprite.remove();
  if (tarja) {
    tarja.style.display = 'none';
    tarja.innerHTML = '';
  }
}

// ============================================================
// LÓGICA DE EXIBIÇÃO
// ============================================================
// Guarda o intervalo do timer de contagem em escopo de módulo
// para garantir que apenas 1 intervalo rode por vez, mesmo que
// o onValue dispare múltiplas vezes (ex: múltiplos usuários conectando)
let _timerIntervalo  = null;
// Watcher de transição: verifica a cada segundo se chegou a hora de
// mudar o estado (anunciando→ativo ou ativo→inativo) usando os
// timestamps fixos já gravados no Firebase pelo scheduler.
// Apenas o 1º cliente a chegar usa runTransaction — os demais são no-op.
let _watcherIntervalo = null;

function iniciarWatcherTransicao(data) {
  // Cancelar watcher anterior se houver
  if (_watcherIntervalo) { clearInterval(_watcherIntervalo); _watcherIntervalo = null; }

  // Não há timestamps → nada a observar
  if (!data || !data.nascimento || !data.expiracao) return;
  // Boss já inativo → não instalar watcher
  if (data.estado === 'inativo') return;

  const bossRef = ref(db, 'boss_ativo');

  _watcherIntervalo = setInterval(async () => {
    const agora = Date.now();

    // ── Transição anunciando → ativo ──────────────────────────────
    if (data.estado === 'anunciando' && agora >= data.nascimento) {
      clearInterval(_watcherIntervalo); _watcherIntervalo = null;
      try {
        await runTransaction(bossRef, (cur) => {
          if (!cur || cur.estado !== 'anunciando') return; // outro cliente ganhou
          return { ...cur, estado: 'ativo' };
        });
        console.log('[BossSystem] Watcher: boss nasceu!');
      } catch(e) { /* outro cliente ganhou a corrida — ok */ }
      return;
    }

    // ── Transição ativo → inativo ─────────────────────────────────
    if (data.estado === 'ativo' && agora >= data.expiracao) {
      clearInterval(_watcherIntervalo); _watcherIntervalo = null;
      try {
        await runTransaction(bossRef, (cur) => {
          if (!cur || cur.estado !== 'ativo') return;
          return { ...cur, estado: 'inativo' };
        });
        console.log('[BossSystem] Watcher: boss expirou!');
      } catch(e) { /* outro cliente ganhou a corrida — ok */ }
      return;
    }
  }, 1000); // verifica a cada 1 segundo — preciso e leve
}

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

  // ---- WATCHER DE TRANSIÇÃO ----
  // Instala um setInterval leve que compara Date.now() com os timestamps
  // fixos do Firebase e dispara a transição de estado no momento exato,
  // sem depender de setTimeout calculado no momento do carregamento da página.
  iniciarWatcherTransicao(data);

  // ---- TARJA (apenas na index.html) ----
  if (paginaAtual === 'index.html' && tarja) {
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
  // Cancelar qualquer intervalo anterior (escopo de módulo, não DOM)
  // Isso garante que múltiplos disparos do onValue não acumulem timers
  if (_timerIntervalo) { clearInterval(_timerIntervalo); _timerIntervalo = null; }

  // Salvar o timestamp alvo para verificar reset indevido
  const _tsAlvo = timestampAlvo;

  function atualizar() {
    const diff = _tsAlvo - Date.now();

    // Chegou a zero — limpa tudo imediatamente, sem esperar Firebase
    if (diff <= 0) {
      clearInterval(_timerIntervalo);
      _timerIntervalo = null;
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
  _timerIntervalo = setInterval(atualizar, 1000);
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
    // Sem ?sala= na URL — pre-battle vai criar a sala e fazer replaceState
    window.location.href = '/boss/pre-battle.html';
  });

  // Entrar numa sala — abre modal bonito em vez de prompt()
  document.getElementById('btnJoinRoom').addEventListener('click', (e) => {
    e.stopPropagation();
    panel.remove();
    mostrarModalJoinRoom(boss);
  });
}

// ============================================================
// MODAL DE JOIN ROOM — substitui o prompt() nativo
// ============================================================
function mostrarModalJoinRoom(boss) {
  // Remover se já existir
  document.getElementById('boss-join-modal')?.remove();

  const overlay = document.createElement('div');
  overlay.id = 'boss-join-modal';
  overlay.style.cssText = [
    'position:fixed','inset:0','background:rgba(0,0,0,0.78)',
    'display:flex','align-items:center','justify-content:center',
    'z-index:10001','animation:boss-panel-appear 0.2s ease',
  ].join(';');

  overlay.innerHTML = `
    <div style="
      background:linear-gradient(160deg,#0e0e1e,#080810);
      border:2px solid rgba(255,117,0,0.45);
      border-radius:18px;padding:32px 28px;max-width:380px;width:92%;
      text-align:center;box-shadow:0 0 60px rgba(255,117,0,0.15);
      animation:boss-panel-appear 0.22s cubic-bezier(0.34,1.56,0.64,1);
    ">
      <div style="font-size:2.2rem;margin-bottom:10px">🚪</div>
      <div style="font-size:1rem;font-weight:800;color:#ff9500;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">Join a Room</div>
      <p style="font-size:0.72rem;color:#666;margin-bottom:20px;line-height:1.5">
        Enter the 6-character Room ID<br>shared by the room creator.
      </p>
      <input id="bossJoinInput"
        style="width:100%;background:rgba(255,255,255,0.04);border:2px solid rgba(255,117,0,0.35);
               border-radius:10px;padding:13px 16px;font-size:1.3rem;color:#ffad00;
               letter-spacing:4px;text-align:center;outline:none;font-weight:900;
               text-transform:uppercase;transition:border-color 0.2s;"
        maxlength="6" placeholder="A1B2C3" autocomplete="off">
      <div style="display:flex;gap:10px;margin-top:18px;">
        <button id="bossJoinCancel"
          style="flex:1;padding:10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);
                 border-radius:9px;color:#666;cursor:pointer;font-size:0.78rem;transition:background 0.15s;">
          Cancel
        </button>
        <button id="bossJoinConfirm"
          style="flex:1;padding:10px;
                 background:linear-gradient(135deg,rgba(255,117,0,0.25),rgba(255,173,0,0.15));
                 border:2px solid rgba(255,117,0,0.55);border-radius:9px;
                 color:#ffad00;cursor:pointer;font-size:0.78rem;font-weight:800;
                 transition:background 0.15s,transform 0.1s;letter-spacing:0.3px;">
          Enter Room ⚔️
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const input      = document.getElementById('bossJoinInput');
  const cancelBtn  = document.getElementById('bossJoinCancel');
  const confirmBtn = document.getElementById('bossJoinConfirm');

  input.focus();

  // Forçar uppercase ao digitar
  input.addEventListener('input', () => { input.value = input.value.toUpperCase(); });

  // Focus visual
  input.addEventListener('focus',  () => { input.style.borderColor = 'rgba(255,173,0,0.7)'; });
  input.addEventListener('blur',   () => { input.style.borderColor = 'rgba(255,117,0,0.35)'; });

  function fechar() { overlay.remove(); }

  cancelBtn.addEventListener('click', fechar);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) fechar(); });

  function confirmar() {
    const id = input.value.trim();
    if (!id || id.length < 4) {
      input.style.borderColor = '#ff4444';
      input.placeholder = 'Invalid ID!';
      setTimeout(() => {
        input.style.borderColor = 'rgba(255,117,0,0.35)';
        input.placeholder = 'A1B2C3';
      }, 1500);
      return;
    }
    fechar();
    const bossData = window.__bossEstadoData || {};
    sessionStorage.setItem('boss_sala_action',  'join');
    sessionStorage.setItem('boss_sala_join_id', id.toUpperCase());
    sessionStorage.setItem('boss_ativo_snap',   JSON.stringify(bossData));
    // Ir direto para a URL com ?sala=ID — o porteiro de segurança da pre-battle
    // vai validar boss ativo + sala existe + não expirada antes de deixar entrar
    window.location.href = `/boss/pre-battle.html?sala=${id.toUpperCase()}`;
  }

  confirmBtn.addEventListener('click', confirmar);
  confirmBtn.addEventListener('mouseover', () => { confirmBtn.style.transform = 'scale(1.04)'; });
  confirmBtn.addEventListener('mouseout',  () => { confirmBtn.style.transform = 'scale(1)'; });
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') confirmar(); });
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

  sprite.innerHTML = `<img src="${boss.sprite || boss.gif}" alt="${boss.nome}" style="width:120px;height:auto;display:block;">`;

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
