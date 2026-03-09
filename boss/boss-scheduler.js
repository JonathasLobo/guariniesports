// ============================================================
// BOSS SCHEDULER - boss-scheduler.js
// Compatível com Firebase v12 (sintaxe modular ESM)
// Inclua APENAS na index.html, APÓS o boss-system.js
// <script type="module" src="./boss/boss-scheduler.js"></script>
// ============================================================

import { getApps, initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getDatabase, ref, get, set, update, runTransaction } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

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
  if (_aguardandoFimIntervalo) { clearInterval(_aguardandoFimIntervalo); _aguardandoFimIntervalo = null; }
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

function sanitizarGolpes(golpes) {
  // Firebase Realtime Database descarta campos com valor null.
  // Substituímos null por false antes de gravar — o battle.js trata false == null.
  return (golpes || []).map(g => {
    const out = {};
    for (const [k, v] of Object.entries(g)) {
      out[k] = v === null ? false : v;
    }
    return out;
  });
}

function sanitizarBoss(boss) {
  if (!boss) return boss;
  return { ...boss, golpes: sanitizarGolpes(boss.golpes) };
}

function sortearBoss(config) {
  if (FORCAR_BOSS_INDEX !== null) {
    const boss = config.bosses[FORCAR_BOSS_INDEX];
    console.log(`[BossScheduler] Usando boss forçado: ${boss.nome}`);
    FORCAR_BOSS_INDEX = null;
    return sanitizarBoss(boss);
  }
  return sanitizarBoss(config.bosses[Math.floor(Math.random() * config.bosses.length)]);
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
// ============================================================
// CICLO PRINCIPAL
// ------------------------------------------------------------
// Responsabilidade ÚNICA: gravar os timestamps no Firebase.
// As transições de estado (anunciando→ativo, ativo→inativo)
// são feitas pelo watcher em boss-system.js, que roda em
// TODOS os clientes e usa runTransaction para garantir que
// apenas UM deles escreve — sem race condition.
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

  console.log(`[BossScheduler] Próximo boss em ${Math.round(intervalo / 1000)} segundos...`);

  // Aguardar o intervalo via setTimeout — apenas para agendar o PRÓXIMO boss.
  // NÃO há mais setTimeout aninhados para mudar estado: isso é papel do watcher.
  setTimeout(async () => {
    const agora      = Date.now();
    const nascimento = agora + (config.anuncioMinutos * 60 * 1000);
    const expiracao  = nascimento + (config.duracaoMinutos * 60 * 1000);
    const { posX, posY } = gerarPosicao();

    const novoBoss = {
      estado:     'anunciando',
      pagina:     sortearPagina(config),
      nascimento: nascimento,  // timestamp FIXO — não depende de quando o cliente carregou
      expiracao:  expiracao,   // timestamp FIXO — calculado uma única vez aqui
      posX,
      posY,
      boss: sortearBoss(config),
    };

    // Usar transação para garantir que apenas 1 cliente cria o boss
    // (evita duplicação se dois usuários estiverem na index.html ao mesmo tempo)
    const bossRef = ref(db, 'boss_ativo');
    try {
      await runTransaction(bossRef, (cur) => {
        const now = Date.now();
        // Se outro cliente já criou um boss válido enquanto aguardávamos, abortar
        if (cur && cur.expiracao > now &&
            (cur.estado === 'ativo' || cur.estado === 'anunciando')) {
          return; // abortar — não mudar nada
        }
        return novoBoss;
      });
      console.log('[BossScheduler] Boss anunciado com timestamps fixos:', {
        nascimento: new Date(nascimento).toLocaleTimeString(),
        expiracao:  new Date(expiracao).toLocaleTimeString(),
      });
    } catch(e) {
      console.log('[BossScheduler] Outro cliente criou o boss primeiro — ok.');
    }
    // As transições de estado são responsabilidade do watcher em boss-system.js.
    // Este scheduler NÃO agenda mais setTimeout para mudar anunciando→ativo→inativo.

  }, intervalo);
}

// ============================================================
// VERIFICAÇÃO INICIAL
// ------------------------------------------------------------
// Verifica o estado atual do Firebase ao carregar.
// Se não há boss ativo, inicia o ciclo para criar o próximo.
// Se há boss em andamento, NÃO faz nada além de logar —
// o watcher em boss-system.js já está cuidando das transições.
// ============================================================
async function verificarEAgendar() {
  const config = getBossConfig();
  if (!config) { setTimeout(verificarEAgendar, 1000); return; }

  const bossRef  = ref(db, 'boss_ativo');
  const snapshot = await get(bossRef);
  const data     = snapshot.val();
  const agora    = Date.now();

  // Boss válido em andamento — watcher do boss-system.js cuida do resto
  if (data && data.expiracao > agora &&
      (data.estado === 'ativo' || data.estado === 'anunciando')) {
    console.log(`[BossScheduler] Boss em andamento (${data.estado}). Watcher ativo.`);
    // Quando esse boss terminar, o watcher vai mudar para 'inativo',
    // o onValue do boss-system.js vai disparar, e o scheduler precisa
    // saber que deve criar o próximo ciclo. Para isso, observamos o Firebase:
    _aguardarFimDoBossAtual(bossRef, data.expiracao);
    return;
  }

  // Sem boss ativo ou expirado — iniciar novo ciclo
  console.log('[BossScheduler] Nenhum boss ativo. Iniciando ciclo...');
  iniciarCiclo();
}

// Aguarda o boss atual terminar para iniciar o próximo ciclo.
// Usa um setInterval simples baseado em timestamp — sem setTimeout relativo.
let _aguardandoFimIntervalo = null;
function _aguardarFimDoBossAtual(bossRef, expiracao) {
  if (_aguardandoFimIntervalo) { clearInterval(_aguardandoFimIntervalo); }
  _aguardandoFimIntervalo = setInterval(() => {
    if (Date.now() >= expiracao) {
      clearInterval(_aguardandoFimIntervalo); _aguardandoFimIntervalo = null;
      console.log('[BossScheduler] Boss expirou. Iniciando próximo ciclo...');
      iniciarCiclo();
    }
  }, 5000); // verifica a cada 5 segundos — leve e suficiente
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
