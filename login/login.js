// login.js
import { login, signUp } from "./auth.js";

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

// Login existente
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
      await login(email, password);
      alert("Login realizado com sucesso!");
      window.location.href = "index.html";
    } catch (error) {
      alert("Erro no login: " + error.message);
    }
  });
}

// Registro de novo usuário com nível 1
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const nome = document.getElementById("register-nome")?.value || "";

    try {
      await signUp(email, password, nome);
      alert("Usuário registrado com sucesso! Agora você pode fazer login.");
      window.location.href = "login.html";
    } catch (error) {
      alert("Erro no registro: " + error.message);
    }
  });
}
