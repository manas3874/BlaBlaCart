// ! All the private data is worked upon inside the IIFEs and it is communicated across different functions using objects through return statements
// ! THERE ARE 3 IIFEs IN THIS SCRIPT
// ! 1. DATACONTROLLER        9
// ! 2. UICONTROLLER          56
// ! 3. APPCONTROLLER         122

// * APPCONTROLLER returns a method init which will be used to run the execute events.
var dataController = (function () {
  // ! stores the data and makes computations on the data

  // ? A CONSTRUCTOR TO MAKE THE NEW PRODUCT OBJECT TO STORE IN cartInformation
  var Product = function (prodId, name, price, quantity) {
    (this.prodId = prodId),
      (this.name = name),
      (this.price = price),
      (this.quantity = quantity);
  };

  // ? DATA STRUCTURE FOR STORING PRODUCT DETAILS IN CART
  var cartInformation = {
    // ? AN ARRAY OF OBJECTS
    product: [], //will have the id,name,price,quantity
  };
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

  var productCheckModal = function (targetInfo) {};
  // ! make entry of new product
  var makeEntryOfNewProduct = function (productInformation) {
    newProd = new Product(
      productInformation.prodId,
      productInformation.name,
      productInformation.price,
      productInformation.quantity
    );

    cartInformation.product.push(newProd);
  };
  return {
    cartInformation: cartInformation,
    makeEntryOfNewProduct: makeEntryOfNewProduct,
    productCheck: productCheck,
  };
})();
var uiController = (function () {
  // ! to make changes to the DOM

  var DOMstrings = {
    // ? NAVBAR EVENTS
    wishlist: document.querySelector(".wishlist"),
    cart: document.querySelector(".cart"),
    profile: document.querySelector(".profile"),

    // ? SHOWCASE EVENTS
    shop: document.querySelector(".shop-online"),
    locate: document.querySelector(".locate-us"),
    trending: document.querySelector(".trending"),

    // ? CATEGORY LIST
    categoryList: document.querySelectorAll(".category-list>ul>*"), //*NODELIST

    // ? CATEGORY BAR (FILTER/SORT)
    filter: document.querySelector(".filter"),
    sort: document.querySelector(".sort"),

    // ? PRODUCT CARD
    allProductCards: document.querySelectorAll(".product-grid>*"),
    wishlistButtons: document.querySelectorAll(".wishlist-btn"),
    cartButtons: document.querySelectorAll(".cart-btn"),
    productNames: document.querySelectorAll("#name"),

    // ? Modal
    cartBtn: document.getElementById("cart-btn"),
    modalName: document.getElementById("modal-name"),
    modalPrice: document.getElementById("modal-price"),
  };

  var fetchDetailsFromModal = function () {
    var name = DOMstrings.modalName.innerHTML;
    var price = DOMstrings.modalPrice.innerHTML;
    return {
      prodId: Number(name.charAt(8)) - 1,
      name: name,
      price: price,
      quantity: 1,
    };
  };

  var fetchProductDetailsFromId = function (targetId) {
    for (let i = 0; i < DOMstrings.productNames.length; i++) {
      if (i == targetId) {
        var name = DOMstrings.productNames[i].innerHTML;
      }
    }

    var price = document.querySelector("#price").innerHTML;

    return {
      prodId: targetId,
      name: name,
      price: price,
      quantity: 1,
    };
  };
  return {
    DOMstrings: DOMstrings,
    fetchProductDetailsFromId: fetchProductDetailsFromId,
    fetchDetailsFromModal: fetchDetailsFromModal,
  };
})();
var appController = (function (data, ui) {
  // ! communicates with the user interactions and data/ui controller
  // ! fetches data from a user event and passes it to data controller. Data controller computes the required stuff and returns an object to App controller again.
  // !App controller sends this info to UI controller to make the required changes to the UI. UI controller returns another object to the app controller.

  // ? VARIABLE DECLARATION
  // ! will declare later
  var addToCartTargetId, productInformation;
  // ? ADDING TO THE WISHLIST
  // ? ADDING TO THE CART
  var init = function () {
    for (let i = 0; i < ui.DOMstrings.cartButtons.length; i++) {
      // ! from the main page
      ui.DOMstrings.cartButtons[i].addEventListener("click", function (ev) {
        // ! capture target of click
        addToCartTargetId = i;
        console.log(ev.target);
        // ! fetch clicked target info
        productInformation = ui.fetchProductDetailsFromId(addToCartTargetId);
        // console.log(productInformation);
        // !check if product already exists in cart
        if (!data.productCheck(productInformation)) {
          // !make new entry if product not found
          data.makeEntryOfNewProduct(productInformation);
          console.log(data.cartInformation.product);
        } else {
          console.log(data.cartInformation.product);
        }
      });

      // ! from the modal
      ui.DOMstrings.cartBtn.addEventListener("click", function (ev) {
        console.log(ev.target);
        productInformation = ui.fetchDetailsFromModal();
        if (!data.productCheck(productInformation)) {
          // !make new entry if product not found
          data.makeEntryOfNewProduct(productInformation);
          console.log(data.cartInformation.product);
        } else {
          ev.stopPropagation();
          console.log(data.cartInformation.product);
        }
      });
    }

    // * making an object to pass to the datacontroller from UIcontroller

    // * passing the information to datacontroller to save it
  };

  return { init: init };
})(dataController, uiController);

appController.init();
