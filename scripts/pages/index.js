// import { photographerTemplate } from "../templates/photographer.js";
   import { photographerTemplate } from '../templates/photographer.js';
async function getPhotographers() {
  const reponse = await fetch("data/photographers.json",  {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Request-Method": "*",
    },

  });
  const photographers = await reponse.json();
  console.log(photographers.photographers);
  return photographers;
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
