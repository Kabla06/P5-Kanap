fetch("http://localhost:3000/api/products")
  // Requête GET : va faire une requête à l'API (l'appelle)
  .then(function (res) {
    // converti en format .json
    if (res.ok) {
      return res.json();
      // Si il y a une erreur, le dit en console.log
    } else res.rejected;
    return console.log("Error");
  })
  // paramètre 'tableauCanape'
  .then((tableauCanape) => {
    console.log(tableauCanape);
    // .length pour dire que c'est un tableau
    for (let i = 0; i < tableauCanape.length; i++) {
      // Ici, unCanape est = au canapé sur lequel nous nous situons (i en l'occurence)
      let unCanape = tableauCanape[i];
      let item = document.createElement("a");
      item.href = "/front/html/product.html";
      item.className = "product_id";
      item.id = "product_id";
      // unCanape.**** = ce qui se trouve dans l'API qu'on a appelé plus tôt / [i] = un canapé à chaque fois et boucle pour le faire sur tous les canapés
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
