document.addEventListener("DOMContentLoaded", () => {
    const filterCheckboxes = document.querySelectorAll(".class-filter");
    const rankingContainer = document.getElementById("tables-container");

    const metricDisplayNames = {
        kills: "Kills",
        assists: "Assists",
        damageHealed: "Cura",
        damageDone: "Dano Causado",
        damageTaken: "Dano Recebido",
        interrupts: "Interrupções",
        playerScore: "Pontuações",
    };

    // Variáveis para controle da ordenação
    let currentMetric = "kills";
    let sortBy = "metric"; // Pode ser: 'metric', 'average'
    let sortAscending = false;
    let lastSortedColumn = null;

    // Função para formatar números grandes (ex: 70963,86 → 70.963,86)
    const formatLargeNumber = (num) => {
        const parts = num.toFixed(2).split('.');
        const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `${integerPart},${parts[1]}`;
    };

    // Função para calcular médias por jogador
    const calculateAverages = (playersData) => {
        const playerStats = {};
        
        playersData.forEach(player => {
            if (!playerStats[player.playerName]) {
                playerStats[player.playerName] = {
                    total: 0,
                    count: 0
                };
            }
            playerStats[player.playerName].total += player.metricValue;
            playerStats[player.playerName].count += 1;
        });
        
        return playerStats;
    };

    // Função para carregar os dados e gerar a tabela
    const loadDataAndRenderTable = (metric) => {
        currentMetric = metric;
        fetch('./results.json')
            .then((response) => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                return response.json();
            })
            .then((results) => {
                const playersData = []; // Lista para armazenar os dados dos jogadores

                // Função para calcular as métricas dos jogadores
                const calculatePlayerMetrics = (teamType) => {
                    Object.entries(results[teamType] || {}).forEach(([playerName, pokemonData]) => {
                        if (playerName === "overall") return; // Ignora o "overall"

                        // Itera sobre os Pokémon usados pelo jogador
                        Object.entries(pokemonData || {}).forEach(([pokemon, data]) => {
                            (data.matches || []).forEach((match) => {
                                playersData.push({
                                    playerName,
                                    pokemonUsed: pokemon,
                                    metricValue: match[metric] || 0, // Adiciona a métrica desejada
                                });
                            });
                        });
                    });
                };

                // Calcula métricas para aliados e inimigos
                calculatePlayerMetrics("allyTeam");
                calculatePlayerMetrics("enemyTeam");

                // Calcula as médias por jogador
                const playerAverages = calculateAverages(playersData);

                // Adiciona a média a cada entrada do jogador
                playersData.forEach(player => {
                    player.averageValue = playerAverages[player.playerName].total / playerAverages[player.playerName].count;
                });

                // Ordena os jogadores
                let sortedPlayers;
                if (sortBy === 'average') {
                    sortedPlayers = playersData.sort((a, b) => 
                        sortAscending ? a.averageValue - b.averageValue : b.averageValue - a.averageValue
                    );
                } else {
                    sortedPlayers = playersData.sort((a, b) => 
                        sortAscending ? a.metricValue - b.metricValue : b.metricValue - a.metricValue
                    );
                }

                // Limpa o container antes de renderizar a nova tabela
                rankingContainer.innerHTML = "";

                // Criação da tabela com o design existente
                const table = document.createElement("table");
                table.style.borderCollapse = 'separate';
                table.style.borderSpacing = '0 5px';
                table.classList.add('w-full', 'h-fit');

                // Cabeçalho da tabela
                const headerTr = document.createElement("tr");
                headerTr.classList.add('text-left', 'text-white');
                
                // Criação das colunas do cabeçalho
                const rankTh = document.createElement("th");
                rankTh.classList.add('px-4', 'py-2', 'font-semibold', 'text-xl', 'w-20');
                rankTh.textContent = "Rank";
                
                const playerTh = document.createElement("th");
                playerTh.classList.add('px-4', 'py-2', 'font-semibold', 'text-xl', 'w-[200px]');
                playerTh.textContent = "Jogador";
                
                const pokemonTh = document.createElement("th");
                pokemonTh.classList.add('py-2', 'font-semibold', 'text-xl', 'w-[200px]');
                pokemonTh.textContent = "Pokémon";
                
                const metricTh = document.createElement("th");
                metricTh.classList.add('py-2', 'font-semibold', 'text-xl', 'w-[120px]', 'cursor-pointer');
                metricTh.textContent = metricDisplayNames[metric] || metric;
                
                const averageTh = document.createElement("th");
                averageTh.classList.add('py-2', 'font-semibold', 'text-xl', 'w-[120px]', 'cursor-pointer');
                averageTh.textContent = "Média";
                
                // Adiciona evento de clique para ordenar por média
                averageTh.addEventListener('click', () => {
                    if (lastSortedColumn === 'average') {
                        sortAscending = !sortAscending;
                    } else {
                        lastSortedColumn = 'average';
                        sortBy = 'average';
                        sortAscending = false;
                    }
                    loadDataAndRenderTable(currentMetric);
                });
                
                // Adiciona evento de clique para ordenar pela métrica principal
                metricTh.addEventListener('click', () => {
                    if (lastSortedColumn === 'metric') {
                        sortAscending = !sortAscending;
                    } else {
                        lastSortedColumn = 'metric';
                        sortBy = 'metric';
                        sortAscending = false;
                    }
                    loadDataAndRenderTable(currentMetric);
                });

                headerTr.appendChild(rankTh);
                headerTr.appendChild(playerTh);
                headerTr.appendChild(pokemonTh);
                headerTr.appendChild(metricTh);
                headerTr.appendChild(averageTh);
                
                table.appendChild(headerTr);

                // Renderização dos dados
                sortedPlayers.forEach((player, index) => {
                    const rowTr = document.createElement("tr");
                    rowTr.classList.add('text-left', 'font-bold', 'text-2xl', 'h-full');
                    rowTr.style.background = metric === "kills"
                        ? 'linear-gradient(to right, #f16c38, #ffffff)'
                        : metric === "assists"
                        ? 'linear-gradient(to right, #007bff, #ffffff)'
                        : metric === "damageHealed"
                        ? 'linear-gradient(to right, #4caf50, #ffffff)'
                        : metric === "damageTaken"
                        ? 'linear-gradient(to right, #e1b448, #ffffff)'
                        : metric === "damageDone"
                        ? 'linear-gradient(to right, #d980bd, #ffffff)'
                        : metric === "interrupts"
                        ? 'linear-gradient(to right, #80d9bb, #ffffff)'
                        : metric === "playerScore"
                        ? 'linear-gradient(to right, #faea07, #ffffff)'
                        : 'linear-gradient(to right, #e1b448, #ffffff)';

                    const rankTd = document.createElement("td");
                    rankTd.classList.add('text-left', 'p-3', 'font-bold', 'text-2xl');
                    rankTd.innerText = index + 1;
                    rowTr.appendChild(rankTd);

                    const playerTd = document.createElement("td");
                    playerTd.classList.add('text-black', 'font-bold', 'text-2xl');
                    playerTd.innerText = player.playerName;
                    rowTr.appendChild(playerTd);

                    const pokemonTd = document.createElement("td");
                    const pokemonImg = document.createElement("img");
                    pokemonImg.src = `./images/backgrounds/${player.pokemonUsed.toLowerCase()}-left-bg.png`;
                    pokemonImg.alt = player.pokemonUsed;
                    pokemonImg.style.width = '50px';
                    pokemonImg.style.height = '50px';
                    pokemonTd.appendChild(pokemonImg);
                    rowTr.appendChild(pokemonTd);

                    const metricTd = document.createElement("td");
                    metricTd.classList.add('text-black', 'font-bold', 'text-2xl');
                    metricTd.innerText = metric === "damageHealed" || metric === "damageDone" || metric === "damageTaken"
                        ? player.metricValue.toLocaleString("pt-BR") // Formata valores para o padrão brasileiro
                        : player.metricValue;
                    rowTr.appendChild(metricTd);

                    const averageTd = document.createElement("td");
                    averageTd.classList.add('text-black', 'font-bold', 'text-2xl');
                    averageTd.innerText = formatLargeNumber(player.averageValue);
                    rowTr.appendChild(averageTd);

                    table.appendChild(rowTr);
                });

                rankingContainer.appendChild(table);
            })
            .catch((error) => console.error("Erro ao carregar os dados:", error));
    };

    // Adiciona evento de clique aos checkboxes
    filterCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                filterCheckboxes.forEach((cb) => cb !== checkbox && (cb.checked = false));
                sortBy = "metric";
                sortAscending = false;
                lastSortedColumn = null;
                loadDataAndRenderTable(checkbox.value);
            }
        });
    });

    // Renderiza a tabela inicial com "kills"
    loadDataAndRenderTable("kills");
});