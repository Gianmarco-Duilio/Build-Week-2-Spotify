const artistNames = ["Eminem", "Nelly", "Ice Cube", "Migos", "Snoop Dogg", "Lil Wayne"];

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

function createArtistCard(artist) {
  const card = document.createElement("div");
  card.classList.add("col-6", "col-xl-4");

  card.innerHTML = `
      <div id="topCard" class="d-flex rounded-2 bg-dark.bg-gradient">
          <div><img src="${artist.picture_medium}" class="rounded-start"  id="imgTopCard"/></div>
          <div class="blc text-white">
              <p class="truncate-2-lines">${artist.name}</p>
          </div>
      </div>
  `;

  return card;
}

Promise.all(artistNames.map(fetchArtistData)).then((artistsData) => {
  console.log(artistsData);
  artistsData.forEach((artist) => {
    const card = createArtistCard(artist);
    container.appendChild(card);
  });
});

// Funzione per creare una singola card di un album
function createAlbumCard(albumId, albumName, artistName, albumImageSrc) {
  const colDiv = document.createElement("div");
  colDiv.classList.add("col-12", "col-md-4", "col-xl-2");

  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card", "text-white", "bg-dark", "bg-gradient", "p-2", "border-black");

  const img = document.createElement("img");
  img.src = albumImageSrc;
  img.classList.add("card-img-top", "rounded-2", "album");
  img.alt = "Album Cover";

  const cardBodyDiv = document.createElement("div");
  cardBodyDiv.classList.add("card-body");

  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = albumName;

  const text = document.createElement("p");
  text.classList.add("card-text");
  text.textContent = artistName;

  cardBodyDiv.appendChild(title);
  cardBodyDiv.appendChild(text);

  cardDiv.appendChild(img);
  cardDiv.appendChild(cardBodyDiv);

  colDiv.appendChild(cardDiv);

  return colDiv;
}

function fetchAlbumData(albumId) {
  return fetch(`https://deezerdevs-deezer.p.rapidapi.com/album/${albumId}`, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9d6bfcc177msh2d11ca23a04202ep104be7jsn9e7420c2619b",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore durante il recupero dei dati dell'album");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const albumName = data.title;
      const artistName = data.artist.name;
      const albumImageSrc = data.cover_medium;

      return createAlbumCard(albumId, albumName, artistName, albumImageSrc);
    })
    .catch((error) => {
      console.error("Si è verificato un errore ", error);
    });
}

const row = document.querySelector("#middleCard");
const albumIds = ["223761", "82006", "13606387", "402935287", "13936170", "6954983"];
const albumPromises = albumIds.map(fetchAlbumData);

Promise.all(albumPromises).then((cards) => {
  cards.forEach((card) => {
    row.appendChild(card);
  });
});
