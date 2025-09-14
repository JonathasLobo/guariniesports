document.addEventListener("DOMContentLoaded", () => {
  // Elementos do seletor de Pokémon
  const pokemonCircle = document.getElementById("pokemon-circle");
  const pokemonGridPanel = document.getElementById("pokemon-grid-panel");
  const pokemonGrid = document.getElementById("pokemon-grid");
  const selectedPokemonImage = document.getElementById("selected-pokemon-image");
  const selectedPokemonName = document.getElementById("selected-pokemon-name");
  const pokemonPlaceholder = document.querySelector(".pokemon-placeholder");
  const compartilharContainer = document.getElementById("compartilhar-container");
  const btnCompartilhar = document.getElementById("btn-compartilhar");

  
  // Elementos originais
  const levelSelect = document.getElementById("nivel-final");
  const levelValor = document.getElementById("nivel-valor-final");
  const statusFinalDiv = document.getElementById("status-final");
  const skillsDiv = document.getElementById("skills-column");
  const resultado = document.getElementById("resultado");
  const battleRadios = document.querySelectorAll("input[name='battle']");
  const emblemasRadios = document.querySelectorAll("input[name='emblemas']");
  const emblemasContainer = document.getElementById("emblemas-container");
  const emblemaSelects = {
    verde: document.getElementById("emblem-verde"),
    vermelho: document.getElementById("emblem-vermelho"),
    azul: document.getElementById("emblem-azul"),
    branco: document.getElementById("emblem-branco"),
    preto: document.getElementById("emblem-preto"),
    amarelo: document.getElementById("emblem-amarelo"),
    marrom: document.getElementById("emblem-marrom"),
    roxo: document.getElementById("emblem-roxo"),
    rosa: document.getElementById("emblem-rosa"),
    azulMarinho: document.getElementById("emblem-azul-marinho"),
    cinza: document.getElementById("emblem-cinza")
  };

  // Variáveis globais
  let selectedPokemon = "";
  let selectedHeldItems = [];
  const maxHeldItems = 3;
  let activePassives = {};
  let activeItemPassives = {};

  // Mapa de Pokémon com itens fixos
  const pokemonFixedItems = {
    "zacian": "rustedsword",
    "mewtwox": "mewtwonitex",
    "mewtwoy": "mewtwonitey"
  };

  const FIXED_ONLY_ITEMS = new Set(Object.values(pokemonFixedItems));

  // Função para verificar se um item é fixo para o Pokémon atual
  const isFixedItemForCurrentPokemon = (itemKey) => {
    return selectedPokemon && pokemonFixedItems[selectedPokemon] === itemKey;
  };

  // Função para calcular cooldown com CDR
  const calculateCooldown = (baseCooldown, cdrPercent) => {
    if (!baseCooldown || baseCooldown <= 0) return null;
    
    // CDR funciona como redução percentual
    const effectiveCooldown = baseCooldown * (1 - (cdrPercent / 100));
    
    // Mínimo de 0.5 segundos
    return Math.max(0.5, effectiveCooldown);
  };

  const formatCooldown = (cooldown) => {
    if (cooldown === null || cooldown === undefined) return "";
    return `🕐 ${cooldown.toFixed(1)}s`;
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

    if (typeof passive.formula === "function") {
      const targetStat = passive.target || "SpATK";
      // Use baseStats for formula calculations to avoid order dependency
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
          // Use baseStats for percentage calculations to avoid order dependency
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
                modifiedStats.HindRed += modifiedVal;
              }
              
            }
          }
        });
      }
    });

    return modifiedStats;
  };

  // CRIAÇÃO DO GRID DE POKÉMON
  const createPokemonGrid = () => {
    pokemonGrid.innerHTML = "";
    
    Object.keys(pokemonRoles).forEach(poke => {
      const role = pokemonRoles[poke] || 'Unknown';
      const roleClass = role.toLowerCase().replace(' ', '');
      
      const gridItem = document.createElement("div");
      gridItem.className = "pokemon-grid-item";
      gridItem.dataset.pokemon = poke;
      
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
    // Atualizar seleção
    selectedPokemon = poke;
    
    // Atualizar interface do círculo
    selectedPokemonImage.src = `./estatisticas-shad/images/backgrounds/${poke}-left-bg.png`;
    selectedPokemonImage.style.display = "block";
    selectedPokemonName.textContent = safeCap(poke);
    pokemonPlaceholder.style.display = "none";
    
    // Atualizar grid
    const gridItems = pokemonGrid.querySelectorAll(".pokemon-grid-item");
    gridItems.forEach(item => {
      if (item.dataset.pokemon === poke) {
        item.classList.add("selected");
      } else {
        item.classList.remove("selected");
      }
    });
    
    // Fechar painel
    closePokemonPanel();
    
    // Limpar itens e aplicar configurações do novo Pokémon
    selectedHeldItems = [];
    activeItemPassives = {};
    inicializarBloqueioItens();
    
    // Inicializar passivas do pokémon se ainda não existirem
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
    
    calcular();
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
    
    // Criar overlay
    const overlay = document.createElement("div");
    overlay.className = "pokemon-overlay show";
    overlay.id = "pokemon-overlay";
    document.body.appendChild(overlay);
    
    overlay.addEventListener("click", closePokemonPanel);
  };

  const closePokemonPanel = () => {
    pokemonGridPanel.classList.remove("show");
    
    // Remover overlay
    const overlay = document.getElementById("pokemon-overlay");
    if (overlay) {
      overlay.remove();
    }
  };

  // SISTEMA DE HELD ITEMS
  const createHeldItemsGrid = () => {
    const grid = document.getElementById("held-items-grid");
    const selectedDisplay = document.getElementById("selected-items-display");
    
    grid.innerHTML = "";
    
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
        const stackControls = document.createElement("div");
        stackControls.className = "stack-controls";
        
        const label = document.createElement("label");
        label.textContent = "Stacks:";
        label.style.fontSize = "10px";
        label.style.color = "#fff";
        
        const slider = document.createElement("input");
        slider.type = "range";
        slider.min = "0";
        slider.max = config.max;
        slider.value = item.stacks;
        slider.className = "slider";
        slider.style.width = "60px";
        
        const value = document.createElement("span");
        value.textContent = item.stacks;
        value.style.fontSize = "10px";
        value.style.color = "#fff";
        
        slider.addEventListener("input", () => {
          item.stacks = parseInt(slider.value, 10);
          value.textContent = item.stacks;
          calcular();
        });
        
        stackControls.appendChild(label);
        stackControls.appendChild(slider);
        stackControls.appendChild(value);
        slotDiv.appendChild(stackControls);
      }
      
      container.appendChild(slotDiv);
    });
  };

const resetHeldItems = () => {
  // Salvar itens fixos antes de limpar
  const fixedItems = [];
  if (selectedPokemon && pokemonFixedItems[selectedPokemon]) {
    const fixedItem = pokemonFixedItems[selectedPokemon];
    fixedItems.push({
      key: fixedItem,
      name: gameHeldItens[fixedItem],
      stacks: 0
    });
  }
  
  // Limpar todos os itens selecionados
  selectedHeldItems = [];
  
  // Restaurar apenas os itens fixos
  selectedHeldItems = [...fixedItems];
  
  // Limpar passivas ativas dos itens
  activeItemPassives = {};
  
  // Atualizar displays
  updateGridDisplay();
  updateSelectedItemsDisplay();
  
  // Recalcular com os itens resetados
  calcular();
};

// Adicione esta função após createHeldItemsGrid()

const createResetButton = () => {
  // Verificar se já existe um botão de reset
  const existingButton = document.getElementById("reset-held-items-btn");
  if (existingButton) {
    return; // Botão já existe
  }
  
  // Criar o botão de reset
  const resetButton = document.createElement("button");
  resetButton.id = "reset-held-items-btn";
  resetButton.className = "reset-held-items-button";
  resetButton.textContent = "🗑️ Resetar Held Itens";
  resetButton.title = "Limpar todos os held items selecionados";
  
  // Adicionar event listener
  resetButton.addEventListener("click", () => {
    if (selectedHeldItems.length === 0) {
      alert("Nenhum item para resetar.");
      return;
    }
    
    // Confirmar ação se houver itens selecionados
    const hasNonFixedItems = selectedHeldItems.some(item => 
      !isFixedItemForCurrentPokemon(item.key)
    );
    
    resetHeldItems();
  });
  
  // Encontrar onde inserir o botão (após o grid de held items)
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
               onerror="this.style.display='none'" style="border: 3px solid; border-image: linear-gradient(45deg, ${roleColor}, ${roleColor}AA, ${roleColor}) 1;">
          <div class="info-jogador">${safeCap(selectedPokemon)} (Lv. ${targetLevel})</div>
          <div class="role-badge" style="background-color: ${roleColor};">${pokemonRole}</div>
        </div>
      `);
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
    // Primeiro: calcular somatório de todos os bônus "flat" por stat (vindo de gameHeldItensStatus)
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

    // Agora aplicar: começamos com base e adicionamos os bônus flat. Depois aplicamos stacks (percentuais) usando base + flatBonusesByStat.
    modified = { ...base }; // reinicia modified a partir da base para garantir consistência

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
          // Charging Charm: tem fixedBonus + parte percentual — aplicamos a parte percentual sobre base + flats
          const baseForPercent = (base[config.stat] || 0) + (flatBonusesByStat[config.stat] || 0);
          const bonusPercent = (baseForPercent * (config.perStack / 100)) * stacks;
          modified[config.stat] += (config.fixedBonus || 0) + bonusPercent;
        } else if (config.percent) {
          // itens percentuais (ex: Accel Bracer) -> aplicar percent sobre (base + todos os bônus flat deste stat)
          const totalPercentage = config.perStack * stacks;
          const baseForPercent = (base[config.stat] || 0) + (flatBonusesByStat[config.stat] || 0);
          const bonusAmount = baseForPercent * (totalPercentage / 100);
          modified[config.stat] += bonusAmount;
        } else {
          // itens de incremento flat por stack
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
      Object.keys(emblemaSelects).forEach(cor => {
        const select = emblemaSelects[cor];
        if (select && select.value) {
          const nivel = parseInt(select.value, 10);
          const emblemConfig = EMBLEM_BONUSES[cor];
          if (emblemConfig) {
            const bonus = emblemConfig.values[nivel];
            if (bonus) {
              if (cor === "cinza") {
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
        }
      });
    }

    // 5) Passiva do Pokémon
    modified = applyPassiveBuff(modified, selectedPokemon, base, targetLevel);
    modified = ensureAllStats(modified);

    const pokemonRole = pokemonRoles[selectedPokemon] || 'Unknown';
    const roleColor = rolesColor[pokemonRole] || '#666';

    const prevImg = document.querySelector(".resultado-image");
    if (prevImg) prevImg.remove();
    resultado.insertAdjacentHTML("afterbegin", `
      <div class="resultado-image role-${pokemonRole.toLowerCase().replace(' ', '')}">
        <img src="./estatisticas-shad/images/backgrounds/${selectedPokemon}-left-bg.png" alt="${safeCap(selectedPokemon)}"
             style="border: 3px solid; border-image: linear-gradient(45deg, ${roleColor}, ${roleColor}AA, ${roleColor}) 1;">
        <div class="info-jogador">${safeCap(selectedPokemon)} (Lv. ${targetLevel})</div>
        <div class="role-badge" style="background-color: ${roleColor};">${pokemonRole}</div>
      </div>
    `);

    // Status Final
    statusFinalDiv.innerHTML = STAT_KEYS
      .map(k => {
        const b = Number(base[k]) || 0;
        const m = Number(modified[k]) || 0;
        const extraFixed = (k === "DmgTaken" && modified._fixedDmgTaken) ? modified._fixedDmgTaken : null;

        if (m > b) {
          return statLine(STAT_LABELS[k], `${formatValue(k, b)} → <span style="color:limegreen;">▲ ${formatValue(k, m, extraFixed)}</span>`);
        }
        return statLine(STAT_LABELS[k], formatValue(k, m, extraFixed));
      }).join("");

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
      const activeEmblems = [];
      
      const emblemColors = {
        verde: "#28a745", vermelho: "#dc3545", azul: "#007bff", branco: "#ffffff",
        preto: "#343a40", amarelo: "#ffc107", marrom: "#8b4513", roxo: "#6f42c1",
        rosa: "#e83e8c", azulMarinho: "#1e3a8a", cinza: "#6c757d"
      };

      const emblemNames = {
        verde: "Verde", vermelho: "Vermelho", azul: "Azul", branco: "Branco",
        preto: "Preto", amarelo: "Amarelo", marrom: "Marrom", roxo: "Roxo",
        rosa: "Rosa", azulMarinho: "Azul-Marinho", cinza: "Cinza"
      };

      Object.keys(emblemaSelects).forEach(cor => {
        const select = emblemaSelects[cor];
        if (select && select.value) {
          const nivel = parseInt(select.value, 10);
          const emblemConfig = EMBLEM_BONUSES[cor];
          const color = emblemColors[cor] || "#666";
          const name = emblemNames[cor] || cor;
          
          const borderStyle = cor === "branco" ? "border: 1px solid #ccc;" : "";
          
          if (emblemConfig) {
            const bonus = emblemConfig.values[nivel];
            if (bonus) {
              if (cor === "cinza") {
                activeEmblems.push(
                  `<span style="display: inline-flex; align-items: center; margin-right: 12px;">
                    <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${color}; margin-right: 4px; ${borderStyle}"></span>
                    ${name} Lv.${nivel} (-${bonus})
                  </span>`
                );
              } else {
                activeEmblems.push(
                  `<span style="display: inline-flex; align-items: center; margin-right: 12px;">
                    <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${color}; margin-right: 4px; ${borderStyle}"></span>
                    ${name} Lv.${nivel} (+${bonus}%)
                  </span>`
                );
              }
            }
          }
        }
      });

      if (activeEmblems.length > 0) {
        statusFinalDiv.insertAdjacentHTML("beforeend", `
          <div class="stat-line">
            <span class="stat-label">Emblemas</span>
            <span class="stat-value" style="display: flex; flex-wrap: wrap; align-items: center;">
              ${activeEmblems.join("")}
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

      // Renderizar outras skills
      Object.keys(skills).forEach(key => {
        if (key === "passive" || key === "passive1" || key === "passive2") return;
        
        const s = skills[key];
        const imgPath = `./estatisticas-shad/images/skills/${selectedPokemon}_${key}.png`;
        const fallbackImg = `./estatisticas-shad/images/skills/${key}.png`;

        const isUltimate = key === "ult" || key === "ult1" || key === "ult2";
        const ultimateClass = isUltimate ? " ultimate" : "";

        // Calcular cooldown da skill
        const baseCooldown = s.cooldown || null;
        const currentCDR = modified.CDR || 0;
        const effectiveCooldown = calculateCooldown(baseCooldown, currentCDR);
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
                  // Verificar se há um atributo específico definido para heal
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
                      // Fallback para SpATK se não reconhecer o atributo
                      baseAttribute = base.SpATK;
                      modifiedAttribute = modified.SpATK;
                    }
                  } else {
                    // Comportamento padrão: usar SpATK
                    baseAttribute = base.SpATK;
                    modifiedAttribute = modified.SpATK;
                  }
                  break;
                case "shield":
                  // Para shield, usa o atributo base da fórmula mas aplica multiplicador de Shield
                  baseAttribute = base.SpATK; // ou outro atributo conforme definido
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

        const skillHtml = `
          <div class="skill-box${ultimateClass}" style="margin-bottom: 15px;">
            <img src="${imgPath}" alt="${s.name}" class="skill-icon"
                 onerror="this.onerror=null;this.src='${fallbackImg}'">
            <div class="skill-info">
              <h4>${s.name} ${cooldownDisplay ? `<span style="color:#a30404; font-size:12px; margin-left:8px;">${cooldownDisplay}</span>` : ""}</h4>
              <ul>
                ${s.formulas.map((f, index) => {
                  if (f.type === "text-only") {
                    return `<li><strong>${f.label}:</strong> <span style="color:#888; font-style:italic;">${f.additionalText}</span></li>`;
                  }
                  
                  const values = calculatedValues[index];
                  let displayText = "";
                  let hasAdditionalText = f.additionalText && f.additionalText.trim() !== "";
                  
                  if (values.hasPassiveBonus) {
                    if (Math.round(values.withPassive.modified) > Math.round(values.modified)) {
                      displayText = `${Math.round(values.modified)} → <span style="color:limegreen;">▲ ${Math.round(values.withPassive.modified)}</span>`;
                    } else {
                      displayText = `${Math.round(values.modified)} → <span style="color:limegreen;">▲ ${Math.round(values.withPassive.modified)}</span>`;
                    }
                  } else {
                    if (Math.round(values.modified) > Math.round(values.base)) {
                      displayText = `${Math.round(values.base)} → <span style="color:limegreen;">▲ ${Math.round(values.modified)}</span>`;
                    } else {
                      displayText = `${Math.round(values.modified)}`;
                    }
                  }
                  
                  if (hasAdditionalText) {
                    displayText += ` <span style="color:#888; font-style:italic;">+ ${f.additionalText}</span>`;
                  }
                  
                  return `<li><strong>${f.label}:</strong> ${displayText}</li>`;
                }).join("")}
              </ul>
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
          
          activePassives[pokemon][passiveKey] = !activePassives[pokemon][passiveKey];
          calcular();
        });
      });

    } else {
      skillsDiv.innerHTML = `<div class="stat-line"><span class="stat-label">Nenhuma skill disponível</span></div>`;
    }

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
    compartilharContainer.style.display = "block";

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

  // Level slider
  levelSelect.addEventListener("input", () => {
    levelValor.textContent = levelSelect.value;
    calcular();
  });

  // Battle items
  battleRadios.forEach(r => r.addEventListener("change", calcular));
  
  // Emblemas
  emblemasRadios.forEach(r => {
    r.addEventListener("change", () => {
      if (r.value === "sim") {
        emblemasContainer.style.display = "block";
      } else {
        emblemasContainer.style.display = "none";
      }
      calcular();
    });
  });

  Object.values(emblemaSelects).forEach(select => {
    if (select) {
      select.addEventListener("change", calcular);
    }
  });

  // INICIALIZAÇÃO
  createPokemonGrid();
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