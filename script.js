function init() {
  renderProducts();
}

let cart = [];

function renderProducts() {
  let productsRef = document.getElementById("all_products");
  productsRef.innerHTML = "";

  for (let productIndex = 0; productIndex < products.length; productIndex++) {
    productsRef.innerHTML += addProductsTemplate(productIndex);
  }
}

function emptyCart() {
  let cartRef = document.getElementById("cart-products-container");
}
