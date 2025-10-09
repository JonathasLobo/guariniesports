document.addEventListener("DOMContentLoaded", () => {
  // Verificação de dependências
  console.log("Verificando dados:", {
    pokemonRoles: typeof pokemonRoles,
    baseStats: typeof baseStats, 
    gameHeldItens: typeof gameHeldItens,
    skillDamage: typeof skillDamage
  });

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
    verde: { 
      name: "Verde", 
      stat: "Sp. ATK", 
      color: "#28a745",
      levels: { 2: 1, 4: 2, 6: 4 },
      description: "Aumenta o Sp. ATK"
    },
    vermelho: { 
      name: "Vermelho", 
      stat: "Atk Speed", 
      color: "#dc3545",
      levels: { 3: 2, 5: 4, 7: 8 },
      description: "Aumenta a velocidade de ataque"
    },
    azul: { 
      name: "Azul", 
      stat: "DEF", 
      color: "#007bff",
      levels: { 2: 2, 4: 4, 6: 8 },
      description: "Aumenta a defesa física"
    },
    branco: { 
      name: "Branco", 
      stat: "HP", 
      color: "#ffffff",
      levels: { 2: 1, 4: 2, 6: 4 },
      description: "Aumenta os pontos de vida"
    },
    preto: { 
      name: "Preto", 
      stat: "CDR", 
      color: "#343a40",
      levels: { 3: 1, 5: 2, 7: 4 },
      description: "Reduz o tempo de recarga das habilidades"
    },
    amarelo: { 
      name: "Amarelo", 
      stat: "Speed", 
      color: "#ffc107",
      levels: { 3: 4, 5: 6, 7: 12 },
      description: "Aumenta a velocidade de movimento"
    },
    marrom: { 
      name: "Marrom", 
      stat: "ATK", 
      color: "#8b4513",
      levels: { 2: 1, 4: 2, 6: 4 },
      description: "Aumenta o ATK físico"
    },
    roxo: { 
      name: "Roxo", 
      stat: "Sp. DEF", 
      color: "#6f42c1",
      levels: { 2: 2, 4: 4, 6: 8 },
      description: "Aumenta a defesa especial"
    },
    rosa: { 
      name: "Rosa", 
      stat: "Hindrance Reduction", 
      color: "#e83e8c",
      levels: { 3: 4, 5: 8, 7: 16 },
      description: "Reduz a duração dos efeitos de controle"
    },
    azulmarinho: { 
      name: "Azul-Marinho", 
      stat: "Energy Rate", 
      color: "#1e3a8a",
      levels: { 3: 1, 5: 2, 7: 4 },
      description: "Aumenta a velocidade de carregamento da ultimate"
    },
    cinza: { 
      name: "Cinza", 
      stat: "Damage Taken", 
      color: "#6c757d",
      levels: { 3: 3, 5: 6, 7: 12 },
      description: "Reduz o dano recebido"
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
  let currentRoleFilter = "All";
  let currentLevel = 1;
  let currentDamageTypeFilter = null;
  let selectedSkills = {};
  let currentSkillSlot = null;
  let muscleGauge = 0; // Exclusivo para Buzzwole (0-6)
  let selectedRoute = null;
  let selectedSkins = {};
  let statModifiers = {}; // Rastreia todos os modificadores de cada stat
  let currentExpandedStat = null; // Controla qual stat está expandido

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
    Support: '💚'
  };
  
  // Mapeamento de nomes para classes CSS
  const categoryClasses = {
    Attack: 'attack',
    Endure: 'endure',
    Mobility: 'mobility',
    Score: 'score',
    Support: 'support'
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
  "Shield": { icon: "🛡️", label: "Shield Active" },
  "Speed Boost": { icon: "⚡", label: "Speed Boost" },
  "Damage Boost": { icon: "💥", label: "Damage Boost" },
  "Invincible": { icon: "✨", label: "Invincible" },
  "Heal": { icon: "💚", label: "Heal Active" },
  "Stealth": { icon: "👁️", label: "Stealth" }
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
  }

  // Mapa de Pokémon com itens fixos
  const pokemonFixedItems = {
    "zacian": "rustedsword",
    "mewtwox": "mewtwonitex",
    "mewtwoy": "mewtwonitey",
    "megalucario": "lucarionite"
  };

// Função para criar o seletor de skills dentro do resultado
// FunÃ§Ã£o para criar o seletor de skills dentro do resultado
const createSkillBuildInResult = () => {
  // Remover seletor existente se houver
  const existingSelector = document.querySelector(".skill-build-in-result");
  if (existingSelector) {
    existingSelector.remove();
  }
  
  // NOVO: Remover ratings existentes
  const existingRatings = document.querySelector(".pokemon-ratings-container");
  if (existingRatings) {
    existingRatings.remove();
  }
  
  // Verificar se temos dados de skills para este PokÃ©mon
  if (!selectedPokemon || !skillDamage[selectedPokemon]) {
    return;
  }
  
  const resultImage = document.querySelector(".resultado-image");
  if (!resultImage) return;
  
  const skills = skillDamage[selectedPokemon];
  
  // Verificar se existem skills s11/s12 e s21/s22
  const hasS1Skills = skills.s11 || skills.s12;
  const hasS2Skills = skills.s21 || skills.s22 || (selectedPokemon === "megalucario" && skills.U11);
  
  if (!hasS1Skills && !hasS2Skills) return;
  
  // Criar container do seletor
  const skillSelector = document.createElement("div");
  skillSelector.className = "skill-build-in-result";
  
  // Container dos slots de skills
  const slotsContainer = document.createElement("div");
  slotsContainer.className = "skill-build-slots";

  // Criar slot 1 (s11/s12) se existir
  if (hasS1Skills) {
    const slot1 = createSkillSlot("S1", "s1", selectedPokemon);
    slotsContainer.appendChild(slot1);
  }

  // Criar slot 2 (s21/s22) se existir
  if (hasS2Skills) {
    const slot2 = createSkillSlot("S2", "s2", selectedPokemon);
    slotsContainer.appendChild(slot2);
  }

  skillSelector.appendChild(slotsContainer);

  // Adicionar seletor de Route ABAIXO e CENTRALIZADO
  const routeSelector = createRouteSelector();
  skillSelector.appendChild(routeSelector);
  
  // Inserir o seletor apÃ³s a role badge
  const roleBadge = resultImage.querySelector(".role-badge");
  if (roleBadge) {
    // NOVO: Adicionar ratings ANTES do seletor de skills
    const ratingsHtml = createPokemonRatings(selectedPokemon);
    if (ratingsHtml) {
      roleBadge.insertAdjacentHTML("afterend", ratingsHtml);
      
      // Agora inserir o skill selector após os ratings
      const ratingsContainer = resultImage.querySelector(".pokemon-ratings-container");
      if (ratingsContainer) {
        ratingsContainer.insertAdjacentElement("afterend", skillSelector);
      } else {
        roleBadge.insertAdjacentElement("afterend", skillSelector);
      }
    } else {
      roleBadge.insertAdjacentElement("afterend", skillSelector);
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
        this.src = `./estatisticas-shad/images/skills/${currentSelection}.png`;
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
  
  // Event listener para abrir painel de seleção
  circle.addEventListener("click", (e) => {
    e.stopPropagation();
    openSkillSelectionPanel(pokemon, slotKey, slotContainer);
  });
  
  slotContainer.appendChild(slotLabel);
  slotContainer.appendChild(circle);
  slotContainer.appendChild(skillName);
  
  return slotContainer;
};

// Função para criar o seletor de Route
const createRouteSelector = () => {
  const routeContainer = document.createElement("div");
  routeContainer.className = "route-selector";
  routeContainer.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin: 15px 0;
  `;
  
  const routeLabel = document.createElement("div");
  routeLabel.className = "skill-slot-label";
  routeLabel.textContent = "Route";
  routeLabel.style.cssText = "color: #000; font-size: 12px; font-weight: bold;";
  
  const circle = document.createElement("div");
  circle.className = "skill-selector-circle route-circle";
  circle.style.cssText = "position: relative;";
  
  const routeName = document.createElement("div");
  routeName.className = "skill-selection-name";
  routeName.id = "selected-route-name";
  
  if (selectedRoute) {
    circle.classList.add("has-selection");
    
    const img = document.createElement("img");
    img.src = `./estatisticas-shad/images/lanes/${selectedRoute}.png`;
    img.alt = selectedRoute;
    img.style.cssText = "border: none !important; box-shadow: none !important; outline: none !important; margin: 0 !important; padding: 0 !important; width: 48px; height: 48px; border-radius: 50%; object-fit: cover;";
    img.onerror = function() {
      this.style.display = "none";
    };
    
    circle.appendChild(img);
    routeName.textContent = selectedRoute.charAt(0).toUpperCase() + selectedRoute.slice(1);
    routeName.classList.add("selected");
  } else {
    circle.classList.add("empty");
    circle.textContent = "+";
  }
  
  circle.addEventListener("click", (e) => {
    e.stopPropagation();
    openRouteSelectionPanel(routeContainer);
  });
  
  routeContainer.appendChild(routeLabel);
  routeContainer.appendChild(circle);
  routeContainer.appendChild(routeName);
  
  return routeContainer;
};

// Função para abrir painel de seleção de rota
const openRouteSelectionPanel = (routeContainer) => {
  closeAllSelectionPanels();
  closeRouteSelectionPanel();
  const routes = ["top", "jungle", "bot"];
  showRouteSelectionPanel(routes, routeContainer);
};

// Função para mostrar o painel de rotas
const showRouteSelectionPanel = (routes, routeContainer) => {
  const panel = document.createElement("div");
  panel.className = "skill-selection-panel show";
  panel.id = "route-selection-panel";
  
  const title = document.createElement("div");
  title.className = "skill-selection-title";
  title.textContent = "Choose Route";
  panel.appendChild(title);
  
  const optionsContainer = document.createElement("div");
  optionsContainer.className = "skill-options";
  
  routes.forEach(route => {
    const optionDiv = document.createElement("div");
    optionDiv.className = "skill-option";
    optionDiv.dataset.route = route;
    
    const img = document.createElement("img");
    img.src = `./estatisticas-shad/images/lanes/${route}.png`;
    img.alt = route;
    img.onerror = function() {
      this.style.display = "none";
    };
    
    const name = document.createElement("div");
    name.className = "skill-option-name";
    name.textContent = route.charAt(0).toUpperCase() + route.slice(1);
    
    optionDiv.appendChild(img);
    optionDiv.appendChild(name);
    
    optionDiv.addEventListener("click", () => {
      selectRoute(route);
    });
    
    optionsContainer.appendChild(optionDiv);
  });
  
  panel.appendChild(optionsContainer);
  routeContainer.appendChild(panel);
  
  setTimeout(() => {
    document.addEventListener("click", handleRouteClickOutside);
  }, 100);
};

// Função para selecionar rota
const selectRoute = (route) => {
  selectedRoute = route;
  closeRouteSelectionPanel();
  createSkillBuildInResult();
};

// Função para fechar painel de rota
const closeRouteSelectionPanel = () => {
  const panel = document.getElementById("route-selection-panel");
  if (panel) {
    panel.remove();
  }
  document.removeEventListener("click", handleRouteClickOutside);
};

// Handler para clique fora do painel de rota
const handleRouteClickOutside = (e) => {
  const panel = document.getElementById("route-selection-panel");
  const routeSelector = document.querySelector(".route-selector");
  
  if (panel && !panel.contains(e.target) && (!routeSelector || !routeSelector.contains(e.target))) {
    closeRouteSelectionPanel();
  }
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
  clearButton.textContent = "🗑️ Limpar Seleção";
  clearButton.addEventListener("click", () => {
    clearSkillSelection();
  });
  panel.appendChild(clearButton);
  
  // Opções
  const optionsContainer = document.createElement("div");
  optionsContainer.className = "skill-options";
  
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
    
    // Selecionar skill ao clicar
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
  // Salvar seleção
  if (!selectedSkills[currentSkillSlot.pokemon]) {
    selectedSkills[currentSkillSlot.pokemon] = {};
  }
  
  selectedSkills[currentSkillSlot.pokemon][currentSkillSlot.slotKey] = skillKey;
  
  closeSkillSelectionPanel();
  
  // Recriar o seletor para mostrar a nova seleção
  createSkillBuildInResult();
  
  // IMPORTANTE: Recalcular para filtrar as skills exibidas
  calcular();
};

// Função para limpar seleção de skill
const clearSkillSelection = () => {
  if (!currentSkillSlot) return;
  
  const { pokemon, slotKey } = currentSkillSlot;
  
  // Limpar a seleção do slot
  if (selectedSkills[pokemon] && selectedSkills[pokemon][slotKey]) {
    delete selectedSkills[pokemon][slotKey];
  }
  
  closeSkillSelectionPanel();
  
  // Recriar o seletor para mostrar o estado vazio
  createSkillBuildInResult();
  
  // Recalcular para mostrar todas as skills do slot novamente
  calcular();
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
    selectedSkills[selectedPokemon] = {};
  }
};

// Função para determinar qual slot uma skill pertence
const getSkillSlot = (pokemon, skillKey) => {
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
  
  const isUltimate = skillKey === "ult" || skillKey === "ult1" || skillKey === "ult2";
  
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
  
  // **NOVO**: Verificar se outras skills ativas afetam o cooldown desta skill
  if (activeSkills[pokemon] && skillDamage[pokemon]) {
    Object.keys(activeSkills[pokemon]).forEach(activeSkillKey => {
      // Verificar se a skill está ativa
      if (activeSkills[pokemon][activeSkillKey]) {
        const activeSkill = skillDamage[pokemon][activeSkillKey];
        
        // Verificar se tem buffPlus com otherSkillsCooldownReduction
        if (activeSkill?.buffPlus && 
            currentLevel >= (activeSkill.buffPlus.levelRequired || 11) &&
            activeSkill.buffPlus.otherSkillsCooldownReduction) {
          
          // Verificar se esta skill (skillKey) está na lista de reduções
          const reductionForThisSkill = activeSkill.buffPlus.otherSkillsCooldownReduction[skillKey];
          if (reductionForThisSkill !== undefined) {
            specificCooldownReduction += Number(reductionForThisSkill);
          }
        }
      }
    });
  }
  
  // 1. Aplicar CDR/EnergyRate GLOBAL primeiro (limitado a 90%)
  totalCDR = Math.min(totalCDR, 90);
  const afterGlobalCDR = baseCooldown * (1 - (totalCDR / 100));
  
  // 2. Aplicar FlatCDR GLOBAL (apenas para skills normais)
  const afterFlatCDR = Math.max(0.5, afterGlobalCDR - totalFlatCDR);
  
  // 3. Aplicar redução FIXA em segundos específica da skill (incluindo cross-skill)
  const afterFlatReduction = Math.max(0.5, afterFlatCDR - specificCooldownReduction);
  
  // 4. Aplicar redução percentual ESPECÍFICA da skill
  const effectiveCooldown = afterFlatReduction * (1 - (specificCooldownReductionPercent / 100));
  
  const finalCooldown = Math.max(0.5, effectiveCooldown);
  
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

  const PERCENT_KEYS = new Set(["AtkSPD","CDR","CritRate","CritDmg","Lifesteal","EnergyRate", "HPRegen", "Shield", "DmgTaken", "HindRed", "SpDEFPen", "DEFPen"]);

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
  
  // CORREÇÃO ESPECIAL PARA SPEED PERCENTUAL
    if (stat === "Speed" && mod.source.includes("(Plus)")) {
      // Speed com buff percentual de skill: pegar valor da fonte original
      const skillName = mod.source.replace(" (Plus)", "");
      
      // Buscar o valor percentual original nos dados da skill
      if (selectedPokemon && skillDamage[selectedPokemon]) {
        const skills = skillDamage[selectedPokemon];
        Object.keys(skills).forEach(skillKey => {
          const skill = skills[skillKey];
          if (skill.name === skillName && skill.buffPlus?.buffs?.Speed) {
            const originalValue = parseFloat(String(skill.buffPlus.buffs.Speed).replace("%", ""));
            displayValue = `${sign}${originalValue.toFixed(1)}%`;
          }
        });
      }
      
      // Fallback: se não encontrou, usar lógica padrão
      if (!displayValue) {
        displayValue = `${sign}${mod.value.toFixed(1)}%`;
      }
    }
    // Tipo específico para emblemas que afetam stats não-percentuais
    else if (mod.type === "emblem-percent") {
      displayValue = `${sign}${mod.value.toFixed(1)}%`;
    } else if (mod.type === "percent") {
      displayValue = `${sign}${mod.value.toFixed(1)}%`;
    } else if (isPercent && mod.type === "flat") {
      displayValue = `${sign}${mod.value.toFixed(1)}%`;
    } else {
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
    
    // Tratar Unstoppable em segundos
    if (key === "Unstoppable") {
      return `${Number(val).toFixed(1)}s`;
    }
    
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
    return Math.round(Number(val));
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
        result[targetStat] += passive.formula(baseStats);
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
            const baseForBuff = Number(baseStats[stat]) || 0;
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
    verde: { stat: "SpATK", values: { 2: 1, 4: 2, 6: 4 } },
    vermelho: { stat: "AtkSPD", values: { 3: 2, 5: 4, 7: 8 } },
    azul: { stat: "DEF", values: { 2: 2, 4: 4, 6: 8 } },
    branco: { stat: "HP", values: { 2: 1, 4: 2, 6: 4 } },
    preto: { stat: "CDR", values: { 3: 1, 5: 2, 7: 4 } },
    amarelo: { stat: "Speed", values: { 3: 4, 5: 6, 7: 12 } },
    marrom: { stat: "ATK", values: { 2: 1, 4: 2, 6: 4 } },
    roxo: { stat: "SpDEF", values: { 2: 2, 4: 4, 6: 8 } },
    cinza: { stat: "DmgTaken", values: { 3: 3, 5: 6, 7: 12 } },
    rosa: { stat: "HindRed", values: { 3: 4, 5: 8, 7: 16 } },
    azulmarinho: { stat: "EnergyRate", values: { 3: 1, 5: 2, 7: 4 } },
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
      if (emblemKey === "cinza") {
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
  
  // Objeto para armazenar self-buffs por skill (não afetam stats globais)
  if (!modifiedStats._selfBuffs) {
    modifiedStats._selfBuffs = {};
  }

  Object.keys(activeSkills[pokemon]).forEach(skillKey => {
    if (!activeSkills[pokemon][skillKey]) return;

    const skill = skills[skillKey];
    if (!skill) return;

    try {
    // Aplicar buffs básicos GLOBAIS da skill (afetam o personagem inteiro)
    if (skill.buff && typeof skill.buff === 'object') {
      Object.keys(skill.buff).forEach(stat => {
        // Condições especiais para Blastoise
        if (
          pokemon === "blastoise" &&
          skillKey === "s11" &&
          !(activeSkills[pokemon]?.s22)
        ) {
          return;
        }
        if (
          pokemon === "blastoise" &&
          skillKey === "s12" &&
          stat === "Speed" &&
          !(activeSkills[pokemon]?.s22)
        ) {
          return;
        }

        const skillName = skill.name || skillKey;
        const iconPath = `./estatisticas-shad/images/skills/${pokemon}_${skillKey}.png`;

        if (modifiedStats.hasOwnProperty(stat) || stat === "FlatCDR") {
          const rawVal = skill.buff[stat];
          const isPercentString = (typeof rawVal === "string" && rawVal.includes("%"));
          const numeric = parseFloat(String(rawVal).replace("%","").replace("+","").replace(",", "."));

          if (!Number.isFinite(numeric)) return;

          if (stat === "FlatCDR") {
            if (!modifiedStats[stat]) modifiedStats[stat] = 0;
            modifiedStats[stat] += numeric;
            addStatModifier(stat, numeric, skillName, "flat", iconPath);
          }
          // Para stats percentuais (Speed, AtkSPD, CDR, etc.)
          else if (PERCENT_KEYS.has(stat)) {
            // SPEED é híbrido: pode ser flat OU percent
            if (stat === "Speed" && isPercentString) {
              // Speed com "%" = calcular baseado no valor base
              const bonusValue = baseStats.Speed * (numeric / 100);
              modifiedStats.Speed += bonusValue;
              addStatModifier("Speed", numeric, skillName, "speed-percent", iconPath); // Tipo especial
            } else {
              // Outros stats percentuais: adicionar diretamente
              modifiedStats[stat] += numeric;
              addStatModifier(stat, numeric, skillName, "flat", iconPath);
            }
          }
                    else if (stat === "DmgTaken") {
            modifiedStats[stat] += numeric;
            addStatModifier(stat, numeric, skillName, "flat", iconPath);
          } 
          // Para stats não-percentuais (HP, ATK, DEF, SpATK, SpDEF)
          else {
            if (isPercentString) {
              // Se vier com %, calcular baseado no valor base
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

      // Aplicar SELF-BUFFS básicos (afetam apenas a skill específica)
      if (skill.selfBuff && typeof skill.selfBuff === 'object') {
        if (!modifiedStats._selfBuffs[skillKey]) {
          modifiedStats._selfBuffs[skillKey] = {};
        }
        
        Object.keys(skill.selfBuff).forEach(stat => {
          const rawVal = skill.selfBuff[stat];
          const numeric = parseFloat(String(rawVal).replace("%","").replace("+","").replace(",", "."));
          
          if (Number.isFinite(numeric)) {
            modifiedStats._selfBuffs[skillKey][stat] = numeric;
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
            const numeric = parseFloat(String(rawVal).replace("%","").replace("+","").replace(",", "."));

            if (!Number.isFinite(numeric)) return;

            const skillName = `${skill.name || skillKey} (Plus)`;
            const iconPath = `./estatisticas-shad/images/skills/${pokemon}_${skillKey}.png`;

            // Verificar se o stat é do tipo percentual (Speed, AtkSPD, CDR, etc.)
            if (PERCENT_KEYS.has(stat)) {
              // SPEED é híbrido: pode ser flat OU percent
              if (stat === "Speed" && isPercentString) {
                // Speed com "%" = calcular baseado no valor base
                const bonusValue = baseStats.Speed * (numeric / 100);
                modifiedStats.Speed += bonusValue;
                addStatModifier("Speed", numeric, skillName, "speed-percent", iconPath); // Tipo especial
              } else {
                // Outros stats percentuais: adicionar diretamente
                modifiedStats[stat] += numeric;
                addStatModifier(stat, numeric, skillName, "flat", iconPath);
              }
            } else if (stat === "DmgTaken") {
              // DmgTaken pode ser percentual ou flat
              if (isPercentString) {
                modifiedStats[stat] += numeric;
                addStatModifier(stat, numeric, skillName, "flat", iconPath);
              } else {
                modifiedStats[stat] += numeric;
                addStatModifier(stat, numeric, skillName, "flat", iconPath);
              }
            } else {
              // Para stats não-percentuais (HP, ATK, DEF, SpATK, SpDEF)
              if (isPercentString) {
                // Se vier com %, calcular baseado no valor base
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
        // ADICIONE ESTA SEÇÃO AQUI (posição correta):
        if (skill.buffPlus.nextBasicAttackPercent) {
          if (!modifiedStats._nextBasicAttackPercents) {
            modifiedStats._nextBasicAttackPercents = [];
          }
          
          modifiedStats._nextBasicAttackPercents.push({
            value: skill.buffPlus.nextBasicAttackPercent,
            source: skill.name + " (Plus)"
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
          
          // NOVO: Usar debuffLabels se disponível (também para buffPlus)
          if (skill.debuffLabels && skill.debuffLabels[debuffStat]) {
            debuffsAcumulados[debuffStat].customLabel = skill.debuffLabels[debuffStat];
          }
        });
      }
      }

      // Aplicar SELF-BUFFS Plus (baseado no nível atual, afetam apenas a skill específica)
      if (skill.selfBuffPlus && typeof skill.selfBuffPlus === 'object' && 
          currentLevel >= (skill.selfBuffPlus.levelRequired || 11)) {
        
        if (skill.selfBuffPlus.buffs && typeof skill.selfBuffPlus.buffs === 'object') {
          if (!modifiedStats._selfBuffs[skillKey]) {
            modifiedStats._selfBuffs[skillKey] = {};
          }
          
          Object.keys(skill.selfBuffPlus.buffs).forEach(stat => {
            const rawVal = skill.selfBuffPlus.buffs[stat];
            const numeric = parseFloat(String(rawVal).replace("%","").replace("+","").replace(",", "."));
            
            if (Number.isFinite(numeric)) {
              if (!modifiedStats._selfBuffs[skillKey][stat]) {
                modifiedStats._selfBuffs[skillKey][stat] = 0;
              }
              modifiedStats._selfBuffs[skillKey][stat] += numeric;
            }
          });
        }
      }

      // Aplicar efeitos especiais da skill
      if (skill.activeEffect && typeof skill.activeEffect === "function") {
        modifiedStats = skill.activeEffect(modifiedStats, baseStats);
      }

      if (skill.debuffs && typeof skill.debuffs === 'object') {
        Object.keys(skill.debuffs).forEach(debuffStat => {
          const debuffValue = parseFloat(skill.debuffs[debuffStat]);
          
          if (!Number.isFinite(debuffValue)) return;
          
          if (!debuffsAcumulados[debuffStat]) {
            debuffsAcumulados[debuffStat] = {
              total: 0,
              skills: [],
              customLabel: null // NOVO: para armazenar o label customizado
            };
          }
          
          debuffsAcumulados[debuffStat].total += debuffValue;
          debuffsAcumulados[debuffStat].skills.push({
            name: skill.name,
            value: debuffValue
          });
          
          // NOVO: Usar debuffLabels se disponível
          if (skill.debuffLabels && skill.debuffLabels[debuffStat]) {
            debuffsAcumulados[debuffStat].customLabel = skill.debuffLabels[debuffStat];
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
      button.textContent = type === "ATK" ? "FÍSICOS" : "ESPECIAIS";
      
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
    selectedPokemon = poke;
    
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
            // Verifica se a skill tem buff ou efeitos ativáveis (incluindo ults)
            if (skill.buff || skill.activeEffect || skill.debuffs || skill.dynamicBuffs || 
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
    resetButton.textContent = "🗑️ Resetar Held Itens";
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

modified = { ...base };

selectedHeldItems.forEach(selectedItem => {
  const itemKey = selectedItem.key;
  const itemName = selectedItem.name;
  const iconPath = `./estatisticas-shad/images/held-itens/${itemKey}.png`;

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
      // Rastrear modificador
      addStatModifier(prop, amount, itemName, "flat", iconPath);
    }
  });

  if (STACKABLE_ITEMS[itemName]) {
    const config = STACKABLE_ITEMS[itemName];
    const stacks = selectedItem.stacks || 0;

    if (itemName === "Charging Charm") {
      const baseForPercent = (base[config.stat] || 0) + (flatBonusesByStat[config.stat] || 0);
      const bonusPercent = (baseForPercent * (config.perStack / 100)) * stacks;
      const fixedBonus = config.fixedBonus || 0;
      modified[config.stat] += fixedBonus + bonusPercent;
      
      // Rastrear stacks
      if (stacks > 0) {
        addStatModifier(config.stat, fixedBonus + bonusPercent, `${itemName} (${stacks} stacks)`, "percent", iconPath);
      }
    } else if (config.percent) {
      const totalPercentage = config.perStack * stacks;
      const baseForPercent = (base[config.stat] || 0) + (flatBonusesByStat[config.stat] || 0);
      const bonusAmount = baseForPercent * (totalPercentage / 100);
      modified[config.stat] += bonusAmount;
      
      // Rastrear stacks
      if (stacks > 0) {
        addStatModifier(config.stat, bonusAmount, `${itemName} (${stacks} stacks)`, "percent", iconPath);
      }
    } else {
      const bonusAmount = config.perStack * stacks;
      modified[config.stat] += bonusAmount;
      
      // Rastrear stacks
      if (stacks > 0) {
        addStatModifier(config.stat, bonusAmount, `${itemName} (${stacks} stacks)`, "flat", iconPath);
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
// 3) Battle Items
let selectedBattle = "";
battleRadios.forEach(r => { if (r.checked) selectedBattle = r.value; });

if (selectedBattle) {
  const battleItemName = gameBattleItems[selectedBattle] || selectedBattle;
  const iconPath = `./estatisticas-shad/images/battle-items/${selectedBattle}.png`;
  
  if (selectedBattle === "xattack") {
    const atkBonus = base.ATK * 0.20;
    const spatkBonus = base.SpATK * 0.20;
    const aspdBonus = base.AtkSPD * 0.25;
    
    modified.ATK += atkBonus;
    modified.SpATK += spatkBonus;
    modified.AtkSPD += aspdBonus;
    
    addStatModifier("ATK", atkBonus, battleItemName, "percent", iconPath);
    addStatModifier("SpATK", spatkBonus, battleItemName, "percent", iconPath);
    addStatModifier("AtkSPD", aspdBonus, battleItemName, "percent", iconPath);
  }
  
  if (selectedBattle === "xspeed") {
    const speedBonus = base.Speed * 0.45;
    modified.Speed += speedBonus;
    addStatModifier("Speed", speedBonus, battleItemName, "percent", iconPath);
  }
  
  if (selectedBattle === "potion") {
    const potionHealing = 160 + (modified.HP * 0.20);
    modified.HP += potionHealing;
    addStatModifier("HP", potionHealing, battleItemName, "formula", iconPath);
  }
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
        
        if (emblemKey === "cinza") {
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
    if (k === "Speed") {
      // Speed é híbrido - verificar tipo de modificador
      if (hasModifiers && statModifiers[k].modifications.some(mod => mod.type === "speed-percent")) {
        // Tem modificadores percentuais: somar apenas eles
        percentChange = statModifiers[k].modifications
          .filter(mod => mod.type === "speed-percent")
          .reduce((sum, mod) => sum + mod.value, 0)
          .toFixed(1);
      } else if (b !== 0) {
        // Modificadores flat: calcular percentual normal
        percentChange = (((m - b) / b) * 100).toFixed(1);
      } else {
        percentChange = 0;
      }
    } else if (PERCENT_KEYS.has(k)) {
      // Para stats percentuais, pegar o valor do modificador, não a diferença absoluta
      if (hasModifiers && statModifiers[k].modifications.length > 0) {
        // Somar apenas os valores dos modificadores "flat" (que são os valores percentuais diretos)
        percentChange = statModifiers[k].modifications
          .filter(mod => mod.type === "flat")
          .reduce((sum, mod) => sum + mod.value, 0)
          .toFixed(1);
      } else {
        percentChange = (m - b).toFixed(1);
      }
    } else {
      // Para stats normais, calcular percentual de mudança tradicional
      percentChange = b !== 0 ? (((m - b) / b) * 100).toFixed(1) : 0;
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
        
        // Tratamento especial para Unstoppable - exibir em segundos (BUFF positivo)
        if (debuff.stat === "Unstoppable") {
          statusFinalDiv.insertAdjacentHTML("beforeend", `
            <div class="stat-line">
              <span class="stat-label">${debuff.label}</span>
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
              <span class="stat-label">${debuff.label}</span>
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

        if (skillDamage[selectedPokemon]) {
      const skills = skillDamage[selectedPokemon];
      const activeEffects = new Set(); // Usar Set para evitar duplicatas
      
      Object.keys(skills).forEach(skillKey => {
        // Ignorar passivas
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
      
      if (emblemKey === "cinza") {
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
        <span class="stat-label" style="margin-bottom: 8px;">Emblemas</span>
        <div style="display: flex; flex-direction: column; width: 100%; padding-left: 10px;">
          ${activeEmblems}
        </div>
      </div>
    `);
  }
}

    // Mostrar Battle Item
    const selectedBattleNow = Array.from(battleRadios).find(r => r.checked)?.value;
    if (selectedBattleNow) {
      const battleItemName = gameBattleItems[selectedBattleNow] || selectedBattleNow;
      
      const battleImg = `<img src="./estatisticas-shad/images/battle-items/${selectedBattleNow}.png" 
                          alt="${battleItemName}" 
                          title="${battleItemName}" 
                          style="width:40px; height:40px;">`;
      statusFinalDiv.insertAdjacentHTML("beforeend", `
        <div class="stat-line special-stat">
          <span class="stat-label">Battle Item</span>
          <span class="stat-value">${battleImg}</span>
        </div>
      `);
    }

    // Cálculo das skills
    skillsDiv.innerHTML = "";

    // Muscle Gauge para Buzzwole
    if (selectedPokemon === "buzzwole") {
      createMuscleGaugeControl();
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
            
            if (Math.round(values.modified) > Math.round(values.base)) {
              displayText = `${Math.round(values.base)} → <span style="color:limegreen;">▲ ${Math.round(values.modified)}</span>`;
            } else {
              displayText = `${Math.round(values.modified)}`;
            }
            
            if (hasAdditionalText) {
              displayText += ` <span style="color:#888; font-style:italic;">+ ${f.additionalText}</span>`;
            }
            
            return `<li><strong>${f.label}:</strong> ${displayText}</li>`;
          }).join("");
        }

        const passiveHtml = `
          <div class="skill-box passive${activeClass}" data-pokemon="${selectedPokemon}" data-passive-key="${passiveKey}" style="margin-bottom: 15px;">
            <img src="${imgPath}" alt="${p.name}" class="skill-icon"
                 onerror="this.onerror=null;this.src='${fallbackImg}'">
            <div class="skill-info">
              <h4>${p.name}</h4>
              <div class="passive-subtitle">passive skill</div>
              ${p.description ? `<ul><li style="color:#888; font-style:italic;">${p.description}</li></ul>` : ""}
              ${passiveFormulasHtml ? `<ul>${passiveFormulasHtml}</ul>` : ""}
            </div>
            <div class="passive-status"></div>
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

  const isUltimate = key === "ult" || key === "ult1" || key === "ult2";
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
      
      if (f.usesMuscleGauge && selectedPokemon === "buzzwole") {
        baseVal = f.formula(baseAttribute, targetLevel, base.HP, muscleGauge);
        modifiedVal = f.formula(modifiedAttribute, targetLevel, modified.HP, muscleGauge);
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

      // Aplicar multiplicadores de nextBasicAttackPercent para ataques básicos
      if (modified._nextBasicAttackPercents && modified._nextBasicAttackPercents.length > 0) {
        const basicAttackKeys = ['basic', 'basicattack', 'atkboosted'];
        if (basicAttackKeys.includes(key)) {
          const totalPercentIncrease = modified._nextBasicAttackPercents.reduce((total, buff) => {
            return total + buff.value;
          }, 0);
          
          const multiplier = 1 + (totalPercentIncrease / 100);
          modifiedVal *= multiplier;
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
    }

    // Aplicar skillDamageMultiplier da passiva
    if (skills.passive) {
      const passive = skills.passive;
      const isPassiveActive = activePassives[selectedPokemon] && activePassives[selectedPokemon]['passive'];
      
      if (isPassiveActive && passive.skillDamageMultiplier) {
        const isBasicAttack = ['atkboosted', 'basic', 'basicattack'].includes(key);
        
        if (!isBasicAttack || passive.affectsBasicAttack === true) {
          modifiedVal *= passive.skillDamageMultiplier;
        }
      }
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
    
    calculatedValues[index] = { base: baseVal, modified: modifiedVal };
  }
});
  // Segundo passe: calcular valores dependentes
  s.formulas.forEach((f, index) => {
    if (f.type === "dependent") {
      const dependsOnIndex = f.dependsOn;
      if (calculatedValues[dependsOnIndex]) {
        let dependentBase = calculatedValues[dependsOnIndex].base;
        let dependentModified = calculatedValues[dependsOnIndex].modified;
        
        if (calculatedValues[dependsOnIndex].hasPassiveBonus) {
          dependentBase = calculatedValues[dependsOnIndex].withPassive.base;
          dependentModified = calculatedValues[dependsOnIndex].withPassive.modified;
        }
        
        const baseVal = f.formula(dependentBase, targetLevel);
        const modifiedVal = f.formula(dependentModified, targetLevel);
        calculatedValues[index] = { base: baseVal, modified: modifiedVal, hasPassiveBonus: false };
      } else {
        calculatedValues[index] = { base: 0, modified: 0, hasPassiveBonus: false };
      }
    }
  });

  // Criar indicador de skill plus INLINE (para ir no cabeçalho)
// Criar indicador de skill plus
let skillPlusIndicator = "";
if (hasSkillPlus) {
  const levelReq = s.buffPlus?.levelRequired || s.selfBuffPlus?.levelRequired || 11;
  const plusText = isPlusActive ? "PLUS ACTIVE" : `PLUS LV ${levelReq} ACTIVATION`;
  skillPlusIndicator = `<span class="skill-upgrade-indicator">${plusText}</span>`;
}

// Criar HTML dos valores de dano destacados
const damageValuesHtml = s.formulas.map((f, index) => {
  if (f.type === "text-only") {
    return `<div class="skill-info-text"><strong>${f.label}:</strong> <span style="color:#000; font-style:italic;">${f.additionalText}</span></div>`;
  }
  
  const values = calculatedValues[index];
  if (!values) return "";
  
  const baseVal = Math.round(values.base);
  const modVal = Math.round(values.modified);
  const hasIncrease = modVal > baseVal;
  const percentIncrease = baseVal > 0 ? (((modVal - baseVal) / baseVal) * 100).toFixed(1) : 0;
  
  return `
    <div class="skill-damage-value">
      <span class="skill-damage-label">${f.label}</span>
      <div>
        ${hasIncrease ? 
          `<span class="skill-damage-number">
            <span style="color: #888; font-size: 16px; text-decoration: line-through;">${baseVal}</span>
            ${modVal}
            <span class="skill-damage-percent">+${percentIncrease}%</span>
          </span>` :
          `<span class="skill-damage-number">${modVal}</span>`
        }
        ${f.additionalText ? `<div style="color:#888; font-size:12px; font-style:italic; margin-top:4px;">${f.additionalText}</div>` : ""}
      </div>
    </div>
  `;
}).join("");

// Criar seção de buffs - SEMPRE mostrar quando a skill está ativa
let buffsHtml = "";
if (isActiveSkill && (s.buff || s.selfBuff || (s.buffPlus && isPlusActive) || s.debuffs)) {
  let buffsList = [];
  
  // Buffs globais básicos
  if (s.buff) {
    Object.keys(s.buff).forEach(stat => {
      const value = s.buff[stat];
      const label = STAT_LABELS[stat] || stat;
      buffsList.push(`<span style="color:#000000;">+${value} ${label}</span>`);
    });
  }
  
  // Self-buffs (afetam apenas a skill)
  if (s.selfBuff) {
    Object.keys(s.selfBuff).forEach(stat => {
      const value = s.selfBuff[stat];
      const label = STAT_LABELS[stat] || stat;
      buffsList.push(`<span style="color:#000000;">+${value} ${label} (Self)</span>`);
    });
  }
  
  // Buffs do Plus (se ativo)
  if (isPlusActive && s.buffPlus?.buffs) {
    Object.keys(s.buffPlus.buffs).forEach(stat => {
      const value = s.buffPlus.buffs[stat];
      const label = STAT_LABELS[stat] || stat;
      buffsList.push(`<span style="color:#000000;">+${value} ${label}</span>`);
    });
  }
  
  // Debuffs
  if (s.debuffs) {
    Object.keys(s.debuffs).forEach(stat => {
      const value = s.debuffs[stat];
      const label = s.debuffLabels?.[stat] || `${stat} Reduction`;
      buffsList.push(`<span style="color:#000000;">-${value}% ${label}</span>`);
    });
  }
  
  if (buffsList.length > 0) {
    buffsHtml = `
      <div class="skill-buffs-section">
        <strong>Active Effects:</strong> ${buffsList.join(" / ")}
      </div>
    `;
  }
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
            ${skillPlusIndicator}
          </h4>
        </div>
        ${isActivatable ? '<div class="skill-status"></div>' : ''}
      </div>
      <div class="skill-info">
        ${damageValuesHtml}
        ${buffsHtml}
      </div>
    </div>
  </div>
`;
skillsDiv.insertAdjacentHTML("beforeend", skillHtml);
});

      // Event listeners para passivas clicáveis (substitua o bloco original por este)
      const passiveBoxes = skillsDiv.querySelectorAll(".skill-box.passive");
      passiveBoxes.forEach(box => {
        box.addEventListener("click", () => {
          const pokemon = box.dataset.pokemon;
          const passiveKey = box.dataset.passiveKey;

          if (!activePassives[pokemon]) {
            activePassives[pokemon] = {};
          }

          // Comportamento exclusivo para o Aegislash: somente 1 passiva ativa por vez
          if (pokemon === "aegislash" || pokemon === "buzzwole") {
            const currentlyActive = !!activePassives[pokemon][passiveKey];

            // Desativa todas as passivas conhecidas antes
            ["passive", "passive1", "passive2"].forEach(k => {
              activePassives[pokemon][k] = false;
            });

            // Se a que foi clicada não estava ativa, ativa-a (caso contrário, fica tudo desativado)
            activePassives[pokemon][passiveKey] = !currentlyActive;

            // Atualiza classe visual nos cards imediatamente (opcional — calcular() também re-renderiza)
            passiveBoxes.forEach(b => {
              const pk = b.dataset.passiveKey;
              const isActiveNow = !!activePassives[pokemon][pk];
              b.classList.toggle("active", isActiveNow);
            });

          } else {
            // comportamento padrão para os outros pokemons (toggle independente)
            activePassives[pokemon][passiveKey] = !activePassives[pokemon][passiveKey];
            box.classList.toggle("active", activePassives[pokemon][passiveKey]); // feedback imediato
          }

          calcular();
        });
      });

    } else {
      skillsDiv.innerHTML = `<div class="stat-line"><span class="stat-label">Nenhuma skill disponível</span></div>`;
    }

    // Event listeners para skills ativáveis clicáveis
    const activatableSkills = skillsDiv.querySelectorAll(".skill-box.activatable");
    activatableSkills.forEach(box => {
      box.addEventListener("click", () => {
        const pokemon = box.dataset.pokemon;
        const skillKey = box.dataset.skillKey;
        
        if (!activeSkills[pokemon]) {
          activeSkills[pokemon] = {};
        }
        
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
        
        calcular();
      });
    });

    // Event listeners para itens clicáveis (passivas dos itens)
    const itemContainers = statusFinalDiv.querySelectorAll(".item-icon-container.item-clickable");
    itemContainers.forEach(container => {
      container.addEventListener("click", () => {
        const itemKey = container.dataset.item;
        activeItemPassives[itemKey] = !activeItemPassives[itemKey];
        calcular();
      });
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

  // Battle items
  battleRadios.forEach(r => r.addEventListener("change", calcular));
  
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

  // INICIALIZAÇÃO
  createRoleFilters();
  createPokemonGrid();
  filterPokemonGrid(); // Aplicar filtro inicial
  createHeldItemsGrid();
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
});