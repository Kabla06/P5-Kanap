// window.onload = localStorage.getItem("cart");
const str = window.location; // On est sur TELLE ou  TELLE page
const url = new URL(str); // URL = String
const id = url.searchParams.get("id");
let cart = JSON.parse(localStorage.getItem("cart"));

if (cart == null) {
  cart = [];
}

console.log(cart);

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

  .then((canapeInfos) => {
    console.log(canapeInfos);
    for (let i = 0; i < cart.length; i++) {
      let unCanape = cart[i];

      // Fonction fléchée qui permet d'aller chercher dans le tableau canapeInfos l'id correspondant dans le unCanape (cart[i])
      // Renvoie un booléen false tant qu'il n'a pas de correspondance
      const canapeFind = canapeInfos.find(
        (element) => element._id == unCanape.idItem
      );
      console.log(canapeFind);

      let article = document.createElement("article");
      article.className = "cart__item";
      article.id = "cart__item";
      article.dataset.id = unCanape.idItem;
      article.dataset.color = unCanape.couleurCanape;
      article.innerHTML = `
            <div class="cart__item__img">
                <img src="${canapeFind.imageUrl}" alt="${canapeFind.altTxt}">
            </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${canapeFind.name}</h2>
                        <p>${unCanape.couleurCanape}</p>
                        <p>${canapeFind.price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : ${unCanape.quantityCanape}</p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
        `;

      let sectionCart = document.createElement("section");
      sectionCart.id = "cart__items";
      sectionCart = document.getElementById("cart__items");
      sectionCart.appendChild(article);
    }
  });
