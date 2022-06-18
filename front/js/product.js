const str = window.location; // On est sur TELLE ou  TELLE page
const url = new URL(str); // URL = String
const id = url.searchParams.get("id"); // Prend l'information "id" dans le lien actuel (window.location)
const total = str + id; // additionne les résultats (liens actuel +string+ l'id)
console.log(total);

function displayProducts(){

};