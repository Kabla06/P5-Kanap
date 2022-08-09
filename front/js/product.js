const str = window.location; // On est sur TELLE ou  TELLE page
const url = new URL(str); // URL = String
const id = url.searchParams.get("id"); // Prend l'information "id" dans le lien actuel (window.location)
const total = str + id; // additionne les résultats (liens actuel +string+ l'id)

// On fait appel au DOM pour récupérer différents éléments qui nous seront utiles plus tard.
let titleCanape = document.getElementById("title");
let priceCanape = document.getElementById("price");
let descriptionCanape = document.getElementById("description");
let colorsCanape = document.getElementById("colors");
let imgCanape = document.querySelector(".item__img");
let img = document.createElement("img");
let qty = document.getElementById("quantity");
imgCanape.appendChild(img);

infosCanape();

// Fonction qui appelle l'API pour aller prendre les information d'un article et les faire s'afficher dans la page "product.html"
function infosCanape() {
  // ensuite execute cette promesse
  fetch("http://localhost:3000/api/products/" + id)
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

const btnCart = document.getElementById("addToCart");

// Fonction qui vient créer un objet myItem contenant l'id, la couleur et la quantité d'un article. Au clique du bouton "Ajouter au panier." l'objet myItem doit aller dans le panier "cart".
btnCart.addEventListener("click", function addToCart() {
  let myItem = {
    idItem: id,
    couleurCanape: colorsCanape.value, // objet.nomPropriete
    // ParseInt convertis string en entier (num)
    quantityCanape: parseInt(qty.value), // .value va chercher l'info d'un formulaire / d'une option
  };
  // récupère le panier existant (sert à ne pas écraser un panier si il y en a un)

  let cart = JSON.parse(localStorage.getItem("cart"));
  // Si le panier est vide, créer un tableau vide "cart".
  if (cart == null) {
    cart = [];
  }
  // Va trouver la couleur et la quantité dans "cart" avec la méthode find(). Fais la correspondance avec l'id pour savoir si la couleur dans le "cart" est égale à la couleur de l'article que l'on veut ajouter.
  let found = cart.find(
    (element) =>
      element.idItem == myItem.idItem &&
      element.couleurCanape == myItem.couleurCanape
  );

  // Si la quantité est de 0 ou négative et si aucune couleur n'a été sélectionnée, alors on sort de la fonction et le panier ne se valide pas.
  if (qty.value <= 0 || colorsCanape.value == "") {
    alert("Veuillez sélectionner une couleur et une quantité.");
    return;
  }

  // Si found est null ou undefined et que donc il n'y a pas de correspondance pour additionner la quantité à l'ajout dans le panier, alors l'objet myItem va dans le panier "cart". Sinon, la quantité s'additionne.
  if (found == undefined || null) {
    cart.push(myItem);
  } else {
    found.quantityCanape += myItem.quantityCanape;
  }

  // On ajoute "cart" au localStorage et un message disant que l'article a été ajouté apparait à l'écran.
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Article ajouté au panier !");
});
