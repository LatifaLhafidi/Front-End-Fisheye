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
  const price = document.querySelector("#price");
  const photographHeader = document.querySelector(".photograph-header");
  const photographerModel = photographerTemplate(photographer);
  const photographerDom = photographerModel.getUserCardDOM();
  price.textContent =  photographerModel.price + "€/Jour";
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
async function displayMedias(medias) {
  const picturesSection = document.querySelector(".afficherMedias");
  picturesSection.innerHTML = ""; // Nettoyer le contenu existant
  if (picturesSection) {
  medias.forEach((picture, index) => {
    const mediasModel = MediasTemplate(picture);
    const MediaCardDOM = mediasModel.getPictursDom(index);
    picturesSection.appendChild(MediaCardDOM);
    CalculTotalLikes(medias);
    displayLightbox(medias);
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
function CalculTotalLikes(medias) {
  
  const encart = document.getElementById("nbLikes");
  let totalLikes = 0;
  medias.forEach((picture) => {
    const mediasModel = MediasTemplate(picture);
    let id = mediasModel.id;
    totalLikes += mediasModel.likes;
    encart.textContent = totalLikes;
    mediasModel.isLiked = false;

    let likeButton = document.getElementById(id);

    if (likeButton) {
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

}

async function trieMedia(medias) {
  const allFilters = Array.from(document.querySelectorAll(".dropdown_content li button"));
  const currentFilter = document.querySelector("#current_filter");

  allFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const tri = currentFilter.textContent;
      let mediasTries = [];

      switch (tri) {
        case "Titre":
          mediasTries = medias.slice().sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "Date":
          mediasTries = medias.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        case "Popularité":
          // Tri par le nombre de likes
          mediasTries = medias.slice().sort((a, b) => b.likes - a.likes);
          break;
        default:
          mediasTries = medias;
          break;
      }

      displayMedias(mediasTries);
    });
  });
}




async function init() {
  // Récupère les datas du photographe
  const photographer = await getPhotographer(id);
  displayDataPhotographer(photographer);
  const medias = await getMediaByPhotographerId(id);
  displayMedias(medias);
  trieMedia(medias);
 
}
init();
