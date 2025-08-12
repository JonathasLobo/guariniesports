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

    const select = document.getElementById("pokemon");
    pokemons.forEach(p => {
      const opt = document.createElement("option");
      opt.value = p;
      opt.textContent = p;
      select.appendChild(opt);
    });

    function atualizarImagemPokemon() {
      const nome = document.getElementById("pokemon").value;
      const img = document.getElementById("imagemPokemon");
      img.src = `./img-poke/${nome.toLowerCase().replace(/ /g, "-").replace(".", "").replace("♀", "f").replace("♂", "m")}.png`;
      img.style.display = "block";
    }

    let season = {}, total = {};

    function carregarDados() {
    const texto = document.getElementById("dadosTexto").value;
    if (!texto) return alert("Cole os dados do site!");

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
      return;
    }

    // Detecta o idioma para feedback ao usuário
    const isEnglish = seasonBattlesEN || totalBattlesEN;
    const idioma = isEnglish ? "inglês" : "português";
    
    alert(`Dados carregados com sucesso! (Detectado: ${idioma})`);
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

    function calcularDesempenho() {
  const jogador = document.getElementById("jogador").value;
  const pokemon = document.getElementById("pokemon").value;
  const role = document.getElementById("role").value;

  if (!jogador || !pokemon || !role) {
    alert("Preencha todos os campos obrigatórios!");
    return;
  }

  const temp = calcularPorcentagens(season);
  const tot = calcularPorcentagens(total);

  const desempenhoTemporada = calcularDesempenhoCombinado(temp.winRate, temp.mvpWinRate, role);
  const desempenhoTotal = calcularDesempenhoCombinado(tot.winRate, tot.mvpWinRate, role);

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
- ✅ Avaliação: ${avaliarDesempenho(role, desempenhoTemporada)}

🔸 Total:
- Partidas: ${total.battles}
- Vitórias: ${total.wins}
- Derrotas: ${total.losses}
- MVPs: ${total.mvps}
- Win Rate: ${tot.winRate}%
- MVP/Partida: ${tot.mvpRate}%
- MVP/Vitória: ${tot.mvpWinRate}%
- 🔍 Desempenho Total: ${desempenhoTotal}%
- ✅ Avaliação: ${avaliarDesempenho(role, desempenhoTotal)}${mensagemMultiplicador}`;

  document.getElementById("resultado").innerText = resultadoFinal;
}

    function limparCampos() {
      document.getElementById("jogador").value = "";
      document.getElementById("pokemon").value = "";
      document.getElementById("role").value = "";
      document.getElementById("dadosTexto").value = "";
      document.getElementById("imagemPokemon").style.display = "none";
      document.getElementById("resultado").innerText = "";
    }

    function copiarResultado() {
      const texto = document.getElementById("resultado").innerText;
      if (!texto) return alert("Nenhum resultado para copiar!");
      navigator.clipboard.writeText(texto);
      alert("Resultado copiado para a área de transferência!");
    }

function calcularDesempenhoCombinado(winRate, mvpWinRate, role) {
  const win = parseFloat(winRate);
  let mvp = parseFloat(mvpWinRate);

  // Aumenta o peso do MVP/Vitória para SUP e TANK
  if (role === "SUP" || role === "TANK") {
    mvp *= 2.5; // Multiplicador SUP TANK
  }

  return ((win + mvp) / 2).toFixed(2);
}
