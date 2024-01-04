function openLightbox() {
    const modal = document.querySelector(".lightbox");
    modal.style.display = "block";
    showSlides(slideIndex);
   
}

// function next() {
//     slideIndex = slideIndex + 1;
//     showSlides(slideIndex);
// }

// function previous() {
//     slideIndex = slideIndex - 1;
//     showSlides(slideIndex);
// }
// function closeLightbox(){
//     const modal = document.querySelector(".lightbox");
//     modal.style.display = "none";
   
// }
// let slideIndex = 1;
// showSlides(slideIndex);

// function showSlides(n) {
//     var i;

//     let slides = document.getElementsByClassName("slide");

//     if (n > slides.length) {slideIndex = 1}
//     if (n < 1) {slideIndex = slides.length}
//     for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none";
//     }

//     for (let i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none";
//     }

//     slides[slideIndex-1].style.display = "block";

// }
