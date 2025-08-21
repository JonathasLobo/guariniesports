const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const lanes = ['Top', 'Jungle', 'Bot'];
const containerDiv = document.getElementById("upload-result");
let uploadResult = window.localStorage.pokemonTempUploadResult;
uploadResult = JSON.parse(uploadResult);

localStorage.setItem("matchData", JSON.stringify(uploadResult));
let matchData = JSON.parse(localStorage.getItem("matchData")) || uploadResult;
const matches = JSON.parse(localStorage.getItem("matchData"));
localStorage.setItem("rayquazaSelect", JSON.stringify({})); // Limpar valores acumulados

// Carrega os valores acumulados no localStorage
const storedRayquazaSelect = JSON.parse(localStorage.getItem("rayquazaSelect")) || {};
const rayquazaSelectLocal = { ...storedRayquazaSelect }; // Carrega valores acumulados

const playerNameContainer = document.createElement("div");
playerNameContainer.classList.add('flex', 'items-center', 'gap-2', 'p-4');
containerDiv.appendChild(playerNameContainer);

const playerNameLabel = document.createElement("label");
playerNameLabel.classList.add('text-white');
playerNameLabel.innerText = ("DIGITE O NOME DO JOGADOR:");
playerNameContainer.appendChild(playerNameLabel);

const playerNameInput = document.createElement("input");
playerNameInput.setAttribute("type", "text");
playerNameInput.setAttribute("placeholder", "Nome do Jogador");
playerNameInput.classList.add('border', 'border-black', 'rounded', 'p-2');
playerNameContainer.appendChild(playerNameInput);

const bans = {
    BansWinnerTeam: {},
    BansLoserTeam: {}
};
const selectBoxes = [];
const mvpStats = {
    playersWinner: {},
    playersDefeated: {},
};

const totalKillsSummary = {
    allyTeam: 0,
    enemyTeam: 0
};

const rayquazaSelect = {};

//MVP cálculo
uploadResult.slice().reverse().forEach((matchResult, i) => {
    const { winnerTeam, defeatedTeam, matchType } = matchResult;

    const calculateMVP = (team) => {
        let playersPerformance = [];

        Object.values(team).forEach(player => {
            if (player.playerName && player.pokemon) {
                let performancePoints = 0;

                const totalKills = Object.values(team).reduce((sum, p) => sum + (p.kills || 0), 0);
                const totalAssists = Object.values(team).reduce((sum, p) => sum + (p.assists || 0), 0);
                const totalDmgDone = Object.values(team).reduce((sum, p) => sum + (p.damageDone || 0), 0);
                const totalDmgTaken = Object.values(team).reduce((sum, p) => sum + (p.damageTaken || 0), 0);
                const totalDmgHealed = Object.values(team).reduce((sum, p) => sum + (p.damageHealed || 0), 0);

                const scorePercentage = ((player.playerScore / team.totalScore) * 100).toFixed(1) || 0;
                const killsPercentage = ((player.kills / totalKills) * 100).toFixed(1) || 0;
                const assistsPercentage = ((player.assists / totalAssists) * 100).toFixed(1) || 0;
                const dmgDonePercentage = ((player.damageDone / totalDmgDone) * 100).toFixed(1) || 0;
                const dmgTakenPercentage = ((player.damageTaken / totalDmgTaken) * 100).toFixed(1) || 0;
                const dmgHealedPercentage = ((player.damageHealed / totalDmgHealed) * 100).toFixed(1) || 0;

                if (scorePercentage >= 20) performancePoints += 20;
                if (killsPercentage >= 20) performancePoints += 15;
                if (assistsPercentage >= 20) performancePoints += 20;
                if (dmgDonePercentage >= 20) performancePoints += 15;
                if (dmgTakenPercentage >= 20) performancePoints += 15;
                if (dmgHealedPercentage >= 20) performancePoints += 15;

                playersPerformance.push({ player, performancePoints, scorePercentage });
            }
        });
        const maxPerformancePoints = Math.max(...playersPerformance.map(p => p.performancePoints));
        const topPerformers = playersPerformance.filter(p => p.performancePoints === maxPerformancePoints);
        if (topPerformers.length > 1) {
            const playerWithHighestScorePercentage = topPerformers.reduce((max, current) =>
                current.scorePercentage > max.scorePercentage ? current : max);
            playerWithHighestScorePercentage.performancePoints += 1;
            return playerWithHighestScorePercentage.player;
        }
        return topPerformers[0].player;
    };

    const winnerMVP = calculateMVP(winnerTeam);
    const defeatedMVP = calculateMVP(defeatedTeam);

    if (winnerMVP) {
        mvpStats.playersWinner[winnerMVP.playerName] = (mvpStats.playersWinner[winnerMVP.playerName] || 0) + 1;
        winnerMVP.isMVP = true;
    }
    if (defeatedMVP) {
        mvpStats.playersDefeated[defeatedMVP.playerName] = (mvpStats.playersDefeated[defeatedMVP.playerName] || 0) + 1;
        defeatedMVP.isMVP = true;
    }

    //container das partidas
    const matchContainer = document.createElement("div");
    matchContainer.classList.add('flex', 'flex-col', 'p-4', 'border', 'border-black', 'rounded-lg', 'bg-slate-50', 'gap-y-4');
    containerDiv.appendChild(matchContainer);

    const closeButtonContainer = document.createElement("div");
    closeButtonContainer.classList.add('relative');
    matchContainer.appendChild(closeButtonContainer);

    const closeButton = document.createElement("button");
    closeButton.classList.add('absolute', 'top-0', 'right-0', 'rounded-full', 'bg-red-500', 'text-white', 'px-[7px]');
    closeButton.innerText = 'X';
    closeButton.onclick = () => {
        uploadResult.splice(i, 1);
        matchContainer.classList.add('hidden');
    };
    closeButtonContainer.appendChild(closeButton);

    const matchTitle = document.createElement("span");
    matchTitle.classList.add('font-bold', 'border-b', 'border-black', 'cursor-pointer');
    matchTitle.innerText = `Partida ${i + 1} - Tipo: ${matchType}`;
    matchTitle.onclick = () => {
        localStorage.setItem("selectedMatchIndex", i);
        window.open(window.location.pathname.replace('upload-result.html', 'DadosPartida-result.html'), '_blank');
    };
    matchContainer.appendChild(matchTitle);

// Cria o container para a seleção do Rayquaza
        const rayquazaContainer = document.createElement("div");
        rayquazaContainer.classList.add("flex", "flex-row", "justify-center", "gap-4", "items-center");

        // Adiciona a imagem do Rayquaza
        const rayquazaImage = document.createElement("img");
        rayquazaImage.src = "./images/objetivos/rayquaza.png";
        rayquazaImage.alt = "Rayquaza";
        rayquazaImage.style.width = "40px";
        rayquazaImage.style.height = "40px";
        rayquazaContainer.appendChild(rayquazaImage);

        // Cria o input para digitar o nome do jogador
        const rayquazaInputElement = document.createElement("input");
        rayquazaInputElement.type = "text";
        rayquazaInputElement.placeholder = "Digite o nome do jogador";
        rayquazaInputElement.classList.add("border", "rounded", "text-center", "p-1");

        // Atualiza o objeto `rayquazaSelect` ao sair do campo de entrada
        rayquazaInputElement.addEventListener("blur", (event) => {
            const enteredPlayer = event.target.value.trim();
            if (enteredPlayer) {
                // Armazena temporariamente a informação, sem incrementar ainda
                rayquazaInputElement.dataset.playerName = enteredPlayer;
            }
        });


// Adiciona o campo de entrada ao container do Rayquaza
    rayquazaContainer.appendChild(rayquazaInputElement);

// Adiciona o container do Rayquaza ao container principal da partida
    matchContainer.appendChild(rayquazaContainer);


    //círculos brancos dos banimentos
    const leftBanCirclesContainer = document.createElement("div");
    leftBanCirclesContainer.classList.add('absolute', 'flex', 'flex-col', 'gap-y-8');
    leftBanCirclesContainer.style.left = '400px'; 
    leftBanCirclesContainer.style.top = '30';
    leftBanCirclesContainer.style.transform = 'translateY(50%)'
    matchContainer.appendChild(leftBanCirclesContainer);

    const rightBanCirclesContainer = document.createElement("div");
    rightBanCirclesContainer.classList.add('absolute', 'flex', 'flex-col', 'gap-8');
    rightBanCirclesContainer.style.right = '400px';
    rightBanCirclesContainer.style.top = '30';
    rightBanCirclesContainer.style.transform = 'translateY(50%)';
    matchContainer.appendChild(rightBanCirclesContainer);

    const modalImages = document.createElement("div");
    modalImages.id = "image-selection-modal";
    modalImages.classList.add("fixed", "inset-0", "flex", "justify-center", "items-center", "bg-black", "bg-opacity-50", "hidden");

    const modalContent = document.createElement("div");
    modalContent.classList.add("bg-white", "p-4", "rounded-lg", "w-[800px]");

    const modalTitle = document.createElement("h2");
    modalTitle.innerText = "Selecione um Pokemon para banir";
    modalTitle.classList.add("text-center", "mb-4", "text-lg", "font-bold");
    modalContent.appendChild(modalTitle);

    const modalImagesContainer = document.createElement("div");
    modalImagesContainer.classList.add("grid", "grid-cols-8", "gap-1");
    modalContent.appendChild(modalImagesContainer);

    const closeModalButton = document.createElement("button");
    closeModalButton.innerText = "Fechar";
    closeModalButton.classList.add("mt-4", "w-full", "bg-red-500", "text-white", "py-2", "rounded-lg");
    modalContent.appendChild(closeModalButton);

    closeModalButton.addEventListener("click", () => {
        modalImages.classList.add("hidden");
    });

    modalImages.appendChild(modalContent);
    document.body.appendChild(modalImages);

    let currentCircle = null;
    const selectedImages = [];

    const openImageSelectionModal = ({ circle, nameContainer, isLeft }) => {
        currentCircle = { circle, nameContainer, isLeft };
        
        modalImagesContainer.innerHTML = "";
        
        const availableImages = Object.keys(pokemonBaseImages).filter(
            pokemon => !selectedImages.includes(pokemon)
        );
        
        availableImages.forEach(pokemon => {
            const imgElement = document.createElement("img");
            imgElement.src = `./images/backgrounds/${pokemonBaseImages[pokemon]}.png`;
            imgElement.alt = pokemon;
            imgElement.classList.add('w-[70px]', 'h-[70px]', 'object-cover', 'cursor-pointer');
            imgElement.addEventListener("click", () => selectImage(pokemon));
            modalImagesContainer.appendChild(imgElement);
        });
        
        modalImages.classList.remove("hidden");
    };
    
    const selectImage = (pokemon) => {
        if (currentCircle) {
            const { circle, nameContainer, isLeft } = currentCircle;
        
            const previousImage = circle.getAttribute('data-image');
            if (previousImage && (isLeft ? bans.BansWinnerTeam : bans.BansLoserTeam)[previousImage]) {
                (isLeft ? bans.BansWinnerTeam : bans.BansLoserTeam)[previousImage]--;
                if ((isLeft ? bans.BansWinnerTeam : bans.BansLoserTeam)[previousImage] === 0) {
                    delete (isLeft ? bans.BansWinnerTeam : bans.BansLoserTeam)[previousImage];
                }
            }
        
            circle.style.backgroundImage = `url('./images/backgrounds/${pokemonBaseImages[pokemon]}.png')`;
            circle.style.backgroundSize = 'cover';
            circle.style.backgroundPosition = 'center';
            circle.style.backgroundRepeat = 'no-repeat';
            
            nameContainer.innerText = pokemon.charAt(0).toUpperCase() + pokemon.slice(1);
            nameContainer.style.textAlign = isLeft ? 'right' : 'left';
    
            if (isLeft) {
                bans.BansWinnerTeam[pokemon] = (bans.BansWinnerTeam[pokemon] || 0) + 1;
            } else {
                bans.BansLoserTeam[pokemon] = (bans.BansLoserTeam[pokemon] || 0) + 1;
            }
            
            circle.setAttribute('data-image', pokemon);
            modalImages.classList.add("hidden");
        }
    };

    const createCircleWithLabel = (isLeft) => {
        const wrapper = document.createElement("div");
        wrapper.classList.add('flex', 'items-center', isLeft ? 'gap-x-2' : 'gap-x-2', isLeft ? 'flex-row-reverse' : 'flex-row');
    
        const nameContainer = document.createElement("div");
        nameContainer.classList.add('text-base', 'font-bold', 'text-white');
        nameContainer.style.minWidth = '100px';
    
        const circle = document.createElement("div");
        circle.classList.add('w-[70px]', 'h-[70px]', 'bg-white', 'rounded-full', 'cursor-pointer', 'shadow-md', 'border', 'border-gray-300');

        circle.addEventListener("click", () => openImageSelectionModal({ circle, nameContainer, isLeft }));
    
        wrapper.appendChild(circle);
        wrapper.appendChild(nameContainer);
    
        return wrapper;
    };

    leftBanCirclesContainer.appendChild(createCircleWithLabel(true));
    leftBanCirclesContainer.appendChild(createCircleWithLabel(true));
    rightBanCirclesContainer.appendChild(createCircleWithLabel(false));
    rightBanCirclesContainer.appendChild(createCircleWithLabel(false));

    const outerDiv = document.createElement("div");
    outerDiv.classList.add('flex', 'items-center', 'divide-x');
    matchContainer.appendChild(outerDiv);
    

    const addMatchInfo = (teamList, mvpPlayer) => {
        const container = document.createElement("div");
        container.classList.add('flex', 'flex-col', 'gap-y-2.5', 'px-3');
        for (const key of Object.keys(teamList)) {
            if (key.startsWith('player')) {
                const playerInfo = teamList[key];
                const { pokemon, playerName, isMVP } = playerInfo;
                const rowContainer = document.createElement("div");
                rowContainer.classList.add('flex', 'items-center', 'rounded-tl-lg', 'rounded-br-lg', 'pr-2', 'justify-between', 'gap-x-4');
                const pokemonRole = pokemonRoles[pokemon];
                const roleColor = rolesColor[pokemonRole];
                const defaultLane = pokemonLanes[pokemon];
                rowContainer.style.backgroundColor = roleColor;
                container.appendChild(rowContainer);

                const imageNameContainer = document.createElement("div");
                imageNameContainer.classList.add('flex', 'items-center');
                const pokemonImage = document.createElement("img");
                pokemonImage.width = 44;
                pokemonImage.height = 44;
                pokemonImage.src = `./images/sprites/${pokemon}.png`;
                imageNameContainer.appendChild(pokemonImage);

                const pokemonName = document.createElement("span");
                pokemonName.classList.add('pl-1.5', 'text-white');
                pokemonName.style.minWidth = '100px';
                pokemonName.innerText = capitalize(pokemon);
                imageNameContainer.appendChild(pokemonName);
                rowContainer.appendChild(imageNameContainer);

                const roleSelectBox = document.createElement("select");
                selectBoxes.push(roleSelectBox);
                roleSelectBox.style.width = 100;
                roleSelectBox.addEventListener("change", (e) => {
                    playerInfo.role = e.target.value;
                });
                for (const roleKey of Object.keys(rolesColor)) {
                    const option = document.createElement("option");
                    option.setAttribute('value', roleKey);
                    if (pokemonRole === roleKey) {
                        playerInfo.role = pokemonRole;
                        option.setAttribute('selected', 'selected');
                    }
                    option.innerText = roleKey;
                    roleSelectBox.appendChild(option);
                }
                rowContainer.appendChild(roleSelectBox);

                const laneSelectBox = document.createElement("select");
                selectBoxes.push(laneSelectBox);
                laneSelectBox.style.width = 50;
                laneSelectBox.addEventListener("change", (e) => {
                    playerInfo.lane = e.target.value;
                });
                for (const laneKeys of lanes) {
                    const option = document.createElement("option");
                    option.setAttribute('value', laneKeys);
                    if (laneKeys === defaultLane) {
                        option.setAttribute('selected', 'selected');
                        playerInfo.lane = laneKeys;
                    }
                    option.innerText = laneKeys;
                    laneSelectBox.appendChild(option);
                }
                rowContainer.appendChild(laneSelectBox);

                const playerNameSpan = document.createElement("span");
                playerNameSpan.classList.add('text-black');
                playerNameSpan.style.minWidth = '110px';
                playerNameSpan.style.textAlignLast = 'right';
                playerNameSpan.innerText = playerName;
                if (playerInfo.isMVP) {
                    playerNameSpan.style.color = 'yellow';
                    playerNameSpan.style.fontWeight = 'bold';
                    playerNameSpan.style.textShadow = `
                        1px 1px 0 black, 
                        -1px 1px 0 black, 
                        1px -1px 0 black, 
                        -1px -1px 0 black
                    `;
                }
                rowContainer.appendChild(playerNameSpan);
            }
        }

        outerDiv.appendChild(container);
    };
    addMatchInfo(winnerTeam, winnerMVP);
    addMatchInfo(defeatedTeam, defeatedMVP);

});
const saveChangesButton = document.createElement("button");
saveChangesButton.classList.add('border-white', 'border', 'rounded-lg', 'p-4', 'bg-amber-500', 'text-white');
saveChangesButton.innerText = 'Salvar Informações'
containerDiv.appendChild(saveChangesButton);

saveChangesButton.onclick = async () => { 
    console.log('UPLOAD RESULT AFTER CHANGES', uploadResult);
    const matchContainers = containerDiv.getElementsByTagName('div');
    for (const matchContainer of matchContainers) {
        matchContainer.classList.add('hidden');
        saveChangesButton.classList.add('hidden');
    }
    const postSaveDiv = document.createElement("div");
    postSaveDiv.classList.add('fixed', 'flex', 'items-center', 'p-4', 'border', 'border-black', 'rounded-lg', 'bg-slate-50');
    postSaveDiv.style.top = '50%'; 
    postSaveDiv.style.left = '50%'; 
    postSaveDiv.style.transform = 'translate(-50%, -50%)'; 
    containerDiv.appendChild(postSaveDiv);
    const postSaveText = document.createElement("span");
    postSaveText.innerText = 'Salvando dados...';
    postSaveDiv.appendChild(postSaveText);

    const lastMatchDate = uploadResult[uploadResult.length - 1]?.matchDate || "Data não disponível";
    // Formatar a data, se necessário
    const formattedLastMatchDate = lastMatchDate.replace(/-/g, '/');

    document.querySelectorAll("input[type='text'][placeholder='Digite o nome do jogador']").forEach(input => {
        const playerName = input.dataset.playerName?.trim();
        if (playerName) {
            rayquazaSelectLocal[playerName] = (rayquazaSelectLocal[playerName] || 0) + 1;
        }
    });
    
    // Atualiza o localStorage com os valores corrigidos
    localStorage.setItem("rayquazaSelect", JSON.stringify(rayquazaSelectLocal));
    fetch('./results.json')
    .then((response) => response.json())
    .then((results) => {
        results = results || {}
        results.rayquazaSelect = results.rayquazaSelect || {};

        const storedRayquaza = JSON.parse(localStorage.getItem("rayquazaSelect")) || {};

        Object.keys(storedRayquaza).forEach(player => {
            results.rayquazaSelect[player] = (results.rayquazaSelect[player] || 0) + storedRayquaza[player];
        });

        console.log("Rayquaza Select atualizado:", results.rayquazaSelect);
        results.lastMatchDate = formattedLastMatchDate;
        results.matchTypeSummary = results.matchTypeSummary || {};
        results.totalKillsSummary = results.totalKillsSummary || { allyTeam: 0, enemyTeam: 0 };

        const calculateTotalKills = (team) =>
            Object.values(team).reduce((sum, p) => sum + (p.kills || 0), 0);

        results.teamStreak = results.teamStreak || {
            allyTeam: { currentStreak: 0, maxWinStreak: 0, maxLoseStreak: 0 },
            enemyTeam: { currentStreak: 0, maxWinStreak: 0, maxLoseStreak: 0 },
        };
        
        const updateStreaks = (teamType, hasWon) => {
            const streaks = results.teamStreak[teamType];
            
            if (hasWon) {
                if (streaks.currentStreak >= 0) {
                    streaks.currentStreak += 1;
                } else {
                    streaks.currentStreak = 1;
                }
                streaks.maxWinStreak = Math.max(streaks.maxWinStreak, streaks.currentStreak);
            } else {
                if (streaks.currentStreak <= 0) {
                    streaks.currentStreak -= 1;
                } else {
                    streaks.currentStreak = -1;
                }
                streaks.maxLoseStreak = Math.max(streaks.maxLoseStreak, Math.abs(streaks.currentStreak));
            }
        };

        uploadResult.forEach((matchResult) => {
            const { winnerTeam, defeatedTeam, matchType } = matchResult;

            const isPlayerInTeam = (team) =>
                Object.values(team).some(
                    (p) =>
                        p.playerName &&
                        p.playerName.localeCompare(playerNameInput.value, undefined, { sensitivity: 'base' }) === 0
                );

            const isPlayerInWinnerTeam = isPlayerInTeam(winnerTeam);

            const allyTeam = isPlayerInWinnerTeam ? winnerTeam : defeatedTeam;
            const enemyTeam = isPlayerInWinnerTeam ? defeatedTeam : winnerTeam;

            const allyKills = calculateTotalKills(allyTeam);
            const enemyKills = calculateTotalKills(enemyTeam);

            results.totalKillsSummary.allyTeam += allyKills;
            results.totalKillsSummary.enemyTeam += enemyKills;

            updateStreaks('allyTeam', isPlayerInWinnerTeam);
            updateStreaks('enemyTeam', !isPlayerInWinnerTeam);

        });

        results.mvpStats = results.mvpStats || { playersWinner: {}, playersDefeated: {} };

        results.bans = results.bans || {};
        results.bans.BansWinnerTeam = results.bans.BansWinnerTeam || {};
        results.bans.BansLoserTeam = results.bans.BansLoserTeam || {};

        const mergeMvpStats = (existingStats, newStats) => {
            Object.keys(newStats).forEach(key => {
                existingStats[key] = (existingStats[key] || 0) + newStats[key];
            });
        };

        const mergeBans = (existingBans, newBans) => {
            Object.keys(newBans.BansWinnerTeam).forEach(pokemon => {
                existingBans.BansWinnerTeam[pokemon] = (existingBans.BansWinnerTeam[pokemon] || 0) + newBans.BansWinnerTeam[pokemon];
            });
            Object.keys(newBans.BansLoserTeam).forEach(pokemon => {
                existingBans.BansLoserTeam[pokemon] = (existingBans.BansLoserTeam[pokemon] || 0) + newBans.BansLoserTeam[pokemon];
            });
        };

        mergeMvpStats(results.mvpStats.playersWinner, mvpStats.playersWinner);
        mergeMvpStats(results.mvpStats.playersDefeated, mvpStats.playersDefeated);

        mergeBans(results.bans, bans);

        const addRolesStructure = () => {
            const rolesObj = {}
            for (const roleKey of Object.keys(rolesColor)) {
                rolesObj[roleKey] = {
                    pickRate: 0,
                    winRate: 0
                }
            }
            return rolesObj;
        }
             
        const addMatchInfo = (team, hasWon, matchResult, matchType) => {
            const isAllyTeam = Object.keys(team).find(teamKey => teamKey.startsWith('player') && team[teamKey].playerName.localeCompare(playerNameInput.value, undefined, { sensitivity: 'base' }) === 0) !== undefined;
            const teamType = isAllyTeam ? 'allyTeam' : 'enemyTeam'
            results[teamType] = results[teamType] || {
                overall: {},
                wins: 0,
                losses: 0,
            }

            if (hasWon) {
                results[teamType].wins++
            } else {
                results[teamType].losses++
            }

            const teamKeys = Object.keys(team)
            for (const teamKey of teamKeys) {
                if (teamKey.startsWith('player')) {
                    const playerInfo = team[teamKey];
                    const {abilities, assists, battleItem, damageDone, damageHealed, damageTaken, interrupts, kills, lane, playerName, pokemon, role, playerScore} = playerInfo;
                    const saveInfo = (entity) => {
                        results[teamType][entity] = results[teamType][entity] || {}
                        results[teamType][entity][pokemon] = results[teamType][entity][pokemon] || {}
                        results[teamType][entity][pokemon].lastMatch = hasWon ? 'W' : 'L';
                        results[teamType][entity][pokemon].matchTypes = results[teamType][entity][pokemon].matchTypes || {};
                        results[teamType][entity][pokemon].matchTypes[matchType] = (results[teamType][entity][pokemon].matchTypes[matchType] || 0) + 1;
                        results[teamType][entity][pokemon].pickRate = results[teamType][entity][pokemon].pickRate || 0
                        results[teamType][entity][pokemon].pickRate++
                        results[teamType][entity][pokemon].wins = results[teamType][entity][pokemon].wins || 0
                        results[teamType][entity][pokemon].losses = results[teamType][entity][pokemon].losses || 0
                        if (hasWon) {
                            results[teamType][entity][pokemon].wins++
                        } else {
                            results[teamType][entity][pokemon].losses++
                        }
                        results[teamType][entity][pokemon].currentWinStreak = results[teamType][entity][pokemon].currentWinStreak || 0;
                        results[teamType][entity][pokemon].currentLoseStreak = results[teamType][entity][pokemon].currentLoseStreak || 0;
                        results[teamType][entity][pokemon].maxWinStreak = results[teamType][entity][pokemon].maxWinStreak || 0;
                        results[teamType][entity][pokemon].maxLoseStreak = results[teamType][entity][pokemon].maxLoseStreak || 0;

                        if (hasWon) {
                            results[teamType][entity][pokemon].currentWinStreak += 1;
                            results[teamType][entity][pokemon].currentLoseStreak = 0; // Resete a sequência de derrotas
                            results[teamType][entity][pokemon].maxWinStreak = Math.max(
                                results[teamType][entity][pokemon].maxWinStreak,
                                results[teamType][entity][pokemon].currentWinStreak
                            );
                        } else {
                            results[teamType][entity][pokemon].currentLoseStreak += 1;
                            results[teamType][entity][pokemon].currentWinStreak = 0; // Resete a sequência de vitórias
                            results[teamType][entity][pokemon].maxLoseStreak = Math.max(
                                results[teamType][entity][pokemon].maxLoseStreak,
                                Math.abs(results[teamType][entity][pokemon].currentLoseStreak)
                            );
                        }
                        const lastWinRate = results[teamType][entity][pokemon].winRate
                        results[teamType][entity][pokemon].winRate = Number(((100 * results[teamType][entity][pokemon].wins) / results[teamType][entity][pokemon].pickRate).toFixed(2))
                        let isUp = undefined
                        if (lastWinRate !== undefined) {
                            if (lastWinRate < results[teamType][entity][pokemon].winRate || lastWinRate > results[teamType][entity][pokemon].winRate) {
                                isUp = lastWinRate < results[teamType][entity][pokemon].winRate
                            }
                        } else {
                            isUp = hasWon
                        }
                        results[teamType][entity][pokemon].isUp = isUp

                        const saveMatchDetails = (entity) => {
                            results[teamType][entity] = results[teamType][entity] || {};
                            results[teamType][entity][pokemon] = results[teamType][entity][pokemon] || {};
                        
                            results[teamType][entity][pokemon].matches = results[teamType][entity][pokemon].matches || [];
                        
                            const currentMatch = {
                                matchType,
                                kills,
                                assists,
                                damageDone,
                                damageHealed,
                                damageTaken,
                                interrupts,
                                playerScore,
                                battleItem,
                                isWin: hasWon,
                            };
                        
                            const isDuplicate = results[teamType][entity][pokemon].matches.some(match =>
                                match.matchType === currentMatch.matchType &&
                                match.kills === currentMatch.kills &&
                                match.assists === currentMatch.assists &&
                                match.damageDone === currentMatch.damageDone &&
                                match.damageHealed === currentMatch.damageHealed &&
                                match.damageTaken === currentMatch.damageTaken &&
                                match.interrupts === currentMatch.interrupts &&
                                match.playerScore === currentMatch.playerScore &&
                                match.battleItem === currentMatch.battleItem &&
                                match.isWin === currentMatch.isWin
                            );
                            if (!isDuplicate) {
                                results[teamType][entity][pokemon].matches.push(currentMatch);
                            }
                        };
     
                        saveMatchDetails('overall');
                        if (isAllyTeam) {
                            saveMatchDetails(playerName);
                        }

                        results[teamType][entity][pokemon].alliedPokemons = results[teamType][entity][pokemon].alliedPokemons || {}
                        const filteredTeamKeys = teamKeys.filter(keyValue => keyValue.startsWith('player') && keyValue !== teamKey)
                        for (const filterTeamKey of filteredTeamKeys) {
                            const allyPlayerInfo = team[filterTeamKey];
                            const {pokemon: allyPokemon} = allyPlayerInfo;
                            results[teamType][entity][pokemon].alliedPokemons[allyPokemon] = results[teamType][entity][pokemon].alliedPokemons[allyPokemon] || {
                                wins: 0,
                                losses: 0,
                                pickRate: 0
                            }
                            results[teamType][entity][pokemon].alliedPokemons[allyPokemon].pickRate++
                            if (hasWon) {
                                results[teamType][entity][pokemon].alliedPokemons[allyPokemon].wins++
                            } else {
                                results[teamType][entity][pokemon].alliedPokemons[allyPokemon].losses++
                            }
                            const lastWinRate = results[teamType][entity][pokemon].alliedPokemons[allyPokemon].winRate
                            results[teamType][entity][pokemon].alliedPokemons[allyPokemon].winRate = Number(((100 * results[teamType][entity][pokemon].alliedPokemons[allyPokemon].wins) / results[teamType][entity][pokemon].alliedPokemons[allyPokemon].pickRate).toFixed(2))
                            let isUp = undefined
                            if (lastWinRate !== undefined) {
                                if (lastWinRate < results[teamType][entity][pokemon].alliedPokemons[allyPokemon].winRate || lastWinRate > results[teamType][entity][pokemon].alliedPokemons[allyPokemon].winRate) {
                                    isUp = lastWinRate < results[teamType][entity][pokemon].alliedPokemons[allyPokemon].winRate
                                }
                            } else {
                                isUp = hasWon
                            }
                            results[teamType][entity][pokemon].alliedPokemons[allyPokemon].isUp = isUp
                        }

                        const otherTeamType = hasWon ? 'defeatedTeam' : 'winnerTeam';
                        results[teamType][entity][pokemon].enemyPokemons = results[teamType][entity][pokemon].enemyPokemons || {}
                        const otherTeam = matchResult[otherTeamType];
                        const otherTeamKeys = Object.keys(otherTeam);
                        const filteredOtherTeamKeys = otherTeamKeys.filter(keyValue => keyValue.startsWith('player'))
                        const hasOtherTeamWon = !hasWon
                        for (const filterTeamKey of filteredOtherTeamKeys) {
                            const allyPlayerInfo = otherTeam[filterTeamKey];
                            const {pokemon: allyPokemon} = allyPlayerInfo;
                            results[teamType][entity][pokemon].enemyPokemons[allyPokemon] = results[teamType][entity][pokemon].enemyPokemons[allyPokemon] || {
                                wins: 0,
                                losses: 0,
                                pickRate: 0
                            }
                            results[teamType][entity][pokemon].enemyPokemons[allyPokemon].pickRate++
                            if (hasOtherTeamWon) {
                                results[teamType][entity][pokemon].enemyPokemons[allyPokemon].wins++
                            } else {
                                results[teamType][entity][pokemon].enemyPokemons[allyPokemon].losses++
                            }
                            const lastWinRate = results[teamType][entity][pokemon].enemyPokemons[allyPokemon].winRate
                            results[teamType][entity][pokemon].enemyPokemons[allyPokemon].winRate = Number(((100 * results[teamType][entity][pokemon].enemyPokemons[allyPokemon].wins) / results[teamType][entity][pokemon].enemyPokemons[allyPokemon].pickRate).toFixed(2))
                            let isUp = undefined
                            if (lastWinRate !== undefined) {
                                if (lastWinRate < results[teamType][entity][pokemon].enemyPokemons[allyPokemon].winRate || lastWinRate > results[teamType][entity][pokemon].enemyPokemons[allyPokemon].winRate) {
                                    isUp = lastWinRate < results[teamType][entity][pokemon].enemyPokemons[allyPokemon].winRate
                                }
                            } else {
                                isUp = hasOtherTeamWon
                            }
                            results[teamType][entity][pokemon].enemyPokemons[allyPokemon].isUp = isUp
                        }

                        results[teamType][entity][pokemon].roles = results[teamType][entity][pokemon].roles || addRolesStructure()
                        results[teamType][entity][pokemon].roles[role].pickRate++
                        if (hasWon) {
                            results[teamType][entity][pokemon].roles[role].wins = results[teamType][entity][pokemon].roles[role].wins || 0
                            results[teamType][entity][pokemon].roles[role].wins++
                        }

                        results[teamType][entity][pokemon].skills = results[teamType][entity][pokemon].skills || {}
                        for (const ability of abilities) {
                            results[teamType][entity][pokemon].skills[ability] = results[teamType][entity][pokemon].skills[ability] || {}
                            results[teamType][entity][pokemon].skills[ability].pickRate = results[teamType][entity][pokemon].skills[ability].pickRate || 0
                            results[teamType][entity][pokemon].skills[ability].pickRate++
                            if (hasWon) {
                                results[teamType][entity][pokemon].skills[ability].wins = results[teamType][entity][pokemon].skills[ability].wins || 0
                                results[teamType][entity][pokemon].skills[ability].wins++
                            }
                        }

                        results[teamType][entity][pokemon].battleItems = results[teamType][entity][pokemon].battleItems || {}
                        results[teamType][entity][pokemon].battleItems[battleItem] = results[teamType][entity][pokemon].battleItems[battleItem] || {}
                        results[teamType][entity][pokemon].battleItems[battleItem].pickRate = results[teamType][entity][pokemon].battleItems[battleItem].pickRate || 0
                        results[teamType][entity][pokemon].battleItems[battleItem].pickRate++
                        if (hasWon) {
                            results[teamType][entity][pokemon].battleItems[battleItem].wins = results[teamType][entity][pokemon].battleItems[battleItem].wins || 0
                            results[teamType][entity][pokemon].battleItems[battleItem].wins++
                        }

                        results[teamType][entity][pokemon].lanes = results[teamType][entity][pokemon].lanes || {}
                        results[teamType][entity][pokemon].lanes[lane] = results[teamType][entity][pokemon].lanes[lane] || {}
                        results[teamType][entity][pokemon].lanes[lane].pickRate = results[teamType][entity][pokemon].lanes[lane].pickRate || 0
                        results[teamType][entity][pokemon].lanes[lane].pickRate++
                        if (hasWon) {
                            results[teamType][entity][pokemon].lanes[lane].wins = results[teamType][entity][pokemon].lanes[lane].wins || 0
                            results[teamType][entity][pokemon].lanes[lane].wins++
                        }

                        if (results[teamType][entity][pokemon].killsRate !== undefined) {
                            results[teamType][entity][pokemon].killsRate = Number((((results[teamType][entity][pokemon].killsRate * (results[teamType][entity][pokemon].pickRate - 1)) + kills) / results[teamType][entity][pokemon].pickRate).toFixed(1))
                        } else {
                            results[teamType][entity][pokemon].killsRate = kills
                        }
                        if (results[teamType][entity][pokemon].assistsRate !== undefined) {
                            results[teamType][entity][pokemon].assistsRate = Number((((results[teamType][entity][pokemon].assistsRate * (results[teamType][entity][pokemon].pickRate - 1)) + assists) / results[teamType][entity][pokemon].pickRate).toFixed(1))
                        } else {
                            results[teamType][entity][pokemon].assistsRate = assists
                        }
                        if (results[teamType][entity][pokemon].interruptsRate !== undefined) {
                            results[teamType][entity][pokemon].interruptsRate = Number((((results[teamType][entity][pokemon].interruptsRate * (results[teamType][entity][pokemon].pickRate - 1)) + interrupts) / results[teamType][entity][pokemon].pickRate).toFixed(1))
                        } else {
                            results[teamType][entity][pokemon].interruptsRate = interrupts
                        }
                        if (results[teamType][entity][pokemon].damageDoneRate !== undefined) {
                            results[teamType][entity][pokemon].damageDoneRate = Number((((results[teamType][entity][pokemon].damageDoneRate * (results[teamType][entity][pokemon].pickRate - 1)) + damageDone) / results[teamType][entity][pokemon].pickRate).toFixed(1))
                        } else {
                            results[teamType][entity][pokemon].damageDoneRate = damageDone
                        }
                        if (results[teamType][entity][pokemon].damageTakenRate !== undefined) {
                            results[teamType][entity][pokemon].damageTakenRate = Number((((results[teamType][entity][pokemon].damageTakenRate * (results[teamType][entity][pokemon].pickRate - 1)) + damageTaken) / results[teamType][entity][pokemon].pickRate).toFixed(1))
                        } else {
                            results[teamType][entity][pokemon].damageTakenRate = damageTaken
                        }
                        if (results[teamType][entity][pokemon].damageHealedRate !== undefined) {
                            results[teamType][entity][pokemon].damageHealedRate = Number((((results[teamType][entity][pokemon].damageHealedRate * (results[teamType][entity][pokemon].pickRate - 1)) + damageHealed) / results[teamType][entity][pokemon].pickRate).toFixed(1))
                        } else {
                            results[teamType][entity][pokemon].damageHealedRate = damageHealed
                        }
                        

                        if (results[teamType][entity][pokemon].scoreRate !== undefined) {
                            results[teamType][entity][pokemon].scoreRate = Number((((results[teamType][entity][pokemon].scoreRate * (results[teamType][entity][pokemon].pickRate - 1)) + playerScore) / results[teamType][entity][pokemon].pickRate).toFixed(1))
                        } else {
                            results[teamType][entity][pokemon].scoreRate = playerScore
                        }
                    }
                    saveInfo('overall')
                    if (isAllyTeam) {
                        saveInfo(playerName)
                    }
                }
            }
        }
        for (const matchResult of uploadResult) {
            const {matchType, winnerTeam, defeatedTeam} = matchResult;
            results.matchTypeSummary[matchType] = (results.matchTypeSummary[matchType] || 0) + 1;
            const isPlayerInTeam = (team) =>
                Object.values(team).some(p => p.playerName && p.playerName.localeCompare(playerNameInput.value, undefined, { sensitivity: 'base' }) === 0);
        
            const isAllyInWinnerTeam = isPlayerInTeam(winnerTeam);
            const allyTeam = isAllyInWinnerTeam ? winnerTeam : defeatedTeam;
            const enemyTeam = isAllyInWinnerTeam ? defeatedTeam : winnerTeam;

            addMatchInfo(allyTeam, isPlayerInTeam(winnerTeam), matchResult, matchType);
            addMatchInfo(enemyTeam, !isPlayerInTeam(winnerTeam), matchResult, matchType);

        }
        console.log('FINAL RESULTS', results)
        console.log('FINAL string', JSON.stringify(results));
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(results));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        console.log('FINAL datastr', dataStr);
        downloadAnchorNode.setAttribute("download", "results.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        postSaveText.innerText = 'Dados atualizados com sucesso! Redirecionando em 3 segundos...';
        postSaveText.classList.add('text-white', 'font-bold');
        postSaveDiv.classList.replace('bg-slate-50', 'bg-green-500');

        // Redireciona para index.html após 1 segundos
        setTimeout(() => {
            window.location.href = window.location.pathname.replace('upload-result.html', 'index.html');
        }, 1000);
    });
}