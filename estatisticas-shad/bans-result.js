fetch('./results.json')
    .then((response) => response.json())
    .then((results) => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const infoType = urlParams.get('id');
        const bansWinnerTeam = results.bans?.BansWinnerTeam || {};
        const bansLoserTeam = results.bans?.BansLoserTeam || {};

        const getObjectAttribute = () => {
            if (infoType === 'allyTeam' || infoType === 'enemyTeam') {
                return results[infoType].overall;
            } else {
                const { allyTeam } = results;
                return allyTeam[infoType];
            }
        }
        
        const objAttribute = getObjectAttribute();

        const containerDiv = document.getElementById("tables-container");

        const bans = {};

        Object.keys(bansWinnerTeam).forEach((pokemon) => {
            bans[pokemon] = (bans[pokemon] || 0) + bansWinnerTeam[pokemon];
        });

        Object.keys(bansLoserTeam).forEach((pokemon) => {
            bans[pokemon] = (bans[pokemon] || 0) + bansLoserTeam[pokemon];
        });

        function applyFilters() {
            const todosCheckbox = document.getElementById("todos");
            const bansWinnerCheckbox = document.getElementById("bansWinner");
            const bansLoserCheckbox = document.getElementById("bansLoser");

            let filteredBans = {}; 
            let showWinRate = false;

            if (todosCheckbox.checked) {
                Object.keys(bansWinnerTeam).forEach((pokemon) => {
                    filteredBans[pokemon] = (filteredBans[pokemon] || 0) + bansWinnerTeam[pokemon];
                });
                Object.keys(bansLoserTeam).forEach((pokemon) => {
                    filteredBans[pokemon] = (filteredBans[pokemon] || 0) + bansLoserTeam[pokemon];
                });
                showWinRate = true;
            }

            if (bansWinnerCheckbox.checked && !bansLoserCheckbox.checked) {
                filteredBans = { ...bansWinnerTeam };
                showWinRate = false;
            }
            if (bansLoserCheckbox.checked && !bansWinnerCheckbox.checked) {
                filteredBans = { ...bansLoserTeam };
                showWinRate = false;
            }

            if (Object.keys(filteredBans).length === 0 && !(todosCheckbox.checked || bansWinnerCheckbox.checked || bansLoserCheckbox.checked)) {
                containerDiv.innerHTML = ""; 
                return;
            }

            const sortedKeys = Object.keys(filteredBans).sort((a, b) => filteredBans[b] - filteredBans[a]);

            renderBanList(sortedKeys, filteredBans, showWinRate);
        }

        function handleFilterChange(event) {
            const todosCheckbox = document.getElementById("todos");
            const bansWinnerCheckbox = document.getElementById("bansWinner");
            const bansLoserCheckbox = document.getElementById("bansLoser");

            todosCheckbox.checked = false;
            bansWinnerCheckbox.checked = false;
            bansLoserCheckbox.checked = false;

            event.target.checked = true;

            applyFilters();
        }

        const displaySummaryInfo = () => {
            let totalBans = 0;
            let top1All = "";
            let top1Winner = "";
            let top1Loser = "";
            let top1AllImage = "";
            let top1WinnerImage = "";
            let top1LoserImage = "";

            if (results.bans) {
                Object.values(results.bans.BansWinnerTeam || {}).forEach((banCount) => {
                    totalBans += parseFloat(banCount || 0);
                });

                Object.values(results.bans.BansLoserTeam || {}).forEach((banCount) => {
                    totalBans += parseFloat(banCount || 0);
                });

                const allBans = { ...results.bans.BansWinnerTeam, ...results.bans.BansLoserTeam };
                const sortedAllBans = Object.entries(allBans).sort((a, b) => b[1] - a[1]);
                top1All = sortedAllBans[0] ? sortedAllBans[0][0] : "Nenhum";
                top1AllImage = `./images/backgrounds/${top1All}-left-bg.png`;

                const sortedWinnerBans = Object.entries(results.bans.BansWinnerTeam || {}).sort((a, b) => b[1] - a[1]);
                top1Winner = sortedWinnerBans[0] ? sortedWinnerBans[0][0] : "Nenhum";
                top1WinnerImage = `./images/backgrounds/${top1Winner}-left-bg.png`;

                const sortedLoserBans = Object.entries(results.bans.BansLoserTeam || {}).sort((a, b) => b[1] - a[1]);
                top1Loser = sortedLoserBans[0] ? sortedLoserBans[0][0] : "Nenhum";
                top1LoserImage = `./images/backgrounds/${top1Loser}-left-bg.png`;
            }

            const summaryDiv = document.createElement("div");
            summaryDiv.classList.add(
                "text-white",
                "p-6",
                "flex",
                "justify-around",
                "items-center",
                "gap-8"
            );

            const createSummaryBadge = (title, value, imageSrc = null) => {
                const badgeDiv = document.createElement("div");
                badgeDiv.classList.add(
                    "flex",
                    "flex-col",
                    "items-center",
                    "justify-center",
                    "text-center",
                    "border-r-2",
                    "border-gray-300",
                    "pr-44",
                    "last:border-r-0"
                );

                badgeDiv.innerHTML = `
                    ${imageSrc ? `<img src="${imageSrc}" alt="${value}" class="w-12 h-12 rounded-full mb-2">` : ""}
                    <span class="font-semibold text-xl text-black">${title}</span>
                    <div class="font-bold text-2xl text-black">${value}</div>
                `;
                return badgeDiv;
            };

            summaryDiv.appendChild(createSummaryBadge("Total Bans", totalBans));
            summaryDiv.appendChild(createSummaryBadge("Top 1 (Todos os Bans)", capitalize(top1All), top1AllImage));
            summaryDiv.appendChild(createSummaryBadge("Top 1 (Bans Vencedores)", capitalize(top1Winner), top1WinnerImage));
            summaryDiv.appendChild(createSummaryBadge("Top 1 (Bans Perdedores)", capitalize(top1Loser), top1LoserImage));

            const summaryInfo = document.getElementById("statisticsInfo");
            summaryInfo.innerHTML = "";
            summaryInfo.appendChild(summaryDiv);
        };

        displaySummaryInfo();

        const titleSpan = document.getElementById("title-span");
        titleSpan.innerText = "Banimentos";

        const mainLogo = document.getElementById("mainLogo");
        mainLogo.classList.add('pointer', 'w-[200px]','h-auto', 'top-[20px]', 'right-[20px]');

        const dropdownMenu = document.createElement("div");
        dropdownMenu.classList.add("hidden", "absolute", "top-[110px]", "left-[20px]", "bg-white", "border", "border-gray-500", "rounded", "shadow-md", "w-[200px]", "font-bold");

        const mainMenuOption = document.createElement("div");
        mainMenuOption.classList.add("p-2", "cursor-pointer", "text-black", "hover:bg-gray-200");
        mainMenuOption.innerText = "Menu Principal";
        mainMenuOption.onclick = () => {
            window.location.href = window.location.pathname.replace('bans-result.html', 'index.html');
        };
        dropdownMenu.appendChild(mainMenuOption);
            
        const allyOption = document.createElement("div");
        allyOption.classList.add("p-2", "cursor-pointer", "text-black", "hover:bg-gray-200");
        allyOption.innerText = "Aliados";
        allyOption.onclick = () => {
            window.location.href = window.location.pathname.replace('bans-result.html', `show-result.html?id=allyTeam`);
        };
        dropdownMenu.appendChild(allyOption);
            
        const enemyOption = document.createElement("div");
        enemyOption.classList.add("p-2", "cursor-pointer", "text-black", "hover:bg-gray-200");
        enemyOption.innerText = "Adversários";
        enemyOption.onclick = () => {
            window.location.href = window.location.pathname.replace('bans-result.html', `show-result.html?id=enemyTeam`);
        };
        dropdownMenu.appendChild(enemyOption);
    
        const banOption = document.createElement("div");
        banOption.classList.add("p-2", "cursor-pointer", "text-black", "hover:bg-gray-200");
        banOption.innerText = "Banimentos";
        dropdownMenu.appendChild(banOption);
    
        mainLogo.appendChild(dropdownMenu);
            
        mainLogo.onclick = () => {
            dropdownMenu.classList.toggle("hidden");
        };

        const cabecalhoTable = document.getElementById("topicInfo");

        const headerTr = document.createElement("tr");
        cabecalhoTable.appendChild(headerTr);

        headerTr.classList.add('flex', 'w-full', 'text-left', 'text-white');

        const createHeaderCell = (text, className = '') => {
            const th = document.createElement("th");
            th.classList.add('px-4', 'py-2', 'font-semibold', 'text-xl', className);
            th.innerText = text;
            return th;
        };

        headerTr.appendChild(createHeaderCell('Rank', 'w-56'));
        headerTr.appendChild(createHeaderCell('Pick', 'w-[1260px]'));
        headerTr.appendChild(createHeaderCell('Banimentos', 'w-[450px]'));
        headerTr.appendChild(createHeaderCell('Winrate', 'flex-1'));

        function renderBanList(sortedKeys, filteredBans, showWinRate) {
            containerDiv.innerHTML = '';

            const table = document.createElement("table");
            table.style.borderCollapse = 'separate';
            table.style.borderSpacing = '0 5px';
            table.style.width = '100%';
            table.classList.add('w-full', 'h-fit');    

            sortedKeys.forEach((pokemonName, index) => {
                const role = pokemonRoles[pokemonName];
                const totalBansForPokemon = filteredBans[pokemonName];
                const bansWinner = bansWinnerTeam[pokemonName] || 0;
                const winrateBans = showWinRate ? ((bansWinner / totalBansForPokemon) * 100).toFixed(1) : null;

                const rowTr = document.createElement("tr");
                rowTr.classList.add('text-left', 'p-1', 'font-bold', 'text-xl', 'h-full', 'cursor-pointer');
                rowTr.style.cursor = 'pointer';
                
                // Corrigido: usando infoType da URL para o redirecionamento
                rowTr.addEventListener('click', () => {
                    const currentPath = window.location.pathname;
                    const basePath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);

                    // Usa allyTeam como default, pois a página de bans não define infoType
                    const teamType = infoType || 'allyTeam';

                    window.location.href = `${basePath}pokemon-result.html?id=${teamType}&pokemon=${pokemonName}`;
                });

                const rankTd = document.createElement("td");
                rankTd.classList.add('text-left', 'p-3', 'font-bold', 'text-xl', 'w-48');
                rankTd.style.backgroundColor = rolesColor[role];
                rankTd.innerText = index + 1;
                rowTr.appendChild(rankTd);

                const pickTd = document.createElement("td");
                pickTd.style.background = `linear-gradient(to right, ${rolesColor[role]}, rgb(255, 255, 255))`;
                rowTr.appendChild(pickTd);

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
                pickSpan.classList.add('pl-1.5', 'text-black', 'text-xl', 'font-bold', 'w-28');
                pickSpan.innerText = capitalize(pokemonName);
                pickContainer.appendChild(pickSpan);

                const banCountTd = document.createElement("td");
                banCountTd.classList.add('text-black', 'font-bold', 'text-xl', 'text-left');
                banCountTd.style.backgroundColor = 'white';
                banCountTd.innerText = `${filteredBans[pokemonName]}`;
                rowTr.appendChild(banCountTd);

                if (showWinRate) {
                    const winRateTd = document.createElement("td");
                    winRateTd.classList.add('text-black', 'font-bold', 'text-xl', 'text-center');
                    winRateTd.style.backgroundColor = 'white';
                    winRateTd.innerText = `${winrateBans}%`;
                    rowTr.appendChild(winRateTd); 
                }

                table.appendChild(rowTr);
            });

            containerDiv.appendChild(table);
        }

        applyFilters();

        document.querySelectorAll('.class-filter').forEach(checkbox => {
            checkbox.addEventListener('change', handleFilterChange);
        });

        document.addEventListener("click", (event) => {
            const searchButton = document.getElementById("searchButton");
            const searchResults = document.getElementById("searchResults");
            const pokemonSearchInput = document.getElementById("pokemonSearch");

            if (!searchButton.contains(event.target) && !pokemonSearchInput.contains(event.target)) {
                if (searchResults) searchResults.style.display = 'none';
            }
        });
    })
    .catch((error) => {
        console.error("Erro ao carregar os dados:", error);
        const containerDiv = document.getElementById("tables-container");
        containerDiv.innerHTML = `<p class='text-red-500'>Erro ao carregar os dados: ${error.message}</p>`;
    });

document.getElementById("captureTable").addEventListener("click", () => {
    const tablesContainer = document.getElementById("tables-container");
    const statisticsInfo = document.getElementById("statisticsInfo");
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
                link.download = "bansGeral.png";

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

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}