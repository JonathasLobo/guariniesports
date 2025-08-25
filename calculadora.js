document.addEventListener("DOMContentLoaded", () => {
  if (!window.util) {
    console.warn("Aviso: util.js não encontrado. A calculadora usará apenas a lista fixa de Pokémon.");
  }

  const { baseStats = {}, defaultHeldItems = {}, gameHeldItensStatus = {} } = window.util || {};

  // Lista fixa fornecida
  const pokemons = [
    "Absol", "Aegislash", "Alcremie", "Armarouge", "Azumarill", "Blastoise",
    "Blaziken", "Blissey", "Buzzwole", "Ceruledge", "Chandelure", "Charizard",
    "Cinderace", "Clefable", "Comfey", "Cramorant", "Crustle", "Darkrai", "Decidueye", "Delphox",
    "Dodrio", "Dragapult", "Dragonite", "Duraludon", "Eldegoss", "Espeon", "Falinks",
    "Garchomp", "Gardevoir", "Gengar", "Glaceon", "Goodra", "Greedent",
    "Greninja", "Gyarados", "Ho-Oh", "Hoopa", "Inteleon", "Lapras", "Latias", "Latios",
    "Leafeon", "Lucario", "Machamp", "Mamoswine", "Meowscarada", "Metagross", "Mew", "Mewtwo Y",
    "Mewtwo X", "Mimikyu", "Miraidon", "Mr. Mime", "Ninetales", "Pawmot", "Pikachu", "Psyduck", 
    "Raichu", "Rapidash", "Sableye", "Scizor", "Slowbro", "Snorlax", "Suicune", "Sylveon", 
    "Talonflame", "Tinkaton", "Trevenant", "Tsareena", "Tyranitar", "Umbreon", "Urshifu", 
    "Venusaur", "Wigglytuff", "Zacian", "Zeraora", "Zoroark"
  ];

  // SkillDB de exemplo (preencha com dados reais)
  const skillDB = {
    Pikachu: {
      s11: { name: "Thunderbolt", scaling: [{ stat: "SpATK", ratio: 1 }, { flat: 200 }], hits: 1, defenseType: "SpDEF", crit: false },
      u11: { name: "Thunder", scaling: [{ stat: "SpATK", ratio: 1.2 }, { flat: 350 }], hits: 3, defenseType: "SpDEF", crit: true }
    },
    Greninja: {
      s11: { name: "Water Shuriken", scaling: [{ stat: "ATK", ratio: 0.65 }, { flat: 120 }], hits: 5, defenseType: "DEF", crit: true }
    }
  };

  // Funções principais
  function computeSkillDamage(attackerStats, defenderStats, skill, flatPen = 0, pctPen = 0) {
    let rawDamage = 0;
    skill.scaling.forEach(s => {
      if (s.stat) rawDamage += attackerStats[s.stat] * s.ratio;
      if (s.flat) rawDamage += s.flat;
    });
    rawDamage *= skill.hits || 1;

    const defenseType = skill.defenseType || (skill.scaling.some(s => s.stat === "SpATK") ? "SpDEF" : "DEF");
    let defense = defenderStats[defenseType] || 0;

    defense = Math.max(0, defense - flatPen);
    defense = defense * (1 - pctPen / 100);

    const mitigated = rawDamage * (100 / (100 + defense));

    return {
      rawDamage: Math.round(rawDamage),
      defenseUsed: defenseType,
      effectiveDefense: Math.round(defense),
      mitigated: Math.round(mitigated)
    };
  }

  function applyHeldItems(base, items) {
    const finalStats = { ...base };
    items.forEach(item => {
      const bonuses = gameHeldItensStatus[item] || [];
      bonuses.forEach(b => {
        const match = b.match(/^(HP|ATK|DEF|SpATK|SpDEF|CritRate|CDR|AtkSPD|HPRegen|EnergyRate|Speed|CritDmg)\\s*\\+\\s*([\\d.]+)(%)?$/i);
        if (match) {
          const key = match[1];
          const val = parseFloat(match[2]);
          finalStats[key] = (finalStats[key] || 0) + val;
        }
      });
    });
    return finalStats;
  }

  // Seletores
  const attackerSelect = document.getElementById('attacker');
  const defenderSelect = document.getElementById('defender');
  const skillSelect = document.getElementById('skill');
  const heldSelects = document.querySelectorAll('.held-item');

  // Popula os selects com a lista fixa
  pokemons.forEach(name => {
    attackerSelect.innerHTML += `<option value="${name}">${name}</option>`;
    defenderSelect.innerHTML += `<option value="${name}">${name}</option>`;
  });

  // Quando trocar atacante, atualiza skills e itens
  attackerSelect.addEventListener('change', () => {
    populateSkills(attackerSelect.value);
    populateHeldItems(attackerSelect.value);
  });

  function populateSkills(pokemon) {
    skillSelect.innerHTML = '';
    const skills = skillDB[pokemon] || {};
    if (Object.keys(skills).length === 0) {
      skillSelect.innerHTML = `<option value="">Nenhuma skill cadastrada</option>`;
      return;
    }
    Object.keys(skills).forEach(id => {
      skillSelect.innerHTML += `<option value="${id}">${skills[id].name}</option>`;
    });
  }

  function populateHeldItems(pokemon) {
    const defaultItems = defaultHeldItems[pokemon] || [];
    heldSelects.forEach((sel, i) => {
      sel.innerHTML = '';
      Object.keys(gameHeldItensStatus).forEach(item => {
        const selected = defaultItems[i] === item ? 'selected' : '';
        sel.innerHTML += `<option value="${item}" ${selected}>${item}</option>`;
      });
    });
  }

  // Inicializa com o primeiro Pokémon da lista
  attackerSelect.value = pokemons[0];
  defenderSelect.value = pokemons[1];
  populateSkills(attackerSelect.value);
  populateHeldItems(attackerSelect.value);

  // Botão calcular
  document.getElementById('calcBtn').addEventListener('click', () => {
    const attacker = attackerSelect.value;
    const defender = defenderSelect.value;
    const skillId = skillSelect.value;
    const flatPen = parseFloat(document.getElementById('flatPen').value) || 0;
    const pctPen = parseFloat(document.getElementById('pctPen').value) || 0;
    const heldItems = Array.from(heldSelects).map(s => s.value);

    if (!skillDB[attacker] || !skillDB[attacker][skillId]) {
      document.getElementById('output').innerHTML = `<p>Skill não configurada no skillDB para ${attacker}.</p>`;
      return;
    }

    const atkStats = applyHeldItems(baseStats[attacker] || { ATK: 200, SpATK: 200, DEF: 100, SpDEF: 100 }, heldItems);
    const defStats = baseStats[defender] || { DEF: 100, SpDEF: 100 };

    const skill = skillDB[attacker][skillId];
    const result = computeSkillDamage(atkStats, defStats, skill, flatPen, pctPen);

    document.getElementById('output').innerHTML = `
      <p><b>Dano Bruto:</b> ${result.rawDamage}</p>
      <p><b>Defesa Usada:</b> ${result.defenseUsed}</p>
      <p><b>Defesa Efetiva:</b> ${result.effectiveDefense}</p>
      <p><b>Dano Após Mitigação:</b> ${result.mitigated}</p>
    `;
  });
});
