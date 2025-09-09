fetch('./results.json')
.then((response) => response.json())
.then((results) => {
    results = results || {};
    const containerDiv = document.getElementById("tables-container");

    // Menu dropdown
    const mainLogo = document.getElementById("mainLogo");  
    const dropdownMenu = document.createElement("div");
    dropdownMenu.classList.add("hidden", "absolute", "top-[110px]", "left-[20px]", "bg-white", "border", "border-gray-500", "rounded", "shadow-md", "w-[200px]", "font-bold");
    
    const mainMenuOption = document.createElement("div");
    mainMenuOption.classList.add("p-2", "cursor-pointer", "text-black", "hover:bg-gray-200");
    mainMenuOption.innerText = "Menu Principal";
    mainMenuOption.onclick = () => {
        window.location.href = window.location.pathname.replace('player-profile.html', 'indexStat.html');
    };
    dropdownMenu.appendChild(mainMenuOption);

    const allyOption = document.createElement("div");
    allyOption.classList.add("p-2", "cursor-pointer", "text-black", "hover:bg-gray-200");
    allyOption.innerText = "Aliados";
    allyOption.onclick = () => {
        window.location.href = 'show-result.html?id=allyTeam';
    };
    dropdownMenu.appendChild(allyOption);
        
    const enemyOption = document.createElement("div");
    enemyOption.classList.add("p-2", "cursor-pointer", "text-black", "hover:bg-gray-200");
    enemyOption.innerText = "Adversários";
    enemyOption.onclick = () => {
        window.location.href = 'show-result.html?id=enemyTeam';
    };
    dropdownMenu.appendChild(enemyOption);

    const banOption = document.createElement("div");
    banOption.classList.add("p-2", "cursor-pointer", "text-black", "hover:bg-gray-200");
    banOption.innerText = "Banimentos";
    banOption.onclick = () => {
        window.location.href = 'bans-result.html';
    };
    dropdownMenu.appendChild(banOption);

    mainLogo.appendChild(dropdownMenu);
    mainLogo.onclick = () => {
        dropdownMenu.classList.toggle("hidden");
    };

    // Função para calcular estatísticas dos jogadores
    const calculatePlayerStats = () => {
        const playerStats = {};

        // Processar dados da equipe aliada
        if (results.allyTeam) {
            Object.entries(results.allyTeam).forEach(([playerName, playerData]) => {
                if (!['overall', 'wins', 'losses'].includes(playerName)) {
                    if (!playerStats[playerName]) {
                        playerStats[playerName] = {
                            totalGames: 0,
                            totalWins: 0,
                            totalLosses: 0,
                            totalKills: 0,
                            totalAssists: 0,
                            totalInterrupts: 0,
                            totalDeaths: 0,
                            matchCount: 0,
                            mvpCount: 0
                        };
                    }

                    Object.values(playerData).forEach(pokemonData => {
                        const pickRate = parseFloat(pokemonData.pickRate || 0);
                        const winRate = parseFloat(pokemonData.winRate || 0);
                        const wins = (pickRate * winRate) / 100;
                        const losses = pickRate - wins;

                        playerStats[playerName].totalGames += pickRate;
                        playerStats[playerName].totalWins += wins;
                        playerStats[playerName].totalLosses += losses;

                        // Processar matches individuais para estatísticas detalhadas
                        if (pokemonData.matches) {
                            pokemonData.matches.forEach(match => {
                                playerStats[playerName].totalKills += match.kills || 0;
                                playerStats[playerName].totalAssists += match.assists || 0;
                                playerStats[playerName].totalInterrupts += match.interrupts || 0;
                                playerStats[playerName].totalDeaths += match.deaths || 0;
                                playerStats[playerName].matchCount++;
                            });
                        }
                    });
                }
            });
        }

        // Processar dados da equipe inimiga
        if (results.enemyTeam) {
            Object.entries(results.enemyTeam).forEach(([playerName, playerData]) => {
                if (!['overall', 'wins', 'losses'].includes(playerName)) {
                    if (!playerStats[playerName]) {
                        playerStats[playerName] = {
                            totalGames: 0,
                            totalWins: 0,
                            totalLosses: 0,
                            totalKills: 0,
                            totalAssists: 0,
                            totalInterrupts: 0,
                            totalDeaths: 0,
                            matchCount: 0,
                            mvpCount: 0
                        };
                    }

                    Object.values(playerData).forEach(pokemonData => {
                        const pickRate = parseFloat(pokemonData.pickRate || 0);
                        const winRate = parseFloat(pokemonData.winRate || 0);
                        const wins = (pickRate * winRate) / 100;
                        const losses = pickRate - wins;

                        playerStats[playerName].totalGames += pickRate;
                        playerStats[playerName].totalWins += wins;
                        playerStats[playerName].totalLosses += losses;

                        // Processar matches individuais para estatísticas detalhadas
                        if (pokemonData.matches) {
                            pokemonData.matches.forEach(match => {
                                playerStats[playerName].totalKills += match.kills || 0;
                                playerStats[playerName].totalAssists += match.assists || 0;
                                playerStats[playerName].totalInterrupts += match.interrupts || 0;
                                playerStats[playerName].totalDeaths += match.deaths || 0;
                                playerStats[playerName].matchCount++;
                            });
                        }
                    });
                }
            });
        }

        // Adicionar MVP counts
        if (results.mvpStats) {
            const mvpCountsWinner = results.mvpStats.playersWinner || {};
            const mvpCountsDefeated = results.mvpStats.playersDefeated || {};

            Object.entries(mvpCountsWinner).forEach(([player, count]) => {
                if (playerStats[player]) {
                    playerStats[player].mvpCount += count;
                }
            });

            Object.entries(mvpCountsDefeated).forEach(([player, count]) => {
                if (playerStats[player]) {
                    playerStats[player].mvpCount += count;
                }
            });
        }

        return playerStats;
    };

    const playerStats = calculatePlayerStats();

    // Função para calcular estatísticas calculadas
    const getCalculatedStats = (stats) => {
        const winRate = stats.totalGames > 0 ? (stats.totalWins / stats.totalGames) * 100 : 0;
        
        // Calcular médias por match
        const avgKills = stats.matchCount > 0 ? stats.totalKills / stats.matchCount : 0;
        const avgAssists = stats.matchCount > 0 ? stats.totalAssists / stats.matchCount : 0;
        const avgInterrupts = stats.matchCount > 0 ? stats.totalInterrupts / stats.matchCount : 0;
        
        // KAI ratio usando as médias
        const kaiRatio = (avgKills + avgAssists + avgInterrupts) / 3;
        
        return {
            winRate: winRate.toFixed(1),
            kaiRatio: kaiRatio.toFixed(2)
        };
    };

    // Exibir estatísticas gerais
    const displayGeneralStats = () => {
        const summaryInfo = document.getElementById("statisticsInfo");
        const totalPlayers = Object.keys(playerStats).length;
        let totalGames = 0;
        let totalMvps = 0;

        Object.values(playerStats).forEach(stats => {
            totalGames += stats.totalGames;
            totalMvps += stats.mvpCount;
        });

        const avgGamesPerPlayer = totalPlayers > 0 ? (totalGames / totalPlayers).toFixed(1) : '0.0';

        const mainContainer = document.createElement("div");
        mainContainer.className = "flex flex-col gap-2";

        const createStatItem = (label, value) => {
            const statDiv = document.createElement("div");
            statDiv.className = "flex flex-row items-center gap-1";
            statDiv.innerHTML = `
                <span class="font-semibold text-sm md:text-base text-white">${label}:</span>
                <span class="font-bold text-base md:text-lg text-white">${value}</span>
            `;
            return statDiv;
        };

        mainContainer.appendChild(createStatItem("Total de Jogadores", totalPlayers));
        mainContainer.appendChild(createStatItem("Média de Partidas", avgGamesPerPlayer));
        mainContainer.appendChild(createStatItem("Total MVPs", totalMvps));

        summaryInfo.appendChild(mainContainer);
    };

    displayGeneralStats();

    // Função para renderizar tabela de jogadores
    const renderPlayerTable = () => {
        const table = document.createElement("table");

        table.style.borderCollapse = 'separate';
        table.style.borderSpacing = '0 8px';
        table.style.width = '100%';
        table.style.maxWidth = '1200px'; 
        table.style.margin = '0 auto'; 
        table.classList.add('w-full', 'h-fit');
        
        // CRIAR O CABEÇALHO DENTRO DA TABELA
        const thead = document.createElement("thead");
        table.appendChild(thead);
        
        const headerTr = document.createElement("tr");
        thead.appendChild(headerTr);
        
        headerTr.classList.add('sticky', 'top-0', 'z-10');
        headerTr.style.cssText = `
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        `;
        
        const createHeaderCell = (text, width = '') => {
            const th = document.createElement("th");
            th.classList.add('px-4', 'py-3', 'font-semibold', 'text-lg', 'text-white', 'text-center');
            if (width) th.style.width = width;
            th.innerText = text;
            return th;
        };

        // CABEÇALHOS
        headerTr.appendChild(createHeaderCell('Rank', '80px'));
        headerTr.appendChild(createHeaderCell('Jogador', '250px'));
        headerTr.appendChild(createHeaderCell('PJ', '100px'));
        headerTr.appendChild(createHeaderCell('WR', '100px'));
        headerTr.appendChild(createHeaderCell('KAI', '100px'));
        headerTr.appendChild(createHeaderCell('MVP', '100px'));
        headerTr.appendChild(createHeaderCell('GR', '200px'));
        
        // CRIAR O TBODY PARA OS DADOS
        const tbody = document.createElement("tbody");
        table.appendChild(tbody);
        
        containerDiv.appendChild(table);

        // Ordenar jogadores por partidas jogadas (decrescente)
        const sortedPlayers = Object.entries(playerStats).sort(([,a], [,b]) => {
            return b.totalGames - a.totalGames;
        });

        sortedPlayers.forEach(([playerName, stats], index) => {
            const calculated = getCalculatedStats(stats);

            const rowTr = document.createElement("tr");
            
            rowTr.style.cssText = `
                background: rgba(59, 130, 246, 0.2);
                border-radius: 12px;
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;
            `;
            
            rowTr.addEventListener('mouseenter', () => {
                rowTr.style.background = 'rgba(59, 130, 246, 0.4)';
                rowTr.style.transform = 'translateY(-2px)';
                rowTr.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
            });
            
            rowTr.addEventListener('mouseleave', () => {
                rowTr.style.background = 'rgba(59, 130, 246, 0.2)';
                rowTr.style.transform = 'translateY(0)';
                rowTr.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
            });
            
            // RANK
            const rankTd = document.createElement("td");
            rankTd.classList.add('text-center', 'p-3', 'font-bold', 'text-2xl', 'text-white');
            rankTd.style.width = '80px';
            rankTd.innerText = index + 1;
            rowTr.appendChild(rankTd);

            // JOGADOR
            const playerTd = document.createElement("td");
            playerTd.style.width = '250px';
            playerTd.classList.add('p-3');
            
            const playerContainer = document.createElement("div");
            playerContainer.classList.add('flex', 'items-center', 'justify-center');
            
            const playerSpan = document.createElement("span");
            playerSpan.classList.add('text-xl', 'font-bold', 'text-white');
            playerSpan.innerText = playerName;
            
            playerContainer.appendChild(playerSpan);
            playerTd.appendChild(playerContainer);
            rowTr.appendChild(playerTd);

            // PARTIDAS JOGADAS
            const gamesTd = document.createElement("td");
            gamesTd.classList.add('text-white', 'font-bold', 'text-xl', 'text-center', 'p-3');
            gamesTd.style.width = '100px';
            gamesTd.innerText = Math.round(stats.totalGames);
            rowTr.appendChild(gamesTd);

            // WIN RATE
            const winRateTd = document.createElement("td");
            winRateTd.classList.add('text-white', 'font-bold', 'text-xl', 'text-center', 'p-3');
            winRateTd.style.width = '100px';
            winRateTd.innerText = `${calculated.winRate}%`;
            rowTr.appendChild(winRateTd);

            // KAI RATIO
            const kaiTd = document.createElement("td");
            kaiTd.classList.add('text-white', 'font-bold', 'text-xl', 'text-center', 'p-3');
            kaiTd.style.width = '100px';
            kaiTd.innerText = calculated.kaiRatio;
            rowTr.appendChild(kaiTd);

            // MVP COUNT
            const mvpTd = document.createElement("td");
            mvpTd.classList.add('text-white', 'font-bold', 'text-xl', 'text-center', 'p-3');
            mvpTd.style.width = '100px';
            mvpTd.innerText = stats.mvpCount;
            rowTr.appendChild(mvpTd);

            // GRÁFICO DE WINRATE
            const graphTd = document.createElement("td");
            graphTd.classList.add('text-center', 'p-3');
            graphTd.style.width = '200px';

            const winRateBarContainer = document.createElement("div");
            winRateBarContainer.classList.add('w-full', 'bg-gray-200', 'rounded-full', 'h-4');
            winRateBarContainer.style.width = '150px';
            winRateBarContainer.style.margin = '0 auto';

            const winRateBar = document.createElement("div");
            winRateBar.classList.add('h-4', 'rounded-full');
            winRateBar.style.width = `${Math.min(parseFloat(calculated.winRate), 100)}%`;
            
            // Cor baseada no winrate
            if (parseFloat(calculated.winRate) >= 60) {
                winRateBar.style.backgroundColor = 'rgb(29, 181, 52)'; // Verde
            } else if (parseFloat(calculated.winRate) >= 40) {
                winRateBar.style.backgroundColor = 'rgb(234, 179, 8)'; // Amarelo
            } else {
                winRateBar.style.backgroundColor = 'rgb(239, 68, 68)'; // Vermelho
            }

            winRateBarContainer.appendChild(winRateBar);
            graphTd.appendChild(winRateBarContainer);
            rowTr.appendChild(graphTd);

            // Adicionar evento de click (opcional - para futuras funcionalidades)
            rowTr.classList.add('cursor-pointer');
            rowTr.onclick = () => {
                window.location.href = `show-result.html?id=${encodeURIComponent(playerName)}`;
            };


            tbody.appendChild(rowTr);
        });
    };

    renderPlayerTable();

    // Fechar dropdown quando clicar fora
    document.addEventListener('click', (event) => {
        if (!mainLogo.contains(event.target)) {
            dropdownMenu.classList.add('hidden');
        }
    });
});