var DOMstrings = {
  // ? PRODUCT CARD
  allProductCards: document.querySelectorAll(".product-grid>*"),
  wishlistButtons: document.querySelectorAll(".wishlist-btn"),
  cartButtons: document.querySelectorAll(".cart-btn"),
  productNames: document.querySelectorAll("#name"),

  // ? Modal
  cartBtn: document.getElementById("cart-btn"),
  modalName: document.getElementById("modal-name"),
  modalPrice: document.getElementById("modal-price"),
  modalCart: document.getElementById("modal-cart"),
  remove: document.getElementById("remove"),
  productPrice: document.querySelectorAll("#price"),
};
var cartDetails = {
  totalPrice: 0,
  numberOfItems: 0,
  cartContents: [],
};
// ! **********************************************************************************
for (let i = 0; i < DOMstrings.cartButtons.length; i++) {
  // ! from the main page
  DOMstrings.cartButtons[i].addEventListener("click", function (ev) {
    ev.stopPropagation();
    ev.preventDefault();
    // ! capture target of click
    addToCartTargetId = i;
    console.log(ev.target);
    // ! fetch clicked target info
    productInformation = fetchProductDetailsFromId(addToCartTargetId);
    // console.log(productInformation);
    // !check if product already exists in cart
    if (!productCheck(productInformation)) {
      // !make new entry if product not found
      makeEntryOfNewProduct(productInformation);
      console.log(cartInformation.product);
    } else {
      console.log(cartInformation.product);
    }

    var detailsBeforePushing = addToCart(productInformation);
    cartDetails.totalPrice += Number(detailsBeforePushing.prodPrice);
    cartDetails.numberOfItems += 1;
    cartDetails.cartContents.push(detailsBeforePushing);
    document.querySelector("#checkout-price").innerHTML =
      cartDetails.totalPrice;
  });
}
DOMstrings.cartBtn.addEventListener("click", function (ev) {
  console.log(ev.target);
  ev.preventDefault();
  ev.stopPropagation();
  productInformation = fetchDetailsFromModal();
  if (!productCheck(productInformation)) {
    // !make new entry if product not found
    makeEntryOfNewProduct(productInformation);
    console.log(cartInformation.product);
  } else {
    // ev.stopPropagation();
    console.log(cartInformation.product);
  }
  cartDetails.totalPrice += Number(detailsBeforePushing.prodPrice);
  cartDetails.numberOfItems += 1;
  cartDetails.cartContents.push(addToCart(productInformation));
  document.querySelector("#checkout-price").innerHTML = cartDetails.totalPrice;
});
// ! **********************************************************************************
var fetchDetailsFromModal = function () {
  var name = DOMstrings.modalName.innerHTML;
  var price = DOMstrings.modalPrice.innerHTML;
  return {
    prodId: Number(name.charAt(8)),
    name: name,
    price: price,
    quantity: 1,
  };
};

var fetchProductDetailsFromId = function (targetId) {
  for (let i = 0; i < DOMstrings.productNames.length; i++) {
    if (i == targetId) {
      var name = DOMstrings.productNames[i].innerHTML;
      var productPrice = document.querySelectorAll("#price-");
      var price = productPrice[i].innerHTML;
    }
  }

  return {
    prodId: targetId + 1,
    name: name,
    price: price,
    quantity: 1,
  };
};
// ! **********************************************************************************
// ? A CONSTRUCTOR TO MAKE THE NEW PRODUCT OBJECT TO STORE IN cartInformation
var Product = function (prodId, name, price, quantity) {
  (this.prodId = prodId),
    (this.name = name),
    (this.price = price),
    (this.quantity = quantity);
};
// ! **********************************************************************************
// ? DATA STRUCTURE FOR STORING PRODUCT DETAILS IN CART
var cartInformation = {
  // ? AN ARRAY OF OBJECTS
  product: [], //will have the id,name,price,quantity
};
// ! **********************************************************************************
// ! check if product already exists
var productCheck = function (targetInfo) {
  for (let i = 0; i < cartInformation.product.length; i++) {
    if (targetInfo.prodId === cartInformation.product[i].prodId) {
      cartInformation.product[i].quantity += 1;

      return true;
    }
  }
  return false;
};

// ! **********************************************************************************
var makeEntryOfNewProduct = function (productInformation) {
  newProd = new Product(
    productInformation.prodId,
    productInformation.name,
    productInformation.price,
    productInformation.quantity
  );

  cartInformation.product.push(newProd);
};

// ! **********************************************************************************
// ! Adding to the cart
// ? %img%  %qty%  %name%
var addToCart = function (productDetails) {
  var html =
    '<div class="cart-card"><div class="product-image"><img src="/images/image-%img%.jpg" alt="" /></div><div class="details-flex"><p>%name%</p><div class="quantity"><p>Qty</p><input type="number" id="quantity" min="1" max="7" value="%qty%"/></div></div><div class="actions-flex"><p class="price">$&nbsp;<span>%price%</span></p><img src="/icons/trash.png" alt="remove" id="remove" /></div></div>';

  var newHtml = html.replace("%img%", productDetails.prodId);
  var newHtml = newHtml.replace("%qty%", productDetails.quantity);
  var newHtml = newHtml.replace("%name%", productDetails.name);
  var newHtml = newHtml.replace("%price%", productDetails.price);

  document
    .querySelector("#modal-cart")
    .insertAdjacentHTML("afterbegin", newHtml);

  return {
    prodId: productDetails.prodId,
    prodQty: productDetails.quantity,
    prodPrice: productDetails.price,
  };
};

var removeBtn;

function funcRemove() {
  removeBtn = document.querySelectorAll("#remove");
  //   console.log(removeBtn);
  for (let i = 0; i < removeBtn.length; i++) {
    var button = removeBtn[i];
    button.addEventListener("click", function (ev) {
      var buttonTarget = ev.currentTarget;
      //   console.log(buttonTarget, buttonTarget.parentElement.parentElement);
      buttonTarget.parentElement.parentElement.remove();
      // document.querySelector("#checkout-price").innerHTML-=
      cartDetails.numberOfItems -= 1;
    });
  }
}
setInterval("funcRemove()", 1000);
