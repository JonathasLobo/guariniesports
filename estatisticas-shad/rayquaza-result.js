document.addEventListener("DOMContentLoaded", () => {
    const rankingContainer = document.getElementById("tables-container");

    const loadRayquazaDataAndRenderTable = () => {
        const storedRayquazaSelect = JSON.parse(localStorage.getItem("rayquazaSelect")) || {};
        console.log("Valores recuperados do Rayquaza Select:", storedRayquazaSelect);
        fetch('./results.json')
            .then((response) => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                return response.json();
            })
            .then((results) => {
                console.log("Dados do Rayquaza:", results.rayquazaSelect);
                const rayquazaData = results.rayquazaSelect || {};
                const playersData = Object.entries(rayquazaData).map(([name, count]) => ({
                    playerName: name,
                    metricValue: count
                }));

                // Ordena os jogadores por contagem
                const sortedPlayers = playersData.sort((a, b) => b.metricValue - a.metricValue);

                // Renderiza a tabela
                renderRayquazaTable(sortedPlayers);
            })
            .catch((error) => console.error("Erro ao carregar os dados de Rayquaza:", error));
    };

    const renderRayquazaTable = (playersData) => {
        // Limpa o container antes de renderizar a nova tabela
        rankingContainer.innerHTML = "";

        // Criação da tabela
        const table = document.createElement("table");
        table.style.borderCollapse = 'separate';
        table.style.borderSpacing = '0 5px';
        table.classList.add('w-full', 'h-fit');

        // Cabeçalho da tabela
        const headerTr = document.createElement("tr");
        headerTr.classList.add('text-left', 'text-white');
        headerTr.innerHTML = `
            <th class="px-4 py-2 font-semibold text-xl w-20">Rank</th>
            <th class="px-4 py-2 font-semibold text-xl w-[200px]">Jogador</th>
            <th class="py-2 font-semibold text-xl w-[120px]">Smites Rayquaza</th>
        `;
        table.appendChild(headerTr);

        // Renderiza as linhas com os dados dos jogadores
        playersData.forEach((player, index) => {
            const rowTr = document.createElement("tr");
            rowTr.classList.add('text-left', 'font-bold', 'text-2xl', 'h-full');
            rowTr.style.background = 'linear-gradient(to right, #6ab08f, #ffffff)';

            const rankTd = document.createElement("td");
            rankTd.classList.add('text-left', 'p-3', 'font-bold', 'text-2xl');
            rankTd.innerText = index + 1;
            rowTr.appendChild(rankTd);

            const playerTd = document.createElement("td");
            playerTd.classList.add('text-black', 'font-bold', 'text-2xl');
            playerTd.innerText = player.playerName;
            rowTr.appendChild(playerTd);

            const countTd = document.createElement("td");
            countTd.classList.add('text-black', 'font-bold', 'text-2xl');
            countTd.innerText = player.metricValue;
            rowTr.appendChild(countTd);

            table.appendChild(rowTr);
        });

        // Adiciona a tabela ao container
        rankingContainer.appendChild(table);
    };

    // Carrega e renderiza os dados do Rayquaza ao carregar a página
    loadRayquazaDataAndRenderTable();
});
