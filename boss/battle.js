// ============================================================
// BATTLE.JS — Boss Battle Logic
// Firebase ESM module — importado por battle.html
// ============================================================

import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getDatabase, ref, get, set, update, onValue, push, onDisconnect, remove, query, limitToLast }
  from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";
import { getFirestore, doc, getDoc, updateDoc, arrayUnion }
  from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

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
const fbApp = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
const auth  = getAuth(fbApp);
const rdb   = getDatabase(fbApp);
const fsdb  = getFirestore(fbApp);


// ══════════════════════════════════════════════════════════════
// MOVES_DB — usado no painel de golpes (PP incluído)
// ══════════════════════════════════════════════════════════════
const MOVES_DB = {
  tackle:       {name:'Tackle',        type:'normal',  cat:'physical', power:40,  acc:100, pp:35},
  scratch:      {name:'Scratch',       type:'normal',  cat:'physical', power:40,  acc:100, pp:35},
  pound:        {name:'Pound',         type:'normal',  cat:'physical', power:40,  acc:100, pp:35},
  quick_attack: {name:'Quick Attack',  type:'normal',  cat:'physical', power:40,  acc:100, pp:30},
  body_slam:    {name:'Body Slam',     type:'normal',  cat:'physical', power:85,  acc:100, pp:15},
  hyper_voice:  {name:'Hyper Voice',   type:'normal',  cat:'special',  power:90,  acc:100, pp:10},
  swift:        {name:'Swift',         type:'normal',  cat:'special',  power:60,  acc:null,pp:20},
  water_gun:    {name:'Water Gun',     type:'water',   cat:'special',  power:40,  acc:100, pp:25},
  bubble:       {name:'Bubble',        type:'water',   cat:'special',  power:40,  acc:100, pp:30},
  surf:         {name:'Surf',          type:'water',   cat:'special',  power:90,  acc:100, pp:15},
  hydro_pump:   {name:'Hydro Pump',    type:'water',   cat:'special',  power:110, acc:80,  pp:5 },
  scald:        {name:'Scald',         type:'water',   cat:'special',  power:80,  acc:100, pp:15},
  ember:        {name:'Ember',         type:'fire',    cat:'special',  power:40,  acc:100, pp:25},
  flamethrower: {name:'Flamethrower',  type:'fire',    cat:'special',  power:90,  acc:100, pp:15},
  fire_blast:   {name:'Fire Blast',    type:'fire',    cat:'special',  power:110, acc:85,  pp:5 },
  overheat:     {name:'Overheat',      type:'fire',    cat:'special',  power:130, acc:90,  pp:5 },
  vine_whip:    {name:'Vine Whip',     type:'grass',   cat:'physical', power:45,  acc:100, pp:25},
  branch_poke:  {name:'Branch Poke',   type:'grass',   cat:'physical', power:40,  acc:100, pp:40},
  scary_face:   {name:'Scary Face',    type:'normal',  cat:'status',   power:null,acc:100, pp:10,  effect:'deboss', stat:'spe', stages:-2},
  fury_swipes:  {name:'Fury Swipes',   type:'normal',  cat:'physical', power:18,  acc:80,  pp:15},
  sucker_punch: {name:'Sucker Punch',  type:'dark',    cat:'physical', power:70,  acc:100, pp:5},
  shadow_sneak: {name:'Shadow Sneak',  type:'ghost',   cat:'physical', power:40,  acc:100, pp:30},
  razor_leaf:   {name:'Razor Leaf',    type:'grass',   cat:'physical', power:55,  acc:95,  pp:25},
  seed_bomb:    {name:'Seed Bomb',     type:'grass',   cat:'physical', power:80,  acc:100, pp:15},
  leaf_blade:   {name:'Leaf Blade',    type:'grass',   cat:'physical', power:90,  acc:100, pp:15},
  energy_ball:  {name:'Energy Ball',   type:'grass',   cat:'special',  power:90,  acc:100, pp:10},
  leaf_storm:   {name:'Leaf Storm',    type:'grass',   cat:'special',  power:130, acc:90,  pp:5 },
  thundershock: {name:'ThunderShock',  type:'electric',cat:'special',  power:40,  acc:100, pp:30},
  thunderbolt:  {name:'Thunderbolt',   type:'electric',cat:'special',  power:90,  acc:100, pp:15},
  thunder:      {name:'Thunder',       type:'electric',cat:'special',  power:110, acc:70,  pp:10},
  psychic:      {name:'Psychic',       type:'psychic', cat:'special',  power:90,  acc:100, pp:10},
  earthquake:   {name:'Earthquake',    type:'ground',  cat:'physical', power:100, acc:100, pp:10},
  shadow_ball:  {name:'Shadow Ball',   type:'ghost',   cat:'special',  power:80,  acc:100, pp:15},
  iron_head:    {name:'Iron Head',     type:'steel',   cat:'physical', power:80,  acc:100, pp:15},
  play_rough:   {name:'Play Rough',    type:'fairy',   cat:'physical', power:90,  acc:90,  pp:10},
  moonblast:    {name:'Moonblast',     type:'fairy',   cat:'special',  power:95,  acc:100, pp:15},
  close_combat: {name:'Close Combat',  type:'fighting',cat:'physical', power:120, acc:100, pp:5 },
  aura_sphere:  {name:'Aura Sphere',   type:'fighting',cat:'special',  power:80,  acc:null,pp:20},
  crunch:       {name:'Crunch',        type:'dark',    cat:'physical', power:80,  acc:100, pp:15},
  knock_off:    {name:'Knock Off',     type:'dark',    cat:'physical', power:65,  acc:100, pp:20},
  dragon_pulse: {name:'Dragon Pulse',  type:'dragon',  cat:'special',  power:85,  acc:100, pp:10},
  aerial_ace:   {name:'Aerial Ace',    type:'flying',  cat:'physical', power:60,  acc:null,pp:20},
  brave_bird:   {name:'Brave Bird',    type:'flying',  cat:'physical', power:120, acc:100, pp:15},
  x_scissor:    {name:'X-Scissor',     type:'bug',     cat:'physical', power:80,  acc:100, pp:15},
  poison_sting:  {name:'Poison Sting', type:'poison',  cat:'physical', power:15,  acc:100, pp:35, effect:'poison', effectChance:30},
  twineedle:     {name:'Twineedle',    type:'bug',     cat:'physical', power:25,  acc:100, pp:20, effect:'poison', effectChance:20},
  blizzard:     {name:'Blizzard',      type:'ice',     cat:'special',  power:110, acc:70,  pp:5 },
  giga_drain:   {name:'Giga Drain',    type:'grass',   cat:'special',  power:75,  acc:100, pp:10},
  rapid_spin:    {name:'Rapid Spin',    type:'normal',  cat:'physical', power:50,  acc:100, pp:40},
  water_pulse:   {name:'Water Pulse',   type:'water',   cat:'special',  power:60,  acc:100, pp:20},
  ice_beam:      {name:'Ice Beam',      type:'ice',     cat:'special',  power:90,  acc:100, pp:10},
  flare_blitz:   {name:'Flare Blitz',   type:'fire',    cat:'physical', power:120, acc:100, pp:15},
  aqua_tail:     {name:'Aqua Tail',     type:'water',   cat:'physical', power:90,  acc:90,  pp:10},
  stone_edge:    {name:'Stone Edge',    type:'rock',    cat:'physical', power:100, acc:80,  pp:5 },
  poison_jab:    {name:'Poison Jab',    type:'poison',  cat:'physical', power:80,  acc:100, pp:20},
  // ── Status moves para players ────────────────────────────
  swords_dance:  {name:'Swords Dance',  type:'normal',  cat:'status',   power:null,acc:null,pp:20,
                  effect:'buff', stat:'atk', stages:2},
  calm_mind:     {name:'Calm Mind',     type:'psychic', cat:'status',   power:null,acc:null,pp:20,
                  effect:'buff', stat:'spa', stages:1},
  nasty_plot:    {name:'Nasty Plot',    type:'dark',    cat:'status',   power:null,acc:null,pp:20,
                  effect:'buff', stat:'spa', stages:2},
  bulk_up:       {name:'Bulk Up',       type:'fighting',cat:'status',   power:null,acc:null,pp:20,
                  effect:'buff', stat:'atk', stages:1},
  sleep_powder:  {name:'Sleep Powder',  type:'grass',   cat:'status',   power:null,acc:75,  pp:15,
                  effect:'sleep'},
  hypnosis:      {name:'Hypnosis',      type:'psychic', cat:'status',   power:null,acc:60,  pp:20,
                  effect:'sleep'},
  will_o_wisp:   {name:'Will-O-Wisp',   type:'fire',    cat:'status',   power:null,acc:85,  pp:15,
                  effect:'burn'},
  toxic:         {name:'Toxic',         type:'poison',  cat:'status',   power:null,acc:90,  pp:10,
                  effect:'toxic'},
  screech:       {name:'Screech',       type:'normal',  cat:'status',   power:null,acc:85,  pp:40,
                  effect:'debuff', stat:'def', stages:-2},
  growl:         {name:'Growl',         type:'normal',  cat:'status',   power:null,acc:100, pp:40,
                  effect:'debuff', stat:'atk', stages:-1},
  leer:          {name:'Leer',          type:'normal',  cat:'status',   power:null,acc:100, pp:30,
                  effect:'debuff', stat:'def', stages:-1},
  confuse_ray:   {name:'Confuse Ray',   type:'ghost',   cat:'status',   power:null,acc:100, pp:10,
                  effect:'confusion'},
  recover:       {name:'Recover',       type:'normal',  cat:'status',   power:null,acc:null,pp:10,
                  effect:'heal'},
  // ── Outros status moves comuns ───────────────────────────
  tail_whip:     {name:'Tail Whip',     type:'normal',  cat:'status',   power:null,acc:100, pp:30,
                  effect:'debuff', stat:'def', stages:-1},
  sand_attack:   {name:'Sand Attack',   type:'ground',  cat:'status',   power:null,acc:100, pp:15,
                  effect:'debuff', stat:'acc', stages:-1},
  smokescreen:   {name:'Smokescreen',   type:'normal',  cat:'status',   power:null,acc:100, pp:20,
                  effect:'debuff', stat:'acc', stages:-1},
  charm:         {name:'Charm',         type:'fairy',   cat:'status',   power:null,acc:100, pp:20,
                  effect:'debuff', stat:'atk', stages:-2},
  fake_tears:    {name:'Fake Tears',    type:'dark',    cat:'status',   power:null,acc:100, pp:20,
                  effect:'debuff', stat:'spd', stages:-2},
  harden:        {name:'Harden',        type:'normal',  cat:'status',   power:null,acc:null,pp:30,
                  effect:'buff', stat:'def', stages:1},
  defense_curl:  {name:'Defense Curl',  type:'normal',  cat:'status',   power:null,acc:null,pp:40,
                  effect:'buff', stat:'def', stages:1},
  agility:       {name:'Agility',       type:'psychic', cat:'status',   power:null,acc:null,pp:30,
                  effect:'buff', stat:'spe', stages:2},
  amnesia:       {name:'Amnesia',       type:'psychic', cat:'status',   power:null,acc:null,pp:20,
                  effect:'buff', stat:'spd', stages:2},
  iron_defense:  {name:'Iron Defense',  type:'steel',   cat:'status',   power:null,acc:null,pp:15,
                  effect:'buff', stat:'def', stages:2},
  cotton_guard:  {name:'Cotton Guard',  type:'grass',   cat:'status',   power:null,acc:null,pp:10,
                  effect:'buff', stat:'def', stages:3},
  acid_armor:    {name:'Acid Armor',    type:'poison',  cat:'status',   power:null,acc:null,pp:20,
                  effect:'buff', stat:'def', stages:2},
  belly_drum:    {name:'Belly Drum',    type:'normal',  cat:'status',   power:null,acc:null,pp:10,
                  effect:'buff', stat:'atk', stages:6},
  quiver_dance:  {name:'Quiver Dance',  type:'bug',     cat:'status',   power:null,acc:null,pp:20,
                  effect:'buff', stat:'spa', stages:1},
  coil:          {name:'Coil',          type:'poison',  cat:'status',   power:null,acc:null,pp:20,
                  effect:'buff', stat:'atk', stages:1},
  work_up:       {name:'Work Up',       type:'normal',  cat:'status',   power:null,acc:null,pp:30,
                  effect:'buff', stat:'atk', stages:1},
  // ── Bug moves (Caterpie/Butterfree line) ─────────────────
  string_shot:   {name:'String Shot',   type:'bug',     cat:'status',   power:null,acc:95,  pp:40,
                  effect:'debuff', stat:'spe', stages:-2},
  bug_bite:      {name:'Bug Bite',      type:'bug',     cat:'physical', power:60,  acc:100, pp:20},
  bug_buzz:      {name:'Bug Buzz',      type:'bug',     cat:'special',  power:90,  acc:100, pp:10},
  silver_wind:   {name:'Silver Wind',   type:'bug',     cat:'special',  power:60,  acc:100, pp:5 },
  fury_cutter:   {name:'Fury Cutter',   type:'bug',     cat:'physical', power:40,  acc:95,  pp:20},
  pin_missile:   {name:'Pin Missile',   type:'bug',     cat:'physical', power:25,  acc:95,  pp:20},
  // ── Flying special extras ────────────────────────────────
  gust:          {name:'Gust',          type:'flying',  cat:'special',  power:40,  acc:100, pp:35},
  tailwind:      {name:'Tailwind',      type:'flying',  cat:'status',   power:null,acc:null,pp:15,
                  effect:'buff', stat:'spe', stages:2},
  // ── Grass status extras ──────────────────────────────────
  stun_spore:    {name:'Stun Spore',    type:'grass',   cat:'status',   power:null,acc:75,  pp:30,
                  effect:'paralysis'},
  // ── Normal extras ───────────────────────────────────────
  supersonic:    {name:'Supersonic',    type:'normal',  cat:'status',   power:null,acc:55,  pp:20,
                  effect:'confusion'},
  safeguard:     {name:'Safeguard',     type:'normal',  cat:'status',   power:null,acc:null,pp:25},
  whirlwind:     {name:'Whirlwind',     type:'normal',  cat:'status',   power:null,acc:null,pp:20},
  // ── Water moves ausentes ──
  withdraw:      {name:'Withdraw',      type:'water',   cat:'status',   power:null,acc:null,pp:40,  eff:'buff',  stat:'def', stages:1, desc:"Raises own Defense."},
  bubble:        {name:'Bubble',        type:'water',   cat:'special',  power:40,  acc:100, pp:30},
  aqua_tail:     {name:'Aqua Tail',     type:'water',   cat:'physical', power:90,  acc:90,  pp:10},
  aqua_jet:      {name:'Aqua Jet',      type:'water',   cat:'physical', power:40,  acc:100, pp:20},
  water_pulse:   {name:'Water Pulse',   type:'water',   cat:'special',  power:60,  acc:100, pp:20},
  rain_dance:    {name:'Rain Dance',    type:'water',   cat:'status',   power:null,acc:null,pp:5},
  hydro_pump:    {name:'Hydro Pump',    type:'water',   cat:'special',  power:110, acc:80,  pp:5},
  skull_bash:    {name:'Skull Bash',    type:'normal',  cat:'physical', power:130, acc:100, pp:10},
  rapid_spin:    {name:'Rapid Spin',    type:'normal',  cat:'physical', power:50,  acc:100, pp:40},
  // ── Bug moves ausentes ──
  bug_bite:      {name:'Bug Bite',      type:'bug',     cat:'physical', power:60,  acc:100, pp:20},
  string_shot:   {name:'String Shot',   type:'bug',     cat:'status',   power:null,acc:95,  pp:40, eff:'deboss', stat:'spe', stages:-1, desc:"Lowers foe's Speed."},
  harden:        {name:'Harden',        type:'normal',  cat:'status',   power:null,acc:null,pp:30, eff:'buff',  stat:'def', stages:1, desc:"Raises own Defense."},
  // ── Grass moves ausentes ──
  absorb:        {name:'Absorb',        type:'grass',   cat:'special',  power:20,  acc:100, pp:25},
  razor_leaf:    {name:'Razor Leaf',    type:'grass',   cat:'physical', power:55,  acc:95,  pp:25},
  mega_drain:    {name:'Mega Drain',    type:'grass',   cat:'special',  power:40,  acc:100, pp:15},
  leech_seed:    {name:'Leech Seed',    type:'grass',   cat:'status',   power:null,acc:90,  pp:10},
  synthesis:     {name:'Synthesis',     type:'grass',   cat:'status',   power:null,acc:null,pp:5},
  giga_drain:    {name:'Giga Drain',    type:'grass',   cat:'special',  power:75,  acc:100, pp:10},
  leaf_storm:    {name:'Leaf Storm',    type:'grass',   cat:'special',  power:130, acc:90,  pp:5},
  wood_hammer:   {name:'Wood Hammer',   type:'grass',   cat:'physical', power:120, acc:100, pp:15},
  // ── Fire moves ausentes ──
  ember:         {name:'Ember',         type:'fire',    cat:'special',  power:40,  acc:100, pp:25},
  flame_charge:  {name:'Flame Charge',  type:'fire',    cat:'physical', power:50,  acc:100, pp:20},
  flamethrower:  {name:'Flamethrower',  type:'fire',    cat:'special',  power:90,  acc:100, pp:15},
  fire_blast:    {name:'Fire Blast',    type:'fire',    cat:'special',  power:110, acc:85,  pp:5},
  flare_blitz:   {name:'Flare Blitz',   type:'fire',    cat:'physical', power:120, acc:100, pp:15},
  heat_crash:    {name:'Heat Crash',    type:'fire',    cat:'physical', power:null,acc:100, pp:10},
  // ── Misc ausentes ──
  odor_sleuth:   {name:'Odor Sleuth',   type:'normal',  cat:'status',   power:null,acc:null,pp:40},
  defense_curl:  {name:'Defense Curl',  type:'normal',  cat:'status',   power:null,acc:null,pp:40, eff:'buff', stat:'def', stages:1},
  smog:          {name:'Smog',          type:'poison',  cat:'special',  power:30,  acc:70,  pp:20},
  rollout:       {name:'Rollout',       type:'rock',    cat:'physical', power:30,  acc:90,  pp:20},
  take_down:     {name:'Take Down',     type:'normal',  cat:'physical', power:90,  acc:85,  pp:20},
  assurance:     {name:'Assurance',     type:'dark',    cat:'physical', power:60,  acc:100, pp:10},
  head_smash:    {name:'Head Smash',    type:'rock',    cat:'physical', power:150, acc:80,  pp:5},
  howl:          {name:'Howl',          type:'normal',  cat:'status',   power:null,acc:null,pp:40, eff:'buff', stat:'atk', stages:1},
  psybeam:       {name:'Psybeam',       type:'psychic', cat:'special',  power:65,  acc:100, pp:20},
  fire_spin:     {name:'Fire Spin',     type:'fire',    cat:'special',  power:35,  acc:85,  pp:15},
  lucky_chant:   {name:'Lucky Chant',   type:'normal',  cat:'status',   power:null,acc:null,pp:30},
  light_screen:  {name:'Light Screen',  type:'psychic', cat:'status',   power:null,acc:null,pp:30},
  psyshock:      {name:'Psyshock',      type:'psychic', cat:'special',  power:80,  acc:100, pp:10},
  water_sport:   {name:'Water Sport',   type:'water',   cat:'status',   power:null,acc:null,pp:15},
  focus_energy:  {name:'Focus Energy',  type:'normal',  cat:'status',   power:null,acc:null,pp:30},
  razor_shell:   {name:'Razor Shell',   type:'water',   cat:'physical', power:75,  acc:95,  pp:10},
  fury_cutter:   {name:'Fury Cutter',   type:'bug',     cat:'physical', power:40,  acc:95,  pp:20},
  revenge:       {name:'Revenge',       type:'fighting',cat:'physical', power:60,  acc:100, pp:10},
  encore:        {name:'Encore',        type:'normal',  cat:'status',   power:null,acc:100, pp:5},
  retaliate:     {name:'Retaliate',     type:'normal',  cat:'physical', power:70,  acc:100, pp:5},
  swords_dance:  {name:'Swords Dance',  type:'normal',  cat:'status',   power:null,acc:null,pp:20, eff:'buff', stat:'atk', stages:2},
  slash:         {name:'Slash',         type:'normal',  cat:'physical', power:70,  acc:100, pp:20},
};

const TIPO_CORES = {
  normal:'#9a9a7a',fire:'#f08030',water:'#6890f0',grass:'#78c850',
  electric:'#f8d030',psychic:'#f85888',ice:'#98d8d8',dragon:'#7038f8',
  ghost:'#705898',dark:'#705848',steel:'#b8b8d0',fairy:'#ee99ac',
  fighting:'#c03028',ground:'#e0c068',rock:'#b8a038',bug:'#a8b820',
  poison:'#a040a0',flying:'#a890f0',
};

// ✅ Boss stats vêm do Firebase (boss_ativo.boss), gravados pelo boss-scheduler.js.
// Para adicionar um novo boss, edite APENAS boss-system.js → bosses[].

// ══════════════════════════════════════════════════════════════
// DROPS DE BOSS — recompensas por nível do boss
// ══════════════════════════════════════════════════════════════
// ──────────────────────────────────────────────────────────────
// DROPS DE BOSS COM PROBABILIDADE
// Formato de cada faixa:
//   xp, lealdade: valores fixos
//   drops: array de { item, qty, chance }
//     chance: 0.0–1.0 (1.0 = 100% garantido, 0.5 = 50%, etc.)
//
// Para adicionar um item: inclua { item:'chave_item', qty:1, chance:0.5 }
// A função rola Math.random() para cada entrada com chance < 1
// ──────────────────────────────────────────────────────────────
function calcularDrops(bossNivel) {
  const n = bossNivel || 10;

  // Rola os drops probabilísticos e retorna { item: qty }
  function rolarDrops(tabela) {
    const itens = {};
    tabela.forEach(({ item, qty, chance }) => {
      if (Math.random() < (chance ?? 1)) {
        itens[item] = (itens[item] || 0) + qty;
      }
    });
    return itens;
  }

  if (n <= 15) return { // Fácil (ex: Caterpie lv10)
    xp:       80,
    lealdade: 20,
    itens: rolarDrops([
      { item: 'pokebola',  qty: 1, chance: 1.0 },  // 100% — garantido
      { item: 'potion',    qty: 1, chance: 1.0 },  // 100% — garantido
      { item: 'ether',     qty: 1, chance: 1.0 },  // 50%  — sorte
      { item: 'revive',    qty: 1, chance: 1.0 },  // 30%  — raro
      { item: 'ether',     qty: 1, chance: 0.25 },
      { item: 'potion',    qty: 1, chance: 0.25 },
      { item: 'revive',    qty: 1, chance: 0.25 }, // 25%  — raro
    ]),
  };
  if (n <= 25) return { // Médio-baixo
    xp:       150,
    lealdade: 20,
    itens: rolarDrops([
      { item: 'pokebola',    qty: 2, chance: 1.0 },
      { item: 'great_ball',  qty: 1, chance: 1.0 },
      { item: 'super_potion',qty: 1, chance: 1.0 },
      { item: 'super_potion',qty: 1, chance: 0.5 },
      { item: 'revive',      qty: 1, chance: 0.4 },
      { item: 'ether',       qty: 1, chance: 0.35 },
    ]),
  };
  if (n <= 35) return { // Médio (ex: Staryu lv30)
    xp:       250,
    lealdade: 20,
    itens: rolarDrops([
      { item: 'great_ball',  qty: 2, chance: 1.0 },
      { item: 'super_potion',qty: 2, chance: 1.0 },
      { item: 'revive',      qty: 1, chance: 1.0 },
      { item: 'revive',      qty: 1, chance: 0.5 },
      { item: 'ether',       qty: 1, chance: 0.5 },
    ]),
  };
  return { // Difícil (ex: Mawile lv35+)
    xp:       400,
    lealdade: 20,
    itens: rolarDrops([
      { item: 'ultra_ball',  qty: 2, chance: 1.0 },
      { item: 'hyper_potion',qty: 2, chance: 1.0 },
      { item: 'revive',      qty: 1, chance: 1.0 },
      { item: 'revive',      qty: 1, chance: 0.5 },
      { item: 'ether',       qty: 1, chance: 0.6 },
      { item: 'ether',       qty: 1, chance: 0.3 },
    ]),
  };
}

function xpParaNivel(n){ return Math.pow(n, 3); } // mesma fórmula do boss-raid.js

// ══════════════════════════════════════════════════════════════
// TABELA DE TIPOS — replicada do boss-raid (evita import)
// ══════════════════════════════════════════════════════════════
const TYPE_CHART = {
  normal:  {rock:0.5,ghost:0,steel:0.5},
  fire:    {fire:0.5,water:0.5,grass:2,ice:2,bug:2,rock:0.5,dragon:0.5,steel:2},
  water:   {fire:2,water:0.5,grass:0.5,ground:2,rock:2,dragon:0.5},
  electric:{water:2,electric:0.5,grass:0.5,ground:0,flying:2,dragon:0.5},
  grass:   {fire:0.5,water:2,grass:0.5,poison:0.5,ground:2,flying:0.5,bug:0.5,rock:2,dragon:0.5,steel:0.5},
  ice:     {fire:0.5,water:0.5,grass:2,ice:0.5,ground:2,flying:2,dragon:2,steel:0.5},
  fighting:{normal:2,ice:2,poison:0.5,flying:0.5,psychic:0.5,bug:0.5,rock:2,ghost:0,dark:2,steel:2,fairy:0.5},
  poison:  {grass:2,poison:0.5,ground:0.5,rock:0.5,ghost:0.5,steel:0,fairy:2},
  ground:  {fire:2,electric:2,grass:0.5,poison:2,flying:0,bug:0.5,rock:2,steel:2},
  flying:  {electric:0.5,grass:2,fighting:2,bug:2,rock:0.5,steel:0.5},
  psychic: {fighting:2,poison:2,psychic:0.5,dark:0,steel:0.5},
  bug:     {fire:0.5,grass:2,fighting:0.5,flying:0.5,psychic:2,ghost:0.5,dark:2,steel:0.5,fairy:0.5,poison:0.5},
  rock:    {fire:2,ice:2,fighting:0.5,ground:0.5,flying:2,bug:2,steel:0.5},
  ghost:   {normal:0,psychic:2,ghost:2,dark:0.5},
  dragon:  {dragon:2,steel:0.5,fairy:0},
  dark:    {fighting:0.5,psychic:2,ghost:2,dark:0.5,fairy:0.5},
  steel:   {fire:0.5,water:0.5,electric:0.5,ice:2,rock:2,steel:0.5,fairy:2},
  fairy:   {fire:0.5,fighting:2,poison:0.5,dragon:2,dark:2,steel:0.5},
};

const POKEMON_TIPOS = {
  bulbasaur:['grass','poison'],chikorita:['grass'],treecko:['grass'],turtwig:['grass'],
  snivy:['grass'],chespin:['grass'],rowlet:['grass','flying'],grookey:['grass'],sprigatito:['grass'],
  charmander:['fire'],cyndaquil:['fire'],torchic:['fire'],chimchar:['fire'],tepig:['fire'],
  fennekin:['fire'],litten:['fire'],scorbunny:['fire'],fuecoco:['fire'],
  squirtle:['water'],totodile:['water'],mudkip:['water'],piplup:['water'],
  oshawott:['water'],froakie:['water'],popplio:['water'],sobble:['water'],quaxly:['water'],
  pikachu:['electric'],
  caterpie:['bug'], metapod:['bug'], butterfree:['bug','flying'],
  wooloo:['normal'], dubwool:['normal'],
  weedle:['bug','poison'], kakuna:['bug','poison'], beedrill:['bug','poison'],
  spinarak:['bug','poison'], ariados:['bug','poison'],
  // evoluções
  ivysaur:['grass','poison'],venusaur:['grass','poison'],bayleef:['grass'],meganium:['grass'],
  grovyle:['grass'],sceptile:['grass'],grotle:['grass'],torterra:['grass','ground'],
  servine:['grass'],serperior:['grass'],quilladin:['grass'],chesnaught:['grass','fighting'],
  dartrix:['grass','flying'],decidueye:['grass','ghost'],thwackey:['grass'],rillaboom:['grass'],
  floragato:['grass'],meowscarada:['grass','dark'],
  charmeleon:['fire'],charizard:['fire','flying'],quilava:['fire'],typhlosion:['fire'],
  combusken:['fire','fighting'],blaziken:['fire','fighting'],monferno:['fire','fighting'],
  infernape:['fire','fighting'],pignite:['fire','fighting'],emboar:['fire','fighting'],
  braixen:['fire','psychic'],delphox:['fire','psychic'],torracat:['fire'],incineroar:['fire','dark'],
  raboot:['fire'],cinderace:['fire'],crocalor:['fire'],skeledirge:['fire','ghost'],
  wartortle:['water'],blastoise:['water'],croconaw:['water'],feraligatr:['water'],
  marshtomp:['water','ground'],swampert:['water','ground'],prinplup:['water'],empoleon:['water','steel'],
  dewott:['water'],samurott:['water'],frogadier:['water'],greninja:['water','dark'],
  brionne:['water'],primarina:['water','fairy'],drizzile:['water'],inteleon:['water'],
  quaxwell:['water'],quaquaval:['water','fighting'],
};

const BASE_STATS = {
  bulbasaur:{hp:45,atk:49,def:49,spa:65,spd:65,spe:45},chikorita:{hp:45,atk:49,def:65,spa:49,spd:65,spe:45},
  treecko:{hp:40,atk:45,def:35,spa:65,spd:55,spe:70},turtwig:{hp:55,atk:68,def:64,spa:45,spd:55,spe:31},
  snivy:{hp:45,atk:45,def:55,spa:45,spd:55,spe:63},chespin:{hp:56,atk:61,def:65,spa:48,spd:45,spe:38},
  rowlet:{hp:68,atk:55,def:55,spa:50,spd:50,spe:42},grookey:{hp:50,atk:65,def:50,spa:40,spd:40,spe:65},
  sprigatito:{hp:40,atk:61,def:54,spa:45,spd:45,spe:65},
  charmander:{hp:39,atk:52,def:43,spa:60,spd:50,spe:65},cyndaquil:{hp:39,atk:52,def:43,spa:60,spd:50,spe:65},
  torchic:{hp:45,atk:60,def:40,spa:70,spd:50,spe:45},chimchar:{hp:44,atk:58,def:44,spa:58,spd:44,spe:61},
  tepig:{hp:65,atk:63,def:45,spa:45,spd:45,spe:45},fennekin:{hp:40,atk:45,def:40,spa:62,spd:60,spe:60},
  litten:{hp:45,atk:65,def:40,spa:60,spd:40,spe:70},scorbunny:{hp:50,atk:71,def:40,spa:40,spd:40,spe:69},
  fuecoco:{hp:67,atk:45,def:59,spa:63,spd:40,spe:36},
  squirtle:{hp:44,atk:48,def:65,spa:50,spd:64,spe:43},totodile:{hp:50,atk:65,def:64,spa:44,spd:48,spe:43},
  mudkip:{hp:50,atk:70,def:50,spa:50,spd:50,spe:40},piplup:{hp:53,atk:51,def:53,spa:61,spd:56,spe:40},
  oshawott:{hp:55,atk:55,def:45,spa:63,spd:45,spe:45},froakie:{hp:41,atk:56,def:40,spa:62,spd:44,spe:71},
  popplio:{hp:50,atk:54,def:54,spa:66,spd:56,spe:40},sobble:{hp:50,atk:40,def:40,spa:70,spd:40,spe:70},
  quaxly:{hp:55,atk:65,def:45,spa:50,spd:45,spe:50},pikachu:{hp:35,atk:55,def:40,spa:50,spd:50,spe:90},
  caterpie:{hp:45,atk:30,def:35,spa:20,spd:20,spe:45},metapod:{hp:50,atk:20,def:55,spa:25,spd:25,spe:30},
  wooloo:{hp:42,atk:40,def:55,spa:40,spd:45,spe:48},weedle:{hp:40,atk:35,def:30,spa:20,spd:20,spe:50},
  kakuna:{hp:45,atk:25,def:50,spa:25,spd:25,spe:35},
  spinarak:{hp:40,atk:60,def:40,spa:40,spd:40,spe:30},
};
// Evoluções — fallback para BASE_STATS se não encontrar
const BASE_STATS_EVO = {
  venusaur:{hp:80,atk:82,def:83,spa:100,spd:100,spe:80},charizard:{hp:78,atk:84,def:78,spa:109,spd:85,spe:100},
  blastoise:{hp:79,atk:83,def:100,spa:85,spd:105,spe:78},
  feraligatr:{hp:85,atk:105,def:100,spa:79,spd:83,spe:78},
  swampert:{hp:100,atk:110,def:90,spa:85,spd:90,spe:60},
  empoleon:{hp:84,atk:86,def:88,spa:111,spd:101,spe:60},
  samurott:{hp:95,atk:100,def:85,spa:108,spd:70,spe:70},
  greninja:{hp:72,atk:95,def:67,spa:103,spd:71,spe:122},
  primarina:{hp:80,atk:74,def:74,spa:126,spd:116,spe:60},
  inteleon:{hp:70,atk:85,def:65,spa:125,spd:65,spe:120},
  quaquaval:{hp:85,atk:120,def:80,spa:85,spd:75,spe:85},
  meganium:{hp:80,atk:82,def:100,spa:83,spd:100,spe:80},
  sceptile:{hp:70,atk:85,def:65,spa:105,spd:85,spe:120},
  torterra:{hp:95,atk:109,def:105,spa:75,spd:85,spe:56},
  serperior:{hp:75,atk:75,def:95,spa:75,spd:95,spe:113},
  chesnaught:{hp:88,atk:107,def:122,spa:74,spd:75,spe:64},
  decidueye:{hp:78,atk:107,def:75,spa:100,spd:100,spe:70},
  rillaboom:{hp:100,atk:125,def:90,spa:60,spd:70,spe:85},
  meowscarada:{hp:76,atk:110,def:70,spa:81,spd:70,spe:123},
  blaziken:{hp:80,atk:120,def:70,spa:110,spd:70,spe:80},
  infernape:{hp:76,atk:104,def:71,spa:104,spd:71,spe:108},
  emboar:{hp:110,atk:123,def:65,spa:100,spd:65,spe:65},
  delphox:{hp:75,atk:69,def:72,spa:114,spd:100,spe:104},
  incineroar:{hp:95,atk:115,def:90,spa:80,spd:90,spe:60},
  cinderace:{hp:80,atk:116,def:75,spa:65,spd:75,spe:119},
  skeledirge:{hp:104,atk:75,def:100,spa:110,spd:75,spe:66},
  typhlosion:{hp:78,atk:84,def:78,spa:109,spd:85,spe:100},
  // Bug/Wooloo/Weedle lines
  butterfree:{hp:60,atk:45,def:50,spa:90,spd:80,spe:70},
  dubwool:{hp:72,atk:80,def:100,spa:60,spd:90,spe:88},
  beedrill:{hp:65,atk:90,def:40,spa:45,spd:80,spe:75},
  ariados:{hp:70,atk:90,def:70,spa:60,spd:70,spe:40},
  ivysaur:{hp:60,atk:62,def:63,spa:80,spd:80,spe:60},
};

const NATURES = {
  Hardy:{up:null,down:null},Lonely:{up:'atk',down:'def'},Brave:{up:'atk',down:'spe'},
  Adamant:{up:'atk',down:'spa'},Naughty:{up:'atk',down:'spd'},Bold:{up:'def',down:'atk'},
  Docile:{up:null,down:null},Relaxed:{up:'def',down:'spe'},Impish:{up:'def',down:'spa'},
  Lax:{up:'def',down:'spd'},Timid:{up:'spe',down:'atk'},Hasty:{up:'spe',down:'def'},
  Serious:{up:null,down:null},Jolly:{up:'spe',down:'spa'},Naive:{up:'spe',down:'spd'},
  Modest:{up:'spa',down:'atk'},Mild:{up:'spa',down:'def'},Quiet:{up:'spa',down:'spe'},
  Bashful:{up:null,down:null},Rash:{up:'spa',down:'spd'},Calm:{up:'spd',down:'atk'},
  Gentle:{up:'spd',down:'def'},Sassy:{up:'spd',down:'spe'},Careful:{up:'spd',down:'spa'},
  Quirky:{up:null,down:null},
};

// ══════════════════════════════════════════════════════════════
// LEARNSETS — para detectar golpe aprendido ao subir de nível
// ══════════════════════════════════════════════════════════════
const LEARNSETS_BATTLE = {
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
  caterpie:   [[1,'tackle'],[1,'string_shot'],[5,'bug_bite']],
  weedle:     [[1,'poison_sting'],[1,'string_shot']],
  kakuna:     [[1,'harden'],[7,'poison_sting']],
  beedrill:   [[1,'fury_attack'],[10,'twineedle'],[15,'poison_jab'],[20,'agility'],[28,'pin_missile'],[35,'x_scissor']],
  spinarak:   [[1,'poison_sting'],[1,'string_shot'],[5,'absorb'],[8,'scary_face'],[12,'shadow_sneak'],[15,'fury_swipes'],[19,'sucker_punch'],[22,'pin_missile'],[26,'agility'],[30,'poison_jab'],[35,'bug_bite']],
  ariados:    [[1,'poison_sting'],[1,'string_shot'],[1,'absorb'],[1,'bug_bite'],[8,'scary_face'],[12,'shadow_sneak'],[15,'fury_swipes'],[19,'sucker_punch'],[23,'pin_missile'],[28,'agility'],[33,'poison_jab'],[40,'x_scissor']],
  wooloo:     [[1,'tackle'],[1,'growl'],[4,'defense_curl'],[8,'rollout'],[12,'round'],[16,'double_kick'],[20,'take_down'],[24,'charm'],[28,'bulk_up'],[32,'double_edge']],
  metapod:    [[1,'harden']],
  butterfree: [[1,'confusion'],[1,'sleep_powder'],[10,'gust'],[12,'stun_spore'],[14,'psybeam'],[16,'silver_wind'],[18,'supersonic'],[21,'tailwind'],[24,'safeguard'],[27,'whirlwind'],[30,'psychic_move'],[33,'bug_buzz'],[36,'quiver_dance']],
};
function golpeAprendidoNoNivel(pokemon, nivel) {
  const ls = LEARNSETS_BATTLE[pokemon] || [];
  const entry = ls.find(([lvl]) => lvl === nivel);
  return entry ? entry[1] : null;
}

// Cadeia evolutiva para golpesAteNivelBattle (espelha EVOLUTION_CHAIN do boss-raid.js)
const EVOLUTION_CHAIN_BATTLE = {
  bulbasaur:   { evolvesTo: 'ivysaur',      levelReq: 16 },
  ivysaur:     { evolvesTo: 'venusaur',     levelReq: 32 },
  charmander:  { evolvesTo: 'charmeleon',   levelReq: 16 },
  charmeleon:  { evolvesTo: 'charizard',    levelReq: 36 },
  squirtle:    { evolvesTo: 'wartortle',    levelReq: 16 },
  wartortle:   { evolvesTo: 'blastoise',    levelReq: 36 },
  caterpie:    { evolvesTo: 'metapod',      levelReq: 7  },
  metapod:     { evolvesTo: 'butterfree',   levelReq: 10 },
  chikorita:   { evolvesTo: 'bayleef',      levelReq: 16 },
  bayleef:     { evolvesTo: 'meganium',     levelReq: 32 },
  cyndaquil:   { evolvesTo: 'quilava',      levelReq: 14 },
  quilava:     { evolvesTo: 'typhlosion',   levelReq: 36 },
  totodile:    { evolvesTo: 'croconaw',     levelReq: 18 },
  croconaw:    { evolvesTo: 'feraligatr',   levelReq: 30 },
  treecko:     { evolvesTo: 'grovyle',      levelReq: 16 },
  grovyle:     { evolvesTo: 'sceptile',     levelReq: 36 },
  torchic:     { evolvesTo: 'combusken',    levelReq: 16 },
  combusken:   { evolvesTo: 'blaziken',     levelReq: 36 },
  mudkip:      { evolvesTo: 'marshtomp',    levelReq: 16 },
  marshtomp:   { evolvesTo: 'swampert',     levelReq: 36 },
  turtwig:     { evolvesTo: 'grotle',       levelReq: 18 },
  grotle:      { evolvesTo: 'torterra',     levelReq: 32 },
  chimchar:    { evolvesTo: 'monferno',     levelReq: 14 },
  monferno:    { evolvesTo: 'infernape',    levelReq: 36 },
  piplup:      { evolvesTo: 'prinplup',     levelReq: 16 },
  prinplup:    { evolvesTo: 'empoleon',     levelReq: 36 },
  snivy:       { evolvesTo: 'servine',      levelReq: 17 },
  servine:     { evolvesTo: 'serperior',    levelReq: 36 },
  tepig:       { evolvesTo: 'pignite',      levelReq: 17 },
  pignite:     { evolvesTo: 'emboar',       levelReq: 36 },
  oshawott:    { evolvesTo: 'dewott',       levelReq: 17 },
  dewott:      { evolvesTo: 'samurott',     levelReq: 36 },
  chespin:     { evolvesTo: 'quilladin',    levelReq: 16 },
  quilladin:   { evolvesTo: 'chesnaught',   levelReq: 36 },
  fennekin:    { evolvesTo: 'braixen',      levelReq: 16 },
  braixen:     { evolvesTo: 'delphox',      levelReq: 36 },
  froakie:     { evolvesTo: 'frogadier',    levelReq: 16 },
  frogadier:   { evolvesTo: 'greninja',     levelReq: 36 },
  rowlet:      { evolvesTo: 'dartrix',      levelReq: 17 },
  dartrix:     { evolvesTo: 'decidueye',    levelReq: 34 },
  litten:      { evolvesTo: 'torracat',     levelReq: 17 },
  torracat:    { evolvesTo: 'incineroar',   levelReq: 34 },
  popplio:     { evolvesTo: 'brionne',      levelReq: 17 },
  brionne:     { evolvesTo: 'primarina',    levelReq: 34 },
  grookey:     { evolvesTo: 'thwackey',     levelReq: 16 },
  thwackey:    { evolvesTo: 'rillaboom',    levelReq: 35 },
  scorbunny:   { evolvesTo: 'raboot',       levelReq: 16 },
  raboot:      { evolvesTo: 'cinderace',    levelReq: 35 },
  sobble:      { evolvesTo: 'drizzile',     levelReq: 16 },
  drizzile:    { evolvesTo: 'inteleon',     levelReq: 35 },
  sprigatito:  { evolvesTo: 'floragato',    levelReq: 16 },
  floragato:   { evolvesTo: 'meowscarada', levelReq: 36 },
  fuecoco:     { evolvesTo: 'crocalor',     levelReq: 16 },
  crocalor:    { evolvesTo: 'skeledirge',   levelReq: 36 },
  quaxly:      { evolvesTo: 'quaxwell',     levelReq: 16 },
  quaxwell:    { evolvesTo: 'quaquaval',    levelReq: 36 },
  wooloo:      { evolvesTo: 'dubwool',      levelReq: 24 },
  weedle:      { evolvesTo: 'kakuna',       levelReq: 7  },
  kakuna:      { evolvesTo: 'beedrill',     levelReq: 10 },
  spinarak:    { evolvesTo: 'ariados',      levelReq: 22 },
};

// Retorna os golpes aprendíveis até 'nivel' para 'pokemon',
// incluindo golpes herdados das formas anteriores (cadeia evolutiva).
// Ex: Metapod nível 8 terá tackle, string_shot (de Caterpie) + harden (de Metapod)
function golpesAteNivelBattle(pokemon, nivel) {
  // Construir cadeia de formas anteriores
  const cadeia = [];
  let cur = pokemon;
  // Subir até a forma base
  const encontrarAntecessor = (poke) => {
    for (const [base, data] of Object.entries(EVOLUTION_CHAIN_BATTLE || {})) {
      if (data.evolvesTo === poke) return base;
    }
    return null;
  };
  // Montar cadeia [base, evo1, evo2, ...] até pokemon atual
  const cadeiaTmp = [cur];
  let ant = encontrarAntecessor(cur);
  while (ant) { cadeiaTmp.unshift(ant); ant = encontrarAntecessor(ant); }

  // Acumular golpes de todas as formas, em ordem
  // Forma anterior: todos os golpes até o nível de evolução
  // Forma atual: golpes até o nível atual
  let golpesAcumulados = [];
  for (let i = 0; i < cadeiaTmp.length; i++) {
    const forma = cadeiaTmp[i];
    const isAtual = forma === pokemon;
    // Nível até onde buscar nesta forma
    // Para formas anteriores: até o nível de evolução para a próxima
    let nivelLimite = nivel;
    if (!isAtual) {
      // Buscar até o nível de evolução
      const evoData = EVOLUTION_CHAIN_BATTLE?.[forma];
      nivelLimite = evoData ? evoData.levelReq : 100;
    }
    const ls = LEARNSETS_BATTLE[forma] || [];
    const novos = ls
      .filter(([lvl]) => lvl <= nivelLimite)
      .map(([,k]) => k)
      .filter(k => !golpesAcumulados.includes(k)); // sem duplicatas
    golpesAcumulados.push(...novos);
  }
  // Manter apenas os últimos 4
  return golpesAcumulados.slice(-4);
}


// ══════════════════════════════════════════════════════════════
// FÓRMULAS DE STATS — Gen 3+
// ══════════════════════════════════════════════════════════════
// ── Ability mínima para pokémons capturados em boss raid ────────────
// Tabela de abilities dos bosses disponíveis no BOSS_CONFIG
const BOSS_ABILITIES = {
  caterpie: { normal: ['shield_dust','run_away'], hidden: 'run_away' },
  staryu:   { normal: ['illuminate','natural_cure'], hidden: 'analytic' },
  mawile:   { normal: ['hyper_cutter','intimidate'], hidden: 'sheer_force' },
  spinarak: { normal: ['swarm','insomnia'], hidden: 'sniper' },
  weedle:   { normal: ['run_away'], hidden: 'sniper' },
  wooloo:   { normal: ['fluffy','run_away'], hidden: 'bulletproof' },
};
function gerarAbilityBoss(pokemon) {
  const entry = BOSS_ABILITIES[pokemon];
  if (!entry) return null; // boss-raid.js gerará ao abrir o perfil
  if (Math.random() < 0.05 && entry.hidden) return entry.hidden;
  const normais = entry.normal;
  return normais[Math.floor(Math.random() * normais.length)];
}

// ── SPE do player para ordenação do turno ────────────────────────────
// Usa calcStats se disponível, senão usa base SPE direto
function calcSpePlayer(playerData) {
  try {
    const pokeName = playerData.pokemon;
    const stats = calcStats(pokeName, playerData.ivs || {}, playerData.nivel || 1,
                            playerData.nature || 'Hardy', playerData.evs || {});
    return stats.spe;
  } catch(e) {
    // Fallback: usar base stats se calcStats falhar
    const bs = BASE_STATS_EVO[playerData.pokemon] || BASE_STATS[playerData.pokemon];
    if (bs) return Math.floor((2 * bs.spe) * (playerData.nivel || 1) / 100 + 5);
    return 0;
  }
}

function calcHP(base,iv,ev,lvl){ return Math.floor((2*base+(iv||0)+Math.floor((ev||0)/4))*lvl/100+lvl+10); }
function calcStat(base,iv,ev,lvl,natMod=1.0){ return Math.floor(Math.floor((2*base+(iv||0)+Math.floor((ev||0)/4))*lvl/100+5)*natMod); }

function calcStats(pokemon,ivs,lvl,nature,evs){
  const bs  = BASE_STATS_EVO[pokemon]||BASE_STATS[pokemon]||BASE_STATS.pikachu;
  const nat = NATURES[nature]||{up:null,down:null};
  evs = evs||{};
  const m = k => nat.up===k?1.1:nat.down===k?0.9:1.0;
  return {
    hp:  calcHP  (bs.hp,  ivs?.hp,  evs.hp,  lvl),
    atk: calcStat(bs.atk, ivs?.atk, evs.atk, lvl, m('atk')),
    def: calcStat(bs.def, ivs?.def, evs.def, lvl, m('def')),
    spa: calcStat(bs.spa, ivs?.spa, evs.spa, lvl, m('spa')),
    spd: calcStat(bs.spd, ivs?.spd, evs.spd, lvl, m('spd')),
    spe: calcStat(bs.spe, ivs?.spe, evs.spe, lvl, m('spe')),
  };
}

// ── Fórmula de dano Gen 3+ ────────────────────────────────────
function calcDano(atkStats, defStats, move, atkTipos, defTipos, nivel){
  if (!move || !move.power) return 0;
  const A   = move.cat === 'physical' ? atkStats.atk : atkStats.spa;
  const D   = move.cat === 'physical' ? defStats.def : defStats.spd;
  const N   = nivel || 1;
  const baseDmg = Math.floor((Math.floor((2*N/5)+2) * move.power * A / D) / 50 + 2);
  // STAB
  const stab = (atkTipos||[]).includes(move.type) ? 1.5 : 1.0;
  // Efetividade
  let eff = 1;
  (defTipos||['normal']).forEach(dt => { eff *= ((TYPE_CHART[move.type]||{})[dt] !== undefined ? TYPE_CHART[move.type][dt] : 1); });
  // Crítico (1/16 chance, x2)
  const crit = Math.random() < 1/16 ? 2.0 : 1.0;
  // Random 85-100%
  const rnd = (0.85 + Math.random() * 0.15);
  return { dmg: Math.max(1, Math.floor(baseDmg * stab * eff * crit * rnd)), eff, crit, stab };
}

// ── Fórmula de dano do boss ────────────────────────────────────
function calcBossAtk(bossStats, playerStats, move, bossTipos, playerTipos, bossNivel){
  if (!move || !move.power) return { dmg:0, eff:1, msg:'status' };
  const A   = move.cat === 'physical' ? bossStats.atk : bossStats.spa;
  const D   = move.cat === 'physical' ? playerStats.def : playerStats.spd;
  const baseDmg = Math.floor((Math.floor((2*(bossNivel||30)/5)+2) * move.power * A / D) / 50 + 2);
  const stab = (bossTipos||[]).includes(move.type) ? 1.5 : 1.0;
  let eff = 1;
  (playerTipos||['normal']).forEach(dt => { eff *= ((TYPE_CHART[move.type]||{})[dt] !== undefined ? TYPE_CHART[move.type][dt] : 1); });
  const rnd  = 0.85 + Math.random() * 0.15;
  const crit = Math.random() < 1/16 ? 2.0 : 1.0;
  return { dmg: Math.max(1, Math.floor(baseDmg * stab * eff * crit * rnd)), eff, crit };
}

// ══════════════════════════════════════════════════════════════
// STAGES DE STAT (Gen 3 — multiplicadores reais)
// ══════════════════════════════════════════════════════════════
function stageMult(stage){
  // stage: -6 a +6
  // Positivo: (2 + stage) / 2   → +1 stage = 1.5×, +2 = 2×, etc.
  // Negativo: 2 / (2 + |stage|) → -1 stage = 0.67×, -2 = 0.5×, etc.
  const s = Math.max(-6, Math.min(6, stage || 0));
  return s >= 0 ? (2 + s) / 2 : 2 / (2 - s);
}

function applyBossStage(stat, delta){
  const antes = _bossStages[stat] || 0;
  _bossStages[stat] = Math.max(-6, Math.min(6, antes + delta));
  return _bossStages[stat] - antes; // variação real (pode ser 0 se já no limite)
}

function applyPlayerStage(uid, stat, delta){
  if (!_playerStages[uid]) _playerStages[uid] = { atk:0, def:0, spa:0, spd:0, spe:0 };
  const antes = _playerStages[uid][stat] || 0;
  _playerStages[uid][stat] = Math.max(-6, Math.min(6, antes + delta));
  return _playerStages[uid][stat] - antes;
}

// Aplicar stages ao calcular dano (wraps calcDano/calcBossAtk)
function getEffStat(baseVal, stat, stages){
  return Math.max(1, Math.floor(baseVal * stageMult(stages?.[stat] || 0)));
}

// ══════════════════════════════════════════════════════════════
// ESTADO DA BATALHA
// ══════════════════════════════════════════════════════════════
let _uid        = null;
let _userData   = null;
let _salaId     = null;
let _battleRef  = null;  // boss_salas/{id}/battle
let _playersRef = null;
let _bossRef    = null;
let _battleSnap = null;  // último estado da batalha
let _myTurn     = false;
let _actionDone = false;
let _turnTimer  = null;
let _bossData   = null;   // dados vindos do Firebase (boss_ativo.boss)

// Firebase descarta null; o scheduler grava false no lugar.
// Esta função restaura false → null nos campos de golpe antes de usar.
function desserializarGolpes(golpes) {
  return (golpes || []).map(g => {
    const out = {};
    for (const [k, v] of Object.entries(g)) {
      out[k] = v === false ? null : v;
    }
    return out;
  });
}
let _bossNome   = null;   // nome do boss ativo (ex: 'Caterpie')
let _bossStats  = null;
let _capturePhase = false;
let _bossAttacking = false; // flag global: boss está executando ataque agora
let _myCaptureResult = null; // 'caught' | 'failed' | 'skipped' — resultado desta raid
let _dropsShown = false;     // garante que o popup só abre uma vez
let _reinitDone = false;     // garante que o re-init de pokemon só ocorre uma vez
let _bossStandbySlot = null; // pokémon capturado quando time está cheio (stand-by)

// ── Modificadores de batalha (em memória, dono = quem lê é o líder da batalha) ──
// Stages de stat do boss: { atk:0, def:0, spa:0, spd:0, spe:0 } (-6 a +6)
let _bossStages   = { atk:0, def:0, spa:0, spd:0, spe:0 };
// Stages dos players por uid (ex: debuffs aplicados pelo boss)
let _playerStages = {};  // { uid: { atk:0, def:0, spe:0, ... } }
// Status conditions do boss: { sleep: turnosRestantes, confusion: bool }
let _bossStatus   = { sleep:0, confusion:false };

// helpers
const cap = s => s ? s.charAt(0).toUpperCase()+s.slice(1) : '';

// Sanitiza strings antes de inserir em innerHTML — previne XSS
function sanitize(str){
  if (!str) return '';
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}
function mostrarErro(titulo,msg,icone='💀'){
  document.getElementById('btLoading').style.display='none';
  document.getElementById('arena').style.display='none';
  document.getElementById('btErroIcon').textContent=icone||'💀';
  document.getElementById('btErroTitulo').textContent=titulo;
  document.getElementById('btErroMsg').textContent=msg;
  document.getElementById('btErro').style.display='flex';
}

// ══════════════════════════════════════════════════════════════
// INICIALIZAÇÃO
// ══════════════════════════════════════════════════════════════
onAuthStateChanged(auth, async user => {
  if (!user){ window.location.href='/perfil/perfil.html'; return; }
  _uid = user.uid;

  const params  = new URLSearchParams(window.location.search);
  const salaId  = (params.get('sala')||'').toUpperCase().trim();
  if (!salaId){ mostrarErro('Invalid URL','No battle room specified.'); return; }

  // Carregar dados do Firestore em paralelo
  try {
    const snap = await getDoc(doc(fsdb,'usuarios',_uid));
    _userData = snap.exists() ? snap.data() : {};
  } catch(e){ _userData = {}; }

  _salaId     = salaId;
  _battleRef  = ref(rdb, `boss_salas/${salaId}/battle`);
  _playersRef = ref(rdb, `boss_salas/${salaId}/players`);
  _bossRef    = ref(rdb, `boss_salas/${salaId}`);

  // ── 1. Verificar se a sala existe ────────────────────────
  document.getElementById('btLoadingMsg').textContent = 'Loading room...';
  let sala = null;
  try { sala = (await get(_bossRef)).val(); } catch(e){}
  if (!sala){ mostrarErro('Room Not Found','This battle room does not exist.'); return; }

  // ── 2. Validar boss ativo SOMENTE se a batalha ainda não foi
  //       iniciada. Se sala.estado === 'batalha', o lobby já autorizou
  //       a entrada — não precisa re-validar o boss.
  const batalhaJaAutorizada = sala.estado === 'batalha';

  if (!batalhaJaAutorizada) {
    let bossAtivo = null;
    try { bossAtivo = (await get(ref(rdb,'boss_ativo'))).val(); } catch(e){}
    const bossOk = bossAtivo?.estado === 'ativo' && Date.now() < (bossAtivo?.expiracao||0);
    if (!bossOk){
      mostrarErro('No Active Boss','The boss encounter has ended.','👻');
      return;
    }
  }

  // ── 3. Verificar se o player pertence à esta sala ─────────
  // Fontes em ordem de prioridade:
  //   A) sala.players[uid]           — player ainda no nó principal
  //   B) sala.battle_roster[uid]     — snapshot salvo por irParaBatalha()
  //                                    antes do onDisconnect limpar players/
  //   C) battle/players[uid]         — já foi inicializado pelo 1º a chegar
  document.getElementById('btLoadingMsg').textContent = 'Verifying access...';

  let playerData =
    sala.players?.[_uid] ||
    sala.battle_roster?.[_uid] ||
    null;

  if (!playerData) {
    // Ler diretamente os subnós (podem não estar no snapshot da sala inteira)
    try {
      const rosterSnap = await get(ref(rdb, `boss_salas/${salaId}/battle_roster/${_uid}`));
      if (rosterSnap.exists()) playerData = rosterSnap.val();
    } catch(e){}
  }

  if (!playerData) {
    try {
      const bpSnap = await get(ref(rdb, `boss_salas/${salaId}/battle/players/${_uid}`));
      if (bpSnap.exists()) playerData = bpSnap.val();
    } catch(e){}
  }

  if (!playerData) {
    mostrarErro('Not in Room','You are not part of this battle room.\nIf you were in the lobby, return to the home page and join again via room code.','🚫');
    return;
  }

  // Inicializar batalha — _bossData lido diretamente do Firebase (sala.boss)
  // O scheduler já grava todos os campos (tipos, baseStats, nivel, golpes, catchRate)
  // a partir do BOSS_CONFIG em boss-system.js. Nenhum dado local necessário.
  _bossNome = sala.boss?.nome || '';
  // Restaurar false → null nos campos de golpe (Firebase descarta null ao gravar)
  const bossRaw = sala.boss || null;
  _bossData = bossRaw ? { ...bossRaw, golpes: desserializarGolpes(bossRaw.golpes) } : null;

  if (!_bossData || !_bossData.baseStats || !_bossData.nivel) {
    mostrarErro('Boss Data Missing',
      'The boss data is incomplete in Firebase.\nCheck that boss-system.js has the full stats for this boss.',
      '⚠️');
    return;
  }

  const bd = _bossData.baseStats;
  const bn = _bossData.nivel;
  _bossStats = {
    hp:  calcHP(bd.hp,  31, 0, bn),
    atk: calcStat(bd.atk,31, 0, bn),
    def: calcStat(bd.def,31, 0, bn),
    spa: calcStat(bd.spa,31, 0, bn),
    spd: calcStat(bd.spd,31, 0, bn),
    spe: calcStat(bd.spe,31, 0, bn),
  };

  const battleSnap = await get(_battleRef);
  if (!battleSnap.exists()) {
    // Usar battle_roster como fonte principal — é o snapshot imutável
    // salvo por irParaBatalha() antes do onDisconnect limpar players/
    const salaAtual    = (await get(_bossRef)).val();
    const rosterSnap   = await get(ref(rdb, `boss_salas/${salaId}/battle_roster`));
    const roster       = rosterSnap.exists() ? rosterSnap.val() : {};
    const fromPlayers  = salaAtual?.players || sala?.players || {};
    // Mesclar: roster tem prioridade (mais completo), complementar com players/
    const allPlayers   = { ...fromPlayers, ...roster };

    // Ordenar por SPE calculado (maior Speed = primeiro turno), desempate por timestamp
    const playersArr = Object.keys(allPlayers)
      .filter(uid => uid !== 'boss')
      .sort((a, b) => {
        const pa = allPlayers[a], pb = allPlayers[b];
        // Calcular SPE real de cada player via calcStats
        // Precisamos dos dados do raidTeam para IVs/EVs/nature
        // Como aqui só temos pokemon+nivel do allPlayers, usamos calcStats básico
        const speA = calcSpePlayer(pa);
        const speB = calcSpePlayer(pb);
        if (speB !== speA) return speB - speA; // maior SPE primeiro
        return (pa.entrou||0) - (pb.entrou||0); // desempate: quem entrou primeiro
      });

    const playersState = {};
    playersArr.forEach(uid => {
      const p = allPlayers[uid];
      playersState[uid] = {
        uid, nick: p.nick, avatar: p.avatar,
        pokemon: p.pokemon, nivel: p.nivel||1,
        hpMax: 100, hp: 100,  // recalculado por atualizarHPPlayer()
        fainted: false, actedThisTurn: false, ppAtual: {},
      };
    });

    await set(_battleRef, {
      bossHpMax:      _bossStats.hp,
      bossHp:         _bossStats.hp,
      bossFainted:    false,
      turno:          0,
      turnOrder:      playersArr,
      currentTurnIdx: 0,
      fase:           'battle',
      players:        playersState,
      log:            [],
    });
  } else {
    // Batalha já existe — garantir que este player está no nó battle/players
    // (pode ter sido inicializado por outro player)
    const bpSnap = await get(ref(rdb, `boss_salas/${salaId}/battle/players/${_uid}`));
    if (!bpSnap.exists() && playerNaSala) {
      // Adicionar este player que chegou depois
      const p = playerNaSala;
      await set(ref(rdb, `boss_salas/${salaId}/battle/players/${_uid}`), {
        uid: _uid, nick: p.nick, avatar: p.avatar,
        pokemon: p.pokemon, nivel: p.nivel||1,
        hpMax: 100, hp: 100,
        fainted: false, actedThisTurn: false, ppAtual: {},
      });
    }
  }

  // Atualizar HP real do player baseado no raidTeam do Firestore
  await atualizarHPPlayer();

  // Atualizar estado da sala para 'batalha'
  await update(_bossRef, { estado: 'batalha' });

  // Iniciar UI
  iniciarBattleUI(sala);

  // ── Escutar estado da batalha (exceto log) ──────────────────
  // Usamos o nó raiz battle/ mas ignoramos atualizações que só mudaram o log
  let _lastBattleHash = '';
  onValue(_battleRef, snap => {
    if (!snap.exists()) return;
    const val = snap.val();
    // Calcular hash leve sem o log para detectar mudanças reais
    const { log: _log, ...battleSemLog } = val;
    const hash = JSON.stringify(battleSemLog);
    const logChanged = _log !== undefined;
    _battleSnap = val;
    if (hash !== _lastBattleHash) {
      _lastBattleHash = hash;
      renderBattle();
    }
    // Atualizar só a mensagem se mudou apenas o log
    if (logChanged && hash === _lastBattleHash) {
      const logs = _log ? Object.values(_log) : [];
      if (logs.length > 0) {
        // Ao reconectar: carregar últimas 3 entradas do log para o histórico
        const sorted = logs.sort((a,b) => (a.ts||0)-(b.ts||0));
        const recent = sorted.slice(-3);
        _battleHistory.length = 0;
        recent.forEach(e => { if(e.txt) _battleHistory.push(e.txt); });
        // Re-render o log completo
        const el = document.getElementById('msgText');
        if (el) {
          el.innerHTML = _battleHistory.map((t, i) => {
            const age = _battleHistory.length - 1 - i;
            const opacity = age === 0 ? 1 : age === 1 ? 0.55 : 0.28;
            const size = age === 0 ? '0.82rem' : age === 1 ? '0.74rem' : '0.68rem';
            const prefix = age === 0 ? '▶ ' : '  ';
            return `<div class="log-entry log-age-${age}" style="opacity:${opacity};font-size:${size}">${prefix}${t}</div>`;
          }).join('');
        }
      }
    }
  });

  // ── Escutar apenas última entrada do log ─────────────────────
  const logRef = query(ref(rdb, `boss_salas/${_salaId}/battle/log`), limitToLast(1));
  onValue(logRef, snap => {
    if (!snap.exists()) return;
    const entries = Object.values(snap.val());
    if (entries.length) setMsg(entries[entries.length - 1]?.txt || '');
  });
});

// ── Calcular e salvar HP real do player ─────────────────────
async function atualizarHPPlayer(){
  const team = _userData?.raidTeam || [];

  // Buscar dados do player em ordem de prioridade:
  // battle_roster > sala.players > battle/players
  let myTeamData = null;
  try {
    const rSnap = await get(ref(rdb, `boss_salas/${_salaId}/battle_roster/${_uid}`));
    if (rSnap.exists()) myTeamData = rSnap.val();
  } catch(e){}
  if (!myTeamData) {
    try {
      const sSnap = await get(_bossRef);
      myTeamData = sSnap.val()?.players?.[_uid] || null;
    } catch(e){}
  }
  if (!myTeamData) {
    try {
      myTeamData = (await get(ref(rdb, `boss_salas/${_salaId}/battle/players/${_uid}`))).val();
    } catch(e){}
  }
  if (!myTeamData) return;

  // Encontrar o pokemon que o player escolheu na pre-battle
  const pokeName   = myTeamData.pokemon;
  const pokemonSlot = team.find(s => s.pokemon === pokeName) || team[0];
  if (!pokemonSlot) return;

  const stats = calcStats(pokeName, pokemonSlot.ivs, pokemonSlot.nivel||1, pokemonSlot.nature||'Hardy', pokemonSlot.evs);
  const hpMax = stats.hp;
  // Se pokemon estava fainted (hpAtual=0), manter como 0 para forçar revive
  const hpAtual = (typeof pokemonSlot.hpAtual === 'number' && pokemonSlot.hpAtual > 0)
    ? pokemonSlot.hpAtual
    : (pokemonSlot.hpAtual === 0 ? 0 : hpMax);

  // Restaurar PP salvo do perfil (Firestore), ou inicializar ao máximo se novo
  const golpes   = pokemonSlot.golpes || [];
  const ppSalvo  = pokemonSlot.ppAtual || {};   // PP persistido após última batalha
  const ppInicial = {};
  golpes.forEach(key => {
    const move = MOVES_DB[key];
    if (!move) return;
    // Usar PP salvo se disponível, senão começa com máximo
    ppInicial[key] = ppSalvo[key] !== undefined
      ? Math.max(0, Math.min(ppSalvo[key], move.pp))  // clamp 0..max
      : move.pp;
  });

  await update(ref(rdb, `boss_salas/${_salaId}/battle/players/${_uid}`), {
    hpMax, hp: hpAtual, pokemon: pokeName, nivel: pokemonSlot.nivel||1,
    ivs: pokemonSlot.ivs||{}, evs: pokemonSlot.evs||{},
    nature: pokemonSlot.nature||'Hardy',
    golpes,
    ppAtual: ppInicial,
  });
}

// ══════════════════════════════════════════════════════════════
// UI
// ══════════════════════════════════════════════════════════════
function iniciarBattleUI(sala){
  document.getElementById('btLoading').style.display='none';
  document.getElementById('arena').style.display='block';

  const boss = sala.boss || {};
  document.getElementById('bossSprite').src  = boss.sprite || boss.gif || '';
  document.getElementById('bossNameTag').textContent = boss.nome || 'Boss';

  // Bloquear botão Voltar
  history.replaceState({ battle: _salaId }, '', window.location.href);
}

// ══════════════════════════════════════════════════════════════
// RENDER PRINCIPAL — chamado toda vez que o Firebase atualiza
// ══════════════════════════════════════════════════════════════
function renderBattle(){
  const bs = _battleSnap;
  if (!bs) return;

  // ── Ícones de status do boss ────────────────────────────────
  const statusIcons = [];
  if (_bossStatus.sleep > 0)      statusIcons.push(`💤×${_bossStatus.sleep}`);
  if (_bossStatus.confusion)      statusIcons.push('💫');
  if (_bossStatus.poisoned === 'toxic')  statusIcons.push('☠☠');
  else if (_bossStatus.poisoned)  statusIcons.push('☠');
  if (_bossStatus.burned)         statusIcons.push('🔥');
  const stageKeys = Object.entries(_bossStages).filter(([,v])=>v!==0);
  stageKeys.forEach(([k,v])=> statusIcons.push(`${k.toUpperCase()}${v>0?'+':''}${v}`));
  const statusEl = document.getElementById('bossStatusIcons');
  if (statusEl) statusEl.textContent = statusIcons.join('  ');

  // ── Boss HP ──────────────────────────────────────────────
  const bossHpPct = bs.bossHpMax > 0 ? Math.max(0, bs.bossHp / bs.bossHpMax * 100) : 0;
  document.getElementById('bossBarFill').style.width = bossHpPct + '%';
  document.getElementById('bossHpNums').textContent  = bs.bossFainted
    ? 'Fainted!' : `${Math.max(0,bs.bossHp)} / ${bs.bossHpMax}`;
  // Cor da barra conforme HP
  const fill = document.getElementById('bossBarFill');
  fill.style.background = bossHpPct > 50
    ? 'linear-gradient(90deg,#ff4444,#ff8800)'
    : bossHpPct > 20
    ? 'linear-gradient(90deg,#f39c12,#e67e22)'
    : 'linear-gradient(90deg,#e74c3c,#922b21)';

  // ── Sprite do boss: se capturado vira pokébola ────────────
  if (bs.fase === 'captured'){
    document.getElementById('bossSprite').src = '/boss/img-items/pokebola.png';
    document.getElementById('bossSprite').style.width = '80px';
  }

  // ── Players ──────────────────────────────────────────────
  renderPlayers(bs);

  // ── Turno ────────────────────────────────────────────────
  const order   = bs.turnOrder || [];
  const curIdx  = bs.currentTurnIdx || 0;
  const curUid  = order[curIdx];
  // Captura por fila: meu turno se sou o próximo da captureQueue
  const captureQueue  = bs.captureQueue || [];
  const captureQIdx   = bs.captureQueueIdx || 0;
  const myCaptureUid  = captureQueue[captureQIdx];
  // Na captura, TODOS os players têm vez (inclusive fainted)
  _myTurn = (curUid === _uid && !bs.bossFainted) ||
            (bs.bossFainted && bs.fase === 'capture' && myCaptureUid === _uid);

  // Banner de turno
  const players = bs.players || {};
  const curPlayer = players[curUid];
  // bs.bossTurnActive é gravado no Firebase para todos os clients verem
  let bannerTxt;
  if (bs.bossTurnActive || _bossAttacking){
    bannerTxt = '🔴 Boss Turn!';
  } else if (bs.fase === 'capture'){
    const captureQueue = bs.captureQueue || [];
    const cqIdx = bs.captureQueueIdx || 0;
    const curCaptureUid = captureQueue[cqIdx];
    if (!curCaptureUid){
      bannerTxt = '⏳ Processing rewards...';
    } else if (curCaptureUid === _uid){
      bannerTxt = '🎯 Your turn to throw!';
    } else {
      const capPlayer = bs.players?.[curCaptureUid];
      bannerTxt = `⏳ ${sanitize(capPlayer?.nick || 'Player')} is throwing...`;
    }
  } else if (curUid === _uid){
    bannerTxt = '⭐ Your Turn!';
  } else {
    bannerTxt = `⏳ ${sanitize(curPlayer?.nick || 'Player')}'s turn`;
  }
  document.getElementById('turnBanner').textContent = bannerTxt;

  // ── Fase de captura ──────────────────────────────────────
  _capturePhase = bs.fase === 'capture';

  // FIX: Se entrei na fase capture e é meu turno na fila, garantir que
  // _actionDone está limpo — pode ter ficado stale do golpe que matou o boss.
  if (_capturePhase) {
    const captureQFixArr = bs.captureQueue || [];
    const captureQFixIdx = bs.captureQueueIdx || 0;
    if (captureQFixArr[captureQFixIdx] === _uid) {
      _actionDone = false;
    }
  }

  // Botões
  atualizarBotoes(bs);

  // FIX: Se battle/players[uid].pokemon diverge do que está no battle_roster
  // (player trocou de pokemon no pre-battle), re-inicializar automaticamente.
  const myPlayerSnap = bs.players?.[_uid];
  if (myPlayerSnap && _userData?.raidTeam) {
    const rosterPoke = _userData.raidTeam.find(s => s.pokemon === myPlayerSnap.pokemon);
    // Se o pokemon no battle não corresponde a nenhum slot do time real, re-init
    if (!rosterPoke && !_reinitDone) {
      _reinitDone = true;
      atualizarHPPlayer().catch(e => console.warn('reinit err:', e));
    }
    // Se o pokemon está fainted mas o player escolheu outro no pre-battle,
    // detectar via battle_roster e re-init
  }
  // Timer de turno — reiniciar se for meu turno (e não estiver fainted)
  const myFainted = myPlayerSnap?.fainted || (myPlayerSnap?.hp ?? 1) <= 0;

  // ── Auto-skip: turno pertence a player fainted → avançar automaticamente ──
  const curPlayerSnap = bs.players?.[curUid];
  const curFainted = curPlayerSnap?.fainted || (curPlayerSnap?.hp ?? 1) <= 0;
  if (curFainted && bs.fase === 'battle' && !bs.bossFainted && curUid && !_actionDone){
    if (curUid === _uid){
      // Caso 1: sou eu o fainted — eu mesmo faço o skip imediatamente
      _actionDone = true;
      setTimeout(() => avancarTurno(), 300);
    } else {
      // Caso 2: outro player está fainted e pode estar offline
      // Aguardo 3s e, se o turno não avançou, eu (player vivo) avanço
      const idxSnapshot = bs.currentTurnIdx;
      setTimeout(async () => {
        const bsNow = (await get(_battleRef)).val();
        if (!bsNow || _actionDone) return;
        // Se o índice ainda é o mesmo (ninguém avançou) e ainda é fainted
        if (bsNow.currentTurnIdx === idxSnapshot &&
            (bsNow.players?.[curUid]?.fainted || bsNow.players?.[curUid]?.hp <= 0) &&
            bsNow.fase === 'battle'){
          await avancarTurno();
        }
      }, 3000);
    }
  }

  // Na captura, fainted players também têm vez (não bloquear por myFainted)
  const myTurnOk = _myTurn && !_actionDone && (!myFainted || bs.fase === 'capture');
  if (myTurnOk){
    if (bs.fase === 'capture'){
      iniciarCaptureTimer();
    } else {
      iniciarTurnTimer();
    }
  } else {
    pararTurnTimer();
    pararCaptureTimer();
    document.getElementById('turnTimer').style.display = 'none';
  }

  // ── Fase captured: mostrar drops ────────────────────────────
  if (bs.fase === 'captured' && !_dropsShown){
    setTimeout(() => mostrarDrops(), 800);
  }

  // ── Resultado ────────────────────────────────────────────
  // 'victory' é fase legada — usar 'captured' que dispara drops
  if (bs.fase === 'victory'){
    mostrarResultado('victory', bs.capturedBy);
  } else if (bs.fase === 'defeat'){
    // Derrota: sem drops — apenas resultado
    mostrarResultado('defeat');
  }

  // Mensagem de log
  const logs = bs.log ? Object.values(bs.log) : [];
  if (logs.length > 0){
    const last = logs[logs.length - 1];
    setMsg(last.txt || '');
  }
}

// ── Renderizar cards dos players ─────────────────────────────
let _prevHps = {};
function renderPlayers(bs){
  const container = document.getElementById('playersSide');
  const players   = bs.players || {};
  const order     = bs.turnOrder || [];

  let html = '';
  order.forEach((uid, i) => {
    if (uid === 'boss') return;
    const p = players[uid];
    if (!p) return;
    const isMe      = uid === _uid;
    const isActive  = (bs.currentTurnIdx === i);
    const pct       = p.hpMax > 0 ? Math.max(0, p.hp / p.hpMax * 100) : 0;
    const barCls    = pct > 50 ? '' : pct > 20 ? 'yellow' : 'red';
    const fainted   = p.fainted || p.hp <= 0;
    const imgSrc    = p.pokemon ? `../perfil/img-pokeicon/${p.pokemon}.png` : '';

    // Efeito escada: cada player desloca +18px para a direita por índice
    // (i=0 = mais à frente/topo, i=1 um pouco atrás, etc.)
    const escadaShift = i * 22;
    html += `
    <div class="player-row ${isActive&&!fainted?'active-turn':''} ${fainted?'fainted':''}"
         id="prow-${uid}" style="position:relative; transform: translateX(${escadaShift}px);">
      <img class="player-poke-img ${fainted?'fainted':''}"
           id="pimg-${uid}"
           src="${sanitize(imgSrc)}"
           onerror="this.src='../estatisticas-shad/images/backgrounds/pikachu-left-bg.png'"
           alt="${sanitize(p.pokemon)}">
      <div class="player-info">
        <div class="player-nick">${isMe?'You':sanitize(p.nick)}</div>
        <div class="player-poke-name">${sanitize(cap(p.pokemon))||'—'}</div>
        ${(() => {
          const stages = p.statStages || {};
          const statNames = {atk:'Atk',def:'Def',spa:'Sp.A',spd:'Sp.D',spe:'Spd',acc:'Acc'};
          const tags = Object.entries(stages)
            .filter(([,v]) => v !== 0)
            .map(([stat,val]) => {
              const sign = val > 0 ? '+' : '';
              const cls  = val > 0 ? 'buff-tag' : 'debuff-tag';
              return `<span class="${cls}">${statNames[stat]||stat}${sign}${val}</span>`;
            });
          const statusTags = [];
          if (p.status === 'burn')     statusTags.push('<span class="status-tag burn">🔥BRN</span>');
          if (p.status === 'paralysis')statusTags.push('<span class="status-tag para">⚡PAR</span>');
          if (p.status === 'poison'||p.status==='toxic') statusTags.push('<span class="status-tag psn">☠PSN</span>');
          if (p.status === 'sleep')    statusTags.push('<span class="status-tag slp">💤SLP</span>');
          const all = [...statusTags, ...tags];
          return all.length ? `<div class="player-stages-row">${all.join('')}</div>` : '';
        })()}
        <div class="player-hp-bar-wrap">
          <div class="player-hp-label">
            <span>HP</span><span>${fainted?'Fainted!':Math.max(0,p.hp)+' / '+p.hpMax}</span>
          </div>
          <div class="player-bar-bg">
            <div class="player-bar-fill ${barCls}" style="width:${pct}%"></div>
          </div>
        </div>
      </div>
    </div>`;
  });
  container.innerHTML = html;

  // Mostrar floats de dano se HP mudou
  order.forEach(uid => {
    if (uid === 'boss') return;
    const p = bs.players?.[uid];
    if (!p) return;
    const prev = _prevHps[uid];
    if (prev !== undefined && prev !== p.hp){
      const diff = prev - p.hp;
      const row  = document.getElementById(`prow-${uid}`);
      if (row){
        const el = document.createElement('div');
        el.className = 'player-dmg-float' + (diff < 0 ? ' heal' : '');
        el.textContent = diff > 0 ? '-' + diff : '+' + Math.abs(diff);
        row.appendChild(el);
        setTimeout(() => el.remove(), 1500);
      }
      // Shake no sprite
      const img = document.getElementById(`pimg-${uid}`);
      if (img && diff > 0) { img.classList.add('shake'); setTimeout(()=>img.classList.remove('shake'),350); }
    }
    _prevHps[uid] = p.hp;
  });
}

// ── Atualizar estado dos botões ──────────────────────────────
function atualizarBotoes(bs){
  const me      = bs.players?.[_uid];
  const fainted = me?.fainted || me?.hp <= 0;
  const myTurn  = _myTurn && !_actionDone && !fainted;

  const bs_atualizar = _battleSnap;
  const capture_fase = bs_atualizar?.fase === 'capture';
  const captureQueue_a = bs_atualizar?.captureQueue || [];
  const captureQIdx_a  = bs_atualizar?.captureQueueIdx || 0;
  const myCaptureTurn = capture_fase && captureQueue_a[captureQIdx_a] === _uid;

  const bossTurnLock = !!_battleSnap?.bossTurnActive || _bossAttacking;
  document.getElementById('btnFight').disabled = bossTurnLock || !myTurn || _capturePhase;
  document.getElementById('btnBag').disabled   = bossTurnLock || (myCaptureTurn ? false : !myTurn);
  // Pass disponível durante captura para pular a vez
  document.getElementById('btnPass').disabled  = bossTurnLock || (myCaptureTurn ? false : !myTurn);

  if (!myTurn){
    setSubPanel(null);
  }
}

// ── Mensagem ──────────────────────────────────────────────────
// ── Histórico de batalha (últimos 3 turnos) ──────────────────
const _battleHistory = [];
function limparHistorico(){ _battleHistory.length = 0; }
function setMsg(txt){
  if (!txt) return;
  // Adicionar ao histórico e manter apenas últimos 3
  _battleHistory.push(txt);
  if (_battleHistory.length > 3) _battleHistory.shift();
  // Renderizar histórico
  const el = document.getElementById('msgText');
  if (!el) return;
  // Último = destacado, anteriores = mais apagados
  el.innerHTML = _battleHistory.map((t, i) => {
    const age = _battleHistory.length - 1 - i; // 0=mais recente, 1, 2
    const opacity = age === 0 ? 1 : age === 1 ? 0.55 : 0.28;
    const size = age === 0 ? '0.82rem' : age === 1 ? '0.74rem' : '0.68rem';
    const prefix = age === 0 ? '▶ ' : '  ';
    return `<div class="log-entry log-age-${age}" style="opacity:${opacity};font-size:${size}">${prefix}${t}</div>`;
  }).join('');
}

// ── Sub-painel ────────────────────────────────────────────────
function setSubPanel(html){
  const p = document.getElementById('subPanel');
  if (!html){ p.style.display='none'; p.innerHTML=''; return; }
  p.style.display='flex'; p.innerHTML=html;
}

// ══════════════════════════════════════════════════════════════
// AÇÕES DO PLAYER
// ══════════════════════════════════════════════════════════════

// ── Abrir painel de golpes ───────────────────────────────────
window.btOpenFight = function(){
  if (!_myTurn || _actionDone) return;
  const me     = _battleSnap?.players?.[_uid];
  const golpes = me?.golpes || [];
  const ppAtual = me?.ppAtual || {};  // { move_key: ppRestante }

  let html = '<button class="sub-back" onclick="setSubPanel(null)">← Back</button>';

  if (!golpes.length) {
    html += '<div style="font-size:0.7rem;color:#555;padding:8px">No moves configured.<br>Set up your team first.</div>';
    setSubPanel(html);
    return;
  }

  html += '<div class="move-grid">';
  golpes.forEach((key, i) => {
    const move = MOVES_DB[key] || { name: cap(key.replace(/_/g,' ')), type:'normal', cat:'status', power:null, acc:100, pp:15 };
    const cor  = TIPO_CORES[move.type] || '#888';
    const ppMax    = move.pp || 10;
    const ppLeft   = ppAtual[key] !== undefined ? ppAtual[key] : ppMax;
    const ppPct    = Math.max(0, ppLeft / ppMax * 100);
    const ppColor  = ppPct > 50 ? '#fff' : ppPct > 20 ? '#f8d030' : '#e74c3c';
    const catIcon  = move.cat === 'physical' ? '⚔' : move.cat === 'special' ? '✨' : '●';
    const pwrTxt   = move.power ? `PWR <b>${move.power}</b>` : `<b>Status</b>`;
    const accTxt   = move.acc   ? `ACC <b>${move.acc}%</b>`  : `ACC <b>—</b>`;
    const disabled = ppLeft <= 0 ? 'disabled' : '';

    html += `
    <button class="move-card" ${disabled}
      style="background:linear-gradient(135deg,${cor}cc,${cor}88)"
      onclick="window.btUsarGolpe(${i},'${key}')">
      <div class="move-card-top">
        <span class="move-type-badge">${move.type.toUpperCase()}</span>
        <span class="move-name">${move.name}</span>
      </div>
      <div class="move-card-bot">
        <span class="move-stat">${catIcon} ${pwrTxt}</span>
        <span class="move-stat">${accTxt}</span>
        <span class="move-pp" style="color:${ppColor}">PP <b>${ppLeft}/${ppMax}</b></span>
      </div>
    </button>`;
  });
  html += '</div>';
  // Hint de Struggle se todos os PP estão zerados
  const todosVazios = golpes.every(key => (ppAtual[key] ?? (MOVES_DB[key]?.pp||10)) <= 0);
  if (todosVazios){
    html += '<div style="font-size:0.65rem;color:#f8d030;padding:4px 8px;text-align:center">⚠ All PP depleted — use Pass to wait</div>';
  }
  setSubPanel(html);
};

// ── Abrir bag ────────────────────────────────────────────────
window.btOpenBag = function(){
  // Na fase de captura o _actionDone pode estar stale (veio do golpe que matou o boss)
  const isMyCaptureQ = _battleSnap?.fase === 'capture' &&
    (_battleSnap?.captureQueue||[])[_battleSnap?.captureQueueIdx||0] === _uid;
  if (!isMyCaptureQ && (!_myTurn || _actionDone)) return;
  const bag = _userData?.raidBag || {};

  const ITEM_INFO = {
    pokebola:     { name:'Poké Ball',    img:'pokebola',      isBall:true  },
    great_ball:   { name:'Great Ball',   img:'great_ball',    isBall:true  },
    ultra_ball:   { name:'Ultra Ball',   img:'ultra_ball',    isBall:true  },
    potion:       { name:'Potion',       img:'potion',        heal:20,  isBall:false },
    super_potion: { name:'Super Potion', img:'super_potion',  heal:60,  isBall:false },
    hyper_potion: { name:'Hyper Potion', img:'hyper_potion',  heal:120, isBall:false },
    max_potion:   { name:'Max Potion',   img:'max_potion',    heal:9999,isBall:false },
    revive:       { name:'Revive',       img:'revive',        revive:true, isBall:false },
    full_restore: { name:'Full Restore', img:'full_restore',  heal:9999,isBall:false },
    ether:        { name:'Ether',        img:'ether',         isEther:true, isBall:false },
  };

  let html = '<button class="sub-back" onclick="setSubPanel(null)">← Back</button>';
  let found = false;

  Object.entries(ITEM_INFO).forEach(([key, info]) => {
    const qty = bag[key] || 0;
    if (!qty) return;
    found = true;
    // Pokébola só disponível na fase de captura
    const disabled = (info.isBall && !_capturePhase) ? 'disabled title="Only usable after boss is defeated"' : '';
    const onclickFn = info.isEther ? `window.btUsarEther('${key}')` : `window.btUsarItem('${key}')`;
    html += `<button class="sub-btn" ${disabled} onclick="${onclickFn}">
      <img src="/boss/img-items/${info.img}.png" style="width:14px;height:14px;vertical-align:middle;margin-right:4px"
           onerror="this.style.display='none'">
      ${info.name} ×${qty}
      ${info.isBall ? '<span style="color:#888;font-size:0.6rem">(capture)</span>' : ''}
      ${info.isEther ? '<span style="color:#9b59b6;font-size:0.6rem">(PP +20)</span>' : ''}
    </button>`;
  });
  if (!found) html += '<div style="font-size:0.7rem;color:#555;padding:8px">Your bag is empty.</div>';

  setSubPanel(html);
};


// ── Ether na batalha: primeiro seleciona aliado, depois golpe ──
window.btUsarEther = function(itemKey) {
  if (!_myTurn || _actionDone) return;
  const bag  = _userData?.raidBag || {};
  if ((bag[itemKey] || 0) < 1) return;

  // Passo 1: selecionar pokemon aliado (só o próprio por enquanto)
  // mostrar lista de aliados com PP info
  const snap    = _battleSnap || {};
  const players = snap.players || {};
  const meData  = players[_uid] || {};
  const golpes  = meData.golpes || [];
  const ppAtual = meData.ppAtual || {};

  const TIPO_CORES_B = {
    normal:'#aaa',water:'#6390f0',fire:'#ee8130',grass:'#7ac74c',
    electric:'#f7d02c',ice:'#96d9d6',fighting:'#c22e28',poison:'#a33ea1',
    ground:'#e2bf65',flying:'#a98ff3',psychic:'#f95587',bug:'#a6b91a',
    rock:'#b6a136',ghost:'#735797',dragon:'#6f35fc',dark:'#705746',
    steel:'#b7b7ce',fairy:'#d685ad'
  };

  let html = '<button class="sub-back" onclick="setSubPanel(null)">← Back</button>';
  html += '<div style="font-size:0.7rem;color:#aaa;padding:4px 8px;margin-bottom:4px">Ether — Choose a move to restore +20 PP:</div>';

  golpes.forEach((gk) => {
    const move = MOVES_DB[gk] || { name: gk, type:'normal', pp:15 };
    const ppMax = move.pp || 15;
    const ppNow = ppAtual[gk] !== undefined ? ppAtual[gk] : ppMax;
    const cheio = ppNow >= ppMax;
    const cor   = TIPO_CORES_B[move.type] || '#888';
    const dis   = cheio ? 'disabled' : '';
    html += `<button class="sub-btn" ${dis} onclick="window.btEtherMove('${itemKey}','${gk}')">
      <span style="background:${cor};color:#fff;font-size:0.55rem;padding:1px 5px;border-radius:3px;margin-right:6px">${(move.type||'').toUpperCase()}</span>
      ${move.name}
      <span style="color:${cheio?'#555':'#f8d030'};font-size:0.6rem;margin-left:auto">${ppNow}/${ppMax} PP${cheio?' (FULL)':''}</span>
    </button>`;
  });

  if (!golpes.length) html += '<div style="font-size:0.7rem;color:#555;padding:8px">No moves available.</div>';
  setSubPanel(html);
};

// ── Ether: aplicar ao golpe escolhido na batalha ──
window.btEtherMove = async function(itemKey, moveKey) {
  if (!_myTurn || _actionDone) return;
  const bag = _userData?.raidBag || {};
  if ((bag[itemKey] || 0) < 1) return;

  const snap   = _battleSnap || {};
  const me     = snap.players?.[_uid] || {};
  const ppAtual = { ...(me.ppAtual || {}) };
  const move    = MOVES_DB[moveKey];
  if (!move) return;

  const ppMax   = move.pp || 15;
  const ppBefore = ppAtual[moveKey] !== undefined ? ppAtual[moveKey] : ppMax;
  if (ppBefore >= ppMax) { setSubPanel(null); return; }

  const ppAfter = Math.min(ppMax, ppBefore + 20);
  ppAtual[moveKey] = ppAfter;

  // Atualizar no Realtime DB (sala)
  const { ref: rRef, update: rUpdate } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js');
  await rUpdate(rRef(rdb, `boss_salas/${_salaId}/battle/players/${_uid}`), { ppAtual });

  // Descontar da bag no Firestore
  const newBag = { ...(bag) };
  newBag[itemKey] = (newBag[itemKey] || 1) - 1;
  if (newBag[itemKey] <= 0) delete newBag[itemKey];
  try {
    const { doc, updateDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
    await updateDoc(doc(_db, 'usuarios', _uid), { raidBag: JSON.parse(JSON.stringify(newBag)) });
    if (_userData) _userData.raidBag = newBag;
  } catch(e) { console.warn('[Battle] Ether bag update err:', e); }

  _actionDone = true;
  pararTurnTimer();
  setSubPanel(null);
  await logAction(`${getNick()} used Ether → +20 PP for ${move.name}.`);
  await avancarTurno();
};

// ── Pass ─────────────────────────────────────────────────────
window.btPass = async function(){
  if (!_myTurn || _actionDone) return;
  // Na fase de captura: Pass = pular vez sem arremessar
  if (_battleSnap?.fase === 'capture'){
    _actionDone = true;
    pararCaptureTimer();
    setSubPanel(null);
    await logAction(`${getNick()} skipped their throw.`);
    await avancarFilaCaptura('skipped');
    return;
  }
  const _meFainted = _battleSnap?.players?.[_uid]?.fainted || (_battleSnap?.players?.[_uid]?.hp ?? 1) <= 0;
  if (_meFainted) return;
  if (_battleSnap?.players?.[_uid]?.actedThisTurn) return;
  _actionDone = true;
  pararTurnTimer();
  setSubPanel(null);
  await logAction(`${getNick()} passed their turn.`);
  await avancarTurno();
};

// ── Usar golpe ───────────────────────────────────────────────
window.btUsarGolpe = async function(idx, moveKey){
  if (!_myTurn || _actionDone) return;
  // Lock do Firebase: previne double-action em latência de rede
  if (_battleSnap?.players?.[_uid]?.actedThisTurn) return;

  // ── Insomnia: cura sleep no início do turno ──────────────
  const _meInsomnia = _battleSnap?.players?.[_uid];
  if (_meInsomnia?.ability === 'insomnia' && _meInsomnia?.status === 'sleep') {
    await update(_battleRef, {
      [`players/${_uid}/status`]:     null,
      [`players/${_uid}/sleepTurns`]: 0,
    });
    await logAction(`${getNick()}'s ${cap(_meInsomnia.pokemon)}'s Insomnia woke it up!`);
    await avancarTurno();
    return; // consumiu o turno acordando
  }

  _actionDone = true;
  pararTurnTimer();
  setSubPanel(null);

  const me       = _battleSnap.players?.[_uid];
  const bossHp   = _battleSnap.bossHp || 0;
  const bossMax  = _battleSnap.bossHpMax || 1;
  const pokeTipos= POKEMON_TIPOS[me?.pokemon]||['normal'];
  const bossTipos= _bossData?.tipos||['normal'];

  // Montar move
  const MOVES_LIGHT = getMoveLight(moveKey);
  // Fallback: se o golpe não está no MOVES_DB, trata como status (sem dano)
  // para não causar dano acidental em golpes desconhecidos
  const move = MOVES_LIGHT || { name: cap(moveKey.replace(/_/g,' ')), type:'normal', cat:'status', power:null, acc:100 };

  // Checar accuracy
  const hit = !move.acc || Math.random() * 100 <= move.acc; // false ou null = sempre acerta
  if (!hit){
    showBossFloat('Miss!', 'miss');
    await logAction(`${getNick()}'s ${cap(me.pokemon)} used ${move.name}! It missed!`);
    await avancarTurno();
    return;
  }

  if (!move.power){ // Move de status do player
    let logExtra = '';
    const eff = move.effect || null;

    if (eff === 'sleep'){
      // Aplicar sleep no boss
      const turnos = move.turns || Math.floor(Math.random()*3)+1;
      _bossStatus.sleep = Math.max(_bossStatus.sleep, turnos); // não acumula
      showBossFloat('💤 Sleep!', 'miss');
      logExtra = ` Boss fell asleep for ${turnos} turn${turnos>1?'s':''}!`;
    } else if (eff === 'confusion'){
      _bossStatus.confusion = true;
      showBossFloat('💫 Confused!', 'miss');
      logExtra = ' Boss became confused!';
    } else if (eff === 'poison' || eff === 'toxic'){
      _bossStatus.poisoned  = eff;
      _bossStatus.poisonTurno = 0;
      showBossFloat('☠ Poison!', 'miss');
      logExtra = ` Boss was ${eff === 'toxic' ? 'badly ' : ''}poisoned!`;
    } else if (eff === 'burn'){
      _bossStatus.burned = true;
      showBossFloat('🔥 Burned!', 'super');
      logExtra = ' Boss was burned!';
    } else if (eff === 'debuff'){
      // Debuffar o boss
      const stat   = move.stat || 'atk';
      const stages = move.stages || -1;
      const variou = applyBossStage(stat, stages);
      const statNames = {atk:'Attack',def:'Defense',spa:'Sp. Atk',spd:'Sp. Def',spe:'Speed'};
      logExtra = variou !== 0
        ? ` Boss's ${statNames[stat]||stat} fell${Math.abs(stages)>1?' sharply':''}!`
        : ` Boss's ${statNames[stat]||stat} won't go lower!`;
      if (variou !== 0) showBossFloat(`${stat.toUpperCase()}↓`.repeat(Math.abs(stages)), 'miss');
    } else if (eff === 'buff'){
      // Buffar o próprio pokémon (stat do player)
      const stat   = move.stat || 'atk';
      const stages = move.stages || 1;
      applyPlayerStage(_uid, stat, stages);
      // Salvar stages no Firebase para o render mostrar
      await update(ref(rdb, `boss_salas/${_salaId}/battle/players/${_uid}`), {
        statStages: _playerStages[_uid] || {}
      });
      const statNames = {atk:'Attack',def:'Defense',spa:'Sp. Atk',spd:'Sp. Def',spe:'Speed'};
      logExtra = ` ${cap(me.pokemon)}'s ${statNames[stat]||stat} rose${stages>1?' sharply':''}!`;
    }

    // ── Decrementar PP do golpe de status ─────────────────────
    const ppStatusSnap = me.ppAtual || {};
    const ppStatusAntes = ppStatusSnap[moveKey] !== undefined
      ? ppStatusSnap[moveKey]
      : (getMoveLight(moveKey)?.pp || 10);
    const ppStatusDepois = Math.max(0, ppStatusAntes - 1);
    await update(_battleRef, {
      [`players/${_uid}/ppAtual/${moveKey}`]: ppStatusDepois,
    });
    // ────────────────────────────────────────────────────────────

    await logAction(`${getNick()}'s ${cap(me.pokemon)} used ${move.name}!${logExtra}`);
    await avancarTurno();
    return;
  }

  const myStats  = calcStats(me.pokemon, me.ivs, me.nivel||1, me.nature||'Hardy', me.evs);
  // Aplicar stages do player (buffs/debuffs acumulados)
  const myAtkEff = getEffStat(
    move.cat === 'physical' ? myStats.atk : myStats.spa,
    move.cat === 'physical' ? 'atk' : 'spa',
    _playerStages[_uid] || {}
  );
  // Aplicar stages do boss na defesa
  const bossDefEff = getEffStat(
    move.cat === 'physical' ? _bossStats.def : _bossStats.spd,
    move.cat === 'physical' ? 'def' : 'spd',
    _bossStages
  );
  const myStatsEff   = { ...myStats,   atk: move.cat==='physical'?myAtkEff:myStats.atk, spa: move.cat==='special'?myAtkEff:myStats.spa };
  const bossStatsEff = { ..._bossStats, def: move.cat==='physical'?bossDefEff:_bossStats.def, spd: move.cat==='special'?bossDefEff:_bossStats.spd };
  const res      = calcDano(myStatsEff, bossStatsEff, move, pokeTipos, bossTipos, me.nivel||1);

  const dano     = Math.min(res.dmg, bossHp); // não vai abaixo de 0
  const newBossHp= Math.max(0, bossHp - dano);

  // Float de dano
  const floatCls = res.eff > 1 ? 'super' : res.eff === 0 ? 'immune' : '';
  showBossFloat(res.eff === 0 ? 'Immune!' : `-${dano}`, floatCls);

  // Shake no sprite do boss
  const sp = document.getElementById('bossSprite');
  sp.classList.add('shake'); setTimeout(()=>sp.classList.remove('shake'),350);

  let logTxt = `${getNick()}'s ${cap(me.pokemon)} used ${move.name}! (${dano} dmg)`;
  if (res.eff > 1)  logTxt += ' ⚡ Super effective!';
  if (res.eff === 0) logTxt += ' No effect!';
  if (res.crit > 1) logTxt += ' 💥 Critical hit!';
  if (res.stab > 1 && res.eff > 1) logTxt = logTxt.replace('⚡ Super effective!','⚡⚡ Super effective!');

  // ── Efeito secundário do golpe (ex: poison_sting 30% poison) ──
  if (move.effect && move.effectChance && res.eff > 0 && newBossHp > 0) {
    const roll = Math.random() * 100;
    if (roll < move.effectChance) {
      const eff2 = move.effect;
      if ((eff2 === 'poison' || eff2 === 'toxic') && !_bossStatus.poisoned) {
        _bossStatus.poisoned = eff2;
        _bossStatus.poisonTurno = 0;
        showBossFloat('☠ Poison!', 'miss');
        logTxt += ` ${cap(me.pokemon)}'s attack poisoned the boss!`;
      } else if (eff2 === 'burn' && !_bossStatus.burned) {
        _bossStatus.burned = true;
        showBossFloat('🔥 Burned!', 'super');
        logTxt += ' The boss was burned!';
      } else if (eff2 === 'sleep' && !_bossStatus.sleep) {
        const turnos = Math.floor(Math.random()*3)+1;
        _bossStatus.sleep = turnos;
        showBossFloat('💤 Sleep!', 'miss');
        logTxt += ` The boss fell asleep!`;
      } else if (eff2 === 'paralysis' && !_bossStatus.paralyzed) {
        _bossStatus.paralyzed = true;
        showBossFloat('⚡ Paralyzed!', 'miss');
        logTxt += ' The boss was paralyzed!';
      }
    }
  }

  // Decrementar PP do golpe usado
  const ppAtualSnap = me.ppAtual || {};
  const ppAntes     = ppAtualSnap[moveKey] !== undefined ? ppAtualSnap[moveKey] : (getMoveLight(moveKey)?.pp || 10);
  const ppDepois    = Math.max(0, ppAntes - 1);
  const updates = {
    bossHp: newBossHp,
    [`players/${_uid}/ppAtual/${moveKey}`]: ppDepois,
  };

  if (newBossHp <= 0){
    updates.bossFainted = true;
    updates.fase = 'capture';
    // Fila de captura: TODOS os players (inclusive fainted) em ordem do turnOrder
    // Players fainted também têm direito a tentar capturar (spec do usuário)
    const turnOrd = _battleSnap.turnOrder || [];
    const captureQueue = [...turnOrd]; // todos, independente de fainted
    updates.captureQueue    = captureQueue;
    updates.captureQueueIdx = 0;
    updates.captureResults  = {}; // { uid: 'caught'|'failed'|'skipped' }
    logTxt += ' The boss has been defeated! Prepare to throw a Poké Ball!';
  }

  await update(_battleRef, updates);
  await logAction(logTxt);

  await avancarTurno();
};

// ── Usar item ────────────────────────────────────────────────
window.btUsarItem = async function(itemKey){
  if (!_myTurn || _actionDone) return;
  // Na fase de captura, ignorar actedThisTurn (pode ser stale do turno que matou o boss)
  const isCapturePhase = _battleSnap?.fase === 'capture';
  if (!isCapturePhase && _battleSnap?.players?.[_uid]?.actedThisTurn) return;

  const ITEM_INFO = {
    pokebola:{name:'Poké Ball',isBall:true,ballMult:1},
    great_ball:{name:'Great Ball',isBall:true,ballMult:1.5},
    ultra_ball:{name:'Ultra Ball',isBall:true,ballMult:2},
    potion:{name:'Potion',heal:20},super_potion:{name:'Super Potion',heal:60},
    hyper_potion:{name:'Hyper Potion',heal:120},max_potion:{name:'Max Potion',heal:9999},
    full_restore:{name:'Full Restore',heal:9999},
    revive:{name:'Revive',revive:true},
  };

  const info = ITEM_INFO[itemKey];
  if (!info) return;

  // Pokébola apenas na fase de captura
  if (info.isBall && !_capturePhase){ setSubPanel(null); return; }

  _actionDone = true;
  pararTurnTimer();
  setSubPanel(null);

  // Remover item da bag do Firestore
  try {
    const newBag = Object.assign({}, _userData.raidBag || {});
    newBag[itemKey] = (newBag[itemKey] || 0) - 1;
    if (newBag[itemKey] <= 0) delete newBag[itemKey];
    _userData.raidBag = newBag;
    await updateDoc(doc(fsdb,'usuarios',_uid), { raidBag: newBag });
  } catch(e){}

  if (info.isBall){
    // Lançar pokébola
    await arremessarPokebola(itemKey, info);
    return;
  }

  if (info.heal){
    const me = _battleSnap.players?.[_uid];
    if (!me){ await avancarTurno(); return; }
    if (me.hp >= me.hpMax){
      // HP cheio — devolve item e não consome turno
      try {
        const devBag = Object.assign({}, _userData.raidBag || {});
        devBag[itemKey] = (devBag[itemKey] || 0) + 1;
        _userData.raidBag = devBag;
        await updateDoc(doc(fsdb,'usuarios',_uid), { raidBag: devBag });
      } catch(e){}
      setMsg("HP is already full!");
      _actionDone = false;
      return;
    }
    const healed = Math.min(info.heal, me.hpMax - me.hp);
    const newHp  = me.hp + healed;
    await update(ref(rdb, `boss_salas/${_salaId}/battle/players/${_uid}`), { hp: newHp, fainted: false });
    showPlayerFloat(_uid, `+${healed}`, 'heal');
    await logAction(`${getNick()} used ${info.name} and restored ${healed} HP!`);
  }

  if (info.revive){
    // Revive pode ser usado em si mesmo OU em aliados desmaiados
    // Se há aliados fainted, mostrar seletor
    const players = _battleSnap?.players || {};
    const faintedAllies = Object.entries(players)
      .filter(([uid, p]) => p.fainted || p.hp <= 0);

    if (faintedAllies.length === 0){
      // Ninguém fainted — devolve item
      try {
        const devBag = Object.assign({}, _userData.raidBag || {});
        devBag[itemKey] = (devBag[itemKey] || 0) + 1;
        _userData.raidBag = devBag;
        await updateDoc(doc(fsdb,'usuarios',_uid), { raidBag: devBag });
      } catch(e){}
      setMsg("No fainted Pokémon to revive!");
      _actionDone = false;
      return;
    }

    if (faintedAllies.length === 1){
      // Só um — reviver direto
      const [targetUid, targetP] = faintedAllies[0];
      const halfHp = Math.floor((targetP.hpMax||1)/2);
      await update(ref(rdb, `boss_salas/${_salaId}/battle/players/${targetUid}`), { hp: halfHp, fainted: false });
      showPlayerFloat(targetUid, `+${halfHp}`, 'heal');
      await logAction(`${getNick()} used Revive! ${cap(targetP.pokemon)} came back with ${halfHp} HP!`);
    } else {
      // Múltiplos fainted — mostrar seletor
      _actionDone = false; // desfazer lock temporariamente
      let html = '<button class="sub-back" onclick="setSubPanel(null)">← Back</button>';
      html += '<div style="font-size:0.7rem;color:#ffad00;padding:4px 8px 8px;text-align:center">Choose who to revive:</div>';
      faintedAllies.forEach(([uid, p]) => {
        const isMe = uid === _uid;
        html += `<button class="sub-btn" onclick="window.btReviveAlly('${uid}','${itemKey}')">
          ${isMe ? 'Your' : sanitize(p.nick) + "'s"} ${cap(p.pokemon)}
        </button>`;
      });
      setSubPanel(html);
      return;
    }
  }

  await avancarTurno();
};

// ── Reviver aliado selecionado ───────────────────────────────
window.btReviveAlly = async function(targetUid, itemKey){
  if (_actionDone) return;
  _actionDone = true;
  pararTurnTimer();
  setSubPanel(null);
  const targetP = _battleSnap?.players?.[targetUid];
  if (!targetP) { await avancarTurno(); return; }
  const halfHp = Math.floor((targetP.hpMax||1)/2);
  await update(ref(rdb, `boss_salas/${_salaId}/battle/players/${targetUid}`), { hp: halfHp, fainted: false });
  showPlayerFloat(targetUid, `+${halfHp}`, 'heal');
  const targetNick = targetP.nick || 'Ally';
  await logAction(`${getNick()} used Revive! ${sanitize(targetNick)}'s ${cap(targetP.pokemon)} came back with ${halfHp} HP!`);
  await avancarTurno();
};

// ── Arremessar pokébola ──────────────────────────────────────
async function arremessarPokebola(itemKey, info){
  // Animação de lançamento — usa o sprite real da pokébola
  const ballImg = info.img || '/boss/img-items/pokebola.png';
  const ball = document.createElement('div');
  ball.className = 'pokeball-throw';
  ball.innerHTML = `<img src="${ballImg}" alt="">`;
  document.body.appendChild(ball);
  setTimeout(() => ball.remove(), 800);

  const catchRate = _bossData?.catchRate || 50;
  const ballMult  = info.ballMult || 1;
  const chance    = Math.min(99, catchRate * ballMult);
  const caught    = Math.random() * 100 < chance;

  await logAction(`${getNick()} threw a ${info.name}!`);

  // Shake da pokébola — mesmo sprite do arremesso
  const ballShake = document.createElement('div');
  ballShake.className = 'pokeball-shake';
  ballShake.innerHTML = `<img src="${ballImg}" alt="">`;
  document.body.appendChild(ballShake);
  await new Promise(res => setTimeout(res, caught ? 1800 : 900));
  ballShake.remove();

  // Flash branco
  const flash = document.createElement('div');
  flash.className = 'capture-flash';
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 400);

  if (caught){
    _myCaptureResult = 'caught';
    // Registrar na pokédex
    try {
      await updateDoc(doc(fsdb,'usuarios',_uid), {
        pokedex: arrayUnion(_bossNome.toLowerCase())
      });
    } catch(e){}
    await logAction(`Gotcha! ${cap(_bossNome)} was caught by ${getNick()}!`);
  } else {
    _myCaptureResult = 'failed';
    await logAction(`Oh no! ${cap(_bossNome)} broke free!`);
  }

  // Avançar fila de captura (gravar resultado no Firebase)
  await avancarFilaCaptura(_myCaptureResult);
}

// ══════════════════════════════════════════════════════════════
// ATAQUE DO BOSS
// ══════════════════════════════════════════════════════════════
async function bossAtaca(){
  _bossAttacking = true;
  const bannerEl = document.getElementById('turnBanner');
  if (bannerEl){ bannerEl.textContent = '🔴 Boss is attacking...'; bannerEl.classList.add('boss-turn'); }

  const bs      = (await get(_battleRef)).val();
  if (!bs || bs.bossFainted){ _bossAttacking = false; return; }

  const golpes  = _bossData?.golpes || [];
  if (!golpes.length){ _bossAttacking = false; return; }

  const bossTipos = _bossData.tipos;

  // ── Processar status conditions do boss ─────────────────
  const statusUpdates = {};
  let statusLog = [];

  // Poison/Toxic: dano por turno
  if (_bossStatus.poisoned){
    _bossStatus.poisonTurno = (_bossStatus.poisonTurno || 0) + 1;
    const poisonDmg = _bossStatus.poisoned === 'toxic'
      ? Math.floor(bs.bossHpMax / 16 * _bossStatus.poisonTurno)
      : Math.floor(bs.bossHpMax / 8);
    const newBossHp = Math.max(0, bs.bossHp - poisonDmg);
    statusUpdates['bossHp'] = newBossHp;
    showBossFloat(`-${poisonDmg}`, '');
    statusLog.push(`Boss took ${poisonDmg} poison damage!`);
    if (newBossHp <= 0){
      const _turnOrdPoison = bs.turnOrder || [];
      statusUpdates.bossFainted     = true;
      statusUpdates.fase            = 'capture';
      statusUpdates.captureQueue    = [..._turnOrdPoison];
      statusUpdates.captureQueueIdx = 0;
      statusUpdates.captureResults  = {};
      await update(_battleRef, statusUpdates);
      await logAction((statusLog.join(' ')) + ' The boss fainted from poison! Prepare to throw!');
      _bossAttacking = false;
      return;
    }
  }
  // Burn: dano 1/8 e -Atk efetivo (aplicado no calc)
  if (_bossStatus.burned){
    const burnDmg = Math.floor(bs.bossHpMax / 8);
    const newBossHp = Math.max(0, (statusUpdates['bossHp'] || bs.bossHp) - burnDmg);
    statusUpdates['bossHp'] = newBossHp;
    showBossFloat(`-${burnDmg}`, 'super');
    statusLog.push(`Boss is hurt by its burn! (${burnDmg} dmg)`);
    if (newBossHp <= 0){
      const _turnOrdBurn = bs.turnOrder || [];
      statusUpdates.bossFainted     = true;
      statusUpdates.fase            = 'capture';
      statusUpdates.captureQueue    = [..._turnOrdBurn];
      statusUpdates.captureQueueIdx = 0;
      statusUpdates.captureResults  = {};
      await update(_battleRef, statusUpdates);
      await logAction((statusLog.join(' ')) + ' The boss fainted from burn! Prepare to throw!');
      _bossAttacking = false;
      return;
    }
  }
  if (Object.keys(statusUpdates).length){ await update(_battleRef, statusUpdates); }
  if (statusLog.length){ await logAction(statusLog.join(' ')); }

  // ── Sleep: pular turno ───────────────────────────────────
  if (_bossStatus.sleep > 0){
    _bossStatus.sleep--;
    const msg = _bossStatus.sleep > 0
      ? 'Boss is fast asleep! 💤'
      : 'Boss woke up! 👁';
    showBossFloat('💤', 'miss');
    await logAction(msg);
    _bossAttacking = false;
    return;
  }

  // ── Confusion: 50% de chance de se bater ────────────────
  if (_bossStatus.confusion){
    if (Math.random() < 0.5){
      // Boss se bate: dano fixo baseado no Atk
      const selfDmg = Math.max(1, Math.floor(_bossStats.atk * 0.25));
      const newBossHp = Math.max(0, bs.bossHp - selfDmg);
      await update(_battleRef, { bossHp: newBossHp });
      showBossFloat(`-${selfDmg}`, '');
      await logAction(`Boss is confused! It hurt itself! (${selfDmg} dmg)`);
      if (Math.random() < 0.33){ _bossStatus.confusion = false; await logAction('Boss snapped out of confusion!'); }
      _bossAttacking = false;
      return;
    } else if (Math.random() < 0.1){
      // 10% de sair da confusão sem se bater
      _bossStatus.confusion = false;
      await logAction('Boss snapped out of its confusion!');
    }
  }

  // ── Escolha inteligente de golpe ────────────────────────────
  // 1. Remove heal se boss está com HP cheio (>80%)
  // 2. Prefere golpes de status se nenhum status ativo e há alvos
  const hpPct = bs.bossHp / bs.bossHpMax;
  let golpesDisponiveis = golpes.filter(g => {
    if (g.effect === 'heal' && hpPct > 0.8) return false;   // não cura se HP alto
    if (g.effect === 'buff'){
      const stage = _bossStages[g.stat] || 0;
      if (stage >= 6) return false;                           // stat já no máximo
    }
    return true;
  });
  if (!golpesDisponiveis.length) golpesDisponiveis = golpes;  // fallback: usa tudo
  const move = golpesDisponiveis[Math.floor(Math.random() * golpesDisponiveis.length)];

  // Targets: single → aleatório entre players vivos; all → todos os players
  const players     = bs.players || {};
  const alivePlayers= Object.keys(players).filter(uid => !players[uid].fainted && players[uid].hp > 0);
  if (!alivePlayers.length){ _bossAttacking = false; return; }

  const targets = move.target === 'all' ? alivePlayers : [ alivePlayers[Math.floor(Math.random()*alivePlayers.length)] ];

  const updates = {};
  let logParts  = [`Boss used ${move.name}!`];

  for (const targetUid of targets){
    const p = players[targetUid];
    const playerTipos = POKEMON_TIPOS[p?.pokemon] || ['normal'];

    if (move.cat === 'status'){
      const eff = move.effect || null;

      // ── Heal: cura 50% HP (Recover, Milk Drink, Synthesis, etc.) ─────────────────────────
      if (eff === 'heal' && move.target === 'self'){
        const heal  = Math.floor(bs.bossHpMax * 0.5);
        const newHp = Math.min(bs.bossHpMax, bs.bossHp + heal);
        updates['bossHp'] = newHp;
        showBossFloat(`+${heal}`, 'heal');
        logParts.push(`Boss recovered ${heal} HP!`);
        continue;
      }

      // ── Buff próprio (ex: Swords Dance +2 Atk, Harden +1 Def) ──
      if (eff === 'buff' && move.target === 'self'){
        const stat   = move.stat || 'atk';
        const stages = move.stages || 1;
        const variou = applyBossStage(stat, stages);
        const statNames = {atk:'Attack',def:'Defense',spa:'Sp. Atk',spd:'Sp. Def',spe:'Speed'};
        if (variou !== 0){
          showBossFloat(`${stat.toUpperCase()}↑`.repeat(Math.abs(stages)), 'heal');
          logParts.push(`Boss's ${statNames[stat]||stat} rose${Math.abs(stages)>1?' sharply':''}!`);
        } else {
          logParts.push(`Boss's ${statNames[stat]||stat} won't go higher!`);
        }
        continue;
      }

      // ── Debuff no player (ex: String Shot -Spe, Screech -Def) ──
      if (eff === 'debuff'){
        const stat   = move.stat || 'spe';
        const stages = move.stages || -1; // negativo
        for (const tgt of targets){
          const variou = applyPlayerStage(tgt, stat, stages);
          // Salvar stages no Firebase para render mostrar
          update(ref(rdb, `boss_salas/${_salaId}/battle/players/${tgt}`), {
            statStages: _playerStages[tgt] || {}
          }).catch(()=>{});
          const statNames = {atk:'Attack',def:'Defense',spa:'Sp. Atk',spd:'Sp. Def',spe:'Speed'};
          const nick  = bs.players?.[tgt]?.nick || 'Player';
          if (variou !== 0){
            showPlayerFloat(tgt, `${stat.toUpperCase()}↓`);
            logParts.push(`${nick}'s ${statNames[stat]||stat} fell${Math.abs(stages)>1?' sharply':''}!`);
          } else {
            logParts.push(`${nick}'s ${statNames[stat]||stat} won't go lower!`);
          }
        }
        continue;
      }

      // ── Sleep (ex: Sleep Powder, Hypnosis) ───────────────
      if (eff === 'sleep'){
        // Sleep do boss: 1-3 turnos sem agir
        const turnos = move.turns || Math.floor(Math.random()*3)+1;
        _bossStatus.sleep = turnos;
        showBossFloat('💤 Sleep!', 'miss');
        logParts.push(`Boss fell asleep for ${turnos} turn${turnos>1?'s':''}!`);
        continue;
      }

      // ── Confusion (ex: Confuse Ray, Sweet Kiss) ──────────
      if (eff === 'confusion'){
        _bossStatus.confusion = true;
        showBossFloat('💫 Confused!', 'miss');
        logParts.push('Boss became confused!');
        continue;
      }

      // ── Poison (ex: Toxic, Poison Powder) ────────────────
      if (eff === 'poison' || eff === 'toxic'){
        _bossStatus.poisoned = eff === 'toxic' ? 'toxic' : 'poison';
        _bossStatus.poisonTurno = 0;
        showBossFloat('☠ Poisoned!', 'miss');
        logParts.push('Boss was poisoned!');
        continue;
      }

      // ── Burn (ex: Will-O-Wisp) ────────────────────────────
      if (eff === 'burn'){
        _bossStatus.burned = true;
        showBossFloat('🔥 Burned!', 'super');
        logParts.push('Boss was burned!');
        continue;
      }

      logParts.push('...');
      continue;
    }

    const playerStats = calcStats(p.pokemon, p.ivs, p.nivel||1, p.nature||'Hardy', p.evs);
    // Aplicar stages ao boss e ao player
    const bossAtkEff = getEffStat(
      move.cat === 'physical' ? _bossStats.atk : _bossStats.spa,
      move.cat === 'physical' ? 'atk' : 'spa',
      _bossStages
    );
    const playerDefEff = getEffStat(
      move.cat === 'physical' ? playerStats.def : playerStats.spd,
      move.cat === 'physical' ? 'def' : 'spd',
      _playerStages[targetUid] || {}
    );
    // Burn reduz Atk físico do boss pela metade
    const burnMod = (_bossStatus.burned && move.cat === 'physical') ? 0.5 : 1;
    const bossStatsEff = { ..._bossStats,
      atk: Math.floor(bossAtkEff * burnMod),
      spa: _bossStats.spa,
    };
    const playerStatsEff = { ...playerStats,
      def: playerDefEff,
      spd: getEffStat(playerStats.spd, 'spd', _playerStages[targetUid] || {}),
    };
    const res   = calcBossAtk(bossStatsEff, playerStatsEff, move, bossTipos, playerTipos, _bossData.nivel);
    const dano  = Math.min(res.dmg, p.hp);
    const newHp = Math.max(0, p.hp - dano);
    updates[`players/${targetUid}/hp`] = newHp;
    if (newHp <= 0) updates[`players/${targetUid}/fainted`] = true;

    showPlayerFloat(targetUid, `-${dano}`);
    logParts.push(`${players[targetUid].nick || 'Player'}'s ${cap(p.pokemon)} took ${dano} damage!`);
    if (res.eff > 1) logParts.push('Super effective!');

    // ── Secondary effect do boss em damaging move ─────────
    if (move.effect && move.effectChance && res.eff > 0 && newHp > 0) {
      const roll2 = Math.random() * 100;
      if (roll2 < (move.effectChance || 0)) {
        const eff2 = move.effect;
        const pAbility = p.ability || '';
        const curStatus = p.status || '';
        if (eff2 === 'sleep' && pAbility === 'insomnia') {
          logParts.push(`${cap(p.pokemon)}'s Insomnia blocked sleep!`);
        } else if (eff2 === 'sleep' && !curStatus) {
          const sleepTurns = move.turns || Math.floor(Math.random()*3)+2;
          updates[`players/${targetUid}/status`]      = 'sleep';
          updates[`players/${targetUid}/sleepTurns`]  = sleepTurns;
          logParts.push(`${cap(p.pokemon)} fell asleep!`);
        } else if ((eff2 === 'poison' || eff2 === 'toxic') && !curStatus) {
          updates[`players/${targetUid}/status`] = eff2;
          logParts.push(`${cap(p.pokemon)} was poisoned!`);
        } else if (eff2 === 'burn' && !curStatus) {
          updates[`players/${targetUid}/status`] = 'burn';
          logParts.push(`${cap(p.pokemon)} was burned!`);
        } else if (eff2 === 'paralysis' && !curStatus) {
          updates[`players/${targetUid}/status`] = 'paralysis';
          logParts.push(`${cap(p.pokemon)} was paralyzed!`);
        }
      }
    }

    // Shake sprite do player
    const img = document.getElementById(`pimg-${targetUid}`);
    if (img){ img.classList.add('shake'); setTimeout(()=>img.classList.remove('shake'),350); }
  }

  await update(_battleRef, updates);
  await logAction(logParts.join(' '));

  // Verificar derrota total
  const bsNew = (await get(_battleRef)).val();
  const allFainted = Object.keys(bsNew?.players||{}).every(u => bsNew.players[u].fainted || bsNew.players[u].hp <= 0);
  if (allFainted){
    await update(_battleRef, { fase: 'defeat' });
  }
  _bossAttacking = false;
  await update(_battleRef, { bossTurnActive: false });
  document.getElementById('turnBanner')?.classList.remove('boss-turn');
}

// ══════════════════════════════════════════════════════════════
// CONTROLE DE TURNO
// ══════════════════════════════════════════════════════════════

// avancarTurnoCaptura: usado SOMENTE na fase de captura (boss já fainted)
// Avança o currentTurnIdx para o próximo player vivo sem verificar bossFainted
async function avancarTurnoCaptura(){
  _actionDone = false;
  const bs    = (await get(_battleRef)).val();
  if (!bs || bs.fase === 'captured') return;

  const order = bs.turnOrder || [];
  const oldIdx = bs.currentTurnIdx || 0;
  let nextIdx   = oldIdx;
  let tentativas = 0;
  do {
    nextIdx = (nextIdx + 1) % order.length;
    tentativas++;
  } while (tentativas < order.length && bs.players?.[order[nextIdx]]?.fainted);

  await update(_battleRef, { currentTurnIdx: nextIdx });
}

async function avancarTurno(){
  _actionDone = false;

  const bs    = (await get(_battleRef)).val();
  if (!bs || bs.bossFainted || bs.fase === 'capture' || bs.fase === 'captured') return;

  const order = bs.turnOrder || [];
  const oldIdx = bs.currentTurnIdx || 0;

  // Descobrir próximo player vivo
  let nextIdx   = oldIdx;
  let tentativas = 0;
  do {
    nextIdx = (nextIdx + 1) % order.length;
    tentativas++;
  } while (
    tentativas < order.length &&
    bs.players?.[order[nextIdx]]?.fainted
  );

  // ── Detectar fim de rodada ────────────────────────────────
  // Se nextIdx <= oldIdx, demos uma volta completa → nova rodada
  // (mesmo com 1 player: oldIdx=0 → nextIdx=0, também é nova rodada)
  const novaRodada = (nextIdx <= oldIdx) || (order.length === 1);

  const newTurno = novaRodada ? (bs.turno || 0) + 1 : (bs.turno || 0);

  // Marcar o player atual como tendo agido (ou como skip automático por fainted)
  const curSnap = bs.players?.[order[oldIdx]];
  const curIsFainted = curSnap?.fainted || (curSnap?.hp ?? 1) <= 0;
  if (!curIsFainted) {
    await update(_battleRef, {
      [`players/${_uid}/actedThisTurn`]: true,
    });
  }
  // Se o player atual estava fainted, não marcar actedThisTurn — só avançar

  // ── Se nova rodada → boss ataca antes de liberar o turno ──
  if (novaRodada && !bs.bossFainted) {
    // Verificar se há players vivos antes de chamar o boss
    const alguemVivo = Object.values(bs.players||{}).some(p => !p.fainted && p.hp > 0);
    if (alguemVivo) {
      await logAction('— Boss turn! —');
      await new Promise(res => setTimeout(res, 3000)); // 3s de suspense
      await bossAtaca();
    }
    // Re-ler estado após ataque do boss (pode ter mudado fainted/hp)
    const bsAfter = (await get(_battleRef)).val();
    if (!bsAfter || bsAfter.fase === 'defeat') return;
  }

  // Avançar para o próximo player e resetar actedThisTurn do próximo
  const nextUid = order[nextIdx];
  await update(_battleRef, {
    currentTurnIdx: nextIdx,
    turno: newTurno,
    ...(nextUid ? { [`players/${nextUid}/actedThisTurn`]: false } : {}),
  });
}

// ── Timer de turno ────────────────────────────────────────────
function iniciarTurnTimer(){
  pararTurnTimer();
  const el  = document.getElementById('turnTimer');
  const val = document.getElementById('turnTimerVal');
  el.style.display='block'; el.classList.remove('urgent');
  let t = 10;
  val.textContent = t;
  _turnTimer = setInterval(async () => {
    t--;
    val.textContent = t;
    if (t <= 3) el.classList.add('urgent');
    if (t <= 0){
      pararTurnTimer();
      if (_myTurn && !_actionDone) await btPass();
    }
  }, 1000);
}
function pararTurnTimer(){
  clearInterval(_turnTimer);
  _turnTimer = null;
}


// ══════════════════════════════════════════════════════════════
// FLOATS DE DANO
// ══════════════════════════════════════════════════════════════
function showBossFloat(txt, extraCls=''){
  const wrap = document.getElementById('bossSpriteWrap');
  const el   = document.createElement('div');
  el.className = 'dmg-float ' + extraCls;
  el.textContent = txt;
  wrap.appendChild(el);
  setTimeout(() => el.remove(), 1500);
}

function showPlayerFloat(uid, txt, cls=''){
  const row = document.getElementById(`prow-${uid}`);
  if (!row) return;
  const el = document.createElement('div');
  el.className = 'player-dmg-float ' + cls;
  el.textContent = txt;
  row.appendChild(el);
  setTimeout(() => el.remove(), 1500);
}

// ══════════════════════════════════════════════════════════════
// LOG DA BATALHA
// ══════════════════════════════════════════════════════════════
async function logAction(txt){
  if (!txt) return;
  setMsg(txt);
  try {
    await push(ref(rdb, `boss_salas/${_salaId}/battle/log`), { txt, ts: Date.now() });
  } catch(e){ console.warn('logAction failed:', e); }
}

// ══════════════════════════════════════════════════════════════
// RESULTADO
// ══════════════════════════════════════════════════════════════
// ── Limpeza da sala após batalha encerrar ───────────────────
// Remove o nó boss_salas/{id} do Firebase 5 minutos após o fim
let _limpezaAgendada = false;
// ══════════════════════════════════════════════════════════════
// FILA DE CAPTURA — avança após cada arremesso ou timeout
// ══════════════════════════════════════════════════════════════
async function avancarFilaCaptura(resultado) {
  pararCaptureTimer();
  _actionDone = true;

  const bs  = (await get(_battleRef)).val();
  if (!bs) return;

  const queue   = bs.captureQueue   || [];
  const qIdx    = bs.captureQueueIdx || 0;
  const results = bs.captureResults  || {};
  const curUid  = queue[qIdx];

  if (curUid) {
    results[curUid] = resultado || 'skipped';
  }

  const nextIdx = qIdx + 1;

  if (nextIdx >= queue.length) {
    // Todos tentaram → encerrar captura
    // Determinar se houve captura (qualquer 'caught')
    const caughtBy = Object.entries(results).find(([, v]) => v === 'caught')?.[0] || null;
    await update(_battleRef, {
      captureResults:  results,
      captureQueueIdx: nextIdx,
      fase: 'captured',
      capturedBy: caughtBy,
    });
    await logAction('Capture phase ended. Loading rewards...');
    // Pequeno delay para todos sincronizarem, depois mostrar drops
    setTimeout(() => mostrarDrops(), 1200);
  } else {
    // Próximo player na fila
    await update(_battleRef, {
      captureResults:  results,
      captureQueueIdx: nextIdx,
    });
    const nextUid = queue[nextIdx];
    await logAction(`${bs.players?.[nextUid]?.nick || 'Next player'}'s turn to throw!`);
  }
}

// ── Timer de captura (10s para arremessar) ────────────────────
let _captureTimer = null;
function iniciarCaptureTimer(){
  pararCaptureTimer();
  const el = document.getElementById('captureTimer');
  if (el) { el.style.display = 'block'; el.textContent = '10'; }
  let t = 10;
  _captureTimer = setInterval(async () => {
    t--;
    if (el) el.textContent = t;
    if (t <= 0){
      pararCaptureTimer();
      if (_myTurn && !_actionDone){
        _actionDone = true;
        await logAction(`${getNick()} ran out of time to throw!`);
        await avancarFilaCaptura('skipped');
      }
    }
  }, 1000);
}
function pararCaptureTimer(){
  if (_captureTimer){ clearInterval(_captureTimer); _captureTimer = null; }
  const el = document.getElementById('captureTimer');
  if (el) el.style.display = 'none';
}

// ══════════════════════════════════════════════════════════════
// DROPS — recompensas individuais pós-raid
// ══════════════════════════════════════════════════════════════
async function mostrarDrops(){
  if (_dropsShown) return;
  _dropsShown = true;

  const bs      = (await get(_battleRef)).val();
  const drops   = calcularDrops(_bossData?.nivel || 10);
  const results = bs?.captureResults || {};
  const myResult = _myCaptureResult || results[_uid] || 'skipped';
  const caught   = myResult === 'caught';

  // ── Salvar itens e pokemon no Firestore ──
  const userData = _userData;
  const raidTeam = userData?.raidTeam || [];
  // Pokemon que o usuário usou na raid (primeiro slot da equipe ou o escolhido)
  const myBattlePlayer = bs?.players?.[_uid];
  const myPokeName = myBattlePlayer?.pokemon || raidTeam[0]?.pokemon;
  const mySlotIdx  = raidTeam.findIndex(s => s.pokemon === myPokeName);
  let   mySlot     = mySlotIdx >= 0 ? { ...raidTeam[mySlotIdx] } : null;

  // Adicionar itens à raidBag
  const newBag = Object.assign({}, userData?.raidBag || {});
  Object.entries(drops.itens).forEach(([item, qty]) => {
    newBag[item] = (newBag[item] || 0) + qty;
  });

  // Calcular XP novo
  let novoNivel = mySlot?.nivel || 1;
  let novoXP    = (mySlot?.xp   || 0) + drops.xp;
  let leveledUp = false;
  let ganheiGolpe = null;
  while (novoXP >= xpParaNivel(novoNivel + 1)){
    novoXP   -= xpParaNivel(novoNivel + 1);
    novoNivel += 1;
    leveledUp  = true;
    // Verificar golpe aprendido nesse nível
    const moveKey = golpeAprendidoNoNivel(mySlot?.pokemon, novoNivel);
    if (moveKey) ganheiGolpe = moveKey;
  }
  const novaLealdade = Math.min(255, (mySlot?.lealdade || 0) + drops.lealdade);
  // +10 EV Points por batalha concluída
  const novoEvPoints = (mySlot?.evPoints || 0) + 10;

  // Salvar HP atual do pokémon do player (para persistir dano sofrido na raid)
  // boss-raid.js usa slot.hpAtual (valor absoluto calculado com os mesmos stats)
  const hpFinalBatl = myBattlePlayer?.hp ?? null;
  const hpMaxBatl   = myBattlePlayer?.hpMax ?? null;
  // hpAtual salvo diretamente — os stats da batalha são os mesmos do perfil
  const hpFinalPct = (hpMaxBatl && hpFinalBatl !== null) ? hpFinalBatl / hpMaxBatl : 1;
  // Se fainted na batalha, salvar explicitamente 0 para bloquear uso sem revive
  const hpAtualFinal = (hpFinalBatl !== null && hpFinalBatl <= 0)
    ? 0
    : hpFinalBatl;

  // Atualizar golpes do slot — ao subir de nível, recalcula do zero (golpes retroativos)
  // Isso garante que o Squirtle level 5 tenha Water Gun (aprendido no lv3), mesmo que
  // a feature de learnset não existisse quando ele subiu de nível anteriormente.
  let nGolpes = mySlot?.golpes ? [...mySlot.golpes] : [];
  let pendingNewMove = null; // golpe pendente que pode precisar de troca
  if (leveledUp && mySlot?.pokemon) {
    // Calcular golpes que deveria ter vs. golpes atuais
    const todosAteNivel = golpesAteNivelBattle(mySlot.pokemon, novoNivel);
    const novosGolpes = todosAteNivel.filter(g => !nGolpes.includes(g));
    if (novosGolpes.length > 0) {
      const novo = novosGolpes[novosGolpes.length - 1]; // pegar o mais recente
      ganheiGolpe = novo;
      if (nGolpes.length < 4) {
        nGolpes.push(novo); // slot livre — adiciona direto
      } else {
        pendingNewMove = novo; // 4 golpes cheios — pedir confirmação ao usuário
      }
    }
  } else if (ganheiGolpe && !nGolpes.includes(ganheiGolpe)) {
    if (nGolpes.length < 4) nGolpes.push(ganheiGolpe);
    else pendingNewMove = ganheiGolpe;
  }
  const novoTeam = raidTeam.map((s, i) => {
    if (i !== mySlotIdx || !mySlot) return s;
    // Persistir PP gasto — lê do snap da batalha (Firebase RTDB)
    // myBattlePlayer.ppAtual = { tackle: 33, water_gun: 23, ... }
    const ppFinal = myBattlePlayer?.ppAtual ?? null;
    const atualizado = {
      ...s,
      xp:       novoXP,
      nivel:    novoNivel,
      lealdade: novaLealdade,
      evPoints: novoEvPoints,
      hpPct:    hpFinalPct,
      hpAtual:  hpAtualFinal !== null ? hpAtualFinal : undefined,
      ppAtual:  ppFinal !== null ? ppFinal : (s.ppAtual || {}),
    };
    // Só aplica golpes se não está pendente aprovação do usuário
    if ((leveledUp || ganheiGolpe) && !pendingNewMove) atualizado.golpes = nGolpes;
    // Se pendente, salvar na lista de pending para o UI decidir
    if (pendingNewMove) atualizado.pendingMove = pendingNewMove;
    return atualizado;
  });

  // Adicionar pokemon capturado ao próximo slot livre (se capturou)
  let bossSlot = null;
  if (caught && _bossNome){
    // Descobrir o próximo slot livre (1-6)
    const slotsOcupados = new Set(novoTeam.map(s => s.slot));
    let proxSlot = 1;
    for (let i = 1; i <= 6; i++) { if (!slotsOcupados.has(i)) { proxSlot = i; break; } }
    const { calcStats: cs } = {}; // não importado diretamente
    // 1% de chance de ser shiny
    const bossShiny = Math.random() < 0.002; // 0.2% shiny
    // Criar slot básico para o boss capturado
    // ── Golpes iniciais com mecânica dos 3 no nível 1 ──────────────
    const _bossPokeKey  = _bossNome.toLowerCase();
    const _bossLS       = LEARNSETS_BATTLE[_bossPokeKey] || [];
    const _bossLv1Moves = _bossLS.filter(([lvl]) => lvl === 1).map(([,k]) => k);
    let   _bossPendingMove = null;
    let   _bossGolpesIniciais;
    if (_bossLv1Moves.length >= 3) {
      const shuffled       = [..._bossLv1Moves].sort(() => Math.random() - 0.5);
      _bossPendingMove     = shuffled[2] || null;
      _bossGolpesIniciais  = shuffled.slice(0, 2);
    } else {
      _bossGolpesIniciais  = golpesAteNivelBattle(_bossPokeKey, 1);
      if (_bossGolpesIniciais.length === 0) {
        _bossGolpesIniciais = (_bossData?.golpes||[]).slice(0,4)
          .map(g => g.name?.toLowerCase().replace(/ /g,'_')).filter(Boolean);
      }
    }
    bossSlot = {
      slot:        proxSlot,
      pokemon:     _bossPokeKey,
      nivel:       1,
      xp:          0,
      lealdade:    0,
      nature:      ['Hardy','Jolly','Adamant','Modest','Timid','Bold','Impish','Careful'][Math.floor(Math.random()*8)],
      ability:     gerarAbilityBoss(_bossPokeKey),
      addedAt:     new Date().toISOString(),
      capturedAt:  Date.now(),
      pendingMove: _bossPendingMove,
      golpes:      _bossGolpesIniciais,
      evs:      { hp:0, atk:0, def:0, spa:0, spd:0, spe:0 },
      evPoints: 0,
      ivs:      { hp:Math.floor(Math.random()*32), atk:Math.floor(Math.random()*32), def:Math.floor(Math.random()*32), spa:Math.floor(Math.random()*32), spd:Math.floor(Math.random()*32), spe:Math.floor(Math.random()*32) },
      hpAtual:  null, // será calculado pelo perfil
      shiny:    bossShiny,
    };
    // Verificar se o time está cheio (6 pokémons)
    const teamCheio = novoTeam.length >= 6;
    if (teamCheio) {
      // Time cheio: pokémon vai para stand-by por 2 minutos
      bossSlot.expiraEm = Date.now() + 2 * 60 * 1000; // 2 min
      delete bossSlot.slot; // não tem slot no time principal
      _bossStandbySlot = bossSlot; // guardar para gravar abaixo
    } else {
      novoTeam.push(bossSlot);
      novoTeam.sort((a,b) => a.slot - b.slot);
      _bossStandbySlot = null;
    }
  }

  // Gravar no Firestore
  try {
    const fsUpdate = {
      raidBag:  newBag,
      raidTeam: JSON.parse(JSON.stringify(novoTeam)),
      ...(caught ? { pokedex: arrayUnion(_bossNome.toLowerCase()) } : {}),
    };
    // Se há stand-by, gravar o slot pendente
    if (_bossStandbySlot) {
      fsUpdate.raidStandby = JSON.parse(JSON.stringify(_bossStandbySlot));
    }
    await updateDoc(doc(fsdb,'usuarios',_uid), fsUpdate);
    if (_userData){ _userData.raidBag = newBag; _userData.raidTeam = novoTeam; }
  } catch(e){ console.error('[drops] Firestore error:', e); }

  // ── Renderizar popup ──
  const overlay  = document.getElementById('dropsOverlay');
  const grid     = document.getElementById('dropsGrid');
  const subtitle = document.getElementById('dropsSubtitle');
  const pokeName = document.getElementById('dropsPokeName');
  const moveLearnEl = document.getElementById('dropsMoveLearn');
  const xpValEl  = document.getElementById('dropsXPVal');
  const xpFill   = document.getElementById('dropsXPFill');
  const lvlUpEl  = document.getElementById('dropsLevelUp');
  if (!overlay) return;

  const _teamEraCheia = _bossStandbySlot !== null;
  subtitle.textContent = caught
    ? (_teamEraCheia
        ? `You caught ${cap(_bossNome)}! ⏳ Team full — it's in stand-by for 2 min!`
        : `You caught ${cap(_bossNome)}! 🎉`)
    : myResult === 'failed'
    ? `${cap(_bossNome)} broke free...`
    : 'Raid complete!';

  // Grid de itens
  let gridHTML = '';
  // Pokemon capturado
  if (caught && _bossNome){
    // Usar sprite do boss salvo em _bossData (suporta .png, .jpg, .jpeg, .gif)
    const bossImg = _bossData?.sprite || _bossData?.gif
      || `/boss/img-bosses/${cap(_bossNome)}.png`;
    gridHTML += `<div class="drop-item caught-pokemon" style="animation-delay:0s">
      <img src="${bossImg}" onerror="this.src='/boss/img-bosses/${_bossNome}.png'">
      <span class="drop-qty">×1</span>
      <span class="drop-label">${cap(_bossNome)}</span>
    </div>`;
  }
  // Itens com delay escalonado
  let delay = caught ? 0.15 : 0;
  Object.entries(drops.itens).forEach(([item, qty]) => {
    delay += 0.1;
    gridHTML += `<div class="drop-item" style="animation-delay:${delay}s">
      <img src="/boss/img-items/${item}.png" onerror="this.style.opacity='0.3'">
      <span class="drop-qty">×${qty}</span>
      <span class="drop-label">${item.replace(/_/g,' ')}</span>
    </div>`;
  });
  // Lealdade
  delay += 0.1;
  gridHTML += `<div class="drop-item" style="animation-delay:${delay}s">
    <span style="font-size:2rem">💖</span>
    <span class="drop-qty">+${drops.lealdade}</span>
    <span class="drop-label">Loyalty</span>
  </div>`;
  // EV Points
  delay += 0.1;
  gridHTML += `<div class="drop-item" style="animation-delay:${delay}s">
    <span style="font-size:1.6rem">⚡</span>
    <span class="drop-qty">+10 EV</span>
    <span class="drop-label">EV Points</span>
  </div>`;
  grid.innerHTML = gridHTML;

  // Barra de XP
  if (mySlot){
    pokeName.textContent = cap(myPokeName) + (leveledUp ? ` → Lv.${novoNivel}` : ` Lv.${novoNivel}`);
    xpValEl.textContent  = `+${drops.xp} XP`;
    const xpPct = Math.min(100, Math.floor((novoXP / xpParaNivel(novoNivel + 1)) * 100));
    // Animar barra
    xpFill.style.width = '0%';
    setTimeout(() => { xpFill.style.width = xpPct + '%'; }, 400);
    if (leveledUp){
      lvlUpEl.style.display = 'block';
    }
    if (ganheiGolpe && !pendingNewMove){
      const moveName = ganheiGolpe.replace(/_/g,' ').replace(/\b\w/g, l => l.toUpperCase());
      let mEl = document.getElementById('dropsMoveLearn');
      if (!mEl && lvlUpEl){
        mEl = document.createElement('div');
        mEl.id = 'dropsMoveLearn';
        mEl.style.cssText = 'color:#27ae60;font-weight:bold;font-size:0.8rem;margin-top:4px;display:none';
        lvlUpEl.parentNode.insertBefore(mEl, lvlUpEl.nextSibling);
      }
      if (mEl){ mEl.style.display = 'block'; mEl.innerHTML = `🎓 Learned <b>${moveName}</b>!`; }
    }
    // Dialog de troca de golpe quando já tem 4
    if (pendingNewMove) {
      const newMoveName = pendingNewMove.replace(/_/g,' ').replace(/\b\w/g, l => l.toUpperCase());
      const moveInfo = MOVES_DB[pendingNewMove] || {};
      // Montar modal de troca
      setTimeout(() => mostrarDialogTrocaGolpe(pendingNewMove, newMoveName, moveInfo, nGolpes, mySlot, novoTeam), 1200);
    }
  } else {
    pokeName.textContent = 'Raid complete!';
    xpValEl.textContent  = `+${drops.xp} XP`;
  }

  overlay.classList.add('show');
  // Esconder o resultOverlay se estava visível
  document.getElementById('resultOverlay')?.classList.remove('show');

  // Limpar qualquer missão pendente no localStorage que possa disparar
  // automaticamente ao voltar para a home — a missão 'completar_raid'
  // deve ser acionada SOMENTE quando o usuário clicar no widget, nunca
  // como side-effect da captura/drops.
  try { localStorage.removeItem('bossraid_pending_mission'); } catch(e) {}

  agendarLimpezaSala();
}

// ══ Dialog de Troca de Golpe ══════════════════════════════════
// Exibido quando o pokemon aprende um golpe novo mas já tem 4.
// O jogador escolhe qual golpe substituir (ou mantém os atuais).
function mostrarDialogTrocaGolpe(novaKey, novaName, novaInfo, golpesAtuais, mySlot, novoTeam) {
  // Remover dialog anterior se existir
  document.getElementById('moveSwapDialog')?.remove();

  const cor = novaInfo.type ? (window.TIPO_CORES?.[novaInfo.type] || '#888') : '#888';
  const pwr = novaInfo.power ? `PWR <b>${novaInfo.power}</b>` : '<span style="color:#7ec8e3">Status</span>';
  const acc = novaInfo.acc ? `ACC <b>${novaInfo.acc}%</b>` : '';
  const pp  = novaInfo.pp  ? `PP <b>${novaInfo.pp}</b>`   : '';

  const slotsHTML = golpesAtuais.map((key, i) => {
    const m = MOVES_DB[key] || {};
    const c2 = m.type ? (window.TIPO_CORES?.[m.type] || '#888') : '#888';
    return `<div class="mswap-slot" data-idx="${i}" style="border-color:${c2}44">
      <span class="mswap-slot-name">${m.name || key}</span>
      <span class="mswap-slot-type" style="background:${c2}33;color:${c2}">${m.type||'?'}</span>
      <span class="mswap-slot-stats">${m.power?'PWR '+m.power:'Status'} | PP ${m.pp||'—'}</span>
    </div>`;
  }).join('');

  const dialog = document.createElement('div');
  dialog.id = 'moveSwapDialog';
  dialog.innerHTML = `
    <div class="mswap-overlay">
      <div class="mswap-box">
        <div class="mswap-header">
          <span class="mswap-title">🎓 New Move!</span>
          <div class="mswap-new" style="border-color:${cor}55;background:${cor}18">
            <span class="mswap-new-name" style="color:${cor}">${novaName}</span>
            <span class="mswap-new-type" style="background:${cor}33;color:${cor}">${novaInfo.type||'?'}</span>
            <span class="mswap-new-stats">${pwr} ${acc} ${pp}</span>
            ${novaInfo.desc ? `<span class="mswap-new-desc">${novaInfo.desc}</span>` : ''}
          </div>
          <p class="mswap-prompt">Choose a move to <b>replace</b>, or <b>Keep All</b>:</p>
        </div>
        <div class="mswap-slots">${slotsHTML}</div>
        <button class="mswap-keep-btn" id="mswapKeep">Keep All (don't learn ${novaName})</button>
      </div>
    </div>`;
  document.body.appendChild(dialog);

  // Keep All — não aprende o golpe
  dialog.querySelector('#mswapKeep').addEventListener('click', async () => {
    dialog.remove();
    // Remover pendingMove do slot no Firestore
    try {
      const { doc, updateDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
      const raidTeam = novoTeam.map(s =>
        s.slot === mySlot.slot ? { ...s, pendingMove: null } : s
      );
      await updateDoc(doc(_db, 'usuarios', _uid), { raidTeam: JSON.parse(JSON.stringify(raidTeam)) });
    } catch(e) { console.warn('mswap keep err:', e); }
  });

  // Escolher golpe para substituir
  dialog.querySelectorAll('.mswap-slot').forEach(el => {
    el.addEventListener('click', async () => {
      const idx = parseInt(el.dataset.idx);
      dialog.remove();
      const novosGolpes = [...golpesAtuais];
      novosGolpes[idx] = novaKey;
      try {
        const { doc, updateDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
        const raidTeam = novoTeam.map(s =>
          s.slot === mySlot.slot ? { ...s, golpes: novosGolpes, pendingMove: null } : s
        );
        await updateDoc(doc(_db, 'usuarios', _uid), { raidTeam: JSON.parse(JSON.stringify(raidTeam)) });
      } catch(e) { console.warn('mswap replace err:', e); }
    });
  });
}

function agendarLimpezaSala(){
  if (_limpezaAgendada) return;
  _limpezaAgendada = true;
  setTimeout(async () => {
    try { await remove(ref(rdb, `boss_salas/${_salaId}`)); } catch(e){}
  }, 5 * 60 * 1000); // 5 minutos
}

function mostrarResultado(tipo, capturedBy){
  const ov    = document.getElementById('resultOverlay');
  const icon  = document.getElementById('resultIcon');
  const title = document.getElementById('resultTitle');
  const desc  = document.getElementById('resultDesc');

  if (tipo === 'victory'){
    icon.textContent='🏆'; title.style.color='#ffad00'; title.textContent='Victory!';
    desc.textContent='The boss has been defeated! Well done, trainers!';
  } else if (tipo === 'capture'){
    icon.textContent='🎉'; title.style.color='#2ecc71'; title.textContent='Gotcha!';
    const who = capturedBy === _uid ? 'You' : sanitize(_battleSnap?.players?.[capturedBy]?.nick || 'A player');
    const bossDisplayName = cap(_bossNome) || 'the boss Pokémon';
    desc.textContent=`${who} caught ${bossDisplayName}!`;
  } else if (tipo === 'defeat'){
    icon.textContent='💀'; title.style.color='#ff4444'; title.textContent='Defeated!';
    desc.textContent='Your entire team has fainted. Better luck next time!';
  }

  ov.classList.add('show');
  if (tipo === 'capture' || tipo === 'defeat' || tipo === 'victory'){
    agendarLimpezaSala();
  }
  // Info extra: turno em que terminou
  const extraEl = document.getElementById('resultExtra');
  if (extraEl && _battleSnap){
    const turno = _battleSnap.turno || 0;
    const totalPlayers = Object.keys(_battleSnap.players||{}).length;
    extraEl.textContent = `Battle ended on round ${turno} • ${totalPlayers} trainer${totalPlayers>1?'s':''} participated`;
  }
}

// ══════════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════════
function getNick(){ return _userData?.displayName || 'Trainer'; }

function getMoveLight(key){
  return MOVES_DB[key] || null;
}
