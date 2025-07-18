function addProductsTemplate(productIndex) {
  let product = products[productIndex];
  return /*html*/ `<div class="pizza-container">
            <div>
              <p class="card-name">${product.name}</p>
              <p class="card-description">${product.description}</p>
              <p class="card-price">${product.price}</p>
            </div>
            <button class="card-plus-img">
              <img src="./assets/img/plus.png" alt="" />
            </button>
          </div>`;
}

function addProductsToCart() {
  return `<div class="cart-product-and-price">
              <p>1 Pizza</p>
              <p>8,99 €</p>
            </div>
            <div class="cart-plus-minus">
              <button class="button-minus">
                <img src="./assets/img/minus.png" alt="" />
              </button>
              <button class="button-plus">
                <img src="./assets/img/plus.png" alt="" />
              </button>
            </div>`;
}
