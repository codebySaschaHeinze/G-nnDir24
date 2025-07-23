function init() {
  loadCartFromLocalStorage();
  renderProducts();
  renderCartAndRenderTotalPriceAndIfCartIsEmpty();
}

let cart = [];

/**
 * productIndex contains all products from the products-array
 * and gives it to addProductsTemplate
 */
function renderProducts() {
  let productsRef = document.getElementById("all_products");
  productsRef.innerHTML = "";
  for (let productIndex = 0; productIndex < products.length; productIndex++) {
    productsRef.innerHTML += addProductsTemplate(productIndex);
  }
}

/** cartIndex contains all products from the products-array
 *  and gives it to addProductsToCartTemplate
 */
function renderCart() {
  let cartRef = document.getElementById("cart_products_container");
  cartRef.innerHTML = "";

  for (let cartIndex = 0; cartIndex < cart.length; cartIndex++) {
    cartRef.innerHTML += addProductsToCartTemplate(cartIndex);
  }
}

/** checks if cart is empty
 */
function ifCartIsEmpty() {
  let emptyCart = document.getElementById("empty_cart");
  if (cart.length == 0) {
    emptyCart.classList.remove("d-none");
  } else {
    emptyCart.classList.add("d-none");
  }
}

/** add selected product to Cart
 *  checks if selectetd product is already in cart
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

/** increase price and amount from product in cartIndex
 */
function plusCartProduct(cartIndex) {
  cart[cartIndex].amount++;
  saveCartToLocalStorage();
  renderCartAndRenderTotalPriceAndIfCartIsEmpty();
  renderCartOverlayContent();
}

/** decrease price and amount from product in cartIndex
 *  decrease both IF amount is higher than 1
 *  ELSE - splice product out of the cart.array
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

/** calculate the price of a product in the cart-array
 *  price * amount
 */
function calculateAllCartProducts(cart) {
  let totalPrices = 0;
  for (let totalPriceIndex = 0; totalPriceIndex < cart.length; totalPriceIndex++) {
    totalPrices += cart[totalPriceIndex].price * cart[totalPriceIndex].amount;
  }
  return totalPrices;
}

/** show total price on the total-price-button
 * there is a button on the desktop-version
 * and one on the mobile-version (mediaQuery)
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

/** shows the cart overlay in the mobile-version (mediaQuery)
 *  removes the total-price-button (if there)
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

/** showing the cart overlay at onclick="renderCartOverlay()"
 * (total-price-button in the mobile-version)
 *
 */
function renderCartOverlayContent() {
  const overlayRef = document.getElementById("cart_overlay_container");
  overlayRef.innerHTML = cartOverlayTemplate();
}

/** update the cart overlay if cart_overlay_container is visible
 */
function updateOverlayIfVisible() {
  let overlayRef = document.getElementById("cart_overlay_container");
  if (!overlayRef.classList.contains("d-none")) {
    renderCartOverlayContent();
  }
}

/** close the overlay at onclick="closeCartOverlay()"
 * (close-overlay-button in the mobile-version)
 */
function closeCartOverlay() {
  let overlayRef = document.getElementById("cart_overlay_container");
  overlayRef.classList.add("d-none");
  let mobileButton = document.getElementById("total_price_container");
  if (mobileButton) {
    mobileButton.classList.remove("d-none");
  }
}

/** shows showOrderOverlay if there are products in the cart
 *  if there are no products in the cart, nothing happens
 */
function orderAccepted() {
  if (cart.length === 0) return;
  closeCartOverlay();
  showOrderOverlay();
  cart = [];
  saveCartToLocalStorage();
  renderCartAndRenderTotalPriceAndIfCartIsEmpty();
}

/** close the order overlay at onclick="closeOrderOverlay()"
 * (close-overlay-button in the mobile-version)
 */
function closeOrderOverlay() {
  const overlayRef = document.getElementById("order_overlay_container");
  overlayRef.classList.add("d-none");
  overlayRef.innerHTML = "";
}

/** shows the order overlay if the order is accepted
 * and gives it to the orderOverlayTemplate
 */
function showOrderOverlay() {
  const orderOverlayRef = document.getElementById("order_overlay_container");
  orderOverlayRef.innerHTML = orderOverlayTemplate();
  orderOverlayRef.classList.remove("d-none");
}

/** saves the current condition in the local storage
 */
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/** gives the saved informations to the functions
 */
function loadCartFromLocalStorage() {
  let savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}

/** helper function to reduce code
 */
function renderCartAndRenderTotalPriceAndIfCartIsEmpty() {
  renderCart();
  renderTotalPrice();
  ifCartIsEmpty();
}
