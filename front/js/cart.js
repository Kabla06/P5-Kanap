// window.onload = localStorage.getItem("cart");
const str = window.location; // On est sur TELLE ou  TELLE page
const url = new URL(str); // URL = String
const id = url.searchParams.get("id");
let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);

if (cart == null) {
  cart = [];
}

// console.log(cart);

let total = 0;
let qtyTotal = 0;
// let inputQuantity = 0;

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
    // console.log(canapeInfos);
    for (let i = 0; i < cart.length; i++) {
      let unCanape = cart[i];

      const canapeFind = canapeInfos.find(
        (element) => element._id == unCanape.idItem
      );
      // console.log(canapeFind);

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

      /*

      const qtyInput = document.querySelector(".itemQuantity");
      console.log(qtyInput);
      // Ici, on selectionne .itemQuantity dans le HTML
      for (let k = 0; k < qtyInput.length; k++) {
        // Ici, on boucle dans le tableau qtyInput
        let input = qtyInput[k];
        // Ici, itération de qtyInput
        input.addEventListener("change", function quantityChanged(event) {
          // Au changement de valeur, la fonction s'effectue
          let cart = JSON.parse(localStorage.getItem("cart"));
          // Ici, on récupère le cart (avec la clé)
          input = event.target;

          localStorage.setItem("cart", JSON.stringify(cart));
          // Ici, on réactualise le cart avec un .setItem(())
        });
      }

      */

      //Utiliser la méthode splice() pour supprimer la valeur précédente ou juste trouver un moyen pour additionner proprement

      const qtyInput = document.querySelectorAll(".itemQuantity");
      console.log(qtyInput);

      for (let k = 0; k < qtyInput.length; k++) {
        let input = qtyInput[k];

        input.addEventListener("change", function quantityChanged() {
          // Splice() supprime la valeur et donc l'affichage dans le panier, pas la bonne solution
          if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
          } else {
            unCanape.quantityCanape += input.valueAsNumber;
          }
          localStorage.setItem("cart", JSON.stringify(cart));
          location.reload();
          console.log(quantityChanged);
        });
      }

      let totalLigne = canapeFind.price * unCanape.quantityCanape;
      total += totalLigne;
      qtyTotal += unCanape.quantityCanape;

      let removeItems = article.querySelector("p.deleteItem");

      removeItems.addEventListener("click", function consoleRemove() {
        let cart = JSON.parse(localStorage.getItem("cart"));
        let index = cart.findIndex(
          (produit) => produit.idItem == unCanape.idItem
        );
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
      });
    }

    console.log(total); // afficher cet let dans le html
    console.log(qtyTotal); // Pareil

    let htmlPrix = document.getElementById("totalPrice");
    htmlPrix.innerHTML = total;
    let htmlQty = document.getElementById("totalQuantity");
    htmlQty.innerHTML = qtyTotal;
  });

// let qtyInput = document.querySelectorAll(".itemQuantity");
// for (let k = 0; k < qtyInput.length; k++) {
//   let input = qtyInput[k];
//   input.addEventListener("change", quantityChanged);
// }
// function quantityChanged(event) {
//   let input = event.target;
//   if (isNaN(input.value) || input.value <= 0) {
//     input.value = 1;
//   }
// }
