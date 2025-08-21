document.addEventListener('DOMContentLoaded', function() {
    // Lista de Pokémon
    const pokemons = [
        "Absol", "Aegislash", "Azumarill", "Blastoise", "Blaziken", 
        "Buzzwole", "Chandelure", "Charizard", "Cinderace", "Clefable", 
        "Comfey", "Cramorant", "Crustle", "Decidueye", "Delphox", 
        "Dodrio", "Dragapult", "Dragonite", "Duraludon", "Eldegoss", 
        "Espeon", "Garchomp", "Gardevoir", "Gengar", "Glaceon", 
        "Goodra", "Greedent", "Greninja", "Hoopa", "Inteleon", 
        "Lapras", "Leafeon", "Lucario", "Machamp", "Mamoswine", 
        "Meowscarada", "Metagross", "Mew", "Mewtwo X", "Mewtwo Y", 
        "Mimikyu", "Mr. Mime", "Ninetales", "Pikachu", "Sableye", 
        "Scizor", "Scyther", "Slowbro", "Snorlax", "Sylveon", 
        "Talonflame", "Trevenant", "Tsareena", "Tyranitar", "Umbreon", 
        "Urshifu", "Venusaur", "Wigglytuff", "Zacian", "Zeraora"
    ];

    // Preencher o select com os Pokémon
    const pokemonSelect = document.getElementById('pokemon-select');
    pokemons.sort().forEach(pokemon => {
        const option = document.createElement('option');
        option.value = pokemon;
        option.textContent = pokemon;
        pokemonSelect.appendChild(option);
    });

    // Gerenciar seleção de rota
    const routeBtns = document.querySelectorAll('.route-btn');
    let selectedRoute = null;

    routeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            routeBtns.forEach(b => b.classList.remove('ativo'));
            this.classList.add('ativo');
            selectedRoute = this.dataset.route;
        });
    });

    // Experiência necessária para cada nível (ATUALIZADO)
    const expRequirements = {
        1: { toNext: 100, cumulative: 0 },
        2: { toNext: 100, cumulative: 100 },
        3: { toNext: 400, cumulative: 200 },
        4: { toNext: 400, cumulative: 600 }, // Level 5 agora precisa de 600 XP acumulada
        5: { toNext: 650, cumulative: 1000 }
    };

    // Valores de XP dos objetivos (ATUALIZADO)
    const xpValues = {
        initialBunnelby: 70,
        laneBunnelbyEarly: 120,
        laneBunnelbyLate: 130,
        baltoyNeutro: 70,
        baltoySide: 70
    };

    // Energia dos objetivos (ATUALIZADO)
    const energyValues = {
        initialBunnelby: 2,
        laneBunnelby: 5,
        baltoyNeutro: 2,
        baltoySide: 2
    };

    // XP ganha ao pontuar
    function getScoreXP(points) {
        if (points === 1) return 0;
        if (points === 2) return 50;
        return (10 * points) + 40;
    }

    // Calcular cenários quando o botão for clicado
    document.getElementById('calcular-btn').addEventListener('click', function() {
        const selectedPokemon = pokemonSelect.value;
        const includeScore = document.getElementById('score-option').value === 'yes';
        
        if (!selectedPokemon) {
            alert('Por favor, selecione um Pokémon.');
            return;
        }
        
        if (!selectedRoute) {
            alert('Por favor, selecione uma rota.');
            return;
        }

        const resultados = calcularCenarios(selectedRoute, includeScore);
        exibirResultados(selectedPokemon, resultados);
    });

    // Função para calcular os cenários possíveis
    function calcularCenarios(route, includeScore) {
        const cenarios = [];
        
        // XP inicial dos 4 Bunnelby
        const initialXP = 4 * xpValues.initialBunnelby;
        const initialEnergy = 4 * energyValues.initialBunnelby;
        
        // XP e energia disponível na lane selecionada
        let laneXP = 0;
        let laneEnergy = 0;
        let objectives = [];
        
        if (route === 'top' || route === 'bot') {
            // Lane tem 5 Bunnelby, 1 Baltoy neutro e 1 Baltoy side
            laneXP = 5 * xpValues.laneBunnelbyEarly + 
                     xpValues.baltoyNeutro + 
                     xpValues.baltoySide;
            
            laneEnergy = 5 * energyValues.laneBunnelby + 
                        energyValues.baltoyNeutro + 
                        energyValues.baltoySide;
            
            objectives = ['5 Bunnelby', 'Baltoy neutro', 'Baltoy side'];
            
            // Cenário 1: Pegar todos os objetivos
            const totalXP = initialXP + laneXP;
            const totalEnergy = initialEnergy + laneEnergy;
            cenarios.push({
                descricao: `Pega todos (${objectives.join(' + ')})`,
                xp: totalXP,
                level: calcularLevel(totalXP),
                avaliacao: calcularLevel(totalXP) >= 5 ? 'bom' : 'ruim',
                energy: totalEnergy,
                score: 0
            });
            
            // Cenário 2: Perder 1 Bunnelby na lane
            const xpMissingOne = initialXP + (4 * xpValues.laneBunnelbyEarly) + 
                               xpValues.baltoyNeutro + xpValues.baltoySide;
            const energyMissingOne = initialEnergy + (4 * energyValues.laneBunnelby) + 
                                    energyValues.baltoyNeutro + energyValues.baltoySide;
            cenarios.push({
                descricao: 'Perde 1 Bunnelby (pega ambos Baltoy)',
                xp: xpMissingOne,
                level: calcularLevel(xpMissingOne),
                avaliacao: calcularLevel(xpMissingOne) >= 5 ? 'bom' : 'ruim',
                energy: energyMissingOne,
                score: 0
            });
            
            // Cenário 3: Perder o Baltoy neutro
            const xpMissingBaltoyNeutro = initialXP + (5 * xpValues.laneBunnelbyEarly) + 
                                        xpValues.baltoySide;
            const energyMissingBaltoyNeutro = initialEnergy + (5 * energyValues.laneBunnelby) + 
                                           energyValues.baltoySide;
            cenarios.push({
                descricao: 'Perde Baltoy neutro (pega Baltoy side)',
                xp: xpMissingBaltoyNeutro,
                level: calcularLevel(xpMissingBaltoyNeutro),
                avaliacao: calcularLevel(xpMissingBaltoyNeutro) >= 5 ? 'bom' : 'ruim',
                energy: energyMissingBaltoyNeutro,
                score: 0
            });
            
            // Cenário 4: Perder o Baltoy side
            const xpMissingBaltoySide = initialXP + (5 * xpValues.laneBunnelbyEarly) + 
                                      xpValues.baltoyNeutro;
            const energyMissingBaltoySide = initialEnergy + (5 * energyValues.laneBunnelby) + 
                                         energyValues.baltoyNeutro;
            cenarios.push({
                descricao: 'Perde Baltoy side (pega Baltoy neutro)',
                xp: xpMissingBaltoySide,
                level: calcularLevel(xpMissingBaltoySide),
                avaliacao: calcularLevel(xpMissingBaltoySide) >= 5 ? 'bom' : 'ruim',
                energy: energyMissingBaltoySide,
                score: 0
            });
            
            // Cenário 5: Perder 2 Bunnelby na lane
            const xpMissingTwo = initialXP + (3 * xpValues.laneBunnelbyEarly) + 
                               xpValues.baltoyNeutro + xpValues.baltoySide;
            const energyMissingTwo = initialEnergy + (3 * energyValues.laneBunnelby) + 
                                  energyValues.baltoyNeutro + energyValues.baltoySide;
            cenarios.push({
                descricao: 'Perde 2 Bunnelby (pega ambos Baltoy)',
                xp: xpMissingTwo,
                level: calcularLevel(xpMissingTwo),
                avaliacao: calcularLevel(xpMissingTwo) >= 5 ? 'bom' : 'ruim',
                energy: energyMissingTwo,
                score: 0
            });
        } else if (route === 'jungle') {
            // Jungle tem objetivos diferentes (simplificado)
            laneXP = 6 * xpValues.laneBunnelbyEarly;
            laneEnergy = 6 * energyValues.laneBunnelby;
            objectives = ['6 Bunnelby (Jungle)'];
            
            cenarios.push({
                descricao: 'Pega todos os objetivos da jungle',
                xp: initialXP + laneXP,
                level: calcularLevel(initialXP + laneXP),
                avaliacao: calcularLevel(initialXP + laneXP) >= 5 ? 'bom' : 'ruim',
                energy: initialEnergy + laneEnergy,
                score: 0
            });
        }

        // Se incluir cenários com pontuação
        if (includeScore) {
            const baseCenarios = [...cenarios];
            cenarios.length = 0;

            baseCenarios.forEach(cenario => {
                const energy = cenario.energy;
                
                // Adiciona o cenário original (sem pontuação)
                cenarios.push(cenario);
                
                // Calcula possíveis pontuações
                if (energy >= 2) {
                    // 2 pontos (50 XP)
                    const score2XP = cenario.xp + 50;
                    cenarios.push({
                        descricao: `${cenario.descricao} + 2 pontos`,
                        xp: score2XP,
                        level: calcularLevel(score2XP),
                        avaliacao: calcularLevel(score2XP) >= 5 ? 'bom' : 'ruim',
                        energy: cenario.energy,
                        score: 2
                    });
                }
                
                if (energy >= 3) {
                    // 3 pontos (70 XP)
                    const score3XP = cenario.xp + 70;
                    cenarios.push({
                        descricao: `${cenario.descricao} + 3 pontos`,
                        xp: score3XP,
                        level: calcularLevel(score3XP),
                        avaliacao: calcularLevel(score3XP) >= 5 ? 'bom' : 'ruim',
                        energy: cenario.energy,
                        score: 3
                    });
                }
                
                if (energy >= 4) {
                    // 4 pontos (80 XP)
                    const score4XP = cenario.xp + 80;
                    cenarios.push({
                        descricao: `${cenario.descricao} + 4 pontos`,
                        xp: score4XP,
                        level: calcularLevel(score4XP),
                        avaliacao: calcularLevel(score4XP) >= 5 ? 'bom' : 'ruim',
                        energy: cenario.energy,
                        score: 4
                    });
                }
                
                if (energy >= 5) {
                    // 5 pontos (90 XP)
                    const score5XP = cenario.xp + 90;
                    cenarios.push({
                        descricao: `${cenario.descricao} + 5 pontos`,
                        xp: score5XP,
                        level: calcularLevel(score5XP),
                        avaliacao: calcularLevel(score5XP) >= 5 ? 'bom' : 'ruim',
                        energy: cenario.energy,
                        score: 5
                    });
                }
                
                // Máximo de pontos possível
                if (energy > 5) {
                    const maxScore = energy;
                    const maxScoreXP = cenario.xp + ((10 * maxScore) + 40);
                    cenarios.push({
                        descricao: `${cenario.descricao} + ${maxScore} pontos (máximo)`,
                        xp: maxScoreXP,
                        level: calcularLevel(maxScoreXP),
                        avaliacao: calcularLevel(maxScoreXP) >= 5 ? 'bom' : 'ruim',
                        energy: cenario.energy,
                        score: maxScore
                    });
                }
            });
        }
        
        return cenarios;
    }
    
    // Função para calcular o level com base na XP
    function calcularLevel(xp) {
        if (xp >= 600) return 5;  // Alterado para 600 XP
        if (xp >= 200) return 4;
        if (xp >= 100) return 3;
        return 2;
    }
    
    // Função para exibir os resultados na tabela
    function exibirResultados(pokemon, cenarios) {
        const tabela = document.querySelector('#resultados-table tbody');
        tabela.innerHTML = '';
        
        // Ordena cenários por XP (do maior para o menor)
        cenarios.sort((a, b) => b.xp - a.xp);
        
        cenarios.forEach(cenario => {
            const row = document.createElement('tr');
            
            const cellPokemon = document.createElement('td');
            cellPokemon.textContent = pokemon;
            row.appendChild(cellPokemon);
            
            const cellCenario = document.createElement('td');
            cellCenario.textContent = cenario.descricao;
            row.appendChild(cellCenario);
            
            const cellLevel = document.createElement('td');
            cellLevel.textContent = cenario.level;
            row.appendChild(cellLevel);
            
            const cellAvaliacao = document.createElement('td');
            cellAvaliacao.textContent = cenario.avaliacao === 'bom' ? 'Bom' : 'Ruim';
            cellAvaliacao.className = cenario.avaliacao;
            row.appendChild(cellAvaliacao);
            
            tabela.appendChild(row);
        });
        
        document.getElementById('resultados').style.display = 'block';
        
        // Rolagem suave para os resultados
        document.getElementById('resultados').scrollIntoView({ behavior: 'smooth' });
    }
});