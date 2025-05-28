import { auth, db } from "../firebase.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function mostrarPerfil() {
  const app = document.getElementById("app");
  app.innerHTML = `<h2>Perfil</h2><div id="perfilContenido">Cargando datos...</div>`;

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const perfilDiv = document.getElementById("perfilContenido");

      try {
        // Traer datos desde Firestore
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const datos = docSnap.data();

          perfilDiv.innerHTML = `
            <form id="formPerfil">
              <label>Nombre completo</label>
              <input type="text" id="nombre" value="${datos.nombre || ""}" required />
              
              <label>Correo (no editable)</label>
              <input type="email" id="email" value="${datos.email || user.email}" disabled />

              <label>Fecha de nacimiento</label>
              <input type="date" id="fechaNacimiento" value="${datos.fechaNacimiento || ""}" required />

              <label>Teléfono</label>
              <input type="tel" id="telefono" value="${datos.telefono || ""}" required />

              <button type="submit">Guardar cambios</button>
            </form>
            <div id="mensajePerfil"></div>
          `;

          // Escuchar el submit para actualizar datos
          document.getElementById("formPerfil").addEventListener("submit", async (e) => {
            e.preventDefault();

            const nombre = document.getElementById("nombre").value.trim();
            const fechaNacimiento = document.getElementById("fechaNacimiento").value;
            const telefono = document.getElementById("telefono").value.trim();

            try {
              await setDoc(doc(db, "usuarios", user.uid), {
                ...datos, // para conservar otros datos si hay
                nombre,
                fechaNacimiento,
                telefono,
                email: datos.email, // mantener el email guardado
                uid: user.uid,
              });

              document.getElementById("mensajePerfil").textContent = "Datos actualizados correctamente";
            } catch (error) {
              document.getElementById("mensajePerfil").textContent = "Error al actualizar: " + error.message;
              console.error(error);
            }
          });
        } else {
          perfilDiv.innerHTML = "No se encontraron datos de perfil.";
        }
      } catch (error) {
        perfilDiv.innerHTML = "Error al cargar perfil: " + error.message;
        console.error(error);
      }
    } else {
      document.getElementById("perfilContenido").innerHTML = "Debes iniciar sesión para ver tu perfil.";
    }
  });
}

export default mostrarPerfil;
