function MediasTemplate(data) {
  const { id, photographerId, title, image, video, likes, date, price } = data;
  const picture = `./assets/images/${photographerId}/${image}`;
  const mediaVideo = `./assets/images/${photographerId}/${video}`;

  function getPictursDom() {
    //création des éléments du dom
    const article = document.createElement("article");
    article.setAttribute('role', 'dialog'); 
    article.setAttribute("class", "media");
    const section = document.createElement("section");
    const p = document.createElement('p');
    p.setAttribute("aria-label", title);
    p.textContent = title;
    const pLike =document.createElement("div");
    pLike.setAttribute("id", id);
    const comptLike =document.createElement("span");
    comptLike.setAttribute('role', 'text');
    comptLike.setAttribute('class', 'cplike');
    comptLike.textContent=likes;
    const likeButton = document.createElement('i');
    let idButton = id + "like";  
    likeButton.setAttribute('role', 'button');
    likeButton.setAttribute("id", idButton);  
    likeButton.setAttribute('aria-label', 'Likes');
    likeButton.setAttribute("tabindex", "0");
/*gestion des likes*/   
    data.isLiked = false;
    let totalLikes=0;
    const nbLikes = parseInt(likes)
    totalLikes += nbLikes;

    if (data.isLiked) {
      likeButton.setAttribute("class", "fa-solid fa-heart");
  } else {
      likeButton.setAttribute("class", "fa-regular fa-heart");
  }
  comptLike.textContent = totalLikes+ "";

    likeButton.addEventListener("click", function(){
      if (data.isLiked) {
        totalLikes--;
        data.isLiked = false;
        likeButton.setAttribute("class", "fa-regular fa-heart");
    } else {
        totalLikes++;
        data.isLiked = true;
        likeButton.setAttribute("class", "fa-solid fa-heart");
    }

    comptLike.textContent = totalLikes + " ";
		
		});
   

    // likeButton.setAttribute("title", "likes");
    // likeButton.setAttribute("id", idButton);

    const lienLightBox = document.createElement("div");
    lienLightBox.setAttribute("class", "lienLightBox");
    lienLightBox.setAttribute("style", "cursor:pointer");
    lienLightBox.addEventListener("click",  openLightbox);
  
    /* modal*/ 
    
    // section.setAttribute('role', 'dialog'); 
    const imgLightbox = document.createElement('img');
    const videoLightbox = document.createElement('video');
    const sourceLightbox = document.createElement('source');
    const titleLightbox = document.createElement('p'); 
    // insertion des attributs des éléments de modal lightbox
    videoLightbox.setAttribute("controls", true);
    sourceLightbox.setAttribute("type", "video/mp4");
    videoLightbox.setAttribute("aria-role", "img");
    videoLightbox.setAttribute('aria-label', 'title');
    imgLightbox.setAttribute("src", picture);
    imgLightbox.setAttribute("alt", title);
    imgLightbox.setAttribute("aria-role", "Lilac breasted roller");
    titleLightbox.setAttribute("class", "textLightbox");
    titleLightbox.setAttribute("aria-label", title);  


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

    //affichage dans la lightbox
    const container = document.querySelector('.lightbox_modal');
    const slide = document.createElement('div');
     
    
    slide.setAttribute("class", "slide");
    slide.setAttribute("aria-label", "image closeup view")
    container.appendChild(slide);
    if (data.image) {
        slide.appendChild(imgLightbox);
        slide.appendChild(titleLightbox);
    } else {
        slide.appendChild(videoLightbox);
        videoLightbox.appendChild(sourceLightbox);
        slide.appendChild(titleLightbox);
    }
   
    return article;
  }

  return {id, title, picture, likes, date, price, getPictursDom};
  
}