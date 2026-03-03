// ============================================================
// BOSS SCHEDULER - boss-scheduler.js
// Compatível com Firebase v12 (sintaxe modular ESM)
// Inclua APENAS na index.html, APÓS o boss-system.js
// <script type="module" src="./boss/boss-scheduler.js"></script>
// ============================================================

import { getApps, initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getDatabase, ref, get, set, update } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

// ============================================================
// ⚙️ INTERVALO ENTRE BOSSES
// ------------------------------------------------------------
// 🧪 MODO TESTE — 1 minuto fixo
// Quando for lançar em produção:
//   1. Comente a linha "const INTERVALO..." abaixo
//   2. Descomente a função "sortearIntervalo()" e o bloco de produção
// ============================================================

const INTERVALO_ENTRE_BOSSES_MS = 1 * 60 * 1000; // 🧪 TESTE: 1 minuto — COMENTE ESTA LINHA EM PRODUÇÃO

// 🚀 PRODUÇÃO — descomente o bloco abaixo quando for ao ar:
// function sortearIntervalo() {
//   const minMs = 1 * 60 * 60 * 1000; // mínimo: 1 hora
//   const maxMs = 4 * 60 * 60 * 1000; // máximo: 4 horas
//   const intervalo = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
//   console.log(`[BossScheduler] Próximo boss em ${Math.round(intervalo / 60000)} minutos`);
//   return intervalo;
// }

// ============================================================
// FORÇAR BOSS ESPECÍFICO
// ============================================================
let FORCAR_BOSS_INDEX = null;

window.forcarBoss = function(index) {
  const config = getBossConfig();
  if (!config) { console.warn('[BossScheduler] BOSS_CONFIG ainda não carregou.'); return; }
  if (index === null) {
    FORCAR_BOSS_INDEX = null;
    console.log('[BossScheduler] Modo aleatório restaurado.');
    return;
  }
  if (index < 0 || index >= config.bosses.length) {
    console.warn(`[BossScheduler] Índice inválido. Bosses disponíveis (0 a ${config.bosses.length - 1}):`);
    config.bosses.forEach((b, i) => console.log(`  ${i} → ${b.nome}`));
    return;
  }
  FORCAR_BOSS_INDEX = index;
  console.log(`[BossScheduler] Próximo boss forçado: ${config.bosses[index].nome}`);
};

window.listarBosses = function() {
  const config = getBossConfig();
  if (!config) { console.warn('[BossScheduler] BOSS_CONFIG ainda não carregou.'); return; }
  console.log('[BossScheduler] Bosses disponíveis:');
  config.bosses.forEach((b, i) => console.log(`  ${i} → ${b.nome}`));
};

// ============================================================
// RESET PARA TESTES
// Use no console: window.resetarBoss()
// ============================================================
window.resetarBoss = async function() {
  const bossRef = ref(db, 'boss_ativo');
  await update(bossRef, { estado: 'inativo' });
  console.log('[BossScheduler] Boss resetado! Iniciando novo ciclo...');
  setTimeout(() => iniciarCiclo(), 500);
};

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

// ============================================================
// UTILITÁRIOS
// ============================================================
function getBossConfig() {
  return window.BOSS_CONFIG || null;
}

function sortearPagina(config) {
  const paginas = config.paginasPossiveis;
  return paginas[Math.floor(Math.random() * paginas.length)];
}

function sortearBoss(config) {
  if (FORCAR_BOSS_INDEX !== null) {
    const boss = config.bosses[FORCAR_BOSS_INDEX];
    console.log(`[BossScheduler] Usando boss forçado: ${boss.nome}`);
    FORCAR_BOSS_INDEX = null;
    return boss;
  }
  return config.bosses[Math.floor(Math.random() * config.bosses.length)];
}

function gerarPosicao() {
  return {
    posX: Math.floor(Math.random() * (document.body.scrollWidth  - 160)) + 20,
    posY: Math.floor(Math.random() * (document.body.scrollHeight - 160)) + 20
  };
}

// ============================================================
// CICLO PRINCIPAL
// ============================================================
async function iniciarCiclo() {
  const config = getBossConfig();
  if (!config) {
    setTimeout(iniciarCiclo, 1000);
    return;
  }

  // ⚙️ INTERVALO:
  // 🧪 Teste: usa a constante fixa de 1 minuto
  const intervalo = INTERVALO_ENTRE_BOSSES_MS;
  // 🚀 Produção: troque a linha acima por:
  // const intervalo = sortearIntervalo();

  console.log(`[BossScheduler] Novo ciclo em ${Math.round(intervalo / 1000)} segundos...`);

  setTimeout(async () => {
    const nascimento     = Date.now() + (config.anuncioMinutos * 60 * 1000);
    const expiracao      = nascimento  + (config.duracaoMinutos  * 60 * 1000);
    const { posX, posY } = gerarPosicao();

    const novoBoss = {
      estado:     'anunciando',
      pagina:     sortearPagina(config),
      nascimento: nascimento,
      expiracao:  expiracao,
      posX:       posX,
      posY:       posY,
      boss:       sortearBoss(config)
    };

    const bossRef = ref(db, 'boss_ativo');
    await set(bossRef, novoBoss);
    console.log('[BossScheduler] Boss anunciado:', novoBoss);

    const tempoAteNascer = nascimento - Date.now();
    setTimeout(async () => {
      await update(bossRef, { estado: 'ativo' });
      console.log('[BossScheduler] Boss nasceu!');

      const tempoAteExpirar = expiracao - Date.now();
      setTimeout(async () => {
        await update(bossRef, { estado: 'inativo' });
        console.log('[BossScheduler] Boss expirou. Iniciando novo ciclo...');
        iniciarCiclo();
      }, tempoAteExpirar > 0 ? tempoAteExpirar : 0);

    }, tempoAteNascer > 0 ? tempoAteNascer : 0);

  }, intervalo);
}

// ============================================================
// VERIFICAÇÃO INICIAL
// ============================================================
async function verificarEAgendar() {
  const config = getBossConfig();
  if (!config) {
    setTimeout(verificarEAgendar, 1000);
    return;
  }

  const bossRef  = ref(db, 'boss_ativo');
  const snapshot = await get(bossRef);
  const data     = snapshot.val();
  const agora    = Date.now();

  const deveAgendar = !data
    || data.estado === 'inativo'
    || (data.estado === 'ativo'      && agora > data.expiracao)
    || (data.estado === 'anunciando' && agora > data.expiracao);

  if (deveAgendar) {
    console.log('[BossScheduler] Nenhum boss ativo. Iniciando ciclo...');
    iniciarCiclo();
    return;
  }

  console.log('[BossScheduler] Boss em andamento. Reconectando ao ciclo atual...');

  if (data.estado === 'anunciando') {
    const tempoAteNascer  = data.nascimento - agora;
    const tempoAteExpirar = data.expiracao  - agora;

    setTimeout(async () => {
      await update(bossRef, { estado: 'ativo' });
      console.log('[BossScheduler] Boss nasceu! (reconectado)');

      setTimeout(async () => {
        await update(bossRef, { estado: 'inativo' });
        console.log('[BossScheduler] Boss expirou. (reconectado) Novo ciclo...');
        iniciarCiclo();
      }, tempoAteExpirar > 0 ? tempoAteExpirar : 0);

    }, tempoAteNascer > 0 ? tempoAteNascer : 0);

  } else if (data.estado === 'ativo') {
    const tempoAteExpirar = data.expiracao - agora;

    setTimeout(async () => {
      await update(bossRef, { estado: 'inativo' });
      console.log('[BossScheduler] Boss expirou. (reconectado) Novo ciclo...');
      iniciarCiclo();
    }, tempoAteExpirar > 0 ? tempoAteExpirar : 0);
  }
}

// ============================================================
// INICIALIZAÇÃO — SOMENTE PARA USUÁRIOS LOGADOS
// ============================================================
onAuthStateChanged(auth, (user) => {
  if (user) {
    verificarEAgendar();
    console.log('[BossScheduler] Dicas de uso no console:');
    console.log('  window.listarBosses()   → lista os bosses disponíveis');
    console.log('  window.forcarBoss(0)    → força o boss de índice 0 no próximo ciclo');
    console.log('  window.forcarBoss(null) → volta ao modo aleatório');
    console.log('  window.resetarBoss()    → reseta e inicia novo ciclo imediatamente');
  }
});
