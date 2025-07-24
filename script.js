/** The initially empty shopping cart.
 */
let cart = [];

/** Initiate all functions (<body onload="init()">).
 *  Load the localStorage.
 *  Show all Products in the menu.
 */
function init() {
  loadCartFromLocalStorage();
  renderProducts();
  renderCartAndRenderTotalPriceAndIfCartIsEmpty();
}

/**
 * "productIndex" contains all products from the products-array,
 *  and gives it to addProductsTemplate.
 */
function renderProducts() {
  let productsRef = document.getElementById("all_products");
  productsRef.innerHTML = "";
  for (let productIndex = 0; productIndex < products.length; productIndex++) {
    productsRef.innerHTML += addProductsTemplate(productIndex);
  }
}

/** "cartIndex" contains all products from the products-array
 *   and gives it to addProductsToCartTemplate.
 */
function renderCart() {
  let cartRef = document.getElementById("cart_products_container");
  cartRef.innerHTML = "";

  for (let cartIndex = 0; cartIndex < cart.length; cartIndex++) {
    cartRef.innerHTML += addProductsToCartTemplate(cartIndex);
  }
}

/** Checking if cart is empty.
 */
function ifCartIsEmpty() {
  let emptyCart = document.getElementById("empty_cart");
  if (cart.length == 0) {
    emptyCart.classList.remove("d-none");
  } else {
    emptyCart.classList.add("d-none");
  }
}

/** Add selected product to Cart and
 *  checking if selectetd product is already in cart.
 *  @param {Array} productIndex - All products on the menu.
 */
function addToCart(productIndex) {
  for (let cartIndex = 0; cartIndex < cart.length; cartIndex++) {
    if (cart[cartIndex].name === products[productIndex].name) {
      cart[cartIndex].amount++;
      saveCartToLocalStorage();
      renderCartAndRenderTotalPriceAndIfCartIsEmpty();
      updateOverlayIfVisible();
      return;
    }
  }
  cart.push({ name: products[productIndex].name, amount: 1, price: products[productIndex].price });
  saveCartToLocalStorage();
  renderCartAndRenderTotalPriceAndIfCartIsEmpty();
  updateOverlayIfVisible();
}

/** Increase price and amount from product in cartIndex.
 *  @param {string} cartIndex - Selectetd products in the cart.
 */
function plusCartProduct(cartIndex) {
  cart[cartIndex].amount++;
  saveCartToLocalStorage();
  renderCartAndRenderTotalPriceAndIfCartIsEmpty();
  renderCartOverlayContent();
}

/** Decrease price and amount from product in cartIndex.
 *  Decrease both IF amount is higher than 1.
 *  ELSE - splice product out of the cart-array.
 *  @param {Array} cartIndex - Selectetd products in the cart.
 */
function minusCartProduct(cartIndex) {
  if (cart[cartIndex].amount <= 1) {
    cart.splice(cartIndex, 1);
  } else {
    cart[cartIndex].amount--;
  }
  saveCartToLocalStorage();
  renderCartAndRenderTotalPriceAndIfCartIsEmpty();
  renderCartOverlayContent();
}

/** Calculate the price of a product in the cart-array. (price * amount)
 *  @param {Array} cart - Products in the cart.
 */
function calculateAllCartProducts(cart) {
  let totalPrices = 0;
  for (let totalPriceIndex = 0; totalPriceIndex < cart.length; totalPriceIndex++) {
    totalPrices += cart[totalPriceIndex].price * cart[totalPriceIndex].amount;
  }
  return totalPrices;
}

/** Shows total price on the total-price-button.
 *  There´s a button on the desktop-version
 *  and one on the mobile-version (mediaQuery),
 */
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

/** Shows the cart overlay in the mobile-version (mediaQuery).
 *  Removes the total-price-button (if there).
 */
function renderCartOverlay() {
  const overlayRef = document.getElementById("cart_overlay_container");
  overlayRef.classList.remove("d-none");
  let mobileButton = document.getElementById("total_price_container");
  if (mobileButton) {
    mobileButton.classList.add("d-none");
  }

  renderCartOverlayContent();
}

/** Showing the cart overlay at onclick="renderCartOverlay()"
 *  (total-price-button in the mobile-version).
 */
function renderCartOverlayContent() {
  const overlayRef = document.getElementById("cart_overlay_container");
  overlayRef.innerHTML = cartOverlayTemplate();
}

/** Update the cart overlay if cart_overlay_container is visible.
 */
function updateOverlayIfVisible() {
  let overlayRef = document.getElementById("cart_overlay_container");
  if (!overlayRef.classList.contains("d-none")) {
    renderCartOverlayContent();
  }
}

/** Close the overlay at onclick="closeCartOverlay()"
 *  (close-overlay-button in the mobile-version).
 */
function closeCartOverlay() {
  let overlayRef = document.getElementById("cart_overlay_container");
  overlayRef.classList.add("d-none");
  let mobileButton = document.getElementById("total_price_container");
  if (mobileButton) {
    mobileButton.classList.remove("d-none");
  }
}

/** Showing the showOrderOverlay if there are products in the cart.
 *  If there are no products in the cart, nothing happens.
 */
function orderAccepted() {
  if (cart.length === 0) return;
  closeCartOverlay();
  showOrderOverlay();
  cart = [];
  saveCartToLocalStorage();
  renderCartAndRenderTotalPriceAndIfCartIsEmpty();
}

/** Close the order overlay at onclick="closeOrderOverlay()"
 *  (close-overlay-button in the mobile-version).
 */
function closeOrderOverlay() {
  const overlayRef = document.getElementById("order_overlay_container");
  overlayRef.classList.add("d-none");
  overlayRef.innerHTML = "";
}

/** Shows the order overlay if the order is accepted
 *  and gives it to the orderOverlayTemplate
 */
function showOrderOverlay() {
  const orderOverlayRef = document.getElementById("order_overlay_container");
  orderOverlayRef.innerHTML = orderOverlayTemplate();
  orderOverlayRef.classList.remove("d-none");
}

/** Saves the current conditions in the local storage.
 */
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/** Gives the saved informations to the functions.
 */
function loadCartFromLocalStorage() {
  let savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}

/** Helper function to reduce code
 */
function renderCartAndRenderTotalPriceAndIfCartIsEmpty() {
  renderCart();
  renderTotalPrice();
  ifCartIsEmpty();
}
