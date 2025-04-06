"use strict";

let usunieteZadanie = null;
const listy = {};

function utworzListe(nazwa) {
  if (!listy[nazwa]) {
    listy[nazwa] = [];
    const opcja = document.createElement("option");
    opcja.value = nazwa;
    opcja.textContent = nazwa;
    wyborListy.appendChild(opcja);
    pokazListy();
  }
}

function pokazListy() {
  kontenerList.innerHTML = "";
  Object.keys(listy).forEach((nazwaListy) => {
    const wrapper = document.createElement("div");
    wrapper.className = "mb-4";

    const naglowek = document.createElement("h3");
    naglowek.className = "cursor-pointer bg-success text-white p-2 rounded";
    naglowek.textContent = nazwaListy;
    naglowek.style.cursor = "pointer";
    let widoczne = true;

    naglowek.addEventListener("click", () => {
      widoczne = !widoczne;
      ul.style.display = widoczne ? "block" : "none";
    });

    const ul = document.createElement("ul");
    ul.className = "list-group";

    const fraza = poleWyszukiwania.value.trim();
    const uwzglednij = uwzglednijWielkoscLiter.checked;

    listy[nazwaListy].forEach((zadanie) => {
      const pasuje = uwzglednij
        ? zadanie.tekst.includes(fraza)
        : zadanie.tekst.toLowerCase().includes(fraza.toLowerCase());

      if (pasuje) {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        if (zadanie.ukonczone) {
          li.classList.add("text-muted", "text-decoration-line-through");
          li.innerHTML = `<span>${zadanie.tekst} <small class='text-end d-block'>(${zadanie.dataZakonczenia})</small></span>`;
        } else {
          li.textContent = zadanie.tekst;
        }

        li.addEventListener("click", () => przelaczUkonczenie(zadanie));

        const przyciskUsun = document.createElement("button");
        przyciskUsun.className = "btn btn-sm btn-danger ms-2";
        przyciskUsun.textContent = "X";
        przyciskUsun.addEventListener("click", (e) => {
          e.stopPropagation();
          tekstModalny.textContent = `Czy na pewno chcesz usunąć zadanie o treści: ${zadanie.tekst}`;
          pokazModal();
          potwierdzUsuniecie.onclick = () => {
            usunieteZadanie = { ...zadanie, nazwaListy };
            listy[nazwaListy] = listy[nazwaListy].filter((z) => z !== zadanie);
            pokazListy();
            ukryjModal();
          };
          anulujUsuniecie.onclick = () => {
            ukryjModal();
          };
        });

        li.appendChild(przyciskUsun);
        ul.appendChild(li);
      }
    });

    wrapper.appendChild(naglowek);
    wrapper.appendChild(ul);
    kontenerList.appendChild(wrapper);
  });
}

function przelaczUkonczenie(zadanie) {
  zadanie.ukonczone = !zadanie.ukonczone;
  zadanie.dataZakonczenia = zadanie.ukonczone ? new Date().toLocaleString() : null;
  pokazListy();
}

function pokazModal() {
  oknoUsuwania.style.display = "block";
}

function ukryjModal() {
  oknoUsuwania.style.display = "none";
}

przyciskDodajZadanie.addEventListener("click", () => {
  const tekst = poleZadania.value.trim();
  if (tekst) {
    if (!listy[wyborListy.value]) {
      utworzListe(wyborListy.value);
    }
    listy[wyborListy.value].push({ tekst, ukonczone: false, dataZakonczenia: null });
    poleZadania.value = "";
    pokazListy();
  }
});

przyciskDodajListe.addEventListener("click", () => {
  const nazwa = nazwaNowejListy.value.trim();
  if (nazwa && !listy[nazwa]) {
    utworzListe(nazwa);
    wyborListy.value = nazwa;
    nazwaNowejListy.value = "";
  }
});

poleWyszukiwania.addEventListener("input", pokazListy);
uwzglednijWielkoscLiter.addEventListener("change", pokazListy);

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "z" && usunieteZadanie) {
    e.preventDefault();
    listy[usunieteZadanie.nazwaListy].push({
      tekst: usunieteZadanie.tekst,
      ukonczone: usunieteZadanie.ukonczone,
      dataZakonczenia: usunieteZadanie.dataZakonczenia,
    });
    usunieteZadanie = null;
    pokazListy();
  }
});

utworzListe("Główna");
utworzListe("Mało pilne");
utworzListe("Pilne");
utworzListe("Na wczoraj");
wyborListy.value = "Główna";
pokazListy();

