function MediasTemplate(data) {
  const { id, photographerId, title, image, video, likes, date, price } = data;
  const picture = `./assets/images/${photographerId}/${image}`;
  const mediaVideo = `./assets/images/${photographerId}/${video}`;

  function getPictursDom() {
    //création des éléments du dom
    const article = document.createElement("article");
    article.setAttribute("class", "media");
    /* description d'image*/ 
    const section = document.createElement("section");
    const p = document.createElement('p');
    p.setAttribute("aria-label", title);
    p.textContent = title;
    const pLike =document.createElement("div");
    const comptLike =document.createElement("span");
    comptLike.setAttribute('role', 'text');
    comptLike.textContent=likes;
    const likeButton = document.createElement('i');
    likeButton.setAttribute('role', 'button');
    likeButton.setAttribute("id", id);  
    likeButton.setAttribute('aria-label', 'likes');
    likeButton.setAttribute("tabindex", "0");
    likeButton.setAttribute("class", "far fa-heart");

/* gestion des likes */   
    data.isLiked = false;
    likeButton.addEventListener("click", function(){
      if ((likeButton.classList.contains("far")) ) {
        likeButton.classList.remove("far");
				likeButton.classList.add("fas");
				likeButton.style.color = "#901C1C";
				const newLikes = likes + 1;
				comptLike.textContent = newLikes;
				data.isLiked=true;
    } else if((likeButton.classList.contains("fas")) ) {
      likeButton.classList.remove("fas");
      likeButton.classList.add("far");
      comptLike.textContent = likes;
      data.isLiked=false;

    }	
		});
   

    /*gestion de lightbox*/ 
    const lienLightBox = document.createElement("a"); 
    lienLightBox.setAttribute("class", "lienLightBox");
    lienLightBox.setAttribute("style", "cursor:pointer");
    lienLightBox.setAttribute("onclick", "openLightbox()");
  
    //affichage des éléments du dom en fonction de l'emplacement choisi
    if (data.image) {
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      img.alt = "Photo du profil de " + data.title;
      lienLightBox.appendChild(img);
    } else if (data.video) {
      const video = document.createElement("video");
      const source = document.createElement("source");
      const pVideo = document.createElement("p");
      const lienVideo = document.createElement("a");
      // accessibilité pour la video
      source.setAttribute("src", mediaVideo);
      video.setAttribute("controls", true);
      video.setAttribute('aria-label', 'title');
      source.setAttribute("type", "video/mp4");
      lienVideo.setAttribute("href", mediaVideo);
      pVideo.textContent =
        "Votre navigateur ne prend pas en charge les vidéos. Voici, à la place, un ";
      lienVideo.textContent = "lien vers la vidéo";
      video.appendChild(source);
      video.appendChild(pVideo);
      pVideo.appendChild(lienVideo);
      lienLightBox.appendChild(video);
    }
    article.appendChild(lienLightBox);
    article.appendChild(section);
    section.appendChild(p);
    section.appendChild(pLike);
    pLike.appendChild(comptLike);
    pLike.appendChild(likeButton);

    return article;

     /* les element de lightbox*/ 
   
  }
  function creatLightbox() {
      const imgLightbox = document.createElement('img');
     const videoLightbox = document.createElement('video');
     const sourceLightbox = document.createElement('source');
     const titleLightbox = document.createElement('p'); 

     videoLightbox.setAttribute("controls", true);
     sourceLightbox.setAttribute("type", "video/mp4");
     videoLightbox.setAttribute("aria-role", "img");
     videoLightbox.setAttribute('aria-label', 'title');

     imgLightbox.setAttribute("src", picture);
     imgLightbox.setAttribute("alt", title);
     imgLightbox.setAttribute("aria-role", "Lilac breasted roller");
     titleLightbox.setAttribute("class", "textLightbox");
     titleLightbox.setAttribute("aria-label", title);  
    //affichage dans la lightbox
    
     const slide = document.createElement('div'); 
    slide.setAttribute("class", "slide");
    slide.setAttribute("aria-label", "image closeup view");
    if (data.image) {
        slide.appendChild(imgLightbox);
        slide.appendChild(titleLightbox);
    } else {
        slide.appendChild(videoLightbox);
        videoLightbox.appendChild(sourceLightbox);
        slide.appendChild(titleLightbox);
    }
    return slide;


  }


  return {id, title, picture, likes, date, price, getPictursDom,creatLightbox};
  
}