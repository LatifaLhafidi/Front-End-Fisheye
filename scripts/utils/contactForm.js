function displayModal() {
    const modal = document.getElementById("contact_modal");
    const main = document.getElementById("main");
    const body = document.querySelector("body");
    const btnFermenture = document.querySelector(".fermer");
    modal.style.display = "block";
    main.setAttribute('aria-hidden', 'true')
    modal.setAttribute('aria-hidden', 'false')
    body.setAttribute('class', 'no-scroll')
    btnFermenture.focus()
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    const main = document.getElementById("main");
    const body = document.querySelector("body");
    const btnOpen = document.querySelector("contact_button");
    main.setAttribute('aria-hidden', 'false')
    modal.setAttribute('aria-hidden', 'true')
    modal.style.display = "none";
    body.removeAttribute('class', 'no-scroll');
    btnOpen.focus();


}
