import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  updateDoc, 
  increment,
  collection,  
  getDocs,
  setDoc      
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { pokemonRoles } from '../util.js';

import { normalizeTeamName, capitalize } from './tournament-utils.js';

const firebaseConfig = {
  apiKey: "AIzaSyC9LLCXrQTHBagQxaChBazSfS5E4gUPIoI",
  authDomain: "site-grn.firebaseapp.com",
  projectId: "site-grn",
  storageBucket: "site-grn.firebasestorage.app",
  messagingSenderId: "27613322806",
  appId: "1:27613322806:web:ad4dc08ce043f19d530297"
};

// ✅ ADICIONAR EXPORT AQUI
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ========================================
// FUNÇÃO AUXILIAR: Retry Logic
// ========================================
async function retryAsync(fn, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      console.warn(`⚠️ Attempt ${i + 1} failed:`, error.message);
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Tornar pokemonRoles global para uso em outras funções
window.pokemonRoles = pokemonRoles;

// ========================================
// VARIÁVEIS GLOBAIS
// ========================================
let currentTournament = null;
let currentMatchesFilter = 'all';
let tournamentMatches = null;
let tournamentId = null;
let currentRankingData = {};
let currentRankingCategory = 'kills';
let displayedItems = 50;
let searchQuery = '';
let selectedPokemonRoles = ['All']; // Filtro de roles para Pokémon
let pokemonSortBy = 'picks';
let knockoutGenerated = false;
let knockoutMatches = [];

// ========================================
// OBTER ID DO TORNEIO DA URL
// ========================================
const urlParams = new URLSearchParams(window.location.search);
tournamentId = urlParams.get('id');

if (!tournamentId) {
  showError();
} else {
  loadTournament(tournamentId);
}

async function loadTournament(id) {
  try {
    // ✅ CACHE COM VALIDAÇÃO RIGOROSA
    const cacheKey = `tournament_cache_${id}`;
    const cacheExpiry = 5 * 60 * 1000; // 5 minutos
    const CACHE_VERSION = 7; // 🔥 ATUALIZADO PARA v7

    // ✅ VERIFICAR SE HÁ INVALIDAÇÃO FORÇADA
    const forceReload = sessionStorage.getItem(`${cacheKey}_force_reload`);
    if (forceReload === 'true') {
      console.log('🔄 Force reload detected, clearing cache...');
      sessionStorage.removeItem(cacheKey);
      sessionStorage.removeItem(`${cacheKey}_time`);
      sessionStorage.removeItem(`${cacheKey}_version`);
      sessionStorage.removeItem(`${cacheKey}_dataVersion`);
      sessionStorage.removeItem(`${cacheKey}_force_reload`);
    }

    const cached = sessionStorage.getItem(cacheKey);
    const cacheTime = sessionStorage.getItem(`${cacheKey}_time`);
    const cacheVersion = sessionStorage.getItem(`${cacheKey}_version`);
    const cachedDataVersion = parseInt(sessionStorage.getItem(`${cacheKey}_dataVersion`) || '0');

    if (cached && cacheTime && cacheVersion) {
      const age = Date.now() - parseInt(cacheTime);
      const version = parseInt(cacheVersion);
      
      if (age < cacheExpiry && version === CACHE_VERSION) {
        console.log('📦 Found valid cache, checking server for updates...');
        
        try {
          const tournamentRef = doc(db, "tournaments", id);
          const freshSnap = await getDoc(tournamentRef);
          
          if (freshSnap.exists()) {
            const serverDataVersion = freshSnap.data().dataVersion || 1;
            
            console.log(`🔍 Cache version: ${cachedDataVersion}, Server version: ${serverDataVersion}`);
            
            if (serverDataVersion > cachedDataVersion) {
              console.log(`🔄 Server has newer data (v${serverDataVersion}), invalidating cache`);
              
              sessionStorage.removeItem(cacheKey);
              sessionStorage.removeItem(`${cacheKey}_time`);
              sessionStorage.removeItem(`${cacheKey}_version`);
              sessionStorage.removeItem(`${cacheKey}_dataVersion`);
              
              // 🔥 FORÇAR RECARGA COMPLETA - NÃO USAR CACHE
              console.log('🔄 Forcing complete reload from server...');
              // NÃO fazer return aqui - deixar continuar para carregar do servidor
            } else {
              console.log('✅ Using cached tournament data (v' + version + ')');
              currentTournament = JSON.parse(cached);
              
              // 🔥 VERIFICAR SE HÁ KNOCKOUT ATUALIZADO NO SERVIDOR
              const freshSnap = await getDoc(tournamentRef);
              if (freshSnap.exists()) {
                const serverKnockout = freshSnap.data().knockoutStage;
                
                // Se servidor tem knockout mas cache não tem, invalidar cache
                if (serverKnockout && !currentTournament.knockoutStage) {
                  console.log('🔄 Server has knockout stage, cache outdated - reloading...');
                  sessionStorage.removeItem(cacheKey);
                  sessionStorage.removeItem(`${cacheKey}_time`);
                  sessionStorage.removeItem(`${cacheKey}_version`);
                  sessionStorage.removeItem(`${cacheKey}_dataVersion`);
                  
                  // Recarregar página para forçar busca do servidor
                  window.location.reload();
                  return;
                }
              }
              
              console.log('📊 Reloading fresh standings...');
              let updatedStandings = await loadStandingsFromSubcollection(id);
              if (Object.keys(updatedStandings).length === 0) {
                updatedStandings = calculateStandingsFromMatches(
                  currentTournament.groups,
                  currentTournament.matches
                );
              }
              
              renderTournament(currentTournament, updatedStandings);
              document.getElementById('loadingContainer').style.display = 'none';
              document.getElementById('tournamentContainer').style.display = 'block';
              return;
            }
          } else {
            console.warn('⚠️ Tournament not found on server, clearing cache');
            sessionStorage.removeItem(cacheKey);
            sessionStorage.removeItem(`${cacheKey}_time`);
            sessionStorage.removeItem(`${cacheKey}_version`);
            sessionStorage.removeItem(`${cacheKey}_dataVersion`);
          }
        } catch (checkError) {
          console.error('❌ Cannot verify server version, forcing fresh load:', checkError.message);
          
          sessionStorage.removeItem(cacheKey);
          sessionStorage.removeItem(`${cacheKey}_time`);
          sessionStorage.removeItem(`${cacheKey}_version`);
          sessionStorage.removeItem(`${cacheKey}_dataVersion`);
        }
      } else {
        console.log('🗑️ Cache expired or wrong version, clearing...');
        sessionStorage.removeItem(cacheKey);
        sessionStorage.removeItem(`${cacheKey}_time`);
        sessionStorage.removeItem(`${cacheKey}_version`);
        sessionStorage.removeItem(`${cacheKey}_dataVersion`);
      }
    } else {
      console.log('📭 No cache found');
    }
    
    // 🔥 CARREGAR DO FIREBASE (quando não há cache válido)
    console.log('🔡 Loading tournament from Firebase...');
    const tournamentRef = doc(db, "tournaments", id);
    const tournamentSnap = await getDoc(tournamentRef);

    if (!tournamentSnap.exists()) {
      showError();
      return;
    }

    currentTournament = tournamentSnap.data();
    const serverDataVersion = currentTournament.dataVersion || 1;
    
    console.log(`📥 Tournament loaded from server (data version: ${serverDataVersion})`);
    
    // 🔥 SEMPRE BUSCAR DADOS COMPLETOS DAS SUBCOLEÇÕES
    console.log('📦 Loading complete data from subcollections...');
    
    try {
      // 1️⃣ CARREGAR TEAM DETAILS
      const teamDetailsRef = collection(db, "tournaments", id, "teamDetails");
      const teamDetailsSnap = await retryAsync(() => getDocs(teamDetailsRef), 3, 1000);
      
      const fullTeamDetails = new Map();
      
      if (!teamDetailsSnap.empty) {
        teamDetailsSnap.forEach(docSnap => {
          const teamData = docSnap.data();
          const normalizedName = normalizeTeamName(teamData.name);
          fullTeamDetails.set(normalizedName, {
            name: teamData.name,
            logo: teamData.logo || null,
            players: teamData.players || [],
            teamId: teamData.teamId || null,
            country: teamData.country || null,
            countryFlag: teamData.countryFlag || null
          });
        });
        console.log(`✅ Loaded ${fullTeamDetails.size} team details`);
      }
      
      // 2️⃣ RECONSTRUIR GRUPOS COM DADOS COMPLETOS
      const reconstructedGroups = {};
      const mainGroups = currentTournament.groups || {};
      
      Object.keys(mainGroups).forEach(groupLetter => {
        const groupTeamNames = mainGroups[groupLetter];
        
        if (Array.isArray(groupTeamNames)) {
          reconstructedGroups[groupLetter] = groupTeamNames.map(teamName => {
            const searchName = typeof teamName === 'object' ? teamName.name : teamName;
            const normalizedSearchName = normalizeTeamName(searchName);
            const teamDetails = fullTeamDetails.get(normalizedSearchName);
            
            if (teamDetails) {
              return teamDetails;
            } else {
              console.warn(`⚠️ Team "${searchName}" not found in teamDetails`);
              return {
                name: searchName,
                logo: null,
                players: [],
                teamId: null
              };
            }
          });
        }
      });
      
      currentTournament.groups = reconstructedGroups;
      console.log('✅ Groups reconstructed with full data');
      
    } catch (error) {
      console.error('❌ Error loading subcollections:', error);
    }
    
    // 3️⃣ CARREGAR MATCHES DA SUBCOLEÇÃO
    try {
      const matchDetailsRef = collection(db, "tournaments", id, "matchDetails");
      const matchDetailsSnap = await getDocs(matchDetailsRef);
      
      if (!matchDetailsSnap.empty) {
        const reconstructedMatches = {};
        
        matchDetailsSnap.forEach(docSnap => {
          const matchData = docSnap.data();
          
          // 🔥 DETERMINAR SE É GROUP STAGE OU KNOCKOUT
          if (matchData.matchId && matchData.matchId.includes('-')) {
            // É KNOCKOUT (R16-1, QF-1, SF-1, FINAL)
            if (!currentTournament.knockoutStage) {
              currentTournament.knockoutStage = {
                generated: true,
                matches: {
                  round16: [],
                  quarterfinals: [],
                  semifinals: [],
                  final: []
                }
              };
            }
            
            const matchId = matchData.matchId;
            if (matchId.startsWith('R16-')) {
              currentTournament.knockoutStage.matches.round16.push(matchData);
            } else if (matchId.startsWith('QF-')) {
              currentTournament.knockoutStage.matches.quarterfinals.push(matchData);
            } else if (matchId.startsWith('SF-')) {
              currentTournament.knockoutStage.matches.semifinals.push(matchData);
            } else if (matchId === 'FINAL') {
              currentTournament.knockoutStage.matches.final.push(matchData);
            }
          } else {
            // É GROUP STAGE (A1, B2, etc)
            const groupKey = `group${matchData.groupLetter || matchData.matchId.charAt(0)}`;
            
            if (!reconstructedMatches[groupKey]) {
              reconstructedMatches[groupKey] = [];
            }
            
            reconstructedMatches[groupKey].push(matchData);
          }
        });
        
        // Ordenar matches
        Object.keys(reconstructedMatches).forEach(groupKey => {
          reconstructedMatches[groupKey].sort((a, b) => a.matchNumber - b.matchNumber);
        });
        
        currentTournament.matches = reconstructedMatches;
        
        // Ordenar knockout matches
        if (currentTournament.knockoutStage) {
          const ko = currentTournament.knockoutStage.matches;
          if (ko.round16) ko.round16.sort((a, b) => a.matchId.localeCompare(b.matchId));
          if (ko.quarterfinals) ko.quarterfinals.sort((a, b) => a.matchId.localeCompare(b.matchId));
          if (ko.semifinals) ko.semifinals.sort((a, b) => a.matchId.localeCompare(b.matchId));
        }
        
        console.log(`✅ Loaded matches from subcollection`);
      }
    } catch (error) {
      console.warn('⚠️ Could not load matches:', error);
    }
    
    // 4️⃣ CARREGAR STANDINGS
    let updatedStandings = await loadStandingsFromSubcollection(id);
    
    if (Object.keys(updatedStandings).length === 0) {
      console.warn('⚠️ No standings found, calculating from matches...');
      updatedStandings = calculateStandingsFromMatches(
        currentTournament.groups,
        currentTournament.matches
      );
    }
    
    // 5️⃣ INCREMENTAR VIEWS E VERIFICAR VERSÃO DO SERVIDOR
    const sessionKey = `tournament_viewed_${id}`;
    const hasViewed = sessionStorage.getItem(sessionKey);

    if (!hasViewed) {
      try {
        await updateDoc(tournamentRef, {
          views: increment(1),
          lastViewedAt: new Date().toISOString()
        });
        sessionStorage.setItem(sessionKey, 'true');
        console.log('✅ View count incremented');
      } catch (error) {
        console.warn('⚠️ Could not increment views:', error.message);
      }
    }

    // 6️⃣ SALVAR NO CACHE COM VERSÃO DO SERVIDOR
    try {
      sessionStorage.setItem(cacheKey, JSON.stringify(currentTournament));
      sessionStorage.setItem(`${cacheKey}_time`, Date.now().toString());
      sessionStorage.setItem(`${cacheKey}_version`, CACHE_VERSION.toString());
      sessionStorage.setItem(`${cacheKey}_dataVersion`, serverDataVersion.toString());
      console.log(`✅ Tournament cached (system v${CACHE_VERSION}, data v${serverDataVersion})`);
    } catch (e) {
      console.warn('⚠️ Cache full, clearing...');
      sessionStorage.clear();
      
      // Tentar novamente após limpar
      try {
        sessionStorage.setItem(cacheKey, JSON.stringify(currentTournament));
        sessionStorage.setItem(`${cacheKey}_time`, Date.now().toString());
        sessionStorage.setItem(`${cacheKey}_version`, CACHE_VERSION.toString());
        sessionStorage.setItem(`${cacheKey}_dataVersion`, serverDataVersion.toString());
        console.log('✅ Cache saved after clearing');
      } catch (err) {
        console.error('❌ Cannot save cache even after clearing');
      }
    }

    renderTournament(currentTournament, updatedStandings);

    document.getElementById('loadingContainer').style.display = 'none';
    document.getElementById('tournamentContainer').style.display = 'block';

  } catch (error) {
    console.error('❌ Error loading tournament:', error);
    showError();
  }
}

// ========================================
// CARREGAR STANDINGS DA SUBCOLEÇÃO (CORRIGIDO)
// ========================================
async function loadStandingsFromSubcollection(tournamentId) {
  try {
    console.log('📊 Loading standings from subcollection...');

    const loadingIndicator = document.getElementById('loadingContainer');
    if (loadingIndicator && loadingIndicator.style.display !== 'none') {
      const loadingText = loadingIndicator.querySelector('p');
      if (loadingText) {
        loadingText.textContent = 'Loading standings...';
      }
    }
    
    const standingsColRef = collection(db, "tournaments", tournamentId, "standings");
    const standingsSnap = await getDocs(standingsColRef);
    
    const standings = {};
    
    standingsSnap.forEach(docSnap => {
      const data = docSnap.data();
      const letter = data.groupLetter;
      
      if (!standings[letter]) {
        standings[letter] = [];
      }
      
      // 🔥 BUSCAR DADOS COMPLETOS DO TIME DOS GRUPOS
      let fullTeamData = {
        name: data.teamName,
        logo: data.teamLogo || null,
        players: [],
        teamId: null,
        country: null,
        countryFlag: null
      };
      
      // Tentar buscar dados completos dos grupos do tournament
      if (currentTournament && currentTournament.groups && currentTournament.groups[letter]) {
        const groupTeams = currentTournament.groups[letter];
        const matchingTeam = groupTeams.find(t => {
          const teamName = typeof t === 'string' ? t : t.name;
          return normalizeTeamName(teamName) === normalizeTeamName(data.teamName);
        });
        
        if (matchingTeam && typeof matchingTeam === 'object') {
          fullTeamData = {
            name: matchingTeam.name,
            logo: matchingTeam.logo || data.teamLogo || null,
            players: matchingTeam.players || [],
            teamId: matchingTeam.teamId || null,
            country: matchingTeam.country || null,
            countryFlag: matchingTeam.countryFlag || null
          };
          
          console.log(`✅ Found full data for "${data.teamName}"`);
        } else {
          console.warn(`⚠️ Team "${data.teamName}" not found in groups, using basic data`);
        }
      }
      
      standings[letter].push({
        team: fullTeamData,
        wins: data.wins || 0,
        losses: data.losses || 0,
        points: data.points || 0,
        matchesPlayed: data.matchesPlayed || 0,
        position: data.position || 0
      });
    });
    
    // Ordenar cada grupo por position
    Object.keys(standings).forEach(letter => {
      standings[letter].sort((a, b) => a.position - b.position);
    });
    
    console.log('✅ Standings loaded from subcollection:', Object.keys(standings).length, 'groups');
    
    return standings;
    
  } catch (error) {
    console.error('❌ Error loading standings from subcollection:', error);
    return {};
  }
}

// ========================================
// CALCULAR STANDINGS BASEADO NAS PARTIDAS
// ========================================
function calculateStandingsFromMatches(groups, matches) {
  const standings = {};
  const groupLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  
  console.log('📊 Calculating standings from groups:', groups);

  groupLetters.forEach(letter => {
    const groupTeams = groups[letter];
    
    // 🔥 VALIDAÇÃO CRÍTICA
    if (!groupTeams) {
      console.warn(`⚠️ Group ${letter} has no teams`);
      return;
    }
    
    if (!Array.isArray(groupTeams)) {
      console.error(`❌ Group ${letter} is not an array:`, groupTeams);
      return;
    }
    
    if (groupTeams.length === 0) {
      console.warn(`⚠️ Group ${letter} is empty`);
      return;
    }

    // ✅ CRIAR STANDINGS COM ESTRUTURA CORRETA E COMPLETA
    standings[letter] = groupTeams.map((team, index) => {
      let teamObj;
      console.log(`🔍 Creating standing for Group ${letter} team ${index}:`, team);
      
      if (typeof team === 'string') {
        console.warn(`⚠️ Group ${letter} - Team ${index} is string: "${team}"`);
        teamObj = { 
          name: team, 
          logo: null, 
          players: [] 
        };
      } else if (team && typeof team === 'object' && team.name) {
        // 🔥 PRESERVAR TODOS OS DADOS DO TIME
        teamObj = {
          name: team.name,
          logo: team.logo || null,
          players: team.players || [],
          teamId: team.teamId || null,
          country: team.country || null,
          countryFlag: team.countryFlag || null
        };
        
        // 🔥 LOG PARA DEBUG
        if (team.logo) {
          console.log(`✅ Team "${team.name}" has logo:`, team.logo);
        } else {
          console.warn(`⚠️ Team "${team.name}" missing logo`);
        }
      } else {
        console.error(`❌ Invalid team data in Group ${letter} at index ${index}:`, team);
        teamObj = {
          name: `Unknown Team ${index + 1}`,
          logo: null,
          players: []
        };
      }
      
      return {
        team: teamObj,
        wins: 0,
        losses: 0,
        points: 0,
        matchesPlayed: 0,
        position: 0
      };
    });

    // 🔥 PROCESSAR MATCHES E ATUALIZAR STANDINGS
    const groupMatches = matches[`group${letter}`] || [];

    groupMatches.forEach(match => {
      if (match.result.status === 'completed' && match.result.winner) {
        const team1Name = match.team1.name;
        const team2Name = match.team2.name;

        // 🔥 BUSCAR TIMES (CASE-INSENSITIVE)
        const team1Standing = standings[letter].find(s => 
          s.team.name.toLowerCase().trim() === team1Name.toLowerCase().trim()
        );
        const team2Standing = standings[letter].find(s => 
          s.team.name.toLowerCase().trim() === team2Name.toLowerCase().trim()
        );

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

    // Ordenar por pontos
    standings[letter].sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return b.wins - a.wins;
    });

    // Atualizar posições
    standings[letter].forEach((standing, index) => {
      standing.position = index + 1;
    });
    
    // 🔥 LOG FINAL PARA DEBUG
    console.log(`✅ Group ${letter} standings created with ${standings[letter].length} teams`);
    standings[letter].forEach(s => {
      console.log(`  - ${s.team.name}: logo=${!!s.team.logo}, players=${s.team.players?.length || 0}`);
    });
  });

  return standings;
}
// ========================================
// RENDERIZAR TORNEIO
// ========================================
function renderTournament(tournament, standings) {
  if (!tournament) {
    console.error('❌ Tournament object is null/undefined');
    showError();
    return;
  }
  
  document.getElementById('tournamentLogo').src = tournament.logoUrl;
  document.getElementById('tournamentName').textContent = tournament.name;
  document.getElementById('tournamentDates').textContent = 
    `${tournament.startDate} - ${tournament.endDate}`;
  document.getElementById('tournamentDescription').textContent = 
    tournament.description || 'No description available';
  document.getElementById('tournamentViews').textContent = 
    `👁️ ${tournament.views || 0} views`;

  const btnDownloadRules = document.getElementById('btnDownloadRules');
  if (tournament.rulesUrl) {
    btnDownloadRules.onclick = () => {
      window.open(tournament.rulesUrl, '_blank');
    };
  } else {
    btnDownloadRules.style.display = 'none';
  }

  renderGroups(standings);

  tournamentMatches = tournament.matches || null;
  renderMatches(tournamentMatches, currentMatchesFilter);

  renderRankings(tournament.matches);

  renderInfo(tournament);

  if (tournament.knockoutStage) {
    knockoutGenerated = true;
    knockoutMatches = tournament.knockoutStage.matches || [];
    renderKnockoutBracket(tournament.knockoutStage);
  }

  checkKnockoutButton(tournament.matches, tournament.knockoutStage);
}

// ========================================
// RENDERIZAR GRUPOS COM STANDINGS (CORRIGIDO)
// ========================================
function renderGroups(standings) {
  console.log('🎯 renderGroups called with:', standings);
  
  const groupsDisplay = document.getElementById('groupsDisplay');
  const firstRowGroups = ['A', 'B', 'C', 'D'];
  const secondRowGroups = ['E', 'F', 'G', 'H'];
  
  const isKnockoutGenerated = currentTournament && currentTournament.knockoutStage;

  function renderGroupRow(groupLettersArray) {
    return `
      <div class="groups-row">
        ${groupLettersArray.map(letter => {
          const groupStandings = standings[letter];
          
          if (!groupStandings || groupStandings.length === 0) {
            console.warn(`⚠️ Group ${letter} has no standings data`);
            return '';
          }

          return `
            <div class="group-standings">
              <div class="group-standings-header">
                <h3>GROUP ${letter}</h3>
              </div>
              <table class="standings-table">
                <thead>
                  <tr>
                    <th>Pos</th>
                    <th>Team</th>
                    <th>W</th>
                    <th>L</th>
                    <th>Pts</th>
                  </tr>
                </thead>
                <tbody>
                  ${groupStandings.map((standing, index) => {
                    if (!standing || !standing.team) {
                      console.warn('⚠️ Invalid standing:', standing);
                      return '';
                    }
                    
                    // 🔥 VERIFICAR teamId
                    const hasTeamId = standing.team.teamId ? true : false;
                    const teamNameDisplay = standing.team.name || 'Unknown Team';
                    const teamLogo = standing.team.logo || null;
                    
                    // 🔥 CRIAR WRAPPER CLICÁVEL APENAS SE TEM teamId
                    const teamCellContent = hasTeamId
                      ? `<div class="team-info clickable-team" onclick="window.location.href='../teams/team-view.html?teamId=${standing.team.teamId}'" style="cursor: pointer;">
                           <div class="team-logo-mini">
                             ${teamLogo 
                               ? `<img src="${teamLogo}" alt="${teamNameDisplay}" onerror="this.style.display='none'; this.parentElement.innerHTML='🛡️'">` 
                               : '🛡️'
                             }
                           </div>
                           <span>${teamNameDisplay}</span>
                         </div>`
                      : `<div class="team-info">
                           <div class="team-logo-mini">
                             ${teamLogo 
                               ? `<img src="${teamLogo}" alt="${teamNameDisplay}" onerror="this.style.display='none'; this.parentElement.innerHTML='🛡️'">` 
                               : '🛡️'
                             }
                           </div>
                           <span>${teamNameDisplay}</span>
                         </div>`;
                    
                    return `
                      <tr ${isKnockoutGenerated && index < 2 ? 'class="qualified"' : ''}>
                        <td class="pos-cell">${standing.position || index + 1}</td>
                        <td class="team-cell">
                          ${teamCellContent}
                        </td>
                        <td class="stat-cell wins">${standing.wins || 0}</td>
                        <td class="stat-cell losses">${standing.losses || 0}</td>
                        <td class="stat-cell points">${standing.points || 0}</td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  groupsDisplay.innerHTML = `
    ${renderGroupRow(firstRowGroups)}
    ${renderGroupRow(secondRowGroups)}
  `;
}

// ========================================
// RENDERIZAR PARTIDAS (MATCHES)
// ========================================
function renderMatches(matches, selectedGroup = 'all') {
  console.log('🎮 renderMatches called, filter:', selectedGroup);
  
  const matchesContainer = document.getElementById('matchesContainer');
  
  if (!matches) {
    matchesContainer.innerHTML = `
      <div class="no-matches-message">
        📅 No matches scheduled yet
      </div>
    `;
    return;
  }
  
  matchesContainer.innerHTML = '';
  
  // Renderizar Group Stage Matches
  if (selectedGroup === 'all' || ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].includes(selectedGroup)) {
    renderGroupStageMatches(matches, selectedGroup, matchesContainer);
  }
  
  // 🔥 RENDERIZAR KNOCKOUT MATCHES (se existir E filtro correto)
  if (currentTournament && currentTournament.knockoutStage && currentTournament.knockoutStage.matches) {
    if (selectedGroup === 'all' || selectedGroup === 'knockout') {
      console.log('🏆 Rendering knockout matches in Matches tab');
      renderKnockoutMatches(currentTournament.knockoutStage.matches, matchesContainer);
    }
  }
  
  // Se não houver nenhum match
  if (matchesContainer.children.length === 0) {
    matchesContainer.innerHTML = `
      <div class="no-matches-message">
        📅 No matches for this filter
      </div>
    `;
  }
}

function renderGroupStageMatches(matches, selectedGroup, container) {
  const groupLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  let hasMatches = false;
  
  groupLetters.forEach(letter => {
    if (selectedGroup !== 'all' && selectedGroup !== letter) {
      return;
    }
    
    const groupMatches = matches[`group${letter}`];
    
    if (!groupMatches || groupMatches.length === 0) {
      return;
    }
    
    hasMatches = true;
    
    const groupSection = document.createElement('div');
    groupSection.className = 'group-matches-section';
    groupSection.dataset.group = letter;
    
    groupSection.innerHTML = `
      <div class="group-matches-header">
        🏆 GROUP ${letter} MATCHES
      </div>
      <div class="matches-grid">
        ${groupMatches.map(match => createMatchCard(match)).join('')}
      </div>
    `;
    
    container.appendChild(groupSection);
  });
}

function renderKnockoutMatches(knockoutMatches, container) {
  console.log('🏆 Rendering knockout matches:', knockoutMatches);
  
  // Round of 16
  if (knockoutMatches.round16 && knockoutMatches.round16.length > 0) {
    const validRound16 = knockoutMatches.round16.filter(m => 
      m.team1 && m.team2 && m.team1.name !== 'TBD' && m.team2.name !== 'TBD'
    );
    
    if (validRound16.length > 0) {
      const round16Section = document.createElement('div');
      round16Section.className = 'group-matches-section';
      round16Section.innerHTML = `
        <div class="group-matches-header">
          ⚔️ ROUND OF 16
        </div>
        <div class="matches-grid">
          ${validRound16.map(match => createMatchCard(match, 'knockout')).join('')}
        </div>
      `;
      container.appendChild(round16Section);
    }
  }
  
  // Quarterfinals
  if (knockoutMatches.quarterfinals && knockoutMatches.quarterfinals.length > 0) {
    const validQuarters = knockoutMatches.quarterfinals.filter(m => 
      m.team1 && m.team2 && m.team1.name !== 'TBD' && m.team2.name !== 'TBD'
    );
    
    if (validQuarters.length > 0) {
      const quartersSection = document.createElement('div');
      quartersSection.className = 'group-matches-section';
      quartersSection.innerHTML = `
        <div class="group-matches-header">
          🎯 QUARTERFINALS
        </div>
        <div class="matches-grid">
          ${validQuarters.map(match => createMatchCard(match, 'knockout')).join('')}
        </div>
      `;
      container.appendChild(quartersSection);
    }
  }
  
  // Semifinals
  if (knockoutMatches.semifinals && knockoutMatches.semifinals.length > 0) {
    const validSemis = knockoutMatches.semifinals.filter(m => 
      m.team1 && m.team2 && m.team1.name !== 'TBD' && m.team2.name !== 'TBD'
    );
    
    if (validSemis.length > 0) {
      const semisSection = document.createElement('div');
      semisSection.className = 'group-matches-section';
      semisSection.innerHTML = `
        <div class="group-matches-header">
          🏅 SEMIFINALS
        </div>
        <div class="matches-grid">
          ${validSemis.map(match => createMatchCard(match, 'knockout')).join('')}
        </div>
      `;
      container.appendChild(semisSection);
    }
  }
  
  // Final
  if (knockoutMatches.final && knockoutMatches.final[0]) {
    const finalMatch = knockoutMatches.final[0];
    if (finalMatch.team1 && finalMatch.team2 && 
        finalMatch.team1.name !== 'TBD' && finalMatch.team2.name !== 'TBD') {
      const finalSection = document.createElement('div');
      finalSection.className = 'group-matches-section';
      finalSection.innerHTML = `
        <div class="group-matches-header">
          🏆 FINAL
        </div>
        <div class="matches-grid">
          ${createMatchCard(finalMatch, 'knockout')}
        </div>
      `;
      container.appendChild(finalSection);
    }
  }
}

// ========================================
// CRIAR CARD DE MATCH (CORRIGIDO)
// ========================================
function createMatchCard(match, matchType = 'group') {
  // ✅ VALIDAÇÃO CRÍTICA
  if (!match) {
    console.error('❌ Match is null/undefined');
    return '';
  }
  
  if (!match.team1 || !match.team2) {
    console.error('❌ Match missing teams:', match);
    return `
      <div class="match-card error-card">
        <p style="color: #ff6b6b; text-align: center; padding: 20px;">
          ⚠️ Invalid match data
        </p>
      </div>
    `;
  }
  
  // ✅ GARANTIR QUE team1 E team2 TÊM DADOS VÁLIDOS
  const team1Name = match.team1.name || 'Unknown Team';
  const team2Name = match.team2.name || 'Unknown Team';
  const team1Logo = match.team1.logo || null;
  const team2Logo = match.team2.logo || null;
  const team1Players = Array.isArray(match.team1.players) ? match.team1.players : [];
  const team2Players = Array.isArray(match.team2.players) ? match.team2.players : [];
  
  // 🔥 VERIFICAR SE TIMES TÊM teamId
  const team1HasId = match.team1.teamId ? true : false;
  const team2HasId = match.team2.teamId ? true : false;
  
  const statusClass = match.result?.status || 'pending';
  const statusText = {
    'pending': '⏳ Pending',
    'ongoing': '🔴 Live',
    'completed': '✅ Completed'
  };
  
  const isCompleted = match.result?.status === 'completed';
  const team1IsWinner = match.result?.winner === 'team1';
  const team2IsWinner = match.result?.winner === 'team2';
  
  const canViewDetails = team1Name !== 'TBD' && team2Name !== 'TBD';
  
  let matchIdDisplay = match.matchId;
  if (matchType === 'knockout') {
    matchIdDisplay = match.matchId
      .replace('R16-', 'R16 Match ')
      .replace('QF-', 'Quarterfinal ')
      .replace('SF-', 'Semifinal ')
      .replace('FINAL', 'Final');
  }
  
  return `
    <div class="match-card">
      <div class="match-header">
        <span class="match-id">${matchIdDisplay}</span>
        <span class="match-format">MD${match.bestOf || 3}</span>
      </div>
      
      <div class="match-teams">
        <div class="match-team ${team1IsWinner ? 'winner' : ''} ${team1HasId ? 'clickable-team' : ''}"
            ${team1HasId ? `onclick="window.location.href='../teams/team-view.html?teamId=${match.team1.teamId}'; event.stopPropagation();" style="cursor: pointer;"` : ''}>
          <div class="match-team-logo">
            ${team1Logo 
              ? `<img src="${team1Logo}" alt="${team1Name}" onerror="this.style.display='none'; this.parentElement.innerHTML='🛡️'">` 
              : '🛡️'
            }
          </div>
          <div class="match-team-info">
            <div class="match-team-name">${team1Name}</div>
            <div class="match-team-players">
              ${team1Players.length} player(s)
            </div>
          </div>
        </div>
        
        <span class="match-vs">VS</span>
        
        <div class="match-team ${team2IsWinner ? 'winner' : ''} ${team2HasId ? 'clickable-team' : ''}"
            ${team2HasId ? `onclick="window.location.href='../teams/team-view.html?teamId=${match.team2.teamId}'; event.stopPropagation();" style="cursor: pointer;"` : ''}>
          <div class="match-team-logo">
            ${team2Logo 
              ? `<img src="${team2Logo}" alt="${team2Name}" onerror="this.style.display='none'; this.parentElement.innerHTML='🛡️'">` 
              : '🛡️'
            }
          </div>
          <div class="match-team-info">
            <div class="match-team-name">${team2Name}</div>
            <div class="match-team-players">
              ${team2Players.length} player(s)
            </div>
          </div>
        </div>
      </div>
      
      ${isCompleted ? `
        <div class="match-score">
          <span class="team-score ${team1IsWinner ? 'winner-score' : ''}">
            ${match.result.team1Score || 0}
          </span>
          <span class="score-separator">:</span>
          <span class="team-score ${team2IsWinner ? 'winner-score' : ''}">
            ${match.result.team2Score || 0}
          </span>
        </div>
      ` : ''}
      
      <div class="match-status ${statusClass}">
        ${statusText[statusClass] || 'Unknown'}
      </div>
      
      ${canViewDetails ? `
        <button class="btn-view-details" onclick="window.location.href='matches.html?tournamentId=${tournamentId}&matchId=${match.matchId}'">
          👁️ View Details
        </button>
      ` : `
        <button class="btn-view-details" disabled style="opacity: 0.5; cursor: not-allowed;">
          ⏳ Awaiting Previous Results
        </button>
      `}
    </div>
  `;
}

// ========================================
// RENDERIZAR RANKINGS
// ========================================
function renderRankings(matches) {
  if (!matches) {
    document.getElementById('rankingsContent').innerHTML = `
      <div class="no-data-message">
        <p>📊 No data available yet</p>
      </div>
    `;
    return;
  }

  const playerStats = collectAllPlayerStats(matches);
  const pokemonStats = calculatePokemonStats(matches);
  const teamStats = calculateTeamStats(matches);

  currentRankingData = {
    players: playerStats,
    pokemon: pokemonStats,
    teams: teamStats
  };

  renderRankingsTabs();
}

// ========================================
// COLETAR ESTATÍSTICAS DE TODOS OS JOGADORES (CORRIGIDO)
// ========================================
function collectAllPlayerStats(matches) {
  const stats = {
    kills: [],
    assists: [],
    interrupts: [],
    points: [],
    damageDone: [],
    damageTaken: [],
    damageHealed: [],
    mvps: []
  };

  const groupLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  // FUNÇÃO AUXILIAR: CALCULAR PERFORMANCE POINTS (mantém igual)
  function calculatePerformancePoints(player, allTeamPlayers, teamData) {
    let performancePoints = 0;
    
    const scorePercentage = teamData.totalScore > 0 
      ? ((player.playerScore / teamData.totalScore) * 100) 
      : 0;
    
    const totalKills = allTeamPlayers.reduce((sum, p) => sum + (p.kills || 0), 0);
    const killsPercentage = totalKills > 0 ? ((player.kills / totalKills) * 100) : 0;
    
    const totalAssists = allTeamPlayers.reduce((sum, p) => sum + (p.assists || 0), 0);
    const assistsPercentage = totalAssists > 0 ? ((player.assists / totalAssists) * 100) : 0;
    
    const totalInterrupts = allTeamPlayers.reduce((sum, p) => sum + (p.interrupts || 0), 0);
    const interruptsPercentage = totalInterrupts > 0 ? ((player.interrupts / totalInterrupts) * 100) : 0;
    
    const totalDmgDone = allTeamPlayers.reduce((sum, p) => sum + (p.damageDone || 0), 0);
    const dmgDonePercentage = totalDmgDone > 0 ? ((player.damageDone / totalDmgDone) * 100) : 0;
    
    const totalDmgTaken = allTeamPlayers.reduce((sum, p) => sum + (p.damageTaken || 0), 0);
    const dmgTakenPercentage = totalDmgTaken > 0 ? ((player.damageTaken / totalDmgTaken) * 100) : 0;
    
    const totalHealing = allTeamPlayers.reduce((sum, p) => sum + (p.damageHealed || 0), 0);
    const healingPercentage = totalHealing > 0 ? ((player.damageHealed / totalHealing) * 100) : 0;
    
    if (scorePercentage >= 20) performancePoints += 20;
    if (killsPercentage >= 20) performancePoints += 15;
    if (assistsPercentage >= 20) performancePoints += 15;
    if (interruptsPercentage >= 20) performancePoints += 15;
    if (dmgDonePercentage >= 20) performancePoints += 15;
    if (dmgTakenPercentage >= 20) performancePoints += 20;
    if (healingPercentage >= 20) performancePoints += 20;
    
    return performancePoints;
  }

  const mvpsList = [];

  // PROCESSAR GROUP STAGE
  groupLetters.forEach(letter => {
    const groupMatches = matches[`group${letter}`] || [];

    groupMatches.forEach(match => {
      if (!match.uploadedData || match.result.status !== 'completed') return;

      match.uploadedData.forEach((game, gameIndex) => {
        
        // Processar stats normais
        if (game.configuredPlayers && game.configuredPlayers.winner) {
          game.configuredPlayers.winner.forEach(player => {
            processPlayerStats(player, match.matchId, letter, stats);
          });
        }

        if (game.configuredPlayers && game.configuredPlayers.defeated) {
          game.configuredPlayers.defeated.forEach(player => {
            processPlayerStats(player, match.matchId, letter, stats);
          });
        }

        // 🔥 IDENTIFICAR MVP DO GAME
        const team1Score = game.winnerTeam?.totalScore || 0;
        const team2Score = game.defeatedTeam?.totalScore || 0;
        
        let gameWinnerPlayers = [];
        let gameWinnerTeamData = null;
        
        if (team1Score > team2Score) {
          gameWinnerPlayers = game.configuredPlayers?.winner || [];
          gameWinnerTeamData = game.winnerTeam;
        } else if (team2Score > team1Score) {
          gameWinnerPlayers = game.configuredPlayers?.defeated || [];
          gameWinnerTeamData = game.defeatedTeam;
        } else {
          return; // Empate
        }

        let mvpPlayer = null;
        let maxPerformancePoints = -1;

        gameWinnerPlayers.forEach(player => {
          const performancePoints = calculatePerformancePoints(
            player, 
            gameWinnerPlayers, 
            gameWinnerTeamData
          );
          
          if (performancePoints > maxPerformancePoints) {
            maxPerformancePoints = performancePoints;
            mvpPlayer = player;
          }
        });

        if (mvpPlayer && maxPerformancePoints > 0) {
          mvpsList.push({
            playerName: mvpPlayer.playerName,
            pokemon: mvpPlayer.pokemon,
            matchId: match.matchId,
            gameNumber: gameIndex + 1,
            group: letter,
            performancePoints: maxPerformancePoints,
            // 🔥 CAPTURAR LINKAGEM
            userId: mvpPlayer.userId || null,
            displayName: mvpPlayer.displayName || mvpPlayer.playerName,
            playerId: mvpPlayer.playerId || null
          });
        }
      });
    });
  });

  // PROCESSAR KNOCKOUT STAGE
  if (currentTournament && currentTournament.knockoutStage && currentTournament.knockoutStage.matches) {
    const knockoutMatches = currentTournament.knockoutStage.matches;
    const allKnockoutMatches = [
      ...(knockoutMatches.round16 || []),
      ...(knockoutMatches.quarterfinals || []),
      ...(knockoutMatches.semifinals || []),
      ...(knockoutMatches.final || [])
    ];
    
    allKnockoutMatches.forEach(match => {
      if (!match.uploadedData || match.result.status !== 'completed') return;
      
      match.uploadedData.forEach((game, gameIndex) => {
        // Processar stats normais
        if (game.configuredPlayers && game.configuredPlayers.winner) {
          game.configuredPlayers.winner.forEach(player => {
            processPlayerStats(player, match.matchId, 'Knockout', stats);
          });
        }

        if (game.configuredPlayers && game.configuredPlayers.defeated) {
          game.configuredPlayers.defeated.forEach(player => {
            processPlayerStats(player, match.matchId, 'Knockout', stats);
          });
        }

        // Processar MVPs
        const team1Score = game.winnerTeam?.totalScore || 0;
        const team2Score = game.defeatedTeam?.totalScore || 0;
        
        let gameWinnerPlayers = [];
        let gameWinnerTeamData = null;
        
        if (team1Score > team2Score) {
          gameWinnerPlayers = game.configuredPlayers?.winner || [];
          gameWinnerTeamData = game.winnerTeam;
        } else if (team2Score > team1Score) {
          gameWinnerPlayers = game.configuredPlayers?.defeated || [];
          gameWinnerTeamData = game.defeatedTeam;
        }

        let mvpPlayer = null;
        let maxPerformancePoints = -1;

        gameWinnerPlayers.forEach(player => {
          const performancePoints = calculatePerformancePoints(
            player, 
            gameWinnerPlayers, 
            gameWinnerTeamData
          );
          
          if (performancePoints > maxPerformancePoints) {
            maxPerformancePoints = performancePoints;
            mvpPlayer = player;
          }
        });

        if (mvpPlayer && maxPerformancePoints > 0) {
          mvpsList.push({
            playerName: mvpPlayer.playerName,
            pokemon: mvpPlayer.pokemon,
            matchId: match.matchId,
            gameNumber: gameIndex + 1,
            group: 'Knockout',
            performancePoints: maxPerformancePoints,
            // 🔥 CAPTURAR LINKAGEM
            userId: mvpPlayer.userId || null,
            displayName: mvpPlayer.displayName || mvpPlayer.playerName,
            playerId: mvpPlayer.playerId || null
          });
        }
      });
    });
  }

// CONTAR MVPs POR JOGADOR
const mvpCount = new Map();

mvpsList.forEach((mvp) => {
  // 🔥 PRIORIZAR userId, FALLBACK PARA playerName
  const uniqueKey = mvp.userId || `unlinked_${mvp.playerName}`;
  
  if (!mvpCount.has(uniqueKey)) {
    mvpCount.set(uniqueKey, {
      count: 0,
      playerName: mvp.playerName,
      userId: mvp.userId || null,
      displayName: mvp.displayName,
      playerId: mvp.playerId || null
    });
  }
  
  const current = mvpCount.get(uniqueKey);
  current.count++;
});

// Converter para array e ordenar
stats.mvps = Array.from(mvpCount.values())
  .map(data => ({
    playerName: data.playerName,
    value: data.count,
    userId: data.userId,
    displayName: data.displayName,
    playerId: data.playerId
  }))
  .sort((a, b) => b.value - a.value);

console.log(`✅ ${stats.mvps.length} unique players in MVP ranking`);

  // Ordenar outras categorias
  Object.keys(stats).forEach(category => {
    if (category !== 'mvps') {
      stats[category].sort((a, b) => b.value - a.value);
    }
  });

  return stats;
}

// FUNÇÃO AUXILIAR: PROCESSAR STATS DE UM PLAYER (CORRIGIDO)
function processPlayerStats(player, matchId, groupLetter, stats) {
  const playerData = {
    playerName: player.playerName,
    pokemon: player.pokemon,
    matchId: matchId,
    group: groupLetter,
    // 🔥 ADICIONAR LINKAGEM
    userId: player.userId || null,
    displayName: player.displayName || player.playerName,
    playerId: player.playerId || null
  };

  if (player.kills) {
    stats.kills.push({ ...playerData, value: player.kills });
  }
  if (player.assists) {
    stats.assists.push({ ...playerData, value: player.assists });
  }
  if (player.interrupts) {
    stats.interrupts.push({ ...playerData, value: player.interrupts });
  }
  if (player.playerScore) {
    stats.points.push({ ...playerData, value: player.playerScore });
  }
  if (player.damageDone) {
    stats.damageDone.push({ ...playerData, value: player.damageDone });
  }
  if (player.damageTaken) {
    stats.damageTaken.push({ ...playerData, value: player.damageTaken });
  }
  if (player.damageHealed) {
    stats.damageHealed.push({ ...playerData, value: player.damageHealed });
  }
}

// ========================================
// CALCULAR ESTATÍSTICAS DOS POKÉMON
// ========================================
function calculatePokemonStats(matches) {
  const pokemonData = {};
  const pokemonBans = {};
  
  const groupLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  groupLetters.forEach(letter => {
    const groupMatches = matches[`group${letter}`] || [];

    groupMatches.forEach(match => {
      if (match.result.status !== 'completed') return;

      // Processar bans
      if (match.uploadedData) {
        match.uploadedData.forEach(game => {
          if (game.bans) {
            [...(game.bans.winner || []), ...(game.bans.defeated || [])].forEach(ban => {
              if (ban) {
                pokemonBans[ban] = (pokemonBans[ban] || 0) + 1;
              }
            });
          }

          // Processar picks e resultados
          if (game.configuredPlayers) {
            const processTeam = (players, isWinner) => {
              players.forEach(player => {
                const pokemon = player.pokemon.toLowerCase();
                if (!pokemonData[pokemon]) {
                  pokemonData[pokemon] = { picks: 0, wins: 0, losses: 0 };
                }
                pokemonData[pokemon].picks++;
                if (isWinner) {
                  pokemonData[pokemon].wins++;
                } else {
                  pokemonData[pokemon].losses++;
                }
              });
            };

            if (game.configuredPlayers.winner) {
              processTeam(game.configuredPlayers.winner, true);
            }
            if (game.configuredPlayers.defeated) {
              processTeam(game.configuredPlayers.defeated, false);
            }
          }
        });
      }
    });
  });

    // PROCESSAR KNOCKOUT STAGE
  if (currentTournament && currentTournament.knockoutStage && currentTournament.knockoutStage.matches) {
    console.log('🏆 Processing Knockout Stage for pokemon stats...');
    
    const knockoutMatches = currentTournament.knockoutStage.matches;
    const allKnockoutMatches = [
      ...(knockoutMatches.round16 || []),
      ...(knockoutMatches.quarterfinals || []),
      ...(knockoutMatches.semifinals || []),
      ...(knockoutMatches.final || [])
    ];
    
    allKnockoutMatches.forEach(match => {
      if (match.result.status !== 'completed') return;

      if (match.uploadedData) {
        match.uploadedData.forEach(game => {
          // Processar bans
          if (game.bans) {
            [...(game.bans.winner || []), ...(game.bans.defeated || [])].forEach(ban => {
              if (ban) {
                pokemonBans[ban] = (pokemonBans[ban] || 0) + 1;
              }
            });
          }

          // Processar picks e resultados
          if (game.configuredPlayers) {
            const processTeam = (players, isWinner) => {
              players.forEach(player => {
                const pokemon = player.pokemon.toLowerCase();
                if (!pokemonData[pokemon]) {
                  pokemonData[pokemon] = { picks: 0, wins: 0, losses: 0 };
                }
                pokemonData[pokemon].picks++;
                if (isWinner) {
                  pokemonData[pokemon].wins++;
                } else {
                  pokemonData[pokemon].losses++;
                }
              });
            };

            if (game.configuredPlayers.winner) {
              processTeam(game.configuredPlayers.winner, true);
            }
            if (game.configuredPlayers.defeated) {
              processTeam(game.configuredPlayers.defeated, false);
            }
          }
        });
      }
    });
  }

  // Calcular winrate e pickrate
  const totalGames = Object.values(pokemonData).reduce((sum, p) => sum + p.picks, 0);
  
  const pokemonList = Object.entries(pokemonData).map(([pokemon, data]) => ({
    pokemon,
    picks: data.picks,
    wins: data.wins,
    losses: data.losses,
    winrate: data.picks > 0 ? ((data.wins / data.picks) * 100).toFixed(1) : 0,
    pickrate: totalGames > 0 ? ((data.picks / totalGames) * 100).toFixed(1) : 0,
    bans: pokemonBans[pokemon] || 0
  }));

  return pokemonList.sort((a, b) => b.picks - a.picks);
}

// ========================================
// CALCULAR ESTATÍSTICAS DOS TIMES (CORRIGIDO - INCLUI KNOCKOUT)
// ========================================
function calculateTeamStats(matches) {
  const teamData = {};
  
  // ✅ PRIMEIRO: Inicializar TODOS os times do torneio
  if (currentTournament) {
    console.log('--- Initializing teams from tournament data ---');
    
    if (currentTournament.teams && Array.isArray(currentTournament.teams)) {
      console.log('📋 Found teams array:', currentTournament.teams.length);
      currentTournament.teams.forEach((team, index) => {
        if (!team || !team.name) {
          console.error(`❌ Team at index ${index} is invalid:`, team);
          return;
        }
        
        console.log(`${index + 1}. Adding team: "${team.name}"`);
        
        teamData[team.name] = {
          name: team.name,
          logo: team.logo || null,
          wins: 0,
          losses: 0,
          matchesPlayed: 0
        };
      });
    }
    else if (currentTournament.groups) {
      console.log('📋 Extracting teams from groups');
      Object.keys(currentTournament.groups).forEach(groupLetter => {
        const groupTeams = currentTournament.groups[groupLetter];
        if (Array.isArray(groupTeams)) {
          groupTeams.forEach(team => {
            if (team && team.name && !teamData[team.name]) {
              console.log(`Adding team from Group ${groupLetter}: "${team.name}"`);
              teamData[team.name] = {
                name: team.name,
                logo: team.logo || null,
                wins: 0,
                losses: 0,
                matchesPlayed: 0
              };
            }
          });
        }
      });
    } else {
      console.warn('⚠️ No teams data found in tournament object');
    }
  }
  
  // 🔥 FUNÇÃO AUXILIAR: Processar um match individual
  function processMatch(match) {
    if (match.result.status !== 'completed') return;

    const team1Name = match.team1.name;
    const team2Name = match.team2.name;

    // Ignorar matches TBD
    if (team1Name === 'TBD' || team2Name === 'TBD') return;

    // Garantir que o time existe
    if (!teamData[team1Name]) {
      console.warn(`⚠️ Team not found in tournament.teams: "${team1Name}"`);
      teamData[team1Name] = { 
        name: team1Name, 
        logo: match.team1.logo,
        wins: 0, 
        losses: 0, 
        matchesPlayed: 0 
      };
    }
    if (!teamData[team2Name]) {
      console.warn(`⚠️ Team not found in tournament.teams: "${team2Name}"`);
      teamData[team2Name] = { 
        name: team2Name, 
        logo: match.team2.logo,
        wins: 0, 
        losses: 0, 
        matchesPlayed: 0 
      };
    }

    teamData[team1Name].matchesPlayed++;
    teamData[team2Name].matchesPlayed++;

    if (match.result.winner === 'team1') {
      teamData[team1Name].wins++;
      teamData[team2Name].losses++;
    } else if (match.result.winner === 'team2') {
      teamData[team2Name].wins++;
      teamData[team1Name].losses++;
    }
  }
  
  // 🔥 PROCESSAR GROUP STAGE MATCHES
  const groupLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  groupLetters.forEach(letter => {
    const groupMatches = matches[`group${letter}`] || [];
    groupMatches.forEach(match => processMatch(match));
  });
  
  // 🔥 PROCESSAR KNOCKOUT STAGE MATCHES (NOVO)
  if (currentTournament && currentTournament.knockoutStage && currentTournament.knockoutStage.matches) {
    console.log('🏆 Processing Knockout Stage matches for team stats...');
    
    const knockoutMatches = currentTournament.knockoutStage.matches;
    
    // Processar Round of 16
    if (knockoutMatches.round16) {
      console.log(`  - Processing ${knockoutMatches.round16.length} Round of 16 matches`);
      knockoutMatches.round16.forEach(match => processMatch(match));
    }
    
    // Processar Quarterfinals
    if (knockoutMatches.quarterfinals) {
      console.log(`  - Processing ${knockoutMatches.quarterfinals.length} Quarterfinal matches`);
      knockoutMatches.quarterfinals.forEach(match => processMatch(match));
    }
    
    // Processar Semifinals
    if (knockoutMatches.semifinals) {
      console.log(`  - Processing ${knockoutMatches.semifinals.length} Semifinal matches`);
      knockoutMatches.semifinals.forEach(match => processMatch(match));
    }
    
    // Processar Final
    if (knockoutMatches.final) {
      console.log(`  - Processing Final match`);
      knockoutMatches.final.forEach(match => processMatch(match));
    }
    
    console.log('✅ Knockout Stage matches processed for team stats');
  }

  const teamList = Object.values(teamData).map(team => ({
    ...team,
    winrate: team.matchesPlayed > 0 ? ((team.wins / team.matchesPlayed) * 100).toFixed(1) : 0
  }));

  console.log('📊 Team Stats Summary:');
  console.log(`  - Total teams: ${teamList.length}`);
  console.log(`  - Teams with matches: ${teamList.filter(t => t.matchesPlayed > 0).length}`);
  console.log(`  - Teams without matches: ${teamList.filter(t => t.matchesPlayed === 0).length}`);

  teamList.forEach(team => {
    if (team.matchesPlayed > 0) {
      console.log(`  ${team.name}: ${team.wins}W-${team.losses}L (${team.winrate}% WR)`);
    }
  });

  // Ordenação
  return teamList.sort((a, b) => {
    if (a.matchesPlayed === 0 && b.matchesPlayed > 0) return 1;
    if (b.matchesPlayed === 0 && a.matchesPlayed > 0) return -1;
    
    const winrateDiff = parseFloat(b.winrate) - parseFloat(a.winrate);
    if (winrateDiff !== 0) return winrateDiff;
    
    if (b.matchesPlayed !== a.matchesPlayed) {
      return b.matchesPlayed - a.matchesPlayed;
    }
    
    return b.wins - a.wins;
  });
}

// ========================================
// RENDERIZAR ABAS DE RANKINGS
// ========================================
function renderRankingsTabs() {
  const rankingsTabs = document.getElementById('rankingsTabs');

  const mainCategories = [
    { id: 'players', icon: '👤', label: 'Players' },
    { id: 'pokemon', icon: '🎮', label: 'Pokémon' },
    { id: 'teams', icon: '👥', label: 'Teams' }
  ];

  rankingsTabs.innerHTML = mainCategories.map((cat, index) => `
    <button class="ranking-main-tab-btn ${index === 0 ? 'active' : ''}" 
            data-main-category="${cat.id}">
      ${cat.icon} ${cat.label}
    </button>
  `).join('');

  document.querySelectorAll('.ranking-main-tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.ranking-main-tab-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const mainCategory = this.dataset.mainCategory;
      renderRankingsSubTabs(mainCategory);
    });
  });

  renderRankingsSubTabs('players');
}

function renderRankingsSubTabs(mainCategory) {
  const rankingsSubTabs = document.getElementById('rankingsSubTabs');
  const rankingsContent = document.getElementById('rankingsContent');

  if (mainCategory === 'players') {
    const categories = [
      { id: 'kills', icon: '⚔️', label: 'Kills', color: '#4ade80' },
      { id: 'assists', icon: '🤝', label: 'Assists', color: '#ffad00' },
      { id: 'interrupts', icon: '🛡️', label: 'Interrupts', color: '#8b5cf6' },
      { id: 'points', icon: '🎯', label: 'Points', color: '#60a5fa' },
      { id: 'damageDone', icon: '💥', label: 'Damage Done', color: '#ef4444' },
      { id: 'damageTaken', icon: '🩹', label: 'Damage Taken', color: '#f97316' },
      { id: 'damageHealed', icon: '💚', label: 'Healing', color: '#10b981' },
      { id: 'mvps', icon: '🏆', label: 'MVPs', color: '#ffd700' } // NOVA ABA
    ];

    rankingsSubTabs.innerHTML = categories.map((cat, index) => `
      <button class="ranking-tab-btn ${index === 0 ? 'active' : ''}" 
              data-category="${cat.id}">
        ${cat.icon} ${cat.label}
      </button>
    `).join('');

    document.querySelectorAll('.ranking-tab-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const category = this.dataset.category;
        currentRankingCategory = category;
        displayedItems = 50;
        searchQuery = '';

        document.querySelectorAll('.ranking-tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const categoryData = categories.find(c => c.id === category);
        
        // Limpar o conteúdo antes de renderizar
        const rankingsContent = document.getElementById('rankingsContent');
        rankingsContent.innerHTML = '';
        
        // Verificar se é a aba de MVPs
        if (category === 'mvps') {
          renderMVPRankingList(currentRankingData.players[category], categoryData);
        } else {
          renderPlayerRankingList(currentRankingData.players[category], categoryData);
        }
      });
    });

    const firstCategory = categories[0];
    currentRankingCategory = firstCategory.id;
    renderPlayerRankingList(currentRankingData.players[firstCategory.id], firstCategory);

  } else if (mainCategory === 'pokemon') {
    rankingsSubTabs.innerHTML = '';
    renderPokemonStats();
  } else if (mainCategory === 'teams') {
    rankingsSubTabs.innerHTML = '';
    renderTeamStats();
  }
}

// 3. NOVA FUNÇÃO para renderizar ranking de MVPs
function renderMVPRankingList(data, category) {
  const rankingsContent = document.getElementById('rankingsContent');
  
  if (!data || data.length === 0) {
    rankingsContent.innerHTML = `
      <div class="no-data-message">
        <p>📊 No MVP data available</p>
      </div>
    `;
    return;
  }

  // Filtrar por busca
  let displayData = data.map((record, index) => ({
    ...record,
    originalPosition: index + 1
  }));

  if (searchQuery) {
    displayData = displayData.filter(record => 
      record.playerName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const itemsToShow = displayData.slice(0, displayedItems);
  const hasMore = displayData.length > displayedItems;

  // Verificar se precisa recriar o cabeçalho
  const existingHeader = rankingsContent.querySelector('.ranking-list-header');
  const existingTitle = existingHeader?.querySelector('h3');
  const shouldRecreate = !existingHeader || existingTitle?.textContent !== `${category.icon} ${category.label} Leaders`;
  
  if (shouldRecreate) {
    const headerHTML = `
      <div class="ranking-list-header" style="border-color: ${category.color};">
        <h3 style="color: ${category.color};">${category.icon} ${category.label} Leaders</h3>
        <p class="ranking-subtitle">${searchQuery ? `${displayData.length} Results Found` : `Top ${data.length} Players`}</p>
        <div class="ranking-search-container">
          <input 
            type="text" 
            class="ranking-search-input" 
            placeholder="🔍 Search player by name..."
            value="${searchQuery}"
            id="rankingSearchInput"
          />
        </div>
      </div>
      <div class="ranking-list" id="rankingList"></div>
      <div class="load-more-container" id="loadMoreContainer"></div>
    `;
    rankingsContent.innerHTML = headerHTML;
    
    const searchInput = document.getElementById('rankingSearchInput');
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      displayedItems = 50;
      updateMVPRankingList(data, category);
    });
  } else {
    const subtitle = rankingsContent.querySelector('.ranking-subtitle');
    if (subtitle) {
      subtitle.textContent = searchQuery 
        ? `${displayData.length} Results Found` 
        : `Top ${data.length} Players`;
    }
  }

  // Atualizar lista
  const rankingList = document.getElementById('rankingList');
  rankingList.innerHTML = itemsToShow.map(record => 
    renderMVPRankingItem(record, record.originalPosition, category)
  ).join('');

  // Atualizar botão Load More
  const loadMoreContainer = document.getElementById('loadMoreContainer');
  if (hasMore) {
    loadMoreContainer.innerHTML = `
      <button class="btn-load-more" id="btnLoadMore">
        📊 Load More (${displayData.length - displayedItems} remaining)
      </button>
    `;
    
    const btnLoadMore = document.getElementById('btnLoadMore');
    btnLoadMore.addEventListener('click', () => {
      displayedItems += 50;
      updateMVPRankingList(data, category);
    });
  } else {
    loadMoreContainer.innerHTML = '';
  }
}

// 4. Função auxiliar para atualizar lista de MVPs
function updateMVPRankingList(data, category) {
  let displayData = data.map((record, index) => ({
    ...record,
    originalPosition: index + 1
  }));

  if (searchQuery) {
    displayData = displayData.filter(record => 
      record.playerName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const itemsToShow = displayData.slice(0, displayedItems);
  const hasMore = displayData.length > displayedItems;

  const subtitle = document.querySelector('.ranking-subtitle');
  if (subtitle) {
    subtitle.textContent = searchQuery 
      ? `${displayData.length} Results Found` 
      : `Top ${data.length} Players`;
  }

  const rankingList = document.getElementById('rankingList');
  rankingList.innerHTML = itemsToShow.map(record => 
    renderMVPRankingItem(record, record.originalPosition, category)
  ).join('');

  const loadMoreContainer = document.getElementById('loadMoreContainer');
  if (hasMore) {
    loadMoreContainer.innerHTML = `
      <button class="btn-load-more" id="btnLoadMore">
        📊 Load More (${displayData.length - displayedItems} remaining)
      </button>
    `;
    
    const btnLoadMore = document.getElementById('btnLoadMore');
    btnLoadMore.addEventListener('click', () => {
      displayedItems += 50;
      updateMVPRankingList(data, category);
    });
  } else {
    loadMoreContainer.innerHTML = '';
  }
}

// 5. NOVA FUNÇÃO para renderizar item de MVP (LAYOUT SIMPLIFICADO)
// Substitua a função renderMVPRankingItem (linha ~960) por esta versão:

function renderMVPRankingItem(record, position, category) {
  let medalClass = '';
  let medalIcon = '';
  if (position === 1) {
    medalClass = 'gold-medal';
    medalIcon = '🥇';
  } else if (position === 2) {
    medalClass = 'silver-medal';
    medalIcon = '🥈';
  } else if (position === 3) {
    medalClass = 'bronze-medal';
    medalIcon = '🥉';
  }

  // 🔥 VERIFICAR LINKAGEM
  const isLinked = record.userId ? true : false;
  const linkedBadge = isLinked 
    ? `<span style="background: rgba(74, 222, 128, 0.2); border: 1px solid #4ade80; color: #4ade80; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 600; margin-left: 10px;">✓ Verified</span>`
    : `<span style="background: rgba(255, 173, 0, 0.2); border: 1px solid #ffad00; color: #ffad00; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 600; margin-left: 10px;">⚠ Unlinked</span>`;

  return `
    <div class="ranking-item ${medalClass}" style="display: flex; align-items: center; justify-content: space-between; gap: 30px;">
      <div class="ranking-position" style="min-width: 80px;">
        ${medalIcon || `#${position}`}
      </div>
      
      <div style="flex: 1; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; text-align: left; padding-left: 20px;">
        <div class="ranking-player-name" style="font-size: 1.5rem; margin-bottom: 8px;">
          ${record.playerName}
          ${linkedBadge}
        </div>
        ${isLinked ? `<div style="color: #888; font-size: 0.85rem;">Player ID: ${record.playerId}</div>` : ''}
      </div>
      
      <div class="ranking-value" style="color: ${category.color}; min-width: 120px; text-align: right;">
        ${record.value} MVP${record.value > 1 ? 's' : ''}
      </div>
    </div>
  `;
}
// ========================================
// RENDERIZAR LISTA DE RANKING DE JOGADORES (VERSÃO CORRIGIDA)
// ========================================
function renderPlayerRankingList(data, category) {
  const rankingsContent = document.getElementById('rankingsContent');
  
  if (!data || data.length === 0) {
    rankingsContent.innerHTML = `
      <div class="no-data-message">
        <p>📊 No data available for this category</p>
      </div>
    `;
    return;
  }

  // Filtrar por busca (mantendo as posições originais)
  let displayData = data.map((record, index) => ({
    ...record,
    originalPosition: index + 1
  }));

  if (searchQuery) {
    displayData = displayData.filter(record => 
      record.playerName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const itemsToShow = displayData.slice(0, displayedItems);
  const hasMore = displayData.length > displayedItems;

  // Verificar se já existe o cabeçalho COM A MESMA CATEGORIA
  const existingHeader = rankingsContent.querySelector('.ranking-list-header');
  const existingTitle = existingHeader?.querySelector('h3');
  const shouldRecreate = !existingHeader || existingTitle?.textContent !== `${category.icon} ${category.label} Leaders`;
  
  if (shouldRecreate) {
    // Criar cabeçalho apenas se não existir OU se for categoria diferente
    const headerHTML = `
      <div class="ranking-list-header" style="border-color: ${category.color};">
        <h3 style="color: ${category.color};">${category.icon} ${category.label} Leaders</h3>
        <p class="ranking-subtitle">Top ${data.length} Records</p>
        <div class="ranking-search-container">
          <input 
            type="text" 
            class="ranking-search-input" 
            placeholder="🔍 Search player by name..."
            value="${searchQuery}"
            id="rankingSearchInput"
          />
        </div>
      </div>
      <div class="ranking-list" id="rankingList"></div>
      <div class="load-more-container" id="loadMoreContainer"></div>
    `;
    rankingsContent.innerHTML = headerHTML;
    
    // Adicionar event listener apenas uma vez
    const searchInput = document.getElementById('rankingSearchInput');
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      displayedItems = 50;
      updateRankingList(data, category);
    });
  } else {
    // Atualizar apenas a subtitle
    const subtitle = rankingsContent.querySelector('.ranking-subtitle');
    if (subtitle) {
      subtitle.textContent = searchQuery 
        ? `${displayData.length} Results Found` 
        : `Top ${data.length} Records`;
    }
  }

  // Atualizar lista
  const rankingList = document.getElementById('rankingList');
  rankingList.innerHTML = itemsToShow.map(record => 
    renderRankingItem(record, record.originalPosition, category)
  ).join('');

  // Atualizar botão Load More
  const loadMoreContainer = document.getElementById('loadMoreContainer');
  if (hasMore) {
    loadMoreContainer.innerHTML = `
      <button class="btn-load-more" id="btnLoadMore">
        📊 Load More (${displayData.length - displayedItems} remaining)
      </button>
    `;
    
    const btnLoadMore = document.getElementById('btnLoadMore');
    btnLoadMore.addEventListener('click', () => {
      displayedItems += 50;
      updateRankingList(data, category);
    });
  } else {
    loadMoreContainer.innerHTML = '';
  }
}

// Função auxiliar para atualizar apenas a lista (sem recriar o input)
function updateRankingList(data, category) {
  // Filtrar mantendo posições originais
  let displayData = data.map((record, index) => ({
    ...record,
    originalPosition: index + 1
  }));

  if (searchQuery) {
    displayData = displayData.filter(record => 
      record.playerName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const itemsToShow = displayData.slice(0, displayedItems);
  const hasMore = displayData.length > displayedItems;

  // Atualizar subtitle
  const subtitle = document.querySelector('.ranking-subtitle');
  if (subtitle) {
    subtitle.textContent = searchQuery 
      ? `${displayData.length} Results Found` 
      : `Top ${data.length} Records`;
  }

  // Atualizar lista
  const rankingList = document.getElementById('rankingList');
  rankingList.innerHTML = itemsToShow.map(record => 
    renderRankingItem(record, record.originalPosition, category)
  ).join('');

  // Atualizar botão Load More
  const loadMoreContainer = document.getElementById('loadMoreContainer');
  if (hasMore) {
    loadMoreContainer.innerHTML = `
      <button class="btn-load-more" id="btnLoadMore">
        📊 Load More (${displayData.length - displayedItems} remaining)
      </button>
    `;
    
    const btnLoadMore = document.getElementById('btnLoadMore');
    btnLoadMore.addEventListener('click', () => {
      displayedItems += 50;
      updateRankingList(data, category);
    });
  } else {
    loadMoreContainer.innerHTML = '';
  }
}

// A função renderRankingItem permanece igual, mas agora usa originalPosition
function renderRankingItem(record, position, category) {
  const pokemonImg = `../estatisticas-shad/images/backgrounds/${record.pokemon.toLowerCase()}-left-bg.png`;
  
  let medalClass = '';
  let medalIcon = '';
  if (position === 1) {
    medalClass = 'gold-medal';
    medalIcon = '🥇';
  } else if (position === 2) {
    medalClass = 'silver-medal';
    medalIcon = '🥈';
  } else if (position === 3) {
    medalClass = 'bronze-medal';
    medalIcon = '🥉';
  }

  let displayValue = record.value;
  if (['damageDone', 'damageTaken', 'damageHealed'].includes(category.id)) {
    displayValue = record.value.toLocaleString();
  }

  // 🔥 VERIFICAR SE O PLAYER ESTÁ LINKADO
  const isLinked = record.userId ? true : false;
  const linkedBadge = isLinked 
    ? `<span style="background: rgba(74, 222, 128, 0.2); border: 1px solid #4ade80; color: #4ade80; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 600; margin-left: 10px;">✓ Verified</span>`
    : `<span style="background: rgba(255, 173, 0, 0.2); border: 1px solid #ffad00; color: #ffad00; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 600; margin-left: 10px;">⚠ Unlinked</span>`;

  return `
    <div class="ranking-item ${medalClass}">
      <div class="ranking-position">
        ${medalIcon || `#${position}`}
      </div>
      <div class="ranking-pokemon-img">
        <img src="${pokemonImg}" alt="${record.pokemon}" onerror="this.style.display='none'; this.parentElement.innerHTML='🎮'">
      </div>
      <div class="ranking-player-info">
        <div class="ranking-player-name">
          ${record.playerName}
          ${linkedBadge}
        </div>
        <div class="ranking-player-pokemon">${capitalize(record.pokemon)}</div>
        ${isLinked ? `<div style="color: #888; font-size: 0.75rem; margin-top: 3px;">Player ID: ${record.playerId}</div>` : ''}
      </div>
      <div class="ranking-match-info">
        <span class="ranking-match-id">Match ${record.matchId}</span>
        <span class="ranking-group">Group ${record.group}</span>
      </div>
      <div class="ranking-value" style="color: ${category.color};">
        ${displayValue}
      </div>
    </div>
  `;
}

// ========================================
// RENDERIZAR ESTATÍSTICAS DE POKÉMON
// ========================================
function renderPokemonStats() {
  const rankingsContent = document.getElementById('rankingsContent');
  const pokemonStats = currentRankingData.pokemon;

  if (!pokemonStats || pokemonStats.length === 0) {
    rankingsContent.innerHTML = `
      <div class="no-data-message">
        <p>📊 No Pokémon data available</p>
      </div>
    `;
    return;
  }

  // Filtrar por roles selecionadas
  let filteredStats = pokemonStats;
  if (!selectedPokemonRoles.includes('All')) {
    filteredStats = pokemonStats.filter(pokemon => {
      const role = pokemonRoles[pokemon.pokemon];
      return selectedPokemonRoles.includes(role);
    });
  }

  // Ordenar baseado na seleção
  filteredStats = [...filteredStats].sort((a, b) => {
    switch(pokemonSortBy) {
      case 'picks':
        return parseFloat(b.pickrate) - parseFloat(a.pickrate);
      case 'wins':
        return parseFloat(b.winrate) - parseFloat(a.winrate);
      case 'bans':
        return b.bans - a.bans;
      default:
        return parseFloat(b.pickrate) - parseFloat(a.pickrate);
    }
  });

  // Renderizar com o mesmo layout da aba Players
  const rankingsSubTabs = document.getElementById('rankingsSubTabs');
  
  // TODOS OS BOTÕES NA MESMA LINHA
  rankingsSubTabs.innerHTML = `
    <div style="display: flex; gap: 10px; flex-wrap: wrap; width: 100%; align-items: center;">
      <!-- Filtros de Ordenação -->
      <button class="ranking-tab-btn ${pokemonSortBy === 'picks' ? 'active' : ''}" data-sort="picks">
        📊 Sort by Pick Rate
      </button>
      <button class="ranking-tab-btn ${pokemonSortBy === 'wins' ? 'active' : ''}" data-sort="wins">
        🏆 Sort by Win Rate
      </button>
      <button class="ranking-tab-btn ${pokemonSortBy === 'bans' ? 'active' : ''}" data-sort="bans">
        🚫 Sort by Ban Rate
      </button>
      
      <!-- Separador Visual -->
      <div style="width: 2px; height: 30px; background: rgba(255, 173, 0, 0.3); margin: 0 5px;"></div>
      
      <!-- Filtros de Roles -->
      <button class="ranking-tab-btn ${selectedPokemonRoles.includes('All') ? 'active' : ''}" data-role="All">
        All Roles
      </button>
      <button class="ranking-tab-btn ${selectedPokemonRoles.includes('Attacker') ? 'active' : ''}" data-role="Attacker">
        🔥 Attacker
      </button>
      <button class="ranking-tab-btn ${selectedPokemonRoles.includes('Speedster') ? 'active' : ''}" data-role="Speedster">
        ⚡ Speedster
      </button>
      <button class="ranking-tab-btn ${selectedPokemonRoles.includes('All Rounder') ? 'active' : ''}" data-role="All Rounder">
        💪 All Rounder
      </button>
      <button class="ranking-tab-btn ${selectedPokemonRoles.includes('Defender') ? 'active' : ''}" data-role="Defender">
        🛡️ Defender
      </button>
      <button class="ranking-tab-btn ${selectedPokemonRoles.includes('Support') ? 'active' : ''}" data-role="Support">
        💚 Support
      </button>
    </div>
  `;

  // Event listeners para filtros de ORDENAÇÃO
  rankingsSubTabs.querySelectorAll('[data-sort]').forEach(btn => {
    btn.addEventListener('click', function() {
      pokemonSortBy = this.dataset.sort;
      renderPokemonStats();
    });
  });

  // Event listeners para filtros de ROLES
  rankingsSubTabs.querySelectorAll('[data-role]').forEach(btn => {
    btn.addEventListener('click', function() {
      const role = this.dataset.role;
      
      if (role === 'All') {
        selectedPokemonRoles = ['All'];
      } else {
        if (selectedPokemonRoles.includes('All')) {
          selectedPokemonRoles = [];
        }
        
        if (selectedPokemonRoles.includes(role)) {
          selectedPokemonRoles = selectedPokemonRoles.filter(r => r !== role);
          if (selectedPokemonRoles.length === 0) {
            selectedPokemonRoles = ['All'];
          }
        } else {
          selectedPokemonRoles.push(role);
        }
      }
      
      renderPokemonStats();
    });
  });

  // Renderizar conteúdo
  const sortLabel = {
    'picks': 'Pick Rate',
    'wins': 'Win Rate',
    'bans': 'Ban Rate'
  };

  rankingsContent.innerHTML = `
    <div class="pokemon-stats-header">
      <h3>🎮 Pokémon Statistics</h3>
      <p class="ranking-subtitle">${filteredStats.length} Pokémon ${selectedPokemonRoles.includes('All') ? 'Total' : 'Filtered'} • Sorted by ${sortLabel[pokemonSortBy]}</p>
    </div>
    <div class="pokemon-stats-grid">
      ${filteredStats.map(pokemon => renderPokemonStatCard(pokemon)).join('')}
    </div>
  `;
}
function renderPokemonStatCard(pokemon) {
  const pokemonImg = `../estatisticas-shad/images/backgrounds/${pokemon.pokemon}-left-bg.png`;
  
  return `
    <div class="pokemon-stat-card">
      <div class="pokemon-stat-image">
        <img src="${pokemonImg}" alt="${pokemon.pokemon}" onerror="this.style.display='none'; this.parentElement.innerHTML='🎮'">
      </div>
      <div class="pokemon-stat-name">${capitalize(pokemon.pokemon)}</div>
      <div class="pokemon-stat-details">
        <div class="pokemon-stat-row">
          <span class="stat-label">Pick Rate:</span>
          <span class="stat-value pickrate">${pokemon.pickrate}%</span>
        </div>
        <div class="pokemon-stat-row">
          <span class="stat-label">Win Rate:</span>
          <span class="stat-value winrate">${pokemon.winrate}%</span>
        </div>
        <div class="pokemon-stat-row">
          <span class="stat-label">Picks:</span>
          <span class="stat-value">${pokemon.picks}</span>
        </div>
        <div class="pokemon-stat-row">
          <span class="stat-label">Wins:</span>
          <span class="stat-value winrate">${pokemon.wins}</span>
        </div>
        <div class="pokemon-stat-row">
          <span class="stat-label">Losses:</span>
          <span class="stat-value losses">${pokemon.losses}</span>
        </div>
        <div class="pokemon-stat-row">
          <span class="stat-label">Bans:</span>
          <span class="stat-value bans">${pokemon.bans}</span>
        </div>
      </div>
    </div>
  `;
}

// ========================================
// RENDERIZAR ESTATÍSTICAS DE TIMES
// ========================================
function renderTeamStats() {
  const rankingsContent = document.getElementById('rankingsContent');
  const teamStats = currentRankingData.teams;

  if (!teamStats || teamStats.length === 0) {
    rankingsContent.innerHTML = `
      <div class="no-data-message">
        <p>📊 No team data available</p>
      </div>
    `;
    return;
  }

  rankingsContent.innerHTML = `
    <div class="team-stats-header">
      <h3>👥 Team Statistics</h3>
      <p class="ranking-subtitle">${teamStats.length} Teams</p>
    </div>
    <div class="team-stats-list">
      ${teamStats.map((team, index) => renderTeamStatCard(team, index + 1)).join('')}
    </div>
  `;
}

function renderTeamStatCard(team, position) {
  let medalClass = '';
  let medalIcon = '';
  if (position === 1) {
    medalClass = 'gold-medal';
    medalIcon = '🥇';
  } else if (position === 2) {
    medalClass = 'silver-medal';
    medalIcon = '🥈';
  } else if (position === 3) {
    medalClass = 'bronze-medal';
    medalIcon = '🥉';
  }

  return `
    <div class="team-stat-card ${medalClass}">
      <div class="team-stat-position">
        ${medalIcon || position}
      </div>
      <div class="team-stat-logo">
        ${team.logo 
          ? `<img src="${team.logo}" alt="${team.name}">` 
          : '🛡️'
        }
      </div>
      <div class="team-stat-info">
        <div class="team-stat-name">${team.name}</div>
        <div class="team-stat-record">${team.wins}W - ${team.losses}L (${team.matchesPlayed} matches)</div>
      </div>
      <div class="team-stat-winrate">
        ${team.winrate}%
      </div>
    </div>
  `;
}

// ========================================
// RENDERIZAR INFORMAÇÕES
// ========================================
function renderInfo(tournament) {
  const infoGrid = document.getElementById('infoGrid');
  
  // 🛡️ Calcular total de teams de forma segura
  let totalTeams = 0;
  let totalPlayers = 0;
  
  if (tournament.teams && Array.isArray(tournament.teams)) {
    totalTeams = tournament.teams.length;
    totalPlayers = tournament.teams.reduce((sum, team) => {
      return sum + (team.playerCount || team.players?.length || 0);
    }, 0);
  } else if (tournament.groups) {
    // Fallback: contar times pelos grupos
    Object.values(tournament.groups).forEach(group => {
      if (Array.isArray(group)) {
        totalTeams += group.length;
        group.forEach(team => {
          totalPlayers += (team.players?.length || 0);
        });
      }
    });
  }
  
  infoGrid.innerHTML = `
    <div class="info-card">
      <h4>📅 Duration</h4>
      <p>${tournament.startDate} to ${tournament.endDate}</p>
    </div>
    <div class="info-card">
      <h4>👥 Total Teams</h4>
      <p>${totalTeams} teams</p>
    </div>
    <div class="info-card">
      <h4>🎮 Total Players</h4>
      <p>${totalPlayers} players</p>
    </div>
    <div class="info-card">
      <h4>🏆 Format</h4>
      <p>Group Stage + Knockout</p>
    </div>
    <div class="info-card">
      <h4>📊 Status</h4>
      <p style="color: ${getStatusColor(tournament.status)}; font-weight: bold; text-transform: uppercase;">
        ${tournament.status}
      </p>
    </div>
    <div class="info-card">
      <h4>👁️ Views</h4>
      <p>${tournament.views || 0}</p>
    </div>
  `;
}

function getStatusColor(status) {
  const colors = {
    'upcoming': '#4ade80',
    'ongoing': '#ffad00',
    'completed': '#6b6b6b'
  };
  return colors[status] || '#aaa';
}

// ========================================
// SISTEMA DE ABAS PRINCIPAL
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const targetTab = this.dataset.tab;
      
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      
      this.classList.add('active');
      document.getElementById(`tab${capitalize(targetTab)}`).classList.add('active');
    });
  });

  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      currentMatchesFilter = this.dataset.group;
      
      if (tournamentMatches) {
        renderMatches(tournamentMatches, currentMatchesFilter);
      }
    });
  });
});

// ========================================
// KNOCKOUT STAGE - FUNÇÕES PRINCIPAIS
// ========================================

async function checkKnockoutButton(matches, knockoutStage) {
  console.log('🔍 checkKnockoutButton called');
  console.log('knockoutStage:', knockoutStage);
  console.log('matches:', matches);
  
  // Importar getAuth do topo do arquivo
  const { getAuth, onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js");
  const auth = getAuth(app);
  
  onAuthStateChanged(auth, async (user) => {
    console.log('👤 Auth state changed, user:', user?.email);
    
    if (!user) {
      console.log('❌ No user logged in');
      return;
    }
    
    try {
      const userDoc = await getDoc(doc(db, "usuarios", user.uid));
      const userRole = userDoc.exists() ? userDoc.data().role : null;
      
      console.log('👤 User role:', userRole);
      
      if (userRole !== 'admin' && userRole !== 'creator') {
        console.log('❌ User is not admin/creator');
        return;
      }
      
      const container = document.getElementById('knockoutGenerateContainer');
      const button = document.getElementById('btnGenerateKnockout');
      const statusMessage = document.getElementById('knockoutStatusMessage');
      
      if (!container || !button || !statusMessage) {
        console.error('❌ Knockout elements not found in DOM');
        return;
      }
      
      container.style.display = 'block';
      console.log('✅ Container displayed');
      
      // Se knockout já foi gerado
      if (knockoutStage) {
        console.log('✅ Knockout already generated');
        button.style.display = 'none';
        statusMessage.textContent = '✅ Knockout Stage already generated';
        statusMessage.style.color = '#4ade80';
        return;
      }
      
      // Verificar se todos os matches estão completos
      const allCompleted = areAllGroupMatchesCompleted(matches);
      console.log('📊 All matches completed:', allCompleted);
      
      if (allCompleted) {
        button.disabled = false;
        button.style.cursor = 'pointer';
        button.style.opacity = '1';
        statusMessage.textContent = '✅ All group stage matches completed! Ready to generate knockout.';
        statusMessage.style.color = '#4ade80';
        
        // 🔥 REMOVER EVENT LISTENERS ANTERIORES
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // 🔥 ADICIONAR NOVO EVENT LISTENER
        newButton.onclick = async (e) => {
          e.preventDefault();
          console.log('🖱️ Generate button clicked!');
          await generateKnockoutStage();
        };
        
        console.log('✅ Event listener attached to button');
      } else {
        button.disabled = true;
        button.style.cursor = 'not-allowed';
        button.style.opacity = '0.5';
        const completedCount = countCompletedMatches(matches);
        const totalCount = countTotalMatches(matches);
        statusMessage.textContent = `⏳ ${completedCount}/${totalCount} matches completed. Complete all matches to enable knockout generation.`;
        statusMessage.style.color = '#aaa';
        console.log(`⏳ Matches: ${completedCount}/${totalCount} completed`);
      }
      
    } catch (error) {
      console.error('❌ Error checking user role:', error);
    }
  });
}

/**
 * Verifica se todos os matches do group stage estão completos
 */
function areAllGroupMatchesCompleted(matches) {
  if (!matches) return false;
  
  const groupLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  
  for (const letter of groupLetters) {
    const groupMatches = matches[`group${letter}`];
    if (!groupMatches) continue;
    
    for (const match of groupMatches) {
      if (match.result.status !== 'completed') {
        return false;
      }
    }
  }
  
  return true;
}

/**
 * Conta matches completos
 */
function countCompletedMatches(matches) {
  if (!matches) return 0;
  
  let count = 0;
  const groupLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  
  groupLetters.forEach(letter => {
    const groupMatches = matches[`group${letter}`];
    if (groupMatches) {
      count += groupMatches.filter(m => m.result.status === 'completed').length;
    }
  });
  
  return count;
}

/**
 * Conta total de matches
 */
function countTotalMatches(matches) {
  if (!matches) return 0;
  
  let count = 0;
  const groupLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  
  groupLetters.forEach(letter => {
    const groupMatches = matches[`group${letter}`];
    if (groupMatches) {
      count += groupMatches.length;
    }
  });
  
  return count;
}

async function generateKnockoutStage() {
  console.log('🏆 generateKnockoutStage called');
  
  if (!confirm('🏆 Generate Knockout Stage?\n\nThis will create the elimination bracket based on group stage standings. This action cannot be undone.')) {
    console.log('❌ User cancelled');
    return;
  }
  
  try {
    console.log('📊 Calculating standings...');
    
    // Recalcular standings atualizados
    const standings = calculateStandingsFromMatches(
      currentTournament.groups,
      currentTournament.matches
    );
    
    console.log('📊 Standings calculated:', standings);
    
    // Obter os 2 primeiros de cada grupo
    const qualified = getQualifiedTeams(standings);
    
    console.log('✅ Qualified teams:', qualified);
    
    if (qualified.length !== 16) {
      alert(`⚠️ Error: Expected 16 qualified teams, but found ${qualified.length}. Please check standings.`);
      console.error('❌ Wrong number of qualified teams:', qualified.length);
      return;
    }
    
    console.log('🎯 Creating Round of 16 matches...');
    
    // Criar confrontos das oitavas (Round of 16)
    const round16Matches = createRound16Matches(qualified);
    
    console.log('✅ Round of 16 matches created:', round16Matches);
    
    // Estrutura do Knockout
    const knockoutStage = {
      generated: true,
      generatedAt: new Date().toISOString(),
      matches: {
        round16: round16Matches,
        quarterfinals: createEmptyRound(8, 'QF'),
        semifinals: createEmptyRound(4, 'SF'),
        final: [{
          matchId: 'FINAL',
          team1: { name: 'TBD', logo: null, players: [] },
          team2: { name: 'TBD', logo: null, players: [] },
          result: {
            status: 'pending',
            winner: null,
            team1Score: 0,
            team2Score: 0
          },
          bestOf: 5
        }]
      }
    };
    
    console.log('📦 Knockout structure created:', knockoutStage);
    console.log('💾 Saving to Firebase...');
    
    // 🔥 SALVAR NO DOCUMENTO PRINCIPAL
    const tournamentRef = doc(db, "tournaments", tournamentId);
    await updateDoc(tournamentRef, {
      knockoutStage: knockoutStage
    });
    
    console.log('✅ Knockout saved to main document!');
    
    // 🔥 NOVO: SALVAR TODOS OS MATCHES NA SUBCOLEÇÃO matchDetails
    console.log('💾 Saving knockout matches to subcollection...');
    
    const matchDetailsRef = collection(db, "tournaments", tournamentId, "matchDetails");
    const allKnockoutMatches = [
      ...knockoutStage.matches.round16,
      ...knockoutStage.matches.quarterfinals,
      ...knockoutStage.matches.semifinals,
      ...knockoutStage.matches.final
    ];
    
    // Salvar cada match na subcoleção
    const savePromises = allKnockoutMatches.map(async (match) => {
      const matchDocRef = doc(matchDetailsRef);
      await setDoc(matchDocRef, {
        ...match,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log(`✅ Saved ${match.matchId} to subcollection`);
    });
    
    await Promise.all(savePromises);
    
    console.log('✅ All knockout matches saved to subcollection!');
    
    // 🔥 ATUALIZAR currentTournament ANTES DE RECARREGAR
    currentTournament.knockoutStage = knockoutStage;
    
    // 🔥 LIMPAR CACHE ANTES DE RECARREGAR
    const cacheKey = `tournament_cache_${tournamentId}`;
    sessionStorage.removeItem(cacheKey);
    sessionStorage.removeItem(`${cacheKey}_time`);
    sessionStorage.removeItem(`${cacheKey}_version`);
    
    console.log('🗑️ Cache cleared');
    
    alert('✅ Knockout Stage generated successfully!');
    
    console.log('🔄 Reloading page...');
    window.location.reload();
    
  } catch (error) {
    console.error('❌ Error generating knockout stage:', error);
    alert('❌ Error generating knockout stage: ' + error.message);
  }
}

// ========================================
// OBTER TIMES QUALIFICADOS (CORRIGIDO)
// ========================================
function getQualifiedTeams(standings) {
  const qualified = [];
  const groupLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  
  groupLetters.forEach(letter => {
    const groupStandings = standings[letter];
    
    // 🔥 VALIDAÇÃO CRÍTICA
    if (!groupStandings || groupStandings.length < 2) {
      console.error(`❌ Group ${letter} has insufficient teams (${groupStandings?.length || 0}/2)`);
      throw new Error(`Group ${letter} needs at least 2 teams to generate knockout stage`);
    }
    
    // Primeiro colocado
    qualified.push({
      group: letter,
      position: 1,
      team: groupStandings[0].team
    });
    
    // Segundo colocado
    qualified.push({
      group: letter,
      position: 2,
      team: groupStandings[1].team
    });
  });
  
  console.log(`✅ ${qualified.length} teams qualified from ${groupLetters.length} groups`);
  
  return qualified;
}

/**
 * Cria os confrontos das oitavas de final (Round of 16)
 * Seguindo o padrão de confrontos cruzados
 */
function createRound16Matches(qualified) {
  const matches = [];
  
  // Organizar times por grupo e posição
  const teamsByGroup = {};
  qualified.forEach(q => {
    if (!teamsByGroup[q.group]) {
      teamsByGroup[q.group] = {};
    }
    teamsByGroup[q.group][q.position] = q.team;
  });
  
  // Lado Esquerdo (Grupos A-D)
  // Match 1: 1º A vs 2º B
  matches.push(createMatch('R16-1', teamsByGroup['A'][1], teamsByGroup['B'][2]));
  // Match 2: 1º B vs 2º A
  matches.push(createMatch('R16-2', teamsByGroup['B'][1], teamsByGroup['A'][2]));
  // Match 3: 1º C vs 2º D
  matches.push(createMatch('R16-3', teamsByGroup['C'][1], teamsByGroup['D'][2]));
  // Match 4: 1º D vs 2º C
  matches.push(createMatch('R16-4', teamsByGroup['D'][1], teamsByGroup['C'][2]));
  
  // Lado Direito (Grupos E-H)
  // Match 5: 1º E vs 2º F
  matches.push(createMatch('R16-5', teamsByGroup['E'][1], teamsByGroup['F'][2]));
  // Match 6: 1º F vs 2º E
  matches.push(createMatch('R16-6', teamsByGroup['F'][1], teamsByGroup['E'][2]));
  // Match 7: 1º G vs 2º H
  matches.push(createMatch('R16-7', teamsByGroup['G'][1], teamsByGroup['H'][2]));
  // Match 8: 1º H vs 2º G
  matches.push(createMatch('R16-8', teamsByGroup['H'][1], teamsByGroup['G'][2]));
  
  return matches;
}

/**
 * Cria um match object
 */
function createMatch(matchId, team1, team2) {
  return {
    matchId: matchId,
    team1: {
      name: team1.name,
      logo: team1.logo,
      players: team1.players,
      teamId: team1.teamId || null  // 🔥 ADICIONAR
    },
    team2: {
      name: team2.name,
      logo: team2.logo,
      players: team2.players,
      teamId: team2.teamId || null  // 🔥 ADICIONAR
    },
    result: {
      status: 'pending',
      winner: null,
      team1Score: 0,
      team2Score: 0
    },
    bestOf: 3
  };
}

/**
 * Cria rodadas vazias (para quarters, semis, etc)
 */
function createEmptyRound(count, prefix) {
  const matches = [];
  for (let i = 1; i <= count; i++) {
    matches.push({
      matchId: `${prefix}-${i}`,
      team1: { name: 'TBD', logo: null, players: [] },
      team2: { name: 'TBD', logo: null, players: [] },
      result: {
        status: 'pending',
        winner: null,
        team1Score: 0,
        team2Score: 0
      },
      bestOf: 3
    });
  }
  return matches;
}

/**
 * Renderiza o bracket visual do Knockout
 */
function renderKnockoutBracket(knockoutStage) {
  console.log('🏆 renderKnockoutBracket called');
  console.log('📊 Knockout Stage:', knockoutStage);

  validateKnockoutProgression(knockoutStage);
  
  const bracketContainer = document.getElementById('knockoutBracket');
  bracketContainer.style.display = 'block';
  
  const matches = knockoutStage.matches;
  
  console.log('⚔️ Quarterfinals data:', matches.quarterfinals);
  
  // 🔥 ADICIONAR LOG ESPECÍFICO DO QF-1
  if (matches.quarterfinals && matches.quarterfinals[0]) {
    console.log('🎯 QF-1 Data:');
    console.log('  Team1:', matches.quarterfinals[0].team1);
    console.log('  Team2:', matches.quarterfinals[0].team2);
  }
  
  // Renderizar Round of 16
  renderRound('leftRound16', matches.round16.slice(0, 4));
  renderRound('rightRound16', matches.round16.slice(4, 8));
  
  // Renderizar Quarterfinals
  console.log('🎯 Rendering quarterfinals...');
  renderRound('leftQuarters', matches.quarterfinals.slice(0, 2));
  renderRound('rightQuarters', matches.quarterfinals.slice(2, 4));
  
  // Renderizar Semifinals
  renderRound('leftSemi', [matches.semifinals[0]]);
  renderRound('rightSemi', [matches.semifinals[1]]);
  
  // Renderizar Final
  renderRound('finalMatch', [matches.final[0]]);
  
  // Renderizar Campeão
  renderChampion(matches.final[0]);

  // Mostrar botão de relatório se o torneio estiver completo
  checkReportButton(matches.final[0]);
}

// ========================================
// VALIDAR PROGRESSÃO DO KNOCKOUT
// ========================================
function validateKnockoutProgression(knockoutStage) {
  if (!knockoutStage || !knockoutStage.matches) return;
  
  const matches = knockoutStage.matches;
  
  // Verificar se Round of 16 está completo
  const r16Complete = matches.round16.every(m => m.result.status === 'completed');
  
  if (r16Complete) {
    console.log('✅ Round of 16 complete - checking quarterfinals...');
    
    // Verificar se quarterfinals foram preenchidas
    const qfEmpty = matches.quarterfinals.some(m => m.team1.name === 'TBD' || m.team2.name === 'TBD');
    
    if (qfEmpty) {
      console.warn('⚠️ Quarterfinals have TBD teams but R16 is complete - progression may have failed');
    }
  }
  
  // Verificar se Quarterfinals está completo
  const qfComplete = matches.quarterfinals.every(m => m.result.status === 'completed');
  
  if (qfComplete) {
    console.log('✅ Quarterfinals complete - checking semifinals...');
    
    const sfEmpty = matches.semifinals.some(m => m.team1.name === 'TBD' || m.team2.name === 'TBD');
    
    if (sfEmpty) {
      console.warn('⚠️ Semifinals have TBD teams but QF is complete');
    }
  }
  
  // Verificar se Semifinals está completo
  const sfComplete = matches.semifinals.every(m => m.result.status === 'completed');
  
  if (sfComplete) {
    console.log('✅ Semifinals complete - checking final...');
    
    const finalEmpty = matches.final[0].team1.name === 'TBD' || matches.final[0].team2.name === 'TBD';
    
    if (finalEmpty) {
      console.warn('⚠️ Final has TBD teams but SF is complete');
    }
  }
}

/**
 * Renderiza uma rodada de matches (COM VALIDAÇÃO)
 */
function renderRound(containerId, matches) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`❌ Container not found: ${containerId}`);
    return;
  }
  
  // 🔥 VALIDAÇÃO: Verificar se matches está vazio ou com dados inválidos
  if (!matches || matches.length === 0) {
    console.warn(`⚠️ No matches for ${containerId}`);
    return;
  }
  
  console.log(`🎨 Rendering ${containerId}:`, matches);
  
  // 🔥 FILTRAR MATCHES INVÁLIDOS ANTES DE RENDERIZAR
  const validMatches = matches.filter(match => {
    if (!match || !match.team1 || !match.team2) {
      console.error('❌ Invalid match structure:', match);
      return false;
    }
    return true;
  });
  
  if (validMatches.length === 0) {
    console.error(`❌ All matches in ${containerId} are invalid`);
    return;
  }
  
  container.innerHTML = validMatches.map(match => {
    console.log(`  - Rendering match ${match.matchId}:`, match.team1.name, 'vs', match.team2.name);
    return createBracketMatchHTML(match);
  }).join('');
}

/**
 * Cria HTML para um match no bracket
 */
function createBracketMatchHTML(match) {
  const isCompleted = match.result.status === 'completed';
  const team1IsWinner = match.result.winner === 'team1';
  const team2IsWinner = match.result.winner === 'team2';
  const canView = match.team1.name !== 'TBD' && match.team2.name !== 'TBD';
  
  return `
    <div class="bracket-match ${isCompleted ? 'completed' : ''}">
      <div class="bracket-match-id">${match.matchId}</div>
      
      <div class="bracket-team ${team1IsWinner ? 'winner' : ''} ${team2IsWinner ? 'loser' : ''} ${match.team1.name === 'TBD' ? 'tbd' : ''}">
        <div class="bracket-team-info">
          <div class="bracket-team-logo">
            ${match.team1.logo 
              ? `<img src="${match.team1.logo}" alt="${match.team1.name}">` 
              : '🛡️'
            }
          </div>
          <div class="bracket-team-name">${match.team1.name}</div>
        </div>
        ${isCompleted ? `<div class="bracket-team-score">${match.result.team1Score}</div>` : ''}
      </div>
      
      <div class="bracket-match-vs">VS</div>
      
      <div class="bracket-team ${team2IsWinner ? 'winner' : ''} ${team1IsWinner ? 'loser' : ''} ${match.team2.name === 'TBD' ? 'tbd' : ''}">
        <div class="bracket-team-info">
          <div class="bracket-team-logo">
            ${match.team2.logo 
              ? `<img src="${match.team2.logo}" alt="${match.team2.name}">` 
              : '🛡️'
            }
          </div>
          <div class="bracket-team-name">${match.team2.name}</div>
        </div>
        ${isCompleted ? `<div class="bracket-team-score">${match.result.team2Score}</div>` : ''}
      </div>
      
      ${canView ? `
        <div class="bracket-match-details">
          <button class="btn-bracket-details" onclick="window.location.href='matches.html?tournamentId=${tournamentId}&matchId=${match.matchId}'">
            👁️ View Details
          </button>
        </div>
      ` : ''}
    </div>
  `;
}

/**
 * Renderiza o campeão
 */
function renderChampion(finalMatch) {
  const championContainer = document.getElementById('championContainer');
  
  if (finalMatch.result.status === 'completed' && finalMatch.result.winner) {
    const winner = finalMatch.result.winner === 'team1' ? finalMatch.team1 : finalMatch.team2;
    
    championContainer.innerHTML = `
      <div class="champion-trophy">🏆</div>
      <div class="champion-name">${winner.name}</div>
      <p style="color: #aaa; margin-top: 10px;">Tournament Champion</p>
    `;
  } else {
    championContainer.innerHTML = `
      <div class="champion-trophy">🏆</div>
      <div class="champion-name">TBD</div>
      <p style="color: #888; margin-top: 10px; font-style: italic;">Awaiting Final Result</p>
    `;
  }
}

/**
 * Verifica se deve mostrar o botão de relatório final
 */
function checkReportButton(finalMatch) {
  const reportContainer = document.getElementById('tournamentReportContainer');
  
  // Se o container não existir, não fazer nada (elemento opcional)
  if (!reportContainer) {
    return;
  }
  
  // Mostrar botão apenas se o torneio estiver completo
  if (finalMatch.result.status === 'completed' && finalMatch.result.winner) {
    reportContainer.style.display = 'block';
    
    const reportButton = document.getElementById('btnGenerateReport');
    if (reportButton) {
      reportButton.onclick = () => {
        window.location.href = `tournament-report.html?id=${tournamentId}`;
      };
    }
  } else {
    reportContainer.style.display = 'none';
  }
}

// Importar funções necessárias do Firebase no topo do arquivo
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// ========================================
// MOSTRAR ERRO
// ========================================
function showError() {
  document.getElementById('loadingContainer').style.display = 'none';
  document.getElementById('errorContainer').style.display = 'block';
}