function openLightbox(index) {
    const modal = document.querySelector(".lightbox");
    modal.style.display = "block";
    slideIndex = parseInt(index)+1
    // console.log(index);
    showSlides( slideIndex);

}

function closeLightbox(){
    const modal = document.querySelector(".lightbox");
    modal.style.display = "none";
   
}
let slideIndex = 1;
showSlides(slideIndex);


function next() {
    slideIndex = slideIndex + 1;
    showSlides(slideIndex);
}
function previous() {
    slideIndex = slideIndex - 1;
    showSlides(slideIndex);
}

function showSlides(slideIndex) {

    let slides = document.getElementsByClassName("slide");

    if (slideIndex > slides.length) { slideIndex = 0 }
    if (slideIndex < 1) { slideIndex = slides.length }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    if (slideIndex - 1 >= 0) {
        console.log(slideIndex + "-1");
        slides[slideIndex - 1].style.display = "block";
    }
}