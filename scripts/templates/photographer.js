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
    img.setAttribute("class", "photographer_picture");

    // Div contains contact button
    const divContact = document.createElement("div");
    const button = document.querySelector(".contact_button");
    if (button != null) {
      divContact.appendChild(button);
    }

    const h2 = document.createElement("h2");
    h2.setAttribute("class", "photographer_name");
    h2.textContent = name;

    const div = document.createElement("div");
    div.setAttribute("class", "infos");

    const locationInfos = document.createElement("p");
    locationInfos.setAttribute("class", "photographer_city");
    locationInfos.textContent = city + ", " + country;

    const taglineInfos = document.createElement("p");
    taglineInfos.setAttribute("class", "photographer_tagline");
    taglineInfos.textContent = tagline;

    const priceInfos = document.createElement("p");
    priceInfos.textContent = price + " €" + "/" + "jour";
    priceInfos.setAttribute("class", "photographer_price");

    //affichage des éléments du dom en fonction de l'emplacement choisi
    article.appendChild(link);
    link.appendChild(img);
    div.appendChild(h2);
    div.appendChild(locationInfos);
    div.appendChild(taglineInfos);
    div.appendChild(priceInfos);
    article.appendChild(divContact);
    article.appendChild(div);

    return article;
  }

  return {
    name,
    picture,
    city,
    country,
    tagline,
    price,
    getUserCardDOM,
  };
}
