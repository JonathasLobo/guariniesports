// scrims-result.js - Versão com Firebase
import { db } from './firebase-config.js';
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc,
  onSnapshot,
  query,
  orderBy 
} from 'firebase/firestore';

// Variáveis globais
let vitorias = 0;
let empates = 0;
let derrotas = 0;
let resultados = [];

// Armazena as composições de cada jogo (apenas em memória)
let composicoes = {};

// Referência para a coleção no Firestore
const scrimsCollection = collection(db, 'scrims');
const guariniScrimsDoc = 'guarini-scrims'; // ID do documento principal

// ==============================================
// FUNÇÕES DE PERSISTÊNCIA (Firebase)
// ==============================================

// Listener em tempo real para sincronizar dados
function iniciarListenerFirebase() {
  const q = query(collection(db, 'scrims', guariniScrimsDoc, 'resultados'), orderBy('timestamp', 'desc'));
  
  onSnapshot(q, (snapshot) => {
    resultados = [];
    vitorias = 0;
    empates = 0;
    derrotas = 0;
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      resultados.push({
        id: doc.id,
        ...data
      });
      
      // Atualiza contadores
      if (data.resultado === "Vitória") {
        vitorias++;
      } else if (data.resultado === "Derrota") {
        derrotas++;
      } else {
        empates++;
      }
    });
    
    reconstruirTabela();
    atualizarContadores();
  }, (error) => {
    console.error("Erro ao escutar mudanças:", error);
    alert("Erro ao sincronizar com Firebase. Verifique a conexão.");
  });
}

async function salvarPartidaNoFirebase(partidaData) {
  try {
    const docRef = await addDoc(collection(db, 'scrims', guariniScrimsDoc, 'resultados'), {
      ...partidaData,
      timestamp: new Date().getTime()
    });
    
    console.log("Partida salva com ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Erro ao salvar partida:", error);
    alert("Erro ao salvar no Firebase: " + error.message);
    return null;
  }
}

async function removerPartidaDoFirebase(partidaId) {
  try {
    await deleteDoc(doc(db, 'scrims', guariniScrimsDoc, 'resultados', partidaId));
    console.log("Partida removida com sucesso");
  } catch (error) {
    console.error("Erro ao remover partida:", error);
    alert("Erro ao remover do Firebase: " + error.message);
  }
}

async function carregarPartidasDoFirebase() {
  try {
    const q = query(collection(db, 'scrims', guariniScrimsDoc, 'resultados'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    
    resultados = [];
    vitorias = 0;
    empates = 0;
    derrotas = 0;
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      resultados.push({
        id: doc.id,
        ...data
      });
      
      if (data.resultado === "Vitória") {
        vitorias++;
      } else if (data.resultado === "Derrota") {
        derrotas++;
      } else {
        empates++;
      }
    });
    
    reconstruirTabela();
    atualizarContadores();
  } catch (error) {
    console.error("Erro ao carregar partidas:", error);
    alert("Erro ao carregar do Firebase: " + error.message);
  }
}

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

    // Linha principal
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
    botaoExcluir.innerHTML = '✕';
    botaoExcluir.className = 'float-right text-red-500 hover:text-red-700 text-xs ml-4';
    botaoExcluir.onclick = (e) => {
      e.stopPropagation();
      removerResultado(item.id);
    };
    
    celula.appendChild(conteudoPrincipal);
    celula.appendChild(botaoExcluir);
    novaLinha.appendChild(celula);
    tabela.appendChild(novaLinha);

    // Linha expandida
    const linhaExpandida = document.createElement('tr');
    linhaExpandida.id = `expandida-${index}`;
    linhaExpandida.className = 'hidden';
    
    const celulaExpandida = document.createElement('td');
    celulaExpandida.className = 'p-4 bg-gray-50 border-b';
    
    const totalJogos = item.placarNosso + item.placarAdversario;
    
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
        
        <div class="flex items-center justify-center gap-4 mb-3">
          <div class="text-center">
            <div class="flex gap-1">
              ${criarQuadradosComposicao(`guarini-jogo-${resultadoIndex}-${i}`)}
            </div>
          </div>
          
          <span class="font-bold text-lg">X</span>
          
          <div class="text-center">
            <div class="flex gap-1">
              ${criarQuadradosComposicao(`adversario-jogo-${resultadoIndex}-${i}`)}
            </div>
          </div>
        </div>
        
        <div class="flex items-center justify-between relative">
          <div class="flex gap-1">
            ${criarQuadradosBanimento(`ban-inicio-${resultadoIndex}-${i}`, 2)}
          </div>
          
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

async function removerResultado(partidaId) {
  if (!confirm("Tem certeza que deseja excluir este resultado?")) return;
  
  await removerPartidaDoFirebase(partidaId);
}

// ==============================================
// FUNÇÕES PRINCIPAIS
// ==============================================

async function adicionarResultado(placarMeuTime, placarAdversario, nomeAdversario, formato, externo = false) {
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

  const dataHoje = new Date().toLocaleDateString('pt-BR');
  const resultado = placarMeuTime > placarAdversario ? "Vitória" :
                    placarMeuTime < placarAdversario ? "Derrota" : "Empate";

  const resultadoObj = {
    time: "Guarini",
    placarNosso: placarMeuTime,
    placarAdversario: placarAdversario,
    adversario: nomeAdversario,
    resultado: resultado,
    dataRegistro: dataHoje,
    formato: formato || '2x2'
  };

  await salvarPartidaNoFirebase(resultadoObj);
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

async function limparResultados() {
  if (!confirm("Tem certeza que deseja limpar todos os dados?")) return;

  try {
    const querySnapshot = await getDocs(collection(db, 'scrims', guariniScrimsDoc, 'resultados'));
    
    const deletePromises = [];
    querySnapshot.forEach((doc) => {
      deletePromises.push(deleteDoc(doc.ref));
    });
    
    await Promise.all(deletePromises);
    
    resultados = [];
    vitorias = 0;
    empates = 0;
    derrotas = 0;
    composicoes = {};
    
    reconstruirTabela();
    atualizarContadores();
    
    alert("Todos os dados foram removidos com sucesso!");
  } catch (error) {
    console.error("Erro ao limpar dados:", error);
    alert("Erro ao limpar dados: " + error.message);
  }
}

// Funções globais para os botões HTML
window.selecionarComposicao = function(elementId) {
  // ... (mantenha a implementação existente)
};

window.selecionarBanimento = function(elementId) {
  // ... (mantenha a implementação existente)
};

window.marcarResultadoJogo = function(resultadoIndex, jogoIndex, resultado) {
  // ... (mantenha a implementação existente)
};

window.remarcarResultadoJogo = function(resultadoIndex, jogoIndex) {
  // ... (mantenha a implementação existente)
};

// ==============================================
// INICIALIZAÇÃO
// ==============================================

document.addEventListener("DOMContentLoaded", async function () {
  // Carrega os dados do Firebase
  await carregarPartidasDoFirebase();
  
  // Inicia o listener para sincronização em tempo real
  iniciarListenerFirebase();
  
  document.getElementById("botaoAdicionar").addEventListener("click", adicionarResultado);
  document.getElementById("botaoExportar").addEventListener("click", exportarResultados);
  document.getElementById("botaoExportarCSV").addEventListener("click", exportarCSV);
  document.getElementById("botaoLimpar").addEventListener("click", limparResultados);
});