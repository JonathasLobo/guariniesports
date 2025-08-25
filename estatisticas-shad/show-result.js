fetch('./results.json')
.then((response) => response.json())
.then((results) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const infoType = urlParams.get('id');
    results = results || {}
    const filterType = window.localStorage.pokemonFilterAttribute;
    const orderFilter = window.localStorage.pokemonFilterOrder;
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
    
    const getTitle = () => {
        if (infoType === 'allyTeam') {
            return 'GUARINÍ E-SPORTS'
        } else if (infoType === 'enemyTeam') {
            return 'ADVERSÁRIOS'
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
        window.location.href = window.location.pathname.replace('show-result.html', 'index.html');
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

        // Container principal que vai conter ambos os painéis (se for jogador individual)
        const mainContainer = document.createElement("div");
        mainContainer.className = "flex flex-col md:flex-row gap-4";

        // Painel esquerdo (estatísticas básicas)
        const leftPanel = document.createElement("div");
        leftPanel.className = "text-white p-1 flex flex-col flex-wrap items-left justify-start gap-2.5";
        if (infoType !== "allyTeam" && infoType !== "enemyTeam") {
            leftPanel.className += " md:w-1/2"; // Ocupa metade da largura em telas médias/grandes
        }

        // Função auxiliar para criar itens de estatística no formato "Label: Valor"
        const createStatItem = (label, value) => {
            const statDiv = document.createElement("div");
            statDiv.className = "flex flex-row items-center gap-1";
            statDiv.innerHTML = `
                <span class="font-semibold text-sm md:text-base text-white">${label}:</span>
                <span class="font-bold text-base md:text-lg text-white">${value}</span>
            `;
            return statDiv;
        };

        // Última partida (apenas para equipas)
        if (infoType === "allyTeam" || infoType === "enemyTeam") {
            const lastMatchDate = results.lastMatchDate || "Data não disponível";
            leftPanel.appendChild(createStatItem("Última Partida", lastMatchDate + "h"));
        }

        // Winrate
        leftPanel.appendChild(createStatItem("Winrate", overallWinRate + "%"));

        // Total Matches (apenas para equipas)
        if (infoType === "allyTeam" || infoType === "enemyTeam") {
            leftPanel.appendChild(createStatItem("Total Partidas", totalMatches));
        }

        // MVP Count e Partidas (apenas para jogadores individuais)
        if (infoType !== "allyTeam" && infoType !== "enemyTeam") {
            leftPanel.appendChild(createStatItem("MVP Count", playerMvpCount));
            leftPanel.appendChild(createStatItem("Partidas", totalPickRate));
        }

        // Média de Mortes (apenas para equipas)
        if (infoType === "allyTeam" || infoType === "enemyTeam") {
            leftPanel.appendChild(createStatItem("Média de Mortes", averageKills));
        }

        // Streak (apenas para equipas)
        if (infoType === "allyTeam" || infoType === "enemyTeam") {
            const streakData = results.teamStreak?.[infoType] || { maxWinStreak: 0, maxLoseStreak: 0 };
            leftPanel.appendChild(createStatItem("Win Streak", streakData.maxWinStreak));
            leftPanel.appendChild(createStatItem("Lose Streak", streakData.maxLoseStreak));
        }

        mainContainer.appendChild(leftPanel);

        // Painel direito (estatísticas detalhadas do jogador)
        if (infoType !== "allyTeam" && infoType !== "enemyTeam") {
            const rightPanel = document.createElement("div");
            rightPanel.className = "text-white p-1 flex flex-col flex-wrap items-left justify-start gap-1 md:w-1/2";

            // Função para calcular médias
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

            // Adicionar métricas individuais no painel direito
            const playerAverages = calculatePlayerAverages(infoType);
            const formatLargeNumber = (num) => {
                if (num >= 1000) {
                    const formatted = (num / 1000).toFixed(1);
                    return formatted.endsWith('.0') ? `${formatted.split('.')[0]}k` : `${formatted}k`;
                }
                return num.toFixed(1);
            };

            rightPanel.appendChild(createStatItem("Média de Kills", playerAverages.kills.toFixed(2)));
            rightPanel.appendChild(createStatItem("Média de Assists", playerAverages.assists.toFixed(2)));
            rightPanel.appendChild(createStatItem("Média de Cura", formatLargeNumber(playerAverages.damageHealed)));
            rightPanel.appendChild(createStatItem("Média de Dano Causado", formatLargeNumber(playerAverages.damageDone)));
            rightPanel.appendChild(createStatItem("Média de Dano Recebido", formatLargeNumber(playerAverages.damageTaken)));
            rightPanel.appendChild(createStatItem("Média de Interrupções", playerAverages.interrupts.toFixed(2)));
            rightPanel.appendChild(createStatItem("Média de Pontuação", playerAverages.playerScore.toFixed(2)));

            mainContainer.appendChild(rightPanel);
        }
        
        summaryInfo.appendChild(mainContainer);
    };
        displaySummaryInfo();

// Adicione esta função após a função displaySummaryInfo()
const displayRoleWinrates = () => {
    // Calcular winrate por role
    const roleStats = {};
    
    Object.entries(objAttribute).forEach(([pokemonName, pokemonData]) => {
        const role = pokemonRoles[pokemonName];
        if (!role) return;
        
        if (!roleStats[role]) {
            roleStats[role] = {
                totalPicks: 0,
                totalWins: 0
            };
        }
        
        const picks = parseFloat(pokemonData.pickRate || 0);
        const winRate = parseFloat(pokemonData.winRate || 0);
        const wins = (picks * winRate) / 100;
        
        roleStats[role].totalPicks += picks;
        roleStats[role].totalWins += wins;
    });
    
    // Calcular winrate final por role
    const roleWinrates = {};
    Object.entries(roleStats).forEach(([role, stats]) => {
        roleWinrates[role] = stats.totalPicks > 0 
            ? (stats.totalWins / stats.totalPicks) * 100 
            : 0;
    });
    
    // Criar o container do painel de roles
    const roleWinrateInfo = document.createElement("div");
    roleWinrateInfo.id = "roleWinrateInfo";
    roleWinrateInfo.className = "shadow-md rounded-lg w-1/4 min-h-[40px] flex flex-col justify-start border border-gray-300 bg-transparent p-3";
    
    const roleTitle = document.createElement("h3");
    roleTitle.className = "text-lg font-semibold text-white mb-1 text-center";
    roleTitle.textContent = "Winrate por Role";
    roleWinrateInfo.appendChild(roleTitle);
    
    const roleContainer = document.createElement("div");
    roleContainer.className = "flex flex-col gap-1";
    
    // Ordenar roles por winrate (decrescente)
    const sortedRoles = Object.entries(roleWinrates)
        .sort(([,a], [,b]) => b - a);
    
    sortedRoles.forEach(([role, winrate]) => {
        const roleItem = document.createElement("div");
        roleItem.className = "flex justify-between items-center p-2";
        
        const roleLabel = document.createElement("span");
        roleLabel.className = "text-white font-medium text-sm";
        
        // Traduzir nomes das roles para português
        const roleTranslations = {
            'Speedster': 'Speedsters',
            'Attacker': 'Attackers', 
            'All Rounder': 'All Rounders',
            'Support': 'Supporters',
            'Defender': 'Defenders'
        };
        
        roleLabel.textContent = roleTranslations[role] || role;
        
        const winrateSpan = document.createElement("span");
        winrateSpan.className = "text-white font-bold text-sm";
        winrateSpan.textContent = `${winrate.toFixed(1)}%`;
        
        // Adicionar cor baseada no winrate
        if (winrate >= 60) {
            winrateSpan.style.color = '#22c55e'; // Verde
        } else if (winrate >= 40) {
            winrateSpan.style.color = '#eab308'; // Amarelo
        } else {
            winrateSpan.style.color = '#ef4444'; // Vermelho
        }
        
        roleItem.appendChild(roleLabel);
        roleItem.appendChild(winrateSpan);
        roleContainer.appendChild(roleItem);
    });
    
    roleWinrateInfo.appendChild(roleContainer);
    
    // Inserir o painel após o statisticsInfo
    const statisticsInfo = document.getElementById("statisticsInfo");
    const parentContainer = statisticsInfo.parentNode;
    parentContainer.insertBefore(roleWinrateInfo, statisticsInfo.nextSibling);
};

// Adicione esta função após displayRoleWinrates()
    const displayRolePicks = () => {
        // Calcular total de picks por role
        const rolePicks = {};
        
        Object.entries(objAttribute).forEach(([pokemonName, pokemonData]) => {
            const role = pokemonRoles[pokemonName];
            if (!role) return;
            
            if (!rolePicks[role]) {
                rolePicks[role] = 0;
            }
            
            const picks = parseFloat(pokemonData.pickRate || 0);
            rolePicks[role] += picks;
        });
        
        // Criar o container do painel de picks por role
        const rolePicksInfo = document.createElement("div");
        rolePicksInfo.id = "rolePicksInfo";
        rolePicksInfo.className = "shadow-md rounded-lg w-1/4 min-h-[40px] flex flex-col justify-start border border-gray-300 bg-transparent p-3";
        
        const picksTitle = document.createElement("h3");
        picksTitle.className = "text-lg font-semibold text-white mb-1 text-center";
        picksTitle.textContent = "Total de Picks por Role";
        rolePicksInfo.appendChild(picksTitle);
        
        const picksContainer = document.createElement("div");
        picksContainer.className = "flex flex-col gap-1";
        
        // Ordenar roles por número de picks (decrescente)
        const sortedRolePicks = Object.entries(rolePicks)
            .sort(([,a], [,b]) => b - a);
        
        sortedRolePicks.forEach(([role, totalPicks]) => {
            const pickItem = document.createElement("div");
            pickItem.className = "flex justify-between items-center p-2";
            
            const roleLabel = document.createElement("span");
            roleLabel.className = "text-white font-medium text-sm";
            
            // Traduzir nomes das roles para português
            const roleTranslations = {
                'Speedster': 'Speedsters',
                'Attacker': 'Attackers', 
                'All Rounder': 'All Rounders',
                'Support': 'Supporters',
                'Defender': 'Defenders'
            };
            
            roleLabel.textContent = roleTranslations[role] || role;
            
            const picksSpan = document.createElement("span");
            picksSpan.className = "text-white font-bold text-sm";
            picksSpan.textContent = totalPicks.toString();
            
            // Adicionar cor baseada na quantidade de picks (opcional)
            const maxPicks = Math.max(...Object.values(rolePicks));
            const pickPercentage = (totalPicks / maxPicks) * 100;
            
            if (pickPercentage >= 80) {
                picksSpan.style.color = '#22c55e'; // Verde para mais picks
            } else if (pickPercentage >= 50) {
                picksSpan.style.color = '#eab308'; // Amarelo para picks médios
            } else {
                picksSpan.style.color = '#ef4444'; // Vermelho para menos picks
            }
            
            pickItem.appendChild(roleLabel);
            pickItem.appendChild(picksSpan);
            picksContainer.appendChild(pickItem);
        });
        
        rolePicksInfo.appendChild(picksContainer);
        
        // Inserir o painel após o roleWinrateInfo
        const roleWinrateInfo = document.getElementById("roleWinrateInfo");
        const parentContainer = roleWinrateInfo.parentNode;
        parentContainer.insertBefore(rolePicksInfo, roleWinrateInfo.nextSibling);
    };

    // ATUALIZAÇÃO NECESSÁRIA NO HTML:
    // Altere a largura dos painéis existentes:
    // filterInfo: de "w-1/6" para "w-1/6" (mantém)
    // statisticsInfo: de "w-1/3" para "w-1/5" (reduz mais)
    // roleWinrateInfo: de "w-1/4" para "w-1/5" 
    // rolePicksInfo: terá "w-1/5"
    // Isso deixará espaço para todos os painéis

    // Chame estas funções após displaySummaryInfo():
    displayRoleWinrates();
    displayRolePicks();

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const sortedKeys = sortValues(objAttribute, filterType, orderFilter);
    const pokemonKeys = sortedKeys;
    const titleSpan = document.getElementById("title-span");
    titleSpan.innerText = getTitle();

    const filterSpan = document.getElementById("filter-text");
    filterSpan.innerText = `Ordenado por: ${capitalize(window.localStorage.pokemonFilterAttribute)} - ${window.localStorage.pokemonFilterOrder === 'asc' ? 'Crescente' : 'Decrescente'}`;
    filterSpan.classList.add ('text-white')

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

    const headerTr = document.createElement("tr");
    cabecalhoTable.appendChild(headerTr);

    headerTr.classList.add('flex', 'w-full', 'text-left', 'text-white');

    const createHeaderCell = (text, className = '') => {
        const th = document.createElement("th");
        th.classList.add('px-4', 'py-2', 'font-semibold', 'text-lg', className);
        th.innerText = text;
        return th;
    };

    headerTr.appendChild(createHeaderCell('Rank', 'text-left'));
    headerTr.appendChild(createHeaderCell('Pokémon', 'w-[220px]', 'text-left'));
    headerTr.appendChild(createHeaderCell('PickRate', 'w-22', 'text-center'));
    headerTr.appendChild(createHeaderCell('WinRate', 'w-36', 'text-center'));
    headerTr.appendChild(createHeaderCell('Gráfico', 'w-40', 'text-center'));
    headerTr.appendChild(createHeaderCell('WinStreak', 'w-24', 'text-center'));
    headerTr.appendChild(createHeaderCell('LoseStreak', 'w-28', 'text-center'));
    headerTr.appendChild(createHeaderCell('Resultado', 'w-28', 'text-center'));
    headerTr.appendChild(createHeaderCell('Tendência', 'w-60', 'text-center'));

    const renderCommonInfo = (sideLength, isLeftSide, firstIndex, pokemonKeys) => {
        const table = document.createElement("table");
    
        table.style.borderCollapse = 'separate';
        table.style.borderSpacing = '0 2px';
        table.style.width = '50%';
        table.classList.add('w-full', 'h-fit');
        
        containerDiv.appendChild(table);
    
        for (let i = firstIndex; i < sideLength; i++) {
            const pokemonName = pokemonKeys[i];
            const pokemon = objAttribute[pokemonName];
            const { pickRate, winRate, isUp, maxWinStreak, maxLoseStreak } = pokemon;
            const role = pokemonRoles[pokemonName];
    
            const rowTr = document.createElement("tr");
    
            const rankTd = document.createElement("td");
            rankTd.classList.add('text-center', 'p-3', 'font-bold', 'text-2xl', 'text-white');
            rankTd.innerText = i + 1;
            rowTr.appendChild(rankTd);
    
            const pickTd = document.createElement("td");
            pickTd.classList.add('w-[500px]')
            /*pickTd.style.background = `linear-gradient(to right, ${rolesColor[role]}, rgb(255, 255, 255))`;*/
            rowTr.appendChild(pickTd);
    
            rowTr.classList.add('cursor-pointer');
            rowTr.onclick = () => {
                window.location.href = (`http://127.0.0.1:8080/pokemon-result.html?id=${infoType}&pokemon=${pokemonName}`);
            };
    
            const pickContainer = document.createElement("div");
            pickContainer.classList.add('flex', 'items-center');
            pickTd.appendChild(pickContainer);
    
            const pickImage = document.createElement("img");
            pickImage.classList.add('mr-3');
            pickImage.width = 50;
            pickImage.height = 50;
            pickImage.src = `./images/backgrounds/${pokemonName}-left-bg.png`;
            pickContainer.appendChild(pickImage);
    
            const pickSpan = document.createElement("span");
            pickSpan.classList.add('pl-1.5', 'text-xl', 'font-bold', 'w-28', 'text-white');
            pickSpan.innerText = capitalize(pokemonName);
            pickContainer.appendChild(pickSpan);
    
            const pickRateTd = document.createElement("td");
            pickRateTd.classList.add('text-white', 'font-bold', 'text-xl', 'text-center');
            pickRateTd.innerText = pickRate;
            rowTr.appendChild(pickRateTd);
    
            const winRateTd = document.createElement("td");
            winRateTd.classList.add('text-white', 'text-xl', 'font-bold','w-80');
            //winRateTd.innerText = `${winRate.toFixed(2)}%`;
            rowTr.appendChild(winRateTd);
    
            const winRateOuterDiv = document.createElement("div");
            winRateOuterDiv.classList.add('flex','justify-center');
            winRateTd.appendChild(winRateOuterDiv);
    
            const winRateSpan = document.createElement("span");
            winRateSpan.classList.add('text-white', 'text-xl', 'font-bold');
            winRateSpan.innerText = `${winRate.toFixed(2)}%`;
            winRateOuterDiv.appendChild(winRateSpan);
    
            const winRateBarTd = document.createElement("td");
            winRateBarTd.classList.add('text-white','w-60');
            rowTr.appendChild(winRateBarTd);
    
            const winRateBarContainer = document.createElement("div");
            winRateBarContainer.classList.add('w-full', 'bg-gray-200', 'rounded-full', 'h-4', 'mb-1');
            winRateBarContainer.style.width = '120px';
            winRateBarTd.appendChild(winRateBarContainer);
    
            const winRateBar = document.createElement("div");
            winRateBar.classList.add('h-4', 'rounded-full');
            winRateBar.style.width = `${winRate}%`;
            winRateBar.style.backgroundColor = 'rgb(29, 181, 52)';
            winRateBarContainer.appendChild(winRateBar);

            const maxWinStreakTd = document.createElement("td");
            maxWinStreakTd.classList.add('text-white', 'text-center', 'font-bold', 'text-xl', 'w-60');
            maxWinStreakTd.innerText = maxWinStreak || 0;
            rowTr.appendChild(maxWinStreakTd);

            const maxLoseStreakTd = document.createElement("td");
            maxLoseStreakTd.classList.add('text-white', 'text-center', 'font-bold', 'text-xl', 'w-60');
            maxLoseStreakTd.innerText = maxLoseStreak || 0;
            rowTr.appendChild(maxLoseStreakTd);

            const lastMatchTd = document.createElement("td");
            lastMatchTd.classList.add('text-white', 'text-center','font-bold','text-xl', 'pr-4', 'w-60');
            
            if (pokemon.lastMatch === 'W') {
                lastMatchTd.style.color = 'rgb(29, 181, 52)';
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
            lastGameTd.classList.add('w-60');

            lastGameTd.style.textAlign = "center";     
            lastGameTd.style.verticalAlign = "middle"; 
            lastGameTd.style.paddingRight = "15px"; 
            rowTr.appendChild(lastGameTd);

            const arrowImage = document.createElement("img");
            arrowImage.width = 25;

            let arrowImgSrc = 'neutral-arrow';
            if (isUp !== undefined) {
                arrowImgSrc = `${isUp ? 'up-arrow' : 'down-arrow'}.svg`;
            } else {
                arrowImgSrc = 'neutral-arrow.png';
            }
            arrowImage.src = `./images/icons/${arrowImgSrc}`;

            arrowImage.style.display = "inline-block";
            lastGameTd.appendChild(arrowImage);

            table.appendChild(rowTr);
            
        }
    };
    
    applyFilters(); 

    document.addEventListener('click', (event) => {
        const searchButton = document.getElementById("searchButton");
        const searchResults = document.getElementById("searchResults");
        const pokemonSearchInput = document.getElementById("pokemonSearch");
    
        if (!searchButton.contains(event.target) && !pokemonSearchInput.contains(event.target)) {
            searchResults.style.display = 'none'; 
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
        const topsClone = topsInfo.cloneNode(true);
        const topicClone = topicInfo.cloneNode(true);
        const tablesClone = tablesContainer.cloneNode(true);
    
        tempContainer.appendChild(filterClone);
        tempContainer.appendChild(statsClone);
        tempContainer.appendChild(topsClone);
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
        });
    });
    
    
});
