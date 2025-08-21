// Variáveis globais
let vitorias = 0;
let empates = 0;
let derrotas = 0;
let resultados = [];

// Armazena as composições de cada jogo (apenas em memória)
let composicoes = {};

// ==============================================
// FUNÇÕES DE PERSISTÊNCIA (apenas partidas)
// ==============================================

function salvarPartidas() {
    const dados = {
        vitorias,
        empates,
        derrotas,
        resultados
    };
    localStorage.setItem('scrimsData', JSON.stringify(dados));
}

function carregarPartidas() {
    const dadosSalvos = localStorage.getItem('scrimsData');
    if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);
        vitorias = dados.vitorias || 0;
        empates = dados.empates || 0;
        derrotas = dados.derrotas || 0;
        resultados = dados.resultados || [];

        reconstruirTabela();
        atualizarContadores();
    }
}

function reconstruirTabela() {
    const tabela = document.getElementById('tabelaResultados');
    tabela.innerHTML = '';

    resultados.forEach((item, index) => {
        const nossoTime = "Guariní";
        const nossaLogo = '<img src="./images/backgrounds/Guarini.png" alt="Guariní" class="w-10 h-10 inline-block">';
        const imagemAdversario = `./images/logos/${item.adversario}.png`;
        const logoAdversario = `<img src="${imagemAdversario}" onerror="this.src='./images/logos/noimage.png'" alt="${item.adversario}" class="w-10 h-10 inline-block">`;

        let time1, placar1, logo1, time2, placar2, logo2;

        if (item.resultado === "Vitória") {
            time1 = nossoTime;
            placar1 = item.placarNosso;
            logo1 = nossaLogo;
            time2 = item.adversario;
            placar2 = item.placarAdversario;
            logo2 = logoAdversario;
        } else if (item.resultado === "Derrota") {
            time1 = item.adversario;
            placar1 = item.placarAdversario;
            logo1 = logoAdversario;
            time2 = nossoTime;
            placar2 = item.placarNosso;
            logo2 = nossaLogo;
        } else {
            time1 = nossoTime;
            placar1 = item.placarNosso;
            logo1 = nossaLogo;
            time2 = item.adversario;
            placar2 = item.placarAdversario;
            logo2 = logoAdversario;
        }

        // Linha principal
        const novaLinha = document.createElement('tr');
        novaLinha.className = 'cursor-pointer hover:bg-gray-50';
        novaLinha.onclick = () => toggleExpansao(index);
        
        const celula = document.createElement('td');
        celula.className = "p-2 border-b group";
        
        // Conteúdo principal alinhado à esquerda
        const conteudoPrincipal = document.createElement('div');
        conteudoPrincipal.className = "inline-block";
        
        // Adiciona o formato após a data se existir
        const formatoTexto = item.formato ? ` (${item.formato})` : '';
        
        conteudoPrincipal.innerHTML = `${logo1} ${time1} <strong>${placar1}</strong> x <strong>${placar2}</strong> ${time2} ${logo2} <span class="text-gray-500 text-xs ml-2">(${item.dataRegistro})${formatoTexto}</span>`;
        
        // Botão de excluir alinhado à direita
        const botaoExcluir = document.createElement('button');
        botaoExcluir.innerHTML = '❌';
        botaoExcluir.className = 'float-right text-red-500 hover:text-red-700 text-xs ml-4';
        botaoExcluir.onclick = (e) => {
            e.stopPropagation();
            removerResultado(index);
        };
        
        celula.appendChild(conteudoPrincipal);
        celula.appendChild(botaoExcluir);
        novaLinha.appendChild(celula);
        tabela.appendChild(novaLinha);

        // Linha expandida (inicialmente oculta)
        const linhaExpandida = document.createElement('tr');
        linhaExpandida.id = `expandida-${index}`;
        linhaExpandida.className = 'hidden';
        
        const celulaExpandida = document.createElement('td');
        celulaExpandida.className = 'p-4 bg-gray-50 border-b';
        
        // Calcula o número total de jogos baseado no placar
        const totalJogos = item.placarNosso + item.placarAdversario;
        
        // Conteúdo da área expandida
        celulaExpandida.innerHTML = `
            <div class="bg-white p-4 rounded shadow-sm">
                <h4 class="font-bold text-sm mb-3">Composições dos Jogos (Total: ${totalJogos} jogos)</h4>
                <div id="jogos-${index}" class="space-y-3">
                    ${criarJogosHTML(totalJogos, index)}
                </div>
            </div>
        `;
        
        linhaExpandida.appendChild(celulaExpandida);
        tabela.appendChild(linhaExpandida);
    });
}

function criarJogosHTML(totalJogos, resultadoIndex) {
    let html = '';
    
    for (let i = 1; i <= totalJogos; i++) {
        html += `
            <div id="jogo-container-${resultadoIndex}-${i}" class="border-2 border-gray-300 p-3 rounded bg-gray-50 transition-all duration-300">
                <div class="text-sm font-medium mb-3">Jogo ${i}</div>
                
                <!-- Composições dos times -->
                <div class="flex items-center justify-center gap-4 mb-3">
                    <!-- Time 1 (Guariní) -->
                    <div class="text-center">
                        <div class="flex gap-1">
                            ${criarQuadradosComposicao(`guarini-jogo-${resultadoIndex}-${i}`)}
                        </div>
                    </div>
                    
                    <span class="font-bold text-lg">X</span>
                    
                    <!-- Time 2 (Adversário) -->
                    <div class="text-center">
                        <div class="flex gap-1">
                            ${criarQuadradosComposicao(`adversario-jogo-${resultadoIndex}-${i}`)}
                        </div>
                    </div>
                </div>
                
                <!-- Banimentos e Botões de Resultado (mesma linha) -->
                <div class="flex items-center justify-between relative">
                    <!-- Banimentos iniciais (extremidade esquerda) -->
                    <div class="flex gap-1">
                        ${criarQuadradosBanimento(`ban-inicio-${resultadoIndex}-${i}`, 2)}
                    </div>
                    
                    <!-- Botões de Resultado (centralizados absolutamente) -->
                    <div class="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                        <div id="botoes-resultado-${resultadoIndex}-${i}" class="flex gap-1">
                            <button onclick="marcarResultadoJogo(${resultadoIndex}, ${i}, 'vitoria')" 
                                    class="w-8 h-8 bg-green-500 hover:bg-green-600 text-white font-bold rounded text-xs transition-colors">
                                V
                            </button>
                            <button onclick="marcarResultadoJogo(${resultadoIndex}, ${i}, 'derrota')" 
                                    class="w-8 h-8 bg-red-500 hover:bg-red-600 text-white font-bold rounded text-xs transition-colors">
                                D
                            </button>
                        </div>
                        <div id="botao-remarcar-${resultadoIndex}-${i}" class="hidden">
                            <button onclick="remarcarResultadoJogo(${resultadoIndex}, ${i})" 
                                    class="px-2 py-1 bg-gray-500 hover:bg-gray-600 text-white text-xs rounded transition-colors">
                                Remarcar
                            </button>
                        </div>
                    </div>
                    
                    <!-- Banimentos finais (extremidade direita) -->
                    <div class="flex gap-1">
                        ${criarQuadradosBanimento(`ban-final-${resultadoIndex}-${i}`, 2)}
                    </div>
                </div>
            </div>
        `;
    }
    
    return html;
}

function criarQuadradosComposicao(prefixoId) {
    let html = '';
    
    for (let i = 1; i <= 5; i++) {
        html += `
            <div class="w-16 h-20 border-2 border-gray-300 rounded flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors p-1" 
                 id="${prefixoId}-${i}" 
                 onclick="selecionarComposicao('${prefixoId}-${i}')">
                <span class="text-gray-400 text-lg font-bold">+</span>
            </div>
        `;
    }
    
    return html;
}

function criarQuadradosBanimento(prefixoId, quantidade) {
    let html = '';
    
    for (let i = 1; i <= quantidade; i++) {
        html += `
            <div class="w-12 h-14 border-2 border-red-300 rounded flex flex-col items-center justify-center cursor-pointer hover:border-red-500 hover:bg-red-50 transition-colors p-1" 
                 id="${prefixoId}-${i}" 
                 onclick="selecionarBanimento('${prefixoId}-${i}')">
                <span class="text-red-400 text-xs font-bold">🚫</span>
            </div>
        `;
    }
    
    return html;
}

function toggleExpansao(index) {
    const linhaExpandida = document.getElementById(`expandida-${index}`);
    
    if (linhaExpandida.classList.contains('hidden')) {
        // Fecha todas as outras expansões antes de abrir esta
        document.querySelectorAll('[id^="expandida-"]').forEach(el => {
            if (el !== linhaExpandida) {
                el.classList.add('hidden');
            }
        });
        
        linhaExpandida.classList.remove('hidden');
    } else {
        linhaExpandida.classList.add('hidden');
    }
}

function selecionarComposicao(elementId) {
    const elemento = document.getElementById(elementId);
    
    if (!elemento) return;
    
    // Se já tem um Pokémon selecionado, abrir modal para trocar
    if (elemento.dataset.pokemon) {
        abrirModalPokemon(elementId, elemento.dataset.pokemon, false);
    } else {
        // Se está vazio, abrir modal para selecionar
        abrirModalPokemon(elementId, null, false);
    }
}

function selecionarBanimento(elementId) {
    const elemento = document.getElementById(elementId);
    
    if (!elemento) return;
    
    if (elemento.dataset.pokemon) {
        abrirModalPokemon(elementId, elemento.dataset.pokemon, true);
    } else {
        abrirModalPokemon(elementId, null, true);
    }
}

function abrirModalPokemon(elementId, pokemonAtual = null, isBanimento = false) {
    if (typeof pokemonBaseImages === 'undefined') {
        alert('Erro: util.js não carregado. Verifique se o arquivo está incluído no HTML.');
        return;
    }
    
    const modalExistente = document.getElementById('pokemon-modal');
    if (modalExistente) {
        modalExistente.remove();
    }
    
    const modal = document.createElement('div');
    modal.id = 'pokemon-modal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    
    const partes = elementId.split('-');
    const resultadoIndex = partes[partes.length - 3];
    const jogoIndex = partes[partes.length - 2];
    
    // Pokémons usados na composição (time)
    const pokemonsUsados = obterPokemonsUsadosNoJogo(resultadoIndex, jogoIndex);
    
    // Pokémons banidos neste jogo específico (todos os 4 banimentos)
    const pokemonsBanidosNesteJogo = obterPokemonsBanidosNoJogo(resultadoIndex, jogoIndex);
    
    const tituloModal = isBanimento ? 'Selecionar Pokémon para Banir' : 'Selecionar Pokémon';
    
    modal.innerHTML = `
        <div class="bg-white rounded-lg shadow-xl w-[480px] h-[500px] flex flex-col">
            <div class="p-4 border-b flex justify-between items-center shrink-0">
                <h3 class="text-xl font-bold">${tituloModal}</h3>
                <div class="flex gap-2">
                    ${pokemonAtual ? `<button onclick="removerPokemon('${elementId}', ${isBanimento})" class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Remover</button>` : ''}
                    <button onclick="fecharModalPokemon()" class="text-gray-500 hover:text-gray-700 text-2xl font-bold">&times;</button>
                </div>
            </div>
            <div class="p-3 overflow-y-auto flex-grow">
                <div class="grid grid-cols-8 gap-2">
                    ${Object.keys(pokemonBaseImages).map(pokemon => {
                        // Para composição: verificar se está em uso OU banido
                        // Para banimento: verificar se está banido OU em uso
                        const isUsado = pokemonsUsados.includes(pokemon) && pokemon !== pokemonAtual;
                        const isBanidoNesteJogo = pokemonsBanidosNesteJogo.includes(pokemon) && pokemon !== pokemonAtual;
                        
                        // Se estamos selecionando para composição, tanto usados quanto banidos ficam indisponíveis
                        // Se estamos selecionando para banimento, tanto banidos quanto usados ficam indisponíveis
                        const isIndisponivel = isUsado || isBanidoNesteJogo;
                        
                        let motivoIndisponibilidade = '';
                        if (isUsado) {
                            motivoIndisponibilidade = '<div class="text-xs text-red-500">Em uso</div>';
                        } else if (isBanidoNesteJogo) {
                            motivoIndisponibilidade = '<div class="text-xs text-red-500">Banido</div>';
                        }
                        
                        return `
                            <div class="text-center ${isIndisponivel ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'} p-2 rounded transition-all" 
                                 ${isIndisponivel ? '' : `onclick="${isBanimento ? 'selecionarPokemonParaBanimento' : 'selecionarPokemonParaComposicao'}('${elementId}', '${pokemon}')"`}>
                                <img src="./images/sprites/${pokemon}.png" 
                                     alt="${pokemon}" 
                                     class="w-12 h-12 mx-auto object-contain mb-1"
                                     onerror="this.src='./images/sprites/noimage.png'">
                                <div class="text-xs capitalize truncate">${pokemon.replace(/[-_]/g, ' ')}</div>
                                ${motivoIndisponibilidade}
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function obterPokemonsUsadosNoJogo(resultadoIndex, jogoIndex) {
    const pokemonsUsados = [];
    
    const prefixos = [
        `guarini-jogo-${resultadoIndex}-${jogoIndex}`,
        `adversario-jogo-${resultadoIndex}-${jogoIndex}`
    ];
    
    prefixos.forEach(prefixo => {
        for (let i = 1; i <= 5; i++) {
            const elemento = document.getElementById(`${prefixo}-${i}`);
            if (elemento && elemento.dataset.pokemon) {
                pokemonsUsados.push(elemento.dataset.pokemon);
            }
        }
    });
    
    return pokemonsUsados;
}

function obterPokemonsBanidosNoJogo(resultadoIndex, jogoIndex) {
    const pokemonsBanidos = [];
    
    // Verifica todos os 4 slots de banimento deste jogo
    const prefixosBanimentos = [
        `ban-inicio-${resultadoIndex}-${jogoIndex}`,
        `ban-final-${resultadoIndex}-${jogoIndex}`
    ];
    
    prefixosBanimentos.forEach(prefixo => {
        for (let i = 1; i <= 2; i++) {
            const elemento = document.getElementById(`${prefixo}-${i}`);
            if (elemento && elemento.dataset.pokemon) {
                pokemonsBanidos.push(elemento.dataset.pokemon);
            }
        }
    });
    
    return pokemonsBanidos;
}

function selecionarPokemonParaComposicao(elementId, pokemon) {
    const elemento = document.getElementById(elementId);
    if (!elemento) return;
    
    const partes = elementId.split('-');
    const resultadoIndex = partes[partes.length - 3];
    const jogoIndex = partes[partes.length - 2];
    
    // Verificar se o pokémon está em uso OU banido
    const pokemonsUsados = obterPokemonsUsadosNoJogo(resultadoIndex, jogoIndex);
    const pokemonsBanidosNesteJogo = obterPokemonsBanidosNoJogo(resultadoIndex, jogoIndex);
    
    if (pokemonsUsados.includes(pokemon)) {
        alert('Este Pokémon já está sendo usado neste jogo!');
        return;
    }
    
    if (pokemonsBanidosNesteJogo.includes(pokemon)) {
        alert('Este Pokémon foi banido neste jogo e não pode ser usado!');
        return;
    }
    
    elemento.innerHTML = `
        <img src="./images/sprites/${pokemon}.png" 
             alt="${pokemon}" 
             class="w-10 h-10 object-contain"
             onerror="this.src='./images/sprites/noimage.png'">
        <div class="text-xs capitalize truncate">${pokemon.replace(/[-_]/g, ' ')}</div>
    `;
    
    elemento.className = 'w-16 h-20 border-2 border-green-500 bg-green-50 rounded flex flex-col items-center justify-center p-1';
    elemento.dataset.pokemon = pokemon;
    
    salvarComposicao(resultadoIndex, jogoIndex, elementId, pokemon);
    fecharModalPokemon();
}

function selecionarPokemonParaBanimento(elementId, pokemon) {
    const elemento = document.getElementById(elementId);
    if (!elemento) return;
    
    const partes = elementId.split('-');
    const resultadoIndex = partes[partes.length - 3];
    const jogoIndex = partes[partes.length - 2];
    
    // Verificar se o pokémon já foi banido OU está em uso
    const pokemonsBanidosNesteJogo = obterPokemonsBanidosNoJogo(resultadoIndex, jogoIndex);
    const pokemonsUsados = obterPokemonsUsadosNoJogo(resultadoIndex, jogoIndex);
    
    if (pokemonsBanidosNesteJogo.includes(pokemon)) {
        alert('Este Pokémon já foi banido neste jogo!');
        return;
    }
    
    if (pokemonsUsados.includes(pokemon)) {
        alert('Este Pokémon está em uso na composição e não pode ser banido!');
        return;
    }
    
    elemento.innerHTML = `
        <div class="relative">
            <img src="./images/sprites/${pokemon}.png" 
                 alt="${pokemon}" 
                 class="w-10 h-10 object-contain filter grayscale"
                 onerror="this.src='./images/sprites/noimage.png'">
            <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-full h-0.5 bg-red-600 transform rotate-45"></div>
            </div>
        </div>
    `;
    
    elemento.className = 'w-12 h-14 border-2 border-red-500 bg-red-100 rounded flex flex-col items-center justify-center p-1';
    elemento.dataset.pokemon = pokemon;
    
    salvarComposicao(resultadoIndex, jogoIndex, elementId, pokemon);
    fecharModalPokemon();
}

function removerPokemon(elementId, isBanimento = false) {
    const elemento = document.getElementById(elementId);
    if (!elemento) return;
    
    if (isBanimento) {
        elemento.innerHTML = '<span class="text-red-400 text-xs font-bold">🚫</span>';
        elemento.className = 'w-12 h-14 border-2 border-red-300 rounded flex flex-col items-center justify-center cursor-pointer hover:border-red-500 hover:bg-red-50 transition-colors p-1';
    } else {
        elemento.innerHTML = '<span class="text-gray-400 text-lg font-bold">+</span>';
        elemento.className = 'w-16 h-20 border-2 border-gray-300 rounded flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors p-1';
    }
    
    delete elemento.dataset.pokemon;
    
    const partes = elementId.split('-');
    const resultadoIndex = partes[partes.length - 3];
    const jogoIndex = partes[partes.length - 2];
    removerDaComposicao(resultadoIndex, jogoIndex, elementId);
    
    fecharModalPokemon();
}

function fecharModalPokemon() {
    const modal = document.getElementById('pokemon-modal');
    if (modal) {
        modal.remove();
    }
}

function marcarResultadoJogo(resultadoIndex, jogoIndex, resultado) {
    const jogoContainer = document.getElementById(`jogo-container-${resultadoIndex}-${jogoIndex}`);
    const botoesResultado = document.getElementById(`botoes-resultado-${resultadoIndex}-${jogoIndex}`);
    const botaoRemarcar = document.getElementById(`botao-remarcar-${resultadoIndex}-${jogoIndex}`);
    
    if (!jogoContainer || !botoesResultado || !botaoRemarcar) return;
    
    // Aplica o estilo baseado no resultado
    if (resultado === 'vitoria') {
        jogoContainer.className = 'border-2 border-green-400 p-3 rounded bg-green-50 shadow-lg shadow-green-200 transition-all duration-300';
    } else if (resultado === 'derrota') {
        jogoContainer.className = 'border-2 border-red-400 p-3 rounded bg-red-50 shadow-lg shadow-red-200 transition-all duration-300';
    }
    
    // Esconde os botões V/D e mostra o botão de remarcar
    botoesResultado.classList.add('hidden');
    botaoRemarcar.classList.remove('hidden');
    
    // Salva o resultado do jogo
    salvarResultadoJogo(resultadoIndex, jogoIndex, resultado);
}

function remarcarResultadoJogo(resultadoIndex, jogoIndex) {
    const jogoContainer = document.getElementById(`jogo-container-${resultadoIndex}-${jogoIndex}`);
    const botoesResultado = document.getElementById(`botoes-resultado-${resultadoIndex}-${jogoIndex}`);
    const botaoRemarcar = document.getElementById(`botao-remarcar-${resultadoIndex}-${jogoIndex}`);
    
    if (!jogoContainer || !botoesResultado || !botaoRemarcar) return;
    
    // Volta ao estilo original
    jogoContainer.className = 'border-2 border-gray-300 p-3 rounded bg-gray-50 transition-all duration-300';
    
    // Mostra os botões V/D e esconde o botão de remarcar
    botoesResultado.classList.remove('hidden');
    botaoRemarcar.classList.add('hidden');
    
    // Remove o resultado salvo
    removerResultadoJogo(resultadoIndex, jogoIndex);
}

function salvarResultadoJogo(resultadoIndex, jogoIndex, resultado) {
    if (!composicoes[resultadoIndex]) {
        composicoes[resultadoIndex] = {};
    }
    if (!composicoes[resultadoIndex][jogoIndex]) {
        composicoes[resultadoIndex][jogoIndex] = {};
    }
    
    composicoes[resultadoIndex][jogoIndex]['resultado'] = resultado;
}

function removerResultadoJogo(resultadoIndex, jogoIndex) {
    if (composicoes[resultadoIndex] && composicoes[resultadoIndex][jogoIndex]) {
        delete composicoes[resultadoIndex][jogoIndex]['resultado'];
    }
}

function salvarComposicao(resultadoIndex, jogoIndex, elementId, pokemon) {
    if (!composicoes[resultadoIndex]) {
        composicoes[resultadoIndex] = {};
    }
    if (!composicoes[resultadoIndex][jogoIndex]) {
        composicoes[resultadoIndex][jogoIndex] = {};
    }
    
    composicoes[resultadoIndex][jogoIndex][elementId] = pokemon;
    // Não salva no localStorage - apenas em memória
}

function removerDaComposicao(resultadoIndex, jogoIndex, elementId) {
    if (composicoes[resultadoIndex] && composicoes[resultadoIndex][jogoIndex]) {
        delete composicoes[resultadoIndex][jogoIndex][elementId];
        
        if (Object.keys(composicoes[resultadoIndex][jogoIndex]).length === 0) {
            delete composicoes[resultadoIndex][jogoIndex];
        }
        
        if (Object.keys(composicoes[resultadoIndex]).length === 0) {
            delete composicoes[resultadoIndex];
        }
    }
    // Não salva no localStorage - apenas em memória
}

function removerResultado(index) {
    if (!confirm("Tem certeza que deseja excluir este resultado?")) return;

    const resultado = resultados[index];
    
    // Atualizar contadores
    if (resultado.resultado === "Vitória") {
        vitorias--;
    } else if (resultado.resultado === "Derrota") {
        derrotas--;
    } else {
        empates--;
    }

    // Remover o resultado do array
    resultados.splice(index, 1);
    
    // Atualizar a tabela
    reconstruirTabela();
    atualizarContadores();
    salvarPartidas();
}

// ==============================================
// FUNÇÕES PRINCIPAIS
// ==============================================

function adicionarResultado(placarMeuTime, placarAdversario, nomeAdversario, formato, externo = false) {
    if (!externo) {
        placarMeuTime = parseInt(document.getElementById('placarMeuTime').value);
        placarAdversario = parseInt(document.getElementById('placarAdversario').value);
        nomeAdversario = document.getElementById('nomeAdversario').value.trim();
        formato = document.getElementById('formatoScrim').value;

        if (isNaN(placarMeuTime) || isNaN(placarAdversario) || nomeAdversario === "") {
            alert("Preencha todos os campos corretamente!");
            return;
        }

        document.getElementById('placarMeuTime').value = '';
        document.getElementById('placarAdversario').value = '';
        document.getElementById('nomeAdversario').value = '';
        document.getElementById('formatoScrim').value = '2x2';
    }

    const nossoTime = "Guariní";
    const nossaLogo = '<img src="./images/backgrounds/Guarini.png" alt="Guariní" class="w-10 h-10 inline-block">';
    const imagemAdversario = `./images/logos/${nomeAdversario}.png`;
    const logoAdversario = `<img src="${imagemAdversario}" onerror="this.src='./images/logos/noimage.png'" alt="${nomeAdversario}" class="w-10 h-10 inline-block">`;
    const dataHoje = new Date().toLocaleDateString('pt-BR');

    let time1, placar1, logo1, time2, placar2, logo2;
    const resultado = placarMeuTime > placarAdversario ? "Vitória" :
                      placarMeuTime < placarAdversario ? "Derrota" : "Empate";

    if (resultado === "Vitória") {
        time1 = nossoTime;
        placar1 = placarMeuTime;
        logo1 = nossaLogo;
        time2 = nomeAdversario;
        placar2 = placarAdversario;
        logo2 = logoAdversario;
        vitorias++;
    } else if (resultado === "Derrota") {
        time1 = nomeAdversario;
        placar1 = placarAdversario;
        logo1 = logoAdversario;
        time2 = nossoTime;
        placar2 = placarMeuTime;
        logo2 = nossaLogo;
        derrotas++;
    } else {
        time1 = nossoTime;
        placar1 = placarMeuTime;
        logo1 = nossaLogo;
        time2 = nomeAdversario;
        placar2 = placarAdversario;
        logo2 = logoAdversario;
        empates++;
    }

    const novaLinha = document.createElement('tr');
    novaLinha.className = 'cursor-pointer hover:bg-gray-50';
    const novoIndice = resultados.length;
    novaLinha.onclick = () => toggleExpansao(novoIndice);
    
    const celula = document.createElement('td');
    celula.className = "p-2 border-b group text-sm";
    
    const conteudoPrincipal = document.createElement('div');
    conteudoPrincipal.className = "inline-block";
    
    const formatoTexto = formato ? ` (${formato})` : '';
    
    conteudoPrincipal.innerHTML = `${logo1} ${time1} <strong>${placar1}</strong> x <strong>${placar2}</strong> ${time2} ${logo2} <span class="text-gray-500 text-xs ml-2">(${dataHoje})${formatoTexto}</span>`;
    
    const botaoExcluir = document.createElement('button');
    botaoExcluir.innerHTML = '❌';
    botaoExcluir.className = 'float-right text-red-500 hover:text-red-700 text-xs ml-4';
    botaoExcluir.onclick = (e) => {
        e.stopPropagation();
        removerResultado(novoIndice);
    };
    celula.appendChild(conteudoPrincipal);
    celula.appendChild(botaoExcluir);
    novaLinha.appendChild(celula);
    document.getElementById('tabelaResultados').appendChild(novaLinha);

    const linhaExpandida = document.createElement('tr');
    linhaExpandida.id = `expandida-${novoIndice}`;
    linhaExpandida.className = 'hidden';
    
    const celulaExpandida = document.createElement('td');
    celulaExpandida.className = 'p-4 bg-gray-50 border-b';
    
    const totalJogos = placarMeuTime + placarAdversario;
    
    celulaExpandida.innerHTML = `
        <div class="bg-white p-4 rounded shadow-sm">
            <h4 class="font-bold text-sm mb-3">Composições dos Jogos (Total: ${totalJogos} jogos)</h4>
            <div id="jogos-${novoIndice}" class="space-y-3">
                ${criarJogosHTML(totalJogos, novoIndice)}
            </div>
        </div>
    `;
    
    linhaExpandida.appendChild(celulaExpandida);
    document.getElementById('tabelaResultados').appendChild(linhaExpandida);

    const resultadoObj = {
        time: nossoTime,
        placarNosso: placarMeuTime,
        placarAdversario: placarAdversario,
        adversario: nomeAdversario,
        resultado: resultado,
        dataRegistro: dataHoje,
        formato: formato || '2x2'
    };

    resultados.push(resultadoObj);
    atualizarContadores();
    salvarPartidas();
}

function atualizarContadores() {
    document.getElementById('winCount').textContent = vitorias;
    document.getElementById('drawCount').textContent = empates;
    document.getElementById('lossCount').textContent = derrotas;
}

function exportarResultados() {
    const agora = new Date();

    const dadosParaExportar = {
        metadata: {
            dataExportacao: agora.toLocaleDateString('pt-BR'),
            versao: "1.0",
            aplicacao: "Resultados Guariní"
        },
        estatisticas: {
            vitorias: vitorias,
            empates: empates,
            derrotas: derrotas,
            totalPartidas: resultados.length
        },
        partidas: resultados
    };

    const dataStr = JSON.stringify(dadosParaExportar, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `resultados-guarini-${agora.toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function exportarCSV() {
    const agora = new Date();
    let csvContent = "Time;Placar Nosso;Adversário;Placar Adversário;Resultado;Data;Formato\n";

    resultados.forEach(item => {
        csvContent += `"${item.time}";${item.placarNosso};"${item.adversario}";${item.placarAdversario};"${item.resultado}";"${item.dataRegistro}";"${item.formato || '2x2'}"\n`;
    });

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `resultados-guarini-${agora.toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function importarResultados(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            if (file.name.endsWith('.csv')) {
                const csvData = e.target.result;
                const linhas = csvData.split('\n');

                for (let i = 1; i < linhas.length; i++) {
                    if (!linhas[i]) continue;
                    const valores = linhas[i].split(/;(?![^"]*")/);
                    const item = {
                        time: valores[0].replace(/"/g, ''),
                        placarNosso: parseInt(valores[1]),
                        adversario: valores[2].replace(/"/g, ''),
                        placarAdversario: parseInt(valores[3]),
                        resultado: valores[4].replace(/"/g, ''),
                        dataRegistro: valores[5]?.replace(/"/g, '') || new Date().toLocaleDateString('pt-BR'),
                        formato: valores[6]?.replace(/"/g, '') || '2x2'
                    };
                    adicionarResultado(item.placarNosso, item.placarAdversario, item.adversario, item.formato, true);
                    resultados[resultados.length - 1].dataRegistro = item.dataRegistro;
                }
            } else {
                const dadosImportados = JSON.parse(e.target.result);
                const partidas = dadosImportados.partidas || [];

                resultados = [];
                vitorias = 0;
                empates = 0;
                derrotas = 0;
                composicoes = {};
                document.getElementById('tabelaResultados').innerHTML = '';

                partidas.forEach(item => {
                    resultados.push({
                        time: item.time,
                        placarNosso: item.placarNosso,
                        placarAdversario: item.placarAdversario,
                        adversario: item.adversario,
                        resultado: item.resultado,
                        dataRegistro: item.dataRegistro || new Date().toLocaleDateString('pt-BR'),
                        formato: item.formato || '2x2'
                    });

                    if (item.resultado === "Vitória") {
                        vitorias++;
                    } else if (item.resultado === "Derrota") {
                        derrotas++;
                    } else {
                        empates++;
                    }
                });

                reconstruirTabela();
                atualizarContadores();
            }
            event.target.value = '';
            salvarPartidas();
        } catch (err) {
            alert("Erro ao importar arquivo: " + err.message);
            event.target.value = '';
        }
    };

    reader.readAsText(file);
}

function limparResultados() {
    if (!confirm("Tem certeza que deseja limpar todos os dados?")) return;

    resultados = [];
    vitorias = 0;
    empates = 0;
    derrotas = 0;
    composicoes = {};
    localStorage.removeItem('scrimsData');
    document.getElementById('tabelaResultados').innerHTML = '';
    atualizarContadores();
}

// ==============================================
// INICIALIZAÇÃO
// ==============================================

document.addEventListener("DOMContentLoaded", function () {
    carregarPartidas(); // Carrega apenas as partidas salvas
    
    document.getElementById("botaoAdicionar").addEventListener("click", adicionarResultado);
    document.getElementById("botaoExportar").addEventListener("click", exportarResultados);
    document.getElementById("botaoExportarCSV").addEventListener("click", exportarCSV);
    document.getElementById("importarArquivo").addEventListener("change", importarResultados);
    document.getElementById("botaoLimpar").addEventListener("click", limparResultados);
});