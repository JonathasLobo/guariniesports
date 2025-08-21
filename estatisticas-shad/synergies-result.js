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
            if (id === 'allyTeam') {
                return 'Aliados'
            } else if (id === 'enemyTeam') {
                return 'Inimigos'
            } else {
                return id
            }
        }

        const objAttribute = getObjectAttribute()
        const pokemonInfo = objAttribute[pokemonName]
        const {pickRate, winRate, alliedPokemons} = pokemonInfo

        let allyKeys = Object.keys(alliedPokemons).filter(alliedPokemon => alliedPokemons[alliedPokemon].pickRate >= 3)

        allyKeys = allyKeys.sort((a, b) => {
            if (alliedPokemons[a].winRate !== alliedPokemons[b].winRate) {
                return alliedPokemons[b].winRate - alliedPokemons[a].winRate;
            } else {
                return alliedPokemons[b].pickRate - alliedPokemons[a].pickRate;
            }
        })

        let sortedWinKeys = allyKeys.slice(0, 20)

        const worstWinKeysLength = sortedWinKeys.length > 1 ? Math.floor(sortedWinKeys.length / 2) : 0
        let sortedWorstWinKeys = [];
        if (worstWinKeysLength) {
            const worstWinKeys = allyKeys.slice(Math.max(allyKeys.length - worstWinKeysLength, sortedWinKeys.length))
            sortedWorstWinKeys = worstWinKeys.sort((a, b) => {
                if (alliedPokemons[a].winRate !== alliedPokemons[b].winRate) {
                    return alliedPokemons[a].winRate - alliedPokemons[b].winRate;
                } else {
                    return alliedPokemons[b].pickRate - alliedPokemons[a].pickRate;
                }
            })
        }

        const finalSortedWinKeys = sortedWinKeys.slice(0, sortedWinKeys.length - worstWinKeysLength)

        const leftContent = document.getElementById("left-content");

        const outerContainer = document.createElement("div");
        outerContainer.classList.add('relative')
        leftContent.appendChild(outerContainer)

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
        pokemonImageNameContainer.classList.add('flex', 'relative','gap-x-4')
        outerContainer.appendChild(pokemonImageNameContainer)

        const pokemonImageName = document.createElement("img");
        pokemonImageName.src = `./images/sprites/${pokemonName}.png`;
        pokemonImageName.width = 90;
        pokemonImageNameContainer.appendChild(pokemonImageName);

        const titleNamePokemon = document.createElement("div");
        titleNamePokemon.classList.add('flex', 'items-center', 'text-white')
        pokemonImageNameContainer.appendChild(titleNamePokemon)

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

        const pokemonLeftImage = document.createElement("img");
        pokemonLeftImage.classList.add('flex','h-full','w-full');
        pokemonLeftImage.src = `./images/backgrounds/${pokemonName}-left-bg.png`;
        leftContent.appendChild(pokemonLeftImage);

        const overallInfoContainer = document.createElement("div");
        overallInfoContainer.classList.add('flex', 'items-center', 'relative', 'gap-x-12', 'justify-center')
        leftContent.appendChild(overallInfoContainer)

        const overallGamesContainer = document.createElement("div");
        overallGamesContainer.classList.add('flex','flex-col','items-center', 'text-white')
        overallGamesContainer.style.textShadow = '0 0 3px black';
        overallInfoContainer.appendChild(overallGamesContainer)

        const pickRateAmountSpan = document.createElement("span");
        pickRateAmountSpan.classList.add('text-3xl', 'font-bold')
        pickRateAmountSpan.style.color = ('rgb(196, 190, 67)')
        pickRateAmountSpan.innerText = pickRate
        overallGamesContainer.appendChild(pickRateAmountSpan)

        const pickRateLabelSpan = document.createElement("span");
        pickRateLabelSpan.classList.add('text-3xl', 'font-bold')
        pickRateLabelSpan.innerText = 'Games'
        overallGamesContainer.appendChild(pickRateLabelSpan)

        const overallWinRateContainer = document.createElement("div");
        overallWinRateContainer.classList.add('flex', 'flex-col', 'items-center', 'text-white')
        overallWinRateContainer.style.textShadow = '0 0 3px black';
        overallInfoContainer.appendChild(overallWinRateContainer)

        const winRateAmountSpan = document.createElement("span");
        winRateAmountSpan.classList.add('text-3xl', 'font-bold')
        winRateAmountSpan.style.color = ('rgb(103, 138, 184)')
        winRateAmountSpan.innerText = `${winRate}%`
        overallWinRateContainer.appendChild(winRateAmountSpan)

        const winRateLabelSpan = document.createElement("span");
        winRateLabelSpan.classList.add('text-3xl', 'font-bold')
        winRateLabelSpan.innerText = 'Winrate'
        overallWinRateContainer.appendChild(winRateLabelSpan)

        const overallMatchSummary = document.createElement("div");
        overallMatchSummary.classList.add('flex', 'items-center', 'relative', 'gap-x-12', 'justify-center', 'pt-4')
        leftContent.appendChild(overallMatchSummary)

        const matchTypeSummary = pokemonInfo.matchTypes; 
        if (matchTypeSummary) {
            const matchTypeSummaryContainer = document.createElement("div");
            matchTypeSummaryContainer.classList.add('flex', 'flex-row', 'relative', 'gap-x-6', 'justify-center');
            matchTypeSummaryContainer.style.textShadow = '0 0 3px black';
            overallMatchSummary.appendChild(matchTypeSummaryContainer);

            Object.keys(matchTypeSummary).forEach((matchType) => {
                const matchTypeSpan = document.createElement("span");
                matchTypeSpan.classList.add('text-white', 'whitespace-nowrap');
                matchTypeSpan.innerText = `${matchType}: ${matchTypeSummary[matchType]}`;
                matchTypeSummaryContainer.appendChild(matchTypeSpan);
            });
        }

        const rightContent = document.getElementById("right-content");

        const rightPokeballOuterContainer = document.createElement("div");
        rightPokeballOuterContainer.classList.add('relative')
        rightContent.appendChild(rightPokeballOuterContainer)

        const rightPokeballInnerContainer = document.createElement("div");
        rightPokeballInnerContainer.classList.add('absolute', 'top-[-26px]', 'left-[4px]')
        rightPokeballOuterContainer.appendChild(rightPokeballInnerContainer)

        const rightPokeballImg = document.createElement("img");
        rightPokeballImg.src = './images/icons/trophy.png';
        rightPokeballImg.width = 80;
        rightPokeballInnerContainer.appendChild(rightPokeballImg);

        const rightTitleContainer = document.createElement("div");
        rightTitleContainer.style.background = 'linear-gradient(45deg, (45deg, rgba(252, 127, 37, 0.85), rgba(112, 67, 209, 0.85)))'
        rightTitleContainer.classList.add('flex', 'items-center', 'gap-x-3', 'border-4', 'ml-9', 'text-white', 'w-fit', 'py-1.5', 'pr-4', 'pl-3', 'rounded-full')
        rightContent.appendChild(rightTitleContainer)

        const rightPlayernameSpan = document.createElement("span");
        rightPlayernameSpan.classList.add('text-3xl', 'font-bold', 'pl-6', 'cursor-pointer')
        rightPlayernameSpan.innerText = `Sinergias`
        rightPlayernameSpan.onclick = () => {
            window.location.href = window.location.pathname.replace('synergies-result.html', `pokemon-result.html?id=${id}&pokemon=${pokemonName}`);
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
        tablesContainer.classList.add('flex', 'justify-evenly', 'text-white', 'py-9', 'items-start', 'h-full')
        rightAbsoluteContainer.appendChild(tablesContainer)

        const bestWRTable = document.createElement("table");
        bestWRTable.classList.add('w-[500px]')
        bestWRTable.style.borderCollapse = 'separate';
        bestWRTable.style.borderSpacing = '0 19px';
        tablesContainer.appendChild(bestWRTable)

        const bestWRHeader = document.createElement("tr");
        bestWRTable.appendChild(bestWRHeader)

        const bestWRTh = document.createElement("th");
        bestWRTh.classList.add('text-left', 'pl-5', 'text-2xl', 'font-bold', 'border-b')
        bestWRTh.style.borderColor = 'rgb(241 245 249 / 0.3)'
        bestWRTh.innerText = 'MELHORES WINRATES'
        bestWRHeader.appendChild(bestWRTh)

        const bestWRMatchesTh = document.createElement("th");
        bestWRMatchesTh.classList.add('text-left', 'font-bold', 'border-b')
        bestWRMatchesTh.style.borderColor = 'rgb(241 245 249 / 0.3)'
        bestWRMatchesTh.innerText = 'PARTIDAS'
        bestWRHeader.appendChild(bestWRMatchesTh)

        const bestWRWinRateTh = document.createElement("th");
        bestWRWinRateTh.classList.add('text-center', 'font-bold', 'border-b')
        bestWRWinRateTh.style.borderColor = 'rgb(241 245 249 / 0.3)'
        bestWRWinRateTh.innerText = 'WINRATE'
        bestWRHeader.appendChild(bestWRWinRateTh)

        for (const pokemonName of finalSortedWinKeys) {
            const {pickRate, winRate, isUp} = alliedPokemons[pokemonName]
            const role = pokemonRoles[pokemonName]
            const rowTr = document.createElement("tr"); 
            const pickTd = document.createElement("td");
            pickTd.classList.add('rounded-tl-lg')
            pickTd.style.backgroundColor = rolesColor[role]
            rowTr.appendChild(pickTd)
            const pickContainer = document.createElement("div"); 
            pickContainer.classList.add('flex', 'items-center')
            pickTd.appendChild(pickContainer)
            const pickImage = document.createElement("img");
            pickImage.width = 44;
            pickImage.height = 44;
            pickImage.src = `./images/sprites/${pokemonName}.png`;
            pickContainer.appendChild(pickImage);
            const pickSpan = document.createElement("span");
            pickSpan.classList.add('pl-1.5', 'text-white', 'text-xl', 'font-bold');
            pickSpan.innerText = capitalize(pokemonName);
            pickContainer.appendChild(pickSpan);
            const pickRateTd = document.createElement("td");
            pickRateTd.classList.add('text-white', 'text-center')
            pickRateTd.style.backgroundColor = rolesColor[role]
            pickRateTd.innerText = pickRate
            rowTr.appendChild(pickRateTd)
            const winRateTd = document.createElement("td");
            winRateTd.classList.add('text-white', 'rounded-br-lg')
            winRateTd.style.backgroundColor = rolesColor[role]
            rowTr.appendChild(winRateTd)
            const winRateOuterDiv = document.createElement("div");
            winRateOuterDiv.classList.add('flex', 'items-center', 'gap-x-1', 'justify-end')
            winRateTd.appendChild(winRateOuterDiv)
            const winRateInnerDiv = document.createElement("div");
            winRateInnerDiv.classList.add('flex', 'flex-col', 'gap-y-1.5')
            winRateOuterDiv.appendChild(winRateInnerDiv)
            const winRateSpan = document.createElement("span");
            winRateSpan.classList.add('text-white');
            winRateSpan.innerText = `${winRate}%`;
            winRateInnerDiv.appendChild(winRateSpan);

            const arrowImage = document.createElement("img");
            arrowImage.width = 25;
            let arrowImgSrc = 'neutral-arrow'
            if (isUp !== undefined) {
                arrowImgSrc = `${isUp ? 'up-arrow' : 'down-arrow'}.svg`
            } else {
                arrowImgSrc = 'neutral-arrow.png'
            }
            arrowImage.src = `./images/icons/${arrowImgSrc}`;
            winRateOuterDiv.appendChild(arrowImage);
            bestWRTable.appendChild(rowTr);
        }

        const worstWRTable = document.createElement("table");
        worstWRTable.classList.add('w-[500px]')
        worstWRTable.style.borderCollapse = 'separate';
        worstWRTable.style.borderSpacing = '0 19px';
        tablesContainer.appendChild(worstWRTable)

        const worstWRHeader = document.createElement("tr");
        worstWRTable.appendChild(worstWRHeader)

        const worstWRTh = document.createElement("th");
        worstWRTh.classList.add('text-left', 'pl-5', 'text-2xl', 'font-bold', 'border-b')
        worstWRTh.style.borderColor = 'rgb(241 245 249 / 0.3)'
        worstWRTh.innerText = 'PIORES WINRATES'
        worstWRHeader.appendChild(worstWRTh)

        const worstWRMatchesTh = document.createElement("th");
        worstWRMatchesTh.classList.add('text-left', 'font-bold', 'border-b')
        worstWRMatchesTh.style.borderColor = 'rgb(241 245 249 / 0.3)'
        worstWRMatchesTh.innerText = 'PARTIDAS'
        worstWRHeader.appendChild(worstWRMatchesTh)

        const worstWRWinRateTh = document.createElement("th");
        worstWRWinRateTh.classList.add('text-center', 'font-bold', 'border-b')
        worstWRWinRateTh.style.borderColor = 'rgb(241 245 249 / 0.3)'
        worstWRWinRateTh.innerText = 'WINRATE'
        worstWRHeader.appendChild(worstWRWinRateTh)

        for (const pokemonName of sortedWorstWinKeys) {
            const {pickRate, winRate, isUp} = alliedPokemons[pokemonName]
            const role = pokemonRoles[pokemonName]
            const rowTr = document.createElement("tr"); 
            const pickTd = document.createElement("td");
            pickTd.classList.add('rounded-tl-lg')
            pickTd.style.backgroundColor = rolesColor[role]
            rowTr.appendChild(pickTd)
            const pickContainer = document.createElement("div"); 
            pickContainer.classList.add('flex', 'items-center')
            pickTd.appendChild(pickContainer)
            const pickImage = document.createElement("img");
            pickImage.width = 44;
            pickImage.height = 44;
            pickImage.src = `./images/sprites/${pokemonName}.png`;
            pickContainer.appendChild(pickImage);
            const pickSpan = document.createElement("span");
            pickSpan.classList.add('pl-1.5', 'text-white', 'text-xl', 'font-bold');
            pickSpan.innerText = capitalize(pokemonName);
            pickContainer.appendChild(pickSpan);
            const pickRateTd = document.createElement("td");
            pickRateTd.classList.add('text-white', 'text-center')
            pickRateTd.style.backgroundColor = rolesColor[role]
            pickRateTd.innerText = pickRate
            rowTr.appendChild(pickRateTd)
            const winRateTd = document.createElement("td");
            winRateTd.classList.add('text-white', 'rounded-br-lg')
            winRateTd.style.backgroundColor = rolesColor[role]
            rowTr.appendChild(winRateTd)
            const winRateOuterDiv = document.createElement("div");
            winRateOuterDiv.classList.add('flex', 'items-center', 'gap-x-1', 'justify-end')
            winRateTd.appendChild(winRateOuterDiv)
            const winRateInnerDiv = document.createElement("div");
            winRateInnerDiv.classList.add('flex', 'flex-col', 'gap-y-1.5')
            winRateOuterDiv.appendChild(winRateInnerDiv)
            const winRateSpan = document.createElement("span");
            winRateSpan.classList.add('text-white');
            winRateSpan.innerText = `${winRate}%`;
            winRateInnerDiv.appendChild(winRateSpan);

            const arrowImage = document.createElement("img");
            arrowImage.width = 25;
            let arrowImgSrc = 'neutral-arrow'
            if (isUp !== undefined) {
                arrowImgSrc = `${isUp ? 'up-arrow' : 'down-arrow'}.svg`
            } else {
                arrowImgSrc = 'neutral-arrow.png'
            }
            arrowImage.src = `./images/icons/${arrowImgSrc}`;
            winRateOuterDiv.appendChild(arrowImage);
            worstWRTable.appendChild(rowTr);
        }

        const pokemonRightBg = document.createElement("img");
        pokemonRightBg.width = 1250;
        pokemonRightBg.src = './images/backgrounds/pokemon-right-background.png';
        rightContent.appendChild(pokemonRightBg)
    })
}