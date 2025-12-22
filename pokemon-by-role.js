// ============================================
// MOST SUCCESSFUL POKÉMONS BY ROLE
// Importa pokemonRoles do util.js (fonte única de verdade)
// ============================================

// Importar pokemonRoles do util.js
import { pokemonRoles } from './util.js';

// Mapeamento de nomes do JSON para nomes de arquivos de imagem
const pokemonImageMapping = {
  // === MEGAS ===
  'Mega Charizard X': 'megacharizardx',
  'Mega Charizard Y': 'megacharizardy',
  'Mega Gyarados': 'megagyarados',
  'Mega Lucario': 'megalucario',
  
  // === FORMAS ALTERNATIVAS ===
  'Mewtwo X': 'mewtwox',
  'Mewtwo Y': 'mewtwoy',
  
  // === VARIAÇÕES REGIONAIS ===
  'Alolan Ninetales': 'ninetales',
  'Alolan Raichu': 'raichu',
  'Galarian Rapidash': 'rapidash',
  
  // === NOMES ESPECIAIS ===
  'Mr. Mime': 'mrmime',
  'Ho-Oh': 'hooh',
  'Meowscarada': 'meowscara',
};

// Ícones das roles
const roleIcons = {
  'Attacker': './img-site/roles/attacker.png',
  'All Rounder': './img-site/roles/all-rounder.png',
  'Defender': './img-site/roles/defender.png',
  'Speedster': './img-site/roles/speedster.png',
  'Support': './img-site/roles/supporter.png'
};

// Variável para armazenar os dados do meta
let metaData = null;
let currentStat = 'winRate';

// 🔥 CACHE: Armazena os dados processados de cada estatística
let processedDataCache = {
  winRate: null,
  pickRate: null,
  banRate: null
};

let isDataLoaded = false;

// ✅ FUNÇÃO CORRIGIDA: Normaliza o nome mantendo "mega" para corresponder ao util.js
function normalizeForRole(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '')      // Remove todos os espaços
    .replace('alolan', '')    // Remove prefixos regionais
    .replace('galarian', ''); // ✅ NÃO remove 'mega' - mantém para corresponder ao util.js
}

// Função para normalizar nome do pokémon para imagem
function normalizeForImage(name) {
  // Verificar se existe mapeamento customizado
  if (pokemonImageMapping[name]) {
    return pokemonImageMapping[name];
  }
  
  // Normalização padrão
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace('alolan-', '')
    .replace('galarian-', '')
    .replace('mega-', '')
    .replace('mr.-', 'mr');
}

// Carregar dados do meta
async function loadMetaData() {
  try {
    console.log('🔍 Buscando arquivo meta22-12-2025.json...');
    const response = await fetch('./meta22-12-2025.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    metaData = await response.json();
    console.log('✅ Dados do meta carregados:', metaData);
    console.log('📊 Total de pokémons por estatística:');
    console.log('  - Win Rate:', metaData.taxaVitoria?.length || 0);
    console.log('  - Pick Rate:', metaData.taxaSelecao?.length || 0);
    console.log('  - Ban Rate:', metaData.taxaBanimento?.length || 0);
    
    return metaData;
  } catch (error) {
    console.error('❌ Erro ao carregar dados do meta:', error);
    return null;
  }
}

// Função para obter o caminho correto da imagem
function getPokemonImagePath(pokemonName) {
  const normalized = normalizeForImage(pokemonName);
  const path = `./estatisticas-shad/images/backgrounds/${normalized}-left-bg.png`;
  
  // Log para debug
  if (pokemonName !== normalized) {
    console.log(`🖼️ Imagem: "${pokemonName}" → "${normalized}-left-bg.png"`);
  }
  
  return path;
}

// Função para processar dados por role
function processPokemonByRole(stat = 'winRate') {
  if (!metaData) {
    console.error('❌ Dados do meta não carregados');
    return {};
  }

  // 🔥 VERIFICAR CACHE: Se já processou essa estatística, retornar do cache
  if (processedDataCache[stat]) {
    console.log(`⚡ Usando dados do cache para: ${stat}`);
    return processedDataCache[stat];
  }

  console.log('🔍 Processando dados para:', stat);
  console.log('📦 pokemonRoles importado:', Object.keys(pokemonRoles).length, 'pokémons');

  // Mapear o tipo de estatística para o campo correto no JSON
  const statMapping = {
    'winRate': 'taxaVitoria',
    'pickRate': 'taxaSelecao',
    'banRate': 'taxaBanimento'
  };

  const statField = statMapping[stat];
  const statData = metaData[statField];

  if (!statData) {
    console.error('❌ Campo de estatística não encontrado:', statField);
    return {};
  }

  // Organizar por role
  const roleData = {
    'Attacker': [],
    'All Rounder': [],
    'Defender': [],
    'Speedster': [],
    'Support': []
  };

  let foundCount = 0;
  let notFoundCount = 0;

  statData.forEach(item => {
    const normalized = normalizeForRole(item.nome);
    const role = pokemonRoles[normalized];

    if (role && roleData[role]) {
      roleData[role].push({
        name: item.nome,
        normalizedName: normalized,
        rate: item.taxa,
        globalRank: item.ranking
      });
      foundCount++;
    } else {
      console.warn(`⚠️ Role não encontrada para: ${item.nome} (normalizado: ${normalized})`);
      notFoundCount++;
    }
  });

  console.log(`✅ Pokémons encontrados: ${foundCount}`);
  console.log(`⚠️ Pokémons não encontrados: ${notFoundCount}`);

  // Pegar top 10 de cada role e adicionar ranking por role
  Object.keys(roleData).forEach(role => {
    const originalCount = roleData[role].length;
    roleData[role] = roleData[role]
      .sort((a, b) => b.rate - a.rate)
      .slice(0, 10)
      .map((pokemon, index) => ({
        ...pokemon,
        roleRank: index + 1
      }));
    
    console.log(`  ${role}: ${originalCount} total → Top 10 selecionados`);
  });

  // 🔥 ARMAZENAR NO CACHE
  processedDataCache[stat] = roleData;
  console.log(`💾 Dados armazenados no cache para: ${stat}`);

  return roleData;
}

// Função para criar card de role
function createRoleCard(role, pokemonList, stat) {
  if (!pokemonList || pokemonList.length === 0) {
    console.warn(`⚠️ Nenhum pokémon encontrado para role: ${role}`);
    return '';
  }

  const roleIcon = roleIcons[role] || './img-site/roles/default.png';

  const pokemonHTML = pokemonList.map(pokemon => {
    const isHigh = pokemon.rate >= 50;
    const rateClass = isHigh ? 'rate-high' : 'rate-low';
    const imagePath = getPokemonImagePath(pokemon.name);

    return `
      <div class="pokemon-item">
        <span class="pokemon-rank">#${pokemon.roleRank}</span>
        <img 
          src="${imagePath}" 
          alt="${pokemon.name}" 
          class="pokemon-avatar"
          onerror="this.src='./estatisticas-shad/images/backgrounds/placeholder.png'"
        >
        <div class="pokemon-info">
          <span class="pokemon-name">${pokemon.name}</span>
        </div>
        <span class="pokemon-rate ${rateClass}">${pokemon.rate.toFixed(1)}%</span>
      </div>
    `;
  }).join('');

  return `
    <div class="role-card">
      <div class="role-header">
        <img src="${roleIcon}" alt="${role}" class="role-icon" onerror="this.style.display='none'">
        <span class="role-name">${role}</span>
      </div>
      <div class="pokemon-list">
        ${pokemonHTML}
      </div>
    </div>
  `;
}

// Função para renderizar todos os cards
function renderPokemonByRole(stat = 'winRate') {
  const container = document.getElementById('pokemonRolesContainer');
  
  if (!container) {
    console.error('❌ Container pokemonRolesContainer não encontrado');
    return;
  }

  if (!metaData) {
    console.warn('⚠️ Meta data ainda não carregado');
    container.innerHTML = '<div class="pokemon-loading">Loading data...</div>';
    return;
  }

  // 🔥 RENDERIZAÇÃO INSTANTÂNEA: Sem setTimeout, sem loading
  console.log('🎨 Renderizando cards para:', stat);
  const roleData = processPokemonByRole(stat);

  const rolesOrder = ['Attacker', 'All Rounder', 'Defender', 'Speedster', 'Support'];
  
  const cardsHTML = rolesOrder
    .map(role => createRoleCard(role, roleData[role], stat))
    .filter(html => html !== '')
    .join('');

  if (cardsHTML === '') {
    container.innerHTML = '<div class="pokemon-loading">No data available</div>';
    return;
  }

  container.innerHTML = cardsHTML;
  console.log('✅ Cards renderizados instantaneamente!');
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', async () => {
  console.log('🚀 Inicializando Most Successful Pokémons by Role...');
  console.log('📁 pokemonRoles importado do util.js:', Object.keys(pokemonRoles).length, 'pokémons');

  // Carregar dados do meta
  const loaded = await loadMetaData();
  
  if (!loaded) {
    console.error('❌ Falha ao carregar dados do meta');
    const container = document.getElementById('pokemonRolesContainer');
    if (container) {
      container.innerHTML = '<div class="pokemon-loading" style="color: #f87171;">Error loading meta data. Please check console.</div>';
    }
    return;
  }

  // 🔥 PRÉ-PROCESSAR TODAS AS ESTATÍSTICAS DE UMA VEZ
  console.log('⚡ Pré-processando todas as estatísticas...');
  
  const container = document.getElementById('pokemonRolesContainer');
  if (container) {
    container.innerHTML = '<div class="pokemon-loading">Loading all data...</div>';
  }
  
  // Processar todas as estatísticas em paralelo
  processPokemonByRole('winRate');
  processPokemonByRole('pickRate');
  processPokemonByRole('banRate');
  
  console.log('✅ Todas as estatísticas pré-processadas e em cache!');
  isDataLoaded = true;

  // Renderizar dados iniciais (Win Rate)
  renderPokemonByRole('winRate');

  // Sistema de abas
  const tabs = document.querySelectorAll('.pokemon-stats-tab');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remover active de todas as abas
      tabs.forEach(t => t.classList.remove('active'));
      
      // Adicionar active na aba clicada
      tab.classList.add('active');
      
      // Obter o tipo de estatística
      const stat = tab.dataset.stat;
      currentStat = stat;
      
      // 🔥 RENDERIZAÇÃO INSTANTÂNEA (dados já estão no cache)
      renderPokemonByRole(stat);
      
      console.log(`📊 Estatística alterada para: ${stat} (instantâneo)`);
    });
  });
  
  console.log('✅ Sistema de abas inicializado - Troca instantânea ativada!');
});