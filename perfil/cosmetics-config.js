// ============================================================
// COSMETICS CONFIG — cosmetics-config.js
// Define todas as bordas cosméticas disponíveis no sistema.
//
// Para ADICIONAR nova borda:
//   1. Adicione uma entrada no objeto COSMETICS abaixo.
//   2. Adicione a classe CSS correspondente em boss-raid-status.css
//      (procure a seção "═══ COSMETICS ═══").
//   3. A borda ficará disponível automaticamente nas conquistas.
//
// Estrutura de cada cosmético:
//   id         — chave única (usada no Firestore e nas conquistas)
//   label      — nome exibido ao jogador
//   desc       — descrição curta do efeito visual
//   cssClass   — classe CSS aplicada ao .raid-modal-content.raid-modal-status-content
//   preview    — emoji ou símbolo para o preview no painel de conquistas
//   rarity     — 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
// ============================================================

export const COSMETICS = {

  // ── Padrão (sem cosmético) ────────────────────────────────
  default: {
    id:       'default',
    label:    'Default',
    desc:     'Standard orange border.',
    cssClass: '',             // sem classe extra — usa o estilo padrão
    preview:  '🟧',
    rarity:   'common',
  },

  // ── Uncommon ──────────────────────────────────────────────
  border_silver: {
    id:       'border_silver',
    label:    'Silver Frame',
    desc:     'A clean silver metallic border.',
    cssClass: 'cosmetic-border-silver',
    preview:  '⬜',
    rarity:   'uncommon',
  },

  border_green: {
    id:       'border_green',
    label:    'Verdant Frame',
    desc:     'A fresh grass-green glowing border.',
    cssClass: 'cosmetic-border-green',
    preview:  '🟩',
    rarity:   'uncommon',
  },

  // ── Rare ──────────────────────────────────────────────────
  border_blue: {
    id:       'border_blue',
    label:    'Ocean Frame',
    desc:     'A deep pulsing blue border.',
    cssClass: 'cosmetic-border-blue',
    preview:  '🟦',
    rarity:   'rare',
  },

  border_fire: {
    id:       'border_fire',
    label:    'Flame Frame',
    desc:     'Animated fire flickering around the border.',
    cssClass: 'cosmetic-border-fire',
    preview:  '🔥',
    rarity:   'rare',
  },

  // ── Epic ──────────────────────────────────────────────────
  border_rainbow: {
    id:       'border_rainbow',
    label:    'Rainbow Frame',
    desc:     'A slowly rotating rainbow gradient border.',
    cssClass: 'cosmetic-border-rainbow',
    preview:  '🌈',
    rarity:   'epic',
  },

  border_dark: {
    id:       'border_dark',
    label:    'Shadow Frame',
    desc:     'A deep violet shadow pulsing border.',
    cssClass: 'cosmetic-border-dark',
    preview:  '🟪',
    rarity:   'epic',
  },

  // ── Legendary ─────────────────────────────────────────────
  border_gold: {
    id:       'border_gold',
    label:    'Golden Frame',
    desc:     'A blazing animated gold border for the best trainers.',
    cssClass: 'cosmetic-border-gold',
    preview:  '🏆',
    rarity:   'legendary',
  },
};

// Ordem de raridade para exibição
export const RARITY_ORDER = ['common', 'uncommon', 'rare', 'epic', 'legendary'];

export const RARITY_LABELS = {
  common:    'Common',
  uncommon:  'Uncommon',
  rare:      'Rare',
  epic:      'Epic',
  legendary: 'Legendary',
};

export const RARITY_COLORS = {
  common:    '#888',
  uncommon:  '#2ecc71',
  rare:      '#3498db',
  epic:      '#9b59b6',
  legendary: '#f39c12',
};
