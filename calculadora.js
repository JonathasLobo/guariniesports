import { checkAccess } from "./auth.js";

// Garante que só usuários nível 2 ou superior acessem
checkAccess(2).then((hasAccess) => {
  if (!hasAccess) {
    // O próprio checkAccess já mostra alerta e redireciona
    return;
  }

  // Aqui pode continuar carregando a lógica da calculadora normalmente
  console.log("Acesso liberado para a calculadora.");
});

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { app } from "./auth.js"; // se o firebase for inicializado em auth.js

const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      alert("Você precisa logar primeiro");
      window.location.href = "login.html";
      return;
    }

    // Buscar nível no Firestore
    const userRef = doc(db, "usuarios", user.uid);
    const snap = await getDoc(userRef);

    if (snap.exists()) {
      const dados = snap.data();
      if (dados.nivel === 2) {
        console.log("Acesso liberado!");
        // aqui a calculadora carrega normalmente
      } else {
        alert("Você não tem acesso a essa ferramenta");
        window.location.href = "index.html";
      }
    } else {
      alert("Usuário não encontrado no banco de dados");
      window.location.href = "index.html";
    }
  });
});


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

// Carrega os dados do textarea (inglês ou português)
function carregarDados() {
  const texto = document.getElementById("dadosTexto").value;
  if (!texto) {
    alert("Cole os dados do site!");
    return false;
  }

  // Regex para dados em inglês
  const seasonBattlesEN = texto.match(/Season Battles\s*\*?\*?(\d+)\*?\*?/i)?.[1];
  const seasonWinsEN = texto.match(/Season Wins\s*\*?\*?(\d+)\*?\*?/i)?.[1];
  const seasonMVPEN = texto.match(/Season MVP\s*\*?\*?(\d+)\*?\*?/i)?.[1];
  const totalBattlesEN = texto.match(/Total Battles\s*\*?\*?(\d+)\*?\*?/i)?.[1];
  const totalWinsEN = texto.match(/(?:No\.\s*Of\s*Wins|Total Wins)\s*\*?\*?(\d+)\*?\*?/i)?.[1];
  const totalMVPEN = texto.match(/Total MVP\s*\*?\*?(\d+)\*?\*?/i)?.[1];

  // Regex para dados em português
  const seasonBattlesPT = texto.match(/Batalhas\s+da\s+Temporada\s*\*?\*?(\d+)\*?\*?/i)?.[1];
  const seasonWinsPT = texto.match(/Vitórias\s+da\s+Temporada\s*\*?\*?(\d+)\*?\*?/i)?.[1];
  const seasonMVPPT = texto.match(/MVP\s+da\s+Temporada\s*\*?\*?(\d+)\*?\*?/i)?.[1];
  const totalBattlesPT = texto.match(/Batalhas\s+totais\s*\*?\*?(\d+)\*?\*?/i)?.[1];
  const totalWinsPT = texto.match(/(?:No\.\s*de\s*Vitórias|Vitórias\s+totais)\s*\*?\*?(\d+)\*?\*?/i)?.[1];
  const totalMVPPT = texto.match(/MVP\s+Total\s*\*?\*?(\d+)\*?\*?/i)?.[1];

  // Usa dados em inglês se encontrados, senão usa português
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

// Avalia o desempenho baseado na role
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

// Calcula as porcentagens
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

// Calcula desempenho combinado com multiplicador para SUP/TANK
function calcularDesempenhoCombinado(winRate, mvpWinRate, role) {
  const win = parseFloat(winRate);
  let mvp = parseFloat(mvpWinRate);

  // Aumenta o peso do MVP/Vitória para SUP e TANK
  if (role === "SUP" || role === "TANK") {
    mvp *= 2.5; // Multiplicador SUP TANK
  }

  return ((win + mvp) / 2).toFixed(2);
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
      <span class="stat-label">🔍 Desempenho:</span>
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
      <span class="stat-label">🔍 Desempenho:</span>
      <span class="stat-value">${desempenhoTotal}%</span>
    </div>
    <div class="avaliacao ${avaliacaoTotal.toLowerCase().replace(' ', '-')}">
      ✅ ${avaliacaoTotal}
    </div>
  `;

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
- 🔍 Desempenho da Temporada: ${desempenhoTemporada}%
- ✅ Avaliação: ${avaliacaoTemporada}

🔸 Total:
- Partidas: ${total.battles}
- Vitórias: ${total.wins}
- Derrotas: ${total.losses}
- MVPs: ${total.mvps}
- Win Rate: ${tot.winRate}%
- MVP/Partida: ${tot.mvpRate}%
- MVP/Vitória: ${tot.mvpWinRate}%
- 🔍 Desempenho Total: ${desempenhoTotal}%
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
• 🔍 Desempenho da Temporada: ${desempenhoTemporada}%
• ✅ Avaliação: ${avaliacaoTemporada}

🔸 DADOS TOTAIS:
• Partidas: ${total.battles}
• Vitórias: ${total.wins}
• Derrotas: ${total.losses}
• MVPs: ${total.mvps}
• Win Rate: ${tot.winRate}%
• MVP/Partida: ${tot.mvpRate}%
• MVP/Vitória: ${tot.mvpWinRate}%
• 🔍 Desempenho Total: ${desempenhoTotal}%
• ✅ Avaliação: ${avaliacaoTotal}${mensagemMultiplicador}

📊 Calculadora Guariní e-sport`;

  navigator.clipboard.writeText(resultadoFinal);
  alert("Resultado copiado para a área de transferência!");
}

const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.id === "clear") {
      display.value = "";
    } else if (button.id === "equals") {
      try {
        display.value = eval(display.value);
      } catch {
        display.value = "Erro";
      }
    } else {
      display.value += button.textContent;
    }
  });
});