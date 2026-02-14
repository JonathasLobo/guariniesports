import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc, collection, getDocs, setDoc, addDoc, query, where, writeBatch } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { pokemonRoles, pokemonLanes } from '../util.js';
import { normalizeTeamName, capitalize } from './tournament-utils.js';
import { query, where } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC9LLCXrQTHBagQxaChBazSfS5E4gUPIoI",
  authDomain: "site-grn.firebaseapp.com",
  projectId: "site-grn",
  storageBucket: "site-grn.firebasestorage.app",
  messagingSenderId: "27613322806",
  appId: "1:27613322806:web:ad4dc08ce043f19d530297"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// ========================================
// VARIÁVEIS GLOBAIS
// ========================================
let currentUser = null;
let userRole = null;
let matchData = null;
let uploadedMatchesData = []; // Array para múltiplas partidas
let currentMatchIndex = 0; // Índice da partida atual sendo configurada
let matchId = null;
let tournamentId = null;
let allMatchesBans = {}; // Armazena bans de todas as partidas
let availablePokemon = [];
let playerRoleLaneChanges = {}; // Armazena as mudanças de role/lane
let selectedFormat = 3; // MD3 por padrão
let selectedWinners = {};

// ========================================
// FUNÇÃO AUXILIAR: BUSCAR TIME NOS GRUPOS
// ========================================
function findTeamInGroups(teamName, groups) {
  if (!groups || !teamName) return null;
  
  const normalized = normalizeTeamName(teamName);
  
  for (const [groupLetter, groupTeams] of Object.entries(groups)) {
    if (!Array.isArray(groupTeams)) continue;
    
    for (const team of groupTeams) {
      const teamObj = typeof team === 'string' ? { name: team, logo: null, players: [] } : team;
      
      if (normalizeTeamName(teamObj.name) === normalized) {
        return {
          ...teamObj,
          groupLetter: groupLetter
        };
      }
    }
  }
  
  return null;
}

// ========================================
// MAPEAMENTO DE SKILLS ESPECIAIS
// ========================================
const skillMapping = {
  'leafeon': {
    's111': 's11'
  },
  'suicune': {
    's111': 's11'
  },
  'tsareena': {
    's121': 's12',
    's211': 's21'
  },
  'mew': {
    's2b1': 's2b'
  }
  // Adicionar outros pokémons com skills especiais aqui conforme necessário
};

// ========================================
// FUNÇÃO PARA NORMALIZAR SKILL CODE
// ========================================
function normalizeSkillCode(pokemonName, skillCode) {
  const pokemon = pokemonName.toLowerCase();
  
  // 1️⃣ Verificar mapeamento específico primeiro
  if (skillMapping[pokemon] && skillMapping[pokemon][skillCode]) {
    console.log(`🔧 Mapped skill: ${pokemon} ${skillCode} → ${skillMapping[pokemon][skillCode]}`);
    return skillMapping[pokemon][skillCode];
  }
  
  // 2️⃣ ✅ REGEX GENÉRICO para padrões comuns
  // Padrão: s111 → s11, s121 → s12, s211 → s21, s2b1 → s2b
  if (/^s\d{3}$/.test(skillCode)) {
    // Remove último dígito: s111 → s11
    const normalized = skillCode.slice(0, 3);
    console.log(`🔧 Auto-normalized: ${pokemon} ${skillCode} → ${normalized}`);
    return normalized;
  }
  
  if (/^s[12][a-z]\d$/.test(skillCode)) {
    // Remove último dígito de skills com letra: s2b1 → s2b
    const normalized = skillCode.slice(0, 3);
    console.log(`🔧 Auto-normalized: ${pokemon} ${skillCode} → ${normalized}`);
    return normalized;
  }
  
  // 3️⃣ Retornar código original se não houver normalização
  return skillCode;
}

// ========================================
// OBTER PARÂMETROS DA URL
// ========================================
const urlParams = new URLSearchParams(window.location.search);
tournamentId = urlParams.get('tournamentId');
matchId = urlParams.get('matchId');

if (!tournamentId || !matchId) {
  showError();
} else {
  loadAvailablePokemon();
  checkAuthAndLoadMatch();
}

// ========================================
// CARREGAR POKÉMON DISPONÍVEIS
// ========================================
function loadAvailablePokemon() {
  // Lista de todos os Pokémon disponíveis
  availablePokemon = Object.keys(pokemonRoles).sort();
}

// ========================================
// VERIFICAR AUTENTICAÇÃO E CARREGAR PARTIDA
// ========================================
async function checkAuthAndLoadMatch() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      currentUser = user;
      console.log('👤 User logged in:', user.email);
      
      try {
        const userDocRef = doc(db, "usuarios", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        if (userDocSnap.exists()) {
          userRole = userDocSnap.data().role;
          console.log(`✅ User role loaded: ${userRole}`);
        } else {
          console.warn('⚠️ User document not found, assuming visitor');
          userRole = null;
        }
      } catch (error) {
        console.error('❌ Error fetching user role:', error);
        userRole = null;
      }
    } else {
      console.log('👁️ No user logged in - visitor mode');
      currentUser = null;
      userRole = null;
    }
    
    // ✅ Sempre carregar o match após verificar autenticação
    await loadMatch();
  });
}
// ========================================
// CARREGAR DADOS DA PARTIDA
// ========================================
async function loadMatch() {
  try {
    console.log('🔍 Loading tournament:', tournamentId);
    console.log('🔍 Looking for match:', matchId);
    
    const tournamentRef = doc(db, "tournaments", tournamentId);
    const tournamentSnap = await getDoc(tournamentRef);

    if (!tournamentSnap.exists()) {
      console.error('❌ Tournament not found');
      showError();
      return;
    }

    const tournament = tournamentSnap.data();
    let foundMatch = null;
    
    // ✅ PRIORIDADE 1: Buscar na subcoleção matchDetails (MAIS CONFIÁVEL)
    console.log('🔍 Searching in matchDetails subcollection...');
    try {
      const matchDetailsRef = collection(db, "tournaments", tournamentId, "matchDetails");
      const matchDetailsSnap = await getDocs(matchDetailsRef);
      
      if (!matchDetailsSnap.empty) {
        matchDetailsSnap.forEach(docSnap => {
          const matchData = docSnap.data();
          if (matchData.matchId === matchId) {
            foundMatch = matchData;
            console.log('✅ Match found in matchDetails subcollection');
          }
        });
      }
    } catch (error) {
      console.warn('⚠️ Error loading matchDetails:', error);
    }

    // ✅ PRIORIDADE 2: Se não encontrou, buscar em Group Stage (documento principal)
    if (!foundMatch) {
      console.log('🔍 Searching in Group Stage (main document)...');
      const allMatches = tournament.matches || {};
      
      for (const groupKey in allMatches) {
        const groupMatches = allMatches[groupKey];
        if (Array.isArray(groupMatches)) {
          foundMatch = groupMatches.find(m => m.matchId === matchId);
          if (foundMatch) {
            console.log(`✅ Match found in ${groupKey}:`, matchId);
            break;
          }
        }
      }
    }

    // ✅ PRIORIDADE 3: Buscar no Knockout Stage
    if (!foundMatch && tournament.knockoutStage && tournament.knockoutStage.matches) {
      console.log('🔍 Searching in Knockout Stage...');
      const knockoutMatches = tournament.knockoutStage.matches;
      
      const allKnockoutRounds = [
        ...(knockoutMatches.round16 || []),
        ...(knockoutMatches.quarterfinals || []),
        ...(knockoutMatches.semifinals || []),
        ...(knockoutMatches.final || [])
      ];
      
      foundMatch = allKnockoutRounds.find(m => m.matchId === matchId);
      
      if (foundMatch) {
        console.log('✅ Match found in Knockout Stage:', matchId);
      }
    }

    // ❌ SE NÃO ENCONTROU EM NENHUM LUGAR
    if (!foundMatch) {
      console.error('❌ Match not found anywhere:', matchId);
      
      // Logs detalhados para debug
      console.log('📋 Debug info:');
      console.log('  - Tournament has matches object?', !!tournament.matches);
      console.log('  - Tournament has knockoutStage?', !!tournament.knockoutStage);
      
      if (tournament.matches) {
        console.log('  - Available groups:', Object.keys(tournament.matches));
        Object.keys(tournament.matches).forEach(groupKey => {
          const groupMatches = tournament.matches[groupKey];
          if (Array.isArray(groupMatches)) {
            console.log(`    ${groupKey}:`, groupMatches.map(m => m.matchId));
          }
        });
      }
      
      showError();
      return;
    }

    matchData = foundMatch;
    console.log('✅ Match data loaded:', matchData);

    if (matchData.selectedWinners && Object.keys(matchData.selectedWinners).length > 0) {
      selectedWinners = { ...matchData.selectedWinners }; // 🔥 CLONE PROFUNDO
      console.log('✅ selectedWinners restored:', selectedWinners);
      console.log('📋 Restored selections:', Object.entries(selectedWinners).map(([k, v]) => `Game ${parseInt(k)+1}: ${v}`).join(', '));
    } else {
      // Inicializar com team1 por padrão
      console.log('⚠️ No saved selections found, initializing defaults...');
      selectedWinners = {};
      if (matchData.uploadedData) {
        matchData.uploadedData.forEach((_, index) => {
          selectedWinners[index] = 'team1';
        });
        console.log('📋 Default selections:', Object.entries(selectedWinners).map(([k, v]) => `Game ${parseInt(k)+1}: ${v}`).join(', '));
      }
    }

    // ✅ SE O MATCH NÃO TEM PLAYERS, BUSCAR DA SUBCOLEÇÃO
    if ((!matchData.team1.players || matchData.team1.players.length === 0) ||
        (!matchData.team2.players || matchData.team2.players.length === 0)) {
      console.log('⚠️ Match missing player data, loading from subcollection...');
      
      try {
        const matchDetailsRef = collection(db, "tournaments", tournamentId, "matchDetails");
        const matchDetailsSnap = await getDocs(matchDetailsRef);
        
        matchDetailsSnap.forEach(docSnap => {
          const data = docSnap.data();
          if (data.matchId === matchId && data.team1.players && data.team2.players) {
            matchData.team1.players = data.team1.players;
            matchData.team2.players = data.team2.players;
            console.log('✅ Player data loaded from subcollection');
          }
        });
      } catch (error) {
        console.warn('⚠️ Could not load player data:', error);
      }
    }
    
    renderMatch();
    
    document.getElementById('loadingContainer').style.display = 'none';
    document.getElementById('matchContainer').style.display = 'block';

  } catch (error) {
    console.error('❌ Error loading match:', error);
    showError();
  }
}
// ========================================
// RENDERIZAR PARTIDA
// ========================================
function renderMatch() {
  document.getElementById('matchTitle').textContent = `Match ${matchData.matchId}`;
  
  // ✅ Verificar se há resultados salvos
  const hasResults = matchData.result && matchData.result.status === 'completed';
  
  const statusBadge = document.getElementById('matchStatus');
  if (hasResults) {
    statusBadge.textContent = 'Completed';
    statusBadge.classList.add('completed');
  } else if (matchData.result && matchData.result.status === 'ongoing') {
    statusBadge.textContent = 'Ongoing';
  } else {
    statusBadge.textContent = 'Pending';
  }
  
  // ✅ MOSTRAR RESULTADOS OU UPLOAD SECTION
  if (hasResults) {
    // Match já tem resultados - mostrar resultados
    console.log('✅ Match completed - showing results');
    showResultsSection();
  } else {
    // Match ainda não tem resultados
    if (isAdminOrCreator()) {
      // Admin/Creator pode fazer upload
      console.log('🔑 Admin/Creator detected - showing upload section');
      showUploadSection();
    } else {
      // Visitante vê mensagem de aguardando
      console.log('👁️ Visitor - showing awaiting section');
      showAwaitingSection();
    }
  }
}

// ========================================
// VERIFICAR SE É ADMIN OU CREATOR
// ========================================
function isAdminOrCreator() {
  const isAuthorized = userRole === 'admin' || userRole === 'creator';
  console.log(`🔐 Permission check: userRole="${userRole}" → ${isAuthorized ? '✅ Authorized' : '❌ Not authorized'}`);
  return isAuthorized;
}

// ========================================
// MOSTRAR SEÇÃO DE UPLOAD
// ========================================
function showUploadSection() {
  // ✅ Mostrar seção de upload E seletor de formato
  document.getElementById('uploadSection').style.display = 'block';
  document.getElementById('formatSelector').style.display = 'block';
  
  // ✅ Esconder outras seções
  document.getElementById('configSection').style.display = 'none';
  document.getElementById('resultsSection').style.display = 'none';
  document.getElementById('awaitingSection').style.display = 'none';
  
  console.log('📤 Upload section displayed');
  
  setupFormatSelector();
  setupUploadButton();
}

function setupUploadButton() {
  const btnUploadJson = document.getElementById('btnUploadJson');
  const jsonFileInput = document.getElementById('jsonFileInput');
  
  // 🔥 REMOVER listeners antigos clonando os elementos
  const newBtn = btnUploadJson.cloneNode(true);
  btnUploadJson.parentNode.replaceChild(newBtn, btnUploadJson);
  
  const newInput = jsonFileInput.cloneNode(true);
  jsonFileInput.parentNode.replaceChild(newInput, jsonFileInput);
  
  // Adicionar novos event listeners
  newBtn.addEventListener('click', () => {
    newInput.click();
  });
  
  newInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      handleJsonUpload(file);
    }
  });
}

function setupFormatSelector() {
  const formatButtons = document.querySelectorAll('.btn-format-select');
  
  formatButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      formatButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedFormat = parseInt(btn.dataset.format);
    });
  });
}

// ========================================
// VALIDAR FORMATO DO MATCH (MD1/MD3/MD5)
// ========================================
function validateMatchFormat(games, format, selectedWinners) {
  const minGamesToWin = Math.ceil(format / 2); // MD3 = 2, MD5 = 3
  
  // Contar vitórias de cada time
  let team1Wins = 0;
  let team2Wins = 0;
  
  games.forEach((game, index) => {
    const winner = selectedWinners[index] || 'team1';
    if (winner === 'team1') {
      team1Wins++;
    } else {
      team2Wins++;
    }
  });
  
  console.log(`🎯 Format validation: MD${format}, Games: ${games.length}, Score: ${team1Wins}-${team2Wins}`);
  
  // ✅ VALIDAÇÃO 1: Alguém deve ter atingido o mínimo para vencer
  if (team1Wins < minGamesToWin && team2Wins < minGamesToWin) {
    return {
      valid: false,
      message: `⚠️ Invalid match result!\n\nFor MD${format}, one team must win at least ${minGamesToWin} game(s).\n\nCurrent score: ${team1Wins}-${team2Wins}\n\nPlease check the winner selection for each game.`
    };
  }
  
  // 🆕 VALIDAÇÃO 2: Ambos os times NÃO podem ter vitórias suficientes
  if (team1Wins >= minGamesToWin && team2Wins >= minGamesToWin) {
    return {
      valid: false,
      message: `⚠️ Impossible result: Both teams cannot win!\n\nFor MD${format}, only ONE team can have ${minGamesToWin}+ wins.\n\nCurrent score: ${team1Wins}-${team2Wins}\n\nPlease review your winner selections.`
    };
  }
  
  // ✅ VALIDAÇÃO 3: Número de games deve ser EXATAMENTE o necessário
  const maxWins = Math.max(team1Wins, team2Wins);
  const minWins = Math.min(team1Wins, team2Wins);
  const requiredGames = maxWins + minWins;
  
  if (games.length !== requiredGames) {
    return {
      valid: false,
      message: `⚠️ Incorrect number of games!\n\nWith a score of ${maxWins}-${minWins}, you need EXACTLY ${requiredGames} game(s).\n\nYou uploaded ${games.length} game(s).\n\n${games.length > requiredGames ? 'Remove extra games from the JSON.' : 'Add missing games to the JSON.'}`
    };
  }
  
  // ✅ VALIDAÇÃO 4: Pelo menos o mínimo de jogos
  if (games.length < minGamesToWin) {
    return {
      valid: false,
      message: `⚠️ Insufficient games!\n\nFor MD${format}, you need at least ${minGamesToWin} game(s).\n\nYou only uploaded ${games.length} game(s).`
    };
  }
  
  // ✅ VALIDAÇÃO 5: Não pode exceder o formato máximo
  if (games.length > format) {
    return {
      valid: false,
      message: `⚠️ Too many games!\n\nFor MD${format}, maximum ${format} games allowed.\n\nYou uploaded ${games.length} game(s).`
    };
  }
  
  // 🆕 VALIDAÇÃO 6: Placar deve fazer sentido matematicamente
  const possibleScores = [];
  
  // Calcular todos os placares possíveis para este formato
  for (let wins = minGamesToWin; wins <= format; wins++) {
    for (let losses = 0; losses < minGamesToWin; losses++) {
      const totalGames = wins + losses;
      if (totalGames >= minGamesToWin && totalGames <= format) {
        possibleScores.push({ wins, losses, total: totalGames });
      }
    }
  }
  
  // Verificar se o placar atual é válido
  const currentScoreValid = possibleScores.some(score => 
    score.total === games.length &&
    ((score.wins === maxWins && score.losses === minWins) ||
     (score.wins === minWins && score.losses === maxWins))
  );
  
  if (!currentScoreValid) {
    const validScoresText = possibleScores
      .map(s => `${s.wins}-${s.losses} (${s.total} games)`)
      .join(', ');
    
    return {
      valid: false,
      message: `⚠️ Invalid score for MD${format}!\n\n` +
        `With ${games.length} game(s), the score ${maxWins}-${minWins} is mathematically impossible.\n\n` +
        `Valid scores for MD${format}:\n${validScoresText}\n\n` +
        `Example: MD3 can only be 2-0 or 2-1, never 3-0 (series ends at 2 wins).`
    };
  }
  
  return { 
    valid: true,
    score: `${team1Wins}-${team2Wins}`
  };
}

// ========================================
// PROCESSAR UPLOAD DO JSON
// ========================================
async function handleJsonUpload(file) {
  console.log('Starting JSON upload process...');
  console.log('Selected format:', selectedFormat);
  console.log('File:', file.name);
  
  try {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        console.log('File read successfully');
        const jsonData = JSON.parse(e.target.result);
        console.log('JSON parsed:', jsonData);
        
        // ✅ VALIDAÇÃO 1: Estrutura básica
        if (!Array.isArray(jsonData) || jsonData.length === 0) {
          alert('❌ Invalid JSON format - must be an array of matches');
          return;
        }
        
        // 🔥 NOVA VALIDAÇÃO 2: Integridade completa dos dados
        console.log('🔍 Starting data integrity validation...');
        
        for (let i = 0; i < jsonData.length; i++) {
          const game = jsonData[i];
          const gameNum = i + 1;
          
          console.log(`Validating Game ${gameNum}...`);
          
          // ✅ Verificar estrutura básica dos times
          if (!game.winnerTeam) {
            alert(`❌ Game ${gameNum}: Missing "winnerTeam" object\n\nThe JSON must have a "winnerTeam" field.`);
            return;
          }
          
          if (!game.defeatedTeam) {
            alert(`❌ Game ${gameNum}: Missing "defeatedTeam" object\n\nThe JSON must have a "defeatedTeam" field.`);
            return;
          }
          
          // ✅ Verificar se tem totalScore
          if (game.winnerTeam.totalScore === undefined || game.winnerTeam.totalScore === null) {
            console.warn(`⚠️ Game ${gameNum}: winnerTeam missing totalScore, defaulting to 0`);
            game.winnerTeam.totalScore = 0;
          }
          
          if (game.defeatedTeam.totalScore === undefined || game.defeatedTeam.totalScore === null) {
            console.warn(`⚠️ Game ${gameNum}: defeatedTeam missing totalScore, defaulting to 0`);
            game.defeatedTeam.totalScore = 0;
          }
          
          // ✅ Validar players do Winner Team
          const winnerPlayers = Object.keys(game.winnerTeam).filter(k => k.startsWith('player'));
          
          if (winnerPlayers.length === 0) {
            alert(`❌ Game ${gameNum}: Winner team has NO players!\n\nExpected format:\n"winnerTeam": {\n  "player1": {...},\n  "player2": {...},\n  ...\n}`);
            return;
          }
          
          if (winnerPlayers.length < 4) {
            alert(`❌ Game ${gameNum}: Winner team has only ${winnerPlayers.length} player(s)\n\nPokémon Unite requires 5 players per team.\n\nFound players: ${winnerPlayers.join(', ')}`);
            return;
          }
          
          if (winnerPlayers.length > 5) {
            alert(`❌ Game ${gameNum}: Winner team has ${winnerPlayers.length} players (too many!)\n\nPokémon Unite has exactly 5 players per team.\n\nFound: ${winnerPlayers.join(', ')}`);
            return;
          }
          
          // ✅ Validar players do Defeated Team
          const defeatedPlayers = Object.keys(game.defeatedTeam).filter(k => k.startsWith('player'));
          
          if (defeatedPlayers.length === 0) {
            alert(`❌ Game ${gameNum}: Defeated team has NO players!\n\nExpected format:\n"defeatedTeam": {\n  "player1": {...},\n  "player2": {...},\n  ...\n}`);
            return;
          }
          
          if (defeatedPlayers.length < 4) {
            alert(`❌ Game ${gameNum}: Defeated team has only ${defeatedPlayers.length} player(s)\n\nPokémon Unite requires 5 players per team.\n\nFound players: ${defeatedPlayers.join(', ')}`);
            return;
          }
          
          if (defeatedPlayers.length > 5) {
            alert(`❌ Game ${gameNum}: Defeated team has ${defeatedPlayers.length} players (too many!)\n\nPokémon Unite has exactly 5 players per team.\n\nFound: ${defeatedPlayers.join(', ')}`);
            return;
          }
          
          // ✅ Validar dados essenciais de cada player (Winner Team)
          for (let j = 0; j < winnerPlayers.length; j++) {
            const playerKey = winnerPlayers[j];
            const player = game.winnerTeam[playerKey];
            const playerNum = j + 1;
            
            if (!player) {
              alert(`❌ Game ${gameNum}: ${playerKey} in winner team is NULL or undefined`);
              return;
            }
            
            // Validar playerName
            if (!player.playerName || player.playerName.trim() === '') {
              alert(`❌ Game ${gameNum}: Winner team ${playerKey} missing "playerName"\n\nEvery player must have:\n- playerName (string)\n- pokemon (string)\n- kills, assists, etc.`);
              return;
            }
            
            // Validar pokemon
            if (!player.pokemon || player.pokemon.trim() === '') {
              alert(`❌ Game ${gameNum}: Winner team ${playerKey} (${player.playerName}) missing "pokemon" field\n\nEvery player must specify which Pokémon they used.`);
              return;
            }
            
            // Validar stats numéricas (adicionar defaults se faltarem)
            const requiredStats = [
              'kills', 'assists', 'interrupts', 'playerScore', 
              'damageDone', 'damageTaken', 'damageHealed'
            ];
            
            for (const stat of requiredStats) {
              if (player[stat] === undefined || player[stat] === null) {
                console.warn(`⚠️ Game ${gameNum}: Winner ${player.playerName} missing "${stat}", defaulting to 0`);
                player[stat] = 0;
              }
              
              // Converter para número se for string
              if (typeof player[stat] === 'string') {
                player[stat] = parseFloat(player[stat]) || 0;
              }
              
              // Validar que é número válido
              if (isNaN(player[stat]) || player[stat] < 0) {
                console.warn(`⚠️ Game ${gameNum}: Winner ${player.playerName} has invalid "${stat}" (${player[stat]}), setting to 0`);
                player[stat] = 0;
              }
            }
            
            // Validar abilities (skills) - opcional mas deve ser array se existir
            if (player.abilities !== undefined && player.abilities !== null) {
              if (!Array.isArray(player.abilities)) {
                console.warn(`⚠️ Game ${gameNum}: Winner ${player.playerName} has invalid "abilities" format (must be array), converting...`);
                player.abilities = [];
              }
            } else {
              console.warn(`⚠️ Game ${gameNum}: Winner ${player.playerName} missing "abilities", setting empty array`);
              player.abilities = [];
            }
            
            console.log(`  ✅ Winner ${playerKey} (${player.playerName} - ${player.pokemon}) validated`);
          }
          
          // ✅ Validar dados essenciais de cada player (Defeated Team)
          for (let j = 0; j < defeatedPlayers.length; j++) {
            const playerKey = defeatedPlayers[j];
            const player = game.defeatedTeam[playerKey];
            const playerNum = j + 1;
            
            if (!player) {
              alert(`❌ Game ${gameNum}: ${playerKey} in defeated team is NULL or undefined`);
              return;
            }
            
            // Validar playerName
            if (!player.playerName || player.playerName.trim() === '') {
              alert(`❌ Game ${gameNum}: Defeated team ${playerKey} missing "playerName"\n\nEvery player must have:\n- playerName (string)\n- pokemon (string)\n- kills, assists, etc.`);
              return;
            }
            
            // Validar pokemon
            if (!player.pokemon || player.pokemon.trim() === '') {
              alert(`❌ Game ${gameNum}: Defeated team ${playerKey} (${player.playerName}) missing "pokemon" field\n\nEvery player must specify which Pokémon they used.`);
              return;
            }
            
            // Validar stats numéricas (adicionar defaults se faltarem)
            const requiredStats = [
              'kills', 'assists', 'interrupts', 'playerScore', 
              'damageDone', 'damageTaken', 'damageHealed'
            ];
            
            for (const stat of requiredStats) {
              if (player[stat] === undefined || player[stat] === null) {
                console.warn(`⚠️ Game ${gameNum}: Defeated ${player.playerName} missing "${stat}", defaulting to 0`);
                player[stat] = 0;
              }
              
              // Converter para número se for string
              if (typeof player[stat] === 'string') {
                player[stat] = parseFloat(player[stat]) || 0;
              }
              
              // Validar que é número válido
              if (isNaN(player[stat]) || player[stat] < 0) {
                console.warn(`⚠️ Game ${gameNum}: Defeated ${player.playerName} has invalid "${stat}" (${player[stat]}), setting to 0`);
                player[stat] = 0;
              }
            }
            
            // Validar abilities (skills) - opcional mas deve ser array se existir
            if (player.abilities !== undefined && player.abilities !== null) {
              if (!Array.isArray(player.abilities)) {
                console.warn(`⚠️ Game ${gameNum}: Defeated ${player.playerName} has invalid "abilities" format (must be array), converting...`);
                player.abilities = [];
              }
            } else {
              console.warn(`⚠️ Game ${gameNum}: Defeated ${player.playerName} missing "abilities", setting empty array`);
              player.abilities = [];
            }
            
            console.log(`  ✅ Defeated ${playerKey} (${player.playerName} - ${player.pokemon}) validated`);
          }
          
          // ✅ Validar informações adicionais do match
          if (!game.matchDate) {
            console.warn(`⚠️ Game ${gameNum}: Missing "matchDate", using current date`);
            game.matchDate = new Date().toISOString().split('T')[0];
          }
          
          if (!game.matchType) {
            console.warn(`⚠️ Game ${gameNum}: Missing "matchType", defaulting to "Standard"`);
            game.matchType = 'Standard';
          }
          
          console.log(`✅ Game ${gameNum} passed all validations`);
        }
        
        console.log('✅ All games validated successfully!');
        
        // ✅ VALIDAÇÃO 3: Verificar formato do match (MD1/MD3/MD5)
        if (jsonData.length > selectedFormat) {
          alert(`❌ Format error!\nYou selected MD${selectedFormat} but uploaded ${jsonData.length} match(es).\n\nYou cannot upload more than ${selectedFormat} match(es).`);
          return;
        }

        // Verificar se o número de partidas faz sentido (ex: MD3 com 2 partidas = 2x0)
        const minGamesNeeded = Math.ceil(selectedFormat / 2);
        if (jsonData.length < minGamesNeeded) {
          alert(`⚠️ Insufficient games!\nFor MD${selectedFormat}, you need at least ${minGamesNeeded} game(s).\n\nYou uploaded only ${jsonData.length} game(s).`);
          return;
        }

        console.log(`✅ Format validation passed: MD${selectedFormat} with ${jsonData.length} game(s)`);

        // ✅ INICIALIZAR selectedWinners BASEADO NO JSON
        selectedWinners = {};
        jsonData.forEach((game, index) => {
          // 🔥 DETERMINAR VENCEDOR PELO SCORE DO JSON
          const team1Score = game.winnerTeam?.totalScore || 0;
          const team2Score = game.defeatedTeam?.totalScore || 0;
          
          if (team1Score > team2Score) {
            selectedWinners[index] = 'team1'; // winnerTeam ganhou
          } else if (team2Score > team1Score) {
            selectedWinners[index] = 'team2'; // defeatedTeam ganhou (invertido no JSON)
          } else {
            // Empate improvável, mas padrão para team1
            selectedWinners[index] = 'team1';
          }
          
          console.log(`🎯 Game ${index + 1}: Score ${team1Score}-${team2Score} → Winner: ${selectedWinners[index]}`);
        });

        // ✅ VALIDAR FORMATO COMPLETO
        const formatValidation = validateMatchFormat(jsonData, selectedFormat, selectedWinners);
        if (!formatValidation.valid) {
          alert(formatValidation.message);
          return;
        }

        console.log('✅ Format validation complete:', formatValidation.score);

        console.log('Validation passed!');
        uploadedMatchesData = jsonData;
        currentMatchIndex = 0;
        
        // Inicializar bans e mudanças de role/lane
    allMatchesBans = {};
    playerRoleLaneChanges = {};

    uploadedMatchesData.forEach((_, index) => {
      allMatchesBans[index] = { winner: [], defeated: [] };
      playerRoleLaneChanges[index] = { winner: [], defeated: [] };
      
      // ✅ SEMPRE INICIALIZAR COM team1 (winnerTeam do JSON)
      selectedWinners[index] = 'team1';
    });

    console.log('Data initialized successfully');
        
        document.getElementById('uploadFileName').textContent = 
          `✅ ${file.name} (MD${uploadedMatchesData.length})`;
        
        document.getElementById('uploadSection').style.display = 'none';
        document.getElementById('formatSelector').style.display = 'none';
        document.getElementById('configSection').style.display = 'block';
        
        if (uploadedMatchesData.length > 1) {
          renderMatchSelector();
        }
        
        renderConfigSection();
        
      } catch (error) {
        console.error('Error parsing JSON:', error);
        
        // Mensagem de erro mais detalhada
        let errorMessage = '❌ Error reading JSON file:\n\n';
        
        if (error instanceof SyntaxError) {
          errorMessage += `Syntax Error: ${error.message}\n\n`;
          errorMessage += 'Common issues:\n';
          errorMessage += '• Missing comma between objects\n';
          errorMessage += '• Unclosed brackets { } or [ ]\n';
          errorMessage += '• Invalid quotes (use "double quotes")\n';
          errorMessage += '• Trailing commas after last item\n\n';
          errorMessage += 'Use a JSON validator like jsonlint.com to check your file.';
        } else {
          errorMessage += error.message;
        }
        
        alert(errorMessage);
      }
    };
    
    reader.onerror = (error) => {
      console.error('FileReader error:', error);
      alert('❌ Error reading file\n\nThe file may be corrupted or in an unsupported format.\n\nPlease try:\n1. Re-exporting the JSON\n2. Opening and re-saving in a text editor\n3. Using a different file');
    };
    
    reader.readAsText(file);
    
  } catch (error) {
    console.error('Error handling file:', error);
    alert('❌ Error processing file: ' + error.message);
  }
}

// ========================================
// RENDERIZAR SELETOR DE PARTIDAS
// ========================================
function renderMatchSelector() {
  const configSection = document.getElementById('configSection');
  
  // Verificar se já existe o seletor
  let matchSelector = document.querySelector('.match-selector');
  if (!matchSelector) {
    matchSelector = document.createElement('div');
    matchSelector.className = 'match-selector';
    configSection.insertBefore(matchSelector, configSection.firstChild);
  }
  
  matchSelector.innerHTML = `
    <h3>📋 Select Match to Configure (${uploadedMatchesData.length} matches)</h3>
    <div class="match-buttons">
      ${uploadedMatchesData.map((match, index) => `
        <button 
          class="btn-match-select ${index === currentMatchIndex ? 'active' : ''}" 
          data-index="${index}"
        >
          Match ${index + 1}
          ${allMatchesBans[index] && (allMatchesBans[index].winner.length > 0 || allMatchesBans[index].defeated.length > 0) 
            ? '✓' : ''}
        </button>
      `).join('')}
    </div>
  `;
  
  // Adicionar event listeners
  matchSelector.querySelectorAll('.btn-match-select').forEach(btn => {
    btn.addEventListener('click', () => {
      currentMatchIndex = parseInt(btn.dataset.index);
      renderMatchSelector();
      renderConfigSection();
    });
  });
}

// ========================================
// RENDERIZAR SEÇÃO DE CONFIGURAÇÃO
// ========================================
function renderConfigSection() {
  const currentMatch = uploadedMatchesData[currentMatchIndex];
  const { winnerTeam, defeatedTeam } = currentMatch;
  
  // Garantir que existe a estrutura de winners selecionados
  if (!selectedWinners[currentMatchIndex]) {
    selectedWinners[currentMatchIndex] = 'team1'; // Padrão: team1 vence
  }
  
  document.getElementById('winnerScore').textContent = winnerTeam.totalScore || 0;
  document.getElementById('defeatedScore').textContent = defeatedTeam.totalScore || 0;
  
  renderTeamPlayers(winnerTeam, 'winnerTeamPlayers');
  renderTeamPlayers(defeatedTeam, 'defeatedTeamPlayers');
  
  setupWinnerSelector(); // 🔥 NOVA FUNÇÃO
  setupBansSelection();
  setupSaveButton();
}

// ========================================
// SETUP WINNER SELECTOR
// ========================================
function setupWinnerSelector() {
  const configSection = document.getElementById('configSection');
  
  // Verificar se já existe o seletor
  let winnerSelector = document.querySelector('.winner-selector-container');
  
  if (!winnerSelector) {
    // Criar container do seletor
    winnerSelector = document.createElement('div');
    winnerSelector.className = 'winner-selector-container';
    
    // Inserir ANTES da seção de bans
    const bansSection = document.querySelector('.bans-section');
    if (bansSection) {
      configSection.insertBefore(winnerSelector, bansSection);
    } else {
      configSection.appendChild(winnerSelector);
    }
  }
  
const team1Name = matchData.team1.name;
const team2Name = matchData.team2.name;
const team1Logo = matchData.team1.logo;
const team2Logo = matchData.team2.logo;

// ✅ BUSCAR SCORES DO JSON
const currentMatch = uploadedMatchesData[currentMatchIndex];
const team1Score = currentMatch.winnerTeam?.totalScore || 0;
const team2Score = currentMatch.defeatedTeam?.totalScore || 0;

const currentWinner = selectedWinners[currentMatchIndex] || 'team1';

winnerSelector.innerHTML = `
  <div class="winner-selector-header">
    <h3>🏆 Select Winner for Game ${currentMatchIndex + 1}</h3>
    <p style="color: #aaa; font-size: 0.95rem; margin-top: 8px;">
      Choose which team won this game
    </p>
    
    <div style="
      margin-top: 15px; 
      padding: 15px; 
      background: rgba(255,173,0,0.1); 
      border: 2px solid rgba(255,173,0,0.3); 
      border-radius: 8px;
    ">
      <p style="color: #ffad00; font-size: 0.9rem; margin: 0;">
        📊 <strong>JSON Data:</strong> winnerTeam scored ${team1Score} pts, defeatedTeam scored ${team2Score} pts
        <br><br>
        <strong>📋 Instructions:</strong>
        <br>
        • The JSON always lists the winner first (winnerTeam)
        <br>
        • The JSON always lists the loser second (defeatedTeam)
        <br>
        • Select which tournament team corresponds to winnerTeam in your JSON
      </p>
    </div>
  </div>
  
  <div class="winner-options">
    <div class="winner-option ${currentWinner === 'team1' ? 'selected' : ''}" data-team="team1">
      <div class="winner-option-logo">
        ${team1Logo 
          ? `<img src="${team1Logo}" alt="${team1Name}">` 
          : '🛡️'
        }
      </div>
      <div class="winner-option-name">
        ${team1Name}
        <div style="font-size: 0.8rem; color: #4ade80; margin-top: 5px; font-weight: 600;">
          ✅ Select this if ${team1Name} is the winnerTeam in your JSON
        </div>
      </div>
      <div class="winner-option-check">✓</div>
    </div>
    
    <div class="winner-option ${currentWinner === 'team2' ? 'selected' : ''}" data-team="team2">
      <div class="winner-option-logo">
        ${team2Logo 
          ? `<img src="${team2Logo}" alt="${team2Name}">` 
          : '🛡️'
        }
      </div>
      <div class="winner-option-name">
        ${team2Name}
        <div style="font-size: 0.8rem; color: #ff6b6b; margin-top: 5px; font-weight: 600;">
          ❌ Select this if ${team2Name} is the winnerTeam in your JSON
        </div>
      </div>
      <div class="winner-option-check">✓</div>
    </div>
  </div>
`;

  // Event listeners
winnerSelector.querySelectorAll('.winner-option').forEach(option => {
 option.addEventListener('click', function() {
    const selectedTeam = this.dataset.team;
    
    // Atualizar seleção diretamente (sem validações)
    selectedWinners[currentMatchIndex] = selectedTeam;
    
    // Atualizar visual
    winnerSelector.querySelectorAll('.winner-option').forEach(opt => {
      opt.classList.remove('selected');
    });
    this.classList.add('selected');
    
    console.log(`✅ Winner selected for Game ${currentMatchIndex + 1}: ${selectedTeam}`);
    
    if (uploadedMatchesData.length > 1) {
      renderMatchSelector();
    }
  });
});
}

// ========================================
// RENDERIZAR JOGADORES DO TIME
// ========================================
function renderTeamPlayers(team, containerId) {
  const teamType = containerId === 'winnerTeamPlayers' ? 'winner' : 'defeated';
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  
  const players = Object.keys(team)
    .filter(key => key.startsWith('player'))
    .map(key => team[key]);
  
  players.forEach((player, index) => {
    const pokemonName = player.pokemon.toLowerCase();
    
    // IMPORTANTE: Verificar se já existem mudanças salvas para este match
    if (!playerRoleLaneChanges[currentMatchIndex]) {
      playerRoleLaneChanges[currentMatchIndex] = { winner: [], defeated: [] };
    }
    
    const savedChanges = playerRoleLaneChanges[currentMatchIndex][teamType][index];
    
    // ✅ ROLE SEMPRE VEM DO UTIL.JS
    const currentRole = pokemonRoles[pokemonName] || 'All Rounder';
    const currentLane = savedChanges?.lane || getLaneForPokemon(pokemonName);
    
    const bgImage = `../estatisticas-shad/images/backgrounds/${pokemonName}-left-bg.png`;
    
    const playerCard = document.createElement('div');
    playerCard.className = 'player-card';
    
    // 🔥 VERIFICAR SE JÁ EXISTE userId VINCULADO
    const isLinked = player.userId ? true : false;
    
    playerCard.innerHTML = `
      <div class="player-avatar">
        <img src="${bgImage}" alt="${pokemonName}" onerror="this.style.display='none'; this.parentElement.innerHTML='🎮'">
      </div>
      <div class="player-info-main">
        <div class="player-name" style="display: flex; align-items: center; gap: 10px;">
          <span>${player.playerName}</span>
          ${isLinked ? 
            `<span style="background: rgba(74, 222, 128, 0.2); border: 1px solid #4ade80; color: #4ade80; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">✓ Linked</span>` 
            : 
            `<button class="btn-link-player" data-team="${teamType}" data-index="${index}" style="background: rgba(255, 173, 0, 0.2); border: 1px solid #ffad00; color: #ffad00; padding: 4px 10px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
              🔗 Link Player
            </button>`
          }
        </div>
        <div class="player-pokemon">${capitalize(player.pokemon)}</div>
        ${isLinked ? `<div style="color: #888; font-size: 0.75rem; margin-top: 3px;">ID: ${player.playerId || 'N/A'}</div>` : ''}
      </div>
      <div class="player-stats-and-selects">
        <div class="player-stats">
          <div class="player-stat">
            <span class="player-stat-label">K</span>
            <span class="player-stat-value">${player.kills}</span>
          </div>
          <div class="player-stat">
            <span class="player-stat-label">A</span>
            <span class="player-stat-value">${player.assists}</span>
          </div>
          <div class="player-stat">
            <span class="player-stat-label">Score</span>
            <span class="player-stat-value">${player.playerScore}</span>
          </div>
        </div>
        <div class="player-role-lane">
          <div class="role-display" style="padding: 10px; background: rgba(255, 173, 0, 0.1); border: 2px solid rgba(255, 173, 0, 0.3); border-radius: 6px; color: #ffad00; font-weight: 600; font-size: 0.85rem; text-align: center; min-width: 110px;">
            ${currentRole}
          </div>
          <select class="lane-select" data-player-index="${index}" data-team="${teamType}">
            <option value="Top" ${currentLane === 'Top' ? 'selected' : ''}>Top</option>
            <option value="Jungle" ${currentLane === 'Jungle' ? 'selected' : ''}>Jungle</option>
            <option value="Bot" ${currentLane === 'Bot' ? 'selected' : ''}>Bot</option>
          </select>
        </div>
      </div>
    `;
    
    container.appendChild(playerCard);
    
    // ✅ LANE SELECT
    const laneSelect = playerCard.querySelector('.lane-select');
    laneSelect.addEventListener('change', (e) => {
      savePlayerChanges(teamType, index, currentRole, e.target.value);
      console.log(`✅ Lane changed: ${player.playerName} - ${e.target.value}`);
    });
    
    // 🔥 LINK PLAYER BUTTON
    const btnLinkPlayer = playerCard.querySelector('.btn-link-player');
    if (btnLinkPlayer) {
      btnLinkPlayer.addEventListener('click', () => {
        openPlayerLinkModal(teamType, index, player);
      });
    }
  });
}

// ========================================
// SALVAR MUDANÇAS DO JOGADOR
// ========================================
function savePlayerChanges(teamType, playerIndex, role, lane) {
  // Garantir que a estrutura existe
  if (!playerRoleLaneChanges[currentMatchIndex]) {
    playerRoleLaneChanges[currentMatchIndex] = { winner: [], defeated: [] };
  }
  
  if (!Array.isArray(playerRoleLaneChanges[currentMatchIndex][teamType])) {
    playerRoleLaneChanges[currentMatchIndex][teamType] = [];
  }
  
  // Salvar as mudanças (role é sempre do util.js, mas salvamos para manter estrutura)
  playerRoleLaneChanges[currentMatchIndex][teamType][playerIndex] = {
    role: role,
    lane: lane
  };
  
  console.log('💾 Player changes saved:', {
    matchIndex: currentMatchIndex,
    teamType: teamType,
    playerIndex: playerIndex,
    role: role,
    lane: lane
  });
}

// ========================================
// OBTER LANE PARA POKÉMON
// ========================================
function getLaneForPokemon(pokemonName) {
  // Retorna diretamente a lane do pokemonLanes
  const lane = pokemonLanes[pokemonName];
  
  // Se não existir no objeto, retorna 'Top' como padrão
  return lane || 'Top';
}

// ========================================
// SETUP BANS SELECTION
// ========================================
function setupBansSelection() {
  // Restaurar bans salvos da partida atual
  const currentBans = allMatchesBans[currentMatchIndex] || { winner: [], defeated: [] };
  
  // Renderizar slots de bans com os dados salvos
  renderBanSlots('winner', currentBans.winner);
  renderBanSlots('defeated', currentBans.defeated);
  
  // Adicionar event listeners
  const winnerBanSlots = document.querySelectorAll('#winnerBans .ban-slot');
  const defeatedBanSlots = document.querySelectorAll('#defeatedBans .ban-slot');
  
  winnerBanSlots.forEach(slot => {
    slot.addEventListener('click', () => openBanModal('winner', slot));
  });
  
  defeatedBanSlots.forEach(slot => {
    slot.addEventListener('click', () => openBanModal('defeated', slot));
  });
  
  // Criar modal se não existir
  if (!document.getElementById('banModal')) {
    createBanModal();
  }
}

// ========================================
// RENDERIZAR SLOTS DE BANS
// ========================================
function renderBanSlots(team, bans) {
  const container = document.getElementById(`${team}Bans`);
  container.innerHTML = '';
  
  for (let i = 0; i < 3; i++) {
    const slot = document.createElement('div');
    slot.className = 'ban-slot';
    slot.dataset.team = team;
    slot.dataset.index = i;
    
    if (bans[i]) {
      const pokemonName = bans[i];
      const bgImage = `../estatisticas-shad/images/backgrounds/${pokemonName}-left-bg.png`;
      
      slot.classList.add('filled');
      slot.innerHTML = `
        <img src="${bgImage}" alt="${pokemonName}" onerror="this.style.display='none'">
        <button class="ban-remove" onclick="window.removeBan('${team}', ${i})">✕</button>
      `;
    } else {
      slot.innerHTML = '<span class="ban-placeholder">+ Add Ban</span>';
    }
    
    container.appendChild(slot);
  }
}

// ========================================
// CRIAR MODAL DE SELEÇÃO DE BANS
// ========================================
function createBanModal() {
  const modal = document.createElement('div');
  modal.id = 'banModal';
  modal.className = 'ban-modal';
  
  modal.innerHTML = `
    <div class="ban-modal-content">
      <div class="ban-modal-header">
        <h3>🚫 Select Pokémon to Ban</h3>
        <button class="ban-modal-close" onclick="window.closeBanModal()">✕</button>
      </div>
      <input 
        type="text" 
        class="ban-search" 
        placeholder="Search Pokémon..."
        oninput="window.filterBanPokemon(this.value)"
      >
      <div class="ban-pokemon-grid" id="banPokemonGrid"></div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Popular grid com todos os pokémon
  renderBanPokemonGrid();
}

// ========================================
// RENDERIZAR GRID DE POKÉMON NO MODAL
// ========================================
function renderBanPokemonGrid(filter = '') {
  const grid = document.getElementById('banPokemonGrid');
  if (!grid) return;
  
  const filteredPokemon = availablePokemon.filter(pokemon => 
    pokemon.toLowerCase().includes(filter.toLowerCase())
  );
  
  grid.innerHTML = filteredPokemon.map(pokemon => {
    const bgImage = `../estatisticas-shad/images/backgrounds/${pokemon}-left-bg.png`;
    return `
      <div class="ban-pokemon-item" onclick="window.selectBanPokemon('${pokemon}')">
        <img src="${bgImage}" alt="${pokemon}" onerror="this.style.display='none'">
        <div class="ban-pokemon-name">${capitalize(pokemon)}</div>
      </div>
    `;
  }).join('');
}

// Variáveis globais para o modal
let currentBanTeam = null;
let currentBanSlot = null;

// ========================================
// ABRIR MODAL DE SELEÇÃO DE BAN
// ========================================
function openBanModal(team, slot) {
  currentBanTeam = team;
  currentBanSlot = slot;
  
  const modal = document.getElementById('banModal');
  modal.classList.add('active');
  
  // Limpar busca
  const searchInput = modal.querySelector('.ban-search');
  if (searchInput) {
    searchInput.value = '';
    renderBanPokemonGrid();
  }
}

// Funções globais para o modal
window.closeBanModal = function() {
  const modal = document.getElementById('banModal');
  modal.classList.remove('active');
  currentBanTeam = null;
  currentBanSlot = null;
};

window.filterBanPokemon = function(filter) {
  renderBanPokemonGrid(filter);
};

window.selectBanPokemon = function(pokemon) {
  if (!currentBanTeam || !currentBanSlot) return;

   const currentTeamBans = allMatchesBans[currentMatchIndex][currentBanTeam];
  if (currentTeamBans.includes(pokemon.toLowerCase())) {
    alert('⚠️ This Pokémon is already banned by this team!');
    return;
  }
  
  const banIndex = parseInt(currentBanSlot.dataset.index);
  
  // Salvar ban
  if (!allMatchesBans[currentMatchIndex]) {
    allMatchesBans[currentMatchIndex] = { winner: [], defeated: [] };
  }
  allMatchesBans[currentMatchIndex][currentBanTeam][banIndex] = pokemon.toLowerCase();
  
  // Atualizar visual
  renderBanSlots(currentBanTeam, allMatchesBans[currentMatchIndex][currentBanTeam]);
  
  // Reconfigurar event listeners
  setupBansSelection();
  
  // Fechar modal
  window.closeBanModal();
  
  // Atualizar seletor de partidas se existir
  if (uploadedMatchesData.length > 1) {
    renderMatchSelector();
  }
};

window.removeBan = function(team, index) {
  if (!allMatchesBans[currentMatchIndex]) {
    allMatchesBans[currentMatchIndex] = { winner: [], defeated: [] };
  }
  allMatchesBans[currentMatchIndex][team][index] = null;
  
  renderBanSlots(team, allMatchesBans[currentMatchIndex][team]);
  setupBansSelection();
  
  if (uploadedMatchesData.length > 1) {
    renderMatchSelector();
  }
};

// Fechar modal ao clicar fora
document.addEventListener('click', (e) => {
  const modal = document.getElementById('banModal');
  if (modal && e.target === modal) {
    window.closeBanModal();
  }
});

// ========================================
// SETUP SAVE BUTTON
// ========================================
function setupSaveButton() {
  const btnSaveConfig = document.getElementById('btnSaveConfig');
  
  // Remover event listeners anteriores
  const newBtn = btnSaveConfig.cloneNode(true);
  btnSaveConfig.parentNode.replaceChild(newBtn, btnSaveConfig);
  
  newBtn.addEventListener('click', async () => {
    if (!confirm('💾 Save all matches data? This cannot be undone.')) {
      return;
    }
    
    await saveMatchData();
  });
}

// ========================================
// ATUALIZAR PROGRESSÃO DO KNOCKOUT
// ========================================
async function updateKnockoutProgression(knockoutMatches, currentRound, matchIndex, matchResult) {
  console.log('🎯 updateKnockoutProgression called:', {
    round: currentRound,
    matchId: matchResult.matchId,
    winner: matchResult.result.winner
  });
  
  // Se o match não está completo, não há progressão
  if (matchResult.result.status !== 'completed' || !matchResult.result.winner) {
    console.log('⏸️ Match not completed yet, skipping progression');
    // 🔥 VALIDAÇÃO FINAL: Verificar se a progressão realmente funcionou
    if (targetMatch[progression.position].name !== winner.name) {
      const error = `Progression validation failed: Expected ${winner.name} but found ${targetMatch[progression.position].name}`;
      console.error('❌ CRITICAL:', error);
      return {
        success: false,
        error: error,
        critical: true
      };
}

console.log(`✅ VALIDATED: ${winner.name} successfully set as ${progression.position} in ${targetMatch.matchId}`);
  }
  
  const winner = matchResult.result.winner === 'team1' ? matchResult.team1 : matchResult.team2;
  
  console.log(`🏆 Winner to advance: ${winner.name}`);
  
  try {
    // ✅ MAPA DE PROGRESSÃO COMPLETO E VALIDADO
    const progressionMap = {
      // Round of 16 → Quarterfinals
      'R16-1': { nextMatch: 0, position: 'team1', nextRound: 'quarterfinals', description: 'QF-1 Team1' },
      'R16-2': { nextMatch: 0, position: 'team2', nextRound: 'quarterfinals', description: 'QF-1 Team2' },
      'R16-3': { nextMatch: 1, position: 'team1', nextRound: 'quarterfinals', description: 'QF-2 Team1' },
      'R16-4': { nextMatch: 1, position: 'team2', nextRound: 'quarterfinals', description: 'QF-2 Team2' },
      'R16-5': { nextMatch: 2, position: 'team1', nextRound: 'quarterfinals', description: 'QF-3 Team1' },
      'R16-6': { nextMatch: 2, position: 'team2', nextRound: 'quarterfinals', description: 'QF-3 Team2' },
      'R16-7': { nextMatch: 3, position: 'team1', nextRound: 'quarterfinals', description: 'QF-4 Team1' },
      'R16-8': { nextMatch: 3, position: 'team2', nextRound: 'quarterfinals', description: 'QF-4 Team2' },
      
      // Quarterfinals → Semifinals
      'QF-1': { nextMatch: 0, position: 'team1', nextRound: 'semifinals', description: 'SF-1 Team1' },
      'QF-2': { nextMatch: 0, position: 'team2', nextRound: 'semifinals', description: 'SF-1 Team2' },
      'QF-3': { nextMatch: 1, position: 'team1', nextRound: 'semifinals', description: 'SF-2 Team1' },
      'QF-4': { nextMatch: 1, position: 'team2', nextRound: 'semifinals', description: 'SF-2 Team2' },
      
      // Semifinals → Final
      'SF-1': { nextMatch: 0, position: 'team1', nextRound: 'final', description: 'FINAL Team1' },
      'SF-2': { nextMatch: 0, position: 'team2', nextRound: 'final', description: 'FINAL Team2' }
    };
    
    const matchId = matchResult.matchId;
    const progression = progressionMap[matchId];
    
    // ✅ VALIDAÇÃO CRÍTICA 1: Verificar se existe mapeamento de progressão
    if (!progression) {
      // Se não existe progressão, pode ser a FINAL
      if (matchId === 'FINAL') {
        console.log('🏆 Final match completed - no further progression needed');
        return { 
          success: true, 
          message: 'Tournament completed',
          champion: winner.name,
          skipped: false
        };
      }
      
      console.warn(`⚠️ No progression mapping for ${matchId}`);
      return { 
        success: true, 
        message: `No progression mapping found for ${matchId}`,
        skipped: true 
      };
    }
    
    console.log(`📍 Progression target: ${progression.description}`);
    
    // ✅ VALIDAÇÃO CRÍTICA 2: Verificar se a próxima rodada existe
    if (!knockoutMatches[progression.nextRound]) {
      const error = `Knockout structure is missing the round: "${progression.nextRound}"`;
      console.error('❌ CRITICAL:', error);
      console.error('Available rounds:', Object.keys(knockoutMatches));
      
      return {
        success: false,
        error: error,
        critical: true,
        details: {
          matchId: matchId,
          expectedRound: progression.nextRound,
          availableRounds: Object.keys(knockoutMatches)
        }
      };
    }
    
    const nextRound = knockoutMatches[progression.nextRound];
    
    // ✅ VALIDAÇÃO CRÍTICA 3: Verificar se o array da próxima rodada existe
    if (!Array.isArray(nextRound)) {
      const error = `Next round "${progression.nextRound}" is not an array`;
      console.error('❌ CRITICAL:', error);
      console.error('Next round data:', nextRound);
      
      return {
        success: false,
        error: error,
        critical: true,
        details: {
          matchId: matchId,
          nextRound: progression.nextRound,
          nextRoundType: typeof nextRound
        }
      };
    }
    
    // ✅ VALIDAÇÃO CRÍTICA 4: Verificar se o match alvo existe no índice especificado
    if (!nextRound[progression.nextMatch]) {
      const error = `Target match at index ${progression.nextMatch} not found in ${progression.nextRound}`;
      console.error('❌ CRITICAL:', error);
      console.error('Next round length:', nextRound.length);
      console.error('Requested index:', progression.nextMatch);
      
      return {
        success: false,
        error: error,
        critical: true,
        details: {
          matchId: matchId,
          nextRound: progression.nextRound,
          requestedIndex: progression.nextMatch,
          availableIndices: nextRound.length
        }
      };
    }
    
    const targetMatch = nextRound[progression.nextMatch];
    
    // ✅ VALIDAÇÃO 5: Verificar estrutura do target match
    if (!targetMatch[progression.position]) {
      const error = `Target position "${progression.position}" not found in match ${targetMatch.matchId}`;
      console.error('❌ CRITICAL:', error);
      console.error('Target match structure:', Object.keys(targetMatch));
      
      return {
        success: false,
        error: error,
        critical: true,
        details: {
          matchId: matchId,
          targetMatchId: targetMatch.matchId,
          requestedPosition: progression.position,
          availablePositions: Object.keys(targetMatch)
        }
      };
    }
    
    const targetSlot = targetMatch[progression.position];
    
    // ✅ VALIDAÇÃO 6: Avisar sobre sobrescrita
    if (targetSlot && targetSlot.name !== 'TBD' && targetSlot.name !== winner.name) {
      console.warn(`⚠️ OVERWRITE WARNING:`);
      console.warn(`  Match: ${targetMatch.matchId} (${progression.position})`);
      console.warn(`  Replacing: "${targetSlot.name}"`);
      console.warn(`  With: "${winner.name}"`);
      console.warn(`  Reason: This might indicate data corruption or re-running a completed match`);
    }
    
    // ✅ ATUALIZAR PRÓXIMO CONFRONTO COM DADOS COMPLETOS
    targetMatch[progression.position] = {
      name: winner.name,
      logo: winner.logo || null,
      players: Array.isArray(winner.players) ? winner.players : [],
      teamId: winner.teamId || null,
      country: winner.country || null,
      countryFlag: winner.countryFlag || null
    };
    
    console.log(`✅ SUCCESS: ${winner.name} advanced to ${targetMatch.matchId} as ${progression.position}`);
    
    // 🏆 MENSAGEM ESPECIAL PARA DIFERENTES ROUNDS
    if (currentRound === 'semifinals') {
      console.log(`🏅 ${winner.name} reached the FINAL!`);
    } else if (currentRound === 'quarterfinals') {
      console.log(`🥉 ${winner.name} reached the SEMIFINALS!`);
    } else if (currentRound === 'round16') {
      console.log(`🎯 ${winner.name} reached the QUARTERFINALS!`);
    }
    
    // Retornar sucesso com detalhes
    return { 
      success: true, 
      message: `${winner.name} advanced to ${targetMatch.matchId}`,
      targetMatch: targetMatch.matchId,
      targetPosition: progression.position,
      winner: winner.name,
      skipped: false
    };
    
  } catch (error) {
    console.error('❌ CRITICAL EXCEPTION in knockout progression:');
    console.error('Error message:', error.message);
    console.error('Stack trace:', error.stack);
    console.error('Match data:', {
      matchId: matchResult.matchId,
      round: currentRound,
      winner: winner.name
    });
    
    return {
      success: false,
      error: error.message,
      stack: error.stack,
      critical: true,
      exception: true
    };
  }
}

// ========================================
// VALIDAR SE TODOS OS PLAYERS ESTÃO LINKADOS
// ========================================
function validateAllPlayersLinked() {
  const unlinkedPlayers = [];
  
  uploadedMatchesData.forEach((match, gameIndex) => {
    // Verificar ambos os times
    ['winnerTeam', 'defeatedTeam'].forEach(teamKey => {
      // Pegar todos os players
      Object.keys(match[teamKey])
        .filter(k => k.startsWith('player'))
        .forEach(playerKey => {
          const player = match[teamKey][playerKey];
          
          // Se não tem userId, adicionar à lista
          if (!player.userId) {
            unlinkedPlayers.push({
              game: gameIndex + 1,
              team: teamKey === 'winnerTeam' ? 'Winner' : 'Defeated',
              name: player.playerName,
              pokemon: player.pokemon
            });
          }
        });
    });
  });
  
  return unlinkedPlayers;
}

// ========================================
// VALIDAR INTEGRIDADE DOS DADOS DO MATCH
// ========================================
function validateMatchDataIntegrity(matchResultData) {
  const errors = [];
  const warnings = [];
  
  // ✅ VALIDAÇÕES CRÍTICAS
  if (!matchResultData.matchId) {
    errors.push('Missing matchId');
  }
  
  if (!matchResultData.result?.winner) {
    errors.push('Missing winner in result');
  }
  
  if (!matchResultData.team1?.name || !matchResultData.team2?.name) {
    errors.push('Missing team names');
  }
  
  if (!matchResultData.uploadedData || matchResultData.uploadedData.length === 0) {
    errors.push('No games data uploaded');
  }
  
  // ✅ VALIDAR CADA GAME
  matchResultData.uploadedData?.forEach((game, idx) => {
    if (!game.configuredPlayers?.winner || game.configuredPlayers.winner.length === 0) {
      errors.push(`Game ${idx + 1}: missing winner team players`);
    }
    
    if (!game.configuredPlayers?.defeated || game.configuredPlayers.defeated.length === 0) {
      errors.push(`Game ${idx + 1}: missing defeated team players`);
    }
    
    // Verificar se tem pelo menos 1 player com userId
    const winnerLinked = game.configuredPlayers.winner?.some(p => p.userId);
    const defeatedLinked = game.configuredPlayers.defeated?.some(p => p.userId);
    
    if (!winnerLinked) {
      warnings.push(`Game ${idx + 1}: no players linked in winner team (stats will not be saved)`);
    }
    
    if (!defeatedLinked) {
      warnings.push(`Game ${idx + 1}: no players linked in defeated team (stats will not be saved)`);
    }
    
    // Verificar bans
    if (!game.bans?.winner && !game.bans?.defeated) {
      warnings.push(`Game ${idx + 1}: no bans configured`);
    }
  });
  
  // ✅ VALIDAR PLACAR
  const expectedWinner = matchResultData.result.winner;
  const team1Score = matchResultData.result.team1Score;
  const team2Score = matchResultData.result.team2Score;
  
  if (expectedWinner === 'team1' && team1Score <= team2Score) {
    errors.push(`Placar inconsistente: winner=team1 mas score é ${team1Score}-${team2Score}`);
  }
  
  if (expectedWinner === 'team2' && team2Score <= team1Score) {
    errors.push(`Placar inconsistente: winner=team2 mas score é ${team1Score}-${team2Score}`);
  }
  
  return {
    valid: errors.length === 0,
    errors: errors,
    warnings: warnings
  };
}
// ========================================
// SALVAR DADOS DA PARTIDA (CORRIGIDO)
// ========================================
async function saveMatchData() {
  try {
    console.log('=== 💾 INICIANDO SALVAMENTO ===');
    console.log('Tournament ID:', tournamentId);
    console.log('Match ID:', matchId);
    
    // ✅ VALIDAR SE TODOS OS PLAYERS ESTÃO LINKADOS
    const unlinkedPlayers = validateAllPlayersLinked();

    if (unlinkedPlayers.length > 0) {
      const playerList = unlinkedPlayers.map(p => 
        `  • Game ${p.game} - ${p.team} Team: ${p.name} (${p.pokemon})`
      ).join('\n');
      
      const proceed = confirm(
        `⚠️ WARNING: ${unlinkedPlayers.length} player(s) not linked to user accounts!\n\n` +
        `${playerList}\n\n` +
        `❌ Statistics will NOT be saved for these players.\n` +
        `❌ They will not appear in leaderboards or player profiles.\n\n` +
        `Do you want to continue anyway?`
      );
      
      if (!proceed) {
        console.log('❌ Save cancelled by user - players not linked');
        return;
      }
      
      console.warn('⚠️ Proceeding with unlinked players:', unlinkedPlayers);
    }

    const btnSaveConfig = document.getElementById('btnSaveConfig');
    btnSaveConfig.disabled = true;
    btnSaveConfig.textContent = '⏳ Saving...';
     
    // 1️⃣ Coletar dados de todas as partidas configuradas
    const allConfiguredMatches = uploadedMatchesData.map((match, index) => {
      const configuredData = collectConfiguredDataForMatch(match, index);
      
      // 🔥 USAR O WINNER SELECIONADO PELO USUÁRIO
      const userSelectedWinner = selectedWinners[index] || 'team1';
      
      return {
        ...match,
        configuredPlayers: configuredData.players,
        bans: configuredData.bans,
        result: {
          team1Score: userSelectedWinner === 'team1' ? 1 : 0,
          team2Score: userSelectedWinner === 'team2' ? 1 : 0,
          winner: userSelectedWinner
        }
      };
    });
    
    // 2️⃣ Determinar vencedor geral do match (MD3/MD5)
    const team1TotalWins = allConfiguredMatches.filter(m => m.result.winner === 'team1').length;
    const team2TotalWins = allConfiguredMatches.filter(m => m.result.winner === 'team2').length;
    const overallWinner = team1TotalWins > team2TotalWins ? 'team1' : 'team2';
    
    console.log(`📊 Placar final: Team1 ${team1TotalWins} x ${team2TotalWins} Team2`);
    console.log(`🏆 Vencedor: ${overallWinner}`);
    
    // 3️⃣ Preparar dados completos do match
    const matchResultData = {
      matchId: matchData.matchId,
      groupLetter: matchData.matchId.charAt(0),
      team1: {
        name: matchData.team1.name,
        logo: matchData.team1.logo,
        players: matchData.team1.players,
        teamId: matchData.team1.teamId || null
      },
      team2: {
        name: matchData.team2.name,
        logo: matchData.team2.logo,
        players: matchData.team2.players,
        teamId: matchData.team2.teamId || null
      },
      bestOf: selectedFormat,
      uploadedData: allConfiguredMatches,
      selectedWinners: selectedWinners,
      result: {
        status: 'completed',
        winner: overallWinner,
        team1Score: team1TotalWins,
        team2Score: team2TotalWins,
        uploadedAt: new Date().toISOString(),
        // ✅ ADICIONAR: Nomes dos times para facilitar queries
        winnerName: overallWinner === 'team1' ? matchData.team1.name : matchData.team2.name,
        defeatedName: overallWinner === 'team1' ? matchData.team2.name : matchData.team1.name
      },
      scheduledDate: matchData.scheduledDate || null,
      playedDate: new Date().toISOString(),
      createdAt: matchData.createdAt || new Date()
    };
    
   console.log('✅ Match result data prepared');

// ✅ VALIDAR INTEGRIDADE DOS DADOS
const validation = validateMatchDataIntegrity(matchResultData);

if (!validation.valid) {
  console.error('❌ Data validation failed:', validation.errors);
  btnSaveConfig.disabled = false;
  btnSaveConfig.textContent = '💾 Save Match Data';
  
  alert(
    '❌ Data validation failed!\n\n' +
    'Errors:\n' + validation.errors.map(e => `  • ${e}`).join('\n') +
    '\n\nPlease fix these issues before saving.'
  );
  return;
}

// ✅ MOSTRAR WARNINGS (se houver)
if (validation.warnings.length > 0) {
  console.warn('⚠️ Data validation warnings:', validation.warnings);
  
  const warningList = validation.warnings.map(w => `  • ${w}`).join('\n');
  const proceedWithWarnings = confirm(
    `⚠️ Data validation warnings:\n\n${warningList}\n\nDo you want to continue?`
  );
  
  if (!proceedWithWarnings) {
    btnSaveConfig.disabled = false;
    btnSaveConfig.textContent = '💾 Save Match Data';
    return;
  }
}

console.log('✅ Data validation passed');

// 4️⃣ Buscar o torneio no Firebase
const tournamentRef = doc(db, "tournaments", tournamentId);
    const tournamentSnap = await getDoc(tournamentRef);
    
    if (!tournamentSnap.exists()) {
      throw new Error('Tournament not found');
    }
    
    const tournament = tournamentSnap.data();
    let matchUpdated = false;
    let updateLocation = null;
    
    // 5️⃣ 🔥 ATUALIZAR NA SUBCOLEÇÃO (BUSCA OTIMIZADA)
    console.log('🔍 Updating matchDetails subcollection...');
    try {
      const matchDetailsRef = collection(db, "tournaments", tournamentId, "matchDetails");
      
      // 🔥 USAR QUERY AO INVÉS DE getDocs COMPLETO
      const matchQuery = query(matchDetailsRef, where("matchId", "==", matchId));
      const matchQuerySnap = await getDocs(matchQuery);
      
      if (!matchQuerySnap.empty) {
        // Match existe - atualizar
        const matchDocRef = matchQuerySnap.docs[0].ref;
        await updateDoc(matchDocRef, matchResultData);
        console.log('✅ Match updated in matchDetails subcollection');
        matchUpdated = true;
        updateLocation = 'matchDetails subcollection';
      } else {
        // Match não existe - criar
        await addDoc(matchDetailsRef, matchResultData);
        console.log('✅ Match created in matchDetails subcollection');
        matchUpdated = true;
        updateLocation = 'matchDetails subcollection (new)';
      }
      
    } catch (error) {
      console.error('❌ Error with matchDetails subcollection:', error);
      throw error;
    }
    
// 6️⃣ SE FOR KNOCKOUT, ATUALIZAR APENAS O KNOCKOUT
    if (tournament.knockoutStage && matchId.includes('-')) {
      console.log('🔍 Updating Knockout Stage...');
      
      const knockoutStage = tournament.knockoutStage;
      const knockoutMatches = knockoutStage.matches;
      const rounds = ['round16', 'quarterfinals', 'semifinals', 'final'];
      
      for (const round of rounds) {
        if (!knockoutMatches[round]) continue;
        
        const matchIndex = knockoutMatches[round].findIndex(m => m.matchId === matchId);
        
        if (matchIndex !== -1) {
          console.log(`✅ Match found in Knockout ${round} at index ${matchIndex}`);
          
          // Atualizar o match atual
          knockoutMatches[round][matchIndex] = matchResultData;
          updateLocation = `Knockout Stage - ${round}`;
          
          // 🔥 ATUALIZAR PRÓXIMO CONFRONTO ANTES DE SALVAR
          console.log('🎯 Updating next round progression...');
          try {
            await updateKnockoutProgression(knockoutMatches, round, matchIndex, matchResultData);
          } catch (progressionError) {
            // ✅ SE PROGRESSÃO FALHAR, NÃO SALVAR O MATCH
            console.error('❌ Cannot save match - progression failed:', progressionError);
            btnSaveConfig.disabled = false;
            btnSaveConfig.textContent = '💾 Save Match Data';
            
            alert(
              `❌ Error updating knockout bracket!\n\n` +
              `${progressionError.message}\n\n` +
              `The match result was NOT saved to prevent bracket corruption.`
            );
            return; // ✅ INTERROMPER SALVAMENTO
          }
          
          // Salvar TUDO de uma vez
          await updateDoc(tournamentRef, {
            'knockoutStage.matches': knockoutMatches,
            dataVersion: increment(1), // ✅ INCREMENTAR VERSÃO DOS DADOS
            lastModifiedAt: new Date().toISOString() // ✅ ATUALIZAR TIMESTAMP
          });
          console.log('💾 Knockout matches saved with progression');
          
          matchUpdated = true;
          break;
        }
      }
    }
    
    if (!matchUpdated) {
      throw new Error(`Match ${matchId} not found in tournament structure`);
    }
    
    // 7️⃣ 🔥 RECALCULAR STANDINGS E SALVAR NA SUBCOLEÇÃO
    console.log('📊 Recalculating standings from subcollection...');
    
    const allMatchesDetails = [];
    const matchDetailsRef = collection(db, "tournaments", tournamentId, "matchDetails");
    const allMatchesSnap = await getDocs(matchDetailsRef);
    
    allMatchesSnap.forEach(docSnap => {
      allMatchesDetails.push(docSnap.data());
    });
    
    // 🔥 CALCULAR STANDINGS
    const updatedStandings = await recalculateStandingsFromSubcollection(tournament, allMatchesDetails);
    
    // 🔥 SALVAR STANDINGS NA SUBCOLEÇÃO
    await updateStandingsSubcollection(updatedStandings);

    // ✅ INCREMENTAR VERSÃO APÓS ATUALIZAR STANDINGS
    await updateDoc(tournamentRef, {
      dataVersion: increment(1),
      lastModifiedAt: new Date().toISOString()
    });
    console.log('✅ Data version incremented after standings update');
    
    console.log('=== 💾 SALVAMENTO CONCLUÍDO ===');
    
    btnSaveConfig.textContent = '✅ Saved!';
    
    matchData = matchResultData;
    
    // 🔥 ATUALIZAR STATUS BADGE VISUALMENTE
    const statusBadge = document.getElementById('matchStatus');
    if (statusBadge) {
      statusBadge.textContent = 'Completed';
      statusBadge.classList.add('completed');
    }
    
    // 🔥 INVALIDAR CACHE
    const cacheKey = `tournament_cache_${tournamentId}`;
    sessionStorage.removeItem(cacheKey);
    sessionStorage.removeItem(`${cacheKey}_time`);
    sessionStorage.removeItem(`${cacheKey}_version`);
    
    document.getElementById('configSection').style.display = 'none';
    document.getElementById('formatSelector').style.display = 'none';
    showResultsSection();

// 7️⃣ 🔥 SALVAR ESTATÍSTICAS DOS JOGADORES NA SUBCOLEÇÃO
console.log('📊 Saving player statistics...');

// ✅ Array para rastrear sucessos/falhas
const statsResults = {
  success: [],
  failed: []
};

try {
  const playerStatsRef = collection(db, "tournaments", tournamentId, "playerStats");
  
  // Processar todos os jogadores de todas as partidas
  for (const game of allConfiguredMatches) {
    const allPlayers = [
      ...game.configuredPlayers.winner,
      ...game.configuredPlayers.defeated
    ];
    
    for (const player of allPlayers) {
      if (!player.userId) {
        console.warn(`⚠️ Skipping player ${player.playerName} - no userId linked`);
        statsResults.failed.push({
          player: player.playerName,
          reason: 'No userId linked'
        });
        continue;
      }
      
      // ✅ TRY-CATCH INDIVIDUAL para cada player
      try {
        // Buscar estatísticas existentes do jogador
        const playerStatsQuery = query(
          playerStatsRef, 
          where("userId", "==", player.userId)
        );
        const playerStatsSnap = await getDocs(playerStatsQuery);
        
        if (playerStatsSnap.empty) {
          // Criar novo registro
          await addDoc(playerStatsRef, {
            userId: player.userId,
            playerId: player.playerId,
            displayName: player.displayName,
            totalMatches: 1,
            totalKills: player.kills || 0,
            totalAssists: player.assists || 0,
            totalInterrupts: player.interrupts || 0,
            totalPoints: player.playerScore || 0,
            totalDamageDone: player.damageDone || 0,
            totalDamageTaken: player.damageTaken || 0,
            totalHealing: player.damageHealed || 0,
            pokemonUsed: [player.pokemon],
            lastUpdated: new Date().toISOString()
          });
          
          statsResults.success.push(player.displayName);
          console.log(`✅ Created stats for ${player.displayName}`);
        } else {
          // Atualizar registro existente
          const docRef = doc(db, "tournaments", tournamentId, "playerStats", playerStatsSnap.docs[0].id);
          const existingData = playerStatsSnap.docs[0].data();
          
          await updateDoc(docRef, {
            totalMatches: (existingData.totalMatches || 0) + 1,
            totalKills: (existingData.totalKills || 0) + (player.kills || 0),
            totalAssists: (existingData.totalAssists || 0) + (player.assists || 0),
            totalInterrupts: (existingData.totalInterrupts || 0) + (player.interrupts || 0),
            totalPoints: (existingData.totalPoints || 0) + (player.playerScore || 0),
            totalDamageDone: (existingData.totalDamageDone || 0) + (player.damageDone || 0),
            totalDamageTaken: (existingData.totalDamageTaken || 0) + (player.damageTaken || 0),
            totalHealing: (existingData.totalHealing || 0) + (player.damageHealed || 0),
            pokemonUsed: [...new Set([...(existingData.pokemonUsed || []), player.pokemon])],
            lastUpdated: new Date().toISOString()
          });
          
          statsResults.success.push(player.displayName);
          console.log(`✅ Updated stats for ${player.displayName}`);
        }
        
      } catch (playerError) {
        // ✅ CAPTURAR ERRO INDIVIDUAL
        console.error(`❌ Failed to save stats for ${player.displayName}:`, playerError);
        statsResults.failed.push({
          player: player.displayName || player.playerName,
          reason: playerError.message
        });
        // ✅ CONTINUAR com próximo jogador (não quebrar todo o salvamento)
      }
    }
  }
  
  // ✅ RELATÓRIO FINAL
  console.log('📊 Player Stats Save Report:');
  console.log(`  ✅ Success: ${statsResults.success.length} players`);
  console.log(`  ❌ Failed: ${statsResults.failed.length} players`);
  
  if (statsResults.failed.length > 0) {
    console.warn('⚠️ Some player stats failed to save:', statsResults.failed);
    
    // ⚠️ OPCIONAL: Mostrar alerta ao usuário
    const failedNames = statsResults.failed.map(f => f.player).join(', ');
    console.warn(`Failed to save stats for: ${failedNames}`);
  } else {
    console.log('✅ All player statistics saved successfully');
  }
  
} catch (error) {
  console.error('❌ Critical error in player stats system:', error);
  // ⚠️ NÃO bloquear o salvamento do match - stats são secundárias
  statsResults.failed.push({
    player: 'SYSTEM',
    reason: `Critical error: ${error.message}`
  });
}

    // ✅ INVALIDAR CACHE DO TORNEIO
    const tournamentCacheKey = `tournament_cache_${tournamentId}`;
    sessionStorage.removeItem(tournamentCacheKey);
    sessionStorage.removeItem(`${tournamentCacheKey}_time`);
    sessionStorage.removeItem(`${tournamentCacheKey}_version`);
    sessionStorage.removeItem(`${tournamentCacheKey}_dataVersion`);
    sessionStorage.setItem(`${tournamentCacheKey}_force_reload`, 'true'); // ✅ NOVA FLAG
    console.log('🗑 Tournament cache invalidated with force reload flag');
    
    alert(`✅ Match data saved successfully!\nWinner: ${matchData.result.winner === 'team1' ? matchData.team1.name : matchData.team2.name} (${Math.max(team1TotalWins, team2TotalWins)}-${Math.min(team1TotalWins, team2TotalWins)})`);
    
  } catch (error) {
    console.error('❌ Error saving match data:', error);
    
    const btnSaveConfig = document.getElementById('btnSaveConfig');
    btnSaveConfig.disabled = false;
    btnSaveConfig.textContent = '💾 Save Match Data';
    
    alert('❌ Error saving match data:\n\n' + error.message + '\n\nCheck console for details.');
  }
}

// 🔥 NOVA FUNÇÃO: Recalcular standings baseado na subcoleção
// 📥 FUNÇÃO CORRIGIDA: Recalcular standings baseado na subcoleção
async function recalculateStandingsFromSubcollection(tournament, allMatchesDetails) {
  console.log('📊 Recalculating standings from subcollection...');
  console.log('Total matches to process:', allMatchesDetails.length);
  
  const standings = {};
  const groupLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  
  // ✅ INICIALIZAR STANDINGS COM OS TIMES DOS GRUPOS
  if (tournament.groups) {
    groupLetters.forEach(letter => {
      const groupTeams = tournament.groups[letter];
      if (groupTeams && Array.isArray(groupTeams) && groupTeams.length > 0) {
        standings[letter] = groupTeams.map(teamData => {
          const team = typeof teamData === 'string' 
            ? { name: teamData, logo: null, players: [] }
            : {
                name: teamData.name,
                logo: teamData.logo || null,
                players: teamData.players || [],
                teamId: teamData.teamId || null,
                country: teamData.country || null,
                countryFlag: teamData.countryFlag || null
              };
          
          console.log(`Initialized Group ${letter} team: "${team.name}"`);
          
          return {
            team: team,
            wins: 0,
            losses: 0,
            points: 0,
            matchesPlayed: 0,
            position: 0
          };
        });
      }
    });
  }
  
  console.log('Standings initialized:', Object.keys(standings));
  
  // ✅ PROCESSAR MATCHES DA SUBCOLEÇÃO
  let processedMatches = 0;
  
  allMatchesDetails.forEach(match => {
    console.log(`\n--- Processing Match: ${match.matchId} ---`);
    console.log('Match status:', match.result?.status);
    console.log('Match winner:', match.result?.winner);
    
    if (match.result?.status !== 'completed' || !match.result?.winner) {
      console.log('⏭️ Skipping incomplete match');
      return;
    }
    
    // 🔥 DETERMINAR GRUPO DO MATCH
    let groupLetter = null;
    
    // Método 1: Usar groupLetter do match
    if (match.groupLetter) {
      groupLetter = match.groupLetter;
    }
    // Método 2: Extrair da primeira letra do matchId (ex: "A1" -> "A")
    else if (match.matchId && /^[A-H]/.test(match.matchId)) {
      groupLetter = match.matchId.charAt(0);
    }
    // Método 3: Buscar o time nos grupos
    else {
      const teamInfo = findTeamInGroups(match.team1.name, tournament.groups);
      if (teamInfo) {
        groupLetter = teamInfo.groupLetter;
      }
    }
    
    if (!groupLetter) {
      console.warn(`⚠️ Could not determine group for match ${match.matchId}`);
      return;
    }
    
    if (!standings[groupLetter]) {
      console.warn(`⚠️ Group ${groupLetter} not found in standings`);
      return;
    }
    
    console.log(`Group identified: ${groupLetter}`);
    
    const team1Name = match.team1.name;
    const team2Name = match.team2.name;
    
    console.log(`Team 1: "${team1Name}"`);
    console.log(`Team 2: "${team2Name}"`);
    
    // 🔥 BUSCAR TIMES NOS STANDINGS (CASE-INSENSITIVE)
    const team1Standing = standings[groupLetter].find(s => 
      normalizeTeamName(s.team.name) === normalizeTeamName(team1Name)
    );
    const team2Standing = standings[groupLetter].find(s => 
      normalizeTeamName(s.team.name) === normalizeTeamName(team2Name)
    );
    
    if (!team1Standing) {
      console.error(`❌ Team 1 "${team1Name}" not found in Group ${groupLetter}`);
      console.log('Available teams:', standings[groupLetter].map(s => s.team.name));
      return;
    }
    
    if (!team2Standing) {
      console.error(`❌ Team 2 "${team2Name}" not found in Group ${groupLetter}`);
      console.log('Available teams:', standings[groupLetter].map(s => s.team.name));
      return;
    }
    
    // ✅ ATUALIZAR ESTATÍSTICAS
    team1Standing.matchesPlayed++;
    team2Standing.matchesPlayed++;
    
    if (match.result.winner === 'team1') {
      team1Standing.wins++;
      team1Standing.points += 3;
      team2Standing.losses++;
      console.log(`✅ ${team1Name} WINS`);
    } else if (match.result.winner === 'team2') {
      team2Standing.wins++;
      team2Standing.points += 3;
      team1Standing.losses++;
      console.log(`✅ ${team2Name} WINS`);
    }
    
    processedMatches++;
  });
  
  console.log(`\n📊 Processed ${processedMatches} matches`);
  
  // ✅ ORDENAR E ATUALIZAR POSIÇÕES
  groupLetters.forEach(letter => {
    if (standings[letter]) {
      standings[letter].sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.wins !== a.wins) return b.wins - a.wins;
        return b.matchesPlayed - a.matchesPlayed; // Desempate por jogos
      });
      
      standings[letter].forEach((standing, index) => {
        standing.position = index + 1;
      });
      
      console.log(`\nGroup ${letter} Standings:`);
      standings[letter].forEach(s => {
        console.log(`  ${s.position}º ${s.team.name}: ${s.points}pts (${s.wins}W-${s.losses}L)`);
      });
    }
  });
  
  console.log('✅ Standings recalculated successfully');
  
  return standings;
}

// 🔥 FUNÇÃO CORRIGIDA: Salvar standings na subcoleção
async function updateStandingsSubcollection(standings) {
  try {
    console.log('📊 Updating standings subcollection...');
    
    const groupLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const standingsColRef = collection(db, "tournaments", tournamentId, "standings");
    
    // 🔥 BUSCAR TODOS OS DOCUMENTOS EXISTENTES
    const standingsSnap = await getDocs(standingsColRef);
    const existingDocs = new Map();
    
    standingsSnap.forEach(docSnap => {
      const data = docSnap.data();
      const key = `${data.groupLetter}_${normalizeTeamName(data.teamName)}`;
      existingDocs.set(key, {
        id: docSnap.id,
        ref: docSnap.ref
      });
    });
    
    console.log(`Found ${existingDocs.size} existing standings documents`);
    
    // ✅ USAR BATCH WRITES (ATÔMICO)
    const batch = writeBatch(db);
    let operationCount = 0;
    let updated = 0;
    let created = 0;
    
    for (const letter of groupLetters) {
      if (!standings[letter]) continue;
      
      for (const standing of standings[letter]) {
        const standingData = {
          groupLetter: letter,
          position: standing.position,
          teamName: standing.team.name,
          teamLogo: standing.team.logo || null,
          wins: standing.wins,
          losses: standing.losses,
          points: standing.points,
          matchesPlayed: standing.matchesPlayed,
          updatedAt: new Date().toISOString()
        };
        
        const key = `${letter}_${normalizeTeamName(standing.team.name)}`;
        const existingDoc = existingDocs.get(key);
        
        if (existingDoc) {
          // ATUALIZAR DOCUMENTO EXISTENTE
          batch.update(existingDoc.ref, standingData);
          updated++;
          console.log(`📝 Queued update: ${standing.team.name} (Group ${letter})`);
        } else {
          // CRIAR NOVO DOCUMENTO
          const newDocRef = doc(standingsColRef);
          batch.set(newDocRef, standingData);
          created++;
          console.log(`📝 Queued create: ${standing.team.name} (Group ${letter})`);
        }
        
        operationCount++;
        
        // ✅ FIREBASE LIMITE: 500 operações por batch
        if (operationCount >= 450) {
          console.log('⚠️ Batch limit approaching, committing current batch...');
          await batch.commit();
          console.log('✅ Batch committed');
          operationCount = 0;
        }
      }
    }
    
    // ✅ COMMIT FINAL (se houver operações pendentes)
    if (operationCount > 0) {
      await batch.commit();
      console.log('✅ Final batch committed');
    }
    
    console.log(`✅ Standings subcollection updated: ${updated} updated, ${created} created`);
    
  } catch (error) {
    console.error('⚠️ Error updating standings subcollection:', error);
    throw error;
  }
}


// ========================================
// RECALCULAR E SALVAR STANDINGS
// ========================================
async function recalculateAndSaveStandings(tournament, matches, tournamentRef) {
  console.log('📊 Recalculando standings...');
  
  const standings = tournament.standings || {};
  const groupLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  
  // Resetar todos os standings
  groupLetters.forEach(letter => {
    if (standings[letter]) {
      standings[letter].forEach(standing => {
        standing.wins = 0;
        standing.losses = 0;
        standing.points = 0;
        standing.matchesPlayed = 0;
      });
    }
  });
  
  // Recalcular baseado nos matches
  for (const groupKey in matches) {
    const groupLetter = groupKey.replace('group', '');
    const groupMatches = matches[groupKey];
    
    if (!standings[groupLetter]) {
      console.warn(`⚠️ Standings não encontrados para grupo ${groupLetter}`);
      continue;
    }
    
    groupMatches.forEach(match => {
      if (match.result.status === 'completed' && match.result.winner) {
        const team1Name = match.team1.name;
        const team2Name = match.team2.name;
        
        const team1Standing = standings[groupLetter].find(s => s.team.name === team1Name);
        const team2Standing = standings[groupLetter].find(s => s.team.name === team2Name);
        
        if (team1Standing) team1Standing.matchesPlayed++;
        if (team2Standing) team2Standing.matchesPlayed++;
        
        if (match.result.winner === 'team1') {
          if (team1Standing) {
            team1Standing.wins++;
            team1Standing.points += 3;
          }
          if (team2Standing) {
            team2Standing.losses++;
          }
        } else if (match.result.winner === 'team2') {
          if (team2Standing) {
            team2Standing.wins++;
            team2Standing.points += 3;
          }
          if (team1Standing) {
            team1Standing.losses++;
          }
        }
      }
    });
    
    // Ordenar por pontos e vitórias
    standings[groupLetter].sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return b.wins - a.wins;
    });
    
    // Atualizar posições
    standings[groupLetter].forEach((standing, index) => {
      standing.position = index + 1;
    });
  }
  
  // Salvar standings atualizados no documento principal
  await updateDoc(tournamentRef, { standings });
  
  console.log('✅ Standings salvos no documento principal');
  
  return standings;
}

// ========================================
// COLETAR DADOS CONFIGURADOS PARA UMA PARTIDA
// ========================================
function collectConfiguredDataForMatch(match, matchIndex) {
  const winnerPlayers = [];
  const defeatedPlayers = [];
  
  // ✅ VALIDAÇÃO CRÍTICA
  if (!match) {
    console.error('❌ Match is undefined at index', matchIndex);
    return {
      players: { winner: [], defeated: [] },
      bans: { winner: [], defeated: [] },
      team1Score: 0,
      team2Score: 0,
      actualWinner: 'team1'
    };
  }
  
  if (!match.winnerTeam || !match.defeatedTeam) {
    console.error('❌ Missing team data in match:', match);
    return {
      players: { winner: [], defeated: [] },
      bans: { winner: [], defeated: [] },
      team1Score: 0,
      team2Score: 0,
      actualWinner: 'team1'
    };
  }
  
  // 🔥 DETERMINAR QUAL TIME VENCEU REALMENTE
  const actualWinner = selectedWinners[matchIndex] || 'team1';

  console.log(`🏆 Game ${matchIndex + 1}: Winner = ${actualWinner}`);

  // 🔥 AJUSTAR OS DADOS BASEADO NO VENCEDOR REAL
  let realWinnerTeam, realDefeatedTeam;

  if (actualWinner === 'team1') {
    realWinnerTeam = match.winnerTeam;
    realDefeatedTeam = match.defeatedTeam;
  } else {
    realWinnerTeam = match.defeatedTeam;
    realDefeatedTeam = match.winnerTeam;
  }
  
  // Garantir que existe a estrutura de mudanças
  const savedChanges = playerRoleLaneChanges[matchIndex] || { winner: [], defeated: [] };
  
  // Processar Winner Team (REAL)
 // Processar Winner Team (REAL)
Object.keys(realWinnerTeam)
  .filter(key => key.startsWith('player'))
  .forEach((key, index) => {
    const player = realWinnerTeam[key];
    
    if (!player || !player.pokemon) {
      console.warn(`⚠️ Invalid player at ${key}:`, player);
      return;
    }
    
    const pokemonName = player.pokemon.toLowerCase();
    const changes = savedChanges.winner[index];
    
    // ✅ ROLE SEMPRE VEM DO UTIL.JS
    const finalRole = pokemonRoles[pokemonName] || 'All Rounder';
    const finalLane = changes?.lane || getLaneForPokemon(pokemonName);
    
    // 🔥 INCLUIR userId SE EXISTIR
    const playerData = {
      ...player,
      role: finalRole,
      lane: finalLane
    };
    
    if (player.userId) {
      playerData.userId = player.userId;
      playerData.displayName = player.displayName;
      playerData.playerId = player.playerId;
      console.log(`✅ Player ${player.playerName} linked to userId: ${player.userId}`);
    } else {
      console.warn(`⚠️ Player ${player.playerName} NOT linked to any user`);
    }
    
    winnerPlayers.push(playerData);
  });
  
  // Processar Defeated Team (REAL)
Object.keys(realDefeatedTeam)
  .filter(key => key.startsWith('player'))
  .forEach((key, index) => {
    const player = realDefeatedTeam[key];
    
    if (!player || !player.pokemon) {
      console.warn(`⚠️ Invalid player at ${key}:`, player);
      return;
    }
    
    const pokemonName = player.pokemon.toLowerCase();
    const changes = savedChanges.defeated[index];
    
    // ✅ ROLE SEMPRE VEM DO UTIL.JS
    const finalRole = pokemonRoles[pokemonName] || 'All Rounder';
    const finalLane = changes?.lane || getLaneForPokemon(pokemonName);
    
    // 🔥 INCLUIR userId SE EXISTIR
    const playerData = {
      ...player,
      role: finalRole,
      lane: finalLane
    };
    
    if (player.userId) {
      playerData.userId = player.userId;
      playerData.displayName = player.displayName;
      playerData.playerId = player.playerId;
      console.log(`✅ Player ${player.playerName} linked to userId: ${player.userId}`);
    } else {
      console.warn(`⚠️ Player ${player.playerName} NOT linked to any user`);
    }
    
    defeatedPlayers.push(playerData);
  });
  
  const bans = allMatchesBans[matchIndex] || { winner: [], defeated: [] };
  
  return {
    players: {
      winner: winnerPlayers,
      defeated: defeatedPlayers
    },
    bans: {
      winner: bans.winner.filter(b => b !== null && b !== undefined),
      defeated: bans.defeated.filter(b => b !== null && b !== undefined)
    },
    team1Score: realWinnerTeam?.totalScore || 0,
    team2Score: realDefeatedTeam?.totalScore || 0,
    actualWinner: actualWinner
  };
}

// ========================================
// ATUALIZAR STANDINGS (DEPRECADO - USA recalculateAndSaveStandings)
// ========================================
async function updateStandings(tournament, matches) {
  // Esta função agora chama a nova versão
  return await recalculateAndSaveStandings(tournament, matches);
}

// ========================================
// MOSTRAR SEÇÃO DE RESULTADOS
// ========================================
function showResultsSection() {
  document.getElementById('resultsSection').style.display = 'block';
  renderMatchInfo();
  renderResultsTabs();
}

// ========================================
// RENDERIZAR INFO DA PARTIDA
// ========================================
function renderMatchInfo() {
  if (matchData.uploadedData && matchData.uploadedData.length > 0) {
    const firstMatch = matchData.uploadedData[0];
    document.getElementById('matchDate').textContent = firstMatch.matchDate || '-';
    document.getElementById('matchType').textContent = firstMatch.matchType || '-';
  }
  
  const gamesCount = matchData.uploadedData ? matchData.uploadedData.length : 1;
  document.getElementById('matchFormat').textContent = 
    `MD${gamesCount} (Best of ${gamesCount})`;
}

// ========================================
// RENDERIZAR ABAS DE RESULTADOS
// ========================================
function renderResultsTabs() {
  if (!matchData.uploadedData || matchData.uploadedData.length === 0) return;
  
  const tabsContainer = document.getElementById('resultsTabs');
  const tabsContent = document.getElementById('resultsTabsContent');
  
  tabsContainer.innerHTML = '';
  tabsContent.innerHTML = '';
  
  matchData.uploadedData.forEach((game, index) => {
    // Criar botão da aba
    const tabBtn = document.createElement('button');
    tabBtn.className = `result-tab-btn ${index === 0 ? 'active' : ''}`;
    tabBtn.textContent = `Game ${index + 1}`;
    tabBtn.onclick = () => switchResultTab(index);
    tabsContainer.appendChild(tabBtn);
    
    // Criar conteúdo da aba
    const tabPane = document.createElement('div');
    tabPane.className = `result-tab-pane ${index === 0 ? 'active' : ''}`;
    tabPane.id = `resultGame${index}`;
    tabPane.innerHTML = renderGameResult(game, index);
    tabsContent.appendChild(tabPane);
  });

    // Renderizar gráficos para o primeiro game (aba ativa)
  setTimeout(() => {
    renderPerformanceCharts(0);
  }, 100);
}

// ========================================
// TROCAR ABA DE RESULTADO
// ========================================
function switchResultTab(index) {
  // Remover active de todos os botões e panes
  document.querySelectorAll('.result-tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.result-tab-pane').forEach(pane => pane.classList.remove('active'));
  
  // Adicionar active no selecionado
  document.querySelectorAll('.result-tab-btn')[index].classList.add('active');
  document.getElementById(`resultGame${index}`).classList.add('active');

    // Renderizar gráficos do game selecionado
  setTimeout(() => {
    renderPerformanceCharts(index);
  }, 100);
}

// ========================================
// RENDERIZAR RESULTADO DE UM JOGO (COM BANS E GRÁFICOS)
// ========================================
function renderGameResult(game, gameIndex) {
  const { configuredPlayers, bans } = game;
  const { winner, defeated } = configuredPlayers;
  
  // 🔥 DETERMINAR QUAL TIME É O VENCEDOR REAL
  const actualWinner = selectedWinners[gameIndex] || 'team1';
  
  let winnerTeamName, defeatedTeamName;
  
  if (actualWinner === 'team1') {
    winnerTeamName = matchData.team1.name;
    defeatedTeamName = matchData.team2.name;
  } else {
    winnerTeamName = matchData.team2.name;
    defeatedTeamName = matchData.team1.name;
  }
  
  return `
    <div class="game-result-container">
      <!-- Winner Team -->
      <div class="team-result-expanded winner-result">
        <div class="team-result-expanded-header">
          <h3>🏆 Winner Team: ${winnerTeamName}</h3>
          <span class="team-result-score">${game.winnerTeam?.totalScore || 0}</span>
        </div>
        <div class="expanded-result-table">
          ${renderExpandedTable(winner, game.winnerTeam)}
        </div>
      </div>
      
      <!-- Defeated Team -->
      <div class="team-result-expanded defeated-result">
        <div class="team-result-expanded-header">
          <h3>💀 Defeated Team: ${defeatedTeamName}</h3>
          <span class="team-result-score">${game.defeatedTeam?.totalScore || 0}</span>
        </div>
        <div class="expanded-result-table">
          ${renderExpandedTable(defeated, game.defeatedTeam)}
        </div>
      </div>
    </div>
    
    <!-- Gráficos de Performance -->
    <div class="performance-section">
      <h3 class="performance-title">📊 Performance Analysis</h3>
      
      <div class="performance-grid">
        <!-- Winner Team Performance -->
        <div class="team-performance winner-performance">
          <h4>🏆 ${winnerTeamName} Performance</h4>
          <div class="performance-charts-container">
            <canvas id="winnerPerformanceChart${gameIndex}" width="500" height="300"></canvas>
          </div>
          <div class="mvp-container" id="winnerMVP${gameIndex}">
            <!-- MVP será inserido dinamicamente -->
          </div>
        </div>
        
        <!-- Defeated Team Performance -->
        <div class="team-performance defeated-performance">
          <h4>💀 ${defeatedTeamName} Performance</h4>
          <div class="performance-charts-container">
            <canvas id="defeatedPerformanceChart${gameIndex}" width="500" height="300"></canvas>
          </div>
          <div class="mvp-container" id="defeatedMVP${gameIndex}">
            <!-- MVP será inserido dinamicamente -->
          </div>
        </div>
      </div>
    </div>
    
    <!-- Bans deste Game -->
    <div class="game-bans-container">
      <h3 class="game-bans-title">🚫 Game ${gameIndex + 1} Bans</h3>
      <div class="bans-display-grid">
        <div class="bans-display-team">
          <h4>${winnerTeamName} Bans</h4>
          <div class="bans-display-list">
            ${renderBansList(bans?.winner || [])}
          </div>
        </div>
        <div class="bans-display-team">
          <h4>${defeatedTeamName} Bans</h4>
          <div class="bans-display-list">
            ${renderBansList(bans?.defeated || [])}
          </div>
        </div>
      </div>
    </div>
  `;
}

// ========================================
// CALCULAR PERFORMANCE DOS JOGADORES
// ========================================
function calculatePlayerPerformance(player, team, teamData) {
  let performancePoints = 0;
  
  // Calcular porcentagens de TODOS os atributos
  const scorePercentage = teamData.totalScore > 0 
    ? ((player.playerScore / teamData.totalScore) * 100) 
    : 0;
  
  const totalKills = Object.values(team).reduce((sum, p) => sum + (p.kills || 0), 0);
  const killsPercentage = totalKills > 0 ? ((player.kills / totalKills) * 100) : 0;
  
  const totalAssists = Object.values(team).reduce((sum, p) => sum + (p.assists || 0), 0);
  const assistsPercentage = totalAssists > 0 ? ((player.assists / totalAssists) * 100) : 0;
  
  const totalInterrupts = Object.values(team).reduce((sum, p) => sum + (p.interrupts || 0), 0);
  const interruptsPercentage = totalInterrupts > 0 ? ((player.interrupts / totalInterrupts) * 100) : 0;
  
  const totalDmgDone = Object.values(team).reduce((sum, p) => sum + (p.damageDone || 0), 0);
  const dmgDonePercentage = totalDmgDone > 0 ? ((player.damageDone / totalDmgDone) * 100) : 0;
  
  const totalDmgTaken = Object.values(team).reduce((sum, p) => sum + (p.damageTaken || 0), 0);
  const dmgTakenPercentage = totalDmgTaken > 0 ? ((player.damageTaken / totalDmgTaken) * 100) : 0;
  
  const totalHealing = Object.values(team).reduce((sum, p) => sum + (p.damageHealed || 0), 0);
  const healingPercentage = totalHealing > 0 ? ((player.damageHealed / totalHealing) * 100) : 0;
  
  // Calcular pontos de performance (total: 120 pontos possíveis)
  if (scorePercentage >= 20) performancePoints += 20;
  if (killsPercentage >= 20) performancePoints += 15;
  if (assistsPercentage >= 20) performancePoints += 15;
  if (interruptsPercentage >= 20) performancePoints += 15;
  if (dmgDonePercentage >= 20) performancePoints += 15;
  if (dmgTakenPercentage >= 20) performancePoints += 20;
  if (healingPercentage >= 20) performancePoints += 20;
  
  return {
    performancePoints,
    scorePercentage: scorePercentage.toFixed(1),
    killsPercentage: killsPercentage.toFixed(1),
    assistsPercentage: assistsPercentage.toFixed(1),
    interruptsPercentage: interruptsPercentage.toFixed(1),
    dmgDonePercentage: dmgDonePercentage.toFixed(1),
    dmgTakenPercentage: dmgTakenPercentage.toFixed(1),
    healingPercentage: healingPercentage.toFixed(1)
  };
}

// ========================================
// RENDERIZAR GRÁFICOS DE PERFORMANCE
// ========================================
function renderPerformanceCharts(gameIndex) {
  const game = matchData.uploadedData[gameIndex];
  if (!game) return;
  
  // Processar Winner Team
  const winnerPlayers = game.configuredPlayers.winner;
  const winnerPerformances = winnerPlayers.map(player => {
    const perf = calculatePlayerPerformance(player, winnerPlayers, game.winnerTeam);
    return {
      player,
      ...perf
    };
  });
  
  // Encontrar MVP do Winner Team
  const winnerMVP = winnerPerformances.reduce((max, current) => 
    current.performancePoints > max.performancePoints ? current : max
  , winnerPerformances[0]);
  
  // Processar Defeated Team
  const defeatedPlayers = game.configuredPlayers.defeated;
  const defeatedPerformances = defeatedPlayers.map(player => {
    const perf = calculatePlayerPerformance(player, defeatedPlayers, game.defeatedTeam);
    return {
      player,
      ...perf
    };
  });
  
  // Encontrar MVP do Defeated Team
  const defeatedMVP = defeatedPerformances.reduce((max, current) => 
    current.performancePoints > max.performancePoints ? current : max
  , defeatedPerformances[0]);
  
  // Renderizar gráfico do Winner Team
  renderTeamPerformanceChart(
    `winnerPerformanceChart${gameIndex}`,
    winnerPerformances,
    '#4ade80'
  );
  
  // Renderizar MVP do Winner Team
  renderMVPInfo(`winnerMVP${gameIndex}`, winnerMVP);
  
  // Renderizar gráfico do Defeated Team
  renderTeamPerformanceChart(
    `defeatedPerformanceChart${gameIndex}`,
    defeatedPerformances,
    '#ff6b6b'
  );
  
  // Renderizar MVP do Defeated Team
  renderMVPInfo(`defeatedMVP${gameIndex}`, defeatedMVP);
}

// ========================================
// RENDERIZAR GRÁFICO DE PERFORMANCE DO TIME
// ========================================
function renderTeamPerformanceChart(canvasId, performances, color) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: performances.map(p => p.player.playerName),
      datasets: [{
        label: 'Performance Points',
        data: performances.map(p => p.performancePoints),
        backgroundColor: color,
        borderColor: color,
        borderWidth: 2,
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          titleColor: '#ffad00',
          bodyColor: '#fff',
          borderColor: '#ffad00',
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            label: function(context) {
              const perf = performances[context.dataIndex];
              return [
                `Performance: ${perf.performancePoints} pts`,
                `Score: ${perf.scorePercentage}%`,
                `Kills: ${perf.killsPercentage}%`,
                `Assists: ${perf.assistsPercentage}%`,
                `Interrupts: ${perf.interruptsPercentage}%`,
                `Dmg Done: ${perf.dmgDonePercentage}%`,
                `Dmg Taken: ${perf.dmgTakenPercentage}%`,
                `Healing: ${perf.healingPercentage}%`
              ];
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            color: '#aaa',
            font: {
              size: 12
            }
          },
          grid: {
            color: 'rgba(255, 173, 0, 0.1)'
          }
        },
        x: {
          ticks: {
            color: '#fff',
            font: {
              size: 11,
              weight: 'bold'
            }
          },
          grid: {
            display: false
          }
        }
      }
    }
  });
}

// ========================================
// RENDERIZAR INFORMAÇÕES DO MVP
// ========================================
function renderMVPInfo(containerId, mvpData) {
  const container = document.getElementById(containerId);
  if (!container || !mvpData) return;
  
  container.innerHTML = `
    <div class="mvp-badge">
      <img src="./images/icons/mvp.png" alt="MVP" class="mvp-icon" onerror="this.style.display='none'">
      <div class="mvp-info">
        <div class="mvp-title">MVP</div>
        <div class="mvp-player-name">${mvpData.player.playerName}</div>
        <div class="mvp-pokemon">${mvpData.player.pokemon}</div>
        <div class="mvp-performance-score">${mvpData.performancePoints} Performance Points</div>
      </div>
    </div>
    <div class="mvp-stats">
      <div class="stat-box">
        <span class="stat-label">Score</span>
        <span class="stat-value">${mvpData.scorePercentage}%</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">Kills</span>
        <span class="stat-value">${mvpData.killsPercentage}%</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">Assists</span>
        <span class="stat-value">${mvpData.assistsPercentage}%</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">Interrupts</span>
        <span class="stat-value">${mvpData.interruptsPercentage}%</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">Dmg Done</span>
        <span class="stat-value">${mvpData.dmgDonePercentage}%</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">Dmg Taken</span>
        <span class="stat-value">${mvpData.dmgTakenPercentage}%</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">Healing</span>
        <span class="stat-value">${mvpData.healingPercentage}%</span>
      </div>
    </div>
  `;
}

// ========================================
// RENDERIZAR TABELA EXPANDIDA COM TODAS AS INFORMAÇÕES
// ========================================
function renderExpandedTable(players, teamData) {
  return `
    <table>
      <thead>
        <tr>
          <th>Player</th>
          <th>Pokémon</th>
          <th>Skills</th>
          <th>Role</th>
          <th>Lane</th>
          <th>K</th>
          <th>A</th>
          <th>I</th>
          <th>Score</th>
          <th>Dmg Done</th>
          <th>Dmg Taken</th>
          <th>Healing</th>
        </tr>
      </thead>
      <tbody>
        ${players.map(player => renderPlayerRow(player)).join('')}
      </tbody>
    </table>
  `;
}

// ========================================
// RENDERIZAR LINHA DE JOGADOR
// ========================================
function renderPlayerRow(player) {
  const pokemonName = player.pokemon.toLowerCase();
  const pokemonImg = `../estatisticas-shad/images/backgrounds/${pokemonName}-left-bg.png`;
  
  // Renderizar skills com normalização
  const skillsHTML = (player.abilities || []).map(skillCode => {
    // Normalizar o código da skill (ex: leafeon s111 -> s11)
    const normalizedSkill = normalizeSkillCode(pokemonName, skillCode);
    const skillImg = `../estatisticas-shad/images/skills/${pokemonName}_${normalizedSkill}.png`;
    return `<img src="${skillImg}" alt="${skillCode}" class="skill-icon" onerror="this.style.display='none'" title="${skillCode}">`;
  }).join('');
  
  return `
    <tr>
      <td style="font-weight: 700;">${player.playerName}</td>
      <td>
        <div class="pokemon-cell">
          <img src="${pokemonImg}" alt="${pokemonName}" class="pokemon-mini-img" onerror="this.style.display='none'">
          <span style="text-transform: capitalize;">${player.pokemon}</span>
        </div>
      </td>
      <td>
        <div class="skills-cell">
          ${skillsHTML || '-'}
        </div>
      </td>
      <td>${player.role || '-'}</td>
      <td>${player.lane || '-'}</td>
      <td class="stat-kills">${player.kills || 0}</td>
      <td class="stat-assists">${player.assists || 0}</td>
      <td class="stat-interrupts">${player.interrupts || 0}</td>
      <td>${player.playerScore || 0}</td>
      <td class="stat-damage-done">${(player.damageDone || 0).toLocaleString()}</td>
      <td class="stat-damage-taken">${(player.damageTaken || 0).toLocaleString()}</td>
      <td class="stat-healing">${(player.damageHealed || 0).toLocaleString()}</td>
    </tr>
  `;
}

// ========================================
// RENDERIZAR RESULTADOS DOS TIMES
// ========================================
function renderTeamResults() {
  if (!matchData.uploadedData || matchData.uploadedData.length === 0) return;
  
  // Agregar estatísticas de todas as partidas
  const aggregatedWinner = aggregatePlayerStats(
    matchData.uploadedData.map(m => m.configuredPlayers.winner)
  );
  const aggregatedDefeated = aggregatePlayerStats(
    matchData.uploadedData.map(m => m.configuredPlayers.defeated)
  );
  
  document.getElementById('winnerFinalScore').textContent = matchData.result.team1Score || 0;
  const winnerTable = document.getElementById('winnerResultsTable').querySelector('tbody');
  winnerTable.innerHTML = aggregatedWinner.map(player => `
    <tr>
      <td style="font-weight: 700;">${player.playerName}</td>
      <td style="text-transform: capitalize;">${player.pokemon}</td>
      <td>${player.role}</td>
      <td>${player.lane}</td>
      <td style="color: #4ade80; font-weight: 700;">${player.kills}</td>
      <td style="color: #ffad00; font-weight: 700;">${player.assists}</td>
      <td>${player.playerScore}</td>
      <td>${player.damageDone?.toLocaleString() || 0}</td>
    </tr>
  `).join('');
  
  document.getElementById('defeatedFinalScore').textContent = matchData.result.team2Score || 0;
  const defeatedTable = document.getElementById('defeatedResultsTable').querySelector('tbody');
  defeatedTable.innerHTML = aggregatedDefeated.map(player => `
    <tr>
      <td style="font-weight: 700;">${player.playerName}</td>
      <td style="text-transform: capitalize;">${player.pokemon}</td>
      <td>${player.role}</td>
      <td>${player.lane}</td>
      <td style="color: #4ade80; font-weight: 700;">${player.kills}</td>
      <td style="color: #ffad00; font-weight: 700;">${player.assists}</td>
      <td>${player.playerScore}</td>
      <td>${player.damageDone?.toLocaleString() || 0}</td>
    </tr>
  `).join('');
}

// ========================================
// AGREGAR ESTATÍSTICAS DOS JOGADORES
// ========================================
function aggregatePlayerStats(allMatchesPlayers) {
  const playerMap = new Map();
  
  allMatchesPlayers.forEach(matchPlayers => {
    matchPlayers.forEach(player => {
      if (!playerMap.has(player.playerName)) {
        playerMap.set(player.playerName, {
          playerName: player.playerName,
          pokemon: player.pokemon,
          role: player.role,
          lane: player.lane,
          kills: 0,
          assists: 0,
          playerScore: 0,
          damageDone: 0
        });
      }
      
      const existing = playerMap.get(player.playerName);
      existing.kills += player.kills || 0;
      existing.assists += player.assists || 0;
      existing.playerScore += player.playerScore || 0;
      existing.damageDone += player.damageDone || 0;
    });
  });
  
  return Array.from(playerMap.values());
}

// ========================================
// RENDERIZAR LISTA DE BANS
// ========================================
function renderBansList(bans) {
  if (!bans || bans.length === 0) {
    return '<div class="no-bans">No bans</div>';
  }
  
  return bans.map(ban => {
    const bgImage = `../estatisticas-shad/images/backgrounds/${ban}-left-bg.png`;
    return `
      <div class="ban-display-item">
        <img src="${bgImage}" alt="${ban}" onerror="this.style.display='none'">
      </div>
    `;
  }).join('');
}

// ========================================
// MOSTRAR SEÇÃO DE AGUARDANDO
// ========================================
function showAwaitingSection() {
  document.getElementById('awaitingSection').style.display = 'flex';
}

// ========================================
// MOSTRAR ERRO
// ========================================
function showError() {
  document.getElementById('loadingContainer').style.display = 'none';
  document.getElementById('errorContainer').style.display = 'block';
}

// ========================================
// PLAYER LINKING SYSTEM
// ========================================

let currentLinkingPlayer = null;
let currentLinkingTeam = null;
let currentLinkingIndex = null;

/**
 * Abre modal para vincular jogador ao ID real
 * 🔥 VERSÃO CORRIGIDA - Busca players diretamente da coleção teams
 */
async function openPlayerLinkModal(teamType, playerIndex, playerData) {
  currentLinkingTeam = teamType;
  currentLinkingIndex = playerIndex;
  currentLinkingPlayer = playerData;
  
// 🔥 DETERMINAR QUAL TIME BUSCAR BASEADO NO VENCEDOR SELECIONADO
const actualWinner = selectedWinners[currentMatchIndex] || 'team1';

let teamId, teamName, teamData;

// Determinar qual time buscar
if (teamType === 'winner') {
  if (actualWinner === 'team1') {
    teamData = matchData.team1;
    teamName = matchData.team1.name;
  } else {
    teamData = matchData.team2;
    teamName = matchData.team2.name;
  }
} else {
  // defeated
  if (actualWinner === 'team1') {
    teamData = matchData.team2;
    teamName = matchData.team2.name;
  } else {
    teamData = matchData.team1;
    teamName = matchData.team1.name;
  }
}

// 🔥 TENTAR OBTER teamId (pode vir do matchData ou precisar buscar)
teamId = teamData.teamId;

// 🔥 SE NÃO TEM teamId, BUSCAR NA COLEÇÃO teams PELO NOME
if (!teamId) {
  console.warn(`⚠️ Team "${teamName}" has no teamId, searching in teams collection...`);
  
  try {
    const teamsRef = collection(db, "teams");
    const querySnapshot = await getDocs(teamsRef);
    
    const normalizedSearchName = normalizeTeamName(teamName); // ✅ USAR NORMALIZAÇÃO
    
    querySnapshot.forEach(docSnap => {
      const data = docSnap.data();
      if (normalizeTeamName(data.teamName) === normalizedSearchName) {
        teamId = docSnap.id;
        console.log(`✅ Found teamId: ${teamId} for team "${teamName}"`);
      }
    });
    
    if (!teamId) {
      console.error(`❌ Team "${teamName}" not found in teams collection`);
      alert(`⚠️ Could not find team "${teamName}" in database.\n\nPlease ensure the team exists.`);
      return;
    }
  } catch (error) {
    console.error('❌ Error searching for team:', error);
    alert(`⚠️ Error searching for team: ${error.message}`);
    return;
  }
}
  
  console.log('🔗 Opening link modal for:', {
    teamType: teamType,
    actualWinner: actualWinner,
    teamId: teamId,
    teamName: teamName,
    playerData: playerData
  });
  
  // 🔥 BUSCAR PLAYERS DIRETAMENTE DA COLEÇÃO TEAMS NO FIREBASE
  let teamPlayers = [];
  
  if (!teamId) {
    console.warn('⚠️ Team has no teamId, trying to use players from matchData...');
    teamPlayers = teamType === 'winner' 
      ? (actualWinner === 'team1' ? matchData.team1.players : matchData.team2.players)
      : (actualWinner === 'team1' ? matchData.team2.players : matchData.team1.players);
  } else {
    try {
      console.log(`📡 Fetching players from teams/${teamId}...`);
      
      const teamDocRef = doc(db, "teams", teamId);
      const teamDocSnap = await getDoc(teamDocRef);
      
      if (teamDocSnap.exists()) {
        const teamData = teamDocSnap.data();
        teamPlayers = teamData.members || [];
        
        console.log(`✅ Found ${teamPlayers.length} players in team ${teamName}`);
        console.log('Players:', teamPlayers);
      } else {
        console.error(`❌ Team document not found: teams/${teamId}`);
        alert(`⚠️ Team document not found in Firebase.\nTeam ID: ${teamId}`);
        return;
      }
    } catch (error) {
      console.error('❌ Error fetching team data:', error);
      alert(`⚠️ Error loading team data: ${error.message}`);
      return;
    }
  }
  
  if (!teamPlayers || teamPlayers.length === 0) {
    alert(`⚠️ No players found for team "${teamName}".\n\nTeam ID: ${teamId || 'N/A'}\n\nPlease check if the team has members in Firebase.`);
    return;
  }
  
  // Criar ou buscar modal
  let modal = document.getElementById('playerLinkModal');
  
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'playerLinkModal';
    modal.className = 'ban-modal';
    document.body.appendChild(modal);
  }
  
  modal.innerHTML = `
    <div class="ban-modal-content">
      <div class="ban-modal-header">
        <h3>🔗 Link Player: ${playerData.playerName}</h3>
        <button class="ban-modal-close" onclick="closePlayerLinkModal()">✕</button>
      </div>
      <p style="color: #aaa; margin-bottom: 20px; text-align: center;">
        Select the player from <strong style="color: #ffad00;">${teamName}</strong> roster:
        <br>
        <small style="color: #888; font-size: 0.85rem;">Team ID: ${teamId || 'N/A'}</small>
      </p>
      <div class="player-link-list" style="display: flex; flex-direction: column; gap: 10px; max-height: 400px; overflow-y: auto;">
        ${teamPlayers.map(tp => {
          // 🔥 SUPORTE PARA DIFERENTES ESTRUTURAS DE DADOS
          const userId = tp.userId || tp.uid || '';
          const displayName = tp.displayName || tp.username || 'Unknown Player';
          const playerId = tp.playerId || 'N/A';
          
          return `
            <button class="player-link-option" 
                    data-user-id="${userId}"
                    data-display-name="${displayName}"
                    data-player-id="${playerId}"
                    style="background: rgba(0, 0, 0, 0.5); border: 2px solid rgba(255, 173, 0, 0.3); padding: 15px; border-radius: 8px; color: #fff; cursor: pointer; transition: all 0.3s ease; text-align: left; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-weight: 700; font-size: 1.1rem;">${displayName}</div>
                <div style="color: #aaa; font-size: 0.85rem; margin-top: 3px;">
                  Player ID: ${playerId}
                  ${userId ? `<br>User ID: ${userId.substring(0, 8)}...` : ''}
                </div>
              </div>
              <div style="color: #4ade80; font-size: 1.5rem; opacity: 0; transition: opacity 0.3s;">✓</div>
            </button>
          `;
        }).join('')}
      </div>
    </div>
  `;
  
  modal.classList.add('active');
  
  // Event listeners
  modal.querySelectorAll('.player-link-option').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.borderColor = '#ffad00';
      this.style.background = 'rgba(255, 173, 0, 0.1)';
      this.querySelector('div:last-child').style.opacity = '1';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.borderColor = 'rgba(255, 173, 0, 0.3)';
      this.style.background = 'rgba(0, 0, 0, 0.5)';
      this.querySelector('div:last-child').style.opacity = '0';
    });
    
    btn.addEventListener('click', function() {
      const userId = this.dataset.userId;
      const displayName = this.dataset.displayName;
      const playerId = this.dataset.playerId;
      
      if (!userId) {
        alert('⚠️ This player has no userId in the system.');
        return;
      }
      
      linkPlayerToUser(userId, displayName, playerId);
    });
  });
}

/**
 * Fecha modal de link
 */
window.closePlayerLinkModal = function() {
  const modal = document.getElementById('playerLinkModal');
  if (modal) {
    modal.classList.remove('active');
  }
  currentLinkingPlayer = null;
  currentLinkingTeam = null;
  currentLinkingIndex = null;
};

/**
 * Vincula jogador ao ID real do usuário
 */
function linkPlayerToUser(userId, displayName, playerId) {
  if (!currentLinkingPlayer || !currentLinkingTeam || currentLinkingIndex === null) {
    console.error('❌ Invalid linking state');
    return;
  }
  
  console.log(`🔗 Linking player:`, {
    playerName: currentLinkingPlayer.playerName,
    userId: userId,
    displayName: displayName,
    playerId: playerId,
    team: currentLinkingTeam,
    index: currentLinkingIndex
  });
  
  // 🔥 DETERMINAR QUAL TIME E PLAYER ATUALIZAR
  const currentMatch = uploadedMatchesData[currentMatchIndex];
  const actualWinner = selectedWinners[currentMatchIndex] || 'team1';
  
  // 🔥 LÓGICA CORRIGIDA:
  // Se estamos linkando um player do "winner" E o actualWinner é "team1" → usar winnerTeam
  // Se estamos linkando um player do "winner" E o actualWinner é "team2" → usar defeatedTeam (porque no JSON ainda está invertido)
  
  let teamKey;
  
  if (currentLinkingTeam === 'winner') {
    // Linkando player do time vencedor
    teamKey = 'winnerTeam'; // Sempre salvar em winnerTeam
  } else {
    // Linkando player do time derrotado
    teamKey = 'defeatedTeam'; // Sempre salvar em defeatedTeam
  }
  
  const playerKey = `player${currentLinkingIndex + 1}`;
  
  console.log(`📍 Saving to: ${teamKey}.${playerKey}`);
  
  // Verificar se o player existe
  if (!currentMatch[teamKey][playerKey]) {
    console.error(`❌ Player not found at ${teamKey}.${playerKey}`);
    alert(`⚠️ Error: Player slot not found.\n\nDebug info:\nTeam: ${teamKey}\nPlayer: ${playerKey}`);
    return;
  }
  
  // Adicionar informações do usuário
  currentMatch[teamKey][playerKey].userId = userId;
  currentMatch[teamKey][playerKey].displayName = displayName;
  currentMatch[teamKey][playerKey].playerId = playerId;
  
  console.log('✅ Player linked successfully');
  console.log(`Updated player:`, currentMatch[teamKey][playerKey]);
  
  // 🔥 IMPORTANTE: Limpar variáveis ANTES de fechar modal
  const linkedPlayerName = currentLinkingPlayer.playerName;
  
  currentLinkingPlayer = null;
  currentLinkingTeam = null;
  currentLinkingIndex = null;
  
  // Fechar modal
  const modal = document.getElementById('playerLinkModal');
  if (modal) {
    modal.classList.remove('active');
  }
  
  // Re-renderizar para mostrar o badge "Linked"
  renderConfigSection();
  
  // Mostrar mensagem de sucesso
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(45deg, #4ade80, #22c55e);
    color: #000;
    padding: 15px 25px;
    border-radius: 8px;
    font-weight: 700;
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  toast.textContent = `✅ ${linkedPlayerName} linked to ${displayName}`;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/**
 * Fecha modal de link
 */
window.closePlayerLinkModal = function() {
  const modal = document.getElementById('playerLinkModal');
  if (modal) {
    modal.classList.remove('active');
  }
  currentLinkingPlayer = null;
  currentLinkingTeam = null;
  currentLinkingIndex = null;
};

// CSS para animações do toast
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
