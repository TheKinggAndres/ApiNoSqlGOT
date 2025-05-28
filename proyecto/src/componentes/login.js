import { auth } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

function mostrarLogin() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h2>Iniciar sesión</h2>
    <input type="email" id="login-email" placeholder="Correo" />
    <input type="password" id="login-password" placeholder="Contraseña" />
    <button onclick="iniciarSesion()">Entrar</button>
  `;
}

window.iniciarSesion = async function () {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("¡Sesión iniciada!");
  } catch (error) {
    alert("Error al iniciar sesión: " + error.message);
  }
}

export default mostrarLogin;
