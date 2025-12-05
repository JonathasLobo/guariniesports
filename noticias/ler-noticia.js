// ================================================
// LER NOTÍCIA - GUARINI E-SPORT
// ================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  getDoc,
  updateDoc,
  increment,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// ===== CONFIGURAÇÃO FIREBASE =====
const firebaseConfig = {
  apiKey: "AIzaSyC9LLCXrQTHBagQxaChBazSfS5E4gUPIoI",
  authDomain: "site-grn.firebaseapp.com",
  projectId: "site-grn",
  storageBucket: "site-grn.firebasestorage.app",
  messagingSenderId: "27613322806",
  appId: "1:27613322806:web:ad4dc08ce043f19d530297",
  measurementId: "G-84NHN394WF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

// ===== VARIÁVEIS GLOBAIS =====
let currentUser = null;
let noticiaId = null;
let noticiaData = null;

// ===== ELEMENTOS DO DOM =====
const userMenuToggle = document.getElementById('userMenuToggle');
const userDropdown = document.getElementById('userDropdown');
const userDropdownHeader = document.getElementById('userDropdownHeader');
const authLink = document.getElementById('authLink');
const perfilLink = document.getElementById('perfilLink');
const loadingNoticia = document.getElementById('loadingNoticia');
const erroNoticia = document.getElementById('erroNoticia');
const noticiaArticle = document.getElementById('noticiaArticle');
const btnEditarNoticia = document.getElementById('btnEditarNoticia');
const noticiaImagemPrincipal = document.getElementById('noticiaImagemPrincipal');
const noticiaTitulo = document.getElementById('noticiaTitulo');
const noticiaAutorLink = document.getElementById('noticiaAutorLink');
const noticiaAutorAvatar = document.getElementById('noticiaAutorAvatar');
const noticiaAutorNome = document.getElementById('noticiaAutorNome');
const noticiaDataPublicacao = document.getElementById('noticiaDataPublicacao');
const noticiaDataAtualizacaoContainer = document.getElementById('noticiaDataAtualizacaoContainer');
const noticiaDataAtualizacao = document.getElementById('noticiaDataAtualizacao');
const noticiaVisualizacoes = document.getElementById('noticiaVisualizacoes');
const noticiaConteudo = document.getElementById('noticiaConteudo');
const noticiasRelacionadasGrid = document.getElementById('noticiasRelacionadasGrid');

// Botões de compartilhamento
const btnCompartilharFacebook = document.getElementById('btnCompartilharFacebook');
const btnCompartilharTwitter = document.getElementById('btnCompartilharTwitter');
const btnCompartilharWhatsApp = document.getElementById('btnCompartilharWhatsApp');
const btnCopiarLink = document.getElementById('btnCopiarLink');
const compartilharFeedback = document.getElementById('compartilharFeedback');

// ===== MENU DROPDOWN =====
userMenuToggle.addEventListener('click', function(e) {
  e.stopPropagation();
  this.classList.toggle('active');
  userDropdown.classList.toggle('show');
});

document.addEventListener('click', function(e) {
  if (!userMenuToggle.contains(e.target) && !userDropdown.contains(e.target)) {
    userMenuToggle.classList.remove('active');
    userDropdown.classList.remove('show');
  }
});

userDropdown.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', function() {
    userMenuToggle.classList.remove('active');
    userDropdown.classList.remove('show');
  });
});

async function handleLogout() {
  const confirmar = confirm('Deseja realmente fazer logout?');
  if (confirmar) {
    try {
      await signOut(auth);
      alert('Logout realizado com sucesso!');
      window.location.href = '../index.html';
    } catch (error) {
      console.error('Erro no logout:', error);
      alert('Erro ao fazer logout. Tente novamente.');
    }
  }
}

async function atualizarMenuUsuario(user) {
  if (user) {
    try {
      const userDocRef = doc(db, "usuarios", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      
      let displayName = user.displayName || user.email.split('@')[0];
      let avatarPath = '../estatisticas-shad/images/backgrounds/pikachu-left-bg.png';
      
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        if (userData.displayName) displayName = userData.displayName;
        if (userData.avatar) avatarPath = userData.avatar;
      }
      
      userDropdownHeader.innerHTML = `
        <img src="${avatarPath}" alt="Avatar" class="dropdown-avatar">
        <span>Olá, ${displayName}!</span>
      `;
      
      authLink.textContent = 'Logout';
      authLink.onclick = function(e) {
        e.preventDefault();
        handleLogout();
      };
      perfilLink.style.display = 'block';
      
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      userDropdownHeader.innerHTML = `<span>Olá, ${user.email.split('@')[0]}!</span>`;
    }
  } else {
    userDropdownHeader.innerHTML = '<span>Olá, visitante!</span>';
    authLink.textContent = 'Login';
    authLink.onclick = function(e) {
      e.preventDefault();
      window.location.href = '../login/login.html';
    };
    perfilLink.style.display = 'none';
  }
}

// ===== VERIFICAR PERMISSÃO PARA EDITAR =====
async function verificarPermissaoEdicao(user) {
  try {
    const userDocRef = doc(db, "usuarios", user.uid);
    const userDocSnap = await getDoc(userDocRef);
    
    if (!userDocSnap.exists()) return false;
    
    const userData = userDocSnap.data();
    const role = userData.role;
    
    // Mostrar botão de editar se for admin/editor ou autor da notícia
    if (role === 'admin' || role === 'editor' || user.uid === noticiaData.autorId) {
      btnEditarNoticia.style.display = 'block';
      btnEditarNoticia.onclick = () => {
        window.location.href = `criar-noticia.html?id=${noticiaId}`;
      };
    }
    
  } catch (error) {
    console.error('Erro ao verificar permissão:', error);
  }
}

// ===== PEGAR ID DA NOTÍCIA DA URL =====
function obterNoticiaId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

// ===== CARREGAR NOTÍCIA =====
async function carregarNoticia(id) {
  try {
    console.log('📰 Carregando notícia:', id);
    
    const noticiaRef = doc(db, "noticias", id);
    const noticiaSnap = await getDoc(noticiaRef);
    
    if (!noticiaSnap.exists()) {
      mostrarErro();
      return;
    }
    
    noticiaData = noticiaSnap.data();
    
    // Verificar se está publicada
    if (!noticiaData.publicada) {
      // Só permite visualizar se for admin/editor ou autor
      if (currentUser) {
        const userDocRef = doc(db, "usuarios", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const role = userData.role;
          
          if (role !== 'admin' && role !== 'editor' && currentUser.uid !== noticiaData.autorId) {
            mostrarErro();
            return;
          }
        } else {
          mostrarErro();
          return;
        }
      } else {
        mostrarErro();
        return;
      }
    }
    
    // Renderizar notícia
    renderizarNoticia(noticiaData);
    
    // Incrementar visualizações
    await incrementarVisualizacoes(id);
    
    // Carregar notícias relacionadas
    await carregarNoticiasRelacionadas(id);
    
    // Mostrar artigo
    loadingNoticia.style.display = 'none';
    noticiaArticle.style.display = 'block';
    
    // Verificar permissão de edição
    if (currentUser) {
      await verificarPermissaoEdicao(currentUser);
    }
    
    console.log('✅ Notícia carregada com sucesso');
    
  } catch (error) {
    console.error('❌ Erro ao carregar notícia:', error);
    mostrarErro();
  }
}

// ===== RENDERIZAR NOTÍCIA =====
function renderizarNoticia(noticia) {
  // Título
  noticiaTitulo.textContent = noticia.titulo;
  document.title = `${noticia.titulo} - Guarini e-sport`;
  
  // Meta tags para compartilhamento
  document.getElementById('ogTitle').setAttribute('content', noticia.titulo);
  document.getElementById('ogDescription').setAttribute('content', extrairTextoConteudo(noticia.conteudo));
  document.getElementById('ogImage').setAttribute('content', noticia.imagemPrincipal);
  document.getElementById('ogUrl').setAttribute('content', window.location.href);
  
  // Imagem principal
  noticiaImagemPrincipal.src = noticia.imagemPrincipal;
  noticiaImagemPrincipal.alt = noticia.titulo;
  
  // Autor
  noticiaAutorNome.textContent = noticia.autorNome;
  noticiaAutorLink.href = `../perfil/perfil-view.html?uid=${noticia.autorId}`;
  noticiaAutorAvatar.src = noticia.autorAvatar || '../estatisticas-shad/images/backgrounds/pikachu-left-bg.png';
  
  // Data de publicação
  if (noticia.dataPublicacao) {
    const data = noticia.dataPublicacao.toDate();
    noticiaDataPublicacao.textContent = formatarData(data);
  }
  
  // Data de atualização
  if (noticia.dataAtualizacao && noticia.dataAtualizacao !== noticia.dataPublicacao) {
    const dataAtual = noticia.dataAtualizacao.toDate();
    noticiaDataAtualizacao.textContent = formatarData(dataAtual);
    noticiaDataAtualizacaoContainer.style.display = 'flex';
  }
  
  // Visualizações
  noticiaVisualizacoes.textContent = noticia.visualizacoes || 0;
  
  // Conteúdo
  noticiaConteudo.innerHTML = noticia.conteudo;
}

// ===== INCREMENTAR VISUALIZAÇÕES =====
async function incrementarVisualizacoes(id) {
  try {
    const noticiaRef = doc(db, "noticias", id);
    await updateDoc(noticiaRef, {
      visualizacoes: increment(1)
    });
    
    // Atualizar contador na interface
    const visualizacoesAtuais = parseInt(noticiaVisualizacoes.textContent) || 0;
    noticiaVisualizacoes.textContent = visualizacoesAtuais + 1;
    
  } catch (error) {
    console.error('Erro ao incrementar visualizações:', error);
  }
}

// ===== CARREGAR NOTÍCIAS RELACIONADAS =====
async function carregarNoticiasRelacionadas(idAtual) {
  try {
    const noticiasRef = collection(db, "noticias");
    const q = query(
      noticiasRef,
      where("publicada", "==", true),
      orderBy("dataPublicacao", "desc"),
      limit(4)
    );
    
    const querySnapshot = await getDocs(q);
    
    const noticias = [];
    querySnapshot.forEach((doc) => {
      if (doc.id !== idAtual) {
        noticias.push({ id: doc.id, ...doc.data() });
      }
    });
    
    // Pegar apenas 3 notícias
    const noticiasParaMostrar = noticias.slice(0, 3);
    
    if (noticiasParaMostrar.length === 0) {
      noticiasRelacionadasGrid.innerHTML = '<p style="color: #aaa;">Nenhuma outra notícia disponível no momento.</p>';
      return;
    }
    
    noticiasRelacionadasGrid.innerHTML = noticiasParaMostrar.map(noticia => `
      <a href="ler-noticia.html?id=${noticia.id}" class="noticia-relacionada-card">
        <div class="noticia-relacionada-img">
          <img src="${noticia.imagemPrincipal}" alt="${noticia.titulo}">
        </div>
        <div class="noticia-relacionada-info">
          <h4 class="noticia-relacionada-titulo">${noticia.titulo}</h4>
          <p class="noticia-relacionada-data">${formatarDataCurta(noticia.dataPublicacao.toDate())}</p>
        </div>
      </a>
    `).join('');
    
  } catch (error) {
    console.error('Erro ao carregar notícias relacionadas:', error);
  }
}

// ===== COMPARTILHAMENTO =====
btnCompartilharFacebook.addEventListener('click', () => {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
});

btnCompartilharTwitter.addEventListener('click', () => {
  const url = encodeURIComponent(window.location.href);
  const texto = encodeURIComponent(noticiaData.titulo);
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${texto}`, '_blank');
});

btnCompartilharWhatsApp.addEventListener('click', () => {
  const url = encodeURIComponent(window.location.href);
  const texto = encodeURIComponent(`${noticiaData.titulo} - `);
  window.open(`https://wa.me/?text=${texto}${url}`, '_blank');
});

btnCopiarLink.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    compartilharFeedback.style.display = 'inline';
    
    setTimeout(() => {
      compartilharFeedback.style.display = 'none';
    }, 2000);
  } catch (error) {
    // Fallback para navegadores que não suportam clipboard API
    const tempInput = document.createElement('input');
    tempInput.value = window.location.href;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    
    compartilharFeedback.style.display = 'inline';
    setTimeout(() => {
      compartilharFeedback.style.display = 'none';
    }, 2000);
  }
});

// ===== MOSTRAR ERRO =====
function mostrarErro() {
  loadingNoticia.style.display = 'none';
  erroNoticia.style.display = 'block';
}

// ===== FUNÇÕES AUXILIARES =====
function formatarData(date) {
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const ano = date.getFullYear();
  const hora = String(date.getHours()).padStart(2, '0');
  const minuto = String(date.getMinutes()).padStart(2, '0');
  
  return `${dia}/${mes}/${ano} às ${hora}:${minuto}`;
}

function formatarDataCurta(date) {
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const ano = date.getFullYear();
  
  return `${dia}/${mes}/${ano}`;
}

function extrairTextoConteudo(html) {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  const texto = temp.textContent || temp.innerText || '';
  return texto.substring(0, 150) + '...';
}

// ===== INICIALIZAÇÃO =====
noticiaId = obterNoticiaId();

if (!noticiaId) {
  mostrarErro();
} else {
  // Carregar notícia
  carregarNoticia(noticiaId);
}

// ===== AUTENTICAÇÃO =====
onAuthStateChanged(auth, (user) => {
  currentUser = user;
  atualizarMenuUsuario(user);
  
  // Se já carregou a notícia e agora tem usuário, verificar permissão
  if (user && noticiaData) {
    verificarPermissaoEdicao(user);
  }
});