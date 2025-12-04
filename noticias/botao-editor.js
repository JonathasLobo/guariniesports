// ================================================
// BOTÃO DE ACESSO AO EDITOR - GUARINI E-SPORT
// Este script adiciona um botão flutuante para admin/editor
// ================================================

import { 
  getAuth, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  getDoc 
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// 🔥 Firebase já foi inicializado no index.html
const auth = getAuth();
const db = getFirestore();

// ===== CRIAR BOTÃO FLUTUANTE =====
function criarBotaoEditor() {
  // Verificar se já existe
  if (document.getElementById('btnEditorFlutuante')) return;
  
  const botao = document.createElement('button');
  botao.id = 'btnEditorFlutuante';
  botao.className = 'btn-editor-flutuante';
  botao.innerHTML = '📝 Create Article';
  botao.title = 'Create a new article';
  
  botao.onclick = () => {
    window.location.href = './noticias/criar-noticia.html';
  };
  
  document.body.appendChild(botao);
  
  // Adicionar CSS
  if (!document.getElementById('btnEditorStyles')) {
    const style = document.createElement('style');
    style.id = 'btnEditorStyles';
    style.textContent = `
      .btn-editor-flutuante {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #ff7500, #ffad00);
        color: #000;
        border: none;
        border-radius: 50px;
        padding: 15px 25px;
        font-weight: bold;
        font-size: 16px;
        cursor: pointer;
        box-shadow: 0 5px 20px rgba(255, 173, 0, 0.4);
        transition: all 0.3s ease;
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 8px;
        animation: pulseEditor 2s infinite;
      }
      
      @keyframes pulseEditor {
        0%, 100% {
          box-shadow: 0 5px 20px rgba(255, 173, 0, 0.4);
        }
        50% {
          box-shadow: 0 5px 30px rgba(255, 173, 0, 0.7);
        }
      }
      
      .btn-editor-flutuante:hover {
        transform: translateY(-5px) scale(1.05);
        box-shadow: 0 10px 30px rgba(255, 173, 0, 0.6);
        animation: none;
      }
      
      .btn-editor-flutuante:active {
        transform: translateY(-2px) scale(1.02);
      }
      
      @media (max-width: 768px) {
        .btn-editor-flutuante {
          bottom: 20px;
          right: 20px;
          padding: 12px 20px;
          font-size: 14px;
        }
      }
      
      @media (max-width: 480px) {
        .btn-editor-flutuante {
          bottom: 15px;
          right: 15px;
          padding: 10px 15px;
          font-size: 13px;
          border-radius: 30px;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  console.log('✅ Botão do editor criado');
}

// ===== REMOVER BOTÃO =====
function removerBotaoEditor() {
  const botao = document.getElementById('btnEditorFlutuante');
  if (botao) {
    botao.remove();
    console.log('🗑️ Botão do editor removido');
  }
}

// ===== VERIFICAR PERMISSÃO =====
async function verificarPermissaoEditor(user) {
  try {
    const userDocRef = doc(db, "usuarios", user.uid);
    const userDocSnap = await getDoc(userDocRef);
    
    if (!userDocSnap.exists()) {
      console.log('❌ Usuário não encontrado no Firestore');
      return false;
    }
    
    const userData = userDocSnap.data();
    const role = userData.role;
    
    console.log('🔐 Role do usuário:', role);
    
    if (role === 'admin' || role === 'editor') {
      criarBotaoEditor();
      return true;
    } else {
      console.log('ℹ️ Usuário sem permissão de editor');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Erro ao verificar permissão:', error);
    return false;
  }
}

// ===== MONITORAR AUTENTICAÇÃO =====
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log('👤 Usuário logado:', user.email);
    await verificarPermissaoEditor(user);
  } else {
    console.log('👤 Usuário não logado');
    removerBotaoEditor();
  }
});