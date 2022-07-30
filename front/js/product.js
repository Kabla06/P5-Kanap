const str = window.location; // On est sur TELLE ou  TELLE page
const url = new URL(str); // URL = String
const id = url.searchParams.get("id"); // Prend l'information "id" dans le lien actuel (window.location)
const total = str + id; // additionne les résultats (liens actuel +string+ l'id)

let titleCanape = document.getElementById("title");
let priceCanape = document.getElementById("price");
let descriptionCanape = document.getElementById("description");
let colorsCanape = document.getElementById("colors");
let imgCanape = document.querySelector(".item__img"); // pourquoi getElementByClassName ne marche pas?
let img = document.createElement("img");
let qty = document.getElementById("quantity");
imgCanape.appendChild(img); // erreur .appendChild pas une fonction si getElementByClassName l10

infosCanape();

// Async / Await pas trop compris l'utilité
async function infosCanape() {
  // ensuite execute cette promesse
  await fetch("http://localhost:3000/api/products/" + id) //  pourquoi fetch(total) ne marche pas?
    .then((res) => res.json()) // converti en JSON
    .then((unCanape) => {
      img.setAttribute("src", unCanape.imageUrl); // modifie l'attribut src de <img> créé plus haut
      img.setAttribute("alt", unCanape.altTxt); // modifie l'attribut alt de <img> créé plus haut
      titleCanape.innerHTML = unCanape.name; // même principe que pour index.js sauf qu'on attribut un objet à un élément HTML pour que ça prenne moins de place
      priceCanape.innerHTML = unCanape.price; // même principe que pour index.js sauf qu'on attribut un objet à un élément HTML pour que ça prenne moins de place
      descriptionCanape.innerHTML = unCanape.description; // même principe que pour index.js sauf qu'on attribut un objet à un élément HTML pour que ça prenne moins de place
      document.title = unCanape.name; // titre de la page = .name du canapé dans l'API

      for (let i = 0; i < unCanape.colors.length; i++) {
        // boucle for permettant d'afficher les couleurs par case d'array (.length)
        let color = document.createElement("option");
        color.setAttribute("value", unCanape.colors[i]); // donne l'attribut .colors[i] à unCanape (celui où on est actuellement dans l'API)
        color.innerHTML = unCanape.colors[i];
        colorsCanape.appendChild(color);
      }
    });
}

colorsCanape.input = colorsCanape.value;
console.log(colorsCanape);

const btnCart = document.getElementById("addToCart");

btnCart.addEventListener("click", function addToCart() {
  let myItem = {
    idItem: id,
    couleurCanape: colorsCanape.value, // objet.nomPropriete
    // ParseInt convertis string en entier
    quantityCanape: parseInt(qty.value), // .value va chercher l'info d'un formulaire / d'une option
  };
  // récupère le panier existant (sert à ne pas écraser un panier si il y en a un)

  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart == null) {
    cart = [];
  }
  // Incrémentation panier
  let found = cart.find(
    // déja une boucle genre
    (element) =>
      element.idItem == myItem.idItem &&
      element.couleurCanape == myItem.couleurCanape
  );

  if (qty.value <= 0 || colorsCanape.input == null || undefined) {
    alert("Veuillez sélectionner une couleur et une quantité.");
    return;
  }
  // cart ne peut pas être 0 car il a soit rien dedans (n'existe pas, soit a déjà un item)
  if (found == undefined || null) {
    cart.push(myItem);
  } else {
    found.quantityCanape += myItem.quantityCanape;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Article ajouté au panier !");
});

// Faire en sorte que je ne puisse pas ajouter de canaps sans couleurs et sans qty et ne pas mettre de valeurs négatives / sans produits
// return = sort de la fonction (fin)
