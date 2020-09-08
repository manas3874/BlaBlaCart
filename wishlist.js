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
// ! **********************************************************************************

for (let i = 0; i < DOMstrings.wishlistButtons.length; i++) {
  // ! from the main page
  DOMstrings.wishlistButtons[i].addEventListener("click", function (ev) {
    ev.stopPropagation();
    ev.preventDefault();
    if (ev.target.hasAttribute("src", "/icons/heart-empty.png")) {
      //   buttonTarget.parentElement.parentElement.remove();
      ev.target.setAttribute("src", "/icons/heart-filled.png");
    } else {
      ev.target.setAttribute("src", "/icons/heart-empty.png");
    }

    // ! capture target of click
    var addToWishlistTargetId = i;
    console.log(ev.target);
    // ! fetch clicked target info
    productInformation = fetchProductDetailsFromId(addToWishlistTargetId);
    // console.log(productInformation);
    // !check if product already exists in cart
    if (!productCheck(productInformation)) {
      // !make new entry if product not found
      makeEntryOfNewProduct(productInformation);
      console.log(wishlistInformation.product);
    } else {
      console.log(wishlistInformation.product);
    }
    addToWishlist(productInformation);
  });
}

// ! **********************************************************************************

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
// ? A CONSTRUCTOR TO MAKE THE NEW PRODUCT OBJECT TO STORE IN wishlistInformation
var Product = function (prodId, name, price, quantity) {
  (this.prodId = prodId),
    (this.name = name),
    (this.price = price),
    (this.quantity = quantity);
};
// ! **********************************************************************************
// ? DATA STRUCTURE FOR STORING PRODUCT DETAILS IN CART
var wishlistInformation = {
  // ? AN ARRAY OF OBJECTS
  product: [], //will have the id,name,price,quantity
};
// ! **********************************************************************************
// ! check if product already exists
var productCheck = function (targetInfo) {
  for (let i = 0; i < wishlistInformation.product.length; i++) {
    if (targetInfo.prodId === wishlistInformation.product[i].prodId) {
      wishlistInformation.product[i].quantity += 1;
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

  wishlistInformation.product.push(newProd);
};

// ! **********************************************************************************
// ! Adding to the cart
// ? %img%  %price%  %name%
var addToWishlist = function (productDetails) {
  var html =
    '<div class="wishlist-card"><div class="product-image"><img src="/images/image-%img%.jpg" alt="" /></div><div class="details-flex"><p class="name">%name%</p><p class="price">$ <span>%price%</span></p></div><div class="actions-flex"><img src="/icons/cart32px.png" alt="save for later" /><img src="/icons/trash.png" alt="remove" id="remove" /></div></div>';

  var newHtml = html.replace("%img%", productDetails.prodId + 1);
  var newHtml = newHtml.replace("%price%", productDetails.price);
  var newHtml = newHtml.replace("%name%", productDetails.name);

  document
    .querySelector("#modal-wishlist")
    .insertAdjacentHTML("afterbegin", newHtml);
};

var removeBtn, buttonTarget;
function func() {
  removeBtn = document.querySelectorAll("#remove");
  //   console.log(removeBtn);
  for (let i = 0; i < removeBtn.length; i++) {
    var button = removeBtn[i];
    button.addEventListener("click", function (ev) {
      buttonTarget = ev.currentTarget;
      //   console.log(buttonTarget, buttonTarget.parentElement.parentElement);
      buttonTarget.parentElement.parentElement.remove();
    });
  }
}
setInterval("func()", 1000);

// ! **********************************************************************************
// ! To remove
// for (let i = 0; i < DOMstrings.wishlistButtons.length; i++) {
//   // ! from the main page
//   DOMstrings.wishlistButtons[i].addEventListener("click", function (ev) {
//     ev.stopPropagation();
//     ev.preventDefault();
//     if (ev.target.hasAttribute("src", "/icons/heart-filled.png")) {
//         buttonTarget.parentElement.parentElement.remove();
//       ev.target.setAttribute("src", "/icons/heart-empty.png");
//     }
//   });
// }
