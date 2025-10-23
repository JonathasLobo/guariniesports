// Variáveis globais
let vitorias = 0;
let empates = 0;
let derrotas = 0;
let resultados = [];
let composicoes = {};

// ID do documento no Firebase
const DOCUMENTO_ID = 'guarini-scrims';

// Flag para evitar loops de atualização
let atualizandoDoFirebase = false;

console.log("🎮 Script carregado!");

// ==============================================
// FUNÇÕES DE FIREBASE
// ==============================================

async function salvarNoFirebase() {
    if (atualizandoDoFirebase) {
        console.log("⏭️ Ignorando salvamento (atualização do Firebase em andamento)");
        return;
    }
    
    try {
        console.log("💾 SALVANDO NO FIREBASE...");
        console.log("📊 Dados:", { vitorias, empates, derrotas, totalResultados: resultados.length });
        
        const dados = {
            vitorias,
            empates,
            derrotas,
            resultados,
            ultimaAtualizacao: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        await db.collection('scrims').doc(DOCUMENTO_ID).set(dados);
        console.log("✅ DADOS SALVOS COM SUCESSO!");
        
    } catch (error) {
        console.error("❌ ERRO AO SALVAR:", error);
        console.error("Código:", error.code);
        console.error("Mensagem:", error.message);
        alert("Erro ao salvar dados. Verifique sua conexão.");
    }
}

async function carregarDoFirebase() {
    try {
        console.log("📥 CARREGANDO DO FIREBASE...");
        
        const doc = await db.collection('scrims').doc(DOCUMENTO_ID).get();
        
        if (doc.exists) {
            atualizandoDoFirebase = true;
            
            const dados = doc.data();
            vitorias = dados.vitorias || 0;
            empates = dados.empates || 0;
            derrotas = dados.derrotas || 0;
            resultados = dados.resultados || [];
            
            console.log("✅ DADOS CARREGADOS:", { vitorias, empates, derrotas, totalResultados: resultados.length });
            
            reconstruirTabela();
            atualizarContadores();
            
            atualizandoDoFirebase = false;
        } else {
            console.log("ℹ️ Nenhum dado encontrado no Firebase (primeira vez)");
        }
    } catch (error) {
        console.error("❌ ERRO AO CARREGAR:", error);
        alert("Erro ao carregar dados. Verifique sua conexão.");
        atualizandoDoFirebase = false;
    }
}

// Listener para atualizações em tempo real
function iniciarListenerTempoReal() {
    console.log("👂 Iniciando listener de tempo real...");
    
    db.collection('scrims').doc(DOCUMENTO_ID)
        .onSnapshot((doc) => {
            if (doc.exists && !atualizandoDoFirebase) {
                console.log("🔄 ATUALIZAÇÃO EM TEMPO REAL RECEBIDA!");
                
                atualizandoDoFirebase = true;
                
                const dados = doc.data();
                vitorias = dados.vitorias || 0;
                empates = dados.empates || 0;
                derrotas = dados.derrotas || 0;
                resultados = dados.resultados || [];
                
                reconstruirTabela();
                atualizarContadores();
                
                console.log("✅ Interface atualizada com novos dados");
                
                atualizandoDoFirebase = false;
            }
        }, (error) => {
            console.error("❌ Erro no listener:", error);
        });
}

// ==============================================
// FUNÇÕES DE INTERFACE
// ==============================================

function reconstruirTabela() {
    const tabela = document.getElementById('tabelaResultados');
    tabela.innerHTML = '';

    resultados.forEach((item, index) => {
        const nossoTime = "Guarini";
        const nossaLogo = '<img src="./images/backgrounds/Guarini.png" alt="Guarini" class="w-10 h-10 inline-block">';
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

        const novaLinha = document.createElement('tr');
        novaLinha.className = 'cursor-pointer hover:bg-gray-50';
        novaLinha.onclick = () => toggleExpansao(index);
        
        const celula = document.createElement('td');
        celula.className = "p-2 border-b group";
        
        const conteudoPrincipal = document.createElement('div');
        conteudoPrincipal.className = "inline-block";
        
        const formatoTexto = item.formato ? ` (${item.formato})` : '';
        conteudoPrincipal.innerHTML = `${logo1} ${time1} <strong>${placar1}</strong> x <strong>${placar2}</strong> ${time2} ${logo2} <span class="text-gray-500 text-xs ml-2">(${item.dataRegistro})${formatoTexto}</span>`;
        
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

        const linhaExpandida = document.createElement('tr');
        linhaExpandida.id = `expandida-${index}`;
        linhaExpandida.className = 'hidden';
        
        const celulaExpandida = document.createElement('td');
        celulaExpandida.className = 'p-4 bg-gray-50 border-b';
        
        const totalJogos = item.placarNosso + item.placarAdversario;
        
        celulaExpandida.innerHTML = `
            <div class="bg-white p-4 rounded shadow-sm">
                <h4 class="font-bold text-sm mb-3">Composições dos Jogos (Total: ${totalJogos} jogos)</h4>
                <div class="text-xs text-gray-500 italic mb-2">
                    ⚠️ As composições são salvas apenas localmente (não sincronizam entre usuários)
                </div>
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
            <div class="border p-3 rounded bg-gray-50">
                <div class="text-sm font-medium mb-2">Jogo ${i}</div>
                <div class="flex items-center justify-center gap-4">
                    <div class="flex gap-1">
                        ${criarQuadradosComposicao(`guarini-jogo-${resultadoIndex}-${i}`)}
                    </div>
                    <span class="font-bold text-lg">X</span>
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
                 onclick="alert('Função de composição desativada temporariamente')">
                <span class="text-gray-400 text-lg font-bold">+</span>
            </div>
        `;
    }
    return html;
}

function toggleExpansao(index) {
    const linhaExpandida = document.getElementById(`expandida-${index}`);
    
    if (linhaExpandida.classList.contains('hidden')) {
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

function atualizarContadores() {
    document.getElementById('winCount').textContent = vitorias;
    document.getElementById('drawCount').textContent = empates;
    document.getElementById('lossCount').textContent = derrotas;
}

// ==============================================
// FUNÇÕES PRINCIPAIS
// ==============================================

async function adicionarResultado(placarMeuTime, placarAdversario, nomeAdversario, formato, externo = false) {
    console.log("🎮 ADICIONANDO RESULTADO...");
    
    if (!externo) {
        placarMeuTime = parseInt(document.getElementById('placarMeuTime').value);
        placarAdversario = parseInt(document.getElementById('placarAdversario').value);
        nomeAdversario = document.getElementById('nomeAdversario').value.trim();
        formato = document.getElementById('formatoScrim').value;

        console.log("📝 Dados:", { placarMeuTime, placarAdversario, nomeAdversario, formato });

        if (isNaN(placarMeuTime) || isNaN(placarAdversario) || nomeAdversario === "") {
            alert("Preencha todos os campos corretamente!");
            return;
        }

        document.getElementById('placarMeuTime').value = '';
        document.getElementById('placarAdversario').value = '';
        document.getElementById('nomeAdversario').value = '';
        document.getElementById('formatoScrim').value = '2x2';
    }

    const nossoTime = "Guarini";
    const dataHoje = new Date().toLocaleDateString('pt-BR');
    const resultado = placarMeuTime > placarAdversario ? "Vitória" :
                      placarMeuTime < placarAdversario ? "Derrota" : "Empate";

    console.log("🏆 Resultado:", resultado);

    if (resultado === "Vitória") {
        vitorias++;
    } else if (resultado === "Derrota") {
        derrotas++;
    } else {
        empates++;
    }

    const resultadoObj = {
        time: nossoTime,
        placarNosso: placarMeuTime,
        placarAdversario: placarAdversario,
        adversario: nomeAdversario,
        resultado: resultado,
        dataRegistro: dataHoje,
        formato: formato || '2x2'
    };

    console.log("📦 Objeto criado:", resultadoObj);

    resultados.push(resultadoObj);
    
    console.log("📊 Total de resultados:", resultados.length);
    
    reconstruirTabela();
    atualizarContadores();
    
    console.log("💾 Salvando no Firebase...");
    await salvarNoFirebase();
    console.log("✅ Processo concluído!");
}

async function removerResultado(index) {
    if (!confirm("Tem certeza que deseja excluir este resultado?")) return;

    console.log("🗑️ Removendo resultado", index);

    const resultado = resultados[index];
    
    if (resultado.resultado === "Vitória") {
        vitorias--;
    } else if (resultado.resultado === "Derrota") {
        derrotas--;
    } else {
        empates--;
    }

    resultados.splice(index, 1);
    
    reconstruirTabela();
    atualizarContadores();
    await salvarNoFirebase();
}

function exportarResultados() {
    const agora = new Date();
    const dadosParaExportar = {
        metadata: {
            dataExportacao: agora.toLocaleDateString('pt-BR'),
            versao: "1.0",
            aplicacao: "Resultados Guarini"
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

async function importarResultados(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function(e) {
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
                    await adicionarResultado(item.placarNosso, item.placarAdversario, item.adversario, item.formato, true);
                    resultados[resultados.length - 1].dataRegistro = item.dataRegistro;
                }
            } else {
                const dadosImportados = JSON.parse(e.target.result);
                const partidas = dadosImportados.partidas || [];

                resultados = [];
                vitorias = 0;
                empates = 0;
                derrotas = 0;

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
            await salvarNoFirebase();
        } catch (err) {
            alert("Erro ao importar arquivo: " + err.message);
            event.target.value = '';
        }
    };

    reader.readAsText(file);
}

async function limparResultados() {
    if (!confirm("Tem certeza que deseja limpar todos os dados?")) return;

    resultados = [];
    vitorias = 0;
    empates = 0;
    derrotas = 0;
    composicoes = {};

    document.getElementById('tabelaResultados').innerHTML = '';
    atualizarContadores();
    await salvarNoFirebase();
}

// ==============================================
// INICIALIZAÇÃO
// ==============================================

document.addEventListener("DOMContentLoaded", async function () {
    console.log("🚀 Iniciando aplicação...");
    
    // Aguarda o Firebase estar disponível
    if (typeof firebase === 'undefined' || typeof db === 'undefined') {
        console.error("❌ Firebase não está carregado!");
        alert("Erro: Firebase não inicializado. Verifique o HTML.");
        return;
    }
    
    console.log("✅ Firebase disponível");
    
    // Carrega dados iniciais
    await carregarDoFirebase();
    
    // Inicia listener para atualizações em tempo real
    iniciarListenerTempoReal();

    // Eventos dos botões
    document.getElementById("botaoAdicionar").addEventListener("click", adicionarResultado);
    document.getElementById("botaoExportar").addEventListener("click", exportarResultados);
    document.getElementById("botaoExportarCSV").addEventListener("click", exportarCSV);
    document.getElementById("importarArquivo").addEventListener("change", importarResultados);
    document.getElementById("botaoLimpar").addEventListener("click", limparResultados);
    
    console.log("✅ Aplicação iniciada!");
});