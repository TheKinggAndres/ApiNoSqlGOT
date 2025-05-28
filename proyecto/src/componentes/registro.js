import { auth, db } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function mostrarRegistro() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h2>Registro</h2>
    <form id="formRegistro">
      <input type="text" id="nombre" placeholder="Nombre completo" required />
      <input type="email" id="registro-email" placeholder="Correo" required />
      <input type="password" id="registro-password" placeholder="Contraseña" required />
      <input type="date" id="fechaNacimiento" placeholder="Fecha de nacimiento" required />
      <input type="tel" id="telefono" placeholder="Teléfono" required />
      <button type="submit">Registrar</button>
    </form>
    <div id="mensajeRegistro"></div>
  `;

  const formRegistro = document.getElementById("formRegistro");

  formRegistro.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("registro-email").value.trim();
    const password = document.getElementById("registro-password").value.trim();
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const telefono = document.getElementById("telefono").value.trim();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar datos adicionales en Firestore
      await setDoc(doc(db, "usuarios", user.uid), {
        nombre,
        email,
        fechaNacimiento,
        telefono,
        uid: user.uid,
      });

      document.getElementById("mensajeRegistro").textContent = "Usuario registrado correctamente";
      formRegistro.reset();
    } catch (error) {
      document.getElementById("mensajeRegistro").textContent = "Error en el registro: " + error.message;
      console.error(error);
    }
  });
}

export default mostrarRegistro;
