// Variáveis globais para armazenar dados
let gameData = null;
if (!localStorage.getItem('pokemonFilterAttribute')) {
    localStorage.setItem('pokemonFilterAttribute', 'pickRate');
}
if (!localStorage.getItem('pokemonFilterOrder')) {
    localStorage.setItem('pokemonFilterOrder', 'desc');
}

let pokemonFilterAttribute = localStorage.getItem('pokemonFilterAttribute');
let pokemonFilterOrder = localStorage.getItem('pokemonFilterOrder');
let selectedPlayerName = null;

// Mostrar notificação
function showNotification(message, isError = false) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.backgroundColor = isError ? '#e74c3c' : '#2ecc71';
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Carregar dados do arquivo results.json
async function loadDataFromFile() {
    try {
        const response = await fetch('./results.json'); // ✅ corrigido
        if (!response.ok) {
            throw new Error('Não foi possível carregar o arquivo results.json');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao carregar dados do arquivo:', error);
        showNotification('Erro ao carregar arquivo padrão. Faça upload de um arquivo.', true);
        return null;
    }
}

// Manipulação do modal de upload
const modal = document.getElementById('upload-modal');
const closeBtn = document.querySelector('.close');
const uploadButtonTrigger = document.getElementById('upload-button-trigger');
const fileUpload = document.getElementById('file-upload');
const fileName = document.getElementById('file-name');
const uploadButton = document.getElementById('upload-button');
const dropArea = document.getElementById('drop-area');

// Abrir modal
uploadButtonTrigger.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Fechar modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fechar modal clicando fora dele
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Manipulação de arquivos
fileUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        fileName.textContent = `Arquivo selecionado: ${file.name}`;
        uploadButton.disabled = false;
    }
});

// Upload de arquivo
uploadButton.addEventListener('click', () => {
    const file = fileUpload.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const jsonData = JSON.parse(event.target.result);
            gameData = jsonData;
            showNotification('Arquivo carregado com sucesso!');
            modal.style.display = 'none';
            initializePageWithData(jsonData);
        } catch (error) {
            console.error('Erro ao analisar JSON:', error);
            showNotification('Erro: Arquivo JSON inválido.', true);
        }
    };
    reader.readAsText(file);
});

// Arrastar e soltar arquivos
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

function highlight() {
    dropArea.style.backgroundColor = '#f8f9fa';
    dropArea.style.borderColor = '#2980b9';
}

function unhighlight() {
    dropArea.style.backgroundColor = '';
    dropArea.style.borderColor = '#3498db';
}

dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length) {
        fileUpload.files = files;
        fileName.textContent = `Arquivo selecionado: ${files[0].name}`;
        uploadButton.disabled = false;
    }
}

// Inicializar a página com dados
function initializePageWithData(data) {
    gameData = data;
    populateSections(data);
    setupEventListeners();
    updatePlayersList(data);
    setupSectionRedirects();
}

// Preencher seções da página
function populateSections(data) {
    const sections = {
        "filters-section": "Filtros",
        "player-profile-section": "Perfil", 
        "ban-section": "Banimentos",
        "ally-section": "Aliados",
        "enemy-section": "Inimigos",
        "rayquaza-section": "Rayquaza",
        "scrims-section": "Scrims"
    };

    Object.keys(sections).forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.innerHTML = `<span class="text-xl text-black font-serif cursor-pointer transition-colors duration-200 ease-in-out group-hover:text-white">${sections[sectionId]}</span>`;
        }
    });

    // Adicionar controles apenas se não existirem
    let controlsContainer = document.getElementById('controls-container');
    if (!controlsContainer.querySelector('#filter-select')) {
        controlsContainer.innerHTML = `
            <select id="filter-select" class="border rounded-lg px-4 py-2 text-gray-700 text-lg hover:scale-105 transition-transform duration-200 ease-in-out inline-block w-full max-w-xs">
                <option value="pickRate,desc">PickRate - Decrescente</option>
                <option value="pickRate,asc">PickRate - Crescente</option>
                <option value="winRate,desc">WinRate - Decrescente</option>
                <option value="winRate,asc">WinRate - Crescente</option>
            </select>
            <div class="flex flex-col md:flex-row items-center gap-2 w-full max-w-xs">
                <select id="player-select" class="border rounded-lg px-4 py-2 text-gray-700 text-lg hover:scale-105 transition-transform duration-200 ease-in-out inline-block w-full">
                    <!-- Opções preenchidas por JavaScript -->
                </select>
                <div class="flex items-center gap-1 bg-white rounded-lg px-3 py-2 mt-2 md:mt-0">
                    <input type="checkbox" id="sortAlphabetical" class="w-4 h-4 cursor-pointer">
                    <label for="sortAlphabetical" class="text-black text-sm cursor-pointer">Ordem Alfabética</label>
                </div>
            </div>
        `;
    }
}

function setupSectionRedirects() {
    const redirects = {
        "player-profile-section": () => {
            const encodedName = encodeURIComponent(selectedPlayerName || '');
            window.location.href = `show-result.html?id=${encodedName}`;
        },
        "ban-section": () => {
            window.location.href = "bans-result.html";
        },
        "ally-section": () => {
            window.location.href = "show-result.html?id=allyTeam";
        },
        "enemy-section": () => {
            window.location.href = "playerRanking-result.html";
        },
        "rayquaza-section": () => {
            window.location.href = "rayquaza-result.html";
        },
        "scrims-section": () => {
            window.location.href = "scrims-result.html";
        }
    };

    Object.keys(redirects).forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.cursor = "pointer"; // garante o cursor clicável
            section.addEventListener("click", redirects[sectionId]);
        }
    });
}

// Atualizar lista de jogadores
function updatePlayersList(data) {
    const playerSelect = document.getElementById('player-select');
    if (!playerSelect) {
        console.error('Elemento player-select não encontrado');
        return;
    }
    
    if (!data || !data.allyTeam) {
        console.error('Dados ou allyTeam não encontrados', data);
        
        // Limpar e desabilitar o select se não houver dados
        playerSelect.innerHTML = '';
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'Nenhum jogador disponível';
        option.disabled = true;
        option.selected = true;
        playerSelect.appendChild(option);
        playerSelect.disabled = true;
        return;
    }

    const { allyTeam } = data;
    const excludeKeys = ['overall', 'wins', 'losses'];
    let filteredKeys = Object.keys(allyTeam).filter(key => !excludeKeys.includes(key));

    // Limpar opções existentes
    playerSelect.innerHTML = '';
    playerSelect.disabled = false;

    // Adicionar uma opção padrão
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Selecione um jogador';
    defaultOption.disabled = true;
    playerSelect.appendChild(defaultOption);

    const updatePlayerOptions = (sortAlphabetical) => {
        // Manter a opção padrão
        const defaultOpt = playerSelect.firstChild;
        playerSelect.innerHTML = '';
        playerSelect.appendChild(defaultOpt);
        
        const optionsToShow = sortAlphabetical 
            ? [...filteredKeys].sort((a, b) => a.localeCompare(b))
            : filteredKeys;

        optionsToShow.forEach((filterOption, i) => {
            const option = document.createElement("option");
            option.value = filterOption;
            option.textContent = filterOption;
            if (i === 0 && !selectedPlayerName) {
                option.selected = true;
                selectedPlayerName = filterOption;
            } else if (filterOption === selectedPlayerName) {
                option.selected = true;
            }
            playerSelect.appendChild(option);
        });
    };

    // Inicializar com a primeira opção
    updatePlayerOptions(false);

    // Configurar checkbox de ordenação alfabética
    const sortCheckbox = document.getElementById('sortAlphabetical');
    if (sortCheckbox) {
        sortCheckbox.addEventListener("change", (e) => {
            updatePlayerOptions(e.target.checked);
        });
    }
}


// Configurar event listeners
function setupEventListeners() {
    // Filter select
    const filterSelect = document.getElementById('filter-select');
    if (filterSelect) {
        // Definir valor atual
        filterSelect.value = `${pokemonFilterAttribute},${pokemonFilterOrder}`;
        
        filterSelect.addEventListener('change', (e) => {
            const value = e.target.value;
            const [attribute, order] = value.split(',');
            
            // Atualizar localStorage
            localStorage.setItem('pokemonFilterAttribute', attribute);
            localStorage.setItem('pokemonFilterOrder', order);
            
            // Atualizar variáveis
            pokemonFilterAttribute = attribute;
            pokemonFilterOrder = order;
            console.log('Filtro alterado:', attribute, order);
        });
    }

    // Player select
    const playerSelect = document.getElementById('player-select');
    if (playerSelect) {
        playerSelect.addEventListener('change', (e) => {
            selectedPlayerName = e.target.value;
            console.log('Jogador selecionado:', selectedPlayerName);
        });
    }

    // Sort checkbox
    const sortCheckbox = document.getElementById('sortAlphabetical');
    if (sortCheckbox) {
        sortCheckbox.addEventListener('change', (e) => {
            console.log('Ordenação alfabética:', e.target.checked);
            // Recriar a lista de jogadores com a nova ordenação
            if (gameData) {
                updatePlayersList(gameData);
            }
        });
    }

    // Configurar hover effects para as seções
    setupHoverEffects();
}

// Configurar efeitos de hover
function setupHoverEffects() {
    const sectionImages = {
        "upload-button-trigger": "./images/indexPokemons/gyarados-pb.png",
        "filters-section": "./images/indexPokemons/mimikyu-pb.png",
        "player-profile-section": "./images/indexPokemons/blaziken-pb.png",
        "ban-section": "./images/indexPokemons/blastoise-pb.png",
        "ally-section": "./images/indexPokemons/mamoswine-pb.png",
        "enemy-section": "./images/indexPokemons/clefable-pb.png",
        "rayquaza-section": "./images/indexPokemons/darkrai-pb.png",
        "scrims-section": "./images/indexPokemons/glaceon-pb.png"
    };

    const sectionTexts = {
        "upload-button-trigger": "Carregue um arquivo JSON para iniciar a análise.",
        "filters-section": "Aplique os filtros desejáveis para personalizar os dados.",
        "player-profile-section": "Selecione o jogador acima e veja o perfil do jogador.",
        "ban-section": "Ranking de banimentos das partidas.",
        "ally-section": "Ranking do picks e winrates do time aliado.",
        "enemy-section": "Ranking dos recordes dos atributos de cada jogador.",
        "rayquaza-section": "Ranking dos smites do Rayquaza.",
        "scrims-section": "Acesse os resultados detalhados das scrims realizadas."
    };

    const mainBox = document.getElementById("imageBox");

    Object.keys(sectionImages).forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.addEventListener("mouseover", () => {
                // Criar ou reutilizar a imagem
                let image = mainBox.querySelector(".pokemon-img");
                if (!image) {
                    image = document.createElement("img");
                    image.classList.add("pokemon-img", "transition-all", "duration-500", "ease-in-out", "opacity-0");
                    mainBox.appendChild(image);
                }
                
                image.src = sectionImages[sectionId];
                image.style.opacity = "1";
                image.style.transform = "scale(1)";

                // Criar ou reutilizar o texto
                let textSection = mainBox.querySelector(".description-text");
                if (!textSection) {
                    textSection = document.createElement("p");
                    textSection.classList.add("description-text", "text-white", "transition-all", "duration-500", "ease-in-out", "opacity-0");
                    mainBox.appendChild(textSection);
                }
                
                textSection.textContent = sectionTexts[sectionId];
                textSection.style.opacity = "1";
            });

            section.addEventListener("mouseout", () => {
                const image = mainBox.querySelector(".pokemon-img");
                if (image) {
                    image.style.opacity = "0";
                    image.style.transform = "scale(0.9)";
                }

                const textSection = mainBox.querySelector(".description-text");
                if (textSection) {
                    textSection.style.opacity = "0";
                }
            });
        }
    });
}

// Inicializar sem dados
function initializePageWithoutData() {
    populateSections();
    setupEventListeners();
    setupSectionRedirects();
    
    // Não adicionar opções de jogadores se não houver dados
    const playerSelect = document.getElementById('player-select');
    if (playerSelect) {
        const placeholderOption = document.createElement('option');
        placeholderOption.value = '';
        placeholderOption.textContent = 'Nenhum dado disponível';
        placeholderOption.disabled = true;
        placeholderOption.selected = true;
        playerSelect.appendChild(placeholderOption);
        playerSelect.disabled = true;
    }
}

// Inicializar a aplicação
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Sistema inicializando...');
    
    try {
        // Tentar carregar dados do arquivo results.json
        const data = await loadDataFromFile();
        
        if (data) {
            console.log('Dados do results.json carregados com sucesso', data);
            initializePageWithData(data);
            showNotification('Dados carregados do arquivo results.json');
        } else {
            console.log('Arquivo results.json não encontrado ou inválido');
            initializePageWithoutData();
        }
    } catch (error) {
        console.error('Erro na inicialização:', error);
        initializePageWithoutData();
    }
});