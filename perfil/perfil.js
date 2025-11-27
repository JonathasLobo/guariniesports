// ============================================
// BATTLE RIBBONS LIST - PERFIL.JS
// ============================================

// Variáveis globais para controle de ribbons
let ribbonState = {
  gold: [],
  blue: [],
  green: []
};

let currentTierEditing = null;
let globalPokemonList = [];
let globalDb = null;
let globalUserId = null;

// ============================================
// INICIALIZAÇÃO
// ============================================

// Função para inicializar o sistema de ribbons
export function initRibbons(userId, pokemonList, db) {
  console.log('🎀 Inicializando Battle Ribbons System...');
  
  // Salvar referências globais
  globalPokemonList = pokemonList;
  globalDb = db;
  globalUserId = userId;
  
  // Elementos do DOM
  const modalRibbonPokemon = document.getElementById('modalRibbonPokemon');
  const btnCloseRibbonModal = document.getElementById('btnCloseRibbonModal');
  const btnSaveRibbons = document.getElementById('btnSaveRibbons');
  
  // Verificar se elementos existem
  if (!modalRibbonPokemon) {
    console.error('❌ Elementos do modal de ribbons não encontrados');
    return;
  }
  
  // Carregar ribbons do usuário
  carregarRibbons(userId, db);
  
  // Fechar modal
  if (btnCloseRibbonModal) {
    btnCloseRibbonModal.addEventListener('click', () => {
      modalRibbonPokemon.classList.remove('show');
      currentTierEditing = null;
    });
  }
  
  // Fechar modal ao clicar fora
  modalRibbonPokemon.addEventListener('click', (e) => {
    if (e.target === modalRibbonPokemon) {
      modalRibbonPokemon.classList.remove('show');
      currentTierEditing = null;
    }
  });
  
  // Salvar ribbons
  if (btnSaveRibbons) {
    btnSaveRibbons.addEventListener('click', () => {
      salvarRibbons(userId, db);
    });
  }

    // Adicionar evento de clique no documento (ADICIONAR AQUI)
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.ribbon-pokemon-item') && !e.target.closest('.modal-overlay')) {
      document.querySelectorAll('.ribbon-pokemon-item.show-delete').forEach(item => {
        item.classList.remove('show-delete');
      });
    }
  });
  
  console.log('✅ Battle Ribbons System inicializado');
}

// ============================================
// CARREGAR RIBBONS DO FIRESTORE
// ============================================

async function carregarRibbons(userId, db) {
  try {
    console.log('📥 Carregando ribbons do usuário:', userId);
    
    const { doc, getDoc } = await import("https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js");
    
    const userDocRef = doc(db, "usuarios", userId);
    const userDocSnap = await getDoc(userDocRef);
    
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      
      if (userData.battleRibbons) {
        ribbonState = userData.battleRibbons;
        console.log('✅ Ribbons carregadas:', ribbonState);
        
        // Renderizar ribbons
        renderizarRibbons();
      } else {
        console.log('ℹ️ Usuário não possui ribbons cadastradas');
        // Renderizar vazio
        renderizarRibbons();
      }
    } else {
      // Renderizar vazio
      renderizarRibbons();
    }
  } catch (error) {
    console.error('❌ Erro ao carregar ribbons:', error);
    // Renderizar vazio em caso de erro
    renderizarRibbons();
  }
}

// ============================================
// ABRIR MODAL DE SELEÇÃO DE POKÉMON
// ============================================

function abrirModalPokemon(tier) {
  currentTierEditing = tier;
  const modalRibbonPokemon = document.getElementById('modalRibbonPokemon');
  const ribbonPokemonGrid = document.getElementById('ribbonPokemonGrid');
  
  console.log(`🎯 Abrindo modal para tier: ${tier}`);
  
  // Limpar grid
  ribbonPokemonGrid.innerHTML = '';
  
  // Obter pokémons já selecionados em todas as tiers
  const pokemonsSelecionados = [
    ...ribbonState.gold,
    ...ribbonState.blue,
    ...ribbonState.green
  ];
  
  console.log('🚫 Pokémons já selecionados:', pokemonsSelecionados);
  
  // Criar opções de pokémon
  globalPokemonList.forEach(pokemon => {
    const isDisabled = pokemonsSelecionados.includes(pokemon);
    
    const pokemonOption = document.createElement('div');
    pokemonOption.className = `ribbon-pokemon-option ${isDisabled ? 'disabled' : ''}`;
    pokemonOption.innerHTML = `
      <img src="../estatisticas-shad/images/backgrounds/${pokemon}-left-bg.png" 
           alt="${pokemon}"
           onerror="this.parentElement.style.display='none'">
    `;
    
    if (!isDisabled) {
      pokemonOption.addEventListener('click', () => {
        adicionarPokemonRibbon(pokemon, tier);
        modalRibbonPokemon.classList.remove('show');
        currentTierEditing = null;
      });
    }
    
    ribbonPokemonGrid.appendChild(pokemonOption);
  });
  
  // Abrir modal
  modalRibbonPokemon.classList.add('show');
}

// ============================================
// ADICIONAR POKÉMON À RIBBON
// ============================================

function adicionarPokemonRibbon(pokemon, tier) {
  console.log(`➕ Adicionando ${pokemon} à tier ${tier}`);
  
  // Adicionar ao estado
  ribbonState[tier].push(pokemon);
  
  // Re-renderizar a tier específica
  renderizarTier(tier);
  
  console.log('📊 Estado atual:', ribbonState);
}

// ============================================
// REMOVER POKÉMON DA RIBBON
// ============================================

function removerPokemonRibbon(pokemon, tier) {
  console.log(`➖ Removendo ${pokemon} da tier ${tier}`);
  
  // Encontrar índice
  const index = ribbonState[tier].indexOf(pokemon);
  
  if (index > -1) {
    // Remover do estado
    ribbonState[tier].splice(index, 1);
    
    // Re-renderizar a tier específica
    renderizarTier(tier);
    
    console.log('📊 Estado atual:', ribbonState);
    console.log(`✅ ${pokemon} removido da tier ${tier}`);
  }
}

// ============================================
// RENDERIZAR RIBBONS
// ============================================

function renderizarRibbons() {
  renderizarTier('gold');
  renderizarTier('blue');
  renderizarTier('green');
}

function renderizarTier(tier) {
  const listElement = document.getElementById(`${tier}RibbonList`);
  
  if (!listElement) {
    console.error(`❌ Elemento da tier ${tier} não encontrado`);
    return;
  }
  
  // Limpar conteúdo atual (mas manter atributos)
  listElement.innerHTML = '';
  
  // Adicionar pokémons
  ribbonState[tier].forEach(pokemon => {
    const pokemonItem = document.createElement('div');
    pokemonItem.className = 'ribbon-pokemon-item';
    pokemonItem.setAttribute('data-pokemon', pokemon);
    pokemonItem.innerHTML = `
      <img src="../estatisticas-shad/images/backgrounds/${pokemon}-left-bg.png" 
           alt="${pokemon}"
           onerror="this.src='../estatisticas-shad/images/backgrounds/placeholder.png'">
      <div class="delete-btn">🗑️</div>
    `;
    
    // Primeiro clique: Mostrar lixeirinha
    pokemonItem.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // Se já está mostrando a lixeirinha, não faz nada (o clique será no botão)
      if (pokemonItem.classList.contains('show-delete')) {
        return;
      }
      
      console.log(`🖱️ Primeiro clique em ${pokemon} - mostrando lixeira`);
      
      // Esconder todas as outras lixeirinhas
      document.querySelectorAll('.ribbon-pokemon-item.show-delete').forEach(item => {
        item.classList.remove('show-delete');
      });
      
      // Mostrar a lixeirinha deste item
      pokemonItem.classList.add('show-delete');
    });
    
    // Segundo clique: Remover (clique na lixeirinha)
    const deleteBtn = pokemonItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      console.log(`🗑️ Segundo clique - removendo ${pokemon}`);
      
      // Animação de saída
      pokemonItem.classList.add('deleting');
      
      // Remover após animação
      setTimeout(() => {
        removerPokemonRibbon(pokemon, tier);
      }, 300);
    });
    
    listElement.appendChild(pokemonItem);
  });
  
  // Adicionar botão de adicionar (sempre no final)
  const btnAdd = document.createElement('button');
  btnAdd.className = 'btn-add-pokemon';
  btnAdd.setAttribute('data-tier', tier);
  btnAdd.textContent = '+';
  
  // Event listener do botão +
  btnAdd.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log(`🖱️ Clicou no botão + da tier ${tier}`);
    
    // Esconder todas as lixeirinhas ao abrir modal
    document.querySelectorAll('.ribbon-pokemon-item.show-delete').forEach(item => {
      item.classList.remove('show-delete');
    });
    
    abrirModalPokemon(tier);
  });
  
  listElement.appendChild(btnAdd);
  
  console.log(`✅ Tier ${tier} renderizada com ${ribbonState[tier].length} pokémons`);
}

// ============================================
// SALVAR RIBBONS NO FIRESTORE
// ============================================

async function salvarRibbons(userId, db) {
  try {
    const btnSave = document.getElementById('btnSaveRibbons');
    btnSave.disabled = true;
    btnSave.textContent = '💾 Saving...';
    
    console.log('💾 Salvando ribbons:', ribbonState);
    
    const { doc, setDoc, updateDoc, getDoc } = await import("https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js");
    
    const userDocRef = doc(db, "usuarios", userId);
    const userDocSnap = await getDoc(userDocRef);
    
    if (userDocSnap.exists()) {
      await updateDoc(userDocRef, {
        battleRibbons: ribbonState,
        updatedAt: new Date()
      });
    } else {
      await setDoc(userDocRef, {
        battleRibbons: ribbonState,
        createdAt: new Date()
      });
    }
    
    console.log('✅ Ribbons salvas com sucesso!');
    alert('✅ Battle Ribbons List saved successfully!');
    
  } catch (error) {
    console.error('❌ Erro ao salvar ribbons:', error);
    alert('❌ Error saving ribbons: ' + error.message);
  } finally {
    const btnSave = document.getElementById('btnSaveRibbons');
    btnSave.disabled = false;
    btnSave.textContent = '💾 Save List';
  }

  // ============================================
// FECHAR LIXEIRINHAS AO CLICAR FORA
// ============================================

// Adicionar ao documento para fechar lixeirinhas ao clicar fora
document.addEventListener('click', (e) => {
  // Se não clicou em um item de pokémon
  if (!e.target.closest('.ribbon-pokemon-item')) {
    // Esconder todas as lixeirinhas
    document.querySelectorAll('.ribbon-pokemon-item.show-delete').forEach(item => {
      item.classList.remove('show-delete');
    });
  }
});
}