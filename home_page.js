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

function createCard(artist) {
  const card = document.createElement("div");
  card.classList.add("col-6", "col-xl-4");

  card.innerHTML = `
      <div id="topCard" class="d-flex rounded-2 bg-secondary ">
          <div><img src="${artist.picture_small}" class="rounded-start" /></div>
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
    const card = createCard(artist);
    container.appendChild(card);
  });
});
