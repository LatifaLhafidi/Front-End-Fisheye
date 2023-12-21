// Récupere l'id de l'url
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

//recupérer photographer by Id
async function getPhotographer(id) {
  console.log(id);
  const response = await fetch("data/photographers.json");
  const data = await response.json();
  const photographer = data.photographers.find(
    (photographer) => photographer.id == id
  );
  console.log(photographer);

  return photographer;
}
// Affiche les infos (header) du photographe

async function displayDataPhotographer(photographer) {
  // console.log(photographer);
  // const h2 = document.createElement('h2');
  // h2.textContent= "latifa";
  const photographHeader = document.querySelector(".photograph-header");
  const photographerModel = photographerTemplate(photographer);
  const photographerDom = photographerModel.getUserCardDOM();
  photographHeader.appendChild(photographerDom);
}
// Récupère les photos du photographe
async function getMediaByPhotographerId(id) {
  const response = await fetch("data/photographers.json");
  const data = await response.json();

  const photographerMedia = [];

  for (const media of data.media) {
    if (media.photographerId == id) {
      photographerMedia.push(media);
    }
  }
  console.log(photographerMedia);
  return photographerMedia;
}
async function displayMedia(media) {
  const picturesSection = document.querySelector(".afficherMedias");
  media.forEach((picture) => {
    const mediarModel = MediasTemplate(picture);
    const MediaCardDOM = mediarModel.getPictursDom();
    picturesSection.appendChild( MediaCardDOM );
  });
}

async function init() {
  // Récupère les datas du photographe
  const photographer = await getPhotographer(id);
  displayDataPhotographer(photographer);
  const medias = await getMediaByPhotographerId(id);
  displayMedia(medias);
}
init();
