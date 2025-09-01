document.addEventListener("DOMContentLoaded", () => {
  const pokemonSelect = document.getElementById("pokemon");
  const levelSelect = document.getElementById("nivel");
  const levelValor = document.getElementById("nivel-valor");
  const itemSlots = document.querySelectorAll(".item-slot");
  const btnCalcular = document.getElementById("calcular");
  const btnResetar = document.getElementById("resetar");
  const baseDiv = document.getElementById("status-base");
  const finalDiv = document.getElementById("status-final");
  const resultado = document.getElementById("resultado");
  const battleRadios = document.querySelectorAll("input[name='battle']");

  if (btnCalcular) btnCalcular.type = "button";
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
    "Drive Lens": { stat: "SpATK", perStack: 0.6, max: 20, percent: true }
  };

  // ---- Função de cálculo (definida primeiro para não dar erro) ----
  const calcular = () => {
    const poke = pokemonSelect.value;
    const targetLevel = parseInt(levelSelect.value, 10) || 1;
    if (!poke) {
      resultado.style.display = "none";
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
        if (config.percent) {
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

    // Base
    baseDiv.innerHTML = STAT_KEYS
      .map(k => statLine(STAT_LABELS[k], formatValue(k, base[k]))).join("");

    // Final
    finalDiv.innerHTML = STAT_KEYS
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
        <img src=".estatisticas-shad/images/held-itens/${it}.png" 
             alt="${gameHeldItens[it]}" 
             title="${gameHeldItens[it]}" 
             style="width:40px; height:40px; margin:0 5px;">
      `).join("");
      finalDiv.insertAdjacentHTML("beforeend", `
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
      finalDiv.insertAdjacentHTML("beforeend", `
        <div class="stat-line">
          <span class="stat-label">Battle Item</span>
          <span class="stat-value">${battleImg}</span>
        </div>
      `);
    }

    resultado.style.display = "flex";
  };

  // ---- Preencher dropdown de Pokémons ----
  Object.keys(baseStats).forEach(poke => {
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

  // Botão vira opcional, mas ainda funciona
  btnCalcular.addEventListener("click", (e) => {
    e.preventDefault();
    calcular();
  });

  // Já dispara cálculo inicial (opcional)
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
    baseDiv.innerHTML = "";
    finalDiv.innerHTML = "";
    const prevImg = document.querySelector(".resultado-image");
    if (prevImg) prevImg.remove();
  });

  pokemonSelect.addEventListener("change", calcular);
});
