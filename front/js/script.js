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

const img = document.getElementsByClassName(".imageProduit")

fetch('http://localhost:3000/api/products')
// Requête GET : va faire une requête à l'API (l'appelle)
  .then(res => res.json())
  // Première promesse : converti en format .json
/*
  .then(data => console.log(data))   // Deuxième promesse (facultative) : montre sous forme de tableau [array]
*/
  .then(data => img.src = data[0].url)
  // Devrait mettre le premier élément du tableau dans la source de mon <img> mais ne le fait pas ?