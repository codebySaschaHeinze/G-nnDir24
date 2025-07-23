// alle Produkte im Content rendern
function addProductsTemplate(productIndex) {
  let product = products[productIndex];
  return `
            <div class="pizza-container">
              <div>
                <p class="card-name">${product.name}</p>
                <p class="card-description">${product.description}</p>
                <p class="card-price">${product.price.toFixed(2).replace(".", ",")} €</p>
                </div>
                <button onclick="addToCart(${productIndex})" class="card-plus-img">
              <img src="./assets/imgs/plus.png" alt="" />
              </button>
            </div>
          `;
}

// Warenkorb rendern
function addProductsToCartTemplate(cartIndex) {
  let product = cart[cartIndex];
  return `
            <div class="product-price-plus-minus-container">
              <div class="product-and-price">
                <p>${product.name}</p>
                <p>${(product.price * product.amount).toFixed(2).replace(".", ",")} €</p>
              </div>
              <div class="plus-and-minus">
                <button onclick="minusCartProduct(${cartIndex})" class="minus-button-cart">
                  <img class="minus-button-img" src="./assets/imgs/minus.png" alt="" />
                </button>
                  <p class="cart-product-amount">${cart[cartIndex].amount}</p>
                <button onclick="plusCartProduct(${cartIndex})" class="plus-button-cart">
                  <img class="plus-button-img" src="./assets/imgs/plus.png" alt="" />
                </button>
              </div>
            </div>
          `;
}

// ausgewählte Produkte zum Warenkorb hinzufügen
function addProductsToCartOverlayTemplate(cartIndex) {
  let product = cart[cartIndex];
  return `
            <div class="product-price-plus-minus-container">
                <div class="product-and-price">
                <p>${product.name}</p>
                <p>${(product.price * product.amount).toFixed(2).replace(".", ",")} €</p>
              </div>
              <div class="plus-and-minus">
                <button onclick="minusCartProduct(${cartIndex})" class="minus-button-cart">
                  <img class="minus-button-img" src="./assets/imgs/minus.png" alt="" />
                </button>
                  <p class="cart-product-amount">${product.amount}</p>
                <button onclick="plusCartProduct(${cartIndex})" class="plus-button-cart">
                  <img class="plus-button-img" src="./assets/imgs/plus.png" alt="" />
                </button>
              </div>
            </div>
          `;
}

// Warenkorb im mobile wird gerendert
function cartOverlayTemplate() {
  let content = "";

  if (cart.length === 0) {
    content = `<div class="empty-cart"><p>Gönn dir was leckeres!</p></div>`;
  } else {
    for (let i = 0; i < cart.length; i++) {
      content += addProductsToCartOverlayTemplate(i);
    }
  }

  return `
            <div class="cart-overlay-header">
              <h4 class="overlay-title">Warenkorb</h4>
              <button onclick="closeCartOverlay()" class="close-overlay-button">✖</button>
            </div>
            <div class="cart-overlay-scrollable">${content}</div>
            <div class="cart-overlay-footer">
              <button onclick="orderAccepted()" class="total-price-button">
                Gesamtpreis: ${calculateAllCartProducts(cart).toFixed(2).replace(".", ",")} €
              </button>
            </div>
          `;
}

// Button mit Gesamtsumme in mobile Variante erstellen
function renderTotalPriceButtonMobileTemplate() {
  return `
            <button onclick="renderCartOverlay()" class="total-price-button">
              Gesamtpreis: ${calculateAllCartProducts(cart).toFixed(2).replace(".", ",")} €
            </button>
          `;
}

// Button mit Gesamtsumme in desktop Variante erstellen
function renderTotalPriceButtonDesktopTemplate() {
  return `
            <button onclick="orderAccepted()" class="total-price-button">
              Gesamtpreis: ${calculateAllCartProducts(cart).toFixed(2).replace(".", ",")} €
            </button>
          `;
}

function orderOverlayTemplate() {
  return `
            <div class="order-overlay">
              <p class="order-message">Bestellung erfolgreich abgegeben!</p>
              <button onclick="closeOrderOverlay()" class="close-overlay-button">✖</button>
            </div>
          `;
}

function orderAcceptedTemplate() {
  return `
            <div class="order-success-box">
              <p>Bestellung erfolgreich abgegeben!</p>
              <button onclick="closeOrderSuccess()" class="close-overlay-button">✖</button>
            </div>
          `;
}
