export function MediasTemplate(data) {
  const { id, photographerId, title, image, video, likes, date, price } = data;
  const picture = `./assets/images/${photographerId}/${image}`;
  const mediaVideo = `./assets/images/${photographerId}/${video}`;

  function getPictursDom(index) {
    //création des éléments du dom
    const article = document.createElement("article");
    article.setAttribute("class", "media");
    article.setAttribute("tabindex", "${index}");
    /* description d'image*/
    const section = document.createElement("section");
    const p = document.createElement('p');
    p.setAttribute("aria-label", title);
    p.textContent = title;
    const pLike = document.createElement("div");
    const comptLike = document.createElement("span");
    comptLike.setAttribute('role', 'text');
    comptLike.textContent = likes;
    const buttonHeart = document.createElement('button');
    const likeButton = document.createElement('i');
    likeButton.setAttribute("style", "cursor:pointer");
    likeButton.setAttribute("id", id);
    likeButton.setAttribute('aria-label', 'likes');
    likeButton.setAttribute("class", "far fa-heart");
    buttonHeart.appendChild(likeButton);

    /* gestion des likes */
    data.isLiked = false;
    likeButton.addEventListener("click", function () {
      if ((likeButton.classList.contains("far"))) {
        likeButton.classList.remove("far");
        likeButton.classList.add("fas");
        likeButton.style.color = "#901C1C";
        data.likes += 1;
        comptLike.innerHTML = data.likes;
        data.isLiked = true;
      } else if ((likeButton.classList.contains("fas"))) {
        likeButton.classList.remove("fas");
        likeButton.classList.add("far");
        data.likes -= 1;
        comptLike.innerHTML = data.likes;
        data.isLiked = false;

      }
    });


    /*gestion de lightbox*/
    const lienLightBox = document.createElement("a");
    lienLightBox.setAttribute("class", "lienLightBox");
    lienLightBox.setAttribute("style", "cursor:pointer");
    lienLightBox.setAttribute("onclick", `openLightbox(${index})`);
    lienLightBox.setAttribute("tabindex", "${index}");
    //affichage des éléments du dom en fonction de l'emplacement choisi
    if (data.image) {
     const img =createImagePicture();
      lienLightBox.appendChild(img);
    } else if (data.video) {
      const video=createVideoPicture();    
      lienLightBox.appendChild(video);
    }
    article.appendChild(lienLightBox);
    article.appendChild(section);
    section.appendChild(p);
    section.appendChild(pLike);
    pLike.appendChild(comptLike);
    pLike.appendChild(likeButton);

    return article;
  }

   function createImagePicture() {
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", title);
    img.setAttribute("aria-role", "img");
    return img;

   }
   function createVideoPicture(){
    const video = document.createElement("video");
    const source = document.createElement("source");
    const pVideo = document.createElement("p");
    const lienVideo = document.createElement("a");
    // accessibilité pour la video
    source.setAttribute("src", mediaVideo);
    video.setAttribute("preload","metadata");
    video.setAttribute('aria-label', 'title');
    source.setAttribute("type", "video/mp4");
    lienVideo.setAttribute("href", mediaVideo);
    pVideo.textContent =
      "Votre navigateur ne prend pas en charge les vidéos. Voici, à la place, un ";
    lienVideo.textContent = "lien vers la vidéo";
    video.appendChild(source);
    video.appendChild(pVideo);
    pVideo.appendChild(lienVideo);
    return video;
   }

  
  function creatLightbox() {
    const slide = document.createElement("div");
    slide.setAttribute("class", "slide");
    slide.setAttribute("aria-label", "image closeup view");
    const h3 = document.createElement('h3');
    h3.setAttribute("aria-label", title);
    h3.textContent = title;
    let lightboxDiv;
    //affichage dans la lightboxh

    if (data.image) {
      lightboxDiv=createImagePicture();
    } else {
      lightboxDiv=createVideoPicture();
      lightboxDiv.setAttribute("controls", true);
      
    }

    slide.appendChild( lightboxDiv);
    slide.appendChild(h3);
    return slide;
  }
  return { id, title, picture, likes, date, price, getPictursDom, creatLightbox };

}