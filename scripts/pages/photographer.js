import { photographerTemplate } from "../templates/photographer.js";
import { MediasTemplate } from "../templates/pictureMedia.js";
// Récupere l'id de l'url
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// Fonction asynchrone pour récupérer les détails d'un photographe par son ID
async function getPhotographer(id) {
  const response = await fetch("data/photographers.json");
  const data = await response.json();
   // Cherche le photographe correspondant à l'ID fourni
  const photographer = data.photographers.find(
    (photographer) => photographer.id == id
  );
  return photographer;
}
// Fonction asynchrone pour afficher les informations du photographe dans le header
async function displayDataPhotographer(photographer) {
  const photographHeader = document.querySelector(".photograph-header");
    // Utilise un template pour créer la représentation DOM du photographe
  const photographerModel = photographerTemplate(photographer);
  const photographerDom = photographerModel.getUserCardDOM();
  const price = document.querySelector("#price");
  price.textContent =  photographerModel.price + "€/Jour";
  const titleContact = document.querySelector(".modal_name");
  titleContact.textContent = photographerModel.name;
  console.log(photographerModel.name);
  photographHeader.appendChild(photographerDom);
}

// Fonction asynchrone pour récupérer les médias d'un photographe par son ID
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
// Fonction asynchrone pour configurer le lightbox
async function displayLightbox(media) {
  const container = document.querySelector(".lightbox_modal");
  const slide = document.createElement("div");
  slide.setAttribute("class", "slide");
  container.innerHTML = ""; // Nettoyer le contenu existant
  media.forEach((picture) => {
    const mediasModel = MediasTemplate(picture);
    const lightboxCardDOM = mediasModel.creatLightbox();
    container.appendChild(lightboxCardDOM);
  });
}
// Fonction pour calculer le nombre total de likes pour tous les médias
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
    // Ajoute un écouteur d'événements pour mettre à jour les likes lorsqu'un bouton est cliqué
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
// Fonction asynchrone pour trier les médias en fonction du filtre sélectionné
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
// Fonction d'initialisation qui récupère les données du photographe et affiche les médias
async function init() {
  // Récupère les datas du photographe
  const photographer = await getPhotographer(id);
  displayDataPhotographer(photographer);
  const medias = await getMediaByPhotographerId(id);
  displayMedias(medias);
  trieMedia(medias);
 
}
init();