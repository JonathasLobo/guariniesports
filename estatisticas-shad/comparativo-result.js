const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
const pokemonName = urlParams.get('pokemon');
if (id) {
    fetch('./results.json')
    .then((response) => response.json())
    .then((results) => {
        const isPlayerName = id !== 'allyTeam' && id !== 'enemyTeam'
        const getObjectAttribute = () => {
            if (!isPlayerName) {
                return results[id].overall
            } else {
                const {allyTeam} = results
                return allyTeam[id]
            }
        }

        const getTitle = () => {
            if (id === 'enemyTeam') {
                return 'Adversários'
            } else if (id === 'allyTeam') {
                return 'Aliados'
            } else {
                return id
            }
        }

        const getFormattedRate = (damage) => {
            if (damage >= 1000) {
                return `${Math.floor(damage / 1000)}k`
            }
            return damage
        }

        const objAttribute = getObjectAttribute()
        const pokemonInfo = objAttribute[pokemonName]
        const {pickRate, winRate, skills, lanes, battleItems, roles, killsRate, assistsRate, interruptsRate, damageDoneRate, damageTakenRate, damageHealedRate, scoreRate, enemyPokemons} = pokemonInfo

        let allyKeys = Object.keys(enemyPokemons).filter(alliedPokemon => enemyPokemons[alliedPokemon].pickRate >= 3)

        allyKeys = allyKeys.sort((a, b) => {
            if (enemyPokemons[a].winRate !== enemyPokemons[b].winRate) {
                return enemyPokemons[b].winRate - enemyPokemons[a].winRate;
            } else {
                return enemyPokemons[b].pickRate - enemyPokemons[a].pickRate;
            }
        })

        let sortedWinKeys = allyKeys.slice(0, 20)

        const worstWinKeysLength = sortedWinKeys.length > 1 ? Math.floor(sortedWinKeys.length / 2) : 0
        let sortedWorstWinKeys = [];
        if (worstWinKeysLength) {
            const worstWinKeys = allyKeys.slice(Math.max(allyKeys.length - worstWinKeysLength, sortedWinKeys.length))
            sortedWorstWinKeys = worstWinKeys.sort((a, b) => {
                if (enemyPokemons[a].winRate !== enemyPokemons[b].winRate) {
                    return enemyPokemons[a].winRate - enemyPokemons[b].winRate;
                } else {
                    return enemyPokemons[b].pickRate - enemyPokemons[a].pickRate;
                }
            })
        }

        //const finalSortedWinKeys = sortedWinKeys.slice(0, sortedWinKeys.length - worstWinKeysLength)

        const leftContent = document.getElementById("left-content");

        const pokemonLeftImage = document.createElement("img");
        pokemonLeftImage.classList.add('absolute', 'left-[-300px]', 'top-[180px]', 'w-[750px]');
        pokemonLeftImage.classList.add('opacity-30')
        pokemonLeftImage.src = `./images/backgrounds/${pokemonName}-left-bg.png`;
        leftContent.appendChild(pokemonLeftImage);

        const outerContainer = document.createElement("div");
        outerContainer.classList.add('relative', 'flex', 'flex-col', 'items-center', 'justify-center'); 
        leftContent.appendChild(outerContainer);

        const playerNameDiv = document.createElement("div");
        playerNameDiv.classList.add('text-center', 'mb-2', 'text-xl', 'font-bold', 'text-white');
        if (id === 'allyTeam') {
            playerNameDiv.innerText = 'FORCE TEAM';
        } else if (id === 'enemyTeam') {
            playerNameDiv.innerText = 'Adversários';
        } else {
            playerNameDiv.innerText = id.toUpperCase();
        }
        outerContainer.appendChild(playerNameDiv)

        const pokemonImageNameContainer = document.createElement("div");
        pokemonImageNameContainer.classList.add('flex', 'flex-col', 'items-center');
        outerContainer.appendChild(pokemonImageNameContainer);

        const pokemonImageName = document.createElement("img");
        pokemonImageName.src = `./images/sprites/${pokemonName}.png`;
        pokemonImageName.width = 90;
        pokemonImageNameContainer.appendChild(pokemonImageName);

        const titleNamePokemon = document.createElement("div");
        titleNamePokemon.classList.add('text-center', 'mt-2', 'text-white', 'text-2xl', 'font-bold');
        //titleNamePokemon.innerText = pokemonName.toUpperCase();
        pokemonImageNameContainer.appendChild(titleNamePokemon);

        const nameSpan = document.createElement("span");
        nameSpan.classList.add('tracking-widest', 'text-4xl', 'justify-start','font-bold', 'text-white');
        nameSpan.innerText = pokemonName.toUpperCase();
        nameSpan.style.textShadow = '2px 2px 6px rgba(7, 56, 135, 1.5)';
        titleNamePokemon.appendChild(nameSpan)

        const absoluteContainer = document.createElement("div");
        absoluteContainer.classList.add('absolute', 'top-[5px]', 'left-[26px]', 'w-[298px]', 'h-[575px]')
        outerContainer.appendChild(absoluteContainer)

        const innerContainer = document.createElement("div");
        innerContainer.classList.add('flex', 'flex-col', 'h-full', 'justify-between')
        absoluteContainer.appendChild(innerContainer)

        const titleContainer = document.createElement("div");
        titleContainer.classList.add('flex', 'flex-col', 'w-full', 'pt-4', 'items-center')
        innerContainer.appendChild(titleContainer)

        const rightContent = document.getElementById("right-content");

        const rightTrophyOuterContainer = document.createElement("div");
        rightTrophyOuterContainer.classList.add('relative')
        rightContent.appendChild(rightTrophyOuterContainer)

        const rightTrophyInnerContainer = document.createElement("div");
        rightTrophyInnerContainer.classList.add('absolute', 'top-[-26px]', 'left-[4px]')
        rightTrophyOuterContainer.appendChild(rightTrophyInnerContainer)

        const rightPokeballImg = document.createElement("img");
        rightPokeballImg.src = './images/icons/trophyveteran.png';
        rightPokeballImg.width = 80;
        rightTrophyInnerContainer.appendChild(rightPokeballImg);

        const rightTitleContainer = document.createElement("div");
        rightTitleContainer.style.background = 'linear-gradient(45deg, (45deg, rgba(252, 127, 37, 0.85), rgba(112, 67, 209, 0.85)))'
        rightTitleContainer.classList.add('flex', 'items-center', 'gap-x-3', 'border-4', 'ml-9', 'text-white', 'w-fit', 'py-1.5', 'pr-4', 'pl-3', 'rounded-full')
        rightContent.appendChild(rightTitleContainer)

        const rightPlayernameSpan = document.createElement("span");
        rightPlayernameSpan.classList.add('text-3xl', 'font-bold', 'pl-6', 'cursor-pointer')
        rightPlayernameSpan.innerText = `Comparativo`
        rightPlayernameSpan.onclick = () => {
            window.location.href = window.location.pathname.replace('comparativo-result.html', `pokemon-result.html?id=${id}&pokemon=${pokemonName}`);
        }
        rightTitleContainer.appendChild(rightPlayernameSpan)

        const rightOuterContainer = document.createElement("div");
        rightOuterContainer.classList.add('relative')
        rightContent.appendChild(rightOuterContainer)

        const rightAbsoluteContainer = document.createElement("div");
        rightAbsoluteContainer.classList.add('absolute', 'top-[5px]', 'left-[26px]', 'w-[1212px]', 'h-[832px]')
        rightOuterContainer.appendChild(rightAbsoluteContainer)

        const rightBgOuterContainer = document.createElement("div");
        rightBgOuterContainer.classList.add('relative')
        rightAbsoluteContainer.appendChild(rightBgOuterContainer)

        const rightBgInnerContainer = document.createElement("div");
        rightBgInnerContainer.classList.add('absolute', 'top-0', 'right-[40px]')
        rightBgOuterContainer.appendChild(rightBgInnerContainer)

        const pokemonRightImgContainer= document.createElement("div");
        pokemonRightImgContainer.classList.add('flex', 'items-center', 'max-w-[556px]', 'h-[832px]', 'max-h-[832px]');
        rightBgInnerContainer.appendChild(pokemonRightImgContainer);

        /*const pokemonRightImage = document.createElement("img");
        pokemonRightImage.classList.add('opacity-30')
        pokemonRightImage.src = `./images/backgrounds/${pokemonName}-right-bg.png`;
        pokemonRightImgContainer.appendChild(pokemonRightImage);*/

        const tablesContainer = document.createElement("div");
        tablesContainer.classList.add('flex', 'justify-evenly', 'text-white', 'py-9', 'items-start', 'h-full');
        rightAbsoluteContainer.appendChild(tablesContainer);
        
        const infoFirstTable = document.createElement("table");
        infoFirstTable.classList.add('w-[400px]', 'pl-5');
        infoFirstTable.style.borderCollapse = 'separate';
        infoFirstTable.style.borderSpacing = '0 19px';
        tablesContainer.appendChild(infoFirstTable);
        
        const infoFirstTr = document.createElement("tr");
        infoFirstTr.classList.add('text-left', 'text-2xl', 'font-bold');
    
        const infoFirstTh = document.createElement("th");
        infoFirstTh.classList.add('pl-5', 'text-2xl', 'font-bold', 'border-b');
        infoFirstTh.style.borderColor = 'rgb(241 245 249 / 0.3)';
        infoFirstTh.style.width = '50%'; 
        infoFirstTh.innerText = 'DADOS';
        infoFirstTr.appendChild(infoFirstTh);
        
        const ValuesFirstTh = document.createElement("th");
        ValuesFirstTh.classList.add('font-bold', 'border-b', 'text-center');
        ValuesFirstTh.style.borderColor = 'rgb(241 245 249 / 0.3)';
        ValuesFirstTh.innerText = 'VALORES';
        infoFirstTr.appendChild(ValuesFirstTh);
    
        infoFirstTable.appendChild(infoFirstTr);
        
        if (typeof pokemonInfo !== undefined) {
            const dataEntries = [
                { label: 'Pick Rate', value: pickRate },
                { label: 'WinRate', value: `${winRate}%` },
                { label: 'Kills', value: killsRate },
                { label: 'Assists', value: assistsRate },
                { label: 'Interrupts', value: interruptsRate },
                { label: 'Damage Causado', value: getFormattedRate(damageDoneRate) },
                { label: 'Damage Recebido', value: getFormattedRate(damageTakenRate) },
                { label: 'Cura', value: getFormattedRate(damageHealedRate) },
                { label: 'Pontuação', value: scoreRate }
            ];
        
            dataEntries.forEach(entry => {
                const row = document.createElement("tr");
        
                const dataCell = document.createElement("td");
                dataCell.classList.add('text-left', 'pl-5', 'text-xl','font-bold', 'py-4');
                dataCell.innerText = entry.label;
                row.appendChild(dataCell);
        
                const valueCell = document.createElement("td");
                valueCell.classList.add('text-center', 'text-xl', 'py-4');
                valueCell.innerText = entry.value;
                valueCell.style.color = 'rgb(54, 162, 235)'
                row.appendChild(valueCell);
        
                infoFirstTable.appendChild(row);
            });
        } else {
            console.error("pokemonInfo não está definido. Verifique o arquivo pokemon-results.js.");
        }

        const infoGraphsTable = document.createElement("table");
        infoGraphsTable.classList.add('w-[390px]','mt-6', 'items-center');
        infoGraphsTable.style.borderCollapse = 'separate';
        infoGraphsTable.style.borderSpacing = '0 19px';
        tablesContainer.appendChild(infoGraphsTable);
        
        const infoSecondTable = document.createElement("table");
        infoSecondTable.classList.add('w-[400px]', 'pr-6')
        infoSecondTable.style.borderCollapse = 'separate';
        infoSecondTable.style.borderSpacing = '0 19px';
        tablesContainer.appendChild(infoSecondTable)

        const infoSecondTr = document.createElement("tr");
        infoSecondTr.classList.add('text-left', 'text-2xl', 'font-bold');

        const rightSide = document.getElementById("right-side");

        const infoSecondTh = document.createElement("th");
        infoSecondTh.classList.add('pl-5', 'text-2xl', 'font-bold', 'border-b');
        infoSecondTh.style.borderColor = 'rgb(241 245 249 / 0.3)';
        infoSecondTh.innerText = 'DADOS';
        infoSecondTr.appendChild(infoSecondTh);

        const valuesSecondTh = document.createElement("th");
        valuesSecondTh.classList.add('font-bold', 'border-b', 'text-center');
        valuesSecondTh.style.borderColor = 'rgb(241 245 249 / 0.3)';
        valuesSecondTh.innerText = 'VALORES';
        infoSecondTr.appendChild(valuesSecondTh);

        infoSecondTable.appendChild(infoSecondTr);

        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "application/json";
        fileInput.style.display = "none";
        rightSide.appendChild(fileInput);
        
        const importButton = document.createElement("button");
        importButton.id = "importButton";
        importButton.innerText = "Importar Dados";
        importButton.classList.add('text-white', 'bg-blue-500', 'hover:bg-blue-700', 'font-bold', 'py-2', 'px-4', 'rounded', 'ml-4');
        rightSide.appendChild(importButton);
        
        importButton.addEventListener("click", () => {
            fileInput.click();
        });
        
        fileInput.addEventListener("change", (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
        
            reader.onload = (e) => {
                try {
                    const importedData = JSON.parse(e.target.result);
                    const importedPickRate = importedData.pickRate;
        
                    importButton.style.display = "none";

                    // Crie um container apenas para aplicar a escala
                    const canvasPickRateContainer = document.createElement("div");
                    canvasPickRateContainer.classList.add("scale-125"); // Apenas a escala
                    infoGraphsTable.appendChild(canvasPickRateContainer);

                    const canvasPickRate = document.createElement("canvas");
                    canvasPickRate.id = "graficoPickRate"; 
                    canvasPickRateContainer.appendChild(canvasPickRate);

                    const ctxPickRate = document.getElementById("graficoPickRate").getContext("2d");
                    new Chart(ctxPickRate, {
                        type: "doughnut",
                        data: {
                            datasets: [{
                                label: "Pick Rate",
                                data: [pickRate, importedPickRate],
                                backgroundColor: [
                                    'rgb(54, 162, 235)',
                                    'rgb(255, 99, 132)'  
                                ],
                                hoverOffset: 2
                            }]
                        },
                        options: {
                            cutout: '75%',
                            plugins: {
                                title: {
                                    display: true,
                                    color: '#fff',
                                    padding: {
                                        top: 2,
                                        bottom: 2
                                    }
                                },
                                legend: {
                                    display: true,
                                    position: 'top',
                                }
                            },
                            aspectRatio: 5,
                            elements: {
                                arc: {
                                    borderWidth: 1,
                                    borderColor: 'rgb(255, 255, 255)'
                                }
                            }
                        },
                    });
                    const importedWinRate = importedData.winRate;
                    importButton.style.display = "none";

                    const canvasWinRateContainer = document.createElement("div");
                    canvasWinRateContainer.classList.add("scale-125"); // Apenas a escala
                    infoGraphsTable.appendChild(canvasWinRateContainer);

                    const canvasWinRate = document.createElement("canvas");
                    canvasWinRate.id = "graficoWinRate";
                    canvasWinRateContainer.appendChild(canvasWinRate);

                    const ctxWinRate = document.getElementById("graficoWinRate").getContext("2d");
                    new Chart(ctxWinRate, {
                        type: "doughnut",
                        data: {
                            datasets: [{
                                label: "Win Rate",
                                data: [winRate, importedWinRate],
                                backgroundColor: [
                                    'rgb(54, 162, 235)',
                                    'rgb(255, 99, 132)'  
                                ],
                                hoverOffset: 2
                            }]
                        },
                        options: {
                            cutout: '75%',
                            plugins: {
                                title: {
                                    display: true,
                                    color: '#fff',
                                    padding: {
                                        top: 2,
                                        bottom: 2
                                    }
                                },
                                legend: {
                                    display: true,
                                    position: 'top',
                                }
                            },
                            aspectRatio: 5,
                            elements: {
                                arc: {
                                    borderWidth: 1,
                                    borderColor: 'rgb(255, 255, 255)'
                                }
                            }
                        },
                    });
                    const importedKillsRate = importedData.killsRate;
                    importButton.style.display = "none";

                    const canvasKillsRateContainer = document.createElement("div");
                    canvasKillsRateContainer.classList.add("scale-125"); // Apenas a escala
                    infoGraphsTable.appendChild(canvasKillsRateContainer);

                    const canvasKillsRate = document.createElement("canvas");
                    canvasKillsRate.id = "graficoKillsRate";
                    canvasKillsRateContainer.appendChild(canvasKillsRate);

                    const ctxKillsRate = document.getElementById("graficoKillsRate").getContext("2d");
                    new Chart(ctxKillsRate, {
                        type: "doughnut",
                        data: {
                            datasets: [{
                                label: "Kills",
                                data: [killsRate, importedKillsRate],
                                backgroundColor: [
                                    'rgb(54, 162, 235)',
                                    'rgb(255, 99, 132)'  
                                ],
                                hoverOffset: 2
                            }]
                        },
                        options: {
                            cutout: '75%',
                            plugins: {
                                title: {
                                    display: true,
                                    color: '#fff',
                                    padding: {
                                        top: 2,
                                        bottom: 2
                                    }
                                },
                                legend: {
                                    display: true,
                                    position: 'top',
                                }
                            },
                            aspectRatio: 5,
                            elements: {
                                arc: {
                                    borderWidth: 1,
                                    borderColor: 'rgb(255, 255, 255)'
                                }
                            }
                        },
                    });
                    const importedAssistsRate = importedData.assistsRate;
                    importButton.style.display = "none";

                    const canvasAssitsRateContainer = document.createElement("div");
                    canvasAssitsRateContainer.classList.add("scale-125"); // Apenas a escala
                    infoGraphsTable.appendChild(canvasAssitsRateContainer);

                    const canvasAssistsRate = document.createElement("canvas");
                    canvasAssistsRate.id = "graficoAssistsRate";
                    canvasAssitsRateContainer.appendChild(canvasAssistsRate);

                    const ctxAssistsRate = document.getElementById("graficoAssistsRate").getContext("2d");
                    new Chart(ctxAssistsRate, {
                        type: "doughnut",
                        data: {
                            datasets: [{
                                label: "Assistências",
                                data: [assistsRate, importedAssistsRate],
                                backgroundColor: [
                                    'rgb(54, 162, 235)',
                                    'rgb(255, 99, 132)'  
                                ],
                                hoverOffset: 2
                            }]
                        },
                        options: {
                            cutout: '75%',
                            plugins: {
                                title: {
                                    display: true,
                                    color: '#fff',
                                    padding: {
                                        top: 2,
                                        bottom: 2
                                    }
                                },
                                legend: {
                                    display: true,
                                    position: 'top',
                                }
                            },
                            aspectRatio: 5,
                            elements: {
                                arc: {
                                    borderWidth: 1,
                                    borderColor: 'rgb(255, 255, 255)'
                                }
                            }
                        },
                    });
                    const importedInterruptsRate = importedData.interruptsRate;
                    importButton.style.display = "none";

                    const canvasInterruptsRateContainer = document.createElement("div");
                    canvasInterruptsRateContainer.classList.add("scale-125"); // Apenas a escala
                    infoGraphsTable.appendChild(canvasInterruptsRateContainer);

                    const canvasInterruptsRate = document.createElement("canvas");
                    canvasInterruptsRate.id = "graficoInterruptsRate";
                    canvasInterruptsRateContainer.appendChild(canvasInterruptsRate);

                    const ctxInterruptsRate = document.getElementById("graficoInterruptsRate").getContext("2d");
                    new Chart(ctxInterruptsRate, {
                        type: "doughnut",
                        data: {
                            datasets: [{
                                label: "Interrupts",
                                data: [interruptsRate, importedInterruptsRate],
                                backgroundColor: [
                                    'rgb(54, 162, 235)',
                                    'rgb(255, 99, 132)'  
                                ],
                                hoverOffset: 2
                            }]
                        },
                        options: {
                            cutout: '75%',
                            plugins: {
                                title: {
                                    display: true,
                                    color: '#fff',
                                    padding: {
                                        top: 2,
                                        bottom: 2
                                    }
                                },
                                legend: {
                                    display: true,
                                    position: 'top',
                                }
                            },
                            aspectRatio: 5,
                            elements: {
                                arc: {
                                    borderWidth: 1,
                                    borderColor: 'rgb(255, 255, 255)'
                                }
                            }
                        },
                    });
                    const importedDmgDoneRate = importedData.damageDoneRate;
                    importButton.style.display = "none";

                    const canvasDmgDoneRateContainer = document.createElement("div");
                    canvasDmgDoneRateContainer.classList.add("scale-125"); // Apenas a escala
                    infoGraphsTable.appendChild(canvasDmgDoneRateContainer);

                    const canvasDmgDoneRate = document.createElement("canvas");
                    canvasDmgDoneRate.id = "graficoDmgDoneRate";
                    canvasDmgDoneRateContainer.appendChild(canvasDmgDoneRate);

                    const ctxDmgDoneRate = document.getElementById("graficoDmgDoneRate").getContext("2d");
                    new Chart(ctxDmgDoneRate, {
                        type: "doughnut",
                        data: {
                            datasets: [{
                                label: "Dano Causado",
                                data: [damageDoneRate, importedDmgDoneRate],
                                backgroundColor: [
                                    'rgb(54, 162, 235)',
                                    'rgb(255, 99, 132)'  
                                ],
                                hoverOffset: 2
                            }]
                        },
                        options: {
                            cutout: '75%',
                            plugins: {
                                title: {
                                    display: true,
                                    color: '#fff',
                                    padding: {
                                        top: 2,
                                        bottom: 2
                                    }
                                },
                                legend: {
                                    display: true,
                                    position: 'top',
                                }
                            },
                            aspectRatio: 5,
                            elements: {
                                arc: {
                                    borderWidth: 1,
                                    borderColor: 'rgb(255, 255, 255)'
                                }
                            }
                        },
                    });
                    const importedDmgTakenRate = importedData.damageTakenRate;
                    importButton.style.display = "none";

                    const canvasDmgTakenRateContainer = document.createElement("div");
                    canvasDmgTakenRateContainer.classList.add("scale-125"); // Apenas a escala
                    infoGraphsTable.appendChild(canvasDmgTakenRateContainer);

                    const canvasDmgTakenRate = document.createElement("canvas");
                    canvasDmgTakenRate.id = "graficoDmgtakenRate";
                    canvasDmgTakenRateContainer.appendChild(canvasDmgTakenRate);

                    const ctxDmgTakenRate = document.getElementById("graficoDmgtakenRate").getContext("2d");
                    new Chart(ctxDmgTakenRate, {
                        type: "doughnut",
                        data: {
                            datasets: [{
                                label: "Dano Recebido",
                                data: [damageTakenRate, importedDmgTakenRate],
                                backgroundColor: [
                                    'rgb(54, 162, 235)',
                                    'rgb(255, 99, 132)'  
                                ],
                                hoverOffset: 2
                            }]
                        },
                        options: {
                            cutout: '75%',
                            plugins: {
                                title: {
                                    display: true,
                                    color: '#fff',
                                    padding: {
                                        top: 2,
                                        bottom: 2
                                    }
                                },
                                legend: {
                                    display: true,
                                    position: 'top',
                                }
                            },
                            aspectRatio: 5,
                            elements: {
                                arc: {
                                    borderWidth: 1,
                                    borderColor: 'rgb(255, 255, 255)'
                                }
                            }
                        },
                    });
                    const importedDmgHealedRate = importedData.damageHealedRate;
                    importButton.style.display = "none";

                    const canvasDmgHealedRateContainer = document.createElement("div");
                    canvasDmgHealedRateContainer.classList.add("scale-125"); // Apenas a escala
                    infoGraphsTable.appendChild(canvasDmgHealedRateContainer);

                    const canvasDmgHealedRate = document.createElement("canvas");
                    canvasDmgHealedRate.id = "graficoDmgHealedRate";
                    canvasDmgHealedRateContainer.appendChild(canvasDmgHealedRate);

                    const ctxDmgHealedRate = document.getElementById("graficoDmgHealedRate").getContext("2d");
                    new Chart(ctxDmgHealedRate, {
                        type: "doughnut",
                        data: {
                            datasets: [{
                                label: "Cura",
                                data: [damageHealedRate, importedDmgHealedRate],
                                backgroundColor: [
                                    'rgb(54, 162, 235)',
                                    'rgb(255, 99, 132)'  
                                ],
                                hoverOffset: 2
                            }]
                        },
                        options: {
                            cutout: '75%',
                            plugins: {
                                title: {
                                    display: true,
                                    color: '#fff',
                                    padding: {
                                        top: 2,
                                        bottom: 2
                                    }
                                },
                                legend: {
                                    display: true,
                                    position: 'top',
                                }
                            },
                            aspectRatio: 5,
                            elements: {
                                arc: {
                                    borderWidth: 1,
                                    borderColor: 'rgb(255, 255, 255)'
                                }
                            }
                        },
                    });
                    const importedScoreRate = importedData.scoreRate;
                    importButton.style.display = "none";

                    const canvasDmgScoreRateContainer = document.createElement("div");
                    canvasDmgScoreRateContainer.classList.add("scale-125"); // Apenas a escala
                    infoGraphsTable.appendChild(canvasDmgScoreRateContainer);

                    const canvasScoreRate = document.createElement("canvas");
                    canvasScoreRate.id = "graficoScoreRate";
                    canvasDmgScoreRateContainer.appendChild(canvasScoreRate);

                    const ctxDmgScoreRate = document.getElementById("graficoScoreRate").getContext("2d");
                    new Chart(ctxDmgScoreRate, {
                        type: "doughnut",
                        data: {
                            datasets: [{
                                label: "Pontuação",
                                data: [scoreRate, importedScoreRate],
                                backgroundColor: [
                                    'rgb(54, 162, 235)',
                                    'rgb(255, 99, 132)'  
                                ],
                                hoverOffset: 2
                            }]
                        },
                        options: {
                            cutout: '75%',
                            plugins: {
                                title: {
                                    display: true,
                                    color: '#fff',
                                    padding: {
                                        top: 2,
                                        bottom: 2
                                    }
                                },
                                legend: {
                                    display: true,
                                    position: 'top',
                                }
                            },
                            aspectRatio: 5,
                            elements: {
                                arc: {
                                    borderWidth: 1,
                                    borderColor: 'rgb(255, 255, 255)'
                                }
                            }
                        },
                    });

                    const pokemonRightImage = document.createElement("img");
                    pokemonRightImage.classList.add('absolute', 'right-[-300px]', 'top-[180px]', 'w-[750px]');
                    pokemonRightImage.classList.add('opacity-30');
                    pokemonRightImage.src = `./images/backgrounds/${importedData.pokemonName}-left-bg.png`;
                    rightSide.appendChild(pokemonRightImage);
        
                    const rightOuterContainer = document.createElement("div");
                    rightOuterContainer.classList.add('relative', 'flex', 'flex-col', 'items-center', 'justify-center');
                    rightSide.appendChild(rightOuterContainer);
        
                    const playerNameDiv = document.createElement("div");
                    playerNameDiv.classList.add('text-center', 'mb-2', 'text-xl', 'font-bold', 'text-white');
                    playerNameDiv.innerText = importedData.playerName || 'NOME DO JOGADOR';  
                    rightOuterContainer.appendChild(playerNameDiv);
        
                    const pokemonImageNameContainer = document.createElement("div");
                    pokemonImageNameContainer.classList.add('flex', 'flex-col', 'items-center');
                    rightOuterContainer.appendChild(pokemonImageNameContainer);
        
                    const pokemonImageName = document.createElement("img");
                    pokemonImageName.src = `./images/sprites/${importedData.pokemonName}.png`;
                    pokemonImageName.width = 90;
                    pokemonImageNameContainer.appendChild(pokemonImageName);
        
                    const titleNamePokemon = document.createElement("div");
                    titleNamePokemon.classList.add('text-center', 'mt-2', 'text-white', 'text-2xl', 'font-bold');
                    pokemonImageNameContainer.appendChild(titleNamePokemon);
        
                    const nameSpan = document.createElement("span");
                    nameSpan.classList.add('tracking-widest', 'text-4xl', 'justify-start','font-bold', 'text-white');
                    nameSpan.innerText = importedData.pokemonName ? importedData.pokemonName.toUpperCase() : 'NOME DO POKÉMON';
                    nameSpan.style.textShadow = '2px 2px 6px rgba(7, 56, 135, 1.5)';
                    titleNamePokemon.appendChild(nameSpan);
        
                    const importedDataEntries = [
                        { label: 'Pick Rate', value: importedData.pickRate },
                        { label: 'Win Rate', value: `${importedData.winRate}%` },
                        { label: 'Kills', value: importedData.killsRate },
                        { label: 'Assists', value: importedData.assistsRate },
                        { label: 'Interrupts', value: importedData.interruptsRate },
                        { label: 'Dano Causado', value: getFormattedRate(importedData.damageDoneRate) },
                        { label: 'Dano Recebido', value: getFormattedRate(importedData.damageTakenRate) },
                        { label: 'Cura', value: getFormattedRate(importedData.damageHealedRate) },
                        { label: 'Pontuação', value: importedData.scoreRate }
                    ];
        
                    importedDataEntries.forEach(entry => {
                        if (entry.value !== undefined) {
                            const row = document.createElement("tr");
        
                            const dataCell = document.createElement("td");
                            dataCell.classList.add('text-left', 'pl-5', 'text-xl','font-bold', 'py-4');
                            dataCell.innerText = entry.label;
                            row.appendChild(dataCell);
        
                            const valueCell = document.createElement("td");
                            valueCell.classList.add('text-center', 'text-xl', 'py-4');
                            valueCell.innerText = entry.value;
                            valueCell.style.color = 'rgb(255, 99, 132)'
                            row.appendChild(valueCell);
        
                            infoSecondTable.appendChild(row);
                        }
                    });
                } catch (error) {
                    console.error("Erro ao processar o arquivo JSON:", error);
                }
            };
        
            reader.readAsText(file);
        });

        const pokemonRightBg = document.createElement("img");
        pokemonRightBg.width = 1250;
        pokemonRightBg.src = './images/backgrounds/pokemon-right-background.png';
        rightContent.appendChild(pokemonRightBg)
    })
}