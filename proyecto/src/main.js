import mostrarPersonajes from "./componentes/personajes.js";
import mostrarCasas from "./componentes/casas.js";
import mostrarPerfil from "./componentes/perfil.js";
import mostrarLogin from "./componentes/login.js";
import mostrarLogout from "./componentes/logout.js";
import mostrarRegistro from "./componentes/registro.js";
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";

function renderMenu(user) {
  const menu = document.getElementById("menu");
  menu.innerHTML = `
    <button onclick="mostrarPersonajes()">Personajes</button>
    <button onclick="mostrarCasas()">Casas</button>
    <button onclick="mostrarPerfil()">Perfil</button>
    <button onclick="mostrarRegistro()">Registro</button>
    ${
      user
        ? `<button onclick="mostrarLogout()">Cerrar sesión</button>`
        : `<button onclick="mostrarLogin()">Iniciar sesión</button>`
    }
  `;
}

// Asegura que las funciones estén disponibles globalmente para los botones
window.mostrarPersonajes = mostrarPersonajes;
window.mostrarCasas = mostrarCasas;
window.mostrarPerfil = mostrarPerfil;
window.mostrarLogin = mostrarLogin;
window.mostrarLogout = mostrarLogout;
window.mostrarRegistro = mostrarRegistro;

onAuthStateChanged(auth, (user) => {
  renderMenu(user);
  if (user) {
    mostrarPersonajes();
  } else {
    mostrarLogin();
  }
});
