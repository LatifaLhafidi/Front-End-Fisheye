function displayModal() {
    const modal = document.getElementById("contact_modal");
    const main = document.getElementById("main");
    const body = document.querySelector("body");
    const btnFermenture = document.querySelector(".close");
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
    const btnOpen = document.querySelector(".contact_button");
    main.setAttribute('aria-hidden', 'false')
    modal.setAttribute('aria-hidden', 'true')
    modal.style.display = "none";
    body.removeAttribute('class', 'no-scroll');
    btnOpen.focus();
}
// Close modal when escape key is pressed
document.addEventListener('keyup', e => {
    const contact_modal = document.getElementById('contact_modal');

    if (e.key === 'Escape') {
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
form.addEventListener("submit", function(event) {
	event.preventDefault();
	sendFormContact();
    closeModal();
});
