// ============================================
// CREATE TEAM - JAVASCRIPT
// ============================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyC9LLCXrQTHBagQxaChBazSfS5E4gUPIoI",
  authDomain: "site-grn.firebaseapp.com",
  projectId: "site-grn",
  storageBucket: "site-grn.firebasestorage.app",
  messagingSenderId: "27613322806",
  appId: "1:27613322806:web:ad4dc08ce043f19d530297",
  measurementId: "G-84NHN394WF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

let currentUser = null;
let selectedPlayers = [];
let captainUserId = null;
let logoFile = null;
let logoBase64 = null;

// Elementos do DOM
const userMenuToggle = document.getElementById('userMenuToggle');
const userDropdown = document.getElementById('userDropdown');
const userDropdownHeader = document.getElementById('userDropdownHeader');
const authLink = document.getElementById('authLink');
const perfilLink = document.getElementById('perfilLink');

const logoInput = document.getElementById('logoInput');
const btnUploadLogo = document.getElementById('btnUploadLogo');
const logoPreview = document.getElementById('logoPreview');
const teamNameInput = document.getElementById('teamName');
const teamCountrySelect = document.getElementById('teamCountry');
const generatedTeamId = document.getElementById('generatedTeamId');
const btnRegenerateId = document.getElementById('btnRegenerateId');
const playerSearchInput = document.getElementById('playerSearchInput');
const btnSearchPlayer = document.getElementById('btnSearchPlayer');
const playerSearchResults = document.getElementById('playerSearchResults');
const playersList = document.getElementById('playersList');
const playersCount = document.getElementById('playersCount');
const btnCreateTeam = document.getElementById('btnCreateTeam');

// ========================================
// MENU DROPDOWN
// ========================================

userMenuToggle.addEventListener('click', function(e) {
  e.stopPropagation();
  this.classList.toggle('active');
  userDropdown.classList.toggle('show');
});

document.addEventListener('click', function(e) {
  if (!userMenuToggle.contains(e.target) && !userDropdown.contains(e.target)) {
    userMenuToggle.classList.remove('active');
    userDropdown.classList.remove('show');
  }
});

userDropdown.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', function() {
    userMenuToggle.classList.remove('active');
    userDropdown.classList.remove('show');
  });
});

async function handleLogout() {
  const confirmar = confirm('Deseja realmente fazer logout?');
  if (confirmar) {
    try {
      localStorage.removeItem('userDisplayName');
      localStorage.removeItem('userAvatar');
      await signOut(auth);
      alert('Logout realizado com sucesso!');
      window.location.href = '../index.html';
    } catch (error) {
      console.error('Erro no logout:', error);
      alert('Erro ao fazer logout. Tente novamente.');
    }
  }
}

async function atualizarMenuUsuario(user) {
  if (user) {
    try {
      const userDocRef = doc(db, "usuarios", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      
      let displayName = user.displayName || user.email.split('@')[0];
      let avatarPath = '../estatisticas-shad/images/backgrounds/pikachu-left-bg.png';
      
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        if (userData.displayName) displayName = userData.displayName;
        if (userData.avatar) avatarPath = userData.avatar;
      }
      
      userDropdownHeader.innerHTML = `
        <img src="${avatarPath}" alt="Avatar" class="dropdown-avatar">
        <span>Olá, ${displayName}!</span>
      `;
      
      authLink.textContent = 'Logout';
      authLink.onclick = function(e) {
        e.preventDefault();
        handleLogout();
      };
      perfilLink.style.display = 'block';
      
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      userDropdownHeader.innerHTML = `<span>Olá, ${user.displayName || user.email.split('@')[0]}!</span>`;
    }
  } else {
    userDropdownHeader.innerHTML = '<span>Olá, visitante!</span>';
    authLink.textContent = 'Login';
    authLink.onclick = function(e) {
      e.preventDefault();
      window.location.href = '../login/login.html';
    };
    perfilLink.style.display = 'none';
  }
}

// ========================================
// GERAR TEAM ID
// ========================================

function gerarTeamId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

function regenerarTeamId() {
  const newId = gerarTeamId();
  generatedTeamId.textContent = newId;
  console.log('✅ Novo Team ID gerado:', newId);
}

btnRegenerateId.addEventListener('click', regenerarTeamId);

// ========================================
// UPLOAD DE LOGO
// ========================================

btnUploadLogo.addEventListener('click', () => {
  logoInput.click();
});

logoInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  
  if (!file) return;
  
  if (!file.type.startsWith('image/')) {
    alert('⚠️ Please select a valid image file');
    return;
  }
  
  if (file.size > 2 * 1024 * 1024) {
    alert('⚠️ Image is too large. Maximum size: 2MB');
    return;
  }
  
  logoFile = file;
  
  // Converter para base64
  const reader = new FileReader();
  reader.onload = (e) => {
    logoBase64 = e.target.result;
    logoPreview.innerHTML = `<img src="${logoBase64}" alt="Team Logo">`;
    console.log('✅ Logo carregada');
  };
  reader.readAsDataURL(file);
});

// ========================================
// BUSCAR JOGADORES
// ========================================

async function buscarJogador() {
  const playerId = playerSearchInput.value.trim().toUpperCase();
  
  if (!playerId) {
    playerSearchResults.innerHTML = '';
    return;
  }
  
  if (playerId.length < 5 || playerId.length > 7) {
    playerSearchResults.innerHTML = '<div style="color: #888; padding: 10px; text-align: center;">ID must be 5-7 characters</div>';
    return;
  }
  
  try {
    playerSearchResults.innerHTML = '<div style="color: #ffad00; padding: 10px; text-align: center;">🔍 Searching...</div>';
    
    const usuariosRef = collection(db, "usuarios");
    const q = query(usuariosRef, where("playerId", "==", playerId));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      playerSearchResults.innerHTML = '<div style="color: #888; padding: 10px; text-align: center;">❌ Player not found</div>';
      return;
    }
    
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    const userId = userDoc.id;
    
    // Verificar se já está na lista
    if (selectedPlayers.find(p => p.userId === userId)) {
      playerSearchResults.innerHTML = '<div style="color: #ff6b6b; padding: 10px; text-align: center;">⚠️ Player already added</div>';
      return;
    }
    
    // Verificar se já tem 8 jogadores
    if (selectedPlayers.length >= 8) {
      playerSearchResults.innerHTML = '<div style="color: #ff6b6b; padding: 10px; text-align: center;">⚠️ Team is full (8/8)</div>';
      return;
    }
    
    // Exibir resultado
    playerSearchResults.innerHTML = `
      <div class="player-result-item" onclick="adicionarJogador('${userId}', '${userData.displayName}', '${userData.playerId}', '${userData.avatar}')">
        <div class="player-result-avatar">
          <img src="${userData.avatar || '../estatisticas-shad/images/backgrounds/pikachu-left-bg.png'}" alt="${userData.displayName}">
        </div>
        <div class="player-result-info">
          <p class="player-result-name">${userData.displayName || 'Anonymous'}</p>
          <p class="player-result-id">ID: ${userData.playerId}</p>
        </div>
      </div>
    `;
    
  } catch (error) {
    console.error('❌ Erro ao buscar jogador:', error);
    playerSearchResults.innerHTML = '<div style="color: #ff6b6b; padding: 10px; text-align: center;">❌ Search error</div>';
  }
}

// Tornar função global
window.adicionarJogador = function(userId, displayName, playerId, avatar) {
  if (selectedPlayers.length >= 8) {
    alert('⚠️ Team is full (8/8)');
    return;
  }
  
  const player = {
    userId,
    displayName: displayName || 'Anonymous',
    playerId,
    avatar: avatar || '../estatisticas-shad/images/backgrounds/pikachu-left-bg.png'
  };
  
  selectedPlayers.push(player);
  
  // Se é o primeiro jogador e é o criador, setar como capitão
  if (selectedPlayers.length === 1 && currentUser && userId === currentUser.uid) {
    captainUserId = userId;
  }
  
  renderizarListaJogadores();
  playerSearchInput.value = '';
  playerSearchResults.innerHTML = '';
  
  console.log('✅ Jogador adicionado:', player);
};

btnSearchPlayer.addEventListener('click', buscarJogador);

playerSearchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    buscarJogador();
  }
});

playerSearchInput.addEventListener('input', (e) => {
  e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (e.target.value.length > 7) {
    e.target.value = e.target.value.slice(0, 7);
  }
});

// ========================================
// RENDERIZAR LISTA DE JOGADORES
// ========================================

function renderizarListaJogadores() {
  playersCount.textContent = selectedPlayers.length;
  
  if (selectedPlayers.length === 0) {
    playersList.innerHTML = '<div class="no-players-message">No players added yet</div>';
    return;
  }
  
  playersList.innerHTML = selectedPlayers.map((player, index) => {
    const isCaptain = player.userId === captainUserId;
    
    return `
      <div class="player-item ${isCaptain ? 'captain' : ''}" data-user-id="${player.userId}">
        <div class="player-item-avatar">
          <img src="${player.avatar}" alt="${player.displayName}">
        </div>
        <div class="player-item-info">
          <p class="player-item-name">
            ${player.displayName}
            ${isCaptain ? '<span class="captain-badge">C</span>' : ''}
          </p>
          <p class="player-item-id">ID: ${player.playerId}</p>
        </div>
        <div class="player-item-actions">
          ${!isCaptain ? `
            <button class="btn-set-captain" onclick="setarCapitao('${player.userId}')">
              👑 Captain
            </button>
          ` : ''}
          <button class="btn-remove-player" onclick="removerJogador(${index})">
            ❌ Remove
          </button>
        </div>
      </div>
    `;
  }).join('');
}

window.setarCapitao = function(userId) {
  captainUserId = userId;
  renderizarListaJogadores();
  console.log('👑 Capitão setado:', userId);
};

window.removerJogador = function(index) {
  const player = selectedPlayers[index];
  
  // Se remover o capitão, limpar
  if (player.userId === captainUserId) {
    captainUserId = null;
  }
  
  selectedPlayers.splice(index, 1);
  renderizarListaJogadores();
  
  console.log('❌ Jogador removido:', player);
};

// ========================================
// CRIAR TIME
// ========================================

btnCreateTeam.addEventListener('click', async () => {
  try {
    // Validações
    const teamName = teamNameInput.value.trim();
    const teamCountry = teamCountrySelect.value;
    const teamId = generatedTeamId.textContent;
    
    if (!teamName) {
      alert('⚠️ Please enter team name');
      teamNameInput.focus();
      return;
    }
    
    if (!teamCountry) {
      alert('⚠️ Please select a country');
      teamCountrySelect.focus();
      return;
    }
    
    if (!logoBase64) {
      alert('⚠️ Please upload a team logo');
      return;
    }
    
    if (selectedPlayers.length === 0) {
      alert('⚠️ Please add at least one player');
      return;
    }
    
    if (!captainUserId) {
      alert('⚠️ Please select a team captain');
      return;
    }
    
    if (!currentUser) {
      alert('❌ You must be logged in');
      return;
    }

    // Obter nome e flag do país selecionado
    const selectedOption = teamCountrySelect.options[teamCountrySelect.selectedIndex];
    const countryName = selectedOption.text;
    const countryFlag = selectedOption.getAttribute('data-flag');
    
    // Confirmação
    const confirmar = confirm(
      `Create team "${teamName}"?\n\n` +
      `Country: ${countryName}\n` +
      `Team ID: ${teamId}\n` +
      `Players: ${selectedPlayers.length}\n` +
      `Captain: ${selectedPlayers.find(p => p.userId === captainUserId)?.displayName}`
    );
    
    if (!confirmar) return;
    
    btnCreateTeam.disabled = true;
    btnCreateTeam.textContent = '⏳ Creating...';
    
    console.log('📝 Criando time...');
    
    // Criar documento do time
    const teamDocRef = doc(db, "teams", teamId);
    
    const teamData = {
      teamId,
      teamName,
      country: teamCountry,
      countryName: countryName,
      countryFlag: countryFlag,
      logo: logoBase64,
      createdBy: currentUser.uid,
      createdAt: new Date(),
      captainId: captainUserId,
      members: selectedPlayers.map(p => ({
        userId: p.userId,
        displayName: p.displayName,
        playerId: p.playerId,
        avatar: p.avatar,
        status: p.userId === currentUser.uid ? 'accepted' : 'pending',
        joinedAt: p.userId === currentUser.uid ? new Date() : null
      }))
    };
    
    await setDoc(teamDocRef, teamData);
    
    console.log('✅ Time criado no Firestore');
    
    // Atualizar documento do criador
    const creatorDocRef = doc(db, "usuarios", currentUser.uid);
    await updateDoc(creatorDocRef, {
      teamId: teamId,
      teamStatus: 'accepted'
    });
    
    console.log('✅ Criador vinculado ao time');
    
    // Enviar convites para outros jogadores
    for (const player of selectedPlayers) {
      if (player.userId !== currentUser.uid) {
        const playerDocRef = doc(db, "usuarios", player.userId);
        await updateDoc(playerDocRef, {
          pendingTeamInvite: {
            teamId,
            teamName,
            invitedBy: currentUser.uid,
            invitedAt: new Date()
          }
        });
        console.log(`📧 Convite enviado para: ${player.displayName}`);
      }
    }
    
    alert('✅ Team created successfully!');
    window.location.href = 'perfil.html';
    
  } catch (error) {
    console.error('❌ Erro ao criar time:', error);
    alert('❌ Error creating team: ' + error.message);
    btnCreateTeam.disabled = false;
    btnCreateTeam.textContent = '✅ Create Team';
  }
});

// ========================================
// INICIALIZAÇÃO
// ========================================

onAuthStateChanged(auth, async (user) => {
  currentUser = user;
  atualizarMenuUsuario(user);
  
  if (!user) {
    alert('❌ You must be logged in to create a team');
    window.location.href = '../login/login.html';
    return;
  }
  
  // Gerar Team ID inicial
  regenerarTeamId();
  
  // Adicionar usuário atual automaticamente
  try {
    const userDocRef = doc(db, "usuarios", user.uid);
    const userDocSnap = await getDoc(userDocRef);
    
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      
      if (userData.playerId) {
        window.adicionarJogador(
          user.uid,
          userData.displayName || user.displayName || user.email.split('@')[0],
          userData.playerId,
          userData.avatar || '../estatisticas-shad/images/backgrounds/pikachu-left-bg.png'
        );
        
        console.log('✅ Usuário atual adicionado automaticamente');
      }
    }
  } catch (error) {
    console.error('❌ Erro ao adicionar usuário atual:', error);
  }
});