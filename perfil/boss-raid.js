// ============================================================
// BOSS RAID SYSTEM - boss-raid.js
// ============================================================

// ============================================================
// BASE STATS — ocultas, apenas via código
// ⚠️  Para adicionar novos pokémons, adicione aqui.
// Fórmula Gen 3+:
//   HP    = floor((2*B + IV) * L/100 + L + 10)
//   Outros = floor(floor((2*B + IV) * L/100 + 5) * natureMod)
// B=base | IV=0–31 | L=nível | EV=0 | natureMod = 1.1 / 1.0 / 0.9
// ============================================================
const BASE_STATS = {
  // --- Grass ---
  bulbasaur:   { hp:45,  atk:49,  def:49,  spa:65, spd:65, spe:45  },
  chikorita:   { hp:45,  atk:49, def:65, spa:49,  spd:65,  spe:45  },
  treecko:    { hp:40,  atk:45,  def:35,  spa:65,  spd:55, spe:70  },
  turtwig:   { hp:55,  atk:68, def:64,  spa:45,  spd:55,  spe:31  },
  snivy:      { hp:45,  atk:45, def:55,  spa:45, spd:55, spe:63  },
  chespin:    { hp:56,  atk:61, def:65,  spa:48,  spd:45,  spe:38  },
  rowlet:   { hp:68, atk:55, def:55, spa:50,  spd:50,  spe:42  },
  grookey:   { hp:50, atk:65, def:50, spa:40,  spd:40,  spe:65  },
  sprigatito:   { hp:40, atk:61, def:54, spa:45,  spd:45,  spe:65  },
  // --- Fire ---
  charmander:  { hp:39,  atk:52,  def:43,  spa:60, spd:50,  spe:65 },
  cyndaquil:  { hp:39,  atk:52, def:43,  spa:60,  spd:50,  spe:65 },
  torchic:    { hp:45,  atk:60,  def:40,  spa:70, spd:50, spe:45 },
  chimchar: { hp:44,  atk:58,  def:44,  spa:58,  spd:44,  spe:61 },
  tepig:   { hp:65,  atk:63, def:45,  spa:45, spd:45,  spe:45  },
  fennekin:    { hp:40,  atk:45, def:40,  spa:62, spd:60,  spe:60  },
  litten:    { hp:45,  atk:65, def:40,  spa:60, spd:40,  spe:70  },
  scorbunny:    { hp:50,  atk:71, def:40,  spa:40, spd:40,  spe:69  },
  fuecoco:    { hp:67,  atk:45, def:59,  spa:63, spd:40,  spe:36  },
  // --- Bug ---
  caterpie:  { hp:45, atk:30, def:35, spa:20, spd:20, spe:45 },
  wooloo:    { hp:42, atk:40, def:55, spa:40, spd:45, spe:48 },
  weedle:    { hp:40, atk:35, def:30, spa:20, spd:20, spe:50 },
  // --- Water ---
  squirtle:  { hp:44,  atk:48,  def:65, spa:50,  spd:64, spe:43  },
  totodile:   { hp:50,  atk:65,  def:64,  spa:44, spd:48,  spe:43 },
  mudkip:    { hp:50,  atk:70,  def:50, spa:50, spd:50,  spe:40  },
  piplup:  { hp:53, atk:51,  def:53,  spa:61,  spd:56,  spe:40  },
  oshawott:     { hp:55, atk:55,  def:45,  spa:63,  spd:45,  spe:45  },
  froakie:   { hp:41,  atk:56, def:40,  spa:62,  spd:44, spe:71  },
  popplio:   { hp:50,  atk:54, def:54,  spa:66,  spd:56, spe:40  },
  sobble:   { hp:50,  atk:40, def:40,  spa:70,  spd:40, spe:70  },
  quaxly:   { hp:55,  atk:65, def:45,  spa:50,  spd:45, spe:50  },
};

// ============================================================
// NATURES — tabela completa
// up/down = stat aumentado/diminuído (+10% / -10%)
// null = neutro (Hardy, Docile, Serious, Bashful, Quirky)
// Chaves: atk, def, spa, spd, spe
// ============================================================
const NATURES = {
  Hardy:   { up: null,  down: null  },
  Lonely:  { up: 'atk', down: 'def' },
  Brave:   { up: 'atk', down: 'spe' },
  Adamant: { up: 'atk', down: 'spa' },
  Naughty: { up: 'atk', down: 'spd' },
  Bold:    { up: 'def', down: 'atk' },
  Docile:  { up: null,  down: null  },
  Relaxed: { up: 'def', down: 'spe' },
  Impish:  { up: 'def', down: 'spa' },
  Lax:     { up: 'def', down: 'spd' },
  Timid:   { up: 'spe', down: 'atk' },
  Hasty:   { up: 'spe', down: 'def' },
  Serious: { up: null,  down: null  },
  Jolly:   { up: 'spe', down: 'spa' },
  Naive:   { up: 'spe', down: 'spd' },
  Modest:  { up: 'spa', down: 'atk' },
  Mild:    { up: 'spa', down: 'def' },
  Quiet:   { up: 'spa', down: 'spe' },
  Bashful: { up: null,  down: null  },
  Rash:    { up: 'spa', down: 'spd' },
  Calm:    { up: 'spd', down: 'atk' },
  Gentle:  { up: 'spd', down: 'def' },
  Sassy:   { up: 'spd', down: 'spe' },
  Careful: { up: 'spd', down: 'spa' },
  Quirky:  { up: null,  down: null  },
};
const NATURE_KEYS = Object.keys(NATURES);

// Rótulos legíveis por chave de stat
const STAT_LABELS = { hp:'HP', atk:'Atk', def:'Def', spa:'Sp.Atk', spd:'Sp.Def', spe:'Spd' };

// ============================================================
// TIPOS DE CADA POKÉMON
// ============================================================
const POKEMON_TIPOS = {
  bulbasaur:  ['grass','poison'], chikorita:  ['grass'],    treecko:    ['grass'],
  turtwig:    ['grass'],          snivy:      ['grass'],    chespin:    ['grass'],
  rowlet:     ['grass','flying'], grookey:    ['grass'],    sprigatito: ['grass'],
  charmander: ['fire'],           cyndaquil:  ['fire'],     torchic:    ['fire'],
  chimchar:   ['fire'],           tepig:      ['fire'],     fennekin:   ['fire'],
  litten:     ['fire'],           scorbunny:  ['fire'],     fuecoco:    ['fire'],
  squirtle:   ['water'],          totodile:   ['water'],    mudkip:     ['water'],
  piplup:     ['water'],          oshawott:   ['water'],    froakie:    ['water'],
  popplio:    ['water'],          sobble:     ['water'],    quaxly:     ['water'],
  pikachu:    ['electric'],
  caterpie:   ['bug'],
  wooloo:     ['normal'],
  weedle:     ['bug','poison'],
};

// Cor de cada tipo
// ============================================================
// POKEDEX_NUM — numero nacional de cada pokemon no jogo
// Para adicionar novos pokemons, inclua aqui tambem.
// ============================================================
const POKEDEX_NUM = {
  // Grass starters
  bulbasaur:1, chikorita:152, treecko:252,
  turtwig:387, snivy:495,     chespin:650,
  rowlet:722,  grookey:810,   sprigatito:906,
  // Fire starters
  charmander:4,  cyndaquil:155, torchic:255,
  chimchar:390,  tepig:498,     fennekin:653,
  litten:725,    scorbunny:813, fuecoco:909,
  // Water starters
  squirtle:7,  totodile:158, mudkip:258,
  piplup:393,  oshawott:501, froakie:656,
  popplio:728, sobble:816,   quaxly:912,
  // Bug
  caterpie:10,
  weedle:13, kakuna:14, beedrill:15,
};

// ============================================================
// CADEIA DE EVOLUÇÃO
// ============================================================
// Estrutura de cada entrada:
//   evolvesTo  — chave do pokemon para o qual evolui
//   levelReq   — nível mínimo exigido para poder evoluir
//   loyaltyReq — lealdade exigida (sempre 255 no nosso sistema)
//
// Como funciona a ability na evolução:
//   • Pokemon com ability NORMAL → recebe a ability NORMAL da forma evoluída
//     (sorteia entre as normais da nova forma, assim como no início)
//   • Pokemon com hidden ability → recebe a hidden ability da forma evoluída
//     (hidden é permanente na linhagem — "uma vez shiny, sempre shiny")
//
// Pokémons sem entrada aqui são formas finais (não evoluem mais).
// ============================================================
const EVOLUTION_CHAIN = {
  // ── Linha Bulbasaur (Grass/Poison) ────────────────────────
  // Bulbasaur → Ivysaur (L16) → Venusaur (L32)
  bulbasaur:  { evolvesTo: 'ivysaur',    levelReq: 16, loyaltyReq: 255 },
  ivysaur:    { evolvesTo: 'venusaur',   levelReq: 32, loyaltyReq: 255 },

  // ── Linha Chikorita (Grass) ────────────────────────────────
  // Chikorita → Bayleef (L16) → Meganium (L32)
  chikorita:  { evolvesTo: 'bayleef',    levelReq: 16, loyaltyReq: 255 },
  bayleef:    { evolvesTo: 'meganium',   levelReq: 32, loyaltyReq: 255 },

  // ── Linha Treecko (Grass) ──────────────────────────────────
  // Treecko → Grovyle (L16) → Sceptile (L36)
  treecko:    { evolvesTo: 'grovyle',    levelReq: 16, loyaltyReq: 255 },
  grovyle:    { evolvesTo: 'sceptile',   levelReq: 36, loyaltyReq: 255 },

  // ── Linha Turtwig (Grass) ──────────────────────────────────
  // Turtwig → Grotle (L18) → Torterra (L32)
  turtwig:    { evolvesTo: 'grotle',     levelReq: 18, loyaltyReq: 255 },
  grotle:     { evolvesTo: 'torterra',   levelReq: 32, loyaltyReq: 255 },

  // ── Linha Snivy (Grass) ────────────────────────────────────
  // Snivy → Servine (L17) → Serperior (L36)
  snivy:      { evolvesTo: 'servine',    levelReq: 17, loyaltyReq: 255 },
  servine:    { evolvesTo: 'serperior',  levelReq: 36, loyaltyReq: 255 },

  // ── Linha Chespin (Grass) ──────────────────────────────────
  // Chespin → Quilladin (L16) → Chesnaught (L36)
  chespin:    { evolvesTo: 'quilladin',  levelReq: 16, loyaltyReq: 255 },
  quilladin:  { evolvesTo: 'chesnaught', levelReq: 36, loyaltyReq: 255 },

  // ── Linha Rowlet (Grass/Flying) ────────────────────────────
  // Rowlet → Dartrix (L17) → Decidueye (L34)
  rowlet:     { evolvesTo: 'dartrix',    levelReq: 17, loyaltyReq: 255 },
  dartrix:    { evolvesTo: 'decidueye',  levelReq: 34, loyaltyReq: 255 },

  // ── Linha Grookey (Grass) ──────────────────────────────────
  // Grookey → Thwackey (L16) → Rillaboom (L35)
  grookey:    { evolvesTo: 'thwackey',   levelReq: 16, loyaltyReq: 255 },
  thwackey:   { evolvesTo: 'rillaboom',  levelReq: 35, loyaltyReq: 255 },

  // ── Linha Sprigatito (Grass) ───────────────────────────────
  // Sprigatito → Floragato (L16) → Meowscarada (L36)
  sprigatito: { evolvesTo: 'floragato',  levelReq: 16, loyaltyReq: 255 },
  floragato:  { evolvesTo: 'meowscarada',levelReq: 36, loyaltyReq: 255 },

  // ── Linha Charmander (Fire) ────────────────────────────────
  // Charmander → Charmeleon (L16) → Charizard (L36)
  charmander: { evolvesTo: 'charmeleon', levelReq: 16, loyaltyReq: 255 },
  charmeleon: { evolvesTo: 'charizard',  levelReq: 36, loyaltyReq: 255 },

  // ── Linha Cyndaquil (Fire) ─────────────────────────────────
  // Cyndaquil → Quilava (L14) → Typhlosion (L36)
  cyndaquil:  { evolvesTo: 'quilava',    levelReq: 14, loyaltyReq: 255 },
  quilava:    { evolvesTo: 'typhlosion', levelReq: 36, loyaltyReq: 255 },

  // ── Linha Torchic (Fire/Fighting) ─────────────────────────
  // Torchic → Combusken (L16) → Blaziken (L36)
  torchic:    { evolvesTo: 'combusken',  levelReq: 16, loyaltyReq: 255 },
  combusken:  { evolvesTo: 'blaziken',   levelReq: 36, loyaltyReq: 255 },

  // ── Linha Chimchar (Fire/Fighting) ────────────────────────
  // Chimchar → Monferno (L14) → Infernape (L36)
  chimchar:   { evolvesTo: 'monferno',   levelReq: 14, loyaltyReq: 255 },
  monferno:   { evolvesTo: 'infernape',  levelReq: 36, loyaltyReq: 255 },

  // ── Linha Tepig (Fire/Fighting) ────────────────────────────
  // Tepig → Pignite (L17) → Emboar (L36)
  tepig:      { evolvesTo: 'pignite',    levelReq: 17, loyaltyReq: 255 },
  pignite:    { evolvesTo: 'emboar',     levelReq: 36, loyaltyReq: 255 },

  // ── Linha Fennekin (Fire/Psychic) ─────────────────────────
  // Fennekin → Braixen (L16) → Delphox (L36)
  fennekin:   { evolvesTo: 'braixen',    levelReq: 16, loyaltyReq: 255 },
  braixen:    { evolvesTo: 'delphox',    levelReq: 36, loyaltyReq: 255 },

  // ── Linha Litten (Fire/Dark) ───────────────────────────────
  // Litten → Torracat (L17) → Incineroar (L34)
  litten:     { evolvesTo: 'torracat',   levelReq: 17, loyaltyReq: 255 },
  torracat:   { evolvesTo: 'incineroar', levelReq: 34, loyaltyReq: 255 },

  // ── Linha Scorbunny (Fire/Fighting) ───────────────────────
  // Scorbunny → Raboot (L16) → Cinderace (L35)
  scorbunny:  { evolvesTo: 'raboot',     levelReq: 16, loyaltyReq: 255 },
  raboot:     { evolvesTo: 'cinderace',  levelReq: 35, loyaltyReq: 255 },

  // ── Linha Fuecoco (Fire/Ghost) ─────────────────────────────
  // Fuecoco → Crocalor (L16) → Skeledirge (L36)
  fuecoco:    { evolvesTo: 'crocalor',   levelReq: 16, loyaltyReq: 255 },
  crocalor:   { evolvesTo: 'skeledirge', levelReq: 36, loyaltyReq: 255 },

  // ── Linha Squirtle (Water) ─────────────────────────────────
  // Squirtle → Wartortle (L16) → Blastoise (L36)
  squirtle:   { evolvesTo: 'wartortle',  levelReq: 16, loyaltyReq: 255 },
  wartortle:  { evolvesTo: 'blastoise',  levelReq: 36, loyaltyReq: 255 },

  // ── Linha Totodile (Water) ─────────────────────────────────
  // Totodile → Croconaw (L18) → Feraligatr (L30)
  totodile:   { evolvesTo: 'croconaw',   levelReq: 18, loyaltyReq: 255 },
  croconaw:   { evolvesTo: 'feraligatr', levelReq: 30, loyaltyReq: 255 },

  // ── Linha Mudkip (Water/Ground) ───────────────────────────
  // Mudkip → Marshtomp (L16) → Swampert (L36)
  mudkip:     { evolvesTo: 'marshtomp',  levelReq: 16, loyaltyReq: 255 },
  marshtomp:  { evolvesTo: 'swampert',   levelReq: 36, loyaltyReq: 255 },

  // ── Linha Piplup (Water/Steel) ────────────────────────────
  // Piplup → Prinplup (L16) → Empoleon (L36)
  piplup:     { evolvesTo: 'prinplup',   levelReq: 16, loyaltyReq: 255 },
  prinplup:   { evolvesTo: 'empoleon',   levelReq: 36, loyaltyReq: 255 },

  // ── Linha Oshawott (Water) ─────────────────────────────────
  // Oshawott → Dewott (L17) → Samurott (L36)
  oshawott:   { evolvesTo: 'dewott',     levelReq: 17, loyaltyReq: 255 },
  dewott:     { evolvesTo: 'samurott',   levelReq: 36, loyaltyReq: 255 },

  // ── Linha Froakie (Water) ──────────────────────────────────
  // Froakie → Frogadier (L16) → Greninja (L36)
  froakie:    { evolvesTo: 'frogadier',  levelReq: 16, loyaltyReq: 255 },
  frogadier:  { evolvesTo: 'greninja',   levelReq: 36, loyaltyReq: 255 },

  // ── Linha Popplio (Water/Fairy) ────────────────────────────
  // Popplio → Brionne (L17) → Primarina (L34)
  popplio:    { evolvesTo: 'brionne',    levelReq: 17, loyaltyReq: 255 },
  brionne:    { evolvesTo: 'primarina',  levelReq: 34, loyaltyReq: 255 },

  // ── Linha Sobble (Water) ───────────────────────────────────
  // Sobble → Drizzile (L16) → Inteleon (L35)
  sobble:     { evolvesTo: 'drizzile',   levelReq: 16, loyaltyReq: 255 },
  drizzile:   { evolvesTo: 'inteleon',   levelReq: 35, loyaltyReq: 255 },

  // ── Linha Quaxly (Water/Fighting) ─────────────────────────
  // Quaxly → Quaxwell (L16) → Quaquaval (L36)
  quaxly:     { evolvesTo: 'quaxwell',   levelReq: 16, loyaltyReq: 255 },
  quaxwell:   { evolvesTo: 'quaquaval',  levelReq: 36, loyaltyReq: 255 },

  // ── Linha Caterpie (Bug) ──────────────────────────────────
  // Caterpie → Metapod (L7) → Butterfree (L10)
  caterpie:   { evolvesTo: 'metapod',    levelReq: 7,  loyaltyReq: 50  },
  wooloo:     { evolvesTo: 'dubwool',    levelReq: 24, loyaltyReq: 50  },
  metapod:    { evolvesTo: 'butterfree', levelReq: 10, loyaltyReq: 50  },

  // ── Linha Weedle (Bug/Poison) ─────────────────────────────
  // Weedle → Kakuna (L7) → Beedrill (L10)
  weedle:     { evolvesTo: 'kakuna',     levelReq: 7,  loyaltyReq: 50  },
  kakuna:     { evolvesTo: 'beedrill',   levelReq: 10, loyaltyReq: 50  },
};

// ============================================================
// ABILITIES DAS FORMAS EVOLUÍDAS
// ============================================================
// Regra: cada forma tem suas próprias abilities normais.
// A hidden ability é HERDADA via traço (vera a hidden da nova forma).
// Se a forma evoluída não tiver entrada aqui, herda a do estágio anterior.
// ============================================================
const EVOLUTION_ABILITIES = {
  // ── Linha Caterpie (Bug) ──────────────────────────────────
  // ATENÇÃO: Metapod não tem hidden ability — a flag noHidden:true indica
  // que esta forma não tem hidden, mas a linhagem hidden CONTINUA para butterfree.
  metapod:     { normal: ['shed_skin'],           hidden: null, noHidden: true  },
  butterfree:  { normal: ['compound_eyes'],       hidden: 'tinted_lens'         },
  // Weedle line
  kakuna:      { normal: ['shed_skin'],           hidden: null, noHidden: true  },  // sem hidden, linhagem continua
  beedrill:    { normal: ['swarm'],               hidden: 'sniper'              },
  // ── Linha Bulbasaur ───────────────────────────────────────
  ivysaur:     { normal: ['overgrow'],           hidden: 'chlorophyll'   },
  venusaur:    { normal: ['overgrow','thick_fat'],hidden: 'chlorophyll'   },
  // ── Linha Chikorita ───────────────────────────────────────
  bayleef:     { normal: ['overgrow'],           hidden: 'leaf_guard'    },
  meganium:    { normal: ['overgrow'],           hidden: 'leaf_guard'    },
  // ── Linha Treecko ─────────────────────────────────────────
  grovyle:     { normal: ['overgrow'],           hidden: 'unnerve'       },
  sceptile:    { normal: ['overgrow','lightning_rod'], hidden: 'unnerve'  },
  // ── Linha Turtwig ─────────────────────────────────────────
  grotle:      { normal: ['overgrow'],           hidden: 'shell_armor'   },
  torterra:    { normal: ['overgrow'],           hidden: 'shell_armor'   },
  // ── Linha Snivy ───────────────────────────────────────────
  servine:     { normal: ['overgrow'],           hidden: 'anticipation'  },
  serperior:   { normal: ['overgrow','contrary'], hidden: 'anticipation'  },
  // ── Linha Chespin ─────────────────────────────────────────
  quilladin:   { normal: ['overgrow'],           hidden: 'bulletproof'   },
  chesnaught:  { normal: ['overgrow'],           hidden: 'bulletproof'   },
  // ── Linha Rowlet ──────────────────────────────────────────
  dartrix:     { normal: ['overgrow'],           hidden: 'long_reach'    },
  decidueye:   { normal: ['overgrow'],           hidden: 'long_reach'    },
  // ── Linha Grookey ─────────────────────────────────────────
  thwackey:    { normal: ['overgrow'],           hidden: 'grassy_surge'  },
  rillaboom:   { normal: ['overgrow'],           hidden: 'grassy_surge'  },
  // ── Linha Sprigatito ──────────────────────────────────────
  floragato:   { normal: ['overgrow'],           hidden: 'protean'       },
  meowscarada: { normal: ['overgrow'],           hidden: 'protean'       },
  // ── Linha Charmander ──────────────────────────────────────
  charmeleon:  { normal: ['blaze'],              hidden: 'solar_power'   },
  charizard:   { normal: ['blaze'],              hidden: 'solar_power'   },
  // ── Linha Cyndaquil ───────────────────────────────────────
  quilava:     { normal: ['blaze'],              hidden: 'flash_fire'    },
  typhlosion:  { normal: ['blaze'],              hidden: 'flash_fire'    },
  // ── Linha Torchic ─────────────────────────────────────────
  combusken:   { normal: ['blaze'],              hidden: 'speed_boost'   },
  blaziken:    { normal: ['blaze','speed_boost'], hidden: 'speed_boost'  },
  // ── Linha Chimchar ────────────────────────────────────────
  monferno:    { normal: ['blaze'],              hidden: 'iron_fist'     },
  infernape:   { normal: ['blaze'],              hidden: 'iron_fist'     },
  // ── Linha Tepig ───────────────────────────────────────────
  pignite:     { normal: ['blaze'],              hidden: 'thick_fat'     },
  emboar:      { normal: ['blaze'],              hidden: 'thick_fat'     },
  // ── Linha Fennekin ────────────────────────────────────────
  braixen:     { normal: ['blaze'],              hidden: 'magician'      },
  delphox:     { normal: ['blaze'],              hidden: 'magician'      },
  // ── Linha Litten ──────────────────────────────────────────
  torracat:    { normal: ['blaze'],              hidden: 'intimidate'    },
  incineroar:  { normal: ['blaze','intimidate'], hidden: 'intimidate'    },
  // ── Linha Scorbunny ───────────────────────────────────────
  raboot:      { normal: ['blaze'],              hidden: 'libero'        },
  cinderace:   { normal: ['blaze'],              hidden: 'libero'        },
  // ── Linha Fuecoco ─────────────────────────────────────────
  crocalor:    { normal: ['blaze'],              hidden: 'unnerve'       },
  skeledirge:  { normal: ['blaze'],              hidden: 'unnerve'       },
  // ── Linha Squirtle ────────────────────────────────────────
  wartortle:   { normal: ['torrent'],            hidden: 'rain_dish'     },
  blastoise:   { normal: ['torrent'],            hidden: 'rain_dish'     },
  // ── Linha Totodile ────────────────────────────────────────
  croconaw:    { normal: ['torrent'],            hidden: 'sheer_force'   },
  feraligatr:  { normal: ['torrent'],            hidden: 'sheer_force'   },
  // ── Linha Mudkip ──────────────────────────────────────────
  marshtomp:   { normal: ['torrent'],            hidden: 'damp'          },
  swampert:    { normal: ['torrent'],            hidden: 'damp'          },
  // ── Linha Piplup ──────────────────────────────────────────
  prinplup:    { normal: ['torrent'],            hidden: 'defiant'       },
  empoleon:    { normal: ['torrent'],            hidden: 'defiant'       },
  // ── Linha Oshawott ────────────────────────────────────────
  dewott:      { normal: ['torrent'],            hidden: 'shell_armor'   },
  samurott:    { normal: ['torrent'],            hidden: 'shell_armor'   },
  // ── Linha Froakie ─────────────────────────────────────────
  frogadier:   { normal: ['torrent'],            hidden: 'protean'       },
  greninja:    { normal: ['torrent'],            hidden: 'protean'       },
  // ── Linha Popplio ─────────────────────────────────────────
  brionne:     { normal: ['torrent'],            hidden: 'liquid_voice'  },
  primarina:   { normal: ['torrent'],            hidden: 'liquid_voice'  },
  // ── Linha Sobble ──────────────────────────────────────────
  drizzile:    { normal: ['torrent'],            hidden: 'sniper'        },
  inteleon:    { normal: ['torrent'],            hidden: 'sniper'        },
  // ── Linha Quaxly ──────────────────────────────────────────
  quaxwell:    { normal: ['torrent'],            hidden: 'moxie'         },
  quaquaval:   { normal: ['torrent'],            hidden: 'moxie'         },
};

// ============================================================
// TIPOS DAS FORMAS EVOLUÍDAS
// ============================================================
// Necessário para exibir badges corretos após evolução.
// Evoluções que ganham tipo secundário são registradas aqui.
// ============================================================
const EVOLUTION_TIPOS = {
  // Bulbasaur line — mantém grass/poison
  ivysaur:     ['grass','poison'], venusaur:    ['grass','poison'],
  // Chikorita line
  bayleef:     ['grass'],          meganium:    ['grass'],
  // Treecko line — Sceptile ganha Dragon em Mega, mas base é grass
  grovyle:     ['grass'],          sceptile:    ['grass'],
  // Turtwig line — Torterra ganha Ground
  grotle:      ['grass'],          torterra:    ['grass','ground'],
  // Snivy line
  servine:     ['grass'],          serperior:   ['grass'],
  // Chespin line — Chesnaught ganha Fighting
  quilladin:   ['grass'],          chesnaught:  ['grass','fighting'],
  // Rowlet line — mantém grass/flying, Decidueye vira grass/ghost
  dartrix:     ['grass','flying'], decidueye:   ['grass','ghost'],
  // Grookey line
  thwackey:    ['grass'],          rillaboom:   ['grass'],
  // Sprigatito line — Meowscarada vira grass/dark
  floragato:   ['grass'],          meowscarada: ['grass','dark'],
  // Charmander line — Charizard vira fire/flying
  charmeleon:  ['fire'],           charizard:   ['fire','flying'],
  // Cyndaquil line
  quilava:     ['fire'],           typhlosion:  ['fire'],
  // Torchic line — ganha fighting
  combusken:   ['fire','fighting'],blaziken:    ['fire','fighting'],
  // Chimchar line — ganha fighting
  monferno:    ['fire','fighting'],infernape:   ['fire','fighting'],
  // Tepig line — ganha fighting
  pignite:     ['fire','fighting'],emboar:      ['fire','fighting'],
  // Fennekin line — ganha psychic
  braixen:     ['fire','psychic'], delphox:     ['fire','psychic'],
  // Litten line — ganha dark
  torracat:    ['fire'],           incineroar:  ['fire','dark'],
  // Scorbunny line — ganha fighting
  raboot:      ['fire'],           cinderace:   ['fire'],
  // Fuecoco line — ganha ghost
  crocalor:    ['fire'],           skeledirge:  ['fire','ghost'],
  // Squirtle line
  wartortle:   ['water'],          blastoise:   ['water'],
  // Totodile line
  croconaw:    ['water'],          feraligatr:  ['water'],
  // Mudkip line — ganha ground
  marshtomp:   ['water','ground'], swampert:    ['water','ground'],
  // Piplup line — ganha steel
  prinplup:    ['water'],          empoleon:    ['water','steel'],
  // Oshawott line
  dewott:      ['water'],          samurott:    ['water'],
  // Froakie line — Greninja ganha dark
  frogadier:   ['water'],          greninja:    ['water','dark'],
  // Popplio line — ganha fairy
  brionne:     ['water','fairy'],  primarina:   ['water','fairy'],
  // Sobble line
  drizzile:    ['water'],          inteleon:    ['water'],
  // Quaxly line — ganha fighting
  quaxwell:    ['water','fighting'],quaquaval:  ['water','fighting'],
  // Caterpie line — Butterfree ganha flying
  metapod:     ['bug'],
  butterfree:  ['bug','flying'],
  dubwool:     ['normal'],
  // Weedle line — mantém bug/poison até Beedrill
  kakuna:      ['bug','poison'],
  beedrill:    ['bug','poison'],
};

// ============================================================
// BASE STATS DAS FORMAS EVOLUÍDAS
// ============================================================
const BASE_STATS_EVO = {
  // Bulbasaur line
  ivysaur:     { hp:60,  atk:62,  def:63,  spa:80,  spd:80,  spe:60  },
  venusaur:    { hp:80,  atk:82,  def:83,  spa:100, spd:100, spe:80  },
  // Chikorita line
  bayleef:     { hp:60,  atk:62,  def:80,  spa:63,  spd:80,  spe:60  },
  meganium:    { hp:80,  atk:82,  def:100, spa:83,  spd:100, spe:80  },
  // Treecko line
  grovyle:     { hp:50,  atk:65,  def:45,  spa:85,  spd:65,  spe:95  },
  sceptile:    { hp:70,  atk:85,  def:65,  spa:105, spd:85,  spe:120 },
  // Turtwig line
  grotle:      { hp:75,  atk:89,  def:85,  spa:55,  spd:65,  spe:36  },
  torterra:    { hp:95,  atk:109, def:105, spa:75,  spd:85,  spe:56  },
  // Snivy line
  servine:     { hp:55,  atk:60,  def:75,  spa:60,  spd:75,  spe:83  },
  serperior:   { hp:75,  atk:75,  def:95,  spa:75,  spd:95,  spe:113 },
  // Chespin line
  quilladin:   { hp:61,  atk:78,  def:95,  spa:56,  spd:58,  spe:57  },
  chesnaught:  { hp:88,  atk:107, def:122, spa:74,  spd:75,  spe:64  },
  // Rowlet line
  dartrix:     { hp:78,  atk:75,  def:75,  spa:70,  spd:70,  spe:52  },
  decidueye:   { hp:78,  atk:107, def:75,  spa:100, spd:100, spe:70  },
  // Grookey line
  thwackey:    { hp:70,  atk:85,  def:70,  spa:55,  spd:60,  spe:80  },
  rillaboom:   { hp:100, atk:125, def:90,  spa:60,  spd:70,  spe:85  },
  // Sprigatito line
  floragato:   { hp:61,  atk:80,  def:63,  spa:60,  spd:63,  spe:83  },
  meowscarada: { hp:76,  atk:110, def:70,  spa:81,  spd:70,  spe:123 },
  // Charmander line
  charmeleon:  { hp:58,  atk:64,  def:58,  spa:80,  spd:65,  spe:80  },
  charizard:   { hp:78,  atk:84,  def:78,  spa:109, spd:85,  spe:100 },
  // Cyndaquil line
  quilava:     { hp:58,  atk:64,  def:58,  spa:80,  spd:65,  spe:80  },
  typhlosion:  { hp:78,  atk:84,  def:78,  spa:109, spd:85,  spe:100 },
  // Torchic line
  combusken:   { hp:60,  atk:85,  def:60,  spa:85,  spd:60,  spe:55  },
  blaziken:    { hp:80,  atk:120, def:70,  spa:110, spd:70,  spe:80  },
  // Chimchar line
  monferno:    { hp:64,  atk:78,  def:52,  spa:78,  spd:52,  spe:81  },
  infernape:   { hp:76,  atk:104, def:71,  spa:104, spd:71,  spe:108 },
  // Tepig line
  pignite:     { hp:90,  atk:93,  def:55,  spa:70,  spd:55,  spe:55  },
  emboar:      { hp:110, atk:123, def:65,  spa:100, spd:65,  spe:65  },
  // Fennekin line
  braixen:     { hp:59,  atk:59,  def:58,  spa:90,  spd:70,  spe:73  },
  delphox:     { hp:75,  atk:69,  def:72,  spa:114, spd:100, spe:104 },
  // Litten line
  torracat:    { hp:65,  atk:85,  def:50,  spa:80,  spd:50,  spe:90  },
  incineroar:  { hp:95,  atk:115, def:90,  spa:80,  spd:90,  spe:60  },
  // Scorbunny line
  raboot:      { hp:65,  atk:86,  def:60,  spa:55,  spd:60,  spe:94  },
  cinderace:   { hp:80,  atk:116, def:75,  spa:65,  spd:75,  spe:119 },
  // Fuecoco line
  crocalor:    { hp:81,  atk:55,  def:78,  spa:90,  spd:58,  spe:49  },
  skeledirge:  { hp:104, atk:75,  def:100, spa:110, spd:75,  spe:66  },
  // Squirtle line
  wartortle:   { hp:59,  atk:63,  def:80,  spa:65,  spd:80,  spe:58  },
  blastoise:   { hp:79,  atk:83,  def:100, spa:85,  spd:105, spe:78  },
  // Totodile line
  croconaw:    { hp:65,  atk:80,  def:80,  spa:59,  spd:63,  spe:58  },
  feraligatr:  { hp:85,  atk:105, def:100, spa:79,  spd:83,  spe:78  },
  // Mudkip line
  marshtomp:   { hp:70,  atk:85,  def:70,  spa:60,  spd:70,  spe:50  },
  swampert:    { hp:100, atk:110, def:90,  spa:85,  spd:90,  spe:60  },
  // Piplup line
  prinplup:    { hp:64,  atk:66,  def:68,  spa:81,  spd:76,  spe:50  },
  empoleon:    { hp:84,  atk:86,  def:88,  spa:111, spd:101, spe:60  },
  // Oshawott line
  dewott:      { hp:75,  atk:75,  def:60,  spa:83,  spd:60,  spe:60  },
  samurott:    { hp:95,  atk:100, def:85,  spa:108, spd:70,  spe:70  },
  // Froakie line
  frogadier:   { hp:54,  atk:63,  def:52,  spa:83,  spd:56,  spe:97  },
  greninja:    { hp:72,  atk:95,  def:67,  spa:103, spd:71,  spe:122 },
  // Popplio line
  brionne:     { hp:60,  atk:69,  def:69,  spa:91,  spd:81,  spe:50  },
  primarina:   { hp:80,  atk:74,  def:74,  spa:126, spd:116, spe:60  },
  // Sobble line
  drizzile:    { hp:65,  atk:60,  def:55,  spa:95,  spd:55,  spe:90  },
  inteleon:    { hp:70,  atk:85,  def:65,  spa:125, spd:65,  spe:120 },
  // Quaxly line
  quaxwell:    { hp:70,  atk:78,  def:60,  spa:65,  spd:60,  spe:65  },
  quaquaval:   { hp:85,  atk:120, def:80,  spa:85,  spd:75,  spe:85  },
  // Caterpie line
  metapod:     { hp:50,  atk:20,  def:55,  spa:25,  spd:25,  spe:30  },
  butterfree:  { hp:60,  atk:45,  def:50,  spa:90,  spd:80,  spe:70  },
  dubwool:     { hp:72,  atk:80,  def:100, spa:60,  spd:90,  spe:88  },
  // Weedle line
  kakuna:      { hp:45,  atk:25,  def:50,  spa:25,  spd:25,  spe:35  },
  beedrill:    { hp:65,  atk:90,  def:40,  spa:45,  spd:80,  spe:75  },
};

// ============================================================
// POKEDEX_NUM — adicionar formas evoluídas
// ============================================================
// Completando com os números das formas evoluídas
const POKEDEX_NUM_EVO = {
  ivysaur:2, venusaur:3,
  bayleef:153, meganium:154,
  grovyle:253, sceptile:254,
  grotle:388, torterra:389,
  servine:496, serperior:497,
  quilladin:651, chesnaught:652,
  dartrix:723, decidueye:724,
  thwackey:811, rillaboom:812,
  floragato:907, meowscarada:908,
  charmeleon:5, charizard:6,
  quilava:156, typhlosion:157,
  combusken:256, blaziken:257,
  monferno:391, infernape:392,
  pignite:499, emboar:500,
  braixen:654, delphox:655,
  torracat:726, incineroar:727,
  raboot:814, cinderace:815,
  crocalor:910, skeledirge:911,
  wartortle:8, blastoise:9,
  croconaw:159, feraligatr:160,
  marshtomp:259, swampert:260,
  prinplup:394, empoleon:395,
  dewott:502, samurott:503,
  frogadier:657, greninja:658,
  brionne:729, primarina:730,
  drizzile:817, inteleon:818,
  quaxwell:913, quaquaval:914,
  // Caterpie line
  metapod:11,  butterfree:12,
  wooloo:831,  dubwool:832,
};



// ============================================================
// CATCH RATE por pokémon (% com Poké Ball padrão)
// Formas base. Evoluídas geralmente são menores.
// ============================================================
const CATCH_RATE = {
  bulbasaur:45, chikorita:45, treecko:45, turtwig:45, snivy:45,
  chespin:45, rowlet:45, grookey:45, sprigatito:45,
  ivysaur:45, venusaur:45, bayleef:45, meganium:45,
  grovyle:45, sceptile:45, grotle:45, torterra:45,
  servine:45, serperior:45, quilladin:45, chesnaught:45,
  dartrix:45, decidueye:45, thwackey:45, rillaboom:45,
  floragato:45, meowscarada:45,
  charmander:45, cyndaquil:45, torchic:45, chimchar:45,
  tepig:45, fennekin:45, litten:45, scorbunny:45, fuecoco:45,
  charmeleon:45, charizard:45, quilava:45, typhlosion:45,
  combusken:45, blaziken:45, monferno:45, infernape:45,
  pignite:45, emboar:45, braixen:45, delphox:45,
  torracat:45, incineroar:45, raboot:45, cinderace:45,
  crocalor:45, skeledirge:45,
  squirtle:45, totodile:45, mudkip:45, piplup:45,
  oshawott:45, froakie:45, popplio:45, sobble:45, quaxly:45,
  wartortle:45, blastoise:45, croconaw:45, feraligatr:45,
  marshtomp:45, swampert:45, prinplup:45, empoleon:45,
  dewott:45, samurott:45, frogadier:45, greninja:45,
  brionne:45, primarina:45, drizzile:45, inteleon:45,
  quaxwell:45, quaquaval:45,
  caterpie:255, metapod:120, butterfree:45,
  wooloo:255, dubwool:127,
  weedle:255, kakuna:120, beedrill:45,
  pikachu:190,
};
const TIPO_CORES = {
  normal:'#A8A878', fire:'#F08030',   water:'#6890F0',  electric:'#F8D030',
  grass:'#78C850',  ice:'#98D8D8',    fighting:'#C03028',poison:'#A040A0',
  ground:'#E0C068', flying:'#A890F0', psychic:'#F85888', bug:'#A8B820',
  rock:'#B8A038',   ghost:'#705898',  dragon:'#7038F8',  dark:'#705848',
  steel:'#B8B8D0',  fairy:'#EE99AC',
};

// Tabela de efetividade (atacante -> defensor)
// 2 = super efetivo | 0.5 = resistência | 0 = imune | ausente = 1x
const TYPE_CHART = {
  normal:   { rock:0.5, ghost:0, steel:0.5 },
  fire:     { fire:0.5, water:0.5, grass:2, ice:2, bug:2, rock:0.5, dragon:0.5, steel:2 },
  water:    { fire:2, water:0.5, grass:0.5, ground:2, rock:2, dragon:0.5 },
  electric: { water:2, electric:0.5, grass:0.5, ground:0, flying:2, dragon:0.5 },
  grass:    { fire:0.5, water:2, grass:0.5, poison:0.5, ground:2, flying:0.5, bug:0.5, rock:2, dragon:0.5, steel:0.5 },
  ice:      { fire:0.5, water:0.5, grass:2, ice:0.5, ground:2, flying:2, dragon:2, steel:0.5 },
  fighting: { normal:2, ice:2, poison:0.5, flying:0.5, psychic:0.5, bug:0.5, rock:2, ghost:0, dark:2, steel:2, fairy:0.5 },
  poison:   { grass:2, poison:0.5, ground:0.5, rock:0.5, ghost:0.5, steel:0, fairy:2 },
  ground:   { fire:2, electric:2, grass:0.5, poison:2, flying:0, bug:0.5, rock:2, steel:2 },
  flying:   { electric:0.5, grass:2, fighting:2, bug:2, rock:0.5, steel:0.5 },
  psychic:  { fighting:2, poison:2, psychic:0.5, dark:0, steel:0.5 },
  bug:      { fire:0.5, grass:2, fighting:0.5, flying:0.5, psychic:2, ghost:0.5, dark:2, steel:0.5, fairy:0.5, poison:0.5 },
  rock:     { fire:2, ice:2, fighting:0.5, ground:0.5, flying:2, bug:2, steel:0.5 },
  ghost:    { normal:0, psychic:2, ghost:2, dark:0.5 },
  dragon:   { dragon:2, steel:0.5, fairy:0 },
  dark:     { fighting:0.5, psychic:2, ghost:2, dark:0.5, fairy:0.5 },
  steel:    { fire:0.5, water:0.5, electric:0.5, ice:2, rock:2, steel:0.5, fairy:2 },
  fairy:    { fire:0.5, fighting:2, poison:0.5, dragon:2, dark:2, steel:0.5 },
};

// Calcula efetividades combinadas para 1 ou 2 tipos
function calcularEfetividades(tipos) {
  const allTypes = Object.keys(TYPE_CHART);
  const result = {};
  allTypes.forEach(atk => {
    let mult = 1;
    tipos.forEach(def => { mult *= ((TYPE_CHART[atk] || {})[def] !== undefined ? TYPE_CHART[atk][def] : 1); });
    if (mult !== 1) result[atk] = mult;
  });
  const fraco   = Object.entries(result).filter(([,m]) => m > 1).map(([t,m]) => ({tipo:t,mult:m})).sort((a,b) => b.mult - a.mult);
  const resiste = Object.entries(result).filter(([,m]) => m > 0 && m < 1).map(([t,m]) => ({tipo:t,mult:m})).sort((a,b) => a.mult - b.mult);
  const imune   = Object.entries(result).filter(([,m]) => m === 0).map(([t]) => t);
  return { fraco, resiste, imune };
}

// Gera badges HTML de tipo
function renderTipoBadges(tipos) {
  return tipos.map(t =>
    `<span class="tipo-badge" style="background:${TIPO_CORES[t]||'#888'}">${t.toUpperCase()}</span>`
  ).join('');
}


// ============================================================
// BASE DE GOLPES (inline — sem import externo)
// category: 'physical' | 'special' | 'status'
// power: null = status move | accuracy: null = nunca erra
// ============================================================
const MOVES_DB = {
  // NORMAL
  growl:         { name:'Growl',        type:'normal',   category:'status',   power:null, accuracy:100, pp:40,  desc:'Lowers foe Atk by 1.',          eff:'debuff', stat:'atk', stages:-1 },
  defense_curl:  { name:'Defense Curl', type:'normal',   category:'status',   power:null, accuracy:null,pp:40,  desc:'Raises user Def by 1.',          eff:'buff',   stat:'def', stages:1  },
  rollout:       { name:'Rollout',      type:'rock',     category:'physical', power:30,   accuracy:90,  pp:20,  desc:'Rock roll that hits 5 turns.'    },
  round:         { name:'Round',        type:'normal',   category:'special',  power:60,   accuracy:100, pp:15,  desc:'Sing in unison for big damage.'  },
  double_kick:   { name:'Double Kick',  type:'fighting', category:'physical', power:30,   accuracy:100, pp:30,  desc:'Two kicks in rapid succession.'  },
  take_down:     { name:'Take Down',    type:'normal',   category:'physical', power:90,   accuracy:85,  pp:20,  desc:'Reckless charge with recoil.'    },
  charm:         { name:'Charm',        type:'fairy',    category:'status',   power:null, accuracy:100, pp:20,  desc:'Lowers foe Atk by 2.',          eff:'debuff', stat:'atk', stages:-2 },
  bulk_up:       { name:'Bulk Up',      type:'fighting', category:'status',   power:null, accuracy:null,pp:20,  desc:'Raises Atk and Def by 1.',       eff:'buff',   stat:'atk', stages:1  },
  double_edge:   { name:'Double-Edge',  type:'normal',   category:'physical', power:120,  accuracy:100, pp:15,  desc:'Powerful charge with recoil.'    },
  swagger:       { name:'Swagger',      type:'normal',   category:'status',   power:null, accuracy:85,  pp:15,  desc:'Confuses foe and raises its Atk.',eff:'buff',   stat:'atk', stages:2  },
  headbutt:      { name:'Headbutt',     type:'normal',   category:'physical', power:70,   accuracy:100, pp:15,  desc:'May cause flinching.'            },
  tackle:         { name:'Tackle',         type:'normal',   category:'physical', power:40,  accuracy:100, pp:35, desc:'A full-body charge.' },
  scratch:        { name:'Scratch',        type:'normal',   category:'physical', power:40,  accuracy:100, pp:35, desc:'Hard claws rake the foe.' },
  pound:          { name:'Pound',          type:'normal',   category:'physical', power:40,  accuracy:100, pp:35, desc:'Pounds with arms or tail.' },
  growl:          { name:'Growl',          type:'normal',   category:'status',   power:null, accuracy:100, pp:40, desc:"Lowers foe\'s Attack." },
  tail_whip:      { name:'Tail Whip',      type:'normal',   category:'status',   power:null, accuracy:100, pp:30, desc:"Lowers foe\'s Defense." },
  leer:           { name:'Leer',           type:'normal',   category:'status',   power:null, accuracy:100, pp:30, desc:"Lowers foe\'s Defense." },
  quick_attack:   { name:'Quick Attack',   type:'normal',   category:'physical', power:40,  accuracy:100, pp:30, desc:'Strikes first.' },
  body_slam:      { name:'Body Slam',      type:'normal',   category:'physical', power:85,  accuracy:100, pp:15, desc:'May paralyze.' },
  double_edge:    { name:'Double-Edge',    type:'normal',   category:'physical', power:120, accuracy:100, pp:15, desc:'Recoil damage.' },
  hyper_voice:    { name:'Hyper Voice',    type:'normal',   category:'special',  power:90,  accuracy:100, pp:10, desc:'Powerful sound attack.' },
  swift:          { name:'Swift',          type:'normal',   category:'special',  power:60,  accuracy:null, pp:20, desc:'Star rays never miss.' },
  wrap:           { name:'Wrap',           type:'normal',   category:'physical', power:15,  accuracy:90,  pp:20, desc:'Traps and squeezes foe.' },
  slam:           { name:'Slam',           type:'normal',   category:'physical', power:80,  accuracy:75,  pp:20, desc:'Slams with tail or vine.' },
  double_hit:     { name:'Double Hit',     type:'normal',   category:'physical', power:35,  accuracy:90,  pp:10, desc:'Strikes twice.' },
  // GRASS
  vine_whip:      { name:'Vine Whip',      type:'grass',    category:'physical', power:45,  accuracy:100, pp:25, desc:'Strikes with vines.' },
  razor_leaf:     { name:'Razor Leaf',     type:'grass',    category:'physical', power:55,  accuracy:95,  pp:25, desc:'Sharp leaves, high crit.' },
  seed_bomb:      { name:'Seed Bomb',      type:'grass',    category:'physical', power:80,  accuracy:100, pp:15, desc:'Barrage of hard seeds.' },
  leaf_blade:     { name:'Leaf Blade',     type:'grass',    category:'physical', power:90,  accuracy:100, pp:15, desc:'Sharp-edged leaf, high crit.' },
  wood_hammer:    { name:'Wood Hammer',    type:'grass',    category:'physical', power:120, accuracy:100, pp:15, desc:'Slams with tree trunk. Recoil.' },
  energy_ball:    { name:'Energy Ball',    type:'grass',    category:'special',  power:90,  accuracy:100, pp:10, desc:'Ball of energy from nature.' },
  leaf_storm:     { name:'Leaf Storm',     type:'grass',    category:'special',  power:130, accuracy:90,  pp:5,  desc:'Very strong; drops Sp.Atk.' },
  giga_drain:     { name:'Giga Drain',     type:'grass',    category:'special',  power:75,  accuracy:100, pp:10, desc:'Steals half damage as HP.' },
  bullet_seed:    { name:'Bullet Seed',    type:'grass',    category:'physical', power:25,  accuracy:100, pp:30, desc:'Fires 2-5 seeds.' },
  leech_seed:     { name:'Leech Seed',     type:'grass',    category:'status',   power:null, accuracy:90,  pp:10, desc:'Saps HP from foe each turn.' },
  synthesis:      { name:'Synthesis',      type:'grass',    category:'status',   power:null, accuracy:null, pp:5, desc:'Restores user HP.' },
  leafage:        { name:'Leafage',        type:'grass',    category:'physical', power:40,  accuracy:100, pp:40, desc:'Attacks with leaves.' },
  magical_leaf:   { name:'Magical Leaf',   type:'grass',    category:'special',  power:60,  accuracy:null, pp:20, desc:'Never misses.' },
  petal_blizzard: { name:'Petal Blizzard', type:'grass',    category:'physical', power:90,  accuracy:100, pp:15, desc:'Scatters petals violently.' },
  branch_poke:    { name:'Branch Poke',    type:'grass',    category:'physical', power:40,  accuracy:100, pp:40, desc:'Attacks with a branch.' },
  mega_drain:     { name:'Mega Drain',     type:'grass',    category:'special',  power:40,  accuracy:100, pp:15, desc:'Half damage restored as HP.' },
  leaf_tornado:   { name:'Leaf Tornado',   type:'grass',    category:'special',  power:65,  accuracy:90,  pp:10, desc:'May lower foe Accuracy.' },
  coil:           { name:'Coil',           type:'poison',   category:'status',   power:null, accuracy:null, pp:20, desc:'Raises Atk, Def, Accuracy.' },
  wring_out:      { name:'Wring Out',      type:'normal',   category:'special',  power:60,  accuracy:100, pp:5,  desc:'More power when foe has more HP.' },
  absorb:         { name:'Absorb',         type:'grass',    category:'special',  power:20,  accuracy:100, pp:25, desc:'Steals HP from foe.' },
  // FIRE
  ember:          { name:'Ember',          type:'fire',     category:'special',  power:40,  accuracy:100, pp:25, desc:'Weak fire. May burn.' },
  flame_charge:   { name:'Flame Charge',   type:'fire',     category:'physical', power:50,  accuracy:100, pp:20, desc:'Raises Speed by 1.' },
  fire_fang:      { name:'Fire Fang',      type:'fire',     category:'physical', power:65,  accuracy:95,  pp:15, desc:'Bites with fiery fangs.' },
  fire_spin:      { name:'Fire Spin',      type:'fire',     category:'special',  power:35,  accuracy:85,  pp:15, desc:'Traps foe in fire.' },
  flamethrower:   { name:'Flamethrower',   type:'fire',     category:'special',  power:90,  accuracy:100, pp:15, desc:'Fire stream. May burn.' },
  fire_blast:     { name:'Fire Blast',     type:'fire',     category:'special',  power:110, accuracy:85,  pp:5,  desc:'Intense fire. May burn.' },
  heat_wave:      { name:'Heat Wave',      type:'fire',     category:'special',  power:95,  accuracy:90,  pp:10, desc:'Exhales hot breath.' },
  overheat:       { name:'Overheat',       type:'fire',     category:'special',  power:130, accuracy:90,  pp:5,  desc:'Very strong; drops Sp.Atk.' },
  inferno:        { name:'Inferno',        type:'fire',     category:'special',  power:100, accuracy:50,  pp:5,  desc:'Definitely burns foe.' },
  flare_blitz:    { name:'Flare Blitz',    type:'fire',     category:'physical', power:120, accuracy:100, pp:15, desc:'Reckless fire charge. Recoil.' },
  flame_wheel:    { name:'Flame Wheel',    type:'fire',     category:'physical', power:60,  accuracy:100, pp:25, desc:'Rolling fire attack.' },
  pyro_ball:      { name:'Pyro Ball',      type:'fire',     category:'physical', power:120, accuracy:90,  pp:5,  desc:'Hurls a blazing ball.' },
  heat_crash:     { name:'Heat Crash',     type:'fire',     category:'physical', power:60,  accuracy:100, pp:10, desc:'Slams with heavy hot body.' },
  // WATER
  water_gun:      { name:'Water Gun',      type:'water',    category:'special',  power:40,  accuracy:100, pp:25, desc:'Squirts water.' },
  bubble:         { name:'Bubble',         type:'water',    category:'special',  power:40,  accuracy:100, pp:30, desc:'May lower Speed.' },
  bubble_beam:    { name:'Bubble Beam',    type:'water',    category:'special',  power:65,  accuracy:100, pp:20, desc:'May lower Speed.' },
  water_pulse:    { name:'Water Pulse',    type:'water',    category:'special',  power:60,  accuracy:100, pp:20, desc:'May confuse foe.' },
  surf:           { name:'Surf',           type:'water',    category:'special',  power:90,  accuracy:100, pp:15, desc:'Big wave hits all.' },
  aqua_tail:      { name:'Aqua Tail',      type:'water',    category:'physical', power:90,  accuracy:90,  pp:10, desc:'Wave-shaped tail attack.' },
  hydro_pump:     { name:'Hydro Pump',     type:'water',    category:'special',  power:110, accuracy:80,  pp:5,  desc:'High-pressure water blast.' },
  aqua_jet:       { name:'Aqua Jet',       type:'water',    category:'physical', power:40,  accuracy:100, pp:20, desc:'Water shot, strikes first.' },
  liquidation:    { name:'Liquidation',    type:'water',    category:'physical', power:85,  accuracy:100, pp:10, desc:"May lower foe's Defense." },
  snipe_shot:     { name:'Snipe Shot',     type:'water',    category:'special',  power:80,  accuracy:100, pp:15, desc:'Ignores barriers.' },
  razor_shell:    { name:'Razor Shell',    type:'water',    category:'physical', power:75,  accuracy:95,  pp:10, desc:"May lower foe's Defense." },
  brine:          { name:'Brine',          type:'water',    category:'special',  power:65,  accuracy:100, pp:10, desc:"Double power if foe HP < 50%." },
  withdraw:       { name:'Withdraw',       type:'water',    category:'status',   power:null, accuracy:null, pp:40, desc:'Raises own Defense.' },
  water_sport:    { name:'Water Sport',    type:'water',    category:'status',   power:null, accuracy:null, pp:15, desc:'Weakens Fire moves.' },
  whirlpool:      { name:'Whirlpool',      type:'water',    category:'special',  power:35,  accuracy:85,  pp:15, desc:'Traps foe in whirlpool.' },
  mud_shot:       { name:'Mud Shot',       type:'ground',   category:'special',  power:55,  accuracy:95,  pp:15, desc:'Hurls mud. Lowers Speed.' },
  tearful_look:   { name:'Tearful Look',   type:'normal',   category:'status',   power:null, accuracy:null, pp:20, desc:'Lowers foe Atk and Sp.Atk.' },
  // POISON
  poison_powder:  { name:'PoisonPowder',   type:'poison',   category:'status',   power:null, accuracy:75,  pp:35, desc:'Poisons the foe.' },
  sludge:         { name:'Sludge',         type:'poison',   category:'special',  power:65,  accuracy:100, pp:20, desc:'May poison.' },
  sludge_bomb:    { name:'Sludge Bomb',    type:'poison',   category:'special',  power:90,  accuracy:100, pp:10, desc:'May poison.' },
  smog:           { name:'Smog',           type:'poison',   category:'special',  power:30,  accuracy:70,  pp:20, desc:'May poison.' },
  // FLYING
  peck:           { name:'Peck',           type:'flying',   category:'physical', power:35,  accuracy:100, pp:35, desc:'Jabs with a beak.' },
  wing_attack:    { name:'Wing Attack',    type:'flying',   category:'physical', power:60,  accuracy:100, pp:35, desc:'Strikes with wings.' },
  aerial_ace:     { name:'Aerial Ace',     type:'flying',   category:'physical', power:60,  accuracy:null, pp:20, desc:'Never misses.' },
  brave_bird:     { name:'Brave Bird',     type:'flying',   category:'physical', power:120, accuracy:100, pp:15, desc:'Reckless dive. High recoil.' },
  air_slash:      { name:'Air Slash',      type:'flying',   category:'special',  power:75,  accuracy:95,  pp:15, desc:'May flinch.' },
  hurricane:      { name:'Hurricane',      type:'flying',   category:'special',  power:110, accuracy:70,  pp:10, desc:'May confuse.' },
  drill_peck:     { name:'Drill Peck',     type:'flying',   category:'physical', power:80,  accuracy:100, pp:20, desc:'Spinning beak attack.' },
  acrobatics:     { name:'Acrobatics',     type:'flying',   category:'physical', power:55,  accuracy:100, pp:15, desc:'Double power without item.' },
  // FIGHTING
  mach_punch:     { name:'Mach Punch',     type:'fighting', category:'physical', power:40,  accuracy:100, pp:30, desc:'Ultra-fast, strikes first.' },
  close_combat:   { name:'Close Combat',   type:'fighting', category:'physical', power:120, accuracy:100, pp:5,  desc:'Lowers Def and Sp.Def.' },
  high_jump_kick: { name:'High Jump Kick', type:'fighting', category:'physical', power:130, accuracy:90,  pp:10, desc:'Crash damage if it misses.' },
  super_power:    { name:'Superpower',     type:'fighting', category:'physical', power:120, accuracy:100, pp:5,  desc:'Lowers Atk and Def.' },
  // DARK
  bite:           { name:'Bite',           type:'dark',     category:'physical', power:60,  accuracy:100, pp:25, desc:'May flinch.' },
  crunch:         { name:'Crunch',         type:'dark',     category:'physical', power:80,  accuracy:100, pp:15, desc:'May lower Defense.' },
  night_slash:    { name:'Night Slash',    type:'dark',     category:'physical', power:70,  accuracy:100, pp:15, desc:'High crit rate.' },
  knock_off:      { name:'Knock Off',      type:'dark',     category:'physical', power:65,  accuracy:100, pp:20, desc:"Knocks off foe's item." },
  sucker_punch:   { name:'Sucker Punch',   type:'dark',     category:'physical', power:70,  accuracy:100, pp:5,  desc:'Strikes first if foe attacks.' },
  // PSYCHIC
  confusion:      { name:'Confusion',      type:'psychic',  category:'special',  power:50,  accuracy:100, pp:25, desc:'May confuse.' },
  psychic_move:   { name:'Psychic',        type:'psychic',  category:'special',  power:90,  accuracy:100, pp:10, desc:'May lower Sp.Def.' },
  psyshock:       { name:'Psyshock',       type:'psychic',  category:'special',  power:80,  accuracy:100, pp:10, desc:"Based on foe\'s Defense." },
  psybeam:        { name:'Psybeam',        type:'psychic',  category:'special',  power:65,  accuracy:100, pp:20, desc:'May confuse foe.' },
  extrasensory:   { name:'Extrasensory',   type:'psychic',  category:'special',  power:80,  accuracy:100, pp:20, desc:'May flinch foe.' },
  // ELECTRIC
  thunder_shock:  { name:'ThunderShock',   type:'electric', category:'special',  power:40,  accuracy:100, pp:30, desc:'May paralyze.' },
  thunderbolt:    { name:'Thunderbolt',    type:'electric', category:'special',  power:90,  accuracy:100, pp:15, desc:'May paralyze.' },
  // GHOST
  lick:           { name:'Lick',           type:'ghost',    category:'physical', power:30,  accuracy:100, pp:30, desc:'May paralyze.' },
  shadow_ball:    { name:'Shadow Ball',    type:'ghost',    category:'special',  power:80,  accuracy:100, pp:15, desc:'May lower Sp.Def.' },
  hex:            { name:'Hex',            type:'ghost',    category:'special',  power:65,  accuracy:100, pp:10, desc:'Double power if foe has status.' },
  // GROUND
  mud_slap:       { name:'Mud-Slap',       type:'ground',   category:'special',  power:20,  accuracy:100, pp:10, desc:'Lowers Accuracy.' },
  earthquake:     { name:'Earthquake',     type:'ground',   category:'physical', power:100, accuracy:100, pp:10, desc:'Shakes the ground.' },
  bulldoze:       { name:'Bulldoze',       type:'ground',   category:'physical', power:60,  accuracy:100, pp:20, desc:'Lowers Speed of all.' },
  stomping_tantrum:{ name:'Stomp. Tantrum',type:'ground',   category:'physical', power:75,  accuracy:100, pp:10, desc:'Stronger after a failed move.' },
  high_horsepower:{ name:'High Horsepower',type:'ground',   category:'physical', power:95,  accuracy:95,  pp:10, desc:'Stomps with full power.' },
  // ICE
  ice_beam:       { name:'Ice Beam',       type:'ice',      category:'special',  power:90,  accuracy:100, pp:10, desc:'May freeze foe.' },
  icicle_crash:   { name:'Icicle Crash',   type:'ice',      category:'physical', power:85,  accuracy:90,  pp:10, desc:'Drops icicles. May flinch.' },
  // ROCK
  rock_slide:     { name:'Rock Slide',     type:'rock',     category:'physical', power:75,  accuracy:90,  pp:10, desc:'May flinch.' },
  // STEEL
  iron_tail:      { name:'Iron Tail',      type:'steel',    category:'physical', power:100, accuracy:75,  pp:15, desc:"May lower foe's Defense." },
  flash_cannon:   { name:'Flash Cannon',   type:'steel',    category:'special',  power:80,  accuracy:100, pp:10, desc:'May lower Sp.Def.' },
  // FAIRY
  disarming_voice:{ name:'Disarming Voice',type:'fairy',    category:'special',  power:40,  accuracy:null, pp:15, desc:'Never misses.' },
  moonblast:      { name:'Moonblast',      type:'fairy',    category:'special',  power:95,  accuracy:100, pp:15, desc:'Moonlight force.' },
  dazzling_gleam: { name:'Dazzling Gleam', type:'fairy',    category:'special',  power:80,  accuracy:100, pp:10, desc:'Flash of light.' },
  baby_doll_eyes: { name:'Baby-Doll Eyes', type:'fairy',    category:'status',   power:null, accuracy:100, pp:30, desc:"Lowers foe\'s Attack. Strikes first." },
  // MISC STATUS
  sweet_scent:    { name:'Sweet Scent',    type:'normal',   category:'status',   power:null, accuracy:100, pp:20, desc:"Lowers foe's evasion." },
  smokescreen:    { name:'Smokescreen',    type:'normal',   category:'status',   power:null, accuracy:100, pp:20, desc:"Lowers foe's accuracy." },
  smoke_screen:   { name:'Smokescreen',    type:'normal',   category:'status',   power:null, accuracy:100, pp:20, desc:"Lowers foe's accuracy." },
  growth:         { name:'Growth',         type:'normal',   category:'status',   power:null, accuracy:null, pp:20, desc:'Raises Atk and Sp.Atk.' },
  focus_energy:   { name:'Focus Energy',   type:'normal',   category:'status',   power:null, accuracy:null, pp:30, desc:'Raises crit ratio.' },
  agility:        { name:'Agility',        type:'psychic',  category:'status',   power:null, accuracy:null, pp:30, desc:'Sharply raises Speed.' },
  protect:        { name:'Protect',        type:'normal',   category:'status',   power:null, accuracy:null, pp:10, desc:'Protects from attacks.' },
  screech:        { name:'Screech',        type:'normal',   category:'status',   power:null, accuracy:85,  pp:40, desc:"Sharply lowers foe's Defense." },
  taunt:          { name:'Taunt',          type:'dark',     category:'status',   power:null, accuracy:100, pp:20, desc:'Forces foe to attack.' },
  roar:           { name:'Roar',           type:'normal',   category:'status',   power:null, accuracy:null, pp:20, desc:'Ends wild battles.' },
  scary_face:     { name:'Scary Face',     type:'normal',   category:'status',   power:null, accuracy:100, pp:10, desc:"Sharply lowers foe's Speed." },
  sing:           { name:'Sing',           type:'normal',   category:'status',   power:null, accuracy:55,  pp:15, desc:'Puts foe to sleep.' },
  encore:         { name:'Encore',         type:'normal',   category:'status',   power:null, accuracy:100, pp:5,  desc:'Forces foe to repeat last move.' },
  substitute:     { name:'Substitute',     type:'normal',   category:'status',   power:null, accuracy:null, pp:10, desc:'Creates a decoy.' },
  bounce:         { name:'Bounce',         type:'flying',   category:'physical', power:85,  accuracy:85,  pp:5,  desc:'Bounces up, then hits next turn.' },
  misty_terrain:  { name:'Misty Terrain',  type:'fairy',    category:'status',   power:null, accuracy:null, pp:10, desc:'Covers field in mist.' },
  mat_block:      { name:'Mat Block',      type:'fighting', category:'status',   power:null, accuracy:null, pp:10, desc:'Blocks moves for one turn.' },
  fling:          { name:'Fling',          type:'dark',     category:'physical', power:30,  accuracy:100, pp:10, desc:'Flings held item at foe.' },
  round:          { name:'Round',          type:'normal',   category:'special',  power:60,  accuracy:100, pp:15, desc:'Power doubles if ally uses it.' },
  double_slap:    { name:'Double Slap',    type:'normal',   category:'physical', power:15,  accuracy:85,  pp:10, desc:'Slaps 2-5 times.' },
  captivate:      { name:'Captivate',      type:'normal',   category:'status',   power:null, accuracy:100, pp:20, desc:'Lowers opposite gender Sp.Atk.' },
  mist:           { name:'Mist',           type:'ice',      category:'status',   power:null, accuracy:null, pp:30, desc:'Protects stats from reduction.' },
  bide:           { name:'Bide',           type:'normal',   category:'physical', power:null, accuracy:null, pp:10, desc:'Endures, then returns double damage.' },
  rage:           { name:'Rage',           type:'normal',   category:'physical', power:20,  accuracy:100, pp:20, desc:'Raises Atk if hit while using.' },
  odor_sleuth:    { name:'Odor Sleuth',    type:'normal',   category:'status',   power:null, accuracy:null, pp:40, desc:'Negates evasion. Normal hits Ghost.' },
  defense_curl:   { name:'Defense Curl',   type:'normal',   category:'status',   power:null, accuracy:null, pp:40, desc:'Raises Defense.' },
  rollout:        { name:'Rollout',        type:'rock',     category:'physical', power:30,  accuracy:90,  pp:20, desc:'Rolls into foe; power grows each turn.' },
  fury_attack:    { name:'Fury Attack',    type:'normal',   category:'physical', power:15,  accuracy:85,  pp:20, desc:'Jabs 2-5 times.' },
  fury_swipes:    { name:'Fury Swipes',    type:'normal',   category:'physical', power:18,  accuracy:80,  pp:15, desc:'Scratches 2-5 times.' },
  foresight:      { name:'Foresight',      type:'normal',   category:'status',   power:null, accuracy:null, pp:40, desc:'Negates evasion. Normal hits Ghost.' },
  slash:          { name:'Slash',          type:'normal',   category:'physical', power:70,  accuracy:100, pp:20, desc:'High crit rate.' },
  flail:          { name:'Flail',          type:'normal',   category:'physical', power:20,  accuracy:100, pp:15, desc:'More power at lower HP.' },
  ice_fang:       { name:'Ice Fang',       type:'ice',      category:'physical', power:65,  accuracy:95,  pp:15, desc:'May freeze or flinch.' },
  chip_away:      { name:'Chip Away',      type:'normal',   category:'physical', power:70,  accuracy:100, pp:20, desc:'Ignores target stat changes.' },
  retaliate:      { name:'Retaliate',      type:'normal',   category:'physical', power:70,  accuracy:100, pp:5,  desc:'Double power if ally fainted.' },
  swords_dance:   { name:'Swords Dance',   type:'normal',   category:'status',   power:null, accuracy:null, pp:20, desc:'Sharply raises Attack.' },
  nasty_plot:     { name:'Nasty Plot',     type:'dark',     category:'status',   power:null, accuracy:null, pp:20, desc:'Sharply raises Sp.Atk.' },
  torment:        { name:'Torment',        type:'dark',     category:'status',   power:null, accuracy:100, pp:15, desc:'Prevents repeating same move.' },
  facade:         { name:'Facade',         type:'normal',   category:'physical', power:70,  accuracy:100, pp:20, desc:'Double power with status.' },
  slack_off:      { name:'Slack Off',      type:'normal',   category:'status',   power:null, accuracy:null, pp:10, desc:'Restores half max HP.' },
  assurance:      { name:'Assurance',      type:'dark',     category:'physical', power:60,  accuracy:100, pp:10, desc:'Double power if foe already hurt.' },
  head_smash:     { name:'Head Smash',     type:'rock',     category:'physical', power:150, accuracy:80,  pp:5,  desc:'Powerful but massive recoil.' },
  curse:          { name:'Curse',          type:'ghost',    category:'status',   power:null, accuracy:null, pp:10, desc:'Ghost: loses HP but raises Atk/Def.' },
  double_kick:    { name:'Double Kick',    type:'fighting', category:'physical', power:30,  accuracy:100, pp:30, desc:'Kicks twice.' },
  outrage:        { name:'Outrage',        type:'dragon',   category:'physical', power:120, accuracy:100, pp:10, desc:'Rampages 2-3 turns, then confuses.' },
  lucky_chant:    { name:'Lucky Chant',    type:'normal',   category:'status',   power:null, accuracy:null, pp:30, desc:'Prevents foe crits for 5 turns.' },
  light_screen:   { name:'Light Screen',   type:'psychic',  category:'status',   power:null, accuracy:null, pp:30, desc:'Halves Sp.Atk damage for 5 turns.' },
  will_o_wisp:    { name:'Will-O-Wisp',    type:'fire',     category:'status',   power:null, accuracy:85,  pp:15, desc:'Burns the foe.' },
  sunny_day:      { name:'Sunny Day',      type:'fire',     category:'status',   power:null, accuracy:null, pp:5,  desc:'Intensifies sunlight for 5 turns.' },
  rapid_spin:     { name:'Rapid Spin',     type:'normal',   category:'physical', power:50,  accuracy:100, pp:40, desc:'Removes traps. Raises Speed.' },
  skull_bash:     { name:'Skull Bash',     type:'normal',   category:'physical', power:130, accuracy:100, pp:10, desc:'Raises Def then attacks next turn.' },
  iron_defense:   { name:'Iron Defense',   type:'steel',    category:'status',   power:null, accuracy:null, pp:15, desc:'Sharply raises Defense.' },
  rain_dance:     { name:'Rain Dance',     type:'water',    category:'status',   power:null, accuracy:null, pp:5,  desc:'Makes it rain for 5 turns.' },
  fury_cutter:    { name:'Fury Cutter',    type:'bug',      category:'physical', power:40,  accuracy:95,  pp:20, desc:'Power doubles each successive hit.' },
  revenge:        { name:'Revenge',        type:'fighting', category:'physical', power:60,  accuracy:100, pp:10, desc:'Double power if user was hit first.' },
  smack_down:     { name:'Smack Down',     type:'rock',     category:'physical', power:50,  accuracy:100, pp:15, desc:'Grounds Flying-types.' },
  double_team:    { name:'Double Team',    type:'normal',   category:'status',   power:null, accuracy:null, pp:15, desc:'Raises evasiveness.' },
  toxic:          { name:'Toxic',          type:'poison',   category:'status',   power:null, accuracy:90,  pp:10, desc:'Badly poisons the foe.' },
  howl:           { name:'Howl',           type:'normal',   category:'status',   power:null, accuracy:null, pp:40, desc:'Raises own Attack.' },
  sand_attack:    { name:'Sand Attack',    type:'ground',   category:'status',   power:null, accuracy:100, pp:15, desc:"Lowers foe's Accuracy." },
  mirror_move:    { name:'Mirror Move',    type:'flying',   category:'status',   power:null, accuracy:null, pp:20, desc:"Mimics foe's last move." },
  detect:         { name:'Detect',         type:'fighting', category:'status',   power:null, accuracy:null, pp:5,  desc:'Protects from attacks.' },
  false_swipe:    { name:'False Swipe',    type:'normal',   category:'physical', power:40,  accuracy:100, pp:40, desc:"Leaves at least 1 HP." },
  pursuit:        { name:'Pursuit',        type:'dark',     category:'physical', power:40,  accuracy:100, pp:20, desc:'Double power vs switching foe.' },
  needle_arm:     { name:'Needle Arm',     type:'grass',    category:'physical', power:60,  accuracy:100, pp:15, desc:'May flinch.' },
  pin_missile:    { name:'Pin Missile',    type:'bug',      category:'physical', power:25,  accuracy:95,  pp:20, desc:'Fires 2-5 pins.' },
  take_down:      { name:'Take Down',      type:'normal',   category:'physical', power:90,  accuracy:85,  pp:20, desc:'Recoil damage.' },
  pain_split:     { name:'Pain Split',     type:'normal',   category:'status',   power:null, accuracy:null, pp:20, desc:'Averages HP with foe.' },
  bulk_up:        { name:'Bulk Up',        type:'fighting', category:'status',   power:null, accuracy:null, pp:20, desc:'Raises Atk and Def.' },
  astonish:       { name:'Astonish',       type:'ghost',    category:'physical', power:30,  accuracy:100, pp:15, desc:'May cause flinching.' },
  headbutt:       { name:'Headbutt',       type:'normal',   category:'physical', power:70,  accuracy:100, pp:15, desc:'May flinch.' },
  bind:           { name:'Bind',           type:'normal',   category:'physical', power:15,  accuracy:85,  pp:20, desc:'Squeezes foe for 4-5 turns.' },
  // ── Bug extras (Caterpie / Butterfree line) ───────────────
  bug_buzz:     { name:'Bug Buzz',     type:'bug',      category:'special',  power:90,  accuracy:100, pp:10, desc:'Emits a harsh buzz. May lower Sp.Def.' },
  silver_wind:  { name:'Silver Wind',  type:'bug',      category:'special',  power:60,  accuracy:100, pp:5,  desc:'May raise all user stats.' },
  quiver_dance: { name:'Quiver Dance', type:'bug',      category:'status',   power:null,accuracy:null,pp:20, desc:'Raises Sp.Atk, Sp.Def and Speed.' },
  harden:       { name:'Harden',       type:'normal',   category:'status',   power:null,accuracy:null,pp:30, desc:'Raises user\'s Defense by 1.' },
  sleep_powder: { name:'Sleep Powder', type:'grass',    category:'status',   power:null,accuracy:75,  pp:15, desc:'May put the foe to sleep.' },
  gust:         { name:'Gust',         type:'flying',   category:'special',  power:40,  accuracy:100, pp:35, desc:'Whips up a gusty wind.' },
  stun_spore:   { name:'Stun Spore',   type:'grass',    category:'status',   power:null,accuracy:75,  pp:30, desc:'May paralyze the opponent.' },
  supersonic:   { name:'Supersonic',   type:'normal',   category:'status',   power:null,accuracy:55,  pp:20, desc:'Emits ultrasonic waves to confuse.' },
  tailwind:     { name:'Tailwind',     type:'flying',   category:'status',   power:null,accuracy:null,pp:15, desc:'Doubles Speed for 4 turns.' },
  safeguard:    { name:'Safeguard',    type:'normal',   category:'status',   power:null,accuracy:null,pp:25, desc:'Protects from status for 5 turns.' },
  whirlwind:    { name:'Whirlwind',    type:'normal',   category:'status',   power:null,accuracy:null,pp:20, desc:'Blows away foe and ends battle.' },
  // ── Bug / Caterpie line ──
  // Bug/Poison moves — Weedle line
  poison_sting: {name:'Poison Sting',  type:'poison',  category:'physical',power:15,   accuracy:100, pp:35, desc:'Stings the foe. May poison.'},
  twineedle:    {name:'Twineedle',     type:'bug',     category:'physical',power:25,   accuracy:100, pp:20, desc:'Hits foe twice in a row.'},
  fury_attack:  {name:'Fury Attack',  type:'normal',  category:'physical',power:15,   accuracy:85,  pp:20, desc:'Jabs foe 2-5 times.'},
  poison_jab:   {name:'Poison Jab',   type:'poison',  category:'physical',power:80,   accuracy:100, pp:20, desc:'A hard jab that may poison.'},
  agility:      {name:'Agility',      type:'psychic', category:'status',  power:null, accuracy:null, pp:30, desc:'Relaxes the body to raise Speed sharply.', eff:'buff', stat:'spe', stages:2},
  pin_missile:  {name:'Pin Missile',  type:'bug',     category:'physical',power:25,   accuracy:95,  pp:20, desc:'Sharp pins are fired 2-5 times.'},
  x_scissor:    {name:'X-Scissor',    type:'bug',     category:'physical',power:80,   accuracy:100, pp:15, desc:'Slashes the foe with crossed scythes.'},
  string_shot:   {name:'String Shot',   type:'bug',     category:'status', power:null, accuracy:95,  pp:40,  desc:"Lowers foe's Speed.", eff:'deboss', stat:'spe', stages:-1},
  bug_bite:      {name:'Bug Bite',      type:'bug',     category:'physical',power:60,  accuracy:100, pp:20},
  harden:        {name:'Harden',        type:'normal',  category:'status', power:null, accuracy:null, pp:30,  desc:'Raises own Defense.', eff:'buff', stat:'def', stages:1},
  // ── Water extras ──
  bubble:        {name:'Bubble',        type:'water',   category:'special', power:40,  accuracy:100, pp:30},
  rapid_spin:    {name:'Rapid Spin',    type:'normal',  category:'physical',power:50,  accuracy:100, pp:40},
  skull_bash:    {name:'Skull Bash',    type:'normal',  category:'physical',power:130, accuracy:100, pp:10},
  aqua_tail:     {name:'Aqua Tail',     type:'water',   category:'physical',power:90,  accuracy:90,  pp:10},
  aqua_jet:      {name:'Aqua Jet',      type:'water',   category:'physical',power:40,  accuracy:100, pp:20},
  water_pulse:   {name:'Water Pulse',   type:'water',   category:'special', power:60,  accuracy:100, pp:20},
  rain_dance:    {name:'Rain Dance',    type:'water',   category:'status',  power:null,accuracy:null, pp:5},
  hydro_pump:    {name:'Hydro Pump',    type:'water',   category:'special', power:110, accuracy:80,  pp:5},
  // ── Fire extras ──
  ember:         {name:'Ember',         type:'fire',    category:'special', power:40,  accuracy:100, pp:25},
  flame_charge:  {name:'Flame Charge',  type:'fire',    category:'physical',power:50,  accuracy:100, pp:20},
  flamethrower:  {name:'Flamethrower',  type:'fire',    category:'special', power:90,  accuracy:100, pp:15},
  fire_blast:    {name:'Fire Blast',    type:'fire',    category:'special', power:110, accuracy:85,  pp:5},
  flare_blitz:   {name:'Flare Blitz',   type:'fire',    category:'physical',power:120, accuracy:100, pp:15},
  // ── Grass extras ──
  absorb:        {name:'Absorb',        type:'grass',   category:'special', power:20,  accuracy:100, pp:25},
  razor_leaf:    {name:'Razor Leaf',    type:'grass',   category:'physical',power:55,  accuracy:95,  pp:25},
  mega_drain:    {name:'Mega Drain',    type:'grass',   category:'special', power:40,  accuracy:100, pp:15},
  leech_seed:    {name:'Leech Seed',    type:'grass',   category:'status',  power:null,accuracy:90,  pp:10},
  synthesis:     {name:'Synthesis',     type:'grass',   category:'status',  power:null,accuracy:null, pp:5},
  giga_drain:    {name:'Giga Drain',    type:'grass',   category:'special', power:75,  accuracy:100, pp:10},
  leaf_storm:    {name:'Leaf Storm',    type:'grass',   category:'special', power:130, accuracy:90,  pp:5},
  wood_hammer:   {name:'Wood Hammer',   type:'grass',   category:'physical',power:120, accuracy:100, pp:15},

};
;

// ============================================================
// LEARNSETS por nível — [ [level, 'move_key'], ... ]
// ============================================================
const LEARNSETS = {
  bulbasaur:  [[1,'tackle'],[1,'growl'],[3,'vine_whip'],[6,'leech_seed'],[9,'poison_powder'],[12,'razor_leaf'],[15,'sweet_scent'],[18,'growth'],[21,'synthesis'],[24,'seed_bomb'],[28,'energy_ball'],[32,'sludge_bomb'],[38,'leaf_storm']],
  chikorita:  [[1,'tackle'],[1,'growl'],[6,'razor_leaf'],[9,'poison_powder'],[15,'synthesis'],[22,'giga_drain'],[38,'leaf_storm'],[44,'body_slam']],
  treecko:    [[1,'pound'],[1,'leer'],[6,'absorb'],[11,'quick_attack'],[16,'bullet_seed'],[26,'giga_drain'],[51,'leaf_blade'],[56,'leaf_storm']],
  turtwig:    [[1,'tackle'],[1,'withdraw'],[5,'absorb'],[9,'razor_leaf'],[17,'bite'],[21,'mega_drain'],[25,'leech_seed'],[29,'synthesis'],[33,'crunch'],[37,'giga_drain'],[41,'leaf_storm'],[45,'wood_hammer']],
  snivy:      [[1,'tackle'],[1,'leer'],[4,'vine_whip'],[7,'wrap'],[10,'growth'],[13,'leech_seed'],[16,'mega_drain'],[19,'leaf_tornado'],[22,'coil'],[25,'giga_drain'],[28,'wring_out'],[31,'leaf_blade'],[34,'leaf_storm']],
  chespin:    [[1,'tackle'],[1,'growl'],[5,'vine_whip'],[9,'rollout'],[13,'bite'],[17,'needle_arm'],[21,'pin_missile'],[25,'take_down'],[29,'seed_bomb'],[33,'bulk_up'],[37,'body_slam'],[41,'pain_split'],[45,'wood_hammer']],
  rowlet:     [[1,'tackle'],[1,'growl'],[5,'peck'],[8,'leafage'],[11,'astonish'],[14,'razor_leaf'],[17,'quick_attack'],[20,'wing_attack'],[23,'leaf_blade'],[28,'aerial_ace'],[34,'energy_ball'],[40,'brave_bird'],[46,'leaf_storm']],
  grookey:    [[1,'scratch'],[1,'growl'],[3,'branch_poke'],[6,'taunt'],[9,'razor_leaf'],[12,'screech'],[15,'knock_off'],[18,'slam'],[21,'seed_bomb'],[27,'wood_hammer'],[30,'acrobatics']],
  sprigatito: [[1,'scratch'],[1,'tail_whip'],[4,'leafage'],[7,'quick_attack'],[10,'magical_leaf'],[13,'aerial_ace'],[16,'razor_leaf'],[19,'seed_bomb'],[22,'slash'],[26,'leaf_blade'],[30,'energy_ball'],[36,'petal_blizzard']],
  charmander: [[1,'scratch'],[1,'growl'],[4,'ember'],[8,'smoke_screen'],[12,'dragon_breath'],[17,'fire_fang'],[20,'slash'],[24,'flamethrower'],[28,'scary_face'],[32,'fire_spin'],[38,'heat_wave'],[44,'inferno'],[50,'fire_blast']],
  cyndaquil:  [[1,'tackle'],[1,'leer'],[6,'ember'],[12,'smoke_screen'],[19,'quick_attack'],[27,'flame_wheel'],[36,'defense_curl'],[46,'flamethrower'],[57,'swift'],[70,'inferno']],
  torchic:    [[1,'scratch'],[1,'growl'],[7,'focus_energy'],[10,'ember'],[13,'peck'],[19,'sand_attack'],[22,'fire_spin'],[28,'quick_attack'],[31,'slash'],[37,'mirror_move'],[40,'flamethrower'],[46,'mach_punch']],
  chimchar:   [[1,'scratch'],[1,'leer'],[5,'ember'],[9,'taunt'],[13,'fury_swipes'],[17,'flame_wheel'],[21,'nasty_plot'],[25,'torment'],[29,'facade'],[33,'fire_spin'],[37,'slack_off'],[41,'flamethrower'],[45,'mach_punch'],[49,'flare_blitz']],
  tepig:      [[1,'tackle'],[1,'tail_whip'],[5,'ember'],[9,'odor_sleuth'],[13,'defense_curl'],[17,'flame_charge'],[21,'smog'],[25,'rollout'],[29,'take_down'],[33,'heat_crash'],[37,'assurance'],[41,'flamethrower'],[45,'head_smash'],[53,'flare_blitz']],
  fennekin:   [[1,'scratch'],[1,'tail_whip'],[5,'ember'],[11,'howl'],[15,'flame_charge'],[21,'psybeam'],[25,'fire_spin'],[31,'lucky_chant'],[35,'light_screen'],[41,'psyshock'],[45,'flamethrower'],[51,'will_o_wisp'],[55,'psychic_move'],[65,'fire_blast']],
  litten:     [[1,'scratch'],[1,'growl'],[4,'ember'],[7,'lick'],[12,'bite'],[15,'double_kick'],[20,'fire_fang'],[23,'roar'],[28,'swagger'],[31,'flamethrower'],[36,'scary_face'],[39,'crunch'],[44,'outrage'],[47,'flare_blitz']],
  scorbunny:  [[1,'tackle'],[1,'growl'],[4,'quick_attack'],[8,'ember'],[12,'headbutt'],[16,'flame_charge'],[20,'agility'],[24,'double_kick'],[28,'fire_spin'],[32,'bounce'],[36,'flamethrower'],[40,'high_jump_kick'],[44,'fire_blast'],[48,'pyro_ball']],
  fuecoco:    [[1,'tackle'],[1,'leer'],[4,'ember'],[8,'bite'],[12,'headbutt'],[16,'fire_fang'],[20,'stomping_tantrum'],[24,'hex'],[28,'crunch'],[32,'bulldoze'],[36,'shadow_ball'],[40,'flamethrower'],[44,'slack_off'],[48,'fire_blast'],[52,'overheat']],
  squirtle:   [[1,'tackle'],[1,'tail_whip'],[3,'water_gun'],[6,'withdraw'],[9,'bubble'],[12,'bite'],[15,'rapid_spin'],[18,'protect'],[21,'water_pulse'],[24,'aqua_tail'],[28,'skull_bash'],[32,'iron_defense'],[36,'rain_dance'],[40,'hydro_pump']],
  totodile:   [[1,'scratch'],[1,'leer'],[6,'water_gun'],[8,'rage'],[13,'bite'],[15,'scary_face'],[20,'ice_fang'],[23,'flail'],[30,'crunch'],[33,'chip_away'],[40,'slash'],[43,'screech'],[50,'aqua_tail'],[53,'super_power'],[60,'hydro_pump']],
  mudkip:     [[1,'tackle'],[1,'growl'],[5,'water_gun'],[10,'mud_slap'],[15,'foresight'],[20,'bide'],[25,'mud_shot'],[30,'protect'],[35,'take_down'],[40,'surf'],[45,'endeavor'],[50,'earthquake']],
  piplup:     [[1,'pound'],[1,'growl'],[5,'bubble'],[8,'water_sport'],[11,'peck'],[15,'bide'],[18,'bubble_beam'],[22,'fury_attack'],[25,'brine'],[29,'whirlpool'],[32,'mist'],[36,'drill_peck'],[39,'hydro_pump']],
  oshawott:   [[1,'tackle'],[1,'tail_whip'],[5,'water_gun'],[7,'water_sport'],[11,'focus_energy'],[13,'razor_shell'],[17,'fury_cutter'],[19,'water_pulse'],[23,'revenge'],[25,'aqua_jet'],[29,'encore'],[31,'aqua_tail'],[35,'retaliate'],[37,'swords_dance'],[41,'hydro_pump'],[43,'slash']],
  froakie:    [[1,'pound'],[1,'growl'],[5,'bubble'],[7,'quick_attack'],[10,'water_pulse'],[14,'smokescreen'],[16,'round'],[19,'fling'],[23,'smack_down'],[26,'substitute'],[28,'extrasensory'],[32,'surf'],[35,'double_team'],[38,'hydro_pump'],[42,'mat_block'],[45,'night_slash'],[48,'toxic']],
  popplio:    [[1,'pound'],[1,'growl'],[4,'water_gun'],[8,'disarming_voice'],[11,'baby_doll_eyes'],[15,'aqua_jet'],[18,'encore'],[22,'bubble_beam'],[25,'sing'],[29,'double_slap'],[32,'hyper_voice'],[36,'moonblast'],[39,'captivate'],[43,'hydro_pump'],[46,'misty_terrain']],
  sobble:     [[1,'pound'],[1,'growl'],[4,'water_gun'],[8,'bind'],[12,'water_pulse'],[16,'tearful_look'],[20,'acrobatics'],[24,'sucker_punch'],[28,'surf'],[32,'liquidation'],[36,'snipe_shot'],[40,'hydro_pump'],[44,'bounce']],
  quaxly:     [[1,'pound'],[1,'growl'],[4,'water_gun'],[8,'wing_attack'],[12,'quick_attack'],[16,'water_pulse'],[20,'aerial_ace'],[24,'aqua_jet'],[28,'acrobatics'],[32,'liquidation'],[36,'double_hit'],[40,'hydro_pump'],[44,'brave_bird']],
  // ── Bug line ─────────────────────────────────────────────
  caterpie:   [[1,'tackle'],[1,'string_shot'],[5,'bug_bite']],
  wooloo:     [[1,'tackle'],[1,'growl'],[4,'defense_curl'],[8,'rollout'],[12,'round'],[16,'double_kick'],[20,'take_down'],[24,'charm'],[28,'bulk_up'],[32,'double_edge'],[36,'swagger'],[40,'headbutt']],
  weedle:     [[1,'poison_sting'],[1,'string_shot']],
  kakuna:     [[1,'harden'],[7,'poison_sting']],
  beedrill:   [[1,'fury_attack'],[10,'twineedle'],[15,'poison_jab'],[20,'agility'],[28,'pin_missile'],[35,'x_scissor']],
  metapod:    [[1,'harden']],
  butterfree: [[1,'confusion'],[1,'sleep_powder'],[10,'gust'],[12,'stun_spore'],[14,'psybeam'],[16,'silver_wind'],[18,'supersonic'],[21,'tailwind'],[24,'safeguard'],[27,'whirlwind'],[30,'psychic_move'],[33,'bug_buzz'],[36,'quiver_dance']],
};

// Retorna os golpes disponíveis até um nível (últimos 4)
function inicializarGolpes(pokemon, nivel) {
  // Construir cadeia de formas anteriores para herdar golpes
  const encontrarAntecessor = (poke) => {
    for (const [base, data] of Object.entries(EVOLUTION_CHAIN)) {
      if (data.evolvesTo === poke) return base;
    }
    return null;
  };
  const cadeia = [pokemon];
  let ant = encontrarAntecessor(pokemon);
  while (ant) { cadeia.unshift(ant); ant = encontrarAntecessor(ant); }

  // Resetar pending move a cada chamada
  inicializarGolpes._pendingMove = null;

  let golpesAcumulados = [];
  for (const forma of cadeia) {
    const isAtual     = forma === pokemon;
    const nivelLimite = isAtual ? nivel : (EVOLUTION_CHAIN[forma]?.levelReq || 100);
    const ls          = LEARNSETS[forma] || [];

    // ── Mecânica dos 3 golpes no nível 1 ──────────────────────────
    // Pokémons com 3+ golpes no nivel 1 iniciam com 2 sorteados.
    // O 3º fica pendente e é ensinado automaticamente no nível 2.
    if (isAtual && nivel === 1) {
      const movesNivel1 = ls.filter(([lvl]) => lvl === 1).map(([,key]) => key);
      if (movesNivel1.length >= 3) {
        const shuffled   = [...movesNivel1].sort(() => Math.random() - 0.5);
        const escolhidos = shuffled.slice(0, 2);
        const pendente   = shuffled[2];
        inicializarGolpes._pendingMove = pendente;
        // Golpes acima do nível 1 que também cabem no limite atual
        const movesAcima = ls.filter(([lvl]) => lvl > 1 && lvl <= nivel).map(([,key]) => key);
        const novos = [...escolhidos, ...movesAcima].filter(k => !golpesAcumulados.includes(k));
        golpesAcumulados.push(...novos);
        continue;
      }
    }

    // ── Fluxo normal ──────────────────────────────────────────────
    const novos = ls
      .filter(([lvl]) => lvl <= nivelLimite)
      .map(([,key]) => key)
      .filter(k => !golpesAcumulados.includes(k));
    golpesAcumulados.push(...novos);
  }
  return golpesAcumulados.slice(-4);
}

// Verifica se aprende golpe num nível exato
function golpeAprendidoNoNivel(pokemon, nivel) {
  const ls = LEARNSETS[pokemon] || [];
  const entry = ls.find(([lvl]) => lvl === nivel);
  return entry ? entry[1] : null;
}


// ============================================================
// ABILITIES DOS POKÉMON
//
// Estrutura por pokémon:
//   normal: ['ability1', 'ability2']  — sorteadas com chance igual entre si
//   hidden: 'hidden_ability'           — 5% de chance
//
// Para adicionar um novo pokémon: copie um bloco existente e
// ajuste as abilities. Consulte Bulbapedia para a lista oficial.
//
// Para adicionar uma nova ability: adicione uma entrada em
// ABILITIES_DB abaixo com { name, desc }.
// ============================================================

// Base de dados de todas as abilities usadas
// ⚠️  Para adicionar novas abilities, inclua aqui.
const ABILITIES_DB = {
  // ── Comuns ──────────────────────────────────────────────
  overgrow:       { name: 'Overgrow',       desc: 'Powers up Grass-type moves when HP is below 1/3.' },
  blaze:          { name: 'Blaze',          desc: 'Powers up Fire-type moves when HP is below 1/3.' },
  torrent:        { name: 'Torrent',        desc: 'Powers up Water-type moves when HP is below 1/3.' },
  // ── Grass starters ──────────────────────────────────────
  chlorophyll:    { name: 'Chlorophyll',    desc: 'Doubles Speed in harsh sunlight.' },
  leaf_guard:     { name: 'Leaf Guard',     desc: 'Prevents status conditions in harsh sunlight.' },
  anticipation:   { name: 'Anticipation',   desc: 'Senses the foe\'s dangerous moves.' },
  pickup:         { name: 'Pickup',         desc: 'May pick up items after battle.' },
  natural_cure:   { name: 'Natural Cure',   desc: 'Status conditions heal when switching out.' },
  speed_boost:    { name: 'Speed Boost',    desc: 'Raises Speed by 1 at the end of each turn.' },
  overgrow_shell: { name: 'Shell Armor',    desc: 'Prevents the Pokémon from receiving critical hits.' },
  long_reach:     { name: 'Long Reach',     desc: 'Uses moves without making contact.' },
  grassy_surge:   { name: 'Grassy Surge',   desc: 'Turns the ground into Grassy Terrain on entry.' },
  protean:        { name: 'Protean',        desc: 'Changes type to match the move being used.' },
  // ── Fire starters ───────────────────────────────────────
  solar_power:    { name: 'Solar Power',    desc: 'Raises Sp.Atk in sunlight but loses HP each turn.' },
  intimidate:     { name: 'Intimidate',     desc: 'Lowers foe\'s Attack by 1 on entry.' },
  flash_fire:     { name: 'Flash Fire',     desc: 'Powers up Fire moves when hit by one. Grants immunity.' },
  iron_fist:      { name: 'Iron Fist',      desc: 'Powers up punching moves by 20%.' },
  mold_breaker:   { name: 'Mold Breaker',   desc: 'Ignores abilities that hinder attacks.' },
  thick_fat:      { name: 'Thick Fat',      desc: 'Halves damage from Fire and Ice moves.' },
  reckless:       { name: 'Reckless',       desc: 'Powers up recoil moves by 20%.' },
  magician:       { name: 'Magician',       desc: 'Steals the foe\'s held item when dealing damage.' },
  libero:         { name: 'Libero',         desc: 'Changes type to match the move being used.' },
  unnerve:        { name: 'Unnerve',        desc: 'Prevents the foe from eating its held Berry.' },
  // ── Wat its held Berry.' },
  // ── Water starters ──────────────────────────────────────
  rain_dish:      { name: 'Rain Dish',      desc: 'Gradually restores HP in rain.' },
  shell_armor:    { name: 'Shell Armor',    desc: 'Prevents the Pokémon from receiving critical hits.' },
  damp:           { name: 'Damp',           desc: 'Prevents moves like Selfdestruct and Explosion.' },
  swift_swim:     { name: 'Swift Swim',     desc: 'Doubles Speed in rain.' },
  sniper:         { name: 'Sniper',         desc: 'Powers up critical hits to deal triple damage.' },
  mega_launcher:  { name: 'Mega Launcher',  desc: 'Powers up pulse and aura moves by 50%.' },
  liquid_voice:   { name: 'Liquid Voice',   desc: 'Sound-based moves become Water-type.' },
  cute_charm:     { name: 'Cute Charm',     desc: 'Contact may infatuate the foe (30%).' },
  ball_fetch:     { name: 'Ball Fetch',     desc: 'Fetches a Poke Ball if the first throw fails.' },
  cotton_down:    { name: 'Cotton Down',    desc: "Lowers foe's Speed when hit." },
  fluffy:         { name: 'Fluffy',         desc: 'Halves damage from contact moves; doubles from Fire.' },
};

// Tabela de abilities por pokémon
// ⚠️  Para adicionar um novo pokémon, siga o mesmo padrão abaixo.
const POKEMON_ABILITIES = {
  // ── Grass starters ────────────────────────────────────────
  bulbasaur:   { normal: ['overgrow'],           hidden: 'chlorophyll'   },
  chikorita:   { normal: ['overgrow'],           hidden: 'leaf_guard'    },
  treecko:     { normal: ['overgrow'],           hidden: 'unnerve'       },
  turtwig:     { normal: ['overgrow'],           hidden: 'shell_armor'   },
  snivy:       { normal: ['overgrow'],           hidden: 'anticipation'  },
  chespin:     { normal: ['overgrow'],           hidden: 'bulletproof'   },
  rowlet:      { normal: ['overgrow'],           hidden: 'long_reach'    },
  grookey:     { normal: ['overgrow'],           hidden: 'grassy_surge'  },
  sprigatito:  { normal: ['overgrow'],           hidden: 'protean'       },
  // ── Fire starters ─────────────────────────────────────────
  charmander:  { normal: ['blaze'],              hidden: 'solar_power'   },
  cyndaquil:   { normal: ['blaze'],              hidden: 'flash_fire'    },
  torchic:     { normal: ['blaze'],              hidden: 'speed_boost'   },
  chimchar:    { normal: ['blaze'],              hidden: 'iron_fist'     },
  tepig:       { normal: ['blaze'],              hidden: 'thick_fat'     },
  fennekin:    { normal: ['blaze'],              hidden: 'magician'      },
  litten:      { normal: ['blaze'],              hidden: 'intimidate'    },
  scorbunny:   { normal: ['blaze'],              hidden: 'libero'        },
  fuecoco:     { normal: ['blaze'],              hidden: 'unnerve'       },
  // ── Water starters ────────────────────────────────────────
  squirtle:    { normal: ['torrent'],            hidden: 'rain_dish'     },
  totodile:    { normal: ['torrent'],            hidden: 'sheer_force'   },
  mudkip:      { normal: ['torrent'],            hidden: 'damp'          },
  piplup:      { normal: ['torrent'],            hidden: 'defiant'       },
  oshawott:    { normal: ['torrent'],            hidden: 'shell_armor'   },
  froakie:     { normal: ['torrent'],            hidden: 'protean'       },
  popplio:     { normal: ['torrent'],            hidden: 'liquid_voice'  },
  sobble:      { normal: ['torrent'],            hidden: 'sniper'        },
  quaxly:      { normal: ['torrent'],            hidden: 'moxie'         },
  // fallback
  pikachu:     { normal: ['static'],             hidden: 'lightning_rod' },
  // Bug starters
  caterpie:    { normal: ['shield_dust','run_away'], hidden: 'run_away'      },
  wooloo:      { normal: ['fluffy','run_away'],       hidden: 'bulletproof'  },
  weedle:      { normal: ['run_away'],                    hidden: 'sniper'        },
};

// Sorteia a ability do pokémon — 5% hidden, resto dividido entre as normais
function gerarAbility(pokemon) {
  // Consulta EVOLUTION_ABILITIES primeiro (formas evoluídas), depois POKEMON_ABILITIES
  const entry = EVOLUTION_ABILITIES[pokemon] || POKEMON_ABILITIES[pokemon];
  if (!entry) return 'overgrow';
  if (Math.random() < 0.0005 && entry.hidden) return entry.hidden; // 0.05% hidden ability
  const normais = entry.normal;
  return normais[Math.floor(Math.random() * normais.length)];
}

// Retorna dados da ability (fallback seguro)
function getAbilityData(key) {
  return ABILITIES_DB[key] || { name: key ? key.replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase()) : '?', desc: 'No description available.' };
}

// ============================================================
// BAG — Base de dados de itens
// Para adicionar novos itens: adicione em ITEMS_DB e em BAG_ITENS_ORDEM
// ============================================================
const ITEMS_DB = {
  pokebola:      { name:'Poke Ball',     img:'../boss/img-items/pokebola.png',      category:'ball',   usableIn:'battle', desc:'A device for catching wild Pokemon. Throw it at a weakened Pokemon during battle.' },
  great_ball:    { name:'Great Ball',    img:'../boss/img-items/great_ball.png',    category:'ball',   usableIn:'battle', desc:'A higher-performance Ball with a higher catch rate than a standard Poke Ball.' },
  ultra_ball:    { name:'Ultra Ball',    img:'../boss/img-items/ultra_ball.png',    category:'ball',   usableIn:'battle', desc:'An ultra-high-performance Ball with the highest catch rate among standard Balls.' },
  potion:        { name:'Potion',        img:'../boss/img-items/potion.png',        category:'heal',   usableIn:'both',   desc:'Restores 20 HP to one Pokemon.',           effect:{ type:'heal',       value:20   } },
  super_potion:  { name:'Super Potion',  img:'../boss/img-items/super_potion.png',  category:'heal',   usableIn:'both',   desc:'Restores 60 HP to one Pokemon.',           effect:{ type:'heal',       value:60   } },
  hyper_potion:  { name:'Hyper Potion',  img:'../boss/img-items/hyper_potion.png',  category:'heal',   usableIn:'both',   desc:'Restores 120 HP to one Pokemon.',          effect:{ type:'heal',       value:120  } },
  max_potion:    { name:'Max Potion',    img:'../boss/img-items/max_potion.png',    category:'heal',   usableIn:'both',   desc:'Fully restores the HP of one Pokemon.',    effect:{ type:'heal',       value:9999 } },
  revive:        { name:'Revive',        img:'../boss/img-items/revive.png',        category:'revive', usableIn:'both',   desc:'Revives a fainted Pokemon, restoring half of its max HP.', effect:{ type:'revive', value:0.5 } },
  max_revive:    { name:'Max Revive',    img:'../boss/img-items/max_revive.png',    category:'revive', usableIn:'both',   desc:'Revives a fainted Pokemon, fully restoring its HP.',       effect:{ type:'revive', value:1.0 } },
  full_restore:  { name:'Full Restore',  img:'../boss/img-items/full_restore.png',  category:'heal',   usableIn:'both',   desc:'Fully restores HP and heals all status conditions.',       effect:{ type:'fullrestore' } },
  ether:         { name:'Ether',         img:'../boss/img-items/ether.png',         category:'pp',     usableIn:'both',   desc:'Restores 20 PP of a chosen move. Select a Pokemon, then choose the move.',  effect:{ type:'restorepp', value:20 } },
};
const BAG_ITENS_ORDEM   = ['pokebola','great_ball','ultra_ball','potion','super_potion','hyper_potion','max_potion','revive','max_revive','full_restore','ether'];
// ──────────────────────────────────────────────────────────────
// BAG INICIAL — itens que todo novo jogador recebe ao começar
// Para editar: altere as quantidades abaixo ou adicione novas chaves.
// Chaves válidas: pokebola, great_ball, ultra_ball, potion, super_potion,
//                hyper_potion, max_potion, revive, max_revive, full_restore, ether
// ──────────────────────────────────────────────────────────────
const BAG_ITENS_INICIAIS = {
  pokebola:  5,   // Poké Balls
  potion:    5,   // Potions (+20 HP)
  revive:    1,   // Revives (metade do HP)
  ether:     1,   // Ether (restaura 20 PP)
};

async function salvarBag(bag) {
  const { doc, updateDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
  await updateDoc(doc(_db, 'usuarios', _userId), { raidBag: JSON.parse(JSON.stringify(bag)) });
  if (_userData) _userData.raidBag = bag;
}

async function usarItemNoPokemon(itemKey, slotIdx) {
  const bag   = Object.assign({}, _userData.raidBag || {});
  const team  = _userData.raidTeam || [];
  const slot  = team[slotIdx];
  const item  = ITEMS_DB[itemKey];
  if (!item || !slot || (bag[itemKey] || 0) < 1) return;

  const stats   = calcularStats(slot.pokemon, slot.ivs||{}, slot.nivel||1, slot.nature||'Hardy', slot.evs||{});
  const hpMax   = stats.hp;
  const hpAtual = typeof slot.hpAtual === 'number' ? slot.hpAtual : hpMax;
  const fainted = hpAtual <= 0;
  let novoHP = hpAtual, ok = false;

  const ef = item.effect;
  if (ef?.type === 'heal'        && !fainted && hpAtual < hpMax) { novoHP = Math.min(hpMax, hpAtual + ef.value); ok = true; }
  if (ef?.type === 'revive'      && fainted)                     { novoHP = Math.max(1, Math.floor(hpMax * ef.value)); ok = true; }
  if (ef?.type === 'fullrestore' && (hpAtual < hpMax || fainted)){ novoHP = hpMax; ok = true; }

  // Ether: +20 PP em UM golpe escolhido — seleção de golpe fica em abrirUsarItem/abrirEtherMoveSelect
  // Esta função é chamada DEPOIS que o usuário escolheu pokemon E golpe
  // moveAlvo é passado via argumento extra quando chamado pelo seletor de golpe
  if (ef?.type === 'restorepp') {
    // Se moveAlvo não foi passado, redirecionar para seletor de golpe
    if (!arguments[2]) {
      abrirEtherMoveSelect(itemKey, slotIdx);
      return;
    }
    const moveAlvo = arguments[2]; // chave do golpe a restaurar
    const move = MOVES_DB[moveAlvo];
    if (!move) return;
    const ppMax = move.pp || 10;
    const ppAntes = slot.ppAtual?.[moveAlvo] !== undefined ? slot.ppAtual[moveAlvo] : ppMax;
    if (ppAntes >= ppMax) { mostrarToastSimples('❌ PP already full for ' + move.name + '!'); return; }
    const ppDepois = Math.min(ppMax, ppAntes + (item.effect?.value || 20));
    const novoPP = { ...(slot.ppAtual || {}), [moveAlvo]: ppDepois };
    bag[itemKey] = (bag[itemKey] || 0) - 1;
    if (bag[itemKey] <= 0) delete bag[itemKey];
    const novoTeamPP = team.map((s, i) => i === slotIdx ? { ...s, ppAtual: novoPP } : s);
    try {
      const { doc, updateDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
      await updateDoc(doc(_db, 'usuarios', _userId), {
        raidBag:  JSON.parse(JSON.stringify(bag)),
        raidTeam: JSON.parse(JSON.stringify(novoTeamPP)),
      });
      _userData.raidBag  = bag;
      _userData.raidTeam = novoTeamPP;
      renderizarBossRaid();
      mostrarToastSimples('✨ Ether used! +' + (item.effect?.value||20) + ' PP restored to ' + move.name + ' for ' + capitalizar(slot.pokemon) + '!');
    } catch(e) { console.error('[BossRaid] Ether error:', e); }
    return;
  }

  if (!ok) { mostrarToastSimples('❌ Cannot use on ' + capitalizar(slot.pokemon) + ' right now.'); return; }

  bag[itemKey] = (bag[itemKey] || 0) - 1;
  if (bag[itemKey] <= 0) delete bag[itemKey];

  const novoTeam = team.map((s, i) => i === slotIdx ? Object.assign({}, s, { hpAtual: novoHP }) : s);
  try {
    const { doc, updateDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
    await updateDoc(doc(_db, 'usuarios', _userId), {
      raidBag:  JSON.parse(JSON.stringify(bag)),
      raidTeam: JSON.parse(JSON.stringify(novoTeam)),
    });
    _userData.raidBag  = bag;
    _userData.raidTeam = novoTeam;
    renderizarBossRaid();
    const isRevive = item.effect?.type === 'revive';
    const emoji = isRevive ? '💊' : '🧪';
    mostrarToastSimples(emoji + ' ' + item.name + ' used on ' + capitalizar(slot.pokemon) + '! ' + novoHP + '/' + hpMax + ' HP');
  } catch(e) { console.error('[BossRaid] Erro ao usar item:', e); }
}

// ============================================================
// XP (Medium Fast: L³)
// ============================================================
function xpParaNivel(nivel) {
  return Math.pow(nivel, 3);
}

// ============================================================
// CONFIGURAÇÃO DOS GRUPOS DE POKÉBOLAS
// ============================================================
const RAID_GRUPOS = {
  pokebola1: {
    nome: 'Grass Type', cor: '#4CAF50', icone: '🌿',
    pokemons: ['bulbasaur','chikorita','treecko','turtwig','snivy','chespin','rowlet', 'grookey', 'sprigatito']
  },
  pokebola2: {
    nome: 'Fire Type', cor: '#FF5722', icone: '🔥',
    pokemons: ['charmander','cyndaquil','torchic','chimchar','tepig','fennekin', 'litten', 'scorbunny', 'fuecoco']
  },
  pokebola3: {
    nome: 'Water Type', cor: '#2196F3', icone: '💧',
    pokemons: ['squirtle','totodile','mudkip','piplup','oshawott','froakie', 'popplio', 'sobble', 'quaxly']
  }
};

// ============================================================
// ESTADO LOCAL
// ============================================================
let _db        = null;
let _userId    = null;
let _userData  = null;
let _sorteados = {};

// ============================================================
// FÓRMULAS DE STATS Gen 3+
// ============================================================
function calcularHP(base, iv, ev, nivel) {
  return Math.floor((2 * base + iv + Math.floor((ev||0) / 4)) * nivel / 100 + nivel + 10);
}

function calcularStat(base, iv, ev, nivel, natureMod = 1.0) {
  return Math.floor(Math.floor((2 * base + iv + Math.floor((ev||0) / 4)) * nivel / 100 + 5) * natureMod);
}

// Retorna todos os 6 stats finais considerando nature + EVs
function calcularStats(pokemon, ivs, nivel, nature, evs) {
  // Busca base stats: primeiro nas formas evoluídas, depois nas base, fallback pikachu
  const bs  = BASE_STATS_EVO[pokemon] || BASE_STATS[pokemon] || BASE_STATS['pikachu'];
  const nat = NATURES[nature]     || { up: null, down: null };
  const ev  = evs || { hp:0, atk:0, def:0, spa:0, spd:0, spe:0 };

  function mod(key) {
    if (nat.up   === key) return 1.1;
    if (nat.down === key) return 0.9;
    return 1.0;
  }

  return {
    hp:  calcularHP(bs.hp,   ivs.hp,  ev.hp,  nivel),
    atk: calcularStat(bs.atk, ivs.atk, ev.atk, nivel, mod('atk')),
    def: calcularStat(bs.def, ivs.def, ev.def, nivel, mod('def')),
    spa: calcularStat(bs.spa, ivs.spa, ev.spa, nivel, mod('spa')),
    spd: calcularStat(bs.spd, ivs.spd, ev.spd, nivel, mod('spd')),
    spe: calcularStat(bs.spe, ivs.spe, ev.spe, nivel, mod('spe')),
  };
}

// ============================================================
// GERAÇÃO DE IVs E NATURE ALEATÓRIOS
// ============================================================
function gerarIVsAleatorios() {
  return {
    hp:  Math.floor(Math.random() * 32),
    atk: Math.floor(Math.random() * 32),
    def: Math.floor(Math.random() * 32),
    spa: Math.floor(Math.random() * 32),
    spd: Math.floor(Math.random() * 32),
    spe: Math.floor(Math.random() * 32),
  };
}

function gerarNatureAleatoria() {
  return NATURE_KEYS[Math.floor(Math.random() * NATURE_KEYS.length)];
}

// ============================================================
// INICIALIZAÇÃO
// ============================================================
// ============================================================
// MISSÕES DIÁRIAS — Sistema de lealdade via atividades do site
// ============================================================
//
// Como adicionar novas missões:
//   1. Adicione uma chave em MISSOES_CONFIG abaixo
//   2. No módulo do site que detecta a ação, chame:
//      window.missaoDiariaCompleta('chave_da_missao')
//   3. O sistema verifica automaticamente se já foi feita hoje
//      e credita lealdade ao time do jogador
// ============================================================
// ============================================================
// MISSOES DIARIAS CONFIG
// Para adicionar nova missao:
//   1. Adicione entrada aqui
//   2. O botao Start aparece automaticamente no modal de stats
//   3. Tipo 'manual': usuario clica Done! no widget
//      Tipo 'auto':   completada via window.missaoDiariaCompleta(key)
// ============================================================
// ============================================================
// MISSOES DIARIAS - 2 ativas por dia
// Rotação automática: edite MISSOES_POOL_ROTACAO para trocar o conjunto de missões.
// Tipo 'manual'  = usuario clica Done! no widget
// Tipo 'cross'   = completada em outra pagina via localStorage
// Tipo 'auto'    = completada via window.missaoDiariaCompleta()
// ============================================================
const MISSOES_CONFIG = {
  missao_teste: {
    label:     'Daily Login Bonus',
    lealdade:  5,
    descricao: 'Claim your daily loyalty bonus. Press Done! to collect.',
    tipo:      'manual',
    icone:     '[+]',
    itens:     { potion: 1, revive: 1, ether: 1 },  // recompensa diária
  },
  avaliar_build: {
    label:     'Evaluate a player build',
    lealdade:  5,
    descricao: 'Rate a build on another player profile.',
    tipo:      'cross',
    icone:     '[*]',
    instrucao: "Go to another player's profile and click any star on their builds.",
    itens:     { potion: 1, revive: 1, ether: 1 },
  },
  criar_build: {
    label:     'Create and save a build',
    lealdade:  5,
    descricao: 'Create a new Pokemon UNITE build.',
    tipo:      'cross',
    icone:     '[B]',
    instrucao: 'Open the Build Calculator, create a build and save it.',
  },
  completar_raid: {
    label:     'Complete a Boss Raid',
    lealdade:  30,
    descricao: 'Win a Boss Raid battle.',
    tipo:      'auto',
    icone:     '[R]',
  },
  // ── Missões de navegação (cross-page) ──────────────────────
  voltar_home: {
    label:     'Visit the About page',
    lealdade:  5,
    descricao: 'Go to the About page and click "Back to Home".',
    tipo:      'cross',
    icone:     '[H]',
    instrucao: 'Open the About page and click the "Back to Home" button.',
    itens:     { potion: 1, revive: 1, ether: 1 },
  },
  contato_form: {
    label:     'Contact us',
    lealdade:  5,
    descricao: 'Go to Contact page and click "Go to Form".',
    tipo:      'cross',
    icone:     '[C]',
    instrucao: 'Open the Contact page and click the "Go to Form" button.',
    itens:     { potion: 1, revive: 1, ether: 1 },
  },
  tapete_aventura: {
    label:     'Start an Adventure',
    lealdade:  5,
    descricao: 'Play the Magic Carpet game and click "Começar Aventura".',
    tipo:      'cross',
    icone:     '[T]',
    instrucao: 'Go to the Magic Carpet game and click "Começar Aventura".',
    itens:     { potion: 1, revive: 1, ether: 1 },
  },
  recent_builds: {
    label:     'Browse Recent Builds',
    lealdade:  5,
    descricao: 'On the Home page, click the "Recent Builds" button.',
    tipo:      'cross',
    icone:     '[R]',
    instrucao: 'Go to the Home page and click the "Recent Builds" button.',
    itens:     { potion: 1, revive: 1, ether: 1 },
  },
  copiar_link: {
    label:     'Share your profile',
    lealdade:  5,
    descricao: 'On your profile page, click "Copy Link".',
    tipo:      'cross',
    icone:     '[P]',
    instrucao: 'Go to your profile page and click the "Copy Link" button.',
    itens:     { potion: 1, revive: 1, ether: 1 },
  },
};

// As 2 missoes exibidas hoje — editar para trocar o par diario
// Pool de missões que rotacionam diariamente na segunda posição
// missao_teste é sempre fixa na primeira posição (login bonus)
const MISSOES_POOL_ROTACAO = [
  'avaliar_build',
  'voltar_home',
  'contato_form',
  'tapete_aventura',
  'recent_builds',
  'copiar_link',
];
// Missão por slot: cada slot recebe uma missão diferente mas determinística (dia+slot)
// Slot 1 no dia 66 → índice (66+1) % 6 = 1 (voltar_home)
// Slot 2 no dia 66 → índice (66+2) % 6 = 2 (contato_form) ... etc.
function getMissaoDoSlot(slotNum) {
  const hoje   = new Date();
  const inicio = new Date(hoje.getFullYear(), 0, 0);
  const diaDoAno = Math.floor((hoje - inicio) / 86400000);
  const idx = (diaDoAno + (slotNum || 1)) % MISSOES_POOL_ROTACAO.length;
  return MISSOES_POOL_ROTACAO[idx];
}
// MISSOES_ATIVAS ainda existe para compatibilidade (usa slot 1 como base)
const MISSOES_ATIVAS = ['missao_teste', getMissaoDoSlot(1)];

// ── Data de hoje como chave ──────────────────────────────────────────
function hojeKey() {
  return new Date().toISOString().slice(0, 10);
}

// ── Verifica se missao foi feita hoje ─────────────────────────────
// missaoFeitaHoje agora é por slot: cada pokemon tem tracking independente
// Chave: "missaoKey_slotN" — ex: "avaliar_build_slot2"
function missaoFeitaHoje(missaoKey, slotTarget) {
  const slot = slotTarget || getQuestAtiva()?.slotTarget || 1;
  const key = missaoKey + '_slot' + slot;
  return (_userData?.missoesDiarias || {})[key] === hojeKey();
}

// ── Credita lealdade e marca missao como feita ───────────────────
// missaoKey  - chave em MISSOES_CONFIG
// slotTarget - numero do slot (slot.slot) que recebe lealdade
async function completarMissaoDiaria(missaoKey, slotTarget) {
  if (!_userId || !_userData) return;

  if (missaoFeitaHoje(missaoKey, slotTarget)) {
    mostrarToast('Already done today!', (_userData?.raidTeam?.[0]?.pokemon || ''), false);
    return;
  }

  const config = MISSOES_CONFIG[missaoKey];
  if (!config) return;

  const team     = _userData.raidTeam || [];
  const alvoSlot = slotTarget || 1;

  // Credita lealdade ao pokemon-alvo
  const novoTeam = team.map(s => {
    if (s.slot !== alvoSlot) return s;
    return { ...s, lealdade: Math.min(255, (s.lealdade || 0) + config.lealdade) };
  });

  const missoesDiarias = Object.assign({}, _userData.missoesDiarias || {});
  // Chave per-slot: permite que a mesma missão seja feita em pokémons diferentes no mesmo dia
  const missaoDiariaKey = missaoKey + '_slot' + alvoSlot;
  missoesDiarias[missaoDiariaKey] = hojeKey();

  // Creditar itens se a missão tiver recompensa de itens
  const novaBag = Object.assign({}, _userData.raidBag || {});
  const itensConfig = config.itens || {};
  Object.entries(itensConfig).forEach(([itemKey, qty]) => {
    novaBag[itemKey] = (novaBag[itemKey] || 0) + qty;
  });
  const temItens = Object.keys(itensConfig).length > 0;

  try {
    const { doc, updateDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
    const updatePayload = {
      raidTeam:       JSON.parse(JSON.stringify(novoTeam)),
      missoesDiarias: missoesDiarias,
    };
    if (temItens) updatePayload.raidBag = JSON.parse(JSON.stringify(novaBag));
    await updateDoc(doc(_db, 'usuarios', _userId), updatePayload);
    _userData.raidTeam       = novoTeam;
    _userData.missoesDiarias = missoesDiarias;
    if (temItens) _userData.raidBag = novaBag;

    console.log('[BossRaid] Missao completa:', missaoKey, '+' + config.lealdade + ' loyalty -> slot', alvoSlot);

    // Atualizar widget para estado "feita"
    renderQuestWidget();

    // Toast de confirmacao
    const alvo = novoTeam.find(s => s.slot === alvoSlot);
    let toastSub = config.label;
    if (temItens) {
      const itensStr = Object.entries(itensConfig).map(([k,v]) => `+${v} ${capitalizar(k)}`).join(', ');
      toastSub = config.label + ' · ' + itensStr;
    }
    mostrarToast('+' + config.lealdade + ' Loyalty to ' + capitalizar(alvo?.pokemon || ''), toastSub, true);

    // Badge de evolucao se elegivel
    novoTeam.forEach(s => { if (podeEvoluir(s)) sugerirEvolucao(s); });

    // Re-render da tela de raid
    renderizarBossRaid();

  } catch(err) {
    console.error('[BossRaid] Erro ao completar missao:', err);
  }
}

// ── Toast simples ───────────────────────────────────────────────────
function mostrarToast(titulo, subtitulo, sucesso) {
  const t = document.createElement('div');
  t.className = 'raid-missao-toast' + (sucesso ? '' : ' toast-info');
  t.innerHTML = (
    '<span class="toast-icone">' + (sucesso ? '✔️' : 'ℹ️') + '</span>'
    + '<div class="toast-corpo">'
    + '<b class="toast-titulo">' + titulo + '</b>'
    + (subtitulo ? '<span class="toast-sub">' + subtitulo + '</span>' : '')
    + '</div>'
  );
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('show'), 50);
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 3500);
}

// Toast simples — uma linha, sem subtítulo, para feedback de item usado
function mostrarToastSimples(msg, tipo) {
  const t = document.createElement('div');
  t.className = 'raid-missao-toast toast-simples' + (tipo === 'ok' ? ' toast-ok' : tipo === 'erro' ? ' toast-erro' : ' toast-info');
  t.innerHTML = '<b class="toast-titulo">' + msg + '</b>';
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('show'), 30);
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 2800);
}

// ============================================================
// QUEST WIDGET — fixo na tela, persiste via localStorage
// ============================================================
// O widget fica fixo no canto da tela mesmo ao trocar de pagina.
// Estado salvo em localStorage com a chave abaixo.
const QUEST_STORAGE_KEY = 'bossraid_quest_ativa';

function getQuestAtiva() {
  try { return JSON.parse(localStorage.getItem(QUEST_STORAGE_KEY) || 'null'); }
  catch(e) { return null; }
}

function setQuestAtiva(data) {
  try { localStorage.setItem(QUEST_STORAGE_KEY, JSON.stringify(data)); }
  catch(e) {}
}

function clearQuestAtiva() {
  try { localStorage.removeItem(QUEST_STORAGE_KEY); }
  catch(e) {}
}

// ── Inicia a quest e exibe o widget ───────────────────────────────
function iniciarQuest(missaoKey, slotTarget) {
  const config = MISSOES_CONFIG[missaoKey];
  if (!config) return;

  if (missaoFeitaHoje(missaoKey, slotTarget)) {
    mostrarToast('Already completed today for this Pokémon!', config.label, false);
    return;
  }

  setQuestAtiva({
    missaoKey,
    slotTarget: slotTarget || 1,
    label:      config.label,
    lealdade:   config.lealdade,
    tipo:       config.tipo,
    instrucao:  config.instrucao || config.descricao,
  });

  renderQuestWidget();
  // Fechar modal de status
  document.getElementById('raidModalStatus')?.classList.remove('show');
}

// ── Remove widget e limpa estado ───────────────────────────────────
function fecharQuestWidget() {
  clearQuestAtiva();
  document.getElementById('raidQuestWidget')?.remove();
}

// ── Renderiza (ou atualiza) o widget fixo ─────────────────────────
// Chamado ao iniciar, ao completar, e ao restaurar a pagina
function renderQuestWidget() {
  document.getElementById('raidQuestWidget')?.remove();

  const quest = getQuestAtiva();
  if (!quest) return;

  const jaFeita = missaoFeitaHoje(quest.missaoKey, quest.slotTarget);

  // Nome do pokemon que receberá a lealdade
  const team   = _userData?.raidTeam || [];
  const alvo   = team.find(s => s.slot === quest.slotTarget) || team[0];
  const nomePoke = alvo ? capitalizar(alvo.pokemon) : 'your Pokemon';

  const w = document.createElement('div');
  w.id        = 'raidQuestWidget';
  w.className = 'raid-quest-widget' + (jaFeita ? ' quest-concluida' : '');

  // Montar conteudo sem emojis para evitar encoding
  w.innerHTML = (
    '<div class="qw-header">'
    + '<span class="qw-title">Daily Quest</span>'
    + '<button class="qw-close" id="qwClose">x</button>'
    + '</div>'
    + '<div class="qw-corpo">'
    + '<p class="qw-label">' + quest.label + '</p>'
    + (quest.instrucao && !jaFeita
        ? '<p class="qw-instrucao">' + quest.instrucao + '</p>'
        : '')
    + '<div class="qw-recompensa">'
    + '<span class="qw-poke">' + nomePoke + '</span>'
    + '<span class="qw-pts">+' + quest.lealdade + ' Loyalty</span>'
    + '</div>'
    + '</div>'
    + (jaFeita
        ? '<div class="qw-check">Completed! Go to stats to dismiss.</div>'
        : (quest.tipo === 'manual'
            ? '<button class="qw-done-btn" id="qwDone">Done!</button>'
            : '<div class="qw-pendente">Complete the action above...</div>'
          )
      )
    + (jaFeita
        ? '<button class="qw-dismiss-btn" id="qwDismiss">Dismiss</button>'
        : '')
  );

  document.body.appendChild(w);

  // Listeners
  document.getElementById('qwClose')?.addEventListener('click', fecharQuestWidget);
  document.getElementById('qwDismiss')?.addEventListener('click', fecharQuestWidget);
  document.getElementById('qwDone')?.addEventListener('click', async () => {
    const btn = document.getElementById('qwDone');
    if (btn) { btn.disabled = true; btn.textContent = 'Saving...'; }
    await completarMissaoDiaria(quest.missaoKey, quest.slotTarget);
  });
}

// ── Restaurar widget ao inicializar (caso havia quest ativa) ───
function inicializarQuestWidget() {
  const quest = getQuestAtiva();
  if (!quest || !MISSOES_CONFIG[quest.missaoKey]) { clearQuestAtiva(); return; }
  renderQuestWidget();
}

// Expor globalmente para outros modulos (perfil-view, build-rating, etc.)
window.missaoDiariaCompleta = completarMissaoDiaria;
window.iniciarQuestRaid     = iniciarQuest;
// Expor quest ativa para scripts cross-page (ex: sobre.html, contato.html)
// Uso: window.completarMissaoCrossPage('missaoKey') — lê slotTarget do localStorage
window.completarMissaoCrossPage = function(missaoKey) {
  try {
    const pendRaw = localStorage.getItem('bossraid_quest_ativa');
    if (pendRaw) {
      const quest = JSON.parse(pendRaw);
      if (quest && quest.missaoKey === missaoKey) {
        completarMissaoDiaria(missaoKey, quest.slotTarget || 1);
        return;
      }
    }
  } catch(e) {}
  completarMissaoDiaria(missaoKey, 1);
};
// Salvar pending com slotTarget para retorno cross-page
window.salvarMissaoPendente = function(missaoKey, slotTarget) {
  try {
    localStorage.setItem('bossraid_pending_mission', JSON.stringify({ missaoKey, slotTarget: slotTarget || 1 }));
  } catch(e) {}
};


export async function initBossRaid(userId, db, userData) {
  _db       = db;
  _userId   = userId;
  _userData = userData;
  console.log('[BossRaid] Inicializando:', userId);
  renderizarBossRaid();
  // Restaurar quest widget se havia uma ativa na sessao anterior
  inicializarQuestWidget();
  // Consumir missao pendente salva em localStorage
  // (disparada em outra pagina, ex: perfil-view, antes do boss-raid carregar)
  // GUARD: 'completar_raid' (tipo:auto) NÃO pode ser consumida por este caminho —
  // ela deve ser disparada explicitamente via window.missaoDiariaCompleta() por quem
  // sabe que a raid foi vencida. Isso evita que voltar para a home após qualquer
  // batalha acione a missão indevidamente.
  try {
    const pendRaw = localStorage.getItem('bossraid_pending_mission');
    if (pendRaw) {
      // suporte tanto ao formato antigo (string) quanto novo (JSON {missaoKey, slotTarget})
      let pendKey, pendSlot;
      try {
        const parsed = JSON.parse(pendRaw);
        if (typeof parsed === 'object' && parsed.missaoKey) {
          pendKey  = parsed.missaoKey;
          pendSlot = parsed.slotTarget || 1;
        } else {
          pendKey  = parsed;          // string pura (formato antigo)
          pendSlot = 1;
        }
      } catch(e) {
        pendKey  = pendRaw;           // string literal sem JSON
        pendSlot = 1;
      }
      if (pendKey && MISSOES_CONFIG[pendKey] && pendKey !== 'completar_raid') {
        localStorage.removeItem('bossraid_pending_mission');
        console.log('[BossRaid] Consumindo missao pendente do localStorage:', pendKey, 'slot:', pendSlot);
        setTimeout(() => completarMissaoDiaria(pendKey, pendSlot), 600);
      }
    }
  } catch(e) {}
  if (window._pendingMission && window._pendingMission !== 'completar_raid') {
    let pk, ps;
    if (typeof window._pendingMission === 'object') {
      pk = window._pendingMission.missaoKey;
      ps = window._pendingMission.slotTarget || 1;
    } else {
      pk = window._pendingMission;
      ps = 1;
    }
    window._pendingMission = null;
    if (pk) setTimeout(() => completarMissaoDiaria(pk, ps), 600);
  }
}

// ── Toast de confirmação (substitui confirm() nativo) ───────────────
// Retorna Promise<boolean>
function mostrarConfirmacaoToast(titulo, subtitulo) {
  return new Promise((resolve) => {
    document.getElementById('raidConfirmToast')?.remove();
    const el = document.createElement('div');
    el.id = 'raidConfirmToast';
    el.className = 'raid-confirm-toast';
    el.innerHTML =
      '<div class="rct-titulo">' + titulo + '</div>'
      + (subtitulo ? '<div class="rct-sub">' + subtitulo + '</div>' : '')
      + '<div class="rct-btns">'
      + '<button class="rct-btn rct-cancel" id="rctCancel">Cancel</button>'
      + '<button class="rct-btn rct-confirm" id="rctConfirm">Release</button>'
      + '</div>';
    document.body.appendChild(el);
    // Animar entrada
    requestAnimationFrame(() => el.classList.add('rct-show'));
    function fechar(val) {
      el.classList.remove('rct-show');
      setTimeout(() => el.remove(), 220);
      resolve(val);
    }
    document.getElementById('rctConfirm').addEventListener('click', () => fechar(true));
    document.getElementById('rctCancel').addEventListener('click',  () => fechar(false));
  });
}

// ============================================================
// RENDERIZAÇÃO PRINCIPAL
// ============================================================
function renderizarBossRaid() {
  const container = document.getElementById('bossRaidContainer');
  if (!container) return;

  const status = _userData?.raidStatus || null;
  const team   = _userData?.raidTeam   || [];

  if (!status)                  renderPrimeiraVez(container);
  else if (status === 'choosing') renderEscolhaPokemon(container);
  else if (status === 'active')   renderMyTeam(container, team);
}

// ============================================================
// FASE 1 — PRIMEIRA VEZ
// ============================================================
function renderPrimeiraVez(container) {
  container.innerHTML = `
    <div class="raid-inicio">
      <div class="raid-inicio-icon">⚔️</div>
      <h3 class="raid-inicio-titulo">Boss Raid</h3>
      <p class="raid-inicio-desc">Build your Pokémon team and fight powerful bosses alongside other trainers!</p>
      <div class="raid-inicio-botoes">
        <button class="btn-raid-jogar" id="btnRaidJogar">⚔️ I Want to Play!</button>
        <button class="btn-raid-instrucoes" id="btnRaidInstrucoes">📖 Instructions</button>
      </div>
    </div>

    <div class="raid-modal-overlay" id="raidModalInstrucoes">
      <div class="raid-modal-content">
        <button class="raid-modal-close" id="btnFecharInstrucoes">✕</button>
        <h3>📖 How Boss Raid Works</h3>
        <div class="raid-instrucoes-content">
          <p>⚔️ <strong>Boss Raid</strong> is a mini-game where you build a team of Pokémon to battle powerful bosses that appear on the site.</p><br>
          <p>🎮 <strong>How to start:</strong></p>
          <ul>
            <li>Click <strong>"I Want to Play"</strong> to begin</li>
            <li>You'll receive <strong>3 Pokéballs</strong> from different types</li>
            <li>Click each to <strong>reveal</strong> a random Pokémon</li>
            <li>Choose <strong>1</strong> to be your first team member</li>
          </ul><br>
          <p>📊 <strong>Stats, IVs & Nature:</strong> Each Pokémon is unique — IVs (0–31) and Nature are permanent and affect its final stats!</p><br>
          <p>⬆️ <strong>Leveling up:</strong> Gain XP by winning Boss Raids and completing loyalty quests.</p><br>
          <p>⚠️ <strong>Important:</strong> Your choices are <strong>permanent</strong>!</p>
        </div>
        <button class="btn-raid-fechar-modal" id="btnFecharInstrucoesBottom">Got it!</button>
      </div>
    </div>
  `;

  document.getElementById('btnRaidInstrucoes').addEventListener('click', () =>
    document.getElementById('raidModalInstrucoes').classList.add('show'));

  ['btnFecharInstrucoes','btnFecharInstrucoesBottom'].forEach(id =>
    document.getElementById(id)?.addEventListener('click', () =>
      document.getElementById('raidModalInstrucoes').classList.remove('show')));

  document.getElementById('raidModalInstrucoes').addEventListener('click', e => {
    if (e.target.id === 'raidModalInstrucoes')
      document.getElementById('raidModalInstrucoes').classList.remove('show');
  });

  document.getElementById('btnRaidJogar').addEventListener('click', async () => {
    try {
      await salvarRaidStatus('choosing');
      _userData.raidStatus = 'choosing';
      renderizarBossRaid();
    } catch (err) {
      console.error('[BossRaid]', err);
      alert('❌ Error starting raid. Try again.');
    }
  });
}

// ============================================================
// FASE 2 — ESCOLHA DE POKÉMON
// ============================================================
async function renderEscolhaPokemon(container) {
  if (_userData.raidSorteio && Object.keys(_userData.raidSorteio).length === 3) {
    _sorteados = _userData.raidSorteio;
  } else {
    Object.keys(RAID_GRUPOS).forEach(key => {
      const g = RAID_GRUPOS[key];
      _sorteados[key] = g.pokemons[Math.floor(Math.random() * g.pokemons.length)];
    });
    await salvarSorteio(_sorteados);
    _userData.raidSorteio = _sorteados;
  }

  container.innerHTML = `
    <div class="raid-escolha">
      <h3 class="raid-escolha-titulo">Choose your first Pokémon!</h3>
      <p class="raid-escolha-desc">Click each Pokéball to reveal, then choose one to join your team.</p>
      <div class="raid-pokebolas-container">
        ${Object.keys(RAID_GRUPOS).map(key => {
          const g = RAID_GRUPOS[key];
          return `
            <div class="raid-pokebola-slot">
              <div class="raid-pokebola-wrap" id="wrap-${key}">
                <div class="raid-pokebola" id="pokebola-${key}">
                  <img src="../boss/img-pokebolas/pokebola.png" alt="Pokéball"
                       onerror="this.src='../boss/img-pokebolas/pokebola.png'">
                </div>
                <span class="raid-pokebola-tipo" style="color:${g.cor}">${g.icone} ${g.nome}</span>
              </div>
              <div class="raid-pokemon-revelado" id="revelado-${key}" style="display:none;">
                <img src="../perfil/img-pokestarters/${_sorteados[key]}.png"
                     alt="${_sorteados[key]}" class="raid-pokemon-img"
                     onerror="this.src='../estatisticas-shad/images/backgrounds/pikachu-left-bg.png'">
                <p class="raid-pokemon-nome">${capitalizar(_sorteados[key])}</p>
                <button class="btn-escolher-pokemon" data-pokemon="${_sorteados[key]}">✅ Choose</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
      <p class="raid-aviso-permanente">⚠️ Your choice is <strong>permanent</strong> and cannot be changed!</p>
    </div>
  `;

  Object.keys(RAID_GRUPOS).forEach(key =>
    document.getElementById(`pokebola-${key}`)?.addEventListener('click', () => revelarPokemon(key)));

  container.querySelectorAll('.btn-escolher-pokemon').forEach(btn =>
    btn.addEventListener('click', () => confirmarEscolha(btn.dataset.pokemon)));
}

function revelarPokemon(key) {
  const wrap     = document.getElementById(`wrap-${key}`);
  const revelado = document.getElementById(`revelado-${key}`);
  const pokebola = document.getElementById(`pokebola-${key}`);
  if (!wrap || !revelado) return;
  pokebola.classList.add('abrindo');
  setTimeout(() => {
    wrap.style.display = 'none';
    revelado.style.display = 'flex';
    revelado.classList.add('aparecendo');
  }, 400);
}

// ============================================================
// CONFIRMAR ESCOLHA — gera IVs + Nature e salva no Firebase
// ============================================================
async function confirmarEscolha(pokemon) {
  try {
    const ivs    = gerarIVsAleatorios();
    const nature  = gerarNatureAleatoria();
    const ability = gerarAbility(pokemon);

    // IVs explicitamente campo a campo — evita perda de valores 0 na serialização
    const isShiny = Math.random() < 0.002; // 0.2% de chance
    const _golpesIniciais = inicializarGolpes(pokemon, 1);
    const novoSlot = {
      slot:        1,
      pokemon:     pokemon,
      nivel:       1,
      xp:          0,
      lealdade:    0,
      nature:      nature,
      ability:     ability,
      shiny:       isShiny,
      addedAt:     new Date().toISOString(),
      capturedAt:  Date.now(),
      golpes:      _golpesIniciais,
      pendingMove: inicializarGolpes._pendingMove || null,
      evs:    { hp:0, atk:0, def:0, spa:0, spd:0, spe:0 },
      evPoints: 0,
      ivs: {
        hp:  Number(ivs.hp),
        atk: Number(ivs.atk),
        def: Number(ivs.def),
        spa: Number(ivs.spa),
        spd: Number(ivs.spd),
        spe: Number(ivs.spe),
      }
    };

    console.log('[BossRaid] Slot a salvar:', JSON.stringify(novoSlot));
    const bagInicial = Object.assign({}, BAG_ITENS_INICIAIS);
    await salvarPrimeiroPokeRaid(novoSlot, bagInicial);
    _userData.raidStatus = 'active';
    _userData.raidTeam   = [novoSlot];
    _userData.raidBag    = bagInicial;
    const pdxSet = new Set(_userData.pokedex || []);
    pdxSet.add(pokemon);
    _userData.pokedex = Array.from(pdxSet);   // Fix: garantir bag no estado local
    renderizarBossRaid();
  } catch (err) {
    console.error('[BossRaid]', err);
    alert('❌ Error saving your choice. Try again.');
  }
}

// ============================================================
// FASE 3 — MY TEAM
// ============================================================
function renderMyTeam(container, raidTeam) {
  const slots = Array(6).fill(null);
  raidTeam.forEach(e => { if (e.slot >= 1 && e.slot <= 6) slots[e.slot - 1] = e; });

  container.innerHTML = `
    <div class="raid-myteam">
      <div class="raid-myteam-topbar">
        <h3 class="raid-myteam-titulo">⚔️ My Team</h3>
        <button class="raid-pokedex-btn" id="btnAbrirPokedex">📖 Pokédex</button>
      </div>
      <p class="raid-myteam-desc">Click to view its stats</p>
      <div class="raid-slots-grid">
        ${slots.map((slot, i) => slot ? `
          <div class="raid-slot ocupado" data-slot="${i}" title="Click to view ${capitalizar(slot.pokemon)}">
            <span class="raid-slot-numero">${i + 1}</span>
            <img src="${slot.shiny ? `../perfil/img-shiny/${slot.pokemon}.png` : `../perfil/img-pokeicon/${slot.pokemon}.png`}"
                 alt="${slot.pokemon}" class="raid-slot-img"
                 onerror="this.src='../perfil/img-pokeicon/${slot.pokemon}.png'"
                 data-shiny="${slot.shiny ? '1' : '0'}">
            ${slot.shiny ? '<span class="shiny-badge">✨ Shiny</span>' : ''}
            <p class="raid-slot-nome">${capitalizar(slot.pokemon)}</p>
            <div class="raid-slot-tipos">${renderTipoBadges(EVOLUTION_TIPOS[slot.pokemon]||POKEMON_TIPOS[slot.pokemon]||['normal'])}</div>
            <p class="raid-slot-nivel">Lv. ${slot.nivel}</p>
            ${(() => {
              // Calcular HP max e atual inline para o card
              const _bs  = BASE_STATS_EVO[slot.pokemon] || BASE_STATS[slot.pokemon] || { hp:45 };
              const _iv  = typeof slot.ivs?.hp === 'number' ? slot.ivs.hp : 15;
              const _ev  = typeof slot.evs?.hp === 'number' ? slot.evs.hp : 0;
              const _lvl = slot.nivel || 1;
              const hpMx = Math.floor((2 * _bs.hp + _iv + Math.floor(_ev/4)) * _lvl / 100 + _lvl + 10);
              const hpAt = typeof slot.hpAtual === 'number' && slot.hpAtual > 0
                ? Math.min(slot.hpAtual, hpMx)
                : slot.hpPct !== undefined
                  ? Math.max(1, Math.floor(hpMx * slot.hpPct))
                  : hpMx;
              const pct = hpMx > 0 ? Math.max(0, hpAt / hpMx * 100) : 100;
              const cls = pct > 50 ? 'hp-ok' : pct > 20 ? 'hp-low' : 'hp-critical';
              return `<div class="raid-slot-hpbar-wrap" title="${hpAt}/${hpMx} HP">
                <span class="raid-slot-hp-txt">${hpAt}/${hpMx} HP</span>
                <div class="raid-slot-hpbar">
                  <div class="raid-slot-hpbar-fill ${cls}" style="width:${pct.toFixed(1)}%"></div>
                </div>
              </div>`;
            })()}
            <div class="raid-slot-xpbar" title="XP: ${slot.xp||0}/${xpParaNivel(slot.nivel+1)}">
              <div class="raid-slot-xpbar-fill"
                   style="width:${Math.min(100,Math.floor(((slot.xp||0)/xpParaNivel(slot.nivel+1))*100))}%"></div>
            </div>
          </div>
        ` : `
          <div class="raid-slot vazio">
            <span class="raid-slot-numero">${i + 1}</span>
            <div class="raid-slot-vazio-icon">?</div>
            <p class="raid-slot-vazio-texto">Empty</p>
          </div>
        `).join('')}
      </div>

      <div class="raid-bag-section">
        <h4 class="raid-bag-titulo">&#x1F392; Bag</h4>
        <div class="raid-bag-grid" id="raidBagGrid"></div>
      </div>

      <!-- Zona de Stand-by: pokémon capturado quando time está cheio -->
      <div class="raid-standby-section" id="raidStandbySection" style="display:none">
        <div class="raid-standby-header">
          <span class="raid-standby-icon">⏳</span>
          <span class="raid-standby-titulo">Pokémon in Stand-by</span>
          <span class="raid-standby-aviso">Release a team member to add it!</span>
        </div>
        <div class="raid-standby-card" id="raidStandbyCard"></div>
      </div>
    </div>

    <div class="raid-item-overlay" id="raidItemModal" style="display:none">
      <div class="raid-item-modal">
        <button class="raid-modal-close" id="btnFecharItemModal">x</button>
        <div id="raidItemModalBody"></div>
      </div>
    </div>

    <div class="raid-item-overlay" id="raidUsarItemModal" style="display:none">
      <div class="raid-item-modal">
        <button class="raid-modal-close" id="btnFecharUsarItemModal">x</button>
        <div id="raidUsarItemBody"></div>
      </div>
    </div>

    <div class="raid-modal-overlay raid-pokedex-overlay" id="raidPokedexModal">
      <div class="raid-modal-content raid-pokedex-content">
        <button class="raid-modal-close" id="btnFecharPokedex">✕</button>
        <div class="raid-pokedex-header">
          <h2 class="raid-pokedex-titulo">📖 Pokédex</h2>
          <span class="raid-pokedex-stats" id="pokedexStats"></span>
        </div>
        <div class="raid-pokedex-grid" id="raidPokedexGrid"></div>
      </div>
    </div>

    <!-- Modal de Evolução -->
    <div class="raid-modal-overlay" id="raidEvoModal">
      <div class="raid-modal-content raid-evo-content">
        <div id="raidEvoBody"></div>
      </div>
    </div>

    <div class="raid-modal-overlay" id="raidModalStatus">
      <div class="raid-modal-content raid-modal-status-content">
        <button class="raid-modal-close" id="btnFecharStatus">✕</button>
        <div id="raidStatusBody"></div>
      </div>
    </div>
  `;

  renderBagGrid(container);
  renderStandby();

  // Marcar slots com evolucao disponivel
  raidTeam.forEach(s => { if (podeEvoluir(s)) sugerirEvolucao(s); });

  container.querySelectorAll('.raid-slot.ocupado').forEach(el =>
    el.addEventListener('click', () => {
      const slot = slots[parseInt(el.dataset.slot)];
      if (slot) abrirModalStatus(slot);
    }));

  document.getElementById('btnAbrirPokedex')?.addEventListener('click', () => abrirPokedex());
  document.getElementById('btnFecharPokedex')?.addEventListener('click', () =>
    document.getElementById('raidPokedexModal').classList.remove('show'));
  document.getElementById('raidPokedexModal')?.addEventListener('click', e => {
    if (e.target.id === 'raidPokedexModal')
      document.getElementById('raidPokedexModal').classList.remove('show');
  });

  document.getElementById('btnFecharStatus')?.addEventListener('click', () =>
    document.getElementById('raidModalStatus').classList.remove('show'));

  document.getElementById('raidModalStatus')?.addEventListener('click', e => {
    if (e.target.id === 'raidModalStatus')
      document.getElementById('raidModalStatus').classList.remove('show');
  });
}

// ============================================================
// POKEDEX
// ============================================================
function abrirPokedex() {
  const modal = document.getElementById('raidPokedexModal');
  const grid  = document.getElementById('raidPokedexGrid');
  const stats = document.getElementById('pokedexStats');
  if (!modal || !grid) return;

  const registrados = new Set(_userData?.pokedex || []);
  (_userData?.raidTeam || []).forEach(s => { if (s?.pokemon) registrados.add(s.pokemon); });

  const total = 1025;
  if (stats) stats.textContent = registrados.size + ' / ' + total + ' registered';

  // Mescla POKEDEX_NUM com POKEDEX_NUM_EVO para exibir todas as formas
  const numToKey = {};
  const pdxFull  = Object.assign({}, POKEDEX_NUM, POKEDEX_NUM_EVO);
  Object.entries(pdxFull).forEach(([key, num]) => { numToKey[num] = key; });

  const cards = [];
  for (let i = 1; i <= total; i++) {
    const key    = numToKey[i] || null;
    const visto  = key && registrados.has(key);
    const noJogo = !!key;
    const numStr = String(i).padStart(4, '0');
    const nome   = key ? key.charAt(0).toUpperCase() + key.slice(1) : '';

    if (visto) {
      cards.push(
        '<div class="pdx-card pdx-capturado" title="#' + numStr + ' ' + nome + '" data-key="' + key + '">'
        + '<span class="pdx-num">#' + numStr + '</span>'
        + '<img src="../perfil/img-pokeicon/' + key + '.png" class="pdx-img" loading="lazy">'
        + '<span class="pdx-nome">' + nome + '</span>'
        + '</div>'
      );
    } else if (noJogo) {
      cards.push(
        '<div class="pdx-card pdx-nao-visto" title="#' + numStr + ' ???">'
        + '<span class="pdx-num">#' + numStr + '</span>'
        + '<img src="../perfil/img-pokeicon/' + key + '.png" class="pdx-img pdx-silhueta" loading="lazy">'
        + '<span class="pdx-nome">???</span>'
        + '</div>'
      );
    } else {
      cards.push(
        '<div class="pdx-card pdx-vazio" title="#' + numStr + '">'
        + '<span class="pdx-num">#' + numStr + '</span>'
        + '<span class="pdx-interrogacao">?</span>'
        + '</div>'
      );
    }
  }

  grid.innerHTML = cards.join('');
  modal.classList.add('show');

  // Click em card revelado → abre detalhe
  grid.querySelectorAll('.pdx-card.pdx-capturado').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const key = card.dataset.key;
      if (key) abrirPokedexDetalhe(key, registrados);
    });
  });
}


// ============================================================
// POKÉDEX — Modal de detalhe de um pokémon revelado
// ============================================================
function abrirPokedexDetalhe(key, registrados) {
  // Remove modal anterior se existir
  document.getElementById('pdxDetalheModal')?.remove();

  const nome     = key.charAt(0).toUpperCase() + key.slice(1);
  const pdxNum   = POKEDEX_NUM[key] || POKEDEX_NUM_EVO[key] || '?';
  const numStr   = String(pdxNum).padStart(4, '0');
  const tipos    = EVOLUTION_TIPOS[key] || POKEMON_TIPOS[key] || ['normal'];
  const bs       = BASE_STATS_EVO[key] || BASE_STATS[key] || {};
  const catchPct = CATCH_RATE[key] || 45;
  const abilEntry= EVOLUTION_ABILITIES[key] || POKEMON_ABILITIES[key] || {};
  const learnset = LEARNSETS[key] || [];

  // Verifica se o jogador tem versão shiny deste pokémon no time
  const temShiny = (_userData?.raidTeam || []).some(s => s?.pokemon === key && s?.shiny);

  // ── Stat bars ───────────────────────────────────────────────
  const STAT_MAX = { hp:255, atk:180, def:180, spa:180, spd:180, spe:180 };
  const STAT_BAR_COLORS = {
    hp:  '#f04040',
    atk: '#f08030',
    def: '#f0d040',
    spa: '#6890f0',
    spd: '#78c850',
    spe: '#f85888',
  };
  const STAT_LABEL = { hp:'HP', atk:'Attack', def:'Defense', spa:'Sp. Atk', spd:'Sp. Def', spe:'Speed' };
  const total = Object.values(bs).reduce((a,b) => a + b, 0);

  function statBar(stat) {
    const val  = bs[stat] || 0;
    const pct  = Math.min(100, Math.round(val / STAT_MAX[stat] * 100));
    const col  = STAT_BAR_COLORS[stat];
    return `<div class="pdx-stat-row">
      <span class="pdx-stat-label">${STAT_LABEL[stat]}</span>
      <span class="pdx-stat-val">${val}</span>
      <div class="pdx-stat-bar-bg">
        <div class="pdx-stat-bar-fill" style="width:${pct}%;background:${col}"></div>
      </div>
    </div>`;
  }

  // ── Evolution chain ─────────────────────────────────────────
  // Encontrar raiz da cadeia
  function getRaiz(k) {
    for (const [base, data] of Object.entries(EVOLUTION_CHAIN)) {
      if (data.evolvesTo === k) return getRaiz(base);
    }
    return k;
  }
  function getCadeia(k) {
    const arr = [k];
    let cur = k;
    while (EVOLUTION_CHAIN[cur]) { cur = EVOLUTION_CHAIN[cur].evolvesTo; arr.push(cur); }
    return arr;
  }
  const raiz   = getRaiz(key);
  const cadeia = getCadeia(raiz);

  function evoCardHTML(evoKey, idx) {
    const evoNome = evoKey.charAt(0).toUpperCase() + evoKey.slice(1);
    const revealed = registrados && registrados.has(evoKey);
    const isAtual  = evoKey === key;
    const imgCls   = revealed ? '' : 'pdx-silhueta';
    const nomeTxt  = revealed ? evoNome : '???';
    const levelTxt = idx > 0 ? (() => {
      // Encontrar levelReq: a partir da forma anterior na cadeia
      const anterior = cadeia[idx - 1];
      return EVOLUTION_CHAIN[anterior]?.levelReq ? `Lv.${EVOLUTION_CHAIN[anterior].levelReq}` : '';
    })() : '';

    return `<div class="pdx-evo-step ${isAtual ? 'pdx-evo-atual' : ''}">
      ${idx > 0 ? `<div class="pdx-evo-arrow"><span>${levelTxt}</span>→</div>` : ''}
      <div class="pdx-evo-card">
        <img src="../perfil/img-pokeicon/${evoKey}.png" class="pdx-img ${imgCls}" style="width:44px;height:44px">
        <span class="pdx-evo-nome">${nomeTxt}</span>
      </div>
    </div>`;
  }

  // ── Abilities ───────────────────────────────────────────────
  function abilityRowHTML(abilKey, isHidden) {
    const data = getAbilityData(abilKey);
    return `<div class="pdx-ability-row ${isHidden ? 'pdx-ability-hidden' : ''}">
      <span class="pdx-ability-nome">${data.name}${isHidden ? ' <span class="pdx-ha-tag">HA</span>' : ''}</span>
      <span class="pdx-ability-desc">${data.desc}</span>
    </div>`;
  }

  const abilitiasHTML = [
    ...(abilEntry.normal || []).map(a => abilityRowHTML(a, false)),
    ...(abilEntry.hidden && !abilEntry.noHidden ? [abilityRowHTML(abilEntry.hidden, true)] : []),
  ].join('');

  // ── Learnset ────────────────────────────────────────────────
  const learnRows = learnset.map(([lvl, moveKey]) => {
    const mv = MOVES_DB[moveKey];
    if (!mv) return '';
    const cor = TIPO_CORES[mv.type] || '#888';
    const catIcon = mv.category === 'physical' ? '⚔️' : mv.category === 'special' ? '✨' : '🔵';
    return `<div class="pdx-move-row">
      <span class="pdx-move-lvl">Lv.${lvl}</span>
      <span class="pdx-move-name">${mv.name}</span>
      <span class="pdx-move-type" style="background:${cor}">${mv.type.toUpperCase()}</span>
      <span class="pdx-move-cat">${catIcon}</span>
      <span class="pdx-move-pow">${mv.power || '—'}</span>
      <span class="pdx-move-acc">${mv.accuracy ? mv.accuracy+'%' : '—'}</span>
    </div>`;
  }).filter(Boolean).join('');

  // ── Catch rate visual ───────────────────────────────────────
  const catchPct5 = Math.min(100, catchPct);
  const catchColor = catchPct >= 200 ? '#78c850' : catchPct >= 100 ? '#f0d040' : catchPct >= 45 ? '#f08030' : '#f04040';
  const catchLabel = catchPct >= 200 ? 'Easy' : catchPct >= 100 ? 'Common' : catchPct >= 45 ? 'Uncommon' : 'Rare';

  // ── Assemble modal ──────────────────────────────────────────
  const overlay = document.createElement('div');
  overlay.id = 'pdxDetalheModal';
  overlay.className = 'pdx-detalhe-overlay';
  overlay.innerHTML = `
    <div class="pdx-detalhe-box">
      <button class="pdx-detalhe-close" id="pdxDetalheClose">✕</button>

      <!-- Header -->
      <div class="pdx-detalhe-header">
        <div class="pdx-detalhe-sprite-wrap">
          <img id="pdxDetalheImg" src="../perfil/img-pokeicon/${key}.png" class="pdx-detalhe-sprite" alt="${nome}">
          ${temShiny ? '<span class="pdx-shiny-glow"></span>' : ''}
        </div>
        <div class="pdx-detalhe-info">
          <span class="pdx-detalhe-num">#${numStr}</span>
          <h2 class="pdx-detalhe-nome">${nome}</h2>
          <div class="pdx-detalhe-tipos">${renderTipoBadges(tipos)}</div>
          ${temShiny ? '<button class="pdx-shiny-btn" id="pdxShinyToggle">✨ Show Shiny</button>' : ''}
        </div>
      </div>

      <!-- Tabs -->
      <div class="pdx-detalhe-tabs">
        <button class="pdx-tab active" data-tab="stats">📊 Stats</button>
        <button class="pdx-tab" data-tab="moves">⚔️ Moves</button>
        <button class="pdx-tab" data-tab="abilities">✨ Abilities</button>
        <button class="pdx-tab" data-tab="evo">🔮 Evolution</button>
      </div>

      <!-- Tab: Stats -->
      <div class="pdx-detalhe-panel active" data-panel="stats">
        <div class="pdx-stat-section">
          ${['hp','atk','def','spa','spd','spe'].map(statBar).join('')}
          <div class="pdx-stat-total">
            <span>Total</span><strong>${total}</strong>
          </div>
        </div>
        <div class="pdx-catch-section">
          <span class="pdx-catch-label">Catch Rate</span>
          <div class="pdx-catch-bar-bg">
            <div class="pdx-catch-bar-fill" style="width:${catchPct5}%;background:${catchColor}"></div>
          </div>
          <span class="pdx-catch-val" style="color:${catchColor}">${catchLabel} (${catchPct}/255)</span>
        </div>
      </div>

      <!-- Tab: Moves -->
      <div class="pdx-detalhe-panel" data-panel="moves">
        <div class="pdx-move-header">
          <span>Lv</span><span>Name</span><span>Type</span><span>Cat</span><span>Pow</span><span>Acc</span>
        </div>
        <div class="pdx-move-list">${learnRows || '<p class="pdx-empty">No moves registered.</p>'}</div>
      </div>

      <!-- Tab: Abilities -->
      <div class="pdx-detalhe-panel" data-panel="abilities">
        <div class="pdx-ability-list">${abilitiasHTML || '<p class="pdx-empty">No abilities registered.</p>'}</div>
      </div>

      <!-- Tab: Evolution -->
      <div class="pdx-detalhe-panel" data-panel="evo">
        <div class="pdx-evo-chain">
          ${cadeia.map((k, i) => evoCardHTML(k, i)).join('')}
        </div>
        ${cadeia.length === 1 ? '<p class="pdx-empty" style="margin-top:12px">This Pokémon does not evolve.</p>' : ''}
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('show'));

  // Close
  overlay.querySelector('#pdxDetalheClose').addEventListener('click', () => {
    overlay.classList.remove('show');
    setTimeout(() => overlay.remove(), 250);
  });
  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      overlay.classList.remove('show');
      setTimeout(() => overlay.remove(), 250);
    }
  });

  // Tab switching
  overlay.querySelectorAll('.pdx-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      overlay.querySelectorAll('.pdx-tab').forEach(b => b.classList.remove('active'));
      overlay.querySelectorAll('.pdx-detalhe-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      overlay.querySelector(`[data-panel="${btn.dataset.tab}"]`).classList.add('active');
    });
  });

  // Toggle shiny sprite
  if (temShiny) {
    const shinyBtn = overlay.querySelector('#pdxShinyToggle');
    const spriteImg = overlay.querySelector('#pdxDetalheImg');
    const glowEl    = overlay.querySelector('.pdx-shiny-glow');
    let showingShiny = false;
    shinyBtn?.addEventListener('click', () => {
      showingShiny = !showingShiny;
      if (showingShiny) {
        spriteImg.src = `../perfil/img-shiny/${key}.png`;
        spriteImg.onerror = () => { spriteImg.src = `../perfil/img-pokeicon/${key}.png`; };
        shinyBtn.textContent = '🔙 Show Normal';
        shinyBtn.classList.add('active');
        glowEl?.classList.add('active');
      } else {
        spriteImg.src = `../perfil/img-pokeicon/${key}.png`;
        spriteImg.onerror = null;
        shinyBtn.textContent = '✨ Show Shiny';
        shinyBtn.classList.remove('active');
        glowEl?.classList.remove('active');
      }
    });
  }
}

// ============================================================
// SISTEMA DE EVOLUÇÃO
// ============================================================

// ── Verifica se o slot pode evoluir agora ──────────────────
// Retorna o nome da forma evoluída ou null se não puder.
function podeEvoluir(slot) {
  if (!slot || !slot.pokemon) return null;
  const chain = EVOLUTION_CHAIN[slot.pokemon];
  if (!chain) return null; // forma final, não evolui

  const nivelOk   = (slot.nivel || 1) >= chain.levelReq;
  const lealdadeOk = (slot.lealdade || 0) >= chain.loyaltyReq;

  return (nivelOk && lealdadeOk) ? chain.evolvesTo : null;
}

// ── Resolve a ability para a forma evoluída ────────────────
// Regras:
//   1. Se o pokemon tinha hidden ability → nova forma recebe a hidden da nova forma
//   2. Se tinha ability normal → sorteia entre as normais da nova forma
//
// CASO ESPECIAL — linha Caterpie:
//   Metapod não tem hidden ability (noHidden:true). Caterpie com hidden
//   evolui para Metapod e recebe uma ability NORMAL, mas o slot recebe
//   hiddenLineage:true para que Butterfree herde a hidden (tinted_lens).
//
// Retorna: { ability: string, hiddenLineage: bool }
function resolverAbilityEvo(abilityAtual, pokemonAtual, novaForma, slotAtual) {
  // Descobre se a ability atual é hidden na forma ATUAL
  const entryAtual  = POKEMON_ABILITIES[pokemonAtual] || EVOLUTION_ABILITIES[pokemonAtual];
  const eraHiddenDireto = entryAtual && entryAtual.hidden === abilityAtual;
  // Herança via flag (ex: metapod com hiddenLineage=true → butterfree)
  const eraHidden   = eraHiddenDireto || (slotAtual?.hiddenLineage === true);

  // Busca as abilities da nova forma (EVOLUTION_ABILITIES tem prioridade)
  const entryNova = EVOLUTION_ABILITIES[novaForma] || POKEMON_ABILITIES[novaForma];
  if (!entryNova) return { ability: abilityAtual, hiddenLineage: false };

  if (eraHidden) {
    if (entryNova.noHidden) {
      // Nova forma não tem hidden — usa normal MAS preserva flag de linhagem
      const normais = entryNova.normal || [];
      const novaAbility = normais[Math.floor(Math.random() * normais.length)] || abilityAtual;
      return { ability: novaAbility, hiddenLineage: true };
    }
    // Nova forma tem hidden — recebe a hidden (linhagem satisfeita)
    return { ability: entryNova.hidden || abilityAtual, hiddenLineage: false };
  } else {
    // Normal — sorteia entre as normais da nova forma
    const normais = entryNova.normal || ['overgrow'];
    return { ability: normais[Math.floor(Math.random() * normais.length)], hiddenLineage: false };
  }
}

// ── Executa a evolução de um slot ─────────────────────────
// Preserva: level, nature, IVs, EVs (distribuídos e pontos livres)
// Reseta:   lealdade → 0 (nova jornada)
// Atualiza: pokemon, ability (com regra de hidden), tipos, golpes
async function evoluirPokemon(slot) {
  const novaForma = podeEvoluir(slot);
  if (!novaForma) {
    console.warn('[BossRaid] evoluirPokemon chamado sem condição válida:', slot.pokemon);
    return;
  }

  // ── Resolver nova ability ──────────────────────────────────
  // resolverAbilityEvo retorna { ability, hiddenLineage }
  const evoResult    = resolverAbilityEvo(slot.ability, slot.pokemon, novaForma, slot);
  const novaAbility  = evoResult.ability;
  const hiddenLineage = evoResult.hiddenLineage;

  // ── Registrar na Pokédex ───────────────────────────────────
  const pdxSet = new Set(_userData.pokedex || []);
  pdxSet.add(novaForma);

  // ── Montar slot evoluído ───────────────────────────────────
  // Tudo permanente é preservado; lealdade reseta para nova jornada
  const slotEvoluido = {
    ...slot,                          // copia tudo (ivs, evs, evPoints, nature, golpes, xp...)
    pokemon:  novaForma,
    ability:  novaAbility,
    hiddenLineage: hiddenLineage,     // flag de linhagem hidden (ex: metapod → butterfree)
    lealdade: 0,                      // reset — começa nova jornada de lealdade
    // Golpes: re-inicializa com os golpes da nova forma no nível atual
    // (na prática Pokémon mantém os golpes aprendidos; aqui re-derivamos
    //  porque LEARNSETS é por pokemon — ajuste conforme necessidade)
    golpes:   inicializarGolpes(novaForma, slot.nivel || 1),
    evolvedAt: new Date().toISOString(),
    evolvedFrom: slot.pokemon,        // histórico para debug
  };

  // ── Salvar no Firebase ─────────────────────────────────────
  try {
    const { doc, updateDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');

    const novoTeam = (_userData.raidTeam || []).map(s =>
      s.slot === slot.slot ? JSON.parse(JSON.stringify(slotEvoluido)) : s
    );

    await updateDoc(doc(_db, 'usuarios', _userId), {
      raidTeam: novoTeam,
      pokedex:  Array.from(pdxSet),
    });

    _userData.raidTeam = novoTeam;
    _userData.pokedex  = Array.from(pdxSet);

    console.log('[BossRaid] Evolução concluída:', slot.pokemon, '->', novaForma);
    renderizarBossRaid();

    // Mostrar modal de evolução após re-render
    setTimeout(() => mostrarModalEvolucao(slot.pokemon, novaForma, slotEvoluido), 100);

  } catch(err) {
    console.error('[BossRaid] Erro ao evoluir:', err);
    alert('Error during evolution. Please try again.');
  }
}

// ── Modal de celebração da evolução ───────────────────────
function mostrarModalEvolucao(de, para, slotEvoluido) {
  const overlay = document.getElementById('raidEvoModal');
  const body    = document.getElementById('raidEvoBody');
  if (!overlay || !body) return;

  const nomeDe  = de.charAt(0).toUpperCase()  + de.slice(1);
  const nomePara = para.charAt(0).toUpperCase() + para.slice(1);
  const tipos    = EVOLUTION_TIPOS[para] || POKEMON_TIPOS[para] || ['normal'];
  const abilityData = getAbilityData(slotEvoluido.ability);
  const entryNova   = EVOLUTION_ABILITIES[para] || POKEMON_ABILITIES[para];
  const isHidden    = entryNova && entryNova.hidden === slotEvoluido.ability;

  body.innerHTML =
    '<div class="evo-modal-wrap">'
    + '<div class="evo-antes">'
    + '<img src="../perfil/img-pokeicon/' + de + '.png" class="evo-img evo-img-de">'
    + '<span class="evo-nome-de">' + nomeDe + '</span>'
    + '</div>'
    + '<div class="evo-seta">→</div>'
    + '<div class="evo-depois">'
    + '<img src="../perfil/img-pokeicon/' + para + '.png" class="evo-img evo-img-para">'
    + '<span class="evo-nome-para">' + nomePara + '</span>'
    + '<div class="evo-tipos">' + renderTipoBadges(tipos) + '</div>'
    + '</div>'
    + '</div>'
    + '<div class="evo-info">'
    + '<div class="evo-info-row"><span class="evo-info-label">⚡ Ability:</span>'
    + '<span class="evo-info-val' + (isHidden ? ' evo-hidden' : '') + '">'
    + abilityData.name + (isHidden ? ' ★' : '') + '</span></div>'
    + '<div class="evo-info-row"><span class="evo-info-label">♥ Loyalty:</span>'
    + '<span class="evo-info-val">Reset to 0 — new journey begins!</span></div>'
    + '</div>'
    + '<button class="evo-fechar-btn" id="btnFecharEvo">Continue!</button>';

  overlay.classList.add('show');
  document.getElementById('btnFecharEvo')?.addEventListener('click', () => {
    overlay.classList.remove('show');
  });
}

// ── Missoes disponiveis no modal de status ────────────────────────
function renderMissoesNoModal(slot) {
  const feitas     = _userData?.missoesDiarias || {};
  const hoje       = hojeKey();
  const questAtiva = getQuestAtiva();

  // Missões ativas para ESTE slot: login bonus fixo + missão rotativa do slot
  const missaoDesteSlot = getMissaoDoSlot(slot?.slot || 1);
  const missoesDesteSlot = ['missao_teste', missaoDesteSlot];

  const linhas = missoesDesteSlot.map(key => {
    const cfg    = MISSOES_CONFIG[key];
    if (!cfg) return '';
    // Chave per-slot: missão "feita" só conta para este pokemon (este slot)
    const slotKey = key + '_slot' + (slot.slot || 1);
    const feita  = feitas[slotKey] === hoje;
    const ativa  = questAtiva?.missaoKey === key && questAtiva?.slotTarget === (slot.slot || 1);
    const icone  = cfg.icone || '★';
    const cls    = feita ? 'missao-feita' : ativa ? 'missao-ativa' : '';
    const btn    = feita
      ? '<span class="missao-check">✔ Done</span>'
      : ativa
        ? '<span class="missao-em-curso">Active ●</span>'
        : '<button class="missao-start-btn" data-missao="' + key + '" data-slot="' + (slot.slot||1) + '">Start</button>';
    return (
      '<div class="missao-linha ' + cls + '">'
      + '<span class="missao-icone">' + icone + '</span>'
      + '<div class="missao-texto">'
      + '<span class="missao-label">' + cfg.label + '</span>'
      + '<span class="missao-bonus">+' + cfg.lealdade + ' Loyalty</span>'
      + '</div>'
      + btn
      + '</div>'
    );
  }).join('');

  return (
    '<div class="missoes-secao">'
    + '<div class="missoes-titulo">Daily Missions</div>'
    + linhas
    + '</div>'
  );
}

// ── Linha evolutiva visual para o modal ──────────────────────────
// Mostra: [Forma base] -> [Forma 2 ou ???] -> [Forma 3 ou ???]
// Registrado na pokedex = imagem; nao registrado = silhueta com "???"
function renderLinhaEvolutiva(pokemonAtual) {
  // Encontrar a forma base da cadeia
  function encontrarBase(poke) {
    for (const [base, chain] of Object.entries(EVOLUTION_CHAIN)) {
      if (chain.evolvesTo === poke) return encontrarBase(base);
    }
    return poke;
  }

  // Construir cadeia completa [base, evo1, evo2?]
  function construirCadeia(poke) {
    const arr = [poke];
    let cur = poke;
    while (EVOLUTION_CHAIN[cur]) { cur = EVOLUTION_CHAIN[cur].evolvesTo; arr.push(cur); }
    return arr;
  }

  const base    = encontrarBase(pokemonAtual);
  const cadeia  = construirCadeia(base);
  if (cadeia.length < 2) return ''; // pokemon sem evolucao, nao exibe

  const registrados = new Set(_userData?.pokedex || []);
  registrados.add(pokemonAtual); // atual sempre visivel

  const cards = cadeia.map((poke) => {
    const isAtual    = poke === pokemonAtual;
    const registrado = registrados.has(poke);
    const numEntry   = (POKEDEX_NUM[poke] || POKEDEX_NUM_EVO[poke]);
    const numStr     = numEntry ? '#' + String(numEntry).padStart(4,'0') : '';
    const nome       = poke.charAt(0).toUpperCase() + poke.slice(1);

    // Nivel necessario para chegar NESTA forma
    let lvlTag = '';
    for (const [from, data] of Object.entries(EVOLUTION_CHAIN)) {
      if (data.evolvesTo === poke) { lvlTag = 'Lv.' + data.levelReq; break; }
    }

    if (registrado) {
      return (
        '<div class="evo-chain-card' + (isAtual ? ' evo-chain-atual' : '') + '">'
        + (numStr ? '<span class="evo-chain-num">' + numStr + '</span>' : '')
        + '<img src="../perfil/img-pokeicon/' + poke + '.png" class="evo-chain-img">'
        + '<span class="evo-chain-nome">' + nome + '</span>'
        + (isAtual ? '<span class="evo-chain-tag">Current</span>' : '')
        + '</div>'
      );
    } else {
      return (
        '<div class="evo-chain-card evo-chain-desconhecido">'
        + (lvlTag ? '<span class="evo-chain-num">' + lvlTag + '</span>' : '')
        + '<div class="evo-chain-silhueta">?</div>'
        + '<span class="evo-chain-nome">???</span>'
        + '</div>'
      );
    }
  });

  // Intercalar setas
  const partes = [];
  cards.forEach((card, i) => {
    partes.push(card);
    if (i < cards.length - 1) partes.push('<div class="evo-chain-seta">→</div>');
  });

  return (
    '<div class="evo-chain-secao">'
    + '<div class="evo-chain-titulo">Evolution Line</div>'
    + '<div class="evo-chain-wrap">' + partes.join('') + '</div>'
    + '</div>'
  );
}

// ── Checar evolução pendente ao abrir o modal de status ───
// Exibe um botão "Evolve!" se as condições forem satisfeitas
// Wrapper para marcar badge visual de evolução disponível no grid de slots
// (funcionalidade futura — hoje apenas agenda uma re-render silenciosa)
function sugerirEvolucao(slot) {
  // Visual cue no card do slot: adicionar classe 'pode-evoluir'
  const el = document.querySelector(`.raid-slot[data-slot="${slot.slot}"]`);
  if (el) el.classList.add('pode-evoluir');
}

function checarBotaoEvolucao(slot, container) {
  const novaForma = podeEvoluir(slot);
  if (!novaForma) return;

  const nomePara = novaForma.charAt(0).toUpperCase() + novaForma.slice(1);
  const btn = document.createElement('button');
  btn.className   = 'evo-btn-disponivel';
  btn.innerHTML   = '✨ EVOLVE to ' + nomePara + '!';
  btn.addEventListener('click', async () => {
    btn.disabled     = true;
    btn.textContent  = 'Evolving...';
    // Fechar modal de status antes de evoluir
    document.getElementById('raidModalStatus')?.classList.remove('show');
    await evoluirPokemon(slot);
  });
  container.appendChild(btn);
}

// ============================================================
// RENDER BAG
// ============================================================
// ============================================================
// STAND-BY — pokémon capturado quando time está cheio (max 6)
// Fica em espera por 2 minutos. O usuário pode dar release
// em algum membro do time para incluí-lo automaticamente.
// Se o tempo expirar, o pokémon é liberado automaticamente.
// ============================================================
let _standbyTimer = null; // intervalo do countdown local

function renderStandby() {
  const section  = document.getElementById('raidStandbySection');
  const cardEl   = document.getElementById('raidStandbyCard');
  if (!section || !cardEl) return;

  const standby = _userData?.raidStandby || null;
  if (!standby || !standby.pokemon) {
    section.style.display = 'none';
    if (_standbyTimer) { clearInterval(_standbyTimer); _standbyTimer = null; }
    return;
  }

  // Verificar se já expirou localmente
  const agora = Date.now();
  const expira = standby.expiraEm || 0;
  if (agora >= expira) {
    // Expirou — remover do Firestore e esconder
    _removerStandbyExpirado();
    section.style.display = 'none';
    return;
  }

  section.style.display = 'block';

  // Calcular HP do standby para exibição
  const _bsS  = BASE_STATS_EVO[standby.pokemon] || BASE_STATS[standby.pokemon] || { hp:45 };
  const _ivS  = typeof standby.ivs?.hp === 'number' ? standby.ivs.hp : 15;
  const _evS  = typeof standby.evs?.hp === 'number' ? standby.evs.hp : 0;
  const _lvlS = standby.nivel || 1;
  const hpMxS = Math.floor((2 * _bsS.hp + _ivS + Math.floor(_evS/4)) * _lvlS / 100 + _lvlS + 10);
  const tiposS = EVOLUTION_TIPOS[standby.pokemon] || POKEMON_TIPOS[standby.pokemon] || ['normal'];

  cardEl.innerHTML = `
    <div class="standby-inner" data-standby>
      <div class="standby-img-wrap">
        <img src="${standby.shiny ? '../perfil/img-shiny/'+standby.pokemon+'.png' : '../perfil/img-pokeicon/'+standby.pokemon+'.png'}"
             alt="${standby.pokemon}" class="standby-img"
             onerror="this.src='../perfil/img-pokeicon/${standby.pokemon}.png'">
        ${standby.shiny ? '<span class="shiny-badge">✨ Shiny</span>' : ''}
      </div>
      <div class="standby-info">
        <p class="standby-nome">${capitalizar(standby.pokemon)}</p>
        <div class="standby-tipos">${renderTipoBadges(tiposS)}</div>
        <p class="standby-nivel">Lv. ${standby.nivel || 1} | ${hpMxS} HP</p>
      </div>
      <div class="standby-timer-wrap">
        <span class="standby-timer-label">Expires in</span>
        <span class="standby-timer" id="standbyCountdown">--:--</span>
      </div>
    </div>
  `;

  // Click no card abre o modal de status (view)
  cardEl.querySelector('[data-standby]').addEventListener('click', () => {
    abrirModalStatus(standby);
  });

  // Iniciar countdown
  if (_standbyTimer) { clearInterval(_standbyTimer); _standbyTimer = null; }
  function _atualizarTimer() {
    const el = document.getElementById('standbyCountdown');
    if (!el) { clearInterval(_standbyTimer); _standbyTimer = null; return; }
    const diff = (standby.expiraEm || 0) - Date.now();
    if (diff <= 0) {
      clearInterval(_standbyTimer); _standbyTimer = null;
      _removerStandbyExpirado();
      return;
    }
    const mm = Math.floor(diff / 60000);
    const ss = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
    el.textContent = `${mm}:${ss}`;
    // Cor vira vermelho nos últimos 30s
    el.style.color = diff < 30000 ? '#ff4444' : '#ff7500';
  }
  _atualizarTimer();
  _standbyTimer = setInterval(_atualizarTimer, 1000);
}

async function _removerStandbyExpirado() {
  if (!_userId || !_db) return;
  try {
    const { doc, updateDoc, deleteField } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
    await updateDoc(doc(_db, 'usuarios', _userId), { raidStandby: deleteField() });
    if (_userData) delete _userData.raidStandby;
    mostrarToast('Stand-by expired — Pokémon was released', '👋', false);
  } catch(e) { console.error('[standby] erro ao remover:', e); }
  renderStandby();
}

async function _promoverStandby() {
  // Chamado quando um release é feito e há pokémon em standby
  const standby = _userData?.raidStandby || null;
  if (!standby || !standby.pokemon) return;
  if ((standby.expiraEm || 0) < Date.now()) {
    await _removerStandbyExpirado();
    return;
  }
  try {
    const { doc, updateDoc, deleteField } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
    const team = _userData?.raidTeam || [];
    // Encontrar slot livre
    const ocupados = new Set(team.map(s => s.slot));
    let proxSlot = 1;
    for (let i = 1; i <= 6; i++) { if (!ocupados.has(i)) { proxSlot = i; break; } }
    const novoSlot = { ...standby, slot: proxSlot };
    delete novoSlot.expiraEm; // limpar campo de standby
    const novoTeam = [...team, novoSlot];
    novoTeam.sort((a, b) => a.slot - b.slot);
    await updateDoc(doc(_db, 'usuarios', _userId), {
      raidTeam: JSON.parse(JSON.stringify(novoTeam)),
      raidStandby: deleteField()
    });
    _userData.raidTeam = novoTeam;
    delete _userData.raidStandby;
    mostrarToast(capitalizar(standby.pokemon) + ' joined your team! 🎉', '⚔️', true);
    renderizarBossRaid();
  } catch(e) { console.error('[standby] erro ao promover:', e); }
}

function renderBagGrid(container) {
  const bag  = _userData?.raidBag || {};
  const grid = container ? container.querySelector('#raidBagGrid') : document.getElementById('raidBagGrid');
  if (!grid) return;

  const comQtd = BAG_ITENS_ORDEM.filter(k => (bag[k] || 0) > 0);
  if (comQtd.length === 0) {
    grid.innerHTML = '<p class="raid-bag-vazia">Your bag is empty.</p>';
    return;
  }

  grid.innerHTML = comQtd.map(key => {
    const item = ITEMS_DB[key];
    if (!item) return '';
    const qty    = bag[key] || 0;
    const usavel = item.usableIn === 'both';
    return '<div class="raid-bag-item' + (usavel ? ' usavel' : '') + '" data-item="' + key + '">'
      + '<img src="' + item.img + '" alt="' + item.name + '" class="raid-bag-img">'
      + '<span class="raid-bag-nome">' + item.name + '</span>'
      + '<span class="raid-bag-qty">x' + qty + '</span>'
      + '</div>';
  }).join('');

  grid.querySelectorAll('.raid-bag-item.usavel').forEach(el => {
    el.addEventListener('click', () => abrirUsarItem(el.dataset.item));
  });
  grid.querySelectorAll('.raid-bag-item').forEach(el => {
    el.addEventListener('contextmenu', e => { e.preventDefault(); abrirInfoItem(el.dataset.item); });
  });

  // fechar modais
  document.getElementById('btnFecharItemModal')?.addEventListener('click', () => {
    document.getElementById('raidItemModal').style.display = 'none';
  });
  document.getElementById('btnFecharUsarItemModal')?.addEventListener('click', () => {
    document.getElementById('raidUsarItemModal').style.display = 'none';
  });
}

// ── Ether: seletor de golpe após escolher o pokemon ─────────────
function abrirEtherMoveSelect(itemKey, slotIdx) {
  const team = _userData?.raidTeam || [];
  const slot = team[slotIdx];
  if (!slot) return;

  // Remover modal anterior se existir
  document.getElementById('etherMoveModal')?.remove();

  const golpes = slot.golpes || [];
  const ppAtual = slot.ppAtual || {};

  const slotsHTML = golpes.map((gk, i) => {
    const move = MOVES_DB[gk];
    if (!move) return '';
    const ppMax  = move.pp || 10;
    const ppNow  = ppAtual[gk] !== undefined ? ppAtual[gk] : ppMax;
    const cheio  = ppNow >= ppMax;
    const pct    = Math.max(0, Math.round(ppNow / ppMax * 100));
    const cor    = pct > 50 ? '#2ecc71' : pct > 20 ? '#f8d030' : '#e74c3c';
    const TIPO_CORES_LOCAL = {
      normal:'#aaa',water:'#6390f0',fire:'#ee8130',grass:'#7ac74c',
      electric:'#f7d02c',ice:'#96d9d6',fighting:'#c22e28',poison:'#a33ea1',
      ground:'#e2bf65',flying:'#a98ff3',psychic:'#f95587',bug:'#a6b91a',
      rock:'#b6a136',ghost:'#735797',dragon:'#6f35fc',dark:'#705746',
      steel:'#b7b7ce',fairy:'#d685ad'
    };
    const tipoCor = TIPO_CORES_LOCAL[move.type] || '#888';
    return '<div class="ether-move-slot' + (cheio ? ' ether-full' : '') + '" data-move="' + gk + '" data-idx="' + i + '">'
      + '<div class="ether-move-left">'
      + '<span class="ether-move-type" style="background:' + tipoCor + '">' + (move.type||'?').toUpperCase() + '</span>'
      + '<span class="ether-move-nome">' + move.name + '</span>'
      + '</div>'
      + '<div class="ether-move-pp">'
      + '<div class="ether-pp-bar"><div class="ether-pp-fill" style="width:' + pct + '%;background:' + cor + '"></div></div>'
      + '<span class="ether-pp-num" style="color:' + cor + '">' + ppNow + ' / ' + ppMax + ' PP</span>'
      + (cheio ? '<span class="ether-full-tag">FULL</span>' : '<span class="ether-restore-tag">+20</span>')
      + '</div>'
      + '</div>';
  }).join('');

  const modal = document.createElement('div');
  modal.id = 'etherMoveModal';
  modal.className = 'ether-modal-overlay';
  modal.innerHTML =
    '<div class="ether-modal-box">'
    + '<div class="ether-modal-header">'
    + '<span class="ether-modal-titulo">Ether — Choose a Move</span>'
    + '<span class="ether-modal-sub">Restores +20 PP to the selected move</span>'
    + '</div>'
    + '<div class="ether-move-lista">' + slotsHTML + '</div>'
    + '<button class="ether-cancel-btn" id="etherCancelBtn">Cancel</button>'
    + '</div>';
  document.body.appendChild(modal);

  document.getElementById('etherCancelBtn')?.addEventListener('click', () => modal.remove());
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });

  modal.querySelectorAll('.ether-move-slot:not(.ether-full)').forEach(el => {
    el.addEventListener('click', async () => {
      modal.remove();
      const moveKey = el.dataset.move;
      await usarItemNoPokemon(itemKey, slotIdx, moveKey);
    });
  });
}

function abrirInfoItem(key) {
  const item  = ITEMS_DB[key];
  const modal = document.getElementById('raidItemModal');
  const body  = document.getElementById('raidItemModalBody');
  if (!item || !modal || !body) return;
  const qty   = (_userData?.raidBag || {})[key] || 0;
  const catMap = { ball:'Poke Ball', heal:'Medicine', revive:'Revive' };
  const useMap = { battle:'Battle only', both:'Field & Battle' };
  body.innerHTML =
    '<div class="iinfo-wrap">'
    + '<img src="' + item.img + '" class="iinfo-img" onerror="this.style.opacity=0">'
    + '<h3 class="iinfo-nome">' + item.name + '</h3>'
    + '<span class="iinfo-cat">' + (catMap[item.category] || 'Item') + '</span>'
    + '<p class="iinfo-desc">' + item.desc + '</p>'
    + '<div class="iinfo-footer">'
    + '<span class="iinfo-uso">' + (useMap[item.usableIn] || '') + '</span>'
    + '<span class="iinfo-qty">Qty: <b>' + qty + '</b></span>'
    + '</div>'
    + '</div>';
  modal.style.display = 'flex';
}

function abrirUsarItem(key) {
  const item  = ITEMS_DB[key];
  const modal = document.getElementById('raidUsarItemModal');
  const body  = document.getElementById('raidUsarItemBody');
  if (!item || !modal || !body) return;
  const team = _userData?.raidTeam || [];
  if (!team.length) { alert('No Pokemon in your team!'); return; }

  body.innerHTML =
    '<div class="iusar-wrap">'
    + '<p class="iusar-titulo">Use <b>' + item.name + '</b> on which Pokemon?</p>'
    + '<div class="iusar-lista">'
    + team.map((s, i) => {
        if (!s) return '';
        const st      = calcularStats(s.pokemon, s.ivs||{}, s.nivel||1, s.nature||'Hardy', s.evs||{});
        const hpAtual = typeof s.hpAtual === 'number' ? s.hpAtual : st.hp;
        const fainted = hpAtual <= 0;
        const pct     = Math.max(0, Math.min(100, Math.floor(hpAtual / st.hp * 100)));
        const col     = pct > 50 ? '#2ecc71' : pct > 20 ? '#f39c12' : '#e74c3c';
        const ef      = item.effect;
        // Ether: pode usar se algum golpe tiver PP < max
        const temPPGasto = (ef?.type === 'restorepp') && (s.golpes||[]).some(gk => {
          const mv = MOVES_DB[gk];
          if (!mv) return false;
          const pp = s.ppAtual?.[gk] !== undefined ? s.ppAtual[gk] : mv.pp;
          return pp < mv.pp;
        });
        const canUse  = (ef?.type === 'heal' && !fainted && hpAtual < st.hp)
                     || (ef?.type === 'revive' && fainted)
                     || (ef?.type === 'fullrestore' && (hpAtual < st.hp || fainted))
                     || temPPGasto;
        return '<div class="iusar-slot' + (canUse ? '' : ' nao-pode') + '" data-idx="' + i + '">'
          + '<img src="../perfil/img-pokeicon/' + s.pokemon + '.png" class="iusar-img">'
          + '<div class="iusar-info">'
          + '<span class="iusar-nome">' + capitalizar(s.pokemon)
          + (fainted ? ' <span class="fainted-tag">FAINTED</span>' : '') + '</span>'
          + '<div class="iusar-hpbar"><div class="iusar-hpfill" style="width:' + pct + '%;background:' + col + '"></div></div>'
          + '<span class="iusar-hpnum">' + hpAtual + ' / ' + st.hp + ' HP</span>'
          + '</div>'
          + '</div>';
    }).join('')
    + '</div></div>';

  modal.style.display = 'flex';
  body.querySelectorAll('.iusar-slot:not(.nao-pode)').forEach(el => {
    el.addEventListener('click', async () => {
      modal.style.display = 'none';
      const slotIdx = parseInt(el.dataset.idx);
      if (item.effect?.type === 'restorepp') {
        // Ether: mostrar seletor de golpe antes de usar
        abrirEtherMoveSelect(key, slotIdx);
      } else {
        await usarItemNoPokemon(key, slotIdx);
      }
    });
  });
}

// ============================================================
// MODAL DE STATUS — layout 3 colunas
// ============================================================
function abrirModalStatus(slot) {
  // ── Dados base ──────────────────────────────────────────────
  const ivs = (slot.ivs && typeof slot.ivs === 'object') ? {
    hp:  typeof slot.ivs.hp  === 'number' ? slot.ivs.hp  : 0,
    atk: typeof slot.ivs.atk === 'number' ? slot.ivs.atk : 0,
    def: typeof slot.ivs.def === 'number' ? slot.ivs.def : 0,
    spa: typeof slot.ivs.spa === 'number' ? slot.ivs.spa : 0,
    spd: typeof slot.ivs.spd === 'number' ? slot.ivs.spd : 0,
    spe: typeof slot.ivs.spe === 'number' ? slot.ivs.spe : 0,
  } : gerarIVsAleatorios();

  const evsSalvos = (slot.evs && typeof slot.evs === 'object') ? {
    hp:  typeof slot.evs.hp  === 'number' ? slot.evs.hp  : 0,
    atk: typeof slot.evs.atk === 'number' ? slot.evs.atk : 0,
    def: typeof slot.evs.def === 'number' ? slot.evs.def : 0,
    spa: typeof slot.evs.spa === 'number' ? slot.evs.spa : 0,
    spd: typeof slot.evs.spd === 'number' ? slot.evs.spd : 0,
    spe: typeof slot.evs.spe === 'number' ? slot.evs.spe : 0,
  } : { hp:0, atk:0, def:0, spa:0, spd:0, spe:0 };
  const evsTemp = { ...evsSalvos };
  const evPointsSalvos = typeof slot.evPoints === 'number' ? slot.evPoints : 0;

  const nature    = slot.nature   || 'Hardy';
  const nivel     = slot.nivel    || 1;
  const xpAtual   = slot.xp      || 0;

  // HP atual: usar hpAtual (absoluto da última batalha), depois hpPct, depois HP cheio
  const statsHp  = calcularStats(slot.pokemon, ivs, nivel, nature, evsSalvos);
  const hpMaxC   = statsHp.hp;
  const hpAtualC = typeof slot.hpAtual === 'number' && slot.hpAtual > 0
    ? Math.min(slot.hpAtual, hpMaxC)          // valor absoluto salvo
    : slot.hpPct !== undefined
      ? Math.max(1, Math.floor(hpMaxC * slot.hpPct)) // percentual salvo
      : hpMaxC; // HP cheio se nunca batalhou
  const xpProx    = xpParaNivel(nivel + 1);
  const pctXP     = Math.min(100, Math.floor((xpAtual / xpProx) * 100));
  const lealdade  = slot.lealdade || 0;
  const pctLeal   = Math.min(100, Math.floor((lealdade / 255) * 100));
  const hpPctBar  = hpMaxC > 0 ? Math.max(0, hpAtualC / hpMaxC * 100) : 0;
  const hpBarCls  = hpPctBar > 50 ? 'hp-ok' : hpPctBar > 20 ? 'hp-low' : 'hp-critical';
  // Se ability nao salva ainda, gera e persiste (fix reload bug)
  let ability = slot.ability || null;
  if (!ability) {
    ability = gerarAbility(slot.pokemon);
    slot.ability = ability;
    (async () => {
      try {
        const { doc, updateDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
        const raidTeam = (_userData.raidTeam || []).map(s =>
          s.slot === slot.slot ? { ...s, ability } : s
        );
        await updateDoc(doc(_db, 'usuarios', _userId), { raidTeam: JSON.parse(JSON.stringify(raidTeam)) });
        _userData.raidTeam = raidTeam;
        console.log('[BossRaid] Ability fixada:', ability);
      } catch(e) { console.error('[BossRaid] Erro ability:', e); }
    })();
  }
  const abilityData = getAbilityData(ability);
  // Verificar hidden em POKEMON_ABILITIES e EVOLUTION_ABILITIES
  const _entryAbil  = POKEMON_ABILITIES[slot.pokemon] || EVOLUTION_ABILITIES[slot.pokemon] || {};
  const hiddenKey   = _entryAbil.hidden;
  // isHidden: ability é a hidden desta forma (não considerar hiddenLineage aqui —
  // hiddenLineage = ainda não resolvida, metapod tem ability normal temporariamente)
  const isHidden    = hiddenKey && ability === hiddenKey && !_entryAbil.noHidden;
  const nat         = NATURES[nature] || { up: null, down: null };
  const stats       = calcularStats(slot.pokemon, ivs, nivel, nature, evsSalvos);
  const isNeutral   = !nat.up && !nat.down;
  // Para formas evoluídas, EVOLUTION_TIPOS tem prioridade
  const tipos = EVOLUTION_TIPOS[slot.pokemon] || POKEMON_TIPOS[slot.pokemon] || ['normal'];
  const { fraco, resiste, imune } = calcularEfetividades(tipos);
  const golpes      = (() => {
    const raw = slot.golpes;
    if (!Array.isArray(raw)) return inicializarGolpes(slot.pokemon, nivel);
    // Normalizar: aceitar tanto string quanto objeto {move:'tackle',...}
    return raw.map(g => typeof g === 'string' ? g : (g?.move || null)).filter(Boolean);
  })();

  // ── Nature desc ─────────────────────────────────────────────
  let natureDesc = '';
  if (isNeutral) {
    natureDesc = '<span class="nature-neutro">Neutral</span>';
  } else {
    natureDesc = '<span class="nature-up">\u2191 ' + STAT_LABELS[nat.up] + '</span>'
               + '<span class="nature-sep"> / </span>'
               + '<span class="nature-down">\u2193 ' + STAT_LABELS[nat.down] + '</span>';
  }

  // ── Linhas stats ─────────────────────────────────────────────
  const linhas = [
    { key:'hp',  label:'HP',     stat:stats.hp,  iv:ivs.hp,  isHP:true  },
    { key:'atk', label:'Atk',    stat:stats.atk, iv:ivs.atk, isHP:false },
    { key:'def', label:'Def',    stat:stats.def, iv:ivs.def, isHP:false },
    { key:'spa', label:'Sp.Atk', stat:stats.spa, iv:ivs.spa, isHP:false },
    { key:'spd', label:'Sp.Def', stat:stats.spd, iv:ivs.spd, isHP:false },
    { key:'spe', label:'Spd',    stat:stats.spe, iv:ivs.spe, isHP:false },
  ];

  function statComEv(key) {
    return calcularStats(slot.pokemon, ivs, nivel, nature, evsTemp)[key];
  }

  function renderLinhasEV() {
    const totalSalvo = Object.values(evsSalvos).reduce((a,b)=>a+b,0);
    const totalTemp  = Object.values(evsTemp).reduce((a,b)=>a+b,0);
    const pontosRestantes = evPointsSalvos - (totalTemp - totalSalvo);
    return linhas.map(l => {
      let natTag = '';
      if (!l.isHP && nat.up   === l.key) natTag = '<span class="nat-up">\u25b2</span>';
      if (!l.isHP && nat.down === l.key) natTag = '<span class="nat-down">\u25bc</span>';
      const ivCls = l.iv === 31 ? 'iv-max' : '';
      const evVal = evsTemp[l.key] || 0;
      const evCls = evVal > 0 ? 'ev-com-valor' : '';
      const temPontos   = evPointsSalvos > 0;
      const podeAumentar = temPontos && pontosRestantes > 0 && evVal < 252 && totalTemp < 510;
      const podeDiminuir = evVal > evsSalvos[l.key];
      const statBase     = l.stat;   // valor sem EVs temp
      const statAtual    = statComEv(l.key); // valor com EVs temp
      const statDiff     = statAtual - statBase;
      // Tag verde "+X" se houver ganho real vs. base salva
      const statDiffTag  = statDiff > 0
        ? '<span class="ev-stat-gain">+' + statDiff + '</span>'
        : '';
      const minusBtn = podeDiminuir
        ? '<button class="ev-btn ev-btn-minus" data-key="' + l.key + '">−</button>'
        : '<span class="ev-btn-placeholder"></span>';
      const plusBtn  = podeAumentar
        ? '<button class="ev-btn ev-btn-plus" data-key="' + l.key + '">+</button>'
        : '<span class="ev-btn-placeholder"></span>';
      return '<tr>'
        + '<td class="iv-col-label">' + l.label + '</td>'
        + '<td class="iv-col-stat" data-key="' + l.key + '">' + statAtual + statDiffTag + '</td>'
        + '<td class="iv-col-valor ' + ivCls + '">' + l.iv + '</td>'
        + '<td class="iv-col-nature">' + natTag + '</td>'
        + '<td class="ev-col ' + evCls + '">'
        + minusBtn
        + '<span class="ev-val">' + evVal + '</span>'
        + plusBtn
        + '</td>'
        + '</tr>';
    }).join('');
  }

  const linhasHTML = renderLinhasEV();

  // ── Type matchups HTML ───────────────────────────────────────
  const fracoHTML = fraco.length
    ? '<div class="raid-efet-grupo"><span class="raid-efet-label fraco-label">Weak to</span><div class="raid-efet-badges">'
      + fraco.map(f => '<span class="tipo-badge tipo-badge-efet" style="background:' + (TIPO_CORES[f.tipo]||'#888') + '">'
        + f.tipo.toUpperCase() + (f.mult===4?' <b>\u00d74</b>':'') + '</span>').join('')
      + '</div></div>' : '';
  const resisteHTML = resiste.length
    ? '<div class="raid-efet-grupo"><span class="raid-efet-label resiste-label">Resists</span><div class="raid-efet-badges">'
      + resiste.map(r => '<span class="tipo-badge tipo-badge-efet tipo-badge-resiste" style="border-color:' + (TIPO_CORES[r.tipo]||'#888') + ';color:' + (TIPO_CORES[r.tipo]||'#888') + '">'
        + r.tipo.toUpperCase() + (r.mult===0.25?' <b>\u00d7\u00bc</b>':'') + '</span>').join('')
      + '</div></div>' : '';
  const imuneHTML = imune.length
    ? '<div class="raid-efet-grupo"><span class="raid-efet-label imune-label">Immune</span><div class="raid-efet-badges">'
      + imune.map(i => '<span class="tipo-badge tipo-badge-efet tipo-badge-imune" style="border-color:' + (TIPO_CORES[i]||'#888') + ';color:' + (TIPO_CORES[i]||'#888') + '">'
        + i.toUpperCase() + '</span>').join('')
      + '</div></div>' : '';

  // ── Golpes HTML ──────────────────────────────────────────────
  const golpeCards = Array(4).fill(null).map((_,i) => {
    const key  = golpes[i];
    const move = key ? MOVES_DB[key] : null;
    if (!move) return '<div class="raid-golpe-slot vazio"><span class="golpe-vazio-txt">\u2014 Empty \u2014</span></div>';
    const cor     = TIPO_CORES[move.type] || '#888';
    const catIcon = move.category === 'physical' ? '\u2694\ufe0f' : move.category === 'special' ? '\u2728' : '\ud83d\udd35';
    const isStab  = ((EVOLUTION_TIPOS[slot.pokemon]||POKEMON_TIPOS[slot.pokemon]||[])).includes(move.type);
    const pwrTag  = move.power
      ? '<span class="golpe-power">PWR <b>' + move.power + '</b></span>'
      : '<span class="golpe-power status-move">Status</span>';
    const accTag  = '<span class="golpe-acc">ACC <b>' + (move.accuracy ? move.accuracy+'%' : '\u2014') + '</b></span>';
    // Mostrar PP atual/máximo — persistido em slot.ppAtual após batalhas
    const ppMax   = move.pp || 10;
    const ppAtual = slot.ppAtual ? (slot.ppAtual[key] !== undefined ? slot.ppAtual[key] : ppMax) : ppMax;
    const ppGasto = ppMax - ppAtual;
    const ppCls   = ppGasto > 0 ? 'pp-gasto' : '';
    const ppTag   = ppGasto > 0
      ? '<span class="golpe-pp ' + ppCls + '">PP <b>' + ppAtual + '/' + ppMax + '</b></span>'
      : '<span class="golpe-pp">PP <b>' + ppMax + '</b></span>';
    const catTag  = move.category === 'physical'
      ? '<span class="golpe-cat-tag golpe-cat-physical">PHY</span>'
      : move.category === 'special'
        ? '<span class="golpe-cat-tag golpe-cat-special">SPC</span>'
        : '';
    return '<div class="raid-golpe-slot" style="border-color:' + cor + '33;background:linear-gradient(135deg,' + cor + '15,transparent)">'
      + '<div class="golpe-header">'
      + '<span class="golpe-tipo-badge" style="background:' + cor + '">' + move.type.toUpperCase() + '</span>'
      + '<span class="golpe-nome">' + move.name + '</span>'
      + '<span class="golpe-cat">' + catIcon + '</span>'
      + (isStab ? '<span class="golpe-stab">STAB</span>' : '')
      + '</div>'
      + '<p class="golpe-desc">' + move.desc + '</p>'
      + '<div class="golpe-stats-row">' + pwrTag + accTag + ppTag + catTag + '</div>'
      + '</div>';
  }).join('');

  // ── Montar layout 3 colunas ──────────────────────────────────
  document.getElementById('raidStatusBody').innerHTML =
    '<div class="raid-status-3col">'

    // ══ COLUNA 1 — Pokémon + info base ══
    + '<div class="raid-col raid-col-info">'
    + '<div class="raid-status-header">'
    + '<img src="' + (slot.shiny ? '../perfil/img-shiny/'+slot.pokemon+'.png' : '../perfil/img-pokeicon/'+slot.pokemon+'.png') + '" alt="' + slot.pokemon + '" class="raid-status-img" onerror="this.src=\'../estatisticas-shad/images/backgrounds/pikachu-left-bg.png\'">'
    + '<h3 class="raid-status-nome">' + capitalizar(slot.pokemon) + (slot.shiny ? ' <span style="color:#ffe033;font-size:0.8rem">✨</span>' : '') + '</h3>'
    + '<div class="raid-status-tipos">' + renderTipoBadges(tipos) + '</div>'
    + '<p class="raid-status-nivel">Level ' + nivel + '</p>'
    + '</div>'
    // HP atual
    + '<div class="raid-status-barra-wrap">'
    + '<div class="raid-status-barra-label"><span>❤️ HP</span><span>' + hpAtualC + ' / ' + hpMaxC + '</span></div>'
    + '<div class="raid-status-barra"><div class="raid-status-barra-fill ' + hpBarCls + '" style="width:' + hpPctBar.toFixed(1) + '%"></div></div>'
    + '</div>'
    // Loyalty
    + '<div class="raid-status-barra-wrap">'
    + '<div class="raid-status-barra-label"><span>\u2764\ufe0f Loyalty</span><span>' + lealdade + ' / 255</span></div>'
    + '<div class="raid-status-barra"><div class="raid-status-barra-fill lealdade" style="width:' + pctLeal + '%"></div></div>'
    + '</div>'
    // XP
    + '<div class="raid-status-barra-wrap">'
    + '<div class="raid-status-barra-label"><span>\u2b50 XP</span><span>' + xpAtual + ' / ' + xpProx + '</span></div>'
    + '<div class="raid-status-barra"><div class="raid-status-barra-fill xp" style="width:' + pctXP + '%"></div></div>'
    + '</div>'
    // Nature
    + '<div class="raid-nature-wrap">'
    + '<span class="raid-nature-label">\ud83c\udf3f Nature:</span>'
    + '<span class="raid-nature-nome">' + nature + '</span>'
    + '<span class="raid-nature-efeito">' + natureDesc + '</span>'
    + '</div>'
    // Ability
    + '<div class="raid-nature-wrap raid-ability-wrap" data-tooltip="' + abilityData.desc + '">'
    + '<span class="raid-nature-label">\u26a1 Ability:</span>'
    + '<span class="raid-nature-nome ability-nome' + (isHidden ? ' ability-hidden' : '') + '">' + abilityData.name + '</span>'
    + '<span class="raid-nature-efeito ability-desc">' + (isHidden ? '\u2605 Hidden' : '') + '</span>'
    + '</div>'
    // Type matchups
    + '<div class="raid-efet-titulo">Type Matchups</div>'
    + fracoHTML + resisteHTML + imuneHTML
    + '</div>'

    // ══ COLUNA 2 — Stats & IVs ══
    + '<div class="raid-col raid-col-stats">'
    + '<div class="raid-status-iv-titulo">Stats & IVs</div>'
    + '<table class="raid-iv-tabela">'
    + '<thead><tr><th>Stat</th><th class="th-center">Value</th><th class="th-center">IV</th><th class="th-center">Nat</th><th class="th-center ev-th">EV</th></tr></thead>'
    + '<tbody>' + linhasHTML + '</tbody>'
    + '</table>'
    + '<div class="ev-rodape" id="evRodape">'
    + '<span class="ev-rodape-label">✨ EV Points:</span>'
    + '<span class="ev-rodape-val" id="evPontosDisplay">' + evPointsSalvos + '</span>'
    + (evPointsSalvos > 0 ? '<button class="ev-confirmar-btn" id="btnConfirmarEV">Confirm EVs</button>' : '')
    + '</div>'
    // Linha evolutiva abaixo dos EV Points, col-2
    + renderLinhaEvolutiva(slot.pokemon)
    + (() => {
        // Data de captura — usa capturedAt (timestamp ms) ou addedAt (ISO string)
        let dtStr = '';
        if (slot.capturedAt) {
          const d = new Date(slot.capturedAt);
          dtStr = d.toLocaleDateString('pt-BR', { day:'2-digit', month:'2-digit', year:'numeric' })
                + ' ' + d.toLocaleTimeString('pt-BR', { hour:'2-digit', minute:'2-digit' });
        } else if (slot.addedAt) {
          const d = new Date(slot.addedAt);
          dtStr = d.toLocaleDateString('pt-BR', { day:'2-digit', month:'2-digit', year:'numeric' })
                + ' ' + d.toLocaleTimeString('pt-BR', { hour:'2-digit', minute:'2-digit' });
        }
        return dtStr
          ? '<div class="raid-captured-date">📅 Captured: ' + dtStr + '</div>'
          : '';
      })()
    + '</div>'

    // ══ COLUNA 3 — Moves ══
    + '<div class="raid-col raid-col-moves">'
    + '<div class="raid-efet-titulo">Moves</div>'
    + (slot.pendingMove ? (() => {
        const pm = slot.pendingMove;
        const pmName = pm.replace(/_/g,' ').replace(/\b\w/g, l => l.toUpperCase());
        return '<div class="pending-move-banner">🎓 Waiting to learn <b>' + pmName + '</b>!<br><span style="font-size:0.65rem;color:#aaa">Start a battle to choose which move to replace.</span></div>';
      })() : '')
    + '<div class="raid-golpes-grid">' + golpeCards + '</div>'
    // Daily Missions — abaixo dos golpes na col-3
    + renderMissoesNoModal(slot)
    + '</div>'

    + '</div>'; // fecha .raid-status-3col

  document.getElementById('raidModalStatus').classList.add('show');

  // ── Setas de navegação entre pokémons ───────────────────────
  const teamNav    = _userData?.raidTeam || [];
  const idxAtual   = teamNav.findIndex(s => s.slot === slot.slot);
  const idxPrev    = idxAtual - 1;
  const idxNext    = idxAtual + 1;
  const slotPrev   = teamNav[idxPrev] || null;
  const slotNext   = teamNav[idxNext] || null;
  const modalEl    = document.getElementById('raidModalStatus');

  // Remover setas antigas se houver
  modalEl.querySelectorAll('.raid-nav-arrow').forEach(el => el.remove());

  if (slotPrev) {
    const btnL = document.createElement('button');
    btnL.className = 'raid-nav-arrow raid-nav-left';
    btnL.innerHTML = '&#8592;';
    btnL.title     = capitalizar(slotPrev.pokemon);
    btnL.addEventListener('click', () => abrirModalStatus(slotPrev));
    modalEl.appendChild(btnL);
  }
  if (slotNext) {
    const btnR = document.createElement('button');
    btnR.className = 'raid-nav-arrow raid-nav-right';
    btnR.innerHTML = '&#8594;';
    btnR.title     = capitalizar(slotNext.pokemon);
    btnR.addEventListener('click', () => abrirModalStatus(slotNext));
    modalEl.appendChild(btnR);
  }

  // Verificar e exibir botão de evolução se disponível
  const col1 = document.querySelector('#raidStatusBody .raid-col-info');
  if (col1) checarBotaoEvolucao(slot, col1);

  // ── Botão DELETAR (apenas quando há 2+ pokémons) ────────────────
  const teamAtual = _userData?.raidTeam || [];
  if (teamAtual.length >= 2 && col1) {
    const btnDel = document.createElement('button');
    btnDel.className = 'release-btn';
    btnDel.innerHTML = '🗑️ Release';
    btnDel.title = 'Release this Pokémon (cannot be undone)';
    btnDel.addEventListener('click', async () => {
      // Usar modal de confirmação interno em vez do confirm() nativo
      const confirmado = await mostrarConfirmacaoToast(
        `Release ${capitalizar(slot.pokemon)}?`,
        'This cannot be undone. Your team must have at least 1 Pokémon.'
      );
      if (!confirmado) return;
      btnDel.disabled = true;
      btnDel.textContent = 'Releasing...';
      try {
        const { doc, updateDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
        const novoTeam = (_userData.raidTeam || []).filter(s => s.slot !== slot.slot);
        // Re-numerar slots: 1, 2, 3... em ordem
        novoTeam.sort((a,b) => a.slot - b.slot);
        novoTeam.forEach((s, i) => { s.slot = i + 1; });
        await updateDoc(doc(_db, 'usuarios', _userId), { raidTeam: JSON.parse(JSON.stringify(novoTeam)) });
        _userData.raidTeam = novoTeam;
        document.getElementById('raidModalStatus')?.classList.remove('show');
        mostrarToast('Released ' + capitalizar(slot.pokemon), '👋', false);
        // Se havia pokémon em stand-by, promovê-lo automaticamente
        await _promoverStandby();
        renderizarBossRaid();
      } catch(err) {
        console.error('[BossRaid] Erro ao liberar pokémon:', err);
        btnDel.disabled = false;
        btnDel.textContent = '🗑️ Release';
      }
    });
    col1.appendChild(btnDel);
  }

  // Listeners dos botoes Start de missao
  document.querySelectorAll('.missao-start-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key    = btn.dataset.missao;
      const slotN  = parseInt(btn.dataset.slot) || 1;
      iniciarQuest(key, slotN);
    });
  });

  function atualizarEVUI() {
    const totalSalvo = Object.values(evsSalvos).reduce((a,b)=>a+b,0);
    const totalTemp  = Object.values(evsTemp).reduce((a,b)=>a+b,0);
    const pontosGastos    = totalTemp - totalSalvo;
    const pontosRestantes = evPointsSalvos - pontosGastos;
    const houveMudanca    = pontosGastos > 0;
    const dispEl = document.getElementById('evPontosDisplay');
    if (dispEl) dispEl.textContent = pontosRestantes;
    const rodape = document.getElementById('evRodape');
    if (rodape) {
      let btn = document.getElementById('btnConfirmarEV');
      if (houveMudanca && !btn) {
        btn = document.createElement('button');
        btn.id = 'btnConfirmarEV'; btn.className = 'ev-confirmar-btn'; btn.textContent = 'Confirm EVs';
        rodape.appendChild(btn);
        btn.addEventListener('click', confirmarEVs);
      } else if (!houveMudanca && btn) { btn.remove(); }
    }
    const tbody = document.querySelector('.raid-iv-tabela tbody');
    if (tbody) tbody.innerHTML = renderLinhasEV();
    anexarListenersEV();
  }

  function anexarListenersEV() {
    document.querySelectorAll('.ev-btn-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        const totalSalvo = Object.values(evsSalvos).reduce((a,b)=>a+b,0);
        const totalTemp  = Object.values(evsTemp).reduce((a,b)=>a+b,0);
        if (evPointsSalvos - (totalTemp - totalSalvo) > 0 && evsTemp[key] < 252 && totalTemp < 510) {
          evsTemp[key] = Math.min(252, evsTemp[key] + 1); atualizarEVUI();
        }
      });
    });
    document.querySelectorAll('.ev-btn-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        if (evsTemp[key] > evsSalvos[key]) { evsTemp[key] = Math.max(evsSalvos[key], evsTemp[key] - 1); atualizarEVUI(); }
      });
    });
  }

  async function confirmarEVs() {
    const totalSalvo = Object.values(evsSalvos).reduce((a,b)=>a+b,0);
    const totalTemp  = Object.values(evsTemp).reduce((a,b)=>a+b,0);
    const novosEvPoints = evPointsSalvos - (totalTemp - totalSalvo);
    slot.evs = { ...evsTemp }; slot.evPoints = novosEvPoints;
    try {
      const { doc, updateDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
      const raidTeam = (_userData.raidTeam || []).map(s =>
        s.slot === slot.slot ? { ...s, evs: { ...evsTemp }, evPoints: novosEvPoints } : s
      );
      await updateDoc(doc(_db, 'usuarios', _userId), { raidTeam: JSON.parse(JSON.stringify(raidTeam)) });
      _userData.raidTeam = raidTeam;
      const btn = document.getElementById('btnConfirmarEV');
      if (btn) { btn.textContent = '✓ Saved!'; btn.disabled = true; btn.style.background = '#27ae60'; btn.style.borderColor = '#27ae60'; }
      const dispEl = document.getElementById('evPontosDisplay');
      if (dispEl) dispEl.textContent = novosEvPoints;
      Object.keys(evsTemp).forEach(k => { evsSalvos[k] = evsTemp[k]; });
      const tbody = document.querySelector('.raid-iv-tabela tbody');
      if (tbody) tbody.innerHTML = renderLinhasEV();
      anexarListenersEV();
    } catch(err) { console.error('[BossRaid] Erro EVs:', err); alert('❌ Error saving EVs.'); }
  }

  if (evPointsSalvos > 0) {
    anexarListenersEV();
    document.getElementById('btnConfirmarEV')?.addEventListener('click', confirmarEVs);
  }
}

// ============================================================
// FIRESTORE
// ============================================================
async function salvarRaidStatus(status) {
  const { doc, updateDoc, setDoc, getDoc } = await import("https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js");
  const ref  = doc(_db, "usuarios", _userId);
  const snap = await getDoc(ref);
  if (snap.exists()) await updateDoc(ref, { raidStatus: status });
  else               await setDoc(ref, { raidStatus: status });
}

async function salvarSorteio(sorteados) {
  const { doc, updateDoc } = await import("https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js");
  await updateDoc(doc(_db, "usuarios", _userId), { raidSorteio: sorteados });
}

async function salvarPrimeiroPokeRaid(slot, bag) {
  const { doc, updateDoc, setDoc, getDoc } = await import("https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js");
  const ref  = doc(_db, "usuarios", _userId);
  const snap = await getDoc(ref);

  // JSON round-trip garante serialização limpa — sem proxies, sem campos undefined
  const slotLimpo = JSON.parse(JSON.stringify(slot));

  const pokedexAtual = Array.from(new Set([...((_userData && _userData.pokedex) || []), slotLimpo.pokemon]));

  const data = {
    raidStatus:    'active',
    raidTeam:      [slotLimpo],
    raidBag:       bag ? JSON.parse(JSON.stringify(bag)) : {},
    pokedex:       pokedexAtual,
    raidUpdatedAt: new Date().toISOString()
  };

  if (snap.exists()) await updateDoc(ref, data);
  else               await setDoc(ref, data);
  console.log('[BossRaid] Boss salvo no Firebase:', slotLimpo);
}

// ============================================================
// UTILS
// ============================================================
function capitalizar(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}