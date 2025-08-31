const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
const pokemonName = urlParams.get('pokemon');
const sixSkillsPokemons = ['mew', 'scizor'];
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

        const getFormattedRate = (damage) => {
            if (damage >= 1000) {
                return `${Math.floor(damage / 1000)}k`
            }
            return damage
        }
        
        
        const objAttribute = getObjectAttribute()
        const pokemonInfo = objAttribute[pokemonName]
        const {pickRate, winRate, skills, lanes, battleItems, roles, killsRate, assistsRate, interruptsRate, damageDoneRate, damageTakenRate, damageHealedRate, scoreRate} = pokemonInfo

        const mainInfo = document.getElementById("mainInfo")
    
        const pokemonImage = document.createElement("img");
        pokemonImage.classList.add('flex', 'ml-8', 'mt-4', 'w-[150px]', 'h-[150px]', 'cursor-pointer', 'hover:opacity-80', 'transition-opacity');
        pokemonImage.src = `./images/backgrounds/${pokemonName}-left-bg.png`;

        // Tornar a imagem clicável
        pokemonImage.addEventListener('click', () => {
            window.location.href = `show-result.html?id=${id}`;
        });

        mainInfo.appendChild(pokemonImage);

        const pokemonInfoContainer = document.createElement("div")
        pokemonInfoContainer.classList.add('flex', 'flex-col', 'relative','items-center', 'justify-center', 'mb-12')
        mainInfo.appendChild(pokemonInfoContainer)

        const pokemonNameSpan = document.createElement("span")
        pokemonNameSpan.classList.add('text-4xl', 'text-white', 'font-bold', 'items-center')
        pokemonNameSpan.innerText = pokemonName.toUpperCase();
        pokemonInfoContainer.appendChild(pokemonNameSpan)

        let pokemonmainRole = pokemonRoles[pokemonName];
        const pokemonRoleSpan = document.createElement("span")
        pokemonRoleSpan.classList.add('text-white', 'font-bold', 'items-center')
        pokemonRoleSpan.innerText = pokemonmainRole.toUpperCase();
        pokemonInfoContainer.appendChild(pokemonRoleSpan)

        const mainInfoDrop = document.getElementById("mainInfoDrop")

        const pokemonOverallInfoContainer = document.createElement("div")
        pokemonOverallInfoContainer.classList.add('flex', 'justify-start','items-center','pl-16', 'gap-x-4', 'pt-4')
        mainInfoDrop.appendChild(pokemonOverallInfoContainer)

        const pokemonGamesImgTitle = document.createElement("img")
        pokemonGamesImgTitle.classList.add('items-center','justify-center', 'w-8', 'h-8')
        pokemonGamesImgTitle.src = './images/backgrounds/battles.png'
        pokemonGamesImgTitle.title = "Batalhas";
        pokemonOverallInfoContainer.appendChild(pokemonGamesImgTitle)

        const pokemonGamesSpan = document.createElement("span")
        pokemonGamesSpan.classList.add('text-2xl', 'text-white', 'items-center')
        pokemonGamesSpan.innerText = pickRate;
        pokemonOverallInfoContainer.appendChild(pokemonGamesSpan)

        const pokemonWinrateImgTitle = document.createElement("img")
        pokemonWinrateImgTitle.classList.add('items-center','justify-center','w-8', 'h-8', 'ml-12')
        pokemonWinrateImgTitle.src = './images/backgrounds/winrate.png'
        pokemonWinrateImgTitle.title = "Winrate";
        pokemonOverallInfoContainer.appendChild(pokemonWinrateImgTitle)

        const pokemonWinrateSpan = document.createElement("span");
        pokemonWinrateSpan.classList.add('text-2xl', 'text-white', 'items-center');
        pokemonWinrateSpan.innerText = `${winRate.toFixed(2)}%`;
        pokemonOverallInfoContainer.appendChild(pokemonWinrateSpan);

        const pokemonBansImgTitle = document.createElement("img")
        pokemonBansImgTitle.classList.add('items-center','justify-center','w-8', 'h-8', 'ml-12')
        pokemonBansImgTitle.src = './images/backgrounds/ban.png'
        pokemonBansImgTitle.title = "Banimentos";
        pokemonOverallInfoContainer.appendChild(pokemonBansImgTitle)

        let bansCount = 0;

        if (results.bans && pokemonName) {
            const formattedPokemonName = pokemonName.toLowerCase();
            
            // Verifica e soma os bans de ambas as categorias
            if (results.bans.BansWinnerTeam && results.bans.BansWinnerTeam[formattedPokemonName]) {
                bansCount += results.bans.BansWinnerTeam[formattedPokemonName];
            }
            if (results.bans.BansLoserTeam && results.bans.BansLoserTeam[formattedPokemonName]) {
                bansCount += results.bans.BansLoserTeam[formattedPokemonName];
            }
        }

        const pokemonBansSpan = document.createElement("span");
        pokemonBansSpan.classList.add('text-2xl', 'text-white', 'items-center');
        pokemonBansSpan.innerText = bansCount;
        pokemonOverallInfoContainer.appendChild(pokemonBansSpan);

        const overallMatchSummary = document.createElement("div");
        overallMatchSummary.classList.add('flex', 'flex-row', 'justify-center', 'gap-x-4')
        pokemonOverallInfoContainer.appendChild(overallMatchSummary)

        const overallMatchSummaryImg = document.createElement("img")
        overallMatchSummaryImg.classList.add('items-center','justify-center','w-8', 'h-8', 'ml-12')
        overallMatchSummaryImg.src = './images/backgrounds/matchtype.png'
        overallMatchSummaryImg.title = "Tipos das partidas";
        overallMatchSummary.appendChild(overallMatchSummaryImg)

        const matchTypeSummary = pokemonInfo.matchTypes; 
        if (matchTypeSummary) {
            const matchTypeSummaryContainer = document.createElement("div");
            matchTypeSummaryContainer.classList.add('flex', 'flex-row', 'relative', 'gap-x-6', 'justify-center');
            overallMatchSummary.appendChild(matchTypeSummaryContainer);

            Object.keys(matchTypeSummary).forEach((matchType) => {
                const matchTypeSpan = document.createElement("span");
                matchTypeSpan.classList.add('text-xl', 'text-white', 'whitespace-nowrap');
                matchTypeSpan.innerText = `${matchType}: ${matchTypeSummary[matchType]}`;
                matchTypeSummaryContainer.appendChild(matchTypeSpan);
            });
        }

        // Criar container para o dropdown personalizado
        const pokemonDropdownContainer = document.createElement("div");
        pokemonDropdownContainer.classList.add('flex', 'items-center', 'gap-x-2', 'ml-12', 'relative');
        pokemonOverallInfoContainer.appendChild(pokemonDropdownContainer);

        // Botão que ativa o dropdown - agora com largura fixa
        const dropdownButton = document.createElement("button");
        dropdownButton.classList.add('flex', 'items-center', 'justify-between', 'bg-gray-700', 'text-white', 'rounded', 'px-3', 'py-1', 'text-sm', 'hover:bg-gray-600', 'transition', 'duration-200', 'w-48');
        dropdownButton.innerHTML = `
            <span class="truncate">Selecione um Pokémon</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        `;
        pokemonDropdownContainer.appendChild(dropdownButton);

        // Container do dropdown (inicialmente escondido)
        const dropdownMenu = document.createElement("div");
        dropdownMenu.classList.add('absolute', 'top-full', 'left-0', 'mt-1', 'w-64', 'max-h-96', 'overflow-y-auto', 'bg-gray-800', 'rounded-md', 'shadow-lg', 'z-50', 'hidden');
        dropdownMenu.style.zIndex = '1000';

        // Lista de Pokémon
        const pokemonList = document.createElement("div");
        pokemonList.classList.add('py-1');
        dropdownMenu.appendChild(pokemonList);

        // Obter lista de Pokémon em ordem alfabética
        const allPokemonNames = Object.keys(pokemonRoles).sort((a, b) => a.localeCompare(b));

        // Adicionar cada Pokémon como um item na lista
        allPokemonNames.forEach(pokemon => {
            const pokemonItem = document.createElement("div");
            pokemonItem.classList.add('flex', 'items-center', 'px-4', 'py-2', 'hover:bg-gray-700', 'cursor-pointer', 'transition', 'duration-150');
            pokemonItem.dataset.value = pokemon;
            
            pokemonItem.innerHTML = `
                <img src="./images/backgrounds/${pokemon}-left-bg.png" class="w-8 h-8 object-contain mr-3" onerror="this.src='./images/backgrounds/default-left-bg.png'">
                <span class="text-white truncate">${pokemon.charAt(0).toUpperCase() + pokemon.slice(1)}</span>
            `;
            
            pokemonItem.addEventListener('click', () => {
                dropdownButton.innerHTML = `
                    <div class="flex items-center truncate">
                        <img src="./images/backgrounds/${pokemon}-left-bg.png" class="w-5 h-5 object-contain mr-2 flex-shrink-0">
                        <span class="truncate">${pokemon.charAt(0).toUpperCase() + pokemon.slice(1)}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                `;
                dropdownMenu.classList.add('hidden');
                selectedPokemon = pokemon;
            });
            
            pokemonList.appendChild(pokemonItem);
        });

        pokemonDropdownContainer.appendChild(dropdownMenu);

        // Botão OK
        const okButton = document.createElement("button");
        okButton.classList.add('bg-blue-500', 'hover:bg-blue-600', 'text-white', 'font-bold', 'py-1', 'px-3', 'rounded', 'text-sm', 'transition', 'duration-200', 'flex-shrink-0');
        okButton.textContent = "OK";

        // Variável para armazenar o Pokémon selecionado
        let selectedPokemon = '';

        // Adicionar evento de clique ao botão
        okButton.addEventListener("click", () => {
            if (selectedPokemon) {
                window.location.href = `pokemon-result.html?id=${id}&pokemon=${selectedPokemon}`;
            } else {
                alert('Por favor, selecione um Pokémon');
            }
        });

        pokemonDropdownContainer.appendChild(okButton);

        // Mostrar/esconder dropdown
        dropdownButton.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('hidden');
        });

        // Fechar dropdown ao clicar fora
        document.addEventListener('click', () => {
            dropdownMenu.classList.add('hidden');
        });

        const firstMainSquare = document.getElementById("infoFirst");

        // criação da parte dos held itens
        const selectedImages = {};
        let currentCircleIndex = null;

        const circleContainer = document.createElement("div");
        circleContainer.classList.add('flex', 'gap-x-10', 'pt-4');
        firstMainSquare.appendChild(circleContainer);

        // Modal de seleção de imagem
        const modalImages = document.createElement("div");
        modalImages.id = "image-selection-modal";
        modalImages.classList.add("fixed", "inset-0", "z-50", "flex", "justify-center", "items-center", "bg-black", "bg-opacity-70", "hidden");

        const modalContent = document.createElement("div");
        modalContent.classList.add("bg-white", "p-4", "rounded-lg", "w-[800px]");
        modalImages.appendChild(modalContent);

        const modalTitle = document.createElement("h2");
        modalTitle.innerText = "Selecione um item";
        modalTitle.classList.add("text-center", "mb-4", "text-lg", "font-bold");
        modalContent.appendChild(modalTitle);

        const modalImagesContainer = document.createElement("div");
        modalImagesContainer.classList.add("grid", "grid-cols-5", "gap-2");
        modalContent.appendChild(modalImagesContainer);

        const closeModalButton = document.createElement("button");
        closeModalButton.innerText = "Fechar";
        closeModalButton.classList.add("mt-4", "w-full", "bg-red-500", "text-white", "py-2", "rounded-lg");
        modalContent.appendChild(closeModalButton);

        document.body.appendChild(modalImages);

        closeModalButton.addEventListener("click", () => closeImageSelectionModal());

        // Criar os 3 círculos
        for (let i = 1; i <= 3; i++) {
            createCircle(i);
        }

        function createCircle(index) {
            // Container do item (imagem + nome)
            const itemWrapper = document.createElement("div");
            itemWrapper.classList.add("flex", "flex-col", "items-center", "gap-y-1");

            // Círculo do item
            const circle = document.createElement("div");
            circle.classList.add('circle', 'w-[70px]', 'h-[70px]', 'bg-gray-300', 'rounded-full', 'cursor-pointer');
            circle.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.5)';

            itemWrapper.appendChild(circle);
            circleContainer.appendChild(itemWrapper);

            // Nome do item
            const itemLabel = document.createElement("span");
            itemLabel.classList.add("text-white", "text-sm", "font-bold", "text-center", "w-[80px]");
            itemWrapper.appendChild(itemLabel);

            // Salvar referência do label
            circle.dataset.labelRef = index;
            selectedImages[index] = "";

            circle.addEventListener("click", () => openImageSelectionModal(index, circle, itemLabel));

            selectImage(defaultHeldItems[pokemonName][index - 1], circle, true, itemLabel);
        }

        function openImageSelectionModal(index, circle, labelElement) {
            currentCircleIndex = index;
            modalImagesContainer.innerHTML = "";

            const availableImages = Object.keys(gameHeldItens).filter(imageKey =>
                !Object.values(selectedImages).includes(imageKey) || selectedImages[index] === imageKey
            );

            availableImages.forEach(imageKey => {
                const imgElement = document.createElement("img");
                imgElement.src = `./images/held-itens/${imageKey}.png`;
                imgElement.classList.add('w-[100px]', 'h-[100px]', 'object-cover', 'cursor-pointer');
                imgElement.addEventListener("click", () => {
                    const circle = [...circleContainer.querySelectorAll('.circle')].find(c => c.dataset.labelRef == index);
                    const label = circle?.parentElement.querySelector("span");
                    selectImage(imageKey, circle, false, label);
                });
                modalImagesContainer.appendChild(imgElement);
            });

            modalImages.classList.remove("hidden");
        }

        function selectImage(imageKey, circle, skipModal, labelElement) {
            selectedImages[currentCircleIndex] = imageKey;

            circle.style.backgroundImage = `url('./images/held-itens/${imageKey}.png')`;
            circle.style.backgroundSize = 'cover';
            circle.style.backgroundPosition = 'center';

            if (labelElement) {
                labelElement.innerText = gameHeldItens[imageKey] || imageKey;
            }

            closeImageSelectionModal(skipModal);
        }

        function closeImageSelectionModal(skipModal) {
            if (!skipModal) {
                modalImages.classList.add("hidden");
                currentCircleIndex = null;
            }
        }


        const secondMainSquare = document.getElementById("infoSecond");
        const movesetSquareContainer = document.createElement("div");
        movesetSquareContainer.classList.add('relative');
        secondMainSquare.appendChild(movesetSquareContainer);

        const infoTablesContainer = document.createElement("div");
        infoTablesContainer.classList.add('flex', 'justify-evenly', 'font-bold', 'items-start', 'h-full', !sixSkillsPokemons.includes(pokemonName) ? 'pb-[93px]' : 'pb-[30px]');
        movesetSquareContainer.appendChild(infoTablesContainer);

        const movesetTablesContainer = document.createElement("div");
        movesetTablesContainer.classList.add('flex', 'justify-between', 'h-full', 'pt-2');
        infoTablesContainer.appendChild(movesetTablesContainer);

        const sortValues = (obj) => {
            const keys = Object.keys(obj);
            return keys.sort((a, b) => obj[b].pickRate - obj[a].pickRate);
        };

        const pokemonSkillList = pokemonSkills[pokemonName];
        const pokemonSkillKeys = Object.keys(pokemonSkillList);

        let highestTier1Wr = 0;
        let highestTier2Wr = 0;
        let highestTier1Index = -1;
        let highestTier2Index = -1;

        const getTotalUsageTier = (isFirstTier) => {
            const getMinIndex = () => {
                if (!isFirstTier) {
                    if (pokemonName === 'mew') {
                        return 3;
                    }
                    return 2;
                } else {
                    return 0;
                }
            };
            const getMaxIndex = () => {
                if (!isFirstTier) {
                    return pokemonSkillKeys.length;
                } else {
                    if (pokemonName === 'mew') {
                        return 3;
                    }
                    return 2;
                }
            };
            const minIndex = getMinIndex();
            const maxIndex = getMaxIndex();
            let sum = 0;
            for (let i = minIndex; i < maxIndex; i++) {
                const skillObj = skills[pokemonSkillKeys[i]] || {};
                const skillPickRate = skillObj.pickRate || 0;
                const skillWins = skillObj.wins || 0;
                const skillWr = skillPickRate ? Number(((100 * skillWins) / skillPickRate).toFixed(2)) : 0;
                const tierLabel = isFirstTier ? 'firstTier' : 'secondTier';
                totalUsageObj[tierLabel] = totalUsageObj[tierLabel] || {};
                sum += skillPickRate;
                if (skillPickRate >= 5) {
                    totalUsageObj[tierLabel][i] = skillPickRate;
                    if (isFirstTier) {
                        if (skillWr > highestTier1Wr) {
                            highestTier1Wr = skillWr;
                            highestTier1Index = i;
                        }
                    } else {
                        if (skillWr > highestTier2Wr) {
                            highestTier2Wr = skillWr;
                            highestTier2Index = i;
                        }
                    }
                }
            }
            return sum;
        };

        const isTier1 = (index) => {
            if (pokemonName === 'mew') {
                return index >= 0 && index <= 2;
            }
            return index >= 0 && index <= 1;
        };

        const totalUsageObj = {}
        const totalUsageTier1 = getTotalUsageTier(true, totalUsageObj)
        const totalUsageTier2 = getTotalUsageTier(false, totalUsageObj)

        const skillsRowContainer = document.createElement("div");
        skillsRowContainer.classList.add('flex', 'gap-x-6');
        movesetTablesContainer.appendChild(skillsRowContainer);

        for (let i = 0; i < pokemonSkillKeys.length; i++) {
            const isSkilTier1 = isTier1(i);
            const totalUsage = isSkilTier1 ? totalUsageTier1 : totalUsageTier2;
            const pokemonSkill = pokemonSkillKeys[i];
            const skillObj = skills[pokemonSkill] || {};
            const highestForTier = isSkilTier1 ? highestTier1Index : highestTier2Index;
            const tierLabel = isSkilTier1 ? 'firstTier' : 'secondTier';
    
            const skillPickRate = skillObj.pickRate || 0;
            const skillWinRate = skillPickRate ? Number((100 * (skillObj.wins || 0)) / skillPickRate).toFixed(2) : 0;
            const pickPercentage = skillPickRate ? Number((100 * skillPickRate) / totalUsage).toFixed(2) : 0;

            const skillBox = document.createElement("div");
            skillBox.classList.add("flex", "flex-col", "items-center", "text-center", "w-[100px]");

            const skillImage = document.createElement("img");
            skillImage.src = `./images/skills/${pokemonName}_${pokemonSkill}.png`;
            skillImage.width = 70;
            skillImage.height = 70;

            const skillName = document.createElement("span");
            skillName.classList.add("text-sm", "font-bold", "text-white", "pt-1", "whitespace-nowrap");
            skillName.innerText = pokemonSkillList[pokemonSkill];

            const skillStats = document.createElement("span");
            skillStats.classList.add("text-sm", "text-white");
            skillStats.innerHTML = `${pickPercentage}%<br>(${skillWinRate}%)`;

            if (i === highestForTier && totalUsageObj[tierLabel][i]) {
                skillStats.style.color = '#fffb00';
            }

            skillBox.appendChild(skillImage);
            skillBox.appendChild(skillName);
            skillBox.appendChild(skillStats);

            skillsRowContainer.appendChild(skillBox);
        }

        //aqui começa os matchups
        function loadWinRatePreviews() {
            fetch('./results.json')
                .then((response) => response.json())
                .then((results) => {
                    const isPlayerName = id !== 'allyTeam' && id !== 'enemyTeam';
                    const objAttribute = isPlayerName
                        ? results.allyTeam[id]
                        : results[id].overall;

                    const pokemonInfo = objAttribute[pokemonName];
                    const { enemyPokemons } = pokemonInfo;

                    const infoThird = document.getElementById("infoThird");

                    // Remove se já existir
                    let countersWrapper = document.getElementById("countersWrapper");
                    if (countersWrapper) countersWrapper.remove();

                    let labelWrapper = document.getElementById("labelWrapper");
                    if (labelWrapper) labelWrapper.remove();

                    // Cria bloco dos counters lado a lado
                    countersWrapper = document.createElement("div");
                    countersWrapper.id = "countersWrapper";
                    countersWrapper.classList.add("flex", "justify-center", "gap-x-24", "pt-2");
                    infoThird.appendChild(countersWrapper);

                    const infoWorst = document.createElement("div");
                    infoWorst.classList.add("flex");
                    const infoBest = document.createElement("div");
                    infoBest.id = "infoBest";
                    infoBest.classList.add("flex");

                    countersWrapper.appendChild(infoWorst);
                    countersWrapper.appendChild(infoBest);

                    // === Piores matchups ===
                    const filteredEnemiesWorst = Object.keys(enemyPokemons)
                        .filter((enemy) => enemyPokemons[enemy].pickRate >= 3)
                        .sort((a, b) => enemyPokemons[a].winRate - enemyPokemons[b].winRate)
                        .slice(0, 5);

                    filteredEnemiesWorst.forEach((enemy) => {
                        const { winRate } = enemyPokemons[enemy];

                        const enemyBox = document.createElement("div");
                        enemyBox.classList.add("flex", "flex-col", "items-center", "w-[80px]", "transition-all", "duration-200");

                        const pokemonImg = document.createElement("img");
                        pokemonImg.src = `./images/backgrounds/${enemy}-left-bg.png`;
                        pokemonImg.classList.add("w-70", "h-70", "hover:scale-110", "transition-transform", "duration-200", "cursor-pointer");
                        pokemonImg.title = enemy; // Adiciona tooltip com o nome do Pokémon

                        const winRateSpan = document.createElement("span");
                        winRateSpan.classList.add("text-sm", "font-bold", "text-green-500", "pt-1");
                        winRateSpan.innerText = `${winRate}%`;

                        enemyBox.appendChild(pokemonImg);
                        enemyBox.appendChild(winRateSpan);
                        infoWorst.appendChild(enemyBox);
                    });

                    // === Melhores matchups ===
                    const filteredEnemiesBest = Object.keys(enemyPokemons)
                        .filter((enemy) => enemyPokemons[enemy].pickRate >= 3)
                        .sort((a, b) => enemyPokemons[b].winRate - enemyPokemons[a].winRate)
                        .slice(0, 5);

                    filteredEnemiesBest.forEach((enemy) => {
                        const { winRate } = enemyPokemons[enemy];

                        const enemyBox = document.createElement("div");
                        enemyBox.classList.add("flex", "flex-col", "items-center", "w-[80px]", "transition-all", "duration-200");

                        const pokemonImg = document.createElement("img");
                        pokemonImg.src = `./images/backgrounds/${enemy}-left-bg.png`;
                        pokemonImg.classList.add("w-70", "h-70", "hover:scale-110", "transition-transform", "duration-200", "cursor-pointer");
                        pokemonImg.title = enemy; // Adiciona tooltip com o nome do Pokémon

                        const winRateSpan = document.createElement("span");
                        winRateSpan.classList.add("text-sm", "font-bold", "text-red-500", "pt-1");
                        winRateSpan.innerText = `${winRate}%`;

                        enemyBox.appendChild(pokemonImg);
                        enemyBox.appendChild(winRateSpan);
                        infoBest.appendChild(enemyBox);
                    });

                    // === Linha "Melhor contra" - [Pokémon] - "Pior contra" ===
                    labelWrapper = document.createElement("div");
                    labelWrapper.id = "labelWrapper";
                    labelWrapper.classList.add("flex", "justify-between", "items-center", "px-4", "pt-4");

                    const leftLabel = document.createElement("span");
                    leftLabel.classList.add("text-xl", "text-white", "mr-6");
                    leftLabel.innerText = "Melhor contra";

                    // Linha divisória 1
                    const divider1 = document.createElement("div");
                    divider1.classList.add("flex-1", "h-px", "bg-gray-400", "bg-opacity-30", "mx-2");

                    const centerImage = document.createElement("img");
                    centerImage.src = `./images/backgrounds/${pokemonName}-left-bg.png`;
                    centerImage.classList.add("w-16", "h-16", "hover:scale-125", "transition-transform", "duration-200", "cursor-pointer");
                    centerImage.title = pokemonName; // Adiciona tooltip com o nome do Pokémon

                    // Linha divisória 2
                    const divider2 = document.createElement("div");
                    divider2.classList.add("flex-1", "h-px", "bg-gray-400", "bg-opacity-30", "mx-2");

                    const rightLabel = document.createElement("span");
                    rightLabel.classList.add("text-xl", "text-white", "ml-12");
                    rightLabel.innerText = "Pior contra";

                    labelWrapper.appendChild(leftLabel);
                    labelWrapper.appendChild(divider1); // Adiciona a primeira linha
                    labelWrapper.appendChild(centerImage);
                    labelWrapper.appendChild(divider2); // Adiciona a segunda linha
                    labelWrapper.appendChild(rightLabel);

                    infoThird.appendChild(labelWrapper);
                })
                .catch((error) => console.error("Erro ao carregar dados de WinRate:", error));
        }
        loadWinRatePreviews();

        let battleItemsTotalSum = 0;
        for (const battleItem of Object.keys(battleItems)) {
            battleItemsTotalSum += battleItems[battleItem].pickRate;
        }

        const sortedBattleItems = sortValues(battleItems);
        const slicedBattleItems = sortedBattleItems.slice(0, 3);

        let highestBattleItemsWr = 0;
        let highestBattleItemsIndex = -1;

        for (let i = 0; i < slicedBattleItems.length; i++) {
            const slicedBattleItem = slicedBattleItems[i];
            const currObj = battleItems[slicedBattleItem];
            const biWins = currObj.wins;
            const biPickRate = currObj.pickRate;
            const biWr = biPickRate ? Number(((100 * (biWins || 0)) / biPickRate).toFixed(2)) : 0;

            if (biWr > highestBattleItemsWr && biPickRate >= 5) {
                highestBattleItemsWr = biWr;
                highestBattleItemsIndex = i;
            }
        }

        // Pega o container correto
        const infoFourth = document.getElementById("infoFourth");

        // Limpa se já existir algo
        infoFourth.innerHTML = "";

        // Cria o container dos itens lado a lado
        const battleItemsContainer = document.createElement("div");
        battleItemsContainer.classList.add("flex", "gap-x-6", "justify-center", "pt-4");
        infoFourth.appendChild(battleItemsContainer);

        for (let i = 0; i < slicedBattleItems.length; i++) {
            const battleItem = slicedBattleItems[i];
            const itemData = battleItems[battleItem];
            const pickRate = itemData.pickRate || 0;
            const winRate = pickRate ? Number((100 * (itemData.wins || 0)) / pickRate).toFixed(2) : 0;
            const pickPercentage = pickRate ? Number((100 * pickRate) / battleItemsTotalSum).toFixed(2) : 0;

            const isHighlight = i === highestBattleItemsIndex;

            const itemBox = document.createElement("div");
            itemBox.classList.add("flex", "flex-col", "items-center", "text-center", "w-[100px]");

            const itemImage = document.createElement("img");
            itemImage.src = `./images/battle-items/${battleItem}.png`;
            itemImage.width = 70;
            itemImage.height = 70;

            const itemName = document.createElement("span");
            itemName.classList.add("text-sm", "font-bold", "pt-1", "text-white", "whitespace-nowrap");
            itemName.innerText = gameBattleItems[battleItem];

            const itemStats = document.createElement("span");
            itemStats.classList.add("text-sm", "text-white", "font-bold");
            itemStats.innerHTML = `${pickPercentage}%<br>(${winRate}%)`;

            if (isHighlight) {
                itemStats.style.color = "#fffb00";
            }

            itemBox.appendChild(itemImage);
            itemBox.appendChild(itemName);
            itemBox.appendChild(itemStats);

            battleItemsContainer.appendChild(itemBox);
        }

        const fiftyMainSquare = document.getElementById("infoFifty");

        // Container de estatísticas principais
        const kaiWrapper = document.createElement("div");
        kaiWrapper.classList.add("flex", "flex-wrap", "gap-x-2", "gap-y-6", "justify-center", "pt-4");
        fiftyMainSquare.appendChild(kaiWrapper);

        // Container dos botões
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("flex", "justify-center", "gap-x-4", "pt-8");
        fiftyMainSquare.appendChild(buttonContainer);

        // Botões
        const exportButton = document.createElement("button");
        exportButton.textContent = "Exportar Dados";
        exportButton.className = "bg-gray-400 text-black font-bold py-1 px-3 rounded hover:bg-blue-700 hover:text-white transition duration-300";
        buttonContainer.appendChild(exportButton);

        const importButton = document.createElement("button");
        importButton.textContent = "Importar Dados";
        importButton.className = "bg-gray-400 text-black font-bold py-1 px-3 rounded hover:bg-blue-700 hover:text-white transition duration-300";
        buttonContainer.appendChild(importButton);

        // Input oculto para importação
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "application/json";
        fileInput.style.display = "none";
        document.body.appendChild(fileInput);

        // Container de nome e imagem importados
        const importedContainer = document.createElement("div");
        importedContainer.classList.add("flex", "flex-col", "items-center", "mt-2");
        fiftyMainSquare.appendChild(importedContainer);

        // Dados base
        const dataEntries = [
            { key: 'killsRate', valueNumber: killsRate, valueText: killsRate, imgSrc: './images/medals/kills.png', label: 'Kills', rateRef: pokemonKillsRate },
            { key: 'assistsRate', valueNumber: assistsRate, valueText: assistsRate, imgSrc: './images/medals/assists.png', label: 'Assists', rateRef: pokemonAssistRate },
            { key: 'interruptsRate', valueNumber: interruptsRate, valueText: interruptsRate, imgSrc: './images/medals/interrupts.png', label: 'Interrupts', rateRefCustom: { inferior: { min: 0, max: 0.2 }, media: { min: 0.3, max: 0.9 }, acima: { min: 1, max: Infinity } } },
            { key: 'damageDoneRate', valueNumber: damageDoneRate, valueText: getFormattedRate(damageDoneRate), imgSrc: './images/medals/damageDone.png', label: 'Dano Causado', rateRef: pokemonDamageDoneRate },
            { key: 'damageTakenRate', valueNumber: damageTakenRate, valueText: getFormattedRate(damageTakenRate), imgSrc: './images/medals/damageTaken.png', label: 'Dano Recebido', rateRef: pokemonDamageTakenRate },
            { key: 'damageHealedRate', valueNumber: damageHealedRate, valueText: getFormattedRate(damageHealedRate), imgSrc: './images/medals/damageHealed.png', label: 'Cura', rateRef: pokemonDamageHealedRate },
            { key: 'scoreRate', valueNumber: scoreRate, valueText: scoreRate, imgSrc: './images/medals/score.png', label: 'Pontuação', rateRefCustom: { inferior: { min: 0, max: 50 }, media: { min: 50.1, max: 100 }, acima: { min: 100.1, max: Infinity } } }
        ];

        // Armazenamento dos elementos base
        const baseRows = {};

        dataEntries.forEach((entry) => {
            const statBox = document.createElement("div");
            statBox.classList.add("flex", "flex-col", "items-center", "w-[100px]", "text-center");
            statBox.dataset.key = entry.key;

            const img = document.createElement("img");
            img.src = entry.imgSrc;
            img.width = 48;
            statBox.appendChild(img);

            const label = document.createElement("span");
            label.classList.add("text-sm", "font-bold", "text-white", "pt-1", "whitespace-nowrap");
            label.innerText = entry.label;
            statBox.appendChild(label);

            const baseValue = document.createElement("span");
            baseValue.classList.add("font-bold");

            const rateLimits = entry.rateRefCustom || entry.rateRef[pokemonName];
            if (entry.valueNumber >= rateLimits.inferior.min && entry.valueNumber <= rateLimits.inferior.max) {
                baseValue.style.color = 'rgb(255, 55, 0)';
            } else if (entry.valueNumber >= rateLimits.media.min && entry.valueNumber <= rateLimits.media.max) {
                baseValue.style.color = 'rgb(255, 251, 0)';
            } else if (entry.valueNumber >= rateLimits.acima.min) {
                baseValue.style.color = 'rgb(0, 255, 30)';
            }

            baseValue.innerText = entry.valueText;
            statBox.appendChild(baseValue);

            kaiWrapper.appendChild(statBox);
            baseRows[entry.key] = statBox;
        });

        // Armazena a linha importada para futura substituição
        let currentImportedSpans = [];

        // Exportação
        exportButton.addEventListener("click", () => {
            const formattedSkills = pokemonSkillKeys.map((pokemonSkill) => {
                const skillObj = skills[pokemonSkill] || {};
                const skillName = pokemonSkillList[pokemonSkill];
                return {
                    skillName: skillName || pokemonSkill,
                    pickRate: skillObj.pickRate || 0,
                    winRate: skillObj.pickRate ? Number((100 * (skillObj.wins || 0)) / skillObj.pickRate).toFixed(2) : 0
                };
            });

            const dataToExport = {
                playerName: id === 'allyTeam' || id === 'enemyTeam' ? 'FORCE TEAM' : id.toUpperCase(),
                pokemonName,
                pickRate: pokemonInfo.pickRate,
                winRate: pokemonInfo.winRate,
                skills: formattedSkills,
                lanes: pokemonInfo.lanes,
                battleItems: pokemonInfo.battleItems,
                roles: pokemonInfo.roles,
                killsRate: pokemonInfo.killsRate,
                assistsRate: pokemonInfo.assistsRate,
                interruptsRate: pokemonInfo.interruptsRate,
                damageDoneRate: pokemonInfo.damageDoneRate,
                damageTakenRate: pokemonInfo.damageTakenRate,
                damageHealedRate: pokemonInfo.damageHealedRate,
                scoreRate: pokemonInfo.scoreRate,
            };

            const jsonData = JSON.stringify(dataToExport, null, 2);
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${id}_dados_${pokemonName}.json`;
            a.click();
            URL.revokeObjectURL(url);
        });

        // Importação
        importButton.addEventListener("click", () => fileInput.click());

        fileInput.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedData = JSON.parse(e.target.result);

                    // Remove os dados anteriores importados
                    currentImportedSpans.forEach(span => span.remove());
                    currentImportedSpans = [];

                    // Adiciona novos valores importados
                    dataEntries.forEach(entry => {
                        if (importedData[entry.key] !== undefined) {
                            const importedValue = importedData[entry.key];

                            const importedSpan = document.createElement("span");
                            importedSpan.classList.add("pt-1", "font-bold");

                            const limits = entry.rateRefCustom || entry.rateRef[importedData.pokemonName];
                            if (importedValue >= limits.inferior.min && importedValue <= limits.inferior.max) {
                                importedSpan.style.color = 'rgb(255, 55, 0)';
                            } else if (importedValue >= limits.media.min && importedValue <= limits.media.max) {
                                importedSpan.style.color = 'rgb(255, 251, 0)';
                            } else if (importedValue >= limits.acima.min) {
                                importedSpan.style.color = 'rgb(0, 255, 30)';
                            }

                            importedSpan.innerText = ['damageDoneRate', 'damageTakenRate', 'damageHealedRate'].includes(entry.key)
                                ? getFormattedRate(importedValue)
                                : importedValue;

                            const statTarget = kaiWrapper.querySelector(`div[data-key="${entry.key}"]`);
                            if (statTarget) {
                                statTarget.appendChild(importedSpan);
                                currentImportedSpans.push(importedSpan);
                            }
                        }
                    });

                    // Atualiza imagem e nome
                    importedContainer.innerHTML = '';
                    const infoRow = document.createElement("div");
                    infoRow.classList.add("flex", "items-center", "gap-x-3", "mt-2");

                    const importedImage = document.createElement("img");
                    importedImage.src = `./images/sprites/${importedData.pokemonName}.png`;
                    importedImage.classList.add("w-[48px]");

                    const importedLabel = document.createElement("span");
                    importedLabel.classList.add("text-sm", "font-bold", "text-white");
                    importedLabel.innerText = importedData.playerName;

                    infoRow.appendChild(importedImage);
                    infoRow.appendChild(importedLabel);
                    importedContainer.appendChild(infoRow);

                } catch (error) {
                    console.error("Erro ao importar arquivo JSON:", error);
                }
            };
            reader.readAsText(file);
        });

        const sixthMainSquare = document.getElementById("infoSixty");

        const chartContainer = document.createElement("div");
        chartContainer.classList.add("flex", "justify-start", "items-center", "h-full", "pt-12", "pl-4");
        sixthMainSquare.appendChild(chartContainer);

        const pokemonRadarCanvas = document.createElement("canvas");
        pokemonRadarCanvas.id = "pokemonRadarChart";
        pokemonRadarCanvas.width = 420;
        pokemonRadarCanvas.height = 420;
        pokemonRadarCanvas.style.marginLeft = "-20px"; // Ajuste fino de posição
        chartContainer.appendChild(pokemonRadarCanvas);
        const maxValues = {
            damageDoneRate: 120000,    
            damageHealedRate: 120000,   
            assistsRate: 15,          
            damageTakenRate: 120000,    
            scoreRate: 150,            
            killsRate: 15              
        };
        const realData = [
            damageDoneRate || 0,    
            damageHealedRate || 0,   
            assistsRate || 0,        
            damageTakenRate || 0,    
            scoreRate || 0,          
            killsRate || 0       
        ];
        const percentageData = realData.map((value, index) => {
            const maxValue = Object.values(maxValues)[index];
            return (value / maxValue) * 100 || 0;
        });

        // Criar labels com as porcentagens
        const labelsWithPercentages = [
            `Dano Causado (${percentageData[0].toFixed(1)}%)`,
            `Cura (${percentageData[1].toFixed(1)}%)`,
            `Assists (${percentageData[2].toFixed(1)}%)`,
            `Dano Recebido (${percentageData[3].toFixed(1)}%)`,
            `Pontos (${percentageData[4].toFixed(1)}%)`,
            `Kills (${percentageData[5].toFixed(1)}%)`
        ];

        const pokemonRadarChart = new Chart(pokemonRadarCanvas, {
            type: 'radar',
            data: {
                labels: labelsWithPercentages, // Labels com % que você quer mostrar
                datasets: [{
                    // Usamos dados normalizados (não permitimos > 100% visualmente)
                    data: percentageData.map(p => Math.min(p, 100)),
                    fill: true,
                    backgroundColor: 'rgba(103, 138, 184, 0.8)',
                    borderColor: 'rgb(103, 138, 184)',
                    pointBackgroundColor: 'rgb(103, 138, 184)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 255, 255)',
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const index = context.dataIndex;
                                // Mostra o valor real, mesmo que >100%
                                return `${percentageData[index].toFixed(1)}% (${realData[index]})`;
                            }
                        }
                    }
                },
                scales: {
                    r: {
                        min: 0,
                        max: 100,
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.8)'
                        },
                        grid: {
                            color: 'rgb(255, 255, 255)'
                        },
                        ticks: {
                            display: false,
                            stepSize: 50
                        },
                        pointLabels: {
                            color: 'rgba(255, 255, 255)',
                            font: {
                                size: 14    
                            }
                        }
                    }
                },
                elements: {
                    line: {
                        tension: 0.1
                    }
                }
            }
        });

        //aqui começa o codigo sobre os melhores 5 players por pokemon
       if (id === 'allyTeam') {
        const players = results.allyTeam;
        let playerUsageCount = {};
        let playerWinRateCount = {};

        for (const playerId in players) {
            const player = players[playerId];
            if (player[pokemonName] && playerId !== 'overall') {
                const pokemonUsage = player[pokemonName].pickRate || 0;
                const pokemonWinRate = player[pokemonName].winRate || 0;
                playerUsageCount[playerId] = pokemonUsage;
                playerWinRateCount[playerId] = pokemonWinRate;
            }
        }

        const sortedPlayers = Object.entries(playerUsageCount).sort((a, b) => b[1] - a[1]);
        const topFivePlayers = sortedPlayers.slice(0, 5);

        const seventhMainSquare = document.getElementById("infoSeventh");
        seventhMainSquare.innerHTML = "";

        const usageSquareContainer = document.createElement("div");
        usageSquareContainer.classList.add('relative');
        seventhMainSquare.appendChild(usageSquareContainer);

        const usageBody = document.createElement("div");
        usageBody.classList.add('flex', 'justify-center', 'items-start', 'gap-x-6', 'pt-6');
        usageSquareContainer.appendChild(usageBody);

        topFivePlayers.forEach(([playerId, usage]) => {
            const playerBox = document.createElement("div");
            playerBox.classList.add('flex', 'flex-col', 'items-center', 'w-[100px]', 'text-center');

            // Nome (agora clicável)
            const playerNameLink = document.createElement("a");
            playerNameLink.href = `show-result.html?id=${encodeURIComponent(playerId)}`;
            playerNameLink.classList.add('font-bold', 'text-white', 'text-sm', 'whitespace-nowrap', 'hover:text-blue-400', 'cursor-pointer');
            playerNameLink.innerText = playerId;
            playerBox.appendChild(playerNameLink);

            // PickRate
            const pickRate = document.createElement("span");
            pickRate.classList.add('font-semibold', 'text-green-400', 'text-xs', 'pt-1');
            pickRate.innerText = `PR: ${usage}`;
            playerBox.appendChild(pickRate);

            // WinRate
            const winRate = document.createElement("span");
            winRate.classList.add('font-semibold', 'text-yellow-400', 'text-xs');
            winRate.innerText = `WR: ${playerWinRateCount[playerId]}%`;
            playerBox.appendChild(winRate);

            usageBody.appendChild(playerBox);
        });
    } else {
        const seventhMainSquare = document.getElementById("infoSeventh");
        seventhMainSquare.innerHTML = "";

        const playerNameContainer = document.createElement("div");
        playerNameContainer.classList.add('flex', 'flex-col', 'items-center', 'justify-center', 'pt-4');

        const playerNameSpan = document.createElement("span");
        playerNameSpan.classList.add('text-xl', 'font-bold', 'text-white');
        playerNameSpan.innerText = id;
        playerNameContainer.appendChild(playerNameSpan);

        const profileTextSpan = document.createElement("span");
        profileTextSpan.classList.add('text-lg', 'text-gray-500', 'font-bold', 'mt-1');
        profileTextSpan.innerText = "(Perfil do Jogador)";
        playerNameContainer.appendChild(profileTextSpan);

        seventhMainSquare.appendChild(playerNameContainer);
    }

        //aqui começa o código das lanes
        const thirdMainSquare = document.getElementById("infoEighth");

        // Container geral
        const laneSquareContainer = document.createElement("div");
        laneSquareContainer.classList.add("relative");
        thirdMainSquare.appendChild(laneSquareContainer);

        // Novo layout horizontal
        const laneFlexContainer = document.createElement("div");
        laneFlexContainer.classList.add("flex", "gap-x-8", "pt-4");
        laneSquareContainer.appendChild(laneFlexContainer);

        let laneTotalSum = 0;
        for (const lane of Object.keys(lanes)) {
            laneTotalSum += lanes[lane].pickRate;
        }

        // Encontrar a lane com maior WR (PR > 5)
        let highestLanesWr = 0;
        let highestLanesName = null;
        for (const laneKey of Object.keys(lanes)) {
            const currLane = lanes[laneKey];
            const laneWins = currLane.wins || 0;
            const lanePickRate = currLane.pickRate || 0;
            const laneWr = lanePickRate ? Number(((100 * laneWins) / lanePickRate).toFixed(2)) : 0;
            if (laneWr > highestLanesWr && lanePickRate > 5) {
                highestLanesWr = laneWr;
                highestLanesName = laneKey;
            }
        }

        for (const lane of gameLanes) {
            const laneData = lanes[lane] || {};
            const lanePickRate = laneData.pickRate || 0;
            const laneWinRate = lanePickRate ? Number(((100 * (laneData.wins || 0)) / lanePickRate).toFixed(2)) : 0;

            const laneBox = document.createElement("div");
            laneBox.classList.add("flex", "flex-col", "items-center", "w-[110px]");

            const img = document.createElement("img");
            img.src = `./images/lanes/${lane.toLowerCase()}.png`; // força minúsculo
            img.width = 56;
            laneBox.appendChild(img);

            const name = document.createElement("span");
            name.classList.add("font-bold", "text-white", "text-sm", "mt-1", "capitalize", "text-center");
            name.innerText = capitalize(lane);
            laneBox.appendChild(name);

            const pickRate = document.createElement("span");
            pickRate.classList.add("text-sm", "font-bold", "text-center", "text-gray-200", "pt-1");
            pickRate.innerText = `${lanePickRate} PR`;
            laneBox.appendChild(pickRate);

            const winRate = document.createElement("span");
            winRate.classList.add("text-sm", "font-bold", "text-center", "text-gray-400", "pt-0.5");
            winRate.innerText = `${laneWinRate}% WR`;
            laneBox.appendChild(winRate);
            
            if (lane === highestLanesName && lanePickRate > 5) {
                pickRate.style.color = "#fffb00";
                winRate.style.color = "#fffb00";
            }


            laneFlexContainer.appendChild(laneBox);
        }

        //aqui começa as sinergias
        const infoEighth = document.getElementById("infoNinety");

        function loadTopSynergiesPreview() {
            fetch('./results.json')
                .then((response) => response.json())
                .then((results) => {
                    const isPlayerName = id !== 'allyTeam' && id !== 'enemyTeam';
                    const objAttribute = isPlayerName
                        ? results.allyTeam[id]
                        : results[id].overall;

                    const pokemonInfo = objAttribute[pokemonName];
                    const { alliedPokemons } = pokemonInfo;

                    let allyKeys = Object.keys(alliedPokemons).filter(
                        (ally) => alliedPokemons[ally].pickRate >= 2
                    );

                    allyKeys = allyKeys.sort((a, b) => {
                        if (alliedPokemons[a].winRate !== alliedPokemons[b].winRate) {
                            return alliedPokemons[b].winRate - alliedPokemons[a].winRate;
                        } else {
                            return alliedPokemons[b].pickRate - alliedPokemons[a].pickRate;
                        }
                    });

                    const top5Synergies = allyKeys.slice(0, 5);

                    infoEighth.innerHTML = "";

                    // Container horizontal para os 5 Pokémon
                    const synergyRow = document.createElement("div");
                    synergyRow.classList.add("flex", "gap-x-8", "justify-start", "pt-4");
                    infoEighth.appendChild(synergyRow);

                    top5Synergies.forEach((ally) => {
                        const { pickRate, winRate } = alliedPokemons[ally];

                        const synergyBox = document.createElement("div");
                        synergyBox.classList.add("flex", "flex-col", "items-center", "w-[80px]", "transition-all", "duration-200");

                        const pokemonImg = document.createElement("img");
                        pokemonImg.src = `./images/backgrounds/${ally}-left-bg.png`;
                        pokemonImg.classList.add("w-70", "h-70", "hover:scale-110", "transition-transform", "duration-200", "cursor-pointer");
                        pokemonImg.title = ally; // Adiciona tooltip com o nome do Pokémon
                        synergyBox.appendChild(pokemonImg);

                        const name = document.createElement("span");
                        name.classList.add("text-white", "font-bold", "text-sm", "text-center", "pt-1");
                        name.innerText = ally.toUpperCase();
                        synergyBox.appendChild(name);

                        const pickRateSpan = document.createElement("span");
                        pickRateSpan.classList.add("text-gray-300", "text-sm", "text-center", "font-bold","pt-1");
                        pickRateSpan.innerText = `PickRate: ${pickRate}`;
                        synergyBox.appendChild(pickRateSpan);

                        const winRateSpan = document.createElement("span");
                        winRateSpan.classList.add("text-sm", "text-center", "pt-0.5");

                        if (winRate >= 70) {
                            winRateSpan.style.color = '#00FF1E'; // Verde
                        } else if (winRate >= 40) {
                            winRateSpan.style.color = '#FFF100'; // Amarelo
                        } else {
                            winRateSpan.style.color = '#FF3737'; // Vermelho
                        }

                        winRateSpan.innerText = `WinRate: ${winRate}%`;
                        synergyBox.appendChild(winRateSpan);

                        synergyRow.appendChild(synergyBox);
                    });
                });
        }

        loadTopSynergiesPreview();

        //aqui começa as roles
        const fourthMainSquare = document.getElementById("infoTenth");

        const rolesSquareContainer = document.createElement("div");
        rolesSquareContainer.classList.add('relative');
        fourthMainSquare.appendChild(rolesSquareContainer);

        const rolesTablesContainer = document.createElement("div");
        rolesTablesContainer.classList.add('flex', 'flex-row', 'justify-center', 'gap-x-8', 'h-full', 'pt-6');
        rolesSquareContainer.appendChild(rolesTablesContainer);

        let rolesTotalSum = 0;
        for (const role of Object.keys(roles)) {
            rolesTotalSum += roles[role].pickRate;
        }

        const sortedRoles = sortValues(roles);
        const slicedRoles = sortedRoles.slice(0, 3);

        let highestRolesWr = 0;
        let highestRolesIndex = -1;

        for (let i = 0; i < slicedRoles.length; i++) {
            const slicedRole = slicedRoles[i];
            const currObj = roles[slicedRole];
            const roleWins = currObj.wins;
            const rolePickRate = currObj.pickRate || 0;
            const roleWr = rolePickRate ? Number(((100 * roleWins) / rolePickRate).toFixed(2)) : 0;

            if (roleWr > highestRolesWr && rolePickRate >= 5) {
                highestRolesWr = roleWr;
                highestRolesIndex = i;
            }
        }

        slicedRoles.forEach((role, i) => {
            const roleObj = roles[role];

            const roleBox = document.createElement("div");
            roleBox.classList.add('flex', 'flex-col', 'items-center', 'w-[100px]', 'text-center', 'pb-2');

            const roleImage = document.createElement("img");
            roleImage.src = `./images/medals/${role}.png`;
            roleImage.classList.add('w-[60px]', 'h-[60px]');
            roleBox.appendChild(roleImage);

            const roleName = document.createElement("span");
            roleName.classList.add('text-white', 'font-bold', 'pt-2');
            roleName.innerText = role;
            roleBox.appendChild(roleName);

            const pickRate = document.createElement("span");
            pickRate.classList.add('text-sm', 'pt-1', 'font-bold');
            pickRate.innerText = `PickRate: ${roleObj.pickRate || 0}`;

            const winRate = document.createElement("span");
            winRate.classList.add('text-sm', 'pt-1', 'font-bold');
            const wr = roleObj.pickRate ? Number((100 * (roleObj.wins || 0)) / roleObj.pickRate).toFixed(2) : '0.00';
            winRate.innerText = `WinRate: ${wr}%`;

            // Destacar somente a melhor role em amarelo
            if (i === highestRolesIndex && roleObj.pickRate >= 5) {
                pickRate.style.color = '#FFF100';
                winRate.style.color = '#FFF100';
            } else {
                pickRate.style.color = 'white';
                winRate.style.color = 'white';
            }

            roleBox.appendChild(pickRate);
            roleBox.appendChild(winRate);

            rolesTablesContainer.appendChild(roleBox);
        });
    })
}