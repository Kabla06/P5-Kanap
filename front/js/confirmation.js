function orderIdentifiant() {
  const elementById = document.getElementById("orderId");
  elementById.innerText = localStorage.getItem("orderId");
  console.log(localStorage.getItem("orderId"));
  localStorage.clear();
}
orderIdentifiant();

// const elementById = new URL(window.location.href).searchParams.get("id");
// console.log(elementById);

// const orderIdentifiant = document.getElementById("orderId");
// orderIdentifiant.innerHTML = elementById;

// localStorage.clear();
