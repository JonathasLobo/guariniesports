// ================================================
// CARREGAR NOTÍCIAS NO INDEX - GUARINI E-SPORT
// ================================================

import { 
  getFirestore, 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs 
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// 🔥 NÃO inicializar Firebase aqui - ele já foi inicializado no index.html
const db = getFirestore();

// ===== FORMATAR DATA =====
function formatarDataNoticia(timestamp) {
  if (!timestamp) return 'Data não disponível';
  
  const data = timestamp.toDate();
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  
  return `${dia}/${mes}/${ano}`;
}

// ===== OBTER CLASSE DA BANDEIRA DO IDIOMA =====
function obterClasseBandeira(idioma) {
  const bandeiras = {
    'pt-BR': 'flag-br',
    'en': 'flag-us',
    'ja': 'flag-jp'
  };
  
  return bandeiras[idioma] || 'flag-br'; // Default: Brasil
}

// ===== OBTER NOME DO IDIOMA =====
function obterNomeIdioma(idioma) {
  const nomes = {
    'pt-BR': 'Português',
    'en': 'English',
    'ja': '日本語'
  };
  
  return nomes[idioma] || 'Português';
}

// ===== CRIAR CARD DE NOTÍCIA - 🔥 COM BANDEIRAS CSS =====
function criarCardNoticia(noticia) {
  const titulo = noticia.titulo || 'Sem título';
  const imagem = noticia.imagemPrincipal || './noticias/img-noticias/placeholder.jpg';
  const link = `./noticias/ler-noticia.html?id=${noticia.id}`;
  const dataFormatada = formatarDataNoticia(noticia.dataPublicacao);
  const autorNome = noticia.autorNome || 'Autor desconhecido';
  const idioma = noticia.idioma || 'pt-BR';
  const classeBandeira = obterClasseBandeira(idioma);
  const nomeIdioma = obterNomeIdioma(idioma);
  
  return `
    <div class="noticia-card-horizontal">
      <div class="noticia-imagem-horizontal">
        <img src="${imagem}" alt="${titulo}" onerror="this.src='./noticias/img-noticias/placeholder.jpg'">
      </div>
      <div class="noticia-conteudo-horizontal">
        <h3>${titulo}</h3>
        <div class="noticia-meta">
          <span>📅 ${dataFormatada}</span>
          <span>👤 ${autorNome}</span>
          <span class="noticia-idioma" title="${nomeIdioma}">
            <span class="flag ${classeBandeira}"></span>
          </span>
        </div>
        <a href="${link}" class="noticia-link">Leia mais →</a>
      </div>
    </div>
  `;
}

// ===== EXTRAIR RESUMO DO CONTEÚDO =====
function extrairResumo(html) {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  const texto = temp.textContent || temp.innerText || '';
  
  // Pegar primeiras 150 caracteres
  if (texto.length > 150) {
    return texto.substring(0, 150) + '...';
  }
  
  return texto;
}

// ===== RENDERIZAR NOTÍCIAS =====
function renderizarNoticias(noticias) {
  const colunasContainer = document.querySelector('.noticias-colunas');
  
  if (!colunasContainer) {
    console.error('❌ Container de notícias não encontrado');
    return;
  }
  
  // Limpar conteúdo atual
  colunasContainer.innerHTML = '';
  
  // Dividir em duas colunas
  const metade = Math.ceil(noticias.length / 2);
  const colunaEsquerda = noticias.slice(0, metade);
  const colunaDireita = noticias.slice(metade);
  
  // Criar coluna esquerda
  const divColunaEsquerda = document.createElement('div');
  divColunaEsquerda.className = 'noticias-coluna';
  divColunaEsquerda.innerHTML = colunaEsquerda.map(noticia => criarCardNoticia(noticia)).join('');
  
  // Criar coluna direita
  const divColunaDireita = document.createElement('div');
  divColunaDireita.className = 'noticias-coluna';
  divColunaDireita.innerHTML = colunaDireita.map(noticia => criarCardNoticia(noticia)).join('');
  
  // Adicionar ao container
  colunasContainer.appendChild(divColunaEsquerda);
  colunasContainer.appendChild(divColunaDireita);
}

// ===== CARREGAR NOTÍCIAS =====
async function carregarNoticias() {
  try {
    console.log('📰 Carregando notícias...');
    
    const noticiasRef = collection(db, "noticias");
    const q = query(
      noticiasRef,
      where("publicada", "==", true),
      orderBy("dataPublicacao", "desc"),
      limit(6) // Limitar a 6 notícias
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log('ℹ️ Nenhuma notícia publicada ainda');
      exibirMensagemVazia();
      return;
    }
    
    const noticias = [];
    querySnapshot.forEach((doc) => {
      noticias.push({ id: doc.id, ...doc.data() });
    });
    
    console.log('✅ Notícias carregadas:', noticias.length);
    
    // Renderizar notícias
    renderizarNoticias(noticias);
    
  } catch (error) {
    console.error('❌ Erro ao carregar notícias:', error);
    exibirErro(error);
  }
}

// ===== EXIBIR MENSAGEM VAZIA =====
function exibirMensagemVazia() {
  const colunasContainer = document.querySelector('.noticias-colunas');
  
  if (!colunasContainer) return;
  
  colunasContainer.innerHTML = `
    <div class="noticias-vazio" style="
      grid-column: 1 / -1;
      text-align: center;
      padding: 60px 20px;
      color: #aaa;
    ">
      <p style="font-size: 1.2rem; margin-bottom: 10px;">📰</p>
      <p>Nenhuma notícia publicada ainda.</p>
      <p style="font-size: 0.9rem; margin-top: 10px;">Em breve teremos novidades!</p>
    </div>
  `;
}

// ===== EXIBIR ERRO =====
function exibirErro(error) {
  const colunasContainer = document.querySelector('.noticias-colunas');
  
  if (!colunasContainer) return;
  
  colunasContainer.innerHTML = `
    <div class="noticias-erro" style="
      grid-column: 1 / -1;
      text-align: center;
      padding: 60px 20px;
      color: #ff6b6b;
    ">
      <p style="font-size: 1.2rem; margin-bottom: 10px;">❌</p>
      <p>Erro ao carregar notícias</p>
      <p style="font-size: 0.85rem; color: #999; margin-top: 10px;">${error.message}</p>
    </div>
  `;
}

// ===== INICIALIZAR =====
// Aguardar o Firebase ser inicializado no index.html
setTimeout(() => {
  carregarNoticias();
}, 500);

// Exportar função para uso em outros scripts
window.carregarNoticiasIndex = carregarNoticias;