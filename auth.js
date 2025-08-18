// auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc 
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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

// Função para criar usuário (sign up) com nível 1 por padrão
async function signUp(email, password, nome = "") {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Cria documento no Firestore com nível padrão = 1
    await setDoc(doc(db, "usuarios", user.uid), {
      email: user.email,
      nome: nome,
      nivel: 1 // Nível padrão para novos usuários
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
      // Se não existir, cria com nível 1
      await setDoc(userRef, {
        email: user.email,
        nome: user.displayName || user.email.split('@')[0],
        nivel: 1
      });
    }
    
    return user;
  } catch (error) {
    console.error("Erro no login com Google:", error);
    throw error;
  }
}

// Função para checar acesso baseado em nível
// auth.js
export async function checkAccess(requiredLevel = 1) {
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
          // Se não existir no Firestore, cria com nível 1
          await setDoc(userRef, {
            email: user.email,
            nome: user.displayName || user.email.split('@')[0],
            nivel: 1
          });
          alert("Seu perfil foi criado com nível básico.");
          window.location.href = "index.html";
          resolve(false);
          return;
        }

        const userData = snap.data();
        
        if (userData.nivel >= requiredLevel) {
          resolve(true);
        } else {
          alert(`Acesso restrito. Seu nível atual é ${userData.nivel} e é necessário nível ${requiredLevel}.`);
          window.location.href = "index.html";
          resolve(false);
        }
      } catch (error) {
        console.error("Erro ao verificar acesso:", error);
        alert("Erro ao verificar permissões. Tente novamente.");
        window.location.href = "index.html";
        resolve(false);
      }
    });
  });
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