// auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC9LLCXrQTHBagQxaChBazSfS5E4gUPIoI",
  authDomain: "site-grn.firebaseapp.com",
  projectId: "site-grn",
  storageBucket: "site-grn.firebasestorage.app",
  messagingSenderId: "27613322806",
  appId: "1:27613322806:web:ad4dc08ce043f19d530297",
  measurementId: "G-84NHN394WF"
};

// Inicialização
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Função para criar usuário (sign up) com role 'user' por padrão
async function signUp(email, password, nome = "") {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Cria documento no Firestore com role padrão = 'user'
    await setDoc(doc(db, "usuarios", user.uid), {
      email: user.email,
      nome: nome,
      role: 'user', // Mudança: usar 'role' em vez de 'nivel'
      createdAt: new Date() // Adiciona timestamp de criação
    });

    console.log("Usuário criado e salvo no Firestore:", user.uid);
    return user;
  } catch (error) {
    console.error("Erro no cadastro:", error.message);
    throw error;
  }
}

// Função para login com Google
async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // Verifica se o usuário já existe no Firestore
    const userRef = doc(db, "usuarios", user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      // Se não existir, cria com role 'user'
      await setDoc(userRef, {
        email: user.email,
        nome: user.displayName || user.email.split('@')[0],
        role: 'user', // Mudança: usar 'role' em vez de 'nivel'
        createdAt: new Date()
      });
    }
    
    return user;
  } catch (error) {
    console.error("Erro no login com Google:", error);
    throw error;
  }
}

// Função para checar acesso baseado em role
export async function checkAccess(requiredRole = 'user') {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "login.html";
        resolve(false);
        return;
      }

      try {
        const userRef = doc(db, "usuarios", user.uid);
        const snap = await getDoc(userRef);

        if (!snap.exists()) {
          // Se não existir no Firestore, cria com role 'user'
          await setDoc(userRef, {
            email: user.email,
            nome: user.displayName || user.email.split('@')[0],
            role: 'user',
            createdAt: new Date()
          });
          
          if (requiredRole === 'user') {
            resolve(true);
          } else {
            alert("Seu perfil foi criado com nível básico. Para acessar ferramentas avançadas, entre em contato com os administradores.");
            window.location.href = "index.html";
            resolve(false);
          }
          return;
        }

        const userData = snap.data();
        const userRole = userData.role || 'user';
        
        // Hierarquia de roles: user < player < admin
        const roleHierarchy = {
          'user': 1,
          'player': 2,
          'admin': 3
        };
        
        const requiredLevel = roleHierarchy[requiredRole] || 1;
        const userLevel = roleHierarchy[userRole] || 1;
        
        if (userLevel >= requiredLevel) {
          resolve(true);
        } else {
          alert(`Acesso restrito. Você precisa ser um ${requiredRole} para acessar esta ferramenta. Seu nível atual: ${userRole}`);
          window.location.href = "index.html";
          resolve(false);
        }
      } catch (error) {
        console.error("Erro ao verificar acesso:", error);
        alert("Erro ao verificar permissões. Tente novamente mais tarde.");
        window.location.href = "index.html";
        resolve(false);
      }
    });
  });
}

// Função para verificar permissões sem redirecionamento (para uso em material.html)
export async function checkUserPermissions(user) {
  if (!user) return null;
  
  try {
    const userRef = doc(db, "usuarios", user.uid);
    const snap = await getDoc(userRef);
    
    if (!snap.exists()) {
      // Cria usuário com role padrão se não existir
      await setDoc(userRef, {
        email: user.email,
        nome: user.displayName || user.email.split('@')[0],
        role: 'user',
        createdAt: new Date()
      });
      return { role: 'user' };
    }
    
    return snap.data();
  } catch (error) {
    console.error("Erro ao verificar permissões:", error);
    throw error;
  }
}

export { 
  app, 
  auth, 
  db, 
  signUp, 
  signInWithEmailAndPassword as login, 
  signOut as logout, 
  signInWithGoogle,
  checkAccess 
};