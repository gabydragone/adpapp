// SELECT ELEMENTS
const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");
const checkoutE1 = document.querySelector("checkout");

// RENDER PRODUCTS
function renderProdcuts() {
products.forEach((product) => {
    productsEl.innerHTML += `
            <div class="item">
                <div class="item-container">
                    <div class="item-img" onclick="addToCart(${product.id})">
                        <img src="${product.img}" alt="${product.nombre}">
                    </div>
                    <div class="desc">
                        <h2>${product.nombre}</h2>
                        <h2><small>$</small>${product.precio}</h2>
                        <p>
                            ${product.descripcion}
                        </p>
                    </div>
                    
                  
                </div>
            </div>
        `;
});
}
renderProdcuts();

// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// ADD TO CART
function addToCart(id) {
  // check if prodcut already exist in cart
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((product) => product.id === id);

    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }

  updateCart();
}

// update cart
function updateCart() {
  renderCartItems();
  renderSubtotal();

  // save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}

// calculate and render subtotal
function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0,
    subtotalItems=0;

  cart.forEach((item) => {
    totalPrice += item.precio * item.numberOfUnits;
    totalItems += item.numberOfUnits;
    subtotalItems+= item.precio * totalItems;
  });

  subtotalEl.innerHTML = `Subtotal (${totalItems} items): $${totalPrice.toFixed(2)}`;
  totalItemsInCartEl.innerHTML = totalItems;


}

// render cart items
function renderCartItems() {
cartItemsEl.innerHTML = ""; // clear cart element
cart.forEach((item) => {
    cartItemsEl.innerHTML += `
        <div class="cart-item">
            <div class="item-info" onclick="removeItemFromCart(${item.id})">
                <img src="${item.img}" alt="${item.nombre}">
                <h4>${item.nombre}</h4>
            </div>
            <div class="unit-price">
                <small>$</small>${item.precio}
            </div>
            <div class="units">
                <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                <div class="number">${item.numberOfUnits}</div>
                <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
            </div>
            <div> 
            </div>
        </div>
      `;
  });
}

// remove item from cart
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}

// change number of units for an item
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" /*&& numberOfUnits < item.instock*/) {
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
}

function billPaid (){
  let table = document.createElement('table');
  table.insertRow();
  console.log(table);
}

function buildTable(data){
  var table = cart;
  for (var i = 0; i<cart.length; i++){
    var row = `<tr> 
                  <td>${data[i].nombre}</td>
                  <td>${data[i].descripcion}</td>
                  <td>${data[i].precio}</td>
                  <td>${data[i].quantity}</td>
                </tr>`
    table.innerHTML +=row;
  }
  let cart = [];
}

let crearTabla = function (cart) {
  let stringTabla = "<tr><th>Nombre</th><th>Precio</th><th>Cantidad</th><th>Total</th><th>  bla </th></tr> "
  for (let elem of cart){
    let fila = "<tr><td>"
    fila += elem.nombre;
    fila+= "</td>"
    
    fila+= "<td>"
    fila += elem.precio;
    fila+= "</td>"

    fila+= "<td>"
    fila += elem.numberOfUnits;
    fila+= "</td>"

    fila+= "<td>"
    fila += (elem.numberOfUnits*elem.precio);
    fila+= "</td>"

    fila += "</tr>";

    stringTabla += fila;
  } 
  return stringTabla;
}; 

document.getElementById("tablaVenta").innerHTML = crearTabla(cart);