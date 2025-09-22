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
      stat: "Ult Charge Rate", 
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

  const CUSTOM_SKILL_MAPPING = {
  absol: {
    s1: ["s12", "s21"], // Slot 1: Pursuit e Night Slash
    s2: ["s11", "s22"]  // Slot 2: Psycho Cut e Sucker Punch
  },
  }

  // Mapa de Pokémon com itens fixos
  const pokemonFixedItems = {
    "zacian": "rustedsword",
    "mewtwox": "mewtwonitex",
    "mewtwoy": "mewtwonitey"
  };

// Função para criar o seletor de skills dentro do resultado
const createSkillBuildInResult = () => {
  // Remover seletor existente se houver
  const existingSelector = document.querySelector(".skill-build-in-result");
  if (existingSelector) {
    existingSelector.remove();
  }
  
  // Verificar se temos dados de skills para este Pokémon
  if (!selectedPokemon || !skillDamage[selectedPokemon]) {
    return;
  }
  
  const resultImage = document.querySelector(".resultado-image");
  if (!resultImage) return;
  
  const skills = skillDamage[selectedPokemon];
  
  // Verificar se existem skills s11/s12 e s21/s22
  const hasS1Skills = skills.s11 || skills.s12;
  const hasS2Skills = skills.s21 || skills.s22;
  
  if (!hasS1Skills && !hasS2Skills) return;
  
  // Criar container do seletor
  const skillSelector = document.createElement("div");
  skillSelector.className = "skill-build-in-result";
  
  // Container dos slots
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
  
  // Inserir o seletor após a role badge
  const roleBadge = resultImage.querySelector(".role-badge");
  if (roleBadge) {
    roleBadge.insertAdjacentElement("afterend", skillSelector);
  } else {
    resultImage.appendChild(skillSelector);
  }
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

// Função para abrir painel de seleção de skill
const openSkillSelectionPanel = (pokemon, slotKey, slotContainer) => {
  // Fechar qualquer painel existente
  closeSkillSelectionPanel();
  
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

// Função para mostrar o painel
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
  
  // Função para calcular cooldown com CDR global e self-CDR específico da skill
  const calculateCooldownForSkill = (baseCooldown, globalCDR, skillKey, modifiedStats) => {
    if (!baseCooldown || baseCooldown <= 0) return null;
    
    let totalCDR = globalCDR || 0;
    
    // Adicionar self-CDR específico da skill, se existir
    if (modifiedStats._selfBuffs && modifiedStats._selfBuffs[skillKey] && modifiedStats._selfBuffs[skillKey].CDR) {
      totalCDR += modifiedStats._selfBuffs[skillKey].CDR;
    }
    
    // Limitar CDR a 90% para evitar cooldowns muito baixos
    totalCDR = Math.min(totalCDR, 90);
    
    const effectiveCooldown = baseCooldown * (1 - (totalCDR / 100));
    return Math.max(0.5, effectiveCooldown);
  };

  // Função para calcular cooldown com CDR
  const calculateCooldown = (baseCooldown, cdrPercent) => {
    if (!baseCooldown || baseCooldown <= 0) return null;
    const effectiveCooldown = baseCooldown * (1 - (cdrPercent / 100));
    return Math.max(0.5, effectiveCooldown);
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
    "SpDEFPen"
  ];

  const STAT_LABELS = {
    HP: "HP", ATK: "ATK", DEF: "DEF",
    SpATK: "Sp. ATK", SpDEF: "Sp. DEF", Speed: "Speed",
    AtkSPD: "Atk Speed", CDR: "Cooldown Reduction",
    CritRate: "Crit Rate", CritDmg: "Crit Dmg",
    Lifesteal: "Lifesteal", HPRegen: "HP Regen",
    EnergyRate: "Energy Rate", Shield: "Shield", 
    DmgTaken: "Dmg Taken Reduction", HindRed: "Hindrance Reduction",
    SpDEFPen: "Sp. DEF Penetration"
  };

  const PERCENT_KEYS = new Set(["AtkSPD","CDR","CritRate","CritDmg","Lifesteal","EnergyRate", "HPRegen", "Shield", "DmgTaken", "HindRed", "SpDEFPen"]);

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

  // Substitua a função applyActiveSkillBuffs pela versão melhorada
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

    // Aplicar buffs básicos GLOBAIS da skill (afetam o personagem inteiro)
    if (skill.buff) {
      Object.keys(skill.buff).forEach(stat => {
        if (modifiedStats.hasOwnProperty(stat)) {
          const rawVal = skill.buff[stat];
          const isPercentString = (typeof rawVal === "string" && rawVal.includes("%"));
          const numeric = parseFloat(String(rawVal).replace("%","").replace("+","").replace(",", "."));

          if (!Number.isFinite(numeric)) return;

          if (PERCENT_KEYS.has(stat) && stat !== "DmgTaken") {
            modifiedStats[stat] += numeric;
          } else if (stat === "DmgTaken") {
            if (isPercentString) {
              modifiedStats[stat] += numeric;
            } else {
              modifiedStats[stat] += numeric;
            }
          } else {
            if (isPercentString) {
              modifiedStats[stat] += baseStats[stat] * (numeric / 100);
            } else {
              modifiedStats[stat] += numeric;
            }
          }
        }
      });
    }

    // Aplicar SELF-BUFFS básicos (afetam apenas a skill específica)
    if (skill.selfBuff) {
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
    if (skill.buffPlus && currentLevel >= skill.buffPlus.levelRequired) {
      Object.keys(skill.buffPlus.buffs).forEach(stat => {
        if (modifiedStats.hasOwnProperty(stat)) {
          const rawVal = skill.buffPlus.buffs[stat];
          const isPercentString = (typeof rawVal === "string" && rawVal.includes("%"));
          const numeric = parseFloat(String(rawVal).replace("%","").replace("+","").replace(",", "."));

          if (!Number.isFinite(numeric)) return;

          if (PERCENT_KEYS.has(stat) && stat !== "DmgTaken") {
            modifiedStats[stat] += numeric;
          } else if (stat === "DmgTaken") {
            if (isPercentString) {
              modifiedStats[stat] += numeric;
            } else {
              modifiedStats[stat] += numeric;
            }
          } else {
            if (isPercentString) {
              modifiedStats[stat] += baseStats[stat] * (numeric / 100);
            } else {
              modifiedStats[stat] += numeric;
            }
          }
        }
      });
    }

    // Aplicar SELF-BUFFS Plus (baseado no nível atual, afetam apenas a skill específica)
    if (skill.selfBuffPlus && currentLevel >= skill.selfBuffPlus.levelRequired) {
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

    // Aplicar efeitos especiais da skill
    if (skill.activeEffect) {
      if (typeof skill.activeEffect === "function") {
        modifiedStats = skill.activeEffect(modifiedStats, baseStats);
      }
    }

    // Acumular debuffs
    if (skill.debuffs) {
      Object.keys(skill.debuffs).forEach(debuffStat => {
        const debuffValue = skill.debuffs[debuffStat];
        
        if (!debuffsAcumulados[debuffStat]) {
          debuffsAcumulados[debuffStat] = {
            total: 0,
            skills: []
          };
        }
        
        debuffsAcumulados[debuffStat].total += debuffValue;
        debuffsAcumulados[debuffStat].skills.push({
          name: skill.name,
          value: debuffValue
        });
      });
    }
  });

  // Armazenar debuffs acumulados para exibição
  if (Object.keys(debuffsAcumulados).length > 0) {
    modifiedStats._debuffsAcumulados = {};
    
    Object.keys(debuffsAcumulados).forEach(debuffStat => {
      const debuffData = debuffsAcumulados[debuffStat];
      const debuffLabel = `(DEBUFF) ${debuffStat} Reduction`;
      
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
  // Função para aplicar buff da passiva (do Pokémon)
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

      if (passive.buff) {
        Object.keys(passive.buff).forEach(stat => {
          if (modifiedStats.hasOwnProperty(stat)) {
            const rawVal = passive.buff[stat];
            const isPercentString = (typeof rawVal === "string" && rawVal.includes("%"));
            const numeric = parseFloat(String(rawVal).replace("%","").replace("+","").replace(",", "."));

            if (!Number.isFinite(numeric)) return;

            if (PERCENT_KEYS.has(stat) && stat !== "DmgTaken") {
              modifiedStats[stat] += numeric;
            } else if (stat === "DmgTaken") {
              if (isPercentString) {
                modifiedStats[stat] += numeric;
              } else {
                modifiedStats[stat] += numeric;
              }
            } else {
              if (isPercentString) {
                modifiedStats[stat] += baseStats[stat] * (numeric / 100);
              } else {
                modifiedStats[stat] += numeric;
              }
            }
          }
        });
      }

      if (passive.formulas && passive.formulas.length > 0) {
        passive.formulas.forEach((f, index) => {
          if (f.type !== "text-only" && f.type !== "dependent") {
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
            
            if (f.affects === "nextBasicAttack") {
              if (!passive.nextBasicAttackBonus) passive.nextBasicAttackBonus = {};
              passive.nextBasicAttackBonus = {
                base: baseVal,
                modified: modifiedVal,
                label: f.label
              };
            } else if (f.affects) {
              const statKey = f.affects.toUpperCase();
              if (modifiedStats.hasOwnProperty(statKey)) {
                modifiedStats[statKey] += modifiedVal;
              }
            } else {
              const label = f.label.toLowerCase();
              
              if (label.includes("defense") && !label.includes("special")) {
                modifiedStats.DEF += modifiedVal;
              } else if (label.includes("special defense") || label.includes("sp. defense") || label.includes("spdef")) {
                modifiedStats.SpDEF += modifiedVal;
              } else if (label.includes("attack") && !label.includes("special")) {
                modifiedStats.ATK += modifiedVal;
              } else if (label.includes("special attack") || label.includes("sp. attack") || label.includes("spatk")) {
                modifiedStats.SpATK += modifiedVal;
              } else if (label.includes("hp") || label.includes("health")) {
                modifiedStats.HP += modifiedVal;
              } else if (label.includes("speed")) {
                modifiedStats.Speed += modifiedVal;
              } else if (label.includes("crit") && label.includes("rate")) {
                modifiedStats.CritRate += modifiedVal;
              } else if (label.includes("crit") && label.includes("dmg")) {
                modifiedStats.CritDmg += modifiedVal;
              } else if (label.includes("lifesteal")) {
                modifiedStats.Lifesteal += modifiedVal;
              } else if (label.includes("cdr") || label.includes("cooldown")) {
                modifiedStats.CDR += modifiedVal;
              } else if (label.includes("atkspd") || label.includes("attack speed")) {
                modifiedStats.AtkSPD += modifiedVal;
              } else if (label.includes("dmgtaken") || label.includes("dmg taken")) {
                modifiedStats.DmgTaken += modifiedVal;
              } else if (label.includes("hindred") || label.includes("hindrance reduction")) {
                modifiedStats.HindRed += modifiedVal;
              } else if (label.includes("spdefpen") || label.includes("spdef penetration")) {
                modifiedStats.SpDEFPen += modifiedVal;
              }
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

  // FUNÇÃO DE CÁLCULO
  const calcular = () => {
    const targetLevel = parseInt(levelSelect.value, 10) || 1;
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
    const flatBonusesByStat = {};
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
          HindRed: "HindRed", SPDEFPEN: "SpDEFPen"
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
          HindRed: "HindRed", SPDEFPEN: "SpDEFPen"
        };
        const prop = map[key];
        if (!prop) return;
        const amount = parseFloat(valStr.replace(",", "."));
        if (!isNaN(amount)) {
          modified[prop] += amount;
        }
      });

      if (STACKABLE_ITEMS[itemName]) {
        const config = STACKABLE_ITEMS[itemName];
        const stacks = selectedItem.stacks || 0;

        if (itemName === "Charging Charm") {
          const baseForPercent = (base[config.stat] || 0) + (flatBonusesByStat[config.stat] || 0);
          const bonusPercent = (baseForPercent * (config.perStack / 100)) * stacks;
          modified[config.stat] += (config.fixedBonus || 0) + bonusPercent;
        } else if (config.percent) {
          const totalPercentage = config.perStack * stacks;
          const baseForPercent = (base[config.stat] || 0) + (flatBonusesByStat[config.stat] || 0);
          const bonusAmount = baseForPercent * (totalPercentage / 100);
          modified[config.stat] += bonusAmount;
        } else {
          modified[config.stat] += config.perStack * stacks;
        }
      }
    });

    // 2) Aplicar passivos dos itens
    modified = applyItemPassiveEffects(base, modified, selectedItems);

    // 3) Battle Items
    let selectedBattle = "";
    battleRadios.forEach(r => { if (r.checked) selectedBattle = r.value; });

    if (selectedBattle === "xattack") {
      modified.ATK += base.ATK * 0.20;
      modified.SpATK += base.SpATK * 0.20;
      modified.AtkSPD += base.AtkSPD * 0.25;
    }
    if (selectedBattle === "xspeed") {
      modified.Speed += base.Speed * 0.45;
    }
    if (selectedBattle === "potion") {
      const potionHealing = 160 + (modified.HP * 0.20);
      modified.HP += potionHealing;
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
            if (emblemKey === "cinza") {
              modified.DmgTaken += 0;
              if (!modified._fixedDmgTaken) modified._fixedDmgTaken = 0;
              modified._fixedDmgTaken += bonus;
            } else if (PERCENT_KEYS.has(emblemConfig.stat)) {
              modified[emblemConfig.stat] += bonus;
            } else {
              modified[emblemConfig.stat] += base[emblemConfig.stat] * (bonus / 100);
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
    </div>
  `);
  createSkillBuildInResult();

    // Status Final
    statusFinalDiv.innerHTML = STAT_KEYS
      .map(k => {
        const b = Number(base[k]) || 0;
        const m = Number(modified[k]) || 0;
        const extraFixed = (k === "DmgTaken" && modified._fixedDmgTaken) ? modified._fixedDmgTaken : null;

        // Se o valor modificado é maior que o base (buff)
        if (m > b) {
          return statLine(STAT_LABELS[k], `${formatValue(k, b)} → <span style="color:limegreen;">▲ ${formatValue(k, m, extraFixed)}</span>`);
        }
        // Se o valor modificado é menor que o base (debuff/redução)
        else if (m < b) {
          return statLine(STAT_LABELS[k], `${formatValue(k, b)} → <span style="color:red;">▼ ${formatValue(k, m, extraFixed)}</span>`);
        }
        // Se são iguais (sem modificação)
        return statLine(STAT_LABELS[k], formatValue(k, m, extraFixed));
      }).join("");

      // Mostrar debuffs ativos (com padrão de incremento)
      if (modified._debuffsAcumulados && Object.keys(modified._debuffsAcumulados).length > 0) {
      Object.values(modified._debuffsAcumulados).forEach(debuff => {
        const baseValue = 0;
        const modifiedValue = debuff.value;
        
        const valueHtml = `${baseValue}% → <span style="color:limegreen;">▲ ${modifiedValue}%</span>`;
        
        statusFinalDiv.insertAdjacentHTML("beforeend", 
          statLine(`${debuff.label}`, valueHtml)
        );
      });
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
                 style="width:40px; height:40px; margin:0 5px;">
            ${hasPassive ? '<div class="item-passive-dot"></div>' : ''}
          </div>
        `;
      }).join("");
      
      statusFinalDiv.insertAdjacentHTML("beforeend", `
        <div class="stat-line">
          <span class="stat-label">Itens</span>
          <span class="stat-value" style="display: flex; flex-direction: row; align-items: center; flex-wrap: wrap; gap: 8px;">
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
          
          const borderStyle = emblem.color === "#ffffff" ? "border: 1px solid #ccc;" : "";
          
          if (emblemKey === "cinza") {
            return `<span style="display: inline-flex; align-items: center; margin-right: 12px;">
              <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${emblem.color}; margin-right: 4px; ${borderStyle}"></span>
              ${emblem.name} Lv.${level} (-${bonus})
            </span>`;
          } else {
            return `<span style="display: inline-flex; align-items: center; margin-right: 12px;">
              <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${emblem.color}; margin-right: 4px; ${borderStyle}"></span>
              ${emblem.name} Lv.${level} (+${bonus}%)
            </span>`;
          }
        }).join("");

        statusFinalDiv.insertAdjacentHTML("beforeend", `
          <div class="stat-line">
            <span class="stat-label">Emblemas</span>
            <span class="stat-value" style="display: flex; flex-wrap: wrap; align-items: center;">
              ${activeEmblems}
            </span>
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
        <div class="stat-line">
          <span class="stat-label">Battle Item</span>
          <span class="stat-value">${battleImg}</span>
        </div>
      `);
    }

    // Cálculo das skills
    skillsDiv.innerHTML = "";

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

      // Renderizar outras skills (dentro da função calcular)
// Na função calcular, na parte de renderização das skills:

// Renderizar outras skills (substitua toda a seção Object.keys(skills).forEach na função calcular)
Object.keys(skills).forEach(key => {
  if (key === "passive" || key === "passive1" || key === "passive2") return;
  
  const s = skills[key];
  const imgPath = `./estatisticas-shad/images/skills/${selectedPokemon}_${key}.png`;
  const fallbackImg = `./estatisticas-shad/images/skills/${key}.png`;

  const isUltimate = key === "ult" || key === "ult1" || key === "ult2";
  const ultimateClass = isUltimate ? " ultimate" : "";
  
  // Verificar se a skill é ativável
  const isActivatable = activeSkills[selectedPokemon] && activeSkills[selectedPokemon].hasOwnProperty(key);
  const isActiveSkill = isActivatable && activeSkills[selectedPokemon][key];
  const activatableClass = isActivatable ? " activatable" : "";
  const activeClass = isActiveSkill ? " active" : "";
  
  // Verificar se tem skill plus
  const hasSkillPlus = (s.buffPlus && s.buffPlus.levelRequired) || (s.selfBuffPlus && s.selfBuffPlus.levelRequired);
  
  // Verificar se o skill plus está ativo
  const buffPlusActive = s.buffPlus && currentLevel >= s.buffPlus.levelRequired;
  const selfBuffPlusActive = s.selfBuffPlus && currentLevel >= s.selfBuffPlus.levelRequired;
  const isPlusActive = buffPlusActive || selfBuffPlusActive;

  // Calcular cooldown da skill com CDR específico
  const baseCooldown = s.cooldown || null;
  const globalCDR = modified.CDR || 0;
  const effectiveCooldown = calculateCooldownForSkill(baseCooldown, globalCDR, key, modified);
  const cooldownDisplay = formatCooldown(effectiveCooldown);

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
        
        baseVal = f.formula(baseAttribute, targetLevel, base.HP);
        modifiedVal = f.formula(modifiedAttribute, targetLevel, modified.HP);

        // Aplicar bônus do Razor Claw apenas para ataques básicos e boosted
        if (selectedItems.includes("razorclaw") && activeItemPassives["razorclaw"]) {
          const basicAttackKeys = ['basic', 'basicattack', 'atkboosted'];
          if (basicAttackKeys.includes(key)) {
            const razorClawBonus = 20 + (base.ATK * 0.5);
            baseVal += razorClawBonus;
            modifiedVal += razorClawBonus;
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
  let skillPlusIndicatorInline = "";
  if (hasSkillPlus) {
    const plusStatus = isPlusActive ? "active" : "inactive";
    const levelReq = s.buffPlus?.levelRequired || s.selfBuffPlus?.levelRequired || 11;
    const plusText = isPlusActive ? "PLUS" : `LV${levelReq}+`;
    skillPlusIndicatorInline = `<span class="skill-plus-indicator ${plusStatus}">${plusText}</span>`;
  }
  
// Criar seção de buffs plus para exibir na descrição
let skillPlusBuffsHtml = "";
if (hasSkillPlus && isActiveSkill) {
  let plusBuffsList = [];
  
  // Buffs globais plus
  if (s.buffPlus && buffPlusActive) {
    Object.keys(s.buffPlus.buffs).forEach(stat => {
      const value = s.buffPlus.buffs[stat];
      const label = STAT_LABELS[stat] || stat;
      
      let formattedValue, colorClass;
      if (value >= 0) {
        // Buff positivo
        formattedValue = PERCENT_KEYS.has(stat) ? `+${value}%` : `+${value}`;
        colorClass = "limegreen";
      } else {
        // Debuff negativo
        formattedValue = PERCENT_KEYS.has(stat) ? `${value}%` : `${value}`;
        colorClass = "red";
      }
      
      plusBuffsList.push(`<span style="color:${colorClass};">${label}: ${formattedValue}</span>`);
    });
  }
  
  // Self-buffs plus
  if (s.selfBuffPlus && selfBuffPlusActive) {
    Object.keys(s.selfBuffPlus.buffs).forEach(stat => {
      const value = s.selfBuffPlus.buffs[stat];
      const label = STAT_LABELS[stat] || stat;
      
      let formattedValue, colorClass;
      if (value >= 0) {
        // Buff positivo
        formattedValue = PERCENT_KEYS.has(stat) ? `+${value}%` : `+${value}`;
        colorClass = "limegreen";
      } else {
        // Debuff negativo
        formattedValue = PERCENT_KEYS.has(stat) ? `${value}%` : `${value}`;
        colorClass = "red";
      }
      
      plusBuffsList.push(`<span style="color:${colorClass};">${label}: ${formattedValue}</span> (Self)`);
    });
  }
  
  if (plusBuffsList.length > 0) {
    const plusActiveClass = isPlusActive ? "active" : "inactive";
    const levelReq = s.buffPlus?.levelRequired || s.selfBuffPlus?.levelRequired || 11;
    
    skillPlusBuffsHtml = `
      <div class="skill-plus-separator">
        <li class="skill-plus-buffs ${plusActiveClass}">
          <strong>Skill Plus (Lv${levelReq}+):</strong> ${plusBuffsList.join(", ")}
        </li>
      </div>
    `;
  }
}

// E também para os self-buffs básicos:
let selfBuffsHtml = "";
if (s.selfBuff && isActiveSkill) {
  const selfBuffsList = Object.keys(s.selfBuff).map(stat => {
    const value = s.selfBuff[stat];
    const label = STAT_LABELS[stat] || stat;
    
    let formattedValue, colorClass;
    if (value >= 0) {
      // Buff positivo
      formattedValue = PERCENT_KEYS.has(stat) ? `+${value}%` : `+${value}`;
      colorClass = "limegreen";
    } else {
      // Debuff negativo
      formattedValue = PERCENT_KEYS.has(stat) ? `${value}%` : `${value}`;
      colorClass = "red";
    }
    
    return `<span style="color:${colorClass};">${label}: ${formattedValue}</span>`;
  }).join(", ");
  
  selfBuffsHtml = `
    <li style="color: #2cb7f7ff; font-style: italic;">
      <strong>Self Buffs:</strong> ${selfBuffsList}
    </li>
  `;
}

  const skillHtml = `
    <div class="skill-box${ultimateClass}${activatableClass}${activeClass}" data-pokemon="${selectedPokemon}" data-skill-key="${key}" style="margin-bottom: 15px;">
      <img src="${imgPath}" alt="${s.name}" class="skill-icon"
          onerror="this.onerror=null;this.src='${fallbackImg}'">
      <div class="skill-info">
        <h4>${s.name}${cooldownDisplay ? `<span style="color:#a30404; font-size:12px; margin-left:8px;">${cooldownDisplay}</span>` : ""}${skillPlusIndicatorInline}</h4>
        <ul>
          ${s.formulas.map((f, index) => {
            if (f.type === "text-only") {
              return `<li><strong>${f.label}:</strong> <span style="color:#888; font-style:italic;">${f.additionalText}</span></li>`;
            }
            
            const values = calculatedValues[index];
            let displayText = "";
            let hasAdditionalText = f.additionalText && f.additionalText.trim() !== "";
            
            if (values?.hasPassiveBonus) {
              if (Math.round(values.withPassive.modified) > Math.round(values.modified)) {
                displayText = `${Math.round(values.modified)} → <span style="color:limegreen;">▲ ${Math.round(values.withPassive.modified)}</span>`;
              } else {
                displayText = `${Math.round(values.modified)} → <span style="color:limegreen;">▲ ${Math.round(values.withPassive.modified)}</span>`;
              }
            } else if (values) {
              if (Math.round(values.modified) > Math.round(values.base)) {
                displayText = `${Math.round(values.base)} → <span style="color:limegreen;">▲ ${Math.round(values.modified)}</span>`;
              } else {
                displayText = `${Math.round(values.modified)}`;
              }
            } else {
              displayText = "0";
            }
            
            if (hasAdditionalText) {
              displayText += ` <span style="color:#888; font-style:italic;">+ ${f.additionalText}</span>`;
            }
            
            return `<li><strong>${f.label}:</strong> ${displayText}</li>`;
          }).join("")}
          ${selfBuffsHtml}
          ${skillPlusBuffsHtml}
        </ul>
      </div>
      ${isActivatable ? '<div class="skill-status"></div>' : ''}
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
          
          activePassives[pokemon][passiveKey] = !activePassives[pokemon][passiveKey];
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