fetch('./results.json')
.then((response) => response.json())
.then((results) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const infoType = urlParams.get('id');
    results = results || {}
    
    // Initialize sorting state
    let currentSortAttribute = 'pickRate';
    let currentSortOrder = 'desc';
    
    const containerDiv = document.getElementById("tables-container");

    // Identificar o tipo de container e aplicar classes apropriadas
    const mainContainer = document.querySelector('.flex.items-start.justify-start.w-full.gap-x-4.pt-\\[50px\\].px-4');
    const isPlayerProfile = (infoType !== "allyTeam" && infoType !== "enemyTeam");
    
    if (isPlayerProfile) {
        mainContainer.classList.add('player-stats-container');
        // Mostrar painel de recordes para perfis de jogadores
        const playerRecordsPanel = document.getElementById('playerRecordsInfo');
        if (playerRecordsPanel) {
            playerRecordsPanel.style.display = 'flex';
        }
    } else {
        mainContainer.classList.add('team-stats-container');
        // Esconder painel de recordes para equipas
        const playerRecordsPanel = document.getElementById('playerRecordsInfo');
        if (playerRecordsPanel) {
            playerRecordsPanel.style.display = 'none';
        }
    }

    // Função para calcular total de bans de um pokémon
    const getTotalBans = (pokemonName) => {
        const bansWinner = results.bans?.BansWinnerTeam?.[pokemonName] || 0;
        const bansLoser = results.bans?.BansLoserTeam?.[pokemonName] || 0;
        return bansWinner + bansLoser;
    };

    // Função para calcular participação
    const calculateParticipation = (pokemonName, pickRate) => {
        const totalBans = getTotalBans(pokemonName);
        const participation = ((parseFloat(pickRate) + totalBans) / 2);
        return participation.toFixed(1) + '%';
    };

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

    const sortValues = (obj, attribute, order) => {
        const keys = Object.keys(obj);
        
        return keys.sort((a, b) => {
            let valueA, valueB;
            
            // Handle special sorting cases
            switch (attribute) {
                case 'pokemon':
                    // Alphabetical sorting
                    valueA = a.toLowerCase();
                    valueB = b.toLowerCase();
                    return order === 'desc' ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB);
                    
                case 'bans':
                    valueA = getTotalBans(a);
                    valueB = getTotalBans(b);
                    break;
                    
                case 'participation':
                    valueA = parseFloat(calculateParticipation(a, obj[a].pickRate));
                    valueB = parseFloat(calculateParticipation(b, obj[b].pickRate));
                    break;
                    
                case 'tier':
                    // Assuming pokemonTierListUDB is available globally
                    const tierOrder = { 'S': 5, 'A': 4, 'B': 3, 'C': 2, 'D': 1, '-': 0 };
                    valueA = tierOrder[pokemonTierListUDB?.[a] || '-'] || 0;
                    valueB = tierOrder[pokemonTierListUDB?.[b] || '-'] || 0;
                    break;
                    
                default:
                    // Default numeric sorting for pickRate, winRate, etc.
                    valueA = parseFloat(obj[a][attribute] || 0);
                    valueB = parseFloat(obj[b][attribute] || 0);
                    break;
            }
            
            // Primary sort
            if (valueA !== valueB) {
                return order === 'desc' ? valueB - valueA : valueA - valueB;
            } else {
                // Secondary sort by pickRate if primary values are equal
                const secondaryA = parseFloat(obj[a]['pickRate'] || 0);
                const secondaryB = parseFloat(obj[b]['pickRate'] || 0);
                return order === 'desc' ? secondaryB - secondaryA : secondaryA - secondaryB;
            }
        });
    }

    // FUNÇÃO ATUALIZADA PARA EXIBIR ESTATÍSTICAS PRINCIPAIS
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

        // Obter o container de estatísticas existente
        const summaryInfo = document.getElementById("statisticsInfo");
        
        // Limpar conteúdo existente (exceto título)
        const existingTitle = summaryInfo.querySelector('.info-panel-title');
        summaryInfo.innerHTML = '';
        if (existingTitle) {
            summaryInfo.appendChild(existingTitle);
        } else {
            const newTitle = document.createElement("h3");
            newTitle.className = "info-panel-title";
            newTitle.textContent = "Estatísticas Gerais";
            summaryInfo.appendChild(newTitle);
        }

        // Container principal para as estatísticas
        const statsContainer = document.createElement("div");
        statsContainer.className = "flex flex-col gap-3";

        // Função auxiliar para criar itens de estatística
        const createStatItem = (label, value, highlight = false) => {
            const statDiv = document.createElement("div");
            statDiv.className = `flex justify-between items-center p-2 rounded ${highlight ? 'bg-white bg-opacity-10' : ''}`;
            
            const labelSpan = document.createElement("span");
            labelSpan.className = "text-white font-medium text-sm";
            labelSpan.textContent = label;
            
            const valueSpan = document.createElement("span");
            valueSpan.className = "text-white font-bold text-sm";
            valueSpan.textContent = value;
            
            statDiv.appendChild(labelSpan);
            statDiv.appendChild(valueSpan);
            return statDiv;
        };

        // Adicionar estatísticas baseadas no tipo
        if (isPlayerProfile) {
            // Para jogadores individuais
            statsContainer.appendChild(createStatItem("Winrate", `${overallWinRate}%`, true));
            statsContainer.appendChild(createStatItem("MVP Count", playerMvpCount.toString()));
            statsContainer.appendChild(createStatItem("Total Partidas", totalPickRate.toString()));
            
            // Adicionar médias detalhadas do jogador
            const playerAverages = calculatePlayerAverages(infoType);
            statsContainer.appendChild(createStatItem("Média Kills", playerAverages.kills.toFixed(1)));
            statsContainer.appendChild(createStatItem("Média Assists", playerAverages.assists.toFixed(1)));
            statsContainer.appendChild(createStatItem("Média Pontuação", playerAverages.playerScore.toFixed(0)));
        } else {
            // Para equipas
            const lastMatchDate = results.lastMatchDate || "N/A";
            const streakData = results.teamStreak?.[infoType] || { maxWinStreak: 0, maxLoseStreak: 0 };
            
            statsContainer.appendChild(createStatItem("Última Partida", `${lastMatchDate}h`));
            statsContainer.appendChild(createStatItem("Winrate", `${overallWinRate}%`, true));
            statsContainer.appendChild(createStatItem("Total Partidas", totalMatches.toString()));
            statsContainer.appendChild(createStatItem("Média Mortes", averageKills));
            statsContainer.appendChild(createStatItem("Win Streak", streakData.maxWinStreak.toString()));
            statsContainer.appendChild(createStatItem("Lose Streak", streakData.maxLoseStreak.toString()));
        }

        summaryInfo.appendChild(statsContainer);
    };

    // Função para calcular médias do jogador
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

    // FUNÇÃO ATUALIZADA PARA WINRATE POR ROLE
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
        
        // Obter container existente
        const roleWinrateContent = document.getElementById('roleWinrateContent');
        if (!roleWinrateContent) return;
        
        // Limpar conteúdo existente
        roleWinrateContent.innerHTML = '';
        
        const roleContainer = document.createElement("div");
        roleContainer.className = "flex flex-col gap-2";
        
        // Ordenar roles por winrate (decrescente)
        const sortedRoles = Object.entries(roleWinrates)
            .sort(([,a], [,b]) => b - a);
        
        // Traduzir nomes das roles para português
        const roleTranslations = {
            'Speedster': 'Speedsters',
            'Attacker': 'Attackers', 
            'All Rounder': 'All Rounders',
            'Support': 'Supporters',
            'Defender': 'Defenders'
        };
        
        sortedRoles.forEach(([role, winrate]) => {
            const roleItem = document.createElement("div");
            roleItem.className = "role-item";
            
            const roleLabel = document.createElement("span");
            roleLabel.className = "text-white font-medium text-sm";
            roleLabel.textContent = roleTranslations[role] || role;
            
            const valueContainer = document.createElement("div");
            valueContainer.className = "flex items-center gap-2";
            
            const winrateSpan = document.createElement("span");
            winrateSpan.className = "text-white font-bold text-sm";
            winrateSpan.textContent = `${winrate.toFixed(1)}%`;
            
            // Adicionar indicador de performance
            const performanceIndicator = document.createElement("span");
            performanceIndicator.className = "performance-indicator";
            
            if (winrate >= 60) {
                winrateSpan.style.color = '#22c55e';
                performanceIndicator.classList.add('performance-high');
            } else if (winrate >= 40) {
                winrateSpan.style.color = '#eab308';
                performanceIndicator.classList.add('performance-medium');
            } else {
                winrateSpan.style.color = '#ef4444';
                performanceIndicator.classList.add('performance-low');
            }
            
            valueContainer.appendChild(winrateSpan);
            valueContainer.appendChild(performanceIndicator);
            
            roleItem.appendChild(roleLabel);
            roleItem.appendChild(valueContainer);
            roleContainer.appendChild(roleItem);
        });
        
        roleWinrateContent.appendChild(roleContainer);
    };

    // FUNÇÃO ATUALIZADA PARA PICKS POR ROLE
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
        
        // Obter container existente
        const rolePicksContent = document.getElementById('rolePicksContent');
        if (!rolePicksContent) return;
        
        // Limpar conteúdo existente
        rolePicksContent.innerHTML = '';
        
        const picksContainer = document.createElement("div");
        picksContainer.className = "flex flex-col gap-2";
        
        // Ordenar roles por número de picks (decrescente)
        const sortedRolePicks = Object.entries(rolePicks)
            .sort(([,a], [,b]) => b - a);
        
        // Traduzir nomes das roles para português
        const roleTranslations = {
            'Speedster': 'Speedsters',
            'Attacker': 'Attackers', 
            'All Rounder': 'All Rounders',
            'Support': 'Supporters',
            'Defender': 'Defenders'
        };
        
        const maxPicks = Math.max(...Object.values(rolePicks));
        
        sortedRolePicks.forEach(([role, totalPicks]) => {
            const pickItem = document.createElement("div");
            pickItem.className = "role-item";
            
            const roleLabel = document.createElement("span");
            roleLabel.className = "text-white font-medium text-sm";
            roleLabel.textContent = roleTranslations[role] || role;
            
            const picksSpan = document.createElement("span");
            picksSpan.className = "text-white font-bold text-sm";
            picksSpan.textContent = totalPicks.toString();
            
            // Adicionar cor baseada na quantidade de picks
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
        
        rolePicksContent.appendChild(picksContainer);
    };
    // FUNÇÃO ATUALIZADA PARA RECORDES DO JOGADOR
    const displayPlayerRecords = () => {
        if (!isPlayerProfile) return;
        
        // Calcular recordes do jogador
        const playerRecords = {
            kills: { max: 0, pokemon: '', match: null },
            assists: { max: 0, pokemon: '', match: null },
            damageHealed: { max: 0, pokemon: '', match: null },
            damageDone: { max: 0, pokemon: '', match: null },
            damageTaken: { 
                max: 0, 
                pokemon: '', 
                match: null, 
                min: Infinity, 
                minPokemon: '', 
                minMatch: null 
            },
            interrupts: { max: 0, pokemon: '', match: null },
            playerScore: { max: 0, pokemon: '', match: null }
        };
        
        // Percorrer todos os dados do jogador
        ["allyTeam", "enemyTeam"].forEach(teamType => {
            if (results[teamType] && results[teamType][infoType]) {
                Object.entries(results[teamType][infoType]).forEach(([pokemonName, pokemonData]) => {
                    (pokemonData.matches || []).forEach(match => {
                        // Verificar recordes máximos
                        Object.keys(playerRecords).forEach(metric => {
                            const value = match[metric] || 0;
                            
                            if (metric === 'damageTaken') {
                                // Para dano recebido, track both max and min
                                if (value > playerRecords[metric].max) {
                                    playerRecords[metric].max = value;
                                    playerRecords[metric].pokemon = pokemonName;
                                    playerRecords[metric].match = match;
                                }
                                if (value < playerRecords[metric].min && value > 0) {
                                    playerRecords[metric].min = value;
                                    playerRecords[metric].minPokemon = pokemonName;
                                    playerRecords[metric].minMatch = match;
                                }
                            } else {
                                if (value > playerRecords[metric].max) {
                                    playerRecords[metric].max = value;
                                    playerRecords[metric].pokemon = pokemonName;
                                    playerRecords[metric].match = match;
                                }
                            }
                        });
                    });
                });
            }
        });
        
        // Se min damage taken ainda for Infinity, definir como 0
        if (playerRecords.damageTaken.min === Infinity) {
            playerRecords.damageTaken.min = 0;
            playerRecords.damageTaken.minPokemon = '';
        }
        
        // Obter container existente
        const playerRecordsContent = document.getElementById('playerRecordsContent');
        if (!playerRecordsContent) return;
        
        // Limpar conteúdo existente
        playerRecordsContent.innerHTML = '';
        
        const recordsContainer = document.createElement("div");
        recordsContainer.className = "grid grid-cols-2 gap-2";
        
        // Traduzir nomes das métricas
        const metricTranslations = {
            'kills': 'Kills',
            'assists': 'Assists',
            'damageHealed': 'Cura',
            'damageDone': 'Dano Causado',
            'damageTaken': 'Dano Recebido',
            'interrupts': 'Interrupções',
            'playerScore': 'Pontuação'
        };
        
        // Função para formatar números grandes
        const formatRecordNumber = (num) => {
            if (num >= 1000) {
                return num.toLocaleString('pt-BR');
            }
            return num.toString();
        };
        
        // Criar itens de recorde para as métricas principais
        const mainMetrics = ['kills', 'assists', 'damageDone', 'playerScore', 'damageHealed', 'interrupts'];
        
        mainMetrics.forEach(metric => {
            const data = playerRecords[metric];
            if (data.max > 0) {
                const recordItem = document.createElement("div");
                recordItem.className = "role-item";
                
                const leftContent = document.createElement("div");
                leftContent.className = "flex items-center gap-2";
                
                if (data.pokemon) {
                    const pokemonImg = document.createElement("img");
                    pokemonImg.src = `./images/backgrounds/${data.pokemon.toLowerCase()}-left-bg.png`;
                    pokemonImg.alt = data.pokemon;
                    pokemonImg.style.width = '30px';
                    pokemonImg.style.height = '30px';
                    pokemonImg.className = "rounded";
                    leftContent.appendChild(pokemonImg);
                }
                
                const metricLabel = document.createElement("span");
                metricLabel.className = "text-white font-medium text-sm";
                metricLabel.textContent = metricTranslations[metric];
                leftContent.appendChild(metricLabel);
                
                const valueSpan = document.createElement("span");
                valueSpan.className = "text-white font-bold text-sm";
                valueSpan.textContent = formatRecordNumber(data.max);
                
                recordItem.appendChild(leftContent);
                recordItem.appendChild(valueSpan);
                recordsContainer.appendChild(recordItem);
            }
        });
        
        // ADICIONAR ITENS ESPECIAIS PARA DANO RECEBIDO (MAX E MIN)
        const damageData = playerRecords.damageTaken;
        
        // Item para maior dano recebido
        if (damageData.max > 0) {
            const maxDamageItem = document.createElement("div");
            maxDamageItem.className = "role-item";
            
            const leftContent = document.createElement("div");
            leftContent.className = "flex items-center gap-2";
            
            if (damageData.pokemon) {
                const pokemonImg = document.createElement("img");
                pokemonImg.src = `./images/backgrounds/${damageData.pokemon.toLowerCase()}-left-bg.png`;
                pokemonImg.alt = damageData.pokemon;
                pokemonImg.style.width = '30px';
                pokemonImg.style.height = '30px';
                pokemonImg.className = "rounded";
                leftContent.appendChild(pokemonImg);
            }
            
            const metricLabel = document.createElement("span");
            metricLabel.className = "text-white font-medium text-sm";
            metricLabel.textContent = "Maior Dano Recebido";
            leftContent.appendChild(metricLabel);
            
            const valueSpan = document.createElement("span");
            valueSpan.className = "text-white font-bold text-sm";
            valueSpan.textContent = formatRecordNumber(damageData.max);
            
            maxDamageItem.appendChild(leftContent);
            maxDamageItem.appendChild(valueSpan);
            recordsContainer.appendChild(maxDamageItem);
        }
        
        // Item para menor dano recebido (apenas se for maior que 0)
        if (damageData.min > 0 && damageData.min < Infinity) {
            const minDamageItem = document.createElement("div");
            minDamageItem.className = "role-item";
            
            const leftContent = document.createElement("div");
            leftContent.className = "flex items-center gap-2";
            
            if (damageData.minPokemon) {
                const pokemonImg = document.createElement("img");
                pokemonImg.src = `./images/backgrounds/${damageData.minPokemon.toLowerCase()}-left-bg.png`;
                pokemonImg.alt = damageData.minPokemon;
                pokemonImg.style.width = '30px';
                pokemonImg.style.height = '30px';
                pokemonImg.className = "rounded";
                leftContent.appendChild(pokemonImg);
            }
            
            const metricLabel = document.createElement("span");
            metricLabel.className = "text-white font-medium text-sm";
            metricLabel.textContent = "Menor Dano Recebido";
            leftContent.appendChild(metricLabel);
            
            const valueSpan = document.createElement("span");
            valueSpan.className = "text-white font-bold text-sm";
            valueSpan.textContent = formatRecordNumber(damageData.min);
            
            minDamageItem.appendChild(leftContent);
            minDamageItem.appendChild(valueSpan);
            recordsContainer.appendChild(minDamageItem);
        }
        
        playerRecordsContent.appendChild(recordsContainer);
    };

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    // Function to update sort indicator
    const updateSortIndicators = (activeAttribute, order) => {
        // Remove all existing indicators
        document.querySelectorAll('.sort-indicator').forEach(indicator => {
            indicator.remove();
        });
        
        // Add indicator to active column
        const activeHeader = document.querySelector(`[data-sort="${activeAttribute}"]`);
        if (activeHeader) {
            const indicator = document.createElement('span');
            indicator.classList.add('sort-indicator', 'ml-1');
            indicator.textContent = order === 'desc' ? '▼' : '▲';
            activeHeader.appendChild(indicator);
        }
    };

    // Function to handle header clicks
    const handleHeaderClick = (attribute) => {
        // Toggle order if same attribute, otherwise default to desc
        if (currentSortAttribute === attribute) {
            currentSortOrder = currentSortOrder === 'desc' ? 'asc' : 'desc';
        } else {
            currentSortAttribute = attribute;
            currentSortOrder = 'desc';
        }
        
        // Update filter text
        const filterSpan = document.getElementById("filter-text");
        const attributeNames = {
            'pokemon': 'Pokémon',
            'pickRate': 'Pick Rate',
            'winRate': 'Win Rate',
            'bans': 'Bans',
            'participation': 'Participação',
            'maxWinStreak': 'Win Streak',
            'maxLoseStreak': 'Lose Streak',
            'tier': 'Tier'
        };
        
        filterSpan.innerText = `Ordenado por: ${attributeNames[currentSortAttribute] || currentSortAttribute} - ${currentSortOrder === 'asc' ? 'Crescente' : 'Decrescente'}`;
        filterSpan.classList.add('text-white');
        
        // Update sort indicators
        updateSortIndicators(currentSortAttribute, currentSortOrder);
        
        // Re-render table with new sorting
        applyFilters();
    };

    // Inicializar interface
    const sortedKeys = sortValues(objAttribute, currentSortAttribute, currentSortOrder);
    let pokemonKeys = sortedKeys;
    const titleSpan = document.getElementById("title-span");
    titleSpan.innerText = getTitle();

    const filterSpan = document.getElementById("filter-text");
    filterSpan.innerText = `Ordenado por: Pick Rate - Decrescente`;
    filterSpan.classList.add('text-white')

    // Executar funções de display
    displaySummaryInfo();
    displayRoleWinrates();
    displayRolePicks();
    displayPlayerRecords();

    function applyFilters() {
        const selectedClasses = Array.from(document.querySelectorAll('.class-filter:checked'))
        .map(checkbox => checkbox.value);
        
        // Get fresh sorted keys based on current sorting
        const freshSortedKeys = sortValues(objAttribute, currentSortAttribute, currentSortOrder);
        
        if (selectedClasses.includes('Todos')) {
            renderRankingTable(freshSortedKeys);
        } else {
            const filteredKeys = freshSortedKeys.filter(pokemonName => {
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

    const renderCommonInfo = (sideLength, isLeftSide, firstIndex, pokemonKeys) => {
        const table = document.createElement("table");

        table.style.borderCollapse = 'separate';
        table.style.borderSpacing = '0 8px';
        table.style.width = '100%';
        table.style.maxWidth = '1500px'; 
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
        
        const createHeaderCell = (text, width = '', sortAttribute = null) => {
            const th = document.createElement("th");
            th.classList.add('px-4', 'py-3', 'font-semibold', 'text-lg', 'text-white', 'text-center', 'relative');
            if (width) th.style.width = width;
            th.innerText = text;
            
            if (sortAttribute) {
                th.style.cursor = 'pointer';
                th.style.userSelect = 'none';
                th.setAttribute('data-sort', sortAttribute);
                th.classList.add('hover:bg-white', 'hover:bg-opacity-10', 'transition-colors', 'duration-200');
                
                th.addEventListener('click', () => {
                    handleHeaderClick(sortAttribute);
                });
            }
            
            return th;
        };

        // CABEÇALHOS COM LARGURAS ESPECÍFICAS E ATRIBUTOS DE ORDENAÇÃO
        headerTr.appendChild(createHeaderCell('Rank', '60px'));
        headerTr.appendChild(createHeaderCell('Pokémon', '230px', 'pokemon'));
        headerTr.appendChild(createHeaderCell('PR', '80px', 'pickRate'));
        headerTr.appendChild(createHeaderCell('WR', '100px', 'winRate'));
        headerTr.appendChild(createHeaderCell('Bans', '80px', 'bans'));
        headerTr.appendChild(createHeaderCell('P', '80px', 'participation'));
        headerTr.appendChild(createHeaderCell('WS', '80px', 'maxWinStreak'));
        headerTr.appendChild(createHeaderCell('LS', '80px', 'maxLoseStreak'));
        headerTr.appendChild(createHeaderCell('UR', '80px'));
        headerTr.appendChild(createHeaderCell('T', '80px'));
        headerTr.appendChild(createHeaderCell('GR', '120px'));
        headerTr.appendChild(createHeaderCell('Tier', '80px', 'tier'));
        
        // CRIAR O TBODY PARA OS DADOS
        const tbody = document.createElement("tbody");
        table.appendChild(tbody);
        
        containerDiv.appendChild(table);
        
        for (let i = firstIndex; i < sideLength; i++) {
            const pokemonName = pokemonKeys[i];
            const pokemon = objAttribute[pokemonName];
            const { pickRate, winRate, isUp, maxWinStreak, maxLoseStreak } = pokemon;
            const role = pokemonRoles[pokemonName];
            const totalBans = getTotalBans(pokemonName);
            const participation = calculateParticipation(pokemonName, pickRate);

            const rowTr = document.createElement("tr");
            
            rowTr.style.cssText = `
                background: ${rolesColor[role]}22;
                border-radius: 12px;
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;
            `;
            
            rowTr.addEventListener('mouseenter', () => {
                rowTr.style.background = `${rolesColor[role]}4D`;
                rowTr.style.transform = 'translateY(-2px)';
                rowTr.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
            });
            
            rowTr.addEventListener('mouseleave', () => {
                rowTr.style.background = `${rolesColor[role]}33`;
                rowTr.style.transform = 'translateY(0)';
                rowTr.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
            });
            
            // RANK - largura: 60px
            const rankTd = document.createElement("td");
            rankTd.classList.add('text-center', 'p-3', 'font-bold', 'text-2xl', 'text-white');
            rankTd.style.width = '60px';
            rankTd.innerText = i + 1;
            rowTr.appendChild(rankTd);

            // POKÉMON - largura: 230px
            const pokemonTd = document.createElement("td");
            pokemonTd.style.width = '230px';
            pokemonTd.classList.add('p-3');
            
            const pokemonContainer = document.createElement("div");
            pokemonContainer.classList.add('flex', 'items-center');
            
            const pokemonImage = document.createElement("img");
            pokemonImage.classList.add('mr-3');
            pokemonImage.width = 50;
            pokemonImage.height = 50;
            pokemonImage.src = `./images/backgrounds/${pokemonName}-left-bg.png`;
            
            const pokemonSpan = document.createElement("span");
            pokemonSpan.classList.add('text-xl', 'font-bold', 'text-white');
            pokemonSpan.innerText = capitalize(pokemonName);
            
            pokemonContainer.appendChild(pokemonImage);
            pokemonContainer.appendChild(pokemonSpan);
            pokemonTd.appendChild(pokemonContainer);
            rowTr.appendChild(pokemonTd);

            // PICK RATE - largura: 80px
            const pickRateTd = document.createElement("td");
            pickRateTd.classList.add('text-white', 'font-bold', 'text-xl', 'text-center', 'p-3');
            pickRateTd.style.width = '80px';
            pickRateTd.innerText = pickRate;
            rowTr.appendChild(pickRateTd);

            // WIN RATE - largura: 100px
            const winRateTd = document.createElement("td");
            winRateTd.classList.add('text-white', 'font-bold', 'text-xl', 'text-center', 'p-3');
            winRateTd.style.width = '100px';
            winRateTd.innerText = `${winRate.toFixed(2)}%`;
            rowTr.appendChild(winRateTd);

            // BANS - largura: 80px
            const bansTd = document.createElement("td");
            bansTd.classList.add('text-white', 'font-bold', 'text-xl', 'text-center', 'p-3');
            bansTd.style.width = '80px';
            bansTd.innerText = totalBans;
            rowTr.appendChild(bansTd);

            // PARTICIPAÇÃO - largura: 80px
            const participationTd = document.createElement("td");
            participationTd.classList.add('text-white', 'font-bold', 'text-xl', 'text-center', 'p-3');
            participationTd.style.width = '80px';
            participationTd.innerText = participation;
            rowTr.appendChild(participationTd);

            // WIN STREAK - largura: 80px
            const maxWinStreakTd = document.createElement("td");
            maxWinStreakTd.classList.add('text-white', 'font-bold', 'text-xl', 'text-center', 'p-3');
            maxWinStreakTd.style.width = '80px';
            maxWinStreakTd.innerText = maxWinStreak || 0;
            rowTr.appendChild(maxWinStreakTd);

            // LOSE STREAK - largura: 80px
            const maxLoseStreakTd = document.createElement("td");
            maxLoseStreakTd.classList.add('text-white', 'font-bold', 'text-xl', 'text-center', 'p-3');
            maxLoseStreakTd.style.width = '80px';
            maxLoseStreakTd.innerText = maxLoseStreak || 0;
            rowTr.appendChild(maxLoseStreakTd);

            // ÚLTIMO RESULTADO - largura: 80px
            const lastMatchTd = document.createElement("td");
            lastMatchTd.classList.add('text-center', 'font-bold', 'text-xl', 'p-3');
            lastMatchTd.style.width = '80px';
            
            if (pokemon.lastMatch === 'W') {
                lastMatchTd.style.color = 'rgb(29, 181, 52)';
                lastMatchTd.innerText = 'W';
            } else if (pokemon.lastMatch === 'L') {
                lastMatchTd.style.color = 'red';
                lastMatchTd.innerText = 'L';
            } else {
                lastMatchTd.style.color = 'white';
                lastMatchTd.innerText = '-';
            }
            rowTr.appendChild(lastMatchTd);

            // TENDÊNCIA - largura: 80px
            const trendTd = document.createElement("td");
            trendTd.classList.add('text-center', 'p-3');
            trendTd.style.width = '80px';
            
            const arrowImage = document.createElement("img");
            arrowImage.width = 25;
            arrowImage.style.display = "inline-block";

            let arrowImgSrc = 'neutral-arrow';
            if (isUp !== undefined) {
                arrowImgSrc = `${isUp ? 'up-arrow' : 'down-arrow'}.svg`;
            } else {
                arrowImgSrc = 'neutral-arrow.png';
            }
            arrowImage.src = `./images/icons/${arrowImgSrc}`;

            trendTd.appendChild(arrowImage);
            rowTr.appendChild(trendTd);

            // GRÁFICO - largura: 120px
            const graphTd = document.createElement("td");
            graphTd.classList.add('text-center', 'p-3');
            graphTd.style.width = '120px';

            const winRateBarContainer = document.createElement("div");
            winRateBarContainer.classList.add('w-full', 'bg-gray-200', 'rounded-full', 'h-4');
            winRateBarContainer.style.width = '100px';
            winRateBarContainer.style.margin = '0 auto';

            const winRateBar = document.createElement("div");
            winRateBar.classList.add('h-4', 'rounded-full');
            winRateBar.style.width = `${winRate}%`;
            winRateBar.style.backgroundColor = 'rgb(29, 181, 52)';

            winRateBarContainer.appendChild(winRateBar);
            graphTd.appendChild(winRateBarContainer);
            rowTr.appendChild(graphTd);

            // TIER - largura: 80px
            const tierTd = document.createElement("td");
            tierTd.classList.add('text-white', 'font-bold', 'text-xl', 'text-center', 'p-3');
            tierTd.style.width = '80px';
            tierTd.innerText = pokemonTierListUDB[pokemonName] || '-'; // Usa a tier list do util.js
            rowTr.appendChild(tierTd);

            // Adicionar evento de click
            rowTr.classList.add('cursor-pointer');
            rowTr.onclick = () => {
                window.location.href = (`pokemon-result.html?id=${infoType}&pokemon=${pokemonName}`);
            };

            tbody.appendChild(rowTr);
        }
        
        // Initialize sort indicators after table is created
        updateSortIndicators(currentSortAttribute, currentSortOrder);
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
    
});