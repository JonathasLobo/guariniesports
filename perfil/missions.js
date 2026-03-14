// ============================================================
// MISSIONS.JS — Sistema de Conquistas de Longo Prazo
//
// FLUXO DE RECOMPENSA:
//   1. missionsTrack() incrementa o stat
//   2. verificarConquistas() detecta tier completo →
//      achievements[chave] = 'pending'  (não distribui ainda)
//   3. Usuário abre o painel, vê "🎁 Claim Reward" e clica
//   4. claimarRecompensa() distribui itens/XP e marca = true
// ============================================================

import { ACHIEVEMENTS, ACHIEVEMENTS_ORDER } from './missions-config.js';
import { COSMETICS, RARITY_LABELS, RARITY_COLORS } from './cosmetics-config.js';

let _userId   = null;
let _db       = null;
let _userData = null;

// ============================================================
// INIT
// ============================================================
export async function initMissions(userId, db, userData) {
  _userId   = userId;
  _db       = db;
  _userData = userData;

  if (!_userData.trainerStats)    _userData.trainerStats    = {};
  if (!_userData.achievements)    _userData.achievements    = {};
  if (!_userData.unlockedBorders) _userData.unlockedBorders = ['default'];
  if (!_userData.equippedBorder)  _userData.equippedBorder  = 'default';

  window.missionsTrack  = missionsTrack;
  window.missionsRecalc = missionsRecalc;
  window.missionsOpen   = abrirPainelConquistas;

  aplicarBordaEquipada();
  missionsRecalcSilent();

  // Consumir resultado de raid gravado pelo battle.js (página separada)
  await _consumirRaidResult();

  console.log('[Missions] Inicializado. Stats:', _userData.trainerStats);
}

// ============================================================
// CONSUMIR RESULTADO DE RAID DO LOCALSTORAGE
// Gravado pelo battle.js ao finalizar batalha (páginas separadas)
// ============================================================
async function _consumirRaidResult() {
  try {
    const raw = localStorage.getItem('missions_raid_result');
    if (!raw) return;
    localStorage.removeItem('missions_raid_result'); // consumir imediatamente
    const result = JSON.parse(raw);
    if (!result) return;

    const { won, playerCount, bossNivel, caught, shiny, hasMaxIV } = result;

    console.log('[Missions] Consumindo resultado de raid:', result);

    // Incrementar stats diretamente (sem salvar a cada um — vamos salvar tudo junto)
    const stats = _userData.trainerStats || {};
    stats.raidsParticipated = (stats.raidsParticipated || 0) + 1;
    if (won) {
      stats.raidsWon = (stats.raidsWon || 0) + 1;
      if (bossNivel >= 26 && bossNivel <= 35) stats.mediumRaidsWon = (stats.mediumRaidsWon || 0) + 1;
      if (playerCount >= 4)                   stats.squadRaids     = (stats.squadRaids     || 0) + 1;
    }
    if (caught) {
      stats.totalCaptures = (stats.totalCaptures || 0) + 1;
      if (shiny)    stats.shinyCaught        = (stats.shinyCaught        || 0) + 1;
      if (hasMaxIV) stats.perfectIVCaptures  = (stats.perfectIVCaptures  || 0) + 1;
    }
    _userData.trainerStats = stats;

    // Recalcular stats derivados e verificar conquistas
    missionsRecalcSilent();
    await verificarConquistas();

    // Salvar tudo em uma única operação
    await _salvarStats();

  } catch(e) {
    console.warn('[Missions] _consumirRaidResult erro:', e);
  }
}

// ============================================================
// TRACK
// ============================================================
export async function missionsTrack(statKey, amount = 1) {
  if (!_userId || !_userData) return;
  const stats = _userData.trainerStats || {};
  stats[statKey] = (stats[statKey] || 0) + amount;
  _userData.trainerStats = stats;
  await verificarConquistas();
  _salvarStats().catch(e => console.warn('[Missions] save stats:', e));
}

export async function missionsRecalc() {
  missionsRecalcSilent();
  await verificarConquistas();
  _salvarStats().catch(e => console.warn('[Missions] recalc save:', e));
}

function missionsRecalcSilent() {
  if (!_userData) return;
  const stats = _userData.trainerStats || {};
  const pdx = _userData.pokedex;
  if (Array.isArray(pdx)) stats.pokedexSize = pdx.length;
  const team = _userData.raidTeam || [];
  if (team.length > 0) stats.highestPokeLevel = Math.max(...team.map(s => s.nivel || 1));
  _userData.trainerStats = stats;
}

// ============================================================
// VERIFICAR — marca tiers completos como 'pending'
// ============================================================
async function verificarConquistas() {
  if (!_userId || !_userData) return;

  const stats        = _userData.trainerStats || {};
  const achievements = _userData.achievements || {};
  let   hasNew       = false;
  const newPending   = [];

  for (const achId of ACHIEVEMENTS_ORDER) {
    const ach = ACHIEVEMENTS[achId];
    if (!ach) continue;

    let valor;
    if (ach.stat === 'playerLevel') valor = _userData.playerLevel || 1;
    else valor = stats[ach.stat] || 0;

    for (const tier of ach.tiers) {
      const chave  = `${achId}_tier${tier.tier}`;
      const estado = achievements[chave]; // undefined | 'pending' | true

      if (estado === true) continue;

      // Tier anterior precisa estar CLAIMED (true), não só pendente
      if (tier.tier > 1) {
        const chavePrev = `${achId}_tier${tier.tier - 1}`;
        if (achievements[chavePrev] !== true) break;
      }

      if (valor >= tier.target) {
        if (!estado) {
          achievements[chave] = 'pending';
          hasNew = true;
          newPending.push({ ach, tier });
        }
      } else {
        break;
      }
    }
  }

  if (!hasNew) return;
  _userData.achievements = achievements;

  try {
    const { doc, updateDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
    await updateDoc(doc(_db, 'usuarios', _userId), {
      achievements: JSON.parse(JSON.stringify(achievements)),
    });
  } catch(e) { console.warn('[Missions] save pending:', e); }

  for (const { ach, tier } of newPending) {
    _mostrarToastPendente(ach, tier);
  }
}

// ============================================================
// CLAIM — distribui reward ao clicar
// ============================================================
async function claimarRecompensa(achId, tierNum) {
  if (!_userId || !_userData) return;

  const ach  = ACHIEVEMENTS[achId];
  const tier = ach?.tiers.find(t => t.tier === tierNum);
  if (!ach || !tier) return;

  const chave = `${achId}_tier${tierNum}`;
  const estado = _userData.achievements[chave];
  if (estado === true) return; // já resgatado

  // Verificar se o progresso realmente atingiu o target (segurança)
  const stats = _userData.trainerStats || {};
  let valor;
  if (ach.stat === 'playerLevel') valor = _userData.playerLevel || 1;
  else valor = stats[ach.stat] || 0;
  if (valor < tier.target && estado !== 'pending') return; // não está completo

  _userData.achievements[chave] = true;

  // Cosmético
  const unlocked = new Set(_userData.unlockedBorders || ['default']);
  let   newCosmetic = null;
  if (tier.reward.cosmetic && !unlocked.has(tier.reward.cosmetic)) {
    unlocked.add(tier.reward.cosmetic);
    _userData.unlockedBorders = Array.from(unlocked);
    newCosmetic = tier.reward.cosmetic;
  }

  // Itens
  const bag = Object.assign({}, _userData.raidBag || {});
  Object.entries(tier.reward.itens || {}).forEach(([k, v]) => {
    bag[k] = (bag[k] || 0) + v;
  });
  _userData.raidBag = bag;

  // XP treinador — processar level-up progressivo
  const xpGanho = tier.reward.xp || 0;
  if (xpGanho > 0) {
    if (typeof window.processarPlayerLevelUpGlobal === 'function') {
      // boss-raid.js está carregado na mesma página — delegar para ele
      // (processa level-up, atualiza _userData do boss-raid e re-renderiza o widget)
      window.processarPlayerLevelUpGlobal(xpGanho);
      // Sincronizar com nosso próprio _userData
      _userData.playerLevel = window._bossRaidUserData?.playerLevel || _userData.playerLevel || 1;
      _userData.playerXP    = window._bossRaidUserData?.playerXP    || _userData.playerXP    || 0;
    } else {
      // Fallback: calcular internamente (mesma fórmula do boss-raid.js)
      let nivel = _userData.playerLevel || 1;
      let xp    = (_userData.playerXP   || 0) + xpGanho;
      function xpParaN(n) { return Math.floor(100 * Math.pow(1.25, n - 1)); }
      while (xp >= xpParaN(nivel)) { xp -= xpParaN(nivel); nivel++; }
      _userData.playerLevel = nivel;
      _userData.playerXP    = xp;
    }
  }

  try {
    const { doc, updateDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
    const payload = {
      achievements:    JSON.parse(JSON.stringify(_userData.achievements)),
      unlockedBorders: JSON.parse(JSON.stringify(_userData.unlockedBorders)),
      raidBag:         JSON.parse(JSON.stringify(bag)),
      playerXP:        _userData.playerXP    || 0,
      playerLevel:     _userData.playerLevel || 1,
    };
    await updateDoc(doc(_db, 'usuarios', _userId), payload);
  } catch(e) { console.warn('[Missions] claim save:', e); }

  _mostrarToastClaim(ach, tier);
  if (newCosmetic) _mostrarToastCosmetico(newCosmetic);

  _fecharModal();
  abrirPainelConquistas();
}

// ============================================================
// FIRESTORE HELPERS
// ============================================================
async function _salvarStats() {
  const { doc, updateDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
  await updateDoc(doc(_db, 'usuarios', _userId), {
    trainerStats: JSON.parse(JSON.stringify(_userData.trainerStats || {})),
  });
}

export async function salvarBordaEquipada(cosmeticId) {
  if (!_userId || !_db) return;
  _userData.equippedBorder = cosmeticId;
  const { doc, updateDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
  await updateDoc(doc(_db, 'usuarios', _userId), { equippedBorder: cosmeticId });
  aplicarBordaEquipada();
}

// ============================================================
// BORDA COSMETICA
// ============================================================
export function aplicarBordaEquipada() {
  const cosmeticId = _userData?.equippedBorder || 'default';
  const cosmetic   = COSMETICS[cosmeticId] || COSMETICS['default'];
  const modais = document.querySelectorAll('.raid-modal-content.raid-modal-status-content');
  modais.forEach(el => {
    Object.values(COSMETICS).forEach(c => { if (c.cssClass) el.classList.remove(c.cssClass); });
    if (cosmetic.cssClass) el.classList.add(cosmetic.cssClass);
  });
}
window.aplicarBordaEquipada = aplicarBordaEquipada;

// ============================================================
// PAINEL PRINCIPAL
// ============================================================
export function abrirPainelConquistas() {
  document.getElementById('missionsModal')?.remove();

  const stats        = _userData?.trainerStats    || {};
  const achievements = _userData?.achievements    || {};
  const unlocked     = new Set(_userData?.unlockedBorders || ['default']);
  const equipped     = _userData?.equippedBorder  || 'default';
  const playerLevel  = _userData?.playerLevel     || 1;

  // ── Cosmetics tab ──────────────────────────────────────────
  const cosmeticCards = Object.values(COSMETICS).map(c => {
    const isUnlocked = unlocked.has(c.id);
    const isEquipped = equipped === c.id;
    const rarColor   = RARITY_COLORS[c.rarity] || '#888';
    const rarLabel   = RARITY_LABELS[c.rarity]  || c.rarity;
    return `
      <div class="mss-cosmetic-card ${isUnlocked ? 'mss-unlocked' : 'mss-locked'} ${isEquipped ? 'mss-equipped' : ''}"
           data-cosmetic-id="${c.id}" title="${c.desc}">
        <div class="mss-cosmetic-preview" style="border-color:${rarColor}">${c.preview}</div>
        <div class="mss-cosmetic-info">
          <span class="mss-cosmetic-name">${c.label}</span>
          <span class="mss-cosmetic-rarity" style="color:${rarColor}">${rarLabel}</span>
        </div>
        ${isEquipped
          ? '<div class="mss-cosmetic-equipped-badge">Equipped</div>'
          : isUnlocked
            ? '<button class="mss-equip-btn" data-cosmetic-id="' + c.id + '">Equip</button>'
            : '<div class="mss-cosmetic-locked-badge">🔒 Locked</div>'
        }
      </div>`;
  }).join('');

  // ── Achievements tab ───────────────────────────────────────
  const achCards = ACHIEVEMENTS_ORDER.map(achId => {
    const ach = ACHIEVEMENTS[achId];
    if (!ach) return '';

    let valor;
    if (ach.stat === 'playerLevel') valor = playerLevel;
    else valor = stats[ach.stat] || 0;

    const tiersHTML = ach.tiers.map(tier => {
      const chave   = `${achId}_tier${tier.tier}`;
      const estado  = achievements[chave];
      const done    = estado === true;
      const pending = estado === 'pending';

      const progresso  = Math.min(tier.target, valor);
      const pct        = Math.min(100, Math.floor((progresso / tier.target) * 100));
      // Tier completo localmente mas ainda não salvo como 'pending' no Firestore
      const completo   = progresso >= tier.target;

      const prevChave = `${achId}_tier${tier.tier - 1}`;
      const prevOk    = tier.tier === 1 || achievements[prevChave] === true;
      const isAtivo   = prevOk && !done && !pending;
      // Mostrar claim se pending OU se completo mas ainda não marcado
      const showClaim = pending || (isAtivo && completo);

      const rewardStr = [
        tier.reward.xp   ? `+${tier.reward.xp} Trainer XP` : '',
        ...Object.entries(tier.reward.itens || {}).map(([k, v]) => `+${v} ${_itemLabel(k)}`),
        tier.reward.cosmetic ? `🎨 ${COSMETICS[tier.reward.cosmetic]?.label || tier.reward.cosmetic}` : '',
      ].filter(Boolean).join(' · ');

      let cls = 'mss-tier-locked';
      if (done)           cls = 'mss-tier-done';
      else if (showClaim) cls = 'mss-tier-pending';
      else if (isAtivo)   cls = 'mss-tier-active';

      return `
        <div class="mss-tier ${cls}">
          <div class="mss-tier-header">
            <span class="mss-tier-label">${tier.label}</span>
            <span class="mss-tier-target">${done ? '✔ Claimed' : showClaim ? '🎁 Ready!' : `${progresso} / ${tier.target}`}</span>
          </div>
          ${isAtivo && !completo ? `<div class="mss-tier-bar-bg"><div class="mss-tier-bar-fill" style="width:${pct}%"></div></div>` : ''}
          <div class="mss-tier-reward">${rewardStr}</div>
          ${showClaim ? `<button class="mss-claim-btn" data-ach-id="${achId}" data-tier="${tier.tier}">🎁 Claim Reward</button>` : ''}
        </div>`;
    }).join('');

    return `
      <div class="mss-ach-card">
        <div class="mss-ach-header">
          <span class="mss-ach-icon">${ach.icon}</span>
          <div class="mss-ach-title-wrap">
            <span class="mss-ach-title">${ach.label}</span>
            <span class="mss-ach-desc">${ach.desc}</span>
          </div>
        </div>
        <div class="mss-tiers-wrap">${tiersHTML}</div>
      </div>`;
  }).join('');

  // ── Modal HTML ─────────────────────────────────────────────
  const modal = document.createElement('div');
  modal.id        = 'missionsModal';
  modal.className = 'mss-overlay';
  modal.innerHTML = `
    <div class="mss-box">
      <div class="mss-header">
        <span class="mss-title">🏆 Missions</span>
        <button class="mss-close" id="mssClose">✕</button>
      </div>
      <div class="mss-tabs">
        <button class="mss-tab mss-tab-active" data-tab="achievements">Achievements</button>
        <button class="mss-tab" data-tab="cosmetics">Cosmetics</button>
      </div>
      <div class="mss-content">
        <div class="mss-panel" id="mssTabAchievements">
          <div class="mss-ach-list">${achCards}</div>
        </div>
        <div class="mss-panel mss-panel-hidden" id="mssTabCosmetics">
          <p class="mss-cosmetic-hint">Equip a border to customize your Pokémon stats card!</p>
          <div class="mss-cosmetic-grid">${cosmeticCards}</div>
        </div>
      </div>
    </div>`;

  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('mss-show'), 30);

  document.getElementById('mssClose').addEventListener('click', () => _fecharModal());
  modal.addEventListener('click', e => { if (e.target === modal) _fecharModal(); });

  modal.querySelectorAll('.mss-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      modal.querySelectorAll('.mss-tab').forEach(t => t.classList.remove('mss-tab-active'));
      btn.classList.add('mss-tab-active');
      const tab = btn.dataset.tab;
      modal.querySelectorAll('.mss-panel').forEach(p => p.classList.add('mss-panel-hidden'));
      document.getElementById(`mssTab${tab.charAt(0).toUpperCase() + tab.slice(1)}`)?.classList.remove('mss-panel-hidden');
    });
  });

  modal.querySelectorAll('.mss-claim-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      btn.disabled = true;
      btn.textContent = 'Claiming...';
      await claimarRecompensa(btn.dataset.achId, parseInt(btn.dataset.tier));
    });
  });

  modal.querySelectorAll('.mss-equip-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      btn.disabled = true;
      btn.textContent = '...';
      await salvarBordaEquipada(btn.dataset.cosmeticId);
      _fecharModal();
      abrirPainelConquistas();
    });
  });
}

function _fecharModal() {
  const m = document.getElementById('missionsModal');
  if (!m) return;
  m.classList.remove('mss-show');
  setTimeout(() => m.remove(), 300);
}

function _itemLabel(key) {
  const MAP = {
    pokebola:'Poké Ball', great_ball:'Great Ball', ultra_ball:'Ultra Ball',
    master_ball:'Master Ball', potion:'Potion', super_potion:'Super Potion',
    hyper_potion:'Hyper Potion', max_potion:'Max Potion', revive:'Revive',
    max_revive:'Max Revive', full_restore:'Full Restore', ether:'Ether',
    max_ether:'Max Ether', antidote:'Antidote', awakening:'Awakening',
    leaf_stone:'Leaf Stone',
  };
  return MAP[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// ============================================================
// TOASTS
// ============================================================
function _mostrarToastPendente(ach, tier) {
  const t = document.createElement('div');
  t.className = 'mss-toast';
  t.innerHTML = `
    <div class="mss-toast-icon">${ach.icon}</div>
    <div class="mss-toast-corpo">
      <b class="mss-toast-titulo">Achievement Complete!</b>
      <span class="mss-toast-sub">${ach.label} — ${tier.label}</span>
      <span class="mss-toast-reward">Open Missions to claim your reward!</span>
    </div>`;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('mss-toast-show'), 50);
  setTimeout(() => { t.classList.remove('mss-toast-show'); setTimeout(() => t.remove(), 450); }, 5000);
}

function _mostrarToastClaim(ach, tier) {
  const rewardParts = [
    tier.reward.xp ? `+${tier.reward.xp} XP` : '',
    ...Object.entries(tier.reward.itens || {}).map(([k, v]) => `+${v} ${_itemLabel(k)}`),
  ].filter(Boolean).join(' · ');
  const t = document.createElement('div');
  t.className = 'mss-toast mss-toast-claim';
  t.innerHTML = `
    <div class="mss-toast-icon">🎁</div>
    <div class="mss-toast-corpo">
      <b class="mss-toast-titulo">Reward Claimed!</b>
      <span class="mss-toast-sub">${ach.label} — ${tier.label}</span>
      <span class="mss-toast-reward">${rewardParts}</span>
    </div>`;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('mss-toast-show'), 50);
  setTimeout(() => { t.classList.remove('mss-toast-show'); setTimeout(() => t.remove(), 450); }, 4500);
}

function _mostrarToastCosmetico(cosmeticId) {
  const c = COSMETICS[cosmeticId];
  if (!c) return;
  const rarColor = RARITY_COLORS[c.rarity] || '#888';
  const t = document.createElement('div');
  t.className = 'mss-toast mss-toast-cosmetic';
  t.style.borderColor = rarColor;
  t.innerHTML = `
    <div class="mss-toast-icon">${c.preview}</div>
    <div class="mss-toast-corpo">
      <b class="mss-toast-titulo" style="color:${rarColor}">Cosmetic Unlocked!</b>
      <span class="mss-toast-sub">${c.label}</span>
      <span class="mss-toast-reward">Go to Missions → Cosmetics to equip!</span>
    </div>`;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('mss-toast-show'), 100);
  setTimeout(() => { t.classList.remove('mss-toast-show'); setTimeout(() => t.remove(), 450); }, 5500);
}

// ============================================================
// FIM — missions.js
// O tracking de raids é feito via localStorage pelo battle.js
// e consumido em _consumirRaidResult() no initMissions.
// ============================================================
