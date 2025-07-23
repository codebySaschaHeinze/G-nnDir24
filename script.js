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

// prüft ob Warenkorb leer ist und gibt/entfernt d-none
function ifCartIsEmpty() {
  let emptyCart = document.getElementById("empty_cart");
  if (cart.length == 0) {
    emptyCart.classList.remove("d-none");
  } else {
    emptyCart.classList.add("d-none");
  }
}

// ausgewähltes Prdukt zum Warenkorb hinzufügen
function addToCart(productIndex) {
  for (let cartIndex = 0; cartIndex < cart.length; cartIndex++) {
    if (cart[cartIndex].name === products[productIndex].name) {
      cart[cartIndex].amount++;
      renderCart();
      renderTotalPrice();
      ifCartIsEmpty();
      updateOverlayIfVisible();
      return;
    }
  }
  cart.push({ name: products[productIndex].name, amount: 1, price: products[productIndex].price });
  renderCart();
  renderTotalPrice();
  ifCartIsEmpty();
  updateOverlayIfVisible();
}

// Warenkorb - price und amount erhöhen
function plusCartProduct(cartIndex) {
  cart[cartIndex].amount++;
  renderCart();
  renderTotalPrice();
  ifCartIsEmpty();
  renderCartOverlayContent();
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
  renderCartOverlayContent();
}

// alle product.price´s addieren (und * product.amount).
function calculateAllCartProducts(cart) {
  let totalPrices = 0;
  for (let totalPriceIndex = 0; totalPriceIndex < cart.length; totalPriceIndex++) {
    totalPrices += cart[totalPriceIndex].price * cart[totalPriceIndex].amount;
  }
  return totalPrices;
}
// Gesamtpreis vom Warenkorb im Button anzeigen
function renderTotalPrice() {
  let mobileRef = document.getElementById("total_price_container");
  let desktopRef = document.getElementById("total_price_container_desktop");
  if (mobileRef) {
    mobileRef.innerHTML = renderTotalPriceButtonMobileTemplate();
  }
  if (desktopRef) {
    desktopRef.innerHTML = renderTotalPriceButtonDesktopTemplate();
  }
}
// rendert das Warenkorb Overlay
function renderCartOverlay() {
  const overlayRef = document.getElementById("cart_overlay_container");
  overlayRef.classList.remove("d-none");
  let mobileButton = document.getElementById("total_price_container");
  if (mobileButton) {
    mobileButton.classList.add("d-none");
  }

  renderCartOverlayContent();
}

// bei onclick auf Gesamtpreisbutton rendert der Warenkorb im Overlay
function renderCartOverlayContent() {
  const overlayRef = document.getElementById("cart_overlay_container");
  overlayRef.innerHTML = cartOverlayTemplate();
}

/*  */
function updateOverlayIfVisible() {
  let overlayRef = document.getElementById("cart_overlay_container");
  if (!overlayRef.classList.contains("d-none")) {
    renderCartOverlayContent();
  }
}
// schließt bei onclick das Warenkorb Overlay
function closeCartOverlay() {
  let overlayRef = document.getElementById("cart_overlay_container");
  overlayRef.classList.add("d-none");
  let mobileButton = document.getElementById("total_price_container");
  if (mobileButton) {
    mobileButton.classList.remove("d-none");
  }
}
// Bestellung abgeben
function orderAccepted() {
  if (cart.length === 0) return;
  closeCartOverlay();
  showOrderOverlay();
  cart = [];
  renderCart();
  renderTotalPrice();
  ifCartIsEmpty();
}

function closeOrderOverlay() {
  const overlayRef = document.getElementById("order_overlay_container");
  overlayRef.classList.add("d-none");
  overlayRef.innerHTML = "";
}

function showOrderOverlay() {
  const orderOverlayRef = document.getElementById("order_overlay_container");
  orderOverlayRef.innerHTML = orderOverlayTemplate();
  orderOverlayRef.classList.remove("d-none");
}
