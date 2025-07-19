function addProductsTemplate(productIndex) {
  let product = products[productIndex];
  return /*html*/ `<div class="pizza-container">
            <div>
              <p class="card-name">${product.name}</p>
              <p class="card-description">${product.description}</p>
              <p class="card-price">${product.price}</p>
            </div>
            <button onclick="addToCart(${productIndex})" class="card-plus-img">
              <img src="./assets/img/plus.png" alt="" />
            </button>
          </div>`;
}

function addProductsToCartTemplate(cartIndex) {
  let product = cart[cartIndex];
  return `<div class="product-price-plus-minus-container">
  <div class="product-and-price">
    <p>${product.name}</p>
    <p>${product.price}</p>
  </div>
  <div class="plus-and-minus">
    <button onclick="minusCartProduct()" class="minus-button-cart">
      <img class="minus-button-img" src="./assets/img/minus.png" alt="" />
    </button>
    <p class="cart-product-amount">${cart[cartIndex].amount}</p>
    <button onclick="plusCartProduct()" class="plus-button-cart">
      <img class="plus-button-img" src="./assets/img/plus.png" alt="" />
    </button>
  </div>
</div>`;
}
