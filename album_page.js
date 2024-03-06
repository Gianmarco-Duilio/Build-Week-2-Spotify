// 2)PRENDIAMO Il VALORE CHE CI HA TRASFERITO LA HOME PAGE
// 3)MANDARE AL SERVER LA RICHIESTA

// indichiamo di leggere la url corrente
let currentUrl = window.location.search;

// Creare un oggetto URLSearchParams per ottenere i parametri dall'URL corrente
let urlParams = new URLSearchParams(currentUrl);

// Ottenere il valore del parametro albumId
let albumId = urlParams.get("albumId");

// // FARE FETCH

fetch("https://striveschool-api.herokuapp.com/api/deezer/album/" + albumId)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("ERRORE NEL REPERIMENTO DATI");
    }
  })
  .then((albumData) => {
    // Ottieni il contenitore dove inserire i dettagli dell'album
    let albumContainer = document.getElementById("albumContainer");

    // Creazione degli elementi HTML per visualizzare i dettagli dell'album
    // Viene creato un nuovo elemento HTML di tipo <h2> (un titolo di secondo livello) e assegnato alla variabile albumTitle.
    let albumTitle = document.createElement("h2");
    // Il contenuto testuale dell'elemento <h2> appena creato viene impostato con il titolo dell'album, ottenuto dall'oggetto albumData
    albumTitle.textContent = albumData.title;

    // Viene creato un nuovo elemento HTML di tipo <p> (un paragrafo) e assegnato alla variabile artistName.
    let artistName = document.createElement("p");
    // Il contenuto testuale dell'elemento <p> appena creato viene impostato con il nome dell'artista dell'album, presumibilmente ottenuto dall'oggetto albumData
    artistName.textContent = albumData.artist.name;

    // Viene creato un nuovo elemento HTML di tipo <img> (un'immagine) e assegnato alla variabile albumCover.
    let albumCover = document.createElement("img");
    // L'attributo src dell'elemento <img> appena creato viene impostato con l'URL dell'immagine della copertina dell'album, ottenuto dall'oggetto albumData
    albumCover.src = albumData.cover;

    // Viene creato un nuovo elemento HTML di tipo <ul> (una lista non ordinata) e assegnato alla variabile trackList
    let trackList = document.createElement("ul");
    albumData.tracks.data.forEach((track) => {
      // Viene creato un nuovo elemento HTML di tipo <li> (un elemento di lista) e assegnato alla variabile trackItem.
      let trackItem = document.createElement("li");
      // Il contenuto testuale dell'elemento <li> appena creato viene impostato con il titolo della traccia corrente.
      trackItem.textContent = track.title;
      // L'elemento <li> contenente il titolo della traccia viene aggiunto come figlio dell'elemento <ul> trackList.
      trackList.appendChild(trackItem);
    });

    // Aggiunta degli elementi creati al contenitore
    albumContainer.appendChild(albumTitle);
    albumContainer.appendChild(artistName);
    albumContainer.appendChild(albumCover);
    albumContainer.appendChild(trackList);
  })
  .catch((error) => {
    console.error("Errore durante il recupero dei dati dell'album:", error);
  });
// -----

// B)PASSAGGIO SECONDO -ABBIAMO FATTO UNA FETCH DI TIPO GET PER PRENDERE I DATI DEGLI ID ALBUM

//  POI ABBIAMO CREATO elementi HTML per visualizzare il titolo dell'album, il nome dell'artista,
//  la copertina dell'album e una lista delle tracce dell'album, utilizzando i dati forniti nell'oggetto albumData.
