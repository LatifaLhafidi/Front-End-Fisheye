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
  
  return photographerMedia;
}
async function displayMedia(media) {
  let totalLikes = 0;
  const picturesSection = document.querySelector(".afficherMedias");
  const price = document.querySelector("#price");
  
  media.forEach((picture) => {
    const mediasModel = MediasTemplate(picture);
    const MediaCardDOM = mediasModel.getPictursDom();
    picturesSection.appendChild( MediaCardDOM ); 
    price.textContent = mediasModel.price + "€/Jour";

    const encart = document.getElementById("nbLikes");
    let id = mediasModel.id + "like";
    totalLikes += mediasModel.likes; 
    encart.textContent = totalLikes;
    const likeButton = document.getElementById(id);
    mediasModel.isLiked=false;
    likeButton.addEventListener("click", function () {
      if (mediasModel.isliked) {
          totalLikes--;
          mediasModel.isliked = false;
      } else {
          totalLikes++;
          mediasModel.isliked = true;
      }
      encart.textContent = totalLikes;
  });
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
