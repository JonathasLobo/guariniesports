// Variáveis globais
let vitorias = 0;
let empates = 0;
let derrotas = 0;
let resultados = [];

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
        const nossaLogo = '<img src="./logos/Guarini.png" alt="Guariní" class="w-10 h-10 inline-block">';
        const imagemAdversario = `./logos/${item.adversario}.png`;
        const logoAdversario = `<img src="${imagemAdversario}" onerror="this.src='./logos/noimage.png'" alt="${item.adversario}" class="w-10 h-10 inline-block">`;

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

        const novaLinha = document.createElement('tr');
        const celula = document.createElement('td');
        celula.className = "p-2 border-b group";
        
        // Conteúdo principal alinhado à esquerda
        const conteudoPrincipal = document.createElement('div');
        conteudoPrincipal.className = "inline-block";
        conteudoPrincipal.innerHTML = `${logo1} ${time1} <strong>${placar1}</strong> x <strong>${placar2}</strong> ${time2} ${logo2} <span class="text-gray-500 text-xs ml-2">(${item.dataRegistro})</span>`;
        
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
    });
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

function adicionarResultado(placarMeuTime, placarAdversario, nomeAdversario, externo = false) {
    if (!externo) {
        placarMeuTime = parseInt(document.getElementById('placarMeuTime').value);
        placarAdversario = parseInt(document.getElementById('placarAdversario').value);
        nomeAdversario = document.getElementById('nomeAdversario').value.trim();

        if (isNaN(placarMeuTime) || isNaN(placarAdversario) || nomeAdversario === "") {
            alert("Preencha todos os campos corretamente!");
            return;
        }

        document.getElementById('placarMeuTime').value = '';
        document.getElementById('placarAdversario').value = '';
        document.getElementById('nomeAdversario').value = '';
    }

    const nossoTime = "Guariní";
    const nossaLogo = '<img src="./logos/Guarini.png" alt="Guariní" class="w-10 h-10 inline-block">';
    const imagemAdversario = `./logos/${nomeAdversario}.png`;
    const logoAdversario = `<img src="${imagemAdversario}" onerror="this.src='./logos/noimage.png'" alt="${nomeAdversario}" class="w-10 h-10 inline-block">`;
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
    const celula = document.createElement('td');
    celula.className = "p-2 border-b group text-sm";
    
    // Conteúdo principal
    const conteudoPrincipal = document.createElement('div');
    conteudoPrincipal.className = "inline-block";
    conteudoPrincipal.innerHTML = `${logo1} ${time1} <strong>${placar1}</strong> x <strong>${placar2}</strong> ${time2} ${logo2} <span class="text-gray-500 text-xs ml-2">(${dataHoje})</span>`;
    
    // Botão de excluir
    const botaoExcluir = document.createElement('button');
    botaoExcluir.innerHTML = '❌';
    botaoExcluir.className = 'float-right text-red-500 hover:text-red-700 text-xs ml-4';
    const novoIndice = resultados.length; // Armazena o índice antes de adicionar
    botaoExcluir.onclick = (e) => {
        e.stopPropagation();
        removerResultado(novoIndice);
    };
    celula.appendChild(conteudoPrincipal);
    celula.appendChild(botaoExcluir);
    novaLinha.appendChild(celula);
    document.getElementById('tabelaResultados').appendChild(novaLinha);

    const resultadoObj = {
        time: nossoTime,
        placarNosso: placarMeuTime,
        placarAdversario: placarAdversario,
        adversario: nomeAdversario,
        resultado: resultado,
        dataRegistro: dataHoje
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
    let csvContent = "Time;Placar Nosso;Adversário;Placar Adversário;Resultado;Data\n";

    resultados.forEach(item => {
        csvContent += `"${item.time}";${item.placarNosso};"${item.adversario}";${item.placarAdversario};"${item.resultado}";"${item.dataRegistro}"\n`;
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
                        dataRegistro: valores[5]?.replace(/"/g, '') || new Date().toLocaleDateString('pt-BR')
                    };
                    adicionarResultado(item.placarNosso, item.placarAdversario, item.adversario, true);
                    resultados[resultados.length - 1].dataRegistro = item.dataRegistro;
                }
            } else {
                const dadosImportados = JSON.parse(e.target.result);
                const partidas = dadosImportados.partidas || [];

                partidas.forEach(item => {
                    adicionarResultado(item.placarNosso, item.placarAdversario, item.adversario, true);
                    resultados[resultados.length - 1].dataRegistro = item.dataRegistro || new Date().toLocaleDateString('pt-BR');
                });
            }
            event.target.value = '';
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

    document.getElementById("botaoAdicionar").addEventListener("click", adicionarResultado);
    document.getElementById("botaoExportar").addEventListener("click", exportarResultados);
    document.getElementById("botaoExportarCSV").addEventListener("click", exportarCSV);
    document.getElementById("importarArquivo").addEventListener("change", importarResultados);
    document.getElementById("botaoLimpar").addEventListener("click", limparResultados);
});