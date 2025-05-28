import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";

function mostrarLogout() {
  signOut(auth)
    .then(() => {
      alert("Sesión cerrada");
    })
    .catch((error) => {
      alert("Error al cerrar sesión: " + error.message);
    });
}

export default mostrarLogout;
