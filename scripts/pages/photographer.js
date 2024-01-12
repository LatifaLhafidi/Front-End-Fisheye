import { photographerTemplate } from "../templates/photographer.js";
import { MediasTemplate } from "../templates/pictureMedia.js";
// Récupere l'id de l'url
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

//recupérer photographer by Id
async function getPhotographer(id) {
  const response = await fetch("data/photographers.json");
  const data = await response.json();
  const photographer = data.photographers.find(
    (photographer) => photographer.id == id
  );
  return photographer;
}
// Affiche les infos (header) du photographe

async function displayDataPhotographer(photographer) {
  const filterMenu = document.querySelector(".modal_name");
  filterMenu.innerHTML = photographer.name;
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
  return photographerMedia;
}
/* afficher les media et le lightbox*/
async function displayMedia(medias) {
  const price = document.querySelector("#price");
  const picturesSection = document.querySelector(".afficherMedias");
  picturesSection.innerHTML = ""; // Nettoyer le contenu existant

  if (picturesSection) {
  medias.forEach((picture, index) => {
    const mediasModel = MediasTemplate(picture);
    const MediaCardDOM = mediasModel.getPictursDom(index);
    picturesSection.appendChild(MediaCardDOM);
    price.textContent = picture.price + "€/Jour";

     displayEncart(medias) ;
     displayLightbox(medias);
    //  console.log(index)
  });
}
}
async function displayLightbox(media) {
  const container = document.querySelector(".lightbox_modal");
  container.innerHTML = ""; // Nettoyer le contenu existant
  media.forEach((picture) => {
    const mediasModel = MediasTemplate(picture);
    const lightboxCardDOM = mediasModel.creatLightbox();
    container.appendChild(lightboxCardDOM);
  });
}
 function displayEncart(medias) {
  let totalLikes = 0;
  medias.forEach((picture) => {
    const encart = document.getElementById("nbLikes");
    const mediasModel = MediasTemplate(picture);
    let id = mediasModel.id;
    totalLikes += mediasModel.likes;
    encart.textContent = totalLikes;
    mediasModel.isLiked = false;
    let likeButton = document.getElementById(id);
    if(likeButton){
    likeButton.addEventListener("click", function () {
      if (mediasModel.isLiked) {
        totalLikes--;
        mediasModel.isLiked = false;
      } else {
        totalLikes++;
        mediasModel.isLiked = true;
      }
      encart.textContent = totalLikes;
    });
  }
  });

}async function trieMedia(medias) {
  let mediasTries;
  const allFilters = Array.from(document.querySelectorAll(".dropdown_content li button"));
  const currentFilter = document.querySelector("#current_filter");

  allFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const tri = currentFilter.textContent;
      mediasTries = "";
      console.log(tri);
      switch (tri) {
        case "Titre":
          mediasTries = medias.slice().sort((a, b) => a.title.localeCompare(b.title));
          displayMedia(mediasTries);
          console.log(mediasTries);
          break;
        case "Date":
          mediasTries = medias.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
          displayMedia(mediasTries);
          console.log(mediasTries);
          break;
        case "Popularité":
          mediasTries = medias.slice().sort((a, b) => a.likes - b.likes);
          displayMedia(mediasTries);
          console.log(mediasTries);
          break;
        default:
          displayMedia(medias);
          break;
      }
    });
  });
}


async function init() {
  // Récupère les datas du photographe
  const photographer = await getPhotographer(id);
  displayDataPhotographer(photographer);
  const medias = await getMediaByPhotographerId(id);
  displayMedia(medias);
  trieMedia(medias);
}
init();
