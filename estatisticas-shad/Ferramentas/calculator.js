// Elementos do DOM
const elements = {
    pokemonSelect: document.getElementById('pokemon'),
    customSelectContainer: document.getElementById('customPokemonSelect'),
    pokemonImageContainer: document.getElementById('pokemonImageContainer'),
    pasteData: document.getElementById('pasteData'),
    parseDataBtn: document.getElementById('parseDataBtn'),
    seasonBattles: document.getElementById('seasonBattles'),
    seasonWins: document.getElementById('seasonWins'),
    seasonLosses: document.getElementById('seasonLosses'),
    seasonMVP: document.getElementById('seasonMVP'),
    totalBattles: document.getElementById('totalBattles'),
    totalWins: document.getElementById('totalWins'),
    totalLosses: document.getElementById('totalLosses'),
    totalMVP: document.getElementById('totalMVP'),
    calculateBtn: document.getElementById('calculateBtn'),
    copyDataBtn: document.getElementById('copyDataBtn'),
    resultsContainer: document.getElementById('resultsContainer'),
    resultsContent: document.getElementById('resultsContent')
};

// Constantes para caminhos das imagens
const POKEMON_IMAGE_PATH = './images/backgrounds/';
const POKEMON_IMAGE_SUFFIX = '-left-bg.png';

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Usando pokemonBaseImages do util.js como referência
    const pokemonList = Object.keys(pokemonBaseImages).sort((a, b) => a.localeCompare(b));
    createCustomPokemonSelect(pokemonList);
    setupEventListeners();
});

// Criar select customizado com imagens
function createCustomPokemonSelect(pokemonList) {
    // Criar elementos do select customizado
    const customSelect = document.createElement('div');
    customSelect.className = 'relative w-full';
    
    // Botão principal
    const selectButton = document.createElement('button');
    selectButton.className = 'w-full p-2 border border-gray-300 rounded-md text-left flex items-center justify-between bg-white';
    selectButton.innerHTML = `
        <div class="flex items-center">
            <span class="text-gray-400">Select a Pokémon</span>
        </div>
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
    `;
    
    // Lista de opções
    const optionsList = document.createElement('div');
    optionsList.className = 'absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg hidden max-h-60 overflow-y-auto';
    
    // Adicionar opções
    pokemonList.forEach(pokemon => {
        const option = document.createElement('button');
        option.className = 'w-full text-left p-2 hover:bg-gray-100 flex items-center';
        option.innerHTML = `
            <img src="${POKEMON_IMAGE_PATH}${pokemon}${POKEMON_IMAGE_SUFFIX}" 
                 alt="${pokemon}" 
                 class="w-6 h-6 mr-2 object-contain"
                 onerror="this.onerror=null;this.style.display='none'">
            <span>${formatPokemonName(pokemon)}</span>
        `;
        
        option.addEventListener('click', () => {
            selectButton.innerHTML = `
                <div class="flex items-center">
                    <img src="${POKEMON_IMAGE_PATH}${pokemon}${POKEMON_IMAGE_SUFFIX}" 
                         alt="${pokemon}" 
                         class="w-6 h-6 mr-2 object-contain"
                         onerror="this.onerror=null;this.style.display='none'">
                    <span>${formatPokemonName(pokemon)}</span>
                </div>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            `;
            elements.pokemonSelect.value = pokemon;
            optionsList.classList.add('hidden');
            updatePokemonImage();
        });
        
        optionsList.appendChild(option);
    });

    // Mostrar/ocultar a lista de opções
    selectButton.addEventListener('click', (e) => {
        e.stopPropagation();
        optionsList.classList.toggle('hidden');
    });

    // Fechar ao clicar fora
    document.addEventListener('click', () => {
        optionsList.classList.add('hidden');
    });

    // Adicionar elementos ao DOM
    customSelect.appendChild(selectButton);
    customSelect.appendChild(optionsList);
    elements.customSelectContainer.appendChild(customSelect);
}

// Configurar event listeners
function setupEventListeners() {
    elements.parseDataBtn.addEventListener('click', parsePastedData);
    elements.calculateBtn.addEventListener('click', calculateStats);
    elements.copyDataBtn.addEventListener('click', copyData);
}

// Atualizar imagem do Pokémon
function updatePokemonImage() {
    if (elements.pokemonSelect.value) {
        const pokemonName = elements.pokemonSelect.value;
        elements.pokemonImageContainer.innerHTML = `
            <img src="${POKEMON_IMAGE_PATH}${pokemonName}${POKEMON_IMAGE_SUFFIX}" 
                 alt="${pokemonName}" 
                 class="max-w-[200px] max-h-[200px] rounded-lg object-contain"
                 onerror="this.onerror=null;this.style.display='none'">`;
    } else {
        elements.pokemonImageContainer.innerHTML = '';
    }
}

// Processar dados colados - AGORA SUPORTA AMBOS OS FORMATOS (INGLÊS E PORTUGUÊS)
function parsePastedData() {
    const pasteText = elements.pasteData.value.trim();
    if (!pasteText) {
        alert("Por favor, cole os dados primeiro!");
        return;
    }

    const lines = pasteText.split('\n')
        .map(line => line.trim())
        .filter(line => line !== '');

    // Verificar se temos pares de chave-valor
    if (lines.length % 2 !== 0) {
        alert("Formato inválido! Certifique-se de que cada valor tem uma descrição.");
        return;
    }

    const dataMap = {};
    for (let i = 0; i < lines.length; i += 2) {
        const key = lines[i].toLowerCase().trim();
        const value = lines[i+1].trim();
        dataMap[key] = value;
    }

    // Mapeamento dos campos para AMBOS OS FORMATOS
    const fieldMappings = [
        // Formato em Português
        {
            'batalhas da temporada': 'seasonBattles',
            'vitórias da temporada': 'seasonWins',
            'derrotas da temporada': 'seasonLosses',
            'mvp da temporada': 'seasonMVP',
            'batalhas totais': 'totalBattles',
            'no. de vitórias': 'totalWins',
            'derrotas totais': 'totalLosses',
            'mvp total': 'totalMVP'
        },
        // Formato em Inglês
        {
            'season battles': 'seasonBattles',
            'season wins': 'seasonWins',
            'season loses': 'seasonLosses',
            'season mvp': 'seasonMVP',
            'total battles': 'totalBattles',
            'no. of wins': 'totalWins',
            'total loses': 'totalLosses',
            'total mvp': 'totalMVP'
        }
    ];

    // Tentar cada mapeamento até encontrar um que funcione
    let filledFields = 0;
    for (const fieldMapping of fieldMappings) {
        filledFields = 0;
        for (const [key, fieldId] of Object.entries(fieldMapping)) {
            if (dataMap[key] !== undefined) {
                const field = document.getElementById(fieldId);
                if (field) {
                    field.value = dataMap[key];
                    filledFields++;
                }
            }
        }
        if (filledFields > 0) break; // Se encontrou correspondências, para aqui
    }

    // Feedback visual
    if (filledFields > 0) {
        elements.parseDataBtn.textContent = "Dados preenchidos!";
        elements.parseDataBtn.classList.remove('bg-blue-600');
        elements.parseDataBtn.classList.add('bg-green-600');
        setTimeout(() => {
            elements.parseDataBtn.textContent = "Preencher Automaticamente";
            elements.parseDataBtn.classList.remove('bg-green-600');
            elements.parseDataBtn.classList.add('bg-blue-600');
        }, 2000);
    } else {
        alert("Formato não reconhecido! Certifique-se de copiar os dados no formato do jogo.");
    }
}

// Calcular estatísticas
function calculateStats() {
    // Obter valores dos campos
    const seasonBattles = parseInt(elements.seasonBattles.value) || 0;
    const seasonWins = parseInt(elements.seasonWins.value) || 0;
    const seasonLosses = parseInt(elements.seasonLosses.value) || 0;
    const seasonMVP = parseInt(elements.seasonMVP.value) || 0;
    
    const totalBattles = parseInt(elements.totalBattles.value) || 0;
    const totalWins = parseInt(elements.totalWins.value) || 0;
    const totalLosses = parseInt(elements.totalLosses.value) || 0;
    const totalMVP = parseInt(elements.totalMVP.value) || 0;
    
    // Calcular estatísticas da temporada
    const seasonWinRate = seasonBattles > 0 ? (seasonWins / seasonBattles * 100).toFixed(2) : 0;
    const seasonMVPRate = seasonBattles > 0 ? (seasonMVP / seasonBattles * 100).toFixed(2) : 0;
    const seasonMVPWinRate = seasonWins > 0 ? (seasonMVP / seasonWins * 100).toFixed(2) : 0;
    
    // Calcular estatísticas totais
    const totalWinRate = totalBattles > 0 ? (totalWins / totalBattles * 100).toFixed(2) : 0;
    const totalMVPRate = totalBattles > 0 ? (totalMVP / totalBattles * 100).toFixed(2) : 0;
    const totalMVPWinRate = totalWins > 0 ? (totalMVP / totalWins * 100).toFixed(2) : 0;
    
    // Exibir resultados
    elements.resultsContent.innerHTML = `
        <h3 class="text-lg font-semibold text-blue-800 mt-4">Season Stats</h3>
        <div class="flex justify-between">
            <span>Win Rate:</span>
            <strong>${seasonWinRate}%</strong>
        </div>
        <div class="flex justify-between">
            <span>MVP Rate (total):</span>
            <strong>${seasonMVPRate}%</strong>
        </div>
        <div class="flex justify-between">
            <span>MVP Rate (wins):</span>
            <strong>${seasonMVPWinRate}%</strong>
        </div>
        
        <h3 class="text-lg font-semibold text-blue-800 mt-4">Total Stats</h3>
        <div class="flex justify-between">
            <span>Win Rate:</span>
            <strong>${totalWinRate}%</strong>
        </div>
        <div class="flex justify-between">
            <span>MVP Rate (total):</span>
            <strong>${totalMVPRate}%</strong>
        </div>
        <div class="flex justify-between">
            <span>MVP Rate (wins):</span>
            <strong>${totalMVPWinRate}%</strong>
        </div>
    `;
    
    elements.resultsContainer.classList.remove('hidden');
}

// Copiar dados formatados
function copyData() {
    const pokemon = elements.pokemonSelect.value || 'None selected';
    const seasonBattles = elements.seasonBattles.value || '0';
    const seasonWins = elements.seasonWins.value || '0';
    const seasonLosses = elements.seasonLosses.value || '0';
    const seasonMVP = elements.seasonMVP.value || '0';
    
    const totalBattles = elements.totalBattles.value || '0';
    const totalWins = elements.totalWins.value || '0';
    const totalLosses = elements.totalLosses.value || '0';
    const totalMVP = elements.totalMVP.value || '0';
    
    // Calcular as estatísticas para incluir na cópia
    const seasonWinRate = seasonBattles > 0 ? (seasonWins / seasonBattles * 100).toFixed(2) : 0;
    const seasonMVPRate = seasonBattles > 0 ? (seasonMVP / seasonBattles * 100).toFixed(2) : 0;
    const seasonMVPWinRate = seasonWins > 0 ? (seasonMVP / seasonWins * 100).toFixed(2) : 0;
    
    const totalWinRate = totalBattles > 0 ? (totalWins / totalBattles * 100).toFixed(2) : 0;
    const totalMVPRate = totalBattles > 0 ? (totalMVP / totalBattles * 100).toFixed(2) : 0;
    const totalMVPWinRate = totalWins > 0 ? (totalMVP / totalWins * 100).toFixed(2) : 0;
    
    const dataToCopy = `Pokémon: ${formatPokemonName(pokemon)}\n\n` +
                       `Season Battles: ${seasonBattles}\n` +
                       `Season Wins: ${seasonWins}\n` +
                       `Season Loses: ${seasonLosses}\n` +
                       `Season MVP: ${seasonMVP}\n\n` +
                       `Total Battles: ${totalBattles}\n` +
                       `No. Of Wins: ${totalWins}\n` +
                       `Total Loses: ${totalLosses}\n` +
                       `Total MVP: ${totalMVP}\n\n` +
                       `=== Calculated Stats ===\n` +
                       `Season Win Rate: ${seasonWinRate}%\n` +
                       `Season MVP Rate (total): ${seasonMVPRate}%\n` +
                       `Season MVP Rate (wins): ${seasonMVPWinRate}%\n` +
                       `Total Win Rate: ${totalWinRate}%\n` +
                       `Total MVP Rate (total): ${totalMVPRate}%\n` +
                       `Total MVP Rate (wins): ${totalMVPWinRate}%`;
    
    navigator.clipboard.writeText(dataToCopy).then(() => {
        alert('Data copied to clipboard!');
    }).catch(err => {
        console.error('Error copying data: ', err);
        // Fallback para navegadores mais antigos
        const textarea = document.createElement('textarea');
        textarea.value = dataToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Data copied to clipboard!');
    });
}

// Formatar nome do Pokémon (remove hífens e capitaliza)
function formatPokemonName(name) {
    return name.split('-').map(part => 
        part.charAt(0).toUpperCase() + part.slice(1)
    ).join(' ');
}