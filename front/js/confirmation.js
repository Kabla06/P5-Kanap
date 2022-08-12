const str = window.location; // On est sur TELLE ou  TELLE page
const url = new URL(str); // URL = String
const id = url.searchParams.get("id");

// Fonction permettant d'aller récupérer l'orderId dans le localStorage pour l'afficher dans le HTML.


function orderIdentifiant() {
  const elementById = document.getElementById("orderId");
  elementById.innerText = id;
  localStorage.clear();
}
orderIdentifiant();
