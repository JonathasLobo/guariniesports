document.addEventListener("DOMContentLoaded", () => {
  const pokemonSelect = document.getElementById("pokemon");
  const levelSelect = document.getElementById("nivel");
  const levelValor = document.getElementById("nivel-valor");
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

  if (btnResetar) btnResetar.type = "button";

  // ---- Configuração de atributos ----
  const STAT_KEYS = [
    "HP","ATK","DEF","SpATK","SpDEF","Speed",
    "AtkSPD","CDR","CritRate","CritDmg","Lifesteal",
    "HPRegen","EnergyRate"
  ];

  const STAT_LABELS = {
    HP: "HP", ATK: "ATK", DEF: "DEF",
    SpATK: "Sp. ATK", SpDEF: "Sp. DEF", Speed: "Speed",
    AtkSPD: "Atk Speed", CDR: "Cooldown Reduction",
    CritRate: "Crit Rate", CritDmg: "Crit Dmg",
    Lifesteal: "Lifesteal", HPRegen: "HP Regen",
    EnergyRate: "Energy Rate"
  };

  const PERCENT_KEYS = new Set(["AtkSPD","CDR","CritRate","CritDmg","Lifesteal","EnergyRate"]);

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
    "Attack Weight": { stat: "ATK", perStack: 12, max: 6, percent: false },
    "Sp. Atk Specs": { stat: "SpATK", perStack: 16, max: 6, percent: false },
    "Aeos Cookie": { stat: "HP", perStack: 200, max: 6, percent: false },
    "Accel Bracer": { stat: "ATK", perStack: 0.6, max: 20, percent: true },
    "Drive Lens": { stat: "SpATK", perStack: 0.6, max: 20, percent: true },
    "Weakness Police": { stat: "ATK", perStack: 2.5, max: 4, percent: true },
    "Charging Charm": { stat: "ATK", perStack: 70, max: 1, percent: true, fixedBonus: 40 }
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

  // ---- Função para aplicar buff da passiva ----
  const applyPassiveBuff = (stats, pokemon) => {
    if (!activePassives[pokemon] || !skillDamage[pokemon]?.passive?.buff) {
      return stats;
    }

    const passiveBuff = skillDamage[pokemon].passive.buff;
    const modifiedStats = { ...stats };

    // Aplicar cada buff da passiva
    Object.keys(passiveBuff).forEach(stat => {
      if (modifiedStats.hasOwnProperty(stat)) {
        const buffValue = passiveBuff[stat];
        if (PERCENT_KEYS.has(stat)) {
          // Para stats percentuais, adicionar diretamente
          modifiedStats[stat] += buffValue;
        } else {
          // Para stats absolutos, calcular percentual da base
          modifiedStats[stat] += stats[stat] * (buffValue / 100);
        }
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

    // Verificação se o Pokémon tem dados no baseStats
    if (!baseStats[poke]) {
      // Se não houver dados no baseStats, mostrar mensagem informativa
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
      
      // Adicionar imagem mesmo sem dados
      const prevImg = document.querySelector(".resultado-image");
      if (prevImg) prevImg.remove();
      resultado.insertAdjacentHTML("afterbegin", `
        <div class="resultado-image">
          <img src="./estatisticas-shad/images/backgrounds/${poke}-left-bg.png" alt="${safeCap(poke)}"
               onerror="this.style.display='none'">
          <div class="info-jogador">${safeCap(poke)} (Lv. ${targetLevel}) - ${pokemonRoles[poke]}</div>
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

    // Iterar itens
    itemSlots.forEach(slot => {
      const sel = slot.querySelector(".held-item");
      if (!sel.value) return;
      const itemName = gameHeldItens[sel.value];

      // Aplicar bônus normais do util.js
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

      // Aplicar stacks se for item stackável
      if (STACKABLE_ITEMS[itemName]) {
        const config = STACKABLE_ITEMS[itemName];
        const range = slot.querySelector(".stack-range");
        const stacks = range ? parseInt(range.value, 10) || 1 : 1;

        // Caso especial para "Charging Charm" (valor fixo + percentual)
        if (itemName === "Charging Charm") {
            const bonusPercent = (base[config.stat] * (config.perStack / 100)) * stacks;
            modified[config.stat] += config.fixedBonus + bonusPercent; // 40 fixo + 70% do ATK base
        }
        else if (config.percent) {
            const bonus = (base[config.stat] * (config.perStack / 100)) * stacks;
            modified[config.stat] += bonus;
        } else {
            modified[config.stat] += config.perStack * stacks;
        }
      }
    });

    // Aplicar efeito do Battle Item
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

    // Aplicar efeito dos emblemas
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
              modified[emblemConfig.stat] += base[emblemConfig.stat] * (bonus / 100);
            }
          }
        }
      });
    }

    // Aplicar buff da passiva se ativa
    modified = applyPassiveBuff(modified, poke);
    modified = ensureAllStats(modified);

    // Imagem do Pokémon
    const prevImg = document.querySelector(".resultado-image");
    if (prevImg) prevImg.remove();
    resultado.insertAdjacentHTML("afterbegin", `
      <div class="resultado-image">
        <img src="./estatisticas-shad/images/backgrounds/${poke}-left-bg.png" alt="${safeCap(poke)}">
        <div class="info-jogador">${safeCap(poke)} (Lv. ${targetLevel})</div>
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

    // Mostrar ícones dos itens
    const chosenItems = [];
    itemSlots.forEach(slot => {
      const sel = slot.querySelector(".held-item");
      if (sel.value) chosenItems.push(sel.value);
    });

    if (chosenItems.length > 0) {
      const itensHtml = chosenItems.map(it => `
        <img src="./estatisticas-shad/images/held-itens/${it}.png" 
             alt="${gameHeldItens[it]}" 
             title="${gameHeldItens[it]}" 
             style="width:40px; height:40px; margin:0 5px;">
      `).join("");
      statusFinalDiv.insertAdjacentHTML("beforeend", `
        <div class="stat-line">
          <span class="stat-label">Itens</span>
          <span class="stat-value">${itensHtml}</span>
        </div>
      `);
    }

    // Mostrar informações dos emblemas
    if (incluirEmblemas === "sim") {
      const activeEmblems = [];
      
      // Mapeamento das cores dos emblemas
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
          
          // Estilo especial para emblema branco (adicionar borda)
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
            // Para emblemas que não afetam status (rosa, azul-marinho, cinza)
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
    if (selectedBattle) {
      const battleImg = `<img src="./estatisticas-shad/images/battle-items/${selectedBattle}.png" 
                          alt="${selectedBattle}" 
                          title="${selectedBattle}" 
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

      // Renderizar passiva primeiro se existir
      if (skills.passive) {
        const p = skills.passive;
        const imgPath = `./estatisticas-shad/images/skills/${poke}_passive.png`;
        const fallbackImg = `./estatisticas-shad/images/skills/passive.png`;
        const isActive = activePassives[poke] || false;
        const activeClass = isActive ? " active" : "";

        const passiveHtml = `
          <div class="skill-box passive${activeClass}" data-pokemon="${poke}" style="margin-bottom: 15px;">
            <img src="${imgPath}" alt="${p.name}" class="skill-icon"
                 onerror="this.onerror=null;this.src='${fallbackImg}'">
            <div class="skill-info">
              <h4>${p.name}</h4>
              <div class="passive-subtitle">passive skill</div>
              ${p.description ? `<ul><li style="color:#888; font-style:italic;">${p.description}</li></ul>` : ""}
            </div>
            <div class="passive-status"></div>
          </div>
        `;
        
        skillsDiv.insertAdjacentHTML("beforeend", passiveHtml);
      }

      // Renderizar outras skills
      Object.keys(skills).forEach(key => {
        if (key === "passive") return; // Já renderizada acima
        
        const s = skills[key];
        const imgPath = `./estatisticas-shad/images/skills/${poke}_${key}.png`;
        const fallbackImg = `./estatisticas-shad/images/skills/${key}.png`;

        // Determinar se é ultimate para aplicar classe CSS especial
        const isUltimate = key === "ult" || key === "ult1" || key === "ult2";
        const ultimateClass = isUltimate ? " ultimate" : "";

        // Array para armazenar valores calculados desta skill
        const calculatedValues = [];
        
        // Primeiro passe: calcular valores não dependentes
        s.formulas.forEach((f, index) => {
          if (f.type === "text-only") {
            // Pular cálculos para text-only
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
            
            calculatedValues[index] = { base: baseVal, modified: modifiedVal };
          }
        });
        
        // Segundo passe: calcular valores dependentes
        s.formulas.forEach((f, index) => {
          if (f.type === "dependent") {
            const dependsOnIndex = f.dependsOn;
            if (calculatedValues[dependsOnIndex]) {
              // Usa a fórmula definida na skill, passando o valor da dependência
              const baseVal = f.formula(calculatedValues[dependsOnIndex].base, targetLevel);
              const modifiedVal = f.formula(calculatedValues[dependsOnIndex].modified, targetLevel);
              calculatedValues[index] = { base: baseVal, modified: modifiedVal };
            } else {
              // Fallback se a dependência não foi encontrada
              calculatedValues[index] = { base: 0, modified: 0 };
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
                // Se for type "text-only", mostrar apenas o additionalText
                if (f.type === "text-only") {
                  return `<li><strong>${f.label}:</strong> <span style="color:#888; font-style:italic;">${f.additionalText}</span></li>`;
                }
                
                const values = calculatedValues[index];
                
                // Formatação do resultado com possível texto adicional
                let displayText = "";
                let hasAdditionalText = f.additionalText && f.additionalText.trim() !== "";
                
                if (Math.round(values.modified) > Math.round(values.base)) {
                  displayText = `${Math.round(values.base)} → <span style="color:limegreen;">▲ ${Math.round(values.modified)}</span>`;
                } else {
                  displayText = `${Math.round(values.modified)}`;
                }
                
                // Adicionar texto explicativo se existir
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

      // Adicionar event listeners para passivas clicáveis
      const passiveBoxes = skillsDiv.querySelectorAll(".skill-box.passive");
      passiveBoxes.forEach(box => {
        box.addEventListener("click", () => {
          const pokemon = box.dataset.pokemon;
          activePassives[pokemon] = !activePassives[pokemon];
          calcular(); // Recalcular com a passiva ativa/inativa
        });
      });

    } else {
      skillsDiv.innerHTML = `<div class="stat-line"><span class="stat-label">Nenhuma skill disponível</span></div>`;
    }

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
            <input type="range" min="1" max="${config.max}" value="1" step="1" class="slider stack-range">
            <span class="stack-value">1</span>
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
  
  // Event listeners para emblemas
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
    // Reset passivas ativas quando trocar de pokémon
    const poke = pokemonSelect.value;
    if (poke && !activePassives.hasOwnProperty(poke)) {
      activePassives[poke] = false;
    }
    calcular();
  });

  // Já dispara cálculo inicial
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
    // Reset passivas ativas
    activePassives = {};
    resultado.style.display = "none";
    statusFinalDiv.innerHTML = "";
    skillsDiv.innerHTML = "";
    const prevImg = document.querySelector(".resultado-image");
    if (prevImg) prevImg.remove();
  });
});