// //☑️LE TUE RIPRODUZIONI - BUONASERA
// const artistNames = ["Eminem", "Nelly", "Salmo", "Migos", "Mahmood ", "Elodie"];
// function fetchArtistData(artistName) {
//   return fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${artistName}`, {
//     method: "GET",
//     headers: {
//       "X-RapidAPI-Key": "9d6bfcc177msh2d11ca23a04202ep104be7jsn9e7420c2619b",
//       "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
//     },
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Errore durante il recupero dei dati");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//       console.log(data.data[0].artist.picture_small);
//       return data.data[0].artist;
//     })
//     .catch((error) => {
//       console.error("Si è verificato un errore", error);
//     });
// }

// const container = document.querySelector("#cardTop");

// function createCard(artist) {
//   const card = document.createElement("div");
//   card.classList.add("col-6", "col-xl-4");

//   card.innerHTML = `
//       <div id="topCard" class="d-flex rounded-2 bg-secondary ">
//           <div><img src="${artist.picture_small}" class="rounded-start" /></div>
//           <div class="blc text-white">
//               <p class="truncate-2-lines my-auto text-white ms-2">${artist.name}</p>
//           </div>
//       </div>
//   `;

//   return card;
// }

//☑️LE TUE RIPRODUZIONI - BUONASERA
const artistNames = ["Eminem", "Nelly", "Salmo", "Migos", "Mahmood ", "Elodie"];

function fetchArtistData(artistName) {
  return fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${artistName}`, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9d6bfcc177msh2d11ca23a04202ep104be7jsn9e7420c2619b",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore durante il recupero dei dati");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(data.data[0].artist.picture_small);
      return data.data[0].artist;
    })
    .catch((error) => {
      console.error("Si è verificato un errore", error);
    });
}

const container = document.querySelector("#cardTop");

function createCard(artist) {
  const card = document.createElement("div");
  card.classList.add("col-6", "col-xl-4");

  card.innerHTML = `
      <div id="topCard" class="d-flex rounded-2 bg-secondary ">
          <div><img src="${artist.picture_small}" class="rounded-start" /></div>
          <div class="blc text-white">
              <p class="truncate-2-lines my-auto text-white ms-2">${artist.name}</p>
          </div>
      </div>
  `;

  // Aggiungi un gestore dell'evento click alla carta dell'artista
  card.addEventListener("click", function () {
    // Modifica l'URL per includere l'ID dell'artista e reindirizza alla pagina dell'artista
    window.location.href = `artist_page.html?artistId=${artist.id}`; // Assicurati che l'oggetto artista abbia una proprietà "id" che rappresenta l'ID dell'artista
  });

  return card;
}

window.onload = function () {
  Promise.all(artistNames.map(fetchArtistData)).then((artistsData) => {
    console.log(artistsData);
    artistsData.forEach((artist) => {
      const card = createCard(artist);
      container.appendChild(card);
    });
  });
};

// -----
//☑️CARD ALBUM
// Array degli ID degli album
const albumIds = [
  "544893852",
  "9410086",
  "12047952",
  "87722792",
  "397544257",
  "384842207",

  "74434962",
  "108447472",
  "544674272",
  "445968695",
  "544890462",
  "182811182",
];

// Funzione per ottenere il contenuto di un album
async function fetchAlbum_fromHome(albumId) {
  try {
    const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`);
    if (!response.ok) {
      throw new Error("Errore durante il recupero dell'album");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Funzione per generare le card degli album utilizzando Bootstrap e aggiungere gli event listener

async function generateAlbumCardsWithBootstrapAndListeners() {
  try {
    const container = document.getElementById("raccoglitore");
    let htmlInniettato = "";

    for (let i = 0; i < albumIds.length; i++) {
      const albumId = albumIds[i];
      const album = await fetchAlbum_fromHome(albumId);
      console.log(album);
      if (album) {
        const html = `
                 
                  <div class="col-12 col-md-4 col-xl-2">
                      <div class="card text-white bg-secondary p-2 fixed-size-card" data-album-id="${albumId}">
                          <img src="${album.cover}" class="card-img-top rounded-2 album" alt="${album.title}">
                          <div class="card-body">
                              <h5 class="card-title">${album.title}</h5>
                              <p class="card-text">${album.artist.name}</p>
                          </div>
                      </div>
                  </div>
              `;
        htmlInniettato += html;

        // Aggiungi uno spazio ogni sei card
        if ((i + 1) % 6 === 0 && i !== albumIds.length - 1) {
          htmlInniettato += `<div class="spacer"></div>`;
        }
      }
    }

    container.innerHTML = htmlInniettato;

    // Aggiungi gli event listener alle card generate dinamicamente
    const cards = container.querySelectorAll(".card");
    cards.forEach((card) => {
      card.addEventListener("click", function () {
        const albumId = card.getAttribute("data-album-id");
        window.location.href = `album_page.html?albumId=${albumId}`;
      });
    });
  } catch (error) {
    console.error(error);
  }
}

window.onload = function () {
  Promise.all(artistNames.map(fetchArtistData)).then((artistsData) => {
    console.log(artistsData);
    artistsData.forEach((artist) => {
      const card = createCard(artist);
      container.appendChild(card);
    });
  });

  // Chiamata alla funzione per generare le card degli album utilizzando Bootstrap e aggiungere gli event listener
  generateAlbumCardsWithBootstrapAndListeners();
};

// -----

// ☑️HOME PAGE

// 1) ABBIAMO CREATO DINAMICAMENTE LE CARD DELLA HOME PAGE NEL JAVASCRIPT (creando un array di artisti e di id specifici degli album),
// e mettendo un ascoltatore sulle card sia album che artisti che all'evento del click mi rimanda alla pagina di album page e artist page.

// FATTO UNA FECTCH DI TIPO GET PER PRENDERE I DATI
// , CREATO DINAMICAMENTE LE CARD E INNIETTATE NELL'HTML (così che nella home page si visualizzino le card degli artisti scelti)

// ☑️ALBUM PAGE
// 2) ABBIAMO SEMPRE FATTO UNA FETCH (funzione fetchAlbum,per ottenere il contenuto di un album) e un'altra FETCH (funzione displayAlbumDetails,per ottenere e visualizzare i dettagli
//  dell'album)
