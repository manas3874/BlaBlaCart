// ! JavaScript for all the required modal boxes in the app
// ! VARIABLE DECLARATIONS

var cartBtn,
  cartModal,
  cartBg,
  wishlistBtn,
  wishlistModal,
  wishlistBg,
  productCard,
  productModal,
  productBg,
  productModalListingName,
  productModalListingImage,
  productModalListingPrice,
  productName,
  productImageSrc,
  productPrice,
  closeBtn;

// ! GETTING THE DOM ELEMENTS
cartBtn = document.querySelector(".cart");
cartModal = document.getElementById("cart-modal");
wishlistBtn = document.querySelector(".wishlist");
wishlistModal = document.getElementById("wishlist-modal");
productCard = document.querySelectorAll(".card-grid");
productModal = document.querySelector(".product-modal"); //!to toggle
productModalListingName = document.querySelector(".product-listing>.name>p");
productModalListingImage = document.querySelector(".product-listing>img");
productModalListingPrice = document.getElementById("modal-listing-price");
closeBtn = document.querySelector(".close");
cartBg = document.querySelector(".modal-bg-cart");
wishlistBg = document.querySelector(".modal-bg-wishlist");
productBg = document.querySelector(".modal-bg");

cartBtn.addEventListener("click", function (ev) {
  cartModal.classList.toggle("display");
  cartBg.classList.toggle("display-content-box");
});

wishlistBtn.addEventListener("click", function (ev) {
  wishlistModal.classList.toggle("display");
  wishlistBg.classList.toggle("display-content-box");
});

for (let i = 0; i < productCard.length; i++) {
  productCard[i].addEventListener("click", function () {
    //   !finding which product is selected
    whichCardIsClicked = this.parentElement.classList[1];
    // ! getting the name of product
    productName = document.querySelector(
      "." + whichCardIsClicked + ">.card-grid>.details>p"
    ).innerHTML;
    // ! getting the image source of product
    productImageSrc = document
      .querySelector("." + whichCardIsClicked + ">.card-grid>img")
      .getAttribute("src");
    // ! getting the price of product
    productPrice = document.querySelector(
      "." + whichCardIsClicked + ">.card-grid>.details>.call-to-action>.price"
    ).innerHTML;

    // ! Inserting this information into the product modal before showing
    productModalListingName.innerHTML = productName;
    productModalListingImage.setAttribute("src", "" + productImageSrc);
    productModalListingPrice.innerHTML = productPrice;

    productModal.classList.toggle("display-product");
    productBg.classList.toggle("display-content-box");
  });
}

closeBtn.addEventListener("click", function () {
  productModal.classList.toggle("display-product");
  productBg.classList.toggle("display-content-box");
});
