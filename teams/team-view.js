// ============================================
// TEAM VIEW - JAVASCRIPT
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
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  arrayRemove
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
let teamData = null;
let teamId = null;

// Elementos do DOM
const userMenuToggle = document.getElementById('userMenuToggle');
const userDropdown = document.getElementById('userDropdown');
const userDropdownHeader = document.getElementById('userDropdownHeader');
const authLink = document.getElementById('authLink');
const perfilLink = document.getElementById('perfilLink');

const teamLogoImg = document.getElementById('teamLogoImg');
const teamNameDisplay = document.getElementById('teamNameDisplay');
const teamCountry = document.getElementById('teamCountry');
const teamIdDisplay = document.getElementById('teamIdDisplay');
const teamCreatedInfo = document.getElementById('teamCreatedInfo');
const membersGrid = document.getElementById('membersGrid');

const btnChangeLogo = document.getElementById('btnChangeLogo');
const logoInput = document.getElementById('logoInput');
const btnAddMember = document.getElementById('btnAddMember');
const btnDeleteTeam = document.getElementById('btnDeleteTeam');
const captainControls = document.getElementById('captainControls');
const memberControls = document.getElementById('memberControls');
const btnLeaveTeam = document.getElementById('btnLeaveTeam');

const modalAddMember = document.getElementById('modalAddMember');
const btnCloseAddMember = document.getElementById('btnCloseAddMember');
const searchPlayerId = document.getElementById('searchPlayerId');
const btnSearchMember = document.getElementById('btnSearchMember');
const memberSearchResults = document.getElementById('memberSearchResults');

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
// CARREGAR DADOS DO TIME
// ========================================

async function carregarTeam() {
  try {
    console.log('🏆 Carregando time:', teamId);
    
    const teamDocRef = doc(db, "teams", teamId);
    const teamDocSnap = await getDoc(teamDocRef);
    
    if (!teamDocSnap.exists()) {
      alert('❌ Team not found');
      window.location.href = '../index.html';
      return;
    }
    
    teamData = teamDocSnap.data();
    console.log('✅ Team data:', teamData);
    
    // Atualizar interface
    teamLogoImg.src = teamData.logo;
    teamNameDisplay.textContent = teamData.teamName;
    teamIdDisplay.textContent = `ID: ${teamData.teamId}`;
    
    // País com bandeira
    const countryFlag = teamData.countryFlag || 'flag-us';
    const countryName = teamData.countryName || 'Unknown';
    teamCountry.innerHTML = `
      <span class="flag ${countryFlag}"></span>
      <span>${countryName}</span>
    `;
    
    // Informações de criação
    const createdDate = teamData.createdAt?.toDate() || new Date();
    const formattedDate = createdDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Buscar nome do criador
    const creatorDocRef = doc(db, "usuarios", teamData.createdBy);
    const creatorDocSnap = await getDoc(creatorDocRef);
    const creatorName = creatorDocSnap.exists() ? 
      creatorDocSnap.data().displayName : 'Unknown';
    
    document.getElementById('creatorName').textContent = creatorName;
    document.getElementById('createdDate').textContent = formattedDate;
    
    // Renderizar membros
    await renderizarMembros();
    await carregarTorneiosAtivos(teamId);
    
    // Verificar se e capitao OU membro
    if (currentUser) {
      if (teamData.captainId === currentUser.uid) {
        // E o capitao
        mostrarControlesCapitao();
      } else {
        // E um membro normal (nao-capitao)
        const isMember = teamData.members.some(m => 
          m.userId === currentUser.uid && m.status === 'accepted'
        );
        
        if (isMember) {
          mostrarControlesMembro();
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Erro ao carregar time:', error);
    alert('❌ Error loading team');
    window.location.href = '../index.html';
  }
}

// ========================================
// RENDERIZAR MEMBROS
// ========================================

async function renderizarMembros() {
  try {
    membersGrid.innerHTML = '<div class="members-loading">Loading members...</div>';
    
    if (!teamData.members || teamData.members.length === 0) {
      membersGrid.innerHTML = '<div class="members-loading">No members yet</div>';
      return;
    }
    
    const membersHTML = await Promise.all(
      teamData.members.map(async (member) => {
        const isCaptain = member.userId === teamData.captainId;
        const isPending = member.status === 'pending';
        
        return `
          <div class="member-card ${isCaptain ? 'captain' : ''} ${isPending ? 'pending' : ''}"
               onclick="${!isPending ? `window.location.href='../perfil/perfil-view.html?uid=${member.userId}'` : ''}">
            ${isCaptain ? '<div class="captain-badge">CAPTAIN</div>' : ''}
            ${isPending ? '<div class="pending-badge">Pending</div>' : ''}
            
            <div class="member-avatar">
              <img src="${member.avatar || '../estatisticas-shad/images/backgrounds/pikachu-left-bg.png'}" 
                   alt="${member.displayName}">
            </div>
            
            <div class="member-info">
              <p class="member-name">${member.displayName || 'Anonymous'}</p>
              <p class="member-id">ID: ${member.playerId || 'N/A'}</p>
            </div>
            
            ${currentUser && teamData.captainId === currentUser.uid ? `
              <div class="member-actions" onclick="event.stopPropagation();">
                ${!isCaptain && !isPending ? `
                  <button class="btn-set-captain" onclick="setarCapitao('${member.userId}')">
                    Set Captain
                  </button>
                ` : ''}
                ${member.userId !== currentUser.uid ? `
                  <button class="btn-remove-member" onclick="removerMembro('${member.userId}')">
                    ${isPending ? 'Cancel Invite' : 'Remove'}
                  </button>
                ` : ''}
              </div>
            ` : ''}
          </div>
        `;
      })
    );
    
    membersGrid.innerHTML = membersHTML.join('');
    
  } catch (error) {
    console.error('❌ Erro ao renderizar membros:', error);
    membersGrid.innerHTML = '<div class="members-loading" style="color: #ff6b6b;">❌ Error loading members</div>';
  }
}

// ========================================
// CONTROLES DO CAPITÃO
// ========================================

function mostrarControlesCapitao() {
  btnChangeLogo.style.display = 'inline-block';
  btnAddMember.style.display = 'inline-block';
  captainControls.style.display = 'block';
}

function mostrarControlesMembro() {
  memberControls.style.display = 'block';
  console.log('Controles de membro exibidos');
}

// Trocar logo do time
btnChangeLogo.addEventListener('click', () => {
  logoInput.click();
});

logoInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  
  if (!file) return;
  
  if (!file.type.startsWith('image/')) {
    alert('⚠️ Please select a valid image');
    return;
  }
  
  if (file.size > 2 * 1024 * 1024) {
    alert('⚠️ Image too large. Max: 2MB');
    return;
  }
  
  try {
    btnChangeLogo.disabled = true;
    btnChangeLogo.textContent = '⏳ Uploading...';
    
    // Converter para base64
    const reader = new FileReader();
    reader.onload = async (event) => {
      const logoBase64 = event.target.result;
      
      // Atualizar no Firestore
      const teamDocRef = doc(db, "teams", teamId);
      await updateDoc(teamDocRef, {
        logo: logoBase64
      });
      
      // Atualizar interface
      teamLogoImg.src = logoBase64;
      teamData.logo = logoBase64;
      
      console.log('✅ Logo atualizada');
      alert('✅ Logo updated successfully!');
      
      btnChangeLogo.disabled = false;
      btnChangeLogo.textContent = '📷 Change Logo';
    };
    
    reader.readAsDataURL(file);
    
  } catch (error) {
    console.error('❌ Erro ao atualizar logo:', error);
    alert('❌ Error updating logo: ' + error.message);
    btnChangeLogo.disabled = false;
    btnChangeLogo.textContent = '📷 Change Logo';
  }
});

// Adicionar membro
btnAddMember.addEventListener('click', () => {
  modalAddMember.classList.add('show');
});

btnCloseAddMember.addEventListener('click', () => {
  modalAddMember.classList.remove('show');
  searchPlayerId.value = '';
  memberSearchResults.innerHTML = '';
});

modalAddMember.addEventListener('click', (e) => {
  if (e.target === modalAddMember) {
    modalAddMember.classList.remove('show');
    searchPlayerId.value = '';
    memberSearchResults.innerHTML = '';
  }
});

// Buscar jogador para adicionar
async function buscarJogadorParaAdicionar() {
  const playerId = searchPlayerId.value.trim().toUpperCase();
  
  if (!playerId || playerId.length < 5 || playerId.length > 7) {
    memberSearchResults.innerHTML = '<div style="color: #888; padding: 10px; text-align: center;">ID must be 5-7 characters</div>';
    return;
  }
  
  try {
    memberSearchResults.innerHTML = '<div style="color: #ffad00; padding: 10px; text-align: center;">🔍 Searching...</div>';
    
    const usuariosRef = collection(db, "usuarios");
    const q = query(usuariosRef, where("playerId", "==", playerId));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      memberSearchResults.innerHTML = '<div style="color: #888; padding: 10px; text-align: center;">❌ Player not found</div>';
      return;
    }
    
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    const userId = userDoc.id;
    
    // Verificar se já está no time
    if (teamData.members.find(m => m.userId === userId)) {
      memberSearchResults.innerHTML = '<div style="color: #ff6b6b; padding: 10px; text-align: center;">⚠️ Player already in team</div>';
      return;
    }
    
    // Verificar se já tem 8 membros
    if (teamData.members.length >= 8) {
      memberSearchResults.innerHTML = '<div style="color: #ff6b6b; padding: 10px; text-align: center;">⚠️ Team is full (8/8)</div>';
      return;
    }
    
    // Exibir resultado
    memberSearchResults.innerHTML = `
      <div class="player-result-item" onclick="adicionarMembroAoTime('${userId}', '${userData.displayName}', '${userData.playerId}', '${userData.avatar}')">
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
    memberSearchResults.innerHTML = '<div style="color: #ff6b6b; padding: 10px; text-align: center;">❌ Search error</div>';
  }
}

// Tornar função global
window.adicionarMembroAoTime = async function(userId, displayName, playerId, avatar) {
  try {
    const confirmar = confirm(`Add ${displayName} to the team?`);
    if (!confirmar) return;
    
    // Adicionar membro ao time
    const newMember = {
      userId,
      displayName,
      playerId,
      avatar,
      status: 'pending',
      joinedAt: null
    };
    
    const teamDocRef = doc(db, "teams", teamId);
    await updateDoc(teamDocRef, {
      members: [...teamData.members, newMember]
    });
    
    // Enviar convite ao jogador
    const playerDocRef = doc(db, "usuarios", userId);
    await updateDoc(playerDocRef, {
      pendingTeamInvite: {
        teamId,
        teamName: teamData.teamName,
        invitedBy: currentUser.uid,
        invitedAt: new Date()
      }
    });
    
    console.log('✅ Membro adicionado:', displayName);
    alert('✅ Player invited successfully!');
    
    // Fechar modal e recarregar
    modalAddMember.classList.remove('show');
    searchPlayerId.value = '';
    memberSearchResults.innerHTML = '';
    
    await carregarTeam();
    
  } catch (error) {
    console.error('❌ Erro ao adicionar membro:', error);
    alert('❌ Error inviting player: ' + error.message);
  }
};

btnSearchMember.addEventListener('click', buscarJogadorParaAdicionar);

searchPlayerId.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    buscarJogadorParaAdicionar();
  }
});

searchPlayerId.addEventListener('input', (e) => {
  e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (e.target.value.length > 7) {
    e.target.value = e.target.value.slice(0, 7);
  }
});

// Setar capitão
window.setarCapitao = async function(userId) {
  try {
    const member = teamData.members.find(m => m.userId === userId);
    const confirmar = confirm(
      `⚠️ SET ${member.displayName.toUpperCase()} AS CAPTAIN?\n\n` +
      '🔴 WARNING: You will LOSE all captain privileges!\n' +
      '   • You will NOT be able to add/remove members\n' +
      '   • You will NOT be able to delete the team\n' +
      '   • You will NOT be able to change the logo\n\n' +
      'This action is IRREVERSIBLE!\n\n' +
      'Type "CONFIRM" to proceed:'
    );
    
    if (!confirmar) return;
    
    const confirmText = prompt('Type "CONFIRM" to set new captain:');
    if (confirmText !== 'CONFIRM') {
      alert('❌ Action cancelled');
      return;
    }
    
    const teamDocRef = doc(db, "teams", teamId);
    await updateDoc(teamDocRef, {
      captainId: userId
    });
    
    console.log('✅ Capitão alterado:', userId);
    alert('✅ Captain updated successfully!\n\n⚠️ You are no longer the captain.');
    
    // Recarregar página para atualizar interface
    window.location.reload();
    
  } catch (error) {
    console.error('❌ Erro ao setar capitão:', error);
    alert('❌ Error updating captain: ' + error.message);
  }
};

window.removerMembro = async function(userId) {
  try {
    const member = teamData.members.find(m => m.userId === userId);
    const isPending = member.status === 'pending';
    
    // Mensagem diferente para pending vs accepted
    const confirmMessage = isPending 
      ? `Cancel invitation to ${member.displayName}?`
      : `Remove ${member.displayName} from the team?`;
    
    const confirmar = confirm(confirmMessage);
    
    if (!confirmar) return;
    
    console.log(`${isPending ? 'Cancelando convite' : 'Removendo membro'}:`, member.displayName);
    
    // PASSO 1: Remover/Limpar convite do documento do jogador
    try {
      const playerDocRef = doc(db, "usuarios", userId);
      const playerDocSnap = await getDoc(playerDocRef);
      
      if (playerDocSnap.exists()) {
        // Se for pending, limpar APENAS o pendingTeamInvite
        // Se for accepted, limpar TUDO (teamId, teamStatus, pendingTeamInvite)
        
        if (isPending) {
          // Cancelar convite pendente
          await updateDoc(playerDocRef, {
            pendingTeamInvite: null
          });
          console.log('Convite cancelado do documento do jogador');
        } else {
          // Remover membro aceito
          await updateDoc(playerDocRef, {
            teamId: null,
            teamStatus: null,
            pendingTeamInvite: null
          });
          console.log('Jogador removido do documento usuarios');
        }
      }
    } catch (playerError) {
      console.error('Erro ao atualizar jogador:', playerError);
      // Continua mesmo se der erro
    }
    
    // PASSO 2: Remover da lista de membros do time
    const updatedMembers = teamData.members.filter(m => m.userId !== userId);
    
    const teamDocRef = doc(db, "teams", teamId);
    await updateDoc(teamDocRef, {
      members: updatedMembers
    });
    
    console.log('Membro removido da lista do time');
    alert(isPending ? 'Invitation cancelled!' : 'Player removed successfully!');
    
    // Recarregar pagina
    window.location.reload();
    
  } catch (error) {
    console.error('Erro ao remover membro:', error);
    
    if (error.code === 'permission-denied') {
      alert('Permission denied! Only the current captain can remove members.');
    } else {
      alert(`Error: ${error.message}`);
    }
  }
};

// Deletar time
btnDeleteTeam.addEventListener('click', async () => {
  try {
    // 🔥 VERIFICAR SE O TIME ESTÁ EM TORNEIOS ATIVOS
    console.log('🔍 Verificando participação em torneios...');
    
    const tournamentsRef = collection(db, "tournaments");
    const tournamentsSnap = await getDocs(tournamentsRef);
    
    let activeTournamentCount = 0;
    const activeTournamentNames = [];
    
    tournamentsSnap.forEach(docSnap => {
      const tournamentData = docSnap.data();
      
      // Verificar se o time está participando E se o torneio está ativo
      if (tournamentData.status === 'upcoming' || tournamentData.status === 'ongoing') {
        if (tournamentData.teams && tournamentData.teams.length > 0) {
          const isParticipating = tournamentData.teams.some(team => 
            team.teamId === teamId || 
            (team.isRegisteredTeam && team.teamId === teamId)
          );
          
          if (isParticipating) {
            activeTournamentCount++;
            activeTournamentNames.push(tournamentData.name);
          }
        }
      }
    });
    
    // 🚫 SE HOUVER TORNEIOS ATIVOS, BLOQUEAR EXCLUSÃO
    if (activeTournamentCount > 0) {
      const tournamentList = activeTournamentNames.map((name, i) => `  ${i + 1}. ${name}`).join('\n');
      
      alert(
        `🚫 CANNOT DELETE TEAM\n\n` +
        `This team is currently participating in ${activeTournamentCount} active tournament(s):\n\n` +
        `${tournamentList}\n\n` +
        `⚠️ You must wait until all tournaments are completed before deleting the team.\n\n` +
        `Team deletion is temporarily locked for competitive integrity.`
      );
      
      console.warn('⚠️ Exclusão bloqueada - Time em torneios ativos:', activeTournamentNames);
      return;
    }
    
    // ✅ SE NÃO HOUVER TORNEIOS ATIVOS, PERMITIR EXCLUSÃO
    const confirmar = confirm(
      `⚠️ DELETE TEAM "${teamData.teamName}"?\n\n` +
      'This action CANNOT be undone!\n' +
      'All members will be removed from the team.\n\n' +
      'Type "DELETE" to confirm:'
    );
    
    if (!confirmar) return;
    
    const confirmText = prompt('Type "DELETE" to confirm:');
    if (confirmText !== 'DELETE') {
      alert('❌ Deletion cancelled');
      return;
    }
    
    // Remover time de todos os membros
    for (const member of teamData.members) {
      try {
        const memberDocRef = doc(db, "usuarios", member.userId);
        await updateDoc(memberDocRef, {
          teamId: null,
          teamStatus: null,
          pendingTeamInvite: null
        });
      } catch (error) {
        console.error('Erro ao remover membro:', member.userId, error);
      }
    }
    
    // Deletar documento do time
    const teamDocRef = doc(db, "teams", teamId);
    await deleteDoc(teamDocRef);
    
    console.log('✅ Time deletado:', teamId);
    alert('✅ Team deleted successfully');
    
    window.location.href = '../perfil/perfil.html';
    
  } catch (error) {
    console.error('❌ Erro ao deletar time:', error);
    alert('❌ Error deleting team: ' + error.message);
  }
});

// ========================================
// SAIR DO TIME (LEAVE TEAM)
// ========================================

btnLeaveTeam.addEventListener('click', async () => {
  try {
    const confirmar = confirm(
      `LEAVE TEAM "${teamData.teamName}"?\n\n` +
      'Are you sure you want to leave this team?\n' +
      'You will need to be invited again to rejoin.\n\n' +
      'Type "LEAVE" to confirm:'
    );
    
    if (!confirmar) return;
    
    const confirmText = prompt('Type "LEAVE" to confirm:');
    if (confirmText !== 'LEAVE') {
      alert('Action cancelled');
      return;
    }
    
    console.log('Saindo do time...');
    
    btnLeaveTeam.disabled = true;
    btnLeaveTeam.textContent = 'Leaving...';
    
    // PASSO 1: Remover do documento do usuario
    const userDocRef = doc(db, "usuarios", currentUser.uid);
    await updateDoc(userDocRef, {
      teamId: null,
      teamStatus: null,
      pendingTeamInvite: null
    });
    
    console.log('Dados do usuario limpos');
    
    // PASSO 2: Remover da lista de membros do time
    const updatedMembers = teamData.members.filter(m => m.userId !== currentUser.uid);
    
    const teamDocRef = doc(db, "teams", teamId);
    await updateDoc(teamDocRef, {
      members: updatedMembers
    });
    
    console.log('Removido da lista de membros');
    alert('You left the team successfully!');
    
    // Redirecionar para perfil
    window.location.href = '../perfil/perfil.html';
    
  } catch (error) {
    console.error('Erro ao sair do time:', error);
    alert('Error leaving team: ' + error.message);
    btnLeaveTeam.disabled = false;
    btnLeaveTeam.textContent = 'Leave Team';
  }
});

// ========================================
// CARREGAR TORNEIOS ATIVOS
// ========================================
async function carregarTorneiosAtivos(teamIdValue) {
  try {
    console.log('🏆 Carregando torneios ativos para time:', teamIdValue);
    
    const activeTournamentsContainer = document.getElementById('activeTournamentsContainer');
    const activeTournamentsList = document.getElementById('activeTournamentsList');
    const achievementsPlaceholder = document.getElementById('achievementsPlaceholder');
    
    // Buscar todos os torneios
    const tournamentsRef = collection(db, "tournaments");
    const tournamentsSnap = await getDocs(tournamentsRef);
    
    if (tournamentsSnap.empty) {
      console.log('ℹ️ Nenhum torneio encontrado');
      return;
    }
    
    // Filtrar torneios onde este time está participando
    const activeTournaments = [];
    
    tournamentsSnap.forEach(docSnap => {
      const tournamentData = docSnap.data();
      const tournamentId = docSnap.id;
      
      // Verificar se o time está nos times cadastrados
      if (tournamentData.teams && tournamentData.teams.length > 0) {
        const isParticipating = tournamentData.teams.some(team => 
          team.teamId === teamIdValue || 
          (team.isRegisteredTeam && team.teamId === teamIdValue)
        );
        
        // ✅ Mostra AMBOS: upcoming E ongoing
        if (isParticipating && 
          (tournamentData.status === 'upcoming' || tournamentData.status === 'ongoing')) {
          
          // Adiciona à lista de torneios ativos
          activeTournaments.push({
            id: tournamentId,
            ...tournamentData
          });
        }
      }
    });
    
    console.log(`✅ ${activeTournaments.length} torneio(s) ativo(s) encontrado(s)`);
    
    if (activeTournaments.length === 0) {
      return;
    }
    
    // Renderizar torneios ativos
    activeTournamentsList.innerHTML = activeTournaments.map(tournament => {
      const startDate = tournament.startDate || 'TBD';
      const endDate = tournament.endDate || 'TBD';
      
      // Encontrar grupo do time
      let teamGroup = 'TBD';
      if (tournament.groups) {
        Object.entries(tournament.groups).forEach(([groupLetter, teams]) => {
          if (teams.some(team => team.teamId === teamIdValue)) {
            teamGroup = `Group ${groupLetter}`;
          }
        });
      }
      
      return `
        <div class="active-tournament-card" onclick="window.location.href='../torneios/tournament-view.html?id=${tournament.id}'">
          <div class="tournament-card-header">
            <div class="tournament-logo">
              <img src="${tournament.logoUrl}" alt="${tournament.name}" 
                   onerror="this.src='../img-site/placeholder-tournament.png'">
            </div>
            <div class="tournament-info">
              <h5 class="tournament-name">${tournament.name}</h5>
              <span class="tournament-status">
                <span class="tournament-status-dot"></span>
                ONGOING
              </span>
            </div>
          </div>
          
          <div class="tournament-details">
            <div class="tournament-detail-item">
              <span class="tournament-detail-label">Group:</span>
              <span class="tournament-detail-value">${teamGroup}</span>
            </div>
            <div class="tournament-detail-item">
              <span class="tournament-detail-label">Period:</span>
              <span class="tournament-detail-value">${startDate} - ${endDate}</span>
            </div>
            <div class="tournament-detail-item">
              <span class="tournament-detail-label">Teams:</span>
              <span class="tournament-detail-value">${tournament.teams.length}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
    
    // Mostrar seção e ocultar placeholder
    activeTournamentsContainer.style.display = 'block';
    achievementsPlaceholder.style.display = 'none';
    
  } catch (error) {
    console.error('❌ Erro ao carregar torneios ativos:', error);
  }
}
// ========================================
// INICIALIZAÇÃO
// ========================================

onAuthStateChanged(auth, async (user) => {
  currentUser = user;
  atualizarMenuUsuario(user);
  
  // Pegar teamId da URL
  const urlParams = new URLSearchParams(window.location.search);
  teamId = urlParams.get('teamId');
  
  if (!teamId) {
    alert('❌ Team ID not found');
    window.location.href = '../index.html';
    return;
  }
  
  await carregarTeam();
});