function init() {
  renderProducts();
  ifCartIsEmpty();
  renderCart();
}

let cart = [];

// productIndex enthält alle Produkte vom Array
function renderProducts() {
  let productsRef = document.getElementById("all_products");
  productsRef.innerHTML = "";

  for (let productIndex = 0; productIndex < products.length; productIndex++) {
    productsRef.innerHTML += addProductsTemplate(productIndex);
  }
}
// cartIndex enthält alle Produkte im Warenkorb
function renderCart() {
  let cartRef = document.getElementById("cart_products_container");
  cartRef.innerHTML = "";

  for (let cartIndex = 0; cartIndex < cart.length; cartIndex++) {
    cartRef.innerHTML += addProductsToCartTemplate(cartIndex);
  }
}

// prüft ob das cart-array (Warenkorb) leer ist und gibt/entfernt d-none
function ifCartIsEmpty() {
  let emptyCart = document.getElementById("empty_cart");
  if (cart.length == 0) {
    emptyCart.classList.remove("d-none");
  } else {
    emptyCart.classList.add("d-none");
  }
}
// Prduktkarte zum Warenkorb hinzufügen
function addToCart(productIndex) {
  for (let cartIndex = 0; cartIndex < cart.length; cartIndex++) {
    if (cart[cartIndex].name === products[productIndex].name) {
      cart[cartIndex].amount++;
      renderCart();
      ifCartIsEmpty();
      return;
    }
  }

  cart.push({
    name: products[productIndex].name,
    amount: 1,
    price: products[productIndex].price,
  });
  renderCart();
  ifCartIsEmpty();
}

// Warenkorb - price und amount erhöhen
function plusCartProduct(cartIndex) {
  cart[cartIndex].amount++;
  renderCart();
  ifCartIsEmpty();
}

// Warenkorb - Produkt verringern
// sollte amount 1 oder kleiner sein,

function minusCartProduct(cartIndex) {
  if (cart[cartIndex].amount <= 1) {
    cart.splice(cartIndex, 1);
  } else {
    cart[cartIndex].amount--;
  }
  renderCart();
  ifCartIsEmpty();
}
