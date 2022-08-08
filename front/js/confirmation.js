// Fonction permettant d'aller récupérer l'orderId dans le localStorage pour l'afficher dans le HTML.
function orderIdentifiant() {
  const elementById = document.getElementById("orderId");
  elementById.innerText = localStorage.getItem("orderId");
  console.log(localStorage.getItem("orderId"));
  localStorage.clear();
}
orderIdentifiant();
