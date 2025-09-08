document.addEventListener("DOMContentLoaded", () => {
  const pokemonSelect = document.getElementById("pokemon");
  const levelSelect = document.getElementById("nivel-final");
  const levelValor = document.getElementById("nivel-valor-final");
  const itemSlots = document.querySelectorAll(".item-slot");
  const btnResetar = document.getElementById("resetar");
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

  // Estado das passivas ativas
  let activePassives = {};
  // Estado das passivas dos itens ativas
  let activeItemPassives = {};

  if (btnResetar) btnResetar.type = "button";

  // ---- Configuração de atributos ----
  const STAT_KEYS = [
    "HP","ATK","DEF","SpATK","SpDEF","Speed",
    "AtkSPD","CDR","CritRate","CritDmg","Lifesteal",
    "HPRegen","EnergyRate", "Shield"
  ];

  const STAT_LABELS = {
    HP: "HP", ATK: "ATK", DEF: "DEF",
    SpATK: "Sp. ATK", SpDEF: "Sp. DEF", Speed: "Speed",
    AtkSPD: "Atk Speed", CDR: "Cooldown Reduction",
    CritRate: "Crit Rate", CritDmg: "Crit Dmg",
    Lifesteal: "Lifesteal", HPRegen: "HP Regen",
    EnergyRate: "Energy Rate", Shield: "Shield"
  };

  const PERCENT_KEYS = new Set(["AtkSPD","CDR","CritRate","CritDmg","Lifesteal","EnergyRate", "HPRegen", "Shield"]);

  // Cores das roles
  const rolesColor = {
    'Speedster': '#2492c9',
    'All Rounder': '#ce5fd3',
    'Support': '#e1b448',
    'Defender': '#9bd652',
    'Attacker': '#f16c38'
  };

  // Passivas dos itens - agora usando a constante gameHeldItensPassive
  const gameHeldItensPassive = {
    "wiseglasses": { SpATK: "+7%" },
    "scopelens": { CritRate: "+6%", CritDmg: "+12%" },
    "muscleband": {},
    "leftovers": { HPRegen: "+4%"},
    "focusband": { HPRegen: "+25%"},
    "choicespecs": { formula: (stats) => 60 + (stats.SpATK * 0.4) },
    "draincrown": { Lifesteal: "+15%"},
    "energyamplifier": { ATK: "+21%", SpATK: "+21%"},
    "floatstone": { Speed: "+20%"},
    "razorclaw": { formula: (stats) => 20 + (stats.SpATK * 0.5)},
    "scoreshield": { Shield: "+10%"},
    "rapidscarf": { AtkSPD: "+25%"},
    "rescuehood": { Shield: "+17%"},
    "resonantguard": { Shield: "+6%"}
  };

  const ensureAllStats = (obj) => {
    const out = { ...obj };
    STAT_KEYS.forEach(k => { if (out[k] === undefined) out[k] = 0; });
    return out;
  };

  const formatValue = (key, val) => {
    if (val === null || val === undefined || Number.isNaN(Number(val))) return "-";
    if (PERCENT_KEYS.has(key)) return `${Number(val).toFixed(1)}%`;
    return Math.round(Number(val));
  };

  const statLine = (label, valueHtml) =>
    `<div class="stat-line"><span class="stat-label">${label}</span><span class="stat-value">${valueHtml}</span></div>`;

  const safeCap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;

  // ---- Itens que stackam ----
  const STACKABLE_ITEMS = {
    "Attack Weight": { stat: "ATK", perStack: 12, max: 6, percent: false, startFromZero: true },
    "Sp. Atk Specs": { stat: "SpATK", perStack: 16, max: 6, percent: false, startFromZero: true },
    "Aeos Cookie": { stat: "HP", perStack: 200, max: 6, percent: false, startFromZero: true },
    "Accel Bracer": { stat: "ATK", perStack: 0.6, max: 20, percent: true, startFromZero: true },
    "Drive Lens": { stat: "SpATK", perStack: 0.6, max: 20, percent: true, startFromZero: true },
    "Weakness Police": { stat: "ATK", perStack: 2.5, max: 4, percent: true, startFromZero: true },
    "Charging Charm": { stat: "ATK", perStack: 70, max: 1, percent: true, fixedBonus: 40, startFromZero: true }
  };

  const ITEM_PASSIVE_FALLBACK = {
    wiseglasses: { SpATK: "+7%" }
  };

  const getItemPassivesSource = () => {
    return gameHeldItensPassive;
  };

  /**
   * ---- Função para aplicar efeitos passivos dos itens ----
   * Ordem correta: aplicar DEPOIS de somar bônus fixos/stacks dos itens.
   * Regras:
   *  - Se o atributo é percentual (em PERCENT_KEYS), somar pontos percentuais.
   *  - Caso contrário:
   *      * "+X%" => aplicar sobre o valor ATUAL (modified) daquele atributo.
   *      * número puro => somar valor fixo.
   * NOVO: só aplicar se o item estiver ativo em activeItemPassives
   */
  const applyItemPassiveEffects = (baseStats, modifiedStats, selectedItems) => {
    const passives = getItemPassivesSource();
    let result = ensureAllStats({ ...modifiedStats });

    selectedItems.forEach(itemKey => {
      // Só aplicar se a passiva do item estiver ativa
      if (!activeItemPassives[itemKey]) return;
      
      const passive = passives[itemKey];
      if (!passive) return;

       // 🔹 Caso especial: fórmula
      if (typeof passive.formula === "function") {
        // Choice Specs -> incrementa o dano baseado em SpATK
        result.SpATK += passive.formula(result);
        return;
      }

      Object.entries(passive).forEach(([stat, rawVal]) => {
        if (!STAT_KEYS.includes(stat)) return;

        const isPercentString = (typeof rawVal === "string" && rawVal.includes("%"));
        const numeric = parseFloat(String(rawVal).replace("%","").replace(",", "."));
        if (!Number.isFinite(numeric)) return;

        // Atributos percentuais: somar pontos percentuais
        if (PERCENT_KEYS.has(stat)) {
          // "+7%" -> soma 7 pontos; "3" -> soma 3 pontos
          result[stat] += numeric;
        } else {
          // Atributos não percentuais: % escala sobre o valor ATUAL (após bônus fixos/stacks)
          if (isPercentString) {
            const baseForBuff = Number(result[stat]) || 0;
            result[stat] += baseForBuff * (numeric / 100);
          } else {
            result[stat] += numeric;
          }
        }
      });
    });

    return ensureAllStats(result);
  };

  // ---- Emblemas ----
  const EMBLEM_BONUSES = {
    verde: { stat: "SpATK", values: { 2: 1, 4: 2, 6: 4 } },
    vermelho: { stat: "AtkSPD", values: { 3: 2, 5: 4, 7: 8 } },
    azul: { stat: "DEF", values: { 2: 2, 4: 4, 6: 8 } },
    branco: { stat: "HP", values: { 2: 1, 4: 2, 6: 4 } },
    preto: { stat: "CDR", values: { 3: 1, 5: 2, 7: 4 } },
    amarelo: { stat: "Speed", values: { 3: 4, 5: 6, 7: 12 } },
    marrom: { stat: "ATK", values: { 2: 1, 4: 2, 6: 4 } },
    roxo: { stat: "SpDEF", values: { 2: 2, 4: 4, 6: 8 } }
  };

  // ---- Função para aplicar buff da passiva (do Pokémon) ----
  const applyPassiveBuff = (stats, pokemon, baseStats, targetLevel) => {
    if (!skillDamage[pokemon]) {
      return stats;
    }

    let modifiedStats = { ...stats };
    const skills = skillDamage[pokemon];

    // Tratar múltiplas passivas (passive, passive1, passive2)
    const passiveKeys = ['passive', 'passive1', 'passive2'].filter(key => skills[key]);
    
    passiveKeys.forEach(passiveKey => {
      if (!activePassives[pokemon] || !activePassives[pokemon][passiveKey]) {
        return;
      }

      const passive = skills[passiveKey];

      // Aplicar buffs de status se existirem
      if (passive.buff) {
        Object.keys(passive.buff).forEach(stat => {
          if (modifiedStats.hasOwnProperty(stat)) {
            const rawVal = passive.buff[stat];
            const isPercentString = (typeof rawVal === "string" && rawVal.includes("%"));
            const numeric = parseFloat(String(rawVal).replace("%","").replace("+","").replace(",", "."));

            if (!Number.isFinite(numeric)) return;

            // CORREÇÃO: Verificar se o stat está em PERCENT_KEYS
            if (PERCENT_KEYS.has(stat)) {
              // Para stats percentuais (como Speed, AtkSPD, etc), sempre somar pontos diretos
              modifiedStats[stat] += numeric;
            } else {
              // Para stats não percentuais (HP, ATK, DEF, etc)
              if (isPercentString) {
                // Se tem "%" na string, aplicar como percentual do valor base
                modifiedStats[stat] += baseStats[stat] * (numeric / 100);
              } else {
                // Se não tem "%" na string, aplicar como valor fixo
                modifiedStats[stat] += numeric;
              }
            }
          }
        });
      }

      // Processar fórmulas da passiva se existirem e aplicar aos stats
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
              }
            }
          }
        });
      }
    });

    return modifiedStats;
  };

  // ---- Função de cálculo ----
  const calcular = () => {
    const poke = pokemonSelect.value;
    const targetLevel = parseInt(levelSelect.value, 10) || 1;
    if (!poke) {
      resultado.style.display = "none";
      return;
    }

    // Resetar valores calculados das passivas
    if (skillDamage[poke]) {
      const skills = skillDamage[poke];
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

    // Verificação se o Pokémon tem dados no baseStats
    if (!baseStats[poke]) {
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
      
      // Obter a role e a cor da role
      const pokemonRole = pokemonRoles[poke] || 'Unknown';
      const roleColor = rolesColor[pokemonRole] || '#666';
      
      const prevImg = document.querySelector(".resultado-image");
      if (prevImg) prevImg.remove();
      resultado.insertAdjacentHTML("afterbegin", `
        <div class="resultado-image role-${pokemonRole.toLowerCase().replace(' ', '')}">
          <img src="./estatisticas-shad/images/backgrounds/${poke}-left-bg.png" alt="${safeCap(poke)}"
               onerror="this.style.display='none'" style="border: 3px solid; border-image: linear-gradient(45deg, ${roleColor}, ${roleColor}AA, ${roleColor}) 1;">
          <div class="info-jogador">${safeCap(poke)} (Lv. ${targetLevel})</div>
          <div class="role-badge" style="background-color: ${roleColor};">${pokemonRole}</div>
        </div>
      `);
      return;
    }

    let base =
      (typeof levelStats !== "undefined" && levelStats?.[poke]?.[targetLevel])
        ? { ...levelStats[poke][targetLevel] }
        : { ...baseStats[poke] };

    base = ensureAllStats(base);
    let modified = { ...base };

    // Coletar itens selecionados (chaves como 'wiseglasses', 'muscleband', etc.)
    const selectedItems = [];
    itemSlots.forEach(slot => {
      const sel = slot.querySelector(".held-item");
      if (sel.value) {
        selectedItems.push(sel.value);
      }
    });

    // 1) Aplicar bônus normais dos itens (util.js) e stacks
    itemSlots.forEach(slot => {
      const sel = slot.querySelector(".held-item");
      if (!sel.value) return;
      
      const itemName = gameHeldItens[sel.value];

      // Bônus base do util.js
      const bonuses = gameHeldItensStatus?.[sel.value] || [];
      bonuses.forEach(b => {
        const parts = String(b).split(" +");
        const rawStat = parts[0] || "";
        const valStr = parts[1] || "0";
        const key = rawStat.replace(/[^a-z]/gi, "").toUpperCase();
        const map = {
          HP:"HP",ATK:"ATK",DEF:"DEF",SPATK:"SpATK",SPDEF:"SpDEF",SPEED:"Speed",
          ATKSPD:"AtkSPD",CDR:"CDR",CRITRATE:"CritRate",CRITDMG:"CritDmg",
          LIFESTEAL:"Lifesteal",HPREGEN:"HPRegen",ENERGYRATE:"EnergyRate"
        };
        const prop = map[key];
        if (!prop) return;
        const amount = parseFloat(valStr.replace(",", "."));
        if (!isNaN(amount)) {
          modified[prop] += amount;
        }
      });

      // Stacks (se aplicável)
      if (STACKABLE_ITEMS[itemName]) {
        const config = STACKABLE_ITEMS[itemName];
        const range = slot.querySelector(".stack-range");
        const stacks = range ? parseInt(range.value, 10) || 0 : 0;

        if (itemName === "Charging Charm") {
          const bonusPercent = (base[config.stat] * (config.perStack / 100)) * stacks;
          modified[config.stat] += config.fixedBonus + bonusPercent; // 40 fixo + 70% do ATK base
        } else if (config.percent) {
          const bonus = (base[config.stat] * (config.perStack / 100)) * stacks;
          modified[config.stat] += bonus;
        } else {
          modified[config.stat] += config.perStack * stacks;
        }
      }
    });

    // 2) AGORA aplicar os passivos dos itens (sobre o valor já modificado pelos bônus fixos/stacks)
    // Só aplicar se estiver ativo em activeItemPassives
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
              if (PERCENT_KEYS.has(emblemConfig.stat)) {
                modified[emblemConfig.stat] += bonus;
              } else {
                modified[emblemConfig.stat] += base[emblemConfig.stat] * (bonus / 100);
              }
            }
          }
        }
      });
    }

    // 5) Passiva do Pokémon (se ativa)
    modified = applyPassiveBuff(modified, poke, base, targetLevel);
    modified = ensureAllStats(modified);

    // Obter a role e a cor da role
    const pokemonRole = pokemonRoles[poke] || 'Unknown';
    const roleColor = rolesColor[pokemonRole] || '#666';

    // Imagem do Pokémon com borda da cor da role
    const prevImg = document.querySelector(".resultado-image");
    if (prevImg) prevImg.remove();
    resultado.insertAdjacentHTML("afterbegin", `
      <div class="resultado-image role-${pokemonRole.toLowerCase().replace(' ', '')}">
        <img src="./estatisticas-shad/images/backgrounds/${poke}-left-bg.png" alt="${safeCap(poke)}"
             style="border: 3px solid; border-image: linear-gradient(45deg, ${roleColor}, ${roleColor}AA, ${roleColor}) 1;">
        <div class="info-jogador">${safeCap(poke)} (Lv. ${targetLevel})</div>
        <div class="role-badge" style="background-color: ${roleColor};">${pokemonRole}</div>
      </div>
    `);

    // Status Final (com comparação base → final)
    statusFinalDiv.innerHTML = STAT_KEYS
      .map(k => {
        const b = Number(base[k]) || 0;
        const m = Number(modified[k]) || 0;
        if (m > b) {
          return statLine(STAT_LABELS[k], `${formatValue(k, b)} → <span style="color:limegreen;">▲ ${formatValue(k, m)}</span>`);
        }
        return statLine(STAT_LABELS[k], formatValue(k, m));
      }).join("");

    // Mostrar ícones dos itens com status ativo/inativo - ALTERAÇÃO: display flex para ficar em linha horizontal
    const chosenItems = [];
    itemSlots.forEach(slot => {
      const sel = slot.querySelector(".held-item");
      if (sel.value) chosenItems.push(sel.value);
    });

    if (chosenItems.length > 0) {
      const passives = getItemPassivesSource();
      const itensHtml = chosenItems.map(it => {
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

    // Mostrar informações dos emblemas
    if (incluirEmblemas === "sim") {
      const activeEmblems = [];
      
      const emblemColors = {
        verde: "#28a745",
        vermelho: "#dc3545", 
        azul: "#007bff",
        branco: "#ffffff",
        preto: "#343a40",
        amarelo: "#ffc107",
        marrom: "#8b4513",
        roxo: "#6f42c1",
        rosa: "#e83e8c",
        azulMarinho: "#1e3a8a",
        cinza: "#6c757d"
      };

      const emblemNames = {
        verde: "Verde",
        vermelho: "Vermelho",
        azul: "Azul", 
        branco: "Branco",
        preto: "Preto",
        amarelo: "Amarelo",
        marrom: "Marrom",
        roxo: "Roxo",
        rosa: "Rosa",
        azulMarinho: "Azul-Marinho",
        cinza: "Cinza"
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
              activeEmblems.push(
                `<span style="display: inline-flex; align-items: center; margin-right: 12px;">
                  <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${color}; margin-right: 4px; ${borderStyle}"></span>
                  ${name} Lv.${nivel} (+${bonus}%)
                </span>`
              );
            }
          } else {
            activeEmblems.push(
              `<span style="display: inline-flex; align-items: center; margin-right: 12px;">
                <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${color}; margin-right: 4px; ${borderStyle}"></span>
                ${name} Lv.${nivel}
              </span>`
            );
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
      const battleImg = `<img src="./estatisticas-shad/images/battle-items/${selectedBattleNow}.png" 
                          alt="${selectedBattleNow}" 
                          title="${selectedBattleNow}" 
                          style="width:40px; height:40px;">`;
      statusFinalDiv.insertAdjacentHTML("beforeend", `
        <div class="stat-line">
          <span class="stat-label">Battle Item</span>
          <span class="stat-value">${battleImg}</span>
        </div>
      `);
    }

    // Cálculo e exibição das skills
    skillsDiv.innerHTML = "";

    if (typeof skillDamage !== "undefined" && skillDamage[poke]) {
      const skills = skillDamage[poke];

      // Renderizar passivas (passive, passive1, passive2)
      const passiveKeys = ['passive', 'passive1', 'passive2'].filter(key => skills[key]);
      
      passiveKeys.forEach(passiveKey => {
        const p = skills[passiveKey];
        const imgPath = `./estatisticas-shad/images/skills/${poke}_${passiveKey}.png`;
        const fallbackImg = `./estatisticas-shad/images/skills/passive.png`;
        const isActive = (activePassives[poke] && activePassives[poke][passiveKey]) || false;
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
          <div class="skill-box passive${activeClass}" data-pokemon="${poke}" data-passive-key="${passiveKey}" style="margin-bottom: 15px;">
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
        const imgPath = `./estatisticas-shad/images/skills/${poke}_${key}.png`;
        const fallbackImg = `./estatisticas-shad/images/skills/${key}.png`;

        const isUltimate = key === "ult" || key === "ult1" || key === "ult2";
        const ultimateClass = isUltimate ? " ultimate" : "";

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
                case "physical":
                default:
                  baseAttribute = base.ATK;
                  modifiedAttribute = modified.ATK;
                  break;
              }
              
              baseVal = f.formula(baseAttribute, targetLevel, base.HP);
              modifiedVal = f.formula(modifiedAttribute, targetLevel, modified.HP);
            }

            if (skills.passive) {
              const passive = skills.passive;
              const isPassiveActive = activePassives[poke] && activePassives[poke]['passive'];
              
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
                    activePassives[poke] && activePassives[poke][passiveKey]) {
                  const passiveBonus = skills[passiveKey].nextBasicAttackBonus;
                  totalPassiveBonus.base += passiveBonus.base;
                  totalPassiveBonus.modified += passiveBonus.modified;
                }
              });
              
              baseVal += totalPassiveBonus.base;
              modifiedVal += totalPassiveBonus.modified;
            }
            
            if (poke === "decidueye" && activePassives[poke]) {
              const hasAnyPassiveActive = ['passive', 'passive1', 'passive2'].some(passiveKey => 
                skills[passiveKey] && activePassives[poke][passiveKey]);
              
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
            <h4>${s.name}</h4>
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
  };
  

  // ---- Preencher dropdown de Pokémons usando pokemonRoles ----
  Object.keys(pokemonRoles).forEach(poke => {
    const opt = document.createElement("option");
    opt.value = poke;
    opt.textContent = safeCap(poke);
    opt.style.backgroundImage = `url('./estatisticas-shad/images/backgrounds/${poke}-left-bg.png')`;
    opt.style.backgroundRepeat = "no-repeat";
    opt.style.backgroundSize = "20px 20px";
    opt.style.paddingLeft = "28px";
    pokemonSelect.appendChild(opt);
  });

  // ---- Preencher dropdowns de itens ----
  itemSlots.forEach(slot => {
    const sel = slot.querySelector(".held-item");
    const empty = document.createElement("option");
    empty.value = "";
    empty.textContent = "-- Nenhum --";
    sel.appendChild(empty);

    Object.keys(gameHeldItens).forEach(item => {
      const opt = document.createElement("option");
      opt.value = item;
      opt.textContent = gameHeldItens[item];
      opt.style.backgroundImage = `url('./estatisticas-shad/images/held-itens/${item}.png')`;
      opt.style.backgroundRepeat = "no-repeat";
      opt.style.backgroundSize = "20px 20px";
      opt.style.paddingLeft = "28px";
      sel.appendChild(opt);
    });

    sel.addEventListener("change", () => {
      const stackDiv = slot.querySelector(".stack-container");
      stackDiv.innerHTML = "";
      const itemName = gameHeldItens[sel.value];
      if (STACKABLE_ITEMS[itemName]) {
        const config = STACKABLE_ITEMS[itemName];
        stackDiv.innerHTML = `
          <div class="stack-slider">
            <label>Stacks:</label>
            <input type="range" min="0" max="${config.max}" value="0" step="1" class="slider stack-range">
            <span class="stack-value">0</span>
          </div>
        `;
        const range = stackDiv.querySelector(".stack-range");
        const value = stackDiv.querySelector(".stack-value");
        range.addEventListener("input", () => {
          value.textContent = range.value;
          calcular();
        });
      }
      calcular();
    });
  });

  // ---- Eventos ----
  levelSelect.addEventListener("input", () => {
    levelValor.textContent = levelSelect.value;
    calcular();
  });

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

  pokemonSelect.addEventListener("change", () => {
    const poke = pokemonSelect.value;
    if (poke && !activePassives.hasOwnProperty(poke)) {
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
  });

  // Cálculo inicial
  calcular();

  btnResetar.addEventListener("click", () => {
    pokemonSelect.value = "";
    levelSelect.value = "1";
    levelValor.textContent = "1";
    itemSlots.forEach(slot => {
      slot.querySelector(".held-item").value = "";
      slot.querySelector(".stack-container").innerHTML = "";
    });
    battleRadios.forEach(r => { r.checked = false; });
    emblemasRadios.forEach(r => { 
      if (r.value === "nao") r.checked = true; 
      else r.checked = false; 
    });
    emblemasContainer.style.display = "none";
    Object.values(emblemaSelects).forEach(select => {
      if (select) select.value = "";
    });
    activePassives = {};
    activeItemPassives = {}; // Resetar também as passivas dos itens
    resultado.style.display = "none";
    statusFinalDiv.innerHTML = "";
    skillsDiv.innerHTML = "";
    const prevImg = document.querySelector(".resultado-image");
    if (prevImg) prevImg.remove();
  });
});