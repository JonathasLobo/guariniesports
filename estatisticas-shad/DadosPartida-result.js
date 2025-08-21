document.addEventListener("DOMContentLoaded", () => {
    const selectedMatchIndex = localStorage.getItem("selectedMatchIndex");
    const matches = JSON.parse(localStorage.getItem("matchData"));

    const getFormattedRate = (damage) => {
        if (damage >= 1000) {
            return `${Math.floor(damage / 1000)}k`;
        }
        return damage;
    };

    if (selectedMatchIndex !== null && matches) {
        const match = matches[matches.length - 1 - selectedMatchIndex];
        const matchData = {
            winnerMVP: null,
            defeatedMVP: null,
        };
        const centerContent = document.getElementById("center-content");
        const cabecalhoContent = document.getElementById("cabecalho");

        const leftTeamTopicDetails = document.createElement("span");
        leftTeamTopicDetails.innerText = `Detalhes da Partida ${parseInt(selectedMatchIndex) + 1}`;
        cabecalhoContent.appendChild(leftTeamTopicDetails);

        const leftTeamTopicDate = document.createElement("span");
        leftTeamTopicDate.innerText = `Data: ${match.matchDate}h`;
        cabecalhoContent.appendChild(leftTeamTopicDate);

        const leftTeamTopicType = document.createElement("span");
        leftTeamTopicType.innerText = `Tipo da partida: ${match.matchType}`;
        cabecalhoContent.appendChild(leftTeamTopicType);

        const centerOuterContainer = document.createElement("div");
        centerOuterContainer.classList.add('relative');
        centerContent.appendChild(centerOuterContainer);

        const centerAbsoluteContainer = document.createElement("div");
        centerAbsoluteContainer.classList.add('absolute', 'items-start','w-full', 'h-full');
        centerOuterContainer.appendChild(centerAbsoluteContainer);

        const centerBgOuterContainer = document.createElement("div");
        centerBgOuterContainer.classList.add('relative');
        centerAbsoluteContainer.appendChild(centerBgOuterContainer);

        const leftAbsoluteContainer = document.createElement("div");
        leftAbsoluteContainer.classList.add('absolute', 'w-[1140px]', 'h-[800px]');
        centerOuterContainer.appendChild(leftAbsoluteContainer);

        const leftPerformanceContainer = document.createElement("div")
        leftPerformanceContainer.classList.add('absolute', 'flex-col', 'top-[40px]','left-[900px]')
        leftAbsoluteContainer.appendChild(leftPerformanceContainer)

        const matchLeftDetailsContainer = document.createElement("div");
        matchLeftDetailsContainer.classList.add('flex', 'justify-center', 'text-white', 'pt-2', 'items-start');
        leftAbsoluteContainer.appendChild(matchLeftDetailsContainer);

        const tableDetailsMatchStatistics = document.createElement("div");
        tableDetailsMatchStatistics.classList.add('flex', 'flex-col', 'text-white', 'items-center');
        matchLeftDetailsContainer.appendChild(tableDetailsMatchStatistics);

        const leftDetailsPokemonsContent = document.createElement("div");
        leftDetailsPokemonsContent.classList.add('absolute', 'top-[100px]', 'left-[20px]');
        centerAbsoluteContainer.appendChild(leftDetailsPokemonsContent);

        /*const imageBgWinnerContent = document.createElement("img");
        imageBgWinnerContent.width = 1200;
        imageBgWinnerContent.src = './images/backgrounds/pokemon-right-background.png';
        centerContent.appendChild(imageBgWinnerContent);

        const imageBgDefeatContent = document.createElement("img");
        imageBgDefeatContent.width = 1200;
        imageBgDefeatContent.src = './images/backgrounds/pokemon-right-background.png';
        centerContent.appendChild(imageBgDefeatContent);*/

        const winnerTeam = document.createElement("span");
        winnerTeam.classList.add('flex', 'items-center', 'text-2xl', 'text-white', 'mt-4', 'mb-2');
        winnerTeam.innerHTML = `TIME <span class="text-green-500 ml-1">VENCEDOR</span> - Pontuação Total: <span class="text-green-500 ml-1">${match.winnerTeam.totalScore}</span>`;
        tableDetailsMatchStatistics.appendChild(winnerTeam);

        const titleSpan = document.createElement("span");
        titleSpan.classList.add('flex', 'flex-row', 'items-center', 'text-xl', 'text-white', 'mt-2','ml-48', 'gap-x-12');
        tableDetailsMatchStatistics.appendChild(titleSpan);

        const scoreTitle = document.createElement("span");
        scoreTitle.classList.add('flex', 'text-xl', 'text-white');
        scoreTitle.innerText = `Pontuação`;
        titleSpan.appendChild(scoreTitle);

        const killsTitle = document.createElement("span");
        killsTitle.classList.add('flex', 'text-xl', 'text-white');
        killsTitle.innerText = `Abates`;
        titleSpan.appendChild(killsTitle);

        const assitsTitle = document.createElement("span");
        assitsTitle.classList.add('flex', 'text-xl', 'text-white');
        assitsTitle.innerText = `Assists`;
        titleSpan.appendChild(assitsTitle);

        const dmgDoneTitle = document.createElement("span");
        dmgDoneTitle.classList.add('flex', 'text-xl', 'text-white','ml-2');
        dmgDoneTitle.innerText = `DC`;
        titleSpan.appendChild(dmgDoneTitle);

        const dmgTakenTitle = document.createElement("span");
        dmgTakenTitle.classList.add('flex', 'text-xl', 'text-white','ml-6');
        dmgTakenTitle.innerText = `DR`;
        titleSpan.appendChild(dmgTakenTitle);

        const dmgHealedTitle = document.createElement("span");
        dmgHealedTitle.classList.add('flex', 'text-xl', 'text-white','ml-2');
        dmgHealedTitle.innerText = `Cura`;
        titleSpan.appendChild(dmgHealedTitle);

        const performancePointsTitle = document.createElement("span");
        performancePointsTitle.classList.add('flex', 'text-xl', 'text-white','ml-2');
        performancePointsTitle.innerText = `PERFORMANCE`;
        titleSpan.appendChild(performancePointsTitle);

        const generalWinnerTeam = document.createElement("div");
        generalWinnerTeam.classList.add('flex','flex-col', 'justify-center', 'mt-6');
        leftDetailsPokemonsContent.appendChild(generalWinnerTeam);

        const matchWinnerTeam = document.createElement("div");
        matchWinnerTeam.classList.add('flex', 'flex-col', 'gap-y-16','justify-start'); 
        generalWinnerTeam.appendChild(matchWinnerTeam);

        let playersPerformance = []; 

        Object.values(match.winnerTeam).forEach((player) => {
            let performancePoints = 0;
            if (player.playerName && player.pokemon) {
                const playerContainer = document.createElement("div");
                playerContainer.classList.add('flex', 'flex-row', 'justify-start', 'items-center');

                const matchPokemonImageUsage = document.createElement("img");
                matchPokemonImageUsage.src = `./images/sprites/${player.pokemon}.png`;
                matchPokemonImageUsage.alt = player.pokemon;
                matchPokemonImageUsage.classList.add('w-16', 'h-16', 'items-center');
                playerContainer.appendChild(matchPokemonImageUsage);

                const matchPlayersWinnerTeam = document.createElement("span");
                matchPlayersWinnerTeam.classList.add('text-white', 'text-xl', 'whitespace-nowrap');
                matchPlayersWinnerTeam.innerText = player.playerName;
                playerContainer.appendChild(matchPlayersWinnerTeam);

                const scorePercentage = match.winnerTeam.totalScore > 0 ? ((player.playerScore / match.winnerTeam.totalScore) * 100).toFixed(1) : 0;
                const scoreData = match.winnerTeam.totalScore > 0 ? [player.playerScore, match.winnerTeam.totalScore] : [0, 1];
                const totalKills = Object.values(match.winnerTeam).reduce((sum, player) => sum + (player.kills || 0), 0);
                const killsPercentage = ((player.kills / totalKills) * 100).toFixed(1);
                const totalAssists = Object.values(match.winnerTeam).reduce((sum, player) => sum + (player.assists || 0), 0);
                const assistsPercentage = ((player.assists / totalAssists) * 100).toFixed(1);
                const totalDmgDone = Object.values(match.winnerTeam).reduce((sum, player) => sum + (player.damageDone || 0), 0);
                const dmgDonePercentage = ((player.damageDone / totalDmgDone) * 100).toFixed(1);
                const totalDmgTaken = Object.values(match.winnerTeam).reduce((sum, player) => sum + (player.damageTaken || 0), 0);
                const dmgTakenPercentage = ((player.damageTaken / totalDmgTaken) * 100).toFixed(1);
                const totalDmgHealed = Object.values(match.winnerTeam).reduce((sum, player) => sum + (player.damageHealed || 0), 0);
                const dmgHealedPercentage = ((player.damageHealed / totalDmgHealed) * 100).toFixed(1);

                if (scorePercentage >= 20) performancePoints += 20;
                if (killsPercentage >= 20) performancePoints += 15;
                if (assistsPercentage >= 20) performancePoints += 20;
                if (dmgDonePercentage >= 20) performancePoints += 15;
                if (dmgTakenPercentage >= 20) performancePoints += 15;
                if (dmgHealedPercentage >= 20) performancePoints += 15;
                
                const performanceProgressBarColumn = document.createElement("div"); 
                performanceProgressBarColumn.classList.add('flex', 'flex-col','mb-[75px]');

                const progressBarContainer = document.createElement("div");
                progressBarContainer.classList.add('w-full', 'bg-gray-200', 'rounded-full', 'h-4','mb-1');
                progressBarContainer.style.width = '120px';

                const progressBar = document.createElement("div");
                progressBar.classList.add('h-4', 'rounded-full');
                progressBar.style.width = `${performancePoints}%`;
                progressBar.style.backgroundColor = 'rgb(29, 181, 52)';
                progressBarContainer.appendChild(progressBar);

                const performanceWithIcon = document.createElement("div");
                performanceWithIcon.classList.add('flex', 'items-center', 'space-x-18', 'mt-2');

                const performanceSpanNumber = document.createElement("span");
                performanceSpanNumber.classList.add('text-xl', 'text-white', 'whitespace-nowrap', 'font-bold');
                performanceSpanNumber.innerText = `${performancePoints} Pontos`;
                performanceSpanNumber.style.textShadow = '1px 1px 0 black, -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black';
                performanceSpanNumber.style.display = 'block';
                performanceWithIcon.appendChild(performanceSpanNumber);

                const progressBarWithIconContainer = document.createElement("div");
                progressBarWithIconContainer.classList.add('relative','flex', 'items-center', 'space-x-2');
                progressBarWithIconContainer.appendChild(progressBarContainer);

                performanceProgressBarColumn.appendChild(progressBarWithIconContainer);
                performanceProgressBarColumn.appendChild(performanceWithIcon);
                leftPerformanceContainer.appendChild(performanceProgressBarColumn);

                playersPerformance.push({ player, performancePoints, scorePercentage, playerContainer, performanceWithIcon  });

                const chartScoreContainer = document.createElement("div");
                chartScoreContainer.classList.add('absolute', 'left-[275px]');
                playerContainer.appendChild(chartScoreContainer);

                const pokemonDoughnutScoreCanvas = document.createElement("canvas");
                pokemonDoughnutScoreCanvas.id = 'graficoPontuacao'
                pokemonDoughnutScoreCanvas.width = 72;
                pokemonDoughnutScoreCanvas.height = 72;
                chartScoreContainer.appendChild(pokemonDoughnutScoreCanvas);

                const percentageScoreLabel = document.createElement("span");
                percentageScoreLabel.classList.add('absolute', 'text-sm', 'text-white', 'left-[295px]');
                percentageScoreLabel.innerText = `${scorePercentage}%`;
                playerContainer.appendChild(percentageScoreLabel);

                new Chart(pokemonDoughnutScoreCanvas, {
                    type: 'doughnut',
                    data: {
                        label: 'Pontuação',
                        datasets: [{
                            data: scoreData,
                            backgroundColor: [
                                'rgb(27, 203, 247)',
                                'rgb(255, 255, 255)',
                            ],
                            hoverOffset: 4
                        }],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        const label = context.dataset.label || '';
                                        const value = context.raw;
                                        return `${label}: ${value}`;
                                    }
                                }
                            }
                        },
                        cutout: '70%',
                        elements: {
                            arc: {
                                borderWidth: 0
                            }
                        },
                        maintainAspectRatio: false,
                        responsive: false
                    }
                    
                });

                const chartKillsContainer = document.createElement("div");
                chartKillsContainer.classList.add('absolute', 'left-[398px]');
                playerContainer.appendChild(chartKillsContainer);

                const pokemonDoughnutKillsCanvas = document.createElement("canvas");
                pokemonDoughnutKillsCanvas.id = 'graficoKills'
                pokemonDoughnutKillsCanvas.width = 72;
                pokemonDoughnutKillsCanvas.height = 72;
                chartKillsContainer.appendChild(pokemonDoughnutKillsCanvas);

                const percentageKillsLabel = document.createElement("span");
                percentageKillsLabel.classList.add('absolute', 'text-sm', 'text-white', 'left-[415px]');
                percentageKillsLabel.innerText = `${killsPercentage}%`;
                playerContainer.appendChild(percentageKillsLabel);

                new Chart(pokemonDoughnutKillsCanvas, {
                    type: 'doughnut',
                    data: {
                        label: 'Kills',
                        datasets: [{
                            data: [player.kills, totalKills],
                            backgroundColor: [
                                'rgb(245, 7, 35)',
                                'rgb(255, 255, 255)',
                            ],
                            hoverOffset: 4
                        }],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        const label = context.dataset.label || '';
                                        const value = context.raw;
                                        return `${label}: ${value}`;
                                    }
                                }
                            }
                        },
                        cutout: '70%',
                        elements: {
                            arc: {
                                borderWidth: 0
                            }
                        },
                        maintainAspectRatio: false,
                        responsive: false
                    }
                    
                });

                const chartAssitsContainer = document.createElement("div");
                chartAssitsContainer.classList.add('absolute', 'left-[505px]');
                playerContainer.appendChild(chartAssitsContainer);

                const pokemonDoughnutAssistsCanvas = document.createElement("canvas");
                pokemonDoughnutAssistsCanvas.id = 'graficoAssists'
                pokemonDoughnutAssistsCanvas.width = 72;
                pokemonDoughnutAssistsCanvas.height = 72;
                chartAssitsContainer.appendChild(pokemonDoughnutAssistsCanvas);

                const percentageAssitsLabel = document.createElement("span");
                percentageAssitsLabel.classList.add('absolute', 'text-sm', 'text-white', 'left-[522px]');
                percentageAssitsLabel.innerText = `${assistsPercentage}%`;
                playerContainer.appendChild(percentageAssitsLabel);

                new Chart(pokemonDoughnutAssistsCanvas, {
                    type: 'doughnut',
                    data: {
                        label: 'Assists',
                        datasets: [{
                            data: [player.assists, totalAssists],
                            backgroundColor: [
                                'rgb(240, 232, 19)',
                                'rgb(255, 255, 255)',
                            ],
                            hoverOffset: 4
                        }],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        const label = context.dataset.label || '';
                                        const value = context.raw;
                                        return `${label}: ${value}`;
                                    }
                                }
                            }
                        },
                        cutout: '70%',
                        elements: {
                            arc: {
                                borderWidth: 0
                            }
                        },
                        maintainAspectRatio: false,
                        responsive: false
                    }
                    
                });

                const chartDmgDoneContainer = document.createElement("div");
                chartDmgDoneContainer.classList.add('absolute', 'left-[600px]');
                playerContainer.appendChild(chartDmgDoneContainer);

                const pokemonDoughnutDmgDoneCanvas = document.createElement("canvas");
                pokemonDoughnutDmgDoneCanvas.id = 'graficoDanoCausado'
                pokemonDoughnutDmgDoneCanvas.width = 72;
                pokemonDoughnutDmgDoneCanvas.height = 72;
                chartDmgDoneContainer.appendChild(pokemonDoughnutDmgDoneCanvas);

                const percentageDmgDoneLabel = document.createElement("span");
                percentageDmgDoneLabel.classList.add('absolute', 'text-sm', 'text-white', 'left-[618px]');
                percentageDmgDoneLabel.innerText = `${dmgDonePercentage}%`;
                playerContainer.appendChild(percentageDmgDoneLabel);

                new Chart(pokemonDoughnutDmgDoneCanvas, {
                    type: 'doughnut',
                    data: {
                        label: 'Dano Causado',
                        datasets: [{
                            data: [player.damageDone, totalDmgDone],
                            backgroundColor: [
                                'rgb(245, 17, 146)',
                                'rgb(255, 255, 255)',
                            ],
                            hoverOffset: 4
                        }],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        const label = context.dataset.label || '';
                                        const value = context.raw;
                                        return `${label}: ${value}`;
                                    }
                                }
                            }
                        },
                        cutout: '70%',
                        elements: {
                            arc: {
                                borderWidth: 0
                            }
                        },
                        maintainAspectRatio: false,
                        responsive: false
                    }
                    
                });

                const chartDmgTakenContainer = document.createElement("div");
                chartDmgTakenContainer.classList.add('absolute', 'left-[700px]');
                playerContainer.appendChild(chartDmgTakenContainer);

                const pokemonDoughnutDmgTakenCanvas = document.createElement("canvas");
                pokemonDoughnutDmgTakenCanvas.id = 'graficoDanoRecebido'
                pokemonDoughnutDmgTakenCanvas.width = 72;
                pokemonDoughnutDmgTakenCanvas.height = 72;
                chartDmgTakenContainer.appendChild(pokemonDoughnutDmgTakenCanvas);

                const percentageDmgTakenLabel = document.createElement("span");
                percentageDmgTakenLabel.classList.add('absolute', 'text-sm', 'text-white', 'left-[717px]');
                percentageDmgTakenLabel.innerText = `${dmgTakenPercentage}%`;
                playerContainer.appendChild(percentageDmgTakenLabel);

                new Chart(pokemonDoughnutDmgTakenCanvas, {
                    type: 'doughnut',
                    data: {
                        label: 'Dano Recebido',
                        datasets: [{
                            data: [player.damageTaken, totalDmgTaken],
                            backgroundColor: [
                                'rgb(98, 117, 240)',
                                'rgb(255, 255, 255)',
                            ],
                            hoverOffset: 4
                        }],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        const label = context.dataset.label || '';
                                        const value = context.raw;
                                        return `${label}: ${value}`;
                                    }
                                }
                            }
                        },
                        cutout: '70%',
                        elements: {
                            arc: {
                                borderWidth: 0
                            }
                        },
                        maintainAspectRatio: false,
                        responsive: false
                    }
                    
                });

                const chartDmgHealedContainer = document.createElement("div");
                chartDmgHealedContainer.classList.add('absolute', 'left-[790px]');
                playerContainer.appendChild(chartDmgHealedContainer);

                const pokemonDoughnutDmgHealedCanvas = document.createElement("canvas");
                pokemonDoughnutDmgHealedCanvas.id = 'graficoCura'
                pokemonDoughnutDmgHealedCanvas.width = 72;
                pokemonDoughnutDmgHealedCanvas.height = 72;
                chartDmgHealedContainer.appendChild(pokemonDoughnutDmgHealedCanvas);

                const percentageDmgHealedLabel = document.createElement("span");
                percentageDmgHealedLabel.classList.add('absolute', 'text-sm', 'text-white', 'left-[810px]');
                percentageDmgHealedLabel.innerText = `${dmgHealedPercentage}%`;
                playerContainer.appendChild(percentageDmgHealedLabel);

                new Chart(pokemonDoughnutDmgHealedCanvas, {
                    type: 'doughnut',
                    data: {
                        label: 'Cura',
                        datasets: [{
                            data: [player.damageHealed, totalDmgHealed],
                            backgroundColor: [
                                'rgb(245, 197, 120)',
                                'rgb(255, 255, 255)',
                            ],
                            hoverOffset: 4
                        }],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        const label = context.dataset.label || '';
                                        const value = context.raw;
                                        return `${label}: ${value}`;
                                    }
                                }
                            }
                        },
                        cutout: '70%',
                        elements: {
                            arc: {
                                borderWidth: 0
                            }
                        },
                        maintainAspectRatio: false,
                        responsive: false
                    }
                    
                });
            }
        }); 

        const maxPerformancePoints = Math.max(...playersPerformance.map(p => p.performancePoints));
        const topPerformers = playersPerformance.filter(p => p.performancePoints === maxPerformancePoints);
        let mvp = null;
        if (topPerformers.length === 1) {
            mvp = topPerformers[0];
        } else if (topPerformers.length > 1) {
            mvp = topPerformers.reduce((max, current) => 
                current.scorePercentage > max.scorePercentage ? current : max, topPerformers[0]);
        }
        
        playersPerformance.forEach(playerData => {
            matchWinnerTeam.appendChild(playerData.playerContainer);
        });

        if (mvp && mvp.performanceWithIcon) {
            const mvpIcon = document.createElement("img");
            mvpIcon.src = './images/icons/mvp.png';
            mvpIcon.classList.add('absolute','w-12', 'h-12', 'ml-28');
            mvp.performanceWithIcon.appendChild(mvpIcon);
        }
        if (mvp) {
            matchData.winnerMVP = {
                playerName: mvp.player.playerName,
                pokemon: mvp.player.pokemon,
                performancePoints: mvp.performancePoints
            };
        }
        match.winnerTeam.mvp = mvp ? mvp.player : null;

        if (matchWinnerTeam.children.length > 5 && leftPerformanceContainer.children.length > 5) {
            matchWinnerTeam.removeChild(matchWinnerTeam.lastChild);
            leftPerformanceContainer.removeChild(leftPerformanceContainer.lastChild);
        }
        console.log(playersPerformance);
        matchWinnerTeam.appendChild(leftPerformanceContainer);

        //time derrotado
        const rightAbsoluteContainer = document.createElement("div");
        rightAbsoluteContainer.classList.add('absolute','left-[1150px]','w-[1140px]', 'h-[800px]', 'mt-2');
        centerOuterContainer.appendChild(rightAbsoluteContainer);

        const rightPerformanceContainer = document.createElement("div")
        rightPerformanceContainer.classList.add('absolute', 'flex-col', 'top-[40px]','left-[900px]')
        rightAbsoluteContainer.appendChild(rightPerformanceContainer)

        const rightDetailsPokemonsContent = document.createElement("div");
        rightDetailsPokemonsContent.classList.add('relative', 'flex', 'justify-center');
        rightAbsoluteContainer.appendChild(rightDetailsPokemonsContent);

        const rightImgsPokemonsContent = document.createElement("div");
        rightImgsPokemonsContent.classList.add('absolute', 'left-[1150px]', 'top-[100px]', 'left-[20px]');
        rightDetailsPokemonsContent.appendChild(rightImgsPokemonsContent);

        const defeatTeam = document.createElement("span");
        defeatTeam.classList.add('flex', 'items-center', 'text-2xl', 'text-white', 'mt-4', 'mb-2');
        defeatTeam.innerHTML = `TIME <span class="text-red-500 ml-1">PERDEDOR</span> - Pontuação Total: <span class="text-red-500 ml-1">${match.defeatedTeam.totalScore}</span>`;
        rightDetailsPokemonsContent.appendChild(defeatTeam);

        const tableDetailsRightMatchStatistics = document.createElement("div");
        tableDetailsRightMatchStatistics.classList.add('flex', 'flex-col', 'text-white', 'items-center');
        rightAbsoluteContainer.appendChild(tableDetailsRightMatchStatistics);

        const titleRightSpan = document.createElement("span");
        titleRightSpan.classList.add('flex', 'flex-row', 'items-center', 'text-xl', 'text-white', 'mt-2','ml-48', 'gap-x-12');
        tableDetailsRightMatchStatistics.appendChild(titleRightSpan);

        const scoreRightTitle = document.createElement("span");
        scoreRightTitle.classList.add('flex', 'text-xl', 'text-white');
        scoreRightTitle.innerText = `Pontuação`;
        titleRightSpan.appendChild(scoreRightTitle);

        const killsRightTitle = document.createElement("span");
        killsRightTitle.classList.add('flex', 'text-xl', 'text-white');
        killsRightTitle.innerText = `Abates`;
        titleRightSpan.appendChild(killsRightTitle);

        const assitsRightTitle = document.createElement("span");
        assitsRightTitle.classList.add('flex', 'text-xl', 'text-white');
        assitsRightTitle.innerText = `Assists`;
        titleRightSpan.appendChild(assitsRightTitle);

        const dmgDoneRightTitle = document.createElement("span");
        dmgDoneRightTitle.classList.add('flex', 'text-xl', 'text-white','ml-2');
        dmgDoneRightTitle.innerText = `DC`;
        titleRightSpan.appendChild(dmgDoneRightTitle);

        const dmgTakenRightTitle = document.createElement("span");
        dmgTakenRightTitle.classList.add('flex', 'text-xl', 'text-white','ml-6');
        dmgTakenRightTitle.innerText = `DR`;
        titleRightSpan.appendChild(dmgTakenRightTitle);

        const dmgHealedRightTitle = document.createElement("span");
        dmgHealedRightTitle.classList.add('flex', 'text-xl', 'text-white','ml-2');
        dmgHealedRightTitle.innerText = `Cura`;
        titleRightSpan.appendChild(dmgHealedRightTitle);

        const performanceRightPointsTitle = document.createElement("span");
        performanceRightPointsTitle.classList.add('flex', 'text-xl', 'text-white','ml-2');
        performanceRightPointsTitle.innerText = `PERFORMANCE`;
        titleRightSpan.appendChild(performanceRightPointsTitle);

        const generalDefeatedTeam = document.createElement("div");
        generalDefeatedTeam.classList.add('flex','flex-col', 'justify-center', 'mt-6');
        rightImgsPokemonsContent.appendChild(generalDefeatedTeam);

        const matchDefeatedTeam = document.createElement("div");
        matchDefeatedTeam.classList.add('flex', 'flex-col', 'gap-y-16','justify-start'); 
        generalDefeatedTeam.appendChild(matchDefeatedTeam);

        playersPerformanceDefeated = [];

        Object.values(match.defeatedTeam).forEach((player) => {
            let performancePointsDefeated = 0;
            if (player.playerName && player.pokemon) {
                
                const playerContainerDefeated = document.createElement("div");
                playerContainerDefeated.classList.add('flex', 'flex-row', 'justify-start', 'items-center');

                const matchPokemonImageUsageDefeated = document.createElement("img");
                matchPokemonImageUsageDefeated.src = `./images/sprites/${player.pokemon}.png`;
                matchPokemonImageUsageDefeated.alt = player.pokemon;
                matchPokemonImageUsageDefeated.classList.add('w-16', 'h-16', 'items-center');
                playerContainerDefeated.appendChild(matchPokemonImageUsageDefeated);

                const matchPlayersDefeatedTeam = document.createElement("span");
                matchPlayersDefeatedTeam.classList.add('text-white', 'text-xl','whitespace-nowrap');
                matchPlayersDefeatedTeam.innerText = player.playerName;
                playerContainerDefeated.appendChild(matchPlayersDefeatedTeam);

                //pontuação derrotado
                const chartScoreContainer = document.createElement("div");
                chartScoreContainer.classList.add('absolute', 'flex-col','left-[275px]');
                playerContainerDefeated.appendChild(chartScoreContainer);

                const scorePercentage = match.defeatedTeam.totalScore > 0 ? ((player.playerScore / match.defeatedTeam.totalScore) * 100).toFixed(1) : 0;
                const scoreData = match.defeatedTeam.totalScore > 0 ? [player.playerScore, match.defeatedTeam.totalScore] : [0, 1];
                const totalKills = Object.values(match.defeatedTeam).reduce((sum, player) => sum + (player.kills || 0), 0);
                const killsPercentage = ((player.kills / totalKills) * 100).toFixed(1);
                const totalAssists = Object.values(match.defeatedTeam).reduce((sum, player) => sum + (player.assists || 0), 0);
                const assistsPercentage = ((player.assists / totalAssists) * 100).toFixed(1);
                const totalDmgDone = Object.values(match.defeatedTeam).reduce((sum, player) => sum + (player.damageDone || 0), 0);
                const dmgDonePercentage = ((player.damageDone / totalDmgDone) * 100).toFixed(1);
                const totalDmgTaken = Object.values(match.defeatedTeam).reduce((sum, player) => sum + (player.damageTaken || 0), 0);
                const dmgTakenPercentage = ((player.damageTaken / totalDmgTaken) * 100).toFixed(1);
                const totalDmgHealed = Object.values(match.defeatedTeam).reduce((sum, player) => sum + (player.damageHealed || 0), 0);
                const dmgHealedPercentage = ((player.damageHealed / totalDmgHealed) * 100).toFixed(1);

                if (scorePercentage >= 20) performancePointsDefeated += 20;
                if (killsPercentage >= 20) performancePointsDefeated += 15;
                if (assistsPercentage >= 20) performancePointsDefeated += 20;
                if (dmgDonePercentage >= 20) performancePointsDefeated += 15;
                if (dmgTakenPercentage >= 20) performancePointsDefeated += 15;
                if (dmgHealedPercentage >= 20) performancePointsDefeated += 15;

                const performanceScoreColumnDefeated = document.createElement("div"); 
                performanceScoreColumnDefeated.classList.add('flex', 'flex-col','mb-[75px]');

                const progressBarContainerDefeated = document.createElement("div");
                progressBarContainerDefeated.classList.add('w-full', 'bg-gray-200', 'rounded-full', 'h-4','mb-1');
                progressBarContainerDefeated.style.width = '120px';

                const progressBarDefeated = document.createElement("div");
                progressBarDefeated.classList.add('h-4', 'rounded-full');
                progressBarDefeated.style.width = `${performancePointsDefeated}%`;
                progressBarDefeated.style.backgroundColor = 'rgb(29, 181, 52)';
                progressBarContainerDefeated.appendChild(progressBarDefeated);

                const performanceWithIconDefeated = document.createElement("div");
                performanceWithIconDefeated.classList.add('flex', 'items-center', 'space-x-18', 'mt-2');

                const performanceScoreElementDefeated = document.createElement("span");
                performanceScoreElementDefeated.classList.add('text-xl', 'text-white', 'whitespace-nowrap', 'font-bold');
                performanceScoreElementDefeated.innerText = `${performancePointsDefeated} Pontos`;
                performanceScoreElementDefeated.style.textShadow = '1px 1px 0 black, -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black';
                performanceScoreElementDefeated.style.display = 'block';
                performanceWithIconDefeated.appendChild(performanceScoreElementDefeated);

                const progressBarWithIconContainer = document.createElement("div");
                progressBarWithIconContainer.classList.add('relative','flex', 'items-center', 'space-x-2');
                progressBarWithIconContainer.appendChild(progressBarContainerDefeated);
                
                performanceScoreColumnDefeated.appendChild(progressBarWithIconContainer);
                performanceScoreColumnDefeated.appendChild(performanceWithIconDefeated);

                rightPerformanceContainer.appendChild(performanceScoreColumnDefeated);
                
                playersPerformanceDefeated.push({ player, performancePointsDefeated, scorePercentage, playerContainerDefeated, performanceWithIconDefeated });

                const pokemonDoughnutScoreCanvas = document.createElement("canvas");
                pokemonDoughnutScoreCanvas.id = 'graficoPontuacao'
                pokemonDoughnutScoreCanvas.width = 72;
                pokemonDoughnutScoreCanvas.height = 72;
                chartScoreContainer.appendChild(pokemonDoughnutScoreCanvas);

                const percentageScoreLabel = document.createElement("span");
                percentageScoreLabel.classList.add('absolute', 'text-sm', 'text-white', 'left-[295px]');
                percentageScoreLabel.innerText = `${scorePercentage}%`;
                playerContainerDefeated.appendChild(percentageScoreLabel);

                new Chart(pokemonDoughnutScoreCanvas, {
                    type: 'doughnut',
                    data: {
                        label: 'Pontuação',
                        datasets: [{
                            data: scoreData,
                            backgroundColor: [
                                'rgb(27, 203, 247)',
                                'rgb(255, 255, 255)',
                            ],
                            hoverOffset: 4
                        }],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        const label = context.dataset.label || '';
                                        const value = context.raw;
                                        return `${label}: ${value}`;
                                    }
                                }
                            }
                        },
                        cutout: '70%',
                        elements: {
                            arc: {
                                borderWidth: 0
                            }
                        },
                        maintainAspectRatio: false,
                        responsive: false
                    }   
                });

                const chartKillsContainer = document.createElement("div");
                chartKillsContainer.classList.add('absolute', 'left-[398px]');
                playerContainerDefeated.appendChild(chartKillsContainer);


                const pokemonDoughnutKillsCanvas = document.createElement("canvas");
                pokemonDoughnutKillsCanvas.id = 'graficoKills'
                pokemonDoughnutKillsCanvas.width = 72;
                pokemonDoughnutKillsCanvas.height = 72;
                chartKillsContainer.appendChild(pokemonDoughnutKillsCanvas);

                const percentageKillsLabel = document.createElement("span");
                percentageKillsLabel.classList.add('absolute', 'text-sm', 'text-white', 'left-[415px]');
                percentageKillsLabel.innerText = `${killsPercentage}%`;
                playerContainerDefeated.appendChild(percentageKillsLabel);

                new Chart(pokemonDoughnutKillsCanvas, {
                    type: 'doughnut',
                    data: {
                        label: 'Kills',
                        datasets: [{
                            data: [player.kills, totalKills],
                            backgroundColor: [
                                'rgb(245, 7, 35)',
                                'rgb(255, 255, 255)',
                            ],
                            hoverOffset: 4
                        }],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        const label = context.dataset.label || '';
                                        const value = context.raw;
                                        return `${label}: ${value}`;
                                    }
                                }
                            }
                        },
                        cutout: '70%',
                        elements: {
                            arc: {
                                borderWidth: 0
                            }
                        },
                        maintainAspectRatio: false,
                        responsive: false
                    }
                    
                });

                const chartAssitsContainer = document.createElement("div");
                chartAssitsContainer.classList.add('absolute', 'left-[505px]');
                playerContainerDefeated.appendChild(chartAssitsContainer);

                const pokemonDoughnutAssistsCanvas = document.createElement("canvas");
                pokemonDoughnutAssistsCanvas.id = 'graficoAssists'
                pokemonDoughnutAssistsCanvas.width = 72;
                pokemonDoughnutAssistsCanvas.height = 72;
                chartAssitsContainer.appendChild(pokemonDoughnutAssistsCanvas);

                const percentageAssitsLabel = document.createElement("span");
                percentageAssitsLabel.classList.add('absolute', 'text-sm', 'text-white', 'left-[522px]');
                percentageAssitsLabel.innerText = `${assistsPercentage}%`;
                playerContainerDefeated.appendChild(percentageAssitsLabel);

                new Chart(pokemonDoughnutAssistsCanvas, {
                    type: 'doughnut',
                    data: {
                        label: 'Assists',
                        datasets: [{
                            data: [player.assists, totalAssists],
                            backgroundColor: [
                                'rgb(240, 232, 19)',
                                'rgb(255, 255, 255)',
                            ],
                            hoverOffset: 4
                        }],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        const label = context.dataset.label || '';
                                        const value = context.raw;
                                        return `${label}: ${value}`;
                                    }
                                }
                            }
                        },
                        cutout: '70%',
                        elements: {
                            arc: {
                                borderWidth: 0
                            }
                        },
                        maintainAspectRatio: false,
                        responsive: false
                    }
                    
                });

                const chartDmgDoneContainer = document.createElement("div");
                chartDmgDoneContainer.classList.add('absolute', 'left-[600px]');
                playerContainerDefeated.appendChild(chartDmgDoneContainer);

                const pokemonDoughnutDmgDoneCanvas = document.createElement("canvas");
                pokemonDoughnutDmgDoneCanvas.id = 'graficoDanoCausado'
                pokemonDoughnutDmgDoneCanvas.width = 72;
                pokemonDoughnutDmgDoneCanvas.height = 72;
                chartDmgDoneContainer.appendChild(pokemonDoughnutDmgDoneCanvas);

                const percentageDmgDoneLabel = document.createElement("span");
                percentageDmgDoneLabel.classList.add('absolute', 'text-sm', 'text-white', 'left-[618px]');
                percentageDmgDoneLabel.innerText = `${dmgDonePercentage}%`;
                playerContainerDefeated.appendChild(percentageDmgDoneLabel);

                new Chart(pokemonDoughnutDmgDoneCanvas, {
                    type: 'doughnut',
                    data: {
                        label: 'Dano Causado',
                        datasets: [{
                            data: [player.damageDone, totalDmgDone],
                            backgroundColor: [
                                'rgb(245, 17, 146)',
                                'rgb(255, 255, 255)',
                            ],
                            hoverOffset: 4
                        }],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        const label = context.dataset.label || '';
                                        const value = context.raw;
                                        return `${label}: ${value}`;
                                    }
                                }
                            }
                        },
                        cutout: '70%',
                        elements: {
                            arc: {
                                borderWidth: 0
                            }
                        },
                        maintainAspectRatio: false,
                        responsive: false
                    }
                    
                });

                const chartDmgTakenContainer = document.createElement("div");
                chartDmgTakenContainer.classList.add('absolute', 'left-[700px]');
                playerContainerDefeated.appendChild(chartDmgTakenContainer);

                const pokemonDoughnutDmgTakenCanvas = document.createElement("canvas");
                pokemonDoughnutDmgTakenCanvas.id = 'graficoDanoRecebido'
                pokemonDoughnutDmgTakenCanvas.width = 72;
                pokemonDoughnutDmgTakenCanvas.height = 72;
                chartDmgTakenContainer.appendChild(pokemonDoughnutDmgTakenCanvas);

                const percentageDmgTakenLabel = document.createElement("span");
                percentageDmgTakenLabel.classList.add('absolute', 'text-sm', 'text-white', 'left-[717px]');
                percentageDmgTakenLabel.innerText = `${dmgTakenPercentage}%`;
                playerContainerDefeated.appendChild(percentageDmgTakenLabel);

                new Chart(pokemonDoughnutDmgTakenCanvas, {
                    type: 'doughnut',
                    data: {
                        label: 'Dano Recebido',
                        datasets: [{
                            data: [player.damageTaken, totalDmgTaken],
                            backgroundColor: [
                                'rgb(98, 117, 240)',
                                'rgb(255, 255, 255)',
                            ],
                            hoverOffset: 4
                        }],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        const label = context.dataset.label || '';
                                        const value = context.raw;
                                        return `${label}: ${value}`;
                                    }
                                }
                            }
                        },
                        cutout: '70%',
                        elements: {
                            arc: {
                                borderWidth: 0
                            }
                        },
                        maintainAspectRatio: false,
                        responsive: false
                    }
                    
                });

                const chartDmgHealedContainer = document.createElement("div");
                chartDmgHealedContainer.classList.add('absolute', 'left-[790px]');
                playerContainerDefeated.appendChild(chartDmgHealedContainer);

                const pokemonDoughnutDmgHealedCanvas = document.createElement("canvas");
                pokemonDoughnutDmgHealedCanvas.id = 'graficoCura'
                pokemonDoughnutDmgHealedCanvas.width = 72;
                pokemonDoughnutDmgHealedCanvas.height = 72;
                chartDmgHealedContainer.appendChild(pokemonDoughnutDmgHealedCanvas);

                const percentageDmgHealedLabel = document.createElement("span");
                percentageDmgHealedLabel.classList.add('absolute', 'text-sm', 'text-white', 'left-[810px]');
                percentageDmgHealedLabel.innerText = `${dmgHealedPercentage}%`;
                playerContainerDefeated.appendChild(percentageDmgHealedLabel);

                new Chart(pokemonDoughnutDmgHealedCanvas, {
                    type: 'doughnut',
                    data: {
                        label: 'Cura',
                        datasets: [{
                            data: [player.damageHealed, totalDmgHealed],
                            backgroundColor: [
                                'rgb(245, 197, 120)',
                                'rgb(255, 255, 255)',
                            ],
                            hoverOffset: 4
                        }],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        const label = context.dataset.label || '';
                                        const value = context.raw;
                                        return `${label}: ${value}`;
                                    }
                                }
                            }
                        },
                        cutout: '70%',
                        elements: {
                            arc: {
                                borderWidth: 0
                            }
                        },
                        maintainAspectRatio: false,
                        responsive: false
                    }
                    
                });
                matchDefeatedTeam.appendChild(playerContainerDefeated);
            }
            
        });

        const maxPerformancePointsDefeated = Math.max(...playersPerformanceDefeated.map(p => p.performancePointsDefeated));
        const topPerformersDefeated = playersPerformanceDefeated.filter(p => p.performancePointsDefeated === maxPerformancePointsDefeated);
        let mvpDefeated = null;
        if (topPerformersDefeated.length === 1) {
            mvpDefeated = topPerformersDefeated[0];
        } else if (topPerformersDefeated.length > 1) {
            mvpDefeated = topPerformersDefeated.reduce((max, current) => 
                current.scorePercentage > max.scorePercentage ? current : max, topPerformersDefeated[0]);
        }

        playersPerformanceDefeated.forEach(playerData => {
            matchDefeatedTeam.appendChild(playerData.playerContainerDefeated);
        });
        
        if (mvpDefeated && mvpDefeated.performanceWithIconDefeated) {
            const mvpIcon = document.createElement("img");
            mvpIcon.src = './images/icons/mvp.png';
            mvpIcon.classList.add('absolute','w-12', 'h-12', 'ml-28');
            mvpDefeated.performanceWithIconDefeated.appendChild(mvpIcon);
        }
        if (mvpDefeated) {
            matchData.defeatedMVP = {
                playerName: mvpDefeated.player.playerName,
                pokemon: mvpDefeated.player.pokemon,
                performancePoints: mvpDefeated.performancePointsDefeated
            };
        }

        if (matchDefeatedTeam.children.length > 5 && rightPerformanceContainer.children.length > 5) {
            matchDefeatedTeam.removeChild(matchDefeatedTeam.lastChild);
            rightPerformanceContainer.removeChild(rightPerformanceContainer.lastChild);
        }  
        match.defeatedTeam.mvpDefeated = mvpDefeated ? mvpDefeated.player : null;
        console.log(playersPerformanceDefeated);
        matchDefeatedTeam.appendChild(rightPerformanceContainer);

        matches[selectedMatchIndex].matchData = matchData;
        localStorage.setItem("matchData", JSON.stringify(matches));
        console.log(`Match data for match index ${selectedMatchIndex} saved:`, matchData);

    }
});
