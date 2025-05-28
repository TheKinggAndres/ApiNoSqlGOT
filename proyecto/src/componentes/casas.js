async function mostrarCasas() {
    const app = document.getElementById("app");
    app.innerHTML = "<h2>Casas</h2>";
  
    try {
      const res = await fetch("https://thronesapi.com/api/v2/Characters");
      const data = await res.json();
  
      const casasUnicas = [...new Set(data.map(p => p.family).filter(f => f))];
  
      const lista = document.createElement("div");
      lista.classList.add("c-lista");
  
      casasUnicas.forEach(casa => {
        const card = document.createElement("div");
        card.classList.add("c-card");
  
        card.innerHTML = `
          <h3>${casa}</h3>
          <p>Miembros:</p>
          <ul style="text-align:left">
            ${data
              .filter(p => p.family === casa)
              .slice(0, 5)
              .map(p => `<li>${p.fullName}</li>`)
              .join("")}
          </ul>
        `;
  
        lista.appendChild(card);
      });
  
      app.appendChild(lista);
  
    } catch (error) {
      app.innerHTML += `<p>Error al cargar las casas.</p>`;
      console.error(error);
    }
  }
  
export default mostrarCasas;
