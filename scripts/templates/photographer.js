function photographerTemplate(data) {
  const { id, name, portrait, tagline, price, country, city } = data;
  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    //création des element du DOM
    const article = document.createElement("article");
    const link = document.createElement("a");
    link.href = "./photographer.html?id=" + id;
    link.ariaLabel = name;

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.alt = "Photo du profil de " + data.name;

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const div = document.createElement("div");
    div.setAttribute("class", "infos");
    const locationInfos = document.createElement("p");
    locationInfos.setAttribute("class", "photographer_city");
    const taglineInfos = document.createElement("p");
    taglineInfos.setAttribute("class", "photographer_tagline");
    const priceInfos = document.createElement("p");
    taglineInfos.textContent = tagline;
    locationInfos.textContent = city + ", " + country;
    priceInfos.textContent = price + " €" + "/" + "jour";

    //affichage des éléments du dom en fonction de l'emplacement choisi
    article.appendChild(link);
    link.appendChild(img);
    div.appendChild(h2);
    div.appendChild(locationInfos);
    div.appendChild(taglineInfos);
    div.appendChild(priceInfos);
    article.appendChild(div);
    return article;
  }

  function getPhotographerDom() {
    const header = document.createElement("div");
    header.setAttribute("class", "photographer_container");

    // Div contains infos
    const divInfo = document.createElement("div");
    const h2 = document.createElement("h2");
    h2.textContent = name;
    h2.setAttribute("class", "photographer_name");
    divInfo.appendChild(h2);

    const cityText = document.createElement("p");
    cityText.textContent = city + ", " + country;
    cityText.setAttribute("class", "photographer_city");
    divInfo.appendChild(cityText);

    const taglineText = document.createElement("p");
    taglineText.textContent = tagline;
    taglineText.setAttribute("class", "photographer_tagline");
    divInfo.appendChild(taglineText);

    // Div contains contact button
    const divContact = document.createElement("div");
    const button = document.querySelector(".contact_button");
    divContact.appendChild(button);

    // Div contains picture
    const divPicture = document.createElement("div");
    const img = document.createElement("img");
    img.setAttribute("id", "photographer_picture");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    img.setAttribute("class", "photographer_picture");
    divPicture.appendChild(img);

    // Add div into header
    header.appendChild(divInfo);
    header.appendChild(divContact);
    header.appendChild(divPicture);
    return header;
  }

  return {
    name,  picture,  city, country, tagline, price, getUserCardDOM, getPhotographerDom,
  };
}
