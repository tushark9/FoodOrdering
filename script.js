// SWIPER
var swiper = new Swiper(".swiper", {
  spaceBetween: 30,
  centeredSlides: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});




// Burger icon
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
const loginPage = document.querySelector(".loginpage");

menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("active");
  // Add or remove the 'active' class on loginPage based on the 'active' class of navbar
  if (navbar.classList.contains("active")) {
    loginPage.classList.add("active");
  } else {
    loginPage.classList.remove("active");
  }
});





// LOGIN PAGE
const downButton = document.querySelector(".bx-caret-down");

downButton.addEventListener("click", () => {
  loginPage.classList.toggle("active");
});







//SHOPPING CART
const shoppingButton = document.querySelector(".c");
const hidecart = document.querySelector(".cartt");
const opencartButtons = document.querySelectorAll(".bx-cart");

shoppingButton.addEventListener("click", () => {
  hidecart.classList.toggle("active");
});

opencartButtons.forEach((button) => {
  button.addEventListener("click", () => {});
});







// Initialize cart and total
let cart = [];
let total = 0;

// Function to add a product to the cart
function addToCart(productName, price) {
  const existingProduct = cart.find((item) => item.name === productName);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({ name: productName, price: price, quantity: 1 });
  }

  updateCart();
}

// Function to remove a product from the cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Function to increase the quantity of a product in the cart
function increaseQuantity(index) {
  cart[index].quantity++;
  updateCart();
}

// Function to decrease the quantity of a product in the cart
function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    removeFromCart(index);
  }
  updateCart();
}

// Function to update the cart UI and total
function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const totalElement = document.getElementById("total");
  const badgeContent = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Update badge
  updateCartBadge(badgeContent);

  // Clear previous items
  cartItems.innerHTML = "";

  // Update cart items
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price} - Quantity: ${item.quantity} `;

    const increaseButton = document.createElement("button");
    increaseButton.textContent = "+";
    increaseButton.style.backgroundColor = "#3cb815";
    increaseButton.style.marginRight = "8px";
    increaseButton.style.marginLeft = "8px";
    increaseButton.style.marginBottom = "18px";
    increaseButton.style.marginTop = "20px";
    increaseButton.style.color = "#fff";
    increaseButton.style.fontSize = "1.4rem";
    increaseButton.onclick = () => increaseQuantity(index);
    li.appendChild(increaseButton);

    const decreaseButton = document.createElement("button");
    decreaseButton.textContent = "-";
    decreaseButton.style.backgroundColor = "#3cb815"; // Example styling
    decreaseButton.style.color = "#fff";
    decreaseButton.style.marginRight = "8px";
    decreaseButton.style.marginBottom = "18px";
    decreaseButton.style.marginTop = "20px";
    decreaseButton.style.fontSize = "1.4rem";
    decreaseButton.onclick = () => decreaseQuantity(index);
    li.appendChild(decreaseButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.backgroundColor = "#ff7e00"; // Example styling
    deleteButton.style.color = "#fff"; // Example styling
    deleteButton.style.fontSize = "1.4rem"; // Example styling
    deleteButton.onclick = () => removeFromCart(index);
    li.appendChild(deleteButton);

    cartItems.appendChild(li);
  });

  // Update total
  total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  totalElement.textContent = total;
}







// Function to update the cart badge
function updateCartBadge(quantity) {
  var badgeContent = document.getElementById("myBadge").querySelector(".badge-content");
  badgeContent.innerText = quantity;
}

// Example: Update cart badge with initial quantity
updateCartBadge(cart.reduce((acc, item) => acc + item.quantity, 0));
