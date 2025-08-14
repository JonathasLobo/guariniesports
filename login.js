// Importa funções necessárias do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Configuração do seu Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC9LLCXrQTHBagQxaChBazSfS5E4gUPIoI",
  authDomain: "site-grn.firebaseapp.com",
  projectId: "site-grn",
  storageBucket: "site-grn.firebasestorage.app",
  messagingSenderId: "27613322806",
  appId: "1:27613322806:web:ad4dc08ce043f19d530297",
  measurementId: "G-84NHN394WF"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Elementos HTML
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const btnLogin = document.getElementById("btnLogin");
const btnGoogle = document.getElementById("btnGoogle");
const btnRegistrar = document.getElementById("btnRegistrar");
const btnLogout = document.getElementById("btnLogout");

// Login com Email/Senha
btnLogin.addEventListener("click", () => {
  signInWithEmailAndPassword(auth, email.value, senha.value)
    .then(() => {
      alert("Login realizado com sucesso!");
      window.location.href = "index.html";
    })
    .catch(error => alert(error.message));
});

// Login com Google
btnGoogle.addEventListener("click", () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(result => {
      alert(`Bem-vindo, ${result.user.displayName}!`);
      window.location.href = "index.html";
    })
    .catch(error => alert(error.message));
});

// Redirecionar para registro
btnRegistrar.addEventListener("click", () => {
  window.location.href = "registro.html";
});

// Logout
btnLogout.addEventListener("click", () => {
  signOut(auth).then(() => {
    alert("Você saiu!");
    window.location.href = "index.html";
  });
});
