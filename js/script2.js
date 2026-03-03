const ENDPOINT = "http://localhost:3000/studenti";
const feed = document.getElementById("feed");

async function getStudenti() {
  const response = await fetch(ENDPOINT);
  const studenti = await response.json();
  return studenti;
}

const stampaStudenti = (studenti) => {
  const selezionati = JSON.parse(localStorage.getItem("Selezione") || "[]");

  studenti.forEach((studente) => {

    const giàSelezionato = selezionati.some((s) => s.id === studente.id);

    if (giàSelezionato) {
      const card = document.createElement("div");
      card.classList.add("card", "col-4", "p-4");

      card.innerHTML = `
      <img src="${studente.avatar}">
      <div class="card-body">
        <h5 class="card-title">${studente.nome} ${studente.cognome}</h5>
      </div>
    `;

    feed.appendChild(card)
    }



  });
};

window.addEventListener("DOMContentLoaded", () => {
  getStudenti().then((studenti) => {
    console.log(studenti);
    stampaStudenti(studenti);
  });
});
