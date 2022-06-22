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

// Async / Await pas trop compris l'utilité sachant qu'il y a quand même des .then
async function infosCanape() {
  await fetch("http://localhost:3000/api/products/" + id) //  pourquoi fetch(total) ne marche pas?
    .then((res) => res.json()) // converti en JSON
    .then((unCanape) => {
      // ensuite execute cette promesse
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

/*
const btnCart = document.getElementById("addToCart");
// let quantityItem = [];
let idItem = JSON.stringify(id);
let colorsItem = JSON.stringify(colors);

btnCart.addEventListener("click", function addToCart() {
  localStorage.setItem("idItem", id);
  localStorage.setItem("colorsItem", colors);
});
*/

const btnCart = document.getElementById("addToCart");

btnCart.addEventListener("click", function addToCart() {
  let myItem = { // objet js
    idItem: id,
    couleurCanape: colorsCanape.value, // objet.nomPropriete
    quantityCanape: qty.value // .value va chercher l'info d'un formulaire / d'un option
  }
  // récupère le panier existant (sert à ne pas écraser un panier si il y en a un)

  // Sert à :
  let jsonCart = localStorage.getItem("cart"); // Récupère la valeur de la clé "cart"
  let cart = JSON.parse(jsonCart); // Fait en sorte que cart corresponde à l'objet jsonCart avec un .parse
  cart.push(myItem); // cart devient un tableau contenant les élements de myItem (objet + Propriétés)
  localStorage.setItem("cart", JSON.stringify(cart)); // Créé un string qui a la clé "cart" et la valeur de l'objet cart (qui est un tableau)

  // En supprimant la clé on se retrouve avec un erreur,
  // faire en sorte que lorsque la clé n'est pas là (donc quand il n'y a pas de panier)
  // Créer une condition qui va créer un panier vide (array [])
  if (myItem == null) {
    cart = [];
  };
});
