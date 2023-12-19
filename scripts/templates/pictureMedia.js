function MediasTemplate(data) {

    const { id, photographerId, title, image, video, likes, date, price } = data;
    const picture = `./assets/images/${photographerId}/${image}`;
    const mediaVideo = `./assets/images/${photographerId}/${video}`;

    function getPictursDom() {
         //création des éléments du dom
        const article = document.createElement( 'article' );
        const div = document.createElement( 'div' );
        const img = document.createElement( 'img' );
        const video = document.createElement('video')
        const source = document.createElement('source');
        const pVideo = document.createElement('p');
        const lienVideo = document.createElement('a');

        //insertion des attributs des éléments
        //accessibilité img
        img.setAttribute("src", picture);
        img.alt = 'Photo du profil de ' + data.title;
        // accessibilité pour la video 
        source.setAttribute("src", mediaVideo);
        video.setAttribute("controls", true);
        source.setAttribute("type", "video/mp4");
        lienVideo.setAttribute("href", mediaVideo);
         //indication des textes à afficher
         pVideo.textContent="Votre navigateur ne prend pas en charge les vidéos. Voici, à la place, un ";
         lienVideo.textContent = "lien vers la vidéo";
           //affichage des éléments du dom en fonction de l'emplacement choisi
        if (data.image){
            div.appendChild(img);
          

        }else{
            div.appendChild(video);
            video.appendChild(source);
            video.appendChild(pVideo);
            pVideo.appendChild(lienVideo);
        }
        article.appendChild(div);
        return (article);
        

    }
    return { title, picture, likes, date, price,getPictursDom};
}