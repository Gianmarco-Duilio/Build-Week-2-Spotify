// 1)HOME PAGE LEGGIAMO IL VALORE ID DELLA CARD CLICCATA (corrisponderà a un album specifico) E PASSIAMO I VALORI AD ALBUM PAGE

// mettere ascoltatore sulle card, dentro l'ascoltatore trovare l'id dell'album cliccato.

let parametroAlbumId = encodeURIComponent("albumId1");
//
// URL di dove vogliamo entrare nello specifico gli indichiamo il parametro da inviare alla pagina album(che sarà l'album specifico cliccato della card)

let nuovoURL = "http://127.0.0.1:5500/album.html?albumId=" + parametroAlbumId;

// Reindirizza alla pagina album
window.location.href = nuovoURL;
