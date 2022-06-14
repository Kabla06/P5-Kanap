/*

// Boucle qui affiche 10 canaps (de 0 à 10 incré de 1)
for (let i = 0; i < 4; i++) {
  // Creation d'éléments HTML dans le JS pour pouvoir les tweak auto
  let item = document.createElement("a");
  item.href = "./product.html?id=42";
  let article = document.createElement("article");
  item.appendChild(article);
  let imageCanap = document.createElement("img");
  imageCanap.classList = "imageProduit";
  (imageCanap.src = ""),
    (imageCanap.alt = "Lorem ipsum dolor sit amet, Kanap name1");
  article.appendChild(imageCanap);
  let nomProduit = document.createElement("h3");
  nomProduit.classList = "productName";
  article.appendChild(nomProduit);
  let descriptionProduit = document.createElement("p");
  descriptionProduit.classList = "productDescription";
  article.appendChild(descriptionProduit);

  let sectionItems = document.getElementById("items");
  sectionItems.appendChild(item);
}

*/

const img = document.getElementsByClassName(".imageProduit");

fetch("http://localhost:3000/api/products")
  // Requête GET : va faire une requête à l'API (l'appelle)
  .then(function (res) {
    // Première promesse : converti en format .json
    if (res.ok) {
      return res.json();
    }
  })

  // .then((data) => console.log(data[0]))   // Deuxième promesse (facultative) : montre sous forme de tableau [array]

  .then((data) => (img.src = data[0].url));
{
  for (let i = 0; i < 4; i++) {
    // Creation d'éléments HTML dans le JS pour pouvoir les tweak auto
    let item = document.createElement("a");
    item.href = "";
    let article = document.createElement("article");
    item.appendChild(article);
    let imageCanap = document.createElement("img");
    imageCanap.classList = "imageProduit";
    (imageCanap.src = ""),
      (imageCanap.alt = "");
    article.appendChild(imageCanap);
    let nomProduit = document.createElement("h3");
    nomProduit.classList = "productName";
    article.appendChild(nomProduit);
    let descriptionProduit = document.createElement("p");
    descriptionProduit.classList = "productDescription";
    article.appendChild(descriptionProduit);

    let sectionItems = document.getElementById("items");
    sectionItems.appendChild(item);
  }
  let image = document.getElementsByClassName("imageProduit");
  let sectionItems = document.getElementById("items");

  sectionItems.addEventListener("mouseover", function () {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        image.src = result.message;
      })
      .catch((err) => console.log(err));
  });
}
