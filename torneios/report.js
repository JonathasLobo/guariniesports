import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore, doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC9LLCXrQTHBagQxaChBazSfS5E4gUPIoI",
  authDomain: "site-grn.firebaseapp.com",
  projectId: "site-grn",
  storageBucket: "site-grn.firebasestorage.app",
  messagingSenderId: "27613322806",
  appId: "1:27613322806:web:ad4dc08ce043f19d530297"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ========================================
// VARIÁVEIS GLOBAIS
// ========================================
let tournamentId = null;
let tournamentData = null;
let allPlayerStats = [];
let allPokemonStats = {};
let allTeamStats = [];

// ========================================
// OBTER ID DO TORNEIO DA URL
// ========================================
const urlParams = new URLSearchParams(window.location.search);
tournamentId = urlParams.get('tournamentId');

if (!tournamentId) {
  showError();
} else {
  loadTournamentReport();
}

// ========================================
// CARREGAR RELATÓRIO DO TORNEIO
// ========================================
async function loadTournamentReport() {
  try {
    console.log('📊 Loading tournament report for:', tournamentId);
    
    // Carregar dados do torneio
    const tournamentRef = doc(db, "tournaments", tournamentId);
    const tournamentSnap = await getDoc(tournamentRef);
    
    if (!tournamentSnap.exists()) {
      showError();
      return;
    }
    
    tournamentData = tournamentSnap.data();
    console.log('✅ Tournament data loaded');
    
    // Verificar se knockout está completo
    if (!tournamentData.knockoutStage || 
        !tournamentData.knockoutStage.matches || 
        !tournamentData.knockoutStage.matches.final ||
        tournamentData.knockoutStage.matches.final[0].result.status !== 'completed') {
      alert('⚠️ Tournament is not completed yet. The final match must be finished to generate the report.');
      window.history.back();
      return;
    }
    
    // Coletar todas as estatísticas
    await collectAllStatistics();
    
    // Renderizar relatório
    renderReport();
    
    document.getElementById('loadingContainer').style.display = 'none';
    document.getElementById('reportContainer').style.display = 'block';
    
  } catch (error) {
    console.error('❌ Error loading report:', error);
    showError();
  }
}

// ========================================
// COLETAR TODAS AS ESTATÍSTICAS
// ========================================
async function collectAllStatistics() {
  console.log('📊 Collecting all statistics...');
  
  // Carregar matches da subcoleção
  const matchDetailsRef = collection(db, "tournaments", tournamentId, "matchDetails");
  const matchDetailsSnap = await getDocs(matchDetailsRef);
  
  const allMatches = [];
  matchDetailsSnap.forEach(docSnap => {
    allMatches.push(docSnap.data());
  });
  
  // Adicionar matches do knockout
  if (tournamentData.knockoutStage && tournamentData.knockoutStage.matches) {
    const knockoutMatches = tournamentData.knockoutStage.matches;
    allMatches.push(...(knockoutMatches.round16 || []));
    allMatches.push(...(knockoutMatches.quarterfinals || []));
    allMatches.push(...(knockoutMatches.semifinals || []));
    allMatches.push(...(knockoutMatches.final || []));
  }
  
  console.log(`📋 Total matches to process: ${allMatches.length}`);
  
  // Processar cada match
  allMatches.forEach(match => {
    if (match.result.status !== 'completed' || !match.uploadedData) return;
    
    match.uploadedData.forEach(game => {
      if (!game.configuredPlayers) return;
      
      // Processar jogadores de ambos os times
      [...(game.configuredPlayers.winner || []), ...(game.configuredPlayers.defeated || [])].forEach(player => {
        processPlayerForStats(player, game);
      });
      
      // Processar bans
      if (game.bans) {
        processBans(game.bans);
      }
    });
  });
  
  // Processar times
  processTeamStats();
  
  console.log('✅ Statistics collected');
  console.log(`  - Players: ${allPlayerStats.length}`);
  console.log(`  - Pokémon: ${Object.keys(allPokemonStats).length}`);
  console.log(`  - Teams: ${allTeamStats.length}`);
}

// ========================================
// PROCESSAR JOGADOR PARA ESTATÍSTICAS
// ========================================
function processPlayerForStats(player, game) {
  if (!player.userId) return; // Só processar jogadores linkados
  
  // Buscar jogador existente
  let existingPlayer = allPlayerStats.find(p => p.userId === player.userId);
  
  if (!existingPlayer) {
    existingPlayer = {
      userId: player.userId,
      displayName: player.displayName || player.playerName,
      playerId: player.playerId,
      playerName: player.playerName,
      gamesPlayed: 0,
      totalKills: 0,
      totalAssists: 0,
      totalInterrupts: 0,
      totalPoints: 0,
      totalDamageDone: 0,
      totalDamageTaken: 0,
      totalHealing: 0,
      pokemonUsed: {},
      laneStats: {
        Top: { games: 0, kills: 0, assists: 0, interrupts: 0, points: 0, damageDone: 0, damageTaken: 0, healing: 0 },
        Jungle: { games: 0, kills: 0, assists: 0, interrupts: 0, points: 0, damageDone: 0, damageTaken: 0, healing: 0 },
        Bot: { games: 0, kills: 0, assists: 0, interrupts: 0, points: 0, damageDone: 0, damageTaken: 0, healing: 0 }
      }
    };
    allPlayerStats.push(existingPlayer);
  }
  
  // Atualizar estatísticas gerais
  existingPlayer.gamesPlayed++;
  existingPlayer.totalKills += (player.kills || 0);
  existingPlayer.totalAssists += (player.assists || 0);
  existingPlayer.totalInterrupts += (player.interrupts || 0);
  existingPlayer.totalPoints += (player.playerScore || 0);
  existingPlayer.totalDamageDone += (player.damageDone || 0);
  existingPlayer.totalDamageTaken += (player.damageTaken || 0);
  existingPlayer.totalHealing += (player.damageHealed || 0);
  
  // Registrar pokémon usado
  const pokemon = player.pokemon.toLowerCase();
  existingPlayer.pokemonUsed[pokemon] = (existingPlayer.pokemonUsed[pokemon] || 0) + 1;
  
  // Atualizar estatísticas por lane
  const lane = player.lane || 'Top';
  if (existingPlayer.laneStats[lane]) {
    existingPlayer.laneStats[lane].games++;
    existingPlayer.laneStats[lane].kills += (player.kills || 0);
    existingPlayer.laneStats[lane].assists += (player.assists || 0);
    existingPlayer.laneStats[lane].interrupts += (player.interrupts || 0);
    existingPlayer.laneStats[lane].points += (player.playerScore || 0);
    existingPlayer.laneStats[lane].damageDone += (player.damageDone || 0);
    existingPlayer.laneStats[lane].damageTaken += (player.damageTaken || 0);
    existingPlayer.laneStats[lane].healing += (player.damageHealed || 0);
  }
  
  // Processar estatísticas de pokémon
  if (!allPokemonStats[pokemon]) {
    allPokemonStats[pokemon] = {
      pokemon: pokemon,
      picks: 0,
      wins: 0,
      losses: 0,
      bans: 0
    };
  }
  
  allPokemonStats[pokemon].picks++;
  
  // Determinar se foi vitória (baseado no score do time)
  const teamScore = game.winnerTeam?.totalScore || 0;
  const opponentScore = game.defeatedTeam?.totalScore || 0;
  
  if (teamScore > opponentScore) {
    allPokemonStats[pokemon].wins++;
  } else {
    allPokemonStats[pokemon].losses++;
  }
}

// ========================================
// PROCESSAR BANS
// ========================================
function processBans(bans) {
  const allBans = [...(bans.winner || []), ...(bans.defeated || [])];
  
  allBans.forEach(ban => {
    if (!ban) return;
    
    const pokemon = ban.toLowerCase();
    
    if (!allPokemonStats[pokemon]) {
      allPokemonStats[pokemon] = {
        pokemon: pokemon,
        picks: 0,
        wins: 0,
        losses: 0,
        bans: 0
      };
    }
    
    allPokemonStats[pokemon].bans++;
  });
}

// ========================================
// PROCESSAR ESTATÍSTICAS DOS TIMES
// ========================================
function processTeamStats() {
  const teamMap = {};
  
  // Inicializar times
  if (tournamentData.teams && Array.isArray(tournamentData.teams)) {
    tournamentData.teams.forEach(team => {
      teamMap[team.name] = {
        name: team.name,
        logo: team.logo,
        wins: 0,
        losses: 0,
        matchesPlayed: 0
      };
    });
  }
  
  // Processar matches do group stage
  const groupLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  
  groupLetters.forEach(letter => {
    const groupMatches = tournamentData.matches[`group${letter}`] || [];
    
    groupMatches.forEach(match => {
      if (match.result.status !== 'completed') return;
      
      const team1Name = match.team1.name;
      const team2Name = match.team2.name;
      
      if (!teamMap[team1Name]) {
        teamMap[team1Name] = { name: team1Name, logo: match.team1.logo, wins: 0, losses: 0, matchesPlayed: 0 };
      }
      if (!teamMap[team2Name]) {
        teamMap[team2Name] = { name: team2Name, logo: match.team2.logo, wins: 0, losses: 0, matchesPlayed: 0 };
      }
      
      teamMap[team1Name].matchesPlayed++;
      teamMap[team2Name].matchesPlayed++;
      
      if (match.result.winner === 'team1') {
        teamMap[team1Name].wins++;
        teamMap[team2Name].losses++;
      } else if (match.result.winner === 'team2') {
        teamMap[team2Name].wins++;
        teamMap[team1Name].losses++;
      }
    });
  });
  
  // Processar matches do knockout
  if (tournamentData.knockoutStage && tournamentData.knockoutStage.matches) {
    const knockoutMatches = tournamentData.knockoutStage.matches;
    const allKnockoutMatches = [
      ...(knockoutMatches.round16 || []),
      ...(knockoutMatches.quarterfinals || []),
      ...(knockoutMatches.semifinals || []),
      ...(knockoutMatches.final || [])
    ];
    
    allKnockoutMatches.forEach(match => {
      if (match.result.status !== 'completed') return;
      if (match.team1.name === 'TBD' || match.team2.name === 'TBD') return;
      
      const team1Name = match.team1.name;
      const team2Name = match.team2.name;
      
      if (!teamMap[team1Name]) {
        teamMap[team1Name] = { name: team1Name, logo: match.team1.logo, wins: 0, losses: 0, matchesPlayed: 0 };
      }
      if (!teamMap[team2Name]) {
        teamMap[team2Name] = { name: team2Name, logo: match.team2.logo, wins: 0, losses: 0, matchesPlayed: 0 };
      }
      
      teamMap[team1Name].matchesPlayed++;
      teamMap[team2Name].matchesPlayed++;
      
      if (match.result.winner === 'team1') {
        teamMap[team1Name].wins++;
        teamMap[team2Name].losses++;
      } else if (match.result.winner === 'team2') {
        teamMap[team2Name].wins++;
        teamMap[team1Name].losses++;
      }
    });
  }
  
  // Converter para array e calcular winrate
  allTeamStats = Object.values(teamMap).map(team => ({
    ...team,
    winrate: team.matchesPlayed > 0 ? ((team.wins / team.matchesPlayed) * 100).toFixed(1) : 0
  }));
  
  // Ordenar por winrate
  allTeamStats.sort((a, b) => {
    const winrateDiff = parseFloat(b.winrate) - parseFloat(a.winrate);
    if (winrateDiff !== 0) return winrateDiff;
    return b.matchesPlayed - a.matchesPlayed;
  });
}

// ========================================
// RENDERIZAR RELATÓRIO
// ========================================
function renderReport() {
  console.log('🎨 Rendering report...');
  
  // Cabeçalho
  document.getElementById('tournamentName').textContent = tournamentData.name;
  document.getElementById('tournamentDates').textContent = 
    `${tournamentData.startDate} - ${tournamentData.endDate}`;
  
  // Campeão
  renderChampion();
  
  // Statistical Leaders
  renderStatisticalLeaders();
  
  // Player Averages
  renderPlayerAverages();
  
  // Pokémon Stats
  renderPokemonStats();
  
  // Team Performance
  renderTeamPerformance();
  
  // All-Star Team
  renderAllStarTeam();
  
  // Setup tabs
  setupTabs();
  
  // Botão voltar
  document.getElementById('btnBack').onclick = () => {
    window.location.href = `torneio-view.html?id=${tournamentId}`;
  };
  
  console.log('✅ Report rendered successfully');
}

// ========================================
// RENDERIZAR CAMPEÃO
// ========================================
function renderChampion() {
  const finalMatch = tournamentData.knockoutStage.matches.final[0];
  const champion = finalMatch.result.winner === 'team1' ? finalMatch.team1 : finalMatch.team2;
  
  const championTeam = allTeamStats.find(t => t.name === champion.name);
  
  const championLogo = document.getElementById('championLogo');
  if (champion.logo) {
    championLogo.innerHTML = `<img src="${champion.logo}" alt="${champion.name}">`;
  } else {
    championLogo.innerHTML = '🛡️';
  }
  
  document.getElementById('championName').textContent = champion.name;
  
  if (championTeam) {
    document.getElementById('championRecord').textContent = 
      `${championTeam.wins}-${championTeam.losses} (${championTeam.winrate}% WR)`;
  }
}

// ========================================
// RENDERIZAR LÍDERES ESTATÍSTICOS
// ========================================
function renderStatisticalLeaders() {
  const categories = [
    { id: 'kills', icon: '⚔️', label: 'Kills Leader', color: '#4ade80' },
    { id: 'assists', icon: '🤝', label: 'Assists Leader', color: '#ffad00' },
    { id: 'interrupts', icon: '🛡️', label: 'Interrupts Leader', color: '#8b5cf6' },
    { id: 'points', icon: '🎯', label: 'Points Leader', color: '#60a5fa' },
    { id: 'damageDone', icon: '💥', label: 'Damage Done Leader', color: '#ef4444' },
    { id: 'damageTaken', icon: '🩹', label: 'Damage Taken Leader', color: '#f97316' },
    { id: 'healing', icon: '💚', label: 'Healing Leader', color: '#10b981' }
  ];
  
  const leadersGrid = document.getElementById('leadersGrid');
  
  leadersGrid.innerHTML = categories.map(cat => {
    const leader = getStatisticalLeader(cat.id);
    
    if (!leader) {
      return `
        <div class="leader-card">
          <div class="leader-card-header">
            <div class="leader-card-icon">${cat.icon}</div>
            <h3 class="leader-card-title">${cat.label}</h3>
          </div>
          <p style="text-align: center; color: #aaa;">No data available</p>
        </div>
      `;
    }
    
    const pokemon = Object.keys(leader.pokemonUsed).sort((a, b) => 
      leader.pokemonUsed[b] - leader.pokemonUsed[a]
    )[0];
    
    const pokemonImg = `../estatisticas-shad/images/backgrounds/${pokemon}-left-bg.png`;
    const value = leader[`total${capitalize(cat.id)}`] || leader.totalPoints;
    
    return `
      <div class="leader-card">
        <div class="leader-card-header">
          <div class="leader-card-icon">${cat.icon}</div>
          <h3 class="leader-card-title">${cat.label}</h3>
        </div>
        <div class="leader-player">
          <div class="leader-player-pokemon">
            <img src="${pokemonImg}" alt="${pokemon}" 
                 onerror="this.style.display='none'; this.parentElement.innerHTML='🎮'">
          </div>
          <div class="leader-player-info">
            <div class="leader-player-name">${leader.displayName}</div>
            <div class="leader-player-pokemon-name">${capitalize(pokemon)}</div>
          </div>
          <div class="leader-player-value">${value.toLocaleString()}</div>
        </div>
      </div>
    `;
  }).join('');
}

function getStatisticalLeader(stat) {
  if (allPlayerStats.length === 0) return null;
  
  const statMap = {
    'kills': 'totalKills',
    'assists': 'totalAssists',
    'interrupts': 'totalInterrupts',
    'points': 'totalPoints',
    'damageDone': 'totalDamageDone',
    'damageTaken': 'totalDamageTaken',
    'healing': 'totalHealing'
  };
  
  const key = statMap[stat];
  
  return [...allPlayerStats].sort((a, b) => b[key] - a[key])[0];
}

// ========================================
// RENDERIZAR MÉDIAS DOS JOGADORES
// ========================================
function renderPlayerAverages() {
  // Filtrar jogadores com mínimo 3 jogos
  const qualifiedPlayers = allPlayerStats.filter(p => p.gamesPlayed >= 3);
  
  if (qualifiedPlayers.length === 0) {
    document.getElementById('averagesContainer').innerHTML = `
      <p style="text-align: center; color: #aaa; padding: 40px;">
        No players with minimum 3 games played
      </p>
    `;
    return;
  }
  
  // Calcular médias
  const playersWithAverages = qualifiedPlayers.map(p => ({
    ...p,
    avgKills: (p.totalKills / p.gamesPlayed).toFixed(1),
    avgAssists: (p.totalAssists / p.gamesPlayed).toFixed(1),
    avgInterrupts: (p.totalInterrupts / p.gamesPlayed).toFixed(1),
    avgPoints: (p.totalPoints / p.gamesPlayed).toFixed(1),
    avgDamageDone: (p.totalDamageDone / p.gamesPlayed).toFixed(0),
    avgDamageTaken: (p.totalDamageTaken / p.gamesPlayed).toFixed(0),
    avgHealing: (p.totalHealing / p.gamesPlayed).toFixed(0)
  }));
  
  // Ordenar por média de kills
  playersWithAverages.sort((a, b) => parseFloat(b.avgKills) - parseFloat(a.avgKills));
  
  const averagesContainer = document.getElementById('averagesContainer');
  
  averagesContainer.innerHTML = playersWithAverages.slice(0, 20).map((player, index) => `
    <div class="average-player-card">
      <div class="average-player-rank">#${index + 1}</div>
      <div class="average-player-info">
        <div class="average-player-name">${player.displayName}</div>
        <div class="average-player-games">${player.gamesPlayed} games played</div>
      </div>
      <div class="average-stats-grid">
        <div class="average-stat-box">
          <span class="average-stat-label">K/G</span>
          <span class="average-stat-value">${player.avgKills}</span>
        </div>
        <div class="average-stat-box">
          <span class="average-stat-label">A/G</span>
          <span class="average-stat-value">${player.avgAssists}</span>
        </div>
        <div class="average-stat-box">
          <span class="average-stat-label">I/G</span>
          <span class="average-stat-value">${player.avgInterrupts}</span>
        </div>
        <div class="average-stat-box">
          <span class="average-stat-label">Pts/G</span>
          <span class="average-stat-value">${player.avgPoints}</span>
        </div>
        <div class="average-stat-box">
          <span class="average-stat-label">Dmg/G</span>
          <span class="average-stat-value">${parseInt(player.avgDamageDone).toLocaleString()}</span>
        </div>
        <div class="average-stat-box">
          <span class="average-stat-label">Taken/G</span>
          <span class="average-stat-value">${parseInt(player.avgDamageTaken).toLocaleString()}</span>
        </div>
        <div class="average-stat-box">
          <span class="average-stat-label">Heal/G</span>
          <span class="average-stat-value">${parseInt(player.avgHealing).toLocaleString()}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// ========================================
// RENDERIZAR ESTATÍSTICAS DE POKÉMON
// ========================================
function renderPokemonStats() {
  const pokemonArray = Object.values(allPokemonStats);
  
  if (pokemonArray.length === 0) {
    document.getElementById('pokemonReportGrid').innerHTML = `
      <p style="text-align: center; color: #aaa; padding: 40px; grid-column: 1 / -1;">
        No Pokémon data available
      </p>
    `;
    return;
  }
  
  // Calcular pickrate e winrate
  const totalGames = pokemonArray.reduce((sum, p) => sum + p.picks, 0);
  
  pokemonArray.forEach(p => {
    p.pickrate = totalGames > 0 ? ((p.picks / totalGames) * 100).toFixed(1) : 0;
    p.winrate = p.picks > 0 ? ((p.wins / p.picks) * 100).toFixed(1) : 0;
  });
  
  // Top 10 por pickrate
  const topPickrate = [...pokemonArray].sort((a, b) => parseFloat(b.pickrate) - parseFloat(a.pickrate)).slice(0, 10);
  
  // Top 10 por winrate (mínimo 3 picks)
  const topWinrate = [...pokemonArray]
    .filter(p => p.picks >= 3)
    .sort((a, b) => parseFloat(b.winrate) - parseFloat(a.winrate))
    .slice(0, 10);
  
  // Top 10 por bans
  const topBans = [...pokemonArray].sort((a, b) => b.bans - a.bans).slice(0, 10);
  
  const pokemonReportGrid = document.getElementById('pokemonReportGrid');
  
  pokemonReportGrid.innerHTML = `
    <div style="grid-column: 1 / -1; margin-bottom: 30px;">
      <h3 style="color: #60a5fa; font-size: 1.8rem; text-align: center; margin-bottom: 30px;">
        📊 Top 10 Pick Rate
      </h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">
        ${topPickrate.map(p => renderPokemonCard(p, 'pickrate')).join('')}
      </div>
    </div>
    
    <div style="grid-column: 1 / -1; margin-bottom: 30px;">
      <h3 style="color: #4ade80; font-size: 1.8rem; text-align: center; margin-bottom: 30px;">
        🏆 Top 10 Win Rate (Min. 3 picks)
      </h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">
        ${topWinrate.map(p => renderPokemonCard(p, 'winrate')).join('')}
      </div>
    </div>
    
    <div style="grid-column: 1 / -1;">
      <h3 style="color: #ff6b6b; font-size: 1.8rem; text-align: center; margin-bottom: 30px;">
        🚫 Top 10 Ban Rate
      </h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">
        ${topBans.map(p => renderPokemonCard(p, 'bans')).join('')}
      </div>
    </div>
  `;
}

function renderPokemonCard(pokemon, highlightStat) {
  const pokemonImg = `../estatisticas-shad/images/backgrounds/${pokemon.pokemon}-left-bg.png`;
  
  return `
    <div class="pokemon-report-card">
      <div class="pokemon-report-image">
        <img src="${pokemonImg}" alt="${pokemon.pokemon}" 
             onerror="this.style.display='none'; this.parentElement.innerHTML='🎮'">
      </div>
      <div class="pokemon-report-name">${capitalize(pokemon.pokemon)}</div>
      <div class="pokemon-report-stats">
        <div class="pokemon-report-stat" style="${highlightStat === 'pickrate' ? 'border-color: #60a5fa;' : ''}">
          <div class="pokemon-report-stat-label">Pick Rate</div>
          <div class="pokemon-report-stat-value" style="${highlightStat === 'pickrate' ? 'color: #60a5fa;' : ''}">${pokemon.pickrate}%</div>
        </div>
        <div class="pokemon-report-stat" style="${highlightStat === 'winrate' ? 'border-color: #4ade80;' : ''}">
          <div class="pokemon-report-stat-label">Win Rate</div>
          <div class="pokemon-report-stat-value" style="${highlightStat === 'winrate' ? 'color: #4ade80;' : ''}">${pokemon.winrate}%</div>
        </div>
        <div class="pokemon-report-stat">
          <div class="pokemon-report-stat-label">Picks</div>
          <div class="pokemon-report-stat-value">${pokemon.picks}</div>
        </div>
        <div class="pokemon-report-stat">
          <div class="pokemon-report-stat-label">Wins</div>
          <div class="pokemon-report-stat-value">${pokemon.wins}</div>
        </div>
        <div class="pokemon-report-stat" style="${highlightStat === 'bans' ? 'border-color: #ff6b6b;' : ''}">
          <div class="pokemon-report-stat-label">Bans</div>
          <div class="pokemon-report-stat-value" style="${highlightStat === 'bans' ? 'color: #ff6b6b;' : ''}">${pokemon.bans}</div>
        </div>
        <div class="pokemon-report-stat">
          <div class="pokemon-report-stat-label">Losses</div>
          <div class="pokemon-report-stat-value">${pokemon.losses}</div>
        </div>
      </div>
    </div>
  `;
}

// ========================================
// RENDERIZAR PERFORMANCE DOS TIMES
// ========================================
function renderTeamPerformance() {
  if (allTeamStats.length === 0) {
    document.getElementById('teamsReportGrid').innerHTML = `
      <p style="text-align: center; color: #aaa; padding: 40px;">
        No team data available
      </p>
    `;
    return;
  }
  
  const teamsReportGrid = document.getElementById('teamsReportGrid');
  
  teamsReportGrid.innerHTML = allTeamStats.map((team, index) => `
    <div class="team-report-card">
      <div class="team-report-rank">#${index + 1}</div>
      <div class="team-report-logo">
        ${team.logo 
          ? `<img src="${team.logo}" alt="${team.name}">` 
          : '🛡️'
        }
      </div>
      <div class="team-report-info">
        <div class="team-report-name">${team.name}</div>
        <div class="team-report-record">${team.wins}W - ${team.losses}L (${team.matchesPlayed} matches)</div>
      </div>
      <div class="team-report-winrate">${team.winrate}%</div>
    </div>
  `).join('');
}

// ========================================
// RENDERIZAR ALL-STAR TEAM
// ========================================
function renderAllStarTeam() {
  const lanes = ['Top', 'Jungle', 'Bot'];
  const allstarFormation = document.getElementById('allstarFormation');
  
  const allstarHTML = lanes.map(lane => {
    const bestPlayers = getBestPlayersByLane(lane);
    const count = lane === 'Jungle' ? 1 : 2;
    const topPlayers = bestPlayers.slice(0, count);
    
    if (topPlayers.length === 0) {
      return `
        <div class="allstar-lane-group">
          <h3 class="allstar-lane-title">${lane}</h3>
          <p style="text-align: center; color: #aaa;">No data available</p>
        </div>
      `;
    }
    
    return `
      <div class="allstar-lane-group">
        <h3 class="allstar-lane-title">${lane}</h3>
        <div class="allstar-players-grid">
          ${topPlayers.map(player => renderAllStarPlayerCard(player, lane)).join('')}
        </div>
      </div>
    `;
  }).join('');
  
  allstarFormation.innerHTML = allstarHTML;
}

function getBestPlayersByLane(lane) {
  // Filtrar jogadores que jogaram nessa lane (mínimo 3 jogos)
  const lanePlayers = allPlayerStats
    .filter(p => p.laneStats[lane].games >= 3)
    .map(p => {
      const laneData = p.laneStats[lane];
      return {
        ...p,
        laneGames: laneData.games,
        laneAvgKills: (laneData.kills / laneData.games).toFixed(1),
        laneAvgAssists: (laneData.assists / laneData.games).toFixed(1),
        laneAvgInterrupts: (laneData.interrupts / laneData.games).toFixed(1),
        laneAvgPoints: (laneData.points / laneData.games).toFixed(1),
        laneAvgDamageDone: (laneData.damageDone / laneData.games).toFixed(0),
        laneAvgDamageTaken: (laneData.damageTaken / laneData.games).toFixed(0),
        laneAvgHealing: (laneData.healing / laneData.games).toFixed(0),
        // Score composto (média ponderada)
        compositeScore: (
          (laneData.kills / laneData.games) * 3 +
          (laneData.assists / laneData.games) * 2 +
          (laneData.interrupts / laneData.games) * 2 +
          (laneData.points / laneData.games) * 0.1
        )
      };
    });
  
  // Ordenar por composite score
  return lanePlayers.sort((a, b) => b.compositeScore - a.compositeScore);
}

function renderAllStarPlayerCard(player, lane) {
  // Pokémon mais usado nessa lane
  const pokemonUsed = Object.keys(player.pokemonUsed).sort((a, b) => 
    player.pokemonUsed[b] - player.pokemonUsed[a]
  )[0];
  
  const pokemonImg = `../estatisticas-shad/images/backgrounds/${pokemonUsed}-left-bg.png`;
  
  return `
    <div class="allstar-player-card">
      <div class="allstar-player-star">⭐</div>
      <div class="allstar-player-pokemon">
        <img src="${pokemonImg}" alt="${pokemonUsed}" 
             onerror="this.style.display='none'; this.parentElement.innerHTML='🎮'">
      </div>
      <div class="allstar-player-details">
        <div class="allstar-player-name">${player.displayName}</div>
        <div class="allstar-player-pokemon-name">${capitalize(pokemonUsed)}</div>
        <div class="allstar-player-stats">
          <div class="allstar-stat">
            <div class="allstar-stat-label">K/G</div>
            <div class="allstar-stat-value">${player.laneAvgKills}</div>
          </div>
          <div class="allstar-stat">
            <div class="allstar-stat-label">A/G</div>
            <div class="allstar-stat-value">${player.laneAvgAssists}</div>
          </div>
          <div class="allstar-stat">
            <div class="allstar-stat-label">I/G</div>
            <div class="allstar-stat-value">${player.laneAvgInterrupts}</div>
          </div>
        </div>
        <div class="allstar-player-games">${player.laneGames} games as ${lane}</div>
      </div>
    </div>
  `;
}

// ========================================
// SETUP TABS
// ========================================
function setupTabs() {
  document.querySelectorAll('.report-tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const targetTab = this.dataset.tab;
      
      document.querySelectorAll('.report-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.report-tab-pane').forEach(p => p.classList.remove('active'));
      
      this.classList.add('active');
      document.getElementById(`tab${capitalize(targetTab)}`).classList.add('active');
    });
  });
}

// ========================================
// HELPER FUNCTIONS
// ========================================
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function showError() {
  document.getElementById('loadingContainer').style.display = 'none';
  document.getElementById('errorContainer').style.display = 'block';
}