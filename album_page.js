// Funzione per ottenere l'ID dell'album dalla query string
function getAlbumIdFromQueryString() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("albumId");
}

// FETCH
// Funzione per ottenere e visualizzare i dettagli dell'album
async function displayAlbumDetails() {
  try {
    const albumId = getAlbumIdFromQueryString();
    if (albumId) {
      const album = await fetchAlbum(albumId);

      if (album) {
        const albumContainer = document.getElementById("albumContainer");
        console.log(albumContainer);
        albumContainer.innerHTML = `
                  <h2>${album.title}</h2>
                  <p>Artist: ${album.artist.name}</p>
                  <img src="${album.cover}" alt="${album.title}">
                  <p>Description: ${album.description}</p>
              `;
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

// Chiamata alla funzione per ottenere e visualizzare i dettagli dell'album
displayAlbumDetails();
