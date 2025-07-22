function addProductsTemplate(productIndex) {
  let product = products[productIndex];
  return /*html*/ `<div class="pizza-container">
            <div>
              <p class="card-name">${product.name}</p>
              <p class="card-description">${product.description}</p>
              <p class="card-price">${product.price
                .toFixed(2)
                .replace(".", ",")} €</p>
            </div>
            <button onclick="addToCart(${productIndex})" class="card-plus-img">
              <img src="./assets/imgs/plus.png" alt="" />
            </button>
          </div>`;
}

function addProductsToCartTemplate(cartIndex) {
  let product = cart[cartIndex];
  return `<div class="product-price-plus-minus-container">
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
</div>`;
}

function totalPriceButtonTemplate() {
  return /*html*/ `
            <button onclick="" class="total-price-button" id="total_price_button">
              Gesamtpreis: ${calculateAllCartProducts(cart)
                .toFixed(2)
                .replace(".", ",")} €
            </button>
          `;
}
