const pokemons = [
  "Absol", "Aegislash", "Alcremie", "Armarouge", "Azumarill", "Blastoise",
  "Blaziken", "Blissey", "Buzzwole", "Ceruledge", "Chandelure", "Charizard",
  "Cinderace", "Clefable", "Comfey", "Cramorant", "Crustle", "Darkrai", "Decidueye", "Delphox",
  "Dodrio", "Dragapult", "Dragonite", "Duraludon", "Eldegoss", "Espeon", "Falinks",
  "Garchomp", "Gardevoir", "Gengar", "Glaceon", "Goodra", "Greedent",
  "Greninja", "Gyarados", "Ho-Oh", "Hoopa", "Inteleon", "Lapras", "Latias", "Latios",
  "Leafeon", "Lucario", "Machamp", "Mamoswine", "Meowscarada", "Metagross", "Mew", "Mewtwo Y",
  "Mewtwo X", "Mimikyu", "Miraidon", "Mr. Mime", "Ninetales", "Pawmot", "Pikachu", "Psyduck", "Raichu", "Rapidash", "Sableye", "Scizor",
  "Slowbro", "Snorlax", "Suicune", "Sylveon", "Talonflame", "Tinkaton", "Trevenant", "Tsareena",
  "Tyranitar", "Umbreon", "Urshifu", "Venusaur", "Wigglytuff", "Zacian", "Zeraora", "Zoroark"
];

// Popula o select com os Pokémons e suas imagens
const select = document.getElementById("pokemon");
pokemons.forEach(p => {
  const opt = document.createElement("option");
  opt.value = p;
  const imagePath = `./img-poke/${p.toLowerCase().replace(/ /g, "-").replace(".", "").replace("♀", "f").replace("♂", "m")}.png`;
  opt.textContent = p;
  opt.style.backgroundImage = `url('${imagePath}')`;
  opt.style.backgroundSize = '20px 20px';
  opt.style.backgroundRepeat = 'no-repeat';
  opt.style.backgroundPosition = '8px center';
  opt.style.paddingLeft = '35px';
  select.appendChild(opt);
});

let season = {}, total = {};

function carregarDados() {
  const texto = document.getElementById("dadosTexto").value;
  if (!texto) {
    alert("Cole os dados do site!");
    return false;
  }

  const seasonBattlesEN = texto.match(/Season Battles\s*\*?\*?(\d+)\*?\*?/i)?.[1];
  const seasonWinsEN = texto.match(/Season Wins\s*\*?\*?(\d+)\*?\*?/i)?.[1];
  const seasonMVPEN = texto.match(/Season MVP\s*\*?\*?(\d+)\*?\*?/i)?.[1];
  const totalBattlesEN = texto.match(/Total Battles\s*\*?\*?(\d+)\*?\*?/i)?.[1];
  const totalWinsEN = texto.match(/(?:No\.\s*Of\s*Wins|Total Wins)\s*\*?\*?(\d+)\*?\*?/i)?.[1];
  const totalMVPEN = texto.match(/Total MVP\s*\*?\*?(\d+)\*?\*?/i)?.[1];

  const seasonBattlesPT = texto.match(/Batalhas\s+da\s+Temporada\s*\*?\*?(\d+)\*?\*?/i)?.[1];
  const seasonWinsPT = texto.match(/Vitórias\s+da\s+Temporada\s*\*?\*?(\d+)\*?\*?/i)?.[1];
  const seasonMVPPT = texto.match(/MVP\s+da\s+Temporada\s*\*?\*?(\d+)\*?\*?/i)?.[1];
  const totalBattlesPT = texto.match(/Batalhas\s+totais\s*\*?\*?(\d+)\*?\*?/i)?.[1];
  const totalWinsPT = texto.match(/(?:No\.\s*de\s*Vitórias|Vitórias\s+totais)\s*\*?\*?(\d+)\*?\*?/i)?.[1];
  const totalMVPPT = texto.match(/MVP\s+Total\s*\*?\*?(\d+)\*?\*?/i)?.[1];

  season = {
    battles: parseInt(seasonBattlesEN || seasonBattlesPT) || 0,
    wins: parseInt(seasonWinsEN || seasonWinsPT) || 0,
    mvps: parseInt(seasonMVPEN || seasonMVPPT) || 0
  };
  season.losses = season.battles - season.wins;

  total = {
    battles: parseInt(totalBattlesEN || totalBattlesPT) || 0,
    wins: parseInt(totalWinsEN || totalWinsPT) || 0,
    mvps: parseInt(totalMVPEN || totalMVPPT) || 0
  };
  total.losses = total.battles - total.wins;

  if (season.battles === 0 && total.battles === 0) {
    alert("Dados inválidos. Verifique o conteúdo colado.");
    return false;
  }
  return true;
}

function avaliarDesempenho(role, desempenho) {
  if (["ADC", "JGL", "TOP"].includes(role)) {
    if (desempenho < 30) return "Fraco";
    if (desempenho < 50) return "Mediano";
    if (desempenho < 70) return "Bom";
    if (desempenho < 90) return "Muito bom";
    return "Excelente";
  } else if (["SUP", "TANK"].includes(role)) {
    if (desempenho < 30) return "Fraco";
    if (desempenho < 50) return "Mediano";
    if (desempenho < 70) return "Bom";
    if (desempenho < 90) return "Muito bom";
    return "Excelente";
  }
}

function calcularPorcentagens(stats) {
  const winRate = stats.battles ? (stats.wins / stats.battles) * 100 : 0;
  const mvpRate = stats.battles ? (stats.mvps / stats.battles) * 100 : 0;
  const mvpWinRate = stats.wins ? (stats.mvps / stats.wins) * 100 : 0;
  return {
    winRate: winRate.toFixed(2),
    mvpRate: mvpRate.toFixed(2),
    mvpWinRate: mvpWinRate.toFixed(2)
  };
}

function calcularDesempenhoCombinado(winRate, mvpWinRate, role) {
  const win = parseFloat(winRate);
  let mvp = parseFloat(mvpWinRate);

  if (role === "SUP" || role === "TANK") {
    mvp *= 2.5;
  }

  return ((win + mvp) / 2).toFixed(2);
}

const niveisMaestria = [
  {nome: "Sem Maestria", pontos: 0, img: "./estatisticas-shad/images/icons/block.png"},
  {nome: "Verde", pontos: 30000, img: "./estatisticas-shad/images/icons/verde.png"},
  {nome: "Azul", pontos: 85000, img: "./estatisticas-shad/images/icons/azul.png"},
  {nome: "Dourado", pontos: 165000, img: "./estatisticas-shad/images/icons/dourado.png"}
];

function calcularMediaPontos(totalBattles, totalWins) {
  const vitorias = totalWins;
  const derrotas = totalBattles - totalWins;
  
  // Usando valores padrão sem buffs para cálculo da média
  const pontosTotaisVitoria = vitorias * 150;
  const pontosTotaisDerrota = derrotas * 100;
  const pontosTotais = pontosTotaisVitoria + pontosTotaisDerrota;
  
  return totalBattles > 0 ? pontosTotais / totalBattles : 0;
}

// Função para gerar maestria simples com informações de buffs adicionais
function calcularMaestriaComBuffs(totalBattles, totalWins) {
  const mediaPontos = calcularMediaPontos(totalBattles, totalWins);
  const pontosSemBuffs = totalBattles * mediaPontos;
  const derrotas = totalBattles - totalWins;

  let nivelAtual = niveisMaestria[0];
  let proximoNivel = null;

  for (let i = 0; i < niveisMaestria.length; i++) {
    if (pontosSemBuffs >= niveisMaestria[i].pontos) {
      nivelAtual = niveisMaestria[i];
      proximoNivel = niveisMaestria[i+1] || null;
    }
  }

  let resultado = `
    <div class="stat-line">
      <span class="stat-label">Média por partida (sem buffs):</span>
      <span class="stat-value">${mediaPontos.toFixed(0)} pts</span>
    </div>
    <div class="stat-line">
      <span class="stat-label">Pontos estimados (sem buffs):</span>
      <span class="stat-value" id="maestria-pontos">
        ${pontosSemBuffs.toFixed(0)}
        <button id="editar-maestria" class="btn-editar" onclick="editarMaestria(${pontosSemBuffs.toFixed(0)})">✏️</button>
      </span>
    </div>
    <div class="stat-line">
      <span class="stat-label">Nível atual (sem buffs):</span>
      <span class="stat-value">
        <img src="${nivelAtual.img}" alt="${nivelAtual.nome}" style="width:20px; height:20px; vertical-align:middle; margin-right:6px;">
        ${nivelAtual.nome}
      </span>
    </div>
  `;

  if (proximoNivel) {
    const faltamPontos = proximoNivel.pontos - pontosSemBuffs;
    const faltamPartidas = Math.ceil(faltamPontos / mediaPontos);
    resultado += `
      <div class="stat-line">
        <span class="stat-label">Próximo nível:</span>
        <span class="stat-value">${proximoNivel.nome}</span>
      </div>
      <div class="stat-line">
        <span class="stat-label">Faltam aproximadamente:</span>
        <span class="stat-value">${faltamPontos.toFixed(0)} pts (~${faltamPartidas} partidas)</span>
      </div>
    `;
  } else {
    resultado += `
      <div class="stat-line">
        <span class="stat-label">Status:</span>
        <span class="stat-value">🎉 Nível máximo (Dourado)!</span>
      </div>
    `;
  }

  // Adiciona informações dos buffs
  resultado += `<div class="buffs-info-section">`;
  
  // Battle Point Card
  const pontosBattle = (totalWins * 300) + (derrotas * 200);
  resultado += `
    <div class="stat-line buff-info">
      <span class="stat-label">
        <img src="./img-site/battlecard.png" alt="Battle Point Card" class="buff-icon-inline">Só Battle Point Card:
      </span>
      <span class="stat-value">${pontosBattle.toLocaleString()} pts</span>
    </div>
  `;

  // Spray
  const pontosSpray = (totalWins * 180) + (derrotas * 130);
  resultado += `
    <div class="stat-line buff-info">
      <span class="stat-label">
        <img src="./img-site/spray.png" alt="Spray" class="buff-icon-inline">Só Spray:
      </span>
      <span class="stat-value">${pontosSpray.toLocaleString()} pts</span>
    </div>
  `;

  // Retorno do Jogador
  const pontosRetorno = (totalWins * 195) + (derrotas * 145);
  resultado += `
    <div class="stat-line buff-info">
      <span class="stat-label">
        <img src="./img-site/returning.png" alt="Retorno do Jogador" class="buff-icon-inline">Só Retorno do Jogador:
      </span>
      <span class="stat-value">${pontosRetorno.toLocaleString()} pts</span>
    </div>
  `;

  // Battle + Spray
  const pontosBattleSpray = (totalWins * 330) + (derrotas * 230);
  resultado += `
    <div class="stat-line buff-info">
      <span class="stat-label">
        <img src="./img-site/battlecard.png" alt="Battle Point Card" class="buff-icon-inline">
        <img src="./img-site/spray.png" alt="Spray" class="buff-icon-inline"> Battle + Spray:
      </span>
      <span class="stat-value">${pontosBattleSpray.toLocaleString()} pts</span>
    </div>
  `;

  // Battle + Retorno
  const pontosBattleRetorno = (totalWins * 345) + (derrotas * 245);
  resultado += `
    <div class="stat-line buff-info">
      <span class="stat-label">
        <img src="./img-site/battlecard.png" alt="Battle Point Card" class="buff-icon-inline">
        <img src="./img-site/returning.png" alt="Retorno do Jogador" class="buff-icon-inline"> Battle + Retorno:
      </span>
      <span class="stat-value">${pontosBattleRetorno.toLocaleString()} pts</span>
    </div>
  `;

  // Spray + Retorno
  const pontosSprayRetorno = (totalWins * 225) + (derrotas * 175);
  resultado += `
    <div class="stat-line buff-info">
      <span class="stat-label">
        <img src="./img-site/spray.png" alt="Spray" class="buff-icon-inline">
        <img src="./img-site/returning.png" alt="Retorno do Jogador" class="buff-icon-inline"> Spray + Retorno:
      </span>
      <span class="stat-value">${pontosSprayRetorno.toLocaleString()} pts</span>
    </div>
  `;

  // Todos os buffs
  const pontosTodos = (totalWins * 375) + (derrotas * 275);
  resultado += `
    <div class="stat-line buff-info">
      <span class="stat-label">
        <img src="./img-site/battlecard.png" alt="Battle Point Card" class="buff-icon-inline">
        <img src="./img-site/returning.png" alt="Retorno do Jogador" class="buff-icon-inline">
        <img src="./img-site/spray.png" alt="Spray" class="buff-icon-inline"> Todos os buffs:
      </span>
      <span class="stat-value">${pontosTodos.toLocaleString()} pts</span>
    </div>
  `;

  resultado += `</div>`;

  return resultado;
}

// --- Funções para edição manual ---
function editarMaestria(valorAtual) {
  const container = document.getElementById("maestria-pontos");
  container.innerHTML = `
    <input id="maestria-input" type="number" class="form-control pequeno" value="${valorAtual}">
  `;
  const input = document.getElementById("maestria-input");
  input.focus();
  input.select();
  input.addEventListener("blur", () => confirmarMaestria(input.value));
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") confirmarMaestria(input.value);
  });
}

function confirmarMaestria(valor) {
  const pontosReais = parseInt(valor);
  if (isNaN(pontosReais) || pontosReais <= 0) {
    alert("Digite um valor válido.");
    return;
  }
  atualizarMaestriaManualDireto(pontosReais);
}

function atualizarMaestriaManualDireto(pontosReais) {
  let nivelAtual = niveisMaestria[0];
  let proximoNivel = null;
  for (let i = 0; i < niveisMaestria.length; i++) {
    if (pontosReais >= niveisMaestria[i].pontos) {
      nivelAtual = niveisMaestria[i];
      proximoNivel = niveisMaestria[i+1] || null;
    }
  }
  
  let resultado = `
    <div class="stat-line">
      <span class="stat-label">Pontos reais:</span>
      <span class="stat-value" id="maestria-pontos">${pontosReais}
        <button id="editar-maestria" class="btn-editar" onclick="editarMaestria(${pontosReais})">✏️</button>
      </span>
    </div>
    <div class="stat-line">
      <span class="stat-label">Nível atual:</span>
      <span class="stat-value">
        <img src="${nivelAtual.img}" alt="${nivelAtual.nome}" style="width:20px; height:20px; vertical-align:middle; margin-right:6px;">
        ${nivelAtual.nome}
      </span>
    </div>
  `;
  if (proximoNivel) {
    const faltamPontos = proximoNivel.pontos - pontosReais;
    resultado += `
      <div class="stat-line">
        <span class="stat-label">Próximo nível:</span>
        <span class="stat-value">${proximoNivel.nome}</span>
      </div>
      <div class="stat-line">
        <span class="stat-label">Faltam aproximadamente:</span>
        <span class="stat-value">${faltamPontos} pts</span>
      </div>
    `;
  } else {
    resultado += `
      <div class="stat-line">
        <span class="stat-label">Status:</span>
        <span class="stat-value">🎉 Nível máximo (Dourado)!</span>
      </div>
    `;
  }
  document.getElementById("dados-maestria").innerHTML = resultado;
}

// Função para calcular maestria em TEXTO básico (para copiar)
function calcularMaestriaTextoBasico(totalBattles, totalWins) {
  const mediaPontos = calcularMediaPontos(totalBattles, totalWins);
  const pontosTotais = totalBattles * mediaPontos;
  
  let nivelAtual = niveisMaestria[0];
  let proximoNivel = null;

  for (let i = 0; i < niveisMaestria.length; i++) {
    if (pontosTotais >= niveisMaestria[i].pontos) {
      nivelAtual = niveisMaestria[i];
      proximoNivel = niveisMaestria[i+1] || null;
    }
  }

  let resultado = `⭐ Maestria (valores sem buffs)
• Média por partida: ${mediaPontos.toFixed(0)} pts
• Pontos estimados: ${pontosTotais.toFixed(0)}
• Nível atual: ${nivelAtual.nome}`;

  if (proximoNivel) {
    const faltamPontos = proximoNivel.pontos - pontosTotais;
    const faltamPartidas = Math.ceil(faltamPontos / mediaPontos);
    resultado += `
• Próximo nível: ${proximoNivel.nome}
• Faltam: ${faltamPontos.toFixed(0)} pts (~${faltamPartidas} partidas)`;
  } else {
    resultado += `
• Status: 🎉 Nível máximo (Dourado)!`;
  }

  return resultado;
}

// Função principal que calcula e exibe o desempenho
function calcularDesempenho() {
  const jogador = document.getElementById("jogador").value;
  const pokemon = document.getElementById("pokemon").value;
  const role = document.getElementById("role").value;

  if (!jogador || !pokemon || !role) {
    alert("Preencha todos os campos obrigatórios!");
    return;
  }

  // Primeiro carrega os dados
  if (!carregarDados()) {
    return;
  }

  const temp = calcularPorcentagens(season);
  const tot = calcularPorcentagens(total);

  const desempenhoTemporada = calcularDesempenhoCombinado(temp.winRate, temp.mvpWinRate, role);
  const desempenhoTotal = calcularDesempenhoCombinado(tot.winRate, tot.mvpWinRate, role);

  // Atualiza imagem do Pokémon no resultado
  const imgResultado = document.getElementById("imagemPokemonResultado");
  imgResultado.src = `./img-poke/${pokemon.toLowerCase().replace(/ /g, "-").replace(".", "").replace("♀", "f").replace("♂", "m")}.png`;
  imgResultado.alt = pokemon;

  // Define a cor da role
  const roleColors = {
    'ADC': 'role-adc',
    'JGL': 'role-jgl', 
    'TANK': 'role-tank',
    'SUP': 'role-sup',
    'TOP': 'role-top'
  };
  const roleColorClass = roleColors[role] || 'role-adc';

  // Atualiza informações do jogador
  document.getElementById("info-jogador").innerHTML = `
    <div><strong>${jogador}</strong></div>
    <div style="color: #007bff; font-size: 16px; margin: 5px 0;">${pokemon}</div>
    <div class="${roleColorClass}" style="padding: 6px 12px; border-radius: 6px; display: inline-block; font-size: 13px; font-weight: bold;">${role}</div>
  `;

  // Atualiza dados da temporada
  const avaliacaoTemporada = avaliarDesempenho(role, desempenhoTemporada);
  document.getElementById("dados-temporada").innerHTML = `
    <div class="stat-line">
      <span class="stat-label">Partidas:</span>
      <span class="stat-value">${season.battles}</span>
    </div>
    <div class="stat-line">
      <span class="stat-label">Vitórias:</span>
      <span class="stat-value">${season.wins}</span>
    </div>
    <div class="stat-line">
      <span class="stat-label">Derrotas:</span>
      <span class="stat-value">${season.losses}</span>
    </div>
    <div class="stat-line">
      <span class="stat-label">MVPs:</span>
      <span class="stat-value">${season.mvps}</span>
    </div>
    <div class="stat-line">
      <span class="stat-label">Win Rate:</span>
      <span class="stat-value">${temp.winRate}%</span>
    </div>
    <div class="stat-line">
      <span class="stat-label">MVP/Partida:</span>
      <span class="stat-value">${temp.mvpRate}%</span>
    </div>
    <div class="stat-line">
      <span class="stat-label">MVP/Vitória:</span>
      <span class="stat-value">${temp.mvpWinRate}%</span>
    </div>
    <div class="stat-line desempenho-line">
      <span class="stat-label">📊 Desempenho:</span>
      <span class="stat-value">${desempenhoTemporada}%</span>
    </div>
    <div class="avaliacao ${avaliacaoTemporada.toLowerCase().replace(' ', '-')}">
      ✅ ${avaliacaoTemporada}
    </div>
  `;

  // Atualiza dados totais
  const avaliacaoTotal = avaliarDesempenho(role, desempenhoTotal);
  document.getElementById("dados-total").innerHTML = `
    <div class="stat-line">
      <span class="stat-label">Partidas:</span>
      <span class="stat-value">${total.battles}</span>
    </div>
    <div class="stat-line">
      <span class="stat-label">Vitórias:</span>
      <span class="stat-value">${total.wins}</span>
    </div>
    <div class="stat-line">
      <span class="stat-label">Derrotas:</span>
      <span class="stat-value">${total.losses}</span>
    </div>
    <div class="stat-line">
      <span class="stat-label">MVPs:</span>
      <span class="stat-value">${total.mvps}</span>
    </div>
    <div class="stat-line">
      <span class="stat-label">Win Rate:</span>
      <span class="stat-value">${tot.winRate}%</span>
    </div>
    <div class="stat-line">
      <span class="stat-label">MVP/Partida:</span>
      <span class="stat-value">${tot.mvpRate}%</span>
    </div>
    <div class="stat-line">
      <span class="stat-label">MVP/Vitória:</span>
      <span class="stat-value">${tot.mvpWinRate}%</span>
    </div>
    <div class="stat-line desempenho-line">
      <span class="stat-label">📊 Desempenho:</span>
      <span class="stat-value">${desempenhoTotal}%</span>
    </div>
    <div class="avaliacao ${avaliacaoTotal.toLowerCase().replace(' ', '-')}">
      ✅ ${avaliacaoTotal}
    </div>
  `;

  // --- Adiciona Maestria com buffs ---
  const maestriaHTML = calcularMaestriaComBuffs(total.battles, total.wins);

  // Cria ou atualiza um bloco de Maestria
  let blocoMaestria = document.getElementById("dados-maestria");
  if (!blocoMaestria) {
    const colunaTotal = document.querySelector(".coluna-total");
    const div = document.createElement("div");
    div.innerHTML = `<h3>⭐ Maestria</h3><div id="dados-maestria">${maestriaHTML}</div>`;
    colunaTotal.appendChild(div);
  } else {
    const parentDiv = blocoMaestria.parentElement;
    parentDiv.innerHTML = `<h3>⭐ Maestria</h3><div id="dados-maestria">${maestriaHTML}</div>`;
  }

  // Mostra ou esconde info do multiplicador
  const multiplicadorInfo = document.getElementById("multiplicador-info");
  if (role === "SUP" || role === "TANK") {
    multiplicadorInfo.style.display = "block";
  } else {
    multiplicadorInfo.style.display = "none";
  }

  // Mostra o container de resultado
  document.getElementById("resultado-completo").style.display = "flex";

  // Mantém a div resultado original preenchida para a função copiar
  let mensagemMultiplicador = "";
  if (role === "SUP" || role === "TANK") {
    mensagemMultiplicador = "\n\n⚠️ No cálculo de desempenho de SUP e TANK é utilizado um multiplicador para o valor de MVP, pois essas roles têm menos MVPs por partida.";
  }

  const resultadoFinal = `Jogador: ${jogador}
Pokémon: ${pokemon}
Função: ${role}

🔹 Temporada:
- Partidas: ${season.battles}
- Vitórias: ${season.wins}
- Derrotas: ${season.losses}
- MVPs: ${season.mvps}
- Win Rate: ${temp.winRate}%
- MVP/Partida: ${temp.mvpRate}%
- MVP/Vitória: ${temp.mvpWinRate}%
- 📊 Desempenho da Temporada: ${desempenhoTemporada}%
- ✅ Avaliação: ${avaliacaoTemporada}

🔸 Total:
- Partidas: ${total.battles}
- Vitórias: ${total.wins}
- Derrotas: ${total.losses}
- MVPs: ${total.mvps}
- Win Rate: ${tot.winRate}%
- MVP/Partida: ${tot.mvpRate}%
- MVP/Vitória: ${tot.mvpWinRate}%
- 📊 Desempenho Total: ${desempenhoTotal}%
- ✅ Avaliação: ${avaliacaoTotal}${mensagemMultiplicador}`;

  document.getElementById("resultado").innerText = resultadoFinal;
}

// Limpa todos os campos e oculta resultados
function limparCampos() {
  document.getElementById("jogador").value = "";
  document.getElementById("pokemon").value = "";
  document.getElementById("role").value = "";
  document.getElementById("dadosTexto").value = "";
  
  document.getElementById("resultado-completo").style.display = "none";
  document.getElementById("multiplicador-info").style.display = "none";
  document.getElementById("resultado").innerText = "";
  season = {};
  total = {};
}

// Copia o resultado formatado para a área de transferência
function copiarResultado() {
  const jogador = document.getElementById("jogador").value;
  const pokemon = document.getElementById("pokemon").value;
  const role = document.getElementById("role").value;

  if (!jogador || !pokemon || !role || (season.battles === 0 && total.battles === 0)) {
    return alert("Nenhum resultado para copiar!");
  }

  const temp = calcularPorcentagens(season);
  const tot = calcularPorcentagens(total);

  const desempenhoTemporada = calcularDesempenhoCombinado(temp.winRate, temp.mvpWinRate, role);
  const desempenhoTotal = calcularDesempenhoCombinado(tot.winRate, tot.mvpWinRate, role);

  const avaliacaoTemporada = avaliarDesempenho(role, desempenhoTemporada);
  const avaliacaoTotal = avaliarDesempenho(role, desempenhoTotal);

  let mensagemMultiplicador = "";
  if (role === "SUP" || role === "TANK") {
    mensagemMultiplicador = "\n⚠️ No cálculo de desempenho de SUP e TANK é utilizado um multiplicador para o valor de MVP, pois essas roles têm menos MVPs por partida.";
  }

  // Inclui maestria em texto básico (sem buffs)
  const maestriaTexto = calcularMaestriaTextoBasico(total.battles, total.wins);
  
  const resultadoFinal = `🔥 RELATÓRIO DE DESEMPENHO - POKÉMON UNITE 🔥

👤 Jogador: ${jogador}
🎮 Pokémon: ${pokemon}
⚔️ Função: ${role}

🔹 DADOS DA TEMPORADA:
• Partidas: ${season.battles}
• Vitórias: ${season.wins}
• Derrotas: ${season.losses}
• MVPs: ${season.mvps}
• Win Rate: ${temp.winRate}%
• MVP/Partida: ${temp.mvpRate}%
• MVP/Vitória: ${temp.mvpWinRate}%
• 📊 Desempenho da Temporada: ${desempenhoTemporada}%
• ✅ Avaliação: ${avaliacaoTemporada}

🔸 DADOS TOTAIS:
• Partidas: ${total.battles}
• Vitórias: ${total.wins}
• Derrotas: ${total.losses}
• MVPs: ${total.mvps}
• Win Rate: ${tot.winRate}%
• MVP/Partida: ${tot.mvpRate}%
• MVP/Vitória: ${tot.mvpWinRate}%
• 📊 Desempenho Total: ${desempenhoTotal}%
• ✅ Avaliação: ${avaliacaoTotal}${mensagemMultiplicador}

${maestriaTexto}

📊 Calculadora Guarinî e-sport`;

  navigator.clipboard.writeText(resultadoFinal);
  alert("Resultado copiado para a área de transferência!");
}