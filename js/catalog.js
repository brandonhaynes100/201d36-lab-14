/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);

var optionElement;

var selectElement = document.getElementById('items');

var inputElement = document.getElementById('quantity');

var cartContentsPreviewDiv = document.getElementById('cartContents');

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  for (var i in Product.allProducts) {
    // create an option tag to fill the select tag
    optionElement = document.createElement('option');
    // TODO: Names are in proper case, still must change to lowercase
    optionElement.setAttribute("value", Product.allProducts[i].name)
    // change the option's content to be the name of each product
    optionElement.textContent = Product.allProducts[i].name;
    // append that option to selectELement
    selectElement.appendChild(optionElement);
  }

  
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // Prevent the page from reloading
  event.preventDefault();

  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

// Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // suss out the item picked from the select list
  var itemPicked = selectElement.options[selectElement.selectedIndex].value;
  // get the quantity
  var quantityPicked = inputElement.value;
  // using those, add one item to the Cart
  cart.addItem(itemPicked, quantityPicked);
}

// Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  var itemCountNavDisplay = document.getElementById('itemCount');
  var totalItemsInCart = 0;
  for(var i in cart.items) {
    totalItemsInCart += parseInt(cart.items[i].quantity);
  }
  itemCountNavDisplay.textContent = parseInt(totalItemsInCart);
}

// As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // Get the item and quantity from the form
  var itemPicked = selectElement.options[selectElement.selectedIndex].value;
  var quantityPicked = inputElement.value;

  // Add a new element to the cartContents div with that information
  cartContentsPreviewDiv.textContent = itemPicked + " x " + quantityPicked;

}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
