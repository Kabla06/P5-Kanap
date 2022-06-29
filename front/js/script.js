fetch("http://localhost:3000/api/products")
  // Requête GET : va faire une requête à l'API (l'appelle)
  .then(function (res) {
    // Première promesse : converti en format .json
    if (res.ok) {
      return res.json();
      // Si il y a une erreur, le dit en console.log
    } else res.rejected;
    return console.log("Error");
  })
  // Ensuite, créer une promesse ayant comme paramètre 'tableauCanape'
  .then((tableauCanape) => {
    console.log(tableauCanape);
    // .length pour qu'il ait la longueur du tableau (pouvoir adapter)
    for (let i = 0; i < tableauCanape.length; i++) {
      // Ici, unCanape est = au canapé sur lequel nous nous situons (i en l'occurence)
      let unCanape = tableauCanape[i];
      let item = document.createElement("a");
      item.href = "/front/html/product.html";
      item.className = "product_id";
      item.id = "product_id";
      // test 2eme template
      item.innerHTML = ` 
        <article>
          <img src="${unCanape.imageUrl}" alt="${unCanape.altTxt}">
          <h3 class="productName">${unCanape.name}</h3>
          <p class="productDescription">${unCanape.description}</p>
        </article>
      `;

      let sectionItems = document.getElementById("items");
      sectionItems.appendChild(item);

      item.href = `./product.html?id=${tableauCanape[i]._id}`;
    }
  });
// let article = document.createElement("article");
// item.appendChild(article);
// let imageCanap = document.createElement("img");
// imageCanap.className = "imageProduit";
// imageCanap.src = unCanape.imageUrl;
// imageCanap.alt = unCanape.altTxt;
// article.appendChild(imageCanap);
// let nomProduit = document.createElement("h3");
// nomProduit.className = "productName";
// nomProduit.innerText = unCanape.name;
// article.appendChild(nomProduit);
// let descriptionProduit = document.createElement("p");
// descriptionProduit.className = "productDescription";
// descriptionProduit.innerText = unCanape.description;
// article.appendChild(descriptionProduit);

/** Cette approche fonctionne aussi mais est peu recommandée car coûteuse en temps et en neurones, tout mes tests résumé en une douzaine de lignes AHAHAHAHAHAHA */
