// ====================================
// CALCULADORA WINRATE RANQUEADO - POKÉMON UNITE
// Versão Simplificada - Apenas nome e dados
// ====================================

console.log("🚀 winrate.js carregado!");

let rankData = {};

// ====================================
// FUNÇÕES DA CALCULADORA WINRATE
// ====================================

function carregarDadosRank() {
  const texto = document.getElementById("dadosTexto").value;
  if (!texto) {
    alert("Cole os dados ranqueados do site!");
    return false;
  }

  // Regex para extrair os dados em inglês e português
  const mvp = texto.match(/MVP\s*\*?\*?(\d+)\*?\*?/i)?.[1];
  
  const score = texto.match(/(?:Score|Pontuação)\s*\*?\*?(\d+)\*?\*?/i)?.[1];
  
  const totalBattles = texto.match(/(?:Total Battles|Batalhas totais)\s*\*?\*?(\d+)\*?\*?/i)?.[1];
  
  const wins = texto.match(/(?:No\.\s*Of\s*Wins|Total Wins|No\.\s*de\s*Vitórias|Vitórias\s*totais)\s*\*?\*?(\d+)\*?\*?/i)?.[1];
  
  const currentLoseStreak = texto.match(/(?:Current Lose Streak|Sequência\s*de\s*Derrotas\s*Atual)\s*\*?\*?(\d+)\*?\*?/i)?.[1];
  
  const currentWinStreak = texto.match(/(?:Current Win Streak|Sequência\s*de\s*Vitórias\s*Atual)\s*\*?\*?(\d+)\*?\*?/i)?.[1];
  
  const winStreakRecord = texto.match(/(?:Win Streak Record|Recorde\s*de\s*Sequência\s*de\s*Vitórias)\s*\*?\*?(\d+)\*?\*?/i)?.[1];
  
  const totalEliminations = texto.match(/(?:Total Eliminations|Eliminações\s*Totais)\s*\*?\*?(\d+)\*?\*?/i)?.[1];

  rankData = {
    mvp: parseInt(mvp) || 0,
    score: parseInt(score) || 0,
    totalBattles: parseInt(totalBattles) || 0,
    wins: parseInt(wins) || 0,
    currentLoseStreak: parseInt(currentLoseStreak) || 0,
    currentWinStreak: parseInt(currentWinStreak) || 0,
    winStreakRecord: parseInt(winStreakRecord) || 0,
    totalEliminations: parseInt(totalEliminations) || 0
  };

  rankData.losses = rankData.totalBattles - rankData.wins;

  if (rankData.totalBattles === 0) {
    alert("Dados inválidos. Verifique o conteúdo colado.");
    return false;
  }

  return true;
}

function calcularPorcentagens() {
  const winRate = rankData.totalBattles ? (rankData.wins / rankData.totalBattles) * 100 : 0;
  const mvpRate = rankData.totalBattles ? (rankData.mvp / rankData.totalBattles) * 100 : 0;
  const mediaScore = rankData.totalBattles ? rankData.score / rankData.totalBattles : 0;
  const mediaEliminations = rankData.totalBattles ? rankData.totalEliminations / rankData.totalBattles : 0;

  return {
    winRate: winRate.toFixed(2),
    mvpRate: mvpRate.toFixed(2),
    mediaScore: Math.round(mediaScore),
    mediaEliminations: mediaEliminations.toFixed(1)
  };
}

function avaliarPerformance(winRate) {
  const wr = parseFloat(winRate);
  if (wr < 40) return "Iniciante";
  if (wr < 50) return "Em Desenvolvimento";
  if (wr < 60) return "Competente";
  if (wr < 70) return "Experiente";
  if (wr < 80) return "Avançado";
  return "Master";
}

function formatarNumero(numero) {
  return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// ====================================
// FUNÇÕES GLOBAIS
// ====================================

window.calcularWinrate = function() {
  const jogador = document.getElementById("jogador").value;

  if (!jogador) {
    alert("Preencha o nome do jogador!");
    return;
  }

  if (!carregarDadosRank()) {
    return;
  }

  const stats = calcularPorcentagens();
  const performance = avaliarPerformance(stats.winRate);

  // Atualiza informações do jogador
  document.getElementById("info-jogador").innerHTML = `
    <div class="jogador-nome"><strong>👤 ${jogador}</strong></div>
  `;

  // Atualiza dados das estatísticas
  document.getElementById("dados-estatisticas").innerHTML = `
    <div class="stat-line">
      <span class="stat-label">Total de Partidas:</span>
      <span class="stat-value">${formatarNumero(rankData.totalBattles)}</span>
    </div>
    <div class="stat-line">
      <span class="stat-label">Vitórias:</span>
      <span class="stat-value">${formatarNumero(rankData.wins)}</span>
    </div>
    <div class="stat-line">
      <span class="stat-label">Derrotas:</span>
      <span class="stat-value">${formatarNumero(rankData.losses)}</span>
    </div>
    <div class="stat-line">
      <span class="stat-label">Win Rate:</span>
      <span class="stat-value winrate-highlight">${stats.winRate}%</span>
    </div>
    <div class="stat-line">
      <span class="stat-label">Total MVPs:</span>
      <span class="stat-value">${formatarNumero(rankData.mvp)}</span>
    </div>
    <div class="stat-line">
      <span class="stat-label">% MVPs:</span>
      <span class="stat-value">${stats.mvpRate}%</span>
    </div>
    <div class="stat-line">
      <span class="stat-label">Score Total:</span>
      <span class="stat-value">${formatarNumero(rankData.score)}</span>
    </div>
    <div class="stat-line">
      <span class="stat-label">Média de Score:</span>
      <span class="stat-value">${formatarNumero(stats.mediaScore)}</span>
    </div>
  `;

  // Atualiza dados de performance
  document.getElementById("dados-performance").innerHTML = `
    <div class="stat-line">
      <span class="stat-label">Total de Abates:</span>
      <span class="stat-value">${formatarNumero(rankData.totalEliminations)}</span>
    </div>
    <div class="stat-line">
      <span class="stat-label">Média de Abates:</span>
      <span class="stat-value">${stats.mediaEliminations}</span>
    </div>
    <div class="stat-line">
      <span class="stat-label">Sequência de Vitórias Atual:</span>
      <span class="stat-value">${rankData.currentWinStreak}</span>
    </div>
    <div class="stat-line">
      <span class="stat-label">Sequência de Derrotas Atual:</span>
      <span class="stat-value">${rankData.currentLoseStreak}</span>
    </div>
    <div class="stat-line streak-record">
      <span class="stat-label">🏆 Recorde de Win Streak:</span>
      <span class="stat-value">${rankData.winStreakRecord}</span>
    </div>
    <div class="avaliacao ${performance.toLowerCase().replace(' ', '-')}">
      🎯 Nível: ${performance}
    </div>
  `;

  // Mostra o container de resultado
  document.getElementById("resultado-completo").style.display = "flex";

  // Mantém a div resultado original preenchida para a função copiar
  const resultadoFinal = `🏆 RELATÓRIO WINRATE RANQUEADO - POKÉMON UNITE 🏆

👤 Jogador: ${jogador}

📊 ESTATÍSTICAS RANQUEADAS:
• Total de Partidas: ${formatarNumero(rankData.totalBattles)}
• Vitórias: ${formatarNumero(rankData.wins)}
• Derrotas: ${formatarNumero(rankData.losses)}
• Win Rate: ${stats.winRate}%
• Total MVPs: ${formatarNumero(rankData.mvp)}
• % MVPs: ${stats.mvpRate}%
• Score Total: ${formatarNumero(rankData.score)}
• Média de Score: ${formatarNumero(stats.mediaScore)}

🏆 PERFORMANCE:
• Total de Abates: ${formatarNumero(rankData.totalEliminations)}
• Média de Abates: ${stats.mediaEliminations}
• Sequência de Vitórias Atual: ${rankData.currentWinStreak}
• Sequência de Derrotas Atual: ${rankData.currentLoseStreak}
• 🏆 Recorde de Win Streak: ${rankData.winStreakRecord}
• 🎯 Nível de Performance: ${performance}

📊 Calculadora Guariní e-sport`;

  document.getElementById("resultado").innerText = resultadoFinal;
};

window.limparCampos = function() {
  document.getElementById("jogador").value = "";
  document.getElementById("dadosTexto").value = "";
  document.getElementById("resultado-completo").style.display = "none";
  document.getElementById("resultado").innerText = "";
  rankData = {};
};

window.copiarResultado = function() {
  const jogador = document.getElementById("jogador").value;

  if (!jogador || rankData.totalBattles === 0) {
    return alert("Nenhum resultado para copiar!");
  }

  const stats = calcularPorcentagens();
  const performance = avaliarPerformance(stats.winRate);

  const resultadoFinal = `🏆 RELATÓRIO WINRATE RANQUEADO - POKÉMON UNITE 🏆

👤 Jogador: ${jogador}

📊 ESTATÍSTICAS RANQUEADAS:
• Total de Partidas: ${formatarNumero(rankData.totalBattles)}
• Vitórias: ${formatarNumero(rankData.wins)}
• Derrotas: ${formatarNumero(rankData.losses)}
• Win Rate: ${stats.winRate}%
• Total MVPs: ${formatarNumero(rankData.mvp)}
• % MVPs: ${stats.mvpRate}%
• Score Total: ${formatarNumero(rankData.score)}
• Média de Score: ${formatarNumero(stats.mediaScore)}

🏆 PERFORMANCE:
• Total de Abates: ${formatarNumero(rankData.totalEliminations)}
• Média de Abates: ${stats.mediaEliminations}
• Sequência de Vitórias Atual: ${rankData.currentWinStreak}
• Sequência de Derrotas Atual: ${rankData.currentLoseStreak}
• 🏆 Recorde de Win Streak: ${rankData.winStreakRecord}
• 🎯 Nível de Performance: ${performance}

📊 Calculadora Guariní e-sport`;

  navigator.clipboard.writeText(resultadoFinal);
  alert("Resultado copiado para a área de transferência!");
};