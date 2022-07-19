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
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${unCanape.quantityCanape}">
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

      let qtyInput = article.querySelector(".itemQuantity");
      console.log(qtyInput);

      qtyInput.addEventListener("change", function quantityChanged() {
        // Splice() supprime la valeur et donc l'affichage dans le panier, pas la bonne solution
        console.log(qtyInput.value);
        if (isNaN(qtyInput.value) || qtyInput.value <= 0) {
          qtyInput.value = 1;
        } else {
          unCanape.quantityCanape = qtyInput.valueAsNumber;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
      });

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

////////////// REGEX ou Expressions régulières //////////////
/*

/^[a-z][a-z '-.,]{1,31}$|^$/i
/^ = Déclare le début du scan
[a-z][a-z '-.,] = listing de tous les caractères acceptés sous forme de tableau
{1,31} = limite de caractère
/i = case insensitive

*/

//////////// REGEX QUI MARCHE + EXPLICATIONS ////////////

function getForm() {
  let form = document.querySelector(".cart__order__form");

  // Liste des regex pour les différentes vérifs
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressRegExp = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );

  // Fonctions qui vont servir à voir sur un "change" si c'est validé ou pas
  form.firstName.addEventListener("change", function () {
    // Vérifie le contenu de form > firstName sur un "change"
    const validFirstName = function (inputFirstName) {
      let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

      // Ici, on test la valeur du paramètre inputFirstName en passant par charRegExp = document.querySelector(".cart__order__form"); > firstName
      if (charRegExp.test(inputFirstName.value)) {
        // Si rien en se passe, on écrit rien
        firstNameErrorMsg.innerHTML = "";
      } else {
        // Si il y a une erreur, on écrit quelque chose et le texte est en rouge
        firstNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
        firstNameErrorMsg.style = "color: red";
      }
    };
    validFirstName(this);
  });

  form.lastName.addEventListener("change", function () {
    const validLastName = function (inputLastName) {
      let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");

      if (charRegExp.test(inputLastName.value)) {
        lastNameErrorMsg.innerHTML = "";
      } else {
        lastNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
        lastNameErrorMsg.style = "color: red";
      }
    };
    validLastName(this);
  });

  form.address.addEventListener("change", function () {
    const validAddress = function (inputAddress) {
      let addressErrorMsg = document.getElementById("addressErrorMsg");

      if (addressRegExp.test(inputAddress.value)) {
        addressErrorMsg.innerHTML = "";
      } else {
        addressErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
        addressErrorMsg.style = "color: red";
      }
    };
    validAddress(this);
  });

  form.city.addEventListener("change", function () {
    const validCity = function (inputCity) {
      let cityErrorMsg = document.getElementById("cityErrorMsg");

      if (charRegExp.test(inputCity.value)) {
        cityErrorMsg.innerHTML = "";
      } else {
        cityErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
        cityErrorMsg.style = "color: red";
      }
    };
    validCity(this);
  });

  form.email.addEventListener("change", function () {
    const validEmail = function (inputEmail) {
      let emailErrorMsg = document.getElementById("emailErrorMsg");

      if (emailRegExp.test(inputEmail.value)) {
        emailErrorMsg.innerHTML = "";
      } else {
        form.email.setCustomValidity("Veuillez renseigner votre email.");
        emailErrorMsg.style = "color: red";
      }
    };
    validEmail(this);
  });
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    form.email.checkValidity(); // renvoie un booléen
    form.firstName.checkValidity();
    form.lastName.checkValidity();
    form.city.checkValidity();
    form.address.checkValidity();
  });
}
getForm();
