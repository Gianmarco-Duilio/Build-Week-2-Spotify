// Funzione per ottenere l'ID dell'album dalla query string
function getAlbumIdFromQueryString() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.has("albumId") ? urlParams.get("albumId") : null;
}

// FETCH
// ☑️Funzione per ottenere il contenuto di un album:
// la funzione fetchAlbum prende come argomento albumId, che è l'ID dell'album da recuperare, quindi costruisce un URL utilizzando
// questo ID e fa una richiesta GET a quell'URL. Se la richiesta ha successo, il contenuto dell'album viene restituito come oggetto JSON

async function fetchAlbum(albumId) {
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

// FETCH
// Funzione per ottenere e visualizzare i dettagli dell'album
async function displayAlbumDetails() {
  try {
    const albumId = getAlbumIdFromQueryString();
    if (albumId) {
      const album = await fetchAlbum(albumId);

      //☑️PER FARE IN MODO CHE IL CONTENUTO DELL'ALBUM PAGE SI RIEMPIA DELLE CANZONI DELL'ALBUM
      // 1)abbiamo messo un id per ogni elemento (es:id=copertina per la copertina) -
      // 2)prendiamo l'id esempio copertina
      // 3)poi inseriamo copertina.src(l'attributo)= album.cover(ossia dove vogliamo prendere e cosa vogliamo prendere)
      if (album) {
        let copertina = document.getElementById("copertina");
        copertina.src = album.cover_big;
        let titolo = document.getElementById("titolo");
        titolo.innerText = album.title;
        let nomeArtista = document.getElementById("nomeArtista");
        nomeArtista.innerText = album.artist.name;

        console.log(album);
        const albumTable = document.getElementById("albumTable");

        let stringaFinale = `
        <table>
        <tbody>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Album</th>
            <th>Date Added</th>
            <th>
              <img src='./assets/Icone/Duration.svg' />
            </th>
          </tr>`;
        for (let i = 0; i < album.tracks.data.length; i++) {
          let testo = `
          <tr>
          <td>${i + 1}</td>
          <td class="song-title">
            <div class="song-image">
              <img src="${album.cover_big}" alt="" />
            </div>
            <div class="song-name-album">
              <div class="song-name">${album.tracks.data[i].title}</div>
              <div class="song-artist">${album.artist.name}</div>
            </div>
          </td>
          <td class="song-album">${album.title}</td>
          <td class="song-date-added">${album.release_date}</td>
          <td class="song-duration">${album.tracks.data[i].duration}</td>
          </tr>
          `;
          stringaFinale += testo;
        }
        stringaFinale += ` </tbody>
        </table>`;
        albumTable.innerHTML = stringaFinale;
      } else {
        console.error("Album non trovato");
      }
    } else {
      console.error("ID dell'album non fornito nella query string");
    }
  } catch (error) {
    console.error("Errore durante il recupero dei dettagli dell'album:", error);
  }
}

window.onload = function () {
  // Chiamata alla funzione per ottenere e visualizzare i dettagli dell'album
  displayAlbumDetails();
};

//----------------------------------------------------------------------------------------------------------------
