fetch('./results.json')
.then((response) => response.json())
.then((results) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const infoType = urlParams.get('id');
    results = results || {}
    
    // ✅ CORREÇÃO: Definir valores padrão se não existirem no localStorage
    const filterType = localStorage.getItem('pokemonFilterAttribute') || 'pickRate';
    const orderFilter = localStorage.getItem('pokemonFilterOrder') || 'desc';
    
    // ✅ CORREÇÃO: Definir variáveis que estavam undefined
    const filterAttr = filterType; // Estava usando filterAttr sem definir
    const filterOrder = orderFilter;
    
    const containerDiv = document.getElementById("tables-container");

    const getObjectAttribute = () => {
        if (infoType === 'allyTeam' || infoType === 'enemyTeam') {
            return results[infoType].overall
        } else {
            const { allyTeam } = results;
            return allyTeam[infoType];
        }
    }
    
    const objAttribute = getObjectAttribute();
    
    // ✅ CORREÇÃO: Verificar se objAttribute existe antes de continuar
    if (!objAttribute) {
        console.error('Dados não encontrados para:', infoType);
        document.body.innerHTML = '<div class="flex items-center justify-center h-screen"><h1 class="text-2xl text-red-500">Dados não encontrados</h1></div>';
        return;
    }
    
    const getTitle = () => {
        if (infoType === 'allyTeam') {
            return 'DADOS'
        } else if (infoType === 'enemyTeam') {
            return 'DADOS'
        } else {
            return infoType;
        }
    }
    
    const mainLogo = document.getElementById("mainLogo");  

    const dropdownMenu = document.createElement("div");
    dropdownMenu.classList.add("hidden", "absolute", "top-[110px]", "left-[20px]", "bg-white", "border", "border-gray-500", "rounded", "shadow-md", "w-[200px]", "font-bold");
    
    const mainMenuOption = document.createElement("div");
    mainMenuOption.classList.add("p-2", "cursor-pointer", "text-black", "hover:bg-gray-200");
    mainMenuOption.innerText = "Menu Principal";
    mainMenuOption.onclick = () => {
        window.location.href = window.location.pathname.replace('show-result.html', 'indexStat.html');
    };
    dropdownMenu.appendChild(mainMenuOption);

    const allyOption = document.createElement("div");
    allyOption.classList.add("p-2", "cursor-pointer", "text-black", "hover:bg-gray-200");
    allyOption.innerText = "Aliados";
    allyOption.onclick = () => {
        window.location.search = `?id=allyTeam`;
    };
    dropdownMenu.appendChild(allyOption);
        
    const enemyOption = document.createElement("div");
    enemyOption.classList.add("p-2", "cursor-pointer", "text-black", "hover:bg-gray-200");
    enemyOption.innerText = "Adversários";
    enemyOption.onclick = () => {
        window.location.search = `?id=enemyTeam`;
    }
    dropdownMenu.appendChild(enemyOption);

    const banOption = document.createElement("div");
    banOption.classList.add("p-2", "cursor-pointer", "text-black", "hover:bg-gray-200");
    banOption.innerText = "Banimentos";
    banOption.onclick = () => {
        window.location.href = window.location.href.replace('show-result.html', 'bans-result.html');
    }
    dropdownMenu.appendChild(banOption);

    mainLogo.appendChild(dropdownMenu);
        
    mainLogo.onclick = () => {
        dropdownMenu.classList.toggle("hidden");
    };

    console.log('filterType:', filterType);
    console.log('orderFilter:', orderFilter);
    console.log('objAttribute:', objAttribute);
    console.log('objAttribute keys:', Object.keys(objAttribute));

    const sortValues = (obj, attribute, order) => {
        const keys = Object.keys(obj);
        const secondAttribute = attribute === 'pickRate' ? 'winRate' : 'pickRate';

        return keys.sort((a, b) => {
            if (obj[a][attribute] !== obj[b][attribute]) {
                return order === 'desc' ? obj[b][attribute] - obj[a][attribute] : obj[a][attribute] - obj[b][attribute];
            } else {
                return order === 'desc' ? obj[b][secondAttribute] - obj[a][secondAttribute] : obj[a][secondAttribute] - obj[b][secondAttribute];
            }
        });
    }

    const summaryInfo = document.getElementById("statisticsInfo")
    const displaySummaryInfo = () => {
        let totalPickRate = 0;
        let totalWins = 0;

        Object.values(objAttribute).forEach(pokemon => {
            totalPickRate += parseFloat(pokemon.pickRate || 0);
            totalWins += parseFloat(pokemon.wins || 0);
        });

        const overallWinRate = totalPickRate > 0
            ? ((totalWins / totalPickRate) * 100).toFixed(1) : '0.00';

        const playerId = infoType;
        const mvpCountsWinner = results.mvpStats?.playersWinner || {};
        const mvpCountsDefeated = results.mvpStats?.playersDefeated || {};

        const combinedMvpCounts = { ...mvpCountsWinner };

        Object.entries(mvpCountsDefeated).forEach(([player, count]) => {
            combinedMvpCounts[player] = (combinedMvpCounts[player] || 0) + count;
        });

        const playerMvpCount = combinedMvpCounts[playerId] || 0;

        const totalMatches = totalPickRate > 0 ? (totalPickRate / 5).toFixed(0) : 0;

        let opponentKills = 0;

        if (infoType === "allyTeam") {
            opponentKills = parseFloat(results?.totalKillsSummary?.enemyTeam || 0);
        } else if (infoType === "enemyTeam") {
            opponentKills = parseFloat(results?.totalKillsSummary?.allyTeam || 0);
        }

        const averageKills = totalMatches > 0 
            ? (opponentKills / totalMatches).toFixed(1)
            : '0.00';


        let performanceText = "";
        let performanceColor = "";
        let borderColor = "";

        if (overallWinRate >= 0 && overallWinRate <= 20) {
            performanceText = `Desempenho extremamente baixo`;
            performanceColor = "rgba(255, 0, 0, 0.8)";
            borderColor = "rgba(255, 0, 0, 0.5)";
        } else if (overallWinRate > 20 && overallWinRate <= 40) {
            performanceText = `Desempenho baixo`;
            performanceColor = "rgba(255, 165, 0, 0.8)";
            borderColor = "rgba(255, 165, 0, 0.5)";
        } else if (overallWinRate > 40 && overallWinRate <= 60) {
            performanceText = `Desempenho razoável`;
            performanceColor = "rgba(255, 255, 0, 0.8)";
            borderColor = "rgba(255, 255, 0, 0.5)";
        } else if (overallWinRate > 60 && overallWinRate <= 80) {
            performanceText = `Desempenho bom`;
            performanceColor = "rgba(0, 0, 255, 0.8)";
            borderColor = "rgba(0, 0, 255, 0.5)";
        } else if (overallWinRate > 80 && overallWinRate <= 100) {
            performanceText = `Desempenho excelente`;
            performanceColor = "rgba(0, 128, 0, 0.8)";
            borderColor = "rgba(0, 128, 0, 0.5)";
        }

        const summaryDiv = document.createElement("div");
        summaryDiv.className = "text-white p-2 flex justify-around";

        if (infoType === "allyTeam" || infoType === "enemyTeam") {
            const lastGameDateDiv = document.createElement("div");
            lastGameDateDiv.className = "flex flex-col items-center";
            const lastMatchDate = results.lastMatchDate || "Data não disponível";
            lastGameDateDiv.innerHTML = `
                <div class="font-semibold text-xl text-black">Última Partida</div>
                <div class="font-bold text-2xl text-black">${lastMatchDate}h</div>
            `;
            summaryDiv.appendChild(lastGameDateDiv);
        }

        // Winrate
        const winRateDiv = document.createElement("div");
        winRateDiv.className = "flex flex-col items-center";
        winRateDiv.innerHTML = `
            <div class="font-semibold text-xl text-black">Winrate</div>
            <div class="font-bold text-2xl text-black">${overallWinRate}%</div>
        `;

        // MVP Count e Partidas (apenas para jogadores individuais)
        if (infoType !== "allyTeam" && infoType !== "enemyTeam") {
        // MVP Count
        const mvpCountDiv = document.createElement("div");
        mvpCountDiv.className = "flex flex-col items-center"; // Adicionei margens
        mvpCountDiv.innerHTML = `
            <div class="font-semibold text-xl text-black">MVP Count</div>
            <div class="font-bold text-2xl text-black">${playerMvpCount}</div>
        `;
        summaryDiv.appendChild(mvpCountDiv);

        // Partidas
        const matchesDiv = document.createElement("div");
        matchesDiv.className = "flex flex-col items-center";
        matchesDiv.innerHTML = `
            <div class="font-semibold text-xl text-black">Partidas</div>
            <div class="font-bold text-2xl text-black">${totalPickRate}</div>
        `;
        summaryDiv.appendChild(matchesDiv);

        // Função para calcular médias (mantida igual)
        const calculatePlayerAverages = (playerName) => {
            const metrics = {
                kills: 0,
                assists: 0,
                damageHealed: 0,
                damageDone: 0,
                damageTaken: 0,
                interrupts: 0,
                playerScore: 0
            };
            let matchCount = 0;

            ["allyTeam", "enemyTeam"].forEach(teamType => {
                if (results[teamType] && results[teamType][playerName]) {
                    Object.values(results[teamType][playerName]).forEach(pokemonData => {
                        (pokemonData.matches || []).forEach(match => {
                            Object.keys(metrics).forEach(metric => {
                                metrics[metric] += match[metric] || 0;
                            });
                            matchCount++;
                        });
                    });
                }
            });

            if (matchCount > 0) {
                Object.keys(metrics).forEach(metric => {
                    metrics[metric] = metrics[metric] / matchCount;
                });
            }

            return metrics;
        };

        // Adicionar métricas individuais diretamente na summaryDiv
        const playerAverages = calculatePlayerAverages(infoType);

        const formatLargeNumber = (num) => {
            if (num >= 1000) {
                const formatted = (num / 1000).toFixed(1);
                // Remove .0 caso seja número redondo (ex: 5.0k → 5k)
                return formatted.endsWith('.0') ? `${formatted.split('.')[0]}k` : `${formatted}k`;
            }
            return num.toFixed(1); // Para números menores que 1000, mostra com 1 decimal
        };

        // Kills
        const killsDiv = document.createElement("div");
        killsDiv.className = "flex flex-col items-center";
        killsDiv.innerHTML = `
            <div class="font-semibold text-xl text-black">Média de Kills</div>
            <div class="font-bold text-2xl text-black">${playerAverages.kills.toFixed(2)}</div>
        `;
        summaryDiv.appendChild(killsDiv);

        // Assists
        const assistsDiv = document.createElement("div");
        assistsDiv.className = "flex flex-col items-center";
        assistsDiv.innerHTML = `
            <div class="font-semibold text-xl text-black">Média de Assists</div>
            <div class="font-bold text-2xl text-black">${playerAverages.assists.toFixed(2)}</div>
        `;
        summaryDiv.appendChild(assistsDiv);

        // Cura
        const healingDiv = document.createElement("div");
        healingDiv.className = "flex flex-col items-center";
        healingDiv.innerHTML = `
            <div class="font-semibold text-xl text-black">Média de Cura</div>
            <div class="font-bold text-2xl text-black">${formatLargeNumber(playerAverages.damageHealed)}</div>
        `;
        summaryDiv.appendChild(healingDiv);

        // Dano Causado
        const damageDoneDiv = document.createElement("div");
        damageDoneDiv.className = "flex flex-col items-center";
        damageDoneDiv.innerHTML = `
            <div class="font-semibold text-xl text-black">Média de Dano Causado</div>
            <div class="font-bold text-2xl text-black">${formatLargeNumber(playerAverages.damageDone)}</div>
        `;
        summaryDiv.appendChild(damageDoneDiv);

        // Dano Recebido
        const damageTakenDiv = document.createElement("div");
        damageTakenDiv.className = "flex flex-col items-center";
        damageTakenDiv.innerHTML = `
            <div class="font-semibold text-xl text-black">Média de Dano Recebido</div>
            <div class="font-bold text-2xl text-black">${formatLargeNumber(playerAverages.damageTaken)}</div>
        `;
        summaryDiv.appendChild(damageTakenDiv);

        // Interrupções
        const interruptsDiv = document.createElement("div");
        interruptsDiv.className = "flex flex-col items-center";
        interruptsDiv.innerHTML = `
            <div class="font-semibold text-xl text-black">Média de Interrupções</div>
            <div class="font-bold text-2xl text-black">${playerAverages.interrupts.toFixed(2)}</div>
        `;
        summaryDiv.appendChild(interruptsDiv);

        // Pontuação
        const scoreDiv = document.createElement("div");
        scoreDiv.className = "flex flex-col items-center";
        scoreDiv.innerHTML = `
            <div class="font-semibold text-xl text-black">Média de Pontuação</div>
            <div class="font-bold text-2xl text-black">${playerAverages.playerScore.toFixed(2)}</div>
        `;
        summaryDiv.appendChild(scoreDiv);
        }

        // Total Matches
        if (infoType === "allyTeam" || infoType === "enemyTeam") {
            const totalMatchesDiv = document.createElement("div");
            totalMatchesDiv.className = "flex flex-col items-center";
            totalMatchesDiv.innerHTML = `
                <div class="font-semibold text-xl text-black">Total Partidas</div>
                <div class="font-bold text-2xl text-black">${totalMatches}</div>
        `;
        summaryDiv.appendChild(totalMatchesDiv);
        }

        // Média de Mortes
        if (infoType === "allyTeam" || infoType === "enemyTeam") {
            const averageKillsDiv = document.createElement("div");
            averageKillsDiv.className = "flex flex-col items-center";
            averageKillsDiv.innerHTML = `
                <div class="font-semibold text-xl text-black">Média de Mortes</div>
                <div class="font-bold text-2xl text-black">${averageKills}</div>
            `;
            summaryDiv.appendChild(averageKillsDiv);
        }

        summaryDiv.appendChild(winRateDiv);

        if (infoType === "allyTeam" || infoType === "enemyTeam") {
            const streakData = results.teamStreak?.[infoType] || { maxWinStreak: 0, maxLoseStreak: 0 };
        
            // Maior Sequência de Vitórias
            const maxWinStreakDiv = document.createElement("div");
            maxWinStreakDiv.className = "flex flex-col items-center";
            maxWinStreakDiv.innerHTML = `
                <div class="font-semibold text-xl text-black">Win Streak</div>
                <div class="font-bold text-2xl text-black">${streakData.maxWinStreak}</div>
            `;
        
            // Maior Sequência de Derrotas
            const maxLoseStreakDiv = document.createElement("div");
            maxLoseStreakDiv.className = "flex flex-col items-center";
            maxLoseStreakDiv.innerHTML = `
                <div class="font-semibold text-xl text-black">Lose Streak</div>
                <div class="font-bold text-2xl text-black">${streakData.maxLoseStreak}</div>
            `;
        
            summaryDiv.appendChild(maxWinStreakDiv);
            summaryDiv.appendChild(maxLoseStreakDiv);
        }

        const performanceDiv = document.createElement("div");
        performanceDiv.className = "mt-2 text-center justify-center p-4 rounded-lg";
        performanceDiv.style.backgroundColor = performanceColor;
        performanceDiv.style.opacity = "0.8";
        performanceDiv.style.border = `2px solid ${borderColor}`;

        const performanceTextSpan = document.createElement("span");
        performanceTextSpan.className = "text-lg font-semibold text-black";
        performanceTextSpan.style.opacity = "1.0";
        performanceTextSpan.innerText = performanceText;

        performanceDiv.appendChild(performanceTextSpan);
        summaryDiv.appendChild(performanceDiv);
        summaryInfo.appendChild(summaryDiv);
    };
    displaySummaryInfo();

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const sortedKeys = sortValues(objAttribute, filterType, orderFilter);
    const pokemonKeys = sortedKeys;

    const titleSpan = document.getElementById("title-span");
    titleSpan.innerText = getTitle();

    const filterSpan = document.getElementById("filter-text");
    filterSpan.innerText = `Ordenado por: ${capitalize(filterAttr)} - ${filterOrder === 'asc' ? 'Crescente' : 'Decrescente'}`;

    function applyFilters() {
        const selectedClasses = Array.from(document.querySelectorAll('.class-filter:checked'))
        .map(checkbox => checkbox.value);
        
        if (selectedClasses.includes('Todos')) {
            renderRankingTable(pokemonKeys);
        } else {
            const filteredKeys = pokemonKeys.filter(pokemonName => {
                const role = pokemonRoles[pokemonName];
                return selectedClasses.includes(role);
            });
            renderRankingTable(filteredKeys);
        }
    } 

    document.addEventListener('DOMContentLoaded', () => {
        const allCheckbox = document.querySelector('.class-filter[value="Todos"]');
        if (allCheckbox) {
            allCheckbox.checked = true;
        }
        applyFilters();
    });

    document.querySelectorAll('.class-filter').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    function renderRankingTable(filteredPokemonKeys) {
        containerDiv.innerHTML = '';
        const amount = filteredPokemonKeys.length;
        const amountResult = [];
        let lastestIndex = 0;
        
        for (let i = 0; i < amount; i++) {
            amountResult[lastestIndex] = amountResult[lastestIndex] || [];
            amountResult[lastestIndex].push(i);
            if (lastestIndex === 0) {
                lastestIndex = 0;
            }
        }     

        let cumulativeLength = 0;
        let startIndex = 0;
        for (let i = 0; i < amountResult.length; i++) {
            const sideLength = cumulativeLength + amountResult[i].length;
            renderCommonInfo(sideLength, true, startIndex, filteredPokemonKeys);
            startIndex += amountResult[i].length;
            cumulativeLength += amountResult[i].length;
        }
    }

    const cabecalhoTable = document.getElementById("topicInfo")

    // ✅ CORREÇÃO: Criar uma tabela para o cabeçalho com estrutura correta
    const headerTable = document.createElement("table");
    headerTable.classList.add('w-full', 'table-fixed', 'border-collapse'); 
    cabecalhoTable.appendChild(headerTable);

    const thead = document.createElement("thead");
    headerTable.appendChild(thead);

    const headerTr = document.createElement("tr");
    thead.appendChild(headerTr);

    const createHeaderCell = (text, widthClass = '') => {
        const th = document.createElement("th");
        th.classList.add('px-2', 'py-2', 'font-semibold', 'text-sm', 'text-center', 'text-black', widthClass);
        th.innerText = text;
        return th;
    };

    // Aqui definimos as larguras uma vez só
    headerTr.appendChild(createHeaderCell('Rank', 'w-[80px]'));
    headerTr.appendChild(createHeaderCell('Pick', 'w-[200px]'));
    headerTr.appendChild(createHeaderCell('Pickrate', 'w-[120px]'));
    headerTr.appendChild(createHeaderCell('Winrate', 'w-[120px]'));
    headerTr.appendChild(createHeaderCell('Gráfico', 'w-[140px]'));
    headerTr.appendChild(createHeaderCell('Win Streak', 'w-[120px]'));
    headerTr.appendChild(createHeaderCell('Lose Streak', 'w-[120px]'));
    headerTr.appendChild(createHeaderCell('Última Partida', 'w-[140px]'));
    headerTr.appendChild(createHeaderCell('Índice', 'w-[100px]'));

    const renderCommonInfo = (sideLength, isLeftSide, firstIndex, pokemonKeys) => {
        const table = document.createElement("table");
    
        table.style.borderCollapse = 'separate';
        table.style.borderSpacing = '0 2px';
        table.style.width = '100%';
        table.style.marginBottom = '4px';
        table.classList.add('w-full', 'h-fit');
        
        containerDiv.appendChild(table);
    
        for (let i = firstIndex; i < sideLength; i++) {
            const pokemonName = pokemonKeys[i];
            const pokemon = objAttribute[pokemonName];
            
            // ✅ CORREÇÃO: Verificar se pokemon existe
            if (!pokemon) {
                console.warn(`Pokemon ${pokemonName} não encontrado em objAttribute`);
                continue;
            }
            
            const { pickRate, winRate, isUp, maxWinStreak, maxLoseStreak } = pokemon;
            const role = pokemonRoles[pokemonName]; // Fallback para role
    
            const rowTr = document.createElement("tr");
            rowTr.classList.add('cursor-pointer', 'flex', 'w-full');
            rowTr.onclick = () => {
                window.location.href = (`pokemon-result.html?id=${infoType}&pokemon=${pokemonName}`);
            };
    
            const rankTd = document.createElement("td");
            rankTd.classList.add('text-center', 'p-3', 'font-bold', 'text-2xl', 'w-20', 'flex', 'items-center', 'justify-center');
            rankTd.style.backgroundColor = rolesColor[role];
            rankTd.innerText = i + 1;
            rowTr.appendChild(rankTd);
    
            const pickTd = document.createElement("td");
            pickTd.classList.add('w-[500px]', 'flex', 'items-center');
            pickTd.style.background = `linear-gradient(to right, ${rolesColor[role]}, rgb(255, 255, 255))`;
            
            const pickContainer = document.createElement("div");
            pickContainer.classList.add('flex', 'items-center', 'p-2');
            
            const pickImage = document.createElement("img");
            pickImage.classList.add('mr-3');
            pickImage.width = 50;
            pickImage.height = 50;
            pickImage.src = `images/backgrounds/${pokemonName}-left-bg.png`;
            pickContainer.appendChild(pickImage);
    
            const pickSpan = document.createElement("span");
            pickSpan.classList.add('pl-1.5', 'text-xl', 'font-bold');
            pickSpan.innerText = capitalize(pokemonName);
            pickContainer.appendChild(pickSpan);
            
            pickTd.appendChild(pickContainer);
            rowTr.appendChild(pickTd);
    
            const pickRateTd = document.createElement("td");
            pickRateTd.classList.add('text-black', 'font-bold', 'text-xl', 'text-center', 'w-48', 'flex', 'items-center', 'justify-center');
            pickRateTd.style.backgroundColor = 'white';
            pickRateTd.innerText = pickRate || 0;
            rowTr.appendChild(pickRateTd);
    
            const winRateTd = document.createElement("td");
            winRateTd.classList.add('text-black', 'text-xl', 'font-bold', 'w-80', 'flex', 'items-center', 'justify-center');
            winRateTd.style.backgroundColor = 'white';
            
            const winRateSpan = document.createElement("span");
            winRateSpan.classList.add('text-black', 'text-xl', 'font-bold');
            winRateSpan.innerText = `${(winRate || 0).toFixed(2)}%`;
            winRateTd.appendChild(winRateSpan);
            rowTr.appendChild(winRateTd);
    
            const winRateBarTd = document.createElement("td");
            winRateBarTd.classList.add('text-black', 'w-60', 'flex', 'items-center', 'justify-center');
            winRateBarTd.style.backgroundColor = 'white';
            
            const winRateBarContainer = document.createElement("div");
            winRateBarContainer.classList.add('bg-gray-200', 'rounded-full', 'h-4');
            winRateBarContainer.style.width = '120px';
            
            const winRateBar = document.createElement("div");
            winRateBar.classList.add('h-4', 'rounded-full');
            winRateBar.style.width = `${winRate || 0}%`;
            winRateBar.style.backgroundColor = 'rgb(29, 181, 52)';
            winRateBarContainer.appendChild(winRateBar);
            winRateBarTd.appendChild(winRateBarContainer);
            rowTr.appendChild(winRateBarTd);

            const maxWinStreakTd = document.createElement("td");
            maxWinStreakTd.classList.add('text-black', 'text-center', 'font-bold', 'text-xl', 'w-60', 'flex', 'items-center', 'justify-center');
            maxWinStreakTd.style.backgroundColor = 'white';
            maxWinStreakTd.innerText = maxWinStreak || 0;
            rowTr.appendChild(maxWinStreakTd);

            const maxLoseStreakTd = document.createElement("td");
            maxLoseStreakTd.classList.add('text-black', 'text-center', 'font-bold', 'text-xl', 'w-60', 'flex', 'items-center', 'justify-center');
            maxLoseStreakTd.style.backgroundColor = 'white';
            maxLoseStreakTd.innerText = maxLoseStreak || 0;
            rowTr.appendChild(maxLoseStreakTd);

            const lastMatchTd = document.createElement("td");
            lastMatchTd.classList.add('text-black', 'text-center', 'font-bold', 'text-xl', 'w-60', 'flex', 'items-center', 'justify-center');
            lastMatchTd.style.backgroundColor = 'white';
            
            if (pokemon.lastMatch === 'W') {
                lastMatchTd.style.color = 'green';
                lastMatchTd.innerText = 'W';
            } else if (pokemon.lastMatch === 'L') {
                lastMatchTd.style.color = 'red';
                lastMatchTd.innerText = 'L';
            } else {
                lastMatchTd.style.color = 'black';
                lastMatchTd.innerText = '-';
            }
            
            rowTr.appendChild(lastMatchTd);

            const lastGameTd = document.createElement("td");
            lastGameTd.classList.add('w-60', 'flex', 'items-center', 'justify-center');
            lastGameTd.style.backgroundColor = 'white';

            const arrowImage = document.createElement("img");
            arrowImage.width = 25;
            arrowImage.height = 25;

            let arrowImgSrc = 'neutral-arrow';
            if (isUp !== undefined) {
                arrowImgSrc = `${isUp ? 'up-arrow' : 'down-arrow'}.svg`;
            } else {
                arrowImgSrc = 'neutral-arrow.png';
            }
            arrowImage.src = `images/icons/${arrowImgSrc}`;

            lastGameTd.appendChild(arrowImage);
            rowTr.appendChild(lastGameTd);

            table.appendChild(rowTr);
            
        }
    };
    
    applyFilters(); 

    document.addEventListener('click', (event) => {
        const searchButton = document.getElementById("searchButton");
        const searchResults = document.getElementById("searchResults");
        const pokemonSearchInput = document.getElementById("pokemonSearch");
    
        if (searchButton && searchResults && pokemonSearchInput) {
            if (!searchButton.contains(event.target) && !pokemonSearchInput.contains(event.target)) {
                searchResults.style.display = 'none'; 
            }
        }
    });
    
    document.getElementById("captureTable").addEventListener("click", () => {
        const tablesContainer = document.getElementById("tables-container");
        const statisticsInfo = document.getElementById("statisticsInfo");
        const topsInfo = document.getElementById("topsInfo");
        const topicInfo = document.getElementById("topicInfo");
        const filterInfo = document.getElementById("filterInfo");
    
        const tempContainer = document.createElement("div");
        tempContainer.style.position = "absolute";
        tempContainer.style.top = "0";
        tempContainer.style.left = "0";
        tempContainer.style.backgroundColor = "white";
        tempContainer.style.padding = "20px";
    
        const filterClone = filterInfo.cloneNode(true);
        const statsClone = statisticsInfo.cloneNode(true);
        const topicClone = topicInfo.cloneNode(true);
        const tablesClone = tablesContainer.cloneNode(true);
    
        tempContainer.appendChild(filterClone);
        tempContainer.appendChild(statsClone);
        if (topsInfo) {
            const topsClone = topsInfo.cloneNode(true);
            tempContainer.appendChild(topsClone);
        }
        tempContainer.appendChild(topicClone);
        tempContainer.appendChild(tablesClone);
    
        document.body.appendChild(tempContainer);
    
        const scaleFactor = 3; 
    
        html2canvas(tempContainer, {
            scale: scaleFactor,
            useCORS: true,
        }).then((canvas) => {
            const targetWidth = canvas.width / 2;
            const targetHeight = canvas.height / 2;
    
            const resizedCanvas = document.createElement("canvas");
            resizedCanvas.width = targetWidth;
            resizedCanvas.height = targetHeight;
    
            const ctx = resizedCanvas.getContext("2d");
            ctx.drawImage(canvas, 0, 0, targetWidth, targetHeight);
    
            resizedCanvas.toBlob((blob) => {
                if (blob) {
                    const url = URL.createObjectURL(blob);
    
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = "rankingGeral.png";
    
                    document.body.appendChild(link);
                    link.click();
    
                    URL.revokeObjectURL(url);
                    document.body.removeChild(link);
                } else {
                    console.error("Falha ao gerar Blob para a imagem.");
                }
            }, "image/png", 1.0);
    
            document.body.removeChild(tempContainer);
        }).catch((err) => {
            console.error("Erro ao capturar os elementos:", err);
            document.body.removeChild(tempContainer);
        });
    });
    
})
.catch((error) => {
    console.error('Erro ao carregar results.json:', error);
    document.body.innerHTML = `
        <div class="flex items-center justify-center h-screen">
            <div class="text-center">
                <h1 class="text-2xl text-red-500 mb-4">Erro ao carregar dados</h1>
                <p class="text-gray-600">Verifique se o arquivo results.json existe e está no formato correto.</p>
                <button onclick="window.location.reload()" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Tentar Novamente
                </button>
            </div>
        </div>
    `;
});