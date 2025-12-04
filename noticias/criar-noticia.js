// ================================================
// CRIAR/EDITAR NOTÍCIA - GUARINI E-SPORT
// VERSÃO COM: Idioma + Botão Excluir
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
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL,
  deleteObject
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

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
const storage = getStorage();

// ===== VARIÁVEIS GLOBAIS =====
let currentUser = null;
let modoEdicao = false;
let noticiaId = null;
let imagemPrincipalFile = null;
let imagemPrincipalURL = null;
let imagensConteudoFiles = [];
let imagensConteudoURLs = [];

// ===== ELEMENTOS DO DOM =====
const userMenuToggle = document.getElementById('userMenuToggle');
const userDropdown = document.getElementById('userDropdown');
const userDropdownHeader = document.getElementById('userDropdownHeader');
const authLink = document.getElementById('authLink');
const perfilLink = document.getElementById('perfilLink');
const loadingMessage = document.getElementById('loadingMessage');
const pageTitle = document.getElementById('pageTitle');
const noticiaForm = document.getElementById('noticiaForm');
const tituloInput = document.getElementById('tituloInput');
const tituloCounter = document.getElementById('tituloCounter');
const idiomaSelect = document.getElementById('idiomaSelect'); // 🔥 NOVO
const noticiaMetadata = document.getElementById('noticiaMetadata');
const dataPublicacao = document.getElementById('dataPublicacao');
const autorLink = document.getElementById('autorLink');
const autorAvatar = document.getElementById('autorAvatar');
const autorNome = document.getElementById('autorNome');
const ultimaAtualizacao = document.getElementById('ultimaAtualizacao');
const dataAtualizacao = document.getElementById('dataAtualizacao');
const imagemPrincipalPreview = document.getElementById('imagemPrincipalPreview');
const imagemPrincipalInput = document.getElementById('imagemPrincipalInput');
const btnRemoverImagemPrincipal = document.getElementById('btnRemoverImagemPrincipal');
const conteudoEditor = document.getElementById('conteudoEditor');
const wordCount = document.getElementById('wordCount');
const imagensConteudoGrid = document.getElementById('imagensConteudoGrid');
const imagensConteudoInput = document.getElementById('imagensConteudoInput');
const btnSalvarRascunho = document.getElementById('btnSalvarRascunho');
const btnPublicar = document.getElementById('btnPublicar');

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

// ===== VERIFICAR PERMISSÃO =====
async function verificarPermissao(user) {
  try {
    const userDocRef = doc(db, "usuarios", user.uid);
    const userDocSnap = await getDoc(userDocRef);
    
    if (!userDocSnap.exists()) {
      alert('❌ Usuário não encontrado no sistema');
      window.location.href = '../index.html';
      return false;
    }
    
    const userData = userDocSnap.data();
    const role = userData.role;
    
    console.log('🔐 Role do usuário:', role);
    
    if (role !== 'admin' && role !== 'editor') {
      alert('❌ Você não tem permissão para acessar esta página.\n\nApenas administradores e editores podem criar notícias.');
      window.location.href = '../index.html';
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao verificar permissão:', error);
    alert('❌ Erro ao verificar permissões');
    window.location.href = '../index.html';
    return false;
  }
}

// ===== VERIFICAR MODO EDIÇÃO =====
function verificarModoEdicao() {
  const urlParams = new URLSearchParams(window.location.search);
  noticiaId = urlParams.get('id');
  
  if (noticiaId) {
    modoEdicao = true;
    pageTitle.textContent = 'Editar Notícia';
    btnPublicar.textContent = '✅ Atualizar Notícia';
    carregarNoticiaParaEdicao(noticiaId);
  }
}

// ===== 🔥 CRIAR BOTÃO EXCLUIR DINAMICAMENTE =====
function criarBotaoExcluir() {
  const formActions = document.querySelector('.form-actions');
  
  // Verificar se botão já existe
  if (document.getElementById('btnExcluirNoticia')) return;
  
  const btnExcluir = document.createElement('button');
  btnExcluir.type = 'button';
  btnExcluir.id = 'btnExcluirNoticia';
  btnExcluir.className = 'btn-excluir';
  btnExcluir.innerHTML = '🗑️ Excluir Notícia';
  btnExcluir.onclick = excluirNoticia;
  
  // Adicionar antes do botão cancelar
  const btnCancelar = formActions.querySelector('.btn-cancelar');
  formActions.insertBefore(btnExcluir, btnCancelar);
}

// ===== 🔥 FUNÇÃO EXCLUIR NOTÍCIA =====
async function excluirNoticia() {
  const confirmar = confirm(
    '⚠️ ATENÇÃO! Esta ação é IRREVERSÍVEL!\n\n' +
    'Deseja realmente EXCLUIR esta notícia?\n\n' +
    'Todos os dados, incluindo imagens, serão permanentemente removidos.'
  );
  
  if (!confirmar) return;
  
  // Segunda confirmação
  const confirmar2 = confirm('Tem CERTEZA ABSOLUTA? Esta é sua última chance!');
  if (!confirmar2) return;
  
  try {
    // Desabilitar botões
    const btnExcluir = document.getElementById('btnExcluirNoticia');
    btnExcluir.disabled = true;
    btnExcluir.textContent = '⏳ Excluindo...';
    
    // Excluir do Firestore
    const noticiaRef = doc(db, "noticias", noticiaId);
    await deleteDoc(noticiaRef);
    
    alert('✅ Notícia excluída com sucesso!');
    
    // Remover listener e redirecionar
    window.removeEventListener('beforeunload', preventUnload);
    window.location.href = '../index.html';
    
  } catch (error) {
    console.error('❌ Erro ao excluir notícia:', error);
    alert('❌ Erro ao excluir notícia: ' + error.message);
    
    // Reabilitar botão
    const btnExcluir = document.getElementById('btnExcluirNoticia');
    btnExcluir.disabled = false;
    btnExcluir.textContent = '🗑️ Excluir Notícia';
  }
}

// ===== CARREGAR NOTÍCIA PARA EDIÇÃO =====
async function carregarNoticiaParaEdicao(id) {
  try {
    loadingMessage.style.display = 'block';
    noticiaForm.style.display = 'none';
    
    const noticiaRef = doc(db, "noticias", id);
    const noticiaSnap = await getDoc(noticiaRef);
    
    if (!noticiaSnap.exists()) {
      alert('❌ Notícia não encontrada');
      window.location.href = '../index.html';
      return;
    }
    
    const noticia = noticiaSnap.data();
    
    // Preencher formulário
    tituloInput.value = noticia.titulo || '';
    atualizarContadorCaracteres();
    
    // 🔥 Preencher idioma
    idiomaSelect.value = noticia.idioma || 'pt-BR';
    
    conteudoEditor.innerHTML = noticia.conteudo || '';
    atualizarContagemPalavras();
    
    // Imagem principal
    if (noticia.imagemPrincipal) {
      imagemPrincipalURL = noticia.imagemPrincipal;
      mostrarPreviewImagemPrincipal(imagemPrincipalURL);
    }
    
    // Imagens do conteúdo
    if (noticia.imagensConteudo && noticia.imagensConteudo.length > 0) {
      imagensConteudoURLs = noticia.imagensConteudo;
      renderizarImagensConteudo();
    }
    
    // Metadados
    noticiaMetadata.style.display = 'flex';
    
    if (noticia.dataPublicacao) {
      const data = noticia.dataPublicacao.toDate();
      dataPublicacao.textContent = formatarData(data);
    }
    
    autorNome.textContent = noticia.autorNome || 'Desconhecido';
    autorLink.href = `../perfil/perfil-view.html?uid=${noticia.autorId}`;
    if (noticia.autorAvatar) {
      autorAvatar.src = noticia.autorAvatar;
    }
    
    if (noticia.dataAtualizacao) {
      const dataAtual = noticia.dataAtualizacao.toDate();
      dataAtualizacao.textContent = formatarData(dataAtual);
      ultimaAtualizacao.style.display = 'flex';
    }
    
    // 🔥 CRIAR BOTÃO EXCLUIR em modo edição
    criarBotaoExcluir();
    
    loadingMessage.style.display = 'none';
    noticiaForm.style.display = 'flex';
    
    console.log('✅ Notícia carregada para edição');
    
  } catch (error) {
    console.error('❌ Erro ao carregar notícia:', error);
    alert('❌ Erro ao carregar notícia: ' + error.message);
    window.location.href = '../index.html';
  }
}

// ===== CONTADOR DE CARACTERES =====
tituloInput.addEventListener('input', atualizarContadorCaracteres);

function atualizarContadorCaracteres() {
  const length = tituloInput.value.length;
  tituloCounter.textContent = `${length}/150`;
  
  if (length > 140) {
    tituloCounter.style.color = '#ff3b30';
  } else {
    tituloCounter.style.color = '#aaa';
  }
}

// ===== IMAGEM PRINCIPAL =====
imagemPrincipalInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    imagemPrincipalFile = file;
    const reader = new FileReader();
    reader.onload = (event) => {
      mostrarPreviewImagemPrincipal(event.target.result);
    };
    reader.readAsDataURL(file);
  }
});

function mostrarPreviewImagemPrincipal(url) {
  imagemPrincipalPreview.innerHTML = `<img src="${url}" alt="Preview">`;
  btnRemoverImagemPrincipal.style.display = 'inline-block';
}

btnRemoverImagemPrincipal.addEventListener('click', () => {
  imagemPrincipalFile = null;
  imagemPrincipalURL = null;
  imagemPrincipalInput.value = '';
  imagemPrincipalPreview.innerHTML = `
    <div class="preview-placeholder">
      <span>📷</span>
      <p>Nenhuma imagem selecionada</p>
    </div>
  `;
  btnRemoverImagemPrincipal.style.display = 'none';
});

// ===== EDITOR DE CONTEÚDO =====
const toolbarButtons = document.querySelectorAll('.toolbar-btn');
toolbarButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const comando = btn.getAttribute('data-comando');
    document.execCommand(comando, false, null);
    conteudoEditor.focus();
  });
});

conteudoEditor.addEventListener('input', atualizarContagemPalavras);
conteudoEditor.addEventListener('paste', (e) => {
  e.preventDefault();
  const text = e.clipboardData.getData('text/plain');
  document.execCommand('insertText', false, text);
});

function atualizarContagemPalavras() {
  const texto = conteudoEditor.innerText.trim();
  const palavras = texto ? texto.split(/\s+/).length : 0;
  wordCount.textContent = `${palavras} palavra${palavras !== 1 ? 's' : ''}`;
}

// ===== IMAGENS DO CONTEÚDO =====
imagensConteudoInput.addEventListener('change', (e) => {
  const files = Array.from(e.target.files);
  files.forEach(file => {
    imagensConteudoFiles.push(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      imagensConteudoURLs.push(event.target.result);
      renderizarImagensConteudo();
    };
    reader.readAsDataURL(file);
  });
  imagensConteudoInput.value = '';
});

function renderizarImagensConteudo() {
  imagensConteudoGrid.innerHTML = '';
  
  imagensConteudoURLs.forEach((url, index) => {
    const div = document.createElement('div');
    div.className = 'imagem-conteudo-item';
    div.innerHTML = `
      <img src="${url}" alt="Imagem ${index + 1}">
      <div class="imagem-conteudo-acoes">
        <button class="btn-remover-imagem-conteudo" data-index="${index}" type="button">
          🗑️ Remove
        </button>
        <button class="btn-inserir-no-editor" data-index="${index}" type="button">
          📝 Add with Caption
        </button>
      </div>
    `;
    imagensConteudoGrid.appendChild(div);
  });
  
  // Event listeners
  document.querySelectorAll('.btn-remover-imagem-conteudo').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.getAttribute('data-index'));
      imagensConteudoFiles.splice(index, 1);
      imagensConteudoURLs.splice(index, 1);
      renderizarImagensConteudo();
    });
  });
  
  // 🔥 INSERIR COM LEGENDA
  document.querySelectorAll('.btn-inserir-no-editor').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.getAttribute('data-index'));
      const url = imagensConteudoURLs[index];
      inserirImagemComLegenda(url);
    });
  });
  
  // 🔥 INSERIR SEM LEGENDA (método antigo)
  document.querySelectorAll('.btn-inserir-simples').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.getAttribute('data-index'));
      const url = imagensConteudoURLs[index];
      inserirImagemNoEditor(url, null);
    });
  });
}

function inserirImagemComLegenda(url) {
  const legenda = prompt(
    '📝 Enter the caption for this image:\n\n' +
    '(Example: "President during press conference at the Planalto Palace")\n\n' +
    'Leave blank to insert without a caption.'
  );
  
  // Se cancelar, não faz nada
  if (legenda === null) return;
  
  // Inserir com ou sem legenda
  inserirImagemNoEditor(url, legenda.trim());
}

function inserirImagemNoEditor(url, legenda = null) {
  // Criar container da imagem
  const figureContainer = document.createElement('figure');
  figureContainer.className = 'noticia-imagem-container';
  figureContainer.style.margin = '20px 0';
  figureContainer.style.padding = '0';
  figureContainer.style.textAlign = 'center';
  
  // Criar imagem
  const img = document.createElement('img');
  img.src = url;
  img.style.maxWidth = '100%';
  img.style.height = 'auto';
  img.style.display = 'block';
  img.style.margin = '0 auto';
  img.style.borderRadius = '8px';
  img.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  
  figureContainer.appendChild(img);
  
  // Se tiver legenda, adicionar
  if (legenda && legenda.length > 0) {
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = legenda;
    figcaption.style.fontSize = '14px';
    figcaption.style.color = '#999';
    figcaption.style.fontStyle = 'italic';
    figcaption.style.marginTop = '10px';
    figcaption.style.padding = '0 15px';
    figcaption.style.textAlign = 'center';
    figcaption.style.lineHeight = '1.5';
    
    figureContainer.appendChild(figcaption);
  }
  
  // Inserir no editor
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(figureContainer);
    
    // Adicionar parágrafo vazio após a imagem
    const p = document.createElement('p');
    p.innerHTML = '<br>';
    figureContainer.parentNode.insertBefore(p, figureContainer.nextSibling);
    
    // Mover cursor para o parágrafo vazio
    range.setStart(p, 0);
    range.setEnd(p, 0);
    selection.removeAllRanges();
    selection.addRange(range);
  } else {
    conteudoEditor.appendChild(figureContainer);
    
    // Adicionar parágrafo vazio
    const p = document.createElement('p');
    p.innerHTML = '<br>';
    conteudoEditor.appendChild(p);
  }
  
  conteudoEditor.focus();
  atualizarContagemPalavras();
  
  // Feedback visual
  console.log('✅ Imagem inserida' + (legenda ? ' com legenda' : ''));
}

// ===== SALVAR RASCUNHO =====
btnSalvarRascunho.addEventListener('click', async () => {
  await salvarNoticia(false);
});

// ===== PUBLICAR NOTÍCIA =====
noticiaForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  await salvarNoticia(true);
});

// ===== FUNÇÃO PRINCIPAL DE SALVAR - 🔥 COM IDIOMA =====
async function salvarNoticia(publicar) {
  try {
    // Validações
    const titulo = tituloInput.value.trim();
    const conteudo = conteudoEditor.innerHTML.trim();
    const idioma = idiomaSelect.value; // 🔥 NOVO
    
    if (!titulo) {
      alert('⚠️ Please enter a title for the article.');
      return;
    }
    
    if (!conteudo || conteudo === '') {
      alert('⚠️ Please write the article content.');
      return;
    }
    
    if (!imagemPrincipalFile && !imagemPrincipalURL) {
      alert('⚠️ Please select a featured image.');
      return;
    }
    
    const confirmar = confirm(
      publicar ? 
      '✅ Do you want to publish this article? It will be visible to all users.' :
      '💾 Do you want to save as a draft? You can edit and publish it later.'
    );
    
    if (!confirmar) return;
    
    // Desabilitar botões
    btnSalvarRascunho.disabled = true;
    btnPublicar.disabled = true;
    btnSalvarRascunho.textContent = '⏳ Saving...';
    btnPublicar.textContent = '⏳ Saving...';
    
    // Upload de imagens
    let imagemPrincipalFinal = imagemPrincipalURL;
    
    if (imagemPrincipalFile) {
      imagemPrincipalFinal = await uploadImagemPrincipal(imagemPrincipalFile);
    }
    
    const imagensConteudoFinais = await uploadImagensConteudo();
    
    // Preparar dados
    const noticiaData = {
      titulo: titulo,
      conteudo: conteudo,
      idioma: idioma, // 🔥 NOVO
      imagemPrincipal: imagemPrincipalFinal,
      imagensConteudo: imagensConteudoFinais,
      autorId: currentUser.uid,
      autorNome: currentUser.displayName || currentUser.email.split('@')[0],
      autorAvatar: await obterAvatarUsuario(),
      publicada: publicar,
      visualizacoes: 0
    };
    
    // Criar ou atualizar
    if (modoEdicao && noticiaId) {
      // Atualizar notícia existente
      const noticiaRef = doc(db, "noticias", noticiaId);
      await updateDoc(noticiaRef, {
        ...noticiaData,
        dataAtualizacao: serverTimestamp()
      });
      
      alert(publicar ? '✅ Article updated and published!' : '💾 Article saved as draft!');
    } else {
      // Criar nova notícia
      const noticiaRef = doc(collection(db, "noticias"));
      await setDoc(noticiaRef, {
        ...noticiaData,
        dataPublicacao: serverTimestamp(),
        dataAtualizacao: serverTimestamp()
      });
      
      alert(publicar ? '✅ Article published successfully!' : '💾 Draft saved successfully!');
    }
    
    // 🔥 REMOVER O LISTENER DE BEFOREUNLOAD ANTES DE REDIRECIONAR
    window.removeEventListener('beforeunload', preventUnload);
    
    // Redirecionar
    window.location.href = '../index.html';
    
  } catch (error) {
    console.error('❌ Error saving article:', error);
    alert('❌ Error saving article: ' + error.message);
    
    // Reabilitar botões
    btnSalvarRascunho.disabled = false;
    btnPublicar.disabled = false;
    btnSalvarRascunho.textContent = '💾 Save as Draft';
    btnPublicar.textContent = modoEdicao ? '✅ Update Article' : '✅ Publish Article';
  }
}

// ===== UPLOAD DE IMAGENS =====
async function uploadImagemPrincipal(file) {
  try {
    const timestamp = Date.now();
    const fileName = `noticias/principal/${currentUser.uid}_${timestamp}_${file.name}`;
    const storageRef = ref(storage, fileName);
    
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    
    console.log('✅ Featured image uploaded:', url);
    return url;
  } catch (error) {
    console.error('❌ Error uploading featured image:', error);
    throw error;
  }
}

async function uploadImagensConteudo() {
  try {
    const urlsFinais = [];
    
    // Manter URLs antigas (que não são Blob URLs)
    for (const url of imagensConteudoURLs) {
      if (!url.startsWith('blob:') && !url.startsWith('data:')) {
        urlsFinais.push(url);
      }
    }
    
    // Upload de novas imagens
    for (const file of imagensConteudoFiles) {
      const timestamp = Date.now();
      const fileName = `noticias/conteudo/${currentUser.uid}_${timestamp}_${file.name}`;
      const storageRef = ref(storage, fileName);
      
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      urlsFinais.push(url);
    }
    
    console.log('✅ Content images uploaded:', urlsFinais.length);
    return urlsFinais;
  } catch (error) {
    console.error('❌ Error uploading content images:', error);
    throw error;
  }
}

async function obterAvatarUsuario() {
  try {
    const userDocRef = doc(db, "usuarios", currentUser.uid);
    const userDocSnap = await getDoc(userDocRef);
    
    if (userDocSnap.exists() && userDocSnap.data().avatar) {
      return userDocSnap.data().avatar;
    }
    
    return '../estatisticas-shad/images/backgrounds/pikachu-left-bg.png';
  } catch (error) {
    console.error('Error loading avatar:', error);
    return '../estatisticas-shad/images/backgrounds/pikachu-left-bg.png';
  }
}

// ===== CONFIRMAR SAÍDA - 🔥 CORRIGIDA =====
window.confirmarSaida = function() {
  const confirmar = confirm('⚠️ Are you sure you want to leave? All unsaved changes will be lost.');
  if (confirmar) {
    // 🔥 REMOVER O LISTENER ANTES DE SAIR
    window.removeEventListener('beforeunload', preventUnload);
    window.location.href = '../index.html';
  }
};

// 🔥 CRIAR FUNÇÃO SEPARADA PARA O LISTENER
function preventUnload(e) {
  if (tituloInput.value.trim() || conteudoEditor.innerHTML.trim()) {
    e.preventDefault();
    e.returnValue = '';
  }
}

// 🔥 ADICIONAR O LISTENER CORRETAMENTE
window.addEventListener('beforeunload', preventUnload);

// ===== FORMATAR DATA =====
function formatarData(date) {
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const ano = date.getFullYear();
  const hora = String(date.getHours()).padStart(2, '0');
  const minuto = String(date.getMinutes()).padStart(2, '0');
  
  return `${dia}/${mes}/${ano} às ${hora}:${minuto}`;
}

// ===== AUTENTICAÇÃO =====
onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    atualizarMenuUsuario(user);
    
    const temPermissao = await verificarPermissao(user);
    if (temPermissao) {
      verificarModoEdicao();
      
      // Se não está em modo edição, preencher metadados do autor
      if (!modoEdicao) {
        noticiaMetadata.style.display = 'flex';
        dataPublicacao.textContent = 'Will be set upon publication';
        
        const userDocRef = doc(db, "usuarios", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          autorNome.textContent = userData.displayName || user.email.split('@')[0];
          autorLink.href = `../perfil/perfil-view.html?uid=${user.uid}`;
          if (userData.avatar) {
            autorAvatar.src = userData.avatar;
          }
        }
      }
    }
  } else {
    alert('❌ You need to be logged in to access this page');
    window.location.href = '../login/login.html';
  }
});