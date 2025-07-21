function init() {
  renderProducts();
  ifCartIsEmpty();
  renderCart();
  renderTotalPrice();
}

let cart = [];

// productIndex enthält alle Produkte vom Array
function renderProducts() {
  let productsRef = document.getElementById("all_products");
  productsRef.innerHTML = "";

  for (let productIndex = 0; productIndex < products.length; productIndex++) {
    productsRef.innerHTML += addProductsTemplate(productIndex);
  }
  renderTotalPrice();
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
      renderTotalPrice();
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
  renderTotalPrice();
  ifCartIsEmpty();
}

// Warenkorb - price und amount erhöhen
function plusCartProduct(cartIndex) {
  cart[cartIndex].amount++;
  renderCart();
  renderTotalPrice();
  ifCartIsEmpty();
}

// Warenkorb - Produkt verringern (sollte amount 1 oder kleiner sein - raussplicen)
function minusCartProduct(cartIndex) {
  if (cart[cartIndex].amount <= 1) {
    cart.splice(cartIndex, 1);
  } else {
    cart[cartIndex].amount--;
  }
  renderCart();
  renderTotalPrice();
  ifCartIsEmpty();
}

// alle product.price´s addieren (und * product.amount).
function calculateAllCartProducts(cart) {
  let sum = 0;
  for (
    let totalPriceIndex = 0;
    totalPriceIndex < cart.length;
    totalPriceIndex++
  ) {
    sum += cart[totalPriceIndex].price * cart[totalPriceIndex].amount;
  }
  return sum;
}

function renderTotalPrice() {
  let totalPriceRef = document.getElementById("total_price_container");
  totalPriceRef.innerHTML = totalPriceButtonTemplate();
}
