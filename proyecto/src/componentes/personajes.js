let personajesGlobal = [];

async function obtenerPersonajes() {
  const res = await fetch("https://thronesapi.com/api/v2/Characters");
  return await res.json();
}

function renderizarLista(lista) {
  const app = document.getElementById("app");
  app.innerHTML += `<div class="c-lista">${lista.map(p =>
    `<div class="c-card">
       <h3>${p.fullName}</h3>
       <img src="${p.imageUrl}" alt="${p.fullName}" />
       <p>${p.title}</p>
       <p>${p.family}</p>
     </div>`).join("")}</div>`;
}

function mostrarPersonajes() {
  const app = document.getElementById("app");
  app.innerHTML = "<h2>Personajes</h2>";
  if (personajesGlobal.length === 0) {
    obtenerPersonajes().then(data => {
      personajesGlobal = data;
      renderizarLista(personajesGlobal);
    });
  } else {
    renderizarLista(personajesGlobal);
  }
}

export default mostrarPersonajes;
