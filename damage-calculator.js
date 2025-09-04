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

      Object.keys(skills).forEach(key => {
        const s = skills[key];
        const imgPath = `./estatisticas-shad/images/skills/${poke}_${key}.png`;
        const fallbackImg = `./estatisticas-shad/images/skills/${key}.png`;

        // Determinar se é ultimate para aplicar classe CSS especial
        const isUltimate = key === "ult";
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

  pokemonSelect.addEventListener("change", calcular);

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
    resultado.style.display = "none";
    statusFinalDiv.innerHTML = "";
    skillsDiv.innerHTML = "";
    const prevImg = document.querySelector(".resultado-image");
    if (prevImg) prevImg.remove();
  });
});