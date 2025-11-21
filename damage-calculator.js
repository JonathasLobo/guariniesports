// ===== CONFIGURAÇÃO DO FIREBASE (INÍCIO) =====
let auth, db, BuildManager;

// Função para inicializar Firebase
async function initializeFirebase() {
  try {
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js");
    const { getAuth, onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js");
    const { 
      getFirestore, 
      collection, 
      doc, 
      setDoc, 
      getDoc,
      getDocs,
      query,
      where,
      serverTimestamp,
      updateDoc,
      deleteDoc
    } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");

    const firebaseConfig = {
      apiKey: "AIzaSyC9LLCXrQTHBagQxaChBazSfS5E4gUPIoI",
      authDomain: "site-grn.firebaseapp.com",
      databaseURL: "https://site-grn-default-rtdb.firebaseio.com",
      projectId: "site-grn",
      storageBucket: "site-grn.firebasestorage.app",
      messagingSenderId: "27613322806",
      appId: "1:27613322806:web:ad4dc08ce043f19d530297",
      measurementId: "G-84NHN394WF"
    };

    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);

    console.log("✅ Firebase inicializado com sucesso!");
    return { auth, db, collection, doc, setDoc, getDoc, getDocs, query, where, serverTimestamp, updateDoc, deleteDoc, onAuthStateChanged };
  } catch (error) {
    console.error("❌ Erro ao inicializar Firebase:", error);
    return null;
  }
}

// ===== VARIÁVEIS GLOBAIS PARA CONTROLE DE BUILDS =====
let currentUserAuth = null;
let currentBuildId = null;


document.addEventListener("DOMContentLoaded", async () => {
  // ===== INICIALIZAR FIREBASE PRIMEIRO =====
  const firebase = await initializeFirebase();

  // ===== AUTO-CARREGAR BUILD AO ENTRAR NA PÁGINA =====
  const loadBuildId = localStorage.getItem('loadBuildId');
  if (loadBuildId) {
    console.log('🔄 Carregando build automaticamente:', loadBuildId);
    
    // Aguardar Firebase estar pronto
    setTimeout(async () => {
      try {
        if (BuildManager && BuildManager.isUserLoggedIn()) {
          await BuildManager.carregarBuild(loadBuildId);
          localStorage.removeItem('loadBuildId'); // Limpar após carregar
          console.log('✅ Build carregada automaticamente');
        }
      } catch (error) {
        console.error('❌ Erro ao auto-carregar build:', error);
        localStorage.removeItem('loadBuildId');
      }
    }, 1500);
  }
  
  if (!firebase) {
    console.warn("⚠️ Firebase não disponível - sistema de builds desabilitado");
    habilitarBotoesBuild(false);
  } else {
    // Configurar BuildManager
    setupBuildManager(firebase);
    
    // Monitorar autenticação
    firebase.onAuthStateChanged(auth, (user) => {
      currentUserAuth = user;
      
      if (user) {
        console.log("👤 Usuário logado:", user.email);
        habilitarBotoesBuild(true);
      } else {
        console.log("👤 Usuário não logado");
        habilitarBotoesBuild(false);
        currentBuildId = null;
      }
    });
  }

  function capturarEstadoBuild() {
  if (!selectedPokemon) {
    throw new Error("Nenhum Pokémon selecionado");
  }

  const buildState = {
    // Informações básicas
    pokemon: selectedPokemon,
    level: currentLevel,
    skin: selectedSkins[selectedPokemon] || "default",
    
    // Held Items (com stacks)
    heldItems: selectedHeldItems.map(item => ({
      key: item.key,
      name: item.name,
      stacks: item.stacks || 0
    })),
    
    // Battle Item
    battleItem: activeBattleItem || null,
    battleItemActive: isBattleItemActive,
    
    // Emblems
    includeEmblems: document.querySelector('input[name="emblemas"]:checked')?.value === "sim",
    selectedEmblems: { ...selectedEmblems },
    
    // Map Buffs
    includeMapBuffs: document.querySelector('input[name="mapbuffs"]:checked')?.value === "sim",
    selectedMapBuffs: { ...selectedMapBuffs },
    
    // Skills selecionadas
    selectedSkills: selectedSkills[selectedPokemon] ? { ...selectedSkills[selectedPokemon] } : {},
    
    // Estados de passivas ativas
    activePassives: activePassives[selectedPokemon] ? { ...activePassives[selectedPokemon] } : {},
    
    // Estados de skills ativas
    activeSkills: activeSkills[selectedPokemon] ? { ...activeSkills[selectedPokemon] } : {},
    
    // Estados de passivas de itens
    activeItemPassives: { ...activeItemPassives },
    
    // Efeitos condicionais selecionados
    selectedConditionalEffects: selectedConditionalEffects[selectedPokemon] ? 
      { ...selectedConditionalEffects[selectedPokemon] } : {},
    
    // Gauges especiais
    muscleGauge: muscleGauge,
    sweetGauge: sweetGauge,
    chlorophyllGauge: chlorophyllGauge,
    pawmotMode: pawmotMode,
    eonPower: eonPower,
    eonPower2: eonPower2,
    eonPowerlatios: eonPowerlatios,
    
    // Configuração de crit
    showCritDamage: showCritDamage,
    
    // Timestamp
    lastModified: new Date().toISOString()
  };

  return buildState;
}

// ===== FUNÇÃO PARA RESTAURAR ESTADO DA BUILD =====
function restaurarEstadoBuild(buildState) {
  console.log("🔄 Restaurando build:", buildState);
  
  try {
    // 1. Selecionar Pokémon
    if (buildState.pokemon) {
      selectPokemon(buildState.pokemon);
    }
    
    // 2. Definir nível
    if (buildState.level) {
      currentLevel = buildState.level;
      updateLevelDisplay();
    }
    
    // 3. Definir skin
    if (buildState.skin && buildState.skin !== "default") {
      selectedSkins[buildState.pokemon] = buildState.skin;
      updatePokemonImage();
    }
    
    // 4. Restaurar Held Items (incluindo stacks)
    if (buildState.heldItems && Array.isArray(buildState.heldItems)) {
      selectedHeldItems = buildState.heldItems.map(item => ({
        key: item.key,
        name: item.name,
        stacks: item.stacks || 0
      }));
      updateGridDisplay();
      updateSelectedItemsDisplay();
    }
    
    // 5. Restaurar Battle Item
    if (buildState.battleItem) {
      activeBattleItem = buildState.battleItem;
      isBattleItemActive = buildState.battleItemActive || false;
      
      const battleRadio = document.querySelector(`input[name="battle"][value="${buildState.battleItem}"]`);
      if (battleRadio) {
        battleRadio.checked = true;
        lastSelectedBattleItem = buildState.battleItem;
      }
    }
    
    // 6. Restaurar Emblems
    if (buildState.includeEmblems) {
      const emblemRadio = document.querySelector('input[name="emblemas"][value="sim"]');
      if (emblemRadio) {
        emblemRadio.checked = true;
        emblemasContainer.style.display = "block";
        selectedEmblems = { ...buildState.selectedEmblems };
        createEmblemsGrid();
        updateEmblemDescription();
      }
    }
    
    // 7. Restaurar Map Buffs
    if (buildState.includeMapBuffs) {
      const mapBuffRadio = document.querySelector('input[name="mapbuffs"][value="sim"]');
      if (mapBuffRadio) {
        mapBuffRadio.checked = true;
        const mapBuffsContainer = document.getElementById("map-buffs-selector");
        if (mapBuffsContainer) {
          mapBuffsContainer.style.display = "block";
          selectedMapBuffs = { ...buildState.selectedMapBuffs };
          createMapBuffsGrid();
          updateMapBuffDescription();
        }
      }
    }
    
    // 8. Restaurar Skills Selecionadas
    if (buildState.selectedSkills) {
      if (!selectedSkills[buildState.pokemon]) {
        selectedSkills[buildState.pokemon] = {};
      }
      selectedSkills[buildState.pokemon] = { ...buildState.selectedSkills };
    }
    
    // 9. Restaurar estados de passivas
    if (buildState.activePassives) {
      if (!activePassives[buildState.pokemon]) {
        activePassives[buildState.pokemon] = {};
      }
      activePassives[buildState.pokemon] = { ...buildState.activePassives };
    }
    
    // 10. Restaurar estados de skills ativas
    if (buildState.activeSkills) {
      if (!activeSkills[buildState.pokemon]) {
        activeSkills[buildState.pokemon] = {};
      }
      activeSkills[buildState.pokemon] = { ...buildState.activeSkills };
    }
    
    // 11. Restaurar passivas de itens
    if (buildState.activeItemPassives) {
      activeItemPassives = { ...buildState.activeItemPassives };
    }
    
    // 12. Restaurar efeitos condicionais
    if (buildState.selectedConditionalEffects) {
      if (!selectedConditionalEffects[buildState.pokemon]) {
        selectedConditionalEffects[buildState.pokemon] = {};
      }
      selectedConditionalEffects[buildState.pokemon] = { ...buildState.selectedConditionalEffects };
    }
    
    // 13. Restaurar gauges especiais
    muscleGauge = buildState.muscleGauge || 0;
    sweetGauge = buildState.sweetGauge || false;
    chlorophyllGauge = buildState.chlorophyllGauge || false;
    pawmotMode = buildState.pawmotMode || false;
    eonPower = buildState.eonPower || 0;
    eonPower2 = buildState.eonPower2 || 0;
    eonPowerlatios = buildState.eonPowerlatios || 0;
    
    // 14. Restaurar configuração de crit
    showCritDamage = buildState.showCritDamage || false;
    
    // 15. Recalcular tudo
    calcular();
    
    console.log("✅ Build restaurada com sucesso!");
    
  } catch (error) {
    console.error("❌ Erro ao restaurar build:", error);
    throw error;
  }
}

// ===== SETUP DO BUILD MANAGER =====
function setupBuildManager(firebase) {
  const { collection, doc, setDoc, getDoc, getDocs, serverTimestamp, updateDoc, deleteDoc } = firebase;

BuildManager = {
    async salvarBuild(buildName) {
      if (!currentUserAuth) throw new Error("Usuário não está logado");
      if (!selectedPokemon) throw new Error("Nenhum Pokémon selecionado");
      
      try {
        const buildState = capturarEstadoBuild();
        
        if (!currentBuildId) {
          const buildsRef = collection(db, "usuarios", currentUserAuth.uid, "builds");
          const buildsSnap = await getDocs(buildsRef);
          
          if (buildsSnap.size >= 5) {
            throw new Error("Limite de 5 builds atingido! Delete uma build existente para criar uma nova.");
          }
        }
        // Se está editando uma build existente
        if (currentBuildId) {
          console.log("📝 Atualizando build existente:", currentBuildId);
          
          const buildRef = doc(db, "usuarios", currentUserAuth.uid, "builds", currentBuildId);
          
          // Buscar a build atual para pegar o createdAt original
          const buildSnap = await getDoc(buildRef);
          
          if (!buildSnap.exists()) {
            throw new Error("Build não encontrada para atualização");
          }
          
          const existingData = buildSnap.data();
          
          // Atualizar apenas os campos necessários, mantendo createdAt original
          const updateData = {
            userId: currentUserAuth.uid,
            buildName: buildName || existingData.buildName || `${selectedPokemon} Build`,
            ...buildState,
            createdAt: existingData.createdAt,
            updatedAt: serverTimestamp()
          };
          
          await updateDoc(buildRef, updateData);
          
          console.log("✅ Build atualizada com sucesso:", currentBuildId);
          return currentBuildId;
        } 
        // Se está criando uma nova build
        else {
          console.log("💾 Criando nova build");
          
          const buildsRef = collection(db, "usuarios", currentUserAuth.uid, "builds");
          const newBuildRef = doc(buildsRef);
          
          const newBuildDoc = {
            userId: currentUserAuth.uid,
            buildName: buildName || `${selectedPokemon} Build`,
            ...buildState,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          };
          
          await setDoc(newBuildRef, newBuildDoc);
          
          currentBuildId = newBuildRef.id;
          console.log("✅ Nova build criada:", currentBuildId);
          return currentBuildId;
        }
      } catch (error) {
        console.error("❌ Erro ao salvar build:", error);
        throw error;
      }
    },

    async carregarBuild(buildId) {
      if (!currentUserAuth) throw new Error("Usuário não está logado");
      
      try {
        const buildRef = doc(db, "usuarios", currentUserAuth.uid, "builds", buildId);
        const buildSnap = await getDoc(buildRef);
        
        if (!buildSnap.exists()) throw new Error("Build não encontrada");
        
        const buildData = buildSnap.data();
        currentBuildId = buildId;
        restaurarEstadoBuild(buildData);
        console.log("✅ Build carregada:", buildId);
        return buildData;
      } catch (error) {
        console.error("❌ Erro ao carregar build:", error);
        throw error;
      }
    },

    async listarBuilds() {
      if (!currentUserAuth) throw new Error("Usuário não está logado");
      
      try {
        const buildsRef = collection(db, "usuarios", currentUserAuth.uid, "builds");
        const buildsSnap = await getDocs(buildsRef);
        const builds = [];
        
        buildsSnap.forEach(doc => {
          builds.push({ id: doc.id, ...doc.data() });
        });
        
        console.log(`✅ ${builds.length} builds encontradas`);
        return builds;
      } catch (error) {
        console.error("❌ Erro ao listar builds:", error);
        throw error;
      }
    },

    async deletarBuild(buildId) {
      if (!currentUserAuth) throw new Error("Usuário não está logado");
      
      try {
        const buildRef = doc(db, "usuarios", currentUserAuth.uid, "builds", buildId);
        await deleteDoc(buildRef);
        
        if (currentBuildId === buildId) {
          currentBuildId = null;
        }
        
        console.log("✅ Build deletada:", buildId);
      } catch (error) {
        console.error("❌ Erro ao deletar build:", error);
        throw error;
      }
    },

    getCurrentBuildId: () => currentBuildId,
    setCurrentBuildId: (id) => { currentBuildId = id; },
    isUserLoggedIn: () => !!currentUserAuth
  };

  // Expor globalmente
  window.BuildManager = BuildManager;
}

// ===== FUNÇÃO PARA HABILITAR/DESABILITAR BOTÕES =====
function habilitarBotoesBuild(enabled) {
  const btnSave = document.getElementById("btn-save-build");
  const btnLoad = document.getElementById("btn-load-build");
  
  if (btnSave) btnSave.disabled = !enabled;
  if (btnLoad) btnLoad.disabled = !enabled;
};

  // Verificação de dependências
  console.log("Verificando dados:", {
    pokemonRoles: typeof pokemonRoles,
    baseStats: typeof baseStats, 
    gameHeldItens: typeof gameHeldItens,
    skillDamage: typeof skillDamage
  });
  loadMetaData();
  loadAllMetaData(); // Carregar histórico de meta

  // Elementos do seletor de Pokémon
  const pokemonCircle = document.getElementById("pokemon-circle");
  const pokemonGridPanel = document.getElementById("pokemon-grid-panel");
  const pokemonGrid = document.getElementById("pokemon-grid");
  const selectedPokemonImage = document.getElementById("selected-pokemon-image");
  const selectedPokemonName = document.getElementById("selected-pokemon-name");
  const pokemonPlaceholder = document.querySelector(".pokemon-placeholder");
  const compartilharContainer = document.getElementById("compartilhar-container");
  
  // Dados dos emblemas
  const EMBLEM_DATA = {
    green: { 
      name: "Green", 
      stat: "Sp. ATK", 
      color: "#28a745",
      levels: { 2: 1, 4: 2, 6: 4 },
      description: "Aumenta o Sp. ATK"
    },
    red: { 
      name: "Red", 
      stat: "Atk Speed", 
      color: "#dc3545",
      levels: { 3: 2, 5: 4, 7: 8 },
      description: "Aumenta a velocidade de ataque"
    },
    blue: { 
      name: "Blue", 
      stat: "DEF", 
      color: "#007bff",
      levels: { 2: 2, 4: 4, 6: 8 },
      description: "Aumenta a defesa física"
    },
    white: { 
      name: "White", 
      stat: "HP", 
      color: "#ffffff",
      levels: { 2: 1, 4: 2, 6: 4 },
      description: "Aumenta os pontos de vida"
    },
    black: { 
      name: "Black", 
      stat: "CDR", 
      color: "#343a40",
      levels: { 3: 1, 5: 2, 7: 4 },
      description: "Reduz o tempo de recarga das habilidades"
    },
    yellow: { 
      name: "Yellow", 
      stat: "Speed", 
      color: "#ffc107",
      levels: { 3: 4, 5: 6, 7: 12 },
      description: "Aumenta a velocidade de movimento"
    },
    brown: { 
      name: "Brown", 
      stat: "ATK", 
      color: "#8b4513",
      levels: { 2: 1, 4: 2, 6: 4 },
      description: "Aumenta o ATK físico"
    },
    purple: { 
      name: "Purple", 
      stat: "Sp. DEF", 
      color: "#6f42c1",
      levels: { 2: 2, 4: 4, 6: 8 },
      description: "Aumenta a defesa especial"
    },
    pink: { 
      name: "Pink", 
      stat: "Hindrance Reduction", 
      color: "#e83e8c",
      levels: { 3: 4, 5: 8, 7: 16 },
      description: "Reduz a duração dos efeitos de controle"
    },
    navy: { 
      name: "Navy", 
      stat: "Energy Rate", 
      color: "#1e3a8a",
      levels: { 3: 1, 5: 2, 7: 4 },
      description: "Aumenta a velocidade de carregamento da ultimate"
    },
    gray: { 
      name: "Gray", 
      stat: "Damage Taken", 
      color: "#6c757d",
      levels: { 3: 3, 5: 6, 7: 12 },
      description: "Reduz o dano recebido"
    }
  };

  const MAP_BUFFS_DATA = {
  accelgor: {
    name: "Accelgor",
    stat: "CDR",
    value: 10,
    color: "#28a745",
    type: "percent",
    mutuallyExclusive: false,
    description: "Increase 10% CDR",
    image: "./estatisticas-shad/images/objetivos/accelgor.png"
  },
  escavalier: {
    name: "Escavalier",
    stat: "Speed",
    value: 30,
    color: "#dc3545",
    type: "debuff",
    mutuallyExclusive: false,
    description: "Decrease 30% MoveSpeed Reduction on opponent",
    debuffLabel: "(DEBUFF) MoveSpeed Reduction",
    image: "./estatisticas-shad/images/objetivos/escavalier.png"
  },
  regirock: {
    name: "Regirock",
    stats: { DEF: 30, SpDEF: 25 },
    color: "#8b7355",
    type: "percent",
    mutuallyExclusive: true,
    group: "regi",
    conflictsWith: "legendary",
    description: "Increase DEF 30% and Sp. DEF 25%",
    image: "./estatisticas-shad/images/objetivos/regirock.png"
  },
  registeel: {
    name: "Registeel",
    stats: { ATK: 15, SpATK: 15 },
    color: "#6c757d",
    type: "percent",
    mutuallyExclusive: true,
    group: "regi",
    conflictsWith: "legendary",
    description: "Increase ATK and Sp. ATK 15%",
    image: "./estatisticas-shad/images/objetivos/registeel.png"
  },
  regice: {
    name: "Regice",
    stat: "HPRegen",
    value: 5,
    color: "#4dabf7",
    type: "percent",
    mutuallyExclusive: true,
    group: "regi",
    conflictsWith: "legendary",
    description: "Increase HP Regen 5%",
    image: "./estatisticas-shad/images/objetivos/regice.png"
  },
  groudon: {
    name: "Groudon",
    color: "#ff4500",
    type: "special",
    mutuallyExclusive: true,
    group: "legendary",
    description: "Increase Shield and all damages 50%",
    image: "./estatisticas-shad/images/objetivos/groudon.png",
    shieldFormula: (hp) => {
      // 30% do HP + 1000
      const shieldValue = (hp * 0.30) + 1000;
      // Converter para percentual baseado no HP total
      const percentual = (shieldValue / hp) * 100;
      return percentual;
    },
    skillDamageMultiplier: 1.50, // 50% de aumento
    affectsBasicAttack: true
  }
};

  // Elementos originais
  const levelDisplay = document.getElementById("level-display");
  const levelDecrease = document.getElementById("level-decrease");
  const levelIncrease = document.getElementById("level-increase");
  const levelSelect = document.getElementById("nivel-final");
  const levelValor = document.getElementById("nivel-valor-final");
  const statusFinalDiv = document.getElementById("status-final");
  const skillsDiv = document.getElementById("skills-column");
  const resultado = document.getElementById("resultado");
  const battleRadios = document.querySelectorAll("input[name='battle']");
  const emblemasRadios = document.querySelectorAll("input[name='emblemas']");
  const emblemasContainer = document.getElementById("emblems-selector");
  
  // Variáveis globais
  let selectedPokemon = "";
  let selectedHeldItems = [];
  let selectedEmblems = {};
  const maxHeldItems = 3;
  let activePassives = {};
  let activeItemPassives = {};
  let activeSkills = {}; // Nova variável para skills ativáveis
  let activeBattleItem = null; // Qual battle item está selecionado
  let isBattleItemActive = false; // Se o buff está ativo ou não
  let currentRoleFilter = "All";
  let currentLevel = 1;
  let currentDamageTypeFilter = null;
  let selectedSkills = {};
  let currentSkillSlot = null;
  let muscleGauge = 0; // Exclusivo para Buzzwole (0-6)
  let sweetGauge = false; // Exclusivo para Alcremie (false = Not Full, true = Full)
  let chlorophyllGauge = false; // Exclusivo para Leafeon (false = Not Full, true = Full)
  let pawmotMode = false; // ✅ NOVO: Exclusivo para Pawmot (false = Normal Mode, true = Fighter Mode)
  let eonPower = 0;
  let eonPower2 = 0;
  let eonPowerlatios = 0;
  let selectedSkins = {};
  let statModifiers = {}; // Rastreia todos os modificadores de cada stat
  let currentExpandedStat = null; // Controla qual stat está expandido
  let selectedConditionalEffects = {};
  let selectedMapBuffs = {};
  let currentMetaData = null;
  let allMetaDataHistory = []; 
  let showCritDamage = false; // Controla se mostra dano crítico

// Função para carregar TODOS os arquivos de meta disponíveis
async function loadAllMetaData() {
  try {
    console.log('🔍 Iniciando carregamento de histórico de meta...');
    
    // Lista de arquivos conhecidos (você pode expandir isso)
    const metaFiles = [
      'meta02-11-2025.json',
      'meta10-11-2025.json',
      'meta17-11-2025.json',
      // Adicione mais arquivos conforme criar
      // 'meta17-11-2025.json',
      // 'meta24-11-2025.json',
    ];
    
    const loadedData = [];
    
    for (const fileName of metaFiles) {
      try {
        console.log(`📥 Tentando carregar: ${fileName}`);
        const response = await fetch(`./meta/${fileName}`);
        
        if (response.ok) {
          const data = await response.json();
          console.log(`✅ ${fileName} carregado com sucesso`);
          loadedData.push({
            date: data.data || fileName.replace('meta', '').replace('.json', ''),
            data: data
          });
        } else {
          console.log(`⚠️ Arquivo ${fileName} não encontrado (${response.status})`);
        }
      } catch (error) {
        console.log(`❌ Erro ao carregar ${fileName}:`, error.message);
      }
    }
    
    // Ordenar por data (mais antigo primeiro)
    loadedData.sort((a, b) => {
      const dateA = new Date(a.date.split('-').reverse().join('-'));
      const dateB = new Date(b.date.split('-').reverse().join('-'));
      return dateA - dateB;
    });
    
    allMetaDataHistory = loadedData;
    console.log(`✅ Total de arquivos de meta carregados: ${allMetaDataHistory.length}`);
    
    return allMetaDataHistory;
  } catch (error) {
    console.error('❌ Erro ao carregar histórico de meta:', error);
    return [];
  }
}

// Função para extrair dados de um pokémon específico do histórico
function extractPokemonMetaHistory(pokemonName) {
  if (allMetaDataHistory.length === 0) {
    console.log('⚠️ Nenhum dado de meta carregado');
    return null;
  }

  let searchName = pokemonName;
  if (pokemonName.toLowerCase() === "scyther") {
    searchName = "scizor";
    console.log("📊 Meta: Scyther → Usando dados do Scizor");
  }
  
  const normalizedName = normalizePokemonName(searchName);
  console.log(`📊 Extraindo histórico para: ${pokemonName} (normalizado: ${normalizedName})`);
  
  const history = {
    dates: [],
    winrates: [],
    pickrates: [],
    banrates: []
  };
  
  allMetaDataHistory.forEach(metaEntry => {
    const date = metaEntry.date;
    const data = metaEntry.data;
    
    // Buscar winrate
    const winrateEntry = data.taxaVitoria.find(
      entry => normalizePokemonName(entry.nome) === normalizedName
    );
    
    // Buscar pickrate
    const pickrateEntry = data.taxaSelecao.find(
      entry => normalizePokemonName(entry.nome) === normalizedName
    );
    
    // Buscar banrate
    const banrateEntry = data.taxaBanimento.find(
      entry => normalizePokemonName(entry.nome) === normalizedName
    );
    
    // Adicionar aos arrays (mesmo que seja null)
    history.dates.push(date);
    history.winrates.push(winrateEntry ? winrateEntry.taxa : null);
    history.pickrates.push(pickrateEntry ? pickrateEntry.taxa : null);
    history.banrates.push(banrateEntry ? banrateEntry.taxa : null);
  });
  
  console.log('📈 Histórico extraído:', history);
  return history;
}

// Função para criar um gráfico de linha
function createMetaChart(canvasId, label, data, color) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) {
    console.error(`❌ Canvas ${canvasId} não encontrado`);
    return null;
  }
  
  // Destruir gráfico anterior se existir
  const existingChart = Chart.getChart(canvasId);
  if (existingChart) {
    existingChart.destroy();
  }
  
  // Configuração do gráfico
  const config = {
    type: 'line',
    data: {
      labels: data.dates,
      datasets: [{
        label: label,
        data: data.values,
        borderColor: color,
        backgroundColor: color + '20', // Adiciona transparência
        borderWidth: 3,
        tension: 0.4, // Suaviza a linha
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: color,
        pointBorderColor: '#fff',
        pointBorderWidth: 2
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
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: color,
          borderWidth: 2,
          padding: 12,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return `${label}: ${context.parsed.y.toFixed(2)}%`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            callback: function(value) {
              return value + '%';
            },
            color: '#666',
            font: {
              size: 11
            }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#666',
            font: {
              size: 10
            },
            maxRotation: 45,
            minRotation: 45
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      }
    }
  };
  
  return new Chart(ctx, config);
}

// Função para renderizar a coluna de Meta Comparison
function renderMetaComparison(pokemonName) {
  const metaColumn = document.getElementById('meta-comparison-column');
  const metaChartsContainer = document.getElementById('meta-charts-container');
  
  if (!metaColumn || !metaChartsContainer) {
    console.error('❌ Elementos de meta comparison não encontrados');
    return;
  }
  
  // 🛑 PREVENIR RECARGA DESNECESSÁRIA
  // Verificar se já existem gráficos e se é o mesmo pokémon
  const existingCharts = metaChartsContainer.querySelectorAll('canvas');
  const currentPokemon = metaColumn.dataset.currentPokemon;
  
  if (existingCharts.length > 0 && currentPokemon === pokemonName) {
    console.log('⚡ Gráficos já renderizados para', pokemonName);
    return; // Não recarregar se já está mostrando o mesmo pokémon
  }
  
  // Verificar se há dados suficientes
  if (allMetaDataHistory.length < 1) {
    metaColumn.classList.remove('show');
    console.log('⚠️ Menos de 2 arquivos de meta - não exibindo comparação');
    return;
  }
  
  // Extrair histórico do pokémon
  const history = extractPokemonMetaHistory(pokemonName);
  
  if (!history || history.dates.length === 0) {
    metaColumn.classList.remove('show');
    console.log('⚠️ Sem histórico para este pokémon');
    return;
  }
  
  // ✅ VERIFICAR SE HÁ DADOS VÁLIDOS (NÃO-NULOS)
  const hasValidData = history.winrates.some(v => v !== null) || 
                       history.pickrates.some(v => v !== null) || 
                       history.banrates.some(v => v !== null);
  
  if (!hasValidData) {
    metaColumn.classList.remove('show');
    console.log('⚠️ Nenhum dado válido encontrado para', pokemonName);
    return;
  }
  
  // Mostrar coluna
  metaColumn.classList.add('show');
  
  // ✅ MARCAR POKEMON ATUAL NO DATASET
  metaColumn.dataset.currentPokemon = pokemonName;
  
  // Limpar container
  metaChartsContainer.innerHTML = `
    <div class="meta-chart-container">
      <div class="meta-chart-title">📈 Winrate Trend</div>
      <canvas id="winrate-chart" class="meta-chart-canvas"></canvas>
    </div>
    
    <div class="meta-chart-container">
      <div class="meta-chart-title">🎯 Pickrate Trend</div>
      <canvas id="pickrate-chart" class="meta-chart-canvas"></canvas>
    </div>
    
    <div class="meta-chart-container">
      <div class="meta-chart-title">🚫 Banrate Trend</div>
      <canvas id="banrate-chart" class="meta-chart-canvas"></canvas>
    </div>
  `;
  
  // Aguardar renderização do DOM
  setTimeout(() => {
    // ✅ FILTRAR APENAS PONTOS VÁLIDOS (NÃO-NULOS)
    const validIndices = [];
    const validDates = [];
    const validWinrates = [];
    const validPickrates = [];
    const validBanrates = [];
    
    history.dates.forEach((date, index) => {
      // Incluir apenas se pelo menos um dos valores for válido
      if (history.winrates[index] !== null || 
          history.pickrates[index] !== null || 
          history.banrates[index] !== null) {
        validIndices.push(index);
        validDates.push(date);
        validWinrates.push(history.winrates[index] || 0);
        validPickrates.push(history.pickrates[index] || 0);
        validBanrates.push(history.banrates[index] || 0);
      }
    });
    
    console.log('✅ Datas válidas encontradas:', validDates);
    console.log('✅ Total de pontos:', validDates.length);
    
    // Criar gráficos COM DADOS FILTRADOS
    createMetaChart('winrate-chart', 'Winrate', {
      dates: validDates,
      values: validWinrates
    }, '#28a745');
    
    createMetaChart('pickrate-chart', 'Pickrate', {
      dates: validDates,
      values: validPickrates
    }, '#007bff');
    
    createMetaChart('banrate-chart', 'Banrate', {
      dates: validDates,
      values: validBanrates
    }, '#dc3545');

      // ✅ ADICIONE AQUI:
  const metaStatsHTML = createMetaStatsHTML(pokemonName);
  if (metaStatsHTML) {
    metaChartsContainer.insertAdjacentHTML('beforeend', metaStatsHTML);
  }
    
    console.log('✅ Gráficos de meta comparison criados para', pokemonName);
  }, 100);
}

  async function loadMetaData() {
  try {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const fileName = `meta10-11-2025.json`;
    
    console.log(`🔍 Tentando carregar: ${fileName}`);
    console.log(`📍 URL completa: ${window.location.origin}/${fileName}`);
    
    const response = await fetch(`./${fileName}`);
    
    if (response.ok) {
      currentMetaData = await response.json();
      console.log('✅ Meta data carregado com sucesso!', currentMetaData);
      return currentMetaData;
    } else {
      console.log(`⚠️ Arquivo ${fileName} não encontrado (Status: ${response.status})`);
      
      // Tentar semana anterior
      const lastWeek = new Date(today);
      lastWeek.setDate(lastWeek.getDate() - 7);
      const lastDay = String(lastWeek.getDate()).padStart(2, '0');
      const lastMonth = String(lastWeek.getMonth() + 1).padStart(2, '0');
      const lastYear = lastWeek.getFullYear();
      const lastWeekFileName = `meta${lastDay}-${lastMonth}-${lastYear}.json`;
      
      console.log(`🔄 Tentando semana anterior: ${lastWeekFileName}`);
      
      const fallbackResponse = await fetch(`./${lastWeekFileName}`);
      if (fallbackResponse.ok) {
        currentMetaData = await fallbackResponse.json();
        console.log('✅ Meta data da semana anterior carregado!');
        return currentMetaData;
      } else {
        console.log('❌ Nenhum arquivo de meta encontrado');
        return null;
      }
    }
  } catch (error) {
    console.error('❌ Erro ao carregar meta data:', error);
    console.log('💡 Dica: Verifique se o arquivo JSON está na raiz do projeto');
    return null;
  }
}

function normalizePokemonName(name) {
  if (!name) return '';
  let normalized = name.trim().toLowerCase();
  
  const nameMapping = {
    'megacharizardx': 'mega charizard x',
    'megalucario': 'mega lucario',
    'alolanraichu': 'alolan raichu',
    'alolanninetales': 'alolan ninetales',
    'galarianrapidash': 'galarian rapidash',
    'mrmime': 'mr. mime'
  };

  const mapped = nameMapping[normalized.replace(/[\s.-]/g, '')];
  return mapped || normalized;
}

function getPokemonMetaStats(pokemonName) {
  if (!currentMetaData) return null;

  // ✅ APLICAR ALIAS ANTES DE NORMALIZAR
  let searchName = pokemonName;
  if (pokemonName.toLowerCase() === "scyther") {
    searchName = "scizor";
    console.log("📊 Meta: Scyther → Usando dados do Scizor");
  }

  const normalizedName = normalizePokemonName(searchName);
  const stats = { winrate: null, pickrate: null, banrate: null };

  const winrateEntry = currentMetaData.taxaVitoria.find(
    entry => normalizePokemonName(entry.nome) === normalizedName
  );
  if (winrateEntry) {
    stats.winrate = { rank: winrateEntry.ranking, rate: winrateEntry.taxa };
  }

  const pickrateEntry = currentMetaData.taxaSelecao.find(
    entry => normalizePokemonName(entry.nome) === normalizedName
  );
  if (pickrateEntry) {
    stats.pickrate = { rank: pickrateEntry.ranking, rate: pickrateEntry.taxa };
  }

  const banrateEntry = currentMetaData.taxaBanimento.find(
    entry => normalizePokemonName(entry.nome) === normalizedName
  );
  if (banrateEntry) {
    stats.banrate = { rank: banrateEntry.ranking, rate: banrateEntry.taxa };
  }

  return stats;
}

function createMetaStatsHTML(pokemonName) {
  if (!currentMetaData || !pokemonName) return '';

  const stats = getPokemonMetaStats(pokemonName);
  if (!stats || (!stats.winrate && !stats.pickrate && !stats.banrate)) return '';

  let html = '<div class="meta-stats-week">';
  html += '<div class="meta-stats-title">📊 Weekly Stats</div>';
  
  if (stats.winrate) {
    html += `
      <div class="meta-stat-line winrate">
        <span class="meta-stat-label">🏆 Winrate Week</span>
        <span class="meta-stat-values">
          <span class="meta-rank">Rank: #${stats.winrate.rank}</span>
          <span class="meta-rate">${stats.winrate.rate.toFixed(2)}%</span>
        </span>
      </div>`;
  }
  
  if (stats.pickrate) {
    html += `
      <div class="meta-stat-line pickrate">
        <span class="meta-stat-label">🎯 Pickrate Week</span>
        <span class="meta-stat-values">
          <span class="meta-rank">Rank: #${stats.pickrate.rank}</span>
          <span class="meta-rate">${stats.pickrate.rate.toFixed(2)}%</span>
        </span>
      </div>`;
  }
  
  if (stats.banrate) {
    html += `
      <div class="meta-stat-line banrate">
        <span class="meta-stat-label">🚫 Banrate Week</span>
        <span class="meta-stat-values">
          <span class="meta-rank">Rank: #${stats.banrate.rank}</span>
          <span class="meta-rate">${stats.banrate.rate.toFixed(2)}%</span>
        </span>
      </div>`;
  }
  
  html += '</div>';
  return html;
}
  // Função de arredondamento customizada
// Arredonda para cima apenas se o decimal for >= 0.8
const customRound = (value) => {
  const decimal = value - Math.floor(value);
  if (decimal >= 0.8) {
    return Math.ceil(value);
  }
  return Math.floor(value);
};

// Tornar imagem clicável para abrir modal
const makeImageClickable = () => {
  const resultImage = document.querySelector(".resultado-image img");
  if (!resultImage || !selectedPokemon) return;
  
  // Verificar se há skins disponíveis
  if (!pokemonSkins || !pokemonSkins[selectedPokemon]) return;
  
  // Remover listener anterior se existir
  const newImage = resultImage.cloneNode(true);
  resultImage.parentNode.replaceChild(newImage, resultImage);
  
  // Adicionar novo listener
  newImage.addEventListener("click", (e) => {
    e.stopPropagation();
    openSkinsModal();
  });
  
  // Adicionar título
  newImage.title = "Clique para trocar de skin";
  newImage.style.cursor = "pointer";
};

// Abrir modal de skins
const openSkinsModal = () => {
  if (!selectedPokemon || !pokemonSkins[selectedPokemon]) {
    return;
  }
  
  // Criar overlay
  const overlay = document.createElement("div");
  overlay.className = "skins-overlay show";
  overlay.id = "skins-overlay";
  
  // Criar modal
  const modal = document.createElement("div");
  modal.className = "skins-modal";
  modal.id = "skins-modal";
  
  // Header
  const header = document.createElement("div");
  header.className = "skins-modal-header";
  
  const title = document.createElement("div");
  title.className = "skins-modal-title";
  title.textContent = `Skins de ${safeCap(selectedPokemon)}`;
  
  const closeBtn = document.createElement("button");
  closeBtn.className = "skins-close-btn";
  closeBtn.innerHTML = "×";
  closeBtn.addEventListener("click", closeSkinsModal);
  
  header.appendChild(title);
  header.appendChild(closeBtn);
  modal.appendChild(header);
  
  // Grid de skins
  const grid = document.createElement("div");
  grid.className = "skins-grid-compact";
  
  const skins = pokemonSkins[selectedPokemon];
  const currentSkin = selectedSkins[selectedPokemon] || "default";
  
  Object.keys(skins).forEach(skinKey => {
    const item = document.createElement("div");
    item.className = "skin-item-compact";
    item.dataset.skinKey = skinKey;
    
    if (skinKey === currentSkin) {
      item.classList.add("selected");
    }
    
    // Imagem da skin
    const img = document.createElement("img");
    img.className = "skin-thumb";
    
    // NOVO CAMINHO: ./estatisticas-shad/images/{pokemon}/skins/{skinKey}.png
    if (skinKey === "default") {
      img.src = `./estatisticas-shad/images/backgrounds/${selectedPokemon}-left-bg.png`;
    } else {
      img.src = `./estatisticas-shad/images/skins/${selectedPokemon}/${skinKey}.png`;
    }
    
    img.alt = skins[skinKey];
    
    /*img.onerror = function() {
      this.src = `./estatisticas-shad/images/backgrounds/placeholder.png`;
    };*/
    
    // Nome da skin
    const name = document.createElement("div");
    name.className = "skin-name-compact";
    name.textContent = skins[skinKey];
    
    if (skinKey === "default") {
      const badge = document.createElement("div");
      badge.className = "skin-default-badge";
      badge.textContent = "Default";
      name.appendChild(badge);
    }
    
    item.appendChild(img);
    item.appendChild(name);
    
    // Selecionar ao clicar
    item.addEventListener("click", () => {
      selectSkin(skinKey);
    });
    
    grid.appendChild(item);
  });
  
  modal.appendChild(grid);
  
  // Adicionar ao DOM
  document.body.appendChild(overlay);
  overlay.appendChild(modal);
  
  // Fechar ao clicar no overlay
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeSkinsModal();
    }
  });
};

// Fechar modal
const closeSkinsModal = () => {
  const overlay = document.getElementById("skins-overlay");
  if (overlay) {
    overlay.remove();
  }
};

// Selecionar skin
const selectSkin = (skinKey) => {
  selectedSkins[selectedPokemon] = skinKey;
  
  // Atualizar visual no modal
  const items = document.querySelectorAll(".skin-item-compact");
  items.forEach(item => {
    if (item.dataset.skinKey === skinKey) {
      item.classList.add("selected");
    } else {
      item.classList.remove("selected");
    }
  });
  
  // Atualizar imagem
  updatePokemonImage();
  
  // Fechar modal após 300ms
  setTimeout(() => {
    closeSkinsModal();
  }, 300);
};

// Atualizar imagem do pokémon
const updatePokemonImage = () => {
  const resultImage = document.querySelector(".resultado-image img");
  if (!resultImage || !selectedPokemon) return;
  
  const skinKey = selectedSkins[selectedPokemon] || "default";
  
  if (skinKey === "default") {
    resultImage.src = `./estatisticas-shad/images/backgrounds/${selectedPokemon}-left-bg.png`;
  } else {
    // NOVO CAMINHO
    resultImage.src = `./estatisticas-shad/images/skins/${selectedPokemon}/${skinKey}.png`;
    
    resultImage.onerror = function() {
      this.src = `./estatisticas-shad/images/backgrounds/${selectedPokemon}-left-bg.png`;
      this.onerror = null;
    };
  }
};

 const createPokemonRatings = (pokemon) => {
  // Verificar se pokemonRatings existe (foi carregado do util.js)
  if (typeof pokemonRatings === 'undefined' || !pokemonRatings[pokemon]) {
    return ''; // Retorna vazio se não houver dados
  }
  
  const ratings = pokemonRatings[pokemon];
  const maxRating = 5; // Valor máximo possível
  
  // Ícones para cada categoria
  const icons = {
    Attack: '⚔️',
    Endure: '🛡️',
    Mobility: '⚡',
    Score: '🎯',
    Support: '💚',
    Invade: '🥷',
    Farm: '🪙',
    Gank: '🗡️',
    CC: '🎮',
    Smite: '🤜',
    Sweep: '🌳'
  };
  
  // Mapeamento de nomes para classes CSS
  const categoryClasses = {
    Attack: 'attack',
    Endure: 'endure',
    Mobility: 'mobility',
    Score: 'score',
    Support: 'support',
    Invade: 'invade',
    Farm: 'farm',
    Gank: 'gank',
    CC: 'cc',
    Smite: 'smite',
    Sweep: 'sweep'
  };
  
  const ratingsHtml = Object.entries(ratings).map(([category, value]) => {
    // Calcula porcentagem: valor atual / máximo (5) * 100
    const percentage = (value / maxRating) * 100;
    const icon = icons[category] || '●';
    const categoryClass = categoryClasses[category] || category.toLowerCase();
    
    return `
      <div class="rating-item">
        <div class="rating-label">
          <span class="rating-icon">${icon}</span>
          ${category}
        </div>
        <div class="rating-bar-container">
          <div class="rating-bar-fill ${categoryClass}" style="width: ${percentage}%"></div>
        </div>
        <div class="rating-value">${value.toFixed(1)}</div>
      </div>
    `;
  }).join('');
  
  return `
    <div class="pokemon-ratings-container">
      <div class="ratings-title">🌟 Pokemon Stats 🌟</div>
      ${ratingsHtml}
    </div>
  `;
};

  const EFFECT_CONFIG = {
  "Unstoppable": { icon: "🛡️", label: "Unstoppable" },
  "Stun": { icon: "🌀", label: "Stun" },
  "Bound": { icon: "🪢", label: "Bound"},
  "Invincible": { icon: "💎", label: "Invincible" },
  "Burn": { icon: "🔥", label: "Burn" },
  "True Damage": { icon: "💥", label: "True Damage" },
  "Cleanses": { icon: "✨", label: "Cleanses" },
  "Immobilized": { icon: "🛑", label: "Immobilized" },
  "Vision Reduction": { icon: "👁️", label: "Vision Reduction" },
  "Untargetable": { icon: "🎯", label: "Untargetable" },
  "Invisible": { icon: "👤", label: "Invisible" },
  "Invisible Reveal": { icon: "🫵", label: "Invisible Reveal" },
  "Sleep": { icon: "💤", label: "Sleep" },
  "Paralyze": { icon: "⚡", label: "Paralyze" },
  "Freeze": { icon: "❄️", label: "Freeze" },
  "Water": { icon: "💧", label: "Water" },
  "Electric": { icon: "⚡", label: "Electric" },
  "Fire": { icon: "🔥", label: "Fire" },
  "Blind": { icon: "🕶️", label: "Blind" },
  "Poison": { icon: "🩻", label: "Poison" },
  "Fear": { icon: "😱", label: "Fear" },
  "Copfusion": { icon: "😵‍💫", label: "Confusion" },
};

const STAT_EFFECT_CONFIG = {
  // Stats Ofensivos
  ATK: { 
    icon: "⚔️", 
    label: "Attack",
    color: "#ff6b6b"
  },
  SpATK: { 
    icon: "⚔️", 
    label: "Sp. Attack",
    color: "#a78bfa"
  },
  
  // Stats Defensivos
  DEF: { 
    icon: "🛡️", 
    label: "Defense",
    color: "#4dabf7"
  },
  SpDEF: { 
    icon: "🛡️", 
    label: "Sp. Defense",
    color: "#74c0fc"
  },
  SpDEFPen: { 
    icon: "🛡️", 
    label: "Sp. Defense Penetration",
    color: "#74c0fc"
  },
  
  // Velocidade e Mobilidade
  Speed: { 
    icon: "⚡", 
    label: "Move Speed",
    color: "#ffd43b"
  },
  AtkSPD: { 
    icon: "⚡", 
    label: "Attack Speed",
    color: "#ff922b"
  },
  
  // Utilitário
   CDR: { 
    icon: "🔄", 
    label: "Cooldown Reduction",
    color: "#20c997"
  },
  FlatCDR: { 
    icon: "🔄", 
    label: "Cooldown Reduction",
    color: "#20c997"
  },
  CooldownFlat: {  // ✅ NOVO - para selfBuff
    icon: "🔄",
    label: "Cooldown",
    color: "#20c997"
  },
  CooldownPercent: {  // ✅ NOVO - para selfBuff
    icon: "🔄",
    label: "Cooldown",
    color: "#20c997"
  },
  FlatCDR: { 
    icon: "🔄", 
    label: "Cooldown Reduction",
    color: "#20c997"
  },
   OtherSkillCooldown: {
    icon: "🔗",
    label: "Other Skills Cooldown",
    color: "#20c997"
  },
  Shield: { 
    icon: "🛡️", 
    label: "Shield",
    color: "#4dabf7"
  },
  HPRegen: { 
    icon: "❤️", 
    label: "HP Regen",
    color: "#ff6b6b"
  },
  Lifesteal: { 
    icon: "🩸", 
    label: "Lifesteal",
    color: "#c92a2a"
  },
  HindRed: { 
    icon: "⤴️", 
    label: "Hindrance",
    color: "#4dabf7"
  },
  
  // Crítico
  CritRate: { 
    icon: "💥", 
    label: "Crit Rate",
    color: "#ff6b00"
  },
  CritDmg: { 
    icon: "💥", 
    label: "Crit Damage",
    color: "#e03131"
  },
  
  // Outros
  HP: { 
    icon: "💚", 
    label: "HP",
    color: "#51cf66"
  },
  DmgTaken: { 
    icon: "🛡️", 
    label: "Damage Taken",
    color: "#4dabf7"
  },
  EnergyRate: { 
    icon: "⚡", 
    label: "Energy Rate",
    color: "#ffd43b"
  }
};

  const CUSTOM_SKILL_MAPPING = {
  absol: {
    s1: ["s12", "s21"],
    s2: ["s11", "s22"] 
  },
  megalucario: {
    s1: ["s11"],
    s2: ["U11"] 
  },
  alcremie: {
    s1: ["s11", "s21"],
    s2: ["s12", "s22"]
  },
  darkrai: {
    s1: ["s11", "s21"],
    s2: ["s12", "s22"]
  },
  megacharizardx: {
    s1: ["s12"],
    s2: ["U12"] 
  },
  garchomp: {
    s1: ["s21", "s12"],
    s2: ["s11", "s22"]
  },
  gengar: {
    s1: ["s12", "s21"],
    s2: ["s11", "s22"]
  },
  greedent: {
    s1: ["1a", "1b"],
    s2: ["2a", "2b"]
  },
  mew: {
    s1: ["s1a", "s1b", "s1c"],
    s2: ["s2a", "s2b", "s2c"]
  },
  mrmime: {
    s1: ["s21", "s12"],
    s2: ["s11", "s22"]
  },
  pikachu: {
    s1: ["s12", "u11"],
    s2: ["s21", "s11"]
  },
  }
  const SKILL_KEY_ALIASES = {
  greedent: {
    "1a": "s11",
    "1b": "s12",
    "2a": "s21",
    "2b": "s22"
  },
}

  const POKEMON_CRIT_BASE = {
  "azumarill": 70,
  "inteleon": 150,
  // Pokémons padrão usam 100% (não precisam estar listados)
  };

    // Configuração de quais skills podem dar crítico por Pokémon
  const POKEMON_CRIT_SKILLS = {
    "absol": ["s11", "s12", "s21", "s22", "ult"],
    "aegislash": ["s12", "s22"],
    "cinderace": ["s12"],
    "crustle": ["s22"],
    "decidueye": ["s11"],
    "dragapult": ["s21"],
    "duraludon": ["s11"],
    "glaceon": ["s12", "s21"],
    "inteleon": ["s21", "s22"],
    "machamp": ["s12"],
    "umbreon": ["s11"],
    "urshifu": ["s11", "s12"],
    "zeraora": ["s12"],
  };
  // Mapa de Pokémon com itens fixos
  const pokemonFixedItems = {
    "zacian": "rustedsword",
    "mewtwox": "mewtwonitex",
    "mewtwoy": "mewtwonitey",
    "megalucario": "lucarionite",
    "megacharizardx": "charizarditex"
  };

  // Função para criar o seletor de dano crítico
const createCritDamageSelector = () => {
  const critSelectorHTML = `
    <div class="crit-selector-container">
      <label class="crit-checkbox-label">
        <input type="checkbox" class="crit-checkbox" id="crit-damage-checkbox" ${showCritDamage ? 'checked' : ''}>
        <span>Show crit damage?</span>
      </label>
    </div>
  `;
  
  return critSelectorHTML;
};

// Função para criar o seletor de skills dentro do resultado
const createSkillBuildInResult = () => {
  // Remover seletor existente se houver
  const existingSelector = document.querySelector(".skill-build-in-result");
  if (existingSelector) {
    existingSelector.remove();
  }
  
  // Remover ratings existentes
  const existingRatings = document.querySelector(".pokemon-ratings-container");
  if (existingRatings) {
    existingRatings.remove();
  }

  // Remover meta stats antigas
  const existingMetaStats = document.querySelector(".meta-stats-week");
  if (existingMetaStats) {
    existingMetaStats.remove();
  }
  
  // Verificar se temos dados de skills para este Pokémon
  if (!selectedPokemon || !skillDamage[selectedPokemon]) {
    return;
  }
  
  const resultImage = document.querySelector(".resultado-image");
  if (!resultImage) return;
  
  const skills = skillDamage[selectedPokemon];

  // ✅ NOVA LÓGICA: Detectar skills por mapeamento customizado OU lógica padrão
  let hasS1Skills = false;
  let hasS2Skills = false;

  if (CUSTOM_SKILL_MAPPING[selectedPokemon]) {
    // Pokémon com mapeamento customizado (Mew, Absol, Greedent, etc)
    const mapping = CUSTOM_SKILL_MAPPING[selectedPokemon];
    
    if (mapping.s1) {
      // Verifica se PELO MENOS UMA das skills do slot 1 existe
      hasS1Skills = mapping.s1.some(skillKey => skills[skillKey]);
    }
    
    if (mapping.s2) {
      // Verifica se PELO MENOS UMA das skills do slot 2 existe
      hasS2Skills = mapping.s2.some(skillKey => skills[skillKey]);
    }
  } else {
    // Lógica padrão para pokémons normais (2 skills por slot)
    hasS1Skills = skills.s11 || skills.s12;
    hasS2Skills = skills.s21 || skills.s22;
  }
  
  if (!hasS1Skills && !hasS2Skills) return;
  
  // Criar container do seletor
  const skillSelector = document.createElement("div");
  skillSelector.className = "skill-build-in-result";
  
  // Container dos slots de skills
  const slotsContainer = document.createElement("div");
  slotsContainer.className = "skill-build-slots";

  // Criar slot 1 se existir
  if (hasS1Skills) {
    const slot1 = createSkillSlot("S1", "s1", selectedPokemon);
    slotsContainer.appendChild(slot1);
  }

  // Criar slot 2 se existir
  if (hasS2Skills) {
    const slot2 = createSkillSlot("S2", "s2", selectedPokemon);
    slotsContainer.appendChild(slot2);
  }

  skillSelector.appendChild(slotsContainer);

  const routesHTML = createRoutesDisplay();
  if (routesHTML) {
    const routesDiv = document.createElement("div");
    routesDiv.innerHTML = routesHTML;
    skillSelector.appendChild(routesDiv.firstElementChild);
  }
  
  // Inserir o seletor após a role badge
  const roleBadge = resultImage.querySelector(".role-badge");
  if (roleBadge) {
    // Remover seletor de crit existente
    const existingCritSelector = resultImage.querySelector(".crit-selector-container");
    if (existingCritSelector) {
      existingCritSelector.remove();
    }
    
    // Adicionar o seletor de crit
    const critSelector = createCritDamageSelector();
    roleBadge.insertAdjacentHTML("afterend", critSelector);
    
    // Event listener para o checkbox de crit
    setTimeout(() => {
      const critCheckbox = document.getElementById("crit-damage-checkbox");
      if (critCheckbox) {
        const newCheckbox = critCheckbox.cloneNode(true);
        critCheckbox.parentNode.replaceChild(newCheckbox, critCheckbox);
        
        newCheckbox.addEventListener("change", (e) => {
          showCritDamage = e.target.checked;
          calcular();
        });
      }
    }, 100);
    
    // Adicionar ratings
    const ratingsHtml = createPokemonRatings(selectedPokemon);
    if (ratingsHtml) {
      const critContainer = resultImage.querySelector(".crit-selector-container");
      if (critContainer) {
        critContainer.insertAdjacentHTML("afterend", ratingsHtml);
        
        const ratingsContainer = resultImage.querySelector(".pokemon-ratings-container");
        if (ratingsContainer) {
          ratingsContainer.insertAdjacentElement("afterend", skillSelector);
        }
      } else {
        roleBadge.insertAdjacentHTML("afterend", ratingsHtml);
        const ratingsContainer = resultImage.querySelector(".pokemon-ratings-container");
        if (ratingsContainer) {
          ratingsContainer.insertAdjacentElement("afterend", skillSelector);
        } else {
          roleBadge.insertAdjacentElement("afterend", skillSelector);
        }
      }
    } else {
      const critContainer = resultImage.querySelector(".crit-selector-container");
      if (critContainer) {
        critContainer.insertAdjacentElement("afterend", skillSelector);
      } else {
        roleBadge.insertAdjacentElement("afterend", skillSelector);
      }
    }
  } else {
    resultImage.appendChild(skillSelector);
  }
};
// Controle de Muscle Gauge para Buzzwole
const createMuscleGaugeControl = () => {
  if (selectedPokemon !== "buzzwole") return;
  
  const skillsDiv = document.getElementById("skills-column");
  if (!skillsDiv) return;
  
  // Remover controle existente
  const existing = skillsDiv.querySelector(".muscle-gauge-control");
  if (existing) existing.remove();
  
  const gaugeHTML = `
    <div class="muscle-gauge-control" style="background: rgba(220, 53, 69, 0.1); border: 2px solid #dc3545; border-radius: 12px; padding: 15px; margin-bottom: 20px; text-align: center;">
      <div style="color: #dc3545; font-size: 16px; font-weight: bold; margin-bottom: 12px;">Muscle Gauge</div>
      <div class="stack-label-new" style="color: #030303ff">Gauge Level:</div>
      <div class="stack-controls-new" style="justify-content: center;">
        <div class="stack-button muscle-decrease" style="border-color: #dc3545; color: #dc3545; background: rgba(220, 53, 69, 0.1);">−</div>
        <div class="stack-display muscle-display" style="border-color: #dc3545; background: rgba(220, 53, 69, 0.15);">${muscleGauge}</div>
        <div class="stack-button muscle-increase" style="border-color: #dc3545; color: #dc3545; background: rgba(220, 53, 69, 0.1);">+</div>
      </div>
    </div>
  `;
  
  skillsDiv.insertAdjacentHTML("afterbegin", gaugeHTML);
  
  const decreaseBtn = skillsDiv.querySelector(".muscle-decrease");
  const increaseBtn = skillsDiv.querySelector(".muscle-increase");
  const display = skillsDiv.querySelector(".muscle-display");
  
  const updateDisplay = () => {
    display.textContent = muscleGauge;
    decreaseBtn.classList.toggle("disabled", muscleGauge <= 0);
    increaseBtn.classList.toggle("disabled", muscleGauge >= 6);
    display.classList.add("highlighted");
    setTimeout(() => display.classList.remove("highlighted"), 300);
  };
  
  decreaseBtn.addEventListener("click", () => {
    if (muscleGauge > 0) {
      muscleGauge--;
      updateDisplay();
      calcular();
    }
  });
  
  increaseBtn.addEventListener("click", () => {
    if (muscleGauge < 6) {
      muscleGauge++;
      updateDisplay();
      calcular();
    }
  });
  
  updateDisplay();
};

// Controle de Sweet Gauge para Alcremie
const createSweetGaugeControl = () => {
  if (selectedPokemon !== "alcremie") return;
  
  const skillsDiv = document.getElementById("skills-column");
  if (!skillsDiv) return;
  
  // Remover controle existente
  const existing = skillsDiv.querySelector(".sweet-gauge-control");
  if (existing) existing.remove();
  
  const gaugeHTML = `
    <div class="sweet-gauge-control" style="background: rgba(255, 182, 193, 0.1); border: 2px solid #FFB6C1; border-radius: 12px; padding: 15px; margin-bottom: 20px; text-align: center;">
      <div style="color: #FFB6C1; font-size: 16px; font-weight: bold; margin-bottom: 12px;">🍰 Sweet Gauge</div>
      <div class="stack-label-new" style="color: #030303ff">Gauge Status:</div>
      <div class="stack-controls-new" style="justify-content: center;">
        <div class="stack-button sweet-toggle" style="border-color: #FFB6C1; color: #FFB6C1; background: rgba(255, 182, 193, 0.1); min-width: 120px;">${sweetGauge ? "FULL" : "NOT FULL"}</div>
      </div>
    </div>
  `;
  
  skillsDiv.insertAdjacentHTML("afterbegin", gaugeHTML);
  
  const toggleBtn = skillsDiv.querySelector(".sweet-toggle");
  
  const updateDisplay = () => {
    toggleBtn.textContent = sweetGauge ? "FULL" : "NOT FULL";
    toggleBtn.style.background = sweetGauge ? "rgba(255, 182, 193, 0.3)" : "rgba(255, 182, 193, 0.1)";
    toggleBtn.classList.add("highlighted");
    setTimeout(() => toggleBtn.classList.remove("highlighted"), 300);
  };
  
  toggleBtn.addEventListener("click", () => {
    sweetGauge = !sweetGauge;
    updateDisplay();
    calcular();
  });
  
  updateDisplay();
};

// Controle de Chlorophyll Gauge para Leafeon
const createChlorophyllGaugeControl = () => {
  if (selectedPokemon !== "leafeon") return;
  
  const skillsDiv = document.getElementById("skills-column");
  if (!skillsDiv) return;
  
  // Remover controle existente
  const existing = skillsDiv.querySelector(".chlorophyll-gauge-control");
  if (existing) existing.remove();
  
  const gaugeHTML = `
    <div class="chlorophyll-gauge-control" style="background: rgba(76, 175, 80, 0.1); border: 2px solid #4CAF50; border-radius: 12px; padding: 15px; margin-bottom: 20px; text-align: center;">
      <div style="color: #4CAF50; font-size: 16px; font-weight: bold; margin-bottom: 12px;">🍃 Chlorophyll Gauge</div>
      <div class="stack-label-new" style="color: #030303ff">Gauge Status:</div>
      <div class="stack-controls-new" style="justify-content: center;">
        <div class="stack-button chlorophyll-toggle" style="border-color: #4CAF50; color: #4CAF50; background: rgba(76, 175, 80, 0.1); min-width: 120px;">${chlorophyllGauge ? "FULL" : "NOT FULL"}</div>
      </div>
    </div>
  `;
  
  skillsDiv.insertAdjacentHTML("afterbegin", gaugeHTML);
  
  const toggleBtn = skillsDiv.querySelector(".chlorophyll-toggle");
  
  const updateDisplay = () => {
    toggleBtn.textContent = chlorophyllGauge ? "FULL" : "NOT FULL";
    toggleBtn.style.background = chlorophyllGauge ? "rgba(76, 175, 80, 0.3)" : "rgba(76, 175, 80, 0.1)";
    toggleBtn.classList.add("highlighted");
    setTimeout(() => toggleBtn.classList.remove("highlighted"), 300);
  };
  
  toggleBtn.addEventListener("click", () => {
    chlorophyllGauge = !chlorophyllGauge;
    updateDisplay();
    calcular();
  });
  
  updateDisplay();
};

// Controle de Pawmot Mode para Pawmot
const createPawmotModeControl = () => {
  if (selectedPokemon !== "pawmot") return;
  
  const skillsDiv = document.getElementById("skills-column");
  if (!skillsDiv) return;
  
  // Remover controle existente
  const existing = skillsDiv.querySelector(".pawmot-mode-control");
  if (existing) existing.remove();
  
  const modeHTML = `
    <div class="pawmot-mode-control" style="background: rgba(255, 193, 7, 0.1); border: 2px solid #FFC107; border-radius: 12px; padding: 15px; margin-bottom: 20px; text-align: center;">
      <div style="color: #FFC107; font-size: 16px; font-weight: bold; margin-bottom: 12px;">⚡ Battle Mode</div>
      <div class="stack-label-new" style="color: #030303ff">Current Mode:</div>
      <div class="stack-controls-new" style="justify-content: center;">
        <div class="stack-button pawmot-toggle" style="border-color: #FFC107; color: #FFC107; background: rgba(255, 193, 7, 0.1); min-width: 140px;">${pawmotMode ? "FIGHTER MODE" : "NORMAL MODE"}</div>
      </div>
    </div>
  `;
  
  skillsDiv.insertAdjacentHTML("afterbegin", modeHTML);
  
  const toggleBtn = skillsDiv.querySelector(".pawmot-toggle");
  
  const updateDisplay = () => {
    toggleBtn.textContent = pawmotMode ? "FIGHTER MODE" : "NORMAL MODE";
    toggleBtn.style.background = pawmotMode ? "rgba(255, 193, 7, 0.3)" : "rgba(255, 193, 7, 0.1)";
    toggleBtn.classList.add("highlighted");
    setTimeout(() => toggleBtn.classList.remove("highlighted"), 300);
  };
  
  toggleBtn.addEventListener("click", () => {
    pawmotMode = !pawmotMode;
    updateDisplay();
    calcular();
  });
  
  updateDisplay();
};

// Controle de Eon Power para Latias (Dragon Pulse)
const createEonPowerControl = () => {
  if (selectedPokemon !== "latias") return;
  
  const skillsDiv = document.getElementById("skills-column");
  if (!skillsDiv) return;
  
  // Remover controle existente
  const existing = skillsDiv.querySelector(".eon-power-control");
  if (existing) existing.remove();
  
  // Calcular bônus atual
  const currentBonus = eonPower > 100 ? ((eonPower - 100) * 0.5).toFixed(1) : 0;
  const bonusText = eonPower <= 100 
    ? "⚪ Base Damage" 
    : `🟣 +${currentBonus}% Damage Bonus`;
  
  const gaugeHTML = `
    <div class="eon-power-control" style="background: rgba(138, 43, 226, 0.1); border: 2px solid #8a2be2; border-radius: 12px; padding: 15px; margin-bottom: 15px; text-align: center;">
      <div style="color: #8a2be2; font-size: 16px; font-weight: bold; margin-bottom: 12px;">⚡ Eon Power - Dragon Pulse</div>
      <div class="stack-label-new" style="color: #030303ff">Power Level:</div>
      <div class="stack-controls-new" style="justify-content: center;">
        <div class="stack-button eon-decrease" style="border-color: #8a2be2; color: #8a2be2; background: rgba(138, 43, 226, 0.1);">−</div>
        <div class="stack-display eon-display" style="border-color: #8a2be2; background: rgba(138, 43, 226, 0.15); min-width: 70px;">${eonPower}</div>
        <div class="stack-button eon-increase" style="border-color: #8a2be2; color: #8a2be2; background: rgba(138, 43, 226, 0.1);">+</div>
      </div>
      <div class="eon-bonus-text" style="margin-top: 12px; font-size: 12px; color: #666;">
        ${bonusText}
      </div>
      <div style="margin-top: 8px; font-size: 10px; color: #999; font-style: italic;">
        ${eonPower <= 100 ? "Click: +1 (0-100)" : "Click: +1 (101-1099, +0.5% each)"}
      </div>
    </div>
  `;
  
  // Inserir no TOPO (acima de tudo)
  skillsDiv.insertAdjacentHTML("afterbegin", gaugeHTML);
  
  const decreaseBtn = skillsDiv.querySelector(".eon-decrease");
  const increaseBtn = skillsDiv.querySelector(".eon-increase");
  const display = skillsDiv.querySelector(".eon-display");
  const bonusDisplay = skillsDiv.querySelector(".eon-bonus-text");
  const hintText = skillsDiv.querySelector(".eon-power-control > div:last-child");
  
  const updateDisplay = () => {
    display.textContent = eonPower;
    decreaseBtn.classList.toggle("disabled", eonPower <= 0);
    increaseBtn.classList.toggle("disabled", eonPower >= 1099);
    display.classList.add("highlighted");
    
    // Atualizar texto do bônus
    if (eonPower <= 100) {
      bonusDisplay.innerHTML = "⚪ Base Damage";
    } else {
      const bonus = ((eonPower - 100) * 0.5).toFixed(1);
      bonusDisplay.innerHTML = `🟣 +${bonus}% Damage Bonus`;
    }
    
    // Atualizar hint de incremento
    if (hintText) {
      hintText.innerHTML = eonPower <= 100 
        ? "Click: +1 (0-100)" 
        : "Click: +1 (101-1099, +0.5% each)";
    }
    
    setTimeout(() => display.classList.remove("highlighted"), 300);
  };
  
  decreaseBtn.addEventListener("click", () => {
    if (eonPower > 0) {
      if (eonPower === 100) {
        eonPower = 0;
      } else {
        eonPower = Math.max(0, eonPower - 1);
      }
      updateDisplay();
      calcular();
    }
  });
  
  increaseBtn.addEventListener("click", () => {
    if (eonPower < 1099) {
      if (eonPower === 0) {
        eonPower = 100;
      } else {
        eonPower = Math.min(1099, eonPower + 1);
      }
      updateDisplay();
      calcular();
    }
  });
  
  updateDisplay();
};

// Controle de Eon Power 2 para Latias (Dragon Breath)
const createEonPower2Control = () => {
  if (selectedPokemon !== "latias") return;
  
  const skillsDiv = document.getElementById("skills-column");
  if (!skillsDiv) return;
  
  // Remover controle existente
  const existing = skillsDiv.querySelector(".eon-power2-control");
  if (existing) existing.remove();
  
  // Calcular bônus atual - NOVOS VALORES: base 60, máximo 1059
  const currentBonus = eonPower2 > 60 ? ((eonPower2 - 60) * 0.5).toFixed(1) : 0;
  const bonusText = eonPower2 <= 60 
    ? "⚪ Base Damage" 
    : `🟣 +${currentBonus}% Damage Bonus`;
  
  const gaugeHTML = `
    <div class="eon-power2-control" style="background: rgba(75, 0, 130, 0.1); border: 2px solid #4b0082; border-radius: 12px; padding: 15px; margin-bottom: 20px; text-align: center;">
      <div style="color: #4b0082; font-size: 16px; font-weight: bold; margin-bottom: 12px;">⚡ Eon Power - Dragon Breath</div>
      <div class="stack-label-new" style="color: #030303ff">Power Level:</div>
      <div class="stack-controls-new" style="justify-content: center;">
        <div class="stack-button eon2-decrease" style="border-color: #4b0082; color: #4b0082; background: rgba(75, 0, 130, 0.1);">−</div>
        <div class="stack-display eon2-display" style="border-color: #4b0082; background: rgba(75, 0, 130, 0.15); min-width: 70px;">${eonPower2}</div>
        <div class="stack-button eon2-increase" style="border-color: #4b0082; color: #4b0082; background: rgba(75, 0, 130, 0.1);">+</div>
      </div>
      <div class="eon2-bonus-text" style="margin-top: 12px; font-size: 12px; color: #666;">
        ${bonusText}
      </div>
      <div style="margin-top: 8px; font-size: 10px; color: #999; font-style: italic;">
        ${eonPower2 <= 60 ? "Click: +1 (0-60)" : "Click: +1 (61-1059, +0.5% each)"}
      </div>
    </div>
  `;
  
  // Encontrar onde inserir (após o primeiro gauge)
  const firstGauge = skillsDiv.querySelector(".eon-power-control");
  if (firstGauge) {
    // Inserir após o primeiro gauge
    firstGauge.insertAdjacentHTML("afterend", gaugeHTML);
  } else {
    // Se não encontrar o primeiro, inserir no topo
    skillsDiv.insertAdjacentHTML("afterbegin", gaugeHTML);
  }
  
  const decreaseBtn = skillsDiv.querySelector(".eon2-decrease");
  const increaseBtn = skillsDiv.querySelector(".eon2-increase");
  const display = skillsDiv.querySelector(".eon2-display");
  const bonusDisplay = skillsDiv.querySelector(".eon2-bonus-text");
  const hintText = skillsDiv.querySelector(".eon-power2-control > div:last-child");
  
  const updateDisplay = () => {
    display.textContent = eonPower2;
    decreaseBtn.classList.toggle("disabled", eonPower2 <= 0);
    increaseBtn.classList.toggle("disabled", eonPower2 >= 1059);
    display.classList.add("highlighted");
    
    // Atualizar texto do bônus - NOVA BASE: 60
    if (eonPower2 <= 60) {
      bonusDisplay.innerHTML = "⚪ Base Damage";
    } else {
      const bonus = ((eonPower2 - 60) * 0.5).toFixed(1);
      bonusDisplay.innerHTML = `🟣 +${bonus}% Damage Bonus`;
    }
    
    // Atualizar hint de incremento
    if (hintText) {
      hintText.innerHTML = eonPower2 <= 60 
        ? "Click: +1 (0-60)"
        : "Click: +1 (61-1059, +0.5% each)";
    }
    
    setTimeout(() => display.classList.remove("highlighted"), 300);
  };
  
  decreaseBtn.addEventListener("click", () => {
    if (eonPower2 > 0) {
      if (eonPower2 === 60) {
        eonPower2 = 0;
      } else {
        eonPower2 = Math.max(0, eonPower2 - 1);
      }
      updateDisplay();
      calcular();
    }
  });
  
  increaseBtn.addEventListener("click", () => {
    if (eonPower2 < 1059) {
      if (eonPower2 === 0) {
        eonPower2 = 60;
      } else {
        eonPower2 = Math.min(1059, eonPower2 + 1);
      }
      updateDisplay();
      calcular();
    }
  });
  
  updateDisplay();
};

// Controle de Eon Power para Latios
const createEonPowerControlLatios = () => {
  if (selectedPokemon !== "latios") return;
  
  const skillsDiv = document.getElementById("skills-column");
  if (!skillsDiv) return;
  
  // Remover controle existente
  const existing = skillsDiv.querySelector(".eon-power-control");
  if (existing) existing.remove();
  
  // Calcular bônus atual
  const currentBonus = eonPowerlatios > 100 ? ((eonPowerlatios - 100) * 0.5).toFixed(1) : 0;
  const bonusText = eonPowerlatios <= 100 
    ? "⚪ Base Damage" 
    : `🟣 +${currentBonus}% Damage Bonus`;
  
  const gaugeHTML = `
    <div class="eon-power-control" style="background: rgba(138, 43, 226, 0.1); border: 2px solid #8a2be2; border-radius: 12px; padding: 15px; margin-bottom: 15px; text-align: center;">
      <div style="color: #8a2be2; font-size: 16px; font-weight: bold; margin-bottom: 12px;">⚡ Eon Power</div>
      <div class="stack-label-new" style="color: #030303ff">Power Level:</div>
      <div class="stack-controls-new" style="justify-content: center;">
        <div class="stack-button eon-decrease" style="border-color: #8a2be2; color: #8a2be2; background: rgba(138, 43, 226, 0.1);">−</div>
        <div class="stack-display eon-display" style="border-color: #8a2be2; background: rgba(138, 43, 226, 0.15); min-width: 70px;">${eonPowerlatios}</div>
        <div class="stack-button eon-increase" style="border-color: #8a2be2; color: #8a2be2; background: rgba(138, 43, 226, 0.1);">+</div>
      </div>
      <div class="eon-bonus-text" style="margin-top: 12px; font-size: 12px; color: #666;">
        ${bonusText}
      </div>
      <div style="margin-top: 8px; font-size: 10px; color: #999; font-style: italic;">
        ${eonPowerlatios <= 100 ? "Click: +1 (0-100)" : "Click: +1 (101-1099, +0.5% each)"}
      </div>
    </div>
  `;
  
  // Inserir no TOPO (acima de tudo)
  skillsDiv.insertAdjacentHTML("afterbegin", gaugeHTML);
  
  const decreaseBtn = skillsDiv.querySelector(".eon-decrease");
  const increaseBtn = skillsDiv.querySelector(".eon-increase");
  const display = skillsDiv.querySelector(".eon-display");
  const bonusDisplay = skillsDiv.querySelector(".eon-bonus-text");
  const hintText = skillsDiv.querySelector(".eon-power-control > div:last-child");
  
  const updateDisplay = () => {
    display.textContent = eonPowerlatios;
    decreaseBtn.classList.toggle("disabled", eonPowerlatios <= 0);
    increaseBtn.classList.toggle("disabled", eonPowerlatios >= 1099);
    display.classList.add("highlighted");
    
    // Atualizar texto do bônus
    if (eonPowerlatios <= 100) {
      bonusDisplay.innerHTML = "⚪ Base Damage";
    } else {
      const bonus = ((eonPowerlatios - 100) * 0.5).toFixed(1);
      bonusDisplay.innerHTML = `🟣 +${bonus}% Damage Bonus`;
    }
    
    // Atualizar hint de incremento
    if (hintText) {
      hintText.innerHTML = eonPowerlatios <= 100 
        ? "Click: +1 (0-100)" 
        : "Click: +1 (101-1099, +0.5% each)";
    }
    
    setTimeout(() => display.classList.remove("highlighted"), 300);
  };
  
  decreaseBtn.addEventListener("click", () => {
    if (eonPowerlatios > 0) {
      if (eonPowerlatios === 100) {
        eonPowerlatios = 0;
      } else {
        eonPowerlatios = Math.max(0, eonPowerlatios - 1);
      }
      updateDisplay();
      calcular();
    }
  });
  
  increaseBtn.addEventListener("click", () => {
    if (eonPowerlatios < 1099) {
      if (eonPowerlatios === 0) {
        eonPowerlatios = 100;
      } else {
        eonPowerlatios = Math.min(1099, eonPowerlatios + 1);
      }
      updateDisplay();
      calcular();
    }
  });
  
  updateDisplay();
};

// Função para criar um slot de skill
const createSkillSlot = (label, slotKey, pokemon) => {
  const slotContainer = document.createElement("div");
  slotContainer.className = "skill-slot";
  slotContainer.style.position = "relative"; // Para posicionamento do painel
  
  // Label do slot
  const slotLabel = document.createElement("div");
  slotLabel.className = "skill-slot-label";
  slotLabel.textContent = label === "S1" ? "Slot 1" : "Slot 2";
  
  // Círculo seletor
  const circle = document.createElement("div");
  circle.className = "skill-selector-circle";
  circle.dataset.pokemon = pokemon;
  circle.dataset.slot = slotKey;
  
  // Nome da skill selecionada
  const skillName = document.createElement("div");
  skillName.className = "skill-selection-name";
  
  // Verificar se já existe uma seleção para este slot
  const currentSelection = selectedSkills[pokemon]?.[slotKey];
  if (currentSelection) {
    const selectedSkillData = skillDamage[pokemon][currentSelection];
    if (selectedSkillData) {
      circle.classList.add("has-selection");
      
      const img = document.createElement("img");
      img.src = `./estatisticas-shad/images/skills/${pokemon}_${currentSelection}.png`;
      img.alt = selectedSkillData.name;
      img.style.cssText = "border: none !important; box-shadow: none !important; outline: none !important; margin: 0 !important; padding: 0 !important;";
      img.onerror = function() {
        // Tentar com a key padrão se for nomenclatura alternativa
        if (SKILL_KEY_ALIASES[pokemon] && SKILL_KEY_ALIASES[pokemon][currentSelection]) {
          const standardKey = SKILL_KEY_ALIASES[pokemon][currentSelection];
          this.src = `./estatisticas-shad/images/skills/${pokemon}_${standardKey}.png`;
        } else {
          this.src = `./estatisticas-shad/images/skills/${currentSelection}.png`;
        }
      };
      
      circle.appendChild(img);
      skillName.textContent = selectedSkillData.name;
      skillName.classList.add("selected");
    }
  } else {
    // Mostrar + se não houver seleção
    circle.classList.add("empty");
    circle.textContent = "+";
  }
  
  circle.addEventListener("click", (e) => {
  e.stopPropagation();
  
  // Se já existe um painel aberto, fechar
  const existingPanel = document.getElementById("skill-selection-panel");
  if (existingPanel) {
    closeSkillSelectionPanel();
    return;
  }
  
  // Abrir painel de seleção de skills
  openSkillSelectionPanel(pokemon, slotKey, slotContainer);
  });
  
  slotContainer.appendChild(slotLabel);
  slotContainer.appendChild(circle);
  slotContainer.appendChild(skillName);
  
  return slotContainer;
};

// Função para fechar TODOS os painéis abertos
const closeAllSelectionPanels = () => {
  // Fechar painel de skills
  const skillPanel = document.getElementById("skill-selection-panel");
  if (skillPanel) {
    skillPanel.remove();
    document.removeEventListener("click", handleClickOutside);
  }
  
  // Fechar painel de route
  const routePanel = document.getElementById("route-selection-panel");
  if (routePanel) {
    routePanel.remove();
    document.removeEventListener("click", handleRouteClickOutside);
  }
};

// Função para abrir painel de seleção de skill
const openSkillSelectionPanel = (pokemon, slotKey, slotContainer) => {
  // Fechar qualquer painel existente
  closeSkillSelectionPanel();
  closeAllSelectionPanels();
  
  const skills = skillDamage[pokemon];
  if (!skills) return;
  
  // Determinar opções baseadas no slot - verificar mapeamento customizado primeiro
  let options = [];
  
  if (CUSTOM_SKILL_MAPPING[pokemon] && CUSTOM_SKILL_MAPPING[pokemon][slotKey]) {
    // Usar mapeamento customizado
    const customSkills = CUSTOM_SKILL_MAPPING[pokemon][slotKey];
    customSkills.forEach(skillKey => {
      if (skills[skillKey]) {
        options.push({ key: skillKey, data: skills[skillKey] });
      }
    });
  } else {
    // Usar lógica padrão
    if (slotKey === "s1") {
      if (skills.s11) options.push({ key: "s11", data: skills.s11 });
      if (skills.s12) options.push({ key: "s12", data: skills.s12 });
    } else if (slotKey === "s2") {
      if (skills.s21) options.push({ key: "s21", data: skills.s21 });
      if (skills.s22) options.push({ key: "s22", data: skills.s22 });
    }
  }
  
  if (options.length === 0) return;
  
  currentSkillSlot = { pokemon, slotKey, slotContainer };
  
  showSkillSelectionPanel(options, slotContainer);
};

const showSkillSelectionPanel = (options, slotContainer) => {
  // Criar painel
  const panel = document.createElement("div");
  panel.className = "skill-selection-panel show";
  panel.id = "skill-selection-panel";
  
  // Título
  const title = document.createElement("div");
  title.className = "skill-selection-title";
  title.textContent = `Escolher ${currentSkillSlot.slotKey === "s1" ? "Slot 1" : "Slot 2"}`;
  panel.appendChild(title);
  
  // NOVO: Botão de limpar
  const clearButton = document.createElement("button");
  clearButton.className = "clear-skill-button";
  clearButton.textContent = "🗑️ Clear";
  clearButton.addEventListener("click", () => {
    clearSkillSelection();
  });
  panel.appendChild(clearButton);
  
  // Opções
   const optionsContainer = document.createElement("div");
  optionsContainer.className = "skill-options";
  
  // ✅ SUBSTITUIR O LOOP DE OPTIONS POR ESTE:
  options.forEach(option => {
    const optionDiv = document.createElement("div");
    optionDiv.className = "skill-option";
    optionDiv.dataset.skillKey = option.key;
    
    const img = document.createElement("img");
    img.src = `./estatisticas-shad/images/skills/${currentSkillSlot.pokemon}_${option.key}.png`;
    img.alt = option.data.name;
    img.onerror = function() {
      this.src = `./estatisticas-shad/images/skills/${option.key}.png`;
    };
    
    const name = document.createElement("div");
    name.className = "skill-option-name";
    name.textContent = option.data.name;
    
    optionDiv.appendChild(img);
    optionDiv.appendChild(name);
    
    optionDiv.addEventListener("click", () => {
      selectSkill(option.key);
    });
    
    optionsContainer.appendChild(optionDiv);
  });
  
  panel.appendChild(optionsContainer);
  slotContainer.appendChild(panel);
  
  // Fechar ao clicar fora
  setTimeout(() => {
    document.addEventListener("click", handleClickOutside);
  }, 100);
};

// Função para selecionar skill
const selectSkill = (skillKey) => {
  // ✅ LÓGICA ESPECIAL PARA URSHIFU
  if (currentSkillSlot.pokemon === "urshifu") {
    const { pokemon, slotKey } = currentSkillSlot;
    
    // Mapeamento de skills vinculadas
    const linkedSkills = {
      's11': 's21', // Se selecionar s11, auto-selecionar s21
      's12': 's22', // Se selecionar s12, auto-selecionar s22
      's21': 's11', // Se selecionar s21, auto-selecionar s11
      's22': 's12'  // Se selecionar s22, auto-selecionar s12
    };
    
    // Inicializar se necessário
    if (!selectedSkills[pokemon]) {
      selectedSkills[pokemon] = {};
    }
    
    // Selecionar a skill atual
    selectedSkills[pokemon][slotKey] = skillKey;
    
    // Auto-selecionar a skill vinculada no outro slot
    if (linkedSkills[skillKey]) {
      const linkedSkill = linkedSkills[skillKey];
      const otherSlot = slotKey === 's1' ? 's2' : 's1';
      selectedSkills[pokemon][otherSlot] = linkedSkill;
    }
    
    // ✅ NOVO: Controlar visibilidade das ults baseado na seleção
    if (!selectedSkills[pokemon]._urshifuUltMode) {
      selectedSkills[pokemon]._urshifuUltMode = null;
    }
    
    // Determinar qual ult mostrar baseado nas skills selecionadas
    if (skillKey === 's11' || skillKey === 's21') {
      selectedSkills[pokemon]._urshifuUltMode = 'ult'; // Mostrar ult, esconder ult1
    } else if (skillKey === 's12' || skillKey === 's22') {
      selectedSkills[pokemon]._urshifuUltMode = 'ult1'; // Mostrar ult1, esconder ult
    }
    
    closeSkillSelectionPanel();
    createSkillBuildInResult();
    calcular();
    return;
  }
  
  // ✅ COMPORTAMENTO PADRÃO PARA TODOS OS OUTROS POKÉMONS (código original)
  if (!selectedSkills[currentSkillSlot.pokemon]) {
    selectedSkills[currentSkillSlot.pokemon] = {};
  }
  
  selectedSkills[currentSkillSlot.pokemon][currentSkillSlot.slotKey] = skillKey;
  
  closeSkillSelectionPanel();
  createSkillBuildInResult();
  calcular();
};

// Função para limpar seleção de skill
const clearSkillSelection = () => {
  if (!currentSkillSlot) return;
  
  const { pokemon, slotKey } = currentSkillSlot;
  
  // ✅ LÓGICA ESPECIAL PARA URSHIFU - Limpar ambos os slots e resetar ults
  if (pokemon === "urshifu") {
    if (selectedSkills[pokemon]) {
      delete selectedSkills[pokemon].s1;
      delete selectedSkills[pokemon].s2;
      delete selectedSkills[pokemon]._urshifuUltMode; // ✅ NOVO: Resetar modo de ult
    }
  } else {
    // ✅ COMPORTAMENTO PADRÃO PARA OUTROS POKÉMONS (código original)
    if (selectedSkills[pokemon] && selectedSkills[pokemon][slotKey]) {
      delete selectedSkills[pokemon][slotKey];
    }
  }
  
  closeSkillSelectionPanel();
  createSkillBuildInResult();
  calcular();
};

// Função para criar a exibição das rotas com porcentagens
const createRoutesDisplay = () => {
  if (!selectedPokemon || !pokemonRoutesEffectiveness[selectedPokemon]) {
    return ''; // Retorna vazio se não houver dados
  }
  
  const routes = pokemonRoutesEffectiveness[selectedPokemon];
  
  const routesHTML = `
    <div class="routes-display-container">
      <div class="routes-display-title">recommended Routes</div>
      <div class="routes-grid">
        <div class="route-item">
          <img src="./estatisticas-shad/images/lanes/top.png" 
               alt="Top Lane" 
               class="route-image"
               onerror="this.style.display='none'">
          <div class="route-name">Top</div>
          <div class="route-percentage" data-value="${routes.top}">
            ${routes.top}%
          </div>
        </div>
        
        <div class="route-item">
          <img src="./estatisticas-shad/images/lanes/jungle.png" 
               alt="Jungle" 
               class="route-image"
               onerror="this.style.display='none'">
          <div class="route-name">Jungle</div>
          <div class="route-percentage" data-value="${routes.jungle}">
            ${routes.jungle}%
          </div>
        </div>
        
        <div class="route-item">
          <img src="./estatisticas-shad/images/lanes/bot.png" 
               alt="Bot Lane" 
               class="route-image"
               onerror="this.style.display='none'">
          <div class="route-name">Bot</div>
          <div class="route-percentage" data-value="${routes.bot}">
            ${routes.bot}%
          </div>
        </div>
      </div>
    </div>
  `;
  
  return routesHTML;
};

// Função para fechar painel
const closeSkillSelectionPanel = () => {
  const panel = document.getElementById("skill-selection-panel");
  if (panel) {
    panel.remove();
  }
  
  document.removeEventListener("click", handleClickOutside);
  currentSkillSlot = null;
};

// Handler para clique fora
const handleClickOutside = (e) => {
  const panel = document.getElementById("skill-selection-panel");
  const skillSlots = document.querySelectorAll(".skill-slot");
  
  let clickedInsideSkillArea = false;
  skillSlots.forEach(slot => {
    if (slot.contains(e.target)) {
      clickedInsideSkillArea = true;
    }
  });
  
  if (panel && !panel.contains(e.target) && !clickedInsideSkillArea) {
    closeSkillSelectionPanel();
  }
};

// Função para resetar seleções ao trocar de Pokémon
const resetSkillSelections = () => {
  if (selectedPokemon && selectedSkills[selectedPokemon]) {
    // ✅ NOVO: Se for Urshifu, limpar também o controle de ults
    if (selectedPokemon === "urshifu") {
      delete selectedSkills[selectedPokemon]._urshifuUltMode;
    }
    selectedSkills[selectedPokemon] = {};
  }
};

// Função para determinar qual slot uma skill pertence
const getSkillSlot = (pokemon, skillKey) => {
  let standardKey = skillKey;
  if (SKILL_KEY_ALIASES[pokemon] && SKILL_KEY_ALIASES[pokemon][skillKey]) {
    standardKey = SKILL_KEY_ALIASES[pokemon][skillKey];
  }
  // Verificar mapeamento customizado primeiro
  if (CUSTOM_SKILL_MAPPING[pokemon]) {
    const mapping = CUSTOM_SKILL_MAPPING[pokemon];
    for (const [slot, skills] of Object.entries(mapping)) {
      if (skills.includes(skillKey)) {
        return slot;
      }
    }
  }
  
  // Lógica padrão
  if (skillKey === "s11" || skillKey === "s12") return "s1";
  if (skillKey === "s21" || skillKey === "s22") return "s2";
  
  return null; // Para skills que não são de slot (passiva, unite, etc.)
};

// Função para desativar outras skills do mesmo slot
const deactivateOtherSkillsInSlot = (pokemon, currentSkillKey) => {
  const currentSlot = getSkillSlot(pokemon, currentSkillKey);
  if (!currentSlot || !activeSkills[pokemon]) return;
  
  // Encontrar todas as skills do mesmo slot
  let skillsInSlot = [];
  
  if (CUSTOM_SKILL_MAPPING[pokemon] && CUSTOM_SKILL_MAPPING[pokemon][currentSlot]) {
    skillsInSlot = CUSTOM_SKILL_MAPPING[pokemon][currentSlot];
  } else {
    // Lógica padrão
    if (currentSlot === "s1") {
      skillsInSlot = ["s11", "s12"];
    } else if (currentSlot === "s2") {
      skillsInSlot = ["s21", "s22"];
    }
  }
  
  // Desativar todas as outras skills do slot
  skillsInSlot.forEach(skillKey => {
    if (skillKey !== currentSkillKey && activeSkills[pokemon].hasOwnProperty(skillKey)) {
      activeSkills[pokemon][skillKey] = false;
    }
  });
};
  const FIXED_ONLY_ITEMS = new Set(Object.values(pokemonFixedItems));

  // Função para verificar se um item é fixo para o Pokémon atual
  const isFixedItemForCurrentPokemon = (itemKey) => {
    return selectedPokemon && pokemonFixedItems[selectedPokemon] === itemKey;
  };
  
const calculateCooldownForSkill = (baseCooldown, globalCDR, globalEnergyRate, skillKey, modifiedStats, pokemon) => {
  if (!baseCooldown || baseCooldown <= 0) return null;
  
  let totalCDR = 0;
  let totalFlatCDR = 0;
  let specificCooldownReduction = 0;
  let specificCooldownReductionPercent = 0;
  
  const isUltimate = skillKey === "ult" || skillKey === "ult1" || skillKey === "ult2" || skillKey === "ult3" || skillKey === "ult4" || skillKey === "ult5" || skillKey === "ult6" || skillKey === "ult7";
  
  if (isUltimate) {
    totalCDR = globalEnergyRate || 0;
  } else {
    totalCDR = globalCDR || 0;
    totalFlatCDR = modifiedStats.FlatCDR || 0;
  }
  
  // Verificar reduções específicas da skill nos self-buffs
  if (modifiedStats._selfBuffs && modifiedStats._selfBuffs[skillKey]) {
    const skillSelfBuffs = modifiedStats._selfBuffs[skillKey];
    
    if (skillSelfBuffs.CooldownFlat !== undefined && skillSelfBuffs.CooldownFlat !== null) {
      specificCooldownReduction = Number(skillSelfBuffs.CooldownFlat);
    }
    
    if (!isUltimate && skillSelfBuffs.FlatCDR !== undefined && skillSelfBuffs.FlatCDR !== null) {
      totalFlatCDR += Number(skillSelfBuffs.FlatCDR);
    }
    
    if (skillSelfBuffs.CooldownPercent !== undefined && skillSelfBuffs.CooldownPercent !== null) {
      specificCooldownReductionPercent = Number(skillSelfBuffs.CooldownPercent);
    }
  }
  
  // 1. Aplicar CDR/EnergyRate GLOBAL primeiro (limitado a 90%)
  totalCDR = Math.min(totalCDR, 90);
  let currentCooldown = baseCooldown * (1 - (totalCDR / 100));
  
  // 2. Aplicar FlatCDR GLOBAL (apenas para skills normais)
  if (!isUltimate) {
    currentCooldown = Math.max(0.1, currentCooldown - totalFlatCDR);
  }
  
  // 3. Aplicar redução percentual ESPECÍFICA da skill (otherSkillsCooldownReduction com %)
  if (specificCooldownReductionPercent > 0) {
    currentCooldown = currentCooldown * (1 - (specificCooldownReductionPercent / 100));
  }
  
  // 4. Aplicar redução FIXA em segundos ESPECÍFICA da skill (otherSkillsCooldownReduction sem %)
  if (specificCooldownReduction > 0) {
    currentCooldown = Math.max(0.1, currentCooldown - specificCooldownReduction);
  }
  
  // 5. Garantir mínimo de 0.1s
  const finalCooldown = Math.max(0.1, currentCooldown);
  
  return finalCooldown;
};

  const formatCooldown = (cooldown) => {
    if (cooldown === null || cooldown === undefined) return "";
    return `🕒 ${cooldown.toFixed(1)}s`;
  };

  // Configuração de atributos
  const STAT_KEYS = [
    "HP","ATK","DEF","SpATK","SpDEF","Speed",
    "AtkSPD","CDR","CritRate","CritDmg","Lifesteal",
    "HPRegen","EnergyRate", "Shield", "DmgTaken", "HindRed",
    "SpDEFPen", "DEFPen"
  ];

  const STAT_LABELS = {
    HP: "HP", ATK: "ATK", DEF: "DEF",
    SpATK: "Sp. ATK", SpDEF: "Sp. DEF", Speed: "Speed",
    AtkSPD: "Atk Speed", CDR: "CDR",
    CritRate: "Crit Rate", CritDmg: "Crit Dmg",
    Lifesteal: "Lifesteal", HPRegen: "HP Regen",
    EnergyRate: "Energy Rate", Shield: "Shield", 
    DmgTaken: "Dmg Taken Reduction", HindRed: "Hindrance Reduction",
    SpDEFPen: "Sp. DEF Penetration", DEFPen: "Defense Penetration"
  };

  const PERCENT_KEYS = new Set(["AtkSPD","CDR","CritRate","CritDmg","Lifesteal","EnergyRate", "Shield", "DmgTaken", "HindRed", "HPRegen","SpDEFPen", "DEFPen"]);

  // Função para adicionar um modificador ao rastreamento
  const addStatModifier = (stat, value, source, type = "flat", iconPath = null) => {
    if (!statModifiers[stat]) {
      statModifiers[stat] = { base: 0, modifications: [], total: 0 };
    }
    
    // Evitar duplicatas da mesma fonte
    const existingIndex = statModifiers[stat].modifications.findIndex(
      mod => mod.source === source && mod.type === type
    );
    
    if (existingIndex !== -1) {
      // Atualizar valor existente
      statModifiers[stat].modifications[existingIndex].value += value;
    } else {
      // Adicionar novo modificador
      statModifiers[stat].modifications.push({
        value: value,
        source: source,
        type: type,
        iconPath: iconPath
      });
    }
  };

const generateStatDetailsHTML = (stat, baseValue, modifiedValue) => {
  const modifiers = statModifiers[stat];
  if (!modifiers || modifiers.modifications.length === 0) {
    return "";
  }
  
  const isPercent = PERCENT_KEYS.has(stat);
  
  // Ordenar modificadores: flat primeiro, depois percent
  const sortedMods = [...modifiers.modifications].sort((a, b) => {
    const order = { flat: 1, percent: 2, "emblem-percent": 2.5, "speed-percent": 2.5, formula: 3 };
    return (order[a.type] || 999) - (order[b.type] || 999);
  });
    
  const modifiersHTML = sortedMods.map(mod => {
    const isPositive = mod.value >= 0;
    const valueClass = isPositive ? "positive" : "negative";
    const sign = isPositive ? "+" : "";
    
    let displayValue = "";
    
    // CORREÇÃO: Calcular displayValue baseado no tipo de stat e tipo de modificador
    if (mod.type === "percent") {
    const baseStatValue = statModifiers[stat].base || 0;
    if (baseStatValue !== 0) {
      const originalPercent = (mod.value / baseStatValue) * 100;
      displayValue = `${originalPercent > 0 ? '+' : ''}${originalPercent.toFixed(1)}%`;
    } else {
      displayValue = `${mod.value > 0 ? '+' : ''}${mod.value.toFixed(1)}`;
    }
    } else if (mod.type === "emblem-percent") {
      // Emblemas que afetam stats não-percentuais: valor JÁ É percentual
      displayValue = `${sign}${mod.value.toFixed(1)}%`;
    } else if (mod.type === "speed-percent") {
      // Speed com buff percentual: valor JÁ É percentual
      displayValue = `${sign}${mod.value.toFixed(1)}%`;
    } else if (isPercent && mod.type === "flat") {
      // Stats percentuais (CDR, CritRate, etc) com modificador flat
      displayValue = `${sign}${mod.value.toFixed(1)}%`;
    } else {
      // Modificadores flat em stats numéricos (ex: +50 ATK)
      displayValue = `${sign}${Math.round(mod.value)}`;
    }
    
    const iconHTML = mod.customIcon 
      ? mod.customIcon
      : mod.iconPath 
        ? `<img src="${mod.iconPath}" class="modifier-icon" alt="${mod.source}" onerror="this.style.display='none'">`
        : `<div class="modifier-icon" style="background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 4px;"></div>`;
    
    // Badge do tipo - ajustado para emblemas
    let typeBadgeText = mod.type;
    if (mod.type === "emblem-percent" || mod.type === "speed-percent") {
      typeBadgeText = "percent";
    }
    
    return `
      <div class="modifier-item">
        <div class="modifier-source">
          ${iconHTML}
          <span class="modifier-name">${mod.source}</span>
        </div>
        <div class="modifier-value ${valueClass}">
          ${displayValue}
          <span class="modifier-type-badge ${mod.type === "emblem-percent" ? "percent" : mod.type}">${typeBadgeText}</span>
        </div>
      </div>
    `;
  }).join("");
  
  return `
    <div class="stat-details" id="details-${stat}">
      <div class="modifiers-list">
        ${modifiersHTML}
      </div>
    </div>
  `;
};

  const ensureAllStats = (obj) => {
    const out = { ...obj };
    STAT_KEYS.forEach(k => { if (out[k] === undefined) out[k] = 0; });
    return out;
  };

const formatValue = (key, val, extraFixed = null) => {
  if (val === null || val === undefined || Number.isNaN(Number(val))) return "-";
  
  // Tratar debuffs como porcentagem
  const DEBUFF_KEYS = new Set(["DEF", "SpDEF", "Speed", "ATK", "SpATK", "HP"]);
  if (DEBUFF_KEYS.has(key) && typeof key === "string" && key.includes("Reduction")) {
    return `${Number(val).toFixed(1)}%`;
  }
  
  if (key === "DmgTaken") {
    const percentText = `${Number(val).toFixed(1)}%`;
    if (extraFixed !== null) {
      return `${percentText} <span style="color:#888;">(-${extraFixed})</span>`;
    }
    return percentText;
  }

  if (PERCENT_KEYS.has(key)) return `${Number(val).toFixed(1)}%`;
  
  // Aplicar arredondamento customizado para valores numéricos
  return customRound(Number(val));
};

  const statLine = (label, valueHtml) =>
    `<div class="stat-line"><span class="stat-label">${label}</span><span class="stat-value">${valueHtml}</span></div>`;

  const safeCap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;

  // Itens que stackam
  const STACKABLE_ITEMS = {
    "Attack Weight": { stat: "ATK", perStack: 12, max: 6, percent: false, startFromZero: true },
    "Sp. Atk Specs": { stat: "SpATK", perStack: 16, max: 6, percent: false, startFromZero: true },
    "Aeos Cookie": { stat: "HP", perStack: 200, max: 6, percent: false, startFromZero: true },
    "Accel Bracer": { stat: "ATK", perStack: 0.6, max: 20, percent: true, startFromZero: true },
    "Drive Lens": { stat: "SpATK", perStack: 0.6, max: 20, percent: true, startFromZero: true },
    "Weakness Police": { stat: "ATK", perStack: 2.5, max: 4, percent: true, startFromZero: true },
    "Charging Charm": { stat: "ATK", perStack: 70, max: 1, percent: true, fixedBonus: 40, startFromZero: true }
  };

  const getItemPassivesSource = () => {
    return gameHeldItensPassive;
  };

  const applyItemPassiveEffects = (baseStats, modifiedStats, selectedItems) => {
    const passives = getItemPassivesSource();
    let result = ensureAllStats({ ...modifiedStats });

    selectedItems.forEach(itemKey => {
      if (!activeItemPassives[itemKey]) return;
      
      const passive = passives[itemKey];
      if (!passive) return;

      if (itemKey === "razorclaw") return;

      if (typeof passive.formula === "function") {
        const targetStat = passive.target || "SpATK";
        // ✅ CORREÇÃO: Usar modifiedStats em vez de baseStats
        result[targetStat] += passive.formula(modifiedStats);
        return;
      }

      Object.entries(passive).forEach(([stat, rawVal]) => {
        if (!STAT_KEYS.includes(stat)) return;

        const isPercentString = (typeof rawVal === "string" && rawVal.includes("%"));
        const numeric = parseFloat(String(rawVal).replace("%","").replace(",", "."));
        if (!Number.isFinite(numeric)) return;

        if (PERCENT_KEYS.has(stat)) {
          result[stat] += numeric;
        } else {
          if (isPercentString) {
            // ✅ CORREÇÃO: Usar modifiedStats em vez de baseStats
            const baseForBuff = Number(modifiedStats[stat]) || 0;
            result[stat] += baseForBuff * (numeric / 100);
          } else {
            result[stat] += numeric;
          }
        }
      });
    });

    return ensureAllStats(result);
  };

  // Emblemas
  const EMBLEM_BONUSES = {
    green: { stat: "SpATK", values: { 2: 1, 4: 2, 6: 4 } },
    red: { stat: "AtkSPD", values: { 3: 2, 5: 4, 7: 8 } },
    blue: { stat: "DEF", values: { 2: 2, 4: 4, 6: 8 } },
    white: { stat: "HP", values: { 2: 1, 4: 2, 6: 4 } },
    black: { stat: "CDR", values: { 3: 1, 5: 2, 7: 4 } },
    yellow: { stat: "Speed", values: { 3: 4, 5: 6, 7: 12 } },
    brown: { stat: "ATK", values: { 2: 1, 4: 2, 6: 4 } },
    purple: { stat: "SpDEF", values: { 2: 2, 4: 4, 6: 8 } },
    gray: { stat: "DmgTaken", values: { 3: 3, 5: 6, 7: 12 } },
    pink: { stat: "HindRed", values: { 3: 4, 5: 8, 7: 16 } },
    navy: { stat: "EnergyRate", values: { 3: 1, 5: 2, 7: 4 } },
  };

  // Funções para o novo sistema de emblemas
  const createEmblemsGrid = () => {
    const grid = document.getElementById("emblems-grid");
    if (!grid) return;
    
    grid.innerHTML = "";

    Object.keys(EMBLEM_DATA).forEach(emblemKey => {
      const emblem = EMBLEM_DATA[emblemKey];
      
      const emblemDiv = document.createElement("div");
      emblemDiv.className = "emblem-item-new";
      
      const circle = document.createElement("div");
      circle.className = `emblem-color-circle emblem-${emblemKey}`;
      circle.dataset.emblem = emblemKey;
      
      if (selectedEmblems[emblemKey]) {
        circle.classList.add("selected-level");
        circle.dataset.level = selectedEmblems[emblemKey];
      }
      
      const name = document.createElement("div");
      name.className = "emblem-name";
      name.textContent = emblem.name;
      
      const levelsContainer = document.createElement("div");
      levelsContainer.className = "emblem-levels";
      
      Object.keys(emblem.levels).forEach(level => {
        const levelBtn = document.createElement("div");
        levelBtn.className = "emblem-level-btn";
        levelBtn.textContent = level;
        levelBtn.dataset.emblem = emblemKey;
        levelBtn.dataset.level = level;
        
        if (selectedEmblems[emblemKey] == level) {
          levelBtn.classList.add("active");
          circle.classList.add("active");
        }
        
        levelBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          selectEmblemLevel(emblemKey, level);
        });
        
        levelsContainer.appendChild(levelBtn);
      });
      
      circle.addEventListener("click", () => {
        if (selectedEmblems[emblemKey]) {
          deselectEmblem(emblemKey);
        }
      });
      
      emblemDiv.appendChild(circle);
      emblemDiv.appendChild(name);
      emblemDiv.appendChild(levelsContainer);
      grid.appendChild(emblemDiv);
    });
  };

  const createMapBuffsGrid = () => {
  const grid = document.getElementById("map-buffs-grid");
  if (!grid) return;
  
  grid.innerHTML = "";

  Object.keys(MAP_BUFFS_DATA).forEach(buffKey => {
    const buff = MAP_BUFFS_DATA[buffKey];
    
    const buffDiv = document.createElement("div");
    buffDiv.className = "map-buff-item-new";
    
    const circle = document.createElement("div");
    circle.className = "map-buff-image-circle";
    circle.dataset.buff = buffKey;
    
    if (selectedMapBuffs[buffKey]) {
      circle.classList.add("active");
    }
    
    const img = document.createElement("img");
    img.src = buff.image;
    img.alt = buff.name;
    img.onerror = function() {
      this.src = "./estatisticas-shad/images/objetivos/placeholder.png";
    };
    
    circle.appendChild(img);
    
    const name = document.createElement("div");
    name.className = "map-buff-name";
    name.textContent = buff.name;
    
    circle.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMapBuff(buffKey);
    });
    
    buffDiv.appendChild(circle);
    buffDiv.appendChild(name);
    grid.appendChild(buffDiv);
  });
};

const toggleMapBuff = (buffKey) => {
  const buff = MAP_BUFFS_DATA[buffKey];
  
  // Se for um buff mutuamente exclusivo (regis)
  if (buff.mutuallyExclusive && buff.group === "regi") {
    // Se clicar no mesmo regi já selecionado, desmarcar todos
    if (selectedMapBuffs[buffKey]) {
      delete selectedMapBuffs[buffKey];
    } else {
      // Desselecionar outros regis
      Object.keys(selectedMapBuffs).forEach(key => {
        if (MAP_BUFFS_DATA[key].group === "regi") {
          delete selectedMapBuffs[key];
        }
      });
      
      // Desselecionar Groudon se houver conflito
      if (buff.conflictsWith) {
        Object.keys(selectedMapBuffs).forEach(key => {
          if (MAP_BUFFS_DATA[key].group === buff.conflictsWith) {
            delete selectedMapBuffs[key];
          }
        });
      }
      
      // Selecionar o atual
      selectedMapBuffs[buffKey] = true;
    }
  }
  // Se for Groudon (legendary)
  else if (buff.group === "legendary") {
    // Se clicar no Groudon já selecionado, desmarcar
    if (selectedMapBuffs[buffKey]) {
      delete selectedMapBuffs[buffKey];
    } else {
      // Desselecionar todos os Regis
      Object.keys(selectedMapBuffs).forEach(key => {
        if (MAP_BUFFS_DATA[key].group === "regi") {
          delete selectedMapBuffs[key];
        }
      });
      
      // Selecionar Groudon
      selectedMapBuffs[buffKey] = true;
    }
  }
  // Toggle normal para buffs não exclusivos (Accelgor, Escavalier)
  else {
    if (selectedMapBuffs[buffKey]) {
      delete selectedMapBuffs[buffKey];
    } else {
      selectedMapBuffs[buffKey] = true;
    }
  }
  
  updateMapBuffDescription();
  createMapBuffsGrid();
  calcular();
};

const updateMapBuffDescription = () => {
  const descContainer = document.getElementById("map-buff-description");
  if (!descContainer) return;
  
  const selectedKeys = Object.keys(selectedMapBuffs);
  
  if (selectedKeys.length === 0) {
    descContainer.className = "map-buff-description empty";
    descContainer.innerHTML = "Select map buffs to see their effects";
    return;
  }
  
  descContainer.className = "map-buff-description active";
  
  const buffLines = selectedKeys.map(buffKey => {
    const buff = MAP_BUFFS_DATA[buffKey];
    const indicator = `<span class="map-buff-indicator" style="background-color: ${buff.color};"></span>`;
    
    return `<div class="map-buff-info-line">${indicator}<span><strong>${buff.name}:</strong> ${buff.description}</span></div>`;
  }).join("");
  
  descContainer.innerHTML = buffLines;
};

  const selectEmblemLevel = (emblemKey, level) => {
    if (selectedEmblems[emblemKey] == level) {
      deselectEmblem(emblemKey);
      return;
    }
    
    selectedEmblems[emblemKey] = level;
    updateEmblemDescription();
    createEmblemsGrid();
    calcular();
  };

  const deselectEmblem = (emblemKey) => {
    delete selectedEmblems[emblemKey];
    updateEmblemDescription();
    createEmblemsGrid();
    calcular();
  };

  const updateEmblemDescription = () => {
    const descContainer = document.getElementById("emblem-description");
    if (!descContainer) return;
    
    const selectedKeys = Object.keys(selectedEmblems);
    
    if (selectedKeys.length === 0) {
      descContainer.className = "emblem-description empty";
      descContainer.innerHTML = "Selecione um emblema e seu nível para ver a descrição do buff";
      return;
    }
    
    descContainer.className = "emblem-description active";
    
    // Cria cada linha de emblema separadamente
    const emblemLines = selectedKeys.map(emblemKey => {
      const emblem = EMBLEM_DATA[emblemKey];
      const level = selectedEmblems[emblemKey];
      const bonus = emblem.levels[level];
      
      const indicator = `<span class="emblem-color-indicator" style="background-color: ${emblem.color}; ${emblem.color === '#ffffff' ? 'border: 1px solid #ccc;' : ''}"></span>`;
      
      // Cada emblema em sua própria linha com estrutura organizada
      if (emblemKey === "gray") {
        return `<div class="emblem-info-line">${indicator}<span><strong>${emblem.name} Nv.${level}:</strong> -${bonus} Dmg Taken</span></div>`;
      } else {
        return `<div class="emblem-info-line">${indicator}<span><strong>${emblem.name} Nv.${level}:</strong> +${bonus}% ${emblem.stat}</span></div>`;
      }
    }).join("");
    
    descContainer.innerHTML = emblemLines;
  };

  // Função para atualizar o display e botões do nível
  const updateLevelDisplay = () => {
    levelDisplay.textContent = currentLevel;
    levelDecrease.classList.toggle("disabled", currentLevel <= 1);
    levelIncrease.classList.toggle("disabled", currentLevel >= 15);
    
    levelSelect.value = currentLevel;
    levelValor.textContent = currentLevel;
    
    levelDisplay.classList.add("highlighted");
    setTimeout(() => levelDisplay.classList.remove("highlighted"), 300);
  };

  // Event listeners para os botões de nível
  levelDecrease.addEventListener("click", () => {
    if (currentLevel > 1) {
      currentLevel--;
      updateLevelDisplay();
      calcular();
    }
  });

  levelIncrease.addEventListener("click", () => {
    if (currentLevel < 15) {
      currentLevel++;
      updateLevelDisplay();
      calcular();
    }
  });

  // Inicializar estado dos botões
  updateLevelDisplay();

const applyActiveSkillBuffs = (stats, pokemon, baseStats) => {
  if (!skillDamage[pokemon] || !activeSkills[pokemon]) {
    return stats;
  }

  let modifiedStats = { ...stats };
  const skills = skillDamage[pokemon];
  
  // Objeto para acumular debuffs por tipo de stat
  const debuffsAcumulados = {};
  const allyBuffsAcumulados = {};
  
  // Objeto para armazenar self-buffs por skill (não afetam stats globais)
  if (!modifiedStats._selfBuffs) {
    modifiedStats._selfBuffs = {};
  }

  Object.keys(activeSkills[pokemon]).forEach(skillKey => {
  if (!activeSkills[pokemon][skillKey]) return;

  const skill = skills[skillKey];
  if (!skill) return;

  try {
    
     if (skill.nextBasicAttackPercent !== undefined) {
      if (!modifiedStats._nextBasicAttackPercents) {
        modifiedStats._nextBasicAttackPercents = [];
      }
      
      modifiedStats._nextBasicAttackPercents.push({
        value: skill.nextBasicAttackPercent,
        source: skill.name || skillKey
      });
    }

// === PROCESSAMENTO DE conditionalBuffs para SKILL ATIVA (inclui tratamento correto de CooldownPercent) ===
if (skill.conditionalBuffs && activeSkills[pokemon] && activeSkills[pokemon][skillKey]) {
  // Determina estado do gauge (ex: "full" / "notFull") — adapte se seu nome de estado for diferente
  let gaugeState = null;
  // Exemplo: seu código pode ter chlorophyllGauge boolean ou objeto; tentamos detectar ambos:
  try {
    // caso você tenha variável global/escopo chamada chlorophyllGauge (boolean)
    if (typeof chlorophyllGauge !== "undefined") {
      gaugeState = chlorophyllGauge ? "full" : "notFull";
    } else if (activeSkills[pokemon] && activeSkills[pokemon].gaugeState) {
      // caso o estado do gauge esteja anexado em activeSkills[pokemon].gaugeState
      gaugeState = activeSkills[pokemon].gaugeState;
    }
  } catch (e) {
    // fallback silencioso — se não soubermos, deixamos null e não aplicamos conditional
    gaugeState = null;
  }

  // se definimos um estado e existem conditionalBuffs para ele, vamos aplicar
  if (gaugeState && skill.conditionalBuffs[gaugeState]) {
    const conditionalBuffsToApply = skill.conditionalBuffs[gaugeState];

    Object.keys(conditionalBuffsToApply).forEach(stat => {
      const rawVal = conditionalBuffsToApply[stat];

      // sanity checks
      if (rawVal === undefined || rawVal === null) return;

      // --- TRATAMENTO ESPECIAL: CooldownPercent (deve somar ao selfBuff da skill) ---
      if (stat === "CooldownPercent") {
        // normalizar string para número: "50%" -> 50 ; "+50%" -> 50 ; "50" -> 50
        const cooldownReduction = parseFloat(String(rawVal).replace("%", "").replace("+", "").replace(",", "."));
        if (!Number.isFinite(cooldownReduction)) return;

        // garantir estrutura de armazenamento
        if (!modifiedStats._selfBuffs) modifiedStats._selfBuffs = {};
        if (!modifiedStats._selfBuffs[skillKey]) modifiedStats._selfBuffs[skillKey] = {};

        // somar ao existente (pode já ter selfBuff de 50%)
        if (!modifiedStats._selfBuffs[skillKey].CooldownPercent) {
          modifiedStats._selfBuffs[skillKey].CooldownPercent = 0;
        }
        modifiedStats._selfBuffs[skillKey].CooldownPercent += cooldownReduction;

        // (opcional) registrar para UI/debug se função existir
        try {
          if (typeof addStatModifier === "function") {
            const skillName = (skill && skill.name) ? skill.name : skillKey;
            const label = `${skillName} — conditional (${String(gaugeState)})`;
            // id único por skill para evitar duplicatas
            addStatModifier(`CooldownPercent-${pokemon}-${skillKey}`, `${cooldownReduction}%`, label, "percent");
          }
        } catch (e) {
          // ignore
        }

        return; // já tratamos esse stat — pular processamento genérico abaixo
      }

      // --- TRATAMENTO GENERICO PARA OUTROS STATS DENTRO DE conditionalBuffs ---
      // suporte a formatos como "15%", "10", +5, "-3", etc.
      const asString = String(rawVal);
      // percentuais
      if (asString.includes("%")) {
        const num = parseFloat(asString.replace("%", "").replace("+", "").replace(",", "."));
        if (!Number.isFinite(num)) return;
        // garantir caminho para stat percentual (ex: modifiedStats._percentModifiers[stat])
        if (!modifiedStats._percentModifiers) modifiedStats._percentModifiers = {};
        if (!modifiedStats._percentModifiers[stat]) modifiedStats._percentModifiers[stat] = 0;
        modifiedStats._percentModifiers[stat] += num;
        // opcional: UI trace
        try {
          if (typeof addStatModifier === "function") {
            addStatModifier(`${stat}-${pokemon}-${skillKey}`, `${num}%`, `${skill.name || skillKey} (${gaugeState})`, "percent");
          }
        } catch (e) {}
      } else {
        // valor absoluto / flat
        const num = parseFloat(asString.replace("+", "").replace(",", "."));
        if (!Number.isFinite(num)) return;
        if (!modifiedStats._flatModifiers) modifiedStats._flatModifiers = {};
        if (!modifiedStats._flatModifiers[stat]) modifiedStats._flatModifiers[stat] = 0;
        modifiedStats._flatModifiers[stat] += num;
        try {
          if (typeof addStatModifier === "function") {
            addStatModifier(`${stat}-${pokemon}-${skillKey}`, num, `${skill.name || skillKey} (${gaugeState})`, "flat");
          }
        } catch (e) {}
      }
    });
  }
} // fim if skill.conditionalBuffs...
// === FIM do bloco conditionalBuffs ===


// **1.5 PROCESSAR debuffs condicionais**
// ⚠️ SÓ APLICA SE A SKILL ESTIVER ATIVA
if (skill.conditionalDebuffs && activeSkills[pokemon] && activeSkills[pokemon][skillKey]) {
  let gaugeState = null;
  
  // Determinar estado do gauge
  if (pokemon === "leafeon") {
    gaugeState = chlorophyllGauge ? "full" : "notFull";
  } else if (pokemon === "alcremie") {
    gaugeState = sweetGauge ? "full" : "notFull";
  } else if (pokemon === "pawmot") { // ✅ NOVO
    gaugeState = pawmotMode ? "fighterMode" : "normalMode";
  }
  
  if (gaugeState && skill.conditionalDebuffs[gaugeState]) {
    const conditionalDebuffsToApply = skill.conditionalDebuffs[gaugeState];
    
    Object.keys(conditionalDebuffsToApply).forEach(debuffStat => {
      if (debuffStat === 'debuffLabels') return;
      
      const debuffValue = conditionalDebuffsToApply[debuffStat];
      if (debuffValue === undefined || debuffValue === null || debuffValue === "") return;
      
      const numericValue = parseFloat(String(debuffValue).replace(/[^\d.-]/g, ''));
      if (!Number.isFinite(numericValue) || numericValue === 0) return;
      
      if (!debuffsAcumulados[debuffStat]) {
        debuffsAcumulados[debuffStat] = {
          total: 0,
          skills: [],
          customLabel: null
        };
      }
      
      debuffsAcumulados[debuffStat].total += numericValue;
      debuffsAcumulados[debuffStat].skills.push({
        name: `${skill.name || skillKey} (${gaugeState === "full" ? "Full Gauge" : "Not Full"})`,
        value: numericValue
      });
      
      if (skill.conditionalDebuffs.debuffLabels && skill.conditionalDebuffs.debuffLabels[debuffStat]) {
        debuffsAcumulados[debuffStat].customLabel = skill.conditionalDebuffs.debuffLabels[debuffStat];
      }
    });
  }
}

    if (pokemon === "buzzwole" && skill.conditionalGaugeBuffs && muscleGauge in skill.conditionalGaugeBuffs) {
        const gaugeBuffs = skill.conditionalGaugeBuffs[muscleGauge];
        
        if (gaugeBuffs && currentLevel >= 11) { // Só aplica no Level 11+
          if (!modifiedStats._selfBuffs[skillKey]) {
            modifiedStats._selfBuffs[skillKey] = {};
          }
          
          Object.keys(gaugeBuffs).forEach(stat => {
            const value = gaugeBuffs[stat];
            if (!modifiedStats._selfBuffs[skillKey][stat]) {
              modifiedStats._selfBuffs[skillKey][stat] = 0;
            }
            modifiedStats._selfBuffs[skillKey][stat] += value;
          });
        }
      }

      // ✅ NOVO: PROCESSAR conditionalBuffs (buffs que dependem do modo/gauge)
if (skill.conditionalBuffs && activeSkills[pokemon] && activeSkills[pokemon][skillKey]) {
  let gaugeState = null;
  
  // Determinar estado do gauge baseado no pokémon
  if (pokemon === "leafeon") {
    gaugeState = chlorophyllGauge ? "full" : "notFull";
  } else if (pokemon === "alcremie") {
    gaugeState = sweetGauge ? "full" : "notFull";
  } else if (pokemon === "pawmot") {
    gaugeState = pawmotMode ? "fighterMode" : "normalMode";
  }
  
  // Aplicar os buffs condicionais aos stats
  if (gaugeState && skill.conditionalBuffs[gaugeState]) {
    const conditionalBuffsToApply = skill.conditionalBuffs[gaugeState];
    
    Object.keys(conditionalBuffsToApply).forEach(stat => {
      const rawVal = conditionalBuffsToApply[stat];
      if (rawVal === undefined || rawVal === null || rawVal === "") return;
      
      const numericValue = parseFloat(String(rawVal).replace(/[^\d.-]/g, ''));
      if (!Number.isFinite(numericValue) || numericValue === 0) return;
      
      const skillName = skill.name || skillKey;
      const iconPath = `./estatisticas-shad/images/skills/${pokemon}_${skillKey}.png`;
      
      if (modifiedStats.hasOwnProperty(stat)) {
        const isPercentString = (typeof rawVal === "string" && rawVal.includes("%"));
        
        // Stats percentuais (CDR, AtkSPD, CritRate, etc)
        if (PERCENT_KEYS.has(stat)) {
          modifiedStats[stat] += numericValue;
          addStatModifier(stat, numericValue, `${skillName} (${gaugeState})`, "flat", iconPath);
        }
        // Damage Taken Reduction
        else if (stat === "DmgTaken") {
          modifiedStats[stat] += numericValue;
          addStatModifier(stat, numericValue, `${skillName} (${gaugeState})`, "flat", iconPath);
        }
        // Stats numéricos (HP, ATK, DEF, etc)
        else {
          if (isPercentString) {
            // Buff percentual baseado no valor base
            const bonusValue = baseStats[stat] * (numericValue / 100);
            modifiedStats[stat] += bonusValue;
            addStatModifier(stat, bonusValue, `${skillName} (${gaugeState})`, "percent", iconPath);
          } else {
            // Buff flat
            modifiedStats[stat] += numericValue;
            addStatModifier(stat, numericValue, `${skillName} (${gaugeState})`, "flat", iconPath);
          }
        }
      }
    });
  }
}
      
    // Aplicar buffs básicos GLOBAIS da skill (afetam o personagem inteiro)
if (skill.buff && typeof skill.buff === 'object') {
  Object.keys(skill.buff).forEach(stat => {
    // Condições especiais para Blastoise - s11
    if (pokemon === "blastoise" && skillKey === "s11") {
      if (!(activeSkills[pokemon]?.s22)) {
        return;
      }
    }
    
    // Condições especiais para Blastoise - s12 Speed
    if (pokemon === "blastoise" && skillKey === "s12" && stat === "Speed") {
      if (!(activeSkills[pokemon]?.s22)) {
        return;
      }
    }
    
    // Condições especiais para Espeon - s12 HPRegen
    if (pokemon === "espeon" && skillKey === "s12" && stat === "HPRegen") {
      if (!(activeSkills[pokemon]?.s22)) {
        return;
      }
    }

    const skillName = skill.name || skillKey;
    const iconPath = `./estatisticas-shad/images/skills/${pokemon}_${skillKey}.png`;

    if (modifiedStats.hasOwnProperty(stat) || stat === "FlatCDR") {
      const rawVal = skill.buff[stat];
      const isPercentString = (typeof rawVal === "string" && rawVal.includes("%"));
      
      // Preservar o sinal negativo
      let numericStr = String(rawVal).replace("%","").replace(",", ".");
      if (numericStr.startsWith("+")) {
        numericStr = numericStr.substring(1);
      }
      const numeric = parseFloat(numericStr);

      if (!Number.isFinite(numeric)) return;

      if (stat === "FlatCDR") {
        if (!modifiedStats[stat]) modifiedStats[stat] = 0;
        modifiedStats[stat] += numeric;
        addStatModifier(stat, numeric, skillName, "flat", iconPath);
      }
      // Para stats percentuais (Speed, AtkSPD, CDR, etc.)
      else if (PERCENT_KEYS.has(stat)) {
        // ✅ CORREÇÃO CRÍTICA: Para Speed e HPRegen com %, usar o VALOR JÁ MODIFICADO
        if ((stat === "Speed" || stat === "HPRegen") && isPercentString) {
          // ✅ USAR modifiedStats (valor atual) ao invés de baseStats (valor inicial)
          const currentValue = modifiedStats[stat] || 0;
          const bonusValue = currentValue * (numeric / 100);
          modifiedStats[stat] += bonusValue;
          addStatModifier(stat, bonusValue, skillName, "percent", iconPath);
        } else {
          // Outros stats percentuais: adicionar diretamente
          modifiedStats[stat] += numeric;
          addStatModifier(stat, numeric, skillName, "flat", iconPath);
        }
      }
      else if (stat === "DmgTaken") {
        // ✅ CORREÇÃO: DmgTaken é percentual flat
        modifiedStats[stat] += numeric;
        addStatModifier(stat, numeric, skillName, "flat", iconPath);
      } 
      // Para stats não-percentuais (HP, ATK, DEF, SpATK, SpDEF)
      else {
        if (isPercentString) {
          // ✅ CORREÇÃO: Usar baseStats APENAS para stats não-percentuais com %
          const bonusValue = baseStats[stat] * (numeric / 100);
          modifiedStats[stat] += bonusValue;
          addStatModifier(stat, bonusValue, skillName, "percent", iconPath);
        } else {
          // Se for valor flat, adicionar diretamente
          modifiedStats[stat] += numeric;
          addStatModifier(stat, numeric, skillName, "flat", iconPath);
        }
      }
    }
  });
}

// ✅ NOVO: Processar conditionalBuffs (buffs que dependem de outra skill ativa)
if (skill.conditionalBuffs && skill.conditionalBuffs.requiredSkill) {
  const requiredSkill = skill.conditionalBuffs.requiredSkill;
  
  // Verificar se a skill necessária está ativa
  if (activeSkills[pokemon] && activeSkills[pokemon][requiredSkill]) {
    const conditionalBuffsToApply = skill.conditionalBuffs.buffs;
    
    if (conditionalBuffsToApply && typeof conditionalBuffsToApply === 'object') {
      Object.keys(conditionalBuffsToApply).forEach(stat => {
        const skillName = skill.name || skillKey;
        const iconPath = `./estatisticas-shad/images/skills/${pokemon}_${skillKey}.png`;

        if (modifiedStats.hasOwnProperty(stat) || stat === "FlatCDR") {
          const rawVal = conditionalBuffsToApply[stat];
          const isPercentString = (typeof rawVal === "string" && rawVal.includes("%"));
          
          let numericStr = String(rawVal).replace("%","").replace(",", ".");
          if (numericStr.startsWith("+")) {
            numericStr = numericStr.substring(1);
          }
          const numeric = parseFloat(numericStr);

          if (!Number.isFinite(numeric)) return;

          if (stat === "FlatCDR") {
            if (!modifiedStats[stat]) modifiedStats[stat] = 0;
            modifiedStats[stat] += numeric;
            addStatModifier(stat, numeric, `${skillName} (Enhanced)`, "flat", iconPath);
          }
          else if (PERCENT_KEYS.has(stat)) {
            if ((stat === "Speed" || stat === "HPRegen") && isPercentString) {
              const currentValue = modifiedStats[stat] || 0;
              const bonusValue = currentValue * (numeric / 100);
              modifiedStats[stat] += bonusValue;
              addStatModifier(stat, bonusValue, `${skillName} (Enhanced)`, "percent", iconPath);
            } else {
              modifiedStats[stat] += numeric;
              addStatModifier(stat, numeric, `${skillName} (Enhanced)`, "flat", iconPath);
            }
          }
          else if (stat === "DmgTaken") {
            modifiedStats[stat] += numeric;
            addStatModifier(stat, numeric, `${skillName} (Enhanced)`, "flat", iconPath);
          } 
          else {
            if (isPercentString) {
              const bonusValue = baseStats[stat] * (numeric / 100);
              modifiedStats[stat] += bonusValue;
              addStatModifier(stat, bonusValue, `${skillName} (Enhanced)`, "percent", iconPath);
            } else {
              modifiedStats[stat] += numeric;
              addStatModifier(stat, numeric, `${skillName} (Enhanced)`, "flat", iconPath);
            }
          }
        }
      });
    }
  }
}

    // ✅ NOVO: Aplicar selfDamageMultiplier do buff básico
if (skill.buff && skill.buff.selfDamageMultiplier) {
  if (!modifiedStats._selfDamageMultipliers) {
    modifiedStats._selfDamageMultipliers = {};
  }
  modifiedStats._selfDamageMultipliers[skillKey] = {
    multiplier: skill.buff.selfDamageMultiplier,
    source: skill.name || skillKey
  };
}
// **NOVO**: Verificar otherSkillsCooldownReduction no buff básico
if (skill.buff && skill.buff.otherSkillsCooldownReduction) {
  Object.keys(skill.buff.otherSkillsCooldownReduction).forEach(targetSkillKey => {
    const reductionValue = skill.buff.otherSkillsCooldownReduction[targetSkillKey];
    
    if (!modifiedStats._selfBuffs) {
      modifiedStats._selfBuffs = {};
    }
    
    if (!modifiedStats._selfBuffs[targetSkillKey]) {
      modifiedStats._selfBuffs[targetSkillKey] = {};
    }
    
    const isPercent = typeof reductionValue === "string" && reductionValue.includes("%");
    const numericValue = parseFloat(String(reductionValue).replace("%", ""));
    
    if (isPercent) {
      if (!modifiedStats._selfBuffs[targetSkillKey].CooldownPercent) {
        modifiedStats._selfBuffs[targetSkillKey].CooldownPercent = 0;
      }
      modifiedStats._selfBuffs[targetSkillKey].CooldownPercent += numericValue;
    } else {
      if (!modifiedStats._selfBuffs[targetSkillKey].CooldownFlat) {
        modifiedStats._selfBuffs[targetSkillKey].CooldownFlat = 0;
      }
      modifiedStats._selfBuffs[targetSkillKey].CooldownFlat += numericValue;
    }
  });
}
// ✅ APLICAR otherSkillsCooldownReduction DO BUFFPLUS (COM VERIFICAÇÃO DE NÍVEL)
if (skill.buffPlus?.otherSkillsCooldownReduction && 
    currentLevel >= (skill.buffPlus.levelRequired || 11)) {
  
  Object.keys(skill.buffPlus.otherSkillsCooldownReduction).forEach(targetSkillKey => {
    const reductionValue = skill.buffPlus.otherSkillsCooldownReduction[targetSkillKey];
    
    if (!modifiedStats._selfBuffs) {
      modifiedStats._selfBuffs = {};
    }
    
    if (!modifiedStats._selfBuffs[targetSkillKey]) {
      modifiedStats._selfBuffs[targetSkillKey] = {};
    }
    
    const isPercent = typeof reductionValue === "string" && reductionValue.includes("%");
    const numericValue = parseFloat(String(reductionValue).replace("%", ""));
    
    if (isPercent) {
      if (!modifiedStats._selfBuffs[targetSkillKey].CooldownPercent) {
        modifiedStats._selfBuffs[targetSkillKey].CooldownPercent = 0;
      }
      modifiedStats._selfBuffs[targetSkillKey].CooldownPercent += numericValue;
    } else {
      if (!modifiedStats._selfBuffs[targetSkillKey].CooldownFlat) {
        modifiedStats._selfBuffs[targetSkillKey].CooldownFlat = 0;
      }
      modifiedStats._selfBuffs[targetSkillKey].CooldownFlat += numericValue;
    }
  });
}

    // Processar debuffs condicionais (ex: Tri Attack)
if (skill.conditionalEffects && selectedConditionalEffects[pokemon] && selectedConditionalEffects[pokemon][skillKey]) {
  const selectedEffect = selectedConditionalEffects[pokemon][skillKey];
  const conditionalBuffs = skill.conditionalEffects.buffs?.[selectedEffect];
  
  if (conditionalBuffs && typeof conditionalBuffs === 'object') {
    Object.keys(conditionalBuffs).forEach(buffStat => {
      const buffValue = conditionalBuffs[buffStat];
      
      // Converter para número
      let numeric;
      if (typeof buffValue === 'string') {
        numeric = parseFloat(buffValue.replace(/[^\d.-]/g, ''));
      } else {
        numeric = parseFloat(buffValue);
      }
      
      // Validar número
      if (!Number.isFinite(numeric) || numeric === 0) return;
      
      const skillName = skill.name || skillKey;
      const iconPath = `./estatisticas-shad/images/skills/${pokemon}_${skillKey}.png`;
      
      if (modifiedStats.hasOwnProperty(buffStat) || buffStat === "FlatCDR") {
        const isPercentString = (typeof buffValue === "string" && buffValue.includes("%"));
        
        // FlatCDR (redução flat de cooldown)
        if (buffStat === "FlatCDR") {
          if (!modifiedStats[buffStat]) modifiedStats[buffStat] = 0;
          modifiedStats[buffStat] += numeric;
          addStatModifier(buffStat, numeric, `${skillName} (${selectedEffect})`, "flat", iconPath);
        }
        // Stats percentuais (CDR, AtkSPD, CritRate, etc)
        else if (PERCENT_KEYS.has(buffStat)) {
          modifiedStats[buffStat] += numeric;
          addStatModifier(buffStat, numeric, `${skillName} (${selectedEffect})`, "flat", iconPath);
        }
        // Damage Taken Reduction
        else if (buffStat === "DmgTaken") {
          modifiedStats[buffStat] += numeric;
          addStatModifier(buffStat, numeric, `${skillName} (${selectedEffect})`, "flat", iconPath);
        }
        // Stats numéricos (HP, ATK, DEF, etc)
        else {
          if (isPercentString) {
            // Buff percentual baseado no valor base
            const bonusValue = baseStats[buffStat] * (numeric / 100);
            modifiedStats[buffStat] += bonusValue;
            addStatModifier(buffStat, bonusValue, `${skillName} (${selectedEffect})`, "percent", iconPath);
          } else {
            // Buff flat
            modifiedStats[buffStat] += numeric;
            addStatModifier(buffStat, numeric, `${skillName} (${selectedEffect})`, "flat", iconPath);
          }
        }
      }
    });
  }
}

 // Aplicar SELF-BUFFS básicos (afetam apenas a skill específica)
if (skill.selfBuff && typeof skill.selfBuff === 'object') {
  if (!modifiedStats._selfBuffs[skillKey]) {
    modifiedStats._selfBuffs[skillKey] = {};
  }

  Object.keys(skill.selfBuff).forEach(stat => {
    if (
      pokemon === "espeon" &&
      skillKey === "s22" &&
      stat === "CooldownFlat" &&
      !(activeSkills[pokemon]?.s12 || activeSkills[pokemon]?.s11)
    ) {
      return;
    }
    const rawVal = skill.selfBuff[stat];
    const numeric = parseFloat(String(rawVal).replace("%","").replace("+","").replace(",", "."));
    
    if (Number.isFinite(numeric)) {
      // --- ALTERAÇÃO: para stats de cooldowns, ACUMULAR em vez de sobrescrever ---
      if (stat === "CooldownPercent" || stat === "CooldownFlat" || stat === "FlatCDR") {
        if (modifiedStats._selfBuffs[skillKey][stat] === undefined || modifiedStats._selfBuffs[skillKey][stat] === null) {
          modifiedStats._selfBuffs[skillKey][stat] = 0;
        }
        modifiedStats._selfBuffs[skillKey][stat] += numeric;
      } else {
        // comportamento antigo para outros stats (atribuição)
        modifiedStats._selfBuffs[skillKey][stat] = numeric;
      }
    }
  });
}


    // Aplicar buffs Plus GLOBAIS (baseado no nível atual)
    if (skill.buffPlus && typeof skill.buffPlus === 'object' && 
        currentLevel >= (skill.buffPlus.levelRequired || 11)) {
      
    // Processar buffs normais do buffPlus
if (skill.buffPlus.buffs && typeof skill.buffPlus.buffs === 'object') {
  Object.keys(skill.buffPlus.buffs).forEach(stat => {
    if (modifiedStats.hasOwnProperty(stat)) {
      const rawVal = skill.buffPlus.buffs[stat];
      const isPercentString = (typeof rawVal === "string" && rawVal.includes("%"));
      
      let numericStr = String(rawVal).replace("%","").replace(",", ".");
      if (numericStr.startsWith("+")) {
        numericStr = numericStr.substring(1);
      }
      const numeric = parseFloat(numericStr);

      if (!Number.isFinite(numeric)) return;

      const skillName = `${skill.name || skillKey} (Plus)`;
      const iconPath = `./estatisticas-shad/images/skills/${pokemon}_${skillKey}.png`;

      if (PERCENT_KEYS.has(stat)) {
        if (stat === "Speed" && isPercentString) {
          // ✅ CORREÇÃO: Usar valor atual ao invés de baseStats
          const currentValue = modifiedStats.Speed || 0;
          const bonusValue = currentValue * (numeric / 100);
          modifiedStats.Speed += bonusValue;
          addStatModifier("Speed", bonusValue, skillName, "percent", iconPath);
        } else {
          modifiedStats[stat] += numeric;
          addStatModifier(stat, numeric, skillName, "flat", iconPath);
        }
      } else if (stat === "DmgTaken") {
        modifiedStats[stat] += numeric;
        addStatModifier(stat, numeric, skillName, "flat", iconPath);
      } else {
        if (isPercentString) {
          const bonusValue = baseStats[stat] * (numeric / 100);
          modifiedStats[stat] += bonusValue;
          addStatModifier(stat, bonusValue, skillName, "percent", iconPath);
        } else {
          modifiedStats[stat] += numeric;
          addStatModifier(stat, numeric, skillName, "flat", iconPath);
        }
      }
    }
  });
}

    // ✅ NOVO: Aplicar selfDamageMultiplier do buffPlus (se ativo)
    if (skill.buffPlus.selfDamageMultiplier) {
      if (!modifiedStats._selfDamageMultipliers) {
        modifiedStats._selfDamageMultipliers = {};
      }
      modifiedStats._selfDamageMultipliers[skillKey] = {
        multiplier: skill.buffPlus.selfDamageMultiplier,
        source: `${skill.name || skillKey} (Plus)`
      };
    }
    // ✅ PROCESSAR nextBasicAttackPercent DO BUFFPLUS
    if (skill.buffPlus.nextBasicAttackPercent !== undefined) {
      if (!modifiedStats._nextBasicAttackPercents) {
        modifiedStats._nextBasicAttackPercents = [];
      }
      
      modifiedStats._nextBasicAttackPercents.push({
        value: skill.buffPlus.nextBasicAttackPercent,
        source: `${skill.name || skillKey} (Plus)`
      });
    }

if (skill.buffPlus.debuffs && typeof skill.buffPlus.debuffs === 'object') {
        Object.keys(skill.buffPlus.debuffs).forEach(debuffStat => {
          const debuffValue = parseFloat(skill.buffPlus.debuffs[debuffStat]);
          
          if (!Number.isFinite(debuffValue)) return;
          
          if (!debuffsAcumulados[debuffStat]) {
            debuffsAcumulados[debuffStat] = {
              total: 0,
              skills: [],
              customLabel: null
            };
          }
          
          debuffsAcumulados[debuffStat].total += debuffValue;
          debuffsAcumulados[debuffStat].skills.push({
            name: skill.name + " (Plus)",
            value: debuffValue
          });
          
          if (skill.debuffLabels && skill.debuffLabels[debuffStat]) {
            debuffsAcumulados[debuffStat].customLabel = skill.debuffLabels[debuffStat];
          }
        });
      }

      // ✅ NOVO: PROCESSAR conditionalDebuffs DO BUFFPLUS
      if (skill.buffPlus.conditionalDebuffs && activeSkills[pokemon] && activeSkills[pokemon][skillKey]) {
        let gaugeState = null;
        
        // Determinar estado do gauge baseado no pokémon
        if (pokemon === "leafeon") {
          gaugeState = chlorophyllGauge ? "full" : "notFull";
        } else if (pokemon === "alcremie") {
          gaugeState = sweetGauge ? "full" : "notFull";
        } else if (pokemon === "pawmot") {
          gaugeState = pawmotMode ? "fighterMode" : "normalMode";
        }
        
        if (gaugeState && skill.buffPlus.conditionalDebuffs[gaugeState]) {
          const conditionalDebuffsToApply = skill.buffPlus.conditionalDebuffs[gaugeState];
          
          Object.keys(conditionalDebuffsToApply).forEach(debuffStat => {
            if (debuffStat === 'debuffLabels') return;
            
            const debuffValue = conditionalDebuffsToApply[debuffStat];
            if (debuffValue === undefined || debuffValue === null || debuffValue === "") return;
            
            const numericValue = parseFloat(String(debuffValue).replace(/[^\d.-]/g, ''));
            if (!Number.isFinite(numericValue) || numericValue === 0) return;
            
            if (!debuffsAcumulados[debuffStat]) {
              debuffsAcumulados[debuffStat] = {
                total: 0,
                skills: [],
                customLabel: null
              };
            }
            
            debuffsAcumulados[debuffStat].total += numericValue;
            debuffsAcumulados[debuffStat].skills.push({
              name: `${skill.name} (Plus - ${gaugeState === "full" ? "Full Gauge" : "Not Full"})`,
              value: numericValue
            });
            
            if (skill.buffPlus.conditionalDebuffs.debuffLabels && skill.buffPlus.conditionalDebuffs.debuffLabels[debuffStat]) {
              debuffsAcumulados[debuffStat].customLabel = skill.buffPlus.conditionalDebuffs.debuffLabels[debuffStat];
            }
          });
        }
      }
      // ✅ NOVO: PROCESSAR conditionalBuffs DO BUFFPLUS
if (skill.buffPlus.conditionalBuffs && activeSkills[pokemon] && activeSkills[pokemon][skillKey]) {
  let gaugeState = null;
  
  // Determinar estado do gauge baseado no pokémon
  if (pokemon === "leafeon") {
    gaugeState = chlorophyllGauge ? "full" : "notFull";
  } else if (pokemon === "alcremie") {
    gaugeState = sweetGauge ? "full" : "notFull";
  } else if (pokemon === "pawmot") {
    gaugeState = pawmotMode ? "fighterMode" : "normalMode";
  }
  
  // Aplicar os buffs condicionais aos stats
  if (gaugeState && skill.buffPlus.conditionalBuffs[gaugeState]) {
    const conditionalBuffsToApply = skill.buffPlus.conditionalBuffs[gaugeState];
    
    Object.keys(conditionalBuffsToApply).forEach(stat => {
      const rawVal = conditionalBuffsToApply[stat];
      if (rawVal === undefined || rawVal === null || rawVal === "") return;
      
      const numericValue = parseFloat(String(rawVal).replace(/[^\d.-]/g, ''));
      if (!Number.isFinite(numericValue) || numericValue === 0) return;
      
      const skillName = `${skill.name || skillKey} (Plus)`;
      const iconPath = `./estatisticas-shad/images/skills/${pokemon}_${skillKey}.png`;
      
      if (modifiedStats.hasOwnProperty(stat)) {
        const isPercentString = (typeof rawVal === "string" && rawVal.includes("%"));
        
        // Stats percentuais (CDR, AtkSPD, CritRate, etc)
        if (PERCENT_KEYS.has(stat)) {
          modifiedStats[stat] += numericValue;
          addStatModifier(stat, numericValue, `${skillName} (${gaugeState})`, "flat", iconPath);
        }
        // Damage Taken Reduction
        else if (stat === "DmgTaken") {
          modifiedStats[stat] += numericValue;
          addStatModifier(stat, numericValue, `${skillName} (${gaugeState})`, "flat", iconPath);
        }
        // Stats numéricos (HP, ATK, DEF, etc)
        else {
          if (isPercentString) {
            // Buff percentual baseado no valor base
            const bonusValue = baseStats[stat] * (numericValue / 100);
            modifiedStats[stat] += bonusValue;
            addStatModifier(stat, bonusValue, `${skillName} (${gaugeState})`, "percent", iconPath);
          } else {
            // Buff flat
            modifiedStats[stat] += numericValue;
            addStatModifier(stat, numericValue, `${skillName} (${gaugeState})`, "flat", iconPath);
          }
        }
      }
    });
  }
}

      // ✅ ADICIONE ESTE BLOCO COMPLETO AQUI (LOGO APÓS O FECHAMENTO ACIMA)
      if (skill.buffPlus.allyBuffs && typeof skill.buffPlus.allyBuffs === 'object') {
        Object.keys(skill.buffPlus.allyBuffs).forEach(buffStat => {
          const buffValue = parseFloat(skill.buffPlus.allyBuffs[buffStat]);
          
          if (!Number.isFinite(buffValue)) return;
          
          if (!allyBuffsAcumulados[buffStat]) {
            allyBuffsAcumulados[buffStat] = {
              total: 0,
              skills: [],
              customLabel: null
            };
          }
          
          allyBuffsAcumulados[buffStat].total += buffValue;
          allyBuffsAcumulados[buffStat].skills.push({
            name: skill.name + " (Plus)",
            value: buffValue
          });
          
          if (skill.buffPlus.allyBuffLabels && skill.buffPlus.allyBuffLabels[buffStat]) {
            allyBuffsAcumulados[buffStat].customLabel = skill.buffPlus.allyBuffLabels[buffStat];
          }
        });
      }
      } // ← Este fecha o bloco do skill.buffPlus

      // Aplicar SELF-BUFFS Plus (baseado no nível atual, afetam apenas a skill específica)
      if (skill.selfBuffPlus && typeof skill.selfBuffPlus === 'object' && 
          currentLevel >= (skill.selfBuffPlus.levelRequired || 11)) {
        
        if (skill.selfBuffPlus.buffs && typeof skill.selfBuffPlus.buffs === 'object') {
          if (!modifiedStats._selfBuffs[skillKey]) {
            modifiedStats._selfBuffs[skillKey] = {};
          }
          
          Object.keys(skill.selfBuffPlus.buffs).forEach(stat => {
            const rawVal = skill.selfBuffPlus.buffs[stat];
            let numericStr = String(rawVal).replace("%","").replace(",", ".");
            if (numericStr.startsWith("+")) {
              numericStr = numericStr.substring(1);
            }
            const numeric = parseFloat(numericStr);
            
            if (Number.isFinite(numeric)) {
              if (!modifiedStats._selfBuffs[skillKey][stat]) {
                modifiedStats._selfBuffs[skillKey][stat] = 0;
              }
              modifiedStats._selfBuffs[skillKey][stat] += numeric;
            }
          });
        }
        
        // ✅ ADICIONE ESTE BLOCO AQUI (ÚNICA VEZ, LUGAR CORRETO):
        if (pokemon === "buzzwole" && skill.selfBuffPlus.conditionalGaugeBuffs) {
          const gaugeBuffs = skill.selfBuffPlus.conditionalGaugeBuffs[muscleGauge];
          
          if (gaugeBuffs) {
            if (!modifiedStats._selfBuffs[skillKey]) {
              modifiedStats._selfBuffs[skillKey] = {};
            }
            
            Object.keys(gaugeBuffs).forEach(stat => {
              const value = gaugeBuffs[stat];
              if (!modifiedStats._selfBuffs[skillKey][stat]) {
                modifiedStats._selfBuffs[skillKey][stat] = 0;
              }
              modifiedStats._selfBuffs[skillKey][stat] += value;
            });
          }
        }
      } // ← Fechamento do if (skill.selfBuffPlus...)

      // Aplicar efeitos especiais da skill
      if (skill.activeEffect && typeof skill.activeEffect === "function") {
        const skillName = skill.name || skillKey;
        const iconPath = `./estatisticas-shad/images/skills/${pokemon}_${skillKey}.png`;
        
        // Executar o efeito PASSANDO O NÍVEL ATUAL
        modifiedStats = skill.activeEffect(modifiedStats, baseStats, currentLevel);
        
        // Se Shell Smash foi ativado, rastrear os modificadores
        if (modifiedStats._shellSmashBonus) {
          const bonus = modifiedStats._shellSmashBonus;
          
          // Rastrear o bônus positivo de ATK
          addStatModifier("ATK", bonus.convertedValue, `${skillName} (Conversion)`, "formula", iconPath);
          
          // Rastrear o bônus positivo de SpATK
          addStatModifier("SpATK", bonus.convertedValue, `${skillName} (Conversion)`, "formula", iconPath);
          
          // Rastrear a redução de DEF (negativa)
          addStatModifier("DEF", -bonus.originalDEF, `${skillName} (Sacrifice)`, "formula", iconPath);
          
          // Rastrear a redução de SpDEF (negativa)
          addStatModifier("SpDEF", -bonus.originalSpDEF, `${skillName} (Sacrifice)`, "formula", iconPath);
        }
      }

      if (skill.debuffs && typeof skill.debuffs === 'object') {
        // Verificar se há conditional debuffs ativos
        let debuffsToUse = { ...skill.debuffs };
        let isEnhanced = false;
        
        if (skill.conditionalDebuffs && skill.conditionalDebuffs.requiredSkill) {
          const requiredSkill = skill.conditionalDebuffs.requiredSkill;
          
          // Se a skill necessária está ativa, usar debuffs condicionais
          if (activeSkills[pokemon] && activeSkills[pokemon][requiredSkill]) {
            debuffsToUse = { ...skill.conditionalDebuffs.debuffsWhenActive };
            isEnhanced = true;
          }
        }
        
        // Processar os debuffs (normais ou condicionais)
        Object.keys(debuffsToUse).forEach(debuffStat => {
          let debuffValue = debuffsToUse[debuffStat];
          
          // Converter para número se for string
          if (typeof debuffValue === 'string') {
            debuffValue = parseFloat(debuffValue.replace(/[^\d.-]/g, ''));
          }
          
          // Garantir que é um número válido
          if (!Number.isFinite(debuffValue)) {
            console.warn(`Valor de debuff inválido para ${debuffStat}:`, debuffsToUse[debuffStat]);
            return;
          }
          
          if (!debuffsAcumulados[debuffStat]) {
            debuffsAcumulados[debuffStat] = {
              total: 0,
              skills: [],
              customLabel: null
            };
          }
          
          debuffsAcumulados[debuffStat].total += debuffValue;
          
          // Adicionar label especial se for condicional
          const skillNameLabel = isEnhanced ? skill.name + " (Enhanced)" : skill.name;
          
          debuffsAcumulados[debuffStat].skills.push({
            name: skillNameLabel,
            value: debuffValue
          });
          
          // Usar debuffLabels se disponível
          if (skill.debuffLabels && skill.debuffLabels[debuffStat]) {
            debuffsAcumulados[debuffStat].customLabel = skill.debuffLabels[debuffStat];
          }
        });
      }

      if (skill.allyBuffs && typeof skill.allyBuffs === 'object') {
        Object.keys(skill.allyBuffs).forEach(buffStat => {
          const buffValue = parseFloat(skill.allyBuffs[buffStat]);
          
          if (!Number.isFinite(buffValue)) return;
          
          if (!allyBuffsAcumulados[buffStat]) {
            allyBuffsAcumulados[buffStat] = {
              total: 0,
              skills: [],
              customLabel: null
            };
          }
          
          allyBuffsAcumulados[buffStat].total += buffValue;
          allyBuffsAcumulados[buffStat].skills.push({
            name: skill.name,
            value: buffValue
          });
          
          if (skill.allyBuffLabels && skill.allyBuffLabels[buffStat]) {
            allyBuffsAcumulados[buffStat].customLabel = skill.allyBuffLabels[buffStat];
          }
        });
      }

    } catch (error) {
      console.error(`Erro ao processar skill ${skillKey} do pokemon ${pokemon}:`, error);
      console.log('Dados da skill:', skill);
    }
  });

  // Armazenar debuffs acumulados para exibição
  if (Object.keys(debuffsAcumulados).length > 0) {
    modifiedStats._debuffsAcumulados = {};
    
    Object.keys(debuffsAcumulados).forEach(debuffStat => {
      const debuffData = debuffsAcumulados[debuffStat];
      
      // NOVO: Usar customLabel se disponível, senão usar o padrão
      const debuffLabel = debuffData.customLabel || `(DEBUFF) ${debuffStat} Reduction`;
      
      modifiedStats._debuffsAcumulados[debuffStat] = {
        label: debuffLabel,
        value: debuffData.total,
        stat: debuffStat,
        skills: debuffData.skills
      };
    });
  }

  if (Object.keys(allyBuffsAcumulados).length > 0) {
    modifiedStats._allyBuffsAcumulados = {};
    
    Object.keys(allyBuffsAcumulados).forEach(buffStat => {
      const buffData = allyBuffsAcumulados[buffStat];
      const buffLabel = buffData.customLabel || `(ALLY BUFF) ${buffStat} Increase`;
      
      modifiedStats._allyBuffsAcumulados[buffStat] = {
        label: buffLabel,
        value: buffData.total,
        stat: buffStat,
        skills: buffData.skills
      };
    });
  }


  return modifiedStats;
};
const applyPassiveBuff = (stats, pokemon, baseStats, targetLevel) => {
  if (!skillDamage[pokemon]) {
    return stats;
  }

  let modifiedStats = { ...stats };
  const skills = skillDamage[pokemon];

  const passiveKeys = ['passive', 'passive1', 'passive2'].filter(key => skills[key]);
  
  passiveKeys.forEach(passiveKey => {
    if (!activePassives[pokemon] || !activePassives[pokemon][passiveKey]) {
      return;
    }

    const passive = skills[passiveKey];
    const passiveName = passive.name || "Passive";
    const iconPath = `./estatisticas-shad/images/skills/${pokemon}_${passiveKey}.png`;

    if (passive.buff) {
      Object.keys(passive.buff).forEach(stat => {
        if (modifiedStats.hasOwnProperty(stat)) {
          const rawVal = passive.buff[stat];
          const isPercentString = (typeof rawVal === "string" && rawVal.includes("%"));
          const numeric = parseFloat(String(rawVal).replace("%","").replace("+","").replace(",", "."));

          if (!Number.isFinite(numeric)) return;

          if (PERCENT_KEYS.has(stat) && stat !== "DmgTaken") {
            modifiedStats[stat] += numeric;
            addStatModifier(stat, numeric, passiveName, "flat", iconPath);
          } else if (stat === "DmgTaken") {
            if (isPercentString) {
              modifiedStats[stat] += numeric;
              addStatModifier(stat, numeric, passiveName, "flat", iconPath);
            } else {
              modifiedStats[stat] += numeric;
              addStatModifier(stat, numeric, passiveName, "flat", iconPath);
            }
          } else {
            if (isPercentString) {
              const bonusValue = baseStats[stat] * (numeric / 100);
              modifiedStats[stat] += bonusValue;
              addStatModifier(stat, bonusValue, passiveName, "percent", iconPath);
            } else {
              modifiedStats[stat] += numeric;
              addStatModifier(stat, numeric, passiveName, "flat", iconPath);
            }
          }
        }
      });
    }

// ✅ PROCESSAR DEBUFFS DA PASSIVA (CORRIGIDO)
if (passive.debuffs && typeof passive.debuffs === 'object') {
  Object.keys(passive.debuffs).forEach(debuffStat => {
    let debuffValue = passive.debuffs[debuffStat];
    
    // Converter string para número se necessário
    if (typeof debuffValue === 'string') {
      debuffValue = parseFloat(debuffValue.replace(/[^\d.-]/g, ''));
    }
    
    if (!Number.isFinite(debuffValue) || debuffValue === 0) return;
    
    if (!modifiedStats._debuffsAcumulados) {
      modifiedStats._debuffsAcumulados = {};
    }
    
    if (!modifiedStats._debuffsAcumulados[debuffStat]) {
      modifiedStats._debuffsAcumulados[debuffStat] = {
        label: `(DEBUFF) ${debuffStat} Reduction`,  // ✅ ADICIONAR LABEL PADRÃO
        value: 0,
        total: 0,
        stat: debuffStat,
        skills: [],
        customLabel: null
      };
    }
    
    modifiedStats._debuffsAcumulados[debuffStat].total += debuffValue;
    modifiedStats._debuffsAcumulados[debuffStat].value += debuffValue;
    modifiedStats._debuffsAcumulados[debuffStat].skills.push({
      name: passiveName,
      value: debuffValue
    });
    
    // ✅ USAR debuffLabels SE DISPONÍVEL (sobrescreve o padrão)
    if (passive.debuffLabels && passive.debuffLabels[debuffStat]) {
      modifiedStats._debuffsAcumulados[debuffStat].customLabel = passive.debuffLabels[debuffStat];
      modifiedStats._debuffsAcumulados[debuffStat].label = passive.debuffLabels[debuffStat];
    }
  });
}

// ✅ PROCESSAR buffs condicionais de gauge (Leafeon, Alcremie, etc)
// ⚠️ SÓ APLICA SE A PASSIVA ESTIVER ATIVA
if (passive.conditionalBuffs && activePassives[pokemon] && activePassives[pokemon][passiveKey]) {
  let gaugeState;
  
if (pokemon === "leafeon") {
    gaugeState = chlorophyllGauge ? "full" : "notFull";
  } else if (pokemon === "alcremie") {
    gaugeState = sweetGauge ? "full" : "notFull";
  } else if (pokemon === "pawmot") { // ✅ ADICIONE ESTA LINHA
    gaugeState = pawmotMode ? "fighterMode" : "normalMode"; // ✅ E ESTA
  } else {
    return;
  }
  
  const conditionalBuffsToApply = passive.conditionalBuffs[gaugeState];
  
  if (conditionalBuffsToApply) {
    Object.keys(conditionalBuffsToApply).forEach(stat => {
      const gaugeLabel = gaugeState === "full" ? "Full Gauge" : "Not Full";
      
      if (modifiedStats.hasOwnProperty(stat)) {
        const rawVal = conditionalBuffsToApply[stat];
        const isPercentString = (typeof rawVal === "string" && rawVal.includes("%"));
        const numeric = parseFloat(String(rawVal).replace("%","").replace("+","").replace(",", "."));

        if (!Number.isFinite(numeric)) return;

        if (PERCENT_KEYS.has(stat) && stat !== "DmgTaken") {
          // Stats percentuais (Speed, CDR, etc)
          if (stat === "Speed" && isPercentString) {
            // Speed com % = percentual do base
            const bonusValue = baseStats.Speed * (numeric / 100);
            modifiedStats.Speed += bonusValue;
            addStatModifier("Speed", bonusValue, `${passiveName} (${gaugeLabel})`, "percent", iconPath);
          } else {
            // Outros stats percentuais = valor direto
            modifiedStats[stat] += numeric;
            addStatModifier(stat, numeric, `${passiveName} (${gaugeLabel})`, "flat", iconPath);
          }
        } else if (stat === "DmgTaken") {
          modifiedStats[stat] += numeric;
          addStatModifier(stat, numeric, `${passiveName} (${gaugeLabel})`, "flat", iconPath);
        } else {
          // Stats numéricos (HP, ATK, DEF, etc)
          if (isPercentString) {
            const bonusValue = baseStats[stat] * (numeric / 100);
            modifiedStats[stat] += bonusValue;
            addStatModifier(stat, bonusValue, `${passiveName} (${gaugeLabel})`, "percent", iconPath);
          } else {
            modifiedStats[stat] += numeric;
            addStatModifier(stat, numeric, `${passiveName} (${gaugeLabel})`, "flat", iconPath);
          }
        }
      }
    });
  }
}
    if (passive.formulas && passive.formulas.length > 0) {
      passive.formulas.forEach((f, index) => {
        if (f.type === "text-only" || f.type === "dependent") {
          return;
        }
        
        if (f.displayOnly === true || f.affects === null || f.affects === undefined) {
          let baseVal, modifiedVal;
          
          if (f.type === "multi" || f.useAllStats) {
            baseVal = f.formula(baseStats, targetLevel);
            modifiedVal = f.formula(modifiedStats, targetLevel);
          } else {
            let baseAttribute, modifiedAttribute;
            
            switch(f.type) {
              case "special":
                baseAttribute = baseStats.SpATK;
                modifiedAttribute = modifiedStats.SpATK;
                break;
              case "hp":
                baseAttribute = baseStats.HP;
                modifiedAttribute = modifiedStats.HP;
                break;
              case "physical":
              default:
                baseAttribute = baseStats.ATK;
                modifiedAttribute = modifiedStats.ATK;
                break;
            }
            
            baseVal = f.formula(baseAttribute, targetLevel, baseStats.HP);
            modifiedVal = f.formula(modifiedAttribute, targetLevel, modifiedStats.HP);
          }
          
          if (!passive.calculatedValues) passive.calculatedValues = {};
          passive.calculatedValues[index] = { base: baseVal, modified: modifiedVal };
          
          return;
        }
        
        let baseVal, modifiedVal;
        
        if (f.type === "multi" || f.useAllStats) {
          baseVal = f.formula(baseStats, targetLevel);
          modifiedVal = f.formula(modifiedStats, targetLevel);
        } else {
          let baseAttribute, modifiedAttribute;
          
          switch(f.type) {
            case "special":
              baseAttribute = baseStats.SpATK;
              modifiedAttribute = modifiedStats.SpATK;
              break;
            case "hp":
              baseAttribute = baseStats.HP;
              modifiedAttribute = modifiedStats.HP;
              break;
            case "physical":
            default:
              baseAttribute = baseStats.ATK;
              modifiedAttribute = modifiedStats.ATK;
              break;
          }
          
          if (f.usesMuscleGauge && pokemon === "buzzwole") {
            baseVal = f.formula(baseAttribute, targetLevel, baseStats.HP, muscleGauge);
            modifiedVal = f.formula(modifiedAttribute, targetLevel, modifiedStats.HP, muscleGauge);
          } else {
            baseVal = f.formula(baseAttribute, targetLevel, baseStats.HP);
            modifiedVal = f.formula(modifiedAttribute, targetLevel, modifiedStats.HP);
          }
        }
        
        if (!passive.calculatedValues) passive.calculatedValues = {};
        passive.calculatedValues[index] = { base: baseVal, modified: modifiedVal };
        
        if (f.affects === "nextBasicAttack") {
          if (!passive.nextBasicAttackBonus) passive.nextBasicAttackBonus = {};
          passive.nextBasicAttackBonus = {
            base: baseVal,
            modified: modifiedVal,
            label: f.label
          };
        } else if (f.affects) {
          const map = {
            HP:"HP",ATK:"ATK",DEF:"DEF",SPATK:"SpATK",SPDEF:"SpDEF",SPEED:"Speed",
            ATKSPD:"AtkSPD",CDR:"CDR",CRITRATE:"CritRate",CRITDMG:"CritDmg",
            LIFESTEAL:"Lifesteal",HPREGEN:"HPRegen",ENERGYRATE:"EnergyRate",
            SHIELD:"Shield", DMGTAKEN:"DmgTaken", HINDRED:"HindRed", SPDEFPEN:"SpDEFPen",
            DEFPen: "DEFPen"
          };
          const statKey = map[f.affects.toUpperCase()] || f.affects;

          if (modifiedStats.hasOwnProperty(statKey)) {
            modifiedStats[statKey] += modifiedVal;
            addStatModifier(statKey, modifiedVal, `${passiveName} (${f.label})`, "formula", iconPath);
          }
        } else {
          const label = f.label.toLowerCase();
          
          if (label.includes("defense") && !label.includes("special")) {
            modifiedStats.DEF += modifiedVal;
            addStatModifier("DEF", modifiedVal, `${passiveName} (${f.label})`, "formula", iconPath);
          } else if (label.includes("special defense") || label.includes("sp. defense") || label.includes("spdef")) {
            modifiedStats.SpDEF += modifiedVal;
            addStatModifier("SpDEF", modifiedVal, `${passiveName} (${f.label})`, "formula", iconPath);
          } else if (label.includes("attack") && !label.includes("special")) {
            modifiedStats.ATK += modifiedVal;
            addStatModifier("ATK", modifiedVal, `${passiveName} (${f.label})`, "formula", iconPath);
          } else if (label.includes("special attack") || label.includes("sp. attack") || label.includes("spatk")) {
            modifiedStats.SpATK += modifiedVal;
            addStatModifier("SpATK", modifiedVal, `${passiveName} (${f.label})`, "formula", iconPath);
          } else if (label.includes("hp") || label.includes("health")) {
            modifiedStats.HP += modifiedVal;
            addStatModifier("HP", modifiedVal, `${passiveName} (${f.label})`, "formula", iconPath);
          } else if (label.includes("speed")) {
            modifiedStats.Speed += modifiedVal;
            addStatModifier("Speed", modifiedVal, `${passiveName} (${f.label})`, "formula", iconPath);
          } else if (label.includes("crit") && label.includes("rate")) {
            modifiedStats.CritRate += modifiedVal;
            addStatModifier("CritRate", modifiedVal, `${passiveName} (${f.label})`, "formula", iconPath);
          } else if (label.includes("crit") && label.includes("dmg")) {
            modifiedStats.CritDmg += modifiedVal;
            addStatModifier("CritDmg", modifiedVal, `${passiveName} (${f.label})`, "formula", iconPath);
          } else if (label.includes("lifesteal")) {
            modifiedStats.Lifesteal += modifiedVal;
            addStatModifier("Lifesteal", modifiedVal, `${passiveName} (${f.label})`, "formula", iconPath);
          } else if (label.includes("cdr") || label.includes("cooldown")) {
            modifiedStats.CDR += modifiedVal;
            addStatModifier("CDR", modifiedVal, `${passiveName} (${f.label})`, "formula", iconPath);
          } else if (label.includes("atkspd") || label.includes("attack speed")) {
            modifiedStats.AtkSPD += modifiedVal;
            addStatModifier("AtkSPD", modifiedVal, `${passiveName} (${f.label})`, "formula", iconPath);
          } else if (label.includes("dmgtaken") || label.includes("dmg taken")) {
            modifiedStats.DmgTaken += modifiedVal;
            addStatModifier("DmgTaken", modifiedVal, `${passiveName} (${f.label})`, "formula", iconPath);
          } else if (label.includes("hindred") || label.includes("hindrance reduction")) {
            modifiedStats.HindRed += modifiedVal;
            addStatModifier("HindRed", modifiedVal, `${passiveName} (${f.label})`, "formula", iconPath);
          } else if (label.includes("spdefpen") || label.includes("spdef penetration")) {
            modifiedStats.SpDEFPen += modifiedVal;
            addStatModifier("SpDEFPen", modifiedVal, `${passiveName} (${f.label})`, "formula", iconPath);
          } else if (label.includes("defpen") || label.includes("def penetration")) {
            modifiedStats.DEFPen += modifiedVal;
            addStatModifier("DEFPen", modifiedVal, `${passiveName} (${f.label})`, "formula", iconPath);
          }
        }
      });
      
      passive.formulas.forEach((f, index) => {
        if (f.type !== "dependent") {
          return;
        }
        
        const dependsOnIndex = f.dependsOn;
        
        if (passive.calculatedValues && passive.calculatedValues[dependsOnIndex]) {
          const dependentBase = passive.calculatedValues[dependsOnIndex].base;
          const dependentModified = passive.calculatedValues[dependsOnIndex].modified;
          
          const baseVal = f.formula(dependentBase, targetLevel, baseStats.HP);
          const modifiedVal = f.formula(dependentModified, targetLevel, modifiedStats.HP);
          
          if (!passive.calculatedValues) passive.calculatedValues = {};
          passive.calculatedValues[index] = { base: baseVal, modified: modifiedVal };
        } else {
          if (!passive.calculatedValues) passive.calculatedValues = {};
          passive.calculatedValues[index] = { base: 0, modified: 0 };
        }
      });
    }
  });

  return modifiedStats;
};
  // CRIAÇÃO DOS FILTROS DE ROLE E TIPO DE DANO
  const createRoleFilters = () => {
    const filterContainer = document.createElement("div");
    filterContainer.className = "role-filters-container";
    filterContainer.style.cssText = `
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-bottom: 15px;
      flex-wrap: wrap;
      padding: 0 10px;
    `;

    const roles = ["All", "Attacker", "All Rounder", "Speedster", "Defender", "Support"];
    const roleColors = {
      "All": "#666666",
      "Attacker": "#f16c38", 
      "All Rounder": "#ce5fd3",
      "Speedster": "#2492c9",
      "Defender": "#9bd652",
      "Support": "#e1b448"
    };

    roles.forEach(role => {
      const button = document.createElement("button");
      button.className = "role-filter-btn";
      button.dataset.role = role;
      button.textContent = role;
      
      const isActive = currentRoleFilter === role;
      const color = roleColors[role] || "#666";
      
      button.style.cssText = `
        background: ${isActive ? color : 'transparent'};
        color: ${isActive ? '#fff' : color};
        border: 2px solid ${color};
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.2s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      `;

      button.addEventListener("click", () => {
        currentRoleFilter = role;
        updateRoleFilters();
        filterPokemonGrid();
      });

      button.addEventListener("mouseenter", () => {
        if (currentRoleFilter !== role) {
          button.style.background = color;
          button.style.color = "#fff";
        }
      });

      button.addEventListener("mouseleave", () => {
        if (currentRoleFilter !== role) {
          button.style.background = "transparent";
          button.style.color = color;
        }
      });

      filterContainer.appendChild(button);
    });

    // Criar filtros de tipo de dano
    const damageTypeContainer = document.createElement("div");
    damageTypeContainer.className = "damage-type-filters";

    const damageTypes = ["ATK", "SpATK"];
    damageTypes.forEach(type => {
      const button = document.createElement("button");
      button.className = "damage-type-btn";
      button.dataset.type = type;
      button.textContent = type === "ATK" ? "PHYSICAL" : "SPECIAL";
      
      const isActive = currentDamageTypeFilter === type;
      if (isActive) {
        button.classList.add("active");
      }

      button.addEventListener("click", () => {
        if (currentDamageTypeFilter === type) {
          currentDamageTypeFilter = null;
        } else {
          currentDamageTypeFilter = type;
        }
        updateDamageTypeFilters();
        filterPokemonGrid();
      });

      damageTypeContainer.appendChild(button);
    });

    // Inserir os filtros antes do grid
    pokemonGrid.parentNode.insertBefore(filterContainer, pokemonGrid);
    pokemonGrid.parentNode.insertBefore(damageTypeContainer, pokemonGrid);
  };

  // Atualizar visual dos botões de filtro de tipo de dano
  const updateDamageTypeFilters = () => {
    const filterButtons = document.querySelectorAll(".damage-type-btn");
    
    filterButtons.forEach(button => {
      const type = button.dataset.type;
      const isActive = currentDamageTypeFilter === type;
      
      if (isActive) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  };

  // Atualizar visual dos botões de filtro
  const updateRoleFilters = () => {
    const filterButtons = document.querySelectorAll(".role-filter-btn");
    const roleColors = {
      "All": "#666666",
      "Attacker": "#f16c38", 
      "All Rounder": "#ce5fd3",
      "Speedster": "#2492c9",
      "Defender": "#9bd652",
      "Support": "#e1b448"
    };

    filterButtons.forEach(button => {
      const role = button.dataset.role;
      const color = roleColors[role] || "#666";
      const isActive = currentRoleFilter === role;

      button.style.background = isActive ? color : 'transparent';
      button.style.color = isActive ? '#fff' : color;
      button.style.border = `2px solid ${color}`;
    });
  };

  // CRIAÇÃO DO GRID DE POKÉMON
  const createPokemonGrid = () => {
    pokemonGrid.innerHTML = "";
    
    // Verificar se pokemonRoles existe
    if (typeof pokemonRoles === 'undefined') {
      console.error("pokemonRoles não encontrado - verifique se util.js está carregando");
      return;
    }
    
    Object.keys(pokemonRoles).forEach(poke => {
      const role = pokemonRoles[poke] || 'Unknown';
      const damageType = pokemonBasedType[poke] || 'Unknown';
      const roleClass = role.toLowerCase().replace(' ', '');
      
      const gridItem = document.createElement("div");
      gridItem.className = "pokemon-grid-item";
      gridItem.dataset.pokemon = poke;
      gridItem.dataset.role = role;
      gridItem.dataset.damageType = damageType;
      
      if (poke === selectedPokemon) {
        gridItem.classList.add("selected");
      }
      
      const img = document.createElement("img");
      img.src = `./estatisticas-shad/images/backgrounds/${poke}-left-bg.png`;
      img.alt = safeCap(poke);
      img.onerror = function() { 
        this.src = './estatisticas-shad/images/backgrounds/placeholder.png';
      };
      
      const span = document.createElement("span");
      span.textContent = safeCap(poke);
      
      const roleBadge = document.createElement("div");
      roleBadge.className = `pokemon-role-badge ${roleClass}`;
      roleBadge.title = role;
      
      gridItem.appendChild(roleBadge);
      gridItem.appendChild(img);
      gridItem.appendChild(span);
      
      gridItem.addEventListener("click", () => {
        selectPokemon(poke);
      });
      
      pokemonGrid.appendChild(gridItem);
    });
  };

  // FUNÇÃO PARA SELECIONAR POKÉMON
  const selectPokemon = (poke) => {
  const levelSelector = document.getElementById("level-selector-container");
  const actionButtons = document.getElementById("action-buttons-container");
  
  if (levelSelector) {
    levelSelector.classList.remove("hidden-until-pokemon");
    levelSelector.classList.add("show-after-pokemon");
  }
  
  if (actionButtons) {
    actionButtons.classList.remove("hidden-until-pokemon");
    actionButtons.classList.add("show-after-pokemon");
  } 
    selectedPokemon = poke;

  activeBattleItem = null;
  isBattleItemActive = false;
  battleRadios.forEach(r => r.checked = false);
    
  if (!selectedSkins[poke]) {
    selectedSkins[poke] = "default";
  }
    selectedPokemonImage.src = `./estatisticas-shad/images/backgrounds/${poke}-left-bg.png`;
    selectedPokemonImage.style.display = "block";
    selectedPokemonName.textContent = safeCap(poke);
    pokemonPlaceholder.style.display = "none";
    
    const gridItems = pokemonGrid.querySelectorAll(".pokemon-grid-item");
    gridItems.forEach(item => {
      if (item.dataset.pokemon === poke) {
        item.classList.add("selected");
      } else {
        item.classList.remove("selected");
      }
    });
    
    closePokemonPanel();

    muscleGauge = 0;
    sweetGauge = false;
    chlorophyllGauge = false;
    pawmotMode = false;
    eonPower = 0;
    eonPower2 = 0;
    eonPowerlatios = 0;
    selectedHeldItems = [];
    activeItemPassives = {};
    inicializarBloqueioItens();
    
    if (!activePassives.hasOwnProperty(poke)) {
      activePassives[poke] = {};
      if (skillDamage[poke]) {
        ['passive', 'passive1', 'passive2'].forEach(passiveKey => {
          if (skillDamage[poke][passiveKey]) {
            activePassives[poke][passiveKey] = false;
          }
        });
      }
    }

    // Inicializar activeSkills para o pokémon selecionado
    if (!activeSkills.hasOwnProperty(poke)) {
      activeSkills[poke] = {};
      if (skillDamage[poke]) {
        // Verificar todas as skills que podem ter efeitos ativáveis
        Object.keys(skillDamage[poke]).forEach(skillKey => {
          if (!['passive', 'passive1', 'passive2'].includes(skillKey)) {
            const skill = skillDamage[poke][skillKey];
            // Verifica se a skill tem buff ou efeitos ativáveis (incluindo ults e conditionalBuffs)
            if (skill.buff || 
                skill.conditionalBuffs || 
                skill.activeEffect || 
                skill.debuffs || 
                skill.dynamicBuffs || 
                skill.nextBasicAttackPercent !== undefined || // ✅ ADICIONAR
                skill.buffPlus?.nextBasicAttackPercent !== undefined ||
                skill.buffPlus?.buffs ||
                skill.buffPlus?.conditionalBuffs ||
                (skill.formulas && skill.formulas.some(f => f.activatable)) ||
                skillKey.startsWith('ult')) {
              activeSkills[poke][skillKey] = false;
            }
          }
        });
      }
    }
    resetSkillSelections();
    calcular();
  };

  // Filtrar Pokémon por role e tipo de dano
  const filterPokemonGrid = () => {
    const gridItems = pokemonGrid.querySelectorAll(".pokemon-grid-item");
    
    gridItems.forEach(item => {
      const pokemonRole = item.dataset.role;
      const pokemonDamageType = item.dataset.damageType;
      
      const roleMatch = currentRoleFilter === "All" || pokemonRole === currentRoleFilter;
      const damageTypeMatch = currentDamageTypeFilter === null || pokemonDamageType === currentDamageTypeFilter;
      
      const shouldShow = roleMatch && damageTypeMatch;
      
      if (shouldShow) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  };

  // FUNÇÃO PARA ABRIR/FECHAR PAINEL
  const togglePokemonPanel = () => {
    const isOpen = pokemonGridPanel.classList.contains("show");
    
    if (isOpen) {
      closePokemonPanel();
    } else {
      openPokemonPanel();
    }
  };

  const openPokemonPanel = () => {
    pokemonGridPanel.classList.add("show");
    
    const overlay = document.createElement("div");
    overlay.className = "pokemon-overlay show";
    overlay.id = "pokemon-overlay";
    document.body.appendChild(overlay);
    
    overlay.addEventListener("click", closePokemonPanel);
  };

  const closePokemonPanel = () => {
    pokemonGridPanel.classList.remove("show");
    
    const overlay = document.getElementById("pokemon-overlay");
    if (overlay) {
      overlay.remove();
    }
  };

  // SISTEMA DE HELD ITEMS
  const createHeldItemsGrid = () => {
    const grid = document.getElementById("held-items-grid");
    
    grid.innerHTML = "";
    
    // Verificar se gameHeldItens existe
    if (typeof gameHeldItens === 'undefined') {
      console.error("gameHeldItens não encontrado - verifique se util.js está carregando");
      return;
    }
    
    Object.keys(gameHeldItens).forEach(itemKey => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "held-item-option";
      itemDiv.dataset.itemKey = itemKey;
      
      const isDisabled = FIXED_ONLY_ITEMS.has(itemKey) && pokemonFixedItems[selectedPokemon] !== itemKey;
      const isFixed = isFixedItemForCurrentPokemon(itemKey);
      
      if (isDisabled) {
        itemDiv.classList.add("disabled");
        const pokemonComAcesso = Object.keys(pokemonFixedItems).find(
          p => pokemonFixedItems[p] === itemKey
        );
        itemDiv.title = `Item exclusivo de ${safeCap(pokemonComAcesso)}`;
      } else if (isFixed) {
        itemDiv.classList.add("fixed");
        itemDiv.title = "Item fixo (não pode ser removido)";
      }
      
      const img = document.createElement("img");
      img.src = `./estatisticas-shad/images/held-itens/${itemKey}.png`;
      img.alt = gameHeldItens[itemKey];
      img.className = "item-icon";
      img.onerror = function() { this.style.display = "none"; };
      
      const span = document.createElement("span");
      span.textContent = gameHeldItens[itemKey];
      
      itemDiv.appendChild(img);
      itemDiv.appendChild(span);
      
      if (!isFixed) {
        itemDiv.addEventListener("click", () => {
          if (isDisabled) {
            const pokemonComAcesso = Object.keys(pokemonFixedItems).find(
              p => pokemonFixedItems[p] === itemKey
            );
            alert(`Este item é exclusivo de ${safeCap(pokemonComAcesso)} e não pode ser usado com este Pokémon.`);
            return;
          }
          
          toggleHeldItem(itemKey);
        });
      }
      
      grid.appendChild(itemDiv);
    });
    
    updateGridDisplay();
    createResetButton();
  };

  const toggleHeldItem = (itemKey) => {
    const hasFixedItem = selectedPokemon && pokemonFixedItems[selectedPokemon];
    const maxItems = hasFixedItem ? maxHeldItems - 1 : maxHeldItems;
    
    if (isFixedItemForCurrentPokemon(itemKey)) {
      alert("Este item é fixo e não pode ser removido deste Pokémon.");
      return;
    }
    
    const existingIndex = selectedHeldItems.findIndex(item => item.key === itemKey);
    
    if (existingIndex !== -1) {
      selectedHeldItems.splice(existingIndex, 1);
    } else {
      if (selectedHeldItems.length < maxHeldItems) {
        selectedHeldItems.push({
          key: itemKey,
          name: gameHeldItens[itemKey],
          stacks: 0
        });
      } else {
        alert(`Você pode selecionar no máximo ${maxHeldItems} itens.`);
        return;
      }
    }
    
    updateGridDisplay();
    updateSelectedItemsDisplay();
    calcular();
  };

  const updateGridDisplay = () => {
    const items = document.querySelectorAll(".held-item-option");
    
    items.forEach(item => {
      const itemKey = item.dataset.itemKey;
      const selectedIndex = selectedHeldItems.findIndex(selected => selected.key === itemKey);
      
      const existingNumber = item.querySelector(".slot-number");
      if (existingNumber) existingNumber.remove();
      
      if (selectedIndex !== -1) {
        item.classList.add("selected");
        
        const numberDiv = document.createElement("div");
        numberDiv.className = "slot-number";
        numberDiv.textContent = selectedIndex + 1;
        item.appendChild(numberDiv);
      } else {
        item.classList.remove("selected");
      }
    });
  };

  const updateSelectedItemsDisplay = () => {
    const display = document.getElementById("selected-items-display");
    const container = document.getElementById("selected-items-container");
    
    if (selectedHeldItems.length === 0) {
      display.style.display = "none";
      return;
    }
    
    display.style.display = "block";
    container.innerHTML = "";
    
    selectedHeldItems.forEach((item, index) => {
      const slotDiv = document.createElement("div");
      slotDiv.className = "selected-item-slot";
      
      if (isFixedItemForCurrentPokemon(item.key)) {
        slotDiv.classList.add("fixed-item");
      }
      
      const header = document.createElement("div");
      header.className = "slot-header";
      header.textContent = `Slot ${index + 1}`;
      
      const img = document.createElement("img");
      img.src = `./estatisticas-shad/images/held-itens/${item.key}.png`;
      img.alt = item.name;
      img.className = "item-icon";
      img.onerror = function() { this.style.display = "none"; };
      
      const name = document.createElement("div");
      name.className = "item-name";
      name.textContent = item.name;
      
      slotDiv.appendChild(header);
      slotDiv.appendChild(img);
      slotDiv.appendChild(name);
      
      if (STACKABLE_ITEMS[item.name] && !isFixedItemForCurrentPokemon(item.key)) {
        const config = STACKABLE_ITEMS[item.name];
        
        const stackLabel = document.createElement("div");
        stackLabel.className = "stack-label-new";
        stackLabel.textContent = "Stacks:";
        
        const stackControls = document.createElement("div");
        stackControls.className = "stack-controls-new";
        
        const decreaseBtn = document.createElement("div");
        decreaseBtn.className = "stack-button";
        decreaseBtn.textContent = "−";
        decreaseBtn.title = "Diminuir stacks";
        
        const stackDisplay = document.createElement("div");
        stackDisplay.className = "stack-display";
        stackDisplay.textContent = item.stacks;
        
        const increaseBtn = document.createElement("div");
        increaseBtn.className = "stack-button";
        increaseBtn.textContent = "+";
        increaseBtn.title = "Aumentar stacks";
        
        const updateButtons = () => {
          decreaseBtn.classList.toggle("disabled", item.stacks <= 0);
          increaseBtn.classList.toggle("disabled", item.stacks >= config.max);
          stackDisplay.textContent = item.stacks;
          
          stackDisplay.classList.add("highlighted");
          setTimeout(() => stackDisplay.classList.remove("highlighted"), 300);
        };
        
        decreaseBtn.addEventListener("click", () => {
          if (item.stacks > 0) {
            item.stacks--;
            updateButtons();
            calcular();
          }
        });
        
        increaseBtn.addEventListener("click", () => {
          if (item.stacks < config.max) {
            item.stacks++;
            updateButtons();
            calcular();
          }
        });
        
        updateButtons();
        
        stackControls.appendChild(decreaseBtn);
        stackControls.appendChild(stackDisplay);
        stackControls.appendChild(increaseBtn);
        
        slotDiv.appendChild(stackLabel);
        slotDiv.appendChild(stackControls);
      }
      
      container.appendChild(slotDiv);
    });
  };

  const resetHeldItems = () => {
    const fixedItems = [];
    if (selectedPokemon && pokemonFixedItems[selectedPokemon]) {
      const fixedItem = pokemonFixedItems[selectedPokemon];
      fixedItems.push({
        key: fixedItem,
        name: gameHeldItens[fixedItem],
        stacks: 0
      });
    }
    
    selectedHeldItems = [];
    selectedHeldItems = [...fixedItems];
    activeItemPassives = {};
    
    updateGridDisplay();
    updateSelectedItemsDisplay();
    calcular();
  };

  const createResetButton = () => {
    const existingButton = document.getElementById("reset-held-items-btn");
    if (existingButton) {
      return;
    }
    
    const resetButton = document.createElement("button");
    resetButton.id = "reset-held-items-btn";
    resetButton.className = "reset-held-items-button";
    resetButton.textContent = "🗑️ Reset Held Itens";
    resetButton.title = "Limpar todos os held items selecionados";
    
    resetButton.addEventListener("click", () => {
      if (selectedHeldItems.length === 0) {
        alert("Nenhum item para resetar.");
        return;
      }
      
      resetHeldItems();
    });
    
    const heldItemsGrid = document.getElementById("held-items-grid");
    if (heldItemsGrid && heldItemsGrid.parentNode) {
      heldItemsGrid.parentNode.insertBefore(resetButton, heldItemsGrid.nextSibling);
    }
  };

  const inicializarBloqueioItens = () => {
    selectedHeldItems = [];
    
    if (selectedPokemon && pokemonFixedItems[selectedPokemon]) {
      const fixedItem = pokemonFixedItems[selectedPokemon];
      selectedHeldItems.push({
        key: fixedItem,
        name: gameHeldItens[fixedItem],
        stacks: 0
      });
    }
    
    createHeldItemsGrid();
    updateSelectedItemsDisplay();
    createResetButton();
  };

 // Função para determinar se uma skill deve ser exibida
const shouldShowSkill = (pokemon, skillKey) => {
  // ✅ LÓGICA ESPECIAL PARA URSHIFU - Controle de visibilidade das ults
  if (pokemon === "urshifu") {
    const ultMode = selectedSkills[pokemon]?._urshifuUltMode;
    
    // Se houver um modo de ult definido, aplicar filtro
    if (ultMode) {
      // Se o modo é 'ult', esconder 'ult1'
      if (ultMode === 'ult' && skillKey === 'ult1') {
        return false;
      }
      // Se o modo é 'ult1', esconder 'ult'
      if (ultMode === 'ult1' && skillKey === 'ult') {
        return false;
      }
    }
  }

  // Se não há seleção de skills para este pokémon, mostrar todas
  if (!selectedSkills[pokemon]) return true;
  
  // Determinar qual slot esta skill pertence
  const skillSlot = getSkillSlot(pokemon, skillKey);
  
  // Se a skill não pertence a nenhum slot (ex: unite), sempre mostrar
  if (!skillSlot) return true;
  
  // Se há uma seleção para este slot
  const selectedSkillForSlot = selectedSkills[pokemon][skillSlot];
  if (selectedSkillForSlot) {
    // Mostrar apenas se for a skill selecionada
    return skillKey === selectedSkillForSlot;
  }
  
  // Se não há seleção para este slot, mostrar todas do slot
  return true;
};

  // Função para criar seletor de efeito condicional
const createConditionalEffectSelector = (pokemon, skillKey, conditionalEffects) => {
  if (!selectedConditionalEffects[pokemon]) {
    selectedConditionalEffects[pokemon] = {};
  }

  if (!selectedConditionalEffects[pokemon][skillKey]) {
    selectedConditionalEffects[pokemon][skillKey] = conditionalEffects.options[0];
  }
  
  const currentSelection = selectedConditionalEffects[pokemon][skillKey] || conditionalEffects.options[0];
  
  const selectorHTML = `
    <div class="conditional-effect-selector" data-no-toggle="true">
      <div class="effect-selector-label">Status select:</div>
      <div class="effect-options">
        ${conditionalEffects.options.map(effectName => {
          const isSelected = currentSelection === effectName;
          const effectConfig = EFFECT_CONFIG[effectName] || { icon: "●", label: effectName };
          const icon = effectConfig.icon;
          
          return `
            <div class="effect-option ${isSelected ? 'selected' : ''}" 
                 data-pokemon="${pokemon}" 
                 data-skill="${skillKey}" 
                 data-effect="${effectName}">
              <span class="effect-icon">${icon}</span>
              <span class="effect-name">${effectName}</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
  
  return selectorHTML;
};

/**
 * Formata os Active Effects de uma skill em HTML visual
 * @param {Object} skill - Objeto da skill com buff/buffPlus/debuffs
 * @param {boolean} isPlusActive - Se o buffPlus está ativo
 * @param {number} currentLevel - Nível atual do pokémon
 * @param {string} pokemon - Nome do pokémon
 * @returns {string} HTML formatado dos efeitos
 */
const formatActiveEffects = (skill, isPlusActive, currentLevel, pokemon = selectedPokemon) => {
  const effects = [];
  
  // ✅ CRIAR SET ANTES DE PROCESSAR QUALQUER BUFF
  const addedCooldownReductions = new Set();
  
  // Função auxiliar para adicionar um efeito
  const addEffect = (stat, value, isDebuff = false, source = "") => {
    const config = STAT_EFFECT_CONFIG[stat];
    if (!config) return;
    
    const isPercent = typeof value === "string" && value.includes("%");
    const numericValue = parseFloat(String(value).replace("%", "").replace("+", ""));
    
    if (isNaN(numericValue) || numericValue === 0) return;
    
    const arrow = isDebuff ? "▼" : "▲";
    const arrowClass = isDebuff ? "effect-arrow-down" : "effect-arrow-up";
    const sign = isDebuff ? "-" : "+";
    const sourceLabel = source ? ` (${source})` : "";
    
    // Tratamento especial para cooldowns
    let displayValue;
    let displayLabel = config.label;
    
    if (stat === "CooldownFlat") {
      displayValue = `${Math.abs(numericValue)}s`;
      displayLabel = "Cooldown";
      effects.push({
        icon: config.icon,
        label: displayLabel + sourceLabel,
        value: displayValue,
        arrow: "▼",
        arrowClass: "effect-arrow-down",
        color: "#20c997",
        source: sourceLabel
      });
      return;
    } else if (stat === "CooldownPercent") {
      displayValue = `${Math.abs(numericValue)}%`;
      displayLabel = "Cooldown";
      effects.push({
        icon: config.icon,
        label: displayLabel + sourceLabel,
        value: displayValue,
        arrow: "▼",
        arrowClass: "effect-arrow-down",
        color: "#20c997",
        source: sourceLabel
      });
      return;
    } else {
      displayValue = `${sign}${Math.abs(numericValue)}${isPercent || PERCENT_KEYS.has(stat) ? "%" : ""}`;
    }
    
    effects.push({
      icon: config.icon,
      label: config.label,
      value: displayValue,
      arrow: arrow,
      arrowClass: arrowClass,
      color: config.color,
      source: sourceLabel
    });
  };

  // ✅ NOVA VERSÃO: Acumula reduções de cooldown por skill ANTES de exibir
const cooldownReductionsBySkill = {}; // Objeto para acumular reduções por skill

const processOtherSkillsCooldown = (reductions, source = "") => {
  if (!reductions || typeof reductions !== 'object') return;
  
  Object.keys(reductions).forEach(targetSkillKey => {
    const reductionValue = reductions[targetSkillKey];
    
    const isPercent = typeof reductionValue === "string" && reductionValue.includes("%");
    const numericValue = parseFloat(String(reductionValue).replace("%", ""));
    
    // ✅ ACUMULAR valores por skill ao invés de criar efeitos separados
    if (!cooldownReductionsBySkill[targetSkillKey]) {
      cooldownReductionsBySkill[targetSkillKey] = {
        total: 0,
        isPercent: isPercent,
        skillName: skillDamage[pokemon]?.[targetSkillKey]?.name || targetSkillKey,
        skillImage: `./estatisticas-shad/images/skills/${pokemon}_${targetSkillKey}.png`
      };
    }
    
    cooldownReductionsBySkill[targetSkillKey].total += numericValue;
  });
};

// ✅ 10. PROCESSAR otherSkillsCooldownReduction (BUFF BÁSICO)
if (skill.buff?.otherSkillsCooldownReduction) {
  processOtherSkillsCooldown(skill.buff.otherSkillsCooldownReduction, "");
}

// ✅ 11. PROCESSAR otherSkillsCooldownReduction (BUFFPLUS - SE ATIVO)
if (isPlusActive && skill.buffPlus?.otherSkillsCooldownReduction) {
  processOtherSkillsCooldown(skill.buffPlus.otherSkillsCooldownReduction, " (Plus)");
}

// ✅ DEPOIS de processar TUDO, criar os efeitos visuais com valores acumulados
Object.keys(cooldownReductionsBySkill).forEach(targetSkillKey => {
  const data = cooldownReductionsBySkill[targetSkillKey];
  
  effects.push({
    icon: "🔗",
    label: `${data.skillName} Cooldown`,
    value: data.isPercent ? `${Math.abs(data.total)}%` : `${Math.abs(data.total)}s`,
    arrow: "▼",
    arrowClass: "effect-arrow-down",
    color: "#20c997",
    source: "", // Removemos o "(Plus)" pois agora é o total
    skillImage: data.skillImage,
    isOtherSkill: true
  });
});
  
  // 1. Processar buffs básicos (GLOBAIS)
  if (skill.buff) {
    Object.keys(skill.buff).forEach(stat => {
      addEffect(stat, skill.buff[stat], false);
    });
  }
  
  // 2. Processar self-buffs (ESPECÍFICOS DA SKILL)
  if (skill.selfBuff) {
    Object.keys(skill.selfBuff).forEach(stat => {
      if (stat === "CooldownFlat" || stat === "CooldownPercent") {
        addEffect(stat, skill.selfBuff[stat], false, "Self");
      } else {
        addEffect(stat, skill.selfBuff[stat], false, "Self");
      }
    });
  }
  
  // 3. Processar buffPlus (se ativo) - GLOBAIS
  if (isPlusActive && skill.buffPlus) {
    if (skill.buffPlus.buffs) {
      Object.keys(skill.buffPlus.buffs).forEach(stat => {
        addEffect(stat, skill.buffPlus.buffs[stat], false, "Plus");
      });
    }
    
    if (skill.buffPlus.debuffs) {
      Object.keys(skill.buffPlus.debuffs).forEach(stat => {
        addEffect(stat, skill.buffPlus.debuffs[stat], true, "Plus");
      });
    }
  }
  
  // 4. Processar selfBuffPlus (se ativo)
  if (isPlusActive && skill.selfBuffPlus && skill.selfBuffPlus.buffs) {
    Object.keys(skill.selfBuffPlus.buffs).forEach(stat => {
      if (stat === "CooldownFlat" || stat === "CooldownPercent") {
        addEffect(stat, skill.selfBuffPlus.buffs[stat], false, "Self Plus");
      } else {
        addEffect(stat, skill.selfBuffPlus.buffs[stat], false, "Self Plus");
      }
    });
  }
  
  // 5. Processar debuffs básicos
  if (skill.debuffs) {
    Object.keys(skill.debuffs).forEach(stat => {
      const customLabel = skill.debuffLabels?.[stat];
      if (customLabel) {
        effects.push({
          icon: "🎯",
          label: customLabel.replace("(DEBUFF) ", "").replace(" Reduction", ""),
          value: `-${skill.debuffs[stat]}%`,
          arrow: "▼",
          arrowClass: "effect-arrow-down",
          color: "#ff6b6b",
          source: ""
        });
      } else {
        addEffect(stat, skill.debuffs[stat], true);
      }
    });
  }
  
  // 6. Processar nextBasicAttackPercent
  if (skill.nextBasicAttackPercent !== undefined) {
    const value = skill.nextBasicAttackPercent;
    const isDebuff = value < 0;
    effects.push({
      icon: "💊",
      label: "Basic Attack Damage",
      value: `${value >= 0 ? "+" : ""}${value}%`,
      arrow: isDebuff ? "▼" : "▲",
      arrowClass: isDebuff ? "effect-arrow-down" : "effect-arrow-up",
      color: "#ff922b",
      source: ""
    });
  }
  
  // 7. Processar nextBasicAttackPercent do Plus
  if (isPlusActive && skill.buffPlus?.nextBasicAttackPercent !== undefined) {
    const value = skill.buffPlus.nextBasicAttackPercent;
    const isDebuff = value < 0;
    effects.push({
      icon: "💊",
      label: "Basic Attack Damage",
      value: `${value >= 0 ? "+" : ""}${value}%`,
      arrow: isDebuff ? "▼" : "▲",
      arrowClass: isDebuff ? "effect-arrow-down" : "effect-arrow-up",
      color: "#ff922b",
      source: " (Plus)"
    });
  }
  
  // 8. Processar effects básicos
  if (skill.effects && Array.isArray(skill.effects)) {
    skill.effects.forEach(effectName => {
      const config = EFFECT_CONFIG[effectName];
      if (config) {
        effects.push({
          icon: config.icon,
          label: config.label,
          value: "ACTIVE",
          arrow: "",
          arrowClass: "",
          color: "#9333ea",
          source: "",
          isStatusEffect: true
        });
      }
    });
  }
  
  // 9. Processar effects do buffPlus
  if (isPlusActive && skill.buffPlus?.effects && Array.isArray(skill.buffPlus.effects)) {
    skill.buffPlus.effects.forEach(effectName => {
      const config = EFFECT_CONFIG[effectName];
      if (config) {
        effects.push({
          icon: config.icon,
          label: config.label,
          value: "ACTIVE",
          arrow: "",
          arrowClass: "",
          color: "#9333ea",
          source: " (Plus)",
          isStatusEffect: true
        });
      }
    });
  }
  
  // ✅ 10. PROCESSAR otherSkillsCooldownReduction (BUFF BÁSICO)
  if (skill.buff?.otherSkillsCooldownReduction) {
    processOtherSkillsCooldown(skill.buff.otherSkillsCooldownReduction, "");
  }

  // ✅ 11. PROCESSAR otherSkillsCooldownReduction (BUFFPLUS - SE ATIVO)
  if (isPlusActive && skill.buffPlus?.otherSkillsCooldownReduction) {
    processOtherSkillsCooldown(skill.buffPlus.otherSkillsCooldownReduction, " (Plus)");
  }

  // ✅ 12. PROCESSAR skillDamageMultiplier (BUFF BÁSICO)
  if (skill.buff?.skillDamageMultiplier) {
    const multiplier = skill.buff.skillDamageMultiplier;
    const percentIncrease = ((multiplier - 1) * 100).toFixed(1);
    const affectsBasic = skill.buff.affectsBasicAttack === true;
    
    effects.push({
      icon: "⚔️",
      label: affectsBasic ? "All Damage" : "Skill Damage",
      value: `+${percentIncrease}%`,
      arrow: "▲",
      arrowClass: "effect-arrow-up",
      color: "#ff6b00",
      source: "",
      isDamageMultiplier: true
    });
  }

  // ✅ 13. PROCESSAR skillDamageMultiplier (BUFFPLUS - SE ATIVO)
  if (isPlusActive && skill.buffPlus?.skillDamageMultiplier) {
    const multiplier = skill.buffPlus.skillDamageMultiplier;
    const percentIncrease = ((multiplier - 1) * 100).toFixed(1);
    const affectsBasic = skill.buffPlus.affectsBasicAttack === true;
    
    effects.push({
      icon: "⚔️",
      label: affectsBasic ? "All Damage" : "Skill Damage",
      value: `+${percentIncrease}%`,
      arrow: "▲",
      arrowClass: "effect-arrow-up",
      color: "#ff6b00",
      source: " (Plus)",
      isDamageMultiplier: true
    });
  }
  
  // Se não há efeitos, retornar vazio
  if (effects.length === 0) return "";
  
  // Gerar HTML
  const effectsHTML = effects.map(effect => {
    // Template especial para status effects
    if (effect.isStatusEffect) {
      return `
        <div class="active-effect-item status-effect">
          <span class="effect-icon" style="color: ${effect.color};">${effect.icon}</span>
          <span class="effect-label">${effect.label}${effect.source}</span>
          <span class="effect-status-badge">ACTIVE</span>
        </div>
      `;
    }
    
    // Template especial para otherSkills (com imagem)
    if (effect.isOtherSkill) {
      return `
        <div class="active-effect-item other-skill-effect">
          <img src="${effect.skillImage}" 
               class="other-skill-icon" 
               alt="${effect.label}"
               onerror="this.style.display='none'">
          <span class="effect-label">${effect.label}${effect.source}</span>
          <span class="${effect.arrowClass}">${effect.arrow}</span>
          <span class="effect-value" style="color: ${effect.color};">${effect.value}</span>
        </div>
      `;
    }

    // ✅ Template especial para damage multipliers
    if (effect.isDamageMultiplier) {
      return `
        <div class="active-effect-item damage-multiplier">
          <span class="effect-icon" style="color: ${effect.color};">${effect.icon}</span>
          <span class="effect-label">${effect.label}${effect.source}</span>
          <span class="${effect.arrowClass}">${effect.arrow}</span>
          <span class="effect-value" style="color: ${effect.color}; font-weight: bold;">${effect.value}</span>
        </div>
      `;
    }
    
    // Template normal
    return `
      <div class="active-effect-item">
        <span class="effect-icon" style="color: ${effect.color};">${effect.icon}</span>
        <span class="effect-label">${effect.label}</span>
        <span class="${effect.arrowClass}">${effect.arrow}</span>
        <span class="effect-value" style="color: ${effect.color};">${effect.value}</span>
      </div>
    `;
  }).join("");
  
  return `
    <div class="active-effects-container">
      <div class="active-effects-title">⚡ Active Effects</div>
      <div class="active-effects-list">
        ${effectsHTML}
      </div>
    </div>
  `;
};

/**
 * Formata os efeitos de uma passiva em HTML visual
 * @param {Object} passive - Objeto da passiva
 * @param {string} pokemon - Nome do pokémon
 * @returns {string} HTML formatado dos efeitos
 */
const formatPassiveEffects = (passive, pokemon = selectedPokemon) => {
  const effects = [];
  
  // Função auxiliar (mesma lógica da formatActiveEffects)
  const addEffect = (stat, value, isDebuff = false, source = "") => {
    const config = STAT_EFFECT_CONFIG[stat];
    if (!config) return;
    
    const isPercent = typeof value === "string" && value.includes("%");
    const numericValue = parseFloat(String(value).replace("%", "").replace("+", ""));
    
    if (isNaN(numericValue) || numericValue === 0) return;
    
    const arrow = isDebuff ? "▼" : "▲";
    const arrowClass = isDebuff ? "effect-arrow-down" : "effect-arrow-up";
    const sign = isDebuff ? "-" : "+";
    const sourceLabel = source ? ` (${source})` : "";
    
    let displayValue = `${sign}${Math.abs(numericValue)}${isPercent || PERCENT_KEYS.has(stat) ? "%" : ""}`;
    
    effects.push({
      icon: config.icon,
      label: config.label + sourceLabel,
      value: displayValue,
      arrow: arrow,
      arrowClass: arrowClass,
      color: config.color
    });
  };
  
  // 1. Processar buffs da passiva
  if (passive.buff) {
    Object.keys(passive.buff).forEach(stat => {
      addEffect(stat, passive.buff[stat], false);
    });
  }
  
  // 2. Processar debuffs da passiva
  if (passive.debuffs) {
    Object.keys(passive.debuffs).forEach(stat => {
      const customLabel = passive.debuffLabels?.[stat];
      if (customLabel) {
        effects.push({
          icon: "🎯",
          label: customLabel.replace("(DEBUFF) ", "").replace(" Reduction", ""),
          value: `-${passive.debuffs[stat]}%`,
          arrow: "▼",
          arrowClass: "effect-arrow-down",
          color: "#ff6b6b"
        });
      } else {
        addEffect(stat, passive.debuffs[stat], true);
      }
    });
  }

  // ✅ 3. PROCESSAR skillDamageMultiplier DA PASSIVA
  if (passive.skillDamageMultiplier) {
    const multiplier = passive.skillDamageMultiplier;
    const percentIncrease = ((multiplier - 1) * 100).toFixed(1);
    const affectsBasic = passive.affectsBasicAttack === true;
    
    effects.push({
      icon: "⚔️",
      label: affectsBasic ? "All Damage" : "Skill Damage",
      value: `+${percentIncrease}%`,
      arrow: "▲",
      arrowClass: "effect-arrow-up",
      color: "#ff6b00",
      isDamageMultiplier: true
    });
  }
  
  // Se não há efeitos, retornar vazio
  if (effects.length === 0) return "";
  
  // Gerar HTML
  const effectsHTML = effects.map(effect => `
    <div class="active-effect-item">
      <span class="effect-icon" style="color: ${effect.color};">${effect.icon}</span>
      <span class="effect-label">${effect.label}</span>
      <span class="${effect.arrowClass}">${effect.arrow}</span>
      <span class="effect-value" style="color: ${effect.color};">${effect.value}</span>
    </div>
  `).join("");
  
  return `
    <div class="active-effects-container passive-effects">
      <div class="active-effects-title">⚡ PASSIVE EFFECTS</div>
      <div class="active-effects-list">
        ${effectsHTML}
      </div>
    </div>
  `;
};
// Função para verificar se uma skill pode dar crítico
const canSkillCrit = (pokemon, skillKey) => {
  // Nunca aplicar em passivas
  if (skillKey === "passive" || skillKey === "passive1" || skillKey === "passive2") {
    return false;
  }
  
  // Se o pokémon não está na lista, retorna false
  if (!POKEMON_CRIT_SKILLS[pokemon]) {
    return false;
  }
  
  // Verifica se a skill está na lista do pokémon
  return POKEMON_CRIT_SKILLS[pokemon].includes(skillKey);
};

  // FUNÇÃO DE CÁLCULO
  const calcular = () => {
    const targetLevel = parseInt(levelSelect.value, 10) || 1;
    statModifiers = {};
      STAT_KEYS.forEach(stat => {
        statModifiers[stat] = {
          base: 0,
          modifications: [],
          total: 0
        };
      });
    if (!selectedPokemon) {
      resultado.style.display = "none";
      return;
    }

    if (skillDamage[selectedPokemon]) {
      const skills = skillDamage[selectedPokemon];
      ['passive', 'passive1', 'passive2'].forEach(passiveKey => {
        if (skills[passiveKey]) {
          if (skills[passiveKey].calculatedValues) {
            delete skills[passiveKey].calculatedValues;
          }
          if (skills[passiveKey].nextBasicAttackBonus) {
            delete skills[passiveKey].nextBasicAttackBonus;
          }
        }
      });
    }

    if (!baseStats[selectedPokemon]) {
      resultado.style.display = "flex";
      statusFinalDiv.innerHTML = `
        <div class="stat-line">
          <span class="stat-label" style="color: #ff6b00;">Pokémon em desenvolvimento</span>
          <span class="stat-value">Dados de status não disponíveis ainda</span>
        </div>
      `;
      skillsDiv.innerHTML = `
        <div class="stat-line">
          <span class="stat-label">Skills em breve...</span>
        </div>
      `;
      
      const pokemonRole = pokemonRoles[selectedPokemon] || 'Unknown';
      const roleColor = rolesColor[pokemonRole] || '#666';
      
      const prevImg = document.querySelector(".resultado-image");
      if (prevImg) prevImg.remove();
      resultado.insertAdjacentHTML("afterbegin", `
        <div class="resultado-image role-${pokemonRole.toLowerCase().replace(' ', '')}">
          <img src="./estatisticas-shad/images/backgrounds/${selectedPokemon}-left-bg.png" alt="${safeCap(selectedPokemon)}"
              style="border: none;">
          <div class="info-jogador">${safeCap(selectedPokemon)} (Lv. ${targetLevel})</div>
          <div class="role-badge" style="background-color: ${roleColor};">${pokemonRole}</div>
        </div>
      `);
      createSkillBuildInResult();
      return;
    }

    let base =
      (typeof levelStats !== "undefined" && levelStats?.[selectedPokemon]?.[targetLevel])
        ? { ...levelStats[selectedPokemon][targetLevel] }
        : { ...baseStats[selectedPokemon] };

    base = ensureAllStats(base);
    let modified = { ...base };

    const selectedItems = selectedHeldItems.map(item => item.key);

    // 1) Aplicar bônus normais dos itens e stacks
// 1) Aplicar bônus normais dos itens e stacks
const flatBonusesByStat = {};

// Registrar valor base
STAT_KEYS.forEach(stat => {
  statModifiers[stat].base = base[stat] || 0;
});

// ✅ PRIMEIRA PASSAGEM: Coletar todos os flat bonuses
selectedHeldItems.forEach(selectedItem => {
  const itemKey = selectedItem.key;
  const bonuses = gameHeldItensStatus?.[itemKey] || [];
  bonuses.forEach(b => {
    const parts = String(b).split(" +");
    const rawStat = parts[0] || "";
    const valStr = parts[1] || "0";
    const key = rawStat.replace(/[^a-z]/gi, "").toUpperCase();
    const map = {
      HP:"HP",ATK:"ATK",DEF:"DEF",SPATK:"SpATK",SPDEF:"SpDEF",SPEED:"Speed",
      ATKSPD:"AtkSPD",CDR:"CDR",CRITRATE:"CritRate",CRITDMG:"CritDmg",
      LIFESTEAL:"Lifesteal",HPREGEN:"HPRegen",ENERGYRATE:"EnergyRate", SHIELD:"Shield", DMGTAKEN:"DmgTaken",
      HindRed: "HindRed", SPDEFPEN: "SpDEFPen", DEFPen: "DEFPen"
    };
    const prop = map[key];
    if (!prop) return;
    const amount = parseFloat(valStr.replace(",", "."));
    if (!isNaN(amount)) {
      flatBonusesByStat[prop] = (flatBonusesByStat[prop] || 0) + amount;
    }
  });
});

// ✅ SEGUNDA PASSAGEM: Aplicar bônus base + stacks
modified = { ...base };

selectedHeldItems.forEach(selectedItem => {
  const itemKey = selectedItem.key;
  const itemName = selectedItem.name;
  const iconPath = `./estatisticas-shad/images/held-itens/${itemKey}.png`;

  // Aplicar bônus base (flat) do item
  const bonuses = gameHeldItensStatus?.[itemKey] || [];
  bonuses.forEach(b => {
    const parts = String(b).split(" +");
    const rawStat = parts[0] || "";
    const valStr = parts[1] || "0";
    const key = rawStat.replace(/[^a-z]/gi, "").toUpperCase();
    const map = {
      HP:"HP",ATK:"ATK",DEF:"DEF",SPATK:"SpATK",SPDEF:"SpDEF",SPEED:"Speed",
      ATKSPD:"AtkSPD",CDR:"CDR",CRITRATE:"CritRate",CRITDMG:"CritDmg",
      LIFESTEAL:"Lifesteal",HPREGEN:"HPRegen",ENERGYRATE:"EnergyRate", SHIELD:"Shield", DMGTAKEN:"DmgTaken",
      HindRed: "HindRed", SPDEFPEN: "SpDEFPen", DEFPen: "DEFPen"
    };
    const prop = map[key];
    if (!prop) return;
    const amount = parseFloat(valStr.replace(",", "."));
    if (!isNaN(amount)) {
      modified[prop] += amount;
      addStatModifier(prop, amount, itemName, "flat", iconPath);
    }
  });

  // ✅ PROCESSAR STACKS (SE O ITEM FOR STACKABLE)
  if (STACKABLE_ITEMS[itemName]) {
    const config = STACKABLE_ITEMS[itemName];
    const stacks = selectedItem.stacks || 0;

    // ✅ SÓ APLICAR SE TIVER STACKS > 0
    if (stacks > 0) {
      if (itemName === "Charging Charm") {
        // Charging Charm: bônus fixo + bônus percentual
        const baseForPercent = (base[config.stat] || 0) + (flatBonusesByStat[config.stat] || 0);
        const bonusPercent = (baseForPercent * (config.perStack / 100)) * stacks;
        const fixedBonus = config.fixedBonus || 0;
        const totalBonus = fixedBonus + bonusPercent;
        
        modified[config.stat] += totalBonus;
        addStatModifier(
          config.stat, 
          totalBonus, 
          `${itemName} (${stacks} stack${stacks > 1 ? 's' : ''})`, 
          "percent", 
          iconPath
        );
      } 
      else if (config.percent) {
        // Itens com stacks percentuais (Drive Lens, Accel Bracer, Weakness Police)
        const totalPercentage = config.perStack * stacks;
        const baseForPercent = base[config.stat] || 0;
        const bonusAmount = baseForPercent * (totalPercentage / 100);
        
        modified[config.stat] += bonusAmount;
        addStatModifier(
          config.stat, 
          bonusAmount, 
          `${itemName} (${stacks} stack${stacks > 1 ? 's' : ''} - ${totalPercentage.toFixed(1)}%)`, 
          "percent", 
          iconPath
        );
      }
      else {
        // Itens com stacks flat (Attack Weight, Sp. Atk Specs, Aeos Cookie)
        const bonusAmount = config.perStack * stacks;
        
        modified[config.stat] += bonusAmount;
        addStatModifier(
          config.stat, 
          bonusAmount, 
          `${itemName} (${stacks} stack${stacks > 1 ? 's' : ''})`, 
          "flat", 
          iconPath
        );
      }
    }
  }
});
    // 2) Aplicar passivos dos itens
    modified = applyItemPassiveEffects(base, modified, selectedItems);
    // Rastrear passivos dos itens ativos
selectedItems.forEach(itemKey => {
  if (!activeItemPassives[itemKey]) return;
  
  const passive = getItemPassivesSource()[itemKey];
  if (!passive) return;
  
  const itemName = gameHeldItens[itemKey];
  const iconPath = `./estatisticas-shad/images/held-itens/${itemKey}.png`;
  
  if (itemKey === "razorclaw") return;

  if (typeof passive.formula === "function") {
    const targetStat = passive.target || "SpATK";
    const bonusValue = passive.formula(base);
    addStatModifier(targetStat, bonusValue, `${itemName} (Passive)`, "formula", iconPath);
    return;
  }

  Object.entries(passive).forEach(([stat, rawVal]) => {
    if (!STAT_KEYS.includes(stat)) return;

    const isPercentString = (typeof rawVal === "string" && rawVal.includes("%"));
    const numeric = parseFloat(String(rawVal).replace("%","").replace(",", "."));
    if (!Number.isFinite(numeric)) return;

    if (PERCENT_KEYS.has(stat)) {
      addStatModifier(stat, numeric, `${itemName} (Passive)`, "flat", iconPath);
    } else {
      if (isPercentString) {
        const baseForBuff = Number(base[stat]) || 0;
        const bonusValue = baseForBuff * (numeric / 100);
        addStatModifier(stat, bonusValue, `${itemName} (Passive)`, "percent", iconPath);
      } else {
        addStatModifier(stat, numeric, `${itemName} (Passive)`, "flat", iconPath);
      }
    }
  });
});

    // 3) Battle Items
let selectedBattle = "";
battleRadios.forEach(r => { if (r.checked) selectedBattle = r.value; });

if (activeBattleItem && isBattleItemActive) {
  const battleItemName = gameBattleItems[activeBattleItem] || activeBattleItem;
  const iconPath = `./estatisticas-shad/images/battle-items/${activeBattleItem}.png`;
  
  if (activeBattleItem === "xattack") {
    const atkBonus = base.ATK * 0.20;
    const spatkBonus = base.SpATK * 0.20;
    const aspdBonus = 25; // Flat 25%
    
    modified.ATK += atkBonus;
    modified.SpATK += spatkBonus;
    modified.AtkSPD += aspdBonus;
    
    addStatModifier("ATK", atkBonus, battleItemName, "percent", iconPath);
    addStatModifier("SpATK", spatkBonus, battleItemName, "percent", iconPath);
    addStatModifier("AtkSPD", aspdBonus, battleItemName, "flat", iconPath);
  }
  
  if (activeBattleItem === "xspeed") {
    const speedBonus = base.Speed * 0.45;
    modified.Speed += speedBonus;
    addStatModifier("Speed", speedBonus, battleItemName, "percent", iconPath);
  }
  
  if (activeBattleItem === "potion") {
    const potionHealingFlat = 160 + (base.HP * 0.20);
    
    // Calcular quanto esse healing representa em % do HP TOTAL
    const healingPercentOfHP = (potionHealingFlat / base.HP) * 100;
    
    // Adicionar ao HPRegen como valor percentual do HP
    modified.HPRegen += healingPercentOfHP;
    
    addStatModifier("HPRegen", healingPercentOfHP, `${battleItemName} (${Math.floor(potionHealingFlat)} HP / ${healingPercentOfHP.toFixed(1)}% HP)`, "formula", iconPath);
  }
}
// 4.5) Ajustar Crit Dmg base se showCritDamage estiver ativo
if (showCritDamage) {
  const pokemonCritBase = POKEMON_CRIT_BASE[selectedPokemon] || 100; // Padrão: 100%
  
  // Adicionar o valor base de crit do Pokémon
  modified.CritDmg = (modified.CritDmg || 0) + pokemonCritBase;
  
  // Rastrear modificador com ícone customizado
  const critIcon = `<img src="./estatisticas-shad/images/icons/crit.png" style="width: 14px; height: 14px; border-radius: 4px; margin-right: 8px;" onerror="this.style.display='none'">`;
  
  if (!statModifiers.CritDmg) {
    statModifiers.CritDmg = { base: 0, modifications: [], total: 0 };
  }
  
  statModifiers.CritDmg.modifications.push({
    value: pokemonCritBase,
    source: `${safeCap(selectedPokemon)} Critical`,
    type: "flat",
    customIcon: critIcon
  });
}

// 4) Emblemas
let incluirEmblemas = "";
emblemasRadios.forEach(r => { if (r.checked) incluirEmblemas = r.value; });

if (incluirEmblemas === "sim") {
  Object.keys(selectedEmblems).forEach(emblemKey => {
    const level = selectedEmblems[emblemKey];
    const emblemConfig = EMBLEM_BONUSES[emblemKey];
    if (emblemConfig) {
      const bonus = emblemConfig.values[level];
      if (bonus) {
        const emblemData = EMBLEM_DATA[emblemKey];
        const emblemName = `${emblemData.name} Emblem Lv.${level}`;
        
        // Criar ícone customizado com a cor correta
        const customIcon = `<span style="display: inline-block; width: 14px; height: 14px; border-radius: 50%; background-color: ${emblemData.color}; ${emblemData.color === '#ffffff' ? 'border: 1px solid #333;' : ''} margin-right: 8px; flex-shrink: 0;"></span>`;
        
        if (emblemKey === "gray") {
          modified.DmgTaken += 0;
          if (!modified._fixedDmgTaken) modified._fixedDmgTaken = 0;
          modified._fixedDmgTaken += bonus;
          
          // Adicionar com ícone customizado
          if (!statModifiers["DmgTaken"]) {
            statModifiers["DmgTaken"] = { base: 0, modifications: [], total: 0 };
          }
          statModifiers["DmgTaken"].modifications.push({
            value: bonus,
            source: emblemName,
            type: "flat",
            customIcon: customIcon
          });
        } else if (PERCENT_KEYS.has(emblemConfig.stat)) {
          modified[emblemConfig.stat] += bonus;
          
          // Adicionar com ícone customizado
          if (!statModifiers[emblemConfig.stat]) {
            statModifiers[emblemConfig.stat] = { base: 0, modifications: [], total: 0 };
          }
          statModifiers[emblemConfig.stat].modifications.push({
            value: bonus,
            source: emblemName,
            type: "flat",
            customIcon: customIcon
          });
        } else {
          const bonusValue = base[emblemConfig.stat] * (bonus / 100);
          modified[emblemConfig.stat] += bonusValue;
          
          // Adicionar com ícone customizado - tipo "percent" para mostrar corretamente
          if (!statModifiers[emblemConfig.stat]) {
            statModifiers[emblemConfig.stat] = { base: 0, modifications: [], total: 0 };
          }
          statModifiers[emblemConfig.stat].modifications.push({
            value: bonus, // Valor percentual original (ex: 4 para 4%)
            source: emblemName,
            type: "emblem-percent", // Novo tipo específico para emblemas
            customIcon: customIcon
          });
        }
      }
    }
  });
}

// 5) Passiva do Pokémon
modified = applyPassiveBuff(modified, selectedPokemon, base, targetLevel);

// 6) Skills ativáveis
modified = applyActiveSkillBuffs(modified, selectedPokemon, base);

let incluirMapBuffs = "";
mapBuffsRadios.forEach(r => { if (r.checked) incluirMapBuffs = r.value; });

if (incluirMapBuffs === "sim") {
  Object.keys(selectedMapBuffs).forEach(buffKey => {
    const buff = MAP_BUFFS_DATA[buffKey];
    const buffName = buff.name;
    
    const customIcon = `<img src="${buff.image}" style="width: 14px; height: 14px; border-radius: 50%; margin-right: 8px;" onerror="this.style.display='none'">`;
    
    if (buff.type === "debuff") {
      // Escavalier - debuff no oponente
      if (!modified._debuffsAcumulados) {
        modified._debuffsAcumulados = {};
      }
      
      const debuffStat = buff.stat;
      
      if (!modified._debuffsAcumulados[debuffStat]) {
        modified._debuffsAcumulados[debuffStat] = {
          total: 0,
          skills: [],
          customLabel: null,
          label: buff.debuffLabel || `(DEBUFF) ${debuffStat} Reduction`,
          value: 0,
          stat: debuffStat
        };
      }
      
      // ✅ ACUMULAR o valor ao invés de substituir
      modified._debuffsAcumulados[debuffStat].total += buff.value;
      modified._debuffsAcumulados[debuffStat].value += buff.value;
      modified._debuffsAcumulados[debuffStat].skills.push({
        name: buffName,
        value: buff.value
      });
      
      if (buff.debuffLabel) {
        modified._debuffsAcumulados[debuffStat].customLabel = buff.debuffLabel;
        modified._debuffsAcumulados[debuffStat].label = buff.debuffLabel;
      }
      
      return;
    }
    
    if (buff.type === "special") {
      // Groudon - Shield formula + Skill Damage Multiplier
      
      // 1) Calcular Shield baseado no HP
      if (buff.shieldFormula) {
        const shieldPercent = buff.shieldFormula(modified.HP);
        modified.Shield += shieldPercent;
        
        if (!statModifiers.Shield) {
          statModifiers.Shield = { base: 0, modifications: [], total: 0 };
        }
        statModifiers.Shield.modifications.push({
          value: shieldPercent,
          source: buffName,
          type: "formula",
          customIcon: customIcon
        });
      }
      
      // 2) Armazenar o multiplicador de dano para aplicar nas skills depois
      if (buff.skillDamageMultiplier) {
        if (!modified._mapBuffDamageMultipliers) {
          modified._mapBuffDamageMultipliers = [];
        }
        modified._mapBuffDamageMultipliers.push({
          multiplier: buff.skillDamageMultiplier,
          affectsBasicAttack: buff.affectsBasicAttack,
          source: buffName
        });
      }
      
      return;
    }
    
    // Buffs com stats multiplos (Regirock, Registeel)
    if (buff.stats) {
      Object.keys(buff.stats).forEach(stat => {
        const value = buff.stats[stat];
        const bonusValue = base[stat] * (value / 100);
        modified[stat] += bonusValue;
        
        if (!statModifiers[stat]) {
          statModifiers[stat] = { base: 0, modifications: [], total: 0 };
        }
        statModifiers[stat].modifications.push({
          value: value,
          source: buffName,
          type: "emblem-percent",
          customIcon: customIcon
        });
      });
    }
    // Buffs com stat unico (Accelgor, Regice)
    else if (buff.stat && buff.type === "percent") {
      const stat = buff.stat;
      const value = buff.value;
      
      if (PERCENT_KEYS.has(stat)) {
        // Accelgor (CDR) ou Regice (HPRegen) - stats percentuais
        modified[stat] += value;
        
        if (!statModifiers[stat]) {
          statModifiers[stat] = { base: 0, modifications: [], total: 0 };
        }
        statModifiers[stat].modifications.push({
          value: value,
          source: buffName,
          type: "flat",
          customIcon: customIcon
        });
      }
    }
  });
}

    modified = ensureAllStats(modified);

    const pokemonRole = pokemonRoles[selectedPokemon] || 'Unknown';
    const roleColor = rolesColor[pokemonRole] || '#666';

    const prevImg = document.querySelector(".resultado-image");
    if (prevImg) prevImg.remove();
    resultado.insertAdjacentHTML("afterbegin", `
      <div class="resultado-image role-${pokemonRole.toLowerCase().replace(' ', '')}">
        <img src="./estatisticas-shad/images/backgrounds/${selectedPokemon}-left-bg.png" alt="${safeCap(selectedPokemon)}"
            onerror="this.style.display='none'" style="border: none;">
        <div class="info-jogador">${safeCap(selectedPokemon)} (Lv. ${targetLevel})</div>
        <div class="role-badge" style="background-color: ${roleColor};">${pokemonRole}</div>
        ${createPokemonRatings(selectedPokemon)}
      </div>
    `);

    updatePokemonImage();
    makeImageClickable();
  createSkillBuildInResult();
  renderMetaComparison(selectedPokemon);

// Status Final - Novo Design com Sistema de Expansão
statusFinalDiv.innerHTML = STAT_KEYS
  .map(k => {
    const b = Number(base[k]) || 0;
    const m = Number(modified[k]) || 0;
    const extraFixed = (k === "DmgTaken" && modified._fixedDmgTaken) ? modified._fixedDmgTaken : null;

    // Verificar se há modificadores para este stat
    const hasModifiers = statModifiers[k] && statModifiers[k].modifications.length > 0;
    const expandableClass = hasModifiers ? " expandable" : "";
    
  // Calcular porcentagem de mudança CORRETAMENTE
 let percentChange = 0;

// CORREÇÃO: Verificar tipo de modificadores para calcular corretamente
    if (k === "Speed") {
      if (hasModifiers && statModifiers[k].modifications.some(mod => mod.type === "percent" || mod.type === "speed-percent")) {
        // Somar tanto modificadores percent quanto speed-percent
        percentChange = statModifiers[k].modifications
          .filter(mod => mod.type === "percent" || mod.type === "speed-percent")
          .reduce((sum, mod) => {
            if (mod.type === "percent") {
              // Já está em valor absoluto (ex: -600)
              const percentValue = b !== 0 ? (mod.value / b) * 100 : 0;
              return sum + percentValue;
            } else {
              // speed-percent já está em porcentagem
              return sum + mod.value;
            }
          }, 0)
          .toFixed(1);
      } else if (b !== 0) {
        percentChange = (((m - b) / b) * 100).toFixed(1);
      } else {
        percentChange = 0;
      }
    } else if (PERCENT_KEYS.has(k)) {
      // Para stats percentuais (CDR, CritRate, etc): diferença direta
      percentChange = (m - b).toFixed(1);
    } else {
      // ✅ PARA STATS NUMÉRICOS (ATK, HP, DEF, SpATK, SpDEF):
      // Sempre calcular baseado na diferença total (modified - base)
      if (b !== 0) {
        percentChange = (((m - b) / b) * 100).toFixed(1);
      } else {
        percentChange = 0;
      }
    }

    let statLineHTML = "";
    // Se o valor modificado é maior que o base (buff)
    if (m > b) {
      statLineHTML = `
        <div class="stat-line${expandableClass}" data-stat="${k}">
          <span class="stat-label">${STAT_LABELS[k]}</span>
          <span class="stat-value">
            <span class="base-value">${formatValue(k, b)}</span>
            <span class="arrow-up">▲</span>
            <span class="modified-up">${formatValue(k, m, extraFixed)}</span>
            ${percentChange > 0 ? `<span class="percent-increase">+${percentChange}%</span>` : ''}
          </span>
        </div>
      `;
    }
    // Se o valor modificado é menor que o base (debuff)
    else if (m < b) {
      statLineHTML = `
        <div class="stat-line${expandableClass}" data-stat="${k}">
          <span class="stat-label">${STAT_LABELS[k]}</span>
          <span class="stat-value">
            <span class="base-value">${formatValue(k, b)}</span>
            <span class="arrow-down">▼</span>
            <span class="modified-down">${formatValue(k, m, extraFixed)}</span>
            ${percentChange < 0 ? `<span class="percent-decrease">${percentChange}%</span>` : ''}
          </span>
        </div>
      `;
    }
    // Se são iguais (sem modificação)
    else {
      statLineHTML = `
        <div class="stat-line">
          <span class="stat-label">${STAT_LABELS[k]}</span>
          <span class="stat-value">${formatValue(k, m, extraFixed)}</span>
        </div>
      `;
    }
    
    // Adicionar detalhes se houver modificadores
    if (hasModifiers) {
      statLineHTML += generateStatDetailsHTML(k, b, m);
    }
    
    return statLineHTML;
  }).join("");

  // Event listeners para expansão de stats
const expandableStats = statusFinalDiv.querySelectorAll(".stat-line.expandable");
expandableStats.forEach(statLine => {
  statLine.addEventListener("click", (e) => {
    // Evitar conflito com cliques em ícones de itens
    if (e.target.closest(".item-icon-container")) {
      return;
    }
    
    const stat = statLine.dataset.stat;
    const detailsDiv = document.getElementById(`details-${stat}`);
    
    if (!detailsDiv) return;
    
    // Fechar outros stats expandidos
    if (currentExpandedStat && currentExpandedStat !== stat) {
      const prevStatLine = statusFinalDiv.querySelector(`.stat-line[data-stat="${currentExpandedStat}"]`);
      const prevDetails = document.getElementById(`details-${currentExpandedStat}`);
      
      if (prevStatLine) {
        prevStatLine.classList.remove("expanded");
      }
      if (prevDetails) {
        prevDetails.classList.remove("show");
      }
    }
    
    // Toggle atual
    const isExpanded = statLine.classList.contains("expanded");
    
    if (isExpanded) {
      statLine.classList.remove("expanded");
      detailsDiv.classList.remove("show");
      currentExpandedStat = null;
    } else {
      statLine.classList.add("expanded");
      detailsDiv.classList.add("show");
      currentExpandedStat = stat;
    }
  });
});

 // Mostrar debuffs ativos
if (modified._debuffsAcumulados && Object.keys(modified._debuffsAcumulados).length > 0) {
  Object.values(modified._debuffsAcumulados).forEach(debuff => {
    const baseValue = 0;
    const modifiedValue = debuff.value;
    
    // ✅ USAR customLabel SE DISPONÍVEL, SENÃO USA label PADRÃO
    const displayLabel = debuff.customLabel || debuff.label || `(DEBUFF) ${debuff.stat} Reduction`;
    
    // Tratamento especial para Unstoppable - exibir em segundos (BUFF positivo)
    if (debuff.stat === "Unstoppable") {
      statusFinalDiv.insertAdjacentHTML("beforeend", `
        <div class="stat-line">
          <span class="stat-label">${displayLabel}</span>
          <span class="stat-value">
            <span class="base-value">${baseValue}s</span>
            <span class="arrow-up">▲</span>
            <span class="modified-up">${modifiedValue}s</span>
            <span class="percent-increase">+100%</span>
          </span>
        </div>
      `);
    } else {
      // DEBUFFS (reduções) - mostrar em vermelho
      statusFinalDiv.insertAdjacentHTML("beforeend", `
        <div class="stat-line">
          <span class="stat-label">${displayLabel}</span>
          <span class="stat-value">
            <span class="base-value">${baseValue}%</span>
            <span class="arrow-down">▼</span>
            <span class="modified-down">-${modifiedValue}%</span>
          </span>
        </div>
      `);
    }
  });
}

    // NOVO: Mostrar ally buffs ativos (buffs para aliados)
    if (modified._allyBuffsAcumulados && Object.keys(modified._allyBuffsAcumulados).length > 0) {
      Object.values(modified._allyBuffsAcumulados).forEach(allyBuff => {
        const baseValue = 0;
        const modifiedValue = allyBuff.value;
        
        // ALLY BUFFS - mostrar em verde (positivo)
        statusFinalDiv.insertAdjacentHTML("beforeend", `
          <div class="stat-line">
            <span class="stat-label">${allyBuff.label}</span>
            <span class="stat-value">
              <span class="base-value">${baseValue}%</span>
              <span class="arrow-up">▲</span>
              <span class="modified-up">+${modifiedValue}%</span>
            </span>
          </div>
        `);
      });
    }

if (skillDamage[selectedPokemon]) {
      const skills = skillDamage[selectedPokemon];
      const activeEffects = new Set(); // Usar Set para evitar duplicatas
      
      // ✅ VERIFICAR EFFECTS DE PASSIVAS ATIVAS
      ['passive', 'passive1', 'passive2'].forEach(passiveKey => {
        if (skills[passiveKey]) {
          const isPassiveActive = activePassives[selectedPokemon] && activePassives[selectedPokemon][passiveKey];
          
          if (isPassiveActive && skills[passiveKey].effects && Array.isArray(skills[passiveKey].effects)) {
            skills[passiveKey].effects.forEach(effectName => {
              activeEffects.add(effectName);
            });
          }
        }
      });
      
      // ✅ VERIFICAR EFFECTS DE SKILLS ATIVAS
      Object.keys(skills).forEach(skillKey => {
        // Ignorar passivas (já foram processadas acima)
        if (skillKey === "passive" || skillKey === "passive1" || skillKey === "passive2") return;
        
        const skill = skills[skillKey];
        const isSkillActive = activeSkills[selectedPokemon] && activeSkills[selectedPokemon][skillKey];
        
        if (isSkillActive) {
          // Effects básicos da skill
          if (skill.effects && Array.isArray(skill.effects)) {
            skill.effects.forEach(effectName => {
              activeEffects.add(effectName);
            });
          }

          if (skill.conditionalBuffs && skill.conditionalBuffs.requiredSkill) {
            const requiredSkill = skill.conditionalBuffs.requiredSkill;
            
            // Verificar se a skill necessária está ativa
            if (activeSkills[selectedPokemon] && activeSkills[selectedPokemon][requiredSkill]) {
              // Adicionar effects condicionais
              if (skill.conditionalBuffs.effectsWhenActive && Array.isArray(skill.conditionalBuffs.effectsWhenActive)) {
                skill.conditionalBuffs.effectsWhenActive.forEach(effectName => {
                  activeEffects.add(effectName);
                });
              }
            }
          }

          if (skill.conditionalEffects && skill.conditionalEffects.effectsByType) {
            const selectedEffect = selectedConditionalEffects[selectedPokemon]?.[skillKey];
            
            if (selectedEffect && skill.conditionalEffects.effectsByType[selectedEffect]) {
              const effectsForType = skill.conditionalEffects.effectsByType[selectedEffect];
              
              if (Array.isArray(effectsForType)) {
                effectsForType.forEach(effectName => {
                  if (effectName && effectName.trim() !== "") {
                    activeEffects.add(effectName);
                  }
                });
              }
            }
          }
          
          // Effects do buffPlus
          if (skill.buffPlus && currentLevel >= (skill.buffPlus.levelRequired || 11)) {
            if (skill.buffPlus.effects && Array.isArray(skill.buffPlus.effects)) {
              skill.buffPlus.effects.forEach(effectName => {
                activeEffects.add(effectName);
              });
            }
          }
        }
      });
      
      // Renderizar effects ativos como linhas na tabela
      if (activeEffects.size > 0) {
        activeEffects.forEach(effectName => {
          // ✅ VERIFICAR SE É UM EFEITO CONDICIONAL
          let shouldDisplay = true;
          
          Object.keys(skills).forEach(skillKey => {
            const skill = skills[skillKey];
            const isSkillActive = activeSkills[selectedPokemon] && activeSkills[selectedPokemon][skillKey];
            
            // Se a skill tem conditional effects e está ativa
            if (isSkillActive && skill.conditionalEffects && skill.conditionalEffects.options) {
              // Se este effect está na lista de opções
              if (skill.conditionalEffects.options.includes(effectName)) {
                // Só mostra se for o effect selecionado
                const selectedEffect = selectedConditionalEffects[selectedPokemon]?.[skillKey];
                shouldDisplay = (effectName === selectedEffect);
              }
            }
          });
          
          if (shouldDisplay) {
            const config = EFFECT_CONFIG[effectName] || { icon: "⭐", label: effectName };
            
            statusFinalDiv.insertAdjacentHTML("beforeend", `
              <div class="stat-line effect-indicator">
                <span class="stat-label">
                  <span class="effect-icon-inline">${config.icon}</span>
                  ${config.label}
                </span>
                <span class="stat-value">ACTIVE</span>
              </div>
            `);
          }
        });
      }
    }

    // Mostrar ícones dos itens
    if (selectedHeldItems.length > 0) {
      const passives = getItemPassivesSource();
      const itensHtml = selectedHeldItems.map(selectedItem => {
        const it = selectedItem.key;
        const hasPassive = passives[it] && Object.keys(passives[it]).length > 0;
        const isActive = activeItemPassives[it] || false;
        const activeClass = hasPassive && isActive ? " item-active" : "";
        const clickableClass = hasPassive ? " item-clickable" : "";
        
        return `
          <div class="item-icon-container${activeClass}${clickableClass}" data-item="${it}">
            <img src="./estatisticas-shad/images/held-itens/${it}.png" 
                 alt="${gameHeldItens[it]}" 
                 title="${gameHeldItens[it]}" 
                 style="width:30px; height:30px; margin:0 5px;">
            ${hasPassive ? '<div class="item-passive-dot"></div>' : ''}
          </div>
        `;
      }).join("");
      
      statusFinalDiv.insertAdjacentHTML("beforeend", `
        <div class="stat-line special-stat">
          <span class="stat-label">Itens</span>
          <span class="stat-value item-icons-wrapper">
            ${itensHtml}
          </span>
        </div>
      `);
    }

    // Mostrar emblemas ativos
if (incluirEmblemas === "sim") {
  const selectedEmblemKeys = Object.keys(selectedEmblems);
  if (selectedEmblemKeys.length > 0) {
    const activeEmblems = selectedEmblemKeys.map(emblemKey => {
      const emblem = EMBLEM_DATA[emblemKey];
      const level = selectedEmblems[emblemKey];
      const bonus = emblem.levels[level];
      
      const borderStyle = emblem.color === "#ffffff" ? "border: 1px solid #333;" : "";
      
      if (emblemKey === "gray") {
        return `<div style="display: flex; align-items: center; width: 100%; margin-bottom: 4px;">
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: ${emblem.color}; margin-right: 8px; flex-shrink: 0; ${borderStyle}"></span>
          <span style="color: #000; font-size: 12px; font-weight: 500;">${emblem.name} Lv.${level} (-${bonus})</span>
        </div>`;
      } else {
        return `<div style="display: flex; align-items: center; width: 100%; margin-bottom: 4px;">
          <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: ${emblem.color}; margin-right: 8px; flex-shrink: 0; ${borderStyle}"></span>
          <span style="color: #000; font-size: 12px; font-weight: 500;">${emblem.name} Lv.${level} (+${bonus}%)</span>
        </div>`;
      }
    }).join("");

    statusFinalDiv.insertAdjacentHTML("beforeend", `
      <div class="stat-line special-stat" style="flex-direction: column; align-items: flex-start;">
        <span class="stat-label" style="margin-bottom: 8px;">Emblems</span>
        <div style="display: flex; flex-direction: column; width: 100%; padding-left: 10px;">
          ${activeEmblems}
        </div>
      </div>
    `);
  }
}

// Mostrar map buffs ativos
if (incluirMapBuffs === "sim") {
  const selectedBuffKeys = Object.keys(selectedMapBuffs);
  if (selectedBuffKeys.length > 0) {
    const activeBuffs = selectedBuffKeys.map(buffKey => {
      const buff = MAP_BUFFS_DATA[buffKey];
      
      return `<div style="display: flex; align-items: center; width: 100%; margin-bottom: 4px;">
        <img src="${buff.image}" style="width: 28px; height: 28px; border-radius: 50%; margin-right: 8px; object-fit: cover;" onerror="this.style.display='none'">
        <span style="color: #000; font-size: 12px; font-weight: 500;">${buff.name}</span>
      </div>`;
    }).join("");

    statusFinalDiv.insertAdjacentHTML("beforeend", `
      <div class="stat-line special-stat" style="flex-direction: column; align-items: flex-start;">
        <span class="stat-label" style="margin-bottom: 8px;">Map Buffs</span>
        <div style="display: flex; flex-direction: column; width: 100%; padding-left: 10px;">
          ${activeBuffs}
        </div>
      </div>
    `);
  }
}

    // ✅ CÓDIGO NOVO COM SISTEMA CLICÁVEL:
    if (activeBattleItem) {
      const battleItemName = gameBattleItems[activeBattleItem] || activeBattleItem;
      const activeClass = isBattleItemActive ? " item-active" : "";
      
      const battleImg = `
        <div class="item-icon-container item-clickable${activeClass}" data-battle-item="${activeBattleItem}">
          <img src="./estatisticas-shad/images/battle-items/${activeBattleItem}.png" 
              alt="${battleItemName}" 
              title="${battleItemName} (Clique para ativar/desativar)" 
              style="width:40px; height:40px;">
          <div class="item-passive-dot"></div>
        </div>
      `;
      
      statusFinalDiv.insertAdjacentHTML("beforeend", `
        <div class="stat-line special-stat">
          <span class="stat-label">Battle Item</span>
          <span class="stat-value item-icons-wrapper">
            ${battleImg}
          </span>
        </div>
      `);
    }

    // Cálculo das skills
    skillsDiv.innerHTML = "";

    // Muscle Gauge para Buzzwole
    if (selectedPokemon === "buzzwole") {
      createMuscleGaugeControl();
    }

    // Sweet Gauge para Alcremie - ADICIONE ESTE BLOCO
    if (selectedPokemon === "alcremie") {
      createSweetGaugeControl();
    }

    if (selectedPokemon === "leafeon") {
      createChlorophyllGaugeControl();
    }

    if (selectedPokemon === "pawmot") { // ✅ NOVO
      createPawmotModeControl();
    }
    
    if (selectedPokemon === "latias") {
      createEonPowerControl();
      createEonPower2Control(); // ✅ NOVO: Segundo gauge
    }

    if (selectedPokemon === "latios") {
      createEonPowerControlLatios();
    }

    if (typeof skillDamage !== "undefined" && skillDamage[selectedPokemon]) {
      const skills = skillDamage[selectedPokemon];

      // Renderizar passivas
      const passiveKeys = ['passive', 'passive1', 'passive2'].filter(key => skills[key]);
      
      passiveKeys.forEach(passiveKey => {
        const p = skills[passiveKey];
        const imgPath = `./estatisticas-shad/images/skills/${selectedPokemon}_${passiveKey}.png`;
        const fallbackImg = `./estatisticas-shad/images/skills/passive.png`;
        const isActive = (activePassives[selectedPokemon] && activePassives[selectedPokemon][passiveKey]) || false;
        const activeClass = isActive ? " active" : "";

        let passiveFormulasHtml = "";
        if (p.formulas && p.formulas.length > 0) {
          passiveFormulasHtml = p.formulas.map((f, index) => {
            if (f.type === "text-only") {
              return `<li><strong>${f.label}:</strong> <span style="color:#888; font-style:italic;">${f.additionalText}</span></li>`;
            }
            
            const values = p.calculatedValues?.[index] || { base: 0, modified: 0 };
            let displayText = "";
            let hasAdditionalText = f.additionalText && f.additionalText.trim() !== "";
            
            if (Math.floor(values.modified) > Math.floor(values.base)) {
              displayText = `${customRound(values.base)} → <span style="color:limegreen;">▲ ${customRound(values.modified)}</span>`;
            } else {
              displayText = `${customRound(values.modified)}`;
            }
            
            if (hasAdditionalText) {
              displayText += ` <span style="color:#888; font-style:italic;">+ ${f.additionalText}</span>`;
            }
            
            return `<li><strong>${f.label}:</strong> ${displayText}</li>`;
          }).join("");
        }

        // ✅ GERAR ACTIVE EFFECTS PARA PASSIVA
      let passiveEffectsHtml = "";
      if (isActive) {
        passiveEffectsHtml = formatPassiveEffects(p, selectedPokemon);
      }

      const passiveHtml = `
        <div class="skill-box passive${activeClass}" data-pokemon="${selectedPokemon}" data-passive-key="${passiveKey}" style="margin-bottom: 15px;">
          <div class="skill-box-content">
            <div class="skill-header-wrapper">
              <img src="${imgPath}" alt="${p.name}" class="skill-icon"
                  onerror="this.onerror=null;this.src='${fallbackImg}'">
              <div style="flex: 1;">
                <h4>${p.name}</h4>
                <div class="passive-subtitle">passive skill</div>
              </div>
              <div class="passive-status"></div>
            </div>
            <div class="skill-info">
              ${p.description ? `<div class="skill-info-text" style="color:#000; font-style:italic; background: none;">${p.description}</div>` : ""}
              ${passiveFormulasHtml ? `<ul style="list-style: none; padding: 0; margin: 8px 0;">${passiveFormulasHtml}</ul>` : ""}
              ${passiveEffectsHtml}
            </div>
          </div>
        </div>
      `;
        
        skillsDiv.insertAdjacentHTML("beforeend", passiveHtml);
      });

  // Renderizar outras skills (substitua toda a seção Object.keys(skills).forEach na função calcular)
Object.keys(skills).forEach(key => {
  if (key === "passive" || key === "passive1" || key === "passive2") return;
  if (!shouldShowSkill(selectedPokemon, key)) return;
  
  const s = skills[key];
  const imgPath = `./estatisticas-shad/images/skills/${selectedPokemon}_${key}.png`;
  const fallbackImg = `./estatisticas-shad/images/skills/${key}.png`;

  const isUltimate = key === "ult" || key === "ult1" || key === "ult2" || key === "ult3" || key === "ult4" || key === "ult5" || key === "ult6" || key === "ult7";
  const ultimateClass = isUltimate ? " ultimate" : "";
  
  const isActivatable = activeSkills[selectedPokemon] && activeSkills[selectedPokemon].hasOwnProperty(key);
  const isActiveSkill = isActivatable && activeSkills[selectedPokemon][key];
  const activatableClass = isActivatable ? " activatable" : "";
  const activeClass = isActiveSkill ? " active" : "";
  
  const hasSkillPlus = (s.buffPlus && s.buffPlus.levelRequired) || (s.selfBuffPlus && s.selfBuffPlus.levelRequired);
  const buffPlusActive = s.buffPlus && currentLevel >= s.buffPlus.levelRequired;
  const selfBuffPlusActive = s.selfBuffPlus && currentLevel >= s.selfBuffPlus.levelRequired;
  const isPlusActive = buffPlusActive || selfBuffPlusActive;

  const baseCooldown = s.cooldown || null;
  const globalCDR = modified.CDR || 0;
  const globalEnergyRate = modified.EnergyRate || 0;
  const effectiveCooldown = calculateCooldownForSkill(baseCooldown, globalCDR, globalEnergyRate, key, modified, selectedPokemon);
  
  // Criar badge de cooldown se existir
  const cooldownBadge = effectiveCooldown ? 
    `<span class="skill-cooldown-badge">⏱️ ${effectiveCooldown.toFixed(1)}s</span>` : "";

  const critIndicator = canSkillCrit(selectedPokemon, key) && showCritDamage ? 
  `<span class="skill-crit-indicator" title="This skill can critically hit">
    <img src="./estatisticas-shad/images/icons/crit.png" style="width: 16px; height: 16px; vertical-align: middle;" onerror="this.style.display='none'">
  </span>` : "";

  const calculatedValues = [];
  
// Primeiro passe: calcular valores não dependentes
s.formulas.forEach((f, index) => {
  if (f.type === "text-only") {
    calculatedValues[index] = { base: 0, modified: 0 };
    return;
  }
  
  if (f.type !== "dependent") {
    let baseVal, modifiedVal;
    
    if (f.type === "multi" || f.useAllStats) {
      baseVal = f.formula(base, targetLevel);
      modifiedVal = f.formula(modified, targetLevel);
    } else {
      let baseAttribute, modifiedAttribute;
      
      switch(f.type) {
        case "special":
          baseAttribute = base.SpATK;
          modifiedAttribute = modified.SpATK;
          break;
        case "hp":
          baseAttribute = base.HP;
          modifiedAttribute = modified.HP;
          break;
        case "heal":
          if (f.healAttribute) {
            const healAttr = f.healAttribute.toUpperCase();
            if (healAttr === "ATK") {
              baseAttribute = base.ATK;
              modifiedAttribute = modified.ATK;
            } else if (healAttr === "SPATK") {
              baseAttribute = base.SpATK;
              modifiedAttribute = modified.SpATK;
            } else if (healAttr === "HP") {
              baseAttribute = base.HP;
              modifiedAttribute = modified.HP;
            } else {
              baseAttribute = base.SpATK;
              modifiedAttribute = modified.SpATK;
            }
          } else {
            baseAttribute = base.SpATK;
            modifiedAttribute = modified.SpATK;
          }
          break;
        case "shield":
          baseAttribute = base.SpATK;
          modifiedAttribute = modified.SpATK;
          break;
        case "physical":
        default:
          baseAttribute = base.ATK;
          modifiedAttribute = modified.ATK;
          break;
      }
      
      // Dentro do loop s.formulas.forEach((f, index) => {
      if (f.usesMuscleGauge && selectedPokemon === "buzzwole") {
        baseVal = f.formula(baseAttribute, targetLevel, base.HP, muscleGauge);
        modifiedVal = f.formula(modifiedAttribute, targetLevel, modified.HP, muscleGauge);
      } else if (f.usesEonPower && selectedPokemon === "latias") {
        // ✅ NOVA LÓGICA: Verificar qual gauge usar baseado na skill
        let currentEonPower;
        
        // Determinar qual gauge usar baseado na skill key
        if (key === "s21") {
          // Dragon Pulse e skills do slot 1 usam eonPower (primeiro gauge)
          currentEonPower = eonPower;
        } else if (key === "s22") {
          // Dragon Breath e skills do slot 2 usam eonPower2 (segundo gauge)
          currentEonPower = eonPower2;
        } else {
          // Fallback para o primeiro gauge
          currentEonPower = eonPower;
        }
        
        baseVal = f.formula(baseAttribute, targetLevel, base.HP, currentEonPower);
        modifiedVal = f.formula(modifiedAttribute, targetLevel, modified.HP, currentEonPower);
      } else if (f.usesEonPower && selectedPokemon === "latios") {
        baseVal = f.formula(baseAttribute, targetLevel, base.HP, eonPowerlatios);
        modifiedVal = f.formula(modifiedAttribute, targetLevel, modified.HP, eonPowerlatios);
      } else {
        baseVal = f.formula(baseAttribute, targetLevel, base.HP);
        modifiedVal = f.formula(modifiedAttribute, targetLevel, modified.HP);
      }
      

      // Aplicar bônus do Razor Claw apenas para ataques básicos e boosted
      if (selectedItems.includes("razorclaw") && activeItemPassives["razorclaw"]) {
        const basicAttackKeys = ['basic', 'basicattack', 'atkboosted'];
        if (basicAttackKeys.includes(key)) {
          const razorClawBonus = 20 + (base.ATK * 0.5);
          baseVal += razorClawBonus;
          modifiedVal += razorClawBonus;
        }
      }

      // ✅ NOVO: Aplicar nextBasicAttackPercent aos ataques básicos
      if (modified._nextBasicAttackPercents && modified._nextBasicAttackPercents.length > 0) {
        const basicAttackKeys = ['basic', 'basicattack', 'atkboosted'];
        if (basicAttackKeys.includes(key)) {
          const totalPercent = modified._nextBasicAttackPercents.reduce((sum, buff) => sum + buff.value, 0);
          
          if (totalPercent !== 0) {
            const multiplier = 1 + (totalPercent / 100);
            const finalMultiplier = Math.max(0, multiplier); // Proteção contra negativo
            
            modifiedVal *= finalMultiplier;
          }
        }
      }
      
      // Aplicar multiplicadores para heal e shield
      if (f.type === "heal") {
        const healMultiplier = 1 + (modified.HPRegen / 100);
        modifiedVal *= healMultiplier;
      } else if (f.type === "shield") {
        const shieldMultiplier = 1 + (modified.Shield / 100);
        modifiedVal *= shieldMultiplier;
      }
      if (s.selfDamageMultiplier && (f.type === "physical" || f.type === "special")) {
        modifiedVal *= s.selfDamageMultiplier;
      }
    }

// Aplicar skillDamageMultiplier de QUALQUER passiva ativa
    ['passive', 'passive1', 'passive2'].forEach(passiveKey => {
      if (skills[passiveKey]) {
        const passive = skills[passiveKey];
        const isPassiveActive = activePassives[selectedPokemon] && activePassives[selectedPokemon][passiveKey];
        
        if (isPassiveActive && passive.skillDamageMultiplier) {
          const isBasicAttack = ['atkboosted', 'basic', 'basicattack'].includes(key);
          
          if (!isBasicAttack || passive.affectsBasicAttack === true) {
            modifiedVal *= passive.skillDamageMultiplier;
          }
        }
      }
    });

    if (modified._selfDamageMultipliers && modified._selfDamageMultipliers[key]) {
      const selfMultiplier = modified._selfDamageMultipliers[key];
      modifiedVal *= selfMultiplier.multiplier;
    }

    // NOVO: Aplicar multiplicadores de dano dos Map Buffs (Groudon)
    if (modified._mapBuffDamageMultipliers && modified._mapBuffDamageMultipliers.length > 0) {
      modified._mapBuffDamageMultipliers.forEach(buffMultiplier => {
        const isBasicAttack = ['atkboosted', 'basic', 'basicattack'].includes(key);
        
        if (!isBasicAttack || buffMultiplier.affectsBasicAttack === true) {
          modifiedVal *= buffMultiplier.multiplier;
        }
      });
    }

    // NOVO: Aplicar skillDamageMultiplier GLOBAL de QUALQUER skill com buffPlus ativo
    if (activeSkills[selectedPokemon]) {
      Object.keys(activeSkills[selectedPokemon]).forEach(skillKey => {
        // Verificar se a skill está ativa
        if (activeSkills[selectedPokemon][skillKey]) {
          const activeSkill = skills[skillKey];
          
          // Verificar se tem buffPlus com skillDamageMultiplier
          if (activeSkill?.buffPlus && 
              currentLevel >= (activeSkill.buffPlus.levelRequired || 11) &&
              activeSkill.buffPlus.skillDamageMultiplier) {
            
            const isBasicAttack = ['atkboosted', 'basic', 'basicattack'].includes(key);
            
            // Aplicar multiplicador globalmente
            if (!isBasicAttack || activeSkill.buffPlus.affectsBasicAttack === true) {
                      modifiedVal *= activeSkill.buffPlus.skillDamageMultiplier;
            }
          }
        }
      });
    }
    
    // Aplicar bônus de passiva para ataques básicos
    if ((key === "atkboosted" || key === "basic" || key === "basicattack")) {
      let totalPassiveBonus = { base: 0, modified: 0 };
      const passiveKeys = ['passive', 'passive1', 'passive2'];
      
      passiveKeys.forEach(passiveKey => {
        if (skills[passiveKey]?.nextBasicAttackBonus && 
            activePassives[selectedPokemon] && activePassives[selectedPokemon][passiveKey]) {
          const passiveBonus = skills[passiveKey].nextBasicAttackBonus;
          totalPassiveBonus.base += passiveBonus.base;
          totalPassiveBonus.modified += passiveBonus.modified;
        }
      });
      
      baseVal += totalPassiveBonus.base;
      modifiedVal += totalPassiveBonus.modified;
    }
    
    // Caso especial para Decidueye
    if (selectedPokemon === "decidueye" && activePassives[selectedPokemon]) {
      const hasAnyPassiveActive = ['passive', 'passive1', 'passive2'].some(passiveKey => 
        skills[passiveKey] && activePassives[selectedPokemon][passiveKey]);
      
      if (hasAnyPassiveActive) {
        modifiedVal *= 1.20;
      }
    }
    
    if (activeSkills[selectedPokemon]) {
    Object.keys(activeSkills[selectedPokemon]).forEach(activeSkillKey => {
      // Verificar se a skill está ativa
      if (activeSkills[selectedPokemon][activeSkillKey]) {
        const activeSkill = skills[activeSkillKey];
        
        // Verificar se tem skillDamageMultiplier
        if (activeSkill?.skillDamageMultiplier) {
          const isBasicAttack = ['atkboosted', 'basic', 'basicattack'].includes(key);
          
          // Aplicar multiplicador globalmente (afeta TODAS as skills)
          if (!isBasicAttack || activeSkill.affectsBasicAttack === true) {
            modifiedVal *= activeSkill.skillDamageMultiplier;
          }
        }

        // Verificar se tem buffPlus com skillDamageMultiplier
        if (activeSkill?.buffPlus && 
            currentLevel >= (activeSkill.buffPlus.levelRequired || 11) &&
            activeSkill.buffPlus.skillDamageMultiplier) {
          
          const isBasicAttack = ['atkboosted', 'basic', 'basicattack'].includes(key);
          
          // Aplicar multiplicador globalmente
          if (!isBasicAttack || activeSkill.buffPlus.affectsBasicAttack === true) {
            modifiedVal *= activeSkill.buffPlus.skillDamageMultiplier;
          }
        }
      }
    });
  }
    
    calculatedValues[index] = { base: baseVal, modified: modifiedVal };
  }
});

// Segundo passe: calcular valores dependentes
s.formulas.forEach((f, index) => {
  if (f.type === "dependent") {
    const dependsOnIndex = f.dependsOn;
    if (calculatedValues[dependsOnIndex]) {
    // ✅ CORRETO:
    let dependentBase = calculatedValues[dependsOnIndex].base;
    let dependentModified = calculatedValues[dependsOnIndex].modified;
      
      if (calculatedValues[dependsOnIndex].hasPassiveBonus) {
        dependentBase = calculatedValues[dependsOnIndex].withPassive.base;
        dependentModified = calculatedValues[dependsOnIndex].withPassive.modified;
      }
      
      // ✅ CORREÇÃO: Verificar se usa muscle gauge e passar os parâmetros corretos
      let baseVal, modifiedVal;
      
      if (f.usesMuscleGauge && selectedPokemon === "buzzwole") {
        // Passar: dependentValue, Level, HP, muscleGauge
        baseVal = f.formula(dependentBase, targetLevel, base.HP, muscleGauge);
        modifiedVal = f.formula(dependentModified, targetLevel, modified.HP, muscleGauge);
      } else {
        // Comportamento padrão (sem gauge)
        baseVal = f.formula(dependentBase, targetLevel, base.HP);
        modifiedVal = f.formula(dependentModified, targetLevel, modified.HP);
      }
      
      calculatedValues[index] = { base: baseVal, modified: modifiedVal, hasPassiveBonus: false };
    } else {
      calculatedValues[index] = { base: 0, modified: 0, hasPassiveBonus: false };
    }
  }
});

  // Criar indicador de skill plus INLINE (para ir no cabeçalho)
let skillPlusIndicator = "";
if (hasSkillPlus) {
  const levelReq = s.buffPlus?.levelRequired || s.selfBuffPlus?.levelRequired || 11;
  const plusText = isPlusActive ? "PLUS ACTIVE" : `PLUS LV ${levelReq} ACTIVATION`;
  skillPlusIndicator = `<span class="skill-upgrade-indicator">${plusText}</span>`;
}
// Informação especial para Shell Smash
let shellSmashInfo = "";
if (key === "s12" && selectedPokemon === "blastoise" && isActiveSkill && modified._shellSmashBonus) {
  const bonus = modified._shellSmashBonus;
  const percentDisplay = (bonus.conversionRate * 100).toFixed(0); // 40 ou 50
  
  shellSmashInfo = `
    <div class="skill-info-special" style="background: rgba(255, 100, 100, 0.1); padding: 10px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #ff6464;">
      <strong>⚠️ Defense Conversion:</strong><br>
      <span style="color: #888;">Total Defense: ${Math.floor(bonus.totalDefense)} (${Math.floor(bonus.originalDEF)} + ${Math.floor(bonus.originalSpDEF)})</span><br>
      <span style="color: #4CAF50;">→ +${Math.floor(bonus.convertedValue)} ATK & Sp.ATK (${percentDisplay}% converted)</span><br>
      <span style="color: #f44336;">→ DEF & Sp.DEF reduced to 0</span>
      ${currentLevel >= 11 ? '<span style="color: #FFD700; font-weight: bold;">⭐ Plus Active!</span>' : ''}
    </div>
  `;
}
// Criar HTML dos valores de dano destacados
const damageValuesHtml = s.formulas.map((f, index) => {
  if (f.type === "text-only") {
    return `<div class="skill-info-text"><strong>${f.label}:</strong> <span style="color:#000; font-style:italic;">${f.additionalText}</span></div>`;
  }
  
  const values = calculatedValues[index];
  if (!values) return "";
  
const baseVal = customRound(values.base);
const modVal = customRound(values.modified);
  const hasIncrease = modVal > baseVal;

  // Calcular dano crítico se estiver ativo
  let critDamageValue = null;
  const isBasicAttackForCrit = (key === "atkboosted");
  const isSkillWithCrit = canSkillCrit(selectedPokemon, key);

  // ✅ NOVO: Aplica crítico no ataque básico OU em skills específicas
  if (showCritDamage && (isBasicAttackForCrit || isSkillWithCrit)) {
    const totalCritMultiplier = modified.CritDmg || 100;
    critDamageValue = customRound(modVal * (1 + (totalCritMultiplier / 100)));
  }
  // ✅ CALCULAR percentIncrease CONSIDERANDO nextBasicAttackPercent
  let percentIncrease = 0;

  // Verificar se é um Basic Attack e se há modificadores nextBasicAttackPercent ativos
  const isBasicAttack = (key === "basic" || key === "basicattack" || key === "atkboosted");

  if (isBasicAttack && modified._nextBasicAttackPercents && modified._nextBasicAttackPercents.length > 0) {
    // Somar todos os modificadores de nextBasicAttackPercent
    const totalPercent = modified._nextBasicAttackPercents.reduce((sum, buff) => sum + buff.value, 0);
    percentIncrease = totalPercent.toFixed(1);
  } else if (baseVal > 0) {
    // Cálculo normal de aumento percentual
    percentIncrease = (((modVal - baseVal) / baseVal) * 100).toFixed(1);
  } else {
    percentIncrease = 0;
  }
  
  return `
    <div class="skill-damage-value">
      <span class="skill-damage-label">${f.label}</span>
      <div class="${critDamageValue !== null ? 'crit-damage-container' : ''}">
        ${hasIncrease || percentIncrease != 0 ? 
          `<span class="skill-damage-number">
            ${baseVal !== modVal ? `<span style="color: #888; font-size: 16px; text-decoration: line-through;">${baseVal}</span>` : ''}
            ${modVal}
            <span class="skill-damage-percent ${percentIncrease < 0 ? 'negative' : ''}">${percentIncrease > 0 ? '+' : ''}${percentIncrease}%</span>
          </span>` :
          `<span class="skill-damage-number">${modVal}</span>`
        }
        ${critDamageValue !== null ? 
          `<span class="crit-damage-value">
            <img src="./estatisticas-shad/images/icons/crit.png" alt="Crit" onerror="this.style.display='none'">
            ${critDamageValue}
          </span>` : 
          ''
        }
        ${f.additionalText ? `<div style="color:#888; font-size:12px; font-style:italic; margin-top:4px;">${f.additionalText}</div>` : ""}
      </div>
    </div>
  `;
}).join("");

let buffsHtml = "";
if (isActiveSkill) {
  buffsHtml = formatActiveEffects(s, isPlusActive, currentLevel, selectedPokemon);
}

let conditionalEffectHTML = "";
if (s.conditionalEffects && s.conditionalEffects.options) {
  conditionalEffectHTML = createConditionalEffectSelector(selectedPokemon, key, s.conditionalEffects);
}

const skillHtml = `
  <div class="skill-box${ultimateClass}${activatableClass}${activeClass}" data-pokemon="${selectedPokemon}" data-skill-key="${key}">
    <div class="skill-box-content">
      <div class="skill-header-wrapper">
        <img src="${imgPath}" alt="${s.name}" class="skill-icon"
            onerror="this.onerror=null;this.src='${fallbackImg}'">
        <div style="flex: 1;">
          <h4>
            ${s.name}
            ${cooldownBadge}
            ${critIndicator}
            ${skillPlusIndicator}
          </h4>
        </div>
        ${isActivatable ? '<div class="skill-status"></div>' : ''}
      </div>
      <div class="skill-info">
        ${shellSmashInfo}
        ${damageValuesHtml}
        ${buffsHtml}
        ${conditionalEffectHTML}
      </div>
    </div>
  </div>
`;

skillsDiv.insertAdjacentHTML("beforeend", skillHtml);
});

    // Event listeners para passivas clicáveis
    const passiveBoxes = skillsDiv.querySelectorAll(".skill-box.passive");
    passiveBoxes.forEach(box => {
      box.addEventListener("click", () => {
        const pokemon = box.dataset.pokemon;
        const passiveKey = box.dataset.passiveKey;

        if (!activePassives[pokemon]) {
          activePassives[pokemon] = {};
        }

        // Comportamento especial para Aegislash
        if (pokemon === "aegislash") {
          const currentlyActive = !!activePassives[pokemon][passiveKey];
          
          if (passiveKey === "passive") {
            // Se clicar em Sword Stance
            if (currentlyActive) {
              // Desativar Sword
              activePassives[pokemon]["passive"] = false;
            } else {
              // Ativar Sword e desativar Shield (mas manter Switch se estiver ativa)
              activePassives[pokemon]["passive"] = true;
              activePassives[pokemon]["passive1"] = false;
            }
          } else if (passiveKey === "passive1") {
            // Se clicar em Shield Stance
            if (currentlyActive) {
              // Desativar Shield
              activePassives[pokemon]["passive1"] = false;
            } else {
              // Ativar Shield e desativar Sword (mas manter Switch se estiver ativa)
              activePassives[pokemon]["passive1"] = true;
              activePassives[pokemon]["passive"] = false;
            }
          } else if (passiveKey === "passive2") {
            // Se clicar em Switch - apenas toggle, não afeta as outras
            activePassives[pokemon]["passive2"] = !currentlyActive;
          }

          // Atualizar classes visuais
          passiveBoxes.forEach(b => {
            const pk = b.dataset.passiveKey;
            const isActiveNow = !!activePassives[pokemon][pk];
            b.classList.toggle("active", isActiveNow);
          });

        } 
        // Comportamento exclusivo para Buzzwole (somente 1 passiva ativa por vez)
        else if (pokemon === "buzzwole") {
          const currentlyActive = !!activePassives[pokemon][passiveKey];

          // Desativa todas as passivas conhecidas antes
          ["passive", "passive1", "passive2"].forEach(k => {
            activePassives[pokemon][k] = false;
          });

          // Se a que foi clicada não estava ativa, ativa-a (caso contrário, fica tudo desativado)
          activePassives[pokemon][passiveKey] = !currentlyActive;

          // Atualiza classe visual nos cards imediatamente
          passiveBoxes.forEach(b => {
            const pk = b.dataset.passiveKey;
            const isActiveNow = !!activePassives[pokemon][pk];
            b.classList.toggle("active", isActiveNow);
          });

        } 
        // Comportamento padrão para os outros pokémons (toggle independente)
        else {
          activePassives[pokemon][passiveKey] = !activePassives[pokemon][passiveKey];
          box.classList.toggle("active", activePassives[pokemon][passiveKey]);
        }

        calcular();
      });
    });

    const effectOptions = skillsDiv.querySelectorAll(".effect-option");
    effectOptions.forEach(option => {
      option.addEventListener("click", (e) => {
        e.stopPropagation(); // ✅ IMPEDE QUE O CLIQUE CHEGUE NA SKILL BOX
        
        const pokemon = option.dataset.pokemon;
        const skillKey = option.dataset.skill;
        const effectName = option.dataset.effect;
        
        // Salvar seleção
        if (!selectedConditionalEffects[pokemon]) {
          selectedConditionalEffects[pokemon] = {};
        }
        selectedConditionalEffects[pokemon][skillKey] = effectName;
        
        // Recalcular para aplicar o debuff correto
        calcular();
      });
    });

    } else {
      skillsDiv.innerHTML = `<div class="stat-line"><span class="stat-label">Nenhuma skill disponível</span></div>`;
    }

    // Event listeners para skills ativáveis clicáveis
    const activatableSkills = skillsDiv.querySelectorAll(".skill-box.activatable");
    activatableSkills.forEach(box => {
      box.addEventListener("click", (e) => {
        if (e.target.closest('[data-no-toggle="true"]')) {
          return;
        } 
        const pokemon = box.dataset.pokemon;
        const skillKey = box.dataset.skillKey;
        
        if (!activeSkills[pokemon]) {
          activeSkills[pokemon] = {};
        }
        
        // ✅ NOVO: Comportamento especial para Clefable
        if (pokemon === "clefable" && skillKey.startsWith("ult")) {
          const currentlyActive = !!activeSkills[pokemon][skillKey];
          
          if (skillKey === "ult") {
            // Clicar na ult base: apenas toggle, não afeta as outras
            activeSkills[pokemon]["ult"] = !currentlyActive;
          } else {
            // Clicar em ult1-7: desativar outras ult1-7, manter ult base
            const ultNumbers = ["ult1", "ult2", "ult3", "ult4", "ult5", "ult6", "ult7"];
            
            if (!currentlyActive) {
              // Desativar todas as outras ultX (mas manter ult base)
              ultNumbers.forEach(ultKey => {
                if (ultKey !== skillKey) {
                  activeSkills[pokemon][ultKey] = false;
                }
              });
              // Ativar a clicada
              activeSkills[pokemon][skillKey] = true;
            } else {
              // Se clicar na mesma ativa, apenas desativa
              activeSkills[pokemon][skillKey] = false;
            }
          }
          
          // Atualizar classes visuais imediatamente
          activatableSkills.forEach(b => {
            const pk = b.dataset.skillKey;
            if (b.dataset.pokemon === pokemon && pk.startsWith("ult")) {
              const isActiveNow = !!activeSkills[pokemon][pk];
              b.classList.toggle("active", isActiveNow);
            }
          });
        }
        // Comportamento especial para Blaziken - ults mutuamente exclusivas
        else if (pokemon === "blaziken" && (skillKey === "ult" || skillKey === "ult1")) {
          const currentlyActive = !!activeSkills[pokemon][skillKey];
          
          if (!currentlyActive) {
            // Desativar a outra ult
            if (skillKey === "ult") {
              activeSkills[pokemon]["ult1"] = false;
            } else {
              activeSkills[pokemon]["ult"] = false;
            }
            // Ativar a ult clicada
            activeSkills[pokemon][skillKey] = true;
          } else {
            // Se clicar na mesma ult ativa, desativa
            activeSkills[pokemon][skillKey] = false;
          }
          
          // Atualizar classes visuais imediatamente
          activatableSkills.forEach(b => {
            const pk = b.dataset.skillKey;
            if (b.dataset.pokemon === pokemon && (pk === "ult" || pk === "ult1")) {
              const isActiveNow = !!activeSkills[pokemon][pk];
              b.classList.toggle("active", isActiveNow);
            }
          });
        } 
        // Comportamento padrÃ£o para outros pokÃ©mons
        else {
          // Se a skill está sendo ativada
          if (!activeSkills[pokemon][skillKey]) {
            // Desativar outras skills do mesmo slot primeiro
            deactivateOtherSkillsInSlot(pokemon, skillKey);
            // Ativar a skill atual
            activeSkills[pokemon][skillKey] = true;
          } else {
            // Se está sendo desativada, apenas desativar
            activeSkills[pokemon][skillKey] = false;
          }
        }
        
        calcular();
      });
    });

    // Event listeners para itens clicáveis (passivas dos itens)
    const battleItemContainer = statusFinalDiv.querySelector(".item-icon-container[data-battle-item]");
    if (battleItemContainer) {
      battleItemContainer.addEventListener("click", () => {
        isBattleItemActive = !isBattleItemActive;
        calcular();
      });
    }

    const heldItemContainers = statusFinalDiv.querySelectorAll(".item-icon-container[data-item]");
    heldItemContainers.forEach(container => {
      const itemKey = container.dataset.item;
      const passives = getItemPassivesSource();
      
      // Só adicionar listener se o item tiver passiva
      if (passives[itemKey] && Object.keys(passives[itemKey]).length > 0) {
        container.addEventListener("click", () => {
          // Toggle da passiva do item
          activeItemPassives[itemKey] = !activeItemPassives[itemKey];
          
          // Adicionar feedback visual imediato
          container.classList.toggle("item-active", activeItemPassives[itemKey]);
          
          // Recalcular stats
          calcular();
        });
      }
    });

    resultado.style.display = "flex";
    if (compartilharContainer) {
      compartilharContainer.style.display = "block";
    }
  };

  // EVENT LISTENERS PRINCIPAIS
  
  // Pokémon selector
  pokemonCircle.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePokemonPanel();
  });

  // Fechar painel quando clicar fora
  document.addEventListener("click", (e) => {
    if (!pokemonGridPanel.contains(e.target) && !pokemonCircle.contains(e.target)) {
      closePokemonPanel();
    }
  });

  // Level slider (mantido para compatibilidade, mas sincronizado)
  levelSelect.addEventListener("input", () => {
    currentLevel = parseInt(levelSelect.value, 10);
    levelValor.textContent = levelSelect.value;
    updateLevelDisplay();
    calcular();
  });

// Battle items - Sistema com desmarcação
let lastSelectedBattleItem = null;

battleRadios.forEach(r => {
  r.addEventListener("click", (e) => {
    const clickedValue = r.value;
    
    // Se clicar no item já selecionado, desmarcar
    if (activeBattleItem === clickedValue && lastSelectedBattleItem === clickedValue) {
      e.preventDefault();
      
      // Forçar desmarcação usando setTimeout para garantir execução
      setTimeout(() => {
        r.checked = false;
        activeBattleItem = null;
        isBattleItemActive = false;
        lastSelectedBattleItem = null;
        calcular();
      }, 0);
      
      return;
    }
    
    // Novo item selecionado
    activeBattleItem = clickedValue;
    isBattleItemActive = false; // Resetar estado ativo ao trocar
    lastSelectedBattleItem = clickedValue;
    calcular();
  });
});
  
  // Emblemas
  emblemasRadios.forEach(r => {
    r.addEventListener("change", () => {
      if (r.value === "sim") {
        emblemasContainer.style.display = "block";
        createEmblemsGrid(); // Criar o grid quando mostrar
      } else {
        emblemasContainer.style.display = "none";
        selectedEmblems = {}; // Limpar seleções quando ocultar
        updateEmblemDescription();
      }
      calcular();
    });
  });

  // Map Buffs
  const mapBuffsRadios = document.querySelectorAll("input[name='mapbuffs']");
  const mapBuffsContainer = document.getElementById("map-buffs-selector");

  mapBuffsRadios.forEach(r => {
    r.addEventListener("change", () => {
      if (r.value === "sim") {
        mapBuffsContainer.style.display = "block";
        createMapBuffsGrid();
      } else {
        mapBuffsContainer.style.display = "none";
        selectedMapBuffs = {};
        updateMapBuffDescription();
      }
      calcular();
    });
  });

  // INICIALIZAÇÃO
  createRoleFilters();
  createPokemonGrid();
  filterPokemonGrid(); // Aplicar filtro inicial
  createHeldItemsGrid();
  createMapBuffsGrid();
  calcular();
  
  // Botão de download como imagem
  const btnDownload = document.getElementById("btn-download");
  if (btnDownload) {
    btnDownload.addEventListener("click", () => {
      const resultado = document.getElementById("resultado");
      if (!resultado || resultado.style.display === "none") {
        alert("Nenhum resultado para capturar ainda!");
        return;
      }

      if (!selectedPokemon) {
        alert("Selecione um Pokémon primeiro!");
        return;
      }

      html2canvas(resultado, {
        useCORS: true,
        scale: 2 // melhora a qualidade
      }).then(canvas => {
        const link = document.createElement("a");
        const pokemonName = safeCap(selectedPokemon);
        link.download = `resultado-${pokemonName}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      }).catch(err => {
        console.error("Erro ao gerar imagem:", err);
        alert("Não foi possível gerar a imagem.");
      });
    });
  }
  // ===== SISTEMA DE TEMA (LIGHT/DARK MODE) =====
  const btnThemeToggle = document.getElementById("btn-theme-toggle");
  const themeIcon = btnThemeToggle?.querySelector(".theme-icon");
  const themeText = btnThemeToggle?.querySelector(".theme-text");
  
  // Carregar tema salvo do localStorage
  let currentTheme = localStorage.getItem("calculadora-theme") || "light";
  
  // Aplicar tema inicial
  const applyTheme = (theme) => {
    const resultadoContainer = document.getElementById("resultado");
    
    if (theme === "dark") {
      resultadoContainer.classList.add("dark-mode");
      if (themeIcon) themeIcon.textContent = "☀️";
      if (themeText) themeText.textContent = "Light Mode";
    } else {
      resultadoContainer.classList.remove("dark-mode");
      if (themeIcon) themeIcon.textContent = "🌙";
      if (themeText) themeText.textContent = "Dark Mode";
    }
    
    currentTheme = theme;
    localStorage.setItem("calculadora-theme", theme);
  };
  
  // Aplicar tema salvo
  applyTheme(currentTheme);
  
  // Event listener para alternar tema
  if (btnThemeToggle) {
    btnThemeToggle.addEventListener("click", () => {
      const newTheme = currentTheme === "light" ? "dark" : "light";
      applyTheme(newTheme);
    });
  }

  // ===== EVENT LISTENERS PARA SISTEMA DE BUILDS =====
// Adicione este código no final do DOMContentLoaded, antes do fechamento

// Elementos dos modais
const modalSaveBuild = document.getElementById("modal-save-build");
const modalLoadBuild = document.getElementById("modal-load-build");
const btnSaveBuild = document.getElementById("btn-save-build");
const btnLoadBuild = document.getElementById("btn-load-build");
const btnNewBuild = document.getElementById("btn-new-build");
const btnCloseSaveModal = document.getElementById("btn-close-save-modal");
const btnCloseLoadModal = document.getElementById("btn-close-load-modal");
const btnCancelSave = document.getElementById("btn-cancel-save");
const btnConfirmSave = document.getElementById("btn-confirm-save");
const buildNameInput = document.getElementById("build-name-input");
const buildsList = document.getElementById("builds-list");
const saveMessage = document.getElementById("save-build-message");

// Função auxiliar para mostrar mensagem
function showSaveMessage(message, type = "success") {
  saveMessage.textContent = message;
  saveMessage.className = `save-build-message ${type}`;
  saveMessage.style.display = "block";
  
  setTimeout(() => {
    saveMessage.style.display = "none";
  }, 3000);
}

// Botão: Salvar Build
if (btnSaveBuild) {
  btnSaveBuild.addEventListener("click", () => {
    if (!selectedPokemon) {
      alert("⚠️ Selecione um Pokémon primeiro!");
      return;
    }
    
    // Sugerir nome baseado no Pokémon e build atual
    const suggestedName = currentBuildId ? 
      buildNameInput.value : 
      `${safeCap(selectedPokemon)} Build`;
    
    buildNameInput.value = suggestedName;
    modalSaveBuild.style.display = "flex";
    buildNameInput.focus();
  });
}

// Botão: Confirmar Salvar
if (btnConfirmSave) {
  btnConfirmSave.addEventListener("click", async () => {
    const buildName = buildNameInput.value.trim();
    
    if (!buildName) {
      showSaveMessage("⚠️ Digite um nome para a build!", "error");
      return;
    }
    
    try {
      btnConfirmSave.disabled = true;
      btnConfirmSave.textContent = "Saving...";
      
      const buildId = await BuildManager.salvarBuild(buildName);
      
      showSaveMessage("✅ Build saved successfully!", "success");
      
      setTimeout(() => {
        modalSaveBuild.style.display = "none";
        btnConfirmSave.disabled = false;
        btnConfirmSave.textContent = "Save";
      }, 1500);
      
    } catch (error) {
      console.error("Erro ao salvar:", error);
      if (error.message.includes("Limite de 5 builds")) {
        showSaveMessage(error.message, "error");
        // Manter modal aberto para o usuário ler a mensagem
        setTimeout(() => {
          modalSaveBuild.style.display = "none";
        }, 4000); // 4 segundos para ler
      } else {
        showSaveMessage(`❌ Error saving: ${error.message}`, "error");
      }
      btnConfirmSave.disabled = false;
      btnConfirmSave.textContent = "Save";
    }
  });
}

if (btnLoadBuild) {
  btnLoadBuild.addEventListener("click", async () => {
    try {
      modalLoadBuild.style.display = "flex";
      buildsList.innerHTML = '<p style="color: #999; text-align: center;">Loading builds...</p>';
      
      const builds = await BuildManager.listarBuilds();
      
      if (builds.length === 0) {
        buildsList.innerHTML = '<p style="color: #888; text-align: center; font-style: italic;">No builds saved yet. Create your first build!</p>';
        return;
      }
      
      // Ordenar por data de modificação (mais recente primeiro)
      builds.sort((a, b) => {
        const dateA = a.updatedAt?.toDate() || new Date(0);
        const dateB = b.updatedAt?.toDate() || new Date(0);
        return dateB - dateA;
      });
      
      // Renderizar lista de builds
      buildsList.innerHTML = builds.map(build => {
        const date = build.updatedAt?.toDate() || new Date();
        const formattedDate = date.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
        
        // Definir caminho da imagem do Pokémon
        const pokemonImage = build.pokemon ? 
          `./estatisticas-shad/images/backgrounds/${build.pokemon}-left-bg.png` : 
          `./estatisticas-shad/images/backgrounds/placeholder.png`;
        
        return `
          <div class="build-card" data-build-id="${build.id}">
            <div class="build-info">
              <div class="build-name">${build.buildName}</div>
              <div class="build-pokemon" style="display: flex; align-items: center; gap: 8px;">
                <img src="${pokemonImage}" 
                     alt="${safeCap(build.pokemon)}" 
                     style="width: 32px; height: 32px; border-radius: 6px; object-fit: cover;"
                     onerror="this.src='./estatisticas-shad/images/backgrounds/placeholder.png'">
                <span>${safeCap(build.pokemon)}</span>
              </div>
              <div class="build-date">📅 ${formattedDate}</div>
            </div>
            <div class="build-actions">
              <button class="btn-build-card btn-load-card" data-action="load">
                📂 Load
              </button>
              <button class="btn-build-card btn-delete-card" data-action="delete">
                🗑️ Delete
              </button>
            </div>
          </div>
        `;
      }).join('');
      
      // Event listeners para cada build
      const buildCards = buildsList.querySelectorAll('.build-card');
      buildCards.forEach(card => {
        const buildId = card.dataset.buildId;
        
        // Botão Load
        const btnLoad = card.querySelector('[data-action="load"]');
        btnLoad.addEventListener('click', async (e) => {
          e.stopPropagation();
          
          try {
            btnLoad.disabled = true;
            btnLoad.textContent = "Loading...";
            
            await BuildManager.carregarBuild(buildId);
            
            modalLoadBuild.style.display = "none";
            
            // Feedback visual
            setTimeout(() => {
              alert("✅ Build loaded successfully!");
            }, 100);
            
          } catch (error) {
            console.error("Erro ao carregar:", error);
            alert(`❌ Error loading build: ${error.message}`);
          } finally {
            btnLoad.disabled = false;
            btnLoad.textContent = "📂 Load";
          }
        });
        
        // Botão Delete
        const btnDelete = card.querySelector('[data-action="delete"]');
        btnDelete.addEventListener('click', async (e) => {
          e.stopPropagation();
          
          const buildName = card.querySelector('.build-name').textContent;
          const confirmDelete = confirm(`Are you sure you want to delete the build "${buildName}"?`);
          
          if (!confirmDelete) return;
          
          try {
            await BuildManager.deletarBuild(buildId);
            
            // Remover card da lista
            card.remove();
            
            // Se não há mais builds, mostrar mensagem
            if (buildsList.children.length === 0) {
              buildsList.innerHTML = '<p style="color: #888; text-align: center; font-style: italic;">No builds saved yet.</p>';
            }
            
          } catch (error) {
            console.error("Erro ao deletar:", error);
            alert(`❌ Error deleting build: ${error.message}`);
          }
        });
      });
      
    } catch (error) {
      console.error("Erro ao listar builds:", error);
      buildsList.innerHTML = `<p style="color: #ff6b6b; text-align: center;">❌ Error loading builds: ${error.message}</p>`;
    }
  });
}

// Botão: Nova Build
if (btnNewBuild) {
  btnNewBuild.addEventListener("click", () => {
    const confirmNew = confirm("⚠️ Start a new build? Unsaved changes will be lost.");
    
    if (confirmNew) {
      // Resetar tudo
      window.BuildManager.setCurrentBuildId(null);
      selectedPokemon = "";
      resetSkillSelections();
      resetHeldItems();
      selectedEmblems = {};
      selectedMapBuffs = {};
      currentLevel = 1;
      updateLevelDisplay();
      
      // Limpar seleção visual de Pokémon
      pokemonGrid.querySelectorAll(".pokemon-grid-item").forEach(item => {
        item.classList.remove("selected");
      });
      
      // Resetar imagem
      selectedPokemonImage.style.display = "none";
      pokemonPlaceholder.style.display = "block";
      selectedPokemonName.textContent = "Selecione um Pokémon";
      
      // Ocultar resultado
      resultado.style.display = "none";
      
      alert("✅ New build started!");
    }
  });
}

// Fechar modais
if (btnCloseSaveModal) {
  btnCloseSaveModal.addEventListener("click", () => {
    modalSaveBuild.style.display = "none";
  });
}

if (btnCloseLoadModal) {
  btnCloseLoadModal.addEventListener("click", () => {
    modalLoadBuild.style.display = "none";
  });
}

if (btnCancelSave) {
  btnCancelSave.addEventListener("click", () => {
    modalSaveBuild.style.display = "none";
  });
}

// Fechar modal ao clicar fora
modalSaveBuild?.addEventListener("click", (e) => {
  if (e.target === modalSaveBuild) {
    modalSaveBuild.style.display = "none";
  }
});

modalLoadBuild?.addEventListener("click", (e) => {
  if (e.target === modalLoadBuild) {
    modalLoadBuild.style.display = "none";
  }
});

// Permitir salvar com Enter no input de nome
buildNameInput?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    btnConfirmSave.click();
  }
});
});