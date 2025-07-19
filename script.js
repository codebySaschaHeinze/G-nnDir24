function init() {
  renderProducts();
  ifCartIsEmpty();
  renderCart();
}

let cart = [];

function renderProducts() {
  let productsRef = document.getElementById("all_products");
  productsRef.innerHTML = "";

  for (let productIndex = 0; productIndex < products.length; productIndex++) {
    productsRef.innerHTML += addProductsTemplate(productIndex);
  }
}

function renderCart() {
  let cartRef = document.getElementById("cart_products_container");
  cartRef.innerHTML = "";

  for (let cartIndex = 0; cartIndex < cart.length; cartIndex++) {
    cartRef.innerHTML += addProductsToCartTemplate(cartIndex);
  }
}

// prüft ob das cart-array leer ist und gibt/entfernt d-none
function ifCartIsEmpty() {
  let emptyCart = document.getElementById("empty_cart");
  if (cart.length == 0) {
    emptyCart.classList.remove("d-none");
  } else {
    emptyCart.classList.add("d-none");
  }
}

function addToCart(index) {
  for (let cartIndex = 0; cartIndex < cart.length; cartIndex++) {
    if (cart[cartIndex].name === products[index].name) {
      cart[cartIndex].amount++;
      renderCart();
      ifCartIsEmpty();
      return;
    }
  }

  cart.push({
    name: products[index].name,
    amount: 1,
    price: products[index].price,
  });
  renderCart();
  ifCartIsEmpty();
}
