// window.onload = localStorage.getItem("cart");
const str = window.location; // On est sur TELLE ou  TELLE page
const url = new URL(str); // URL = String
const id = url.searchParams.get("id");
let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);

if (cart == null) {
  cart = [];
}

let total = 0;
let qtyTotal = 0;

fetch("http://localhost:3000/api/products")
  // Requête GET : va faire une requête à l'API (l'appelle)
  .then(function (res) {
    // converti en format .json
    if (res.ok) {
      return res.json();
    } else res.rejected;
    return console.log("Error");
  })

  // Modifie le HTML en ajoutant les informations de l'API (let unCanape = cart[i]; et canapeFind)
  .then((canapeInfos) => {
    for (let i = 0; i < cart.length; i++) {
      let unCanape = cart[i];

      const canapeFind = canapeInfos.find(
        (element) => element._id == unCanape.idItem
      );

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

      // Fonction qui permet de changer la quantité d'un article dans la page panier et qui empêche que la quantité soit négative ou de 0.
      qtyInput.addEventListener("change", function quantityChanged() {
        if (isNaN(qtyInput.value) || qtyInput.value <= 0) {
          qtyInput.value = 1;
        } else {
          unCanape.quantityCanape = qtyInput.valueAsNumber;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
      });

      // Multiplie le prix de l'article dans l'API avec celui celui que l'on est en train de changer dans le cart. (let unCanape = cart[i];) Ajoute aussi la quantité de façon dynamique.
      let totalLigne = canapeFind.price * unCanape.quantityCanape;
      total += totalLigne;
      qtyTotal += unCanape.quantityCanape;

      let removeItems = article.querySelector("p.deleteItem");

      // Fonction qui permet en faisant la correspondance avec l'API et l'item dans le cart, de supprimer l'article de son choix.
      removeItems.addEventListener("click", function consoleRemove() {
        let cart = JSON.parse(localStorage.getItem("cart"));
        // Va chercher dans le tableau cart l'id et la couleur correspondant à la valeur du paramètre. Vérifie que lorsque l'on clique, l'article correspond bien avec celui dans le cart.
        let index = cart.findIndex(
          (produit) =>
            produit.idItem == unCanape.idItem &&
            produit.couleurCanape == unCanape.couleurCanape
        );
        // .splice(index, 1) permet de supprimer un élément d'un tableau. index est le paramètre (plus haut pour la correspondance et le num est la quantité à supprimer.)
        cart.splice(index, 1);
        // Ré actualise le localStorage et rafraichit la page pour afficher le panier avec l'article en moins.
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
      });
    }

    console.log(total);
    console.log(qtyTotal);

    let htmlPrix = document.getElementById("totalPrice");
    htmlPrix.innerHTML = total;
    let htmlQty = document.getElementById("totalQuantity");
    htmlQty.innerHTML = qtyTotal;
  });

////////////// REGEX ou Expressions régulières //////////////
/*

^[a-z][a-z '-.,]{1,31}$|^$/i
^ = Déclare le début du scan
[a-z][a-z '-.,] = listing de tous les caractères acceptés sous forme de tableau
{1,31} = limite de caractère
/i = case insensitive

*/

//////////// REGEX QUI MARCHE + EXPLICATIONS ////////////
// Liste des regex pour les différentes vérifs
let emailRegExp = new RegExp(
  "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
);
let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
let addressRegExp = new RegExp(
  "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
);

let form = document.querySelector(".cart__order__form");

function isFirstNameValid() {
  let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

  // Ici, on test la valeur du paramètre inputFirstName en passant par charRegExp = document.querySelector(".cart__order__form"); > firstName
  if (charRegExp.test(form.firstName.value)) {
    // Si rien en se passe, on écrit rien
    firstNameErrorMsg.innerHTML = "";
    return true;
  } else {
    // Si il y a une erreur, on écrit quelque chose et le texte est en rouge
    firstNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    // form.firstName.setCustomValidity("Veuillez renseigner ce champ.");
    firstNameErrorMsg.style = "color: red";
    return false;
  }
}

function isLastNameValid() {
  let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");

  if (charRegExp.test(form.lastName.value)) {
    lastNameErrorMsg.innerHTML = "";
    return true;
  } else {
    lastNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    // form.lastName.setCustomValidity("Veuillez renseigner ce champ.");
    lastNameErrorMsg.style = "color: red";
    return false;
  }
}

function isAddressValid() {
  let addressErrorMsg = document.getElementById("addressErrorMsg");

  if (addressRegExp.test(form.address.value)) {
    addressErrorMsg.innerHTML = "";
    return true;
  } else {
    addressErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    // form.address.setCustomValidity("Veuillez renseigner ce champ.");
    addressErrorMsg.style = "color: red";
    return false;
  }
}

function isCityValid() {
  let cityErrorMsg = document.getElementById("cityErrorMsg");

  if (charRegExp.test(form.city.value)) {
    cityErrorMsg.innerHTML = "";
    return true;
  } else {
    cityErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    // form.city.setCustomValidity("Veuillez renseigner ce champ.");
    cityErrorMsg.style = "color: red";
    return false;
  }
}

function isEmailValid() {
  let emailErrorMsg = document.getElementById("emailErrorMsg");

  if (emailRegExp.test(form.email.value)) {
    emailErrorMsg.innerHTML = "";
    return true;
  } else {
    emailErrorMsg.innerHTML = "Veuillez renseigner votre email.";
    // form.email.setCustomValidity("Veuillez renseigner votre email.");
    emailErrorMsg.style = "color: red";
    return false;
  }
}

// Fonction qui permet d'envoyer le formlaire à l'API sous forme d'un objet "contact" contenant les informations nécessaires.
// Ecoute au clique si les formulaires sont bien remplis et si ce n'est pas le cas, performe un preventDefault();.
function envoiFormulaire() {
  const order = document.getElementById("order");
  order.addEventListener("click", (event) => {
    event.preventDefault();
    if (
      //
      !isFirstNameValid() ||
      !isLastNameValid() ||
      !isAddressValid() ||
      !isCityValid() ||
      !isEmailValid()
    ) {
      console.log("Erreur dans le formulaire");
    }
    // Si le panier "cart" est vide, alors on sort de la fonction et un message d'erreur s'affiche. On ne finalise pas la commande.
    else if (cart.length == 0) {
      alert("Le panier est vide.");
      return;
    } else {
      // la méthode map() sert à attribuer une valeur à un paramètre (x ici).
      let sendId = cart.map((x) => {
        return x.idItem;
      });

      // Creation d'un objet formulaire "order" qui sera envoyé dans un tableau sous forme de string (L 242 POST).
      const order = {
        contact: {
          firstName: form.firstName.value,
          lastName: form.lastName.value,
          address: form.address.value,
          city: form.city.value,
          email: form.email.value,
        },
        products: sendId,
      };

      // POST pour envoyer order à l'API pour qu'il nous renvoie un orderId à afficher dans la page confirmation.
      const postApi = {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Requête à l'api order avec comme paramètre le POST pour obtenir le orderId
      fetch("http://localhost:3000/api/products/order", postApi)
        .then((res) => res.json())
        .then((data) => {
          localStorage.clear();
          console.log(data);
          document.location.href = "confirmation.html?id=" + data.orderId;
        })
        .catch((err) => {
          alert("Il y a eu une erreur : " + err);
        });
    }
  });
}
envoiFormulaire();
