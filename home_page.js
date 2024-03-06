// 1)HOME PAGE LEGGIAMO IL VALORE ID DELLA CARD CLICCATA (corrisponderà a un album specifico) E PASSIAMO I VALORI AD ALBUM PAGE

// mettere ascoltatore sulle card, dentro l'ascoltatore trovare l'id dell'album cliccato.

// // Ottenere tutti gli elementi con una determinata classe
let elements = document.getElementsByClassName("album");

// Ciclare attraverso gli elementi
for (let i = 0; i < elements.length; i++) {
  // iesimo elemento di tutte le card
  let element = elements[i];
  // ascoltatore
  element.addEventListener("click", function () {
    // Ottenere l'id dell'elemento attuale
    // console.log(element.id);

    // funzione a cui gli passo element(che sarebbe l'iesimo elemento delle card).id
    let parametroAlbumId = encodeURIComponent(element.id);

    // URL di dove vogliamo entrare nello specifico gli indichiamo il parametro da inviare alla pagina album(che sarà l'album specifico cliccato della card)

    let nuovoURL = "http://127.0.0.1:5501/album_page.html?albumId=" + parametroAlbumId;

    // Reindirizza alla pagina album
    window.location.href = nuovoURL;
  });
}

// A)PASSAGGIO PRIMO - ABBIAMO MESSO UN ASCOLTATORE SULLA CARD, IN MODO CHE QUANDO VIENE CLICCATA SI PASSA ALLA PAGINA ALBUM PAGE
