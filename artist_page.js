// Funzione per ottenere il parametro dell'URL
function getUrlParameter(name) {
  name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const artistId = getUrlParameter("artistId");

fetch(`https://deezerdevs-deezer.p.rapidapi.com/artist/${artistId}`, {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "9d6bfcc177msh2d11ca23a04202ep104be7jsn9e7420c2619b",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Errore durante il recupero dei dati dell'artista");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Dati dell'artista:", data);
    let artistName = document.getElementById("artistName");
    artistName.innerText = data.name;
    let numFan = document.getElementById("numFan");
    numFan.innerText = data.nb_fan;
    let immagineArtista = document.getElementById("immagineArtista");
    immagineArtista.style.backgroundImage = `url('${data.picture_big}')`;
    immagineArtista.style.backgroundSize = "cover";
    immagineArtista.style.backgroundPosition = "top";
    immagineArtista.style.overflow = "hidden";
  })
  .catch((error) => {
    console.error("Si è verificato un errore", error);
  });
