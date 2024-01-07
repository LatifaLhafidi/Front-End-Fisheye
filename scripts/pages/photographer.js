import { photographerTemplate } from '../templates/photographer.js';
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
async function displayMedia(media) {
  const picturesSection = document.querySelector(".afficherMedias"); 
  const container = document.querySelector('.lightbox_modal');
  media.forEach((picture,index) => {
    const mediasModel = MediasTemplate(picture);
    const MediaCardDOM = mediasModel.getPictursDom(index);
    const lightboxCardDOM = mediasModel.creatLightbox();
    picturesSection.appendChild( MediaCardDOM ); 
    container.appendChild(lightboxCardDOM );
    //  console.log(index)

  
});

}
async function displayEncart(media) {
  const price = document.querySelector("#price");
  const encart = document.getElementById("nbLikes");
 
  let totalLikes = 0;
  media.forEach((picture) => {
    price.textContent = picture.price + "€/Jour";
    const mediasModel = MediasTemplate(picture);
    const MediaCardDOM = mediasModel.getPictursDom();
    let id = mediasModel.id ;
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
function trieMedia(medias){
  let mediasTries;
  const dropdownList = document.getElementById('dropdownList');
  dropdownList.addEventListener("click", function (event) {
    const target = event.target;
    const tri= target.getAttribute('data-value');
    console.log(tri);
    mediasTries = "";
    const container = document.querySelector('.afficherMedias');
    container.innerHTML = "";
    switch(tri){
      case'title':
      mediasTries=  medias.sort((a, b) =>a.title.localeCompare(b.title));
       displayMedia(mediasTries);
       console.log(mediasTries);
       break;
       case'date':
       mediasTries=medias.sort((a, b) => new Date(a.date) -new Date(b.date));
       displayMedia(mediasTries);
       console.log(mediasTries);

       break;
       case'popularité':
       mediasTries=medias.sort((a, b) => a.likes - b.likes);
       displayMedia(mediasTries);
       console.log(mediasTries);
       break;
       default:
                displayMedia(medias);
                break;
    }      
   
   });

}

// function trieMedia(photographerMedias) {
//   let mediasTries;
//   const tri = document.querySelector("#tri");
//   tri.addEventListener("change", function () {
//       mediasTries = "";
//       const container = document.querySelector('.afficherMedias');
//       container.innerHTML = "";
//       switch (tri.value) {
//           case 'popularity':
//               mediasTries = photographerMedias.sort((a, b) => b.likes - a.likes);
//               displayMedia(mediasTries);
//               break;

//           case 'date':
//               mediasTries = photographerMedias.sort((a, b) => new Date(b.date) - new Date(a.date));
//               displayMedia(mediasTries);
//               break;

//           case 'title':
//               mediasTries = photographerMedias.sort((a, b) => a.title.localeCompare(b.title));
//               displayMedia(mediasTries);
//               break;

//           default:
//               displayMedia(photographerMedias);
//               break;
//       }

//   });


// }
 
async function init() {
  // Récupère les datas du photographe
  const photographer = await getPhotographer(id);
  displayDataPhotographer(photographer);
 
  const medias = await getMediaByPhotographerId(id);
  displayMedia(medias);
  displayEncart(medias);
  trieMedia(medias);
 
}
init();
