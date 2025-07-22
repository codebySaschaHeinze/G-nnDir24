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

// Warenkorb wird gerendert
function cartOverlayTemplate() {
  if (cart.length === 0) {
    return `
            <div class="empty-cart"><p>Gönn dir was leckeres!</p></div>
           `;
  }

  let cartRef = "";

  for (let i = 0; i < cart.length; i++) {
    cartRef += addProductsToCartOverlayTemplate(i);
  }

  cartRef += `
                <button onclick="orderAccepted()" class="total-price-button">
                  Gesamtpreis: ${calculateAllCartProducts(cart).toFixed(2).replace(".", ",")} €
                </button>
                <button onclick="closeCartOverlay()" class="total-price-button">
                  Schließen
                </button>
              `;

  return cartRef;
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
            <button class="total-price-button">
              Gesamtpreis: ${calculateAllCartProducts(cart).toFixed(2).replace(".", ",")} €
            </button>
          `;
}
