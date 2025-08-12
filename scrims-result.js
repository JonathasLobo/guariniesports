// Variáveis globais
let vitorias = 0;
let empates = 0;
let derrotas = 0;
let resultados = [];

// Armazena as composições de cada jogo
let composicoes = {};

// ==============================================
// FUNÇÕES DE PERSISTÊNCIA (localStorage)
// ==============================================

function salvarDados() {
    const dados = {
        vitorias,
        empates,
        derrotas,
        resultados
    };
    localStorage.setItem('scrimsData', JSON.stringify(dados));
}

function carregarDados() {
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
    
    // Restaurar composições salvas após um breve delay para garantir que os elementos foram criados
    setTimeout(restaurarComposicoes, 100);
}

function restaurarComposicoes() {
    Object.keys(composicoes).forEach(resultadoIndex => {
        Object.keys(composicoes[resultadoIndex]).forEach(jogoIndex => {
            Object.keys(composicoes[resultadoIndex][jogoIndex]).forEach(elementId => {
                const pokemon = composicoes[resultadoIndex][jogoIndex][elementId];
                const elemento = document.getElementById(elementId);
                
                if (elemento) {
                    elemento.innerHTML = `
                        <img src="./images/sprites/${pokemon}.png" 
                             alt="${pokemon}" 
                             class="w-10 h-10 object-contain"
                             onerror="this.src='./images/sprites/noimage.png'">
                        <div class="text-xs text-center capitalize truncate mt-1">${pokemon.replace(/[-_]/g, ' ')}</div>
                    `;
                    
                    elemento.dataset.pokemon = pokemon;
                    elemento.classList.remove('border-gray-300', 'hover:border-blue-400', 'hover:bg-blue-50');
                    elemento.classList.add('border-green-500', 'bg-green-50');
                }
            });
        });
    });
}

function criarJogosHTML(totalJogos, resultadoIndex) {
    let html = '';
    
    for (let i = 1; i <= totalJogos; i++) {
        html += `
            <div class="border p-3 rounded bg-gray-50">
                <div class="text-sm font-medium mb-2">Jogo ${i}</div>
                <div class="flex items-center justify-center gap-4">
                    <!-- Time 1 (Guariní) -->
                    <div class="flex gap-1">
                        ${criarQuadradosComposicao(`guarini-jogo-${resultadoIndex}-${i}`)}
                    </div>
                    
                    <span class="font-bold text-lg">X</span>
                    
                    <!-- Time 2 (Adversário) -->
                    <div class="flex gap-1">
                        ${criarQuadradosComposicao(`adversario-jogo-${resultadoIndex}-${i}`)}
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
        abrirModalPokemon(elementId, elemento.dataset.pokemon);
    } else {
        // Se está vazio, abrir modal para selecionar
        abrirModalPokemon(elementId);
    }
}

function abrirModalPokemon(elementId, pokemonAtual = null) {
    // Verifica se util.js foi carregado e se pokemonBaseImages está disponível
    if (typeof pokemonBaseImages === 'undefined') {
        alert('Erro: util.js não carregado. Verifique se o arquivo está incluído no HTML.');
        return;
    }
    
    // Remove modal existente se houver
    const modalExistente = document.getElementById('pokemon-modal');
    if (modalExistente) {
        modalExistente.remove();
    }
    
    // Cria o modal
    const modal = document.createElement('div');
    modal.id = 'pokemon-modal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    
    // Obter Pokémons já selecionados neste jogo
    const resultadoIndex = elementId.split('-')[2];
    const jogoIndex = elementId.split('-')[3];
    const pokemonsUsados = obterPokemonsUsadosNoJogo(resultadoIndex, jogoIndex);
    
    modal.innerHTML = `
        <div class="bg-white rounded-lg shadow-xl w-96 h-96 flex flex-col">
            <div class="p-3 border-b flex justify-between items-center shrink-0">
                <h3 class="text-lg font-bold">Selecionar Pokémon</h3>
                <div class="flex gap-2">
                    ${pokemonAtual ? `<button onclick="removerPokemon('${elementId}')" class="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600">Remover</button>` : ''}
                    <button onclick="fecharModalPokemon()" class="text-gray-500 hover:text-gray-700 text-xl font-bold">&times;</button>
                </div>
            </div>
            <div class="p-2 overflow-y-auto flex-grow">
                <div class="grid grid-cols-6 gap-1">
                    ${Object.keys(pokemonBaseImages).map(pokemon => {
                        const isUsado = pokemonsUsados.includes(pokemon) && pokemon !== pokemonAtual;
                        return `
                            <div class="text-center ${isUsado ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'} p-1 rounded transition-all" 
                                 ${isUsado ? '' : `onclick="selecionarPokemon('${elementId}', '${pokemon}')"`}>
                                <img src="./images/sprites/${pokemon}.png" 
                                     alt="${pokemon}" 
                                     class="w-10 h-10 mx-auto object-contain mb-1"
                                     onerror="this.src='./images/sprites/noimage.png'">
                                <div class="text-xs capitalize truncate">${pokemon.replace(/[-_]/g, ' ')}</div>
                                ${isUsado ? '<div class="text-xs text-red-500">Em uso</div>' : ''}
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
    
    // Verifica todos os quadrados do jogo atual
    for (let i = 1; i <= 5; i++) {
        // Time Guariní
        const elemGuarini = document.getElementById(`guarini-jogo-${resultadoIndex}-${jogoIndex}-${i}`);
        if (elemGuarini && elemGuarini.dataset.pokemon) {
            pokemonsUsados.push(elemGuarini.dataset.pokemon);
        }
        
        // Time Adversário
        const elemAdversario = document.getElementById(`adversario-jogo-${resultadoIndex}-${jogoIndex}-${i}`);
        if (elemAdversario && elemAdversario.dataset.pokemon) {
            pokemonsUsados.push(elemAdversario.dataset.pokemon);
        }
    }
    
    return pokemonsUsados;
}

function selecionarPokemon(elementId, pokemon) {
    const elemento = document.getElementById(elementId);
    if (!elemento) return;
    
    // Verifica se o Pokémon já está em uso neste jogo
    const resultadoIndex = elementId.split('-')[2];
    const jogoIndex = elementId.split('-')[3];
    const pokemonsUsados = obterPokemonsUsadosNoJogo(resultadoIndex, jogoIndex);
    
    if (pokemonsUsados.includes(pokemon)) {
        alert('Este Pokémon já está sendo usado neste jogo!');
        return;
    }
    
    // Atualiza o elemento com imagem e nome
    elemento.innerHTML = `
        <img src="./images/sprites/${pokemon}.png" 
             alt="${pokemon}" 
             class="w-10 h-10 object-contain"
             onerror="this.src='./images/sprites/noimage.png'">
        <div class="text-xs text-center capitalize truncate mt-1">${pokemon.replace(/[-_]/g, ' ')}</div>
    `;
    
    elemento.dataset.pokemon = pokemon;
    elemento.classList.remove('border-gray-300', 'hover:border-blue-400', 'hover:bg-blue-50');
    elemento.classList.add('border-green-500', 'bg-green-50');
    
    // Salva a composição
    salvarComposicao(resultadoIndex, jogoIndex, elementId, pokemon);
    
    fecharModalPokemon();
}

function removerPokemon(elementId) {
    const elemento = document.getElementById(elementId);
    if (!elemento) return;
    
    // Volta ao estado original
    elemento.innerHTML = '<span class="text-gray-400 text-lg font-bold">+</span>';
    delete elemento.dataset.pokemon;
    elemento.classList.remove('border-green-500', 'bg-green-50');
    elemento.classList.add('border-gray-300', 'hover:border-blue-400', 'hover:bg-blue-50');
    
    // Remove da composição salva
    const resultadoIndex = elementId.split('-')[2];
    const jogoIndex = elementId.split('-')[3];
    removerDaComposicao(resultadoIndex, jogoIndex, elementId);
    
    fecharModalPokemon();
}

function fecharModalPokemon() {
    const modal = document.getElementById('pokemon-modal');
    if (modal) {
        modal.remove();
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
    
    // Salva no localStorage
    localStorage.setItem('composicoes', JSON.stringify(composicoes));
}

function removerDaComposicao(resultadoIndex, jogoIndex, elementId) {
    if (composicoes[resultadoIndex] && composicoes[resultadoIndex][jogoIndex]) {
        delete composicoes[resultadoIndex][jogoIndex][elementId];
        
        // Se o jogo ficou vazio, remove o jogo
        if (Object.keys(composicoes[resultadoIndex][jogoIndex]).length === 0) {
            delete composicoes[resultadoIndex][jogoIndex];
        }
        
        // Se o resultado ficou vazio, remove o resultado
        if (Object.keys(composicoes[resultadoIndex]).length === 0) {
            delete composicoes[resultadoIndex];
        }
    }
    
    // Salva no localStorage
    localStorage.setItem('composicoes', JSON.stringify(composicoes));
}

function carregarComposicoes() {
    const composicoesSalvas = localStorage.getItem('composicoes');
    if (composicoesSalvas) {
        composicoes = JSON.parse(composicoesSalvas);
    }
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
    
    // Atualizar a tabela e salvar
    reconstruirTabela();
    atualizarContadores();
    salvarDados();
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
        document.getElementById('formatoScrim').value = '2x2'; // Reset para valor padrão
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
    const novoIndice = resultados.length; // Armazena o índice antes de adicionar
    novaLinha.onclick = () => toggleExpansao(novoIndice);
    
    const celula = document.createElement('td');
    celula.className = "p-2 border-b group text-sm";
    
    // Conteúdo principal
    const conteudoPrincipal = document.createElement('div');
    conteudoPrincipal.className = "inline-block";
    
    // Adiciona o formato após a data
    const formatoTexto = formato ? ` (${formato})` : '';
    
    conteudoPrincipal.innerHTML = `${logo1} ${time1} <strong>${placar1}</strong> x <strong>${placar2}</strong> ${time2} ${logo2} <span class="text-gray-500 text-xs ml-2">(${dataHoje})${formatoTexto}</span>`;
    
    // Botão de excluir
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

    // Criar linha expandida para o novo resultado
    const linhaExpandida = document.createElement('tr');
    linhaExpandida.id = `expandida-${novoIndice}`;
    linhaExpandida.className = 'hidden';
    
    const celulaExpandida = document.createElement('td');
    celulaExpandida.className = 'p-4 bg-gray-50 border-b';
    
    // Calcula o número total de jogos baseado no placar
    const totalJogos = placarMeuTime + placarAdversario;
    
    // Conteúdo da área expandida
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
        formato: formato || '2x2' // Valor padrão se não especificado
    };

    resultados.push(resultadoObj);
    atualizarContadores();
    salvarDados();
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
                    // Atualiza a data do último resultado adicionado com a data do arquivo
                    resultados[resultados.length - 1].dataRegistro = item.dataRegistro;
                }
            } else {
                const dadosImportados = JSON.parse(e.target.result);
                const partidas = dadosImportados.partidas || [];

                // Limpa os resultados atuais antes de importar os novos
                resultados = [];
                vitorias = 0;
                empates = 0;
                derrotas = 0;
                document.getElementById('tabelaResultados').innerHTML = '';

                partidas.forEach(item => {
                    // Adiciona o resultado mantendo todas as propriedades originais
                    resultados.push({
                        time: item.time,
                        placarNosso: item.placarNosso,
                        placarAdversario: item.placarAdversario,
                        adversario: item.adversario,
                        resultado: item.resultado,
                        dataRegistro: item.dataRegistro || new Date().toLocaleDateString('pt-BR'),
                        formato: item.formato || '2x2'
                    });

                    // Atualiza os contadores
                    if (item.resultado === "Vitória") {
                        vitorias++;
                    } else if (item.resultado === "Derrota") {
                        derrotas++;
                    } else {
                        empates++;
                    }
                });

                // Reconstroi a tabela e atualiza os contadores
                reconstruirTabela();
                atualizarContadores();
            }
            event.target.value = '';
            salvarDados();
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

    localStorage.removeItem('scrimsData');
    document.getElementById('tabelaResultados').innerHTML = '';
    atualizarContadores();
}

// ==============================================
// INICIALIZAÇÃO
// ==============================================

document.addEventListener("DOMContentLoaded", function () {
    carregarDados();
    carregarComposicoes();

    document.getElementById("botaoAdicionar").addEventListener("click", adicionarResultado);
    document.getElementById("botaoExportar").addEventListener("click", exportarResultados);
    document.getElementById("botaoExportarCSV").addEventListener("click", exportarCSV);
    document.getElementById("importarArquivo").addEventListener("change", importarResultados);
    document.getElementById("botaoLimpar").addEventListener("click", limparResultados);
});