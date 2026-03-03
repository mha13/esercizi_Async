const ENDPOINT = "http://localhost:3000/studenti";
const feed = document.getElementById("feed");
let isShown = false;
const formStudenti = document.getElementById("form-studenti");

async function getStudenti() {
  const response = await fetch(ENDPOINT);
  const studenti = response.json();
  return studenti;
}

const stampaStudenti = (studenti) => {
  studenti.forEach((studente) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("col-4");
    card.innerHTML = `
    <img src="${studente.avatar}">
    <div class="card-body">
        <h5 class="card-title">${studente.nome} ${studente.cognome}</h5>
    </div>
    `;
    feed.appendChild(card);
  });
};

const btnPrint = document.getElementById("btnPrint");
btnPrint.addEventListener("click", () => {
  if (!isShown) {
    getStudenti().then((studenti) => {
      console.log(studenti);
      stampaStudenti(studenti);
    });
    isShown = true;
    btnPrint.textContent = "Nascondi studenti";
  } else {
    feed.innerHTML = "";
    isShown = false;
    btnPrint.textContent = "Mostra studenti";
  }
});

formStudenti.addEventListener("submit", (e) => {
  e.preventDefault();
  let nome = document.getElementById("nome").value;
  let cognome = document.getElementById("cognome").value;
  let avatar = document.getElementById("avatar").value;

  const nuovoStudente = {
    nome,
    cognome,
    avatar,
  };

  scaricaStudenti(nuovoStudente);
  document.getElementById("nome").value = "";
  document.getElementById("cognome").value = "";
  document.getElementById("avatar").value = "";
  alert("nuovo stdudente è agguingato");
});

async function scaricaStudenti(studente) {
  const response = await fetch(ENDPOINT,{
    method: "POST",
    headers:{
        "Content-type" : "application/json"
    },
    body: JSON.stringify(studente)
  });
  const studenti = (response).json();
  return studenti;
}
