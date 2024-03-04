// 2)PRENDIAMO Il VALORE CHE CI HA TRASFERITO LA HOME PAGE
// 3)MANDARE AL SERVER LA RICHIESTA

// indichiamo di leggere la url corrente
var currentUrl = window.location.href;

// Creare un oggetto URLSearchParams per ottenere i parametri dall'URL corrente
var urlParams = new URLSearchParams(currentUrl);

// Ottenere il valore del parametro albumId
var albumId = urlParams.get("albumId");

// FARE FETCH E POI CREARE DINAMICAMENTE LE CANZONI NELL'ALBUM PAGE

// esempio di fecth
fetch("https://striveschool-api.herokuapp.com/books")
  // utilizza un metodo .then sulla promise del fetch per gestire la risposta
  .then((response) => {
    if (response.ok) {
      // se abbiamo una risposta positiva e lo status è da 100 ~ 399
      // mi devi trasformare il flusso dati in un jason, altrimenti mi lanci errore

      return response.json();
    } else {
      throw new Error("ERRORE NEL REPERIMENTO DATI");
    }
  });
