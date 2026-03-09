// ============================================================
// POKEMON-MOVES.JS
// Base de golpes, learnsets por nível e fórmula de dano
//
// FÓRMULA OFICIAL Gen 6+ (Bulbapedia):
//   Damage = floor(floor(floor(2*L/5+2) * A * P / D) / 50 + 2)
//            * STAB * TypeEff * random(0.85–1.00)
//
//   L    = nível do atacante
//   A    = Atk ou Sp.Atk do atacante (depende da categoria do golpe)
//   D    = Def ou Sp.Def do defensor (depende da categoria do golpe)
//   P    = Power do golpe
//   STAB = 1.5 se o tipo do golpe == tipo do pokémon atacante, senão 1.0
//   TypeEff = multiplicador de tipo (0 / 0.25 / 0.5 / 1 / 2 / 4)
//   random  = número aleatório entre 0.85 e 1.00 (simulando variação de dano)
// ============================================================

// ============================================================
// BASE DE GOLPES
// Campos:
//   name      — nome do golpe
//   type      — tipo do golpe
//   category  — 'physical' | 'special' | 'status'
//   power     — poder base (null = sem dano direto)
//   accuracy  — % de acerto (null = nunca erra)
//   pp        — pontos de poder (usos)
//   desc      — descrição curta
// ============================================================
export const MOVES_DB = {

  // ── NORMAL ────────────────────────────────────────────────
  tackle:       { name:'Tackle',       type:'normal',   category:'physical', power:40,  accuracy:100, pp:35, desc:'A full-body charge attack.' },
  scratch:      { name:'Scratch',      type:'normal',   category:'physical', power:40,  accuracy:100, pp:35, desc:'Hard, pointed claws tear the foe.' },
  pound:        { name:'Pound',        type:'normal',   category:'physical', power:40,  accuracy:100, pp:35, desc:'Pounds with a long tail or arms.' },
  growl:        { name:'Growl',        type:'normal',   category:'status',   power:null,accuracy:100, pp:40, desc:'Lowers opponent\'s Attack by 1.' },
  tail_whip:    { name:'Tail Whip',    type:'normal',   category:'status',   power:null,accuracy:100, pp:30, desc:'Lowers opponent\'s Defense by 1.' },
  leer:         { name:'Leer',         type:'normal',   category:'status',   power:null,accuracy:100, pp:30, desc:'Lowers opponent\'s Defense by 1.' },
  quick_attack: { name:'Quick Attack', type:'normal',   category:'physical', power:40,  accuracy:100, pp:30, desc:'Attacks first with blinding speed.' },
  hyper_fang:   { name:'Hyper Fang',   type:'normal',   category:'physical', power:80,  accuracy:90,  pp:15, desc:'A sharp-fanged attack.' },
  body_slam:    { name:'Body Slam',    type:'normal',   category:'physical', power:85,  accuracy:100, pp:15, desc:'May paralyze the opponent.' },
  double_edge:  { name:'Double-Edge',  type:'normal',   category:'physical', power:120, accuracy:100, pp:15, desc:'A tackle that also hurts the user.' },
  hyper_voice:  { name:'Hyper Voice',  type:'normal',   category:'special',  power:90,  accuracy:100, pp:10, desc:'A loud, powerful sound attack.' },
  swift:        { name:'Swift',        type:'normal',   category:'special',  power:60,  accuracy:null,pp:20, desc:'Star-shaped rays never miss.' },

  // ── GRASS ─────────────────────────────────────────────────
  vine_whip:    { name:'Vine Whip',    type:'grass',    category:'physical', power:45,  accuracy:100, pp:25, desc:'Strikes with slender vines.' },
  razor_leaf:   { name:'Razor Leaf',   type:'grass',    category:'physical', power:55,  accuracy:95,  pp:25, desc:'Sharp leaves critical-hit often.' },
  seed_bomb:    { name:'Seed Bomb',    type:'grass',    category:'physical', power:80,  accuracy:100, pp:15, desc:'A barrage of hard seeds.' },
  leaf_blade:   { name:'Leaf Blade',   type:'grass',    category:'physical', power:90,  accuracy:100, pp:15, desc:'A sharp-edged leaf. High crit.' },
  wood_hammer:  { name:'Wood Hammer',  type:'grass',    category:'physical', power:120, accuracy:100, pp:15, desc:'Slams with a large tree trunk. Recoil.' },
  energy_ball:  { name:'Energy Ball',  type:'grass',    category:'special',  power:90,  accuracy:100, pp:10, desc:'A ball of energy from nature.' },
  leaf_storm:   { name:'Leaf Storm',   type:'grass',    category:'special',  power:130, accuracy:90,  pp:5,  desc:'Very strong; drops Sp.Atk sharply.' },
  giga_drain:   { name:'Giga Drain',   type:'grass',    category:'special',  power:75,  accuracy:100, pp:10, desc:'Steals half the damage as HP.' },
  bullet_seed:  { name:'Bullet Seed',  type:'grass',    category:'physical', power:25,  accuracy:100, pp:30, desc:'Fires 2–5 seeds in a row.' },
  overgrow_bls: { name:'Overgrow',     type:'grass',    category:'special',  power:80,  accuracy:100, pp:10, desc:'Releases a burst of natural energy.' },

  // ── FIRE ──────────────────────────────────────────────────
  ember:        { name:'Ember',        type:'fire',     category:'special',  power:40,  accuracy:100, pp:25, desc:'A weak fire attack. May burn.' },
  flame_charge: { name:'Flame Charge', type:'fire',     category:'physical', power:50,  accuracy:100, pp:20, desc:'Raises user Speed by 1.' },
  fire_fang:    { name:'Fire Fang',    type:'fire',     category:'physical', power:65,  accuracy:95,  pp:15, desc:'Bites with fiery fangs. May burn.' },
  fire_spin:    { name:'Fire Spin',    type:'fire',     category:'special',  power:35,  accuracy:85,  pp:15, desc:'Traps foe in fire for 2–5 turns.' },
  flamethrower: { name:'Flamethrower', type:'fire',     category:'special',  power:90,  accuracy:100, pp:15, desc:'A powerful fire stream. May burn.' },
  fire_blast:   { name:'Fire Blast',   type:'fire',     category:'special',  power:110, accuracy:85,  pp:5,  desc:'Intense fire. 10% burn chance.' },
  heat_wave:    { name:'Heat Wave',    type:'fire',     category:'special',  power:95,  accuracy:90,  pp:10, desc:'Exhales a hot breath.' },
  overheat:     { name:'Overheat',     type:'fire',     category:'special',  power:130, accuracy:90,  pp:5,  desc:'Very strong; drops Sp.Atk sharply.' },
  inferno:      { name:'Inferno',      type:'fire',     category:'special',  power:100, accuracy:50,  pp:5,  desc:'Definitely burns the opponent.' },

  // ── WATER ─────────────────────────────────────────────────
  water_gun:    { name:'Water Gun',    type:'water',    category:'special',  power:40,  accuracy:100, pp:25, desc:'Squirts water to attack.' },
  bubble:       { name:'Bubble',       type:'water',    category:'special',  power:40,  accuracy:100, pp:30, desc:'May lower opponent\'s Speed.' },
  bubble_beam:  { name:'Bubble Beam',  type:'water',    category:'special',  power:65,  accuracy:100, pp:20, desc:'May lower opponent\'s Speed.' },
  water_pulse:  { name:'Water Pulse',  type:'water',    category:'special',  power:60,  accuracy:100, pp:20, desc:'May confuse the opponent.' },
  surf:         { name:'Surf',         type:'water',    category:'special',  power:90,  accuracy:100, pp:15, desc:'A big wave hits all Pokémon.' },
  aqua_tail:    { name:'Aqua Tail',    type:'water',    category:'physical', power:90,  accuracy:90,  pp:10, desc:'Attacks with a wave-shaped tail.' },
  hydro_pump:   { name:'Hydro Pump',   type:'water',    category:'special',  power:110, accuracy:80,  pp:5,  desc:'Blasts water at high pressure.' },
  aqua_jet:     { name:'Aqua Jet',     type:'water',    category:'physical', power:40,  accuracy:100, pp:20, desc:'Attacks first with a shot of water.' },
  crabhammer:   { name:'Crabhammer',   type:'water',    category:'physical', power:100, accuracy:90,  pp:10, desc:'Hammers with a large pincer.' },

  // ── GRASS SUPPORT ─────────────────────────────────────────
  leech_seed:   { name:'Leech Seed',   type:'grass',    category:'status',   power:null,accuracy:90,  pp:10, desc:'Saps HP from foe each turn.' },
  synthesis:    { name:'Synthesis',    type:'grass',    category:'status',   power:null,accuracy:null, pp:5, desc:'Restores HP depending on weather.' },
  sweet_scent:  { name:'Sweet Scent',  type:'normal',   category:'status',   power:null,accuracy:100, pp:20, desc:'Lowers foe\'s evasion by 1.' },

  // ── POISON ────────────────────────────────────────────────
  poison_powder:{ name:'PoisonPowder', type:'poison',   category:'status',   power:null,accuracy:75,  pp:35, desc:'Scatters powder that poisons.' },
  sludge:       { name:'Sludge',       type:'poison',   category:'special',  power:65,  accuracy:100, pp:20, desc:'May poison the opponent.' },
  sludge_bomb:  { name:'Sludge Bomb',  type:'poison',   category:'special',  power:90,  accuracy:100, pp:10, desc:'Hurls unsanitary mud. May poison.' },
  poison_sting: { name:'Poison Sting', type:'poison',   category:'physical', power:15,  accuracy:100, pp:35, desc:'May leave the foe poisoned.' },

  // ── FLYING ────────────────────────────────────────────────
  peck:         { name:'Peck',         type:'flying',   category:'physical', power:35,  accuracy:100, pp:35, desc:'Jabs with a beak or horn.' },
  wing_attack:  { name:'Wing Attack',  type:'flying',   category:'physical', power:60,  accuracy:100, pp:35, desc:'Strikes with wings spread wide.' },
  aerial_ace:   { name:'Aerial Ace',   type:'flying',   category:'physical', power:60,  accuracy:null,pp:20, desc:'An extremely quick attack. Never misses.' },
  brave_bird:   { name:'Brave Bird',   type:'flying',   category:'physical', power:120, accuracy:100, pp:15, desc:'Reckless dive. High recoil.' },
  air_slash:    { name:'Air Slash',    type:'flying',   category:'special',  power:75,  accuracy:95,  pp:15, desc:'Slices with air. May flinch.' },
  hurricane:    { name:'Hurricane',    type:'flying',   category:'special',  power:110, accuracy:70,  pp:10, desc:'Powerful twister. May confuse.' },

  // ── FIGHTING ──────────────────────────────────────────────
  mach_punch:   { name:'Mach Punch',   type:'fighting', category:'physical', power:40,  accuracy:100, pp:30, desc:'A punch thrown with blinding speed.' },
  close_combat: { name:'Close Combat', type:'fighting', category:'physical', power:120, accuracy:100, pp:5,  desc:'Lowers user\'s Def and Sp.Def.' },
  low_kick:     { name:'Low Kick',     type:'fighting', category:'physical', power:50,  accuracy:100, pp:20, desc:'A tripping kick. Heavier foe = more dmg.' },

  // ── DARK ──────────────────────────────────────────────────
  bite:         { name:'Bite',         type:'dark',     category:'physical', power:60,  accuracy:100, pp:25, desc:'May cause flinching.' },
  crunch:       { name:'Crunch',       type:'dark',     category:'physical', power:80,  accuracy:100, pp:15, desc:'Crunches with sharp fangs. May lower Def.' },
  night_slash:  { name:'Night Slash',  type:'dark',     category:'physical', power:70,  accuracy:100, pp:15, desc:'Slashes in darkness. High crit.' },

  // ── PSYCHIC ───────────────────────────────────────────────
  confusion:    { name:'Confusion',    type:'psychic',  category:'special',  power:50,  accuracy:100, pp:25, desc:'May confuse the opponent.' },
  psychic_move: { name:'Psychic',      type:'psychic',  category:'special',  power:90,  accuracy:100, pp:10, desc:'May lower Sp.Def.' },
  psyshock:     { name:'Psyshock',     type:'psychic',  category:'special',  power:80,  accuracy:100, pp:10, desc:'Deals damage based on foe\'s Def.' },

  // ── ELECTRIC ──────────────────────────────────────────────
  thunder_shock:{ name:'ThunderShock', type:'electric', category:'special',  power:40,  accuracy:100, pp:30, desc:'May paralyze the foe.' },
  thunderbolt:  { name:'Thunderbolt',  type:'electric', category:'special',  power:90,  accuracy:100, pp:15, desc:'May paralyze the foe.' },
  thunder:      { name:'Thunder',      type:'electric', category:'special',  power:110, accuracy:70,  pp:10, desc:'May paralyze. Never misses in rain.' },
  volt_tackle:  { name:'Volt Tackle',  type:'electric', category:'physical', power:120, accuracy:100, pp:15, desc:'Powerful recoil electric tackle.' },

  // ── ICE ───────────────────────────────────────────────────
  powder_snow:  { name:'Powder Snow',  type:'ice',      category:'special',  power:40,  accuracy:100, pp:25, desc:'May freeze the opponent.' },
  ice_beam:     { name:'Ice Beam',     type:'ice',      category:'special',  power:90,  accuracy:100, pp:10, desc:'May freeze the opponent.' },
  blizzard:     { name:'Blizzard',     type:'ice',      category:'special',  power:110, accuracy:70,  pp:5,  desc:'May freeze. Never misses in hail.' },
  icicle_crash: { name:'Icicle Crash', type:'ice',      category:'physical', power:85,  accuracy:90,  pp:10, desc:'Drops large icicles on the foe.' },

  // ── ROCK ──────────────────────────────────────────────────
  rock_throw:   { name:'Rock Throw',   type:'rock',     category:'physical', power:50,  accuracy:90,  pp:15, desc:'Hurls small rocks.' },
  rock_slide:   { name:'Rock Slide',   type:'rock',     category:'physical', power:75,  accuracy:90,  pp:10, desc:'Large boulders. May flinch.' },
  stone_edge:   { name:'Stone Edge',   type:'rock',     category:'physical', power:100, accuracy:80,  pp:5,  desc:'Sharp stones. High crit rate.' },

  // ── GROUND ────────────────────────────────────────────────
  mud_slap:     { name:'Mud-Slap',     type:'ground',   category:'special',  power:20,  accuracy:100, pp:10, desc:'Hurls mud. Lowers Accuracy.' },
  magnitude:    { name:'Magnitude',    type:'ground',   category:'physical', power:70,  accuracy:100, pp:30, desc:'Random power 10–150.' },
  earthquake:   { name:'Earthquake',   type:'ground',   category:'physical', power:100, accuracy:100, pp:10, desc:'Shakes the ground. Hits all.' },

  // ── STEEL ─────────────────────────────────────────────────
  iron_tail:    { name:'Iron Tail',    type:'steel',    category:'physical', power:100, accuracy:75,  pp:15, desc:'May lower foe\'s Defense.' },
  flash_cannon: { name:'Flash Cannon', type:'steel',    category:'special',  power:80,  accuracy:100, pp:10, desc:'May lower foe\'s Sp.Def.' },

  // ── FAIRY ─────────────────────────────────────────────────
  disarming_voice:{ name:'Disarm. Voice',type:'fairy',  category:'special',  power:40,  accuracy:null,pp:15, desc:'Charming cry. Never misses.' },
  moonblast:    { name:'Moonblast',    type:'fairy',    category:'special',  power:95,  accuracy:100, pp:15, desc:'Attacks with moonlight force.' },
  dazzling_gleam:{ name:'Dazzl. Gleam',type:'fairy',   category:'special',  power:80,  accuracy:100, pp:10, desc:'Emits a flash of light.' },

  // ── GHOST ─────────────────────────────────────────────────
  lick:         { name:'Lick',         type:'ghost',    category:'physical', power:30,  accuracy:100, pp:30, desc:'May paralyze the foe.' },
  shadow_sneak: { name:'Shadow Sneak', type:'ghost',    category:'physical', power:40,  accuracy:100, pp:30, desc:'Always strikes first.' },
  shadow_ball:  { name:'Shadow Ball',  type:'ghost',    category:'special',  power:80,  accuracy:100, pp:15, desc:'May lower foe\'s Sp.Def.' },

  // ── DRAGON ────────────────────────────────────────────────
  twister:      { name:'Twister',      type:'dragon',   category:'special',  power:40,  accuracy:100, pp:20, desc:'Whips up a vicious tornado.' },
  dragon_breath:{ name:'Dragon Breath',type:'dragon',   category:'special',  power:60,  accuracy:100, pp:20, desc:'May paralyze the foe.' },
  dragon_pulse: { name:'Dragon Pulse', type:'dragon',   category:'special',  power:85,  accuracy:100, pp:10, desc:'Releases a shock wave of energy.' },

  // ── BUG ───────────────────────────────────────────────────
  string_shot:  { name:'String Shot',  type:'bug',      category:'status',   power:null,accuracy:95,  pp:40, desc:'Lowers foe\'s Speed by 2.' },
  bug_bite:     { name:'Bug Bite',     type:'bug',      category:'physical', power:60,  accuracy:100, pp:20, desc:'Bites the foe.' },
  x_scissor:    { name:'X-Scissor',    type:'bug',      category:'physical', power:80,  accuracy:100, pp:15, desc:'Slashes with two scythes.' },
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
};

// ============================================================
// LEARNSETS — golpes que cada pokémon aprende por nível
// Formato: [ [level, 'move_key'], ... ]  em ordem crescente de level
// ============================================================
export const LEARNSETS = {

  // ── GRASS STARTERS ────────────────────────────────────────
  bulbasaur: [
    [1,  'tackle'],
    [1,  'growl'],
    [3,  'vine_whip'],
    [6,  'leech_seed'],
    [9,  'poison_powder'],
    [12, 'razor_leaf'],
    [15, 'sweet_scent'],
    [18, 'growth'],
    [21, 'synthesis'],
    [24, 'seed_bomb'],
    [28, 'energy_ball'],
    [32, 'sludge_bomb'],
    [38, 'leaf_storm'],
    [45, 'petal_dance'],
  ],

  chikorita: [
    [1,  'tackle'],
    [1,  'growl'],
    [6,  'razor_leaf'],
    [9,  'poison_powder'],
    [15, 'synthesis'],
    [22, 'reflect'],
    [29, 'giga_drain'],
    [38, 'leaf_storm'],
    [44, 'body_slam'],
  ],

  treecko: [
    [1,  'pound'],
    [1,  'leer'],
    [6,  'absorb'],
    [11, 'quick_attack'],
    [16, 'bullet_seed'],
    [21, 'pursuit'],
    [26, 'giga_drain'],
    [31, 'agility'],
    [36, 'slam'],
    [41, 'detect'],
    [46, 'false_swipe'],
    [51, 'leaf_blade'],
    [56, 'leaf_storm'],
  ],

  turtwig: [
    [1,  'tackle'],
    [1,  'withdraw'],
    [5,  'absorb'],
    [9,  'razor_leaf'],
    [13, 'curse'],
    [17, 'bite'],
    [21, 'mega_drain'],
    [25, 'leech_seed'],
    [29, 'synthesis'],
    [33, 'crunch'],
    [37, 'giga_drain'],
    [41, 'leaf_storm'],
    [45, 'wood_hammer'],
  ],

  snivy: [
    [1,  'tackle'],
    [1,  'leer'],
    [4,  'vine_whip'],
    [7,  'wrap'],
    [10, 'growth'],
    [13, 'leech_seed'],
    [16, 'mega_drain'],
    [19, 'leaf_tornado'],
    [22, 'coil'],
    [25, 'giga_drain'],
    [28, 'wring_out'],
    [31, 'leaf_blade'],
    [34, 'leaf_storm'],
  ],

  chespin: [
    [1,  'tackle'],
    [1,  'growl'],
    [5,  'vine_whip'],
    [9,  'rollout'],
    [13, 'bite'],
    [17, 'needle_arm'],
    [21, 'pin_missile'],
    [25, 'take_down'],
    [29, 'seed_bomb'],
    [33, 'bulk_up'],
    [37, 'body_slam'],
    [41, 'pain_split'],
    [45, 'wood_hammer'],
  ],

  rowlet: [
    [1,  'tackle'],
    [1,  'growl'],
    [5,  'peck'],
    [8,  'leafage'],
    [11, 'astonish'],
    [14, 'razor_leaf'],
    [17, 'quick_attack'],
    [20, 'wing_attack'],
    [23, 'leaf_blade'],
    [28, 'aerial_ace'],
    [34, 'energy_ball'],
    [40, 'brave_bird'],
    [46, 'leaf_storm'],
  ],

  grookey: [
    [1,  'scratch'],
    [1,  'growl'],
    [3,  'branch_poke'],
    [6,  'taunt'],
    [9,  'razor_leaf'],
    [12, 'screech'],
    [15, 'knock_off'],
    [18, 'slam'],
    [21, 'seed_bomb'],
    [24, 'screech'],
    [27, 'wood_hammer'],
    [30, 'acrobatics'],
    [36, 'high_horsepower'],
  ],

  sprigatito: [
    [1,  'scratch'],
    [1,  'tail_whip'],
    [4,  'leafage'],
    [7,  'quick_attack'],
    [10, 'magical_leaf'],
    [13, 'aerial_ace'],
    [16, 'razor_leaf'],
    [19, 'seed_bomb'],
    [22, 'slash'],
    [26, 'leaf_blade'],
    [30, 'energy_ball'],
    [36, 'petal_blizzard'],
  ],

  // ── FIRE STARTERS ─────────────────────────────────────────
  charmander: [
    [1,  'scratch'],
    [1,  'growl'],
    [4,  'ember'],
    [8,  'smoke_screen'],
    [12, 'dragon_breath'],
    [17, 'fire_fang'],
    [20, 'slash'],
    [24, 'flamethrower'],
    [28, 'scary_face'],
    [32, 'fire_spin'],
    [38, 'heat_wave'],
    [44, 'inferno'],
    [50, 'fire_blast'],
  ],

  cyndaquil: [
    [1,  'tackle'],
    [1,  'leer'],
    [6,  'ember'],
    [12, 'smoke_screen'],
    [19, 'quick_attack'],
    [27, 'flame_wheel'],
    [36, 'defense_curl'],
    [46, 'flamethrower'],
    [57, 'swift'],
    [70, 'inferno'],
  ],

  torchic: [
    [1,  'scratch'],
    [1,  'growl'],
    [7,  'focus_energy'],
    [10, 'ember'],
    [13, 'peck'],
    [19, 'sand_attack'],
    [22, 'fire_spin'],
    [28, 'quick_attack'],
    [31, 'slash'],
    [37, 'mirror_move'],
    [40, 'flamethrower'],
    [46, 'mach_punch'],
  ],

  chimchar: [
    [1,  'scratch'],
    [1,  'leer'],
    [5,  'ember'],
    [9,  'taunt'],
    [13, 'fury_swipes'],
    [17, 'flame_wheel'],
    [21, 'nasty_plot'],
    [25, 'torment'],
    [29, 'facade'],
    [33, 'fire_spin'],
    [37, 'slack_off'],
    [41, 'flamethrower'],
    [45, 'mach_punch'],
    [49, 'flare_blitz'],
  ],

  tepig: [
    [1,  'tackle'],
    [1,  'tail_whip'],
    [5,  'ember'],
    [9,  'odor_sleuth'],
    [13, 'defense_curl'],
    [17, 'flame_charge'],
    [21, 'smog'],
    [25, 'rollout'],
    [29, 'take_down'],
    [33, 'heat_crash'],
    [37, 'assurance'],
    [41, 'flamethrower'],
    [45, 'head_smash'],
    [49, 'roar'],
    [53, 'flare_blitz'],
  ],

  fennekin: [
    [1,  'scratch'],
    [1,  'tail_whip'],
    [5,  'ember'],
    [11, 'howl'],
    [15, 'flame_charge'],
    [21, 'psybeam'],
    [25, 'fire_spin'],
    [31, 'lucky_chant'],
    [35, 'light_screen'],
    [41, 'psyshock'],
    [45, 'flamethrower'],
    [51, 'will_o_wisp'],
    [55, 'psychic_move'],
    [61, 'sunny_day'],
    [65, 'fire_blast'],
  ],

  litten: [
    [1,  'scratch'],
    [1,  'growl'],
    [4,  'ember'],
    [7,  'lick'],
    [12, 'bite'],
    [15, 'double_kick'],
    [20, 'fire_fang'],
    [23, 'roar'],
    [28, 'swagger'],
    [31, 'flamethrower'],
    [36, 'scary_face'],
    [39, 'crunch'],
    [44, 'outrage'],
    [47, 'flare_blitz'],
  ],

  scorbunny: [
    [1,  'tackle'],
    [1,  'growl'],
    [4,  'quick_attack'],
    [8,  'ember'],
    [12, 'headbutt'],
    [16, 'flame_charge'],
    [20, 'agility'],
    [24, 'double_kick'],
    [28, 'fire_spin'],
    [32, 'bounce'],
    [36, 'flamethrower'],
    [40, 'high_jump_kick'],
    [44, 'fire_blast'],
    [48, 'pyro_ball'],
  ],

  fuecoco: [
    [1,  'tackle'],
    [1,  'leer'],
    [4,  'ember'],
    [8,  'bite'],
    [12, 'headbutt'],
    [16, 'fire_fang'],
    [20, 'stomping_tantrum'],
    [24, 'hex'],
    [28, 'crunch'],
    [32, 'bulldoze'],
    [36, 'shadow_ball'],
    [40, 'flamethrower'],
    [44, 'slack_off'],
    [48, 'fire_blast'],
    [52, 'overheat'],
  ],

  // ── WATER STARTERS ────────────────────────────────────────
  squirtle: [
    [1,  'tackle'],
    [1,  'tail_whip'],
    [3,  'water_gun'],
    [6,  'withdraw'],
    [9,  'bubble'],
    [12, 'bite'],
    [15, 'rapid_spin'],
    [18, 'protect'],
    [21, 'water_pulse'],
    [24, 'aqua_tail'],
    [28, 'skull_bash'],
    [32, 'iron_defense'],
    [36, 'rain_dance'],
    [40, 'hydro_pump'],
  ],

  totodile: [
    [1,  'scratch'],
    [1,  'leer'],
    [6,  'water_gun'],
    [8,  'rage'],
    [13, 'bite'],
    [15, 'scary_face'],
    [20, 'ice_fang'],
    [23, 'flail'],
    [30, 'crunch'],
    [33, 'chip_away'],
    [40, 'slash'],
    [43, 'screech'],
    [50, 'aqua_tail'],
    [53, 'super_power'],
    [60, 'hydro_pump'],
  ],

  mudkip: [
    [1,  'tackle'],
    [1,  'growl'],
    [5,  'water_gun'],
    [10, 'mud_slap'],
    [15, 'foresight'],
    [20, 'bide'],
    [25, 'mud_shot'],
    [30, 'protect'],
    [35, 'take_down'],
    [40, 'surf'],
    [45, 'endeavor'],
    [50, 'earthquake'],
  ],

  piplup: [
    [1,  'pound'],
    [1,  'growl'],
    [5,  'bubble'],
    [8,  'water_sport'],
    [11, 'peck'],
    [15, 'bide'],
    [18, 'bubble_beam'],
    [22, 'fury_attack'],
    [25, 'brine'],
    [29, 'whirlpool'],
    [32, 'mist'],
    [36, 'drill_peck'],
    [39, 'hydro_pump'],
  ],

  oshawott: [
    [1,  'tackle'],
    [1,  'tail_whip'],
    [5,  'water_gun'],
    [7,  'water_sport'],
    [11, 'focus_energy'],
    [13, 'razor_shell'],
    [17, 'fury_cutter'],
    [19, 'water_pulse'],
    [23, 'revenge'],
    [25, 'aqua_jet'],
    [29, 'encore'],
    [31, 'aqua_tail'],
    [35, 'retaliate'],
    [37, 'swords_dance'],
    [41, 'hydro_pump'],
    [43, 'slash'],
  ],

  froakie: [
    [1,  'pound'],
    [1,  'growl'],
    [5,  'bubble'],
    [7,  'quick_attack'],
    [10, 'water_pulse'],
    [14, 'smokescreen'],
    [16, 'round'],
    [19, 'fling'],
    [23, 'smack_down'],
    [26, 'substitute'],
    [28, 'extrasensory'],
    [32, 'surf'],
    [35, 'double_team'],
    [38, 'hydro_pump'],
    [42, 'mat_block'],
    [45, 'night_slash'],
    [48, 'toxic'],
  ],

  popplio: [
    [1,  'pound'],
    [1,  'growl'],
    [4,  'water_gun'],
    [8,  'disarming_voice'],
    [11, 'baby_doll_eyes'],
    [15, 'aqua_jet'],
    [18, 'encore'],
    [22, 'bubble_beam'],
    [25, 'sing'],
    [29, 'double_slap'],
    [32, 'hyper_voice'],
    [36, 'moonblast'],
    [39, 'captivate'],
    [43, 'hydro_pump'],
    [46, 'misty_terrain'],
  ],

  sobble: [
    [1,  'pound'],
    [1,  'growl'],
    [4,  'water_gun'],
    [8,  'bind'],
    [12, 'water_pulse'],
    [16, 'tearful_look'],
    [20, 'acrobatics'],
    [24, 'sucker_punch'],
    [28, 'surf'],
    [32, 'liquidation'],
    [36, 'snipe_shot'],
    [40, 'hydro_pump'],
    [44, 'bounce'],
  ],

  quaxly: [
    [1,  'pound'],
    [1,  'growl'],
    [4,  'water_gun'],
    [8,  'wing_attack'],
    [12, 'quick_attack'],
    [16, 'water_pulse'],
    [20, 'aerial_ace'],
    [24, 'aqua_jet'],
    [28, 'acrobatics'],
    [32, 'liquidation'],
    [36, 'double_hit'],
    [40, 'hydro_pump'],
    [44, 'brave_bird'],
  ],
  // ── Bug line (Caterpie / Metapod / Butterfree) ───────────
  caterpie:   [
    [1,  'tackle'],
    [1,  'string_shot'],
    [5,  'bug_bite'],
  ],
  metapod: [
    [1,  'harden'],
  ],
  butterfree: [
    [1,  'confusion'],
    [1,  'sleep_powder'],
    [10, 'gust'],
    [12, 'stun_spore'],
    [14, 'psybeam'],
    [16, 'silver_wind'],
    [18, 'supersonic'],
    [21, 'tailwind'],
    [24, 'safeguard'],
    [27, 'whirlwind'],
    [30, 'psychic_move'],
    [33, 'bug_buzz'],
    [36, 'quiver_dance'],
  ],
};

// ============================================================
// FÓRMULA DE DANO Gen 6+ (Bulbapedia)
//
// Damage = floor( floor( floor(2*L/5+2) * A * P / D ) / 50 + 2 )
//          * STAB * TypeEff * rand
//
// Parâmetros:
//   attackerLevel  — nível do atacante
//   attackerStat   — Atk ou Sp.Atk do atacante (já calculado com IVs/nature)
//   defenderStat   — Def ou Sp.Def do defensor
//   movePower      — power base do golpe
//   stab           — true se tipo do golpe == tipo do pokémon
//   typeEff        — multiplicador de tipo (0/0.25/0.5/1/2/4)
//   randomize      — se true, aplica fator aleatório 0.85–1.00
// ============================================================
export function calcularDano({ attackerLevel, attackerStat, defenderStat, movePower, stab, typeEff, randomize = true }) {
  if (!movePower) return 0; // golpe de status

  const levelMod  = Math.floor(2 * attackerLevel / 5 + 2);
  const base      = Math.floor(Math.floor(levelMod * attackerStat * movePower / defenderStat) / 50 + 2);
  const stabMod   = stab ? 1.5 : 1.0;
  const rand      = randomize ? (0.85 + Math.random() * 0.15) : 1.0;

  return Math.max(1, Math.floor(base * stabMod * typeEff * rand));
}

// ============================================================
// VERIFICA SE UM POKÉMON APRENDE UM GOLPE NO NÍVEL EXATO
// Retorna a move_key ou null
// ============================================================
export function golpeAprendidoNoNivel(pokemon, nivel) {
  const learnset = LEARNSETS[pokemon] || [];
  const entry = learnset.find(([lvl]) => lvl === nivel);
  return entry ? entry[1] : null;
}

// ============================================================
// RETORNA TODOS OS GOLPES JÁ APRENDÍVEIS até um certo nível
// (para inicializar um pokémon que pula níveis)
// ============================================================
export function golpesAteNivel(pokemon, nivel) {
  const learnset = LEARNSETS[pokemon] || [];
  return learnset
    .filter(([lvl]) => lvl <= nivel)
    .map(([, key]) => key);
}

// ============================================================
// INICIALIZA OS 4 GOLPES DE UM POKÉMON NO NÍVEL 1
// Pega os primeiros golpes do learnset até level atual
// ============================================================
export function inicializarGolpes(pokemon, nivel = 1) {
  const disponiveis = golpesAteNivel(pokemon, nivel);
  // Pega os últimos 4 (mais recentes / mais fortes)
  return disponiveis.slice(-4);
}
