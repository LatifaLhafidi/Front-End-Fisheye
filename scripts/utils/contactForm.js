function displayModal() {
  const focusableElements = document.querySelectorAll(
    '.btn_list, .menu-item, article a,[tabindex]:not([tabindex="-1"]),.photograph-header button'
  );
  focusableElements.forEach((element) => {
    element.setAttribute("tabindex", "-1");
  });
 
  const main = document.getElementById("main");
  const body = document.querySelector("body");
  main.setAttribute("aria-hidden", "true");
  main.setAttribute("tabindex", "-1");
  main.classList.replace("opened", "closed");
  body.setAttribute("class", "no-scroll"); 

  const modal = document.getElementById("contact_modal");
  modal.classList.replace('closed', 'opened')
  modal.setAttribute("aria-hidden", "false");
  modal.setAttribute('tabindex', '0');
  modal.style.display = "block";
  modal.focus();
  btnFermenture.focus();
  // const btnFermenture = document.querySelector(".close");
 
  document.addEventListener('keydown', e => {
    const key = e.key
    if (modal.getAttribute('aria-hidden') == 'false' && key === 'Escape')
     closeModal()
  })
  
}

function closeModal() {
  
  const main = document.getElementById("main");
  main.setAttribute("aria-hidden", "false");
  main.setAttribute('tabindex', '0');
  main.classList.replace('closed', 'opened')
  const body = document.querySelector("body");
  body.removeAttribute("class", "no-scroll");
  const modal = document.getElementById("contact_modal");
  modal.classList.replace('opened', 'closed')
  modal.setAttribute("aria-hidden", "true");
  modal.setAttribute('tabindex', '-1');
  modal.style.display = "none";
   
  const btnOpen = document.querySelector(".contact_button");
  btnOpen.focus();
  const focusableElements = document.querySelectorAll('.btn_list, .menu-item, article a,[tabindex]:not([tabindex="-1"]),.photograph-header button')
  focusableElements.forEach(element => {
    element.setAttribute('tabindex', '0')
  })


}
// Close modal when escape key is pressed
document.addEventListener("keyup", (e) => {
  const contact_modal = document.getElementById("contact_modal");

  if (e.key === "Escape") {
    // Fermer le modal lorsque la touche 'Escape' est pressée
    closeModal();
  }
});
function sendFormContact() {
  const name = document.getElementById("firstName").value;
  const lastname = document.getElementById("LastName").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  console.log("Prénom:", name);
  console.log("Nom:", lastname);
  console.log("Email:", email);
  console.log("Message:", message);
}

const form = document.querySelector(".contact_form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  sendFormContact();
  closeModal();
});
