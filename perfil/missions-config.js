// ============================================================
// MISSIONS CONFIG — missions-config.js
// Define todas as conquistas de longo prazo do sistema.
//
// COMO ADICIONAR UMA NOVA CONQUISTA:
//   1. Adicione uma entrada no objeto ACHIEVEMENTS abaixo.
//   2. Defina os campos obrigatórios (id, label, desc, type, etc).
//   3. Para rastrear progresso, o campo `stat` deve corresponder
//      a uma chave em trainerStats (veja missions.js).
//   4. Rewards: xp = XP do treinador, itens = { itemKey: qty },
//      cosmetic = id do cosmético (cosmetics-config.js).
//
// TIPOS DE CONQUISTA:
//   'counter'  — progresso numérico (ex: vencer X raids)
//   'level'    — atingir um nível específico (pokemon ou trainer)
//   'pokedex'  — ter N pokémons na pokédex
//
// TIERS:
//   Uma conquista pode ter múltiplos tiers (bronze, silver, gold, etc).
//   Cada tier tem seu próprio target e reward.
//   O progresso é compartilhado — completar bronze abre silver, etc.
// ============================================================

export const ACHIEVEMENTS = {

  // ══════════════════════════════════════════════════════════
  // RAIDS VENCIDAS
  // ══════════════════════════════════════════════════════════

  raids_won: {
    id:      'raids_won',
    label:   'Raid Victor',
    desc:    'Win Boss Raids',
    icon:    '⚔️',
    stat:    'raidsWon',       // campo em trainerStats no Firestore
    type:    'counter',
    tiers: [
      { tier: 1, label: 'Bronze', target: 1,   reward: { xp: 50,  itens: { potion: 2, revive: 1 } } },
      { tier: 2, label: 'Silver', target: 10,  reward: { xp: 150, itens: { super_potion: 3, revive: 2 }, cosmetic: 'border_silver' } },
      { tier: 3, label: 'Gold',   target: 50,  reward: { xp: 500, itens: { hyper_potion: 5, max_revive: 2 }, cosmetic: 'border_blue' } },
      { tier: 4, label: 'Master', target: 200, reward: { xp: 2000, itens: { max_potion: 10, max_revive: 5 }, cosmetic: 'border_gold' } },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // RAIDS NÍVEL MÉDIO (boss nível 26–35)
  // ══════════════════════════════════════════════════════════

  medium_raids_won: {
    id:      'medium_raids_won',
    label:   'Challenge Seeker',
    desc:    'Win medium difficulty raids (boss level 26–35)',
    icon:    '🌟',
    stat:    'mediumRaidsWon',
    type:    'counter',
    tiers: [
      { tier: 1, label: 'Bronze', target: 10, reward: { xp: 200, itens: { great_ball: 5, super_potion: 3 } } },
      { tier: 2, label: 'Silver', target: 20, reward: { xp: 500, itens: { ultra_ball: 5, hyper_potion: 5 }, cosmetic: 'border_green' } },
      { tier: 3, label: 'Gold',   target: 30, reward: { xp: 1000, itens: { master_ball: 1, max_potion: 5 }, cosmetic: 'border_fire' } },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // RAIDS COM 4 JOGADORES
  // ══════════════════════════════════════════════════════════

  squad_raids: {
    id:      'squad_raids',
    label:   'Squad Goals',
    desc:    'Participate in raids with 4 trainers',
    icon:    '👥',
    stat:    'squadRaids',
    type:    'counter',
    tiers: [
      { tier: 1, label: 'Bronze', target: 5,  reward: { xp: 100, itens: { potion: 5, revive: 3 } } },
      { tier: 2, label: 'Silver', target: 20, reward: { xp: 300, itens: { super_potion: 5, revive: 5 }, cosmetic: 'border_green' } },
      { tier: 3, label: 'Gold',   target: 50, reward: { xp: 800, itens: { hyper_potion: 8, max_revive: 3 }, cosmetic: 'border_rainbow' } },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // CAPTURAS (acumulativo — conta mesmo se der release)
  // ══════════════════════════════════════════════════════════

  total_captures: {
    id:      'total_captures',
    label:   'Pokémon Catcher',
    desc:    'Capture Pokémon in raids (counts even after release)',
    icon:    '🎯',
    stat:    'totalCaptures',
    type:    'counter',
    tiers: [
      { tier: 1, label: 'Bronze', target: 5,   reward: { xp: 100, itens: { pokebola: 5 } } },
      { tier: 2, label: 'Silver', target: 25,  reward: { xp: 300, itens: { great_ball: 8 }, cosmetic: 'border_silver' } },
      { tier: 3, label: 'Gold',   target: 100, reward: { xp: 1000, itens: { ultra_ball: 10, max_revive: 3 }, cosmetic: 'border_blue' } },
      { tier: 4, label: 'Master', target: 200, reward: { xp: 3000, itens: { master_ball: 2 }, cosmetic: 'border_dark' } },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // POKÉDEX — espécies únicas registradas
  // ══════════════════════════════════════════════════════════

  pokedex_size: {
    id:      'pokedex_size',
    label:   'Pokédex Explorer',
    desc:    'Register unique species in your Pokédex',
    icon:    '📖',
    stat:    'pokedexSize',   // calculado na hora (Array.from(pokedex).length)
    type:    'pokedex',
    tiers: [
      { tier: 1, label: 'Bronze', target: 5,  reward: { xp: 100, itens: { revive: 3 } } },
      { tier: 2, label: 'Silver', target: 15, reward: { xp: 300, itens: { ultra_ball: 5 }, cosmetic: 'border_silver' } },
      { tier: 3, label: 'Gold',   target: 30, reward: { xp: 800, itens: { master_ball: 1 }, cosmetic: 'border_rainbow' } },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // NÍVEL DO TREINADOR
  // ══════════════════════════════════════════════════════════

  trainer_level: {
    id:      'trainer_level',
    label:   'Experienced Trainer',
    desc:    'Reach Trainer levels',
    icon:    '🏅',
    stat:    'playerLevel',   // vem diretamente de userData.playerLevel
    type:    'level',
    tiers: [
      { tier: 1, label: 'Lv 10',  target: 10,  reward: { xp: 200, itens: { super_potion: 5, revive: 3 }, cosmetic: 'border_green' } },
      { tier: 2, label: 'Lv 20',  target: 20,  reward: { xp: 500, itens: { hyper_potion: 8, max_revive: 3 }, cosmetic: 'border_blue' } },
      { tier: 3, label: 'Lv 30',  target: 30,  reward: { xp: 1000, itens: { max_potion: 10, max_revive: 5 }, cosmetic: 'border_fire' } },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // NÍVEL DE POKÉMON — atingir level 20, 40, 60 com qualquer poke
  // ══════════════════════════════════════════════════════════

  pokemon_level: {
    id:      'pokemon_level',
    label:   'Power Trainer',
    desc:    'Level up a Pokémon to high levels',
    icon:    '⬆️',
    stat:    'highestPokeLevel',  // maior level de qualquer poke no time
    type:    'level',
    tiers: [
      { tier: 1, label: 'Lv 20', target: 20, reward: { xp: 150, itens: { ether: 3, revive: 2 } } },
      { tier: 2, label: 'Lv 40', target: 40, reward: { xp: 400, itens: { max_ether: 3, max_revive: 2 }, cosmetic: 'border_silver' } },
      { tier: 3, label: 'Lv 60', target: 60, reward: { xp: 1000, itens: { max_ether: 5, max_revive: 5 }, cosmetic: 'border_dark' } },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // RAIDS PERDIDAS (resiliência)
  // ══════════════════════════════════════════════════════════

  raids_participated: {
    id:      'raids_participated',
    label:   'Determined Trainer',
    desc:    'Participate in Boss Raids (win or lose)',
    icon:    '🛡️',
    stat:    'raidsParticipated',
    type:    'counter',
    tiers: [
      { tier: 1, label: 'Bronze', target: 5,   reward: { xp: 80,  itens: { potion: 3 } } },
      { tier: 2, label: 'Silver', target: 25,  reward: { xp: 250, itens: { super_potion: 5, revive: 3 } } },
      { tier: 3, label: 'Gold',   target: 100, reward: { xp: 800, itens: { hyper_potion: 8, max_revive: 5 }, cosmetic: 'border_fire' } },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // POKÉMONS COM IV PERFEITO (31 em qualquer stat)
  // ══════════════════════════════════════════════════════════

  perfect_ivs: {
    id:      'perfect_ivs',
    label:   'IV Hunter',
    desc:    'Capture Pokémon with at least one perfect IV (31)',
    icon:    '💎',
    stat:    'perfectIVCaptures',
    type:    'counter',
    tiers: [
      { tier: 1, label: 'Bronze', target: 3,  reward: { xp: 100, itens: { revive: 3 } } },
      { tier: 2, label: 'Silver', target: 10, reward: { xp: 300, itens: { max_revive: 3, ether: 5 }, cosmetic: 'border_blue' } },
      { tier: 3, label: 'Gold',   target: 25, reward: { xp: 800, itens: { max_revive: 5, max_ether: 5 }, cosmetic: 'border_rainbow' } },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // SHINY CAPTURADO
  // ══════════════════════════════════════════════════════════

  shiny_caught: {
    id:      'shiny_caught',
    label:   'Shiny Hunter',
    desc:    'Capture a Shiny Pokémon',
    icon:    '✨',
    stat:    'shinyCaught',
    type:    'counter',
    tiers: [
      { tier: 1, label: 'Bronze', target: 1, reward: { xp: 500, itens: { max_revive: 5, master_ball: 1 }, cosmetic: 'border_rainbow' } },
      { tier: 2, label: 'Gold',   target: 3, reward: { xp: 1500, itens: { master_ball: 3 }, cosmetic: 'border_gold' } },
    ],
  },
};

// ── Ordem de exibição no painel ────────────────────────────
export const ACHIEVEMENTS_ORDER = [
  'raids_won',
  'raids_participated',
  'medium_raids_won',
  'squad_raids',
  'total_captures',
  'pokedex_size',
  'trainer_level',
  'pokemon_level',
  'perfect_ivs',
  'shiny_caught',
];
